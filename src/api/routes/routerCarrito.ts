import express from "express";
import { agregarProductoCarrito, borrarCarrito, crearCarrito, eliminarProductoCarrito, listarCarrito } from "../controllers/controllerCarrito";
import idLlamada from "../middlewares/middlewareUUID";
const routerCarrito = express.Router();

routerCarrito.post("/", idLlamada, crearCarrito);
routerCarrito.delete("/:id", idLlamada, borrarCarrito);
routerCarrito.get("/:id/productos", idLlamada, listarCarrito);
routerCarrito.post("/:id/productos", idLlamada, agregarProductoCarrito);
routerCarrito.delete("/:id/productos/:id_prod", idLlamada, eliminarProductoCarrito);

export default routerCarrito;