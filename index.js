

const express = require('express');


const cors = require('cors');
 

// creando el servidor
 


const app = express();



const conectarDb = require('./config/db'); // importando la base de datos 



// conectar a la bd

conectarDb();



// habilitando cors 

//console.log( process.env.FRONTEND_URL)

const opcionesCors ={
   origin:'https://nodesend-cliente-qy7pzavb3-wilfredo31205.vercel.app', 
   // origin : process.env.FRONTEND_URL, // ACEPTANDO PETICIONES SOLAMENTE DE LOCALHOST 3000 QUE ES DEL FRONTEND 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(opcionesCors));



// puerto de la app


const port = process.env.PORT || 4000; // SI NO HAY NINGUN PUERTO QUE ASIGNAR LE ASIGNAMOS EL 4000
// DE ESTA FORMA HEROKU LE ASIGNA UN PUERTO QUE ESTE DISPONIBLE O SINO LE VA ASIGNAR EL 4000



// Habilitando los valores de body parser, para ver los datos que vienen de postman a la consola

app.use(express.json());


// HABILITAR CARPETA PUBLICA 

app.use(express.static('uploads')); // aqui van a estar todos los archivos estaticos para cuando 
// un usuario en el frontend descargue un archivo 



// rutas de la app

// Rutas de la app
 app.use('/api/usuarios', require('./routes/usuarios'));
 app.use('/api/auth', require('./routes/auth'));
 app.use('/api/enlaces', require('./routes/enlaces'));
 app.use('/api/archivos', require('./routes/archivos'));



// ARRANCAR LA APP

app.listen(port , '0.0.0.0', () =>{

    console.log(`El servidor esta funcionando en el puerto ${port}`);

})