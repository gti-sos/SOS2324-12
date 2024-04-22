<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/modules/treemap.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>

</svelte:head>

<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    
    // VARIABLE RUTA API
    
    let API = '/api/v2/airbnb-listings';
    if(dev)
        API = 'http://localhost:10000'+API;
    
    // ALERTA INFO

    let info = "";
    let v_info = false;
    function f_info() {
        (setTimeout(function(){v_info = false;}, 6000));
    }

    // INICIALIZAR GRÁFICAS

    onMount(async () => {
        getChart();
    });

    // DATOS

    async function getInitialListings(){
    let response = await fetch(API + "/loadInitialData", {
                method: "GET"
            });
    const status = await response.status;
    if (status == 201){
        getListings();
        window.location.reload();
    } else {
        console.log("Error al cargar datos");
    };
    };

    async function getListings(){
        let list = [];

        const response = await fetch(API, {
            method: 'GET'
        });

        try{
            const data = await response.json();
            list = data;
        } catch (error) {
            console.log(`Error: ${error}`);
        }

        const status = await response.status;

        return list;
    };

    async function getChart(){
        let listings = await getListings();

        if (listings.length === 0){
            info = "La base de datos está vacía, no es posible hacer las gráficas";
            v_info = true;
            f_info();
        } else {
            const precioPromedioPorCiudad = calculate_mean_price(listings);
            console.log(precioPromedioPorCiudad);

            // Convertir los datos a un formato aceptado por Highcharts
            const datos = Object.entries(precioPromedioPorCiudad).map(([ciudad, precio]) => ({ name: ciudad, y: precio }));
            const datosOrdenados = datos.sort((a, b) => b.y - a.y);
            const precioMaximo = Math.max(...datos.map(item => item.y));
            const alturaejeY = precioMaximo + 50;
            const precioMinimo = Math.min(...datos.filter(item => item.y > 0).map(item => item.y));
            // Configurar el gráfico de barras horizontal
            const chart = Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Precio promedio por ciudad'
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Precio promedio: <b>{point.y:.2f} €</b>'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        autoRotation: [-45, -90],
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    },
                    title: {
                        text: 'Ciudad'
                    }
                },
                yAxis: {
                    type: 'logarithmic',
                    min: precioMinimo,
                    max: alturaejeY,
                    title: {
                        text: 'Precio promedio'
                    }
                },
                series: [{
                    name: 'Precio promedio',
                    colors: [
                        '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                        '#03c69b',  '#00f194'
                    ],
                    colorByPoint: true,
                    groupPadding: 0,
                    data: datosOrdenados.map(item => ({ name: item.name, y: item.y })),
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        inside: true,
                        verticalAlign: 'middle',
                        format: '{point.y:.2f}', // two decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '10px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                    }]
            });
        };
        // Ahora, agregamos el gráfico de pastel

        // Creamos un objeto para almacenar la frecuencia de cada comodidad
        const amenityFrequency = {};

        // Iterar sobre cada alojamiento en la lista de listings
        listings.forEach(listing => {
            // Iterar sobre las comodidades de cada alojamiento
            listing.amenities_list.forEach(amenity => {
                // Incrementar la frecuencia de la comodidad en el objeto amenityFrequency
                if (amenity in amenityFrequency) {
                    amenityFrequency[amenity]++;
                } else {
                    amenityFrequency[amenity] = 1;
                }
            });
        });

        // Filtrar las comodidades con una frecuencia menor 
        const minFrequency = 13;
        const popularAmenities = Object.entries(amenityFrequency)
            .filter(([amenity, frequency]) => frequency >= minFrequency)
            .reduce((acc, [amenity, frequency]) => {
                acc[amenity] = frequency;
                return acc;
            }, {});

        // Calcular la frecuencia total de las comodidades populares
        const totalFrequency = Object.values(popularAmenities).reduce((acc, frequency) => acc + frequency, 0);

        // Agrupar todas las comodidades con frecuencia menor a 20 en una categoría "Others"
        const othersFrequency = Object.values(amenityFrequency)
            .filter(frequency => frequency < minFrequency)
            .reduce((acc, frequency) => acc + frequency, 0);

        // Agregar la categoría "Others" al objeto de comodidades populares
        if (othersFrequency > 0) {
            popularAmenities['Others'] = othersFrequency;
        }

// Convertir el objeto de frecuencia en un arreglo de objetos {name, value}
const dataTreemap = Object.entries(popularAmenities).map(([amenity, frequency]) => ({
    name: amenity,
    value: frequency
}));

// Obtener las comodidades asociadas a "Others" si existen
let othersAmenities = {};
if ("Others" in popularAmenities) {
    othersAmenities = Object.entries(amenityFrequency)
        .filter(([amenity, frequency]) => frequency < minFrequency)
        .map(([amenity, frequency]) => `${amenity} (${frequency}) `);
}

console.log("others: " + othersAmenities);

// Configurar el gráfico de treemap
const treemapChart = Highcharts.chart('treemapContainer', {
    chart: {
        type: 'treemap',
        layoutAlgorithm: 'squarified'
    },
    title: {
            text: 'Proporción de comodidades más populares'
    },
    tooltip: {
        formatter: function() {
            if (this.point.name === 'Others') {
                
                return `<b>${this.point.name}</b><br>Amenities: ${othersAmenities}`;
            } else {
                return `<b>${this.point.name}</b>: ${this.point.value}`;
            }
        }
    },
    series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: dataTreemap,
        colorByPoint: true,
        levels: [{
            level: 1,
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '15px',
                    fontWeight: 'bold'
                }
            },
            borderWidth: 3
        }]
    }]
});



    };

    // Función para calcular el precio promedio por ciudad
    function calculate_mean_price(listings) {
        const preciosPorCiudad = {};

        listings.forEach(listing => {
            const ciudad = listing.city;
            const precio = listing.price;

            if (!preciosPorCiudad[ciudad]) {
            preciosPorCiudad[ciudad] = [];
            }

            preciosPorCiudad[ciudad].push(precio);
        });

        const precioPromedioPorCiudad = {};

        for (const ciudad in preciosPorCiudad) {
            const precios = preciosPorCiudad[ciudad];
            const precioPromedio = precios.reduce((acc, curr) => acc + curr, 0) / precios.length;
            precioPromedioPorCiudad[ciudad] = parseFloat(precioPromedio.toFixed(2));
        }

        return precioPromedioPorCiudad;
    };

    
</script>
<main>
    <Container class="content-container" style="justify-content: center;"> 
        <Container>
            <Row>
                <Col><h1> Gráficas alquileres manejados por AirBnB</h1></Col>
            </Row>
        </Container>

        <br/>

        <Container>
            {#if info != ""}
                <Row><Col><Alert color="info" isOpen={v_info} toggle={() => (v_info = false)}>{info}</Alert></Col></Row>
                <Container class="text-center">
                    <Row>
                        <Col cols={{ xs:4 }}>
                            <Button color="warning" on:click="{getInitialListings}">Cargar datos</Button>
                        </Col>                       
                    </Row>
                </Container>
                <br/>
            {:else}
            <Row><Col><h3> Comparativa de precios medios por ciudad</h3></Col></Row>
            <Row><Col><div id="container" style="width:100%; height:400px;"></div></Col></Row>
            <br/>
            <Row><Col><h3> Proporción de comodidades más populares</h3></Col></Row>
            <Row><Col><div id="treemapContainer" style="width:100%; height:400px;"></div></Col></Row>
            {/if}
            </Container>
        </Container>
</main>