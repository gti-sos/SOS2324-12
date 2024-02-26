let cool = require("cool-ascii-faces");
let express = require("express");
const { datos_ejemplo, mean_price_by_city } = require('./samples/JMS');
const { mean_price_bread_country } = require('./samples/BFA');
const { datos, calcularMediaCampo } = require('./samples/JMR');

let app = express();
const PORT = (process.env.PORT || 10000);

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
    datos.forEach(element => {
    const media = calcularMediaCampo(element.country, "total_improved_total");})
    res.send(`<html> <body> <h1> La media de mejora total de ${element.country} es: ${media} </h1> </body> </html>`);
});
// .../samples/BFA Requests


app.get("/samples/BFA", (req, res) => {
    let country = "Badakhshan"
    const price = mean_price_bread_country(country);
    res.send(`<html> <body> <h1> The average price for bread in ${country} is ${price} </h1> </body> </html>`);
});