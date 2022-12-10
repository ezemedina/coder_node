const express = require("express");
const router = express.Router();
const productoRouter = require("./api.routes");
const ProductosServices = require('../services/productos.services');
const productos = new ProductosServices();

router.use("/api/productos", productoRouter);

router.get('/', function (req, res) {
  res.status(200);
  res.render('pages/index');
});

router.get('/productos', function (req, res) {
  productos.obtenerProductosEJS(req,res);
});

module.exports = router;