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

	// Rutas
	let API = '/api/v1/global-food-prices';
	if (dev) API = 'http://localhost:10000' + API;



	// ===============================================
	// Variables
	// ===============================================

	let listings = []; // Data
	let showForm = false;
	let showFilter = false;
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

	let error_msg = '';
	let success_msg = '';
	let success2_msg = '';

	let size = 'lg';
	const toggle = () => {
		size = 'lg';
		showFilter = !showFilter;
	};

	// Paginacion

	let currentPage = 1;
	//let totalItems = 0;
	const pageSize = 4;
	let totalItems = 0;
	let pagination = 0;
	let valor = -1;

	function nextPage() {
		if (pagination != valor) {
			pagination++;
			getListings();
		}
	}
	function prevPage() {
		if (pagination >= 1) {
			pagination--;
			getListings();
		}
	}

	// Inicialización

	onMount(async () => {
		await getListings();
		// Temporizador para ocultar automáticamente las alertas después de 5 segundos
		setTimeout(() => {
			error_msg = '';
			success_msg = '';
			success2_msg = '';
		}, 5000);
	});

	async function getListings() {
		let response = await fetch(`${API}?limit=${pageSize}&offset=${pagination * 4}`, {
			method: 'GET'
		});
		const status = await response.status;
		if (status == 200) {
			let data = await response.json();
			listings = data;
			totalItems = data.length;
			success_msg = 'Mostrando datos';
			error_msg = '';
		} else if (status == 404) {
			error_msg = 'No hay datos cargados en la base de datos o ya no hay más datos';
			success_msg = '';
		} else if (status == 500) {
			error_msg = 'Ha ocurrido un error en el servidor';
			success_msg = '';
		}
	}

	async function getInitialListings() {
		let response = await fetch(API + '/loadInitialData', {
			method: 'GET'
		});
		const status = await response.status;
		if (status == 201) {
			getListings();
			success_msg = 'Datos iniciales cargados correctamente';
			error_msg = '';
		} else if (status == 200) {
			error_msg = 'La base de datos ya está cargada';
			success_msg = '';
		} else if (status == 500) {
			error_msg = 'Ha ocurrido un error en el servidor';
			success_msg = '';
		}
	}

	async function searchListing() {
		const fromInput = document.getElementById('fromInput').value.trim();
		const toInput = document.getElementById('toInput').value.trim();

		// Convierte los valores de entrada a números enteros
		const from = parseInt(fromInput);
		const to = parseInt(toInput);

		// Verifica si los valores de entrada son números válidos
		if (isNaN(from) || isNaN(to)) {
			error_msg = 'Por favor, introduzca años válidos en los campos From y To.';
			window.scrollTo(0, 0);
			return;
		}

		// Construye la URL de búsqueda con los años como parámetros
		let url = `${API}?from=${from}&to=${to}`;
		const response = await fetch(url, {
			method: 'GET'
		});
		const status = response.status;
		if (status == 200) {
			const data = await response.json();
			listings = data;
			success_msg = 'Se ha realizado la búsqueda correctamente';
			error_msg = '';
			window.scrollTo(0, 0);
		} else if (status == 404) {
			error_msg = 'No se encontraron resultados';
			success_msg = '';
			window.scrollTo(0, 0);
		} else if (status == 500) {
			error_msg = 'Ha ocurrido un error en el servidor';
			success_msg = '';
			window.scrollTo(0, 0);
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
			window.location.reload();
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

	async function deleteListing(adm0_id, adm1_id, mkt_id, cm_id, cur_id, pt_id, um_id, mp_month, mp_year){
    let response = await fetch(API + "/" + adm0_id + "/" + adm1_id + "/" + mkt_id + "/" + cm_id + "/" + cur_id + "/" + pt_id + "/" + um_id + "/" + mp_month + "/" + mp_year,{
            method: "DELETE"
        });
    const status = response.status;
    if (status == 200){
        success2_msg = "El recurso ha sido eliminado";
        error_msg = "";
        getListings();
        window.scrollTo(0, 0);
    } else if (status == 204) {
        error_msg = "No se encontró ningún recurso con los IDs especificados";
        success_msg = "";
        window.scrollTo(0, 0);
    } else if (status == 500) {
        error_msg = "Ha ocurrido un error en el servidor";
        success_msg = "";
        window.scrollTo(0, 0);
    }
};

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
        <Col cols={{ xs:4 }}>
            <Button color="warning" on:click="{getInitialListings}">Cargar Datos Iniciales</Button>
        </Col>
        <Col cols={{ xs:4 }}>
            <Button color="success" on:click={() => {showForm = true;}}>Crear Nuevo Dato</Button>
        </Col>
        <Col cols={{ xs:4 }}>
            <Button color="danger" on:click="{deleteAll}">Borrar Todos los Datos</Button>
        </Col>
        <Col>
            <Button color="primary" on:click={() => {showFilter = true;}}>Filtro por campos</Button>
        </Col>
    </Row>
</Container>
<br/>  

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
	<!-- Elementos de entrada para los parámetros de búsqueda -->
	<Container style="justify-content: center; text-align: center;">
		<h2>Filtro por años</h2>
		<Row>
			<Col>
				<Input type="number" id="fromInput" placeholder="From" />
			</Col>
			<Col>
				<Input type="number" id="toInput" placeholder="To" />
			</Col>
			<Col>
				<Button color="primary" on:click={searchListing}>Buscar</Button>
			</Col>
		</Row>
	</Container>

	<br />
	<hr />
	<Container style="justify-content: center; text-align: center;">
		<Button
			color="primary"
			on:click={() => {
				showFilter = true;
			}}>Filtros</Button
		>
	</Container>
	<br />
	<hr />

	{#if listings && listings.length > 0}
		<!--_______________________________________________Datos_________________________________________________-->
		<Container>
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
											<Input
												type="number"
												id="adm0_id"
												bind:value={selectedFilter.adm0_id}
												required
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="adm0_name">Country Name</Label>
											<Input type="text" id="adm0_name" bind:value={selectedFilter.adm0_name} required />
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="adm1_id">Locality ID</Label>
											<Input
												type="number"
												id="adm1_id"
												bind:value={selectedFilter.adm1_id}
												required
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="adm1_name">Locality name</Label>
											<Input
												type="text"
												id="adm1_name"
												bind:value={selectedFilter.adm1_name}
												required
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col>
										<FormGroup>
											<Label for="mkt_id">Market ID</Label>
											<Input
												type="number"
												id="mkt_id"
												bind:value={selectedFilter.mkt_id}
												required
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="mkt_name">Market name</Label>
											<Input
												type="text"
												id="mkt_name"
												bind:value={selectedFilter.mkt_name}
												required
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="cm_id">Commodity Purchase ID</Label>
											<Input
												type="number"
												id="cm_id"
												bind:value={selectedFilter.cm_id}
												required
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="cm_name">Commodity Purchase name</Label>
											<Input
												type="text"
												id="cm_name"
												bind:value={selectedFilter.cm_name}
												required
											/>
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
											<Input
												type="text"
												id="cur_name"
												bind:value={selectedFilter.cur_name}
												required
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="pt_id">Product ID</Label>
											<Input
												type="number"
												id="pt_id"
												bind:value={selectedFilter.pt_id}
												required
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="pt_name">Product name</Label>
											<Input
												type="text"
												id="pt_name"
												bind:value={selectedFilter.pt_name}
												required
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col>
										<FormGroup>
											<Label for="um_id">Measurement ID</Label>
											<Input
												type="number"
												id="um_id"
												bind:value={selectedFilter.um_id}
												required
											/>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="um_name">Unit of goods measurement</Label>
											<Input
												type="text"
												id="um_name"
												bind:value={selectedFilter.um_name}
												required
											/>
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
											<Input
												type="number"
												id="mp_year"
												bind:value={selectedFilter.mp_year}
												required
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col>
										<FormGroup>
											<Label for="mp_price">Price</Label>
											<Input type="number" id="mp_price" bind:value={selectedFilter.mp_price} required />
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
						<Button color="primary" on:click={searchListings}>Aplicar filtros</Button>
						<Button color="secondary" on:click={toggle}>Cerrar</Button>
					</ModalFooter>
					<Container>
						{#if error_msg != ""}
						<Alert color="danger">
							<strong>Error:</strong> {error_msg}
						</Alert>
						{:else if success_msg != ""}
						<Alert color="success">
							<strong>Éxito:</strong> {success_msg}
						</Alert>
						
						{/if}
						{#if success2_msg != ""}
						<Alert color="success">
							<strong>Éxito:</strong> {success2_msg}
						</Alert>
						{/if}
					</Container>
				</Modal>
			{/if}
			<Row cols={{ xs: 2, sm: 3, md: 3, lg: 3, xl: 4 }}>
				{#each listings as listing}
					<Col class="mb-3">
						<Card>
							<CardHeader>
								<CardTitle>{listing.pt_name}</CardTitle>
							</CardHeader>
							<CardBody>
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
									<strong>Tipo de compra ID:</strong>
									{listing.cm_id} <br />
									<strong>Tipo de compra: </strong>{listing.cm_name} <br />
									<strong>Moneda ID:</strong>
									{listing.cur_id} <br />
									<strong>Nombre de la moneda:</strong>
									{listing.cur_name} <br />
									<strong>Producto ID: </strong>{listing.pt_id} <br />
									<strong>Nombre del producto:</strong>
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
								<Button color="danger" on:click={() => deleteListing(listing.adm0_id, listing.adm1_id, listing.mkt_id, listing.cm_id, listing.cur_id, listing.pt_id, listing.um_id, listing.mp_month, listing.mp_year)}>Borrar</Button>
                        		<Button color="warning" on:click={() => { window.location.href = `global-food-prices/${listing.adm0_id}/${listing.adm1_id}/${listing.mkt_id}/${listing.cm_id}/${listing.cur_id}/${listing.pt_id}/${listing.um_id}/${listing.mp_month}/${listing.mp_year}` }}>
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
				<Container class='mb-3'>
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
            {#if error_msg != ""}
            <Alert color="danger">
                <strong>Error:</strong> {error_msg}
            </Alert>
            {:else if success_msg != ""}
            <Alert color="success">
                <strong>Éxito:</strong> {success_msg}
            </Alert>
            
            {/if}
            {#if success2_msg != ""}
            <Alert color="success">
                <strong>Éxito:</strong> {success2_msg}
            </Alert>
            {/if}
        </Container>
    </Modal>
			
		{/if}
	{:else}
		<p class="container">No hay datos disponibles</p>
	{/if}

	<hr />
	<br />
	<!--______________________________________Paginación_____________________________________-->
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

	<hr />
	<br />

</Container>
