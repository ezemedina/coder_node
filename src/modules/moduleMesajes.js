const moment = require("moment");
const fs = require("fs");
const config = require('../config');

let historialMensajes = [];

try {
    historialMensajes = JSON.parse(fs.readFileSync(`${config.carpetaMensajes}/${config.archivosMensajes}`, "utf-8"));
    console.log(`${moment().format()} INFO Historial de chat encontrado`);
} catch (error) {
    console.log(`${moment().format()} ERROR Historial de chat no encontrado`);
    fs.mkdir(`${config.carpetaMensajes}`, { recursive: true }, (err) => {
        if (err) {
            console.log(`${moment().format()} ERROR no se puede crear la carpeta ${config.carpetaMensajes}`);
        } else {
            console.log(`${moment().format()} INFO directorio ${config.carpetaMensajes} creado`);
        }
    });
    historialMensajes = [];
}

class Mensaje {
    constructor(author, message) {
        this.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
        this.author = author;
        this.message = message;
    }

    save() {
        try {
            fs.writeFileSync(`${config.carpetaMensajes}/${config.archivosMensajes}`, JSON.stringify(historialMensajes));
            historialMensajes.push(this);
            console.log(`${moment().format()} INFO Mensaje guardado`);
            return true
        } catch {
            console.log(`${moment().format()} ERROR Error al guardar mensaje`);
            return false
        }
    }
}

module.exports.Mensaje = Mensaje;
module.exports.historialMensajes = historialMensajes;