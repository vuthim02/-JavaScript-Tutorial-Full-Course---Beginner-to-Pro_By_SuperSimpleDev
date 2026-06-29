const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const profileDiv = document.getElementById('profile');
const errorMsg = document.getElementById('errorMsg');

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

function renderProfile(user) {
  profileDiv.innerHTML = `
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
  `;
}

async function handleSearch() {
  const username = searchInput.value.trim();

  if (!username) {
    errorMsg.textContent = 'Please enter a username';
    profileDiv.innerHTML = '';
    return;
  }

  errorMsg.textContent = '';
  profileDiv.innerHTML = 'Loading...';

  try {
    const user = await fetchUser(username);
    renderProfile(user);
  } catch (err) {
    errorMsg.textContent = err.message;
    profileDiv.innerHTML = '';
  }
}

searchBtn.addEventListener('click', handleSearch);

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});
