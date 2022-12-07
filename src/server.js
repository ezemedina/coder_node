const express = require('express');
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const routerProducto = require('./routes/apiProductos');
const config = require('./config');
const { guardarMensaje, obtenerMensajes, crearTablaMensajes } = require('./services/servicesMensajes');
const { crearTablaProductos, obtenerProductosDb, generarProductoDb } = require('./services/servicesProductos');
const Producto = require('./models/modelProductos');
const Mensaje = require('./models/modelMesajes');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

crearTablaProductos()
.then(() => console.log('INFO Tabla productos creada.'))
.catch(() => {
  console.log('INFO Tabla productos existente omitiendo creacion')
});
crearTablaMensajes()
.then(() => console.log('INFO Tabla mensajes creada.'))
.catch(() => {
  console.log('INFO Tabla mensajes existente omitiendo creacion')
});

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', routerProducto);
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.status(200);
  res.render('pages/index');
});

app.get('/productos', function (req, res) {
  obtenerProductosDb()
  .then((data) => {
    res.status(200);
    res.render('pages/productos', {
      productos: data
    });
  })
  
});

const connectedServer = httpServer.listen(config.port, () => {
  console.log(`INFO Servidor escuchando puerto ${connectedServer.address().port}`);
});

io.on("connection", (connection) => {

  obtenerProductosDb()
  .then((data) => {
    connection.emit('productos', data)
  });
  
  obtenerMensajes()
  .then((rows) => {
    connection.emit('mensajes', JSON.stringify(rows));
  });

  connection.on('nuevoProducto', (elemento) => {
    let data = JSON.parse(elemento)
    let producto = new Producto(
      data.title,
      data.price,
      data.thumbnail
    );
    generarProductoDb(producto)
    .then(() => {
      obtenerProductosDb()
      .then((data) => io.sockets.emit('productos', data))
    });
  });

  connection.on('nuevoMensaje', (elemento) => {
    let data = JSON.parse(elemento);
    let mensaje = new Mensaje(
      data.author,
      data.message
    );
    guardarMensaje(mensaje)
    .then(() => {
      obtenerMensajes()
      .then((rows) => {
        io.sockets.emit('mensajes', JSON.stringify(rows));
      });
    })
  });
});