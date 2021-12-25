const express = require('express');
const { dbConnection } = require('./database');
require('dotenv').config();
const cors = require('cors');

//Creamos el servidor de express
const app=express();

//Base de Datos
dbConnection();

//CORS
app.use(cors());

//Lectura y Parseo del body
app.use(express.json());

//TODO CRUD: Notas
app.use('/api/v1/notas', require('./routes/notas'));


//Escuchar peticiones
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Servidor corriendo en el puerto', port );
})
