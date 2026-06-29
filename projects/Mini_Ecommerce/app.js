const products = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, img: 'https://placehold.co/400x300/3498db/fff?text=Headphones' },
  { id: 2, name: 'Leather Backpack',     price: 59.99, img: 'https://placehold.co/400x300/2ecc71/fff?text=Backpack' },
  { id: 3, name: 'Smart Watch',          price: 199.99, img: 'https://placehold.co/400x300/e74c3c/fff?text=Watch' },
  { id: 4, name: 'Bluetooth Speaker',    price: 39.99, img: 'https://placehold.co/400x300/f39c12/fff?text=Speaker' },
  { id: 5, name: 'USB-C Hub',            price: 34.99, img: 'https://placehold.co/400x300/9b59b6/fff?text=USB-C' },
  { id: 6, name: 'Mechanical Keyboard',  price: 89.99, img: 'https://placehold.co/400x300/1abc9c/fff?text=Keyboard' },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productsEl = document.getElementById('products');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutSummary = document.getElementById('checkoutSummary');
const toast = document.getElementById('toast');

function save() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function renderProducts() {
  productsEl.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="price">$${p.price.toFixed(2)}</div>
        <button class="add-btn" data-id="${p.id}">Add to Cart</button>
      </div>
    `;
    productsEl.appendChild(div);
  });
}

function renderCart() {
  cartItems.innerHTML = '';
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
    cartCount.textContent = '0';
    cartTotal.textContent = '0.00';
    return;
  }

  let total = 0;
  cart.forEach((item, i) => {
    const p = products.find(x => x.id === item.id);
    const subtotal = p.price * item.qty;
    total += subtotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="item-info">
        <div class="item-name">${p.name}</div>
        <div class="item-price">$${subtotal.toFixed(2)}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-down" data-index="${i}">−</button>
        <span>${item.qty}</span>
        <button class="qty-up" data-index="${i}">+</button>
      </div>
      <button class="remove-btn" data-index="${i}">&times;</button>
    `;
    cartItems.appendChild(div);
  });

  cartCount.textContent = cart.reduce((s, c) => s + c.qty, 0);
  cartTotal.textContent = total.toFixed(2);
}

function openCart() {
  cartSidebar.classList.add('active');
  cartOverlay.classList.add('active');
  renderCart();
}

function closeCartFn() {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
}

productsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-btn');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  save();
  renderCart();
  showToast('Added to cart!');
});

cartItems.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('qty-up')) {
    const i = Number(target.dataset.index);
    cart[i].qty++;
    if (cart[i].qty > 99) cart[i].qty = 99;
    save();
    renderCart();
  }
  if (target.classList.contains('qty-down')) {
    const i = Number(target.dataset.index);
    cart[i].qty--;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    save();
    renderCart();
  }
  if (target.classList.contains('remove-btn')) {
    cart.splice(Number(target.dataset.index), 1);
    save();
    renderCart();
  }
});

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartFn);
cartOverlay.addEventListener('click', closeCartFn);

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  closeCartFn();
  let summary = '';
  let total = 0;
  cart.forEach(item => {
    const p = products.find(x => x.id === item.id);
    summary += `${p.name} × ${item.qty} — $${(p.price * item.qty).toFixed(2)}\n`;
    total += p.price * item.qty;
  });
  summary += `\nTotal: $${total.toFixed(2)}`;
  checkoutSummary.textContent = summary;
  checkoutModal.classList.add('active');
});

closeCheckout.addEventListener('click', () => {
  checkoutModal.classList.remove('active');
});

checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  cart = [];
  save();
  renderCart();
  checkoutModal.classList.remove('active');
  checkoutForm.reset();
  showToast('Order placed! 🎉');
});

renderProducts();
renderCart();
