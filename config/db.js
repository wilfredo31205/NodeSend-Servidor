

const mongoose = require('mongoose')

require('dotenv').config({path:'variables.env'}); // importando y especificando donde estan las variables de entorno 





const conectarDb = async () =>{


    try {

            await mongoose.connect(process.env.DB_URL ,{

                useNewUrlParser: true,
                useUnifiedTopology: true
        
                



            });

            console.log('Base de datos creada correctamente')

        
    } catch (error) {

        console.log('Hubo un error');

        console.log(error)

        process.exit(1) // con procces detenemos la aplicacion de node,.
        
    }





}

module.exports = conectarDb;

