<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    
    import * as echarts from 'echarts';
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
      initChart();  
    })

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

     // Función para obtener datos meteorológicos de Open-Meteo por ciudad
     async function getWeatherData(latitude, longitude) {
        const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,wind_speed_10m_max&timezone=auto`;
        try {
            const response = await fetch(weatherAPI);
            const data = await response.json();
            return {
                temperature: data.daily.temperature_2m_max.reduce((a, b) => a + b, 0) / data.daily.temperature_2m_max.length,
                windSpeed: data.daily.wind_speed_10m_max.reduce((a, b) => a + b, 0) / data.daily.wind_speed_10m_max.length
            };
        } catch (error) {
            console.error(`Error fetching weather data: ${error}`);
            return null;
        }
    }

    // Preparar datos para la visualización
    async function prepareChartData(listings) {
        let cityData = {};
        for (const listing of listings) {
            if (!cityData[listing.city]) {
                cityData[listing.city] = {
                    prices: [],
                    latitude: listing.latitude,
                    longitude: listing.longitude
                };
            }
            cityData[listing.city].prices.push(listing.price);
        }

        const chartData = {
            cities: [],
            prices: [],
            temperatures: [],
            windSpeeds: []
        };

        for (const [city, data] of Object.entries(cityData)) {
            const weather = await getWeatherData(data.latitude, data.longitude);
            const avgPrice = data.prices.reduce((a, b) => a + b, 0) / data.prices.length;

            chartData.cities.push(city);
            chartData.prices.push(avgPrice.toFixed(2));
            chartData.temperatures.push(weather.temperature.toFixed(2));
            chartData.windSpeeds.push(weather.windSpeed.toFixed(2));
        }

        return chartData;
    }

    // Inicializar la gráfica
    async function initChart() {
        const listings = await getListings();
        if (listings.length === 0){
            info = "La base de datos está vacía, no es posible hacer las gráficas";
            v_info = true;
            f_info();
        } else {
        const chartData = await prepareChartData(listings);
        const chartDom = document.getElementById('contenedor-grafica');
        const myChart = echarts.init(chartDom);
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            legend: {
                bottom: 0
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: chartData.cities,
                axisLabel: {
                    interval: 0, // Mostrar todas las etiquetas
                    rotate: 45, // Rotar etiquetas para mejor visualización
                    textStyle: {
                        color: 'black',
                        fontSize: 12
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: 'Precio ($)',
                    position: 'left',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: 'Temperatura (°C)\n Viento (km/h)',
                    position: 'right',
                    axisLabel: {
                        formatter: '{value}'
                    },
                    splitLine: {
                        show: false // No mostrar líneas de cuadrícula para este eje
                    }
                }
            ],
            series: [
                {
                    name: 'Precio Medio ($)',
                    type: 'bar',
                    yAxisIndex: 0, // Usar el primer eje Y
                    data: chartData.prices
                },
                {
                    name: 'Temperatura Media (ºC)',
                    type: 'bar',
                    yAxisIndex: 1, // Usar el segundo eje Y
                    data: chartData.temperatures
                },
                {
                    name: 'Velocidad del Viento Media (km/h)',
                    type: 'bar',
                    yAxisIndex: 1, // Usar el segundo eje Y
                    data: chartData.windSpeeds
                }
            ]
        };
        myChart.setOption(option);
    }
    }


</script>

<main>
<Container class="content-container" style="justify-content: center;"> 
    <Container>
        <Row>
            <Col><h1> Comparación de precios medios, temperatura y viento por ciudad</h1></Col>
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
        <Row><Col><div id="contenedor-grafica" style="width:100%; height:400px;"></div></Col></Row>
        {/if}
    </Container>

</Container>
</main>