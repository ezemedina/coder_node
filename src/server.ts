import express from "express";
import moment from "moment";
import routerProductos from "./api/routes/routerProductos";
import routerCarrito from "./api/routes/routerCarrito";
import config from "./config/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('*', (req,res) => {
    res.status(400).send({
        error: -2,
        description: `Ruta ${req.originalUrl} metodo ${req.method} no implementado`
    });
});

app.listen(config.port, () => {
    console.log(`${moment().format()} server.ts 21 INFO Servidor listando en el puerto ${config.port}`);
})