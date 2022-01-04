/*
Rutas de notas
host+/api/v1/notas
*/

//creacion de enrutadores
const {Router,response} = require('express');
const router = Router();
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const passport= require('passport');
require('../../passport');


//exportar el controller de notas para sus funciones
const {getNotas , postNota, getNotaPorId, deleteNota, putNota} = require('../controllers/notes.controller');

//Configuracion S3
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadFile, getFileStream, getTemporaryUrl } = require("../../s3");
const fs = require("fs");
const util = require("util");
const Nota = require('../models/Nota');
const { notEqual } = require('assert');
const unlinkFile = util.promisify(fs.unlink);


router.get("/apinotas/v1/healthz", (req, res=response) => {
    res.sendStatus(200);
});

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
 *        imagenIdentificacion:
 *          type: string
 *          description: imagenIdentificacion.
 *      required:
 *        - nota
 *        - asignatura
 *        - alumno
 *      example:
 *        nota: Sobresaliente
 *        asignatura: Matematicas
 *        alumno: Juan
 *    UrlArchivo:
 *      type: object
 *      properties:
 *        url:
 *          type: string   
 *          description: La url temporal firmada del archivo en S3.
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



    //RUTAS ESPECIALES S3

    //POST IMAGEN

    /**
 * @swagger
 * /apinotas/v1/notas/{id}/imagen:
 *    post:
 *      summary: Permite cargar la imagen de la identificación una nota al recibir un id válido.
 *      tags: [Nota]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id de la nota.
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                imagen:
 *                  type: string
 *                  format: binary
 *      responses:
 *        401: 
 *          $ref: '#/components/responses/UnauthorizedError'
 *        500: 
 *          description: No se encontró el archivo en la solicitud.
 *        404: 
 *          description: Nota no encontrada.
 *        200: 
 *          description: Nota actualizada con éxito.
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Nota'
 *      security:
 *        - ApiKeyAuth: []
 */


    router.post("/:id/imagen",
    [passport.authenticate("localapikey", {session: false}), upload.single('imagen')],
    async (request, response) => {
    console.log(Date() + "POST - /profesores/:id/imagen");

    var nota_id = request.params.id;
    console.log("nota_id");
    console.log(nota_id);
    console.log("request.file");
    console.log(request.file);

    if (!request.file) {
        return response.status(500).send({ msg: "file is not found" })
    }

    const myFile = request.file;

    const result = await uploadFile(myFile);

    console.log("result");
    console.log(result);

    await unlinkFile(myFile.path);

    Nota.findByIdAndUpdate(nota_id, {imagenIdentificacion: result.Key}, {new: true})
    .then((nota) => {
        if (!nota) 
        {
            return response.status(404).send();
        }
        response.send(error);
    })
    .catch((error) => {
        response.status(500).send(error);
    });

    //response.status(200).send(profesor_id);
});


//GET IMAGEN

/**
 * @swagger
 * /apinotas/v1/notas/{id}/imagen:
 *    get:
 *      summary: Retorna la url temporal firmada de la imagen de la identificación de una nota al recibir un id válido.
 *      tags: [Nota]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id de la nota.
 *      responses:
 *        401: 
 *          $ref: '#/components/responses/UnauthorizedError'
 *        500: 
 *          description: Error al intentar consultar la nota.
 *        404: 
 *          description: Nota no encontrada.
 *        200: 
 *          description: Json con la url de la imagen.
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/UrlArchivo'
 *      security:
 *        - ApiKeyAuth: []
 */

    router.get('/:id/imagen',
        [passport.authenticate("localapikey", {session: false}), upload.single('imagen')],
            async (request, response) => {
            console.log(Date() + "GET - /apinotas/v1/:id/imagen");

            const nota_id = request.params.id;
            console.log("nota_id");
            console.log(nota_id);

            //const readStream = getFileStream("2387ff84e4496876121bebc1d287d90f.jpg");
            //readStream.pipe(response);

            Nota.findById(nota_id).then((nota) => {

                if (!nota) {
                    return response.status(404).send();
                }
                // console.log("nota");
                // console.log(nota);

                const fileKey = nota.imagenIdentificacion;
                console.log("fileKey");
                console.log(fileKey);

                const promise = getTemporaryUrl(fileKey);

                promise.then(
                    (url) => {
                        console.log('The URL is', url);
                        response.send({url: url});
                    }, 
                    (error) => { 
                        console.log("Error" + error);
                        response.status(500).send(error);
                    }
                );

                // response.send(nota);
            })
            .catch((error) => {
                response.status(500).send(error);
            });
        });



module.exports = router;