let stockProductos = [
]

const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito');

const contadorCarrito = document.getElementById('contadorCarrito');

let carrito = []

//Funcion para darle funcionalidad al boton vaciar carrito. Cada vez que se le de click la longitud del carrito será igual a 0

botonVaciar.addEventListener('click' , () => {
    carrito.length = 0
    actualizarCarrito()
})


// FETCH para traer el stock desde el json

const obtenerListado = async () => { //le estoy diciendo que esta va a ser una funcion asyncronica
    try { //significa intentá todo lo que esta dentro de las llaves, y sino trae el catch con el error (el catch se escribe abajo)

    let response = await fetch("../json/datos.json");  //con el await le digo que la variable response espere a que el fetch se resuelva

    let result = await response.json(); //que espere a que la promesa se resuelva
    
    //recorremos cada elemento del json que trajimos y los vamos metiendo al array de productos
    result.forEach((producto) => {
        stockProductos.push(producto)
    })


//armamos un foreach para colgar en el dom cada uno de los elementos del array contenido en el json

stockProductos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
    <img src=${producto.img} alt="">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`);

    boton.addEventListener('click' , () => {
        agregarAlCarrito(producto.id)
    })
})

}catch (error) {
    console.log(error)
}
}

obtenerListado();


//Funcion para agregar al carrito

const agregarAlCarrito = (prodId) => {
    const item = stockProductos.find((prod) => prod.id === prodId)
    carrito.push(item)
    actualizarCarrito()
    console.log(carrito)
}

//Funcion para borrar del carrito

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito();
}


// funcion para visualizar los productos agregados al carrito en el modal, hice basicamente lo mismo que con el stock de productos, solo que ahora vamos a recorrer el array de carrito en vez del array de stock y a cada producto vamos a inyectarlo en el html

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i>/button>`

        contenedorCarrito.appendChild(div);
    })
    contadorCarrito.innerText = carrito.length; // igualamos el numero del carrito a la longitud del array

}



