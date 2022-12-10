const express = require('express');
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const config = require('./config');
const Producto = require('./models/productos.model');
const ProductosServices = require('./services/productos.services');
const productos = new ProductosServices();
const Mensaje = require('./models/mensaje.model');
const MensajesServices = require('./services/mensajes.services');
const mensajes = new MensajesServices();
const router = require('./routes/index.routes');
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(router);

productos.crearDB();
mensajes.crearDB();


const connectedServer = httpServer.listen(config.port, () => {
  console.log(`INFO Servidor escuchando puerto ${connectedServer.address().port}`);
});

io.on("connection", (connection) => {

  productos.obtenerProductosWS(connection);
  mensajes.obtenerMensajesWS(connection);

  connection.on('nuevoProducto', (elemento) => {
    let data = JSON.parse(elemento)
    let producto = new Producto(data);
    productos.agregarProductoWS(io,producto);
  });

  connection.on('nuevoMensaje', (elemento) => {
    let data = JSON.parse(elemento);
    let mensaje = new Mensaje(data);
    mensajes.agregarMensajeWS(io,mensaje);
  });
});