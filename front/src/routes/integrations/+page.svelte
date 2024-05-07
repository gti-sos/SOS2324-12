<!-- HACER PÁGINA CON 3 BOTONES PARA REDIRIGIR A LAS INTEGRACIONES DE CADA UNO -->
<!-- PÁGINA PROVISIONAL -->

<script>
    import { ButtonGroup, Button } from '@sveltestrap/sveltestrap';
    
    function redireccionar(url) {
      window.location.href = url;
    }
  </script>
  
  <h1>Redireccionar a URL</h1>
  <ButtonGroup>
    <Button variant="primary" on:click={() => redireccionar('https://sos2324-12.appspot.com/integraciones/global-food-prices')}>borfloave</Button>
    <Button variant="primary" on:click={() => redireccionar('https://sos2324-12.appspot.com/integraciones/world-consumption-of-drinking-water-data')}>josmenrue</Button>
    <Button variant="primary" on:click={() => redireccionar('https://sos2324-12.appspot.com/integraciones/airbnb-listings')}>josmarsua</Button>
  </ButtonGroup>
  