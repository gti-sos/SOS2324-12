const { datos_ejemplo } = require("../samples/JMS");

const API_BASE = "/api/v1";

module.exports = (app) => {
    app.get(API_BASE+"/airbnb-listings",(req,res)=>{
        res.send(JSON.stringify(datos_ejemplo));
    });
};