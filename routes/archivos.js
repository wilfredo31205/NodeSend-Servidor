const express = require('express');
const router = express.Router();
const archivosController = require('../Controllers/archivosController');
const auth = require('../middleware/auth');


// const multer = require('multer');
 //const uploadd = multer({dest: './uploads/'})


// si envio una peticion post de archivos, va a llegar a aqui  y se pasa al controlar de y busca la funcion subirArchivo

router.post('/',

     auth, // que este autenticada 
  //  uploadd.single('archivos'), // single quiere decir un atchivo en especifico , diciendole que va a subir el archivo
    archivosController.subirArchivo
);


router.get('/:archivo',

archivosController.descargar,
archivosController.eliminarArchivo


);


module.exports = router;