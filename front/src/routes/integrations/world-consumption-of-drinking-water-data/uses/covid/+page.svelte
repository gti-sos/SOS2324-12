<svelte:head>
	<script src="https://cdn.canvasjs.com/canvasjs.min.js"></script>
</svelte:head>

<script>
    import { onMount } from "svelte";
    import { Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardText, Button} from '@sveltestrap/sveltestrap';

    let API_JOTA1 = '/proxyJOTA';
    let geographicalData = [];
    let errorMsg = '';

    async function getData() {
        try {
            let response = await fetch(API_JOTA1, {
                method: 'GET'
            });

            if (response.ok) {
                let data = await response.json();
                console.log(data);
                let covidData = transformData1(data);
                console.log(covidData);
                crearGrafico1(covidData);
            } else {
                if (response.status == 404) {
                    errorMsg = 'No hay datos en la base de datos';
                } else {
                    errorMsg = `Error ${response.status}: ${response.statusText}`;
                }
                console.error(errorMsg);
            }
        } catch (e) {
            errorMsg = `Error al cargar los datos: ${e}`;
            console.error(errorMsg);
        }
    }

    function transformData1(data) {
        const countryData = data.data.reduce((acc, curr) => {
            const province = curr.region.province;
            if (!acc[province]) {
                acc[province] = { deaths: 0 };
            }
            acc[province].deaths += curr.deaths || 0;
            return acc;
        }, {});

        const sortedData = Object.entries(countryData).map(([province, data]) => ({
            province,
            deaths: data.deaths
        })).sort((a, b) => b.deaths - a.deaths);

        return {
            categories: sortedData.map(item => item.province),
            series: sortedData.map(item => ({ deaths: item.deaths }))
        };
    }

    function crearGrafico1(chartData) {
        const dataPoints = chartData.categories.map((category, index) => ({
            label: category,
            y: chartData.series[index].deaths
        }));

        let options = {
            animationEnabled: true,
            title: {
                text: 'Muertes de COVID-19 por provincia en España'
            },
            data: [{
                type: 'pie',
                showInLegend: true,
                legendText: '{label}',
                indexLabel: '{label}: {y}',
                dataPoints: dataPoints
            }]
        };

        let chart = new CanvasJS.Chart('chart1', options);
        chart.render();
    }

    onMount(async () => {
        await getData();
    });
</script>

<main>
    <Container class="content-container" style="justify-content: center;">
        <div id="chart1" style="height: 300px; width: 100%;"></div>
        {#if errorMsg}
            <p>{errorMsg}</p>
        {/if}
    </Container>
</main>
