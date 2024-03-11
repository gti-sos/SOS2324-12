const API_BASE_JMS = "/api/v1/airbnb-listings";

let initialData = [
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
];

module.exports = (app,db) => {
    
  // REDIRECT al portal de documentación
  app.get(API_BASE_JMS + "/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/33042302/2sA2xe5uSh");
  });

    // GET => Lista todos los datos
    // Permite establecer un periodo con from y to
    // Permite buscar por cualquier parametro con ?parametro=valor
    // Permite paginacion con limit y offset

    app.get(API_BASE_JMS + "/", (req, res) => {
      const { from, to, limit, offset, ...queryParams } = req.query;
  
      // Verifica si hay parámetros 'from' y 'to'
      if (from !== undefined && to !== undefined) {
          const fromYear = parseInt(from);
          const toYear = parseInt(to);
          if (isNaN(fromYear) || isNaN(toYear)) {
              return res.status(400).send("Invalid year format. Please provide valid year values.");
          }
  
          // Filtra los resultados dentro del rango de años especificado
          db.find({}, (err, listings) => {
              if (err) {
                  return res.status(500).send("Internal Server Error");
              }
  
              const filteredListings = listings.filter(listing => {
                  const listingYear = new Date(listing.host_since).getFullYear();
                  return listingYear >= fromYear && listingYear <= toYear;
              });
  
              // Verificar si se encontraron resultados
              if (filteredListings.length === 0) {
                  return res.status(404).send("No listings found within the specified range.");
              }
  
              // Aplicar paginación si los parámetros limit y offset están presentes
              let paginatedListings = filteredListings;
              if (limit !== undefined) {
                  const limitNum = parseInt(limit);
                  if (offset !== undefined) {
                      const offsetNum = parseInt(offset);
                      paginatedListings = filteredListings.slice(offsetNum, offsetNum + limitNum);
                  } else {
                      paginatedListings = filteredListings.slice(0, limitNum);
                  }
              }
  
              // Eliminar el campo _id de los resultados y enviar la respuesta
              const responseBody = paginatedListings.map((listing) => {
                  delete listing._id;
                  return listing;
              });
              res.status(200).send(responseBody);
          });
      } else if (Object.keys(queryParams).length === 0) {
          // No hay parámetros de consulta, devolver todos los recursos
          db.find({}, handleDbResponse);
      } else {
          // Hay parámetros de consulta, filtrar por esos parámetros
          db.find(queryParams, handleDbResponse);
          if (queryParams.listing_id) queryParams.listing_id = parseInt(queryParams.listing_id);
          if (queryParams.host_response_rate) queryParams.host_response_rate = parseFloat(queryParams.host_response_rate);
          if (queryParams.host_acceptance_rate) queryParams.host_acceptance_rate = parseFloat(queryParams.host_acceptance_rate);
          if (queryParams.latitude) queryParams.latitude = parseFloat(queryParams.latitude);
          if (queryParams.longitude) queryParams.longitude = parseFloat(queryParams.longitude);
          if (queryParams.guest_number) queryParams.guest_number = parseInt(queryParams.guest_number);
          if (queryParams.bedroom_number) queryParams.bedroom_number = parseInt(queryParams.bedroom_number);
          if (queryParams.price) queryParams.price = parseFloat(queryParams.price);
          if (queryParams.minimum_nights_number) queryParams.minimum_nights_number = parseInt(queryParams.minimum_nights_number);
          if (queryParams.maximum_nights_number) queryParams.maximum_nights_number = parseInt(queryParams.maximum_nights_number);

      }
  
      function handleDbResponse(err, listings) {
          if (err) {
              return res.status(500).send("Internal Server Error");
          }
  
          // Verificar si se encontraron resultados
          if (listings.length === 0) {
              return res.status(404).send("No listings found.");
          }
  
          // Aplicar paginación si los parámetros limit y offset están presentes
          let paginatedListings = listings;
          if (limit !== undefined) {
              const limitNum = parseInt(limit);
              if (offset !== undefined) {
                  const offsetNum = parseInt(offset);
                  paginatedListings = listings.slice(offsetNum, offsetNum + limitNum);
              } else {
                  paginatedListings = listings.slice(0, limitNum);
              }
          }
  
          // Eliminar el campo _id de los resultados y enviar la respuesta
          const responseBody = paginatedListings.map((listing) => {
              delete listing._id;
              return listing;
          });
          res.status(200).send(responseBody);
      }
  }),
  
  
    // GET => loadInitialData (al hacer un GET cree 10 o más datos en el array de NodeJS si está vacío)
    app.get(API_BASE_JMS+"/loadInitialData",(req,res) => {
      db.find({},(err,listings) => {
        if(err){
          res.sendStatus(500, "INTERNAL ERROR");
        }; 
        if (listings.length === 0) {
          db.insert(initialData, (err,listings) =>{
            if(err){
              console.error("Error al insertar datos iniciales:", err);
              res.sendStatus(500, "INTERNAL ERROR");
            } else {
              console.log("Database is empty.");
              console.log("Adding initial data.");
              res.sendStatus(201, "DATA CREATED");
            }
          });
        } else {
          console.log("Database already contains data, initial data won't be loaded again.");
          res.sendStatus(200, "OK");
        }
      }); 
    }),

    // GET => Search data by year
    app.get(API_BASE_JMS + "/year/:year", (req, res) => {
      const year = req.params.year;
      // Verificar si el año tiene un formato válido (cuatro dígitos)
      if (!(/^\d{4}$/.test(year))) {
      return res.status(400).send("Bad Request. Please provide a valid year in YYYY format.");
      };
      const yearRegex = new RegExp(`\\d{2}/\\d{2}/${year}`);
      db.find({ host_since: { $regex: yearRegex } }, (err, listings) => {
          if (err) {
              res.sendStatus(500, "INTERNAL ERROR");
          } else {
              if (listings.length === 0) {
                  res.sendStatus(404, "NOT FOUND");
              } else {
                  res.status(200).send(JSON.stringify(listings.map((listing => { delete listing._id; return listing; }))));
              }
          }
      });
    }),

    // GET => Buscar por host_location y year
    app.get(API_BASE_JMS + "/:year/:host_location", (req, res) => {
      const { year, host_location } = req.params;
      // Verificar si el año tiene un formato válido (cuatro dígitos)
      if (!(/^\d{4}$/.test(year))) {
      return res.status(400).send("Bad Request. Please provide a valid year in YYYY format.");
      };
      // Parsear el año de la consulta a entero
      const yearInt = parseInt(year);
      // Crear una expresión regular para buscar en el campo host_since
      const regex = new RegExp(`^\\d{2}/\\d{2}/${yearInt}$`);
      db.find({ host_location: host_location, host_since: { $regex: regex } }, (err, listings) => {
          if (err) {
              res.sendStatus(500, "INTERNAL ERROR");
          } else {
              if (listings.length === 0) {
                  res.sendStatus(404, "RESOURCE NOT FOUND");
              } else {
                  res.status(200).send(JSON.stringify(listings.map((listing => { delete listing._id; return listing; }))));
              }
          }
      });
    }),

  // POST => Create a new listing
  app.post(API_BASE_JMS + "/", (req, res) => {

    const newData =  req.body;
    const expectedFields = ["listing_id","name","host_since","host_location","host_response_time","host_response_rate","host_acceptance_rate","neighbourhood","city","latitude","longitude","property_type","room_type","guest_number","bedroom_number","amenities_list","price","minimum_nights_number","maximum_nights_number","instant_bookable"
    ];
    const receivedFields = Object.keys(newData);
    const isValidData = expectedFields.every(field => receivedFields.includes(field));

    if (!isValidData) {
        res.sendStatus(400, "Bad Request"); // Datos inválidos
    } else {
        // Verificar si ya existe un documento con el mismo cci en la base de datos
        db.findOne({ listing_id: newData.listing_id, latitude: newData.latitude, longitude: newData.longitude }, (err, existingData) => {
            if (err) {
                res.sendStatus(500, "Internal Error"); // Error interno del servidor
            } else {
                if (existingData) {
                    res.sendStatus(409, "Conflict"); //Datos existentes
                } else {
                    // Si no existe, insertar el nuevo documento
                    db.insert(newData, (err, insertedData) => {
                        if (err) {
                            res.sendStatus(500, "Internal Error"); // Error interno del servidor
                        } else {
                            res.sendStatus(201, "Created");
                        }
                    });
                }
            }
        });
    }
});

    // PUT => Can't update root directory
    app.put(API_BASE_JMS + "/", (req,res)=> {
        res.sendStatus(405,"METHOD NOW ALLOWED");
    }),

    // PUT => Update resource by listing_id
    app.put(API_BASE_JMS + "/:listing_id", (req, res) => {

      const listing_id = parseInt(req.params.listing_id);
      let data = req.body;

      if (!data || Object.keys(data).length === 0 || data.listing_id !== listing_id) {
          res.sendStatus(400, "BAD REQUEST"); // Datos inválidos
      } else {
          db.update({ listing_id: listing_id }, data, { }, (err) => {
              if (err) {
                  res.sendStatus(500, "Internal Server Error"); // Error interno del servidor
              }
              res.sendStatus(200, "Ok"); //Actualizacion correcta
          });
      }
  }),
      // PUT => Update resource by latitude and longitude
      app.put(API_BASE_JMS + "/:latitude/:longitude", (req, res) => {
        const latitude = parseFloat(req.params.latitude);
        const longitude = parseFloat(req.params.longitude);
        let data = req.body;
  
        if (!data || Object.keys(data).length === 0 || data.latitude !== latitude || data.longitude !== longitude) {
            res.sendStatus(400, "BAD REQUEST"); // Datos inválidos
        } else {
            db.update({ latitude: latitude, longitude: longitude }, data, { }, (err) => {
                if (err) {
                    res.sendStatus(500, "Internal Server Error"); // Error interno del servidor
                }
                res.sendStatus(200, "Ok"); //Actualizacion correcta
            });
        }
    }),

    // DELETE => Delete all data
    app.delete(API_BASE_JMS + "/", (req, res) => {
      db.remove({}, { multi: true }, (err, numRemoved) => { // Borrar todo la base de datos
        if (err) {
            res.sendStatus(500, "Internal Error"); // Error interno del servidor
            return;
        } else {
            if (numRemoved >= 1) {
                console.log("All data has been deleted");
                res.sendStatus(200, "Ok"); // Todos los datos han sido eliminados correctamente
            } else {
                console.log("No data found for deletion");
                res.sendStatus(204, "No content"); // No se encontraron datos para eliminar
            }
        }
    });
  }),

    // DELETE => Delete specific data by listing_id
    app.delete(API_BASE_JMS + "/:id", (req, res) => {
      const ID = parseInt(req.params.id);
  
      // Eliminar el documento con el listing_id especificado de la base de datos
      db.remove({ listing_id: ID }, {}, (err, numRemoved) => {
          if (err) {
              res.sendStatus(500).send("INTERNAL ERROR");
          } else if (numRemoved === 0) {
              // No se encontró ningún documento con el listing_id especificado, devolver un error 404 NOT FOUND
              res.sendStatus(204, "NO CONTENT");
          } else {
              // Se eliminó correctamente el documento
              res.sendStatus(200, "OK");
          }
      });
    }),

    // DELETE => Delete specific data by latitude and longitude
    app.delete(API_BASE_JMS + "/:latitude/:longitude", (req, res) => {
    const latitude = parseFloat(req.params.latitude);
    const longitude = parseFloat(req.params.longitude);

    // Eliminar el documento con la latitud y longitud especificadas de la base de datos
    db.remove({ latitude: latitude, longitude: longitude }, {}, (err, numRemoved) => {
        if (err) {
            res.sendStatus(500).send("INTERNAL ERROR");
        } else if (numRemoved === 0) {
            // No se encontró ningún documento con la latitud y longitud especificadas, devolver un error 404 NOT FOUND
            res.sendStatus(204, "NO CONTENT");
        } else {
            // Se eliminó correctamente el documento
            res.sendStatus(200, "OK");
        }
    });
    }),

    // POST => Method not allowed
    app.post(API_BASE_JMS + "/:id", (req, res) => {
    // Devuelve un estado 405 (Método no permitido) con un mensaje explicativo
    res.status(405).send("METHOD NOT ALLOWED. Please use this endpoint to create a new resource without specifying an ID or param.");
    });
};