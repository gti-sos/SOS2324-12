import express from "express";
import bodyParser from "body-parser";
import {loadBackend_JMS} from "./back/v1/airbnb-listings/index-JMS.js";
import {loadBackend_JMS_v2} from "./back/v2/airbnb-listings/index-JMS.js";
import {loadBackend_JMR} from "./back/v1/world-consumption-of-drinking-water-data/index-JMR.js";
import {loadBackend_BFA} from "./back/v1/global-food-prices/index-BFA.js";
import dataStore from "nedb";
import {handler} from "./front/build/handler.js";
import cors from "cors";

let db_airbnb = new dataStore();
let db_water = new dataStore();
let db_food = new dataStore();

let db_airbnb_v2 = new dataStore();

let app = express();

app.use(cors());

app.use(bodyParser.json());

const PORT = (process.env.PORT || 10000); 


// APIs

//airbnb-listings
loadBackend_JMS(app,db_airbnb);
loadBackend_JMS_v2(app,db_airbnb_v2);

//world-consumption-of-drinking-water-data
loadBackend_JMR(app,db_water);

//global-food-prices
loadBackend_BFA(app,db_food)

app.use(handler);

app.listen(PORT, () =>
{
    console.log(`Server listening on port PORT ${PORT} `  ); 
});