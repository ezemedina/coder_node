module.exports = class Producto {
    constructor({title, price, thumbnail}) {
        this.title = this.titleCheck(title);
        this.price = this.priceCheck(price);
        this.thumbnail = this.thumbnailCheck(thumbnail);
    }

    titleCheck(title) {
        if (title) {
            return title;
        } else {
            throw new Error('No se encontro el atributo title')
        }
    }

    priceCheck(price) {
        if (price) {
            return price;
        } else {
            throw new Error('No se encontro el atributo price')
        }
    }

    thumbnailCheck(thumbnail) {
        if (thumbnail) {
            return thumbnail;
        } else {
            throw new Error('No se encontro el atributo thumbnail')
        }
    }
}