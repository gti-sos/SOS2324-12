<script>
    import { onMount } from "svelte";
    import { Container, Row, Col, Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from '@sveltestrap/sveltestrap';
    import * as echarts from 'echarts';

    let hechizos = [];
    let typeChart;
    let lightChart;

    onMount(async () => {
        await cargarHechizos();
        crearGraficos();
    });

    async function cargarHechizos() {
        try {
            const response = await fetch("https://wizard-world-api.herokuapp.com/spells");
            const data = await response.json();
            // Filtrar hechizos para incluir solo aquellos con 'incantation' definido
            hechizos = data.filter(hechizo => hechizo.incantation != null && hechizo.incantation.trim() !== "");
        } catch (error) {
            console.error("Error al cargar los hechizos:", error);
        }
    }

    function crearGraficos() {
        const typeData = {};
        const lightData = {};

        hechizos.forEach(hechizo => {
            if (!typeData[hechizo.type]) {
                typeData[hechizo.type] = {
                    name: hechizo.type,
                    value: 0,
                    names: []
                };
            }
            if (!lightData[hechizo.light]) {
                lightData[hechizo.light] = {
                    name: hechizo.light,
                    value: 0,
                    names: [],
                    itemStyle: {
                        color: getColorForLight(hechizo.light)
                    }
                };
            }
            typeData[hechizo.type].value += 1;
            typeData[hechizo.type].names.push(hechizo.name);

            lightData[hechizo.light].value += 1;
            lightData[hechizo.light].names.push(hechizo.name);
        });

        const typeSeriesData = Object.values(typeData);
        const lightSeriesData = Object.values(lightData);

        // Configuración del gráfico para los tipos de hechizos
        typeChart = echarts.init(document.getElementById('typeChart'));
        typeChart.setOption({
            title: {
                text: 'Tipos de hechizos',
                left: 'center'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            tooltip: {
                trigger: 'item',
                // Personaliza la posición del tooltip para que siempre esté debajo del cursor
                position: function (point, params, dom, rect, size) {
                    // Calcula una posición que esté siempre debajo del cursor
                    return [point[0], point[1] + 20]; // `20` es un desplazamiento vertical para ponerlo debajo
                },
                formatter: params => `${params.name}: ${params.value} (${(params.percent).toFixed(2)}%)<br/>${params.data.names.join(', ')}`
            },
            series: [{
                name: 'Tipos de Hechizo',
                type: 'pie',
                radius: ['40%', '70%'],
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false  // Ocultar etiquetas
                },
                labelLine: {
                    show: false
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: 20,
                    fontWeight: 'bold'
                    }
                },
                data: typeSeriesData
            }]
        });

        // Configuración del gráfico para los colores de luz
        lightChart = echarts.init(document.getElementById('lightChart'));
        lightChart.setOption({
            title: {
                text: 'Colores de los hechizos',
                left: 'center'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            tooltip: {
                trigger: 'item',
                // Personaliza la posición del tooltip para que siempre esté debajo del cursor
                position: function (point, params, dom, rect, size) {
                    // Calcula una posición que esté siempre debajo del cursor
                    return [point[0], point[1] + 20]; // `20` es un desplazamiento vertical para ponerlo debajo
                },
                formatter: params => `${params.name}: ${params.value} (${(params.percent).toFixed(2)}%)<br/>${params.data.names.join(', ')}`
            },
            series: [{
                name: 'Colores de Luz',
                type: 'pie',
                radius: ['40%', '70%'],
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false  // Ocultar etiquetas
                },
                labelLine: {
                    show: false
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: 20,
                    fontWeight: 'bold'
                    }
                },
                data: lightSeriesData.map(item => ({
                ...item,
                itemStyle: {
                    color: getColorForLight(item.name)  // Asignar el color
                }
            }))
            }]
        });
    }

    function getColorForLight(light) {
        const colors = {
            "Blue": "#0000FF",
            "IcyBlue": "#60B7F8",
            "Red": "#FF0000",
            "Gold": "#FFD700",
            "Transparent": "#90FFFD",
            "White": "#FFFFFF",
            "Green": "#59FF3C",
            "Orange": "#FFA500",
            "None": "#D3D3D3",
            "Pink": "#FFC0CB",
            "Yellow": "#FFFF00",
            "Violet": "#EE82EE",
            "Scarlet": "#FF2400",
            "BluishWhite": "#D5FFF8",
            "Silver": "#C0C0C0",
            "FieryScarlet": "#560319",
            "Grey": "#808080",
            "DarkRed": "#660B12",
            "Turquoise": "#40E0D0",
            "Purple": "#800080",
            "PsychedelicTransparentWave": "#E53899",
            "BrightYellow": "#FBFF00"
        };
        return colors[light] || "#CCCCCC"; // Default to grey if not found
    }
</script>

<svelte:head>
    <style>
        #typeChart, #lightChart { width: 100%; height: 600px; }
    </style>
</svelte:head>

<main>
    <Container class="content-container" style="justify-content: center;">
        <Row>
            <Col><h1>Hechizos de Harry Potter</h1></Col>
        </Row>
        <hr>
        {#if hechizos.length > 0}
        <div id="typeChart"></div>
        <div id="lightChart"></div>
            <Container>
                <Row cols={{ xs: 2, sm: 3, md: 3, lg: 3, xl: 4 }} class="justify-content-center">
                    {#each hechizos as hechizo (hechizo.id)}
                        <Col class='mb-3'>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5"><strong>{hechizo.name}</strong></CardTitle>
                                    <CardText><strong>Pronunciación:</strong> {hechizo.incantation}</CardText>
                                    <ListGroup>
                                        <ListGroupItem>Efecto: {hechizo.effect}</ListGroupItem>
                                        <ListGroupItem>Tipo: {hechizo.type}</ListGroupItem>
                                        <ListGroupItem>Color de Luz: {hechizo.light}</ListGroupItem>
                                    </ListGroup>
                                </CardBody>
                            </Card>
                        </Col>
                    {/each}
                </Row>
            </Container>
        {:else}
            <p>Cargando hechizos o no hay datos disponibles.</p>
        {/if}
    </Container>
</main>
