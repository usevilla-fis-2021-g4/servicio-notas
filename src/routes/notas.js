//creacion de enrutadores
const {Router} = require('express');
const router = Router();

//exportar el controller de notas para sus funciones
const {getNotas , postNotas , getNotaPorId, deleteNota, putNotas} = require('../controllers/notes.controller');

//escuchar una ruta
router.route('/')
    .get(getNotas)
    .post(postNotas)

router.route('/:id')
    .put(putNotas)
    .get(getNotaPorId)
    .delete(deleteNota)

module.exports = router;