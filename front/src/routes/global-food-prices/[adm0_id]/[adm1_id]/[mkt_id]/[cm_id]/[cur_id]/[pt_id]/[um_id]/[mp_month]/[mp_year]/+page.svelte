<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Table, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    import { query_selector_all } from 'svelte/internal';
    import { Pagination, PaginationItem, PaginationLink } from '@sveltestrap/sveltestrap';
    import { page } from '$app/stores'; 
    import {faHouse, faCheck, faLongArrowLeft} from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';



    // Rutas
    let API = '/api/v2/global-food-prices';
    if(dev)
        API = 'http://localhost:10000'+API;
    
    let success_msg = "";
    let success2_msg = "";
    let error_msg = "";
    let dato = {};
	let adm0_id = $page.params.adm0_id;
	let adm1_id = $page.params.adm1_id;
	let mkt_id = $page.params.mkt_id;
	let cm_id = $page.params.cm_id;
	let cur_id = $page.params.cur_id;
	let pt_id = $page.params.pt_id;
	let um_id = $page.params.um_id;
	let mp_month = $page.params.mp_month;
	let mp_year = $page.params.mp_year;

    let updatedListing ={
        adm0_id: '',
		adm0_name: '',
		adm1_id: '',
		adm1_name: '',
		mkt_id: '',
		mkt_name: '',
		cm_id: '',
		cm_name: '',
		cur_id: '',
		cur_name: '',
		pt_id: '',
		pt_name: '',
		um_id: '',
		um_name: '',
		mp_month: '',
		mp_year: '',
		mp_price: '',
		mp_commoditysource: ''
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
        const response = await fetch(API+`/${adm0_id}/${adm1_id}/${mkt_id}/${cm_id}/${cur_id}/${pt_id}/${um_id}/${mp_month}/${mp_year}`,{
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
            if (response.adm0_id = "undefined")
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
    if( updatedListing.adm0_id === "" || 
        updatedListing.adm1_id === "" || 
        updatedListing.mkt_id === "" || 
        updatedListing.cm_id === "" || 
        updatedListing.cur_id === "" || 
        updatedListing.pt_id === "" || 
        updatedListing.um_id === "" || 
        updatedListing.mp_month === "" || 
        updatedListing.mp_year === "") {
            error_msg = "No se puede actualizar si el dato no se pasa completo";
            window.scrollTo(0, 0);
        } else {
            const response = await fetch(API+`/${adm0_id}/${adm1_id}/${mkt_id}/${cm_id}/${cur_id}/${pt_id}/${um_id}/${mp_month}/${mp_year}`, {
                method: 'PUT',
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(updatedListing)
            });
            const status = await response.status;
            if (status == 200){
                getResource();
                success2_msg = "El dato se ha actualizado correctamente";
                error_msg = "";
                window.scrollTo(0, 0);
            } else if (status == 404){
                error_msg = "El dato no existe en la base de datos";
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
        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <CardHeader style="background-color: #008080; color: white; text-decoration-style: solid; justify-content: center; text-align: center;">
                            <CardTitle><Fa icon={faHouse}/> {updatedListing.cm_name}</CardTitle>
                        </CardHeader>
                        <CardBody class='tarjetas-datos-edit'>
                            <CardText>
                                <Row>
                                    <Col class='mb-3'>
                                        <strong>País ID: </strong>{updatedListing.adm0_id}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Nombre del país: </strong>{updatedListing.adm0_name}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Localidad ID: </strong>{updatedListing.adm1_id}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Nombre de la localidad: </strong>{updatedListing.adm1_name}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Mercado ID: </strong>{updatedListing.mkt_id}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Nombre del mercado: </strong>{updatedListing.mkt_name}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Producto ID: </strong>{updatedListing.cm_id}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Nombre del producto: </strong>{updatedListing.cm_name}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Moneda ID: </strong>{updatedListing.cur_id}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Nombre de la moneda: </strong>{updatedListing.cur_name}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Compra ID: </strong>{updatedListing.pt_id}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Tipo de compra: </strong>{updatedListing.pt_name}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Medida ID: </strong>{updatedListing.um_id}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Nombre de la medida: </strong>
                                        {updatedListing.um_name}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Mes de la medida: </strong>{updatedListing.mp_month}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Año de la medida: </strong>{updatedListing.mp_year}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Precio: </strong>{updatedListing.mp_price}
                                    </Col>
                                    <Col class='mb-3'>
                                        <strong>Fuente de datos: </strong>{updatedListing.mp_commoditysource ? "Sí" : "No"} 
                                    </Col>
                                </Row>
                            </CardText>
                        </CardBody>
                    </Card>
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
                <Button color="success" on:click={() => { window.location.href = `/global-food-prices/`}}><Fa icon={faLongArrowLeft}/> Volver</Button>
            </Row>
            <br>
            <hr>
            <Row cols={{ xs: 2, sm: 2, md: 3, lg: 3, xl: 3 }}>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="adm0_id">País ID</Label>
                        <Input
                            type="number"
                            id="adm0_id"
                            name="adm0_id"
                            placeholder="Escribe un país ID"
                            bind:value={updatedListing.adm0_id}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="adm0_name">Nombre del país</Label>
                        <Input
                            type="text"
                            id="adm0_name"
                            name="adm0_name"
                            placeholder="Escribe el nombre del país"
                            bind:value={updatedListing.adm0_name}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="adm1_id">Localidad ID</Label>
                        <Input
                            type="number"
                            id="adm1_id"
                            name="adm1_id"
                            placeholder="Escribe una localidad ID"
                            bind:value={updatedListing.adm1_id}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="adm1_name">Nombre de la localidad</Label>
                        <Input
                            type="text"
                            id="adm1_name"
                            name="adm1_name"
                            placeholder="Escribe el nombre de la localidad"
                            bind:value={updatedListing.adm1_name}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="mkt_id">Mercado ID</Label>
                        <Input
                            type="number"
                            id="mkt_id"
                            name="mkt_id"
                            placeholder="Escribe la ID del mercado"
                            bind:value={updatedListing.mkt_id}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="mkt_name">Nombre del mercado</Label>
                        <Input
                            type="text"
                            id="mkt_name"
                            name="mkt_name"
                            placeholder="Escribe el nombre del mercado"
                            bind:value={updatedListing.mkt_name}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="cm_id">Tipo de compra ID</Label>
                        <Input
                            type="number"
                            id="cm_id"
                            name="cm_id"
                            placeholder="Escribe la ID del tipo de compra"
                            bind:value={updatedListing.cm_id}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="cm_name">Nombre del tipo de compra</Label>
                        <Input
                            type="text"
                            id="cm_name"
                            name="cm_name"
                            placeholder="Escribe el nombre del tipo de compra"
                            bind:value={updatedListing.cm_name}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="cur_id">Moneda ID</Label>
                        <Input
                            type="number"
                            id="cur_id"
                            name="cur_id"
                            placeholder="Escribe la ID de la moneda"
                            bind:value={updatedListing.cur_id}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="cur_name">Nombre de la moneda</Label>
                        <Input
                            type="text"
                            id="cur_name"
                            name="cur_name"
                            placeholder="Escribe el nombre de la moneda"
                            bind:value={updatedListing.cur_name}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="pt_id">Producto ID</Label>
                        <Input
                            type="number"
                            id="pt_id"
                            name="pt_id"
                            placeholder="Escribe la ID del producto"
                            bind:value={updatedListing.pt_id}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="pt_name">Nombre del producto</Label>
                        <Input
                            type="text"
                            id="pt_name"
                            name="pt_name"
                            placeholder="Escribe el nombre del producto"
                            bind:value={updatedListing.pt_name}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="um_id">Unidad de medida ID</Label>
                        <Input
                            type="number"
                            id="um_id"
                            name="um_id"
                            placeholder="Escribe la ID de la unidad de medida"
                            bind:value={updatedListing.um_id}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="um_name">Nombre de la unidad de medida</Label>
                        <Input
                            type="text"
                            id="um_name"
                            name="um_name"
                            placeholder="Escribe el nombre de la unidad de medida"
                            bind:value={updatedListing.um_name}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="mp_month">Mes de la medida</Label>
                        <Input
                            type="number"
                            id="mp_month"
                            name="mp_month"
                            placeholder="Escribe el mes de la medida"
                            bind:value={updatedListing.mp_month}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="mp_year">Año de la medida</Label>
                        <Input
                            type="number"
                            id="mp_year"
                            name="mp_year"
                            placeholder="Escribe el año de la medida"
                            bind:value={updatedListing.mp_year}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="mp_price">Precio</Label>
                        <Input
                            type="number"
                            id="mp_price"
                            name="mp_price"
                            placeholder="Escribe el precio"
                            bind:value={updatedListing.mp_price}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col class="mb-3">
                    <FormGroup>
                        <Label for="mp_commoditysource">Fuente de datos</Label>
                        <Input
                            type="text"
                            id="mp_commoditysource"
                            name="mp_commoditysource"
                            placeholder="Escribe el nombre de la fuente de datos"
                            bind:value={updatedListing.mp_commoditysource}
                            required
                        />
                    </FormGroup>
                </Col>
            </Row>
                    <Col class="text-center">
                        <Button color="primary" on:click={updateResource}>Actualizar</Button>
                    </Col>
        </Row>
    </Container>
    </Container>
</main>

