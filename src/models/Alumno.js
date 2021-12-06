const {Schema , model } = require('mongoose');

const esquemaEstudiante = new Schema({
    nombre : {
        type:String,
        require:true    
    },
    apellido : {
        type:String,
        require:true    
    },
    edad :{
        type:Number,
        require:true    
    },
    grado :{
        type:String,
        require:true    
    }
})

module.exports = model('Alumno', esquemaEstudiante);