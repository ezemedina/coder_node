import moment from "moment";
import fs from "fs";
import config from "../../config/config";
import Producto from "../models/Producto";
let productos:Array<Producto> = [];

try {
    productos = require('../data/Productos.json');
    console.log(`${moment().format()} helperProductos.ts 8 INFO Se encontraron productos guardados ${productos.length}`);
} catch (error) {
    fs.writeFileSync(`${config.dataDir}/${config.ProductosFile}`, JSON.stringify(productos));
    console.log(`${moment().format()} helperProductos.ts 11 INFO Guardando productos`);
}

export default productos;