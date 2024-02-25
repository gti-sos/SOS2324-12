let cool = require("cool-ascii-faces");
let express = require("express");


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



