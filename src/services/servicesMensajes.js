const config = require('../config');

const crearTablaMensajes = async () => {
    const knex = require('knex')(config.sqlite3);
    await knex.schema.createTable('messages', function (table) {
        table.increments('Id').primary();
        table.text('author', 128);
        table.text('message', 255);
        table.text('timestamp', 19);
    })
    .catch((err) => {throw err})
    .finally(() => {
        knex.destroy();
    });
}

const guardarMensaje =  async (Mensaje) => {
    const knex = require('knex')(config.sqlite3);
    await knex('messages').insert(Mensaje)
        .catch((err) => {console.log(err); throw err})
        .finally(() => {
            knex.destroy();
        });
};

const obtenerMensajes =  async () => {
    const knex = require('knex')(config.sqlite3);
    return await knex.select('author', 'message', 'timestamp')
    .from('messages')
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    });
};

module.exports = { crearTablaMensajes , guardarMensaje, obtenerMensajes };