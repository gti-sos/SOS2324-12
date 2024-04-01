<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    import { query_selector_all } from 'svelte/internal';
    import { Pagination, PaginationItem, PaginationLink } from '@sveltestrap/sveltestrap';
    import Fa from 'svelte-fa';
    import {faTrash, faPencil, faSpinner, faPlus, faFilter, faMagnifyingGlass, faCheck, faXmark, faArrowLeft, faArrowRight, faHouse} from '@fortawesome/free-solid-svg-icons';
    import { faGithub } from '@fortawesome/free-brands-svg-icons';
// Rutas
let API = '/api/v2/airbnb-listings';
if(dev)
    API = 'http://localhost:10000'+API;


// ===============================================
// Variables
// ===============================================

let listings = []; // Data
let showForm = false;
let showFilter = false;
let newListing ={
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
let selectedFilter ={
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
    instant_bookable: "",
};

let error_msg = '';
let success_msg = '';
let success2_msg = '';

let size = "lg";
const toggle = () => {
    size = "lg";
    showFilter = !showFilter;
};
const toggle2 = () => {
    size = "lg";
    showForm = !showForm;
};

// Paginacion

let currentPage = 1;
//let totalItems = 0;
const pageSize = 10;
let totalItems = 0;
let pagination = 0;
let valor = -1;



function nextPage(){
    if(pagination!=valor){
        pagination++;
        getListings();
        window.scrollTo(0, 0);
    }
}
function prevPage(){
    if (pagination >= 1){
        pagination--;
        getListings();;
        window.scrollTo(0, 0);
    }
}



// Inicialización

onMount(async () => {
    await getListings();
    // Temporizador para ocultar automáticamente las alertas después de 5 segundos
    setTimeout(() => {
        error_msg = "";
        success_msg = "";
        success2_msg = "";
    }, 10000);
});

async function getListings() {
    let response = await fetch(`${API}?limit=${pageSize}&offset=${pagination*10}`, {
            method: "GET"
        });
    const status = await response.status;
    if (status == 200){
        let data = await response.json();
        listings = data;
        totalItems = data.length;
        success_msg = "Mostrando datos";
        error_msg = "";
        window.scrollTo(0, 0);
    } else if (status == 404) {
        error_msg = "No hay datos cargados en la base de datos o ya no hay más datos"
        success_msg = "";
        window.scrollTo(0, 0);
    } else if (status == 500) {
        error_msg = "Ha ocurrido un error en el servidor";
        success_msg = "";
        window.scrollTo(0, 0);
    }
};


async function getInitialListings(){
    let response = await fetch(API + "/loadInitialData", {
                method: "GET"
            });
    const status = await response.status;
    if (status == 201){
        getListings();
        success_msg = "Datos iniciales cargados correctamente";
        error_msg = "";
        window.scrollTo(0, 0);
    } else if (status == 200) {
        error_msg = "La base de datos ya está cargada";
        success_msg = "";
        window.scrollTo(0, 0);
    } else if (status == 500){
        error_msg = "Ha ocurrido un error en el servidor"
        success_msg = "";
        window.scrollTo(0, 0);
    }
};


async function searchListings() {
    try {
        // Construye la URL de búsqueda a partir de los filtros proporcionados
        let searchParams = new URLSearchParams();
        if (Object.keys(selectedFilter).length === 0) {
            selectedFilter = {
                name: '',
                host_since: '',
                host_location: '',
                host_response_time: '',
                host_response_rate: '',
                host_acceptance_rate: '',
                neighbourhood: '',
                city: '',
                latitude: '',
                longitude: '',
                property_type: '',
                room_type: '',
                guest_number: '',
                bedroom_number: '',
                amenities_list: '',
                price: '',
                minimum_nights_number: '',
                maximum_nights_number: '',
                instant_bookable: ''
            };
        }
        for (const key in selectedFilter) {
            if (selectedFilter[key] !== '') {
                searchParams.append(key, selectedFilter[key]);
            }
        }
        const yearInput = document.getElementById('yearInput').value.trim();
        const minpriceInput = document.getElementById('minpriceInput').value.trim();
        const maxpriceInput = document.getElementById('maxpriceInput').value.trim();

        // Convierte los valores de entrada a números enteros
        const year = parseInt(yearInput);
        const minprice = parseFloat(minpriceInput);
        const maxprice = parseFloat(maxpriceInput);

        const fromInput = document.getElementById('fromInput').value.trim();
        const toInput = document.getElementById('toInput').value.trim();

        // Convierte los valores de entrada a números enteros
        const from = parseInt(fromInput);
        const to = parseInt(toInput);

        if (year !== '' && !isNaN(year)) {
        searchParams.append('year', year);
        }
        if (minprice !== '' && !isNaN(minprice)) {
            searchParams.append('min_price', minprice);
        }
        if (maxprice !== '' && !isNaN(maxprice)) {
            searchParams.append('max_price', maxprice);
        }
        if (from !== '' && !isNaN(from)) {
            searchParams.append('from', from);
        }
        if (to !== '' && !isNaN(to)) {
            searchParams.append('to', to);
        }
        

        let searchUrl = `${API}?${searchParams.toString()}`;
        console.log(searchUrl);
        // Realiza la petición GET a la API con la URL de búsqueda generada
        let response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Manejo de la respuesta de la API
        let status = response.status;
        console.log(`Response status: ${status}`);

        if (response.status == 200) {
            // Actualiza los datos después de una búsqueda exitosa
            success_msg = "Mostrando los datos solicitados";
            let data = await response.json();
            listings = data;
            console.log(data);
        } else {
            // Manejo de errores
            if (response.status == 400) {
                error_msg = 'Error en la estructura de los datos';
            } else if (response.status == 404) {
                error_msg = 'No se encontraron datos';
            }
        }
    } catch (error) {
        error_msg = error;
        console.log(error);
    }
}


async function createListing(){
    if (!newListing.name || !newListing.host_since || 
    !newListing.host_location || !newListing.host_response_time || !newListing.host_response_rate 
    || !newListing.host_acceptance_rate || !newListing.neighbourhood || !newListing.city || 
    !newListing.latitude || !newListing.longitude || !newListing.property_type || !newListing.room_type || 
    !newListing.guest_number || !newListing.bedroom_number || !newListing.amenities_list || !newListing.price || 
    !newListing.minimum_nights_number || !newListing.maximum_nights_number || !newListing.instant_bookable) {
        error_msg = "Por favor, completa todos los campos.";
        success_msg = "";
        return;
    }
    let response = await fetch(API,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newListing)
        });
    const status = response.status;
    if (status == 201){
        success2_msg = "Se ha creado correctamente el alquiler de nombre "+newListing.name;
        error_msg = "";
        showForm = false;
        await getListings();

    } else if (status == 400){
        error_msg = "Petición invalida. Revisa si has introducido todos los datos";
        success_msg = "";
    } else if (status == 405){
        error_msg = "Este método no está permitido";
        success_msg = "";
    } else if (status == 409){
        error_msg = "El dato introducido ya existe";
        success_msg = "";
    } else if (status == 500){
        error_msg = "Ha ocurrido un error en el servidor";
        success_msg = "";
    }
};

