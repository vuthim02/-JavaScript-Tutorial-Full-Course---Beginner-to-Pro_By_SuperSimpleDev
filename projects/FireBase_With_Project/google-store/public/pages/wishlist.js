function getWishlist() {
  try { return JSON.parse(localStorage.getItem('wishlist')) || []; }
  catch { return []; }
}

function saveWishlist(items) {
  localStorage.setItem('wishlist', JSON.stringify(items));
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const items = getWishlist();
  document.querySelectorAll('#wishlist-count').forEach(el => {
    if (items.length > 0) { el.textContent = items.length; el.classList.remove('hidden'); }
    else el.classList.add('hidden');
  });
}

function toggleWishlist(product) {
  const items = getWishlist();
  const idx = items.findIndex(i => i.id === product.id);
  if (idx > -1) {
    items.splice(idx, 1);
    showToast('Removed from wishlist');
  } else {
    items.push({ id: product.id, name: product.name, price: product.price, image: product.image });
    showToast('Added to wishlist!');
  }
  saveWishlist(items);
  updateWishlistButtons();
}

function isInWishlist(id) {
  return getWishlist().some(i => i.id === id);
}

function updateWishlistButtons() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const id = btn.dataset.id;
    const inList = isInWishlist(id);
    btn.innerHTML = inList ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    btn.classList.toggle('in-wishlist', inList);
  });
}

function renderWishlist() {
  const items = getWishlist();

  mainEl.innerHTML = `
    <div class="section" style="padding:24px 20px;">
      <div class="section-header">
        <h2 class="section-title"><i class="fas fa-heart" style="color:var(--danger);"></i> My Wishlist (${items.length})</h2>
      </div>
      ${items.length === 0 ? `
        <div class="cart-empty" style="grid-column:1/-1">
          <i class="far fa-heart"></i>
          <p>Your wishlist is empty.</p>
          <a href="#" data-page="products">Discover products</a>
        </div>
      ` : `
        <div class="product-grid">
          ${items.map(item => {
            const p = PRODUCTS.find(x => x.id === item.id);
            return p ? productCard(p) : '';
          }).join('')}
        </div>
      `}
    </div>`;

  mainEl.querySelectorAll('.product-card').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.classList.contains('add-btn') || e.target.closest('.wishlist-btn')) return;
      const p = PRODUCTS.find(x => x.id === el.dataset.id);
      if (p) showProductModal(p);
    });
  });

  mainEl.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const p = PRODUCTS.find(x => x.id === btn.dataset.id);
      if (p) addToCart(p);
    });
  });

  mainEl.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const p = PRODUCTS.find(x => x.id === btn.dataset.id);
      if (p) toggleWishlist(p);
    });
  });

  updateWishlistButtons();
}
