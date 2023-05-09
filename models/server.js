const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConection } = require('../database/config');


class Server {

    constructor(){

        this.app  = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth:       '/api/auth',
            busquedas:  '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            ususarios:  '/api/usuarios',
            uploads:    '/api/uploads'
        }

        //Conectar a la DataBase

        this.conectarDB();

        //Middlewares
        this.middlewares();

        //RUTAS DE MI APLICACION

        this.routes();
    }


    async conectarDB(){

        await dbConection();

    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body

        this.app.use( express.json() );


        //DIRECTORIO PUBLICO
        this.app.use( express.static('public') );


        //fileUpload - carga de archivos
        this.app.use( fileUpload ({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){

        this.app.use( this.paths.auth       , require('../routers/auth'));
        this.app.use( this.paths.busquedas  , require('../routers/busquedas'));
        this.app.use( this.paths.categorias , require('../routers/categorias'));
        this.app.use( this.paths.productos  , require('../routers/productos'));
        this.app.use( this.paths.ususarios  , require('../routers/usuarios'));
        this.app.use( this.paths.uploads  , require('../routers/uploads'));
    }

    listen(){

        this.app.listen(this.port , ()=> {
            console.log('Escuchando en el puerto: ', this.port);
        })
    }


}

module.exports = Server