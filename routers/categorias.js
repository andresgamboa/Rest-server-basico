const { Router } = require('express');
const { check } = require('express-validator');


const { validarJWT , validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, borrarCategoria, actualizarCategoria, obtenerCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const router = Router();

//Obtener todas las categorias - publico
router.get('/' , [
    validarCampos
], 
obtenerCategorias)

//Obtener categoria por id - publico
router.get('/:id' , [ 
    check('id', 'El id no es un id valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
] , 
obtenerCategoria)

//Crear categoria - privado - cualquier persona con un token valido
router.post('/' , [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , 
crearCategoria)

//actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id' , [
    validarJWT,
    esAdminRole,
    check('id' , 'El id no es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
],
actualizarCategoria)

//borrar una categoria - admin 
router.delete('/:id' , [
    validarJWT,
    esAdminRole,
    check('id' , 'El id ingresado no es valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
] ,
borrarCategoria)



module.exports = router;