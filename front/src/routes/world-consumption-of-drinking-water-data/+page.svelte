<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    import { query_selector_all } from 'svelte/internal';
    import { Pagination, PaginationItem, PaginationLink } from '@sveltestrap/sveltestrap';
    import Fa from 'svelte-fa';
    import {faTrash, faPencil, faSpinner, faPlus, faFilter, faMagnifyingGlass, faCheck, faXmark, faArrowLeft, faArrowRight, faHouse, faAngleDoubleLeft, faAngleDoubleRight, faList} from '@fortawesome/free-solid-svg-icons';
// Rutas

let API = '/api/v2/world-consumption-of-drinking-water-data';
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
  iso_code: "",
  country: "",
  year: "",
  urban_improved_total: "",
  urban_improved_piped: "",
  urban_improved_other: "",
  urban_unimproved_other: "",
  rural_improved_total: "",
  rural_improved_piped: "",
  rural_improved_other: "",
  rural_unimproved_other: "",
  rural_unimproved_surface: "",
  total_improved_total: "",
  total_improved_piped: "",
  total_improved_other: "",
  total_unimproved_other: "",
  total_unimproved_surface: "",
};

let selectedFilter ={
  iso_code: "",
  country: "",
  year: "",
  urban_improved_total: "",
  urban_improved_piped: "",
  urban_improved_other: "",
  urban_unimproved_other: "",
  rural_improved_total: "",
  rural_improved_piped: "",
  rural_improved_other: "",
  rural_unimproved_other: "",
  rural_unimproved_surface: "",
  total_improved_total: "",
  total_improved_piped: "",
  total_improved_other: "",
  total_unimproved_other: "",
  total_unimproved_surface: "",
};

