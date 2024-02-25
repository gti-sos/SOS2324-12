let cool = require("cool-ascii-faces");
let express = require("express");
const { datos_ejemplo, mean_price_by_city } = require('./samples/JMS');

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

