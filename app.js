'use strict';

// Seleccionamos el botón
const switcher = document.querySelector('.btn');

// Agregamos un evento al botón
switcher.addEventListener('click', function() {
  // Cambia la clase del body (light <-> dark)
  document.body.classList.toggle('dark-theme');

  // Verificamos qué tema está activo
  let className = document.body.className;

  // Si es claro, mostramos 🌙 (para cambiar a oscuro)
  if (className === "light-theme") {
    this.textContent = "🌙"; 
  } else {
    // Si es oscuro, mostramos 🌞 (para volver a claro)
    this.textContent = "🌞"; 
  }
});