const dbConnection = require("../src/database");
const Nota = require('../src/models/Nota');
const mongoose = require('mongoose');


describe("DB connection", () => {
    
    beforeAll(() => {
        return dbConnection();
    });
    beforeEach((done) => {
        Nota.deleteMany({}, (error) => {
            done();
        });
    });

    test("Writes a nota in the DB", (done) => {
        
        const nota = new Nota({
            "nota":"suspenso",
             "alumno":"illo",
            "asignatura":"Conocimiento del Medio"

        });

        nota.save((error, nota) => {
            expect(error).toBeNull();
            Nota.find({}, (error2, notas) => {
                expect(notas);
                done();
            })
        });

    });

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(done);
        });
    });

});