
let precios = {}; // Inicializar precios como un objeto vacío

async function cargarProductosDesdeJSON() {
  try {
    const response = await fetch('./js/productos.json');
    const data = await response.json();

    // Asigna los productos cargados a la variable 'precios'
    precios = data;

    // Limpia y actualiza las opciones del productoSelect
    actualizarOpcionesProductos();
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

function actualizarOpcionesProductos() {
  const categoria = categoriaSelect.value;

  // Limpia opciones anteriores
  productoSelect.innerHTML = "";

  // Obtiene productos de la categoría seleccionada
  const productos = precios[categoria];

  // Agregar nuevas opciones
  for (const producto in productos) {
    const option = document.createElement("option");
    option.value = producto;
    option.textContent = producto;
    productoSelect.appendChild(option);
  }
}

// Llama a la función para cargar productos cuando se cargue la página
cargarProductosDesdeJSON();

const compraForm = document.getElementById("compraForm");
    const categoriaSelect = document.getElementById("categoriaSelect");
    const productoSelect = document.getElementById("productoSelect");
    const cantidadInput = document.getElementById("cantidadInput");
    const tablaCuerpo = document.getElementById("tablaCuerpo");

    compraForm.addEventListener("submit", function (e) {
        e.preventDefault(); 
    });

    categoriaSelect.addEventListener("change", function () {
        const categoria = categoriaSelect.value;

        const productos = precios[categoria];
        productoSelect.innerHTML = ""; 

        for (const producto in productos) {
            const option = document.createElement("option");
            option.value = producto;
            option.textContent = producto;
            productoSelect.appendChild(option);
        }
    });

    categoriaSelect.dispatchEvent(new Event('change'));
