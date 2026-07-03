const $ = (id) => document.getElementById(id);

const els = {
  authSection: $('auth-section'),
  signupSection: $('signup-section'),
  notesSection: $('notes-section'),

  loginEmail: $('login-email'),
  loginPassword: $('login-password'),
  loginBtn: $('login-btn'),
  googleBtn: $('google-btn'),
  authError: $('auth-error'),

  signupName: $('signup-name'),
  signupEmail: $('signup-email'),
  signupPassword: $('signup-password'),
  signupBtn: $('signup-btn'),
  signupError: $('signup-error'),

  showSignup: $('show-signup'),
  showLogin: $('show-login'),

  logoutBtn: $('logout-btn'),
  noteInput: $('note-input'),
  addBtn: $('add-btn'),
  notesList: $('notes-list'),
};

function showSection(section) {
  [els.authSection, els.signupSection, els.notesSection].forEach(s => s.classList.add('hidden'));
  els.authError.textContent = '';
  els.signupError.textContent = '';
  section.classList.remove('hidden');
}

els.showSignup.addEventListener('click', (e) => { e.preventDefault(); showSection(els.signupSection); });
els.showLogin.addEventListener('click', (e) => { e.preventDefault(); showSection(els.authSection); });

els.signupBtn.addEventListener('click', async () => {
  const name = els.signupName.value.trim();
  const email = els.signupEmail.value.trim();
  const password = els.signupPassword.value;
  if (!name || !email || !password) { els.signupError.textContent = 'Fill all fields.'; return; }
  if (password.length < 6) { els.signupError.textContent = 'Password must be 6+ chars.'; return; }
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName: name });
  } catch (err) { els.signupError.textContent = err.message; }
});

els.loginBtn.addEventListener('click', async () => {
  const email = els.loginEmail.value.trim();
  const password = els.loginPassword.value;
  if (!email || !password) { els.authError.textContent = 'Fill all fields.'; return; }
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) { els.authError.textContent = err.message; }
});

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try { await auth.signInWithPopup(provider); }
  catch (err) { els.authError.textContent = err.message; }
}
els.googleBtn.addEventListener('click', signInWithGoogle);

els.logoutBtn.addEventListener('click', () => auth.signOut());

// ---------- FIRESTORE CRUD ----------

let currentUser = null;
let unsubscribe = null;

function renderNotes(snapshot) {
  els.notesList.innerHTML = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.className = 'note-item';
    div.innerHTML = `
      <span class="note-text">${escapeHtml(data.text)}</span>
      <div class="note-actions">
        <button class="edit-btn" data-id="${doc.id}">Edit</button>
        <button class="delete-btn" data-id="${doc.id}">Delete</button>
      </div>`;
    els.notesList.appendChild(div);
  });

  els.notesList.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => editNote(btn.dataset.id));
  });
  els.notesList.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteNote(btn.dataset.id));
  });
}

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

async function addNote() {
  const text = els.noteInput.value.trim();
  if (!text) return;
  try {
    await db.collection('notes').add({
      text,
      userId: currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    els.noteInput.value = '';
  } catch (err) { console.error(err); }
}
els.addBtn.addEventListener('click', addNote);
els.noteInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addNote(); });

async function editNote(id) {
  const newText = prompt('Edit your note:');
  if (newText && newText.trim()) {
    try {
      await db.collection('notes').doc(id).update({ text: newText.trim() });
    } catch (err) { console.error(err); }
  }
}

async function deleteNote(id) {
  if (confirm('Delete this note?')) {
    try {
      await db.collection('notes').doc(id).delete();
    } catch (err) { console.error(err); }
  }
}

function startListeningNotes() {
  if (unsubscribe) unsubscribe();
  unsubscribe = db.collection('notes')
    .where('userId', '==', currentUser.uid)
    .orderBy('createdAt')
    .onSnapshot(renderNotes);
}

// ---------- AUTH STATE ----------

auth.onAuthStateChanged(user => {
  if (unsubscribe) { unsubscribe(); unsubscribe = null; }
  if (user) {
    currentUser = user;
    showSection(els.notesSection);
    startListeningNotes();
  } else {
    currentUser = null;
    els.notesList.innerHTML = '';
    showSection(els.authSection);
  }
});
