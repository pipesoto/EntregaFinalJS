function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    return JSON.parse(carritoGuardado);
  }
  return [];
}

function limpiarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify([]));
}

const carrito = cargarCarritoDesdeLocalStorage();

// Función para verificar la visibilidad del botón de "Pagar" y ocultarlo si no hay productos en el carrito

function agregarAlCarrito() {
  const categoria = categoriaSelect.value;
  const producto = productoSelect.value;
  const cantidad = parseInt(cantidadInput.value);

  if (cantidad <= 0) {
    Swal.fire("Debes ingresar una cantidad mayor a 0");
    return;
  }

  const precio = precios[categoria][producto].precio;
  const precioTotal = precio * cantidad;
  const item = {
    categoria: categoria,
    producto: producto,
    cantidad: cantidad,
    precioTotal: precioTotal,
  };
  carrito.push(item); // Agregar el producto al carrito
  const fila = document.createElement("tr");
  fila.innerHTML = `
                <td>${producto}</td>
                <td>${categoria}</td>
                <td>$${precio}</td>
                <td>${cantidad}</td>
                <td><button class="btn btn-danger" onclick="eliminarDelCarrito(this)">Eliminar</button></td>
            `;
  fila.setAttribute('data-id', `${producto}-${categoria}`);
  tablaCuerpo.appendChild(fila);
  guardarCarritoEnLocalStorage();
  Toastify({
    text: "Se agregó el producto a tu carrito",
    className: "info",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  mostrarBoleta();
}



function eliminarDelCarrito(btn) {
  const fila = btn.parentNode.parentNode;
  const producto = fila.getElementsByTagName("td")[0].textContent;
  const categoria = fila.getElementsByTagName("td")[1].textContent;
  const cantidad = parseInt(fila.getElementsByTagName("td")[3].textContent);

  // Ajusta el carrito para reflejar la eliminación del producto
  const itemIndex = carrito.findIndex(
    (item) => item.producto === producto && item.categoria === categoria
  );
  if (itemIndex !== -1) {
    carrito.splice(itemIndex, 1);
  }

  precios[categoria][producto].cantidad += cantidad; // Incrementa la cantidad en el objeto de precios
  fila.remove();
  guardarCarritoEnLocalStorage();
  Toastify({
    text: "Se eliminó el producto de tu carrito",
    className: "info",
    style: {
      background: "linear-gradient(to right, #f43636, #f43636)",
    },
  }).showToast();
  mostrarBoleta(); // Actualiza la boleta
}
function eliminarDelCarritoDesdeBoleta(btn) {
  const fila = btn.parentNode.parentNode;
  const producto = fila.getElementsByTagName("td")[0].textContent;
  const categoria = fila.getElementsByTagName("td")[1].textContent;
  const id = `${producto}-${categoria}`;

  // Elimina la fila de la tabla principal
  const filaEnTablaPrincipal = document.querySelector(`#tablaCuerpo tr[data-id='${id}']`);
  if (filaEnTablaPrincipal) {
      filaEnTablaPrincipal.remove();
  }

  const itemIndex = carrito.findIndex(
    (item) => item.producto === producto && item.categoria === categoria
  );
  if (itemIndex !== -1) {
    carrito.splice(itemIndex, 1);
  }

  fila.remove();
  Toastify({
    text: "Se eliminó el producto de tu boleta",
    className: "info",
    style: {
      background: "linear-gradient(to right, #f43636, #f43636)",
    },
  }).showToast();
  guardarCarritoEnLocalStorage(); // Guardar el carrito actualizado en localStorage
  mostrarBoleta(); // Actualiza el modal
}
