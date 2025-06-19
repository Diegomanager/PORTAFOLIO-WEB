document.addEventListener("DOMContentLoaded", () => {
  /**
   * ========================================================================
   * MENÚ DESPLEGABLE (HAMBURGUESA)
   * ========================================================================
   * Maneja:
   * 1. Apertura/cierre del menú móvil
   * 2. Animación del botón hamburguesa
   * 3. Cierre automático al seleccionar un enlace
   */
  const hamburguesa = document.getElementById('hamburguesa');
  const navMenu = document.getElementById('navMenu');

  if (hamburguesa && navMenu) {
    //-------------------------- ABRIR/CERRAR -----------------------------------
    hamburguesa.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      hamburguesa.classList.toggle('active'); // Animación del botón
    });

    //-------------------- CERRAR AL DESPLAZARSE ---------------------------------
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
   * MODAL DE PROYECTO
   * ========================================================================
   * Maneja:
   * 1. Apertura del modal al hacer clic en botones de proyecto
   * 2. Cierre del modal con botón o haciendo clic fuera
   * 3. Bloqueo del scroll de fondo cuando el modal está abierto
   */
  const modal = document.getElementById('projectModal');
  const openModalBtns = document.querySelectorAll('.project-button'); // Todos los botones que abren modal
  const closeModalBtn = document.getElementById('closeModal');

  if (openModalBtns.length > 0 && modal && closeModalBtn) {
    // Configura eventos para cada botón que abre el modal
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Bloquea el scroll de fondo
      });
    });
    
    // Configura evento para botón de cerrar
    closeModalBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Restaura el scroll
    });
    
    // Cierra modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * ========================================================================
   * VALIDACIÓN DE FORMULARIO Y GESTIÓN DE LOCALSTORAGE
   * ========================================================================
   * Maneja:
   * 1. Validación del formato de email (debe estar en minúsculas)
   * 2. Almacenamiento en localStorage para guardar el progreso del formulario
   * 3. Recuperación de datos al recargar la página
   */
  const errorMessage = document.querySelector('.error-message');
  const form = document.getElementById('contact');
  
  if (form) {
    const email = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const lastnameInput = document.getElementById('lastname');
    const messageInput = document.getElementById('textform');

    // Expresión regular para validar email (solo minúsculas)
    const emailRegex = /^[a-z0-9_.]+@[a-z0-9_.]+\.[a-z0-9_.]+$/;

    // Objeto para almacenar datos en localStorage
    let localData = {
      name: '',
      lastname: '', 
      email: '',
      message: '',
    };

    // ==================== VALIDACIÓN DE FORMULARIO ====================
    form.addEventListener('submit', (e) => {
      if (!emailRegex.test(email.value)) {
        e.preventDefault();
        errorMessage.style.display = 'block';
        email.style.border = '#dd5353 2px solid';
      } else {
        errorMessage.style.display = 'none';
        email.style.border = '';
        localStorage.removeItem('contactFormData');
      }
    });

    // ==================== GESTIÓN DE LOCALSTORAGE ====================
    function dataLocalStore() {
      localStorage.setItem('contactFormData', JSON.stringify(localData));
    }

    form.addEventListener('input', () => {
      localData.name = nameInput.value;
      localData.lastname = lastnameInput.value; 
      localData.email = email.value;
      localData.message = messageInput.value;
      dataLocalStore();
    });

    // Recuperar datos al cargar la página
    const savedData = JSON.parse(localStorage.getItem('contactFormData'));
    if (savedData) {
      localData = savedData;
      nameInput.value = localData.name || '';
      lastnameInput.value = localData.lastname || ''; 
      email.value = localData.email || '';
      messageInput.value = localData.message || '';
    }
  }  
});