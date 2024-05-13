<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
//    import bb, { areaSpline } from 'billboard.js';
//    import 'billboard.js/dist/billboard.css'; // Importa los estilos CSS de Billboard.js
    
    // VARIABLE RUTA API
    
    let API = '/api/v2/world-consumption-of-drinking-water-data';
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

    function calculateMean(dataArray) {
    // Filtrar los valores no numéricos del array
    const numericValues = dataArray.filter(val => !isNaN(val));

    // Calcular la suma de los valores numéricos
    const sum = numericValues.reduce((acc, val) => acc + val, 0);

    // Calcular la media
    const mean = sum / numericValues.length;

    return mean;
};

    // Función para calcular la media por país
function calculateMeanByCountry(data, property) {
    return data.reduce((result, item) => {
        const country = item.country;
        const value = parseFloat(item[property]);
        if (!result[country]) {
            result[country] = [];
        }
        result[country].push(value);
        return result;
    }, {});
};


    async function getChart() {
        const listings = await getListings();
        console.log(listings);
        if (listings.length === 0) {
            console.log("La base de datos está vacía, no es posible hacer las gráficas");
            info = "La base de datos está vacía, no es posible hacer las gráficas"
            v_info = true;
            f_info();
    } else {
        // Preparación de los datos para Highcharts
    const categories = listings.map(item => item.country);
    const urbanImproved = listings.map(item => item.urban_improved_piped + item.urban_improved_other);
    const urbanUnimproved = listings.map(item => item.urban_unimproved_other);
    const ruralImproved = listings.map(item => item.rural_improved_piped + item.rural_improved_other);
    const ruralUnimproved = listings.map(item => item.rural_unimproved_other + item.rural_unimproved_surface);
    console.log(categories);
    console.log(urbanImproved);
    console.log(urbanUnimproved);
    console.log(ruralImproved);
    console.log(ruralUnimproved);
    // Calcular la media de los datos por país
    const meanUrbanImprovedByCountry = calculateMeanByCountry(listings, 'urban_improved_piped');
        const meanRuralImprovedByCountry = calculateMeanByCountry(listings, 'rural_improved_piped');

        // Obtener los nombres de los países para el eje x
        const countryNames = Object.keys(meanUrbanImprovedByCountry);

        // Obtener los valores medios por país
        const meanUrbanImprovedValues = countryNames.map(country => calculateMean(meanUrbanImprovedByCountry[country]));
        const meanRuralImprovedValues = countryNames.map(country => calculateMean(meanRuralImprovedByCountry[country]));

    // Actualizar gráfico de barras
    Highcharts.chart('container1', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Acceso al Agua Mejorado por País (Total)'
        },
        xAxis: {
            categories: categories,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Porcentaje',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Urban Improved',
            data: urbanImproved
        }, {
            name: 'Rural Improved',
            data: ruralImproved
        }, {
            name: 'Urban Unimproved',
            data: urbanUnimproved
        }, {
            name: 'Rural Unimproved',
            data: ruralUnimproved
        }]
    });

    Highcharts.chart('container2', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Evolución del Acceso al Agua Mejorado por País'
            },
            xAxis: {
                categories: countryNames,
                title: {
                    text: 'País'
                }
            },
            yAxis: {
                title: {
                    text: 'Porcentaje'
                },
                min: 0,
                max: 100
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Urban Improved',
                data: meanUrbanImprovedValues
            }, {
                name: 'Rural Improved',
                data: meanRuralImprovedValues
            }]
        });
    }
}


// Calcular la suma de los valores de los campos que no son iso_code, country o year para cada entrada
var summedData = listings.map(entry => {
    // Filtrar los campos que no son iso_code, country o year
    var fields = Object.keys(entry).filter(key => !['iso_code', 'country', 'year'].includes(key));
    // Sumar los valores de los campos restantes
    var sum = fields.reduce((acc, key) => {
        // Convertir los valores "-" a 0 antes de sumar
        var value = entry[key] === "-" ? 0 : entry[key];
        return acc + value;
    }, 0);
    return { id: `${entry.year}-${entry.country}`, sum: sum };
});

// Configurar los datos para la gráfica de Billboard.js
var chartData = {
    json: summedData,
    type: "bar",
    x: "id",
    y: "sum"
};

// Generar la gráfica utilizando Billboard.js
var chart = bb.generate({
    data: chartData,
    axis: {
        x: {
            type: "category",
            tick: {
                rotate: 45,
                multiline: false
            }
        },
        y: {
            label: "Suma de valores"
        }
    },
    bindto: "container3"
});
    
</script>
<main>
    <Container class="content-container" style="justify-content: center;"> 
        <Container>
            <Row>
                <Col><h1> Gráficas medias rural y urbano por paises</h1></Col>
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
            <Row><Col><h3> Gráfico de barras apiladas por país y área (urbana/rural)</h3></Col></Row>
            <Row><Col><div id="container1" style="width:100%; height:400px;"></div></Col></Row>
            <br/>
            <Row><Col><h3> Gráfica de líneas para mostrar la evolución del acceso al agua mejorado a lo largo del tiempo para cada país</h3></Col></Row>
            <Row><Col><div id="container2" style="width:100%; height:400px;"></div></Col></Row>
            <br/>
            <!--
            <Row><Col><h3> Grádico Billboard.js para enseñar todos los elementos , su suma de todos los elementos distintos </h3></Col></Row>
            <Row><Col><div id="container3" style="width:100%; height:400px;"></div></Col></Row>
            -->
            {/if}
            </Container>
        </Container>
</main>