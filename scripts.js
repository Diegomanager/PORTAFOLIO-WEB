// Validación de formulario y localStorage

const errorMessage = document.querySelector('.error-message');
const form = document.getElementById('contact');
const email = document.getElementById('email');
const emailRegex = /^[a-z0-9_.]+@[a-z0-9_.]+\.[a-z0-9_.]+$/;

form.addEventListener('submit', (e) => {
  if (!emailRegex.test(email.value)) {
    e.preventDefault();
    errorMessage.style.display = 'block';
    email.style.border = '#dd5353 2px solid';
  } else {
    errorMessage.style.display = 'none';
    email.style.border = '';
  }
});

// Local Storage

let localData = {
  name: '',
  email: '',
  message: '',
};

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('textform');

function dataLocalStore() {
  localStorage.setItem('contactFormData', JSON.stringify(localData));
}

form.addEventListener('input', () => {
  localData.name = nameInput.value;
  localData.email = emailInput.value;
  localData.message = messageInput.value;
  dataLocalStore();
});

const savedData = JSON.parse(localStorage.getItem('contactFormData'));
if (savedData) {
  localData = savedData;
  nameInput.value = localData.name;
  emailInput.value = localData.email;
  messageInput.value = localData.message;
}
