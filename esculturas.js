const esculturas = [
    {
        id: 1,
        nombre: "Simpleza",
        foto: "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Bienal-del-Chaco-2024-Argentina-22.jpg",
        autor: "Luis Bernardi",
        pais: "Argentina, Corrientes",
        descripcion: "Parte de mi escultura se sostiene en la línea, sustentándose en materiales como metal y madera. El color es fundamental en mi trabajo, siempre presente en el recorrido que realizo. Este recorrido se manifiesta en diversas direcciones: subiendo, bajando, doblándose y desapareciendo para volver a aparecer de otra forma. Mi obra busca explorar un mismo lugar repetidamente, haciendo pequeños cambios hasta alcanzar una simpleza mínima casi imperceptible. No tiene un significado explícito, es solo una línea sin intencionalidad, pero su recorrido puede generar interpretaciones. Aspiro a llegar a la simpleza de una flecha o su trayecto.",
        votos: 0,
        valoracion: 0,
        fotoAutor: "https://www.republicadecorrientes.com/content/bucket/4/66054w695h513c.jpg.webp" 
    },
    {
        id: 2,
        nombre: "Multiplicidad",
        foto: "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Bienal-del-Chaco-chile-26.jpg",
        autor: "Alejandro Mardons Gullen",
        pais: "Chile, Valparaíso",
        descripcion: "La escultura emplea planos triangulares, color y luz para crear diversas percepciones espaciales. Al observarla desde distintos ángulos, se generan figuras geométricas y volúmenes virtuales. Diseñada para ser explorada, permite a los espectadores situarse dentro de la obra y experimentar un nuevo espacio. Representa la diversidad de individuos en un mismo entorno, donde cada perspectiva es válida. A partir de la individualidad de formas, se crea un todo multidimensional que nos une.",
        votos: 0,
        valoracion: 0,
        fotoAutor: "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/mardones-guillen.fw_-1.png" 
    },
    {
        id: 3,
        nombre: "Mensaje",
        foto: "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/bienal-2024-nueva-zelanda-2.jpg",
        autor: "Anna Kover",
        pais: "Nueva Zelanda, New Plymouth",
        descripcion: "Una obra sobre el paisaje onírico. Toma la forma abstracta surrealista de un dardo de papel y recuerda al espectador un sentimiento de infancia. Recuerda la sensación de soñar y enviarla como un deseo. La obra utiliza el símbolo del dardo de papel y que recuerda el juego infantil de intentar volar un avión de papel lo más lejos que puedas. Se trata de volar, de esperar y de enviar un deseo a tu yo futuro como la proyección de un sueño. Quizás sea un lugar al que desea viajar, una persona que desea ver… es algo que el espectador debe imaginar. La superficie está facetada, lo que para mí representa algo mágico y alejado de la normalidad de la vida cotidiana.",
        votos: 0,
        valoracion: 0,
        fotoAutor: "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Nueva-Zelanda-Anna-Korver-Foto.png"
    },
];

// Variable global para almacenar el correo
let userEmail = null;
const votedEmails = new Set(); // Para almacenar los correos que ya han votado

// Función para renderizar las esculturas
function renderEsculturas() {
    const container = document.getElementById('esculturas-container');
    container.innerHTML = esculturas.map(escultura => createEsculturaHTML(escultura)).join('');
}

// Función para crear el HTML de una escultura
function createEsculturaHTML(escultura) {
    return `
        <div class="escultura">
            <h3 class="nombre">${escultura.nombre}</h3>
            <div class="escultura-info">
                <img src="${escultura.foto}" alt="${escultura.nombre}" class="foto">
                <div class="autor-descripcion">
                    <img src="${escultura.fotoAutor}" alt="${escultura.autor}" class="autor-foto">
                    <p class="autor"><strong>Autor:</strong> ${escultura.autor}</p>
                    <p class="pais"><strong>País:</strong> ${escultura.pais}</p>
                    <p class="descripcion-autor"><strong>Descripción:</strong> ${escultura.descripcion}</p>
                </div>
            </div>
            <div class="votacion">
                <div class="star-rating" data-id="${escultura.id}">
                    ${[1, 2, 3, 4, 5].map(star => `
                        <span class="star" data-value="${star}" onclick="votar(${escultura.id}, ${star})">&#9733;</span>
                    `).join('')}
                </div>
                <span class="puntuacion">${escultura.valoracion > 0 ? `Puntuación: ${escultura.valoracion} estrellas` : ''}</span>
            </div>
        </div>
    `;
}

// Función para votar por una escultura
function votar(id, valor) {
    if (!userEmail) {
        alert("Por favor, ingresa tu correo electrónico primero.");
        return;
    }
    if (votedEmails.has(userEmail)) {
        alert("Ya has votado con este correo. No puedes votar nuevamente.");
        return;
    }

    const escultura = esculturas.find(e => e.id === id);
    if (escultura) {
        escultura.valoracion = valor; // Asignar la valoración a la escultura
        escultura.votos += 1; // Incrementar el número de votos
        votedEmails.add(userEmail); // Agregar el correo a la lista de correos que ya votaron
        alert(`Has votado ${valor} estrellas por la escultura "${escultura.nombre}"!`);
        renderEsculturas(); // Volver a renderizar para actualizar el estado
    }
}

// Manejadores de eventos para el modal
window.onload = () => {
    document.getElementById('emailModal').style.display = 'block'; // Mostrar el modal al cargar la página

    document.getElementById('confirmEmailBtn').onclick = () => {
        const emailInput = document.getElementById('emailInput').value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el correo
        if (!emailPattern.test(emailInput)) {
            alert("Por favor, introduce un correo electrónico válido.");
            return;
        }
        if (votedEmails.has(emailInput)) {
            alert("Ya has votado con este correo. No puedes votar nuevamente.");
            return;
        }
        userEmail = emailInput; // Guardar el correo
        alert("Correo electrónico registrado. Ahora puedes votar.");
        document.getElementById('emailModal').style.display = 'none'; // Cerrar el modal
        renderEsculturas(); // Renderizar esculturas después de registrar el correo
    };

    document.querySelector('.close').onclick = () => {
        document.getElementById('emailModal').style.display = 'none'; // Cerrar modal al hacer clic en "X"
    };
};

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('emailModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Inicializa la renderización de esculturas
renderEsculturas();