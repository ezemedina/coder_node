import moment from "moment";
import fs from "fs";
import carritos from "../helpers/helperCarritos";
import productos from "../helpers/helpersProductos";
import Carrito from "../models/Carrito";
import config from "../../config/config";

const crearCarrito = (req, res) => {
    console.log(`${moment().format()} controllerCarrito.ts 6 INFO id: ${req.uuid} Path: ${req.originalUrl}, Method: ${req.method}`);
    try {
        let carrito = new Carrito();
        carrito.guardarCarrito();
        res.status(201).send({
            id: carrito.id
        })
        fs.writeFileSync(`${config.dataDir}/${config.carritosFile}`, JSON.stringify(carritos));
        console.log(`${moment().format()} controllerCarrito.ts 12 INFO id: ${req.uuid} Carrito generado id: ${carrito.id}`);
    } catch (error) {
        res.status(500).send({
            error: -10,
            description: `No se pudo generar el carrito`
        });
        console.log(`${moment().format()} controllerCarrito.ts 18 ERROR id: ${req.uuid} no se puedo generar el carrito`);
    }
};

const borrarCarrito = (req, res) => {
    console.log(`${moment().format()} controllerCarrito.ts 23 INFO id: ${req.uuid} Path: ${req.originalUrl}, Method: ${req.method}`);
    try {
        let id = parseInt(req.params.id);
        let indice = carritos.findIndex((elemento) => elemento.id === id);

        if (carritos[indice] === undefined){
            throw {
                error: -3,
                description: `El carrito con el ID: ${req.params.id} no existe`
            }
        } else {
            carritos.splice(indice, 1);
            res.status(200).send({
                description: `Carrito eliminado ID: ${req.params.id}`
            })
            fs.writeFileSync(`${config.dataDir}/${config.carritosFile}`, JSON.stringify(carritos));
            console.log(`${moment().format()} controllerCarrito.ts 38 INFO id: ${req.uuid} Carrito eliminado ID: ${req.params.id}`);
        }
    } catch (error) {
        res.status(404).send(error);
        console.log(`${moment().format()} controllerCarrito.ts 42 ERROR id: ${req.uuid} El Carrito con el ID: ${req.params.id} no existe`);
    }
};

const listarCarrito = (req,res) => {
    console.log(`${moment().format()} controllerCarrito.ts 47 INFO id: ${req.uuid} Path: ${req.originalUrl}, Method: ${req.method}`);
    try {
        let id = parseInt(req.params.id);
        let indice = carritos.findIndex((elemento) => elemento.id === id);

        if (carritos[indice] === undefined){
            throw {
                error: -3,
                description: `El carrito con el ID: ${req.params.id} no existe`
            }
        } else {
            res.status(200).send(carritos[indice].productos)
            console.log(`${moment().format()} controllerCarrito.ts 59 INFO id: ${req.uuid} Enviando Productos: ${JSON.stringify(carritos[indice].productos)}`);
        }
    } catch (error) {
        res.status(404).send(error);
        console.log(`${moment().format()} controllerCarrito.ts 63 ERROR id: ${req.uuid} El Carrito con el ID: ${req.params.id} no existe`);
    }
};

const agregarProductoCarrito = (req, res) => {
    console.log(`${moment().format()} controllerCarrito.ts 68 INFO id: ${req.uuid} Path: ${req.originalUrl}, Method: ${req.method}`);
    try {
        let id = parseInt(req.params.id);
        let indice = carritos.findIndex((elemento) => elemento.id === id);
        if (carritos[indice] === undefined){
            throw {
                error: -3,
                description: `El carrito con el ID: ${req.params.id} no existe`
            }
        } else {
            if(req.body.id != undefined){
                try {
                    let indiceProducto = productos.findIndex((elemento) => elemento.id === req.body.id);
                    if (productos[indiceProducto] === undefined) {
                        throw {
                            error: -7,
                            description: `Error al agregar producto`
                        };
                    } else {
                        carritos[indice].productos.push(productos[indiceProducto]);
                        res.status(200).send({
                            message: `Producto ${req.body.id} agregado`
                        });
                        fs.writeFileSync(`${config.dataDir}/${config.carritosFile}`, JSON.stringify(carritos));
                        console.log(`${moment().format()} controllerCarrito.ts 92 INFO id: ${req.uuid} Producto ${req.body.id} agregado`);
                    }
                } catch (error) {
                    res.status(500).send(error);
                    console.log(`${moment().format()} controllerCarrito.ts 97 ERROR id: ${req.uuid} Error al agregar producto`);
                }
            }
        }
    } catch (error) {
        res.status(404).send(error);
        console.log(`${moment().format()} controllerCarrito.ts 103 ERROR id: ${req.uuid} El Carrito con el ID: ${req.params.id} no existe`);
    }
};

const eliminarProductoCarrito = (req, res) => {
    console.log(`${moment().format()} controllerCarrito.ts 108 INFO id: ${req.uuid} Path: ${req.originalUrl}, Method: ${req.method}`);
    try {
        let id = parseInt(req.params.id);
        let id_prod = parseInt(req.params.id_prod);
        let indice = carritos.findIndex((elemento) => elemento.id === id);
        if (carritos[indice] === undefined){
            throw {
                error: -3,
                description: `El carrito con el ID: ${req.params.id} no existe`
            }
        } else {
            let indiceProducto = carritos[indice].productos.findIndex((elemento) => elemento.id === id_prod);
            if ( carritos[indice].productos[indiceProducto] === undefined ) {
                throw {
                    error: -80,
                    description: `el producto ${id_prod} no se encuantra en el carrito`
                }
            } else {
                try {
                    carritos[indice].productos.splice(indiceProducto, 1);
                    res.status(200).send({
                        message: `Producto eliminado del carrito`
                    });
                    fs.writeFileSync(`${config.dataDir}/${config.carritosFile}`, JSON.stringify(carritos));
                    console.log(`${moment().format()} controllerCarrito.ts 131 INFO id: ${req.uuid} Producto ${id_prod} eliminado`);
                } catch (error) {
                    res.status(500).send({
                        error: -90,
                        description: `Error al eliminar el producto`
                    });
                    console.log(`${moment().format()} controllerCarrito.ts 137 ERROR id: ${req.uuid} Error al eliminar el producto ${id_prod}`);
                }
            }
        }
    } catch (error) {
        res.status(404).send(error);
        console.log(`${moment().format()} controllerCarrito.ts 124 ERROR id: ${req.uuid} El Carrito con el ID: ${req.params.id} no existe`);
    }
};

export {crearCarrito, borrarCarrito, listarCarrito, agregarProductoCarrito, eliminarProductoCarrito};