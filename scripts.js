document.addEventListener("DOMContentLoaded", () => {
  /**
   * ========================================================================
   * MENÚ DESPLEGABLE (HAMBURGUESA)
   * ========================================================================
   */
  const hamburguesa = document.getElementById('hamburguesa');
  const navMenu = document.getElementById('navMenu');

  if (hamburguesa && navMenu) {
    hamburguesa.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      hamburguesa.classList.toggle('active');
    });

    const navItems = navMenu.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', function () {
        navMenu.classList.remove('active');
        hamburguesa.classList.remove('active');
      });
    });
  }

  /**
   * ========================================================================
   * PROYECTOS Y MODAL
   * ========================================================================
   */
  const newProjects = [
    {
      title: "Project 1", 
      image: "IMAGEN/perro.jpg",
      languages: ["HTML", "CSS", "JavaScript"], 
      link: "#",
      modalImage: "IMAGEN/imgmodal1.png",
      modalDescription: "Descripción detallada del proyecto 1."
    },
    {
      title: "Project 2",
      image: "imagen/eminem.png",
      languages: ["React", "Node.js"],
      link: "#",
      modalImage: "IMAGEN/imgmodal1.png",
      modalDescription: "Descripción detallada del proyecto 2."
    },
    {
      title: "Project 3",
      image: "imagen/saul.jpg",
      languages: ["Python", "Django"],
      link: "#",
      modalImage: "IMAGEN/imgmodal1.png",
      modalDescription: "Descripción detallada del proyecto 3."
    },
    {
      title: "Project 4",
      image: "imagen/alizee.jpg",
      languages: ["Python", "Django"],
      link: "#",
      modalImage: "IMAGEN/imgmodal1.png",
      modalDescription: "Descripción detallada del proyecto 4."
    },
    {
      title: "Project 5",
      image: "imagen/superman.jpg",
      languages: ["Python", "Django"],
      link: "#",
      modalImage: "IMAGEN/imgmodal1.png",
      modalDescription: "Descripción detallada del proyecto 5."
    },
    {
      title: "Project 6",
      image: "imagen/supra.jpg",
      languages: ["Python", "Django"],
      link: "#",
      modalImage: "IMAGEN/imgmodal1.png",
      modalDescription: "Descripción detallada del proyecto 6."
    }
  ];

  // Elementos del modal
  const modal = document.getElementById('projectModal');
  const modalTitle = document.querySelector('.modal-title');
  const modalImage = document.querySelector('.modal-img img');
  const modalDescription = document.querySelector('.modal-description p');
  const modalTechnologies = document.querySelector('.modal-languages');
  const liveDemoBtn = document.querySelector('.modal-buttons button:first-child');
  const sourceCodeBtn = document.querySelector('.modal-buttons button:last-child');
  const closeModalBtn = document.getElementById('closeModal');

  // Generar proyectos
  function generarProyectos() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = ''; // Limpiar proyectos existentes
    
    newProjects.forEach((project, index) => {
      const projectCard = document.createElement('article');
      projectCard.className = 'project-card';
      projectCard.dataset.projectId = index;
      
      projectCard.innerHTML = `
        <div class="project-image-container">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-details">
          <h3 class="project-title">${project.title}</h3>
          <div class="tech-tags">
            ${project.languages.map(lang => `<span class="tech-tag">${lang}</span>`).join('')}
          </div>
          <a class="project-button" href="#" data-project-id="${index}">Ver proyecto</a>
        </div>
      `;
      
      projectsGrid.appendChild(projectCard);
    });

    // Configurar eventos para los botones de proyecto
    document.querySelectorAll('.project-button, .project-card').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = button.dataset.projectId || button.closest('.project-card').dataset.projectId;
        const project = newProjects[projectId];
        
        if (project) {
          modalTitle.textContent = project.title;
          modalImage.src = project.modalImage;
          modalImage.alt = project.title;
          modalDescription.textContent = project.modalDescription;
          
          // Actualizar tecnologías en el modal
          modalTechnologies.innerHTML = '';
          project.languages.forEach(lang => {
            const techBadge = document.createElement('span');
            techBadge.className = 'lang-badge';
            techBadge.textContent = lang;
            modalTechnologies.appendChild(techBadge);
          });
          
          // Configurar botones del modal
          liveDemoBtn.onclick = () => window.open(project.link, '_blank');
          sourceCodeBtn.onclick = () => window.open(project.link, '_blank');
          
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }

  // Cerrar modal
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Cerrar al hacer clic fuera del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // Generar proyectos al cargar la página
  generarProyectos();

  /**
   * ========================================================================
   * VALIDACIÓN DE FORMULARIO Y GESTIÓN DE LOCALSTORAGE
   * ========================================================================
   */
  const errorMessage = document.querySelector('.error-message');
  const form = document.getElementById('contact');
  
  if (form) {
    const email = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const lastnameInput = document.getElementById('lastname');
    const messageInput = document.getElementById('textform');

    const emailRegex = /^[a-z0-9_.]+@[a-z0-9_.]+\.[a-z0-9_.]+$/;

    let localData = {
      name: '',
      lastname: '', 
      email: '',
      message: '',
    };

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