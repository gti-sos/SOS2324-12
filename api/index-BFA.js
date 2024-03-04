const API_BASE_BFA = "/api/v1/global-food-prices";

var data = [];

module.exports = (app) => {
    
    // GET => Lista todos los datos
    
    app.get(API_BASE_BFA+"/",(req,res)=>{
        res.status(200).send(JSON.stringify(data));
    }),

    // GET => loadInitialData (al hacer un GET cree 10 o más datos en el array de NodeJS si está vacío)
    app.get(API_BASE_BFA+"/loadInitialData",(req,res) => {
        if(data.length === 0){
            let newdata = [
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Badakhshan",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 4,
                    "mp_year": 2015,
                    "mp_price": 50.0,
                    "mp_commoditysource": "WFP"
                },
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Badakhshan",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 4,
                    "mp_year": 2015,
                    "mp_price": 50.0,
                    "mp_commoditysource": "WFP"
                },
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Badakhshan",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 4,
                    "mp_year": 2015,
                    "mp_price": 50.0,
                    "mp_commoditysource": "WFP"
                },
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Badakhshan",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 4,
                    "mp_year": 2015,
                    "mp_price": 50.0,
                    "mp_commoditysource": "WFP"
                },
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Badakhshan",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 5,
                    "mp_year": 2015,
                    "mp_price": 50.0,
                    "mp_commoditysource": "WFP"
                },
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Badakhshan",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 6,
                    "mp_year": 2015,
                    "mp_price": 50.0,
                    "mp_commoditysource": "WFP"
                },
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Badakhshan",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 7,
                    "mp_year": 2015,
                    "mp_price": 50.0,
                    "mp_commoditysource": "WFP"
                },
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Badakhshan",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 8,
                    "mp_year": 2015,
                    "mp_price": 50.0,
                    "mp_commoditysource": "WFP"
                },
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Badakhshan",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 9,
                    "mp_year": 2015,
                    "mp_price": 50.0,
                    "mp_commoditysource": "WFP"
                },
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Badakhshan",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 10,
                    "mp_year": 2015,
                    "mp_price": 56.25,
                    "mp_commoditysource": "WFP"
                },
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Badakhshan",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 11,
                    "mp_year": 2015,
                    "mp_price": 65.25,
                    "mp_commoditysource": "WFP"
                },
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Badakhshan",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 12,
                    "mp_year": 2015,
                    "mp_price": 55.5,
                    "mp_commoditysource": "WFP"
                },
                {
                    "adm0_id": 1,
                    "adm0_name": "Afghanistan",
                    "adm1_id": 272,
                    "adm1_name": "Mazar",
                    "mkt_id": 266,
                    "mkt_name": "Fayzabad",
                    "cm_id": 55,
                    "cm_name": "Bread",
                    "cur_id": 87,
                    "cur_name": "AFN",
                    "pt_id": 15,
                    "pt_name": "Retail",
                    "um_id": 5,
                    "um_name": "KG",
                    "mp_month": 1,
                    "mp_year": 2015,
                    "mp_price": 55.6,
                    "mp_commoditysource": "WFP"
                }
            ]
            for(let i=0; i<newdata.length; i++){
                data.push(newdata[i]);
            }
            res.sendStatus(201, "Data created");  
        } else {
            res.status(200).send(JSON.stringify(data));
        }
    }),

    // GET => Get data by market

    app.get(API_BASE_BFA + "/:market",(req,res)=>{
        const MARKET = req.params.mkt_name;
        const marketDatos = data.filter(p => p.mkt_name === MARKET);

        if(marketDatos.length > 0){
            res.status(200).send(JSON.stringify(marketDatos));
        } else {
            res.sendStatus(404, "NOT FOUND");
        }
    }),

    // POST => Crea una nueva entrada

    app.post(API_BASE_BFA + "/", (req,res) => {
        let newdata = req.body;
        const equal = data.some(old => old.adm0_id === newdata.adm0_id 
            && old.adm1_id === newdata.adm1_id 
            && old.mkt_id === newdata.mkt_id
            && old.cm_id === newdata.cm_id
            && old.mp_month === newdata.mp_month
            && old.mp_year === newdata.mp_year);
        if(equal){
            // POST not allowed due to resource already existing
            res.sendStatus(409, "CONFLICT");
        } else if (!newdata || Object.keys(newdata).length != Object.keys(data[0]).length){
            // If not valid JSON received
            res.sendStatus(400, "BAD REQUEST");
        } else {
            // Valid POST
            data.push(newdata);
            res.sendStatus(201, "CREATED");
        }
    }),

    // PUT => Can't update root directory
    app.put(API_BASE_BFA, (req,res)=> {
        res.sendStatus(405,"METHOD NOW ALLOWED");
    }),

    //PUT => Update resource by listing_id
    app.put(API_BASE_BFA + "/:id", (req,res) =>{
        const ID = parseInt(req.params.id);
        let newdata = req.body;

        // Encuentra el objeto con el índice dado
        const obj = data[ID]

        if(obj === undefined){
            // El elemento con el ID dado no existe, devolver un error 404 NOT FOUND
            res.sendStatus(404, "NOT FOUND");
        } else if (!newdata || Object.keys(newdata).length === 0){
            // Los datos proporcionados son inválidos o el ID no coincide, devolver un error 400 BAD REQUEST
            res.sendStatus(400, "BAD REQUEST");
        } else {
            // Reemplazar el dato existente con los nuevos datos
            data[ID] = newdata;
            res.sendStatus(200, "OK");
        }
    }),

    // DELETE => Delete all data

    app.delete(API_BASE_BFA + "/", (req,res) => {
        data.splice(0, data.length);
        res.status(200).send("ALL DATA DELETED");
    }),

    // DELETE => Delete specific data
    app.delete(API_BASE_BFA + "/:id", (req,res) => {
        const ID = parseInt(req.params.id);
       // const nuevosDatos = data.filter(entry => entry.listing_id !== ID);


        if(ID < data.length){
            //Delete data from specified filter
            data.splice(ID, 1)
            res.sendStatus(200, "OK");
        } else {
            //Try to acces not existing resource
            res.sendStatus(404, "NOT FOUND");
        }
    }),

    // POST => Try to use not allowed method
    app.post(API_BASE_BFA + "/:market", (req,res) =>{
        res.sendStatus(405, "METHOD NOT ALLOWED");
    });
};