const {Schema , model } = require('mongoose');

const esquemaNotas = new Schema({
    nota : {
        type:String,
        require:true    
    },
    asignaturas:[{
        type:Schema.Types.ObjectId,
        ref: 'Asignatura'
    }],
    alumnos:[{
        type:Schema.Types.ObjectId,
        ref: 'Alumno'
    }]
});

module.exports = model('Nota', esquemaNotas);