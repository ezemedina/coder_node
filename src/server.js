const { v4: uuidv4 } = require('uuid');
const express = require('express');
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const moment = require("moment");
const fs = require("fs");
const productos = require('./modules/controllerProducto');
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
    productos: productos.informacion
  });
});

const connectedServer = httpServer.listen(config.port, () => {
  console.log(`${moment().format()} INFO Servidor escuchando puerto ${connectedServer.address().port}`);
});

let mensajes = [];

try {
  mensajes = JSON.parse(fs.readFileSync(`${config.carpetaMensajes}/${config.archivosMensajes}`, "utf-8"));
  console.log(`${moment().format()} INFO Historial de chat encontrado`);
} catch (error) {
  console.log(`${moment().format()} ERROR Historial de chat no encontrado`);
  fs.mkdir(`${config.carpetaMensajes}`, { recursive: true }, (err) => {
    if (err) {
      console.log(`${moment().format()} ERROR no se puede crear la carpeta ${config.carpetaMensajes}`);
    } else {
      console.log(`${moment().format()} INFO directorio ${config.carpetaMensajes} creado`);
    }
  });
  mensajes = [];
}

io.on("connection", (connection) => {
  console.log(`${moment().format()} INFO Socket ID: ${connection.id} conectado`);

  connection.emit('productos', productos.informacion);
  connection.emit('mensajes', JSON.stringify(mensajes));

  connection.on('nuevoProducto', (elemento) => {
    let data = JSON.parse(elemento)
    console.log(`${moment().format()} INFO Channel: nuevoProducto Payload: ${elemento} Socket ID: ${connection.id}`);
    let producto = new productos.Producto(
      data.title,
      data.price,
      data.thumbnail
    );
    productos.informacion.push(producto);
    io.sockets.emit('productos', productos.informacion);
  });

  connection.on('nuevoMensaje', (elemento) => {
    console.log(`${moment().format()} INFO Channel: nuevoMensaje Payload: ${elemento} Socket ID: ${connection.id}`);
    let data = JSON.parse(elemento);
    data.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
    mensajes.push(data);
    fs.writeFileSync(`${config.carpetaMensajes}/${config.archivosMensajes}`, JSON.stringify(mensajes));
    io.sockets.emit('mensajes', JSON.stringify(mensajes));
  });

});