let carrito = [];

const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
const contador = document.getElementById('contador');
const botonVerCarrito = document.getElementById('ver-carrito');
const ventanaCarrito = document.getElementById('carrito');


// Delegar evento a todos los botones después que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const producto = e.target.closest('.producto');
            const nombre = producto.querySelector('h3').textContent;
            const precio = parseFloat(producto.dataset.precio);

            const productoExistente = carrito.find(p => p.nombre === nombre);
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ nombre, precio, cantidad: 1 });
            }

            actualizarCarrito();
        });
    });
});

// Eliminar producto individual
function eliminarProducto(nombre) {
    carrito = carrito.filter(p => p.nombre !== nombre);
    actualizarCarrito();
}

// Vaciar todo el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Actualizar la vista del carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(producto => {
        const item = document.createElement('li');
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <span>${producto.nombre} x${producto.cantidad}</span>
                <span>$${(producto.precio * producto.cantidad).toLocaleString('es-CO')}</span>
                <button class="eliminar" data-nombre="${producto.nombre}">❌</button>
            </div>
        `;
        listaCarrito.appendChild(item);

        total += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;
    });

    totalCarrito.textContent = `$${total.toLocaleString('es-CO')}`;
    contador.textContent = cantidadTotal;

    // Eventos de eliminación
    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', () => {
            eliminarProducto(boton.dataset.nombre);
        });
    });
}

// Estilo dinámico para la ventana flotante del carrito
ventanaCarrito.style.position = 'fixed';
ventanaCarrito.style.top = '80px';
ventanaCarrito.style.right = '20px';
ventanaCarrito.style.backgroundColor = 'black';
ventanaCarrito.style.color = 'white';
ventanaCarrito.style.border = '2px solid #000';
ventanaCarrito.style.borderRadius = '10px';
ventanaCarrito.style.boxShadow = '0 4px 12px rgba(10, 7, 7, 0.3)';
ventanaCarrito.style.padding = '15px';
ventanaCarrito.style.zIndex = '999';
ventanaCarrito.style.width = '300px';
ventanaCarrito.style.maxHeight = '400px';
ventanaCarrito.style.overflowY = 'auto';

// Botón para vaciar el carrito
const botonVaciar = document.createElement('button');
botonVaciar.textContent = 'Vaciar Carrito';
botonVaciar.style.marginTop = '10px';
botonVaciar.style.width = '100%';
botonVaciar.style.backgroundColor = '#000';
botonVaciar.style.color = '#fff';
botonVaciar.style.border = 'none';
botonVaciar.style.padding = '10px';
botonVaciar.style.borderRadius = '5px';
botonVaciar.style.cursor = 'pointer';
botonVaciar.addEventListener('click', vaciarCarrito);
ventanaCarrito.appendChild(botonVaciar);

// Mostrar/Ocultar ventana completa del carrito
botonVerCarrito.addEventListener('click', () => {
    
    if (ventanaCarrito.classList[0].contains('oculto')) {
        ventanaCarrito.classList.remove('oculto');
    } else {
        ventanaCarrito.classList.add('oculto');
    }
});

// Minimizar lista de productos
const toggleLista = document.getElementById('toggle-lista');
const lista = document.getElementById('lista-carrito');

toggleLista.addEventListener('click', () => {
    if (lista.style.display === 'none') {
        lista.style.display = 'block';
        toggleLista.textContent = '⏬ Ocultar productos';
    } else {
        lista.style.display = 'none';
        toggleLista.textContent = '⏫ Mostrar productos';
    }
});
toggleLista.addEventListener('click', () => {
    lista.classList.toggle('oculto');
    toggleLista.textContent = lista.classList.contains('oculto')
        ? '⏫ Mostrar productos'
        : '⏬ Ocultar productos';
});
const botonCerrar = document.getElementById('cerrar-carrito');

botonCerrar.addEventListener('click', () => {
    ventanaCarrito.classList.add('oculto');
});

