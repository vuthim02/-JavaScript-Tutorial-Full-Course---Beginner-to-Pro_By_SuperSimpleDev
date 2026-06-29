let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
let filterCat = 'All';
let searchQuery = '';

const form = document.getElementById('form');
const title = document.getElementById('title');
const url = document.getElementById('url');
const category = document.getElementById('category');
const search = document.getElementById('search');
const bookmarksEl = document.getElementById('bookmarks');

function save() {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function render() {
  const filtered = bookmarks.filter(b => {
    const matchCat = filterCat === 'All' || b.category === filterCat;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || b.title.toLowerCase().includes(q) || b.url.toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  bookmarksEl.innerHTML = '';
  filtered.forEach((b, i) => {
    const idx = bookmarks.indexOf(b);
    const div = document.createElement('div');
    div.className = 'bookmark';
    div.innerHTML = `
      <div class="info">
        <div class="title">${b.title}</div>
        <div class="url">${b.url}</div>
      </div>
      <span class="cat-badge">${b.category}</span>
      <button class="delete-btn" data-index="${idx}">&times;</button>
    `;
    bookmarksEl.appendChild(div);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bookmarks.splice(Number(btn.dataset.index), 1);
      save();
      render();
    });
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const t = title.value.trim();
  const u = url.value.trim();
  const c = category.value;
  if (!t || !u) return;
  bookmarks.push({ title: t, url: u, category: c });
  save();
  render();
  form.reset();
});

search.addEventListener('input', () => {
  searchQuery = search.value.trim();
  render();
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterCat = btn.dataset.cat;
    render();
  });
});

render();
