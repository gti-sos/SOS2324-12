<script>
    import { Container, Row, Col, Label, FormGroup, Input, Button, Card, CardBody, CardTitle, CardText, CardImg, ListGroup, ListGroupItem } from '@sveltestrap/sveltestrap';

    let API_KEY = "354aa80fc40b511b727751c86ea5778a";
    let superheroe_name = "Batman";
    let datos = []; // Variable local simple

    async function cargarDatos() {
        const superheroeNameEncoded = encodeURIComponent(superheroe_name);
        const proxyUrl = `/proxyAPI?url=${encodeURIComponent(`https://superheroapi.com/api/${API_KEY}/search/${superheroeNameEncoded}`)}`;
        try {
            const response = await fetch(proxyUrl);
            const data = await response.json();
            datos = data.results; // Asumimos que 'results' es donde están los datos relevantes
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    // Función para manejar el cambio de nombre del superhéroe
    function handleInput(event) {
        superheroe_name = event.target.value;
    }

    // Función para manejar la búsqueda al hacer clic
    function handleSearch() {
        cargarDatos();
    }

    let fullname = "full-name";
</script>

<main>
    <Container class="content-container" style="justify-content: center;">
        <Row>
            <Col><h1>API Superheroes</h1></Col>
        </Row>
        <hr>
        <Container fluid>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="superheroe">Inserte un nombre de superhéroe</Label>
                        <Input type="text" id="superheroe" value={superheroe_name} on:input={handleInput}/>
                        <Button color="primary" on:click={handleSearch}>Buscar</Button>
                    </FormGroup>
                </Col>
            </Row>
        </Container>
        <hr>
        {#if datos && datos.length > 0}
            <Container>
                <Row cols={{ xs:2,sm: 3, md: 3, lg: 3, xl:4}} class="justify-content-center">
                {#each datos as heroe}
                <Col class='mb-3'>
                    <Card class="tarjeta">
                        <CardImg top width="25%" src={heroe.image.url} alt={heroe.name} />
                        <CardBody>
                            <CardTitle tag="h5"><strong>{heroe.name}</strong></CardTitle>
                            <CardText><strong>Biografía:</strong></CardText>
                            <ListGroup>
                                <ListGroupItem>Nombre completo: {heroe.biography['full-name']}</ListGroupItem>
                                <ListGroupItem>Lugar de nacimiento: {heroe.biography['place-of-birth']}</ListGroupItem>
                                <ListGroupItem>Género: {heroe.appearance.gender}</ListGroupItem>
                                <ListGroupItem>Raza: {heroe.appearance.race}</ListGroupItem>
                                <ListGroupItem>Altura: {heroe.appearance.height[1]}</ListGroupItem>
                                <ListGroupItem>Peso: {heroe.appearance.weight[1]}</ListGroupItem>
                            </ListGroup>
                            <CardText><strong>Inteligencia:</strong> {heroe.powerstats.intelligence}</CardText>
                            <CardText><strong>Fuerza:</strong> {heroe.powerstats.strength}</CardText>
                            <CardText><strong>Velocidad:</strong> {heroe.powerstats.speed}</CardText>
                            <CardText><strong>Durabilidad:</strong> {heroe.powerstats.durability}</CardText>
                            <CardText><strong>Poder:</strong> {heroe.powerstats.power}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                {/each}
                </Row>
            </Container>
        {:else}
            <p>No hay datos disponibles. Por favor inserte un nombre.</p>
        {/if}
    </Container>
</main>
