const capybara = document.getElementById("capibara");
const leftPupil = capybara.querySelector(".left-eye .pupil");
const rightPupil = capybara.querySelector(".right-eye .pupil");

// Datos de productos para el modal
const productos = {
  "empire-woman": {
    titulo: "Empire Woman",
    descripcion: "Notas de framboesa, bergamota, jazmín y praliné.",
    precio: "R$ 199,90",
    imagen: "img/ew.png",
    link: "https://shopee.com/empire-woman" // Cambia a tu URL real
  },
  "rebelle": {
    titulo: "Rebelle",
    descripcion: "Un aroma misterioso con toques de orquídea y rosa.",
    precio: "R$ 174,90",
    imagen: "img/mn.png",
    link: "https://shopee.com/rebelle" // Cambia a tu URL real
  }
};

document.addEventListener("mousemove", (e) => {
  const rect = capybara.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const maxMove = 5; // Máximo movimiento de la pupila

  let dx = e.clientX - centerX;
  let dy = e.clientY - centerY;

  if (dx > maxMove) dx = maxMove;
  if (dx < -maxMove) dx = -maxMove;
  if (dy > maxMove) dy = maxMove;
  if (dy < -maxMove) dy = -maxMove;

  leftPupil.style.transform = `translate(${dx}px, ${dy}px)`;
  rightPupil.style.transform = `translate(${dx}px, ${dy}px)`;
});

// Función para cambiar el estado del capibara
function setCapybaraState(state) {
  capybara.classList.remove("neutral", "happy", "spray", "shirt");
  capybara.classList.add(state);
}

// Función para mostrar secciones y cambiar estado del capibara
function mostrarSeccion(seccion) {
  // Ocultar todas las secciones
  document.querySelectorAll(".seccion").forEach(s => s.style.display = "none");
  // Mostrar la sección seleccionada
  const sec = document.getElementById(seccion);
  if (sec) sec.style.display = "block";

  // Cambiar estado capibara según sección
  if (seccion === "perfumes") {
    setCapybaraState("happy");
  } else if (seccion === "camisetas") {
    setCapybaraState("shirt");
  } else {
    setCapybaraState("neutral");
  }

  cerrarModal(); // Cierra modal si está abierto
}

// Modal
const modal = document.getElementById("modalProducto");
const modalImagen = document.getElementById("modalImagen");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescripcion = document.getElementById("modalDescripcion");
const modalPrecio = document.getElementById("modalPrecio");
const modalLink = document.getElementById("modalLink");

function abrirModal(productoKey) {
  const producto = productos[productoKey];
  if (!producto) return;

  modalImagen.src = producto.imagen;
  modalImagen.alt = producto.titulo;
  modalTitulo.textContent = producto.titulo;
  modalDescripcion.textContent = producto.descripcion;
  modalPrecio.textContent = producto.precio;
  modalLink.href = producto.link;

  modal.style.display = "flex";

  // Cambia capibara a estado spray
  setCapybaraState("spray");
}

function cerrarModal() {
  modal.style.display = "none";
  // Volver a estado happy si estamos en perfumes, o neutral
  const perfumesVisible = document.getElementById("perfumes").style.display === "block";
  if (perfumesVisible) {
    setCapybaraState("happy");
  } else {
    setCapybaraState("neutral");
  }
}

// Tema (claro/oscuro)
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains("light-theme")) {
    body.classList.replace("light-theme", "dark-theme");
  } else {
    body.classList.replace("dark-theme", "light-theme");
  }
}

// Inicializa con estado neutro y muestra la sección de perfumes por defecto (opcional)
mostrarSeccion('perfumes');




