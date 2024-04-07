<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    import { Pagination, PaginationItem, PaginationLink } from '@sveltestrap/sveltestrap';
    import Fa from 'svelte-fa';
    import {faTrash, faPencil, faSpinner, faPlus, faFilter, faCheck, faXmark, faArrowLeft, faArrowRight, faHouse, faAngleDoubleLeft, faAngleDoubleRight, faList} from '@fortawesome/free-solid-svg-icons';
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
let confirmModal = false;

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
let year = "";
let minprice = "";
let maxprice = "";
let from = "";
let to = "";

let error_msg = '';
let success_msg = '';
let success2_msg = '';
let success3_msg = '';


let size = "lg";
const toggle = () => {
    size = "lg";
    showFilter = !showFilter;
};
const toggle2 = () => {
    size = "lg";
    showForm = !showForm;
};
const toggle3 = () => {
    size = "lg";
    confirmModal = !confirmModal;
};


// Paginacion

let currentPage = 1;
//let totalItems = 0;
const pageSize = 10;
let totalItems = 0;
let pagination = 0;
let valor = -1;

function firstPage() {
    pagination = 0;
    getListings();
    window.scrollTo(0, 0);
}

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

function lastPage(){
    pagination = valor;
    getListings();
}

async function countData(){
    const response = await fetch(API, {
        method: 'GET'
    });
    const data = await response.json();
    let numElements = Array.isArray(data) ? data.length : 0;
    let last_page = Math.floor(numElements/10);
    valor = last_page;
}


// Inicialización

onMount(async () => {
    await getListings();
    // Temporizador para ocultar automáticamente las alertas después de 10 segundos
    setTimeout(() => {
        error_msg = "";
        success_msg = "";
        success2_msg = "";
    }, 10000);
});


