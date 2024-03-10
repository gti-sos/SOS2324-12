let express = require("express");
let bodyParser = require("body-parser");
let API_JMS = require("./api/index-JMS");
let API_JMR = require("./api/index-JMR");
let API_BFA = require("./api/index-BFA");
let dataStore = require("nedb");

let db_airbnb = new dataStore();
let db_water = new dataStore();
let db_food = new dataStore();


let app = express();
app.use(bodyParser.json());

const PORT = (process.env.PORT || 10000);

// Group Static Information 

app.use("/", express.static("./public"));

// APIs

//airbnb-listings
API_JMS(app,db_airbnb);

//
API_JMR(app,db_water);

//global-food-prices-listings
API_BFA(app, db_food)


app.listen(PORT, () =>
{
    console.log(`Server listening on port PORT ${PORT} `  ); 
});