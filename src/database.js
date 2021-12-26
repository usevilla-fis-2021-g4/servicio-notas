const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL= (process.env.MONGO_URL || 'mongodb://mongo/test');

const dbConnection = async()=>{

    try{
       
       await mongoose.connect(DB_URL,
        {
            useNewUrlParser: true
        });
        console.log(process.env.MONGO_URL) //TODO Muestra por consola el MONGO_URL de la base de datos. Undefined en local y al desplegar en okteto se conecta correctamente, pero
        console.log('DB Online')           //no despliega (Consume toda la RAM y colapsa). No hallado todavia la solucion
        
    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos')
    }

}

module.exports={dbConnection}