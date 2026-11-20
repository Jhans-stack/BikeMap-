/* ========================================================
   TUTORIAL JS: US002 - Módulo de Navegación para Ciclistas
   ======================================================== */

// 1. SELECCIÓN DE ELEMENTOS DEL DOM
const btnIniciar = document.getElementById('btn-iniciar-navegacion');
const vistaConduccion = document.getElementById('vista-conduccion');
const controlesNav = document.querySelector('.controles-navegacion');
const instruccionVisual = document.getElementById('instruccion-visual');
const detalleDistancia = document.getElementById('detalle-distancia');
const toggleVoz = document.getElementById('toggle-voz');
const btnModoPantalla = document.getElementById('btn-cambiar-modo');
const panelModoPantalla = document.getElementById('panel-modo-pantalla');

// Botones de simulación de escenarios
const btnDesvio = document.getElementById('btn-simular-desvio');
const btnLlegada = document.getElementById('btn-simular-llegada');
const btnTunel = document.getElementById('btn-simular-tunel');
const estadoGps = document.getElementById('estado-gps');

// Resumen final
const resumenNavegacion = document.getElementById('resumen-navegacion');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Variable de control para la voz
let vozActiva = true;

// Función auxiliar para reproducir voz (SpeechSynthesis API nativa)
function hablar(texto) {
  if (!vozActiva || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel(); // Detener audios anteriores
  const mensaje = new SpeechSynthesisUtterance(texto);
  mensaje.lang = 'es-ES';
  window.speechSynthesis.speak(mensaje);
}

// 2. EVENTOS Y ESCUCHADORES

// Escenario 1: Inicio exitoso de la navegación con guía por voz
btnIniciar.addEventListener('click', () => {
  controlesNav.classList.add('oculto');
  vistaConduccion.classList.remove('oculto');
  
  // Establecer primera instrucción
  instruccionVisual.textContent = "En 100m gire a la izquierda en Av. Arequipa";
  detalleDistancia.textContent = "Distancia al giro: 100 metros";
  
  // Reproducir voz si está activo
  hablar("Iniciando navegación. En 100 metros, gire a la izquierda en Avenida Arequipa.");
});

// Control de activación/desactivación de voz
toggleVoz.addEventListener('change', (e) => {
  vozActiva = e.target.checked;
});

// Control de brillo / Modo Día a Noche
btnModoPantalla.addEventListener('click', () => {
  panelModoPantalla.classList.toggle('modo-noche');
  const esNocturno = panelModoPantalla.classList.contains('modo-noche');
  btnModoPantalla.textContent = esNocturno ? "Modo Día" : "Modo Noche";
});

// Escenario 2: Recálculo automático por desvío en la ruta (< 3 segundos)
btnDesvio.addEventListener('click', () => {
  instruccionVisual.textContent = "⚠️ ¡Desvío detectado! Recalculando ruta...";
  detalleDistancia.textContent = "Buscando alternativa óptima...";
  hablar("Desvío detectado. Recalculando nueva ruta hacia el destino.");

  // Simular recálculo en menos de 3 segundos (ej. 1.5 segundos)
  setTimeout(() => {
    instruccionVisual.textContent = "✔ Nueva ruta calculada: Continúe por Calle Pardo 200m";
    detalleDistancia.textContent = "Distancia al giro: 200 metros";
    hablar("Nueva ruta lista. Continúe por calle Pardo durante doscientos metros.");
  }, 1500);
});

// Escenario 3: Llegada exitosa al destino final (< 20 metros)
btnLlegada.addEventListener('click', () => {
  vistaConduccion.classList.add('oculto');
  resumenNavegacion.classList.remove('oculto');
  hablar("Has llegado a tu destino.");
});

// Escenario 4: Pérdida temporal de señal GPS (ej. cruzando un túnel)
btnTunel.addEventListener('click', () => {
  estadoGps.classList.remove('oculto');
  instruccionVisual.textContent = "Manténgase en el carril central";
  detalleDistancia.textContent = "Última posición conocida congelada";
  hablar("Señal GPS débil.");

  // Simular recuperación de señal a los 4 segundos
  setTimeout(() => {
    estadoGps.classList.add('oculto');
    instruccionVisual.textContent = "Señal GPS recuperada. Continúe recto.";
    hablar("Señal GPS recuperada.");
  }, 4000);
});

// Botón para reiniciar simulación
btnReiniciar.addEventListener('click', () => {
  resumenNavegacion.classList.add('oculto');
  controlesNav.classList.remove('oculto');
  estadoGps.classList.add('oculto');
  instruccionVisual.textContent = "Esperando inicio de ruta...";
  detalleDistancia.textContent = "Distancia al siguiente giro: --";
});