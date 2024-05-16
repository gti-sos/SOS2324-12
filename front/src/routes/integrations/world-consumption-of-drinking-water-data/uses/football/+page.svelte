<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
</svelte:head>
<script>
  import { onMount, tick } from 'svelte';
  import { Container, Row, Col, Table } from '@sveltestrap/sveltestrap';

  let ligas = [];
  let cargandoDatos = true;

  onMount(async () => {
    await cargarLigas();
  });

  async function cargarLigas() {
    cargandoDatos = true;
    const url = 'https://api-football-standings.azharimm.dev/leagues';
    try {
      const response = await fetch(`/proxyAPI?url=${encodeURIComponent(url)}`);
      const result = await response.json();
      actualizarLigas(result.data);
    } catch (error) {
      console.error('Error al obtener datos de las ligas:', error);
      actualizarLigas([]);
    } finally {
      cargandoDatos = false;
      if (ligas.length > 0) {
        tick().then(crearGrafico); // Asegura que el DOM está actualizado y que hay datos
      }
    }
  }

  function actualizarLigas(nuevasLigas) {
    ligas = nuevasLigas;

    // Actualiza el gráfico cuando los datos cambian
    if (!cargandoDatos) {
      crearGrafico();
    }
  }

  function crearGrafico() {
    Highcharts.chart("grafico", {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Ligas de Fútbol'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Ligas',
        colorByPoint: true,
        data: ligas.map(liga => ({ name: liga.name, y: 1 }))
      }]
    });
  }
</script>

<main>
  <Container class="content-container" style="justify-content: center;">
    <Row>
      <Col><h1>Ligas de Fútbol</h1></Col>
    </Row>

    <Row>
      <Col>
        {#if cargandoDatos}
          <p>Cargando datos...</p>
        {:else if ligas.length > 0}
          <div id="grafico" style="width: 100%; height: 600px;"></div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre de la Liga</th>
                <th>Abreviatura</th>
                <th>Logo</th>
              </tr>
            </thead>
            <tbody>
              {#each ligas as liga, index}
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{liga.name}</td>
                  <td>{liga.abbr}</td>
                  <td><img src={liga.logos.light} alt={liga.name} width="50" height="50"/></td>
                </tr>
              {/each}
            </tbody>
          </Table>
        {:else}
          <p>No hay datos disponibles.</p>
        {/if}
      </Col>
    </Row>
  </Container>
</main>
