const API_BASE_JMS = "/api/v2/airbnb-listings";

let initialData = [
  {
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
    "name": "Appartement 2 piÇŸ¶ùces proche canal st martin /Gare",
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
  },
  {
    "name": "Studio on Park in Fort Greene, Brooklyn",
    "host_since": "29/07/2012",
    "host_location": "United States",
    "host_response_time": "within a few hours",
    "host_response_rate": 0.64,
    "host_acceptance_rate": 0.97,
    "neighbourhood": "Fort Greene",
    "city": "New York",
    "latitude": 40.68834,
    "longitude": -73.97417,
    "property_type": "Entire apartment",
    "room_type": "Entire place",
    "guest_number": 1,
    "bedroom_number": 1,
    "amenities_list": [
      "Lockbox",
      "Smoke alarm",
      "Essentials",
      "Hangers",
      "Washer",
      "Dedicated workspace",
      "Wifi",
      "Dryer",
      "Heating",
      "Private entrance",
      "Air conditioning",
      "Long term stays allowed",
      "Kitchen"
    ],
    "price": 100,
    "minimum_nights_number": 30,
    "maximum_nights_number": 1125,
    "instant_bookable": "FALSE"
  },
  {
    "name": "Brooklyn Comfy & Luminous 2 rooms studio",
    "host_since": "03/06/2018",
    "host_location": "United States",
    "host_response_time": "within an hour",
    "host_response_rate": 0.62,
    "host_acceptance_rate": 0.33,
    "neighbourhood": "Bushwick",
    "city": "New York",
    "latitude": 40.69941,
    "longitude": -73.92159,
    "property_type": "Entire apartment",
    "room_type": "Entire place",
    "guest_number": 2,
    "bedroom_number": 1,
    "amenities_list": [
      "Refrigerator",
      "Microwave",
      "Shampoo",
      "Air conditioning",
      "Free street parking",
      "Coffee maker",
      "Iron",
      "Hangers",
      "Smoke alarm",
      "Dedicated workspace",
      "Fire extinguisher",
      "Hot water",
      "Long term stays allowed",
      "Lockbox",
      "Hair dryer",
      "Essentials",
      "Dishes and silverware",
      "TV",
      "Wifi",
      "Heating",
      "Cooking basics",
      "First aid kit",
      "Private entrance",
      "Carbon monoxide alarm"
    ],
    "price": 120,
    "minimum_nights_number": 30,
    "maximum_nights_number": 1125,
    "instant_bookable": "FALSE"
  },
  {
    "name": "Bright and Stylish Atelier in New York City",
    "host_since": "23/08/2012",
    "host_location": "United States",
    "host_response_time": "within a few hours",
    "host_response_rate": 0.87,
    "host_acceptance_rate": 0.22,
    "neighbourhood": "Kips Bay",
    "city": "New York",
    "latitude": 40.73868,
    "longitude": -73.98037,
    "property_type": "Entire apartment",
    "room_type": "Entire place",
    "guest_number": 2,
    "bedroom_number": 1,
    "amenities_list": [
      "Breakfast",
      "Refrigerator",
      "Microwave",
      "Shampoo",
      "Air conditioning",
      "Kitchen",
      "Iron",
      "Hangers",
      "Smoke alarm",
      "Dedicated workspace",
      "Fire extinguisher",
      "Long term stays allowed",
      "Hair dryer",
      "Essentials",
      "Wifi",
      "Heating",
      "Stove",
      "Indoor fireplace",
      "Private entrance",
      "Laundromat nearby",
      "Carbon monoxide alarm"
    ],
    "price": 375,
    "minimum_nights_number": 4,
    "maximum_nights_number": 1125,
    "instant_bookable": "FALSE"
  },
  {
    "name": "One bedroom close to all",
    "host_since": "22/10/2019",
    "host_location": "United States",
    "host_response_time": "within an hour",
    "host_response_rate": 0.91,
    "host_acceptance_rate": 0.16,
    "neighbourhood": "Midtown",
    "city": "New York",
    "latitude": 40.74301,
    "longitude": -73.98243,
    "property_type": "Entire apartment",
    "room_type": "Entire place",
    "guest_number": 4,
    "bedroom_number": 1,
    "amenities_list": [
      "Refrigerator",
      "Single level home",
      "Microwave",
      "Shampoo",
      "Air conditioning",
      "Bathtub",
      "Kitchen",
      "Coffee maker",
      "Oven",
      "Iron",
      "Hangers",
      "Smoke alarm",
      "Dedicated workspace",
      "Fire extinguisher",
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
      "Paid parking off premises",
      "Cooking basics",
      "Stove",
      "Cleaning before checkout",
      "Window guards",
      "Carbon monoxide alarm",
      "Ethernet connection"
    ],
    "price": 109,
    "minimum_nights_number": 30,
    "maximum_nights_number": 1125,
    "instant_bookable": "TRUE"
  },
  {
    "name": "1BR apt#2 in brownstone sleep 4. CLEAN CDC Req.",
    "host_since": "11/11/2013",
    "host_location": "United States",
    "host_response_time": "within a few hours",
    "host_response_rate": 0.74,
    "host_acceptance_rate": 0.15,
    "neighbourhood": "Bedford-Stuyvesant",
    "city": "New York",
    "latitude": 40.6819,
    "longitude": -73.94256,
    "property_type": "Entire apartment",
    "room_type": "Entire place",
    "guest_number": 4,
    "bedroom_number": 1,
    "amenities_list": [
      "Nespresso machine",
      "Refrigerator",
      "Shampoo",
      "Air conditioning",
      "Kitchen",
      "Oven",
      "Smoke alarm",
      "Hangers",
      "Fire extinguisher",
      "Shower gel",
      "Long term stays allowed",
      "Extra pillows and blankets",
      "Bed linens",
      "Essentials",
      "TV",
      "Wifi",
      "Heating",
      "Cooking basics",
      "Stove",
      "Luggage dropoff allowed",
      "Private entrance",
      "Conditioner",
      "Carbon monoxide alarm",
      "Pour-over coffee"
    ],
    "price": 95,
    "minimum_nights_number": 4,
    "maximum_nights_number": 1125,
    "instant_bookable": "TRUE"
  },
  {
    "name": "Stay in style! Modern, vibrant, all new appliances",
    "host_since": "12/12/2014",
    "host_location": "United States",
    "host_response_time": "within a few hours",
    "host_response_rate": 0.98,
    "host_acceptance_rate": 0.25,
    "neighbourhood": "Gramercy",
    "city": "New York",
    "latitude": 40.73743,
    "longitude": -73.98832,
    "property_type": "Entire apartment",
    "room_type": "Entire place",
    "guest_number": 2,
    "bedroom_number": 1,
    "amenities_list": [
      "Heating",
      "TV",
      "Shampoo",
      "Essentials",
      "Long term stays allowed",
      "Iron",
      "Hangers",
      "Air conditioning",
      "Smoke alarm",
      "Carbon monoxide alarm",
      "Wifi",
      "Kitchen"
    ],
    "price": 110,
    "minimum_nights_number": 10,
    "maximum_nights_number": 1125,
    "instant_bookable": "TRUE"
  },
  {
    "name": "Midtown West Furnished Luxury 1 Bed / 1 Bath Apt.",
    "host_since": "01/01/2020",
    "host_location": "United States",
    "host_response_time": "within an hour",
    "host_response_rate": 0.44,
    "host_acceptance_rate": 0.48,
    "neighbourhood": "Hell's Kitchen",
    "city": "New York",
    "latitude": 40.76148,
    "longitude": -73.98765,
    "property_type": "Entire apartment",
    "room_type": "Entire place",
    "guest_number": 4,
    "bedroom_number": 1,
    "amenities_list": [
      "Refrigerator",
      "Microwave",
      "Air conditioning",
      "Free street parking",
      "Kitchen",
      "Coffee maker",
      "Oven",
      "Iron",
      "Hangers",
      "Smoke alarm",
      "Washer",
      "Dryer",
      "Hot water",
      "Long term stays allowed",
      "Paid parking on premises",
      "Extra pillows and blankets",
      "Hair dryer",
      "Bed linens",
      "Essentials",
      "Dishes and silverware",
      "Gym",
      "TV",
      "Dishwasher",
      "Wifi",
      "Cable TV",
      "Heating",
      "Cooking basics",
      "Stove",
      "Bread maker",
      "Private entrance",
      "Carbon monoxide alarm"
    ],
    "price": 135,
    "minimum_nights_number": 30,
    "maximum_nights_number": 1125,
    "instant_bookable": "FALSE"
  },
  {
    "name": "1 bdr apt#3 in a renovated bright brownstone",
    "host_since": "11/11/2013",
    "host_location": "United States",
    "host_response_time": "within a few hours",
    "host_response_rate": 0.56,
    "host_acceptance_rate": 0.3,
    "neighbourhood": "Bedford-Stuyvesant",
    "city": "New York",
    "latitude": 40.6821,
    "longitude": -73.94153,
    "property_type": "Entire apartment",
    "room_type": "Entire place",
    "guest_number": 4,
    "bedroom_number": 1,
    "amenities_list": [
      "Breakfast",
      "Smoke alarm",
      "Essentials",
      "Hangers",
      "TV",
      "Wifi",
      "Shampoo",
      "Heating",
      "Private entrance",
      "Fire extinguisher",
      "Air conditioning",
      "Long term stays allowed",
      "Carbon monoxide alarm",
      "Kitchen"
    ],
    "price": 88,
    "minimum_nights_number": 30,
    "maximum_nights_number": 1125,
    "instant_bookable": "TRUE"
  },
  {
    "name": "The Renovated Midtown Apartment",
    "host_since": "28/02/2020",
    "host_location": "United States",
    "host_response_time": "within an hour",
    "host_response_rate": 0.52,
    "host_acceptance_rate": 0.15,
    "neighbourhood": "Midtown",
    "city": "New York",
    "latitude": 40.75563,
    "longitude": -73.96418,
    "property_type": "Entire apartment",
    "room_type": "Entire place",
    "guest_number": 4,
    "bedroom_number": 1,
    "amenities_list": [
      "First aid kit",
      "Hair dryer",
      "Iron",
      "Hangers",
      "Essentials",
      "Washer",
      "TV",
      "Smoke alarm",
      "Dryer",
      "Fire extinguisher",
      "Heating",
      "Wifi",
      "Air conditioning",
      "Long term stays allowed",
      "Kitchen"
    ],
    "price": 130,
    "minimum_nights_number": 30,
    "maximum_nights_number": 1125,
    "instant_bookable": "FALSE"
  }
];
//
function loadBackend_JMS_v2(app,db){
    
  // REDIRECT al portal de documentación
  app.get(API_BASE_JMS + "/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/33042302/2sA35G53Hy");
  });

    // GET => Lista todos los datos
    // Permite establecer un periodo con from y to
    // Permite buscar por cualquier parametro con ?parametro=valor
    // Permite paginacion con limit y offset
    // Permite filtrar por un rango de precios con ?min_price=valor&max_price=valor
    // Permite filtrar por año (extraido de la fecha de registro del host) con ?year=valor
    // Método para manejar las solicitudes GET a la ruta raíz
    // Método para manejar las solicitudes GET a la ruta raíz
      // Método para manejar las solicitudes GET a la ruta raíz
      app.get(API_BASE_JMS + "/", (req, res) => {
        const { amenities_list, from, to, min_price, max_price, limit, offset, name, year, ...queryParams } = req.query;
    
        if (amenities_list !== undefined) {
            const amenitiesArray = amenities_list.split(',');
            queryParams.amenities_list = { $in: amenitiesArray };
        };
    
        if (name !== undefined) {
            const nameRegex = new RegExp(name, 'i');
            queryParams.name = nameRegex;
        };
    
        if (year !== undefined && /^\d{4}$/.test(year)) {
            const limitNum = parseInt(limit) || 10;
            const offsetNum = parseInt(offset) || 0;
            const yearRegex = new RegExp(`\\d{2}/\\d{2}/${year}`);
    
            db.find({ host_since: { $regex: yearRegex } })
                .skip(offsetNum)
                .limit(limitNum)
                .exec((err, listings) => {
                    if (err) {
                        res.status(500).send("Internal Error");
                    } else {
                        if (listings.length === 0) {
                            return res.status(404).send("[]");
                        } else {
                            const responseBody = listings.map((listing) => { 
                                delete listing._id; 
                                return listing; 
                            });
                            return res.status(200).send(responseBody);
                        }
                    }
                });
        } else if (from !== undefined && to !== undefined) {
            const fromYear = parseInt(from);
            const toYear = parseInt(to);
            if (isNaN(fromYear) || isNaN(toYear)) {
                return res.status(400).send("Invalid year format. Please provide valid year values.");
            }
    
            db.find({}, (err, listings) => {
                if (err) {
                    return res.status(500).send("Internal Server Error");
                } 
    
                const filteredListings = listings.filter(listing => {
                    const listingYear = new Date(listing.host_since).getFullYear();
                    return listingYear >= fromYear && listingYear <= toYear;
                });
    
                const hasOtherFilters = Object.keys(queryParams).length > 0;
    
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
    
                if (filteredListings.length === 0 && !hasOtherFilters) {
                    return res.status(404).send("[]");
                }
    
                let responseBody = paginatedListings.map((listing) => {
                    delete listing._id;
                    return listing;
                });
    
                res.status(200).send(responseBody);
            });
        } else if (min_price !== undefined && max_price !== undefined) {
            if (isNaN(parseFloat(min_price)) || isNaN(parseFloat(max_price))) {
                return res.status(400).send("Bad Request. Please provide valid numerical values for min_price and max_price.");
            }
    
            db.find({ price: { $gte: parseFloat(min_price), $lte: parseFloat(max_price) }, ...queryParams })
                .exec((err, listings) => {
                    if (err) {
                        return res.status(500).send("Internal Server Error");
                    }
    
                    if (listings.length === 0) {
                        return res.status(404).send("[]");
                    }
    
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
    
                    let responseBody = paginatedListings.map((listing) => {
                        delete listing._id;
                        return listing;
                    });
    
                    res.status(200).send(responseBody);
                });
        } else if (Object.keys(queryParams).length === 0) {
            db.find({}, handleDbResponse);
        } else {
            db.find(queryParams, handleDbResponse);
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
    
            if (listings.length === 0) {
                return res.status(404).send("[]");
            }
    
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
    
            let responseBody = paginatedListings.map((listing) => {
                delete listing._id;
                return listing;
            });
    
            res.status(200).send(responseBody);
        }
    });
    

    // GET => loadInitialData (al hacer un GET cree 10 o más datos en el array de NodeJS si está vacío)
    app.get(API_BASE_JMS+"/loadInitialData",(req,res) => {
      db.find({},(err,listings) => {
        if(err){
          res.res.status(500).send("Internal Server Error");
        }; 
        if (listings.length === 0) {
          db.insert(initialData, (err,listings) =>{
            if(err){
              console.error("Error al insertar datos iniciales:", err);
              res.status(500).send("Internal Server Error");
            } else {
              console.log("Database is empty.");
              console.log("Adding initial data.");
              res.status(201).send("Data Created");
            }
          });
        } else {
          console.log("Database already contains data, initial data won't be loaded again.");
          res.status(200).send("Database already contains data, initial data won't be loaded again.");
        }
      }); 
    }),


    // GET => Buscar por latitude y longitude con paginación
    app.get(API_BASE_JMS + "/:latitude/:longitude", (req, res) => {
      const { latitude, longitude } = req.params;

      // Parsear las coordenadas a números flotantes
      const latitudeFloat = parseFloat(latitude);
      const longitudeFloat = parseFloat(longitude);

      // Parsear los parámetros de paginación
      const limit = parseInt(req.query.limit) || 10; // Valor predeterminado: 10
      const offset = parseInt(req.query.offset) || 0; // Valor predeterminado: 0

      // Buscar las listas que coincidan con las coordenadas
      db.find({ latitude: latitudeFloat, longitude: longitudeFloat })
          .limit(limit)
          .skip(offset)
          .exec((err, listings) => {
              if (err) {
                  res.status(500).send("Internal Error");
              } else {
                  if (listings.length === 0) {
                      res.status(404).send("[]");
                  } else {
                      // Eliminar el campo _id de cada resultado
                      const responseBody = listings.map(listing => {
                          delete listing._id;
                          return listing;
                      })[0];

                      // Devolver la lista de resultados
                      return res.status(200).send(responseBody);
                  }
              }
          });
    });


    // POST => Create a new listing
    app.post(API_BASE_JMS + "/", (req, res) => {

      const newData =  req.body;
      const expectedFields = ["name","host_since","host_location","host_response_time","host_response_rate","host_acceptance_rate","neighbourhood","city","latitude","longitude","property_type","room_type","guest_number","bedroom_number","amenities_list","price","minimum_nights_number","maximum_nights_number","instant_bookable"
      ];
      const receivedFields = Object.keys(newData);
      const isValidData = expectedFields.every(field => receivedFields.includes(field));

      if (!isValidData) {
        res.status(400).send("Bad Request, please provide valid data"); // Datos inválidos
      } else {
          // Verificar si ya existe un documento con el mismo cci en la base de datos
          db.findOne({latitude: newData.latitude, longitude: newData.longitude }, (err, existingData) => {
              if (err) {
                res.status(500).send("Internal Error"); // Error interno del servidor
              } else {
                  if (existingData) {
                    res.status(409).send("Conflict, data already exists");  //Datos existentes
                  } else {
                      // Si no existe, insertar el nuevo documento
                      db.insert(newData, (err, insertedData) => {
                          if (err) {
                            res.status(500).send("Internal Error"); // Error interno del servidor
                          } else {
                            res.status(201).send("Created");
                          }
                      });
                  }
              }
          });
      }
    }),

    // PUT => Can't update root directory
    app.put(API_BASE_JMS + "/", (req,res)=> {
      res.status(405).send("Method Not Allowed");
    }),

      // PUT => Update resource by latitude and longitude
    app.put(API_BASE_JMS + "/:latitude/:longitude", (req, res) => {
        const latitude = parseFloat(req.params.latitude);
        const longitude = parseFloat(req.params.longitude);
        let data = req.body;
  
        if (!data || Object.keys(data).length === 0 || data.latitude !== latitude || data.longitude !== longitude) {
          res.status(400).send("Bad Request, please provide valid data"); // Datos inválidos
        } else {
            db.update({ latitude: latitude, longitude: longitude }, data, { }, (err) => {
                if (err) {
                  res.status(500).send("Internal Error"); // Error interno del servidor
                }
                res.status(200).send("OK, data updated"); //Actualizacion correcta
            });
        }
    }),

    // DELETE => Delete all data
    app.delete(API_BASE_JMS + "/", (req, res) => {
      db.remove({}, { multi: true }, (err, numRemoved) => { // Borrar todo la base de datos
        if (err) {
          res.status(500).send("Internal Error"); // Error interno del servidor
            return;
        } else {
            if (numRemoved >= 1) {
                console.log("All data has been deleted");
                res.status(200).send("OK, All data has been deleted"); // Todos los datos han sido eliminados correctamente
            } else {
                console.log("No data found for deletion");
                res.status(204).send("Database is empty"); // No se encontraron datos para eliminar
            }
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
            res.status(500).send("Internal Error");
        } else if (numRemoved === 0) {
            // No se encontró ningún documento con la latitud y longitud especificadas, devolver un error 404 NOT FOUND
            res.status(204).send("Listing not found");
        } else {
            // Se eliminó correctamente el documento
            res.status(200).send("OK, listing deleted");
        }
    });
    }),

    // DELETE => Eliminar por rango de precios
    app.delete(API_BASE_JMS + "/price/:min/:max", (req, res) => {
      const minPrice = parseFloat(req.params.min);
      const maxPrice = parseFloat(req.params.max);

      // Eliminar todos los documentos cuyo precio esté dentro del rango especificado
      db.remove({ price: { $gte: minPrice, $lte: maxPrice } }, { multi: true }, (err, numRemoved) => {
          if (err) {
              res.status(500).send("Internal Error");
          } else if (numRemoved === 0) {
              res.status(204).send("No content found");
          } else {
              res.status(200).send("OK, listing(s) deleted");
          }
      });
    }),

    // POST => Method not allowed
    app.post(API_BASE_JMS + "/:id", (req, res) => {
    // Devuelve un estado 405 (Método no permitido) con un mensaje explicativo
    res.status(405).send("METHOD NOT ALLOWED. Please use this endpoint to create a new resource without specifying an ID or param.");
    });
};

export {loadBackend_JMS_v2};