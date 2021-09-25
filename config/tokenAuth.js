import clienteAxios from '../../nodesend-cliente/nodesend-cliente/config/axios';

const tokenAuth = token => {


    if(token) { // Si hay un token o si se le esta pasando un token a esta funcion




        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // colocando el tipo de autorizacion que utilzamos en postman 
        // para validar el token  , en caso de que haiga un token , lo vamos a enviar como Bearer como autorizacion en los
        // headers


    } else {

        // si no hay token  , lo eliminamos 

        delete clienteAxios.defaults.headers.common['Authorization'];
    }
}

export default tokenAuth;