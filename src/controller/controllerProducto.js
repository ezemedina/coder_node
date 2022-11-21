const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const routerProducto = require("../routes/apiProductos");
const moduleProductos = require('../modules/moduleProductos');

routerProducto.get("/", (req, res) => {
    let uuid = uuidv4();
    console.log(
        `${moment().format()} INFO Id: ${uuid}, Path: /api/productos${req.path
        }, Method: ${req.method}`
    );

    let body = moduleProductos.informacion;
    res.set("X-UUID", uuid);
    res.status(200);
    res.send(body);
    console.log(
        `${moment().format()} INFO Id: ${uuid}, Response: ${JSON.stringify(body)}`
    );
});

routerProducto.post("/", (req, res) => {
    let uuid = uuidv4();
    console.log(
        `${moment().format()} INFO Id: ${uuid}, Path: /api/productos${req.path
        }, Method: ${req.method}, Payload: ${JSON.stringify(req.body)}`
    );
    res.set("X-UUID", uuid);
    let request = req.body;
    if (
        request.title != undefined &&
        request.price != undefined &&
        request.thumbnail != undefined
    ) {
        try {
            let producto = new moduleProductos.Producto(
                request.title,
                request.price,
                request.thumbnail
            );
            let response = producto.save();
            res.status(201);
            res.send(response);
            console.log(
                `${moment().format()} INFO Id: ${uuid}, Response: ${JSON.stringify(
                    response
                )}`
            );
        } catch (error) {
            let response = { Message: "No se pudo procesar la solicitud" };
            res.status(503);
            res.send(response);
            console.log(
                `${moment().format()} ERROR Id: ${uuid}, Response: ${JSON.stringify(
                    response
                )}`
            );
        }
    } else {
        let response = { Message: "Solicitud malformada" };
        res.status(400);
        res.send(response);
        console.log(
            `${moment().format()} ERROR Id: ${uuid}, Response: ${JSON.stringify(
                response
            )}`
        );
    }
});

routerProducto.get("/:id", (req, res) => {
    let uuid = uuidv4();
    console.log(
        `${moment().format()} INFO Id: ${uuid}, Path: /api/productos${req.path
        }, Method: ${req.method}`
    );
    res.set("X-UUID", uuid);
    try {
        let id = parseInt(req.params.id);
        let response = moduleProductos.informacion.find((element) => element.id === id);
        if (response === undefined) {
            throw { Message: `Producto no encontrado con el ID:${id}` };
        }
        res.status(200);
        res.send(response);
        console.log(
            `${moment().format()} INFO Id: ${uuid}, Response: ${JSON.stringify(
                response
            )}`
        );
    } catch (error) {
        res.status(404);
        res.send(error);
        console.log(
            `${moment().format()} ERROR Id: ${uuid}, Response: ${JSON.stringify(
                error
            )}`
        );
    }
});

routerProducto.put("/:id", (req, res) => {
    let uuid = uuidv4();
    console.log(
        `${moment().format()} INFO Id: ${uuid}, Path: /api/productos${req.path
        }, Method: ${req.method}, Payload: ${JSON.stringify(req.body)}`
    );
    res.set("X-UUID", uuid);
    try {
        let id = parseInt(req.params.id);
        let index = moduleProductos.informacion.findIndex((element) => element.id === id);
        if (moduleProductos.informacion[index] === undefined) {
            throw { Message: `Producto no encontrado con el ID:${id}` };
        }
        let request = req.body;
        if (request.title != undefined) {
            moduleProductos.informacion[index].title = request.title;
        } else if (request.price != undefined) {
            moduleProductos.informacion[index].price = request.price;
        } else if (request.thumbanil != undefined) {
            moduleProductos.informacion[index].thumbanil = request.thumbanil;
        }
        let response = moduleProductos.informacion[index];
        res.status(201);
        res.send(response);
        console.log(
            `${moment().format()} INFO Id: ${uuid}, Response: ${JSON.stringify(
                response
            )}`
        );
    } catch (error) {
        res.status(404);
        res.send(error);
        console.log(
            `${moment().format()} ERROR Id: ${uuid}, Response: ${JSON.stringify(
                error
            )}`
        );
    }
});

routerProducto.delete("/:id", (req, res) => {
    let uuid = uuidv4();
    console.log(
        `${moment().format()} INFO Id: ${uuid}, Path: /api/productos${req.path
        }, Method: ${req.method}`
    );
    res.set("X-UUID", uuid);
    try {
        let id = parseInt(req.params.id);
        let index = moduleProductos.informacion.findIndex((element) => element.id === id);
        if (moduleProductos.informacion[index] === undefined) {
            throw { Message: "Producto no encontrado" };
        }
        moduleProductos.informacion.splice(index, 1);
        let body = { Message: "Producto eliminado" };
        res.status(200);
        res.send(body);
        console.log(
            `${moment().format()} INFO Id: ${uuid}, Response: ${JSON.stringify(body)}`
        );
    } catch (error) {
        res.status(404);
        res.send(error);
        console.log(
            `${moment().format()} ERROR Id: ${uuid},Response: ${JSON.stringify(
                error
            )}`
        );
    }
});

module.exports = { informacion, Producto };