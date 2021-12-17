var {Schema , model } = require('mongoose');

var esquemaNotas = new Schema({
    nota : {
        type:String    
    },
    asignatura:{
        type: String, 
    },
    alumno:{
        type: String,
    }
});

module.exports = model('Nota', esquemaNotas);