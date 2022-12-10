const express = require("express");
const router = express.Router();
const productoRouter = require("./api.routes");

router.use("/api/productos", productoRouter);

router.get('/', function (req, res) {
  res.status(200);
  res.render('pages/index');
});

router.get('/productos', function (req, res) {
  obtenerProductosDb()
  .then((data) => {
    res.status(200);
    res.render('pages/productos', {
      productos: data
    });
  })
});

module.exports = router;