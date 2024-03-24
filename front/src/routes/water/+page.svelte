<script>


https://github.com/gti-sos/SOS2223-19/blob/main/frontend/src/routes/occupation-stats/%2Bpage.svelte


 import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import { Button, Table, Alert, Icon } from 'sveltestrap';
  import {} from "./style.css";
  
  onMount(async () => {
    await getWaterStats();
  });

  let API_BASE_JMR = "/api/v1/world-consumption-of-drinking-water-data";
  
  let newDatosISO = '';
  let newDatosCountry = '';
  let newDatosYear = '';

  let searchISO = "";
  let searchCountry = "";
  let searchYear = "";


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
    const res = await fetch(API+'/loadInitialData', {
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

<ul>
    {#each datos as dato}
        <div>
            <p>ISO: {dato.ISO}</p>
            <p>País: {dato.country}</p>
            <p>Año: {dato.year}</p>
        </div>
    {/each}
</ul> 



</script>

