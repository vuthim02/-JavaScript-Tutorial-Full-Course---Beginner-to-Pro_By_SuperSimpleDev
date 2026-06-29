const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');
const success = document.getElementById('success');

const errors = {
  name: document.getElementById('nameError'),
  email: document.getElementById('emailError'),
  password: document.getElementById('passwordError'),
  phone: document.getElementById('phoneError'),
};

function validateName() {
  const v = nameInput.value.trim();
  if (!v) {
    nameInput.className = 'invalid';
    errors.name.textContent = 'Name is required';
    return false;
  }
  nameInput.className = 'valid';
  errors.name.textContent = '';
  return true;
}

function validateEmail() {
  const v = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!v) {
    emailInput.className = 'invalid';
    errors.email.textContent = 'Email is required';
    return false;
  }
  if (!regex.test(v)) {
    emailInput.className = 'invalid';
    errors.email.textContent = 'Enter a valid email address';
    return false;
  }
  emailInput.className = 'valid';
  errors.email.textContent = '';
  return true;
}

function validatePassword() {
  const v = passwordInput.value;
  if (v.length < 8) {
    passwordInput.className = 'invalid';
    errors.password.textContent = 'Password must be at least 8 characters';
    return false;
  }
  if (!/\d/.test(v)) {
    passwordInput.className = 'invalid';
    errors.password.textContent = 'Password must contain at least 1 number';
    return false;
  }
  passwordInput.className = 'valid';
  errors.password.textContent = '';
  return true;
}

function validatePhone() {
  const v = phoneInput.value.trim();
  const regex = /^\d{10}$/;
  if (!v) {
    phoneInput.className = 'invalid';
    errors.phone.textContent = 'Phone number is required';
    return false;
  }
  if (!regex.test(v)) {
    phoneInput.className = 'invalid';
    errors.phone.textContent = 'Enter exactly 10 digits';
    return false;
  }
  phoneInput.className = 'valid';
  errors.phone.textContent = '';
  return true;
}

nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);
phoneInput.addEventListener('blur', validatePhone);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const ok = validateName() & validateEmail() & validatePassword() & validatePhone();
  if (ok) {
    success.style.display = 'block';
    form.reset();
    document.querySelectorAll('input').forEach(i => i.className = '');
  }
});
