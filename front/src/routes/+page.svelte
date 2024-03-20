<style>
    @import "/styles.css";
</style>
<svelte:head>
    <title>SOS2324-12 Project</title>
</svelte:head>
<script>
    import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Button} from '@sveltestrap/sveltestrap';
</script>

<div class="page-container"> <!-- Contenedor principal de la página -->
    <Container class="content-container"> <!-- Contenedor del contenido -->
        <h1>SOS2324-12</h1>
        <img src="/logo-sos.png" alt="SOS" class="centered-image">
        <hr>
        <Row>
            <Col sm="12" md="6">
                <Card class="project-description">
                    <CardBody>
                        <CardTitle>Team</CardTitle>
                        <CardText>
                            <ul class="team-list">
                                <li class="member"><a href="https://github.com/josmarsua">José Martínez Suárez</a></li>
                                <li class="member"><a href="https://github.com/borfloave">Borja Flores Avecilla</a></li>
                                <li class="member"><a href="https://github.com/josmenrue">José Joaquín Mena-Bernal Rueda</a></li>
                            </ul>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col sm="12" md="6">
                <Card class="project-description">
                    <CardBody>
                        <CardTitle>Project description</CardTitle>
                        <CardText>Our information sources focus on analyzing essential areas such as global food and water security, encompassing topics like access to clean drinking water and food consumption patterns. Additionally, we delve into the variability of prices and unique features of Airbnb rentals across diverse cities.</CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col sm="12" md="6">
                <Card class="project-description">
                    <CardBody>
                        <CardTitle>Repository</CardTitle>
                        <CardText><a href="https://github.com/gti-sos/SOS2324-12">gti-sos/SOS2324-12</a></CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col sm="12" md="6">
                <Card class="project-description">
                    <CardBody>
                        <CardTitle>URL</CardTitle>
                        <CardText><a href="https://sos2324-12.appspot.com">sos2324-12.appspot.com</a></CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col>
                <Card class="project-description">
                    <CardBody>
                        <CardTitle>APIs</CardTitle>
                        <div class="api-container">
                            <Row>
                                <Col sm="12" md="4">
                                    <Card class="api-wrapper">
                                        <CardBody>
                                            <Button color="info" href="https://sos2324-12.appspot.com/api/v1/airbnb-listings/docs">airbnb-listings</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle>Developed by <a href="https://github.com/josmarsua">José Martínez Suárez</a></CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12" md="4">
                                    <Card class="api-wrapper">
                                        <CardBody>
                                            <Button color="info" href="https://sos2324-12.appspot.com/api/v1/global-food-prices/docs" >global-food-prices</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle>Developed by <a href="https://github.com/borfloave">Borja Flores Avecilla</a></CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12" md="4">
                                    <Card class="api-wrapper">
                                        <CardBody>
                                            <Button color="info" href="https://sos2324-12.appspot.com/api/v1/world-consumption-of-drinking-water-data/docs">world-consumption-of-drinking-water-data</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle>Developed by <a href="https://github.com/josmenrue">José Joaquín Mena-Bernal Rueda</a></CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
</div>
