// ========================================
// US003 - GUARDAR RUTAS
// ========================================

// 1. Obtener las rutas guardadas del navegador.

let rutasGuardadas = JSON.parse(
    localStorage.getItem("rutasFavoritas")
) || [];


// 2. Obtener los elementos del HTML.

const formulario = document.getElementById("formulario-ruta");

const ubicacionInicial = document.getElementById(
    "ubicacion-inicial"
);

const ubicacionDestino = document.getElementById(
    "ubicacion-destino"
);

const listaRutas = document.getElementById(
    "lista-rutas-guardadas"
);


// 3. Función para guardar una ruta.

formulario.addEventListener("submit", function(event) {

    // Evitar que el formulario recargue la página.
    event.preventDefault();

    // Obtener los valores ingresados.
    const origen = ubicacionInicial.value.trim();

    const destino = ubicacionDestino.value.trim();

    // Crear el objeto de la nueva ruta.
    const nuevaRuta = {

        id: Date.now(),

        origen: origen,

        destino: destino

    };

    // Agregar la ruta al arreglo.
    rutasGuardadas.push(nuevaRuta);

    // Guardar el arreglo en localStorage.
    localStorage.setItem(
        "rutasFavoritas",
        JSON.stringify(rutasGuardadas)
    );

    // Actualizar la lista visual.
    mostrarRutas();

    // Limpiar los campos del formulario.
    formulario.reset();

});


// 4. Función para mostrar las rutas guardadas.

function mostrarRutas() {

    // Limpiar la lista actual.
    listaRutas.innerHTML = "";

    // Comprobar si existen rutas guardadas.
    if (rutasGuardadas.length === 0) {

        const mensaje = document.createElement("p");

        mensaje.textContent = "Todavía no tienes rutas guardadas.";

        listaRutas.appendChild(mensaje);

        return;
    }

    // Recorrer todas las rutas guardadas.
    rutasGuardadas.forEach(function(ruta) {

        // Crear una tarjeta.
        const tarjeta = document.createElement("article");

        tarjeta.className = "tarjeta";

        // Crear el título.
        const titulo = document.createElement("h3");

        titulo.textContent = ruta.origen + " → " + ruta.destino;

        // Mostrar ubicación inicial.
        const origen = document.createElement("p");

        origen.textContent = "Origen: " + ruta.origen;

        // Mostrar ubicación de destino.
        const destino = document.createElement("p");

        destino.textContent = "Destino: " + ruta.destino;

        // Agregar elementos a la tarjeta.
        tarjeta.append(titulo, origen, destino);

        // Agregar tarjeta a la lista.
        listaRutas.appendChild(tarjeta);

    });

}


// 5. Mostrar las rutas al cargar la página.

mostrarRutas();