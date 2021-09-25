const Usuario = require('../Models/Usuario');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
  require('dotenv').config({ path: 'variables.env'});

 const { validationResult } = require('express-validator');

exports.autenticarUsuario = async (req, res, next) => {


   

   // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    // // Buscar el usuario para ver si esta registrado
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({  email }); // el primer que tenfa ese email , me lo va a retornar
     console.log(usuario);

    if(!usuario) {
        res.status(401).json({msg : 'El Usuario No Existe'}); // error 404 : significa que las credenciales no son correctas

        return next();
    } 

    // // Verificar el password y autenticar el usuario

    if(bcrypt.compareSync(password, usuario.password )) { // utilizamos comparesync porque estamos utilizando async await
      
        // comparesync toma 2 parametros, 1 es el password que vamos a comparar y el otro es el password existenteen la base de datos
        // que tenemos una instancia del usuario, que es esta : 

        /*
            const usuario = await Usuario.findOne({  email }); 
        
        */
      
      
        // Crear JWT
        const token = jwt.sign({ // firmando el json web token y almacenando en el json web token el nombre, email y el id 

            // CUERPO DEL JSON WEB TOKEN 

            id: usuario._id, // id de mongo 
            nombre: usuario.nombre,
            email: usuario.email
        }, process.env.SECRETA, { // llave privada o llave secreta que esta en variables de entorno 

            expiresIn: '8h' //  EXPIRACION DEL JWT
        }  );


        console.log(token);

        res.json({ token })

    } else {
        res.status(401).json({msg: "Password Incorrecto"}); // 404 : error de aunteticacion 
        return next();
    }

    
}

exports.usuarioAutenticado = (req, res, next) => {


             console.log(req.usuario);// de forma interna se esta comunicando con el middleware con el controlador 


            res.json({usuario: req.usuario});
    
    }