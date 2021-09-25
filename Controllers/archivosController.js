 const multer = require('multer');
// //const upload = multer({dest: '../uploads/' }) // creando la carpeta donde se van a guardar los archivos
 const shortid = require('shortid');
 const fs = require('fs'); // con file-system podemos eliminar archivos 
 const Enlaces = require('../Models/Enlace');


 exports.subirArchivo = async (req, res, next ) => { 

    const configuracionMulter = {

        // limits : {fileSize : 1000000}, // teniendo un limite de 1 mega  
          limits : { fileSize : req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 }, /*
         si el usuario esta autenticado req.usuario : le colocamos que pueda subir
         archivos de  10 mb 1024 * 1024 * 10 y si no esta autenticado le colocamos 
         que pueda subir solamente 1 mega que son 1024 kb 
          */ 
     
     
     
         storage: fileStorage = multer.diskStorage({ //   storage es donde se van  a almacenar los archivos y 
             // disktorage es que se van a guardar en el servidor 
     
             destination: (req, file, cb) => { //  es el lugar donde se van a guardar los archivos 
     
                 cb(null, __dirname+'/../uploads') // null es que si no hay ningun error , y dirname es colocando 
                 //donde se van a guardar las imagenes o en que carpeta se guardaran 
             },
             filename: (req, file, cb) => {
     
                 //const extension = file.mimetype.split('/')[1];
                  const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                    // con substring cortamos la ultima parte de originalname que viene como el nombre del archivo que en este
                    // caso es image-hero.jpg y lo recorta a image-hero
                    // (file.originalname.lastIndexOf('.' cortando el ultimo punto con lastIndexof(].) originalname : es la propiedad a cortar el nombre


                 cb(null, `${shortid.generate()}${extension}` );
             }
                 // fileFilter:(req, file, cb) =>{ // fileFilter nos permite filtrar los archivos 
     
                 //     if(file.mimetype === "application/pdf"){ // este es el mimetype o codificacion de los pdf
     
                 //         return cb(null , true ); // true por si hay un error 
     
     
     
                 //     }
     
     
                 
     
         })
     }
     
       const uploadd = multer(configuracionMulter).single('archivos'); // pasandole la configuracion de multer a upload 
     
   

      //  console.log(req.body) // con re.body leemos datos de un formulario 

        console.log(req.file);

        uploadd(req, res , async(error) =>{ // subiendo el archivo  

            console.log(req.file); // con req.file leemos 

            if(!error){ // si no hay errorres significa que se subio todo bien 

                res.json({archivo:req.file.filename }) // y le decimos cual es el nombre de su archivo 


            }else{

                console.log(error); // si  hay un error lo mandamos por consola 
                return next();

            }



        });


 }




 exports.eliminarArchivo = async (req, res ) => {


        console.log('Desde eliminar archivos');


        console.log(req.archivo);

    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);

        // con unlinkSync  es que podemos eliminar los archivos de windows 

        console.log('Archivo Eliminado');
    } catch (error) {
        console.log(error);
    }
}

// Descarga un archivo
exports.descargar = async  (req, res, next) => {


    // Obtiene un enlace

    const { archivo  } = req.params;

    const enlace = await Enlaces.findOne({ nombre: archivo   })





   // console.log(req.params.archivo); // archivo es el comodin que esta en la peticion de  archivo 

    const archivoDescarga =__dirname + '/../uploads/' +archivo;

    res.download(archivoDescarga);





    // // Eliminar el archivo y la entrada de la BD
    // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
    const { descargas, nombre } = enlace;

    if(descargas === 1) {

        // Eliminar el archivo 
        req.archivo = nombre;

        // eliminar la entrada de la bd
        await Enlaces.findOneAndRemove(enlace.id);
        next()
    } else {
         // si las descargas son > a 1 - Restar 1
         enlace.descargas--;
         await enlace.save();
    }

}