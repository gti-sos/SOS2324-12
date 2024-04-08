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
	import { query_selector_all } from 'svelte/internal';
	import { Pagination, PaginationItem, PaginationLink } from '@sveltestrap/sveltestrap';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import {
		faTrash,
		faPencil,
		faSpinner,
		faPlus,
		faFilter,
		faCheck,
		faXmark,
		faArrowLeft,
		faArrowRight,
		faHouse,
		faAngleDoubleLeft,
		faAngleDoubleRight,
		faList
	} from '@fortawesome/free-solid-svg-icons';

	// Rutas
	let API = '/api/v1/global-food-prices';
	if (dev) API = 'http://localhost:10000' + API;

	// ===============================================
	// Variables
	// ===============================================

	let listings = []; // Data
	let showForm = false;
	let showFilter = false;
	let confirmModal = false;
	let newListing = {
		adm0_id: '',
		adm0_name: '',
		adm1_id: '',
		adm1_name: '',
		mkt_id: '',
		mkt_name: '',
		cm_id: '',
		cm_name: '',
		cur_id: '',
		cur_name: '',
		pt_id: '',
		pt_name: '',
		um_id: '',
		um_name: '',
		mp_month: '',
		mp_year: '',
		mp_price: '',
		mp_commoditysource: ''
	};
	let selectedFilter = {
		adm0_id: '',
		adm0_name: '',
		adm1_id: '',
		adm1_name: '',
		mkt_id: '',
		mkt_name: '',
		cm_id: '',
		cm_name: '',
		cur_id: '',
		cur_name: '',
		pt_id: '',
		pt_name: '',
		um_id: '',
		um_name: '',
		mp_month: '',
		mp_year: '',
		mp_price: '',
		mp_commoditysource: ''
	};

	let year = '';
	let minprice = '';
	let maxprice = '';
	let from = '';
	let to = '';

	let error_msg = '';
	let success_msg = '';
	let success2_msg = '';
	let success3_msg = '';

	let size = 'lg';
	const toggle = () => {
		size = 'lg';
		showFilter = !showFilter;
	};
	const toggle2 = () => {
		size = 'lg';
		showForm = !showForm;
	};
	const toggle3 = () => {
		size = 'lg';
		confirmModal = !confirmModal;
	};

	// Paginacion

	let currentPage = 1;
	//let totalItems = 0;
	const pageSize = 10;
	let totalItems = 0;
	let pagination = 0;
	let valor = -1;

	function firstPage() {
		pagination = 0;
		getListings();
		window.scrollTo(0, 0);
	}

	function nextPage() {
		if (pagination != valor) {
			pagination++;
			getListings();
			window.scrollTo(0, 0);
		}
	}
	function prevPage() {
		if (pagination >= 1) {
			pagination--;
			getListings();
			window.scrollTo(0, 0);
		}
	}
	function lastPage() {
		pagination = valor;
		getListings();
	}

	async function countData() {
		const response = await fetch(API, {
			method: 'GET'
		});
		const data = await response.json();
		let numElements = Array.isArray(data) ? data.length : 0;
		let last_page = Math.floor(numElements / 10);
		valor = last_page;
	}

	// Inicialización

	onMount(async () => {
		await getListings();
		// Temporizador para ocultar automáticamente las alertas después de 10 segundos
		setTimeout(() => {
			error_msg = '';
			success_msg = '';
			success2_msg = '';
		}, 10000);
	});

	async function getInitialListings() {
		let response = await fetch(API + '/loadInitialData', {
			method: 'GET'
		});
		const status = await response.status;
		if (status == 201) {
			getListings();
			success2_msg = 'Datos iniciales cargados correctamente';
			error_msg = '';

			window.scrollTo(0, 0);
		} else if (status == 200) {
			error_msg = 'La base de datos ya está cargada';
			success_msg = '';
			window.scrollTo(0, 0);
		} else if (status == 500) {
			error_msg = 'Ha ocurrido un error en el servidor';
			success_msg = '';
			window.scrollTo(0, 0);
		}
	}

	async function getListings() {
		// Construye los parámetros de búsqueda
		let searchParams = new URLSearchParams();
		for (const key in selectedFilter) {
			if (selectedFilter[key] !== '') {
				searchParams.append(key, selectedFilter[key]);
			}
		}
		searchParams.append('limit', pageSize);
		searchParams.append('offset', pagination * pageSize);
		if (year !== '' && !isNaN(year)) {
			searchParams.append('year', year);
		}
		if (minprice !== '' && !isNaN(minprice)) {
			searchParams.append('min_price', minprice);
		}
		if (maxprice !== '' && !isNaN(maxprice)) {
			searchParams.append('max_price', maxprice);
		}
		if (from !== '' && !isNaN(from)) {
			searchParams.append('from', from);
		}
		if (to !== '' && !isNaN(to)) {
			searchParams.append('to', to);
		}

		// Realiza la solicitud a la API con los parámetros de búsqueda
		let searchUrl = `${API}?${searchParams.toString()}`;
		let response = await fetch(searchUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// Manejo de la respuesta de la API
		let status = response.status;
		console.log(`Response status: ${status}`);

		if (response.status == 200) {
			// Actualiza los datos después de una búsqueda exitosa
			success_msg = 'Mostrando los datos solicitados';
			error_msg = '';
			let data = await response.json();
			listings = data;
			adm0_names = [...new Set(data.map((resource) => resource.adm0_name))];
			adm1_names = [...new Set(data.map((resource) => resource.adm1_name))];
			mkt_names = [...new Set(data.map((resource) => resource.mkt_name))];
			cm_names = [...new Set(data.map((resource) => resource.cm_name))];
			cur_names = [...new Set(data.map((resource) => resource.cur_name))];
			pt_names = [...new Set(data.map((resource) => resource.pt_name))];
			um_names = [...new Set(data.map((resource) => resource.um_name))];
			mp_commoditysources = [...new Set(data.map((resource) => resource.mp_commoditysource))];
			window.scrollTo(0, 0);
			console.log(data);
		} else {
			// Manejo de errores
			if (response.status == 400) {
				error_msg = 'Error en la estructura de los datos';
				success2_msg = '';
				success_msg = '';
				window.scrollTo(0, 0);
			} else if (response.status == 404) {
				error_msg = 'No se encontraron datos';
				success2_msg = '';
				success_msg = '';
				window.scrollTo(0, 0);
			} else if (status == 500) {
				error_msg = 'Ha ocurrido un error en el servidor';
				success_msg = '';
				success2_msg = '';
				window.scrollTo(0, 0);
			}
		}
	}

	async function searchListings() {
		try {
			// Construye la URL de búsqueda a partir de los filtros proporcionados
			let searchParams = new URLSearchParams();
			if (Object.keys(selectedFilter).length === 0) {
				selectedFilter = {
					adm0_id: '',
					adm0_name: '',
					adm1_id: '',
					adm1_name: '',
					mkt_id: '',
					mkt_name: '',
					cm_id: '',
					cm_name: '',
					cur_id: '',
					cur_name: '',
					pt_id: '',
					pt_name: '',
					um_id: '',
					um_name: '',
					mp_month: '',
					mp_year: '',
					mp_price: '',
					mp_commoditysource: ''
				};
			}
			for (const key in selectedFilter) {
				if (selectedFilter[key] !== '') {
					searchParams.append(key, selectedFilter[key]);
				}
			}
			if (year !== '' && !isNaN(year)) {
				searchParams.append('year', year);
			}
			if (minprice !== '' && !isNaN(minprice)) {
				searchParams.append('min_price', minprice);
			}
			if (maxprice !== '' && !isNaN(maxprice)) {
				searchParams.append('max_price', maxprice);
			}
			if (from !== '' && !isNaN(from)) {
				searchParams.append('from', from);
			}
			if (to !== '' && !isNaN(to)) {
				searchParams.append('to', to);
			}

			// Agrega los parámetros de paginación a los filtros
			pagination = 0;
			searchParams.append('limit', pageSize);
			searchParams.append('offset', pagination * pageSize);
			let searchUrl = `${API}?${searchParams.toString()}`;
			console.log(searchUrl);
			// Realiza la petición GET a la API con la URL de búsqueda generada
			let response = await fetch(searchUrl, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			// Manejo de la respuesta de la API
			let status = response.status;
			console.log(`Response status: ${status}`);

			if (response.status == 200) {
				// Actualiza los datos después de una búsqueda exitosa
				success_msg = 'Mostrando los datos solicitados';
				error_msg = '';
				let data = await response.json();
				listings = data;
				console.log(data);
			} else {
				// Manejo de errores
				if (response.status == 400) {
					error_msg = 'Error en la estructura de los datos';
				} else if (response.status == 404) {
					error_msg = 'No se encontraron datos';
				}
			}
		} catch (error) {
			error_msg = error;
			console.log(error);
		}
	}

	async function createListing() {
		if (
			!newListing.adm0_id ||
			!newListing.adm0_name ||
			!newListing.adm1_id ||
			!newListing.adm1_name ||
			!newListing.mkt_id ||
			!newListing.mkt_name ||
			!newListing.cm_id ||
			!newListing.cm_name ||
			!newListing.cur_id ||
			!newListing.cur_name ||
			!newListing.pt_id ||
			!newListing.pt_name ||
			!newListing.um_id ||
			!newListing.um_name ||
			!newListing.mp_month ||
			!newListing.mp_year ||
			!newListing.mp_price ||
			!newListing.mp_commoditysource
		) {
			error_msg = 'Por favor, completa todos los campos.';
			success_msg = '';
			return;
		}
		let response = await fetch(API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newListing)
		});
		const status = response.status;
		if (status == 201) {
			success2_msg = 'Se ha creado correctamente el dato';
			error_msg = '';
			showForm = false;
			await getListings();
		} else if (status == 400) {
			error_msg = 'Petición invalida. Revisa si has introducido todos los datos';
			success_msg = '';
		} else if (status == 405) {
			error_msg = 'Este método no está permitido';
			success_msg = '';
		} else if (status == 409) {
			error_msg = 'El dato introducido ya existe';
			success_msg = '';
		} else if (status == 500) {
			error_msg = 'Ha ocurrido un error en el servidor';
			success_msg = '';
		}
	}

	async function deleteAll() {
		let response = await fetch(API, {
			method: 'DELETE'
		});
		const status = response.status;
		if (status == 200) {
			success_msg = 'Todos los datos han sido eliminados';
			error_msg = '';
			setTimeout(() => {
				window.location.reload();
			}, 3000);
		} else if (status == 204) {
			error_msg =
				'No se encontraron datos para eliminar, es posible que la base de datos esté vacía';
			success_msg = '';
			window.scrollTo(0, 0);
		} else if (status == 500) {
			error_msg = 'Ha ocurrido un error en el servidor';
			success_msg = '';
			window.scrollTo(0, 0);
		}
	}

	async function deleteListing(
		adm0_id,
		adm1_id,
		mkt_id,
		cm_id,
		cur_id,
		pt_id,
		um_id,
		mp_month,
		mp_year
	) {
		let response = await fetch(
			API +
				'/' +
				adm0_id +
				'/' +
				adm1_id +
				'/' +
				mkt_id +
				'/' +
				cm_id +
				'/' +
				cur_id +
				'/' +
				pt_id +
				'/' +
				um_id +
				'/' +
				mp_month +
				'/' +
				mp_year,
			{
				method: 'DELETE'
			}
		);
		const status = response.status;
		if (status == 200) {
			success2_msg = 'El recurso ha sido eliminado';
			error_msg = '';
			getListings();
			window.scrollTo(0, 0);
		} else if (status == 204) {
			error_msg = 'No se encontró ningún recurso con los IDs especificados';
			success_msg = '';
			window.scrollTo(0, 0);
		} else if (status == 500) {
			error_msg = 'Ha ocurrido un error en el servidor';
			success_msg = '';
			window.scrollTo(0, 0);
		}
	}

	async function cleanFilter() {
		(selectedFilter.adm0_id = ''),
			(selectedFilter.adm0_name = ''),
			(selectedFilter.adm1_id = ''),
			(selectedFilter.adm1_name = ''),
			(selectedFilter.mkt_id = ''),
			(selectedFilter.mkt_name = ''),
			(selectedFilter.cm_id = ''),
			(selectedFilter.cm_name = ''),
			(selectedFilter.cur_id = ''),
			(selectedFilter.cur_name = ''),
			(selectedFilter.pt_id = ''),
			(selectedFilter.pt_name = ''),
			(selectedFilter.um_id = ''),
			(selectedFilter.um_name = ''),
			(selectedFilter.mp_month = ''),
			(selectedFilter.mp_year = ''),
			(selectedFilter.mp_price = ''),
			(selectedFilter.mp_commoditysource = ''),
			(year = ''),
			(minprice = ''),
			(maxprice = ''),
			(from = ''),
			(to = ''),
			(pagination = 0);
		success2_msg = 'Filtros limpiados correctamente';
		error_msg = '';
		success_msg = '';
		getListings();
	}
	let adm0_names = [];
	let adm1_names = [];
	let mkt_names = [];
	let cm_names = [];
	let cur_names = [];
	let pt_names = [];
	let um_names = [];
	let mp_commoditysources = [];
