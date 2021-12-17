var {Schema , model } = require('mongoose');

var esquemaNotas = new Schema({
    nota : {
        type:String    
    },
    asignatura:{
<<<<<<< HEAD
        type: String, 
    },
    alumno:{
        type: String,
=======
        type:String
    },
    alumno:{
        type:String
>>>>>>> 75a12db56dd5742ca93647602006d8c64627fe00
    }
});

module.exports = model('Nota', esquemaNotas);