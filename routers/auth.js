const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');


const { loginController, googleSingIn } = require('../controllers/auth');


const router = Router();


router.post('/login', [
    check('correo' , 'El correo es obligatorio').isEmail(),
    check('password' , 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],
loginController );


router.post('/google', [
    check('id_token' , 'el id_token es necesario').not().isEmpty(),
    validarCampos
],
googleSingIn );



module.exports = router;