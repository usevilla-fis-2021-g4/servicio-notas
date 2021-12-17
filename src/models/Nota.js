const {Schema , model } = require('mongoose');

const esquemaNotas = new Schema({
    nota : {
        type:String    
    },
    asignaturas:{
        type:String
    },
    alumnos:{
        type:String
    }
});

module.exports = model('Nota', esquemaNotas);