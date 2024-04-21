<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
</svelte:head>

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
		getChart();
	});

	// DATOS

	let countryData = [];

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

	// Function to calculate average food price (considering all food items)
	function calculateAverageFoodPriceCountry(foodData, country) {
		let totalFoodPrice = 0;
		let countFoodItems = 0;

		foodData.forEach((entry) => {
			const c = entry.adm0_name;
			const regionMatch = country === c;
			if (regionMatch && entry.cm_name == 'Bread') {
				totalFoodPrice += entry.mp_price;
				countFoodItems++;
			}
		});

		return countFoodItems > 0 ? totalFoodPrice / countFoodItems : 0;
	}

	async function getChart() {
		let listings = await getListings();
        let foodData = listings;

		if (listings.length === 0) {
			info = 'La base de datos está vacía, no es posible hacer las gráficas';
			v_info = true;
			f_info();
		} else {
			// Process food data (calculating average food price for each region)
			foodData.forEach((entry) => {
				const region = getRegion(entry.adm0_name);
				const c = entry.adm0_name;
				const existingEntry = countryData.find(
					(country) => country.region === region && country.c === entry.adm0_name
				);

				if (existingEntry) {
					existingEntry.averagePriceFood += calculateAverageFoodPriceCountry(foodData, c);
					existingEntry.countFood++;
				} else {
					countryData.push({
						region: region,
						country: c,
						averagePriceFood: calculateAverageFoodPriceCountry(foodData, c),
						countFood: 1
					});
				}
			});

			// Calculate averages (after updating all entries)
			countryData.forEach((entry) => {
				entry.averagePriceFood =
					entry.countFood > 0 ? (entry.averagePriceFood / entry.countFood).toFixed(2) : 0;
			});

			// Convertir los datos a un formato aceptado por Highcharts

/*			var datos = [];

			// Función para verificar si un elemento existe en el array
			function existsInData(region) {
				for (var i = 0; i < datos.length; i++) {
					if (datos[i].name === region) {
						return i;
					}
				}
				return -1;
			}

			// Recorrer el array original
			for (var i = 0; i < countryData.length; i++) {
				var regionIndex = existsInData(countryData[i].region);
				if (regionIndex === -1) {
					// Si la región no está en el array de datos, se agrega
					datos.push({
						name: countryData[i].region,
						data: [
							{ name: countryData[i].country, value: countryData[i].averagePriceFood }
						]
					});
				} else {
					// Si la región ya está en el array de datos, se añade el país y su precio promedio
					let p = countryData[i].country;
                    let pr = countryData[i].averagePriceFood
                    if (datos[regionIndex].values.data.includes({name: p, value:pr})) {
                        datos[regionIndex].values.data.push({
						name: p,
						value: pr
					})};
				}
			}

            console.log(datos)

			// Configurar el gráfico de burbujas
			const chart = Highcharts.chart('container', {
				chart: {
					type: 'packedbubble',
					height: '100%'
				},
				title: {
					text: 'Average price of Bread on different countries',
					align: 'left'
				},
				tooltip: {
					useHTML: true,
					pointFormat: '<b>{point.name}:</b> {point.value} /Kg'
				},
				plotOptions: {
					packedbubble: {
						minSize: '30%',
						maxSize: '120%',
						zMin: 0,
						zMax: 1000,
						layoutAlgorithm: {
							splitSeries: false,
							gravitationalConstant: 0.02
						},
						dataLabels: {
							enabled: true,
							format: '{point.name}',
							filter: {
								property: 'y',
								operator: '>',
								value: 250
							},
							style: {
								color: 'black',
								textOutline: 'none',
								fontWeight: 'normal'
							}
						}
					}
				},
				series: datos
			});
*/
        }

		// FIN GRAFICO DE BURBUJAS

		// GRAFICO 3D

		function calcularPrecioPromedio(datos) {
			// Objeto para almacenar el precio total y el recuento de cada producto
			var precios = {
				Bread: { total: 0, count: 0 },
				Wheat: { total: 0, count: 0 },
				'Rice (low quality)': { total: 0, count: 0 },
				'Fuel (diesel)': { total: 0, count: 0 }
			};

			// Recorrer los datos para calcular el precio total y el recuento de cada producto
			datos.forEach(function (dato) {
				var nombreProducto = dato.cm_name;
				if (precios.hasOwnProperty(nombreProducto)) {
					precios[nombreProducto].total += dato.mp_price;
					precios[nombreProducto].count++;
				}
			});

			// Calcular el precio promedio para cada producto
			var preciosPromedio = [];
			for (var producto in precios) {
				if (precios.hasOwnProperty(producto) && precios[producto].count > 0) {
					var precioPromedio = precios[producto].total / precios[producto].count;
					preciosPromedio.push([producto, Math.round(precioPromedio)]);
				}
			}

			return preciosPromedio;
		}

		// Calcular el precio promedio
		var preciosPromedio = calcularPrecioPromedio(listings);

		// Crear el objeto de salida
		var salida = [
			{
				name: 'Precio',
				data: preciosPromedio
			}
		];

        console.log(salida)

		// Configurar el gráfico de pastel
		const pie3DChart =
			Highcharts.chart('pieContainer', {
				chart: {
					type: 'pie',
					options3d: {
						enabled: true,
						alpha: 50
					}
				},
				title: {
					text: 'El combustible es mucho más caro que la comida',
					align: 'left'
				},
				subtitle: {
					text: '(valores por kg)',
					align: 'left'
				},
				plotOptions: {
					pie: {
						innerSize: 150,
						depth: 120
					}
				},
				series: salida
			});

	}
</script>

<main>
	<Container class="content-container" style="justify-content: center;">
		<Container>
			<Row>
				<Col><h1>Gráficas precios de la comida</h1></Col>
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
				<Row><Col><h3>Comparativa de precios medios por país del pan</h3></Col></Row>
				<Row><Col><div id="container" style="width:100%; height:400px;"></div></Col></Row>
				<br />
				<Row><Col><h3>Comparativa precios medios de los productos</h3></Col></Row>
				<Row><Col><div id="pieContainer" style="width:100%; height:400px;"></div></Col></Row>
			{/if}
		</Container>
	</Container>
</main>
