'use strict';

// =======================
// CAMBIO DE TEMA
// =======================
const switcher = document.querySelector('.btn');

switcher.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');
  let className = document.body.className;
  this.textContent = className === "light-theme" ? "🌙" : "🌞";
});

// =======================
// MOSTRAR SECCIONES
// =======================
function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(seccion => {
    seccion.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
}

// =======================
// OJOS SIGUEN CURSOR
// =======================
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
    
    const radius = 10;
    const moveX = Math.cos(angle) * radius;
    const moveY = Math.sin(angle) * radius;

    eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

document.addEventListener('mousemove', (e) => {
  moveEyes(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    moveEyes(e.touches[0].clientX, e.touches[0].clientY);
  }
});


