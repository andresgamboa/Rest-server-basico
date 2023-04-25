const { response } = require("express")
const { Producto } = require('../models');


const obtenerProductos = async( req , res = response ) => {

    const { limite = 5 , desde = 0 } = req.query;

    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
            .skip( Number(desde) )
            .limit( Number(limite ) )
            .populate( 'usuario', 'nombre' )
    ])


    res.json({
        total,
        productos
    })

}

const obtenerProducto = async( req , res = response ) => {

    const { id } = req.params;

    const producto = await Producto.findById( id ).populate( 'usuario' , 'nombre' )

    res.json( producto );
}



const crearProducto = async( req , res = response ) => {

    const { estado, usuario, ...body } = req.body; 

    const productoDB = await Producto.findOne( { nombre: body.nombre.toUpperCase() } );


    if( productoDB ){
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        })
    }

    //Generar la data a guardar

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto ( data );

    //Grabar en DB

    await producto.save();

    res.status(201).json( producto );

}


//actualizarCategoria 

const actualizarProducto = async( req, res = response ) => {

    const { id } = req.params;
    const { estado , usuario , ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id , data , { new: true }); //El new :true hace que se mire en la respuesta la informacion nueva

    res.json( producto );


}



//borrar Categoria - estado:false

const borrarProducto = async( req, res = response ) => {

    const { id } = req.params

    const producto = await Producto.findByIdAndUpdate( id ,  {estado : false} , { new: true } );

    res.json(producto);


}



module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}