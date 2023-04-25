const { response } = require("express")
const { Categoria } = require('../models');


// ObtenerCategorias - paginado - total - populate
const obtenerCategorias = async( req , res = response ) => {

    const { limite = 5 , desde } = req.query;

    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .skip( Number(desde) )
            .limit( Number(limite ) )
            .populate( 'usuario', 'nombre' )
    ])


    res.json({
        total,
        categorias
    })

}

//ObtenerCategoria - populate {}

const obtenerCategoria = async( req , res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id ).populate( 'usuario' , 'nombre' )

    res.json( categoria );
}


//Crea la categoria

const crearCategoria = async( req , res = response ) => {

    const nombre = req.body.nombre.toUpperCase(); //ALMACENO EL NOMBRE DE LA CATEGORIA EN LA VARIABLE, NO HACEMOS DESESTRUCTURACION PARA PODER ASIGNAR Y TIPAR A MAYUSCULA

    const categoriaDB = await Categoria.findOne( { nombre } );


    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }

    //Generar la data a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria ( data );

    //Grabar en DB

    await categoria.save();

    res.status(201).json( categoria );

}


//actualizarCategoria 

const actualizarCategoria = async( req, res = response ) => {

    const { id } = req.params;
    const { estado , usuario , ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id , data , { new: true }); //El new :true hace que se mire en la respuesta la informacion nueva

    res.json( categoria );


}



//borrar Categoria - estado:false

const borrarCategoria = async( req, res = response ) => {

    const { id } = req.params

    const categoria = await Categoria.findByIdAndUpdate( id ,  {estado : false} , { new: true } );

    res.json(categoria);


}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}