// -------- AUTH --------

const $ = (id) => document.getElementById(id);

const els = {
  authSection: $('auth-section'),
  signupSection: $('signup-section'),
  gallerySection: $('gallery-section'),

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
  userDisplay: $('user-display'),

  fileInput: $('file-input'),
  uploadArea: $('upload-area'),
  uploadProgress: $('upload-progress'),
  progressFill: $('progress-fill'),
  progressText: $('progress-text'),

  galleryGrid: $('gallery-grid'),
  emptyState: $('empty-state'),
};

function showSection(section) {
  [els.authSection, els.signupSection, els.gallerySection].forEach(s => s.classList.add('hidden'));
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
  try { await auth.signInWithEmailAndPassword(email, password); }
  catch (err) { els.authError.textContent = err.message; }
});

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try { await auth.signInWithPopup(provider); }
  catch (err) { els.authError.textContent = err.message; }
}
els.googleBtn.addEventListener('click', signInWithGoogle);
els.logoutBtn.addEventListener('click', () => auth.signOut());

// -------- STORAGE UPLOAD --------

els.uploadArea.addEventListener('click', () => els.fileInput.click());

els.uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  els.uploadArea.classList.add('dragover');
});
els.uploadArea.addEventListener('dragleave', () => {
  els.uploadArea.classList.remove('dragover');
});
els.uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  els.uploadArea.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) uploadFile(file);
});

els.fileInput.addEventListener('change', () => {
  if (els.fileInput.files[0]) uploadFile(els.fileInput.files[0]);
});

function uploadFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file.');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert('File too large. Max 5MB.');
    return;
  }

  els.uploadProgress.classList.remove('hidden');
  els.progressFill.style.width = '0%';
  els.progressText.textContent = '0%';

  const ref = storage.ref(`gallery/${currentUser.uid}/${Date.now()}_${file.name}`);
  const task = ref.put(file);

  task.on('state_changed',
    (snapshot) => {
      const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      els.progressFill.style.width = pct + '%';
      els.progressText.textContent = pct + '%';
    },
    (err) => {
      console.error(err);
      alert('Upload failed: ' + err.message);
      els.uploadProgress.classList.add('hidden');
    },
    async () => {
      const url = await task.snapshot.ref.getDownloadURL();
      await db.collection('gallery').add({
        url,
        name: file.name,
        userId: currentUser.uid,
        userDisplay: currentUser.displayName || currentUser.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      els.uploadProgress.classList.add('hidden');
      els.fileInput.value = '';
    }
  );
}

// -------- GALLERY (FIRESTORE) --------

let currentUser = null;
let unsubscribe = null;

function renderGallery(snapshot) {
  els.galleryGrid.innerHTML = '';
  if (snapshot.empty) {
    els.emptyState.classList.remove('hidden');
    return;
  }
  els.emptyState.classList.add('hidden');

  snapshot.forEach(doc => {
    const data = doc.data();
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      <img src="${data.url}" alt="${escapeHtml(data.name)}" loading="lazy" />
      <div class="overlay">
        <span class="name">${escapeHtml(data.name)}</span>
        <button class="del-btn" data-id="${doc.id}" data-url="${data.url}">Delete</button>
      </div>`;
    els.galleryGrid.appendChild(card);
  });

  els.galleryGrid.querySelectorAll('.del-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteImage(btn.dataset.id, btn.dataset.url));
  });
}

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

async function deleteImage(docId, imageUrl) {
  if (!confirm('Delete this image?')) return;
  try {
    await storage.refFromURL(imageUrl).delete();
    await db.collection('gallery').doc(docId).delete();
  } catch (err) {
    console.error(err);
    alert('Delete failed: ' + err.message);
  }
}

function startListening() {
  if (unsubscribe) unsubscribe();
  unsubscribe = db.collection('gallery')
    .where('userId', '==', currentUser.uid)
    .orderBy('createdAt', 'desc')
    .onSnapshot(renderGallery);
}

// -------- AUTH STATE --------

auth.onAuthStateChanged(user => {
  if (unsubscribe) { unsubscribe(); unsubscribe = null; }
  if (user) {
    currentUser = user;
    els.userDisplay.textContent = user.displayName || user.email;
    showSection(els.gallerySection);
    startListening();
  } else {
    currentUser = null;
    els.galleryGrid.innerHTML = '';
    showSection(els.authSection);
  }
});
