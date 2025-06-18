document.addEventListener("DOMContentLoaded", () => {

  //---------------------- MENU DESPLEGABLE ------------------------------------
  const hamburguesa = document.getElementById('hamburguesa');
  const navMenu = document.getElementById('navMenu');

  if (hamburguesa && navMenu) {
  //-------------------------- ABRIR/CERRAR -----------------------------------
  hamburguesa.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    hamburguesa.classList.toggle('active'); // Animación del botón
  });

  //-------------------- CERRAR AL DESPLAZARSE ------------------------------------------
  const navItems = navMenu.querySelectorAll('a'); // Selecciona todos los enlaces dentro del menú
  navItems.forEach(item => {
    item.addEventListener('click', function () {
      navMenu.classList.remove('active'); // Cierra el menú
      hamburguesa.classList.remove('active'); // Resetea la animación del botón
    });
  });
}


/**
 * ========================================================================
 * VALIDACIÓN DE FORMULARIO Y GESTIÓN DE LOCALSTORAGE
 * ========================================================================
 * Este script maneja:
 * 1. Validación del formato de email (debe estar en minúsculas)
 * 2. Almacenamiento en localStorage para guardar el progreso del formulario
 * 3. Recuperación de datos al recargar la página
 */

// ==================== CONFIGURACIÓN INICIAL ====================

// Elementos del DOM
const errorMessage = document.querySelector('.error-message'); // Elemento para mostrar errores
const form = document.getElementById('contact');             // Formulario completo
const email = document.getElementById('email');             // Campo de email
const nameInput = document.getElementById('name');          // Campo de nombre
const lastnameInput = document.getElementById('lastname');  // Campo de apellido 
const messageInput = document.getElementById('textform');    // Campo de mensaje

// Expresión regular para validar email (solo minúsculas, con @ y dominio válido)
const emailRegex = /^[a-z0-9_.]+@[a-z0-9_.]+\.[a-z0-9_.]+$/;

// Objeto para almacenar datos en localStorage
let localData = {
  name: '',
  lastname: '', 
  email: '',
  message: '',
};

// ==================== VALIDACIÓN DE FORMULARIO ====================

/**
 * Evento de submit del formulario
 * Valida que el email cumpla con el formato requerido antes de enviar
 */
form.addEventListener('submit', (e) => {
  // Si el email no cumple con la expresión regular
  if (!emailRegex.test(email.value)) {
    e.preventDefault(); // Evita el envío del formulario
    
    // Muestra el mensaje de error y resalta el campo
    errorMessage.style.display = 'block';
    email.style.border = '#dd5353 2px solid';
  } else {
    // Si es válido, oculta el mensaje y quita el resaltado
    errorMessage.style.display = 'none';
    email.style.border = '';
    
    // Opcional: Limpiar localStorage después de enviar correctamente
    localStorage.removeItem('contactFormData');
  }
});

// ==================== GESTIÓN DE LOCALSTORAGE ====================

/**
 * Guarda los datos actuales en localStorage
 */
function dataLocalStore() {
  localStorage.setItem('contactFormData', JSON.stringify(localData));
}

/**
 * Evento que captura los cambios en los inputs del formulario
 * Actualiza el objeto localData y lo guarda en localStorage
 */
form.addEventListener('input', () => {
  // Actualiza los valores en el objeto localData
  localData.name = nameInput.value;
  localData.lastname = lastnameInput.value; 
  localData.email = emailInput.value;
  localData.message = messageInput.value;
  
  // Guarda en localStorage
  dataLocalStore();
});

/**
 * Al cargar la página, recupera los datos guardados en localStorage
 * y los coloca en los campos correspondientes
 */
const savedData = JSON.parse(localStorage.getItem('contactFormData'));
if (savedData) {
  // Actualiza el objeto local con los datos guardados
  localData = savedData;
  
  // Rellena los campos del formulario
  nameInput.value = localData.name || '';
  lastnameInput.value = localData.lastname || ''; 
  emailInput.value = localData.email || '';
  messageInput.value = localData.message || '';
}
});