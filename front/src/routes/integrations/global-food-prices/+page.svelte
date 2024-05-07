<script>
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import {
		Button,
		Icon,
		FormGroup,
		Label,
		Input,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader,
		Alert,
		Card,
		CardBody,
		CardHeader,
		CardText,
		CardTitle,
		Row,
		Col,
		Container,
		ButtonDropdown,
		DropdownMenu,
		DropdownItem,
		DropdownToggle
	} from '@sveltestrap/sveltestrap';

	// VARIABLE RUTA API

	let API = '/api/v2/global-food-prices';
	if (dev) API = 'http://localhost:10000' + API;

	// ALERTA INFO

	let info = '';
	let v_info = false;
	function f_info() {
		setTimeout(function () {
			v_info = false;
		}, 6000);
	}

	// INICIALIZAR GRÁFICAS

	onMount(async () => {
		integration1();
		integration2();
		integration3();
	});

	// DATOS

	async function getInitialListings() {
		let response = await fetch(API + '/loadInitialData', {
			method: 'GET'
		});
		const status = await response.status;
		if (status == 201) {
			getListings();
			window.location.reload();
		} else {
			console.log('Error al cargar datos');
		}
	}

	async function getListings() {
		let list = [];

		const response = await fetch(API, {
			method: 'GET'
		});

		try {
			const data = await response.json();
			list = data;
		} catch (error) {
			console.log(`Error: ${error}`);
		}

		const status = await response.status;

		return list;
	}

	function getRegion(country) {
		const regions = {
			Asia: [
				'Afghanistan',
				'Cambodia',
				'Iraq',
				'Japan',
				'Lebanon',
				'Hong Kong',
				'Malaysia',
				'Thailand',
				'Turkey',
				'China',
				'Russia',
				'India'
			],
			Europe: [
				'Albania',
				'Andorra',
				'Bulgaria',
				'France',
				'Germany',
				'Italy',
				'Switzerland',
				'United Kingdom',
				'Spain'
			],
			Africa: [
				'Algeria',
				'Angola',
				'Burkina Faso',
				'Burundi',
				'Cameroon',
				'Central African Republic',
				'Chad',
				'Egypt',
				'Nigeria',
				'South Africa'
			],
			'North America': ['Canada', 'United States', 'Mexico'],
			'South America': ['Argentina', 'Chile', 'Brazil'],
			Oceania: [
				'American Samoa',
				'Anguilla',
				'Antigua and Barbuda',
				'Cayman Islands',
				'Cape Verde',
				'Australia',
				'New Zealand'
			]
		};

		// Iterar sobre las regiones y verificar si el país está en alguna de ellas
		for (const region in regions) {
			if (regions[region].includes(country)) {
				return region;
			}
		}

		// Si no se encuentra ninguna coincidencia, devolver "Unknown"
		return 'Unknown';
	}

	async function integration1() {
		const url =
			'https://visual-crossing-weather.p.rapidapi.com/history?startDateTime=2015-09-01T00%3A00%3A00&aggregateHours=24&location=Afghanistan&endDateTime=2016-04-31T00%3A00%3A00&unitGroup=metric&contentType=json';
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '86f188c83amsh7d037daa577bc3fp1fc5a3jsn27279c5d02d7',
				'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
			}
		};

		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);

		const datos = result.locations.Afghanistan.values;

		let fechas = [];
		let maxts = [];
		let humedades = [];

		datos.forEach((e) => {
			fechas.push(e.datetimeStr.substring(0, 10));
			maxts.push(e.maxt);
			humedades.push(e.humidity);
		});

		const integration1 = Highcharts.chart('integration1', {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Temperatura máxima y humedad en Afghanistan',
				align: 'left'
			},
			subtitle: {
				text: 'Entre 01/09/2015 - 31/04/2016',
				align: 'left'
			},
			xAxis: {
				categories: fechas,
				crosshair: true,
				accessibility: {
					description: 'Fechas'
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Medida'
				}
			},
			tooltip: {
				valueSuffix: 'Unidades'
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			series: [
				{
					name: 'Temperaturas máximas',
					data: maxts
				},
				{
					name: 'Humedad',
					data: humedades
				}
			]
		});
	}

	async function integration2() {
		const url =
			'https://grocery-pricing-api.p.rapidapi.com/searchGrocery?keyword=sweet%20potato&perPage=10&page=1';
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '86f188c83amsh7d037daa577bc3fp1fc5a3jsn27279c5d02d7',
				'X-RapidAPI-Host': 'grocery-pricing-api.p.rapidapi.com'
			}
		};

		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);

		let data = [];

		result.hits.forEach((e) => {
			let precioVenta = parseFloat(e.priceInfo.linePrice.substring(1, 5));
			let precioItem = precioVenta;
			let ahorrado = 0;
			if (e.priceInfo.itemPrice != '') {
				precioItem = parseFloat(e.priceInfo.itemPrice.substring(1, 5));
				ahorrado = precioItem - precioVenta;
			}
			let o = {
				x: precioItem,
				y: precioVenta,
				z: ahorrado,
				name: e.name,
				country: e.shortDescription
			};

			data.push(o);
		});

		const integration2 = Highcharts.chart('integration2', {
			chart: {
				type: 'bubble',
				plotBorderWidth: 1,
				zoomType: 'xy'
			},

			legend: {
				enabled: false
			},

			title: {
				text: 'Precio de la batata en EEUU'
			},

			subtitle: {
				text: 'En dólares'
			},

			accessibility: {
				point: {
					valueDescriptionFormat:
						'{index}. {point.name}, precioItem: {point.x}, precioVenta: {point.y}, ahorrado: {point.z}.'
				}
			},

			xAxis: {
				gridLineWidth: 1,
				title: {
					text: 'Precio item'
				},
				labels: {
					format: '{value} dólares'
				}
			},

			yAxis: {
				startOnTick: false,
				endOnTick: false,
				title: {
					text: 'Precio de venta'
				},
				labels: {
					format: '{value} dólares'
				},
				maxPadding: 0.2
			},

			tooltip: {
				useHTML: true,
				headerFormat: '<table>',
				pointFormat:
					'<tr><th colspan="1">{point.country}</h3></th></tr>' +
					'<tr><th>Precio item:</th><td>{point.x} dólares</td></tr>' +
					'<tr><th>Precio venta:</th><td>{point.y} dólares</td></tr>' +
					'<tr><th>Ahorrado:</th><td>{point.z}</td></tr>',
				footerFormat: '</table>',
				followPointer: true
			},

			series: [
				{
					data,
					colorByPoint: true
				}
			]
		});
	}

	async function integration3() {
		const url = 'https://chinese-food-db.p.rapidapi.com';
		const option = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '86f188c83amsh7d037daa577bc3fp1fc5a3jsn27279c5d02d7',
				'X-RapidAPI-Host': 'chinese-food-db.p.rapidapi.com'
			}
		};

		const response = await fetch(url, option);
		const result = await response.json();
		console.log(result);

		let faciles = ['Fáciles'];
		let medias = ['Medio'];
		let facil = 0;
		let media = 0;

		result.forEach((e) => {
			switch (e.difficulty) {
				case 'Easy':
					facil++;
					break;
				case 'Medium':
					media++;
					break;
			}
		});

		faciles.push(facil);
		medias.push(media);

		var data = google.visualization.arrayToDataTable([
			['Dificultad', 'Número de comidas'],
			faciles,
			medias
		]);

		var options = {
			title: 'Dificultad de hacer comidas chinas',
			is3D: true
		};

		var chart = new google.visualization.PieChart(document.getElementById('integration3'));
		chart.draw(data, options);
	}
