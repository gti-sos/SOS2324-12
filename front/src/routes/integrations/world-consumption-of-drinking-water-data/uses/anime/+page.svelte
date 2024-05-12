<script>
    import { onMount } from "svelte";
    import { Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardText, Button} from '@sveltestrap/sveltestrap';


    let animeData = [];

    // Función asincrónica para obtener datos del anime desde la API
    async function getAnime() {

        const url = 'https://myanimelist.p.rapidapi.com/anime/top/%7Bcategory%7D';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a35e4e4bc4msh76b0742b85f42a7p142c2fjsnf4b8084e88bc',
                'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            animeData = await response.json();
            console.log(animeData);

        } catch (error) {
            console.error(error);
        }

    }

    onMount(async () => {
        await getAnime();
    });

</script>

<main>
    <Container class="content-container" style="justify-content: center;"> 

<h1 class="title">Top 50 Animes</h1>

<div class="card-container">
    {#if animeData.length > 0}
        {#each animeData as anime}
            <div class="card">
                <h2 class="card-title">{anime.title}</h2>
                <p class="card-info">{anime.aired_on}</p>
                <p class="card-info">{anime.type}</p>
            </div>
        {/each}
    {:else}
        <p class="loading">Cargando datos...</p>
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