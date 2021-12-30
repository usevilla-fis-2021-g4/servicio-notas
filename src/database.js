const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL= (process.env.MONGO_URL || 'mongodb://mongo/test');

/*0onst dbConnection = async()=>{

    try{
       
      await mongoose.connect(DB_URL,
        {
            useNewUrlParser: true
        });
       //await console.log(process.env.MONGO_URL) 
        //       await console.log('DB Online')
        
    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos')
    }
    //console.log(process.env.MONGO_URL) 
    //console.log('DB Online')

}
*/

const dbConnection = function(){
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    return mongoose.connect(DB_URL, { useNewUrlParser: true });
}

console.log(process.env.MONGO_URL) 
console.log('DB Online')

module.exports=dbConnection;