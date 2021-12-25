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

app.listen(process.env.PORT, ()=>{
    console.log('Servidor funcionando en el puerto:', process.env.PORT );
})
