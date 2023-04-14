const Role = require('../models/role');
const Usuario = require('../models/usuario');




const esRolValido = async( rol = '' ) => {

    const existeRol = await Role.findOne( { rol } );
    if ( !existeRol ){
        throw new Error( `El rol ${rol} no esta registrado en la Base de datos` );
    }

}

const emailExiste = async(correo) => {

    //Verificar si el correo existe

    const existeEmail = await Usuario.findOne( { correo } ); //realizo una validacion para ver si el correo que estoy ingresando ya existe
    if ( existeEmail ){
        throw new Error(`El correo ${correo} ya está registrado.`);
    }

}

const existeUsuarioPorId = async( id ) => {

    //Verificar si el usuario existe

    const existeUsuario = await Usuario.findById( id ); //realizo una validacion para ver si el usuario con ese id que estoy ingresando ya existe
    if ( !existeUsuario ){
        throw new Error(`El id ${ id } no existe.`);
    }

}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}