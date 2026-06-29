let posts = JSON.parse(localStorage.getItem('posts')) || [
  {
    id: 1,
    author: 'Sarah Chen',
    avatar: 'S',
    time: '2h',
    text: 'Just finished building my first React app! 🚀 The learning curve is steep but so rewarding. Anyone else learning React right now?',
    image: 'https://placehold.co/680x400/1877f2/fff?text=React+App',
    likes: 24,
    liked: false,
    comments: [
      { author: 'Mike Torres', text: 'Awesome! Keep it up 💪' },
      { author: 'Emma Wilson', text: 'React is amazing! Try Next.js next' }
    ]
  },
  {
    id: 2,
    author: 'Mike Torres',
    avatar: 'M',
    time: '5h',
    text: 'Beautiful sunset from the rooftop today 🌅',
    image: 'https://placehold.co/680x450/f39c12/fff?text=Sunset',
    likes: 42,
    liked: false,
    comments: [
      { author: 'Alex Johnson', text: 'Stunning view!' }
    ]
  },
  {
    id: 3,
    author: 'Tech Community',
    avatar: 'T',
    time: '8h',
    text: '📢 JavaScript Tip of the Day:\n\nUse optional chaining (?.) to safely access nested object properties without getting "Cannot read property of undefined" errors.\n\nconst name = user?.profile?.name;\n\nMuch cleaner than long if/else chains!',
    image: '',
    likes: 156,
    liked: false,
    comments: [
      { author: 'Sarah Chen', text: 'Great tip! I use this daily' },
      { author: 'James Brown', text: 'Another good one: nullish coalescing ??' },
      { author: 'Lisa Wang', text: 'So helpful, thanks!' }
    ]
  }
];

let nextId = 4;
let editingPostId = null;

const feedPosts = document.getElementById('feedPosts');
const createPostInput = document.getElementById('createPostInput');
const postModal = document.getElementById('postModal');
const postModalOverlay = document.getElementById('postModalOverlay');
const postModalClose = document.getElementById('postModalClose');
const postTextarea = document.getElementById('postTextarea');
const postSubmitBtn = document.getElementById('postSubmitBtn');

function savePosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function timeAgo() {
  const now = new Date();
  return 'Just now';
}

function renderPosts() {
  feedPosts.innerHTML = '';
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.dataset.id = post.id;

    const likeIcon = post.liked
      ? '<svg viewBox="0 0 24 24" fill="#1877f2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="#65676b"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

    const imgHtml = post.image ? `<img class="post-image" src="${post.image}" alt="">` : '';

    const commentsHtml = post.comments.map(c =>
      `<div class="comment-item"><strong>${c.author}</strong>${c.text}</div>`
    ).join('');

    card.innerHTML = `
      <div class="post-header">
        <div class="post-avatar" style="background:${getAvatarColor(post.author)}">${post.avatar}</div>
        <div class="post-header-info">
          <div class="post-header-name">${post.author}</div>
          <div class="post-header-time">${post.time} · 🌐</div>
        </div>
        <div class="post-header-more">•••</div>
      </div>
      <div class="post-text">${post.text.replace(/\n/g, '<br>')}</div>
      ${imgHtml}
      <div class="post-stats">
        <span>❤️ ${post.likes}</span>
        <span>${post.comments.length} comments</span>
      </div>
      <div class="post-actions">
        <button class="post-action-btn like-btn ${post.liked ? 'liked' : ''}" data-id="${post.id}">
          ${likeIcon} Like
        </button>
        <button class="post-action-btn comment-toggle" data-id="${post.id}">
          <svg viewBox="0 0 24 24" fill="#65676b"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
          Comment
        </button>
        <button class="post-action-btn">
          <svg viewBox="0 0 24 24" fill="#65676b"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
          Share
        </button>
      </div>
      <div class="comments-section">
        ${commentsHtml}
        <div class="comment-input-wrap">
          <div class="post-avatar" style="background:#1877f2;width:32px;height:32px;font-size:0.75rem">A</div>
          <input class="comment-input" placeholder="Write a comment..." data-id="${post.id}">
        </div>
      </div>
    `;

    feedPosts.appendChild(card);
  });
}

function getAvatarColor(name) {
  const colors = ['#1877f2','#e74c3c','#2ecc71','#f39c12','#9b59b6','#1abc9c','#e67e22','#3498db'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

// Like
feedPosts.addEventListener('click', (e) => {
  const likeBtn = e.target.closest('.like-btn');
  if (likeBtn) {
    const id = Number(likeBtn.dataset.id);
    const post = posts.find(p => p.id === id);
    if (post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      savePosts();
      renderPosts();
    }
    return;
  }

  const commentToggle = e.target.closest('.comment-toggle');
  if (commentToggle) {
    const id = Number(commentToggle.dataset.id);
    const input = document.querySelector(`.comment-input[data-id="${id}"]`);
    if (input) { input.focus(); }
    return;
  }
});

// Comment
feedPosts.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const input = e.target.closest('.comment-input');
    if (input) {
      const id = Number(input.dataset.id);
      const text = input.value.trim();
      if (text) {
        const post = posts.find(p => p.id === id);
        if (post) {
          post.comments.push({ author: 'Alex Johnson', text });
          savePosts();
          renderPosts();
        }
      }
    }
  }
});

// Create Post Modal
createPostInput.addEventListener('click', () => {
  editingPostId = null;
  postTextarea.value = '';
  postSubmitBtn.textContent = 'Post';
  postModal.classList.add('active');
  postModalOverlay.classList.add('active');
  postTextarea.focus();
});

postModalClose.addEventListener('click', () => {
  postModal.classList.remove('active');
  postModalOverlay.classList.remove('active');
});

postModalOverlay.addEventListener('click', () => {
  postModal.classList.remove('active');
  postModalOverlay.classList.remove('active');
});

postSubmitBtn.addEventListener('click', () => {
  const text = postTextarea.value.trim();
  if (!text) return;

  const newPost = {
    id: nextId++,
    author: 'Alex Johnson',
    avatar: 'A',
    time: timeAgo(),
    text,
    image: '',
    likes: 0,
    liked: false,
    comments: []
  };
  posts.unshift(newPost);
  savePosts();
  renderPosts();
  postModal.classList.remove('active');
  postModalOverlay.classList.remove('active');
});

postTextarea.addEventListener('input', () => {
  postSubmitBtn.disabled = !postTextarea.value.trim();
});

renderPosts();
