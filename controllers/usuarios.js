const { response, request } = require('express');


const usuariosGet = (req = request, res = response) =>{

    const { q, nombre = 'no name', apikey, page = '1', limit } = req.query;

    res.json({
        msg: 'API get - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}


const usuariosPost = (req, res = response) =>{

    const {nombre,edad} = req.body;

    res.json({
        msg: 'API post - Controlador',
        nombre,
        edad
    });
}


const usuariosPut = (req, res = response) =>{

    const { id } = req.params;

    res.json({
        msg: 'API put - Controlador',
        id
    });
}


const usuariosPatch = (req, res = response) =>{
    res.json({
        msg: 'API patch - Controlador'
    });
}


const usuariosDelete = (req, res = response) =>{
    res.json({
        msg: 'API delete - Controlador'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}