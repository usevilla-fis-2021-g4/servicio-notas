const supertest = require('supertest');
const app = require('../src/index');
const api = supertest(app)

test('Las notas se devuelven como un json', async()=>{
    await api
        .get('/api/v1/notas/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
});

//Tiene que devolver error
test('Las notas se devuelven como un json', async()=>{
    await api
        .get('/api/v1/notas/')
        .expect(404)
        .expect('Content-Type', /application\/json/)
});





/*TEST GET NOTAS

describe("GET /notas", ()=>{

    beforeAll(()=> {
        const notas= [
           new Nota({"nota":"suspenso",
           "alumno":"martin",
           "asignatura":"Conocimiento del Medio"
           }) 
           ,
           new Nota({"nota":"aprobado",
           "alumno":"carmen",
           "asignatura":"Lengua"
           })
        ];

        dbFind = jest.spyOn(dbConnection, "find");
        dbFind.mockImplementation((query, callback)=>{
            callback(null,notas)
        });

        
        test("Should return all notas", async(done) => {
            return request(app).get("/api/v1/notas")
            .then(() => {

                // console.log("response.body");
                // console.log(response.body);

                expect(response.statusCode).toBe(200);
                expect(response.body).toBeArrayOfSize(2);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    }); 
});
*/
