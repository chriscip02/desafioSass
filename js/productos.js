let stockProductos = [
]

const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito');

const precioTotal = document.getElementById('precioTotal');

const contadorCarrito = document.getElementById('contadorCarrito');

let carrito = []


//LOCAL STORAGE, para que al actualizar no se me borren los productos cargados al carrito. aqui hago el get, el set lo hacemos en el foreach del carrito, debajo del appenchild una vez que se haya cargado todo

document.addEventListener('DOMContentLoaded', () => {
    
        carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        actualizarCarrito();
    }
)


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
    <div class='products'>
    <div class='product'>
        <div class='contenedor-img-producto'>
            <img class=' img-fluid img-producto' src=${producto.img} alt=''>
        </div>
        <div class='namePrice'>
            <h3>${producto.nombre}</h3>
            <span>Precio:$ ${producto.precio}</span>
        </div>
        

        <p>${producto.desc}</p>

        <div class='stars'>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
        </div>

        <div class='add'>
            <button id="agregar${producto.id}">Agregar al Carrito</button>
        </div>
        </div>
    </div>    
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
    const existe = carrito.some (prod => prod.id === prodId) //esta sentencia hasta el else hace que si el producto esta repetido se agregue como cantidad y no como otro producto mas

    if (existe) {
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {


    const item = stockProductos.find((prod) => prod.id === prodId)
    carrito.push(item);
    
    console.log(carrito);
}
actualizarCarrito();
}

//Funcion para borrar del carrito

const eliminarDelCarrito = (prodId) => {
    const prodEnCarrito = prodId
    carrito = carrito.filter((prod) => prod.id !== prodEnCarrito) //este filtro lo que hace es traer todos los productos menos el que cumple la condicion
    actualizarCarrito();
}


// funcion para visualizar los productos agregados al carrito en el modal, hice basicamente lo mismo que con el stock de productos, solo que ahora vamos a recorrer el array de carrito en vez del array de stock y a cada producto vamos a inyectarlo en el html

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <div>
            <img class="img-fluid img-carrito" src=${prod.img}>
        </div>

        <div>
            <p>${prod.nombre}</p>
            <p>Precio: $${prod.precio}</p>
            <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
            <button onclick="eliminarDelCarrito(${prod.id})" class="btn btn-danger">Eliminar</button>
        </div>
        `

        contenedorCarrito.appendChild(div);

       guardarStorage();
    })
    contadorCarrito.innerText = carrito.length; // igualamos el numero del carrito a la longitud del array

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio*prod.cantidad, 0) // con esto pongo en funcionamiento precio total del carrito. por cada producto que recorre el foreach va a ir sumando al acumulador el precio del producto, siendo 0 el valor inicial del acumulador 

}

function guardarStorage(){
    localStorage.setItem('carrito' , JSON.stringify(carrito));

}



