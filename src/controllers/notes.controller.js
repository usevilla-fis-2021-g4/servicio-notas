const {response} = require('express');
const Nota = require('../models/Nota');

//Metodo GET -- Obtiene notas
const getNotas = async (req, res=response) => {
    try {

        const notas =  await Nota.find(); 
        return res.status(200).json(notas);
        /*res.json({
            notas
        })*/
    } catch (err) {
        console.log(err);
    }
}

//Metodo POST -- Inserta notas
const postNota = async (req, res=response) =>{
    
    const nota= new Nota(req.body);
    console.log(nota);


    try{
       
        const notaGuardada= await nota.save();

        res.status(201).json(
            notaGuardada
        )

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

//Metodo GET - Obtiene una nota dado un identificador
    const getNotaPorId = async (req, res=response) => {
        let notaPorId =  await Nota.findById(req.params.id); 
        console.log(notaPorId);
        res.status(200).json(
            notaPorId
        );
}

//Metodo DELETE
const deleteNota = async (req, res=response) => {
   
    const notaId = req.params.id;
    try{
    const nota = await Nota.findById(notaId);

        if(!nota){
            return res.status(404).json({
                ok:false,
                msg:'La nota no existe por ese id'
            });
        }


    await Nota.findByIdAndDelete(notaId);

    res.status(204).json({
        ok:true,
        msg:"nota borrada satisfactoriamente."
    })


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

//Metodo PUT -- modifica Notas
const putNota = async (req, res=response) => {
    
    const notaId = req.params.id;
    try{
        const nota = await Nota.findById(notaId);

        if(!nota){
            return res.status(404).json({
                ok:false,
                msg:'La nota no existe por ese id'
            });
        }

    const nuevaNota = {
        ...req.body
    }

    const notaActualizada = await Nota.findByIdAndUpdate(notaId,nuevaNota);

    res.status(201).json(
        notaActualizada
    );


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}
module.exports = {getNotas,getNotaPorId,postNota,putNota,deleteNota};