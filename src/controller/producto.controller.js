const Producto = require('../models/productos.model');
const ProductosServices = require('../services/productos.services');
const productos = new ProductosServices();

const obtenerProductos = (req,res) => {
    productos.obtenerProductos(req,res);
};

const cargarProducto = (req,res) => {
    try {
        let producto = new Producto(req.body);
        productos.agregarProducto(req,res,producto);
    } catch (error) {
        let response = { Message: "Solicitud malformada" };
        res.status(400);
        res.send(response);
        console.log(`ERROR Response: ${JSON.stringify(response)}`);
    }
};

const obtenerProductoId = (req,res) => {
    try {
        let id = parseInt(req.params.id);
        if (isNaN(id)){
            throw { Message: "Solicitud malformada" };
        }
        productos.obtenerProductosId(req,res,id);
    } catch(error) {
        console.log(`ERROR Response: ${JSON.stringify(error)}`);
        res.status(400).send(error);
    }
}

const actualizarProductoId = (req,res) => {
    try {
        let id = parseInt(req.params.id);
        if (isNaN(id)){
            throw { Message: "Solicitud malformada" };
        }
        productos.actualizarProductoId(req,res,id);
    } catch (error) {
        console.log(`ERROR Response: ${JSON.stringify(error)}`);
        res.status(400).send(error);
    }
}

const borrarProductoId = (req,res) => {
    try {
        let id = parseInt(req.params.id);
        if (isNaN(id)){
            throw { Message: "Solicitud malformada" };
        }
        productos.borrarProductoId(req,res,id);
    } catch (error) {
        console.log(`ERROR Response: ${JSON.stringify(error)}`);
        res.status(400).send(error);
    }
}

module.exports = { obtenerProductos, cargarProducto, obtenerProductoId, actualizarProductoId, borrarProductoId };