const {Schema , model } = require('mongoose');

const esquemaProfesor = new Schema({
    nombre : {
        type:String,
        require:true    
    },
    apellido : {
        type:String,
        require:true    
    },
    descripcion : {
        type:String    
    },
    ciclo : {
        type:String,   
    },
    editable: {
        type:Boolean, 
        require:true  
    }
});

module.exports = model('Profesor', esquemaProfesor);