const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs'); //Paquete de node que me ayuda a encriptar contraseñas


const usuariosGet = async(req = request, res = response) =>{

    const { limite = 5 , desde} = req.query;
    const query = { estado : true};

    // const usuarios = await Usuario.find( query )
    //     .skip(Number (desde) ) 
    //     .limit(Number (limite) );

    // const total = await Usuario.countDocuments( query );

    const [ total, usuarios ] = await Promise.all([          //me retorna un arreglo de promesas, las cuales se ejecutan las 2 a la vez
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip(Number (desde) ) 
            .limit(Number (limite) )
    ])


    res.json({
        total,
        usuarios
    });
}


const usuariosPost = async(req, res = response) =>{


    const { nombre, correo, rol, password } = req.body;
    const usuario = new Usuario( {nombre, correo, rol, password} ); //Creacion de la instancia en la db

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar en DB




    await usuario.save() // Guarda los registros en la base de datos

    res.json({
        usuario
    });
}


const usuariosPut = async(req, res = response) =>{

    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;

    //TODO: validar contra base de datos
    if (password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );

    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );


    res.json( usuario );
}


const usuariosPatch = (req, res = response) =>{
    res.json({
        msg: 'API patch - Controlador'
    });
}


const usuariosDelete = async(req, res = response) =>{

    const { id } = req.params;

    //FISICAMENTE BORRADO - ELIMINA TOTALMENTE DE LA BASE DE DATOS (NO RECOMENDABLE)
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id , { estado: false });


    res.json(usuario);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}