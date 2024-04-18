<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    import {onMount} from "svelte";
    import { dev } from '$app/environment';
    import { Button, Icon, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, 
            Alert, Card, CardBody, CardHeader, CardText, CardTitle,  Row, Col, 
            Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from '@sveltestrap/sveltestrap';
    
    // VARIABLE RUTA API
    
    let API_JMS = '/api/v2/airbnb-listings';
    let API_BFA = '/api/v2/global-food-prices';
    let API_JMR = '/api/v2/world-consumption-of-drinking-water-data';
    if(dev){
        API_JMS = 'http://localhost:10000'+API_JMS;
        API_BFA = 'http://localhost:10000'+API_BFA;
        API_JMR = 'http://localhost:10000'+API_JMR;
    }
    // ALERTA INFO

    let info = "";
    let v_info = false;
    function f_info() {
        (setTimeout(function(){v_info = false;}, 6000));
    }

    // INICIALIZAR GRÁFICAS

    onMount(async () => {
        await processCountryData();
        createChart();
    });

    // DATOS

    let countryData = [];

    // Function to fetch data from a URL
    async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return []; // Return empty array in case of an error
    }
    }


    function getRegion(country) {
    const regions = {
        "Asia": ["Afghanistan", "Cambodia", "Iraq", "Japan", "Lebanon", "Hong Kong", "Malaysia", "Thailand", "Turkey", "China", "Russia", "India"],
        "Europe": ["Albania", "Andorra", "Bulgaria", "France", "Germany", "Italy", "Switzerland", "United Kingdom", "Spain"],
        "Africa": ["Algeria", "Angola", "Burkina Faso", "Burundi", "Cameroon", "Central African Republic", "Chad", "Egypt", "Nigeria", "South Africa"],
        "North America": ["Canada", "United States", "Mexico"],
        "South America": ["Argentina", "Chile", "Brazil"],
        "Oceania": ["American Samoa", "Anguilla", "Antigua and Barbuda", "Cayman Islands", "Cape Verde", "Australia", "New Zealand"]
    };

    // Iterar sobre las regiones y verificar si el país está en alguna de ellas
    for (const region in regions) {
        if (regions[region].includes(country)) {
            return region;
        }
    }

    // Si no se encuentra ninguna coincidencia, devolver "Unknown"
    return "Unknown";
    }

    
// Function to process country data
async function processCountryData() {
  const airbnbData = await fetchData(API_JMS);
  const foodData = await fetchData(API_BFA);
  const waterData = await fetchData(API_JMR);


  // Process Airbnb data
  airbnbData.forEach(entry => {
    const region = getRegion(entry.host_location);
    const existingEntry = countryData.find(country => country.region === region);

    if (existingEntry) {
      existingEntry.averagePriceAirbnb += entry.price;
      existingEntry.countAirbnbListings++;
    } else {
      countryData.push({
        region: region,
        averagePriceAirbnb: entry.price,
        averagePriceFood: 0,
        totalImprovedWaterConsumption: 0,
        countAirbnbListings: 1,
        countFood: 0,
        countWater: 0
      });
    }
  });

  // Process food data (calculating average food price for each region)
  foodData.forEach(entry => {
    const region = getRegion(entry.adm0_name);
    const existingEntry = countryData.find(country => country.region === region);

    if (existingEntry) {
      existingEntry.averagePriceFood += calculateAverageFoodPrice(foodData, region);
      existingEntry.countFood++;
    } else {
      countryData.push({
        region: region,
        averagePriceAirbnb: 0,
        averagePriceFood: calculateAverageFoodPrice(foodData, region),
        totalImprovedWaterConsumption: 0,
        countAirbnbListings: 0,
        countFood: 1,
        countWater: 0
      });
    }
  });

  // Process water data
    waterData.forEach(entry => {
    const region = getRegion(entry.country);
    const existingEntry = countryData.find(country => country.region === region);

    if (existingEntry) {
        const waterConsumptionValue = entry.total_improved_total === "-" ? 0 : parseFloat(entry.total_improved_total); // Convert non-numeric values to 0
        if (waterConsumptionValue) { // Check if the value is non-zero after conversion
        existingEntry.totalImprovedWaterConsumption += waterConsumptionValue;
        }
        existingEntry.countWater++;
    } else {
        countryData.push({
        region: region,
        averagePriceAirbnb: 0,
        averagePriceFood: 0,
        totalImprovedWaterConsumption: entry.total_improved_total === "-" ? 0 : parseFloat(entry.total_improved_total), // Convert non-numeric values to 0
        countAirbnbListings: 0,
        countFood: 0,
        countWater: 1
        });
    }
    });

  // Calculate averages (after updating all entries)
  countryData.forEach(entry => {
    entry.averagePriceAirbnb = entry.countAirbnbListings > 0 ? (entry.averagePriceAirbnb / entry.countAirbnbListings).toFixed(2) : 0;
    entry.averagePriceFood = entry.countFood > 0 ? (entry.averagePriceFood / entry.countFood).toFixed(2) : 0;
    entry.totalImprovedWaterConsumption = entry.countWater > 0 ? (entry.totalImprovedWaterConsumption / entry.countWater).toFixed(2) : 0;
  });

}

