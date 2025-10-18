'use strict'; 

// CAMBIO DE TEMA
const switcher = document.querySelector('.btn');
switcher.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
    let className = document.body.className;
    this.textContent = className.includes("light-theme") ? "🌙" : "🌞";
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
        // modo feliz (cuando se muestra catálogo perfumes)
        character.classList.add('state-happy');
    } else if (id === 'camisetas') {
        // modo “poniéndose camiseta”
        character.classList.add('state-shirt');
    } else {
        // sección contacto u otra → neutral (sin clase)
        // no añadimos nada
    }

    cerrarModal(); // Asegura que el modal esté cerrado
}

// -----------------------------------
// OJOS SIGUEN CURSOR (Lógica central para la animación)
// -----------------------------------
const eyes = document.querySelectorAll('.eye .pupil'); // Selecciona las PUPILAS
const radius = 4; // Distancia máxima de movimiento de la pupila en px

function calculateAngle(cx, cy, mx, my) {
    const dx = mx - cx;
    const dy = my - cy;
    return Math.atan2(dy, dx); // Retorna el ángulo en radianes
}

function moveEyes(x, y) {
    eyes.forEach(pupil => {
        // Obtenemos el centro de la CUENCA del ojo (.eye) para el cálculo
        const eyeRect = pupil.parentElement.getBoundingClientRect(); 
        const cx = eyeRect.left + eyeRect.width / 2;
        const cy = eyeRect.top + eyeRect.height / 2;
        
        const angle = calculateAngle(cx, cy, x, y);

        // Calculamos el desplazamiento (X e Y) basado en el ángulo y el radio
        const moveX = Math.cos(angle) * radius;
        const moveY = Math.sin(angle) * radius;
        
        // Aplicamos la transformación a la PUPILA
        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
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

// -----------------------------------
// DATOS PRODUCTOS Y MODAL
// -----------------------------------
const productos = {
    "empire-woman": {
        imagen: "img/ew.png",
        titulo: "Empire Woman",
        descripcion: "Notas de framboesa, bergamota, jazmín y praliné.",
        precio: "R$ 199,90",
        enlace: "https://shopee.com/tu-producto-empire-woman"
    },
    "rebelle": {
        imagen: "img/mn.png",
        titulo: "Rebelle",
        descripcion: "Un aroma misterioso con toques de orquídea y rosa.",
        precio: "R$ 174,90",
        enlace: "https://shopee.com/tu-producto-rebelle"
    }
};

function abrirModal(key) {
    const prod = productos[key];
    if (!prod) return;

    // Actualizar contenido modal
    document.getElementById("modalImagen").src = prod.imagen;
    document.getElementById("modalTitulo").textContent = prod.titulo;
    document.getElementById("modalDescripcion").textContent = prod.descripcion;
    document.getElementById("modalPrecio").textContent = prod.precio;
    document.getElementById("modalLink").href = prod.enlace;
    document.getElementById("modalLink").textContent = "Comprar en Shopee";

    // Mostrar modal
    document.getElementById("modalProducto").style.display = "flex";

    // Cambiar estado capibara a "echando spray"
    const character = document.querySelector('.character');
    character.classList.remove('state-shirt', 'state-happy');
    character.classList.add('state-spray');
}

function cerrarModal() {
    document.getElementById("modalProducto").style.display = "none";

    // Volver a estado anterior según sección visible
    const character = document.querySelector('.character');
    character.classList.remove('state-spray', 'state-shirt', 'state-happy');

    // Usamos 'block' o 'flex' porque al mostrarSeccion se asigna 'block'
    // Comprobamos si las secciones están visibles
    if (document.getElementById('perfumes').style.display === 'block') {
        character.classList.add('state-happy');
    } else if (document.getElementById('camisetas').style.display === 'block') {
        character.classList.add('state-shirt');
    } else {
        // neutral - no clase
    }
}



