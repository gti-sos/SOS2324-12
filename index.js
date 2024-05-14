import express from "express";
import bodyParser from "body-parser";
import {loadBackend_JMS} from "./back/v1/airbnb-listings/index-JMS.js";
import {loadBackend_JMS_v2} from "./back/v2/airbnb-listings/index-JMS.js";
import {loadBackend_JMS_v3} from "./back/v3/airbnb-listings/index-JMS.js";
import { initializeApp } from "firebase/app";

import {loadBackend_JMR} from "./back/v1/world-consumption-of-drinking-water-data/index-JMR.js";
import {loadBackend_JMR_v2} from "./back/v2/world-consumption-of-drinking-water-data/index-JMR.js";
import {loadBackend_BFA} from "./back/v1/global-food-prices/index-BFA.js";
import {loadBackend_BFA_v2} from "./back/v2/global-food-prices/index-BFA.js";
import dataStore from "nedb";
import {handler} from "./front/build/handler.js";
import cors from "cors";
import { config } from 'dotenv';
import request from "request";
config();


let db_airbnb = new dataStore();
let db_water = new dataStore();
let db_food = new dataStore();

let db_airbnb_v2 = new dataStore();
let db_water_v2 = new dataStore();
let db_food_v2 = new dataStore();


let app = express();

app.use(cors());

// Proxy genérico JOSE

app.use("/proxyAPI", function(req, res) {
  const url = req.query.url; // Recibe la URL final de la API externa como un parámetro query
  console.log("Proxying to:", url);

  request({ url: url, qs: req.query }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      res.status(500).send("Error accessing the external API");
    }
  });
});

// Proxy JOTA

app.use("/proxyJOTA", function (req, res) {
  const url = 'https://covid-19-statistics.p.rapidapi.com/reports?iso=ESP';
  const options = {
      url: url,
      headers: {
          'X-RapidAPI-Key': 'a35e4e4bc4msh76b0742b85f42a7p142c2fjsnf4b8084e88bc',
          'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
      }
  };
  request(options, (error, response, body) => {
      if (error) {
          console.error(error);
          res.status(500).send(error);
      } else {
          console.log(response.statusCode);
          console.log(body);
          res.send(body);
      }
  });
})


// Proxy Borja
app.use("/proxyMelanie", function(req, res) {
  var url = "https://spotify-statistics-and-stream-count.p.rapidapi.com/album/4DhwPZXdLy4LjoHqJxz8DM"; // URL de la API de Spotify
  console.log("Proxying to: " + url);
  
  // Realizar la solicitud a la API de Spotify
  request({
      url: url,
      qs: req.query, 
      headers: {
				'X-RapidAPI-Key': '86f188c83amsh7d037daa577bc3fp1fc5a3jsn27279c5d02d7',
				'X-RapidAPI-Host': 'spotify-statistics-and-stream-count.p.rapidapi.com'
			}
  }).pipe(res); // Enviar la respuesta de la API de Spotify de vuelta al cliente
});


app.use(bodyParser.json());


const PORT = (process.env.PORT || 10000); 
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };  
const app_firebase = initializeApp(firebaseConfig);



// APIs

//airbnb-listings
loadBackend_JMS(app,db_airbnb);
loadBackend_JMS_v2(app,db_airbnb_v2);
loadBackend_JMS_v3(app,app_firebase);

//world-consumption-of-drinking-water-data
loadBackend_JMR(app,db_water);
loadBackend_JMR_v2(app,db_water_v2);


//global-food-prices
loadBackend_BFA(app,db_food)
loadBackend_BFA_v2(app,db_food_v2)

app.use(handler);

app.listen(PORT, () =>
{
    console.log(`Server listening on port PORT ${PORT} `  ); 
});