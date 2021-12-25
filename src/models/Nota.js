var {Schema , model } = require('mongoose');

var esquemaNotas = new Schema({
    nota : {
        type:String,
        required:true    
    },
    asignatura:{
        type: String, 
        required:true
    },
    alumno:{
        type: String,
        required:true
    }
});

module.exports = model('Nota', esquemaNotas);