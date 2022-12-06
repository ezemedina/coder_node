import moment from "moment";
import fs from "fs";
import productos from "../helpers/helpersProductos";
import Producto from "../models/Producto";
import config from "../../config/config";

const listarProductos = (req,res, next) => {
    if ( req.params.id === undefined ) {
        console.log(`${moment().format()} controllerProductos.ts 9 INFO id: ${req.uuid} Path: ${req.originalUrl}, Method: ${req.method}`);
        res.status(200).send(productos);
        console.log(`${moment().format()} controllerProductos.ts 11 INFO id: ${req.uuid} Response: ${JSON.stringify(productos)}`);
    } else {
        next();
    }
};

const listarProducto = (req,res) => {
    console.log(`${moment().format()} controllerProductos.ts 18 INFO id: ${req.uuid} Path: ${req.originalUrl}, Method: ${req.method}`);
    try {
        let id = parseInt(req.params.id);
        let indice = productos.findIndex((elemento) => elemento.id === id);
        if ( productos[indice] === undefined ) {
            throw {
                error: -3,
                description: `El producto con el ID: ${req.params.id} no existe`
            }
        } else {
            res.status(200).send(productos[indice]);
            console.log(`${moment().format()} controllerProductos.ts 29 INFO id: ${req.uuid} Response: ${JSON.stringify(productos[indice])}`);
        }
    } catch (error) {
        res.status(404).send(error);
        console.log(`${moment().format()} controllerProductos.ts 33 ERROR id: ${req.uuid} El producto con el ID: ${req.params.id} no existe`);
    }
};

const agregarProducto = (req,res) => {
    console.log(`${moment().format()} controllerProductos.ts 38 INFO id: ${req.uuid} Path: ${req.originalUrl}, Method: ${req.method}`);
    if ( req.body.nombre === undefined || req.body.descripcion === undefined || req.body.codigo === undefined || req.body.imagen === undefined || req.body.precio === undefined || req.body.stock === undefined ) {
        res.status(400).send({
            error: -5,
            description: `Error cuerpo de solicitud mal formado`
        })
        console.log(`${moment().format()} controllerProductos.ts 44 ERROR id: ${req.uuid} Solicitud mal formada`);
    } else {
        let producto:Producto = new Producto (req.body.nombre, req.body.descripcion, req.body.codigo, req.body.imagen, req.body.precio, req.body.stock);
        if ( producto.guardarProducto() ){
            res.status(201).send(producto);
            fs.writeFileSync(`${config.dataDir}/${config.ProductosFile}`, JSON.stringify(productos));
            console.log(`${moment().format()} controllerProductos.ts 50 INFO id: ${req.uuid} Producto generado ${JSON.stringify(producto)}`);
        } else {
            res.status(500).send({
                error: -6,
                description: `Error al guardar el producto`
            });
            console.log(`${moment().format()} controllerProductos.ts 56 ERROR id: ${req.uuid} Producto no generado`);
        }
    }
};

const actualizarProducto = (req,res) => {
    console.log(`${moment().format()} controllerProductos.ts 62 INFO id: ${req.uuid} Path: ${req.originalUrl}, Method: ${req.method}`);
    try {
        let id = parseInt(req.params.id);
        let indice = productos.findIndex((elemento) => elemento.id === id);

        if (productos[indice] === undefined){
            throw {
                error: -3,
                description: `El producto con el ID: ${req.params.id} no existe`
            }
        }

        if ( req.body.nombre != undefined ){
            productos[indice].nombre = req.body.nombre;
        }

        if ( req.body.descripcion != undefined ) {
            productos[indice].descripcion = req.body.descripcion;
        }

        if ( req.body.codigo != undefined ) {
            productos[indice].codigo = req.body.codigo;
        }

        if ( req.body.imagen != undefined ) {
            productos[indice].imagen = req.body.imagen;
        }

        if ( req.body.precio != undefined ) {
            productos[indice].precio = req.body.precio;
        }

        if ( req.body.stock != undefined ) {
            productos[indice].stock = req.body.stock;
        }

        res.status(202).send(productos[indice]);
        fs.writeFileSync(`${config.dataDir}/${config.ProductosFile}`, JSON.stringify(productos));
        console.log(`${moment().format()} controllerProductos.ts 100 INFO id: ${req.uuid} Producto modificado ${JSON.stringify(productos[indice])}`);
    } catch (error) {
        res.status(404).send(error);
        console.log(`${moment().format()} controllerProductos.ts 103 ERROR id: ${req.uuid} El producto con el ID: ${req.params.id} no existe`);
    }
};

const eliminarProducto = (req,res) => {
    console.log(`${moment().format()} controllerProductos.ts 108 INFO id: ${req.uuid} Path: ${req.originalUrl}, Method: ${req.method}`);
    try {
        let id = parseInt(req.params.id);
        let indice = productos.findIndex((elemento) => elemento.id === id);

        if (productos[indice] === undefined){
            throw {
                error: -3,
                description: `El producto con el ID: ${req.params.id} no existe`
            }
        } else {
            productos.splice(indice, 1);
            res.status(200).send({
                description: `Producto eliminado ID: ${req.params.id}`
            })
            fs.writeFileSync(`${config.dataDir}/${config.ProductosFile}`, JSON.stringify(productos));
            console.log(`${moment().format()} controllerProductos.ts 124 INFO id: ${req.uuid} Producto eliminado ID: ${req.params.id}`);
        }
    } catch (error) {
        res.status(404).send(error);
        console.log(`${moment().format()} controllerProductos.ts 128 ERROR id: ${req.uuid} El producto con el ID: ${req.params.id} no existe`);
    }
};

export {listarProductos, listarProducto, agregarProducto, actualizarProducto, eliminarProducto};