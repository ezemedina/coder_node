const api = "http://localhost:8080"

let carritoId = "";
let contenedorProductos = document.getElementById("contenedor-productos");

fetch(`${api}/api/productos`)
.then(response => response.json())
.then((data) => {
    if (data.length === 0) {
        contenedorProductos.innerHTML = `
        <div class="alert alert-primary" role="alert">
            No se encontraron productos
        </div>`;
    } else {
        contenedorProductos.innerHTML = `<div class="row" id="productos"></div>`;
        let productos = document.getElementById("productos");
        data.forEach(element => {
            productos.innerHTML += `
            <div class="col-4">
                <div class="card my-3">
                    <img src="${element.imagen}" class="card-img-top" alt="${element.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${element.nombre}</h5>
                        <p class="m-0 p-0 display-6 h6" style="font-size: 10px">SKU: ${element.codigo} Stock: ${element.stock}</p>
                        <p class="card-text m-0 mt-1">${element.descripcion}</p>
                        <p>${element.precio}</p>
                        <button class="btn btn-primary" onclick="agregarCarrito(${element.id})" >Agregar al Carrito</button>
                    </div>
                </div>
            </div>`;
        });
    }
});

function actualizarCarrito() {
    let cantidadCarrito = document.getElementById('cantidadCarrito');

    fetch(`${api}/api/carrito/${carritoId}/productos`)
    .then(response => response.json())
    .then((data => {
        cantidadCarrito.classList.remove('visually-hidden');
        cantidadCarrito.innerHTML = data.length;
        let contenidoCarrito = document.getElementById('contenido-carrito');
        contenidoCarrito.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Codigo</th>
                <th scope="col">Precio</th>
                </tr>
            </thead>
            <tbody id="contenidoTabla">
            </tbody>
        </table>
        `;
        let contenidoTabla = document.getElementById('contenidoTabla');
        data.forEach(element => {
            contenidoTabla.innerHTML += `
            <tr>
                <th scope="row">${element.id}</th>
                <td>${element.nombre}</td>
                <td>${element.codigo}</td>
                <td>${element.precio}</td>
                <td><button type="button" class="btn btn-danger" onclick="eliminarProductoCarrito(${element.id})"><i class="bi bi-trash-fill"></i></button></td>
            </tr>
            `;
        });
    }))
}

function agregarCarrito(id) {
    let idParsed = parseInt(id);
    let body = {
        id: idParsed
    };
    
    if (carritoId === "") {
        fetch(`${api}/api/carrito`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((data) => {
            carritoId = data.id;
            fetch(`${api}/api/carrito/${carritoId}/productos`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(body)
            })
            .then(response => response.json())
            .then(() => {
                actualizarCarrito();
            });
        });
    } else {
        fetch(`${api}/api/carrito/${carritoId}/productos`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(response => response.json())
        .then(() => {
            actualizarCarrito();
        });
    }
}

function eliminarProductoCarrito(id) {
    let idParsed = parseInt(id);
    fetch(`${api}/api/carrito/${carritoId}/productos/${idParsed}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }  
    })
    .then(response => response.json())
    .then(() =>{
        actualizarCarrito();
        actualizarCarrito();
    });
}

function eliminarCarrito() {
    let cantidadCarrito = document.getElementById('cantidadCarrito');
    let contenidoCarrito = document.getElementById('contenido-carrito');
    let btnCerrarCarrito = document.getElementById('btnCerrarCarrito');
    
    if (carritoId != ""){
        fetch(`${api}/api/carrito/${carritoId}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }  
        })
        .then(response => response.json())
        .then(() => {
            carritoId = "";
            cantidadCarrito.classList.add('visually-hidden');
            contenidoCarrito.innerHTML = `
            <div class="alert alert-primary" role="alert">
                Sin Productos !!!
            </div>`;
            btnCerrarCarrito.click();
        });
    } else {
        btnCerrarCarrito.click();
        
    }
}