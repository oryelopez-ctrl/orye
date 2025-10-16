'use strict';

// =======================================================
// LÓGICA 1: CAMBIO DE TEMA (Tu código original)
// =======================================================

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
    this.textContent = "🌞"; 
  }
});


// =======================================================
// LÓGICA 2: ANIMACIÓN DE OJOS (Nuevo código)
// =======================================================

// 1. Obtener referencias de los ojos. 
// Asume que tienes elementos con la clase 'eye' en tu HTML.
const eyes = document.querySelectorAll('.eye');

// 2. Función para calcular el ángulo
function calculateAngle(cx, cy, mx, my) {
    // cx, cy: Coordenadas del centro del ojo
    // mx, my: Coordenadas del mouse/cursor

    // Calcula la diferencia en X e Y
    const dx = mx - cx;
    const dy = my - cy;
    
    // Usa Math.atan2 para obtener el ángulo en radianes (-pi a pi)
    const rad = Math.atan2(dy, dx);
    
    // Convierte radianes a grados y ajusta el inicio a 0 grados (eje X)
    const angle = rad * (180 / Math.PI);
    
    // Retorna el ángulo
    return angle;
}

// 3. Escuchar el movimiento del mouse (mousemove)
document.addEventListener('mousemove', (event) => {
    // Obtener las coordenadas del cursor
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Iterar sobre todos los elementos de ojos
    eyes.forEach(eye => {
        // Obtener la posición del elemento del ojo en la ventana (viewport)
        const eyeRect = eye.getBoundingClientRect();
        
        // Calcular el centro del ojo
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        // Calcular el ángulo de rotación necesario
        const angle = calculateAngle(eyeCenterX, eyeCenterY, mouseX, mouseY);
        
        // 4. Aplicar la transformación CSS
        // Se usa 'rotate(Xdeg)' para que el elemento rote y 'mire' al ángulo calculado.
        // El '+ 180' es un ajuste común si la rotación inicial del elemento no está alineada correctamente.
        eye.style.transform = `rotate(${angle + 180}deg)`;
    });
});

// Nota: Para Android/Táctil, se usa el evento 'touchmove' de forma similar, 
// extrayendo las coordenadas de 'event.touches[0].clientX' y 'event.touches[0].clientY'. 
// Este código básico de mouse funciona bien en la mayoría de los navegadores modernos.
