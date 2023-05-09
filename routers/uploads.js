const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivos,
        actualizarImagen, 
        mostrarImagen, 
        actualizarImagenClaudinary } = require('../controllers/uploads');
const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers');


const router = Router();


router.get( '/:coleccion/:id' , [
    check('id' , 'el id no es valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c , ['usuarios' , 'productos'])),
    validarCampos
], 
mostrarImagen)


router.post( '/' , validarArchivoSubir ,cargarArchivos )



router.put( '/:coleccion/:id' , [
    validarArchivoSubir,
    check( 'id', 'El id no es valido' ).isMongoId(),
    check( 'coleccion').custom( c => coleccionesPermitidas( c , ['usuarios' , 'productos'] )),
    validarCampos
] , actualizarImagenClaudinary)
// ] , actualizarImagen)









module.exports = router;