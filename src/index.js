const express = require('express');
const dbConnection  = require('./database');
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require('cors');
const passport = require('passport');
require('../passport');


//Configuracion del swagger
const path= require("path");
const swaggerUI= require('swagger-ui-express');
const swaggerJsDoc= require('swagger-jsdoc');
const swaggerSpec={
    definition:{
        openapi: "3.0.0",
        info:{
            title:"Servicio Notas API",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http://localhost:3000",
                description:"Servidor de desarrollo en localhost."
            },
            {
                url:"https://api-usevilla-fis-2021-g4-mgrmanu10.cloud.okteto.net/",
                description:"Servidor de despliegue en Okteto."
            }
        ]
    },
    apis:[`${path.join(__dirname,"./routes/notas.js")}`]
}

//Creamos el servidor de express
const app=express();

//Escuchar peticiones
const port=3000
const server=app.listen(port, ()=>{
    console.log('Servidor funcionando en el puerto:', port );
})

//Base de Datos
dbConnection();

//CORS
app.use(cors());

//Lectura y Parseo del body
app.use(express.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//Uso del passport

app.use(passport.initialize());


app.get("/apinotas/v1/healthz", (req, res=response) => {
    res.sendStatus(200);
});


//CRUD: Notas
app.use('/apinotas/v1/notas', require('./routes/notas'));

//swaggerDoc
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

//Bienvenida
app.get('/', (req,res)=>{
    res.send("<html><body><h1>Bienvenido a la API del grupo 4 de la asignatura de FIS. </h1></body></html>"+
    "<html><body><h2>Añade a la barra de herramientas: /api-doc para ver las funcionalidades de la API.</h2></body></html>")
})



module.exports={app,server};