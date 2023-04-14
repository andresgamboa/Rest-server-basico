const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');

const { 
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRol
 } = require('../middlewares')

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );


router.post('/', [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('password', 'La contraseña debe de ser minimo de 6 letras').isLength({ min:6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No se definió un rol valido').isIn(['ADMIN_ROLE' , 'USER_ROLE']),
    check('rol').custom( esRolValido ), //estoy recibiendo el parametro del rol, pero es redundante poner (rol) => esRolValido(rol), mandamos solo la referencia a la funcion, y automaticamente el parametro que llega a custom, se envia a la funcion
    validarCampos
    
] ,usuariosPost) ;


router.put('/:id', [
    check('id' , 'El ID no es un ID valido ').isMongoId(),
    check( 'id' ).custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ), //estoy recibiendo el parametro del rol, pero es redundante poner (rol) => esRolValido(rol), mandamos solo la referencia a la funcion, y automaticamente el parametro que llega a custom, se envia a la funcion
    validarCampos
] , usuariosPut );


router.patch('/', usuariosPatch );


router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRol( 'ADMIN_ROLE', 'VENTAS_ROLE' ),
    check('id' , 'El ID no es un ID valido ').isMongoId(),
    check( 'id' ).custom( existeUsuarioPorId ),
    validarCampos

],
usuariosDelete );










module.exports = router;