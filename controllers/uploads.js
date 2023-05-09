const { response } = require("express");
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");





const cargarArchivos = async (req, res = response) => {

    try {

        const nombre = await subirArchivo(req.files, undefined, 'texto');

        res.json({ nombre });

    } catch (error) {
        res.status(400).json({ error });
    }
}



const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: `no existe un usuario con el id ${id}`
                })
            }

        break;

        case 'productos':

            modelo = await Producto.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: `no existe un producto con el id ${id}`
                })
            }

        break;

        default:
            return res.status(500).json( {
                msg: 'Se me olvido validar esta opcion :v'
            } )
    }

    //LIMPIAR IMAGENES PREVIAS

    if( modelo.img ){

        //borrar la imagen del servidor
        const pathImagen = path.join( __dirname , '../uploads' , coleccion , modelo.img );
        //busco un archivo que tenga el nombre de la direccion pathImagen y luego lo borro 
        if ( fs.existsSync( pathImagen ) ){
            fs.unlinkSync( pathImagen );
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.json( modelo )

}


const actualizarImagenClaudinary = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: `no existe un usuario con el id ${id}`
                })
            }

        break;

        case 'productos':

            modelo = await Producto.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: `no existe un producto con el id ${id}`
                })
            }

        break;

        default:
            return res.status(500).json( {
                msg: 'Se me olvido validar esta opcion :v'
            } )
    }

    //LIMPIAR IMAGENES PREVIAS

    if( modelo.img ){

        const nombreArr = modelo.img.split( '/' );
        const nombreCortado = nombreArr[ nombreArr.length - 1 ];
        const [ public_id  ]  = nombreCortado.split('.');

        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    modelo.img = secure_url;
    await modelo.save();

    res.json( modelo  )

}




const mostrarImagen = async( req , res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: `no existe un usuario con el id ${id}`
                })
            }

        break;

        case 'productos':

            modelo = await Producto.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: `no existe un producto con el id ${id}`
                })
            }

        break;

        default:
            return res.status(500).json( {
                msg: 'Se me olvido validar esta opcion :v'
            } )
    }

    //LIMPIAR IMAGENES PREVIAS

    if( modelo.img ){

        //borrar la imagen del servidor
        const pathImagen = path.join( __dirname , '../uploads' , coleccion , modelo.img );
        //busco un archivo que tenga el nombre de la direccion pathImagen y luego lo borro 
        if ( fs.existsSync( pathImagen ) ){
            return res.sendFile( pathImagen );
        }
    }

    //CARGANDO IMAGEN PREDETERMINADA EN CASO DE QUE NO EXISTA UNA ANTERIOR
    const pathImagenPredeterminada = path.join( __dirname , '../assets' , 'no-image.jpg' );
    if ( fs.existsSync( pathImagenPredeterminada ) ){
        return res.sendFile( pathImagenPredeterminada );
    }
}


module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenClaudinary
}