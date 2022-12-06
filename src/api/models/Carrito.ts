import carritos from "../helpers/helperCarritos";
import Producto from "./Producto";

export default class Carrito {
    public id:number;
    public timestamp:number;
    public productos:Array<Producto>;


    constructor () {
        this.id = this.obtenerID();
        this.timestamp = Date.now();
        this.productos = [];
    }

    obtenerID(){
        let indiceMaximo = carritos.length;
        indiceMaximo++;
        return (indiceMaximo);
    };

    guardarCarrito(){
        try {
            carritos.push(this);
            return true
        } catch (error) {
            return false
        }
    }
}