const {Schema , model } = require('mongoose');


const esquemaAsignatura = new Schema({
    nombre : {
        type:String,
        require:true    
    },
    descripcion : {
        type:String,   
    },
    ciclo : {
        type:String,
        require:true    
    },
    area : {
        type:String,
        require:true    
    },
    profesor: {
        type: Schema.Types.ObjectId,
        ref: 'Profesor'

    },
    id :{
        type:String
    }
    
});

module.exports = model('Asignatura', esquemaAsignatura);