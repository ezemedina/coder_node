const config = require('../config');

const crearTablaProductos = async () => {
    const knex = require('knex')(config.mysql);
    await knex.schema.createTable('productos', function (table) {
        table.increments('id').primary();
        table.text('title', 255).notNullable();
        table.text('price', 255).notNullable();
        table.text('thumbnail', 255).notNullable();
        table.charset('utf8mb4');
        table.collate('utf8mb4_bin');
    })
    .catch((err) => {throw err})
    .finally(() => {
        knex.destroy();
    });
}

const obtenerProductosDb = async () => {
    const knex = require('knex')(config.mysql);
    return await knex.select('*')
    .from('productos')
    .then((rows) => {
        let elementos = [];
        for (row of rows) {
          let elemento = {
            id: row['id'],
            title: row['title'],
            price: row['price'],
            thumbnail: row['thumbnail']
          }
          elementos.push(elemento);
        }
        return elementos;
    })
    .catch((err) => { throw err })
    .finally(() => {
        knex.destroy();
    });
}

const generarProductoDb = (producto) => {
    const knex = require('knex')(config.mysql);
    return knex.insert(producto)
    .into('productos')
    .catch((err) => { throw err })
    .finally(() => {
        knex.destroy();
    });
}

const obtenerProductoPorIdDb = async (idProducto) => {
    const knex = require('knex')(config.mysql);
    return await knex.select('*').where('id', idProducto)
    .from('productos')
    .then((rows) => {
        if (rows.length === 0) {
            throw new Error();
        }
        for (row of rows) {
            let elemento = {
                id: row['id'],
                title: row['title'],
                price: row['price'],
                thumbnail: row['thumbnail']
            }
            return elemento;
        }
    })
    .catch((err) => { throw err })
    .finally(() => {
        knex.destroy();
    });
}

const actualizarProductoIdDb = async (idProducto,productoUpdate) => {
    const knex = require('knex')(config.mysql);
    return await knex('productos')
    .where('id', '=', idProducto)
    .update(productoUpdate)
    .then((data) => {
        if (data === 0) {
            throw new Error();
        }
    })
    .catch((err) => { throw err })
    .finally(() => {
        knex.destroy();
    });
}

const eliminarProductoIdDb = async (idProducto) => {
    const knex = require('knex')(config.mysql);
    return await knex('productos')
    .where('id', '=', idProducto)
    .del()
    .then((data) => {
        if (data === 0) {
            throw new Error();
        }
    })
    .catch((err) => { throw err })
    .finally(() => {
        knex.destroy();
    });
}


module.exports = { crearTablaProductos , obtenerProductosDb, generarProductoDb, obtenerProductoPorIdDb, actualizarProductoIdDb, eliminarProductoIdDb }