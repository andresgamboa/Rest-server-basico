const { Categoria , Usuario, Producto } = require('../models');
const Role = require('../models/role');



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

const existeCategoriaPorId = async( id ) => {

    //Verificar si el usuario existe

    const existeCategoria = await Categoria.findById( id ); //realizo una validacion para ver si el usuario con ese id que estoy ingresando ya existe
    if ( !existeCategoria ){
        throw new Error(`La categoria con id ${ id } no existe.`);
    }

}

const existeProductoPorId = async( id ) => {

    //Verificar si el usuario existe

    const existeProducto = await Producto.findById( id ); //realizo una validacion para ver si el usuario con ese id que estoy ingresando ya existe
    if ( !existeProducto ){
        throw new Error(`El producto con id ${ id } no existe.`);
    }

}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}