<style>
    @import "/styles.css";
    @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

</style>

<svelte:head>
    <title>SOS2324-12 Project</title>
</svelte:head>
<script>
    import { Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardText, Button} from '@sveltestrap/sveltestrap';
    import Fa from 'svelte-fa';
    import { faServer, faFile, faChartPie, faLink, faUsers, faInfo, faTable} from '@fortawesome/free-solid-svg-icons';
    import { dev } from '$app/environment';

    let API = '/api/v1';
    if (dev)
        API = 'http://localhost:10000'+API;

  let API_v2 = '/api/v2';
    if (dev)
        API_v2 = 'http://localhost:10000'+API_v2;

</script>

<div>
<Container class="content-container" style="justify-content: center;"> 
        <h1>SOS2324-12</h1>
        <img src="/logo-sos.png" alt="SOS" class="centered-image">
        <hr>
        <Row>
            <Col sm="12" md="6">
                <Card>
                    <CardHeader>
                        <CardTitle><Fa icon={faUsers}/> Team</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardSubtitle>
                            <ul>
                                <li><a href="https://github.com/josmarsua">José Martínez Suárez</a></li>
                                <li><a href="https://github.com/borfloave">Borja Flores Avecilla</a></li>
                                <li><a href="https://github.com/josmenrue">José Joaquín Mena-Bernal Rueda</a></li>
                            </ul>
                        </CardSubtitle>
                    </CardBody>
                </Card>
            </Col>
            <Col sm="12" md="6">
                <Card>
                    <CardHeader>
                        <CardTitle><Fa icon={faInfo}/> Project description</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>Our information sources focus on analyzing essential areas such as global food and water security, encompassing topics like access to clean drinking water and food consumption patterns. Additionally, we delve into the variability of prices and unique features of Airbnb rentals across diverse cities.</CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col><br></Col>
        </Row>
        <Row>
            <Col sm="12" md="6">
                <Card>
                    <CardHeader>
                        <CardTitle><img src="/icono-github.png" alt="GitHub" style="width: 20px; height: 20px; margin-right: 5px;"> 
                            Repository</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText><a href="https://github.com/gti-sos/SOS2324-12">gti-sos/SOS2324-12</a></CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col sm="12" md="6">
                <Card>
                    <CardHeader>
                        <CardTitle><Fa icon={faLink}/> URL</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText><a href="https://sos2324-12.appspot.com">sos2324-12.appspot.com</a></CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col><br></Col>
        </Row>
        <Row>
            <Col sm="12" md="4">
                <Card>
                    <CardHeader>
                        <CardTitle>Vídeo Jose</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardSubtitle>
                            <ul>
                                <li><a href="/">Ir al vídeo</a></li>
                            </ul>
                        </CardSubtitle>
                    </CardBody>
                </Card>
            </Col>
            <Col sm="12" md="4">
                <Card>
                    <CardHeader>
                        <CardTitle>Vídeo Borja</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardSubtitle>
                            <ul>
                                <li><a href="/">Ir al vídeo</a></li>
                            </ul>
                        </CardSubtitle>
                    </CardBody>
                </Card>
            </Col>
            <Col sm="12" md="4">
                <Card>
                    <CardHeader>
                        <CardTitle>Vídeo Jota</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardSubtitle>
                            <ul>
                                <li><a href="/">Ir al vídeo</a></li>
                            </ul>
                        </CardSubtitle>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col><br></Col>
        </Row>
        <Row>
            <Col>
                <Card>
                    <CardHeader>
                        <CardTitle>Links</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div class="api-container">
                            <Row>
                                <Col sm="12" md="4">
                                    <Card class="api-wrapper">
                                        <CardHeader style="background-color: #008080; color: white; text-decoration-style: solid;">
                                            <CardTitle style="justify-content: center; text-align: center;">airbnb-listings</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <CardSubtitle style="justify-content: center; text-align: center;"><Fa icon={faServer}/> API</CardSubtitle><br>
                                            <Button size="sm" color="primary" href="{API}/airbnb-listings/">v1</Button>
                                            <Button size="sm" color="primary" href="{API_v2}/airbnb-listings/">v2</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle style="justify-content: center; text-align: center;"><Fa icon={faFile}/> Documentation</CardSubtitle><br>
                                            <Button size="sm" color="info" href="{API}/airbnb-listings/docs">v1</Button>
                                            <Button size="sm" color="info" href="{API_v2}/airbnb-listings/docs">v2</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle style="justify-content: center; text-align: center;"><Fa icon={faTable}/> Frontend</CardSubtitle><br>
                                            <Button color="warning" href="/airbnb-listings/">airbnb-listings</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle style="justify-content: center; text-align: center;"><Fa icon={faChartPie}/> Vistas</CardSubtitle><br>
                                            <Button color="dark" href="/airbnb-listings/vistas">airbnb-listings</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle>Developed by <a href="https://github.com/josmarsua">José Martínez Suárez</a></CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12" md="4">
                                    <Card class="api-wrapper">
                                        <CardHeader style="background-color: #008080; color: white; text-decoration-style: solid;">
                                            <CardTitle style="justify-content: center; text-align: center;">global-food-prices</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <CardSubtitle style="justify-content: center; text-align: center;"><Fa icon={faServer}/> API</CardSubtitle><br>
                                            <Button size="sm" color="primary" href="{API}/global-food-prices/" >v1</Button>
                                            <Button size="sm" color="primary" href="{API_v2}/global-food-prices/">v2</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle style="justify-content: center; text-align: center;"><Fa icon={faFile}/> Documentation</CardSubtitle><br>
                                            <Button size="sm" color="info" href="{API}/global-food-prices/docs">v1</Button>
                                            <Button size="sm" color="info" href="{API_v2}/global-food-prices/docs">v2</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle style="justify-content: center; text-align: center;"><Fa icon={faTable}/> Frontend</CardSubtitle><br>
                                            <Button color="warning" href="/global-food-prices/">global-food-prices</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle style="justify-content: center; text-align: center;"><Fa icon={faChartPie}/> Vistas</CardSubtitle><br>
                                            <Button color="dark" href="/global-food-prices/vistas">global-food-prices</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle>Developed by <a href="https://github.com/borfloave">Borja Flores Avecilla</a></CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12" md="4">
                                    <Card class="api-wrapper">
                                        <CardHeader style="background-color: #008080; color: white; text-decoration-style: solid;">
                                            <CardTitle style="justify-content: center; text-align: center;">world-consumption-of-drinking-water-data</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <CardSubtitle style="justify-content: center; text-align: center;"><Fa icon={faServer}/> API</CardSubtitle><br>
                                            <Button size="sm" color="primary" href="{API}/world-consumption-of-drinking-water-data/">v1</Button>
                                            <Button size="sm" color="primary" href="{API_v2}/world-consumption-of-drinking-water-data/">v2</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle style="justify-content: center; text-align: center;"><Fa icon={faFile}/> Documentation</CardSubtitle><br>
                                            <Button size="sm" color="info" href="{API}/world-consumption-of-drinking-water-data/docs">v1</Button>
                                            <Button size="sm" color="info" href="{API_v2}/world-consumption-of-drinking-water-data/docs">v2</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle style="justify-content: center; text-align: center;"><Fa icon={faTable}/> Frontend</CardSubtitle><br>
                                            <Button color="warning" href="/world-consumption-of-drinking-water-data/">world-consumption-of-drinking-water-data</Button>
                                            <CardText><hr></CardText>
                                            <CardSubtitle style="justify-content: center; text-align: center;"><Fa icon={faChartPie}/> Vistas</CardSubtitle><br>
                                            <Button color="dark" href="/world-consumption-of-drinking-water-data/vistas">world-consumption-of-drinking-water-data</Button>
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
