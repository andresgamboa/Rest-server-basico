const { Schema, model } = require('mongoose');


const productoSchema = Schema( {

    nombre: {
        type: String,
        required: [true , 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean , default: true },
    img: { type: String}

} );

productoSchema.methods.toJSON = function(){      //toca realizarlo con una funcion normal, porque la funcion de flecha, mantiene el .this fuera de la misma
    
    const { __v , estado , ...producto } = this.toObject();

    return producto;
}


module.exports = model( 'Producto', productoSchema )