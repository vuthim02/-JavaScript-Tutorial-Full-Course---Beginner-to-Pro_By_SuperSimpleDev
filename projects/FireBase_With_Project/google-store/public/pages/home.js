// -------- HOME PAGE --------

function renderHome() {
  const cats = PRODUCTS.filter(p => p.isCategory).sort((a, b) => a.order - b.order);
  const featured = PRODUCTS.filter(p => !p.isCategory).slice(0, 8);

  mainEl.innerHTML = `
    <div class="hero">
      <h1>Welcome to <strong>Google Store</strong></h1>
      <p>Discover the latest from Google — Pixel phones, Nest smart home, wearables & more</p>
    </div>
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Shop by Category</h2>
        <a href="#" data-page="products" class="section-link">See all <i class="fas fa-chevron-right" style="font-size:10px;"></i></a>
      </div>
      <div class="category-grid">
        ${cats.map(c => `
          <div class="category-card" data-cat="${c.name}">
            <span class="cat-icon">${c.icon}</span>
            <span class="cat-name">${c.name}</span>
          </div>`).join('')}
      </div>
    </div>
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Featured Products</h2>
        <a href="#" data-page="products" class="section-link">See all <i class="fas fa-chevron-right" style="font-size:10px;"></i></a>
      </div>
      <div class="product-grid">
        ${featured.map(p => productCard(p)).join('')}
      </div>
    </div>`;

  mainEl.querySelectorAll('.category-card').forEach(el => {
    el.addEventListener('click', () => {
      currentFilter = el.dataset.cat;
      navigate('products');
    });
  });

  mainEl.querySelectorAll('.product-card').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.classList.contains('add-btn')) return;
      const id = el.dataset.id;
      const p = PRODUCTS.find(x => x.id === id);
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
}