//Funciones para mostrar los productos y paginarlos de a 10

let productosPorPagina = 10;
let paginaActual = 1;

function mostrarProductos(pagina) {
    const contenedorProductos = document.getElementById('contenedor-productos');
    contenedorProductos.innerHTML = '';

    const inicio = (pagina-1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    const productosEnPagina = productos.slice(inicio, fin);

    productosEnPagina.forEach((producto) => {

        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card', 'm-3');
        tarjeta.style.width = '18rem';

        const img = document.createElement('img');
        img.src = producto.imagen;
        img.classList.add('card-img-top');
        img.alt = producto.nombre;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const nombre = document.createElement('h5');
        nombre.classList.add('card-title');
        nombre.textContent = producto.nombre;

        const precio = document.createElement('p');
        precio.classList.add('card-text');
        precio.textContent = `Precio: $${producto.precio}`;

        cardBody.appendChild(nombre);
        cardBody.appendChild(precio);

        tarjeta.appendChild(img);
        tarjeta.appendChild(cardBody);

        contenedorProductos.appendChild(tarjeta);

    });

    actualizarBotonesPaginacion();

}

function actualizarBotonesPaginacion() {

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const contenedorPaginacion = document.getElementById('paginacion');
    contenedorPaginacion.innerHTML = '';

    if (paginaActual > 1) {

        const btnAnterior = document.createElement('button');
        btnAnterior.textContent = 'Anterior';
        btnAnterior.classList.add('btn', 'btn-primary', 'm-2');
        btnAnterior.onclick = () => cambiarPagina(paginaActual - 1);
        contenedorPaginacion.appendChild(btnAnterior);
    }
    if (paginaActual < totalPaginas) {

        const btnSiguiente = document.createElement('button');
        btnSiguiente.textContent = 'Siguiente';
        btnSiguiente.classList.add('btn', 'btn-primary', 'm-2');
        btnSiguiente.onclick = () => cambiarPagina(paginaActual + 1);
        contenedorPaginacion.appendChild(btnSiguiente);
    }
}

function cambiarPagina(nuevaPagina) {

    paginaActual = nuevaPagina;
    mostrarProductos(paginaActual);

}

document.addEventListener('DOMContentLoaded', () => {

    mostrarProductos(paginaActual);

});

//Filtrar productos por nombre en el input de busqueda//

const formularioBusqueda = document.querySelector('form');
const inputBusqueda = document.querySelector('input[type="search"]');

function buscarProducto(e) {
    e.preventDefault();

    const terminoBusqueda = inputBusqueda.value.toLowerCase()

    const productosFiltrados = productos.filter((producto) => 
        producto.nombre.toLowerCase().includes(terminoBusqueda)
);

mostrarProductosFiltrados(productosFiltrados);

}

function mostrarProductosFiltrados(productosFiltrados) {

    const contenedorProductos = document.getElementById('contenedor-productos');
    contenedorProductos.innerHTML = '';

    productosFiltrados.forEach((producto) => {

        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card', 'm-3');
        tarjeta.style.width = '18rem';

        const img = document.createElement('img');
        img.src = producto.imagen;
        img.classList.add('card-img-top');
        img.alt = producto.nombre;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const nombre = document.createElement('h5');
        nombre.classList.add('card-title');
        nombre.textContent = producto.nombre;

        const precio = document.createElement('p');
        precio.classList.add('card-text');
        precio.textContent = `Precio: $${producto.precio}`;

        cardBody.appendChild(nombre);
        cardBody.appendChild(precio);

        tarjeta.appendChild(img);
        tarjeta.appendChild(cardBody);

        contenedorProductos.appendChild(tarjeta);
    });

    if (productosFiltrados.length === 0) {
        const mensajeNoResultados = document.createElement('p');
        mensajeNoResultados.textContent = 'No se encontraron productos con ese nombre.';
        contenedorProductos.appendChild(mensajeNoResultados);
    }
}

formularioBusqueda.addEventListener('submit', buscarProducto);

//Funcion para validar el formulario

function validarFormulario(){
    const nombreApellido = document.getElementById('nombreApellido').value.trim();
    const nombreNegocio = document.getElementById('nombreNegocio').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (nombreApellido === '' || nombreApellido.length < 3) {
        alert('Por favor, ingresa un nombre y apellido válido (minimo 3 caracteres).');
        return false;
    }

    if (nombreNegocio === '' || nombreNegocio < 3) {
        alert('Por favor, ingresa un nombre de negocio válido (minimo 3 caracteres).');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electronico válido.');
        return false;
    }

    const telefonoRegex = /^[0-9]{10}$/;
    if (telefono === '' || !telefonoRegex.test(telefono)) {
        alert('Por favor, ingresa un número de teléfono válido (exactamente 10 dígitos).');
        return false;
    }

    if (mensaje === '' || mensaje.length < 10) {
        alert('El mensaje debe tener al menos 10 caracteres.');
        return false;
    }

    return true;

}

//Funcion para recibir por email los datos del formulario

function sendEmail(event) {
    event.preventDefault();

    if (validarFormulario()) {
        const btn = document.getElementById('button');
        btn.textContent = 'Enviando...';

        const formData = {
            email: document.getElementById('email').value,
            nombreApellido: document.getElementById('nombreApellido').value,
            mensaje: document.getElementById('mensaje').value,
            telefono: document.getElementById('telefono').value,
            nombreNegocio: document.getElementById('nombreNegocio').value
        };

        emailjs.send("service_d5udd79", "template_aspl4p6", formData)
            .then(() => {
                btn.textContent = 'Enviar';
                alert('¡Consulta enviada con éxito!');
                document.getElementById('contact-form').reset(); // Resetea el formulario después de enviar
            }, (err) => {
                btn.textContent = 'Enviar';
                alert('Hubo un error al enviar la consulta: ' + JSON.stringify(err));
            });
    }
}

document.getElementById('contact-form').addEventListener('submit', sendEmail);