</script>

<svelte:head>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/highcharts-more.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>
	<script src="https://www.gstatic.com/charts/loader.js"></script>
	<script>
		google.charts.load('current', { packages: ['corechart'] });
	</script>
</svelte:head>

<main>
	<Container class="content-container" style="justify-content: center;">
		<Container>
			<Row>
				<Col><h1>Gráficas integradas</h1></Col>
			</Row>
		</Container>
		<br />

		<Container>
			{#if info != ''}
				<Row
					><Col
						><Alert color="info" isOpen={v_info} toggle={() => (v_info = false)}>{info}</Alert></Col
					></Row
				>
				<Container class="text-center">
					<Row>
						<Col cols={{ xs: 4 }}>
							<Button color="warning" on:click={getInitialListings}>Cargar datos</Button>
						</Col>
					</Row>
				</Container>
				<br />
			{:else}
				<Row><Col><h3>Temperatura en Afghanistan</h3></Col></Row>
				<Row><Col><div id="integration1" style="width:100%; height:400px;"></div></Col></Row>
				<br />
				<Row><Col><h3>Precio del boniato en EEUU</h3></Col></Row>
				<Row><Col><div id="integration2" style="width:100%; height:400px;"></div></Col></Row>
				<br />
				<Row><Col><h3>Dificultad para hacer comidas chinas</h3></Col></Row>
				<Row><Col><div id="integration3" style="width:100%; height:400px;"></div></Col></Row>
				<br />
			{/if}
		</Container>
	</Container>
</main>
