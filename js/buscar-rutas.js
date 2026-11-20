// 1. Selección del DOM: Referenciamos elementos del HTML por su ID.
const formRutas = document.getElementById('form-rutas');
const inputOrigen = document.getElementById('origen');
const inputDestino = document.getElementById('destino');
const selectPreferencia = document.getElementById('preferencia');
const btnUbicacion = document.getElementById('btn-ubicacion');
const resultadoRuta = document.getElementById('resultado-ruta');
const mensajeInicial = document.getElementById('mensaje-inicial');
const mapaSimulado = document.getElementById('mapa-simulado');

// 2. Evento Click (Escenario 1): Simula la detección de ubicación actual.
btnUbicacion.addEventListener('click', () => {
    inputOrigen.value = "Ubicación actual";
});

// 3. Función principal de evaluación y pintado de la ruta en el DOM.
const procesarRuta = (evento) => {
    // Evita la recarga de página al enviar el formulario
    if (evento && evento.type === 'submit') evento.preventDefault();

    const destino = inputDestino.value.trim().toLowerCase();
    const preferencia = selectPreferencia.value;

    if (!destino) return;

    mensajeInicial.classList.add('oculto');
    resultadoRuta.classList.remove('oculto');

    // Escenario 2: Simulación de destino inválido o sin cobertura.
    if (destino === "inexistente" || destino === "error") {
        mapaSimulado.style.background = "#fee2e2"; // Fondo rojizo de error
        resultadoRuta.innerHTML = `
            <h3 style="color: #991b1b;">⚠️ Destino no encontrado</h3>
            <p>El lugar ingresado no existe o está fuera del área de cobertura ciclista.</p>
        `;
        return;
    }

    // Escenario 1 y 3: Datos clave por defecto.
    let distancia = "5.2 km";
    let tiempo = "25 min";
    let desnivel = "Moderado (contiene elevaciones)";

    // Filtro de ruta plana aplica cambios en los valores.
    if (preferencia === "plana") {
        distancia = "6.1 km"; 
        tiempo = "28 min";
        desnivel = "Bajo (evita cuestas empinadas)";
    }

    // Inyección de HTML dinámico con los cálculos.
    mapaSimulado.style.background = "#d1fae5"; // Fondo verdoso de éxito
    resultadoRuta.innerHTML = `
        <h3 style="color: #065f46;">🚲 Ruta segura encontrada</h3>
        <p><strong>Distancia total:</strong> ${distancia}</p>
        <p><strong>Tiempo estimado:</strong> ${tiempo}</p>
        <p><strong>Perfil de elevación:</strong> ${desnivel}</p>
    `;
};

// 4. Escuchadores de eventos interactivos:
// Ejecuta el cálculo al enviar el formulario.
formRutas.addEventListener('submit', procesarRuta);

// Escenario 1 (Actualización en tiempo real): Recalcula ruta mientras el usuario escribe.
inputDestino.addEventListener('input', () => {
    if (inputDestino.value.length > 2 && inputOrigen.value.length > 0) {
        procesarRuta();
    }
});

// Escenario 3: Modificar visualización automáticamente al cambiar la preferencia.
selectPreferencia.addEventListener('change', procesarRuta);