<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>

</svelte:head>
<script>
  import { onMount, tick} from 'svelte';
  import { Container, Row, Col, Table } from '@sveltestrap/sveltestrap';

  let datosnba = [];
  let temporadaSeleccionada = 2023;
  let cargandoDatos = true;

  onMount(async () => {
    await cargarDatosNBA(temporadaSeleccionada);
  });

  async function cargarDatosNBA(temporada) {
    cargandoDatos = true;
    const url = `https://nba-stats-db.herokuapp.com/api/playerdata/topscorers/total/season/${temporada}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      actualizarDatosNBA(result.results);
    } catch (error) {
      console.error('Error al obtener datos de la NBA:', error);
      actualizarDatosNBA([]);
    } finally {
      cargandoDatos = false;
      if (datosnba.length > 0) {
        tick().then(crearGrafico); // Asegura que el DOM está actualizado y que hay datos
      }
    }
};

  

  function actualizarDatosNBA(nuevosDatos) {
    datosnba = nuevosDatos;

    // Actualiza el gráfico cuando los datos cambian
    if (!cargandoDatos) {
      crearGrafico();
    }
  }

  function seleccionarTemporada(temporada) {
    temporadaSeleccionada = temporada;
    cargarDatosNBA(temporada);
  }

  function crearGrafico() {
    Highcharts.chart("grafico", {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Máximos anotadores NBA - Temporada ' + temporadaSeleccionada
      },
      xAxis: {
        categories: datosnba.map(jugador => jugador.player_name)
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Puntos'
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: [{
        name: 'Puntos',
        data: datosnba.map(jugador => jugador.PTS)
      }]
    });
  }
</script>

<main>
  <Container class="content-container" style="justify-content: center;">
    <Row>
      <Col><h1>Máximos anotadores NBA - Temporada {temporadaSeleccionada}</h1></Col>
    </Row>

    <Row>
      <Col>
        <select bind:value={temporadaSeleccionada} on:change={() => seleccionarTemporada(temporadaSeleccionada)}>
          <option value={2011}>2011</option>
          <option value={2012}>2012</option>
          <option value={2013}>2013</option>
          <option value={2014}>2014</option>
          <option value={2015}>2015</option>
          <option value={2016}>2016</option>
          <option value={2017}>2017</option>
          <option value={2018}>2018</option>
          <option value={2019}>2019</option>
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
        </select>
      </Col>
    </Row>

    <Row>
      <Col>
        {#if cargandoDatos}
          <p>Cargando datos...</p>
        {:else if datosnba.length > 0}
          <div id="grafico" style="width: 100%; height: 2200px;"></div>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Jugador</th>
                  <th>Equipo</th>
                  <th>Puntos</th>
                  <th>Partidos Jugados</th>
                  <th>Minutos Jugados</th>
                </tr>
              </thead>
              <tbody>
                {#each datosnba as jugador, index}
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{jugador.player_name}</td>
                    <td>{jugador.team}</td>
                    <td>{jugador.PTS}</td>
                    <td>{jugador.games}</td>
                    <td>{jugador.minutes_played}</td>
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
  