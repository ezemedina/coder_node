let informacion = [];
let idProducto = 1;

class Producto {
    constructor(title, price, thumbnail) {
        this.id = this.getID();
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }

    getID() {
        return idProducto++;
    }

    save() {
        informacion.push(this);
        return this;
    }
}

module.exports = { Producto, informacion } 