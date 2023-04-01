const express = require('express');
const cors = require('cors');


class Server {

    constructor(){

        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //RUTAS DE MI APLICACION

        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body

        this.app.use( express.json() );


        //DIRECTORIO PUBLICO
        this.app.use( express.static('public') );

    }

    routes(){

        this.app.use( this.usuariosPath , require('../routers/usuarios'));
    }

    listen(){

        this.app.listen(this.port , ()=> {
            console.log('Escuchando en el puerto: ', this.port);
        })
    }


}

module.exports = Server