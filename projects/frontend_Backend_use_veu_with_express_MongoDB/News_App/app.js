let apiKey = localStorage.getItem('gnewsKey') || '';
let currentCategory = 'general';
let currentQuery = '';

const setupCard = document.getElementById('setupCard');
const appMain = document.getElementById('appMain');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveKeyBtn = document.getElementById('saveKeyBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const newsGrid = document.getElementById('newsGrid');
const error = document.getElementById('error');

function showApp() {
  setupCard.style.display = 'none';
  appMain.classList.add('visible');
}

function showSetup() {
  setupCard.style.display = 'block';
  appMain.classList.remove('visible');
}

saveKeyBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (!key) return;
  apiKey = key;
  localStorage.setItem('gnewsKey', key);
  showApp();
  error.textContent = '';
  fetchNews();
});

apiKeyInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveKeyBtn.click();
});

if (apiKey) {
  apiKeyInput.value = apiKey;
  showApp();
  fetchNews();
}

async function fetchNews() {
  error.textContent = '';
  newsGrid.innerHTML = '<div class="loader">Loading news...</div>';

  try {
    const query = currentQuery || currentCategory;
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=12&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.errors) {
      const msg = data.errors[0] || 'Invalid API key.';
      if (msg.toLowerCase().includes('key') || msg.toLowerCase().includes('token') || msg.toLowerCase().includes('unauthorized') || msg.toLowerCase().includes('401')) {
        error.textContent = 'Invalid API key. Get a free key at gnews.io and try again.';
        showSetup();
        apiKey = '';
        localStorage.removeItem('gnewsKey');
      } else {
        error.textContent = msg;
      }
      newsGrid.innerHTML = '';
      return;
    }

    if (!data.articles || data.articles.length === 0) {
      newsGrid.innerHTML = '<div class="loader">No articles found. Try a different search.</div>';
      return;
    }

    newsGrid.innerHTML = '';
    data.articles.forEach(article => {
      const card = document.createElement('a');
      card.className = 'news-card';
      card.href = article.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';

      const img = article.image || 'https://placehold.co/400x200?text=News';
      const published = new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });

      card.innerHTML = `
        <img src="${img}" alt="" onerror="this.src='https://placehold.co/400x200?text=No+Image'">
        <div class="content">
          <div class="source">${article.source.name || 'News'}</div>
          <div class="title">${article.title}</div>
          <div class="desc">${article.description || ''}</div>
          <div class="time">${published}</div>
        </div>
      `;
      newsGrid.appendChild(card);
    });
  } catch {
    error.textContent = 'Network error. Check your connection.';
    newsGrid.innerHTML = '';
  }
}

searchBtn.addEventListener('click', () => {
  currentQuery = searchInput.value.trim();
  if (!currentQuery) return;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  fetchNews();
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchBtn.click();
});

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
    currentQuery = '';
    searchInput.value = '';
    fetchNews();
  });
});
