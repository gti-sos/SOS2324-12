<svelte:head>
	<script src="https://cdn.canvasjs.com/canvasjs.min.js"></script>
</svelte:head>

<script>
    import { onMount } from "svelte";
    import { Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardText, Button} from '@sveltestrap/sveltestrap';

    let API_JOTA1 = '/proxyJOTA';
    let geographicalData = [];

    async function API_ASC_1() {
		try {
			let response = await fetch(API_JOTA1, {
				method: 'GET'
			});

			if (response.ok) {
				let data = await response.json();
				console.log(data);
				let covidData = transformData1(data);
				console.log(covidData);
				crearGrafico1(covidData);
			} else {
				if (response.status == 404) {
					errorMsg = 'No hay datos en la base de datos';
				} else {
					errorMsg = `Error ${response.status}: ${response.statusText}`;
				}
			}
		} catch (e) {
			errorMsg = e;
		}
	}

	function transformData1(data) {
		console.log(data); // Verificamos que los datos se estén recibiendo correctamente

		// Utilizamos reduce para agrupar los datos por provincia y contar las muertes por COVID-19 en cada provincia
		const countryData = data.data.reduce((acc, curr) => {
			// Accedemos a la propiedad region.province para obtener el nombre de la provincia
			const province = curr.region.province;

			// Verificamos si la provincia ya está en el acumulador
			if (!acc[province]) {
				acc[province] = { deaths: 0 };
			}

			// Sumamos las muertes al contador de muertes de la provincia actual
			acc[province].deaths += curr.deaths || 0;

			return acc;
		}, {});

		// Convertimos los datos agrupados en un arreglo de objetos con la estructura necesaria para la gráfica
		const sortedData = Object.entries(countryData).map(([province, data]) => ({
			province,
			deaths: data.deaths
		}));

		// Ordenamos los datos por el número de muertes en orden descendente
		sortedData.sort((a, b) => b.deaths - a.deaths);

		// Creamos el objeto chartData con las categorías (provincias) y la serie de datos (muertes)
		const chartData = {
			categories: sortedData.map((item) => item.province),
			series: sortedData.map((item) => ({
				deaths: item.deaths
			}))
		};

		console.log(chartData); // Verificamos que los datos transformados sean correctos

		return chartData;
	}

	function crearGrafico1(chartData) {
		// Excluir el último elemento de la lista
		const dataLength = chartData.categories.length;
		const dataPoints = chartData.categories.slice(0, dataLength - 1).map((category, index) => {
			return {
				label: category,
				y: chartData.series[index].deaths
			};
		});

		let options = {
			animationEnabled: true,
			title: {
				text: 'Muertes de COVID-19 por provincia en España'
			},
			data: [
				{
					type: 'pie',
					showInLegend: true,
					legendText: '{label}',
					indexLabel: '{label}: {y}',
					dataPoints: dataPoints
				}
			]
		};

		let chart = new CanvasJS.Chart('chart1', options);
		chart.render();
	}


    onMount(async () => {
        await getData();
    });

</script>

<main>
    <Container class="content-container" style="justify-content: center;"> 
    <div id="chart1" style="height: 300px; width: 100%;"></div>
    </Container>
</main>

<style>
    /* Estilo de textos */
    .title {
        font-family: 'Arial', sans-serif;
        font-size: 2.5rem;
        color: #ff4a9e;
        text-align: center;
        margin-bottom: 20px;
    }

    .card-title {
        font-family: 'Arial', sans-serif;
        font-size: 1.8rem;
        color: #0e2ac8;
        margin-bottom: 5px;
    }

    .card-info {
        font-family: 'Arial', sans-serif;
        font-size: 1.4rem;
        color: #555;
        text-align: center;
        margin-bottom: 10px;
    }

    /* Estilos de las cartas */
    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .card {
        width: calc(30% - 20px);
        margin: 0 10px 20px;
        border-radius: 10px;
        padding: 15px;
        background-color: #f9f9f9;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .loading {
        font-family: 'Arial', sans-serif;
        font-size: 1.6rem;
        color: #888;
        text-align: center;
        margin-top: 20px;
    }
</style>

