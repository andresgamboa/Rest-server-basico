


const dbValidators = require('./db-validators');
const gererarJWT   = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...dbValidators,
    ...gererarJWT,
    ...googleVerify,
    ...subirArchivo
}