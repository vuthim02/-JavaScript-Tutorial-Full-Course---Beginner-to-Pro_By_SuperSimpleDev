const elements = {
  signupForm: document.getElementById('signup-form'),
  loginForm: document.getElementById('login-form'),
  dashboard: document.getElementById('dashboard'),
  signupName: document.getElementById('signup-name'),
  signupEmail: document.getElementById('signup-email'),
  signupPassword: document.getElementById('signup-password'),
  loginEmail: document.getElementById('login-email'),
  loginPassword: document.getElementById('login-password'),
  userName: document.getElementById('user-name'),
  userEmail: document.getElementById('user-email'),
  signupError: document.getElementById('signup-error'),
  loginError: document.getElementById('login-error'),
  goToLogin: document.getElementById('go-to-login'),
  goToSignup: document.getElementById('go-to-signup'),
  googleBtn: document.getElementById('google-btn'),
  signupBtn: document.getElementById('signup-btn'),
  googleBtnSignup: document.getElementById('google-btn-signup'),
  loginBtn: document.getElementById('login-btn'),
  logoutBtn: document.getElementById('logout-btn'),
};

function showForm(formToShow) {
  elements.signupForm.classList.add('hidden');
  elements.loginForm.classList.add('hidden');
  elements.dashboard.classList.add('hidden');
  elements.signupError.textContent = '';
  elements.loginError.textContent = '';
  formToShow.classList.remove('hidden');
}

elements.goToLogin.addEventListener('click', (e) => {
  e.preventDefault();
  showForm(elements.loginForm);
});

elements.goToSignup.addEventListener('click', (e) => {
  e.preventDefault();
  showForm(elements.signupForm);
});

elements.signupBtn.addEventListener('click', async () => {
  const name = elements.signupName.value.trim();
  const email = elements.signupEmail.value.trim();
  const password = elements.signupPassword.value;

  if (!name || !email || !password) {
    elements.signupError.textContent = 'Please fill in all fields.';
    return;
  }

  if (password.length < 6) {
    elements.signupError.textContent = 'Password must be at least 6 characters.';
    return;
  }

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName: name });
    elements.signupError.textContent = '';
  } catch (err) {
    elements.signupError.textContent = err.message;
  }
});

elements.loginBtn.addEventListener('click', async () => {
  const email = elements.loginEmail.value.trim();
  const password = elements.loginPassword.value;

  if (!email || !password) {
    elements.loginError.textContent = 'Please fill in all fields.';
    return;
  }

  try {
    await auth.signInWithEmailAndPassword(email, password);
    elements.loginError.textContent = '';
  } catch (err) {
    elements.loginError.textContent = err.message;
  }
});

elements.logoutBtn.addEventListener('click', async () => {
  await auth.signOut();
});

function getActiveErrorEl() {
  if (!elements.signupForm.classList.contains('hidden')) return elements.signupError;
  if (!elements.loginForm.classList.contains('hidden')) return elements.loginError;
  return elements.signupError;
}

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
  } catch (err) {
    getActiveErrorEl().textContent = err.message;
  }
}

elements.googleBtn.addEventListener('click', signInWithGoogle);
elements.googleBtnSignup.addEventListener('click', signInWithGoogle);

auth.onAuthStateChanged((user) => {
  if (user) {
    elements.userName.textContent = user.displayName || 'User';
    elements.userEmail.textContent = user.email;
    showForm(elements.dashboard);
  } else {
    showForm(elements.signupForm);
  }
});
