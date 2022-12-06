import moment from "moment";
import fs from "fs";
import config from "../../config/config";
import Carrito from "../models/Carrito";
let carritos:Array<Carrito> = [];

try {
    carritos = require('../data/Carritos.json');
    console.log(`${moment().format()} helperCarritos.ts 8 INFO Se encontraron carritos guardados ${carritos.length}`);
} catch (error) {
    fs.writeFileSync(`${config.dataDir}/${config.carritosFile}`, JSON.stringify(carritos));
    console.log(`${moment().format()} helperCarritos.ts 11 INFO Guardando carritos`);
}

export default carritos;