let year = '';
let from = "";
let to = "";
let iso_code = '';
let country = '';

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
    // Temporizador para ocultar automáticamente las alertas después de 5 segundos
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
        if (iso_code !== '' && !isNaN(iso_code)) {
            searchParams.append('iso_code', iso_code);
        }
        if (country !== '' && !isNaN(country)) {
            searchParams.append('country', country);
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
        countries = await fetchCountries();
        total_improved_total = await fetchTotal_improved_total();
        urban_improved_total = await fetchUrban_improved_total();
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
                iso_code: "",
                country: "",
                year: "",
                urban_improved_total: "",
                urban_improved_piped: "",
                urban_improved_other: "",
                urban_unimproved_other: "",
                rural_improved_total: "",
                rural_improved_piped: "",
                rural_improved_other: "",
                rural_unimproved_other: "",
                rural_unimproved_surface: "",
                total_improved_total: "",
                total_improved_piped: "",
                total_improved_other: "",
                total_unimproved_other: "",
                total_unimproved_surface: "",
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
        if (iso_code !== '' && !isNaN(iso_code)) {
            searchParams.append('iso_code', iso_code);
        }
        if (country !== '' && !isNaN(country)) {
            searchParams.append('country', country);
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
    if (!newListing.iso_code || !newListing.country || !newListing.year || 
    !newListing.urban_improved_total || !newListing.urban_improved_piped || !newListing.urban_improved_other
    || !newListing.urban_unimproved_other || !newListing.rural_improved_total || !newListing.rural_improved_piped || 
    !newListing.rural_improved_other || !newListing.rural_unimproved_other || !newListing.rural_unimproved_surface || !newListing.total_improved_total || 
    !newListing.total_improved_piped || !newListing.total_improved_other || !newListing.total_unimproved_other || !newListing.total_unimproved_surface) {
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
        success2_msg = "Se ha creado correctamente el post de iso_code "+newListing.iso_code;
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

async function deleteListing(iso_code,year){
    let response = await fetch(API + "/1/" + iso_code + "/" + year,{
            method: "DELETE"
        });
    const status = response.status;
    if (status == 200){
        success2_msg = "El recurso con iso_code "+iso_code+" y year "+year+" ha sido eliminado";
        error_msg = "";
        getListings();
        window.scrollTo(0, 0);
    } else if (status == 204) {
        error_msg = "No se encontró ningún recurso con la iso_code y year especificadas";
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
                selectedFilter.iso_code= "",
                selectedFilter.country= "",
                selectedFilter.year= "",
                selectedFilter.urban_improved_total= "",
                selectedFilter.urban_improved_piped= "",
                selectedFilter.urban_improved_other= "",
                selectedFilter.urban_unimproved_other= "",
                selectedFilter.rural_improved_total= "",
                selectedFilter.rural_improved_piped= "",
                selectedFilter.rural_improved_other= "",
                selectedFilter.rural_unimproved_other= "",
                selectedFilter.rural_unimproved_surface= "",
                selectedFilter.total_improved_total= "",
                selectedFilter.total_improved_piped= "",
                selectedFilter.total_improved_other= "",
                selectedFilter.total_unimproved_other= "",
                selectedFilter.total_unimproved_surface= "",
            year = "",
            iso_code = "",
            country = "",
            from = "",
            to = "",
            pagination = 0;
            success2_msg = "Filtros limpiados correctamente";
            error_msg = "";
            success_msg = "";
            getListings();
};

let countries = [];
let total_improved_total = [];
let urban_improved_total = [];
async function loadCountries() {
    countries = await fetchCountries(); // Obtener los paises cuando se carga el componente
}

async function fetchCountries() {
  try {
    const response = await fetch(API,{
        method: "GET"});
    if (!response.ok) {
      throw new Error('Error al obtener los paises');
    }
    const data = await response.json();
    const countries = [...new Set(data.map(resource => resource.countries))];
    return countries;
  } catch (error) {
    console.error('Error al obtener los paises:', error.message);
    return [];
  }
}
async function fetchTotal_improved_total() {
  try {
    const response = await fetch(API,{
        method: "GET"});
    if (!response.ok) {
      throw new Error('Error al obtener');
    }
    const data = await response.json();
    const total_improved_total = [...new Set(data.map(resource => resource.total_improved_total))];
    return total_improved_total;
  } catch (error) {
    console.error('Error al obtener:', error.message);
    return [];
  }
}
async function fetchUrban_improved_total() {
  try {
    const response = await fetch(API,{
        method: "GET"});
    if (!response.ok) {
      throw new Error('Error al obtener');
    }
    const data = await response.json();
    const urban_improved_total = [...new Set(data.map(resource => resource.urban_improved_total))];
    return urban_improved_total;
  } catch (error) {
    console.error('Error al obtener:', error.message);
    return [];
  }
}

// Función para llenar el formulario con datos de prueba
function fillFormWithTestData() {
    newListing = {
    iso_code: "COL",
    country: "Colombia",
    year: "2023",
    urban_improved_total: "3",
    urban_improved_piped: "5",
    urban_improved_other: "3",
    urban_unimproved_other: "66",
    rural_improved_total: "44",
    rural_improved_piped: "44",
    rural_improved_other: "22",
    rural_unimproved_other: "67",
    rural_unimproved_surface: "65",
    total_improved_total: "45",
    total_improved_piped: "65",
    total_improved_other: "77",
    total_unimproved_other: "54",
    total_unimproved_surface: "44"
    };
  }

</script>

<Container class="content-container" style="justify-content: center;"> 
    <!--______________________________________Cabecera_____________________________________-->
    <Container style="justify-content: center; text-align: center;">
            <h1> Consumición de agua por paises</h1>
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
                                <Label for="iso_code">iso_code</Label>
                                <Input type="text" id="iso_code" bind:value={selectedFilter.iso_code} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="country">country</Label>
                                <Input type="text" id="country" bind:value={selectedFilter.country} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="year">year</Label>
                                <Input type="number" id="year" bind:value={selectedFilter.year} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="urban_improved_total">urban_improved_total</Label>
                                <Input type="number" id="urban_improved_total" bind:value={selectedFilter.urban_improved_total} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="urban_improved_piped">urban_improved_piped</Label>
                                <Input type="number" id="urban_improved_piped" bind:value={selectedFilter.urban_improved_piped} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="urban_improved_other">urban_improved_other</Label>
                                <Input type="number" id="urban_improved_other" bind:value={selectedFilter.urban_improved_other} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="urban_unimproved_other">urban_unimproved_other</Label>
                                <Input type="number" id="urban_unimproved_other" bind:value={selectedFilter.urban_unimproved_other} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="rural_improved_total">rural_improved_total</Label>
                                <Input type="number" id="rural_improved_total" bind:value={selectedFilter.rural_improved_total} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="rural_improved_piped">rural_improved_piped</Label>
                                <Input type="number" id="rural_improved_piped" bind:value={selectedFilter.rural_improved_piped} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="rural_improved_other">rural_improved_other</Label>
                                <Input type="number" id="rural_improved_other" bind:value={selectedFilter.rural_improved_other} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="rural_unimproved_other">rural_unimproved_other</Label>
                                <Input type="number" id="rural_unimproved_other" bind:value={selectedFilter.rural_unimproved_other} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="rural_unimproved_surface">rural_unimproved_surface</Label>
                                <Input type="number" id="rural_unimproved_surface" bind:value={selectedFilter.rural_unimproved_surface} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="total_improved_total">total_improved_total</Label>
                                <Input type="number" id="total_improved_total" bind:value={selectedFilter.total_improved_total} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="total_improved_piped">total_improved_piped</Label>
                                <Input type="number" id="total_improved_piped" bind:value={selectedFilter.total_improved_piped} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="total_improved_other">total_improved_other</Label>
                                <Input type="number" id="total_improved_other" bind:value={selectedFilter.total_improved_other} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="total_unimproved_other">total_unimproved_other</Label>
                                <Input type="number" id="total_unimproved_other" bind:value={selectedFilter.total_unimproved_other} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="total_unimproved_surface">total_unimproved_surface</Label>
                                <Input type="number" id="total_unimproved_surface" bind:value={selectedFilter.total_unimproved_surface} required />
                            </FormGroup>
                        </Col>
                    </Row>
                   <Row>
                    <Col>
                        <FormGroup>
                            <Label for="year">Año</Label>
                            <Input type="number" id="yearInput" bind:value={year}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="iso_code">ISO busqueda</Label>
                            <Input type="text" id="iso_codeInput" bind:value={iso_code}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="country">Pais busqueda</Label>
                            <Input type="text" id="countryInput" bind:value={country}/>
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
                        <FormGroup>
                            <Label for="iso_code">ISO</Label>
                            <Input
                                type="text"
                                id="iso_code"
                                name="iso_code"
                                placeholder="Escribe un iso_code"
                                bind:value={newListing.iso_code}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="country">Pais</Label>
                            <Input
                                type="text"
                                id="country"
                                name="country"
                                placeholder="Escribe un Pais"
                                bind:value={newListing.country}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="year">Año</Label>
                            <Input
                                type="number"
                                id="year"
                                name="year"
                                bind:value={newListing.year}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="urban_improved_total">Mejora urbana total</Label>
                            <Input
                                type="number"
                                id="urban_improved_total"
                                name="urban_improved_total"
                                placeholder="Escribe una mejora urbana total"
                                bind:value={newListing.urban_improved_total}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="urban_improved_piped">urban_improved_piped</Label>
                            <Input
                                type="text"
                                id="urban_improved_piped"
                                name="urban_improved_piped"
                                placeholder="Escribe un urban_improved_piped"
                                bind:value={newListing.urban_improved_piped}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="urban_improved_other">Mejora urbana otra</Label>
                            <Input
                                type="number"
                                id="urban_improved_other"
                                name="urban_improved_other"
                                placeholder="Escribe una mejora urbana otra"
                                bind:value={newListing.urban_improved_other}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="urban_unimproved_other">Empeora urbana otra</Label>
                            <Input
                                type="number"
                                id="urban_unimproved_other"
                                name="urban_unimproved_other"
                                placeholder="Escribe una empeora urbana otra"
                                bind:value={newListing.urban_unimproved_other}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="rural_improved_total">Mejora rural total</Label>
                            <Input
                                type="number"
                                id="rural_improved_total"
                                name="rural_improved_total"
                                placeholder="Escribe una mejora rural total"
                                bind:value={newListing.rural_improved_total}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="rural_improved_piped">Mejora rural entubada</Label>
                            <Input
                                type="number"
                                id="rural_improved_piped"
                                name="rural_improved_piped"
                                placeholder="Escribe una mejora rural entubada"
                                bind:value={newListing.rural_improved_piped}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="rural_improved_other">Mejora rural otro</Label>
                            <Input
                                type="number"
                                id="rural_improved_other"
                                name="rural_improved_other"
                                placeholder="Escribe una mejora rural otro"
                                bind:value={newListing.rural_improved_other}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="rural_unimproved_other">Empeora rural otro</Label>
                            <Input
                                type="number"
                                id="rural_unimproved_other"
                                name="rural_unimproved_other"
                                placeholder="Escribe un valor para empeora rural otro"
                                bind:value={newListing.rural_unimproved_other}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="rural_unimproved_surface">Empeora rural superficie</Label>
                            <Input
                                type="number"
                                id="rural_unimproved_surface"
                                name="rural_unimproved_surface"
                                placeholder="Escribe una rural_unimproved_surface"
                                bind:value={newListing.rural_unimproved_surface}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="total_improved_total">Mejora total total</Label>
                            <Input
                                type="number"
                                id="total_improved_total"
                                name="total_improved_total"
                                placeholder="Escribe una mejora total total"
                                bind:value={newListing.total_improved_total}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="total_improved_piped">Mejora total entubada</Label>
                            <Input
                                type="number"
                                id="total_improved_piped"
                                name="total_improved_piped"
                                placeholder="Escribe una mejora total entubada"
                                bind:value={newListing.total_improved_piped}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="total_improved_other">Mejora total otro</Label>
                            <Input
                                type="number"
                                id="total_improved_other"
                                name="total_improved_other"
                                placeholder="Escribe una mejora total otro"
                                bind:value={newListing.total_improved_other}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="total_unimproved_other">Empeora total otro</Label>
                            <Input
                                type="number"
                                id="total_unimproved_other"
                                name="total_unimproved_other"
                                placeholder="Escribe un valor para empeora total otro"
                                bind:value={newListing.total_unimproved_other}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col class='mb-3'>
                        <FormGroup>
                            <Label for="total_unimproved_surface">Empeora total superficie</Label>
                            <Input
                                type="number"
                                id="total_unimproved_surface"
                                name="total_unimproved_surface"
                                placeholder="Escribe un valor para empeora total superficie"
                                bind:value={newListing.total_unimproved_surface}
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
                        <CardTitle class="card-title"><Fa icon={faHouse}/> <a style = "color: white" href={`world-consumption-of-drinking-water-data/1/${listing.iso_code}/${listing.year}`}>{listing.country}</a></CardTitle>
                    </CardHeader>
                    <CardBody class='tarjetas-datos'>
                        <CardText>
                            <strong>ISO:</strong>{listing.iso_code} <br>
                            <strong>Pais:</strong> {listing.country} <br>
                            <strong>Año:</strong> {listing.year} <br>
                            <strong>Mejora urbana total:</strong> {listing.urban_improved_total} <br>
                            <strong>Mejora urbana entubada:</strong> {listing.urban_improved_piped} <br>
                            <strong>Mejora urbana otro:</strong> {listing.urban_improved_other} <br>
                            <strong>Empeora urbana otro:</strong> {listing.urban_unimproved_other} <br>
                            <strong>Mejora rural total:</strong> {listing.rural_improved_total} <br>
                            <strong>Mejora rural entubada: </strong>{listing.rural_improved_piped} <br>
                            <strong>Mejora rural otro:</strong> {listing.rural_improved_other} <br>
                            <strong>Empeora rural otro:</strong> {listing.rural_unimproved_other} <br>
                            <strong>Empeora rural superficie: </strong>{listing.rural_unimproved_surface} <br>
                            <strong>Mejora total total:</strong> {listing.total_improved_total} <br>
                            <strong>Mejora total entubada:</strong> {listing.total_improved_piped} <br>
                            <strong>Mejora total otro:</strong> {listing.total_improved_other} <br>
                            <strong>Empeora total otro:</strong> {listing.total_unimproved_other} <br>
                            <strong>Empeora total superficie:</strong> {listing.total_unimproved_surface} <br>
                        </CardText>
                        <Container style="justify-content: center; text-align: center;">
                        <Button color="danger" id ="deleteResourceButton" on:click={() => deleteListing(listing.iso_code, listing.year)}><Fa icon={faTrash}/> Borrar</Button>
                        <Button color="warning" on:click={() => { window.location.href = `world-consumption-of-drinking-water-data/1/${listing.iso_code}/${listing.year}`}}>
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
