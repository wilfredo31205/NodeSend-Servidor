const express = require('express');
const router = express.Router();
const enlacesController = require('../Controllers/enlacesController');
 const archivosController = require('../Controllers/archivosController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check('nombre', 'Sube un archivo').not().isEmpty(),
        check('nombre_original', 'Sube un archivo').not().isEmpty()
    ],      
    auth, // usuario que este autenticado para crear enlaces 
    enlacesController.nuevoEnlace
);

router.get('/',
    enlacesController.todosEnlaces
);



router.get('/',

    enlacesController.todosEnlaces


);


router.get('/:url', // AÑADIENDO UN COMODIN PARA REACCIONAR AL ID 

    enlacesController.tienePassword,
    enlacesController.obtenerEnlace,
  //  archivosController.eliminarArchivo
);

router.post('/:url', 
    enlacesController.verificarPassword,
    enlacesController.obtenerEnlace
);

module.exports = router;