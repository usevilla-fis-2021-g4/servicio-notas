const notasControlObject = {};

//export el modelo de datos
const modeloNotas = require('../models/Nota');

//Metodo GET -- Obtiene notas
notasControlObject.getNotas = async (req, res) => {
    try {

        const notas =  await modeloNotas.find(); 
        res.json(notas)
    } catch (err) {
        console.log(err);
    }
}

//Metodo POST -- Inserta notas
notasControlObject.postNotas = async (req, res) =>{
    const {nota,asignatura,alumno} = req.body;

    let nuevaNota = new modeloNotas({
        nota : nota,
        asignatura:asignatura,
        alumno:alumno
    });
    console.log(nuevaNota);
    await nuevaNota.save();
    res.json({message : 'La Nota ha sido guardada'})
}

//Metodo GET - Obtiene una nota dado un identificador
notasControlObject.getNotaPorId = async (req, res) => {
    let notaPorId =  await modeloNotas.findById(req.params.id); 
    console.log(notaPorId);
    res.json(notaPorId)
}

//Metodo DELETE
notasControlObject.deleteNota = async (req, res) => {
    let notaPorId =  await modeloNotas.findByIdAndDelete(req.params.id); 
    res.json({message : 'La Nota ha sido eliminada'})
}

//Metodo PUT -- modifica Notas
notasControlObject.putNotas = async (req, res) => {
    let notaPorId = await modeloNotas.findByIdAndUpdate(req.params.id , req.body);
    res.json({message : 'La Nota ha sido modificada'})
}
module.exports = notasControlObject;