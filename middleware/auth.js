 const jwt = require('jsonwebtoken');
 require('dotenv').config({ path: 'variables.env'});



// middleware que verifica si un usuario esta autenticado  o si tiene token y lo  asigna a req.usuario 


module.exports = (req, res, next ) => {
 

/*

para obtener el usuario que esta registrdo en la app vamos a posmant en authorization seleccioanmos
el tipo de Bearer token y en el input colocamos el token que nos dan 


*/




        
    const authHeader = req.get('Authorization');

    if(authHeader){ // si el usuario esta autenticado 

        // obtener el token


        const token = authHeader.split(' ')[1] // toma todo el string de la palabra bearer y el token 
        // lo separa y crea un arreglo en la cual la palabra beader seria la posicion 0 y el token la 1 
        
        // el autheader contiene el tooken 


        // comprobar el jwt
        if(token) {

        try {
            
                   const usuario = jwt.verify(token,process.env.SECRETA ); // con verify verificamos el usuario en la cual le pasamos e
        // el token que firmamos y la llave secreeta o palabrasecreta 

                    console.log(usuario);

                // asignando el usuario si todo esta bien 

                req.usuario = usuario; // si hay un usuario se lo asignamos // asignandole el usuario a mi middleware


                console.log(usuario);

             //   res.json({usuario});



        } catch (error) {
            

            console.log(error);
             console.log('JWT no valido');
        }

 
    }

}


    return next();
}