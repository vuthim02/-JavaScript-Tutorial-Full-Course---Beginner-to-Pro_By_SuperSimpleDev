// -------- AUTH --------

const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const els = {
  overlay: $('auth-overlay'),
  loginBox: $('auth-login'),
  signupBox: $('auth-signup'),
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
  navUser: $('nav-user'),
  navLogout: $('nav-logout'),
  app: $('app'),

  noteInput: $('note-input'),
  addBtn: $('add-btn'),
  notesList: $('notes-list'),

  fileInput: $('file-input'),
  uploadArea: $('upload-area'),
  uploadProgress: $('upload-progress'),
  progressFill: $('progress-fill'),
  progressText: $('progress-text'),
  galleryGrid: $('gallery-grid'),
  emptyGallery: $('empty-gallery'),
};

function showAuthForm(form) {
  els.loginBox.classList.add('hidden');
  els.signupBox.classList.add('hidden');
  els.authError.textContent = '';
  els.signupError.textContent = '';
  form.classList.remove('hidden');
}

els.showSignup.addEventListener('click', e => { e.preventDefault(); showAuthForm(els.signupBox); });
els.showLogin.addEventListener('click', e => { e.preventDefault(); showAuthForm(els.loginBox); });

els.signupBtn.addEventListener('click', async () => {
  const name = els.signupName.value.trim();
  const email = els.signupEmail.value.trim();
  const pw = els.signupPassword.value;
  if (!name || !email || !pw) { els.signupError.textContent = 'Fill all fields.'; return; }
  if (pw.length < 6) { els.signupError.textContent = 'Password must be 6+ chars.'; return; }
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, pw);
    await cred.user.updateProfile({ displayName: name });
  } catch (err) { els.signupError.textContent = err.message; }
});

els.loginBtn.addEventListener('click', async () => {
  const email = els.loginEmail.value.trim();
  const pw = els.loginPassword.value;
  if (!email || !pw) { els.authError.textContent = 'Fill all fields.'; return; }
  try { await auth.signInWithEmailAndPassword(email, pw); }
  catch (err) { els.authError.textContent = err.message; }
});

async function googleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try { await auth.signInWithPopup(provider); }
  catch (err) { els.authError.textContent = err.message; }
}
els.googleBtn.addEventListener('click', googleSignIn);
els.navLogout.addEventListener('click', () => auth.signOut());

// -------- TABS --------

$$('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    $$('.tab-content').forEach(t => t.classList.add('hidden'));
    $(`tab-${btn.dataset.tab}`).classList.remove('hidden');
  });
});

// -------- NOTES CRUD --------

let currentUser = null;
let unsubNotes = null;
let unsubGallery = null;

els.addBtn.addEventListener('click', addNote);
els.noteInput.addEventListener('keydown', e => { if (e.key === 'Enter') addNote(); });

function addNote() {
  const text = els.noteInput.value.trim();
  if (!text) return;
  db.collection('notes').add({
    text, userId: currentUser.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => { els.noteInput.value = ''; }).catch(console.error);
}

function renderNotes(snapshot) {
  els.notesList.innerHTML = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.className = 'note-item';
    div.innerHTML = `
      <span class="note-text">${esc(data.text)}</span>
      <div class="note-actions">
        <button class="edit-btn" data-id="${doc.id}">Edit</button>
        <button class="delete-btn" data-id="${doc.id}">Delete</button>
      </div>`;
    els.notesList.appendChild(div);
  });
  els.notesList.querySelectorAll('.edit-btn').forEach(b =>
    b.addEventListener('click', () => {
      const t = prompt('Edit note:');
      if (t && t.trim()) db.collection('notes').doc(b.dataset.id).update({ text: t.trim() });
    }));
  els.notesList.querySelectorAll('.delete-btn').forEach(b =>
    b.addEventListener('click', () => {
      if (confirm('Delete?')) db.collection('notes').doc(b.dataset.id).delete();
    }));
}

