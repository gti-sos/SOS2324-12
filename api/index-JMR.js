const API_BASE_JMR = "/api/v1/world-consumption-of-drinking-water-data";

var data = [];

module.exports = (app) => {
    
    // GET => Lista todos los datos
    
    app.get(API_BASE_JMR+"/",(req,res)=>{
        res.status(200).send(JSON.stringify(data));
    }),

    // GET => loadInitialData (al hacer un GET cree 10 o más datos en el array de NodeJS si está vacío)
    app.get(API_BASE_JMR+"/loadInitialData",(req,res) => {
        if(data.length === 0){
            let newdata = [
              {
                iso_code: "BGR",
                country: "Bulgaria",
                year: 1990,
                urban_improved_total: 100,
                urban_improved_piped: 96,
                urban_improved_other: 4,
                urban_unimproved_other: 0,
                rural_improved_total: 0,
                rural_improved_piped: 100,
                rural_improved_other: 66,
                rural_unimproved_other: 34,
                rural_unimproved_surface: 0,
                total_improved_total: 100,
                total_improved_piped: 86,
                total_improved_other: 14,
                total_unimproved_other: 0,
                total_unimproved_surface: 0
            },
            {
                iso_code: "BGR",
                country: "Bulgaria",
                year: 2015,
                urban_improved_total: 100,
                urban_improved_piped: 99,
                urban_improved_other: 1,
                urban_unimproved_other: 0,
                rural_improved_total: 0,
                rural_improved_piped: 99,
                rural_improved_other: 99,
                rural_unimproved_other: 0,
                rural_unimproved_surface: 0,
                total_improved_total: 99,
                total_improved_piped: 99,
                total_improved_other: 0,
                total_unimproved_other: 1,
                total_unimproved_surface: 0
            },
            {
                iso_code: "BFA",
                country: "Burkina Faso",
                year: 1990,
                urban_improved_total: 75,
                urban_improved_piped: 11,
                urban_improved_other: 64,
                urban_unimproved_other: 24,
                rural_improved_total: 1,
                rural_improved_piped: 39,
                rural_improved_other: 0,
                rural_unimproved_other: 39,
                rural_unimproved_surface: 51,
                total_improved_total: 10,
                total_improved_piped: 44,
                total_improved_other: 2,
                total_unimproved_other: 42,
                total_unimproved_surface: 48
            },
            {
                iso_code: "BFA",
                country: "Burkina Faso",
                year: 2015,
                urban_improved_total: 97,
                urban_improved_piped: 27,
                urban_improved_other: 70,
                urban_unimproved_other: 3,
                rural_improved_total: 0,
                rural_improved_piped: 76,
                rural_improved_other: 0,
                rural_unimproved_other: 76,
                rural_unimproved_surface: 19,
                total_improved_total: 5,
                total_improved_piped: 82,
                total_improved_other: 8,
                total_unimproved_other: 74,
                total_unimproved_surface: 15
            },
            {
                iso_code: "BDI",
                country: "Burundi",
                year: 1990,
                urban_improved_total: 96,
                urban_improved_piped: 32,
                urban_improved_other: 64,
                urban_unimproved_other: 2,
                rural_improved_total: 2,
                rural_improved_piped: 67,
                rural_improved_other: 1,
                rural_unimproved_other: 66,
                rural_unimproved_surface: 23,
                total_improved_total: 10,
                total_improved_piped: 69,
                total_improved_other: 3,
                total_unimproved_other: 66,
                total_unimproved_surface: 21
            },
            {
                iso_code: "BDI",
                country: "Burundi",
                year: 2015,
                urban_improved_total: 91,
                urban_improved_piped: 49,
                urban_improved_other: 42,
                urban_unimproved_other: 4,
                rural_improved_total: 5,
                rural_improved_piped: 74,
                rural_improved_other: 1,
                rural_unimproved_other: 73,
                rural_unimproved_surface: 13,
                total_improved_total: 13,
                total_improved_piped: 76,
                total_improved_other: 7,
                total_unimproved_other: 69,
                total_unimproved_surface: 12
            },
            {
                iso_code: "KHM",
                country: "Cambodia",
                year: 1990,
                urban_improved_total: 34,
                urban_improved_piped: 15,
                urban_improved_other: 19,
                urban_unimproved_other: 40,
                rural_improved_total: 26,
                rural_improved_piped: 22,
                rural_improved_other: 0,
                rural_unimproved_other: 22,
                rural_unimproved_surface: 42,
                total_improved_total: 36,
                total_improved_piped: 23,
                total_improved_other: 2,
                total_unimproved_other: 21,
                total_unimproved_surface: 42
            },
            {
                iso_code: "KHM",
                country: "Cambodia",
                year: 2015,
                urban_improved_total: 100,
                urban_improved_piped: 75,
                urban_improved_other: 25,
                urban_unimproved_other: 0,
                rural_improved_total: 0,
                rural_improved_piped: 69,
                rural_improved_other: 7,
                rural_unimproved_other: 62,
                rural_unimproved_surface: 16,
                total_improved_total: 15,
                total_improved_piped: 76,
                total_improved_other: 21,
                total_unimproved_other: 55,
                total_unimproved_surface: 12
            },
            {
                iso_code: "CMR",
                country: "Cameroon",
                year: 1990,
                urban_improved_total: 78,
                urban_improved_piped: 25,
                urban_improved_other: 53,
                urban_unimproved_other: 20,
                rural_improved_total: 2,
                rural_improved_piped: 34,
                rural_improved_other: 2,
                rural_unimproved_other: 32,
                rural_unimproved_surface: 44,
                total_improved_total: 22,
                total_improved_piped: 51,
                total_improved_other: 11,
                total_unimproved_other: 40,
                total_unimproved_surface: 35
            },
            {
                iso_code: "CMR",
                country: "Cameroon",
                year: 2015,
                urban_improved_total: 95,
                urban_improved_piped: 28,
                urban_improved_other: 67,
                urban_unimproved_other: 4,
                rural_improved_total: 1,
                rural_improved_piped: 53,
                rural_improved_other: 4,
                rural_unimproved_other: 49,
                rural_unimproved_surface: 31,
                total_improved_total: 16,
                total_improved_piped: 76,
                total_improved_other: 17,
                total_unimproved_other: 59,
                total_unimproved_surface: 16
            },
            {
                iso_code: "CAN",
                country: "Canada",
                year: 1990,
                urban_improved_total: 100,
                urban_improved_piped: 100,
                urban_improved_other: 0,
                urban_unimproved_other: 0,
                rural_improved_total: 0,
                rural_improved_piped: 99,
                rural_improved_other: null,
                rural_unimproved_other: null,
                rural_unimproved_surface: 1,
                total_improved_total: 100,
                total_improved_piped: null,
                total_improved_other: null,
                total_unimproved_other: 0,
                total_unimproved_surface: 0
            },
            {
                iso_code: "CAN",
                country: "Canada",
                year: 2015,
                urban_improved_total: 100,
                urban_improved_piped: 100,
                urban_improved_other: 0,
                urban_unimproved_other: 0,
                rural_improved_total: 0,
                rural_improved_piped: 99,
                rural_improved_other: null,
                rural_unimproved_other: null,
                rural_unimproved_surface: 1,
                total_improved_total: 100,
                total_improved_piped: null,
                total_improved_other: null,
                total_unimproved_other: 0,
                total_unimproved_surface: 0
            },
            {
                iso_code: "CPV",
                country: "Cape Verde",
                year: 1990,
                urban_improved_total: null,
                urban_improved_piped: null,
                urban_improved_other: null,
                urban_unimproved_other: null,
                rural_improved_total: null,
                rural_improved_piped: 0,
                rural_improved_other: null,
                rural_unimproved_other: null,
                rural_unimproved_surface: null,
                total_improved_total: null,
                total_improved_piped: null,
                total_improved_other: null,
                total_unimproved_other: null,
                total_unimproved_surface: null
            },
            {
                iso_code: "CPV",
                country: "Cape Verde",
                year: 2015,
                urban_improved_total: 94,
                urban_improved_piped: 63,
                urban_improved_other: 31,
                urban_unimproved_other: 6,
                rural_improved_total: 0,
                rural_improved_piped: 87,
                rural_improved_other: 53,
                rural_unimproved_other: 34,
                rural_unimproved_surface: 13,
                total_improved_total: 0,
                total_improved_piped: 92,
                total_improved_other: 59,
                total_unimproved_other: 33,
                total_unimproved_surface: 8
            },
            {
                iso_code: "CYM",
                country: "Cayman Islands",
                year: 1990,
                urban_improved_total: null,
                urban_improved_piped: null,
                urban_improved_other: null,
                urban_unimproved_other: null,
                rural_improved_total: null,
                rural_improved_piped: null,
                rural_improved_other: null,
                rural_unimproved_other: null,
                rural_unimproved_surface: null,
                total_improved_total: null,
                total_improved_piped: null,
                total_improved_other: null,
                total_unimproved_other: null,
                total_unimproved_surface: null
            },
            {
                iso_code: "CYM",
                country: "Cayman Islands",
                year: 2015,
                urban_improved_total: 97,
                urban_improved_piped: 91,
                urban_improved_other: 6,
                urban_unimproved_other: 3,
                rural_improved_total: null,
                rural_improved_piped: null,
                rural_improved_other: null,
                rural_unimproved_other: null,
                rural_unimproved_surface: null,
                total_improved_total: null,
                total_improved_piped: 97,
                total_improved_other: 91,
                total_unimproved_other: 6,
                total_unimproved_surface: 3
            },
            {
                iso_code: "CAF",
                country: "Central African Republic",
                year: 1990,
                urban_improved_total: 80,
                urban_improved_piped: 8,
                urban_improved_other: 72,
                urban_unimproved_other: 18,
                rural_improved_total: 2,
                rural_improved_piped: 46,
                rural_improved_other: 0,
                rural_unimproved_other: 46,
                rural_unimproved_surface: 35,
                total_improved_total: 19,
                total_improved_piped: 59,
                total_improved_other: 3,
                total_unimproved_other: 56,
                total_unimproved_surface: 28
            },
            {
                iso_code: "CAF",
                country: "Central African Republic",
                year: 2015,
                urban_improved_total: 90,
                urban_improved_piped: 4,
                urban_improved_other: 86,
                urban_unimproved_other: 10,
                rural_improved_total: 0,
                rural_improved_piped: 54,
                rural_improved_other: 0,
                rural_unimproved_other: 54,
                rural_unimproved_surface: 41,
                total_improved_total: 5,
                total_improved_piped: 68,
                total_improved_other: 2,
                total_unimproved_other: 66,
                total_unimproved_surface: 29
            },
            {
                iso_code: "TCD",
                country: "Chad",
                year: 1990,
                urban_improved_total: 49,
                urban_improved_piped: 7,
                urban_improved_other: 42,
                urban_unimproved_other: 48,
                rural_improved_total: 3,
                rural_improved_piped: 37,
                rural_improved_other: 0,
                rural_unimproved_other: 37,
                rural_unimproved_surface: 47,
                total_improved_total: 16,
                total_improved_piped: 40,
                total_improved_other: 2,
                total_unimproved_other: 38,
                total_unimproved_surface: 46
            },
            {
                iso_code: "TCD",
                country: "Chad",
                year: 2015,
                urban_improved_total: 72,
                urban_improved_piped: 25,
                urban_improved_other: 47,
                urban_unimproved_other: 28,
                rural_improved_total: 0,
                rural_improved_piped: 45,
                rural_improved_other: 1,
                rural_unimproved_other: 44,
                rural_unimproved_surface: 52,
                total_improved_total: 3,
                total_improved_piped: 51,
                total_improved_other: 6,
                total_unimproved_other: 45,
                total_unimproved_surface: 46
            },
            {
                iso_code: "CHL",
                country: "Chile",
                year: 1990,
                urban_improved_total: 99,
                urban_improved_piped: 98,
                urban_improved_other: 1,
                urban_unimproved_other: 1,
                rural_improved_total: 0,
                rural_improved_piped: 48,
                rural_improved_other: 38,
                rural_unimproved_other: 10,
                rural_unimproved_surface: 25,
                total_improved_total: 27,
                total_improved_piped: 90,
                total_improved_other: 88,
                total_unimproved_other: 2,
                total_unimproved_surface: 5
            },
            {
                iso_code: "CHL",
                country: "Chile",
                year: 2015,
                urban_improved_total: 100,
                urban_improved_piped: 100,
                urban_improved_other: 0,
                urban_unimproved_other: 0,
                rural_improved_total: 0,
                rural_improved_piped: 93,
                rural_improved_other: 93,
                rural_unimproved_other: 0,
                rural_unimproved_surface: 7,
                total_improved_total: 0,
                total_improved_piped: 99,
                total_improved_other: 99,
                total_unimproved_other: 0,
                total_unimproved_surface: 1
            },
            {
                iso_code: "CHN",
                country: "China",
                year: 1990,
                urban_improved_total: 97,
                urban_improved_piped: 78,
                urban_improved_other: 19,
                urban_unimproved_other: 2,
                rural_improved_total: 1,
                rural_improved_piped: 56,
                rural_improved_other: 11,
                rural_unimproved_other: 45,
                rural_unimproved_surface: 35,
                total_improved_total: 9,
                total_improved_piped: 67,
                total_improved_other: 28,
                total_unimproved_other: 39,
                total_unimproved_surface: 26
            },
            {
                iso_code: "CHN",
                country: "China",
                year: 2015,
                urban_improved_total: 98,
                urban_improved_piped: 87,
                urban_improved_other: 11,
                urban_unimproved_other: 2,
                rural_improved_total: 0,
                rural_improved_piped: 93,
                rural_improved_other: 55,
                rural_unimproved_other: 38,
                rural_unimproved_surface: 5,
                total_improved_total: 2,
                total_improved_piped: 95,
                total_improved_other: 73,
                total_unimproved_other: 22,
                total_unimproved_surface: 4
            },
            {
                iso_code: "COL",
                country: "Colombia",
                year: 1990,
                urban_improved_total: 97,
                urban_improved_piped: 95,
                urban_improved_other: 2,
                urban_unimproved_other: 3,
                rural_improved_total: 0,
                rural_improved_piped: 69,
                rural_improved_other: 38,
                rural_unimproved_other: 31,
                rural_unimproved_surface: 14,
                total_improved_total: 17,
                total_improved_piped: 88,
                total_improved_other: 77,
                total_unimproved_other: 11,
                total_unimproved_surface: 6
            },
            {
                iso_code: "COL",
                country: "Colombia",
                year: 2015,
                urban_improved_total: 97,
                urban_improved_piped: 94,
                urban_improved_other: 3,
                urban_unimproved_other: 3,
                rural_improved_total: 0,
                rural_improved_piped: 74,
                rural_improved_other: 68,
                rural_unimproved_other: 6,
                rural_unimproved_surface: 7,
                total_improved_total: 19,
                total_improved_piped: 91,
                total_improved_other: 88,
                total_unimproved_other: 3,
                total_unimproved_surface: 4
            }
        ];
              
            for(let i=0; i<newdata.length; i++){
                data.push(newdata[i]);
            }
            res.sendStatus(201, "Data created");  
        } else {
            res.status(200).send(JSON.stringify(data));
        }
    }),

    // GET => Get data by ISO_CODE

    app.get(API_BASE_JMR + "/:iso_code",(req,res)=>{
      const ISO = req.params.iso_code;
        const countryDatos = data.filter(p => p.iso_code === ISO);

        if(countryDatos.length > 0){
            res.status(200).send(JSON.stringify(countryDatos));
        } else {
            res.sendStatus(404, "NOT FOUND");
        }
    }),

    // GET => Get data by YEAR

    app.get(API_BASE_JMR + "/:year",(req,res)=>{
      const AÑO = parseInt(req.params.year);
        const countryDatos = data.filter(p => p.year === AÑO);

        if(countryDatos.length > 0){
            res.status(200).send(JSON.stringify(countryDatos));
        } else {
            res.sendStatus(404, "NOT FOUND");
        }
    }),

    // POST => Crea un nuevo análisis de datos

    app.post(API_BASE_JMR + "/", (req,res) => {
        let newdata = req.body;
        const equal = data.some(old => old.country === newdata.country && old.year === newdata.year);
        if(equal){
            // POST not allowed due to resource already existing
            res.sendStatus(409, "CONFLICT");
        } else if (!newdata || Object.keys(newdata).length === 0){
            // If not valid JSON received
            res.sendStatus(400, "BAD REQUEST");
        } else {
            // Valid POST
            data.push(newdata);
            res.sendStatus(201, "CREATED");
        }
    }),

    // PUT => Can't update root directory
    app.put(API_BASE_JMR + "/", (req,res)=> {
        let newdata = req.body;
        res.sendStatus(405,"METHOD NOW ALLOWED");
    }),

    //PUT => Update resource by ISO_CODE && YEAR
    app.put(API_BASE_JMR + "/:iso_code" + "/:year",(req,res) =>{
        const ISO = req.params.iso_code;
        const AÑO = parseInt(req.params.year);
        let newdata = req.body;

        // Encuentra el índice del elemento con el ID dado en la lista de datos
        const index = data.findIndex(p => p.iso_code === ISO && p.year === AÑO);

        if(index === -1){
            // El elemento con el ID dado no existe, devolver un error 404 NOT FOUND
            res.sendStatus(404, "NOT FOUND");
        } else if (!newdata || Object.keys(newdata).length === 0 || (newdata.iso_code !== ISO && newdata.year !== AÑO)){
            // Los datos proporcionados son inválidos o el ISO y año no coincide, devolver un error 400 BAD REQUEST
            res.sendStatus(400, "BAD REQUEST");
        } else {
            // Reemplazar el dato existente con los nuevos datos
            data[index] = newdata;
            res.sendStatus(200, "OK");
        }
    }),

    // DELETE => Delete all data

    app.delete(API_BASE_JMR + "/", (req,res) => {
        data.splice(0, data.length);
        res.status(200).send("ALL DATA DELETED");
    }),

    // DELETE => Delete specific data
    app.delete(API_BASE_JMR + "/:iso_code" + "/:year", (req,res) => {
      const ISO = req.params.iso_code;
      const AÑO = parseInt(req.params.year);
        const nuevosDatos = data.filter(entry => entry.iso_code !== ISO && entry.year !== AÑO);

        if(nuevosDatos.length < data.length){
            //Delete data from specified filter
            data = nuevosDatos;
            res.sendStatus(200, "OK");
        } else {
            //Try to acces not existing resource
            res.sendStatus(404, "NOT FOUND");
        }
    }),

    // POST => Try to use not allowed method
    app.post(API_BASE_JMR + "/:iso_code", (req,res) =>{
        const PAIS = req.params.iso_code;
        let newdata = req.body;
        res.sendStatus(405, "METHOD NOT ALLOWED");
    });
};