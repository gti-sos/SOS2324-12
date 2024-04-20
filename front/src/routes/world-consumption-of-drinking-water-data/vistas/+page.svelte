<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    
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

    async function getChart(){
        let listings = await getListings();

        if (listings.length === 0){
            info = "La base de datos está vacía, no es posible hacer las gráficas";
            v_info = true;
            f_info();
        } else {

        // Función para calcular la media de un conjunto de valores
        function calculateMean(dataArray) {
            var sum = dataArray.reduce(function(acc, val) {
                return acc + val;
            }, 0);
            return sum / dataArray.length;
        }

        // Función para obtener los datos y actualizar los gráficos
        async function updateCharts() {
            const data = await getListings();

            // Preparación de los datos para Highcharts
            var categories = data.map(item => item.country);
            var urbanImproved = data.map(item => item.urban_improved);
            var urbanUnimproved = data.map(item => item.urban_unimproved);
            var ruralImproved = data.map(item => item.rural_improved);
            var ruralUnimproved = data.map(item => item.rural_unimproved);

            // Calcular la media de los datos
            var meanUrbanImproved = calculateMean(urbanImproved);
            var meanUrbanUnimproved = calculateMean(urbanUnimproved);
            var meanRuralImproved = calculateMean(ruralImproved);
            var meanRuralUnimproved = calculateMean(ruralUnimproved);

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

            // Actualizar gráfico de líneas
            Highcharts.chart('container2', {
                title: {
                    text: 'Evolución del Acceso al Agua Mejorado por País'
                },
                xAxis: {
                    categories: categories,
                    title: {
                        text: 'País'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Porcentaje'
                    }
                },
                series: [{
                    name: 'Urban Improved',
                    data: [meanUrbanImproved, meanUrbanImproved, meanUrbanImproved, meanUrbanImproved, meanUrbanImproved, meanUrbanImproved, meanUrbanImproved]
                }, {
                    name: 'Rural Improved',
                    data: [meanRuralImproved, meanRuralImproved, meanRuralImproved, meanRuralImproved, meanRuralImproved, meanRuralImproved, meanRuralImproved]
                }]
            });
    };
    };
    };
    
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
            {/if}
            </Container>
        </Container>
</main>