async function deleteAll(){
    let response = await fetch(API,{
            method: "DELETE"
        });
    const status = response.status;
    if (status == 200){
        success2_msg = "Todos los datos han sido eliminados";
        alert("Todos los datos han sido eliminados");
        error_msg = "";
        window.location.reload();
    } else if (status == 204) {
        error_msg = "No se encontraron datos para eliminar, es posible que la base de datos esté vacía";
        success_msg = "";
        window.scrollTo(0, 0);

    } else if (status == 500) {
        error_msg = "Ha ocurrido un error en el servidor";
        success_msg = "";
        window.scrollTo(0, 0);
    }
};

async function deleteListing(lat,lon){
    let response = await fetch(API + "/" + lat + "/" + lon,{
            method: "DELETE"
        });
    const status = response.status;
    if (status == 200){
        success2_msg = "El recurso con latitud "+lat+" y longitud "+lon+" ha sido eliminado";
        error_msg = "";
        getListings();
        window.scrollTo(0, 0);
    } else if (status == 204) {
        error_msg = "No se encontró ningún recurso con la latitud y longitud especificadas";
        success_msg = "";
        window.scrollTo(0, 0);
    } else if (status == 500) {
        error_msg = "Ha ocurrido un error en el servidor";
        success_msg = "";
        window.scrollTo(0, 0);
    }
};

</script>


