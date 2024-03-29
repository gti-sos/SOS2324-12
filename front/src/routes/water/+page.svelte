<script>

import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
  
  onMount(async () => {
    await getWaterStats();
  });

  let API_BASE_JMR = "/api/v1/world-consumption-of-drinking-water-data";
  
  let newDatosISO = '';
  let newDatosCountry = '';
  let newDatosYear = '';
  let newDatosurbanimprovedtotal = '';
  let newDatosurban_improved_piped = '';
  let newDatosurban_improved_other = '';
  let newDatosurban_unimproved_other = '';
  let newDatosrural_improved_total = '';
  let newDatosrural_improved_piped = '';
  let newDatosrural_improved_other = '';
  let newDatosrural_unimproved_other = '';
  let newDatosrural_unimproved_surface = '';
  let newDatostotal_improved_total = '';
  let newDatostotal_improved_piped = '';
  let newDatostotal_improved_other = '';
  let newDatostotal_unimproved_other = '';
  let newDatostotal_unimproved_surface = '';

  let searchISO = '';
  let searchCountry = '';
  let searchYear = '';
  //let searchurbanimprovedtotal = '';
  //let searchurban_improved_piped = '';
  //let searchurban_improved_other = '';
  //let searchurban_unimproved_other = '';
  //let searchrural_improved_total = '';
  //let searchrural_improved_piped = '';
  //let searchrural_improved_other = '';
  //let searchrural_unimproved_other = '';
  //let searchrural_unimproved_surface = '';
  //let searchtotal_improved_total = '';
  //let searchtotal_improved_piped = '';
  //let searchtotal_improved_other = '';
  //let searchtotal_unimproved_other = '';
  //let searchtotal_unimproved_surface = '';


  let datos= [];
  let result = "";
  let resultStatus = "";
  
  let message = "";
  let c = "";

  let limit =10;
  let offset=0;
  let currentPage = 0;
  let totalPages = 1;
  

  async function getWaterStats() {
    resultStatus = result = "";
    const res = await fetch(API_BASE_JMR +`?offset=${offset}&limit=${limit}`, {
      method: 'GET'
    });
    try {
      const data = await res.json();
      result = JSON.stringify(data, null, 2);
      datos= data;
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }
    const status = await res.status;
    resultStatus = status;  
  }

  async function getLoadInitialData() {
    resultStatus = result = "";
    const res = await fetch(API_BASE_JMR +'/loadInitialData', {
      method: 'GET'
    });
    try {
      const data = await res.json();
      result = JSON.stringify(data, null, 2);
      datos= data;
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }
    const status = await res.status;
    resultStatus = status;
    if (status==200) {
      getWaterStats();
      message="Datos cargados correctamente"
      c="success";
     }else if(status==400){
      message="Los datos ya están cargados"
      c="warning";
     }else if(status==500){
      message="Error interno"
      c="danger";
     }

  }

 async function Createnew() {
    resultStatus = result = "";
    const res = await fetch(API_BASE_JMR +"/", {
      method: 'POST',
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        iso_code: newDatosProvince,
        country: newDatosCountry,
        year: newDatosYear,
        urban_improved_total : newDatosurbanimprovedtotal,
        urban_improved_piped : newDatosurban_improved_piped,
        urban_improved_other : newDatosurban_improved_other,
        urban_unimproved_other : newDatosurban_unimproved_other,
        rural_improved_total : newDatosrural_improved_total,
        rural_improved_piped : newDatosrural_improved_piped,
        rural_improved_other : newDatosrural_improved_other,
        rural_unimproved_other : newDatosrural_unimproved_other,
        rural_unimproved_surface : newDatosrural_unimproved_surface,
        total_improved_total : newDatostotal_improved_total,
        total_improved_piped : newDatostotal_improved_piped,
        total_improved_other : newDatostotal_improved_other,
        total_unimproved_other : newDatostotal_unimproved_other,
        total_unimproved_surface : newDatostotal_unimproved_surface,
      })
    });    
    
    const status = await res.status;
    resultStatus = status;
    if (status==201) {
      getWaterStats();
      message="elemento creado"
      c="success";
    }else if(status==409){
      message="Conflicto, el elemento ya existe"
      c="warning";
    }else if(status==400){
      message="Rellena todos los campos"
      c="warning";
    }else if(status == 500){
      message="Internal Error"
      c="danger";
    }
  }

 async function deleteAll() {
    resultStatus = result = "";
    const res = await fetch(API_BASE_JMR + "/", {
      method: 'DELETE'
    });    
    
    const status = await res.status;
    resultStatus = status;
    if (status==200) {
      location.reload();
      window.alert("ESTAS SEGURO?");
    }
  }

let searchres=[];
  async function searchData(searchISO, searchCountry, searchYear) {
    resultStatus = result = "";
    const params = { iso_code: searchISO, country: searchCountry, year: searchYear};
    const validParams = Object.fromEntries(Object.entries(params).filter(value => value !== ""));
    const query = new URLSearchParams(validParams).toString();
    const res = await fetch(API_BASE_JMR+`?${query}`, {
      method: "GET"
    });
    
    try {
      const data = await res.json();
      result = JSON.stringify(data, null, 2);
      let data1 = Object.values(data);

      if (data1.length === 3) {
        const parsedData = [{
          iso_code: data1[0],
          country: data1[1],
          year: parseInt(data1[2]),
        }];
        searchres = parsedData;
      }else{
        searchres = data1;
      }
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }
    const status = await res.status;
    resultStatus = status;
    if (status == 200) {

      message = "Elemento encontrado";
      c = "success";
    } else if (status == 404) {
      message = "Elemento no encontrado";
      c = "danger";
    }else if (status == 500) {
      message = "Error interno";
      c = "danger";
    }
  }  



</script>

