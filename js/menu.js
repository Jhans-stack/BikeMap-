function cambiarpag(){
 window.location.href = "pagina2.html";
}

function nuevapag(){
 window.location.href = "pagina3.html";
}

function guardar() {
 // Mover la selección de elementos dentro de la función para que solo se evalúen al hacer clic
 const inputNombre = document.getElementById("nombre-ruta");
 const saludo = document.getElementById("saludo");

 // Verificar que los elementos existan en la página actual antes de actuar
 if (inputNombre && saludo) {
  if (inputNombre.value === "") {
   saludo.textContent = "Por favor escribe un nombre para la ruta";
  } else {
   saludo.textContent = `La ruta ${inputNombre.value} ha sido guardada correctamente`;
  }
 }
}