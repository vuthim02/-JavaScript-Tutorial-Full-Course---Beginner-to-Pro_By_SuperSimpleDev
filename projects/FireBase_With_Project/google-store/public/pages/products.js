// -------- PRODUCTS PAGE --------

let currentFilter = 'All';
let currentSort = 'featured';

function getVisibleProducts() {
    let filtered = PRODUCTS.filter((p) => !p.isCategory);
    if (currentFilter !== 'All') filtered = filtered.filter((p) => p.category === currentFilter);

    const sorted = [...filtered];
    switch (currentSort) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
    }
    return sorted;
}

function renderProducts() {
    const cats = ['All', ...PRODUCTS.filter((p) => p.isCategory).map((c) => c.name)];
    const filtered = getVisibleProducts();
    const totalProducts = PRODUCTS.filter((p) => !p.isCategory).length;

    mainEl.innerHTML = `
    <div class="products-header">
      <div>
        <h2>${currentFilter}</h2>
        <p class="results-meta">${filtered.length} of ${totalProducts} products shown</p>
      </div>
      <div class="products-toolbar">
        <button class="clear-filters-btn" id="clear-filters">Clear Filters</button>
        <label class="sort-wrap">
          <span>Sort</span>
          <select id="sort-select">
            <option value="featured" ${currentSort === 'featured' ? 'selected' : ''}>Featured</option>
            <option value="price-low" ${currentSort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
            <option value="price-high" ${currentSort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
            <option value="name" ${currentSort === 'name' ? 'selected' : ''}>Name: A to Z</option>
          </select>
        </label>
      </div>
    </div>
    <div class="filter-bar filter-bar-inline">
      ${cats.map((c) => `<button class="filter-btn ${c === currentFilter ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}
    </div>
    <div class="product-grid">
      ${filtered.map((p) => productCard(p)).join('')}
      ${filtered.length === 0 ? '<div class="cart-empty" style="grid-column:1/-1"><i class="fas fa-box-open"></i><p>No products match your current selection.</p></div>' : ''}
    </div>`;

    mainEl.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.cat;
            renderProducts();
        });
    });

    const clearBtn = mainEl.querySelector('#clear-filters');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            currentFilter = 'All';
            currentSort = 'featured';
            renderProducts();
        });
    }

    const sortSelect = mainEl.querySelector('#sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }

    mainEl.querySelectorAll('.product-card').forEach((el) => {
        el.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-btn')) return;
            const id = el.dataset.id;
            const p = PRODUCTS.find((x) => x.id === id);
            if (p) showProductModal(p);
        });
    });

    mainEl.querySelectorAll('.add-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const p = PRODUCTS.find((x) => x.id === btn.dataset.id);
            if (p) addToCart(p);
        });
    });
}

// -------- PRODUCT DETAIL MODAL --------

function showProductModal(product) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const featList = product.features
        ? product.features
              .map((f) => `<li><i class="fas fa-check-circle"></i> ${esc(f)}</li>`)
              .join('')
        : '';
    const prime = hasPrime(product.id);
    const rating = randomRating();
    const reviews = randomReviews();

    overlay.innerHTML = `
    <div class="modal">
      <button class="modal-close"><i class="fas fa-times"></i></button>
      <div class="modal-grid">
        <div class="img-wrap">
          <img src="${escUrl(getProductImageUrl(product))}" alt="${esc(product.name)}" onerror="this.onerror=null;this.src='${escUrl(getFallbackImageUrl(product))}';this.classList.add('fallback-img')" />
        </div>
        <div class="detail">
          <p class="breadcrumb">${esc(product.category)}</p>
          <h2>${esc(product.name)}</h2>
          <div class="rating-row">
            <span class="stars">${starRating(rating)}</span>
            <span class="review-count">${reviews} ratings</span>
          </div>
          <p class="price">$${product.price.toFixed(2)}</p>
          <p class="price-sub">No Import Fees & Free Shipping included</p>
          ${prime ? '<div class="modal-prime-tag"><i class="fas fa-check-circle"></i> Prime — FREE delivery</div>' : ''}
          <p class="desc">${esc(product.desc)}</p>
          ${featList ? `<ul class="features">${featList}</ul>` : ''}
          <button class="btn-add-cart" data-id="${product.id}"><i class="fas fa-shopping-cart"></i> Add to Cart — $${product.price.toFixed(2)}</button>
        </div>
      </div>
    </div>`;

    document.body.appendChild(overlay);

    overlay.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    const wishBtn = document.createElement('button');
    wishBtn.className = `modal-wish-btn ${isInWishlist(product.id) ? 'in-wishlist' : ''}`;
    wishBtn.innerHTML = isInWishlist(product.id)
        ? '<i class="fas fa-heart"></i> Saved'
        : '<i class="far fa-heart"></i> Save to Wishlist';
    overlay.querySelector('.detail').appendChild(wishBtn);

    wishBtn.addEventListener('click', () => {
        toggleWishlist(product);
        const inList = isInWishlist(product.id);
        wishBtn.innerHTML = inList
            ? '<i class="fas fa-heart"></i> Saved'
            : '<i class="far fa-heart"></i> Save to Wishlist';
        wishBtn.classList.toggle('in-wishlist', inList);
    });

    overlay.querySelector('.btn-add-cart').addEventListener('click', () => {
        addToCart(product);
        overlay.remove();
    });
}
