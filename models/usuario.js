const { Schema, model } = require('mongoose');



const UsuarioSchema = Schema( {

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROL' , 'USER_ROL']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

} );

UsuarioSchema.methods.toJSON = function(){      //toca realizarlo con una funcion normal, porque la funcion de flecha, mantiene el .this fuera de la misma
    
    const { __v , password, _id , ...usuario } = this.toObject();
    usuario.uid = _id;

    return usuario;
}


module.exports = model( 'Usuario', UsuarioSchema );