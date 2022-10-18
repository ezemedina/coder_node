const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo || "archivo.txt";
  }

  async save(objeto) {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      let data = JSON.parse(contenido);
      objeto.id = data.length + 1;
      data.push(objeto);
      await fs.promises.writeFile(this.archivo, JSON.stringify(data));
      console.log(`Se guardo el objeto: ${objeto.id}`)
      return data;
    } catch (error) {
      let data = [];
      objeto.id = data.length + 1;
      data.push(objeto);
      await fs.promises.writeFile(this.archivo, JSON.stringify(data));
      console.log(`Se guardo el objeto: ${objeto.id}`)
      return data;
    }
  }

  async getById(numero) {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      JSON.parse(contenido).forEach(element => {
        if ( element.id == numero ) {
          console.log(`Se encontro el objeto ${JSON.stringify(element)}`);
          return element
        }
      });
    } catch {
      console.log("Error al obtener ID");
      return null;
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      console.log(`Contenido: ${JSON.stringify(contenido)}`)
      return JSON.stringify(contenido);
    } catch {
      console.log("Error al abrir el archivo");
      return null;
    }
  }

  async deleteById(numero) {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      let data = JSON.parse(contenido).filter(function (element) {
        return element.id != numero;
      });
      await fs.promises.writeFile(this.archivo, JSON.stringify(data));
      console.log(`Guardando ${this.archivo}`);
      return true;
    } catch (error) {
      console.log(`Error al guardar ${this.archivo}`);
      return false;
    }
  }

  async deleteAll() {
    try {
      await fs.promises.unlink(this.archivo);
      console.log(`Archivo eliminado`);
      return true;
    } catch {
      console.log(`Error al eliminar archivo`);
      return false;
    }
  }
}

let prueba = new Contenedor("prueba.txt");
const objeto = { pepe: "prueba", contenido: 2 };

prueba.save(objeto).then(() => {
  prueba.save(objeto).then(() => {
    prueba.save(objeto).then(() => {
      prueba.save(objeto).then(() => {
        prueba.save(objeto).then(() => {
          prueba.save(objeto).then(() => {
            prueba.save(objeto).then(() => {
              prueba.save(objeto).then(() => {
                prueba.getAll().then(()=> {
                  prueba.getById(5).then(() => {
                    prueba.deleteById(5).then(() => {
                      prueba.deleteAll().then(() => {

                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

