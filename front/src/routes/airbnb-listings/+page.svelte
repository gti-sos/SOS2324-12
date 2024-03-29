<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    import { query_selector_all } from 'svelte/internal';
    import { Pagination, PaginationItem, PaginationLink } from '@sveltestrap/sveltestrap';

// Rutas
let API = '/api/v1/airbnb-listings';
if(dev)
    API = 'http://localhost:10000'+API;


// ===============================================
// Variables
// ===============================================

let listings = []; // Data
let showForm = false;
let newListing ={
    listing_id: "",
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
    amenities_list: [
    ],
    price: "",
    minimum_nights_number: "",
    maximum_nights_number: "",
    instant_bookable: ""
};

let error_msg = '';
let success_msg = '';

// Paginacion

let currentPage = 1;
//let totalItems = 0;
const pageSize = 4;
let totalItems = 0;
let pagination = 0;
let valor = -1;



function nextPage(){
    if(pagination!=valor){
        pagination++;
        getListings();
    }
}
function prevPage(){
    if (pagination >= 1){
        pagination--;
        getListings();;
    }
}



// Inicialización

onMount(async () => {
    await getListings();
});

async function getListings() {
    try {
        //let offset = (currentPage - 1) * pageSize;
        let response = await fetch(`${API}?limit=${pageSize}&offset=${pagination*4}`, {
            method: "GET"
        });

        if (response.ok) {
            let data = await response.json();
            listings = data;
            totalItems = data.length;
            console.log(totalItems);
            error_msg = "";
        } else {
            if (response.status == 404) {
                error_msg = "No hay datos en la base de datos";
            } else {
                error_msg = `Error ${response.status}: ${response.statusText}`;
            }
        }
    } catch (error) {
        error_msg = error;
    }
};


async function getInitialListings(){
    try{
        if(listings.length === 0){
            let response = await fetch(API + "/loadInitialData", {
                method: "GET"
            });
        
            if(response.ok){
                getListings();
                success_msg = "Datos iniciales cargados correctamente";
                error_msg = "";
            } else {
                error_msg = "Ya existen datos en la base de datos";
            }
        } else {
            error_msg = "Ya existen datos en la base de datos";
        }
    } catch(error) {
        error_msg = error;
    }
};


async function searchListing() {
    const fromInput = document.getElementById('fromInput').value.trim();
    const toInput = document.getElementById('toInput').value.trim();

    // Convierte los valores de entrada a números enteros
    const from = parseInt(fromInput);
    const to = parseInt(toInput);

    // Verifica si los valores de entrada son números válidos
    if (isNaN(from) || isNaN(to)) {
        error_msg = "Por favor, introduzca años válidos en los campos From y To.";
        return;
    }

    // Construye la URL de búsqueda con los años como parámetros
    let url = `${API}?from=${from}&to=${to}&limit=${pageSize}&offset=${pagination*4}`;

    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            listings = data; 
            success_msg = "Se ha realizado la búsqueda correctamente";
            error_msg = '';
        } else {
            error_msg = "Ha ocurrido un error en la búsqueda";
        }
    } catch (error) {
        error_msg = error;
    }
};

async function createListing(){
    try{
        let response = await fetch(API,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newListing)
        });

        if(response.ok){
            showForm = false;
            getListings();
            success_msg = "Se ha creado correctamente el dato";
            error_msg = "";
        } else {
            if(response.status == 400){
                error_msg = "Hay un error. Todos los datos deben ser introducidos";
            } else if (response.status == 405){
                error_msg = "Este método no está permitido";
            } else if (response.status == 409){
                error_msg = "El elemento introducido ya existe";
            }
        }
    }catch(error){
        error_msg = error;
    }
};

async function deleteAll(){
    try{
        let response = await fetch(API,{
            method: "DELETE"
        });
        if(response.ok){
            await getListings();
            success_msg = "Todos los datos han sido eliminados"
            error_msg = "";
        }else{
            if(response.status == 404){
            error_msg = "No existen datos en la base de datos";
            }
        }
    } catch(error){
        error_msg = error;
    }
};

</script>


<Container class="content-container" style="justify-content: center;"> 
    <!--______________________________________Cabecera_____________________________________-->
    <Container style="justify-content: center; text-align: center;">
            <h1> Datos de alquileres manejados por AirBnB</h1>
    </Container>

    <br/>
<!-- Elementos de entrada para los parámetros de búsqueda -->
<Container style="justify-content: center; text-align: center;">
    <h2> Filtro por años</h2>
    <Row>
        <Col>
            <Input type="number" id="fromInput" placeholder="From"/>
        </Col>
        <Col>
            <Input type="number" id="toInput" placeholder="To"/>
        </Col>
        <Col>
            <Button color="primary" on:click={searchListing}>Buscar</Button>
        </Col>
    </Row>
</Container>


{#if listings && listings.length > 0}
    <!--_______________________________________________Datos_________________________________________________-->
<Container>
    <Row cols={{ xs:2,sm: 3, md: 3, lg: 3, xl:4}}>
        {#each listings as listing}
            <Col class='mb-3'>
                <Card>
                    <CardHeader>
                        <CardTitle>{listing.name}</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <strong>Listing ID:</strong>{listing.listing_id} <br>
                            <strong>Nombre:</strong> {listing.name} <br>
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
                    </CardBody>
                </Card>
            </Col>
        {/each}
    </Row>
</Container>


    {#if showForm}
    <hr class='line'/>
    <Container class='mb-3'>
        <Row cols={{ xs:2,sm: 2, md: 3, lg: 3, xl:3}}>
            <Col class='mb-3'>
                <FormGroup>
                    <Label for="listingId">Listing ID</Label>
                    <Input
                        type="text"
                        id="listingId"
                        name="listingId"
                        placeholder="Escribe un listing ID"
                        bind:value={newListing.listing_id}
                        required
                    />
                </FormGroup>
            </Col>
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
        <Row>
            <Col></Col>
            <Col><Button color="success" on:click={createListing}>Crear</Button></Col>
            <Col></Col>
        </Row>
    </Container>
    
    {/if}

  

    

    {#if error_msg != ""}
    <Alert color="danger">
        <strong>Error:</strong> {error_msg}
    </Alert>
    {:else if success_msg != ""}
    <Alert color="success">
        <strong>Éxito:</strong> {success_msg}
    </Alert>
    {/if}



{:else}
	<p class="container">No hay datos disponibles</p>
{/if}

<hr>
<br>
<!--______________________________________Paginación_____________________________________-->
<Container class="text-center">
    <Row>
        <Col cols={{ xs:6 }}>
            <Button color="info" on:click={prevPage}>Página anterior</Button>
        </Col>
        <Col cols={{ xs:6 }}>
            <Button color="info" on:click={nextPage}>Página siguiente</Button>
        </Col>
    </Row>
</Container>

<hr>
<br>
<!--______________________________________Botones_____________________________________-->
<Container class="text-center">
    <Row>
        <Col cols={{ xs:4 }}>
            <Button color="warning" on:click="{getInitialListings}">Cargar Datos Iniciales</Button>
        </Col>
        <Col cols={{ xs:4 }}>
            <Button color="success" on:click={() => {showForm = true;}}>Crear Nuevo Dato</Button>
        </Col>
        <Col cols={{ xs:4 }}>
            <Button color="danger" on:click="{deleteAll}">Borrar Todos los Datos</Button>
        </Col>
        
    </Row>
</Container>




</Container>
