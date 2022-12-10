module.exports = class MensajesServices {
    #config = require('../config');
    #gestorBaseDeDatos = require("../container/baseDeDatos.container"); 
    #DB = new this.#gestorBaseDeDatos(this.#config.sqlite3);

    crearDB() {
        this.#DB.crearTablaMensjes();
    }

    agregarMensajeWS(io,mensaje) {
        this.#DB.agregarElemento(mensaje,'mensajes')
        .then(() => {
            this.emitirMensajeWS(io);
        })
        .catch((err) => {
            console.log(`ERROR ${err.message}`);
        });
    }

    emitirMensajeWS(io) {
        this.#DB.obtenerElementos('mensajes')
        .then((data) =>{
            io.sockets.emit('mensajes', JSON.stringify(data));
        })
        .catch((err) => {
            console.log(`ERROR ${err.message}`);
        });
    }

    obtenerMensajesWS(connection) {
        this.#DB.obtenerElementos('mensajes')
        .then((data) =>{
            connection.emit('mensajes', JSON.stringify(data));
        })
        .catch((err) => {
            console.log(`ERROR ${err.message}`);
        });
    }
}