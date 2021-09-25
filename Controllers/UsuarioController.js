 const Usuario = require('../Models/Usuario');
 const bcrypt = require('bcrypt');
 const { validationResult } = require('express-validator');

exports.nuevoUsuario = async (req, res) => { // en  req almacenamos lo que estamos enviando  y en res la respuesta que nos manda node 

                 //console.log(req.body); // con req.body leemos los datos que estamos enviando 

                     
            // Mostrar mensajes de error de express validator
            const errores = validationResult(req);
            if(!errores.isEmpty()) {
                return res.status(400).json({errores: errores.array()});
            }

   
            // Verificar si el usuario ya estuvo registrado
            const { email, password } = req.body;

            let usuario = await Usuario.findOne({ email }); // filtrando el primer email que encuentre en todos los registros


            if(usuario) {
                return res.status(400).json({ msg: 'El usuario ya esta registrado' });
            }

                  // Crear un nuevo usuario
          
               usuario =  new  Usuario(req.body); // insertando un nuevo usuario con lo que le mandemos  
           
            

                   // // Hashear el password
                const salt = await bcrypt.genSalt(10); // salt es la ronda de hasheado que le damos de 10 

                usuario.password = await bcrypt.hash(password, salt ); // le pasamoe el password que estamos extrayendo de req.body 
                
                        try {

            
                         await usuario.save();

                            res.json({msg: 'Usuario creado correctamente'})


                            
                        } catch (error) {

                            console.log(error);
                            
                        }
                
                

                };




    // // Mostrar mensajes de error de express validator
    // const errores = validationResult(req);
    // if(!errores.isEmpty()) {
    //     return res.status(400).json({errores: errores.array()});
    // }

    
    // // Verificar si el usuario ya estuvo registrado
    // const { email, password } = req.body;

    // let usuario = await Usuario.findOne({ email });

    // if(usuario) {
    //     return res.status(400).json({ msg: 'El usuario ya esta registrado' });
    // }

    // // Crear un nuevo usuario
    // usuario = new Usuario(req.body);
    
    // // Hashear el password
    // const salt = await bcrypt.genSalt(10);
    // usuario.password = await bcrypt.hash(password, salt );

    // try {
    //     await usuario.save();
    //     res.json({msg : 'Usuario Creado Correctamente'});
    // } catch (error) {
    //     console.log(error);
    // }

