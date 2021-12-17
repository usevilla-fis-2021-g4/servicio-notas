/*const mongoose = require("mongoose");

//const url = "mongodb://localhost/NotasDatabase"; // Para arrancar en localhost
const url = "mongodb://mongo/NotasDatabase"; //Para arrancar el docker o deploy en okteto
mongoose.connect(url ,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.once("open", ( ) => {
  console.log("Database connected:", url);
});

db.on("error", ( ) => {
  console.error("connection error");
});

module.exports =  mongoose;
*/
const mongoose = require("mongoose");
const DB_URL = process.env.MONGO_URL || "mongodb://mongodb:27017";
//const DB_URL = process.env.MONGO_URL || "mongodb://localhost:27017"; //local

const dbConnect = function () {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  return mongoose.connect(DB_URL, { useNewUrlParser: true });
};

module.exports = dbConnect;