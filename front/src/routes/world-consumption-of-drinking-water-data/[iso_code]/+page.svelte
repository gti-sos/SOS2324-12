<script>

import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    import { query_selector_all } from 'svelte/internal';
    import { Pagination, PaginationItem, PaginationLink } from '@sveltestrap/sveltestrap';

// Rutas

let API = '/api/v1/world-consumption-of-drinking-water-data';
if(dev)
    API = 'http://localhost:10000'+API;

let error_msg = '';
let success_msg = '';
let success2_msg = '';
let dato = {};
let iso_code = $page.params.iso_code;
let year = $page.params.year;

let size = "lg";
const toggle = () => {
    size = "lg";
    showFilter = !showFilter;
};

let updatedListing ={
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
        const response = await fetch(API+`/${iso_code}/${year}`,{
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
    if(
        updatedListing.iso_code: === "" ||
        updatedListing.country: === "" ||
        updatedListing.year: === "" ||
        updatedListing.urban_improved_total: === "" ||
        updatedListing.urban_improved_piped: === "" ||
        updatedListing.urban_improved_other: === "" ||
        updatedListing.urban_unimproved_other: === "" ||
        updatedListing.rural_improved_total: === "" ||
        updatedListing.rural_improved_piped: === "" ||
        updatedListing.rural_improved_other: === "" ||
        updatedListing.rural_unimproved_other: === "" ||
        updatedListing.rural_unimproved_surface: === "" ||
        updatedListing.total_improved_total: === "" ||
        updatedListing.total_improved_piped: === "" ||
        updatedListing.total_improved_other: === "" ||
        updatedListing.total_unimproved_other: === "" ||
        updatedListing.total_unimproved_surface: === ""
        ) {
            error_msg = "No se puede actualizar si el dato no se pasa completo";
            window.scrollTo(0, 0);
        } else {
            const response = await fetch(API+`/${iso_code}/${year}`, {
                method: 'PUT',
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(updatedListing)
            });
            const status = await response.status;
            if (status == 200){
                getResource();
                success2_msg = "El dato con iso_code "+iso_code+" y year "+year+" se ha actuallizado correctamente";
                error_msg = "";
                window.scrollTo(0, 0);
            } else if (status == 404){
                error_msg = "El dato con iso_code "+iso_code+" y year "+year+" no existe en la base de datos";
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
            <hr>
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
                                
                            />
                        </FormGroup>
                    </Col>
                </Row>
    </Container>
    </Container>
</main>
