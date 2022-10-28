const abrirCarrito = document.getElementById('botonCarrito');

const cerrarCarrito =document.getElementById('carritoCerrar');

const modal = document.querySelector('.modal-contenedor');

const modalDesactivado = document.querySelector('#carritoCerrar');

abrirCarrito.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('modalActive');
});

carritoCerrar.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modalActive');
});

