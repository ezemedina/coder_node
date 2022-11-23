import express from "express";
import { actualizarProducto, agregarProducto, eliminarProducto, listarProducto, listarProductos } from "../controllers/controllerProductos";
import accesoAdministrador from "../middlewares/middlewareAdministrador";
import idLlamada from "../middlewares/middlewareUUID";
const routerProductos = express.Router();

routerProductos.get("/:id?", idLlamada, listarProductos, listarProducto);
routerProductos.post("/", idLlamada, accesoAdministrador, agregarProducto);
routerProductos.put("/:id", idLlamada, accesoAdministrador, actualizarProducto);
routerProductos.delete("/:id", idLlamada, accesoAdministrador, eliminarProducto);

export default routerProductos;