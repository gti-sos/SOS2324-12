<script>
    import { onMount } from "svelte";
    import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg, CardSubtitle } from '@sveltestrap/sveltestrap';

    let statusCodes = [100, 101, 102, 103, 110, 200, 201, 202, 203, 204, 206, 207, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 406, 410, 414, 416, 417, 418, 420, 422, 423, 425, 429, 500, 506, 507, 521, 530];
    let datos = [];

    onMount(async () => {
        await cargarDatos();
    });

    async function cargarDatos() {
        for (let code of statusCodes) {
            try {
                const response = await fetch(`/proxyAPI?url=${encodeURIComponent(`https://status.pizza/${code}.json`)}`);
                if (response.ok) {
                    const data = await response.json();
                    datos.push(data);
                    datos = datos.slice(); // Reasigna el array para hacer el cambio reactivo
                } else {
                    console.error('Failed to load data for status code:', code);
                }
            } catch (error) {
                console.error(`Error fetching status code ${code}:`, error);
            }
        }
}


</script>

<main>
    <Container class="content-container" style="justify-content: center;">
        <Row>
            <Col><h1>HTTP Pizza Status Codes</h1></Col>
        </Row>
        <hr>
        {#if datos.length > 0}
            <Container>
                <Row cols={{ xs: 2, sm: 3, md: 3, lg: 3, xl: 4 }} class="justify-content-center">
                {#each datos as dato}
                    <Col class='mb-3'>
                        <Card>
                            <CardImg top src={dato.raw} alt={`Status code ${dato.code}`} />
                            <CardBody>
                                <CardTitle tag="h5">{dato.code}</CardTitle>
                                <CardSubtitle>{dato.title} - {dato.category}</CardSubtitle>
                            </CardBody>
                        </Card>
                    </Col>
                {/each}
                </Row>
            </Container>
        {:else}
            <p>Cargando datos...</p>
        {/if}
    </Container>
</main>
