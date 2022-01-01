
const {app} = require('../src/index');
const supertest = require('supertest');
const api = supertest(app);

const notasIniciales = [
    {
        "nota":"Suspenso",
        "alumno":"Illo",
        "asignatura":"Matematicas"
        
    },
    {   "nota":"Aprobado",
        "alumno":"Juan",
        "asignatura":"Lengua Española"
    }
]
//Estas notas iniciales siempre estaran en la base de datos a la hora de realizar un test, con el fin de que se pueda ejecutar independientemente de los
//datos que haya en la base de datos en el momento.


const GetAllNombresAlumnosFromNotas = async()=>{
    const response = await api.get('/api/v1/notas');
    return{
       alumnos:response.body.map(nota=> nota.alumno),
       response
    } 
}




module.exports = {api,notasIniciales,GetAllNombresAlumnosFromNotas}