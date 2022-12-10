const moment = require("moment");

class Mensaje {
    constructor({author, message}) {
        this.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
        this.author = this.authorCheck(author);
        this.message = this.messageCheck(message);
    }

    authorCheck(author) {
        if (author) {
            return author;
        } else {
            throw new Error('No se encontro el atributo author')
        }
    }

    messageCheck(message) {
        if (message) {
            return message;
        } else {
            throw new Error('No se encontro el atributo primessagece')
        }
    }
}

module.exports = Mensaje;