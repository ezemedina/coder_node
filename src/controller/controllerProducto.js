const Producto = require('../models/modelProductos');
const { obtenerProductosDb, generarProductoDb, obtenerProductoPorIdDb, actualizarProductoIdDb, eliminarProductoIdDb } = require('../services/servicesProductos');

const obtenerProductos = (req,res) => {
    obtenerProductosDb()
    .then((data) => {
        res.status(200);
        res.send(data); 
    });
};

const cargarProducto = (req,res) => {
    let request = req.body;
    if (
        request.title != undefined &&
        request.price != undefined &&
        request.thumbnail != undefined
    ) {
        try {
            let producto = new Producto(
                request.title,
                request.price,
                request.thumbnail
            );
            generarProductoDb(producto)
            .then((data)=> {
                obtenerProductoPorIdDb(data)
                .then((data)=>{
                    res.status(201);
                    res.send(data);
                });
            });
        } catch (error) {
            let response = { Message: "No se pudo procesar la solicitud" };
            res.status(503);
            res.send(response);
            console.log(`ERROR , Response: ${JSON.stringify(response)}`);
        }
    } else {
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
        obtenerProductoPorIdDb(id)
        .then((data)=>{
            res.status(200);
            res.send(data);
        })
        .catch((err) => {
            let body = {Message: `No se encontro el producto con el ID: ${id}`};
            res.status(404);
            res.send(body);
            console.log(`ERROR Response: ${JSON.stringify(body)}`);
        })
    } catch(error) {
        let response = { Message: "Solicitud malformada" };
        res.status(400);
        res.send(response);
        console.log(`ERROR Response: ${JSON.stringify(response)}`);
    }
}

const actualizarProductoId = (req,res) => {
    try {
        let id = parseInt(req.params.id);
        if (isNaN(id)){
            throw { Message: "Solicitud malformada" };
        }
        actualizarProductoIdDb(id, req.body)
        .then(() => {
            obtenerProductoPorIdDb(id)
            .then((data) => {
                res.status(201);
                res.send(data);
            });
        })
        .catch(() => {
            let error = { Message: `Producto no encontrado con el ID: ${id}` };
            res.status(404);
            res.send(error);
            console.log(`ERROR Response: ${JSON.stringify(error)}`);
        });
    } catch (error) {
        let response = { Message: "Solicitud malformada" };
        res.status(400);
        res.send(response);
        console.log(`ERROR Response: ${JSON.stringify(response)}`);
    }
}

const borrarProductoId = (req,res) => {
    try {
        let id = parseInt(req.params.id);
        if (isNaN(id)){
            throw { Message: "Solicitud malformada" };
        }
        eliminarProductoIdDb(id)
        .then(() => {
            let body = { Message: "Producto eliminado" };
            res.status(200);
            res.send(body);
        })
        .catch((err) => {
            let error = { Message: `Error al eliminar Producto no encontrado con el ID: ${id}` };
            res.status(404);
            res.send(error);
            console.log(`ERROR Response: ${JSON.stringify(error)}`);
        });
    } catch (error) {
        res.status(400);
        res.send(error);
        console.log(`ERROR Response: ${JSON.stringify(error)}`);
    }
}

module.exports = { obtenerProductos, cargarProducto, obtenerProductoId, actualizarProductoId, borrarProductoId };