async function createChart() {
    // Verificar que countryData esté definido
    if (!countryData) {
        console.log("No hay datos disponibles para crear la gráfica.");
        return;
    }

    console.log("Datos de país antes de dibujar la gráfica:", countryData);

    // Verificar la suma de los precios de la comida por región
    countryData.forEach(country => {
        console.log(`Suma de precios de comida para ${country.region}: ${country.averagePriceFood}`);
    });

    Highcharts.chart('chart-container', {
        chart: {
            type: 'column' // Usar 'column' para columnas agrupadas
        },
        title: {
            text: 'Comparativa de costo de vida por región',
            align: 'center'
        },
        xAxis: {
            categories: countryData.map(country => country.region)
        },
        yAxis: {
            min: 0, // Establecer el valor mínimo para el eje y
            title: {
                text: 'Costo promedio'
            },
            stackLabels: { // Habilitar etiquetas de apilamiento para totales
                enabled: true
            }
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y} €'
        },
        plotOptions: {
            column: {
                grouping: true, // Habilitar columnas agrupadas
                dataLabels: { // Habilitar etiquetas de datos para valores dentro de las columnas
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Alojamiento Airbnb',
            color: '#f00', // Color rojo
            data: countryData.map(country => parseFloat(country.averagePriceAirbnb))
        }, {
            name: 'Comida (Pan)',
            color: '#0f0', // Color verde
            data: countryData.map(country => parseFloat(country.averagePriceFood))
        }, {
            name: 'Agua potable',
            color: '#00f', // Color azul
            data: countryData.map(country => parseFloat(country.totalImprovedWaterConsumption))
        }]
    });
}

// Function to calculate average food price (considering all food items)
function calculateAverageFoodPrice(foodData, region) {
  let totalFoodPrice = 0;
  let countFoodItems = 0;

  foodData.forEach(entry => {
    const country = entry.adm0_name;
    const regionMatch = getRegion(country) === region;
    if (regionMatch && entry.cm_name == "Bread") {
      totalFoodPrice += entry.mp_price;
      countFoodItems++;
    }
  });

  return countFoodItems > 0 ? totalFoodPrice / countFoodItems : 0;
}



async function getInitialData(){
    let response = await fetch(API_JMS + "/loadInitialData", {
                method: "GET"
            });
    const status = await response.status;
    let response2 = await fetch(API_JMR + "/loadInitialData", {
                method: "GET"
            });
    const status2 = await response.status;
    let response3 = await fetch(API_BFA + "/loadInitialData", {
                method: "GET"
            });
    const status3 = await response.status;
    if (status == 201 && status2 == 201 && status3 == 201){
        window.location.reload();
    } else {
        info = "Los datos ya están cargados";
        v_info = true;
        f_info();
        console.log("Error al cargar datos");
    };
    };



    
</script>
<main>
    <Container class="content-container" style="justify-content: center;"> 
        <Container>
            <Row>
                <Col><h1> Gráfica común</h1></Col>
            </Row>
        </Container>
        <Container class="text-center">
            <Row>
                <Col cols={{ xs:4 }}>
                    <Button color="warning" on:click="{getInitialData}">Cargar datos</Button>
                </Col>                       
            </Row>
        </Container>
        <br/>

        <Container>
                <Row><Col><Alert color="info" isOpen={v_info} toggle={() => (v_info = false)}>{info}</Alert></Col></Row>
                <br/>
            <Row><Col><div id="chart-container" style="width:100%; height:400px;"></div></Col></Row>
            </Container>
        </Container>
</main>