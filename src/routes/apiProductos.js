const express = require('express');
const { obtenerProductos, cargarProducto, obtenerProductoId, actualizarProductoId, borrarProductoId } = require('../controller/controllerProducto');
const productos = express.Router();

productos.get("/",obtenerProductos);
productos.post("/", cargarProducto);
productos.get("/:id", obtenerProductoId);
productos.put("/:id", actualizarProductoId);
productos.delete("/:id", borrarProductoId)

module.exports = productos;