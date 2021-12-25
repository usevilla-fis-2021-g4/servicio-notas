const {response} = require('express');
const Nota = require('../models/Nota');

//Metodo GET -- Obtiene notas
const getNotas = async (req, res=response) => {
    try {

        const notas =  await Nota.find(); 
        res.json({
            ok:true,
            notas
        })
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

        res.status(201).json({
            ok:true,
            calificacion: notaGuardada
        })

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
        let notaPorId =  await modeloNotas.findById(req.params.id); 
        console.log(notaPorId);
        res.json({
            ok:true,
            notaPorId
        });
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

    res.json({
        ok:true,
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

    res.status(201).json({
        ok:true,
        notaActualizada
    })


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}
module.exports = {getNotas,getNotaPorId,postNota,putNota,deleteNota};