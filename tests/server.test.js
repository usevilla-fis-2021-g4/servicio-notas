const {server} = require('../src/index');
const mongoose= require('mongoose');
const Nota= require('../src/models/Nota');


const {notasIniciales,api, GetAllNombresAlumnosFromNotas} = require('./helpers');


beforeEach(async()=>{
    await Nota.deleteMany({})

    const nota1= new Nota(notasIniciales[0]);
    await nota1.save();

    const nota2= new Nota(notasIniciales[1]);
    await nota2.save();
})

describe('GET /api/v1/notas',()=>{

    //Se espera un Json. Test Passed
    test('Las notas se devuelven en un formato json', async()=>{
        await api
            .get('/api/v1/notas/')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });
    
    //Tiene que devolver error. Test Failed
    test('Las notas se devuelven como un json. FALTA /v1 . Tiene que devolver 404', async()=>{
        await api
            .get('/api/notas/')
            .expect(404) //Con esto dara error, puesto que debería devolver un 200 ya que funciona correctamente.
            
    });
    //GET NOTAS. Se espera que las notas sean devueltas. Test Passed
    test('Devuelven las notas del servidor', async()=>{
        const response= await api.get('/api/v1/notas');
    
        expect(response.body).toHaveLength(notasIniciales.length)
    
    });
    
    //Se espera que la primera nota se refiere a un alumno cuyo nombre es Illo. Test Passed
    test('La primera nota se refiere al alumno Illo', async()=>{
        const response= await api.get('/api/v1/notas');
        expect(response.body[0].alumno).toBe("Illo");
    });
    
    //Se Espera que haya alguna nota con un alumno que se llame Juan.
    test('Alguno de los alumnos se llama Juan', async()=>{
        const {alumnos}= await GetAllNombresAlumnosFromNotas()
        expect(alumnos).toContain("Juan");
    });

});

describe('POST /api/v1/notas',()=>{
    //Test POST. Se espera que haya una nota mas respecto a las iniciales definidas y que en los alumnos ahora contenga el alumno posteado.
    
    test('POST de una nota válida', async()=>{
        const newNota = {
            "nota":"Matrícula de Honor",
            "alumno":"El bicho",
            "asignatura":"Furbo"
        };
        await api
            .post('/api/v1/notas')
            .send(newNota)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
           const {alumnos,response} = await GetAllNombresAlumnosFromNotas();
            
            expect(response.body).toHaveLength(notasIniciales.length +1)
            expect(alumnos).toContain(newNota.alumno);
    });
    
    //Una nota sin contenido no se puede añadir.
    test('No se puede añadir una nota sin una asignatura', async()=>{
        const newNota = {
            "nota":"Matrícula de Honor",
            "alumno":"El bicho"
        };
        await api
            .post('/api/v1/notas')
            .send(newNota)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
            const response = await api.get('/api/v1/notas');
            expect(response.body).toHaveLength(notasIniciales.length)
    })

});

describe('DELETE /api/v1/notas/id', ()=>{
    
    //Delete Notas. Se espera que una nota se borre correctamente.
    test('DELETE de una nota', async()=>{
        
        const {response: primeraResponse} = await GetAllNombresAlumnosFromNotas();
        const {body:notas} = primeraResponse;
        const notaToDelete = notas[0];
    
        await api
        .delete(`/api/v1/notas/${notaToDelete._id}`)
        .expect(204)
    
        const {response:segundaResponse} =  await GetAllNombresAlumnosFromNotas();
        expect(segundaResponse.body).toHaveLength(notasIniciales.length -1)
    
    });
    
    //Una nota que no puede ser borrada si se le pasa una id erronea
    test("Una nota que no puede ser borrada si se le pasa una id erronea, como 1234", async()=>{
        await api
            .delete('/api/v1/notas/1234')
            .expect(500)
    
            const {response:segundaResponse} =  await GetAllNombresAlumnosFromNotas();
            expect(segundaResponse.body).toHaveLength(notasIniciales.length)
    
    });

});

describe('PUT /api/v1/notas/id', ()=>{
    //PUT
    test('PUT de una nota. Se debe esperar que haya las mismas notas en la segunda que en la primera respuesta  ', async()=>{
    
        const {response: primeraResponse} = await GetAllNombresAlumnosFromNotas();
        const {body:notas} = primeraResponse;
        let notaToPut = notas[0];
        console.log(notaToPut);
    
        newNota={
            "_id": `${notaToPut.id}`,
            "nota": "Reprobado",
            "alumno": "JuanCarlos",
            "__v": 0
        }
    
        await api    
        .put(`/api/v1/notas/${notaToPut.id}`)
        .send(newNota)
        const {response:segundaResponse,alumnos} =  await GetAllNombresAlumnosFromNotas();
        expect(segundaResponse.body).toHaveLength(notasIniciales.length)
        
    });

});

afterAll(()=>{
    server.close();
    mongoose.connection.close();
})


