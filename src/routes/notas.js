/*
Rutas de notas
host+/api/v1/notas
*/

//creacion de enrutadores
const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

//exportar el controller de notas para sus funciones
const {getNotas , postNota, getNotaPorId, deleteNota, putNota} = require('../controllers/notes.controller');

//escuchar una ruta
router.get('/',
    getNotas);

router.post('/',
    [//middlewares
        check('nota','La nota es obligatoria').not().isEmpty(),
        check('asignatura','La asignatura a la que se le asigna la nota es obligatoria').not().isEmpty(),
        check('alumno','El alumno al que se le asigna la nota es obligatorio').not().isEmpty(),
        validarCampos
    ],
    postNota);

router.get('/:id',
    getNotaPorId);

router.put('/:id',
    [//middlewares
        check('nota','La nota es obligatoria').not().isEmpty(),
        check('asignatura','La asignatura a la que se le asigna la nota es obligatoria').not().isEmpty(),
        check('alumno','El alumno al que se le asigna la nota es obligatorio').not().isEmpty(),
        validarCampos
    ],
    putNota);

router.delete('/:id',
    deleteNota);



module.exports = router;