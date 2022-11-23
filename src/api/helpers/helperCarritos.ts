import moment from "moment";
import fs from "fs";
import config from "../../config/config";
let carritos:any[] = [];

try {
    let carritosGuardados= fs.readFileSync(`${config.dataDir}/${config.carritosFile}`, "utf8");
    carritos = JSON.parse(carritosGuardados);
    console.log(`${moment().format()} helperCarritos.ts 9 INFO Se encontraron carritos guardados`);
} catch (error) {
    console.log(`${moment().format()} helperCarritos.ts 11 ERROR No se encontro informacion de carritos`);
    fs.mkdirSync(`${config.dataDir}`, {recursive: true});
    console.log(`${moment().format()} helperCarritos.ts 13 INFO Generando directorio ${config.dataDir}`);
    fs.writeFileSync(`${config.dataDir}/${config.carritosFile}`, JSON.stringify(carritos));
    console.log(`${moment().format()} helperCarritos.ts 15 INFO Guardando carritos`);

}

export default carritos;