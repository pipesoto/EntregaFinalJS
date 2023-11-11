      

function realizarPago() {

  // Limpia el carrito
  carrito.length = 0;
  restablecerTabla();
  
  // Limpia el carrito en localStorage
  limpiarCarritoEnLocalStorage();
  
  // Muestra la alerta SweetAlert2
  Swal.fire({
  position: 'top',
  icon: 'success',
  title: 'Tu compra se realizó con exito',
  showConfirmButton: false,
  timer: 2000
  });
  
  // Oculta el modal de la boleta
  $('#boletaModal').modal('hide');
  
  }
  //funcion para mostrar resumen de compra
  function mostrarResumen() {
  // Comprobar si el carrito está vacío
  if (carrito.length === 0) {
  // Muestra la alerta SweetAlert2
  Swal.fire({
  position: 'top',
  icon: 'info',
  title: 'Tu carrito de compras esta vacío',
  showConfirmButton: false,
  timer: 2000
  });
  return;
  }
  $('#boletaModal').modal('show'); // Abrir el modal si el carrito tiene productos
  }
  
  // Función para mostrar los datos en la boleta
  function mostrarBoleta() {
  const boletaCuerpoModal = document.getElementById("boletaCuerpoModal");
  boletaCuerpoModal.innerHTML = "";
  
  // Recorre los productos en el carrito
  carrito.forEach(item => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
          <td>${item.producto}</td>
          <td>${item.categoria}</td>
          <td>$${precios[item.categoria][item.producto].precio}</td>
          <td>${item.cantidad}</td>
          <td>$${(item.precioTotal)}</td>
          <td><button class="btn btn-danger" onclick="eliminarDelCarritoDesdeBoleta(this)">Eliminar</button></td>
      `;
      boletaCuerpoModal.appendChild(fila);
  });
  
  // Calcula el total de la compra
  const totalCompra = carrito.reduce((total, item) => total + item.precioTotal, 0);
  const totalCompraModal = document.getElementById("totalCompraModal");
  totalCompraModal.textContent = `Total a pagar: $${totalCompra}`;
  
  // Muestra u oculta el botón de "Pagar" en función de si hay productos en el carrito
  const botonPagarModal = document.getElementById("botonPagarModal");
  botonPagarModal.style.display = carrito.length > 0 ? "block" : "none";
  }
  function restablecerTabla() {
  tablaCuerpo.innerHTML = '';
  }
  