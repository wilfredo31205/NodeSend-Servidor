const Enlaces = require('../Models/Enlace');
const shortidd = require('shortid')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.nuevoEnlace = async (req, res, next) => {

        console.log(req.body)


    
    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

     //   console.log(req.body);

    // Crear un objeto de Enlace
    const { nombre_original , nombre } = req.body;

    const enlace = new Enlaces(); // creando un enlace 

    enlace.url = shortidd.generate(); // colocandole al enlace  que esta en el modelo de enlace un id largo con shortid
    
    //   enlace.nombre = shortidd.generate();  // colocandole nombre al enlace  y coloque un nombre unico que no se puedas repetir 
     
    enlace.nombre = nombre; 
    
    enlace.nombre_original = nombre_original;
     // enlace.password = password;



    console.log(enlace);

    
    console.log(req.usuario);



        //Si el usuario esta autenticado 

        if(req.usuario){ /// si hay un usuario autenticado 
        
            const { password , descargas } = req.body; // extrayendo estos valores de la peticion 


        //     // Asignar a enlace numero de descargas 

           if(descargas){ // si pasaron el numero de descargas 

                enlace.descargas = descargas;


       }

            // Asignar un password 

            if(password){

                  const salt = await bcrypt.genSalt(10);


              enlace.password = await bcrypt.hash(password,salt);

             }
                // Asignar el autor 

                    
                enlace.autor = req.usuario.id; // con req.usuario sabes que usuario fue que subio el archivo 



            }

        
               
        
        


    //Almacenar en la base de datos 


    try {

        await enlace.save();
        
        return res.json({msg: `${enlace.url}`}); // de esta forma cuando estemos en la parte de react, estaremos mostrando la url
        // que lo va a poder compatir 
        next();
        

    } catch (error) {

        console.log(error);
        
    }   

}


// // Obtiene un listado de todso los enlaces
exports.todosEnlaces = async (req, res) => {
    try {
        const enlaces = await Enlaces.find({}).select('url -_id'); // .find({}) para traernos o obtener todos los enlaces
            // con .select le decimos que nos traiga solamente la url  y quitamos el id con -_id
     
        res.json({enlaces});
    } catch (error) {
        console.log(error);
    }
}

// // Retorna si el enlace tiene password o no
exports.tienePassword = async (req, res, next) => {

    // console.log(req.params.url);
    const { url } = req.params;

    console.log(url);

    // Verificar si existe el enlace
    const enlace = await Enlaces.findOne({ url });

    if(!enlace) {
        res.status(404).json({msg: 'Ese Enlace no existe'});
        return next();
    }

    if(enlace.password) { // si tiene password 
        return res.json({ password: true, enlace: enlace.url }); // decimos que si , que tiene password y le mandamos el enlace 
    }

    next();
}

// // Verifica si el password es Correcto
exports.verificarPassword = async (req, res, next) => {


     //console.log(req.body); // para ver lo que le estamos enviando desde el formulario

    // console.log(req.params); // leyendo la url 

    const { url } = req.params;
    const { password} = req.body;

    // Consultar por el enlace
    const enlace = await Enlaces.findOne({ url });

    // Verificar el password
    if(bcrypt.compareSync( password, enlace.password )) {
        // Permitirle al usuario descargar el archivo


        next(); // si todo sale bien , entonces que vaya al siguiente middleware que es obtener enlace... 
    } else {
        return res.status(401).json({msg: 'Password Incorrecto'})
    }

   
}









// // Obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {

     console.log(req.params.url);

            //req.body; con req.body  accedemos a lo que enviamos 

       const { url } = req.params; // utilizamos req.params porque es algo que le estamos enviando a traves de la url 

        console.log(url);


        
     // console.log(req.params); // el comodin que coloquemos en router.get('/:url', del router de enlaces 
      // es lo que nos va aparacer o acceder cn req.params 

    // // Verificar si existe el enlace
    const enlace = await Enlaces.findOne({ url}); // filtrando para buscar por la url 


// ;

    if(!enlace) {
        res.status(404).json({msg: 'Ese Enlace no existe'}); // 404 : significa que no encontro el archivo 
        return next();
    }

    
     console.log(enlace)

//     // // Si el enlace existe
   res.json({archivo:enlace.nombre}) // colocandole el nombre del archivo que esta en enlace.nombre


   next();




}