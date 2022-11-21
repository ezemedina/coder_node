const { v4: uuidv4 } = require('uuid');
const express = require('express');
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const moment = require("moment");
const fs = require("fs");
const moduleProductos = require('./modules/moduleProductos');
const moduleMensajes = require('./modules/moduleMesajes');
const routerProducto = require('./routes/apiProductos');
const config = require('./config');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', routerProducto);
app.use(express.static('public'));

app.get('/', function (req, res) {
  let uuid = uuidv4();
  console.log(`${moment().format()} INFO Id: ${uuid}, Path: ${req.path}, Method: ${req.method}`);
  res.set('X-UUID', uuid);
  res.status(200);
  res.render('pages/index');
});

app.get('/productos', function (req, res) {
  let uuid = uuidv4();
  console.log(`${moment().format()} INFO Id: ${uuid}, Path: ${req.path}, Method: ${req.method}`);
  res.set('X-UUID', uuid);
  res.status(200);
  res.render('pages/productos', {
    productos: moduleProductos.informacion
  });
});

const connectedServer = httpServer.listen(config.port, () => {
  console.log(`${moment().format()} INFO Servidor escuchando puerto ${connectedServer.address().port}`);
});

io.on("connection", (connection) => {
  console.log(`${moment().format()} INFO Socket ID: ${connection.id} conectado`);

  connection.emit('productos', moduleProductos.informacion);
  connection.emit('mensajes', JSON.stringify(moduleMensajes.historialMensajes));

  connection.on('nuevoProducto', (elemento) => {
    let data = JSON.parse(elemento)
    console.log(`${moment().format()} INFO Channel: nuevoProducto Payload: ${elemento} Socket ID: ${connection.id}`);
    let producto = new moduleProductos.Producto(
      data.title,
      data.price,
      data.thumbnail
    );
    moduleProductos.informacion.push(producto);
    io.sockets.emit('productos', moduleProductos.informacion);
  });

  connection.on('nuevoMensaje', (elemento) => {
    console.log(`${moment().format()} INFO Channel: nuevoMensaje Payload: ${elemento} Socket ID: ${connection.id}`);
    let data = JSON.parse(elemento);
    let mensaje = new moduleMensajes.Mensaje(
      data.author,
      data.message
    );
    mensaje.save();
    io.sockets.emit('mensajes', JSON.stringify(moduleMensajes.historialMensajes));
  });

});