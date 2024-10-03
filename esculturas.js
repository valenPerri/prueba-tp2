const esculturas = [
    {
        id: 1,
        nombre: "Simpleza",
        foto: "imagenesEsculturas/simpleza.jpg",
        autor: "Luis Bernardi",
        pais: "Argentina, Corrientes",
        descripcion: "Esta obra explora la dualidad de materiales...",
        votos: 0,
        valoracion: 0,
        fotoAutor: "https://www.republicadecorrientes.com/content/bucket/4/66054w695h513c.jpg.webp" 
    },

    {
        id: 2,
        nombre: "Multiplicidad",
        foto: "imagenesEsculturas/multiplicidad.jpg",
        autor: "Alejandro Mardons Gullen",
        pais: "Chile, Valparaíso",
        descripcion: "La escultura se fundamenta en la línea...",
        votos: 0,
        valoracion: 0,
        fotoAutor: "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/mardones-guillen.fw_-1.png" 
    },

    {
        id: 3,
        nombre: "Mensaje",
        foto: "imagenesEsculturas/mensaje.jpg",
        autor: "Anna Kover",
        pais: "Nueva Zelanda, New Plymouth",
        descripcion: "La obra explora un paisaje onírico...",
        votos: 0,
        valoracion: 0,
        fotoAutor: "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Nueva-Zelanda-Anna-Korver-Foto.png"
    },
];

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
                <!-- Imagen de la escultura -->
                <img src="${escultura.foto}" alt="${escultura.nombre}" class="foto">
                
                <!-- Imagen del autor y descripción -->
                <div class="autor-descripcion">
                    <img src="${escultura.fotoAutor}" alt="${escultura.autor}" class="autor-foto">
                    <p class="autor"><strong>Autor:</strong> ${escultura.autor}</p>
                    <p class="pais"><strong>País:</strong> ${escultura.pais}</p>
                    <p class="descripcion-autor"><strong>Descripción:</strong> ${escultura.descripcion}</p>
                </div>
            </div>

            <!-- Votación -->
            <div class="votacion">
                <div class="star-rating" data-id="${escultura.id}">
                    ${[1, 2, 3, 4, 5].map(star => `
                        <span class="star ${star <= escultura.valoracion ? 'selected' : ''}" data-value="${star}" onclick="votar(${escultura.id}, ${star})">&#9733;</span>
                    `).join('')}
                </div>
                <span class="puntuacion">${escultura.valoracion > 0 ? `Puntuación: ${escultura.valoracion} estrellas` : ''}</span>
            </div>
        </div>
    `;
}

// Función para votar por una escultura
function votar(id, valor) {
    const escultura = esculturas.find(e => e.id === id);
    if (escultura) {
        escultura.valoracion = valor;
        alert(`Has votado ${valor} estrellas por la escultura "${escultura.nombre}"!`);
        renderEsculturas(); // Volver a renderizar para actualizar el estado
    }
}

// Renderizar al cargar la página
window.onload = renderEsculturas;
