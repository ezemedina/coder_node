const moment = require("moment");

class Mensaje {
    constructor(author, message) {
        this.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
        this.author = author;
        this.message = message;
    }
}

module.exports = Mensaje;