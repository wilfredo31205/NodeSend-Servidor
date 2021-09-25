const express = require('express');
const router = express.Router();
const usuarioController = require('../Controllers/UsuarioController'); 

 const { check } = require('express-validator'); // con check validamos 

router.post('/', 


    [ // arreglo de validaciones 

        check('nombre', 'El Nombre es Obligatorio').not().isEmpty(), // revisa que el nombre no este vacio 
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({min: 6}),
    ],

    
usuarioController.nuevoUsuario
 
);

module.exports = router;