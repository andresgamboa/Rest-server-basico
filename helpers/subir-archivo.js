const path = require('path');
const { v4: uuidv4 } = require('uuid');


const subirArchivo = ( files , extensionesPermitidas = ['jpg', 'png', 'jpeg', 'gif'] , carpeta = '' ) => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;  //Obtengo el archivo de la propiedad files
        const nombreCortado = archivo.name.split('.');  //separo el archivo por . para poder hallar la extension
        const extension = nombreCortado[nombreCortado.length - 1];    //split me retorna un arreglo de palabras separadas en este caso por . y tomo el ultimo para saber la extension

        //VALIDAR EXTENSION
        if (!extensionesPermitidas.includes(extension)) {
            return reject(`La extension no esta permitida, solo se pueden extensiones de tipo:  ${extensionesPermitidas}`)
        }

        const nombreTemporal = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta , nombreTemporal);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nombreTemporal );
        });


    });


}



module.exports = {
    subirArchivo
}