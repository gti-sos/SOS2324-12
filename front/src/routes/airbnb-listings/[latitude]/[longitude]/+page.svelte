<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Table, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    import { query_selector_all } from 'svelte/internal';
    import { Pagination, PaginationItem, PaginationLink } from '@sveltestrap/sveltestrap';
    import { page } from '$app/stores'; 
    import {faTrash, faPencil, faSpinner, faPlus, faFilter, faMagnifyingGlass, faCheck, faXmark, faArrowLeft, faArrowRight, faLongArrowLeft} from '@fortawesome/free-solid-svg-icons';
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
                success2_msg = "El dato con latitud "+latitude+" y longitud "+longitude+" se ha actuallizado correctamente";
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
        <!--______________________________________Cabecera_____________________________________-->
        <Container style="justify-content: center; text-align: center;">
                <h1> Datos del recurso</h1>
        </Container>
    
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
    
    <Container class="mb-3">
        <Row>
            <Col class="text-center">
                <h1>
                    Editar recurso
                </h1>
            </Col>
            <br>
            <Row class="text-center">
                <Button color="success" on:click={() => { window.location.href = `/airbnb-listings/`}}><Fa icon={faLongArrowLeft}/> Volver</Button>
            </Row>
            <br>
            <hr>
            <Row cols={{ xs:2,sm: 2, md: 3, lg: 3, xl:3}}>
                            <Col class='mb-3'>
                            <FormGroup>
                                <Label for="nombre">Nombre</Label>
                                <Input id="nombre" bind:value={updatedListing.name} placeholder="Nuevo nombre"/>
                            </FormGroup>
                            </Col>
                            <Col class='mb-3'>
                            <FormGroup>
                                <Label for="fechaRegistro">Fecha de registro de anfitrión</Label>
                                <Input type="date" id="fechaRegistro" bind:value={updatedListing.host_since} placeholder="Nueva fecha de registro de anfitrión"/>
                            </FormGroup>
                            </Col>
                            <Col class='mb-3'>
                            <FormGroup>
                                <Label for="ubicacionAnfitrion">Ubicación del anfitrión</Label>
                                <Input id="ubicacionAnfitrion" bind:value={updatedListing.host_location} placeholder="Nueva ubicación del anfitrión"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="respuestaTiempo">Tiempo de respuesta del anfitrión</Label>
                                <Input id="respuestaTiempo" bind:value={updatedListing.host_response_time} placeholder="Nuevo tiempo de respuesta del anfitrión"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="tasaRespuesta">Tasa de respuesta del anfitrión</Label>
                                <Input id="tasaRespuesta" bind:value={updatedListing.host_response_rate} placeholder="Nueva tasa de respuesta del anfitrión"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="tasaAceptacion">Tasa de aceptación del anfitrión</Label>
                                <Input id="tasaAceptacion" bind:value={updatedListing.host_acceptance_rate} placeholder="Nueva tasa de aceptación del anfitrión"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="barrio">Barrio</Label>
                                <Input id="barrio" bind:value={updatedListing.neighbourhood} placeholder="Nuevo barrio"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="ciudad">Ciudad</Label>
                                <Input id="ciudad" bind:value={updatedListing.city} placeholder="Nueva ciudad"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="latitud">Latitud</Label>
                                <Input type="number" id="latitud" bind:value={updatedListing.latitude} placeholder="Nueva latitud"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="longitud">Longitud</Label>
                                <Input type="number" id="longitud" bind:value={updatedListing.longitude} placeholder="Nueva longitud"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="tipoPropiedad">Tipo de propiedad</Label>
                                <Input id="tipoPropiedad" bind:value={updatedListing.property_type} placeholder="Nuevo tipo de propiedad"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="tipoHabitacion">Tipo de habitación</Label>
                                <Input id="tipoHabitacion" bind:value={updatedListing.room_type} placeholder="Nuevo tipo de habitación"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="numHuespedes">Número de huéspedes</Label>
                                <Input type="number" id="numHuespedes" bind:value={updatedListing.guest_number} placeholder="Nuevo número de huéspedes"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="numHabitaciones">Número de habitaciones</Label>
                                <Input type="number" id="numHabitaciones" bind:value={updatedListing.bedroom_number} placeholder="Nuevo número de habitaciones"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="comodidades">Lista de comodidades</Label>
                                <Input id="comodidades" bind:value={updatedListing.amenities_list} placeholder="Nueva lista de comodidades"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="precio">Precio</Label>
                                <Input type="number" id="precio" bind:value={updatedListing.price} placeholder="Nuevo precio"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="numMinNoches">Número mínimo de noches</Label>
                                <Input type="number" id="numMinNoches" bind:value={updatedListing.minimum_nights_number} placeholder="Nuevo número mínimo de noches"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="numMaxNoches">Número máximo de noches</Label>
                                <Input type="number" id="numMaxNoches" bind:value={updatedListing.maximum_nights_number} placeholder="Nuevo número máximo de noches"/>
                            </FormGroup>
                        </Col>
                        <Col class='mb-3'>
                            <FormGroup>
                                <Label for="reservaInstantanea">¿Reserva instantánea?</Label>
                                <Input id="reservaInstantanea" bind:value={updatedListing.instant_bookable} placeholder="Nueva reserva instantánea"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Col class="text-center">
                        <Button color="primary" on:click={updateResource}><Fa icon={faCheck}/> Actualizar</Button>
                    </Col>
        </Row>
    </Container>
    </Container>
</main>

