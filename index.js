class Usuario {

    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros || []
        this.mascotas = mascotas || []
    }

    getFullName() {
        let fullName = `${this.nombre} ${this.apellido}`
        console.log(fullName)
        return fullName
    }

    addMascota(nombreMascota) {
        console.log(`Cargando mascota: ${nombreMascota}`)
        this.mascotas.push(nombreMascota)
    }

    countMascotas() {
        let countMascotas = this.mascotas.length
        console.log(`cantidad mascotas: ${countMascotas}`)
        return countMascotas
    }

    addBook(nombreLibro, autor) {
        let data = {nombre: nombreLibro,autor: autor}
        console.log(`Cargando libro: ${nombreLibro}, ${autor}`)
        this.libros.push(data)
    }

    getBookNames() {
        let arrayNombres = []
        this.libros.forEach(element => {
            console.log(`se encontro: ${element.nombre}`)
            arrayNombres.push(element.nombre)
        });
        console.log(arrayNombres)
        return arrayNombres
    }
}

let usuario = new Usuario("Elon","Musk")

usuario.getFullName()
usuario.addMascota("pepito")
usuario.addMascota("pepita")
usuario.countMascotas()
usuario.addBook("El señor de las moscas","William Goldwing")
usuario.addBook("Fundación","Isaac Asimov")
usuario.getBookNames()