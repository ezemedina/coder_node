import moment from "moment";

const accesoAdministrador = (req,res,next) => {
    if (req.headers.administrador === "true"){
        console.log(`${moment().format()} middlewareAdministrador.ts 5 INFO Id: ${req.uuid} Administrador autorizado`);
        next();
    } else {
        res.status(403).send({
            error: -1,
            description: `No se encuantra autorizado para realizar la petición`
        });
        console.log(`${moment().format()} middlewareAdministrador.ts 12 ERROR Id: ${req.uuid} No autorizado`);
    }
};

export default accesoAdministrador;