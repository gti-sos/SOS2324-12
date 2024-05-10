<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, CardSubtitle, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    
    // VARIABLE RUTA API
    
    let API_JMS = '/api/v2/airbnb-listings';
    let API_BFA = '/api/v2/global-food-prices';
    let API_JMR = '/api/v2/world-consumption-of-drinking-water-data';
    if(dev){
        API_JMS = 'http://localhost:10000'+API_JMS;
        API_BFA = 'http://localhost:10000'+API_BFA;
        API_JMR = 'http://localhost:10000'+API_JMR;
    }
    // ALERTA INFO

    let info = "";
    let v_info = false;
    function f_info() {
        (setTimeout(function(){v_info = false;}, 6000));
    }

    </script>
    <main>
        <Container class="content-container" style="justify-content: center;"> 
            <Container>
                <Row>
                    <Col><h1> Integraciones</h1></Col>
                </Row>
            </Container>
            <div class="api-container">
                <Row>
                    <Col sm="12" md="4">
                        <Card class="api-wrapper">
                            <CardHeader style="background-color: #008080; color: white; text-decoration-style: solid;">
                                <CardTitle style="justify-content: center; text-align: center;">José Martínez</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardSubtitle style="justify-content: center; text-align: center;">Integración ...</CardSubtitle><br>
                                <Button size="sm" color="primary" href="">enlace</Button>
                                <CardText><hr></CardText>
                                <CardSubtitle style="justify-content: center; text-align: center;">Integración ...</CardSubtitle><br>
                                <Button size="sm" color="primary" href="">enlace</Button>
                                <CardText><hr></CardText>
                                <CardSubtitle style="justify-content: center; text-align: center;">Integración ...</CardSubtitle><br>
                                <Button size="sm" color="primary" href="">enlace</Button>
                                <CardText><hr></CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="4">
                        <Card class="api-wrapper">
                            <CardHeader style="background-color: #008080; color: white; text-decoration-style: solid;">
                                <CardTitle style="justify-content: center; text-align: center;">Borja</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardSubtitle style="justify-content: center; text-align: center;">Integración ...</CardSubtitle><br>
                                <Button size="sm" color="primary" href="">enlace</Button>
                                <CardText><hr></CardText>
                                <CardSubtitle style="justify-content: center; text-align: center;">Integración ...</CardSubtitle><br>
                                <Button size="sm" color="primary" href="">enlace</Button>
                                <CardText><hr></CardText>
                                <CardSubtitle style="justify-content: center; text-align: center;">Integración ...</CardSubtitle><br>
                                <Button size="sm" color="primary" href="">enlace</Button>
                                <CardText><hr></CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="4">
                        <Card class="api-wrapper">
                            <CardHeader style="background-color: #008080; color: white; text-decoration-style: solid;">
                                <CardTitle style="justify-content: center; text-align: center;">Jota</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardSubtitle style="justify-content: center; text-align: center;">Integración ...</CardSubtitle><br>
                                <Button size="sm" color="primary" href="">enlace</Button>
                                <CardText><hr></CardText>
                                <CardSubtitle style="justify-content: center; text-align: center;">Integración ...</CardSubtitle><br>
                                <Button size="sm" color="primary" href="">enlace</Button>
                                <CardText><hr></CardText>
                                <CardSubtitle style="justify-content: center; text-align: center;">Integración ...</CardSubtitle><br>
                                <Button size="sm" color="primary" href="">enlace</Button>
                                <CardText><hr></CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    </main>