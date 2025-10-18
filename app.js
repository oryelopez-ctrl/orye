'use strict';

// CAMBIO DE TEMA
const switcher = document.querySelector('.btn');
switcher.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');
  let className = document.body.className;
  this.textContent = className === "light-theme" ? "🌙" : "🌞";
});

// MOSTRAR SECCIONES
function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => {
    sec.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';

  // Cambiar estado capibara según sección
  const character = document.querySelector('.character');
  character.classList.remove('state-spray', 'state-shirt', 'state-happy');
  if (id === 'perfumes') {
    // cambia a modo “echando perfume”
    character.classList.add('state-spray');
  } else if (id === 'camisetas') {
    // modo “poniéndose camiseta”
    character.classList.add('state-shirt');
  } else {
    // sección contacto u otra → feliz
    character.classList.add('state-happy');
  }

  // después de un tiempo revertir a estado neutral
  setTimeout(() => {
    character.classList.remove('state-spray', 'state-shirt', 'state-happy');
  }, 3000);
}

// OJOS SIGUEN CURSOR
const eyes = document.querySelectorAll('.eye');
function calculateAngle(cx, cy, mx, my) {
  const dx = mx - cx;
  const dy = my - cy;
  return Math.atan2(dy, dx);
}
function moveEyes(x, y) {
  eyes.forEach(eye => {
    const rect = eye.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = calculateAngle(cx, cy, x, y);
    const radius = 4;
    const moveX = Math.cos(angle) * radius;
    const moveY = Math.sin(angle) * radius;
    eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}
document.addEventListener('mousemove', e => {
  moveEyes(e.clientX, e.clientY);
});
document.addEventListener('touchmove', e => {
  if (e.touches.length > 0) {
    moveEyes(e.touches[0].clientX, e.touches[0].clientY);
  }
});

// DATOS PRODUCTOS Y MODAL
const productos = {
  "empire-woman": {
    imagen: "img/ew.png",
    titulo: "Empire Woman",
    descripcion: "Notas de framboesa, bergamota, jazmín y praliné.",
    precio: "R$ 199,90",
    enlace: "https://shopee.com/tu‑producto‑empire‑woman"
  },
  "rebelle": {
    imagen: "img/mn.png",
    titulo: "Rebelle",
    descripcion: "Un aroma misterioso con toques de orquídea y rosa.",
    precio: "R$ 174,90",
    enlace: "https://shopee.com/tu‑producto‑rebelle"
  }
};

function abrirModal(key) {
  const prod = productos[key];
  if (!prod) return;
  document.getElementById("modalImagen").src = prod.imagen;
  document.getElementById("modalTitulo").textContent = prod.titulo;
  document.getElementById("modalDescripcion").textContent = prod.descripcion;
  document.getElementById("modalPrecio").textContent = prod.precio;
  document.getElementById("modalLink").href = prod.enlace;
  document.getElementById("modalLink").textContent = "Comprar en Shopee";
  document.getElementById("modalProducto").style.display = "flex";
}
function cerrarModal() {
  document.getElementById("modalProducto").style.display = "none";
}


