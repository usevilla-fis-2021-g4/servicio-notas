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

//ESQUEMA NOTA
/**
 * @swagger
* components:
 *  schemas:
 *    Nota:
 *      type: object
 *      properties:
 *        nota:
 *          type: string
 *          description: La nota del alumno.
 *        asignatura:
 *          type: string
 *          description: La asignatura del alumno.
 *        alumno:
 *          type: string
 *          description: El alumno.
 *      required:
 *        - nota
 *        - asignatura
 *        - alumno
 *      example:
 *        nota: Sobresaliente
 *        asignatura: Matematicas
 *        alumno: Juan
 *
 *  securitySchemes:
 *    ApiKeyAuth:       # arbitrary name for the security scheme
 *      type: apiKey
 *      in: header       # can be "header", "query" or "cookie"
 *      name: apikey    # name of the header, query parameter or cookie
 *  
 *  responses:
 *    UnauthorizedError:
 *      description: API key es invalida o está ausente.
 *         
 */



//Escuchar las rutas

//GET NOTAS
/**
 * @swagger
 * /apinotas/v1/notas:
 *    get:
 *      summary: Retorna todos las notas.
 *      tags: [Nota]
 *      responses:
 *        401: 
 *          $ref: '#/components/responses/UnauthorizedError'
 *        400: 
 *          description: Error al intentar consultar las notas.
 *        200: 
 *          description: Notas consultados con éxito.
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Nota'
 *      security:
 *        - ApiKeyAuth: []
 */
router.get('/',
    passport.authenticate('localapikey', {session:false}),
    getNotas);



//POST NOTA
/**
 * @swagger
 * /apinotas/v1/notas:
 *    post:
 *      summary: Crea una nueva Nota
 *      tags: [Nota]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Nota'
 *      responses:
 *        401: 
 *          $ref: '#/components/responses/UnauthorizedError'
 *        400: 
 *          description: Error al intentar crear el Nota.
 *        500: 
 *          description: Error al intentar crear el Nota (Problemas con el servidor).
 *        201: 
 *          description: Nota creada.
 *      security:
 *        - ApiKeyAuth: []
 */


router.post('/',
    [//middlewares
        passport.authenticate('localapikey', {session:false}),
        check('nota','La nota es obligatoria').not().isEmpty(),
        check('asignatura','La asignatura a la que se le asigna la nota es obligatoria').not().isEmpty(),
        check('alumno','El alumno al que se le asigna la nota es obligatorio').not().isEmpty(),
        validarCampos
    ],
    postNota);



//GET POR ID de NOTA
/**
 * @swagger
 * /api/v1/notas/{id}:
 *    get:
 *      summary: Retorna una nota al dar una ID de la nota.
 *      tags: [Nota]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id de la Nota correspondiente en la Base de Datos.
 *      responses:
 *        401: 
 *          $ref: '#/components/responses/UnauthorizedError'
 *        500: 
 *          description: Error al intentar consultar el Nota (problemas con el servidor).
 *        404: 
 *          description: Nota no encontrada.
 *        200: 
 *          description: Nota consultada con éxito.
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Nota'
 *      security:
 *        - ApiKeyAuth: []
 */


router.get('/:id',
    passport.authenticate('localapikey', {session:false}),
    getNotaPorId);



//PUT NOTA
/**
 * @swagger
 * /api/v1/notas/{id}:
 *    get:
 *      summary: Retorna una nota al dar una ID de la nota.
 *      tags: [Nota]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id de la Nota correspondiente en la Base de Datos.
 *      responses:
 *        401: 
 *          $ref: '#/components/responses/UnauthorizedError'
 *        500: 
 *          description: Error al intentar consultar la Nota (problemas con el servidor).
 *        404: 
 *          description: Nota no encontrada.
 *        200: 
 *          description: Nota consultada con éxito.
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Nota'
 *      security:
 *        - ApiKeyAuth: []
 */

//PUT NOTA
/**
 * @swagger
 * /api/v1/notas/{id}:
 *    put:
 *      summary: Actualiza una nota al dar una ID de la nota.
 *      tags: [Nota]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id de la Nota correspondiente en la Base de Datos.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Nota'
 *      responses:
 *        401: 
 *          $ref: '#/components/responses/UnauthorizedError'
 *        500: 
 *          description: Error al intentar actualizar la Nota (problemas con el servidor).
 *        404: 
 *          description: Nota no encontrada.
 *        201: 
 *          description: Nota actualizada con éxito.

 *      security:
 *        - ApiKeyAuth: []
 */


router.put('/:id',
    [//middlewares
        passport.authenticate('localapikey', {session:false}),
        check('nota','La nota es obligatoria').not().isEmpty(),
        check('asignatura','La asignatura a la que se le asigna la nota es obligatoria').not().isEmpty(),
        check('alumno','El alumno al que se le asigna la nota es obligatorio').not().isEmpty(),
        validarCampos
    ],
    putNota);


//DELETE NOTA
/**
 * @swagger
 * /api/v1/notas/{id}:
 *    delete:
 *      summary: Elimina una nota al dar una ID de la nota.
 *      tags: [Nota]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id de la Nota correspondiente en la Base de Datos.
 *      responses:
 *        401: 
 *          $ref: '#/components/responses/UnauthorizedError'
 *        500: 
 *          description: Error al intentar eliminar la Nota (problemas con el servidor).
 *        404: 
 *          description: Nota no encontrada.
 *        204: 
 *          description: Nota eliminada con éxito.

 *      security:
 *        - ApiKeyAuth: []
 */


router.delete('/:id',
    passport.authenticate('localapikey', {session:false}),
    deleteNota);



module.exports = router;