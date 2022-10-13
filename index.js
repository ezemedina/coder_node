const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo || "archivo.txt";
  }

  async save(objeto) {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      console.log(contenido);
      let data = JSON.parse(contenido);
      objeto.id = data.length + 1;
      data.push(objeto);
      await fs.promises.writeFile(this.archivo, JSON.stringify(data));
      return data;
    } catch (error) {
      let contenido = [];
      objeto.id = contenido.length + 1;
      contenido.push(objeto);
      await fs.promises.writeFile(this.archivo, JSON.stringify(contenido));
      return contenido;
    }
  }

  async getById(numero) {
    const contenido = await fs.promises.readFile(this.archivo, "utf-8");
    let busqueda = JSON.parse(contenido).find(
      (element) => element.id === numero
    );
    return busqueda;
  }

  async getAll() {
    const contenido = await fs.promises.readFile(this.archivo, "utf-8");
    return JSON.stringify(contenido);
  }

  async deleteById(numero) {
    const contenido = await fs.promises.readFile(this.archivo, "utf-8");
    try {
      let data = JSON.parse(contenido).filter(function (element) {
        return element.id != numero;
      });
      await fs.promises.writeFile(this.archivo, JSON.stringify(data));
      console.log(`Guardando ${this.file}`);
    } catch (error) {
      console.log(`Error al guardar ${this.file}`);
    }
  }

  async deleteAll() {
    await fs.promises.unlink(this.archivo, (error) => {
      if (error) {
        console.log(`Error al eliminar: ${this.file}`);
      } else {
        console.log(`Eliminando ${this.file}`);
      }
    });
  }
}

let prueba = new Contenedor("prueba.txt");
let objeto = { pepe: "prueba", contenido: 2 };

prueba.save(objeto).then((ret) => {
  console.log(ret);
});

prueba.save(objeto).then((ret) => {
  console.log(ret);
});

prueba.save(objeto).then((ret) => {
  console.log(ret);
});

/*prueba.save(objeto).then(ret => {
    if (ret === true) {
        console.log('Registro dado de alta')
    } else {
        console.log('Error al dar de alta el registro')
    }
})

prueba.getById(5).then(ret => {
    if (ret === null || ret === undefined) {
        console.log('Registro no encontrado')
    } else {
        console.log(ret)
    }
})

/*prueba.deleteById(5).then()
prueba.deleteAll().then()*/
