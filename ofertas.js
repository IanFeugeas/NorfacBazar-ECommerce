//Funciones para las ofertas semanales

function mostrarOfertas() {
    const contenedorOfertas = document.getElementById('ofertas'); 
    contenedorOfertas.innerHTML = '';

    const productosEnOferta = productos.filter(prod => prod.detalle === 'oferta');

    console.log('Productos en oferta:', productosEnOferta);

    productosEnOferta.forEach((producto) => {
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

        const descuentoPorcentaje = 15;

        const precioDescuento = (producto.precio * (1 - descuentoPorcentaje / 100)).toFixed(2);

        precio.innerHTML = `Precio: <span style="text-decoration: line-through;">$${producto.precio}</span> - $${precioDescuento} (-${descuentoPorcentaje}%)`;

        cardBody.appendChild(nombre);
        cardBody.appendChild(precio);

        tarjeta.appendChild(img);
        tarjeta.appendChild(cardBody);

        contenedorOfertas.appendChild(tarjeta);
    });
}

mostrarOfertas();