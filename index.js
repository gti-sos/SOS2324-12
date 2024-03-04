let cool = require("cool-ascii-faces");
let express = require("express");
let bodyParser = require("body-parser");
let API_JMS = require("./api/index-JMS");
let API_JMR = require("./api/index-JMR");
let API_BFA = require("./api/index-BFA");
const { datos_ejemplo, mean_price_by_city } = require('./samples/JMS');
const { mean_price_bread_country } = require('./samples/BFA');
const { datos2, calcularMediaCampo } = require('./samples/JMR');

let app = express();
app.use(bodyParser.json());

const PORT = (process.env.PORT || 10000);

// API
API_JMS(app);
API_JMR(app);
API_BFA(app)

app.listen(PORT, () =>
{
    console.log(`Server listening on port PORT ${PORT} `  ); 
});

// Show Group Static Information

app.use("/", express.static("./public"));


// Show Cool Ascii Dynamic Face

app.get("/cool", (req, res) => {
    res.send(`<html> <body> <h1> ${cool()}</h1> </body> </html>`)
});

// .../samples/JMS Requests
app.get("/samples/JMS", (req, res) => {
    const price = mean_price_by_city(datos_ejemplo,"Paris");
    res.send(`<html> <body> <h1> The average price for an AirBnB in Paris is ${price} </h1> </body> </html>`);
});

// .../samples/JMR Requests
app.get("/samples/JMR", (req, res) => {
    var aux = "";
    datos2.forEach(element => {
    const media = calcularMediaCampo(element.country, "total_improved_total")
    aux += `<html> <body> <h1> La media de mejora total de ${element.country} es: ${media} </h1> </body> </html>`;
})
    res.send(aux);
    }
    );

// .../samples/BFA Requests


app.get("/samples/BFA", (req, res) => {
    let country = "Badakhshan"
    const price = mean_price_bread_country(country);
    res.send(`<html> <body> <h1> The average price for bread in ${country} is ${price} </h1> </body> </html>`);
});