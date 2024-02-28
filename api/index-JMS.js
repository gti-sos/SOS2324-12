const API_BASE_JMS = "/api/v1/airbnb-listings";

var data = [];

module.exports = (app) => {
    
    // GET => Lista todos los datos
    
    app.get(API_BASE_JMS+"/",(req,res)=>{
        res.status(200).send(JSON.stringify(data));
    }),

    // GET => loadInitialData (al hacer un GET cree 10 o más datos en el array de NodeJS si está vacío)
    app.get(API_BASE_JMS+"/loadInitialData",(req,res) => {
        if(data.length === 0){
            let newdata = [
                {
                  "listing_id": 2455506,
                  "name": "Appartement lumineux rue de Levis",
                  "host_since": "25/02/2014",
                  "host_location": "France",
                  "host_response_time": "within a few hours",
                  "host_response_rate": 0.16,
                  "host_acceptance_rate": 0.38,
                  "neighbourhood": "Batignolles-Monceau",
                  "city": "Paris",
                  "latitude": 48.88418,
                  "longitude": 2.31163,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 2,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Heating",
                    "TV",
                    "Kitchen",
                    "Washer",
                    "Dryer",
                    "Wifi",
                    "Long term stays allowed"
                  ],
                  "price": 90,
                  "minimum_nights_number": 7,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "TRUE"
                },
                {
                  "listing_id": 37027049,
                  "name": "Appartement Paris 19 - Balcon et vue sur Paris",
                  "host_since": "30/11/2012",
                  "host_location": "France",
                  "host_response_time": "within a day",
                  "host_response_rate": 0.09,
                  "host_acceptance_rate": 0.19,
                  "neighbourhood": "Buttes-Chaumont",
                  "city": "Paris",
                  "latitude": 48.87769,
                  "longitude": 2.37268,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 2,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Heating",
                    "TV",
                    "Iron",
                    "Kitchen",
                    "Essentials",
                    "Hair dryer",
                    "Washer",
                    "Bed linens",
                    "Carbon monoxide alarm",
                    "Hot water",
                    "Smoke alarm",
                    "Wifi",
                    "Elevator",
                    "Long term stays allowed",
                    "Dedicated workspace"
                  ],
                  "price": 80,
                  "minimum_nights_number": 10,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "FALSE"
                },
                {
                  "listing_id": 37440389,
                  "name": "Paris 15",
                  "host_since": "17/11/2017",
                  "host_location": "Lebanon",
                  "host_response_time": "within a day",
                  "host_response_rate": 0.12,
                  "host_acceptance_rate": 0.64,
                  "neighbourhood": "Vaugirard",
                  "city": "Paris",
                  "latitude": 48.84355,
                  "longitude": 2.28782,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 3,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Iron",
                    "Shampoo",
                    "Heating",
                    "Washer",
                    "Hair dryer",
                    "Elevator",
                    "Wifi",
                    "Kitchen",
                    "Essentials",
                    "Hangers",
                    "Long term stays allowed",
                    "TV",
                    "Breakfast"
                  ],
                  "price": 120,
                  "minimum_nights_number": 5,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "FALSE"
                },
                {
                  "listing_id": 43199304,
                  "name": "Bright and Charming Flat for 2 in Great Location",
                  "host_since": "11/03/2020",
                  "host_location": "Malaysia",
                  "host_response_time": "within an hour",
                  "host_response_rate": 0.45,
                  "host_acceptance_rate": 0.93,
                  "neighbourhood": "Reuilly",
                  "city": "Paris",
                  "latitude": 48.83679,
                  "longitude": 2.39888,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 2,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Paid parking off premises",
                    "Shampoo",
                    "Dishes and silverware",
                    "TV",
                    "Kitchen",
                    "Essentials",
                    "Hair dryer",
                    "Coffee maker",
                    "Bed linens",
                    "Refrigerator",
                    "Hot water",
                    "Hangers",
                    "Wifi",
                    "Cooking basics",
                    "Elevator",
                    "Long term stays allowed"
                  ],
                  "price": 83,
                  "minimum_nights_number": 1,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "TRUE"
                },
                {
                  "listing_id": 44110139,
                  "name": "Amazing apartment - 4P/1BR - Canal Saint Martin",
                  "host_since": "21/04/2020",
                  "host_location": "France",
                  "host_response_time": "within a few hours",
                  "host_response_rate": 0.2,
                  "host_acceptance_rate": 0.96,
                  "neighbourhood": "Enclos-St-Laurent",
                  "city": "Paris",
                  "latitude": 48.87406,
                  "longitude": 2.37112,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 4,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Dishwasher",
                    "Essentials",
                    "Hot water",
                    "Hangers",
                    "Smoke alarm",
                    "Wifi",
                    "Long term stays allowed",
                    "Dedicated workspace",
                    "TV",
                    "Iron",
                    "Refrigerator",
                    "Dishes and silverware",
                    "Private entrance",
                    "Heating",
                    "Kitchen",
                    "Hair dryer",
                    "Coffee maker",
                    "Washer",
                    "Microwave",
                    "Cooking basics",
                    "Shampoo",
                    "Shower gel",
                    "Bed linens",
                    "Carbon monoxide alarm"
                  ],
                  "price": 105,
                  "minimum_nights_number": 1,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "TRUE"
                },
                {
                  "listing_id": 45553305,
                  "name": "Superb studio close to Montmartre",
                  "host_since": "23/09/2020",
                  "host_location": "France",
                  "host_response_time": "within a day",
                  "host_response_rate": 0.23,
                  "host_acceptance_rate": 0.33,
                  "neighbourhood": "Buttes-Montmartre",
                  "city": "Paris",
                  "latitude": 48.89405,
                  "longitude": 2.34785,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 2,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Heating",
                    "TV",
                    "Essentials",
                    "Smoke alarm",
                    "Wifi",
                    "Long term stays allowed"
                  ],
                  "price": 56,
                  "minimum_nights_number": 2,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "TRUE"
                },
                {
                  "listing_id": 45776006,
                  "name": "Designer Apartment in Batignolles",
                  "host_since": "12/07/2019",
                  "host_location": "France",
                  "host_response_time": "within an hour",
                  "host_response_rate": 0.43,
                  "host_acceptance_rate": 0.11,
                  "neighbourhood": "Batignolles-Monceau",
                  "city": "Paris",
                  "latitude": 48.88682,
                  "longitude": 2.3116,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 4,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Dishwasher",
                    "Essentials",
                    "Hangers",
                    "Smoke alarm",
                    "Wifi",
                    "Long term stays allowed",
                    "Dedicated workspace",
                    "TV",
                    "Iron",
                    "Dryer",
                    "Refrigerator",
                    "Oven",
                    "Dishes and silverware",
                    "Heating",
                    "Kitchen",
                    "Hair dryer",
                    "Coffee maker",
                    "Washer",
                    "Microwave",
                    "Cooking basics",
                    "Shampoo",
                    "Bed linens",
                    "Carbon monoxide alarm",
                    "Elevator"
                  ],
                  "price": 95,
                  "minimum_nights_number": 1,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "TRUE"
                },
                {
                  "listing_id": 45835725,
                  "name": "Bright 1-BDR apartment centrally located",
                  "host_since": "17/10/2014",
                  "host_location": "Canada",
                  "host_response_time": "within a few hours",
                  "host_response_rate": 0.9,
                  "host_acceptance_rate": 0.3,
                  "neighbourhood": "Enclos-St-Laurent",
                  "city": "Paris",
                  "latitude": 48.87197,
                  "longitude": 2.35209,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 2,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Iron",
                    "Shampoo",
                    "Heating",
                    "Washer",
                    "Dedicated workspace",
                    "Smoke alarm",
                    "Wifi",
                    "Kitchen",
                    "Essentials",
                    "Long term stays allowed"
                  ],
                  "price": 50,
                  "minimum_nights_number": 2,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "FALSE"
                },
                {
                  "listing_id": 47792594,
                  "name": "Opera/Haussmann: Luxueux appartement d'architecte",
                  "host_since": "19/01/2021",
                  "host_location": "France",
                  "host_response_time": "within an hour",
                  "host_response_rate": 0.52,
                  "host_acceptance_rate": 0.87,
                  "neighbourhood": "Opera",
                  "city": "Paris",
                  "latitude": 48.87302,
                  "longitude": 2.33444,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 2,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Shampoo",
                    "Heating",
                    "Lockbox",
                    "Iron",
                    "Kitchen",
                    "Hair dryer",
                    "Essentials",
                    "Washer",
                    "Dryer",
                    "Air conditioning",
                    "Hot water",
                    "Hangers",
                    "Smoke alarm",
                    "Wifi",
                    "Cooking basics",
                    "Long term stays allowed",
                    "Dedicated workspace"
                  ],
                  "price": 152,
                  "minimum_nights_number": 1,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "TRUE"
                },
                {
                  "listing_id": 47921846,
                  "name": "Appartement 2 piÃ¨ces proche canal st martin /Gare",
                  "host_since": "27/09/2016",
                  "host_location": "France",
                  "host_response_time": "within an hour",
                  "host_response_rate": 0.69,
                  "host_acceptance_rate": 0.7,
                  "neighbourhood": "Enclos-St-Laurent",
                  "city": "Paris",
                  "latitude": 48.87854,
                  "longitude": 2.36212,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 2,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Private entrance",
                    "Shampoo",
                    "Heating",
                    "TV",
                    "Iron",
                    "Lockbox",
                    "Kitchen",
                    "Hair dryer",
                    "Essentials",
                    "Washer",
                    "Carbon monoxide alarm",
                    "Hot water",
                    "Hangers",
                    "Smoke alarm",
                    "Free parking on premises",
                    "Wifi",
                    "Long term stays allowed",
                    "Dedicated workspace"
                  ],
                  "price": 75,
                  "minimum_nights_number": 1,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "TRUE"
                },
                {
                  "listing_id": 48024945,
                  "name": "Wonderful apartment \"Porte de Versailles",
                  "host_since": "03/02/2017",
                  "host_location": "Switzerland",
                  "host_response_time": "within an hour",
                  "host_response_rate": 0.96,
                  "host_acceptance_rate": 0.81,
                  "neighbourhood": "Observatoire",
                  "city": "Paris",
                  "latitude": 48.83254,
                  "longitude": 2.31738,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 2,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Essentials",
                    "Hangers",
                    "Smoke alarm",
                    "Wifi",
                    "Crib",
                    "Long term stays allowed",
                    "Dedicated workspace",
                    "High chair",
                    "TV",
                    "Iron",
                    "Refrigerator",
                    "Dishes and silverware",
                    "Heating",
                    "Kitchen",
                    "Hair dryer",
                    "Coffee maker",
                    "Washer",
                    "Microwave",
                    "Cooking basics",
                    "Shampoo",
                    "Bed linens",
                    "Carbon monoxide alarm"
                  ],
                  "price": 43,
                  "minimum_nights_number": 1,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "TRUE"
                },
                {
                  "listing_id": 7693040,
                  "name": "Park Facing, Spacious 1 BR APT",
                  "host_since": "06/11/2012",
                  "host_location": "United States",
                  "host_response_time": "within a few hours",
                  "host_response_rate": 0.53,
                  "host_acceptance_rate": 0.24,
                  "neighbourhood": "Crown Heights",
                  "city": "New York",
                  "latitude": 40.66542,
                  "longitude": -73.96062,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 4,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Smoke alarm",
                    "Essentials",
                    "Washer",
                    "Dryer",
                    "Shampoo",
                    "Heating",
                    "Wifi",
                    "Elevator",
                    "Long term stays allowed",
                    "Carbon monoxide alarm",
                    "Kitchen"
                  ],
                  "price": 110,
                  "minimum_nights_number": 30,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "FALSE"
                },
                {
                  "listing_id": 10068653,
                  "name": "DESIGNER DOWNTOWN 1 BEDROOM",
                  "host_since": "01/07/2013",
                  "host_location": "United States",
                  "host_response_time": "within a day",
                  "host_response_rate": 0.52,
                  "host_acceptance_rate": 0.58,
                  "neighbourhood": "East Village",
                  "city": "New York",
                  "latitude": 40.72232,
                  "longitude": -73.98513,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 2,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Refrigerator",
                    "Shampoo",
                    "Air conditioning",
                    "Baking sheet",
                    "Kitchen",
                    "Coffee maker",
                    "Oven",
                    "Iron",
                    "Hangers",
                    "Smoke alarm",
                    "Washer",
                    "Dedicated workspace",
                    "Dryer",
                    "Shower gel",
                    "Hot water",
                    "Long term stays allowed",
                    "Extra pillows and blankets",
                    "Hair dryer",
                    "Bed linens",
                    "Essentials",
                    "Dishes and silverware",
                    "TV",
                    "Wifi",
                    "Cable TV",
                    "Heating",
                    "Patio or balcony",
                    "Cooking basics",
                    "Stove",
                    "Carbon monoxide alarm"
                  ],
                  "price": 179,
                  "minimum_nights_number": 30,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "FALSE"
                },
                {
                  "listing_id": 39447656,
                  "name": "Sunny Brown Stone Apartment",
                  "host_since": "05/03/2015",
                  "host_location": "United States",
                  "host_response_time": "within a few hours",
                  "host_response_rate": 0.91,
                  "host_acceptance_rate": 0.8,
                  "neighbourhood": "Clinton Hill",
                  "city": "New York",
                  "latitude": 40.68308,
                  "longitude": -73.96547,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 4,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Iron",
                    "Essentials",
                    "Smoke alarm",
                    "TV",
                    "Host greets you",
                    "Wifi",
                    "Shampoo",
                    "Heating",
                    "Air conditioning",
                    "Long term stays allowed",
                    "Kitchen"
                  ],
                  "price": 85,
                  "minimum_nights_number": 30,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "FALSE"
                },
                {
                  "listing_id": 43091725,
                  "name": "Perfect retreat for a working professional",
                  "host_since": "03/07/2015",
                  "host_location": "United States",
                  "host_response_time": "within a day",
                  "host_response_rate": 0.81,
                  "host_acceptance_rate": 0.18,
                  "neighbourhood": "Sheepshead Bay",
                  "city": "New York",
                  "latitude": 40.58551,
                  "longitude": -73.94439,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 1,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Extra pillows and blankets",
                    "Hair dryer",
                    "Bed linens",
                    "Iron",
                    "Hangers",
                    "Essentials",
                    "Washer",
                    "TV",
                    "Smoke alarm",
                    "Dryer",
                    "Dedicated workspace",
                    "Heating",
                    "Wifi",
                    "Dishes and silverware",
                    "Private entrance",
                    "Hot water",
                    "Air conditioning",
                    "Long term stays allowed",
                    "Kitchen",
                    "Cooking basics"
                  ],
                  "price": 120,
                  "minimum_nights_number": 60,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "FALSE"
                },
                {
                  "listing_id": 44843504,
                  "name": "Beautiful clean Gramercy 1bd room! Brand new!",
                  "host_since": "03/08/2015",
                  "host_location": "United States",
                  "host_response_time": "within an hour",
                  "host_response_rate": 0.56,
                  "host_acceptance_rate": 0.57,
                  "neighbourhood": "Kips Bay",
                  "city": "New York",
                  "latitude": 40.73946,
                  "longitude": -73.97997,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 2,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "First aid kit",
                    "Hair dryer",
                    "Iron",
                    "Essentials",
                    "Hangers",
                    "Washer",
                    "TV",
                    "Smoke alarm",
                    "Dryer",
                    "Shampoo",
                    "Heating",
                    "Fire extinguisher",
                    "Dedicated workspace",
                    "Wifi",
                    "Hot water",
                    "Air conditioning",
                    "Long term stays allowed",
                    "Carbon monoxide alarm",
                    "Kitchen"
                  ],
                  "price": 125,
                  "minimum_nights_number": 30,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "FALSE"
                },
                {
                  "listing_id": 45308579,
                  "name": "Spacious studio with walk-in in closet",
                  "host_since": "08/03/2019",
                  "host_location": "United States",
                  "host_response_time": "within an hour",
                  "host_response_rate": 0.45,
                  "host_acceptance_rate": 0.37,
                  "neighbourhood": "Chelsea",
                  "city": "New York",
                  "latitude": 40.73909,
                  "longitude": -73.99882,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 2,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "First aid kit",
                    "Hair dryer",
                    "Iron",
                    "Essentials",
                    "Gym",
                    "Washer",
                    "Dedicated workspace",
                    "TV",
                    "Wifi",
                    "Dryer",
                    "Heating",
                    "Shampoo",
                    "Hangers",
                    "Elevator",
                    "Smoke alarm",
                    "Air conditioning",
                    "Hot water",
                    "Long term stays allowed",
                    "Carbon monoxide alarm",
                    "Kitchen"
                  ],
                  "price": 245,
                  "minimum_nights_number": 30,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "TRUE"
                },
                {
                  "listing_id": 45448589,
                  "name": "Garden condo w patio in New York artistic Bushwick",
                  "host_since": "08/11/2019",
                  "host_location": "United States",
                  "host_response_time": "within an hour",
                  "host_response_rate": 0.58,
                  "host_acceptance_rate": 0.08,
                  "neighbourhood": "Bushwick",
                  "city": "New York",
                  "latitude": 40.69793,
                  "longitude": -73.92801,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 2,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Nespresso machine",
                    "Refrigerator",
                    "Single level home",
                    "Dining table",
                    "Free street parking",
                    "Washer – In building",
                    "Kitchen",
                    "Iron",
                    "Hangers",
                    "Dryer – In building",
                    "Central air conditioning",
                    "Smoke alarm",
                    "Dedicated workspace",
                    "Private fenced garden or backyard",
                    "Fire extinguisher",
                    "Shower gel",
                    "Hot water",
                    "40\" HDTV with Apple TV, Netflix, standard cable, Amazon Prime Video",
                    "Cleaning products",
                    "Long term stays allowed",
                    "Shikai - natural plant based shampoo",
                    "Extra pillows and blankets",
                    "Hair dryer",
                    "Bed linens",
                    "Stainless steel gas stove",
                    "Essentials",
                    "Dishes and silverware",
                    "Dishwasher",
                    "Clothing storage: walk-in closet and dresser",
                    "Puracy - natural plant based conditioner",
                    "Cable TV",
                    "Wifi – 300 Mbps",
                    "Patio or balcony",
                    "Cooking basics",
                    "First aid kit",
                    "Outdoor dining area",
                    "Freezer",
                    "Central heating",
                    "Toaster",
                    "Private entrance",
                    "Puracy natural plant based body soap",
                    "Laundromat nearby",
                    "Stainless steel oven",
                    "Outdoor furniture",
                    "Wine glasses",
                    "Carbon monoxide alarm"
                  ],
                  "price": 199,
                  "minimum_nights_number": 30,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "FALSE"
                },
                {
                  "listing_id": 45494285,
                  "name": "1 BR Apt, 1 block from Central Park, Heart of UWS",
                  "host_since": "10/11/2013",
                  "host_location": "United States",
                  "host_response_time": "within an hour",
                  "host_response_rate": 0.7,
                  "host_acceptance_rate": 0.5,
                  "neighbourhood": "Upper West Side",
                  "city": "New York",
                  "latitude": 40.78298,
                  "longitude": -73.97891,
                  "property_type": "Entire apartment",
                  "room_type": "Entire place",
                  "guest_number": 4,
                  "bedroom_number": 1,
                  "amenities_list": [
                    "Lockbox",
                    "Smoke alarm",
                    "Essentials",
                    "Hangers",
                    "Washer",
                    "TV",
                    "Dedicated workspace",
                    "Dryer",
                    "Shampoo",
                    "Heating",
                    "Wifi",
                    "Dishes and silverware",
                    "Air conditioning",
                    "Long term stays allowed",
                    "Carbon monoxide alarm",
                    "Kitchen"
                  ],
                  "price": 200,
                  "minimum_nights_number": 30,
                  "maximum_nights_number": 1125,
                  "instant_bookable": "TRUE"
                }
              ]
            for(let i=0; i<newdata.length; i++){
                data.push(newdata[i]);
            }
            res.sendStatus(201, "Data created");  
        } else {
            res.status(200).send(JSON.stringify(data));
        }
    }),

    // GET => Get data by host_location

    app.get(API_BASE_JMS + "/:country",(req,res)=>{
        const PAIS = req.params.country;
        const countryDatos = data.filter(p => p.host_location === PAIS);

        if(countryDatos.length > 0){
            res.status(200).send(JSON.stringify(countryDatos));
        } else {
            res.sendStatus(404, "NOT FOUND");
        }
    }),

    // POST => Crea un nuevo airbnb

    app.post(API_BASE_JMS + "/", (req,res) => {
        let newdata = req.body;
        const equal = data.some(old => old.name === newdata.name && old.latitude === newdata.latitude && old.longitude === newdata.longitude);
        if(equal){
            // POST not allowed due to resource already existing
            res.sendStatus(409, "CONFLICT");
        } else if (!newdata || Object.keys(newdata).length === 0){
            // If not valid JSON received
            res.sendStatus(400, "BAD REQUEST");
        } else {
            // Valid POST
            data.push(newdata);
            res.sendStatus(201, "CREATED");
        }
    }),

    // PUT => Can't update root directory
    app.put(API_BASE_JMS + "/", (req,res)=> {
        let newdata = req.body;
        res.sendStatus(405,"METHOD NOW ALLOWED");
    }),

    //PUT => Update resource by listing_id
    app.put(API_BASE_JMS + "/:id", (req,res) =>{
        const ID = parseInt(req.params.id);
        let newdata = req.body;

        // Encuentra el índice del elemento con el ID dado en la lista de datos
        const index = data.findIndex(p => p.listing_id === ID);

        if(index === -1){
            // El elemento con el ID dado no existe, devolver un error 404 NOT FOUND
            res.sendStatus(404, "NOT FOUND");
        } else if (!newdata || Object.keys(newdata).length === 0 || newdata.listing_id !== ID){
            // Los datos proporcionados son inválidos o el ID no coincide, devolver un error 400 BAD REQUEST
            res.sendStatus(400, "BAD REQUEST");
        } else {
            // Reemplazar el dato existente con los nuevos datos
            data[index] = newdata;
            res.sendStatus(200, "OK");
        }
    }),

    // DELETE => Delete all data

    app.delete(API_BASE_JMS + "/", (req,res) => {
        data.splice(0, data.length);
        res.status(200).send("ALL DATA DELETED");
    }),

    // DELETE => Delete specific data
    app.delete(API_BASE_JMS + "/:id", (req,res) => {
        const ID = parseInt(req.params.id);
        const nuevosDatos = data.filter(entry => entry.listing_id !== ID);

        if(nuevosDatos.length < data.length){
            //Delete data from specified filter
            data = nuevosDatos;
            res.sendStatus(200, "OK");
        } else {
            //Try to acces not existing resource
            res.sendStatus(404, "NOT FOUND");
        }
    }),

    // POST => Try to use not allowed method
    app.post(API_BASE_JMS + "/:country", (req,res) =>{
        const PAIS = req.params.country;
        let newdata = req.body;
        res.sendStatus(405, "METHOD NOT ALLOWED");
    });
};