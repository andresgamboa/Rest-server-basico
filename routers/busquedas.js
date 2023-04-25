const { Router } = require('express');

const { buscador } = require('../controllers/busquedas');


const router = Router();


router.get( '/:coleccion/:termino' , buscador)















module.exports = router;