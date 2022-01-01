/*
Rutas de notas
host+/api/v1/notas
*/

//creacion de enrutadores
const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const passport= require('passport');
require('../../passport');


//exportar el controller de notas para sus funciones
const {getNotas , postNota, getNotaPorId, deleteNota, putNota} = require('../controllers/notes.controller');

//escuchar una ruta
router.get('/',
    passport.authenticate('localapikey', {session:false}),
    getNotas);

router.post('/',
    [//middlewares
        passport.authenticate('localapikey', {session:false}),
        check('nota','La nota es obligatoria').not().isEmpty(),
        check('asignatura','La asignatura a la que se le asigna la nota es obligatoria').not().isEmpty(),
        check('alumno','El alumno al que se le asigna la nota es obligatorio').not().isEmpty(),
        validarCampos
    ],
    postNota);

router.get('/:id',
    passport.authenticate('localapikey', {session:false}),
    getNotaPorId);

router.put('/:id',
    [//middlewares
        passport.authenticate('localapikey', {session:false}),
        check('nota','La nota es obligatoria').not().isEmpty(),
        check('asignatura','La asignatura a la que se le asigna la nota es obligatoria').not().isEmpty(),
        check('alumno','El alumno al que se le asigna la nota es obligatorio').not().isEmpty(),
        validarCampos
    ],
    putNota);

router.delete('/:id',
    passport.authenticate('localapikey', {session:false}),
    deleteNota);



module.exports = router;