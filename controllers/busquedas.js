const { response, json } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario , Categoria , Producto } = require("../models");


const coleccionPermitida = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];


const buscarUsuarios = async( termino = '' , res = response ) => {

    
    const mongoID = ObjectId.isValid( termino ); //true o false, si el termino que estoy añadiendo es un id valido, me realiza la accion - esto es para cuando se haga busqueda introduciendo el id en los params


    if( mongoID ){
        const usuario = await Usuario.findById( termino );

        return res.json( {
            results: ( usuario ) ? [ usuario ] : []
        } )
    }


    const regex = new RegExp( termino , 'i' ) //expresion regular para que mi busqueda se vuelva insensible a mayus o minusculas

    const usuarios = await Usuario.find( { 
        $or: [ { nombre: regex } , { correo: regex } ],
        $and: [ { estado : true } ]
    }  )

    res.json( {
        results: usuarios
    } )

}

const buscarCategorias = async( termino = '' , res = response ) => {

    const mongoID = ObjectId.isValid( termino ); //true o false, si el termino que estoy añadiendo es un id valido, me realiza la accion - esto es para cuando se haga busqueda introduciendo el id en los params


    if( mongoID ){
        const categoria = await Categoria.findById( termino );

        return res.json( {
            results: ( categoria ) ? [ categoria ] : []
        } )
    }

    const regex = new RegExp( termino , 'i' ) //expresion regular para que mi busqueda se vuelva insensible a mayus o minusculas

    const categorias = await Categoria.find( { 
        $or: [ { nombre: regex } ],
        $and: [ { estado : true } ]
    }  )

    res.json( {
        results: categorias
    } )


}


const buscarProductos = async( termino = '' , res = response ) => {

    const mongoID = ObjectId.isValid( termino ); //true o false, si el termino que estoy añadiendo es un id valido, me realiza la accion - esto es para cuando se haga busqueda introduciendo el id en los params


    if( mongoID ){
        const producto = await Producto.findById( termino ).populate( 'categoria' , 'nombre' );

        return res.json( {
            results: ( producto ) ? [ producto ] : []
        } )
    }

    const regex = new RegExp( termino , 'i' ); //expresion regular para que mi busqueda se vuelva insensible a mayus o minusculas

    const productos = await Producto.find( { nombre : regex , estado: true } ).populate( 'categoria' , 'nombre' );

    res.json( {
        results: productos
    } );

}


const buscador = async(req , res = response) => {

    const { coleccion , termino } = req.params;

    if( !coleccionPermitida.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionPermitida}`
        })
    }


    switch ( coleccion ) {
        case 'usuarios':
        
            buscarUsuarios( termino , res );
        
        break;

        case 'categorias':

            buscarCategorias( termino, res );

        break;

        case 'productos':

            buscarProductos( termino, res )

        break;
    
        default:
            res.status(500).json({
                msg: 'No se realizo el proceso para esta busqueda'
            })
        break;
    }

    

}


module.exports = {
    buscador
}