async function getInitialListings(){
    let response = await fetch(API + "/loadInitialData", {
                method: "GET"
            });
    const status = await response.status;
    if (status == 201){
        getListings();
        success2_msg = "Datos iniciales cargados correctamente";
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

async function getListings() {
    // Construye los parámetros de búsqueda
    let searchParams = new URLSearchParams();
    for (const key in selectedFilter) {
        if (selectedFilter[key] !== '') {
            searchParams.append(key, selectedFilter[key]);
        }
    }
    searchParams.append('limit', pageSize);
    searchParams.append('offset', pagination * pageSize);
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

    // Realiza la solicitud a la API con los parámetros de búsqueda
    let searchUrl = `${API}?${searchParams.toString()}`;
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
        error_msg = "";
        let data = await response.json();
        listings = data;
        cities = await fetchCities();
        host_locations = await fetchHostlocations();
        neighs = await fetchNeigh();
        window.scrollTo(0, 0);
        console.log(data);
    } else {
        // Manejo de errores
        if (response.status == 400) {
            error_msg = 'Error en la estructura de los datos';
            success2_msg = "";
            success_msg = "";
            window.scrollTo(0, 0);
        } else if (response.status == 404) {
            error_msg = 'No se encontraron datos';
            success2_msg = "";
            success_msg = "";
            window.scrollTo(0, 0);
        } else if (status == 500) {
            error_msg = "Ha ocurrido un error en el servidor";
            success_msg = "";
            success2_msg = "";
            window.scrollTo(0, 0);
    }
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
        
        // Agrega los parámetros de paginación a los filtros
        pagination = 0;
        searchParams.append('limit', pageSize);
        searchParams.append('offset', pagination * pageSize);

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
            error_msg = "";
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
};

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
        success3_msg = "Todos los datos han sido eliminados. Recargando página...";
        error_msg = "";
        setTimeout(() => {
            window.location.reload();
            }, 3000); // Espera de 3 segundos (3000 milisegundos)
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

async function cleanFilter(){
            selectedFilter.name= "",
            selectedFilter.host_since= "",
            selectedFilter.host_location= "",
            selectedFilter.host_response_time= "",
            selectedFilter.host_response_rate= "",
            selectedFilter.host_acceptance_rate= "",
            selectedFilter.neighbourhood= "",
            selectedFilter.city= "",
            selectedFilter.latitude= "",
            selectedFilter.longitude= "",
            selectedFilter.property_type= "",
            selectedFilter.room_type= "",
            selectedFilter.guest_number= "",
            selectedFilter.bedroom_number= "",
            selectedFilter.amenities_list= "",
            selectedFilter.price= "",
            selectedFilter.minimum_nights_number= "",
            selectedFilter.maximum_nights_number= "",
            selectedFilter.instant_bookable= "",
            year = "",
            minprice = "",
            maxprice = "",
            from = "",
            to = "",
            pagination = 0;
            success2_msg = "Filtros limpiados correctamente";
            error_msg = "";
            success_msg = "";
            getListings();
};

let cities = [];
let host_locations = [];
let neighs = [];
async function loadCities() {
    cities = await fetchCities(); // Obtener las ciudades cuando se carga el componente
}

async function fetchCities() {
  try {
    const response = await fetch(API,{
        method: "GET"});
    if (!response.ok) {
      throw new Error('Error al obtener las ciudades');
    }
    const data = await response.json();
    const cities = [...new Set(data.map(resource => resource.city))];
    return cities;
  } catch (error) {
    console.error('Error al obtener las ciudades:', error.message);
    return [];
  }
}
async function fetchHostlocations() {
  try {
    const response = await fetch(API,{
        method: "GET"});
    if (!response.ok) {
      throw new Error('Error al obtener');
    }
    const data = await response.json();
    const host_locations = [...new Set(data.map(resource => resource.host_location))];
    return host_locations;
  } catch (error) {
    console.error('Error al obtener:', error.message);
    return [];
  }
}
async function fetchNeigh() {
  try {
    const response = await fetch(API,{
        method: "GET"});
    if (!response.ok) {
      throw new Error('Error al obtener');
    }
    const data = await response.json();
    const neighs = [...new Set(data.map(resource => resource.neighbourhood))];
    return neighs;
  } catch (error) {
    console.error('Error al obtener:', error.message);
    return [];
  }
}

// Función para llenar el formulario con datos de prueba
function fillFormWithTestData() {
    newListing = {
      name: 'Ejemplo',
      host_since: '16/11/2023',
      host_location: 'Ejemplo',
      host_response_time: 'within a few hours',
      host_response_rate: 100,
      host_acceptance_rate: 100,
      neighbourhood: 'Ejemplo',
      city: 'Ejemplo',
      latitude: 10020,
      longitude: 10030,
      property_type: 'Entire apartment',
      room_type: 'Private room',
      guest_number: 1,
      bedroom_number: 1,
      amenities_list: 'Ejemplo',
      price: 100,
      minimum_nights_number: 1,
      maximum_nights_number: 30,
      instant_bookable: 'TRUE'
    };
  }

let showDetails = false;
let selectedData = {};

function toggleDetails(dato) {
		selectedData = dato;
		showDetails = !showDetails;
}
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
        <Col>
            <Button color="primary" on:click={() => {showFilter = true;}}><Fa icon={faFilter}/> Filtros</Button>
        </Col>
        <Col>
            <Button color="secondary" on:click={cleanFilter}><Fa icon={faList}/> Limpiar filtros</Button>
        </Col>
        <Col cols={{ xs:4 }}>
            <Button color="danger" id = "deleteAllButton" on:click="{() => {confirmModal = true;}}"><Fa icon={faTrash}/> Borrar Todos los Datos</Button>
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
                                <Input type="text" id="name" bind:value={selectedFilter.name} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="hostSince">Fecha de registro del anfitrión</Label>
                                <Input type="text" id="hostSince" placeholder="DD/MM/YYYY" bind:value={selectedFilter.host_since} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="hostLocation">Ubicación del anfitrión</Label>
                                <Input type="select" id="hostLocation" bind:value={selectedFilter.host_location}>
                                    {#each host_locations as loc}
                                      <option value={loc}>{loc}</option>
                                    {/each}
                                  </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="responseTime">Tiempo de respuesta</Label>
                                <Input type="select" id="responseTime" bind:value={selectedFilter.host_response_time}>
                                    <option></option>
                                    {#each ["within an hour","within a few hours","within a day","a few days or more"] as option}
                                        <option>{option}</option>
                                    {/each}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="responseRate">Tasa de respuesta</Label>
                                <Input type="number" id="responseRate" bind:value={selectedFilter.host_response_rate} min="0" max="1" step="0.01"/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="acceptanceRate">Tasa de aceptación</Label>
                                <Input type="number" id="acceptanceRate" bind:value={selectedFilter.host_acceptance_rate} min="0" max="1" step="0.01"/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="neighbourhood">Barrio</Label>
                                <Input type="select" id="neighbourhood" bind:value={selectedFilter.neighbourhood}>
                                    {#each neighs as nei}
                                      <option value={nei}>{nei}</option>
                                    {/each}
                                  </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="city">Ciudad</Label>
                                <Input type="select" id="city" bind:value={selectedFilter.city}>
                                    {#each cities as city}
                                      <option value={city}>{city}</option>
                                    {/each}
                                  </Input>
                                <!--<Button outline color= "info" on:click={loadCities}>Cargar Ciudades</Button>-->
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="latitude">Latitud</Label>
                                <Input type="number" id="latitude" bind:value={selectedFilter.latitude} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="longitude">Longitud</Label>
                                <Input type="number" id="longitude" bind:value={selectedFilter.longitude} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="propertyType">Tipo de propiedad</Label>
                                <Input type="select" id="propertyType" bind:value={selectedFilter.property_type}>
                                    <option></option>
                                    {#each ["Entire apartment","Private room in apartment","Private room in house","Entire house","Entire condominium"] as option}
                                        <option>{option}</option>
                                    {/each}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="roomType">Tipo de habitación</Label>
                                <Input type="select" id="roomType" bind:value={selectedFilter.room_type}>
                                    <option></option>
                                    {#each ["Entire place","Private room","Hotel room","Shared room"] as option}
                                        <option>{option}</option>
                                    {/each}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="guestNumber">Número de huéspedes</Label>
                                <Input type="number" id="guestNumber" bind:value={selectedFilter.guest_number} min="1" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="bedroomNumber">Número de habitaciones</Label>
                                <Input type="number" id="bedroomNumber" bind:value={selectedFilter.bedroom_number} min="1"/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="amenitiesList">Lista de comodidades</Label>
                                <Input type="text" id="amenitiesList" bind:value={selectedFilter.amenities_list} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="price">Precio</Label>
                                <Input type="number" id="price" bind:value={selectedFilter.price} min="1" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="minimumNights">Número de noches mínimas</Label>
                                <Input type="number" id="minimumNights" bind:value={selectedFilter.minimum_nights} min="1"/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="maximumNights">Número de noches máximas</Label>
                                <Input type="number" id="maximumNights" bind:value={selectedFilter.maximum_nights} min="1"/>
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
                            <Input type="number" id="yearInput" bind:value={year}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="min_price">Precio mínimo</Label>
                            <Input type="range" id="minpriceInput" bind:value={minprice} min="1" max="1000" step="5"/>
                            <Input type="number" bind:value={minprice} min="0" max="1000" class="small-input"/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="max_price">Precio máximo</Label>
                            <Input type="range" id="maxpriceInput" bind:value={maxprice} min="10" max="1000" step="5"/>
                            <Input type="number" bind:value={maxprice} min="0" max="1000" class="small-input"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="from">Desde (año)</Label>
                            <Input type="number" id="fromInput" bind:value={from} min="1"/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="to">Hasta (año)</Label>
                            <Input type="number" id="toInput" bind:value={to} min="1"/>
                        </FormGroup>
                    </Col>
                </Row>
                </Container>
            </form>
        </ModalBody>
        <ModalFooter>
            <Container style="justify-content: center; text-align: center;">
          <Button color="primary" on:click={() => { searchListings(); toggle(); }}><Fa icon={faCheck}/> Aplicar filtros</Button>
          <Button color="secondary" on:click={toggle}><Fa icon={faXmark}/> Cerrar</Button>
          <Button color="secondary" on:click={cleanFilter}><Fa icon={faList}/> Limpiar filtros</Button>
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
            <Container style="justify-content: center; text-align: center;">
                <Button color="primary" on:click={fillFormWithTestData}>Rellenar con datos de prueba</Button>
                </Container>
            <Container class='mb-3'>
                <Row cols={{ xs:2,sm: 2, md: 3, lg: 3, xl:3}}>
                    <Col class='mb-3'>
                        <FormGroup >
                            <Label for="name">Nombre</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Escribe un nombre"
                                bind:value={newListing.name}
                                invalid={!newListing.name}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="hostSince">Fecha de registro de anfitrión</Label>
                            <Input
                                type="text"
                                id="hostSince"
                                name="hostSince"
                                placeholder="DD/MM/YYYY"
                                bind:value={newListing.host_since}
                                invalid={!newListing.host_since}
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
                                invalid={!newListing.host_location}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="responseTime">Tiempo de respuesta del anfitrión</Label>
                            <Input type="select" 
                                    id="responseTime" 
                                    name="responseTime"
                                    placeholder="Escribe un tiempo de respuesta"
                                    bind:value={newListing.host_response_time}
                                    invalid={!newListing.host_response_time}
                                    required>
                                {#each ["within an hour","within a few hours","within a day","a few days or more"] as option}
                                    <option>{option}</option>
                                {/each}
                            </Input>
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
                                min="0" max="1" step="0.01"
                                bind:value={newListing.host_response_rate}
                                invalid={!newListing.host_response_rate}
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
                                min="0" max="1" step="0.01"
                                bind:value={newListing.host_acceptance_rate}
                                invalid={!newListing.host_acceptance_rate}
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
                                invalid={!newListing.neighbourhood}
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
                                invalid={!newListing.city}
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
                                invalid={!newListing.latitude}
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
                                invalid={!newListing.longitude}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="propertyType">Tipo de propiedad</Label>
                            <Input type="select" 
                                    id="propertyType" 
                                    name="propertyType"
                                    bind:value={newListing.property_type}
                                    invalid={!newListing.property_type}
                                    required>
                                {#each ["Entire apartment","Private room in apartment","Private room in house","Entire house","Entire condominium"] as option}
                                    <option>{option}</option>
                                {/each}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="roomType">Tipo de habitación</Label>
                            <Input type="select" 
                                    id="roomType" 
                                    name="roomType"
                                    bind:value={newListing.room_type}
                                    invalid={!newListing.room_type}
                                    required>
                                {#each ["Entire place","Private room","Hotel room","Shared room"] as option}
                                    <option>{option}</option>
                                {/each}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="guestNumber">Número de huéspedes</Label>
                            <Input
                                type="number"
                                id="guestNumber"
                                name="guestNumber"
                                min="1"
                                placeholder="Escribe un número de huéspedes"
                                bind:value={newListing.guest_number}
                                invalid={!newListing.guest_number}
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
                                min="1"
                                placeholder="Escribe un número de habitaciones"
                                bind:value={newListing.bedroom_number}
                                invalid={!newListing.bedroom_number}
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
                                invalid={!newListing.amenities_list}
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
                                min="1"
                                placeholder="Escribe un precio"
                                bind:value={newListing.price}
                                invalid={!newListing.price}
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
                                min="1"
                                placeholder="Escribe un número mínimo de noches"
                                bind:value={newListing.minimum_nights_number}
                                invalid={!newListing.minimum_nights_number}
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
                                min="1"
                                placeholder="Escribe un número máximo de noches"
                                bind:value={newListing.maximum_nights_number}
                                invalid={!newListing.maximum_nights_number}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="instantBookable">¿Reserva instantánea?</Label>
                            <Input type="select" 
                                    id="instantBookable" 
                                    name="instantBookable"
                                    bind:value={newListing.instant_bookable}
                                    invalid={!newListing.instant_bookable}
                                    required>
                                {#each ["TRUE","FALSE"] as option}
                                    <option>{option}</option>
                                {/each}
                            </Input>

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

    {#if confirmModal}
    <Modal isOpen={confirmModal} {toggle3} {size}>
        <ModalHeader {toggle3}>¿Estás seguro de que deseas eliminar todos los datos?</ModalHeader>
        <ModalBody>
            <Container style="justify-content: center; text-align: center;">
                {#if success3_msg != ""}
                <Alert color="success">
                    <strong>Éxito:</strong> {success3_msg}
                </Alert>
                {/if}
            </Container>
            <Container style="justify-content: center; text-align: center;">
                <Button color="success" id = "deleteAllButtonConfirm" on:click={deleteAll}><Fa icon={faCheck}/> Confirmar</Button>
                <Button color="secondary" on:click={toggle3}><Fa icon={faXmark}/> Cerrar</Button>
            </Container>
        </ModalBody>
    </Modal>
    {/if}
    

{#if listings && listings.length > 0}
    <!--_______________________________________________Datos_________________________________________________-->
<Container>
    
    <!-- AQUI SE MUESTRAN LOS DATOS -->
    <Row cols={{ xs:2,sm: 3, md: 3, lg: 3, xl:4}}>
        {#each listings as listing}
            <Col class='mb-3'>
                <Card class="tarjeta">
                    <CardHeader style="background-color: #008080; color: white; text-decoration-style: solid;">
                        <CardTitle class="card-title"><Fa icon={faHouse}/> <a style = "color: white" href={`airbnb-listings/${listing.latitude}/${listing.longitude}`}>{listing.name}</a></CardTitle>
                    </CardHeader>
                    <CardBody class='tarjetas-datos'>
                        <CardText>
                            <strong>Fecha de registro de anfitrión:</strong> {listing.host_since} <br>
                            <!--<strong>Ubicación del anfitrión:</strong> {listing.host_location} <br>-->
                            <!--<strong>Tiempo de respuesta del anfitrión:</strong> {listing.host_response_time} <br>-->
                           <!-- <strong>Tasa de respuesta del anfitrión:</strong> {listing.host_response_rate} <br>-->
                            <!--<strong>Tasa de aceptación del anfitrión:</strong> {listing.host_acceptance_rate} <br>-->
                            <!--<strong>Barrio: </strong>{listing.neighbourhood} <br>-->
                            <strong>Ciudad:</strong> {listing.city} <br>
                            <!--<strong>Latitud:</strong> {listing.latitude} <br>-->
                            <!--<strong>Longitud: </strong>{listing.longitude} <br>-->
                            <!--<strong>Tipo de propiedad:</strong> {listing.property_type} <br>-->
                            <!--<strong>Tipo de habitación:</strong> {listing.room_type} <br>-->
                            <!--<strong>Número de huéspedes:</strong> {listing.guest_number} <br>-->
                            <!--<strong>Número de habitaciones:</strong> {listing.bedroom_number} <br>-->
                           <!-- <strong>Lista de comodidades:</strong> {listing.amenities_list} <br>-->
                            <strong>Precio:</strong> {listing.price} <br>
                            <!--<strong>Número mínimo de noches: </strong>{listing.minimum_nights_number} <br>-->
                            <!--<strong>Número máximo de noches:</strong> {listing.maximum_nights_number} <br>-->
                            <!--<strong>¿Reserva instantánea?: </strong>{listing.instant_bookable ? "Sí" : "No"} <br>-->
                            {#if showDetails && selectedData === listing}
								<strong>Ubicación del anfitrión:</strong> {listing.host_location} <br>
                                <strong>Tiempo de respuesta del anfitrión:</strong> {listing.host_response_time} <br>
                                <strong>Tasa de respuesta del anfitrión:</strong> {listing.host_response_rate} <br>
                                <strong>Tasa de aceptación del anfitrión:</strong> {listing.host_acceptance_rate} <br>
                                <strong>Barrio: </strong>{listing.neighbourhood} <br>
                                <strong>Latitud:</strong> {listing.latitude} <br>
                                <strong>Longitud: </strong>{listing.longitude} <br>
                                <strong>Tipo de propiedad:</strong> {listing.property_type} <br>
                                <strong>Tipo de habitación:</strong> {listing.room_type} <br>
                                <strong>Número de huéspedes:</strong> {listing.guest_number} <br>
                                <strong>Número de habitaciones:</strong> {listing.bedroom_number} <br>
                                <strong>Lista de comodidades:</strong> {listing.amenities_list} <br>
                                <strong>Número mínimo de noches: </strong>{listing.minimum_nights_number} <br>
                                <strong>Número máximo de noches:</strong> {listing.maximum_nights_number} <br>
                                <strong>¿Reserva instantánea?: </strong>{listing.instant_bookable ? "Sí" : "No"} <br>
							{/if}
                        </CardText>
                        <Container style="justify-content: center; text-align: center;">
                        <Button color="info" on:click={() => toggleDetails(listing)}><Fa icon={faPlus}/></Button>
                        <Button color="danger" id ="deleteResourceButton" on:click={() => deleteListing(listing.latitude, listing.longitude)}><Fa icon={faTrash}/></Button>
                        <Button color="warning" on:click={() => { window.location.href = `airbnb-listings/${listing.latitude}/${listing.longitude}` }}>
                            <Fa icon={faPencil}/></Button>
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
<!--
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
-->
<Container class="d-flex justify-content-center">
    <Pagination>
                <Button color="primary" on:click={() => {firstPage();}} disabled={pagination === 0}><Fa icon={faAngleDoubleLeft}></Fa></Button>            
                <Button color="info" on:click={()=>{prevPage();}} disabled={pagination === 0}><Fa icon={faArrowLeft}/> Anterior</Button>
                <Button color="info" on:click={() => {countData();nextPage();}} disabled={pagination === valor}>Siguiente <Fa icon={faArrowRight}/></Button>
                <Button color="primary" last on:click={()=>{lastPage();}} disabled={pagination === valor}><Fa icon={faAngleDoubleRight}></Fa></Button>
    </Pagination>
</Container>

<hr>






</Container>
