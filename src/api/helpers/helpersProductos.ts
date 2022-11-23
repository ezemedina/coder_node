import moment from "moment";
import fs from "fs";
import config from "../../config/config";
let productos:any[] = [];

try {
    let productosGuardados= fs.readFileSync(`${config.dataDir}/${config.ProductosFile}`, "utf8");
    productos = JSON.parse(productosGuardados);
    console.log(`${moment().format()} helperProductos.ts 9 INFO Se encontraron productos guardados`);
} catch (error) {
    console.log(`${moment().format()} helperProductos.ts 11 ERROR No se encontro informacion de productos`);
    fs.mkdirSync(`${config.dataDir}`, {recursive: true});
    console.log(`${moment().format()} helperProductos.ts 13 INFO Generando directorio ${config.dataDir}`);
    fs.writeFileSync(`${config.dataDir}/${config.ProductosFile}`, JSON.stringify(productos));
    console.log(`${moment().format()} helperProductos.ts 15 INFO Guardando productos`);
}

export default productos;