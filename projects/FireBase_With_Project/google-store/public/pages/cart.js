// -------- CART PAGE --------

function renderCart() {
  const items = getCartItems();
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  if (items.length === 0) {
    mainEl.innerHTML = `
      <div class="cart-page">
        <h2>Shopping Cart</h2>
        <div class="cart-empty">
          <i class="fas fa-shopping-cart"></i>
          <p>Your Amazon Cart is empty.</p>
          <a href="#" data-page="products">Shop now</a>
        </div>
      </div>`;
    updateCartBadge(0);
    return;
  }

  updateCartBadge(count);

  mainEl.innerHTML = `
    <div class="cart-page">
      <h2>Shopping Cart</h2>
      <div class="cart-items-wrap">
        ${items.map(item => `
          <div class="cart-item" data-id="${item.id}">
            <img src="${escUrl(item.image)}" alt="${esc(item.name)}" onerror="this.onerror=null;this.style.display='none'" />
            <div class="ci-info">
              <h4>${esc(item.name)}</h4>
              <p class="ci-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="ci-qty">
              <button class="qty-minus" data-id="${item.id}">−</button>
              <span>${item.qty}</span>
              <button class="qty-plus" data-id="${item.id}">+</button>
            </div>
            <div class="ci-total">$${(item.price * item.qty).toFixed(2)}</div>
            <button class="ci-del" data-id="${item.id}" title="Delete"><i class="fas fa-trash-alt"></i></button>
          </div>`).join('')}
      </div>
      <div class="cart-bottom">
        <div class="cart-summary">
          <div class="row"><span>Subtotal (${count} items)</span><span>$${total.toFixed(2)}</span></div>
          <div class="row"><span>Shipping</span><span class="free">FREE</span></div>
          <div class="row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
          <button class="btn-checkout">Proceed to Checkout</button>
        </div>
      </div>
    </div>`;

  mainEl.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => { updateCartQty(btn.dataset.id, 1); renderCart(); });
  });
  mainEl.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => { updateCartQty(btn.dataset.id, -1); renderCart(); });
  });
  mainEl.querySelectorAll('.ci-del').forEach(btn => {
    btn.addEventListener('click', () => { removeFromCart(btn.dataset.id); renderCart(); });
  });
  mainEl.querySelector('.btn-checkout').addEventListener('click', checkout);
}