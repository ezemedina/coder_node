import productos from "../helpers/helpersProductos";

export default class Producto {
    public id:number;
    public timestamp:number;
    public nombre:string;
    public descripcion:string;
    public codigo:string;
    public imagen:string;
    public precio:string;
    public stock: number;

    constructor ( nombre, descripcion, codigo, imagen, precio, stock ){
        this.id = this.obtenerID();
        this.timestamp = Date.now();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
    }

    obtenerID(){
        let indiceMaximo = productos.length;
        indiceMaximo++;
        return (indiceMaximo);
    };

    guardarProducto(){
        try {
            productos.push(this);
            return true
        } catch (error) {
            return false
        }
    }
}