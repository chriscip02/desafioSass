

//STOCK DE PRODUCTOS YA CARGADOS

let listaProductos = [
]

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarrito = document.getElementById('carrito-contenedor');


const botonVaciar = document.getElementById('vaciar-carrito');
const contadorCarrito = document.getElementById('contadorCarrito');

const precioTotal = document.getElementById('precioTotal');

let carrito = []

document.addEventListener('DOMContentLoaded' , () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarrito();
    }
})

botonVaciar.addEventListener('click' , () => {
    carrito.length = 0;
    actualizarCarrito();
})



const agregarAlCarrito = (prodId) => {
     //para agregar la cantidad y que no se repita
     const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro
    
     if (existe) { //si ya esta en el carrito actualizamos la cantidad
         const prod = carrito.map (prod => { //creamos un nuevo arreglo e iteramos sobre cada producto y cuando
             // map encuentre cual es el q es igual al que está agregado, y le suma la cantidad
            if (prod.id === prodId){
                prod.cantidad++
            }
            
        })

     }else { // en caso de que el producto no esté, agregamos el producto al carrito como un elemento aparte
        const item = listaProductos.find((prod)  => prod.id === prodId); // trabajamos con las ID, una vez obtenida la ID, lo que vamos a hacer es hacerle un push para agregarlo al carrito
        carrito.push(item);
    }
    actualizarCarrito()
    console.log(carrito);

}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
}


const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach((prod) => {
        const div = document.createElement('div');
        div.className = ('productoEnCarrito');
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div);

        localStorage.setItem('carrito', JSON.stringify(carrito));
    })
    contadorCarrito.innerText = carrito.length;
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}



//MODAL

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})





// FETCH


const obtenerListado = async () => { //le estoy diciendo que esta va a ser una funcion asyncronica
    try { //significa intentá todo lo que esta dentro de las llaves, y sino trae el catch con el error (el catch se escribe abajo)

    let response = await fetch("../json/datos.json");  //con el await le digo que la variable response espere a que el fetch se resuelva

    let result = await response.json(); //que espere a que la promesa se resuelva
    
    //recorremos cada elemento del json que trajimos y los vamos metiendo al array de productos
    result.forEach((producto) => {
        listaProductos.push(producto)
    })


    //aca lo que hacemos es recorrer cada elemento del array del producto y los inyectamos al html
    listaProductos.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
        <h2>${producto.nombre}</h2>
        <img class="imgProductos" src=${producto.img} alt="">
        <h3>${producto.precio}</h3>
        <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        `
        contenedorProductos.appendChild(div);
    
        const boton = document.getElementById(`agregar${producto.id}`);
    
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
            Toastify({
                text: "Producto agregado al carrito",
                duration: 2000,
                gravity: "top", 
                position: "right",
                offset: {
                    x: 120, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: 40 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                },
            }).showToast();
    
        })    
    
    })

    }catch (error) {
        console.log(error)
    }

    
    
        
}
obtenerListado();




