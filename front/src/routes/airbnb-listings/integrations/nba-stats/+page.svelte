
<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    
    import * as echarts from 'echarts';
    // VARIABLE RUTA API
    
    let API = '/api/v2/airbnb-listings';
    if(dev)
        API = 'http://localhost:10000'+API;
    
    // ALERTA INFO

    let info = "";
    let v_info = false;
    function f_info() {
        (setTimeout(function(){v_info = false;}, 6000));
    }

    // INICIALIZAR GRÁFICAS

    onMount(async () => {
        getNBAData();
    })

    async function getInitialListings(){
    let response = await fetch(API + "/loadInitialData", {
                method: "GET"
            });
    const status = await response.status;
    if (status == 201){
        getListings();
        window.location.reload();
    } else {
        console.log("Error al cargar datos");
    };
    };

    async function getListings(){
        let list = [];

        const response = await fetch(API, {
            method: 'GET'
        });

        try{
            const data = await response.json();
            list = data;
            
        } catch (error) {
            console.log(`Error: ${error}`);
        }

        const status = await response.status;

        return list;
    };

    async function getNBAData(){
        let datosnba = [];

        const response = await fetch("https://api.balldontlie.io/v1/games", {
            method: 'GET',
            headers: {
                'Authorization': `6100d60d-cb52-4ff9-b276-dc6f9bf03798`
            } 
        });

        try{
            const data = await response.json();
            datosnba = data;
            
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        console.log(datosnba)
        return datosnba;
    };
    


</script>

<main>
<Container class="content-container" style="justify-content: center;"> 
    <Container>
        <Row>
            <Col><h1> Comparación de </h1></Col>
        </Row>
    </Container>

    <br/>

    <Container>
        {#if info != ""}
            <Row><Col><Alert color="info" isOpen={v_info} toggle={() => (v_info = false)}>{info}</Alert></Col></Row>
            <Container class="text-center">
                <Row>
                    <Col cols={{ xs:4 }}>
                        <Button color="warning" on:click="{getInitialListings}">Cargar datos</Button>
                    </Col>                       
                </Row>
            </Container>
            <br/>
        {:else}
        <Row><Col><div id="contenedor-grafica" style="width:100%; height:400px;"></div></Col></Row>
        {/if}
    </Container>

</Container>
</main>