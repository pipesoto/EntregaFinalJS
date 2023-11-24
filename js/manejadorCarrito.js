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

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find(
    (item) => item.producto === producto && item.categoria === categoria
  );

  if (productoExistente) {
    // Si el producto ya está en el carrito, incrementa la cantidad
    productoExistente.cantidad += cantidad;
    productoExistente.precioTotal = precios[categoria][producto].precio * productoExistente.cantidad;

  } else {
    // Si el producto no está en el carrito, lo agrega
    const precio = precios[categoria][producto].precio;
    const precioTotal = precio * cantidad;
    const item = {
      categoria: categoria,
      producto: producto,
      cantidad: cantidad,
      precioTotal: precioTotal,
    };
    carrito.push(item);
  }

  // Actualiza la tabla 
  actualizarCarrito();
}

function actualizarCarrito() {
  // Limpia la tabla antes de volver a llenarla
  restablecerTabla();

  // Llena la tabla con los productos actualizados
  carrito.forEach(item => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.producto}</td>
      <td>${item.categoria}</td>
      <td>$${precios[item.categoria][item.producto].precio}</td>
      <td>${item.cantidad}</td>
      <td><button class="btn btn-danger" onclick="eliminarDelCarrito(this)">Eliminar</button></td>
    `;
    fila.setAttribute('data-id', `${item.producto}-${item.categoria}`);
    tablaCuerpo.appendChild(fila);
  });

  // Guarda el carrito actualizado en localStorage
  guardarCarritoEnLocalStorage();

  // Muestra la notificación de producto agregado al carrito
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
  mostrarBoleta(); 
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
  guardarCarritoEnLocalStorage(); 
  mostrarBoleta(); 
}