function esc(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

function startNotes() {
  if (unsubNotes) unsubNotes();
  unsubNotes = db.collection('notes')
    .where('userId', '==', currentUser.uid)
    .orderBy('createdAt')
    .onSnapshot(renderNotes);
}

// -------- GALLERY --------

els.uploadArea.addEventListener('click', () => els.fileInput.click());
els.uploadArea.addEventListener('dragover', e => { e.preventDefault(); els.uploadArea.classList.add('dragover'); });
els.uploadArea.addEventListener('dragleave', () => els.uploadArea.classList.remove('dragover'));
els.uploadArea.addEventListener('drop', e => {
  e.preventDefault();
  els.uploadArea.classList.remove('dragover');
  if (e.dataTransfer.files[0]) doUpload(e.dataTransfer.files[0]);
});
els.fileInput.addEventListener('change', () => {
  if (els.fileInput.files[0]) doUpload(els.fileInput.files[0]);
});

function doUpload(file) {
  if (!file.type.startsWith('image/')) return alert('Not an image.');
  if (file.size > 5 * 1024 * 1024) return alert('Max 5MB.');
  els.uploadProgress.classList.remove('hidden');
  els.progressFill.style.width = '0%';
  els.progressText.textContent = '0%';
  const ref = storage.ref(`gallery/${currentUser.uid}/${Date.now()}_${file.name}`);
  const task = ref.put(file);
  task.on('state_changed',
    s => {
      const p = Math.round(s.bytesTransferred / s.totalBytes * 100);
      els.progressFill.style.width = p + '%';
      els.progressText.textContent = p + '%';
    },
    err => { alert(err.message); els.uploadProgress.classList.add('hidden'); },
    async () => {
      const url = await task.snapshot.ref.getDownloadURL();
      await db.collection('gallery').add({
        url, name: file.name, userId: currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      els.uploadProgress.classList.add('hidden');
      els.fileInput.value = '';
    });
}

function renderGallery(snapshot) {
  els.galleryGrid.innerHTML = '';
  if (snapshot.empty) { els.emptyGallery.classList.remove('hidden'); return; }
  els.emptyGallery.classList.add('hidden');
  snapshot.forEach(doc => {
    const d = doc.data();
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      <img src="${d.url}" alt="${esc(d.name)}" loading="lazy" />
      <div class="overlay"><button class="del-btn" data-id="${doc.id}" data-url="${d.url}">✕</button></div>`;
    els.galleryGrid.appendChild(card);
  });
  els.galleryGrid.querySelectorAll('.del-btn').forEach(b => {
    b.addEventListener('click', async () => {
      if (!confirm('Delete?')) return;
      try {
        await storage.refFromURL(b.dataset.url).delete();
        await db.collection('gallery').doc(b.dataset.id).delete();
      } catch (err) { alert(err.message); }
    });
  });
}

function startGallery() {
  if (unsubGallery) unsubGallery();
  unsubGallery = db.collection('gallery')
    .where('userId', '==', currentUser.uid)
    .orderBy('createdAt', 'desc')
    .onSnapshot(renderGallery);
}

// -------- AUTH STATE --------

auth.onAuthStateChanged(user => {
  if (unsubNotes) { unsubNotes(); unsubNotes = null; }
  if (unsubGallery) { unsubGallery(); unsubGallery = null; }
  if (user) {
    currentUser = user;
    els.navUser.textContent = user.displayName || user.email;
    els.overlay.classList.add('hidden');
    els.app.classList.remove('hidden');
    startNotes();
    startGallery();
  } else {
    currentUser = null;
    els.overlay.classList.remove('hidden');
    els.app.classList.add('hidden');
    els.noteInput.value = '';
    els.notesList.innerHTML = '';
    els.galleryGrid.innerHTML = '';
    showAuthForm(els.loginBox);
  }
});
