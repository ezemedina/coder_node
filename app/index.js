const { v4: uuidv4 } = require('uuid')
const express = require('express')
const moment = require('moment')
const router = require('./router.js');
const productos = require('./producto.js');
const config = require('./config.js');

const app = express()

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', router.routerProductos)

app.get('/', function (req, res) {
  let uuid = uuidv4()
  console.log(`${moment().format()} INFO Id: ${uuid}, Path: ${req.path}, Method: ${req.method}`)
  res.set('X-UUID', uuid)
  res.status(200)
  res.render('pages/index');
});

app.get('/productos', function (req, res) {
  let uuid = uuidv4()
  console.log(`${moment().format()} INFO Id: ${uuid}, Path: ${req.path}, Method: ${req.method}`)
  res.set('X-UUID', uuid)
  res.status(200)
  res.render('pages/productos', {
    productos: productos
  });
});

const server = app.listen( config.port , () => {
  console.log(`${moment().format()} Listening server ${server.address().address} : ${server.address().port}`)
})