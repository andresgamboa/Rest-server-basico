const { response } = require("express")


const esAdminRole = ( req, res = response , next ) =>{


    if( !req.usuario ){
        return res.status(500).json({
            msg: 'No se puede verificar el Role, sin verificar el token primero'
        });
    }
    
    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no está autorizado para realizar esto - no es administrador`
        })
    }

    next();
}


const tieneRol = ( ...roles ) => {

    return ( req, res = response, next ) => {

        if( !req.usuario ){
            return res.status(500).json({
                msg: 'No se puede verificar el Role, sin verificar el token primero'
            });
        }


        if( !roles.includes(req.usuario.rol) ){

            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }


        next();

    }

}



module.exports = {
    esAdminRole,
    tieneRol
}