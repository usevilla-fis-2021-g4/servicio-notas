const mongoose = require('mongoose');

const dbConnection = async()=>{

    try{
        dbUrl= process.env.BACKENDNOTAS_MONGO_URL || 'mongodb+srv://dbUser:ryo5XzXwDIsUCkrT@cluster0.ahojs.mongodb.net/DB_ServicioNotas';

       await mongoose.connect(dbUrl,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Online')
        
    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos')
    }

}

module.exports={
    dbConnection
}