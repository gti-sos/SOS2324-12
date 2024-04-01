<script>

import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    import { query_selector_all } from 'svelte/internal';
    import { Pagination, PaginationItem, PaginationLink } from '@sveltestrap/sveltestrap';

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

let error_msg = '';
let success_msg = '';
let success2_msg = '';

let size = "lg";
const toggle = () => {
    size = "lg";
    showFilter = !showFilter;
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

async function searchListing() {
    const fromInput = document.getElementById('fromInput').value.trim();
    const toInput = document.getElementById('toInput').value.trim();

    // Convierte los valores de entrada a números enteros
    const from = parseInt(fromInput);
    const to = parseInt(toInput);

    // Verifica si los valores de entrada son números válidos
    if (isNaN(from) || isNaN(to)) {
        error_msg = "Por favor, introduzca años válidos en los campos From y To.";
        window.scrollTo(0, 0);
        return;
    }

    // Construye la URL de búsqueda con los años como parámetros
    let url = `${API}?from=${from}&to=${to}`;
    const response = await fetch(url, {
            method: 'GET'
        });
    const status = response.status;
    if (status == 200) {
            const data = await response.json();
            listings = data; 
            success_msg = "Se ha realizado la búsqueda correctamente";
            error_msg = '';
            window.scrollTo(0, 0);
    } else if (status == 404){
            error_msg = "No se encontraron resultados";
            success_msg = "";
            window.scrollTo(0, 0);
    } else if (status == 500){
            error_msg = "Ha ocurrido un error en el servidor";
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
            <Button color="warning" on:click="{getInitialListings}">Cargar Datos Iniciales</Button>
        </Col>
        <Col cols={{ xs:4 }}>
            <Button color="success" on:click={() => {showForm = true;}}>Crear Nuevo Dato</Button>
        </Col>
        <Col cols={{ xs:4 }}>
            <Button color="danger" on:click="{deleteAll}">Borrar Todos los Datos</Button>
        </Col>
        <Col>
            <Button color="primary" on:click={() => {showFilter = true;}}>Filtro por campos</Button>
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

<br>
<hr>


{#if listings && listings.length > 0}
    <!--_______________________________________________Datos_________________________________________________-->
<Container>
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
                                <Input type="number" id="neighbourhood" bind:value={selectedFilter.rural_improved_total} required />
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
                </Container>
            </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" on:click={searchListings}>Aplicar filtros</Button>
          <Button color="secondary" on:click={toggle}>Cerrar</Button>
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
    <!-- AQUI SE MUESTRAN LOS DATOS -->
    <Row cols={{ xs:2,sm: 3, md: 3, lg: 3, xl:4}}>
        {#each listings as listing}
            <Col class='mb-3'>
                <Card>
                    <CardHeader>
                        <CardTitle>{listing.country}</CardTitle>
                    </CardHeader>
                    <CardBody>
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
                        <Button color="danger" on:click={() => deleteListing(listing.iso_code, listing.year)}>Borrar</Button>
                        <Button color="warning" on:click={() => { window.location.href = `world-consumption-of-drinking-water-data/1/${listing.iso_code}/${listing.year}` }}>
                            Editar
                        </Button>
                    </CardBody>
                </Card>
            </Col>
        {/each}
    </Row>
</Container>


    {#if showForm}
    <Modal isOpen={showForm} {toggle} {size}>
        <ModalHeader {toggle}>Filtrar datos</ModalHeader>
        <ModalBody>
            
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
            <Button color="success" on:click={createListing}>Crear</Button>
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





</Container>
