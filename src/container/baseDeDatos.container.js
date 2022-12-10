module.exports = class gestorBaseDeDatos {
    
    constructor(connectionParams) {
        this.config = connectionParams;
    }

    async crearTablaMensjes(){
        const knex = require("knex")(this.config)
        return await knex.schema.createTable('mensajes', function (table) {
            table.increments('id').primary();
            table.text('author', 128);
            table.text('message', 255);
            table.text('timestamp', 19);
        })
        .then(() => {
            console.log(`INFO tabla creada mensajes`)
        })
        .catch((err) => {
            //console.log(`ERROR ${err.message}`);
        })
        .finally(() => {
            knex.destroy();
        });
    }

    async crearTablaProdcutos(){
        const knex = require("knex")(this.config)
        return await knex.schema.createTable('productos', function (table) {
            table.increments('id').primary();
            table.text('title', 255).notNullable();
            table.text('price', 255).notNullable();
            table.text('thumbnail', 255).notNullable();
            table.charset('utf8mb4');
            table.collate('utf8mb4_bin');
        })
        .then(() => {
            console.log(`INFO tabla creada productos`)
        })
        .catch((err) => {
            //console.log(`ERROR ${err.message}`);
        })
        .finally(() => {
            knex.destroy();
        });
    }


    async agregarElemento(elemento, tabla){
        const knex = require("knex")(this.config)
        return await knex.insert(elemento)
        .into(tabla)
        .then((data) =>{
            if (tabla === 'mensajes'){
                return;
            } else if (tabla === 'productos') {
                return this.obtenerElementoPorId(data,tabla)
                .then((data) => {return data})
            }
        })
        .catch((err) => { throw new Error(err); })
        .finally(() => {
            knex.destroy();
        });
    }

    async obtenerElementos(tabla) {
        const knex = require("knex")(this.config)
        return await knex.select('*').from(tabla)
        .then((rows) => {
            if (tabla === 'mensajes') {
                let elementos = [];
                rows.forEach(row => {
                    let elemento = {
                        id: row['id'],
                        timestamp: row['timestamp'],
                        author: row['author'],
                        message: row['message']
                    }
                    elementos.push(elemento);
                });
                return elementos;
            } else if (tabla === 'productos'){
                let elementos = [];
                rows.forEach(row => {
                    let elemento = {
                        id: row['id'],
                        title: row['title'],
                        price: row['price'],
                        thumbnail: row['thumbnail']
                    }
                    elementos.push(elemento);
                });
                return elementos;
            } else  {
                return "error"
            }
        })
        .catch((err) => { throw err })
        .finally(() => {
            knex.destroy();
        });
    }

    async obtenerElementoPorId(idProducto, tabla) {
        const knex = require("knex")(this.config)
        return await knex.select('*').where('id', '=', idProducto).from(tabla).first()
        .then((row) => {
            if (row) {
                let elemento = {
                    id: row['id'],
                    title: row['title'],
                    price: row['price'],
                    thumbnail: row['thumbnail']
                }
                return elemento;
            } else {
                throw new Error('no se encuentra el registro');
            }
        })
        .catch((err) => {throw err;})
        .finally(() => {
            knex.destroy();
        });
    }

    async actualizarElementoPorId(idProducto,productoUpdate, tabla) {
        const knex = require("knex")(this.config)
        return await knex(tabla).where('id', '=', idProducto).update(productoUpdate)
        .then((data) => {
            if (data === 0) {
                throw new Error('Registro no encontrado');
            }
            return data;
        })
        .catch((err) => {throw new Error(err);})
        .finally(() => {
            knex.destroy();
        });
    }

    async borrarElementoPorId(idProducto, tabla) {
        const knex = require("knex")(this.config)
        return await knex(tabla).where('id', '=', idProducto).del()
        .then((data) => {
            if (data === 0) {
                throw new Error('Resgistro no encontrado');
            }

            return `Elemento con el ID: ${idProducto}`;
        })
        .catch((err) => {throw new Error(err);})
        .finally(() => {
            knex.destroy();
        });
    }
}