const { Schema, model } = require('mongoose');



const CategoriaSchema = Schema( {

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
    }


} );

CategoriaSchema.methods.toJSON = function(){      //toca realizarlo con una funcion normal, porque la funcion de flecha, mantiene el .this fuera de la misma
    
    const { __v , estado , ...categoria } = this.toObject();
    
    return categoria;
}


module.exports = model( 'Categoria', CategoriaSchema )