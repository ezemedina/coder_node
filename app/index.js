const { v4: uuidv4 } = require('uuid');
const express = require('express');
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const moment = require('moment');
const fs = require("fs");
const router = require('./router.js');
const productos = require('./producto.js');
const config = require('./config.js');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', router.routerProductos);

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
    productos: productos.informacion
  });
});

const connectedServer = httpServer.listen(config.port, () => {
  console.log(`${moment().format()} Listening server ${connectedServer.address().address} : ${connectedServer.address().port}`);
});

let mensajes = [];

try {
  mensajes = JSON.parse(fs.readFileSync(config.archivosMensajes, "utf-8"));
} catch (error) {
  mensajes = [];
}

io.on("connection", (connection) => {
  console.log(`${moment().format()}, Socket ID: ${connection.id} has been connected`);

  connection.emit('productos', productos.informacion);
  connection.emit('mensajes', JSON.stringify(mensajes));

  connection.on('nuevoProducto', (elemento) => {
    let data = JSON.parse(elemento)
    console.log(`${moment().format()}, Channel: nuevoProducto, Payload: ${elemento}, Socket ID: ${connection.id}`);
    let producto = new productos.Producto(
      data.title,
      data.price,
      data.thumbnail
    );
    productos.informacion.push(producto);
    io.sockets.emit('productos', productos.informacion);
  });

  connection.on('nuevoMensaje', (elemento) => {
    console.log(`${moment().format()}, Channel: nuevoMensaje, Payload: ${elemento}, Socket ID: ${connection.id}`);
    let data = JSON.parse(elemento);
    data.timestamp = moment().format('DD/MM/YYYY HH:MM:SS');
    mensajes.push(data);
    fs.writeFileSync(config.archivosMensajes, JSON.stringify(mensajes));
    io.sockets.emit('mensajes', JSON.stringify(mensajes));
  });

});