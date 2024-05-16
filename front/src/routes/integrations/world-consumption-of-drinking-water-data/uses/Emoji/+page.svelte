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

  let emojis = [];
  let cargandoDatos = true;

  onMount(async () => {
    await cargarEmojis();
  });

  async function cargarEmojis() {
    cargandoDatos = true;
    const url = 'https://emojihub.yurace.pro/api/all';
    try {
      const response = await fetch(url);
      const result = await response.json();
      actualizarEmojis(result);
    } catch (error) {
      console.error('Error al obtener datos de los emojis:', error);
      actualizarEmojis([]);
    } finally {
      cargandoDatos = false;
      if (emojis.length > 0) {
        tick().then(crearGrafico); // Asegura que el DOM está actualizado y que hay datos
      }
    }
  }

  function actualizarEmojis(nuevosEmojis) {
    emojis = nuevosEmojis;

    // Actualiza el gráfico cuando los datos cambian
    if (!cargandoDatos) {
      crearGrafico();
    }
  }

  function crearGrafico() {
    Highcharts.chart("grafico", {
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
      },
      title: {
        text: 'Emojis'
      },
      xAxis: {
        gridLineWidth: 1,
        title: {
          text: 'Categorías'
        },
        labels: {
          format: '{value}'
        }
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
          text: 'Grupos'
        },
        labels: {
          format: '{value}'
        },
        maxPadding: 0.2
      },
      tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th>Emoji:</th><td>{point.name}</td></tr>' +
          '<tr><th>Categoría:</th><td>{point.category}</td></tr>' +
          '<tr><th>Grupo:</th><td>{point.group}</td></tr>',
        footerFormat: '</table>',
        followPointer: true
      },
      series: [{
        data: emojis.map((emoji, index) => ({
          x: index,
          y: 1,
          z: 1,
          name: emoji.name,
          category: emoji.category,
          group: emoji.group
        }))
      }]
    });
  }
</script>

<main>
  <Container class="content-container" style="justify-content: center;">
    <Row>
      <Col><h1>Emojis</h1></Col>
    </Row>

    <Row>
      <Col>
        {#if cargandoDatos}
          <p>Cargando datos...</p>
        {:else if emojis.length > 0}
          <div id="grafico" style="width: 100%; height: 800px;"></div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre del Emoji</th>
                <th>Categoría</th>
                <th>Grupo</th>
                <th>HTML Code</th>
                <th>Unicode</th>
              </tr>
            </thead>
            <tbody>
              {#each emojis as emoji, index}
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{emoji.name}</td>
                  <td>{emoji.category}</td>
                  <td>{emoji.group}</td>
                  <td>{emoji.htmlCode.join(', ')}</td>
                  <td>{emoji.unicode.join(', ')}</td>
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