</script>

<Container class="content-container" style="justify-content: center;">
	<!--______________________________________Cabecera_____________________________________-->
	<Container style="justify-content: center; text-align: center;">
		<h1>Datos de precios de la comida a nivel mundial</h1>
	</Container>

	<br />

	<!--______________________________________Botones_____________________________________-->
	<Container class="text-center">
		<Row>
			<Col cols={{ xs: 4 }}>
				<Button color="warning" on:click={getInitialListings}>Cargar Datos Iniciales</Button>
			</Col>
			<Col cols={{ xs: 4 }}>
				<Button
					color="success"
					on:click={() => {
						showForm = true;
					}}>Crear Nuevo Dato</Button
				>
			</Col>
			<Col>
				<Button
					color="primary"
					on:click={() => {
						showFilter = true;
					}}><Fa icon={faFilter} /> Filtros</Button
				>
			</Col>
			<Col>
				<Button color="secondary" on:click={cleanFilter}
					><Fa icon={faList} /> Limpiar filtros</Button
				>
			</Col>
			<Col cols={{ xs: 4 }}>
				<Button
					color="danger"
					id="deleteAllButton"
					on:click={() => {
						confirmModal = true;
					}}><Fa icon={faTrash} /> Borrar Todos los Datos</Button
				>
			</Col>
		</Row>
	</Container>
	<br />

	{#if error_msg != ''}
		<Alert color="danger">
			<strong>Error:</strong>
			{error_msg}
		</Alert>
	{:else if success_msg != ''}
		<Alert color="success">
			<strong>Éxito:</strong>
			{success_msg}
		</Alert>
	{/if}
	{#if success2_msg != ''}
		<Alert color="success">
			<strong>Éxito:</strong>
			{success2_msg}
		</Alert>
	{/if}
	<br />
	<hr />
	<!-- Bloque condicional if con modal -->

	{#if showFilter}
		<Modal isOpen={showFilter} {toggle} {size}>
			<ModalHeader {toggle}>Filtrar datos</ModalHeader>
			<ModalBody>
				<form on:submit|preventDefault={searchListings}>
					<Container fluid>
						<Row>
							<Col>
								<FormGroup>
									<Label for="adm0_id">Country ID</Label>
									<Input type="number" id="adm0_id" bind:value={selectedFilter.adm0_id} required />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="adm0_name">Country Name</Label>
									<Input type="select" id="adm0_name" bind:value={selectedFilter.adm0_name}/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="adm1_id">Locality ID</Label>
									<Input type="number" id="adm1_id" bind:value={selectedFilter.adm1_id} required />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="adm1_name">Locality name</Label>
									<Input type="select" id="adm1_name" bind:value={selectedFilter.adm1_name}/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup>
									<Label for="mkt_id">Market ID</Label>
									<Input type="number" id="mkt_id" bind:value={selectedFilter.mkt_id} required />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="mkt_name">Market name</Label>
									<Input type="text" id="mkt_name" bind:value={selectedFilter.mkt_name} required />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="cm_id">Commodity Purchase ID</Label>
									<Input type="number" id="cm_id" bind:value={selectedFilter.cm_id} required />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="cm_name">Commodity Purchase name</Label>
									<Input type="text" id="cm_name" bind:value={selectedFilter.cm_name} required />
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup>
									<Label for="cur_id">Currency ID</Label>
									<Input type="number" id="cur_id" bind:value={selectedFilter.cur_id} required />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="cur_name">Currency name</Label>
									<Input type="text" id="cur_name" bind:value={selectedFilter.cur_name} required />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="pt_id">Product ID</Label>
									<Input type="number" id="pt_id" bind:value={selectedFilter.pt_id} required />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="pt_name">Product name</Label>
									<Input type="text" id="pt_name" bind:value={selectedFilter.pt_name} required />
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup>
									<Label for="um_id">Measurement ID</Label>
									<Input type="number" id="um_id" bind:value={selectedFilter.um_id} required />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="um_name">Unit of goods measurement</Label>
									<Input type="text" id="um_name" bind:value={selectedFilter.um_name} required />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="mp_month">Month recorded</Label>
									<Input
										type="number"
										id="mp_month"
										bind:value={selectedFilter.mp_month}
										required
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="mp_year">Year recorder</Label>
									<Input type="number" id="mp_year" bind:value={selectedFilter.mp_year} required />
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup>
									<Label for="mp_price">Price</Label>
									<Input
										type="number"
										id="mp_price"
										bind:value={selectedFilter.mp_price}
										required
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="mp_commoditysource">Source supplying price information</Label>
									<Input
										type="text"
										id="mp_commoditysource"
										bind:value={selectedFilter.mp_commoditysource}
										required
									/>
								</FormGroup>
							</Col>
						</Row>
					</Container>
				</form>
			</ModalBody>
			<ModalFooter>
				<Container style="justify-content: center; text-align: center;">
					<Button
						color="primary"
						on:click={() => {
							searchListings();
							toggle();
						}}><Fa icon={faCheck} /> Aplicar filtros</Button
					>
					<Button color="secondary" on:click={toggle}><Fa icon={faXmark} /> Cerrar</Button>
					<Button color="secondary" on:click={cleanFilter}
						><Fa icon={faList} /> Limpiar filtros</Button
					>
				</Container>
			</ModalFooter>
			<Container>
				{#if error_msg != ''}
					<Alert color="danger">
						<strong>Error:</strong>
						{error_msg}
					</Alert>
				{:else if success_msg != ''}
					<Alert color="success">
						<strong>Éxito:</strong>
						{success_msg}
					</Alert>
				{/if}
				{#if success2_msg != ''}
					<Alert color="success">
						<strong>Éxito:</strong>
						{success2_msg}
					</Alert>
				{/if}
			</Container>
		</Modal>
	{/if}
	<Row cols={{ xs: 2, sm: 3, md: 3, lg: 3, xl: 4 }}>
		{#each listings as listing}
			<Col class="mb-3">
				<Card class="tarjeta">
					<CardHeader>
						<CardTitle class="card-title">{listing.cm_name}</CardTitle>
					</CardHeader>
					<CardBody class='tarjetas-datos'>
						<CardText>
							<strong>País ID:</strong>{listing.adm0_id} <br />
							<strong>Nombre del país:</strong>
							{listing.adm0_name} <br />
							<strong>Localidad ID:</strong>
							{listing.adm1_id} <br />
							<strong>Nombre de la localidad:</strong>
							{listing.adm1_name} <br />
							<strong>Mercado ID:</strong>
							{listing.mkt_id} <br />
							<strong>Nombre del mercado:</strong>
							{listing.mkt_name} <br />
							<strong>Producto ID:</strong>
							{listing.cm_id} <br />
							<strong>Nombre del producto: </strong>{listing.cm_name} <br />
							<strong>Moneda ID:</strong>
							{listing.cur_id} <br />
							<strong>Nombre de la moneda:</strong>
							{listing.cur_name} <br />
							<strong>Compra ID: </strong>{listing.pt_id} <br />
							<strong>Tipo de compra:</strong>
							{listing.pt_name} <br />
							<strong>Medida ID:</strong>
							{listing.um_id} <br />
							<strong>Nombre de la medida:</strong>
							{listing.um_name} <br />
							<strong>Mes de la medida:</strong>
							{listing.mp_month} <br />
							<strong>Año de la medida:</strong>
							{listing.mp_year} <br />
							<strong>Precio:</strong>
							{listing.mp_price} <br />
							<strong>Fuente de datos: </strong>{listing.mp_commoditysource} <br />
						</CardText>
						<Button
							color="danger"
							id ="deleteResourceButton"
							on:click={() =>
								deleteListing(
									listing.adm0_id,
									listing.adm1_id,
									listing.mkt_id,
									listing.cm_id,
									listing.cur_id,
									listing.pt_id,
									listing.um_id,
									listing.mp_month,
									listing.mp_year
								)}>Borrar</Button
						>
						<Button
							color="warning"
							on:click={() => {
								window.location.href = `global-food-prices/${listing.adm0_id}/${listing.adm1_id}/${listing.mkt_id}/${listing.cm_id}/${listing.cur_id}/${listing.pt_id}/${listing.um_id}/${listing.mp_month}/${listing.mp_year}`;
							}}
						>
							Editar
						</Button>
					</CardBody>
				</Card>
			</Col>
		{/each}
	</Row>
</Container>

{#if showForm}
	<Modal isOpen={showForm} {toggle} {size}>
		<ModalHeader {toggle}>Filtrar datos</ModalHeader>
		<ModalBody>
			<Container class="mb-3">
				<Row cols={{ xs: 2, sm: 2, md: 3, lg: 3, xl: 3 }}>
					<Col class="mb-3">
						<FormGroup>
							<Label for="adm0_id">País ID</Label>
							<Input
								type="number"
								id="adm0_id"
								name="adm0_id"
								placeholder="Escribe un país ID"
								bind:value={newListing.adm0_id}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="adm0_name">Nombre del país</Label>
							<Input
								type="text"
								id="adm0_name"
								name="adm0_name"
								placeholder="Escribe el nombre del país"
								bind:value={newListing.adm0_name}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="adm1_id">Localidad ID</Label>
							<Input
								type="number"
								id="adm1_id"
								name="adm1_id"
								placeholder="Escribe una localidad ID"
								bind:value={newListing.adm1_id}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="adm1_name">Nombre de la localidad</Label>
							<Input
								type="text"
								id="adm1_name"
								name="adm1_name"
								placeholder="Escribe el nombre de la localidad"
								bind:value={newListing.adm1_name}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="mkt_id">Mercado ID</Label>
							<Input
								type="number"
								id="mkt_id"
								name="mkt_id"
								placeholder="Escribe la ID del mercado"
								bind:value={newListing.mkt_id}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="mkt_name">Nombre del mercado</Label>
							<Input
								type="text"
								id="mkt_name"
								name="mkt_name"
								placeholder="Escribe el nombre del mercado"
								bind:value={newListing.mkt_name}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="cm_id">Tipo de compra ID</Label>
							<Input
								type="number"
								id="cm_id"
								name="cm_id"
								placeholder="Escribe la ID del tipo de compra"
								bind:value={newListing.cm_id}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="cm_name">Nombre del tipo de compra</Label>
							<Input
								type="text"
								id="cm_name"
								name="cm_name"
								placeholder="Escribe el nombre del tipo de compra"
								bind:value={newListing.cm_name}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="cur_id">Moneda ID</Label>
							<Input
								type="number"
								id="cur_id"
								name="cur_id"
								placeholder="Escribe la ID de la moneda"
								bind:value={newListing.cur_id}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="cur_name">Nombre de la moneda</Label>
							<Input
								type="text"
								id="cur_name"
								name="cur_name"
								placeholder="Escribe el nombre de la moneda"
								bind:value={newListing.cur_name}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="pt_id">Producto ID</Label>
							<Input
								type="number"
								id="pt_id"
								name="pt_id"
								placeholder="Escribe la ID del producto"
								bind:value={newListing.pt_id}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="pt_name">Nombre del producto</Label>
							<Input
								type="text"
								id="pt_name"
								name="pt_name"
								placeholder="Escribe el nombre del producto"
								bind:value={newListing.pt_name}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="um_id">Unidad de medida ID</Label>
							<Input
								type="number"
								id="um_id"
								name="um_id"
								placeholder="Escribe la ID de la unidad de medida"
								bind:value={newListing.um_id}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="um_name">Nombre de la unidad de medida</Label>
							<Input
								type="text"
								id="um_name"
								name="um_name"
								placeholder="Escribe el nombre de la unidad de medida"
								bind:value={newListing.um_name}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="mp_month">Mes de la medida</Label>
							<Input
								type="number"
								id="mp_month"
								name="mp_month"
								placeholder="Escribe el mes de la medida"
								bind:value={newListing.mp_month}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="mp_year">Año de la medida</Label>
							<Input
								type="number"
								id="mp_year"
								name="mp_year"
								placeholder="Escribe el año de la medida"
								bind:value={newListing.mp_year}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="mp_price">Precio</Label>
							<Input
								type="number"
								id="mp_price"
								name="mp_price"
								placeholder="Escribe el precio"
								bind:value={newListing.mp_price}
								required
							/>
						</FormGroup>
					</Col>
					<Col class="mb-3">
						<FormGroup>
							<Label for="mp_commoditysource">Fuente de datos</Label>
							<Input
								type="text"
								id="mp_commoditysource"
								name="mp_commoditysource"
								placeholder="Escribe el nombre de la fuente de datos"
								bind:value={newListing.mp_commoditysource}
								required
							/>
						</FormGroup>
					</Col>
				</Row>
			</Container>
		</ModalBody>
		<ModalFooter>
			<Button color="success" on:click={createListing}>Crear</Button>
		</ModalFooter>
		<Container>
			{#if error_msg != ''}
				<Alert color="danger">
					<strong>Error:</strong>
					{error_msg}
				</Alert>
			{:else if success_msg != ''}
				<Alert color="success">
					<strong>Éxito:</strong>
					{success_msg}
				</Alert>
			{/if}
			{#if success2_msg != ''}
				<Alert color="success">
					<strong>Éxito:</strong>
					{success2_msg}
				</Alert>
			{/if}
		</Container>
	</Modal>
{/if}

{#if confirmModal}
	<Modal isOpen={confirmModal} {toggle3} {size}>
		<ModalHeader {toggle3}>¿Estás seguro de que deseas eliminar todos los datos?</ModalHeader>
		<ModalBody>
			<Container style="justify-content: center; text-align: center;">
				{#if success3_msg != ''}
					<Alert color="success">
						<strong>Éxito:</strong>
						{success3_msg}
					</Alert>
				{/if}
			</Container>
			<Container style="justify-content: center; text-align: center;">
				<Button color="success" id="deleteAllButtonConfirm" on:click={deleteAll}
					><Fa icon={faCheck} /> Confirmar</Button
				>
				<Button color="secondary" on:click={toggle3}><Fa icon={faXmark} /> Cerrar</Button>
			</Container>
		</ModalBody>
	</Modal>
{:else}
	<p class="container">No hay datos disponibles</p>
{/if}

<hr />
<br />
<!--______________________________________Paginación_____________________________________-->
<!--

	<Container class="text-center">
		<Row>
			<Col cols={{ xs: 6 }}>
				<Button color="info" on:click={prevPage}>Página anterior</Button>
			</Col>
			<Col cols={{ xs: 6 }}>
				<Button color="info" on:click={nextPage}>Página siguiente</Button>
			</Col>
		</Row>
	</Container>
-->
<Container class="d-flex justify-content-center">
	<Pagination>
		<Button
			color="primary"
			on:click={() => {
				firstPage();
			}}
			disabled={pagination === 0}><Fa icon={faAngleDoubleLeft}></Fa></Button
		>
		<Button
			color="info"
			on:click={() => {
				prevPage();
			}}
			disabled={pagination === 0}><Fa icon={faArrowLeft} /> Anterior</Button
		>
		<Button
			color="info"
			on:click={() => {
				countData();
				nextPage();
			}}
			disabled={pagination === valor}>Siguiente <Fa icon={faArrowRight} /></Button
		>
		<Button
			color="primary"
			last
			on:click={() => {
				lastPage();
			}}
			disabled={pagination === valor}><Fa icon={faAngleDoubleRight}></Fa></Button
		>
	</Pagination>
</Container>
<hr />
