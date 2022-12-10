module.exports = class ProductosServices {
    #config = require('../config');
    #gestorBaseDeDatos = require("../container/baseDeDatos.container"); 
    #DB = new this.#gestorBaseDeDatos(this.#config.mysql);

    crearDB() {
        this.#DB.crearTablaProdcutos();
    }

    agregarProductoWS(io,producto) {
        this.#DB.agregarElemento(producto,'productos')
        .then(() => {
            this.emitirProductosWS(io);
        })
        .catch((err) => {
            console.log(`ERROR ${err.message}`);
        });
    }

    emitirProductosWS(io) {
        this.#DB.obtenerElementos('productos')
        .then((data) =>{
            io.sockets.emit('productos', data);
        })
        .catch((err) => {
            console.log(`ERROR ${err.message}`);
        });
    }

    obtenerProductosWS(connection) {
        this.#DB.obtenerElementos('productos')
        .then((data) =>{
            connection.emit('productos', data);
        })
        .catch((err) => {
            console.log(`ERROR ${err.message}`);
        });
    }

    agregarProducto(req,res,producto) {
        this.#DB.agregarElemento(producto,'productos')
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            console.log(`ERROR ${err.message}`);
            let error = {Message: "No se puede procesar la solicitud"}
            res.status(500).send(error);
        });
    }

    obtenerProductos(req,res) {
        try {
            this.#DB.obtenerElementos('productos')
            .then((data) =>{
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(404).send(err.message);
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    obtenerProductosEJS(req,res) {
        this.#DB.obtenerElementos('productos')
        .then((data) =>{
            res.status(200).render('pages/productos', {
                productos: data
            });
        })
        .catch((err) => {
            res.status(404).send(err.message);
        });   
    }

    obtenerProductosId(req,res,idProductos) {
        try {
            this.#DB.obtenerElementoPorId(idProductos,'productos')
            .then((data) =>{
                res.status(200).send(data);
            })
            .catch((err) => {
                console.log(`ERROR ${err.message}`);
                res.status(404).send(err.message);
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    actualizarProductoId(req,res,idProductos) {
        try {
            this.#DB.actualizarElementoPorId(idProductos,req.body,'productos')
            .then((data) =>{
                this.#DB.obtenerElementoPorId(idProductos,'productos')
                .then((data) =>{
                    res.status(200).send(data);
                });
            })
            .catch((err) => {
                console.log(`ERROR ${err.message}`);
                res.status(404).send(err.message);
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    borrarProductoId(req,res,idProductos) {
        try {
            this.#DB.borrarElementoPorId(idProductos,'productos')
            .then((data) =>{
                res.status(200).send(data);
            })
            .catch((err) => {
                console.log(`ERROR ${err.message}`);
                res.status(404).send(err.message);
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }
    
}