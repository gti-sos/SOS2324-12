
<script>
    import { onMount } from "svelte";
    import { Container, Row, Col, Table, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from '@sveltestrap/sveltestrap';
    import * as echarts from 'echarts';

    

    onMount(() => {
      cargarDatos();
    });

    
    async function cargarDatos() {
    const url = 'https://coronavirus.m.pipedream.net/';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const rawData = data.rawData;

        const groupedData = rawData.reduce((acc, item) => {
            const { Country_Region: country, Confirmed, Deaths } = item;
            if (!acc[country]) {
                acc[country] = { confirmed: 0, deaths: 0 };
            }
            acc[country].confirmed += Number(Confirmed);
            acc[country].deaths += Number(Deaths);
            return acc;
        }, {});

        const formattedData = Object.keys(groupedData).map(key => ({
            name: key,
            value: groupedData[key].confirmed,
            deaths: groupedData[key].deaths,
            mortalityRate: (groupedData[key].deaths / groupedData[key].confirmed * 100).toFixed(2)
        }));

        crearTreemap(formattedData);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

function crearTreemap(data) {
    const chartDom = document.getElementById('treemap');
    const myChart = echarts.init(chartDom);
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return `${params.data.name}<br/>Casos confirmados: ${params.data.value}<br/>Mortalidad: ${params.data.mortalityRate}%`;
            }
        },
        series: [{
            type: 'treemap',
            data: data,
            leafDepth: 1,
        }]
    };
    myChart.setOption(option);
}

      
</script>
<main>
    <Container class="content-container" style="justify-content: center;">
        <Row>
          <Col><h1>Casos y tasa de muerte Covid-19</h1></Col>
        </Row>
        <Row>
            <div id="treemap" style="width: 100%; height: 50vh;"></div>
        </Row>
    </Container>
</main>