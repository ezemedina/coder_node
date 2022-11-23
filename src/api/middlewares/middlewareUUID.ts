import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const idLlamada = (req,res,next) => {
    let uuid = uuidv4();
    console.log(`${moment().format()} middlewareUUID.ts 6 INFO Identificando llamada id: ${uuid}`);
    res.set("X-UUID", uuid);
    req.uuid = uuid;
    next();
};

export default idLlamada;