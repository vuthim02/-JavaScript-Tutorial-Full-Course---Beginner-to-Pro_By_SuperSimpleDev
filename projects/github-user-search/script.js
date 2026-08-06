const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('username');
const profileDiv = document.getElementById('user-info');
const errorMsg = document.getElementById('errorMsg');
const suggestionsList = document.getElementById('suggestions');

let suggestionItems = [];
let selectedIndex = -1;

function debounce(fn, wait = 250) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

async function fetchUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('User not found');
        }
        throw new Error('Something went wrong');
    }

    return response.json();
}

async function fetchSuggestions(query) {
    if (!query) return [];
    try {
        const resp = await fetch(
            `https://api.github.com/search/users?q=${encodeURIComponent(query)}+in:login&per_page=6`
        );
        if (!resp.ok) return [];
        const data = await resp.json();
        return data.items || [];
    } catch (e) {
        return [];
    }
}

function renderProfile(user) {
    profileDiv.innerHTML = `
    <div class="profile-card">
      <div class="profile-header">
        <img class="avatar" src="${user.avatar_url}" alt="${user.login}">
        <div class="profile-info">
          <h2>${user.name || user.login}</h2>
          <div class="login">@${user.login}</div>
          ${user.bio ? `<div class="bio">${user.bio}</div>` : ''}
        </div>
      </div>
      <div class="stats">
        <div class="stat">
          <div class="stat-value">${user.public_repos}</div>
          <div class="stat-label">Repos</div>
        </div>
        <div class="stat">
          <div class="stat-value">${user.followers}</div>
          <div class="stat-label">Followers</div>
        </div>
        <div class="stat">
          <div class="stat-value">${user.following}</div>
          <div class="stat-label">Following</div>
        </div>
      </div>
      <a class="profile-link" href="${user.html_url}" target="_blank">
        View Profile on GitHub →
      </a>
    </div>
  `;
}

async function handleSearch(usernameArg) {
    const username = (usernameArg || searchInput.value).trim();

    if (!username) {
        errorMsg.textContent = 'Please enter a username';
        profileDiv.innerHTML = '';
        return;
    }

    errorMsg.textContent = '';
    profileDiv.innerHTML =
        '<div class="loading"><div class="spinner"></div><div class="loading-text">Fetching user data...</div></div>';

    try {
        const user = await fetchUser(username);
        renderProfile(user);
    } catch (err) {
        errorMsg.textContent = err.message;
        profileDiv.innerHTML = '';
    }
}

function clearSuggestions() {
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';
    searchInput.setAttribute('aria-expanded', 'false');
    suggestionItems = [];
    selectedIndex = -1;
}

function openSuggestions() {
    suggestionsList.style.display = 'block';
    searchInput.setAttribute('aria-expanded', 'true');
}

function renderSuggestions(items) {
    suggestionItems = items;
    selectedIndex = -1;
    suggestionsList.innerHTML = '';
    if (!items || items.length === 0) {
        clearSuggestions();
        return;
    }

    items.forEach((it, i) => {
        const li = document.createElement('li');
        li.className = 'suggestion-item';
        li.setAttribute('role', 'option');
        li.setAttribute('data-login', it.login);
        li.id = `suggestion-${i}`;
        li.innerHTML = `
      <img class="suggestion-avatar" src="${it.avatar_url}" alt="${it.login}">
      <div class="suggestion-meta">
        <div class="suggestion-login">${it.login}</div>
        <div class="suggestion-type">${it.type}</div>
      </div>
    `;

        li.addEventListener('mousedown', (e) => {
            // prevent input blur before click
            e.preventDefault();
        });

        li.addEventListener('click', () => {
            selectSuggestion(i);
        });

        suggestionsList.appendChild(li);
    });

    openSuggestions();
}

function selectSuggestion(index) {
    const item = suggestionItems[index];
    if (!item) return;
    searchInput.value = item.login;
    clearSuggestions();
    handleSearch(item.login);
}

function highlightSuggestion(index) {
    const children = Array.from(suggestionsList.children);
    children.forEach((ch, idx) => {
        if (idx === index) {
            ch.classList.add('active');
            ch.setAttribute('aria-selected', 'true');
            ch.scrollIntoView({ block: 'nearest' });
        } else {
            ch.classList.remove('active');
            ch.setAttribute('aria-selected', 'false');
        }
    });
}

const debouncedSuggest = debounce(async (value) => {
    if (!value || value.length < 2) {
        clearSuggestions();
        return;
    }
    const items = await fetchSuggestions(value);
    renderSuggestions(items);
}, 300);

searchInput.addEventListener('input', (e) => {
    const v = e.target.value.trim();
    debouncedSuggest(v);
});

searchInput.addEventListener('keydown', (e) => {
    const visible = suggestionsList.style.display !== 'none' && suggestionsList.children.length > 0;
    if (!visible) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, suggestionsList.children.length - 1);
        highlightSuggestion(selectedIndex);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, 0);
        highlightSuggestion(selectedIndex);
    } else if (e.key === 'Enter') {
        if (selectedIndex >= 0) {
            e.preventDefault();
            selectSuggestion(selectedIndex);
        }
    } else if (e.key === 'Escape') {
        clearSuggestions();
    }
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-control')) {
        clearSuggestions();
    }
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearSuggestions();
    handleSearch();
});

const themeBtn = document.getElementById('theme-btn');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeBtn.textContent = theme === 'dark' ? '\u2600' : '\u263E';
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});