<Container class="content-container" style="justify-content: center;"> 
    <!--______________________________________Cabecera_____________________________________-->
    <Container style="justify-content: center; text-align: center;">
            <h1> Datos de alquileres manejados por AirBnB</h1>
            <img src="/logo-airbnb.png" alt="logo-airbnb" class="centered-image">
    </Container>

    <br/>
<!--______________________________________Botones_____________________________________-->
<Container class="text-center">
    <Row>
        <Col cols={{ xs:4 }}>
            <Button color="warning" on:click="{getInitialListings}"><Fa icon={faSpinner}/> Cargar Datos Iniciales</Button>
        </Col>
        <Col cols={{ xs:4 }}>
            <Button color="success" on:click={() => {showForm = true;}}><Fa icon={faPlus}/> Crear Nuevo Dato</Button>
        </Col>
        <Col cols={{ xs:4 }}>
            <Button color="danger" on:click="{deleteAll}"><Fa icon={faTrash}/> Borrar Todos los Datos</Button>
        </Col>
        <Col>
            <Button color="primary" on:click={() => {showFilter = true;}}><Fa icon={faFilter}/> Filtros</Button>
        </Col>
    </Row>
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

<br>
<hr>

    <!-- Bloque condicional if con modal -->
    
    {#if showFilter}
    <Modal isOpen={showFilter} {toggle} {size}>
        <ModalHeader {toggle}>Filtrar datos</ModalHeader>
        <ModalBody>
            
            <form on:submit|preventDefault={searchListings}>
                <Container fluid>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="name">Nombre</Label>
                                <Input type="text" id="name" bind:value={selectedFilter.name} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="hostSince">Fecha de registro del anfitrión</Label>
                                <Input type="text" id="hostSince" bind:value={selectedFilter.host_since} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="hostLocation">Ubicación del anfitrión</Label>
                                <Input type="text" id="hostLocation" bind:value={selectedFilter.host_location} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="responseTime">Tiempo de respuesta</Label>
                                <Input type="text" id="responseTime" bind:value={selectedFilter.response_time} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="responseRate">Tasa de respuesta</Label>
                                <Input type="number" id="responseRate" bind:value={selectedFilter.response_rate} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="acceptanceRate">Tasa de aceptación</Label>
                                <Input type="number" id="acceptanceRate" bind:value={selectedFilter.acceptance_rate} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="neighbourhood">Barrio</Label>
                                <Input type="text" id="neighbourhood" bind:value={selectedFilter.neighbourhood} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="city">Ciudad</Label>
                                <Input type="text" id="city" bind:value={selectedFilter.city} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="latitude">Latitud</Label>
                                <Input type="number" id="latitude" bind:value={selectedFilter.latitude} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="longitude">Longitud</Label>
                                <Input type="number" id="longitude" bind:value={selectedFilter.longitude} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="propertyType">Tipo de propiedad</Label>
                                <Input type="text" id="propertyType" bind:value={selectedFilter.property_type} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="roomType">Tipo de habitación</Label>
                                <Input type="text" id="roomType" bind:value={selectedFilter.room_type} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="guestNumber">Número de huéspedes</Label>
                                <Input type="number" id="guestNumber" bind:value={selectedFilter.guest_number} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="bedroomNumber">Número de habitaciones</Label>
                                <Input type="number" id="bedroomNumber" bind:value={selectedFilter.bedroom_number} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="amenitiesList">Lista de comodidades</Label>
                                <Input type="text" id="amenitiesList" bind:value={selectedFilter.amenities_list} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="price">Precio</Label>
                                <Input type="number" id="price" bind:value={selectedFilter.price} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="minimumNights">Número de noches mínimas</Label>
                                <Input type="number" id="minimumNights" bind:value={selectedFilter.minimum_nights} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="maximumNights">Número de noches máximas</Label>
                                <Input type="number" id="maximumNights" bind:value={selectedFilter.maximum_nights} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="instantBookable">Reserva instantánea</Label>
                                <Input type="text" id="instantBookable" bind:checked={selectedFilter.instant_bookable} />
                            </FormGroup>
                        </Col>
                    </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="year">Año (extraído de fecha)</Label>
                            <Input type="number" id="yearInput"/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="min_price">Precio mínimo</Label>
                            <Input type="number" id="minpriceInput"/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="max_price">Precio máximo</Label>
                            <Input type="number" id="maxpriceInput"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="from">Desde (año)</Label>
                            <Input type="number" id="fromInput"/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="to">Hasta (año)</Label>
                            <Input type="number" id="toInput"/>
                        </FormGroup>
                    </Col>
                </Row>
                </Container>
            </form>
        </ModalBody>
        <ModalFooter>
            <Container style="justify-content: center; text-align: center;">
          <Button color="primary" on:click={searchListings}><Fa icon={faCheck}/> Aplicar filtros</Button>
          <Button color="secondary" on:click={toggle}><Fa icon={faXmark}/> Cerrar</Button>
            </Container>
        </ModalFooter>
        <Container>
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
        </Container>
      </Modal>
    {/if}

    {#if showForm}
    <Modal isOpen={showForm} {toggle2} {size}>
        <ModalHeader {toggle2}>Crear dato</ModalHeader>
        <ModalBody>
            
            <Container class='mb-3'>
                <Row cols={{ xs:2,sm: 2, md: 3, lg: 3, xl:3}}>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="name">Nombre</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Escribe un nombre"
                                bind:value={newListing.name}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="hostSince">Fecha de registro de anfitrión</Label>
                            <Input
                                type="date"
                                id="hostSince"
                                name="hostSince"
                                bind:value={newListing.host_since}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="hostLocation">Ubicación del anfitrión</Label>
                            <Input
                                type="text"
                                id="hostLocation"
                                name="hostLocation"
                                placeholder="Escribe una ubicación"
                                bind:value={newListing.host_location}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="responseTime">Tiempo de respuesta del anfitrión</Label>
                            <Input
                                type="text"
                                id="responseTime"
                                name="responseTime"
                                placeholder="Escribe un tiempo de respuesta"
                                bind:value={newListing.host_response_time}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="responseRate">Tasa de respuesta del anfitrión</Label>
                            <Input
                                type="number"
                                id="responseRate"
                                name="responseRate"
                                placeholder="Escribe una tasa de respuesta"
                                bind:value={newListing.host_response_rate}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="acceptanceRate">Tasa de aceptación del anfitrión</Label>
                            <Input
                                type="number"
                                id="acceptanceRate"
                                name="acceptanceRate"
                                placeholder="Escribe una tasa de aceptación"
                                bind:value={newListing.host_acceptance_rate}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="neighbourhood">Barrio</Label>
                            <Input
                                type="text"
                                id="neighbourhood"
                                name="neighbourhood"
                                placeholder="Escribe un barrio"
                                bind:value={newListing.neighbourhood}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="city">Ciudad</Label>
                            <Input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Escribe una ciudad"
                                bind:value={newListing.city}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="latitude">Latitud</Label>
                            <Input
                                type="number"
                                id="latitude"
                                name="latitude"
                                placeholder="Escribe una latitud"
                                bind:value={newListing.latitude}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="longitude">Longitud</Label>
                            <Input
                                type="number"
                                id="longitude"
                                name="longitude"
                                placeholder="Escribe una longitud"
                                bind:value={newListing.longitude}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="propertyType">Tipo de propiedad</Label>
                            <Input
                                type="text"
                                id="propertyType"
                                name="propertyType"
                                placeholder="Escribe un tipo de propiedad"
                                bind:value={newListing.property_type}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="roomType">Tipo de habitación</Label>
                            <Input
                                type="text"
                                id="roomType"
                                name="roomType"
                                placeholder="Escribe un tipo de habitación"
                                bind:value={newListing.room_type}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="guestNumber">Número de huéspedes</Label>
                            <Input
                                type="number"
                                id="guestNumber"
                                name="guestNumber"
                                placeholder="Escribe un número de huéspedes"
                                bind:value={newListing.guest_number}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="bedroomNumber">Número de habitaciones</Label>
                            <Input
                                type="number"
                                id="bedroomNumber"
                                name="bedroomNumber"
                                placeholder="Escribe un número de habitaciones"
                                bind:value={newListing.bedroom_number}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="amenitiesList">Lista de comodidades</Label>
                            <Input
                                type="text"
                                id="amenitiesList"
                                name="amenitiesList"
                                placeholder="Escribe una lista de comodidades"
                                bind:value={newListing.amenities_list}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="price">Precio</Label>
                            <Input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Escribe un precio"
                                bind:value={newListing.price}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="minimumNights">Número mínimo de noches</Label>
                            <Input
                                type="number"
                                id="minimumNights"
                                name="minimumNights"
                                placeholder="Escribe un número mínimo de noches"
                                bind:value={newListing.minimum_nights_number}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="maximumNights">Número máximo de noches</Label>
                            <Input
                                type="number"
                                id="maximumNights"
                                name="maximumNights"
                                placeholder="Escribe un número máximo de noches"
                                bind:value={newListing.maximum_nights_number}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="instantBookable">¿Reserva instantánea?</Label>
                            <Input
                                type="checkbox"
                                id="instantBookable"
                                name="instantBookable"
                                bind:checked={newListing.instant_bookable}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Container>
        </ModalBody>
        <ModalFooter>
            <Container style="justify-content: center; text-align: center;">
            <Button color="success" on:click={createListing}><Fa icon={faCheck}/> Crear</Button>
            <Button color="secondary" on:click={toggle2}><Fa icon={faXmark}/> Cerrar</Button>
            </Container>
        </ModalFooter>
        <Container>
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
        </Container>
    </Modal>
    
    {/if}

{#if listings && listings.length > 0}
    <!--_______________________________________________Datos_________________________________________________-->
<Container>
    
    <!-- AQUI SE MUESTRAN LOS DATOS -->
    <Row cols={{ xs:2,sm: 3, md: 3, lg: 3, xl:4}}>
        {#each listings as listing}
            <Col class='mb-3'>
                <Card>
                    <CardHeader style="background-color: #008080; color: white; text-decoration-style: solid;">
                        <CardTitle><Fa icon={faHouse}/> {listing.name}</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <strong>Fecha de registro de anfitrión:</strong> {listing.host_since} <br>
                            <strong>Ubicación del anfitrión:</strong> {listing.host_location} <br>
                            <strong>Tiempo de respuesta del anfitrión:</strong> {listing.host_response_time} <br>
                            <strong>Tasa de respuesta del anfitrión:</strong> {listing.host_response_rate} <br>
                            <strong>Tasa de aceptación del anfitrión:</strong> {listing.host_acceptance_rate} <br>
                            <strong>Barrio: </strong>{listing.neighbourhood} <br>
                            <strong>Ciudad:</strong> {listing.city} <br>
                            <strong>Latitud:</strong> {listing.latitude} <br>
                            <strong>Longitud: </strong>{listing.longitude} <br>
                            <strong>Tipo de propiedad:</strong> {listing.property_type} <br>
                            <strong>Tipo de habitación:</strong> {listing.room_type} <br>
                            <strong>Número de huéspedes:</strong> {listing.guest_number} <br>
                            <strong>Número de habitaciones:</strong> {listing.bedroom_number} <br>
                            <strong>Lista de comodidades:</strong> {listing.amenities_list} <br>
                            <strong>Precio:</strong> {listing.price} <br>
                            <strong>Número mínimo de noches: </strong>{listing.minimum_nights_number} <br>
                            <strong>Número máximo de noches:</strong> {listing.maximum_nights_number} <br>
                            <strong>¿Reserva instantánea?: </strong>{listing.instant_bookable ? "Sí" : "No"} <br>
                        </CardText>
                        <Container style="justify-content: center; text-align: center;">
                        <Button color="danger" on:click={() => deleteListing(listing.latitude, listing.longitude)}><Fa icon={faTrash}/> Borrar</Button>
                        <Button color="warning" on:click={() => { window.location.href = `airbnb-listings/${listing.latitude}/${listing.longitude}` }}>
                            <Fa icon={faPencil}/> Editar
                        </Button>
                        </Container>
                    </CardBody>
                </Card>
            </Col>
        {/each}
    </Row>
</Container>


{:else}
	<p class="container">No hay datos disponibles</p>
{/if}

<hr>
<!--______________________________________Paginación_____________________________________-->
<Container class="text-center">
    <Row>
        <Col cols={{ xs:6 }}>
            <Button color="info" on:click={prevPage}><Fa icon={faArrowLeft}/> Página anterior</Button>
        </Col>
        <Col cols={{ xs:6 }}>
            <Button color="info" on:click={nextPage}>Página siguiente <Fa icon={faArrowRight}/></Button>
        </Col>
    </Row>
</Container>

<hr>
<br>





</Container>
