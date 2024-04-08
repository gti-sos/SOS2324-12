<script>
import {onMount} from "svelte";
import { dev } from '$app/environment';
import { Button, Icon, FormGroup, Label, Table, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
        Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
        Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
import { page } from '$app/stores'; 
import {faCalendar, faLocationPin, faClock, faWaveSquare, faBuilding, faCity, faGlobe, faList, faBed, faPerson, faEuro, faMoon, faKitchenSet, faBook, faHouse, faCheck, faLongArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Fa from 'svelte-fa';
</script>
<main>
    <Container class="content-container" style="justify-content: center;"> 
        <!--______________________________________Cabecera_____________________________________-->
        <Container style="justify-content: center; text-align: center;">
                <h1> No se encontró el recurso solicitado</h1>
        </Container>
    </Container>
</main>