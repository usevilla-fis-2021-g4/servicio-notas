const express = require('express');
const dbConnection  = require('./database');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
require('../passport');

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
app.use(express.json());

//Uso del passport

app.use(passport.initialize());

//TODO CRUD: Notas
app.use('/apinotas/v1/notas', require('./routes/notas'));



module.exports={app,server};