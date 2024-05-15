<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.css">
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <script src="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.pkgd.min.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { Button, Alert, Container, Row, Col } from '@sveltestrap/sveltestrap';
    import { dev } from '$app/environment';

    let API = '/api/v2/world-consumption-of-drinking-water-data';
    if (dev) {
        API = 'http://localhost:10000' + API;
    }

    let info = "";
    let v_info = false;
    let dataForDonutChart = [];

    function f_info() {
        setTimeout(() => { v_info = false; }, 6000);
    }

    onMount(async () => {
        const listings = await getListings();
        if (listings.length === 0) {
            info = "La base de datos está vacía, no es posible hacer las gráficas";
            v_info = true;
            f_info();
        } else {
            updateCharts(listings);
            dataForDonutChart = listings.map(item => [item.country, parseInt(item.total_improved_total)]);
            createDonutChart();
        }
    });

    async function getInitialListings() {
        const response = await fetch(API + "/loadInitialData", { method: "GET" });
        if (response.status === 201) {
            window.location.reload();
        } else {
            console.log("Error al cargar datos");
        }
    }

    async function getListings() {
        const response = await fetch(API, { method: 'GET' });
        return response.ok ? await response.json() : [];
    }

    function updateCharts(data) {
        const categories = data.map(item => item.country);
        const urbanImproved = data.map(item => item.urban_improved_piped + item.urban_improved_other);
        const ruralImproved = data.map(item => item.rural_improved_piped + item.rural_improved_other);
        const urbanUnimproved = data.map(item => item.urban_unimproved_other);
        const ruralUnimproved = data.map(item => item.rural_unimproved_other + item.rural_unimproved_surface);

        Highcharts.chart('container1', {
            chart: { type: 'bar' },
            title: { text: 'Acceso al Agua Mejorado por País (Total)' },
            xAxis: { categories },
            yAxis: {
                min: 0,
                title: { text: 'Porcentaje' },
                labels: { overflow: 'justify' }
            },
            tooltip: { valueSuffix: '%' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            series: [
                { name: 'Urban Improved', data: urbanImproved },
                { name: 'Rural Improved', data: ruralImproved },
                { name: 'Urban Unimproved', data: urbanUnimproved },
                { name: 'Rural Unimproved', data: ruralUnimproved }
            ]
        });

        Highcharts.chart('container2', {
            chart: { type: 'area' },
            title: { text: 'Evolución del Acceso al Agua Mejorado por País' },
            xAxis: { categories },
            yAxis: {
                title: { text: 'Porcentaje' },
                min: 0,
                max: 100
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: { hover: { enabled: true } }
                    }
                }
            },
            series: [
                { name: 'Urban Improved', data: urbanImproved },
                { name: 'Rural Improved', data: ruralImproved }
            ]
        });
    }

    function createDonutChart() {
        bb.generate({
            data: {
                columns: dataForDonutChart,
                type: 'donut',
                onclick: (d, i) => { console.log("onclick", d, i); },
                onover: (d, i) => { console.log("onover", d, i); },
                onout: (d, i) => { console.log("onout", d, i); }
            },
            donut: {
                title: "Acceso Total Mejorado"
            },
            bindto: "#donutChart"
        });
    }
</script>

<main>
    <Container class="content-container" style="justify-content: center;">
        {#if info !== ""}
            <Alert color="info" isOpen={v_info} toggle={() => (v_info = false)}>{info}</Alert>
            <Button color="warning" on:click={getInitialListings}>Cargar datos</Button>
        {:else}
            <Row><Col><div id="container1" style="width: 100%; height: 1800px;"></div></Col></Row>
            <Row><Col><div id="container2" style="width: 100%; height: 900px;"></div></Col></Row>
            <Row><Col><div id="donutChart" style="width: 100%; height: 700px;"></div></Col></Row>
        {/if}
    </Container>
</main>
