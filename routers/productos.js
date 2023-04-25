const { Router } = require('express');
const { check } = require('express-validator');

const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto, 
        borrarProducto } = require('../controllers/productos');

const { validarJWT, 
        validarCampos, 
        esAdminRole} = require('../middlewares');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');




const router = Router();


router.get( '/' , [
    validarCampos
] , 
obtenerProductos)



router.get( '/:id' , [
    check('id' , 'El id no es un id valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
] ,obtenerProducto )



router.post( '/' , [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'El id que ingreso en categoria no es un id valido'  ).isMongoId(),
    validarCampos,
    check('categoria', 'El id de la categoria es obligatorio').custom( existeCategoriaPorId ),
    validarCampos
] ,
crearProducto )



router.put( '/:id', [
    validarJWT,
    esAdminRole,
    check('id' , 'El id ingresado no es valido').isMongoId(),
    validarCampos,
    check('id').custom( existeProductoPorId ),
    check('nombre' , 'El nombre es obligatorio').notEmpty(),
    validarCampos,
] , 
actualizarProducto )



router.delete( '/:id', [
    validarJWT,
    esAdminRole,
    check('id' , 'No es un id valido').isMongoId(),
    validarCampos,
    check('id').custom( existeProductoPorId ),
    validarCampos
] , 
borrarProducto )



module.exports = router;

