<script>
import { Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardText, Button} from '@sveltestrap/sveltestrap';
</script>

<main>
    <Container class="content-container" style="justify-content: center;"> 

    <div class="card">
        <div class="photo">
            <Button color="primary" href="/integrations/world-consumption-of-drinking-water-data/uses/anime">world-consumption-of-drinking-water-data</Button>
        </div>
        <h2 class="title">Anime</h2>
    </div>

    <div class="card" style="margin-left: 20px;">
        <div class="photo">
            <Button color="primary" href="/integrations/world-consumption-of-drinking-water-data/uses/peliculas">world-consumption-of-drinking-water-data</Button>
        </div>
        <h2 class="title">Comida</h2>
    </div>

    <div class="card" style="margin-left: 20px;">
        <div class="photo">
            <Button color="primary" href="/integrations/world-consumption-of-drinking-water-data/uses/geografia">world-consumption-of-drinking-water-data</Button>
        </div>
        <h2 class="title">Geografía</h2>
    </div>

    <div class="card" style="margin-left: 20px;">
        <div class="photo">
            <Button color="primary" href="/integrations/world-consumption-of-drinking-water-data/uses/spotify">world-consumption-of-drinking-water-data</Button>
        </div>
        <h2 class="title">Spotify</h2>
    </div>
    
</Container>
</main> 


<style>


    div.card {
        text-align: center;
        border: 1px solid gray;
        border-radius: 5%;
    }



</style>