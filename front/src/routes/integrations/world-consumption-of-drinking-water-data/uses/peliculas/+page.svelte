<svelte:head>

    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/treemap.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

</svelte:head>

<script>
    import { onMount } from "svelte";
    import { Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardText, Button} from '@sveltestrap/sveltestrap';


    let movieData = [];
    let loading = true;
    

    // Función asincrónica para obtener datos del reseñas desde la API
    async function getMovies() {

       const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a35e4e4bc4msh76b0742b85f42a7p142c2fjsnf4b8084e88bc',
                'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            movieData = await response.json();
            loading = false;

        } catch (error) {
            console.error(error);
        }
    }

    function createGraph() {

        const data = movieData.map((movie, index) => ({
            x: index + 1, 
            y: parseFloat(movie.rating),
            title: movie.title,
            rating: parseFloat(movie.rating)
        }));

        Highcharts.chart('myChart', {
            chart: {
                type: 'scatter'
            },
            title: {
                text: 'Nota media por película'
            },
            xAxis: {
                title: {
                    text: 'Películas'
                }
            },
            yAxis: {
                title: {
                    text: 'Calificación'
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.title}: {point.rating}'
            },
            series: [{
                name: 'Nota media de la película',
                color: 'rgba(128, 0, 128, 0.2)',
                data: data
            }]
        });
    }

    onMount(async () => {
        await getMovies();
        createGraph();
    });

</script>

<main>
    <Container class="content-container" style="justify-content: center;"> 

<h1 class="title">Peliculas</h1>

<div class="card-container">
    {#if loading}
    <p class="loading">Cargando datos...</p>
{:else}
    <div id="myChart" ></div>
{/if}
</div>

</Container>
</main>

<style>
    /* Estilo de textos */
    .title {
        font-family: 'Arial', sans-serif;
        font-size: 2.5rem;
        color: #ff4a9e;
        text-align: center;
        margin-bottom: 20px;
    }

    .card-title {
        font-family: 'Arial', sans-serif;
        font-size: 1.8rem;
        color: #0e2ac8;
        margin-bottom: 5px;
    }

    .card-info {
        font-family: 'Arial', sans-serif;
        font-size: 1.4rem;
        color: #555;
        text-align: center;
        margin-bottom: 10px;
    }

    /* Estilos de las cartas */
    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .card {
        width: calc(30% - 20px);
        margin: 0 10px 20px;
        border-radius: 10px;
        padding: 15px;
        background-color: #f9f9f9;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .loading {
        font-family: 'Arial', sans-serif;
        font-size: 1.6rem;
        color: #888;
        text-align: center;
        margin-top: 20px;
    }
</style>