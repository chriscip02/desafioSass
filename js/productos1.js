

//STOCK DE PRODUCTOS YA CARGADOS

let listaProductos = [
]

const contenedorProductos = document.getElementById('contenedor-productos');






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




