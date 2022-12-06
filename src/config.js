let config = {
    port: 8080,
    mysql: {
        client: 'mysql',
        connection: {
            host : 'localhost',
            port : 3306,
            user : 'root',
            password : 'root',
            database : 'tienda',
            charset : 'utf8mb4'
        }  
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: './database/mensajes.sqlite'
        },
        useNullAsDefault: true
    }
}

module.exports = config;