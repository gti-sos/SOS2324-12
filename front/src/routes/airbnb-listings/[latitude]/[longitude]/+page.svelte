<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Table, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    import { page } from '$app/stores'; 
    import {faCalendar, faLocationPin, faClock, faWaveSquare, faBuilding, faCity, faGlobe, faList, faBed, faPerson, faEuro, faMoon, faKitchenSet, faBook, faHouse, faCheck, faLongArrowLeft} from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';


    // Rutas
    let API = '/api/v2/airbnb-listings';
    if(dev)
        API = 'http://localhost:10000'+API;
    
    let success_msg = "";
    let success2_msg = "";
    let error_msg = "";
    let dato = {};
    let latitude = $page.params.latitude;
    let longitude = $page.params.longitude;

    let updatedListing ={
    name: "",
    host_since: "",
    host_location: "",
    host_response_time: "",
    host_response_rate: "",
    host_acceptance_rate: "",
    neighbourhood: "",
    city: "",
    latitude: "",
    longitude: "",
    property_type: "",
    room_type: "",
    guest_number: "",
    bedroom_number: "",
    amenities_list: "",
    price: "",
    minimum_nights_number: "",
    maximum_nights_number: "",
    instant_bookable: ""
    };


    onMount(async () => {
            getResource();
            // Temporizador para ocultar automáticamente las alertas después de 5 segundos
            setTimeout(() => {
                error_msg = "";
                success_msg = "";
                success2_msg = "";
            }, 10000);
                });

    async function getResource(){
        const response = await fetch(API+`/${latitude}/${longitude}`,{
                                        method: "GET"               
            }); 
        try{    
        const data = await response.json();
        updatedListing = {...data};
        }catch(error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await response.status;
        if (status == 404){
            error_msg = "No existe el dato solicitado";
            success_msg = "";
            window.scrollTo(0, 0);
        } else if (status == 200){
            success_msg = "Este es el dato solicitado";
            error_msg = "";
            window.scrollTo(0, 0);
        } else if (status == 500){
            error_msg = "Ha ocurrido un error en el servidor";
            success_msg = "";
            window.scrollTo(0, 0);
        }
    };

    async function updateResource(){
    if( updatedListing.name === "" || 
        updatedListing.host_since === "" || 
        updatedListing.host_location === "" || 
        updatedListing.host_response_time === "" || 
        updatedListing.host_response_rate === "" || 
        updatedListing.host_acceptance_rate === "" || 
        updatedListing.neighbourhood === "" || 
        updatedListing.city === "" || 
        updatedListing.latitude === "" || 
        updatedListing.longitude === "" || 
        updatedListing.property_type === "" || 
        updatedListing.room_type === "" || 
        updatedListing.guest_number === "" || 
        updatedListing.bedroom_number === "" || 
        updatedListing.amenities_list === "" || 
        updatedListing.price === "" || 
        updatedListing.minimum_nights_number === "" || 
        updatedListing.maximum_nights_number === "" || 
        updatedListing.instant_bookable === "") {
            error_msg = "No se puede actualizar si el dato no se pasa completo";
            window.scrollTo(0, 0);
        } else {
            const response = await fetch(API+`/${latitude}/${longitude}`, {
                method: 'PUT',
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(updatedListing)
            });
            const status = await response.status;
            if (status == 200){
                getResource();
                success2_msg = "El dato con latitud "+latitude+" y longitud "+longitude+" se ha actualizado correctamente";
                error_msg = "";
                window.scrollTo(0, 0);
            } else if (status == 404){
                error_msg = "El dato con latitud "+latitude+" y longitud "+longitude+" no existe en la base de datos";
                success_msg = "";
                window.scrollTo(0, 0);
            } else if (status == 400){
                error_msg = "Hay algún dato que no se ha obtenido correctamente, vuelva a intentarlo";
                success_msg = "";
                window.scrollTo(0, 0);
            }
        }
    };
</script>
<main>
    <Container class="content-container" style="justify-content: center;"> 
        
    
        <br/>

        {#if error_msg != ""}
        <Alert color="danger">
            <strong>Error:</strong> {error_msg}
        </Alert>
        {:else if success_msg != ""}
        <Alert color="success">
            <strong>Éxito:</strong> {success_msg}
        </Alert>
        
        {/if}
        {#if success2_msg != ""}
        <Alert color="success">
            <strong>Éxito:</strong> {success2_msg}
        </Alert>
        {/if}

        {#if updatedListing.latitude !== undefined}
        <!--______________________________________Cabecera_____________________________________-->
        <Container style="justify-content: center; text-align: center;">
            <h1> Datos del recurso</h1>
    </Container>
    <Container fluid>
        <Row>
            <Col>
                <Card>
                    <CardHeader style="background-color: #008080; color: white; text-decoration-style: solid; justify-content: center; text-align: center;">
                        <CardTitle><Fa icon={faHouse}/> {updatedListing.name}</CardTitle>
                    </CardHeader>
                    <CardBody class='tarjetas-datos-edit'>
                        <CardText>
                            <Row>
                                <Col class='mb-3'>
                                    <strong>Fecha de registro del anfitrión: </strong>{updatedListing.host_since}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Ubicación del anfitrión: </strong>{updatedListing.host_location}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Tiempo de respuesta del anfitrión: </strong>{updatedListing.host_response_time}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Tasa de respuesta del anfitrión: </strong>{updatedListing.host_response_rate}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Tasa de aceptación del anfitrión: </strong>{updatedListing.host_acceptance_rate}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Barrio: </strong>{updatedListing.neighbourhood}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Ciudad: </strong>{updatedListing.city}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Latitud: </strong>{updatedListing.latitude}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Longitud: </strong>{updatedListing.longitude}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Tipo de propiedad: </strong>{updatedListing.property_type}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Tipo de habitación: </strong>{updatedListing.room_type}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Número de huéspedes: </strong>{updatedListing.guest_number}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Número de habitaciones: </strong>{updatedListing.bedroom_number}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Lista de comodidades: </strong>
                                    {updatedListing.amenities_list}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Precio: </strong>{updatedListing.price}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Número mínimo de noches: </strong>{updatedListing.minimum_nights_number}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>Número máximo de noches: </strong>{updatedListing.maximum_nights_number}
                                </Col>
                                <Col class='mb-3'>
                                    <strong>¿Reserva instantánea? </strong>{updatedListing.instant_bookable ? "Sí" : "No"} 
                                </Col>
                            </Row>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
    <hr>
    <Container class="mb-3">
        <Row>
            <Col class="text-center" id="editar">
                <h1>
                    Editar recurso
                </h1>
            </Col>
            <br>
            <hr>
            <Row class="text-center">
                <Button color="success" on:click={() => { window.location.href = `/airbnb-listings/`}}><Fa icon={faLongArrowLeft}/> Volver</Button>
            </Row>
            <br>
            <hr>
            <Row cols={{ xs:2,sm: 2, md: 3, lg: 3, xl:3}}>
                            <Col class='mb-3'>
                            <FormGroup>
                                <Label for="nombre"><Fa icon={faHouse}/> Nombre</Label>
                                <Input id="nombre" invalid={!updatedListing.name} bind:value={updatedListing.name} placeholder="Nuevo nombre"/>
                            </FormGroup>
                            </Col>
                            <Col class='mb-3'>
                            <FormGroup>
                                <Label for="fechaRegistro"><Fa icon={faCalendar}/> Fecha de registro de anfitrión</Label>
                                <Input type="text" id="fechaRegistro" invalid={!updatedListing.host_since} bind:value={updatedListing.host_since} placeholder="Nueva fecha de registro de anfitrión"/>
                            </FormGroup>
                            </Col>
                            <Col class='mb-3'>
                            <FormGroup>
                                <Label for="ubicacionAnfitrion"><Fa icon={faLocationPin}/> Ubicación del anfitrión</Label>
                                <Input id="ubicacionAnfitrion" invalid={!updatedListing.host_location} bind:value={updatedListing.host_location} placeholder="Nueva ubicación del anfitrión"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="respuestaTiempo"><Fa icon={faClock}/> Tiempo de respuesta del anfitrión</Label>
                                <Input type="select" 
                                    id="respuestaTiempo" 
                                    name="respuestaTiempo"
                                    placeholder="Nuevo tiempo de respuesta"
                                    bind:value={updatedListing.host_response_time}
                                    invalid={!updatedListing.host_response_time}
                                    required>
                                {#each ["within an hour","within a few hours","within a day","a few days or more"] as option}
                                    <option>{option}</option>
                                {/each}
                            </Input>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="tasaRespuesta"><Fa icon={faWaveSquare}/> Tasa de respuesta del anfitrión</Label>
                                <Input id="tasaRespuesta" invalid={!updatedListing.host_response_rate} bind:value={updatedListing.host_response_rate} placeholder="Nueva tasa de respuesta del anfitrión" min="0" max="1" step="0.01"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="tasaAceptacion"><Fa icon={faWaveSquare}/> Tasa de aceptación del anfitrión</Label>
                                <Input id="tasaAceptacion" invalid={!updatedListing.host_acceptance_rate} bind:value={updatedListing.host_acceptance_rate} placeholder="Nueva tasa de aceptación del anfitrión" min="0" max="1" step="0.01"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="barrio"><Fa icon={faBuilding}/> Barrio</Label>
                                <Input id="barrio" invalid={!updatedListing.neighbourhood} bind:value={updatedListing.neighbourhood} placeholder="Nuevo barrio"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="ciudad"><Fa icon={faCity}/> Ciudad</Label>
                                <Input id="ciudad" invalid={!updatedListing.city} bind:value={updatedListing.city} placeholder="Nueva ciudad"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="latitud"><Fa icon={faGlobe}/> Latitud</Label>
                                <Input type="number" id="latitud" invalid={!updatedListing.latitude} bind:value={updatedListing.latitude} placeholder="Nueva latitud"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="longitud"><Fa icon={faGlobe}/> Longitud</Label>
                                <Input type="number" id="longitud" invalid={!updatedListing.longitude} bind:value={updatedListing.longitude} placeholder="Nueva longitud"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="tipoPropiedad"><Fa icon={faList}/> Tipo de propiedad</Label>
                                <Input type="select" 
                                    id="tipoPropiedad" 
                                    name="tipoPropiedad"
                                    bind:value={updatedListing.property_type}
                                    invalid={!updatedListing.property_type}
                                    required>
                                {#each ["Entire apartment","Private room in apartment","Private room in house","Entire house","Entire condominium"] as option}
                                    <option>{option}</option>
                                {/each}
                            </Input>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="tipoHabitacion"><Fa icon={faBed}/> Tipo de habitación</Label>
                                <Input type="select" 
                                    id="tipoHabitacion" 
                                    name="tipoHabitacion"
                                    bind:value={updatedListing.room_type}
                                    invalid={!updatedListing.room_type}
                                    required>
                                {#each ["Entire place","Private room","Hotel room","Shared room"] as option}
                                    <option>{option}</option>
                                {/each}
                            </Input>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="numHuespedes"><Fa icon={faPerson}/> Número de huéspedes</Label>
                                <Input type="number" id="numHuespedes" invalid={!updatedListing.guest_number} bind:value={updatedListing.guest_number} placeholder="Nuevo número de huéspedes" min="1"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="numHabitaciones"><Fa icon={faBed}/> Número de habitaciones</Label>
                                <Input type="number" id="numHabitaciones" invalid={!updatedListing.bedroom_number} bind:value={updatedListing.bedroom_number} placeholder="Nuevo número de habitaciones" min="1"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="comodidades"><Fa icon={faKitchenSet}/> Lista de comodidades</Label>
                                <Input id="comodidades" invalid={!updatedListing.amenities_list} bind:value={updatedListing.amenities_list} placeholder="Nueva lista de comodidades"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="precio"><Fa icon={faEuro}/> Precio</Label>
                                <Input type="number" id="precio" invalid={!updatedListing.price} bind:value={updatedListing.price} placeholder="Nuevo precio" min="1"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="numMinNoches"><Fa icon={faMoon}/> Número mínimo de noches</Label>
                                <Input type="number" id="numMinNoches" invalid={!updatedListing.minimum_nights_number} bind:value={updatedListing.minimum_nights_number} placeholder="Nuevo número mínimo de noches" min="1"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="numMaxNoches"><Fa icon={faMoon}/> Número máximo de noches</Label>
                                <Input type="number" id="numMaxNoches" invalid={!updatedListing.maximum_nights_number} bind:value={updatedListing.maximum_nights_number} placeholder="Nuevo número máximo de noches" min="1"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="reservaInstantanea"><Fa icon={faBook}/> ¿Reserva instantánea?</Label>
                                <Input type="select" 
                                        id="reservaInstantanea" 
                                        name="reservaInstantanea"
                                        bind:value={updatedListing.instant_bookable}
                                        invalid={!updatedListing.instant_bookable}
                                        required>
                                    {#each ["TRUE","FALSE"] as option}
                                        <option>{option}</option>
                                    {/each}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Col class="text-center">
                        <Button color="primary" on:click={updateResource}><Fa icon={faCheck}/> Actualizar</Button>
                    </Col>
        </Row>
    </Container>
        {/if}
    
    </Container>
</main>

