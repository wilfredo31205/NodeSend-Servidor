const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const { check } = require('express-validator');
// const auth = require('../routes/auth');
const auth = require('../middleware/auth')

router.post('/', 
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password no puede ir vacio').not().isEmpty()
    ],
    authController.autenticarUsuario
);


router.get('/',
    auth,
    authController.usuarioAutenticado
);


module.exports = router;