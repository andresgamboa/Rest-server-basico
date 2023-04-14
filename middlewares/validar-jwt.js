const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');




const validarJWT = async( req = require , res = response , next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la solicitud'
        })
    }

    try {
        
        const { uid } = jwt.verify( token , process.env.SECRETORPRIVATEKEY);


        //leer usuario que corresponde a uid

        const usuario = await Usuario.findById( uid );

        //Verificar si el uid tiene estado true

        if ( !usuario ){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });
        }

        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            });
        }


        req.usuario = usuario;


        next();
    } catch (error) {


        console.log(error);

        res.status(401).json({
            msg: 'Token no valido'
        })
        
    }
}




module.exports = {
    validarJWT
}