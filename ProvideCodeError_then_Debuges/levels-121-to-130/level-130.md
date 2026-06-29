# Level 130: Complete E-commerce Module Review (All Modules 11-14)

## Error Snippets

### Error 1: Array method confusion for adding to cart
**Description:** Add item to cart array
```javascript
const cart = ['Shirt', 'Pants'];
const newCart = cart.push('Hat');
```

### Error 2: Closure losing cart state
**Description:** Create cart module with private state
```javascript
function createCart() {
  let items = [];
  return {
    addItem: (item) => items.push(item),
    getItems: () => items
  };
}
const cart = createCart();
cart.addItem({ name: 'Shirt' });
```

### Error 3: Not using return in map for product list
**Description:** Create product card elements
```javascript
const products = [
  { name: 'Shirt', price: 25 },
  { name: 'Pants', price: 40 }
];
const cards = products.map(product => {
  const card = document.createElement('div');
  card.textContent = product.name;
});
```

### Error 4: Reduce with wrong initial value for cart total
**Description:** Calculate total price of cart items
```javascript
const cart = [
  { price: 25, qty: 2 },
  { price: 40, qty: 1 }
];
const total = cart.reduce((sum, item) => sum + item.price * item.qty);
```

### Error 5: Git status confusion with merge conflicts
**Description:** Simulate merge conflict scenario
```javascript
// Imagine multiple devs editing same cart module
function updatePrice(itemId, price) {
  // Developer A's change
  const item = findItem(itemId);
  item.price = price;
}
```

### Error 6: filter followed by sort with mutation
**Description:** Get discounted products sorted by price
```javascript
const products = [
  { name: 'Shirt', price: 25, onSale: true },
  { name: 'Pants', price: 40, onSale: false },
  { name: 'Hat', price: 15, onSale: true }
];
const saleItems = products.filter(p => p.onSale);
saleItems.sort((a, b) => a.price - b.price);
```

### Error 7: Arrow function returning object without parens
**Description:** Map products to display objects
```javascript
const products = [
  { name: 'Shirt', price: 25 }
];
const display = products.map(p => { name: p.name.toUpperCase(), price: `$${p.price}` });
```

### Error 8: Not preventing default on form submit
**Description:** Handle product search form
```javascript
document.getElementById('search-form').addEventListener('submit', function() {
  const query = this.querySelector('input').value;
  searchProducts(query);
});
```

### Error 9: Using local variable without initialization
**Description:** Calculate shipping cost
```javascript
function calculateShipping(weight) {
  let cost;
  if (weight < 1) cost = 5;
  else if (weight < 5) cost = 10;
  else cost = 15;
  return cost;
}
```

### Error 10: Splice with wrong arguments for removing item
**Description:** Remove product from cart by index
```javascript
const cart = ['Shirt', 'Pants', 'Hat'];
cart.splice(1);
```

### Error 11: Not handling API error in product fetch
**Description:** Load products from API
```javascript
async function loadProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();
  renderProducts(products);
}
```

### Error 12: Debounce function not preserving arguments
**Description:** Create debounced search
```javascript
function debounce(fn, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}
```

### Error 13: For loop with var causing closure issue
**Description:** Create buttons for each product
```javascript
for (var i = 0; i < products.length; i++) {
  const btn = document.createElement('button');
  btn.textContent = products[i].name;
  btn.addEventListener('click', function() {
    addToCart(products[i]);
  });
  container.appendChild(btn);
}
```

### Error 14: Using delete on array element for cart
**Description:** Remove item from cart
```javascript
function removeFromCart(index) {
  delete cart[index];
}
```

### Error 15: Not converting localStorage string to number
**Description:** Load cart count from localStorage
```javascript
const count = localStorage.getItem('cartCount');
if (count > 0) {
  showBadge(count);
}
```

### Error 16: Wrong method for checking stock
**Description:** Check product availability
```javascript
function isAvailable(product) {
  return product.stock > 1;
}
```

### Error 17: Not using spread for immutable state update
**Description:** Update user profile
```javascript
function updateProfile(updates) {
  user.name = updates.name;
  user.email = updates.email;
}
```

### Error 18: Map with side effects
**Description:** Apply discount and log each product
```javascript
const discounted = products.map(p => {
  p.price = p.price * 0.9;
  console.log(p.name);
  return p;
});
```

### Error 19: Using find on non-array
**Description:** Find product by ID in null list
```javascript
let products = null;
const product = products.find(p => p.id === 1);
```

### Error 20: Filter with wrong comparison operator
**Description:** Get products below $20
```javascript
const cheap = products.filter(p => p.price > 20);
```

### Error 21: Not destructuring function parameters
**Description:** Process order data
```javascript
function processOrder(order) {
  const id = order.id;
  const items = order.items;
  const total = order.total;
}
```

### Error 22: Using == for comparing product IDs
**Description:** Find product in cart
```javascript
const cartItem = cart.find(item => item.id == '1');
```

### Error 23: Not clearing timeout on component unmount
**Description:** Auto-dismiss notification
```javascript
function showNotification(message) {
  const el = document.createElement('div');
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}
```

### Error 24: Adding event listener multiple times
**Description:** Setup add to cart buttons
```javascript
function setupCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', handleAddToCart);
    btn.addEventListener('click', handleAddToCart);
  });
}
```

### Error 25: Wrong index for product removal
**Description:** Remove product by ID
```javascript
function removeProduct(id) {
  const index = products.indexOf(id);
  products.splice(index, 1);
}
```

### Error 26: Using var in for loop for async fetch
**Description:** Fetch prices for all products
```javascript
for (var i = 0; i < products.length; i++) {
  fetch(`/api/price/${products[i].id}`).then(r => r.json()).then(data => {
    products[i].price = data.price;
  });
}
```

### Error 27: Not using ensure array before methods
**Description:** Process categories
```javascript
function processCategories(data) {
  data.categories.forEach(c => processCategory(c));
}
```

### Error 28: Nested destructuring with default on wrong level
**Description:** Extract product info with defaults
```javascript
const product = { name: 'Shirt' };
const { name, details = {} } = product;
const { color } = details;
```

### Error 29: Magic number for discount calculation
**Description:** Apply seasonal discount
```javascript
function applySeasonalDiscount(price) {
  return price * 0.75;
}
```

### Error 30: Using concat instead of spread
**Description:** Merge two product arrays
```javascript
const allProducts = currentProducts.concat(newProducts);
```

### Error 31: Not using Set for unique categories
**Description:** Get all product categories
```javascript
const categories = [];
products.forEach(p => {
  if (!categories.includes(p.category)) categories.push(p.category);
});
```

### Error 32: Array copy with reference issue
**Description:** Clone cart for checkout
```javascript
const checkoutCart = cart;
checkoutCart.push({ name: 'Gift Wrap', price: 5 });
```

### Error 33: Wrong property for date in order
**Description:** Sort orders by date
```javascript
orders.sort((a, b) => new Date(a.date) - new Date(b.date));
```

### Error 34: Calling map on null response
**Description:** Process API response
```javascript
const response = await fetch('/api/products');
const data = await response.json();
const names = data.map(p => p.name);
```

### Error 35: Not handling empty cart in checkout
**Description:** Proceed to checkout
```javascript
function checkout() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  processPayment(total);
}
```

### Error 36: Push return value confusion
**Description:** Add product and get new count
```javascript
const count = cart.push({ name: 'Hat', price: 15 });
```

### Error 37: Not using optional chaining for product variants
**Description:** Get product variant name
```javascript
function getVariantName(product) {
  return product.variants[0].name;
}
```

### Error 38: Wrong method for checking element existence
**Description:** Check if product element exists
```javascript
if (document.getElementById('product-1')) {
  updateProductElement(data);
}
```

### Error 39: Recursion without base case
**Description:** Calculate nested category depth
```javascript
function getCategoryDepth(category) {
  if (category.subcategories) {
    return 1 + getCategoryDepth(category.subcategories[0]);
  }
}
```

### Error 40: Using innerHTML with template injection
**Description:** Display product review
```javascript
function renderReview(review) {
  const div = document.createElement('div');
  div.innerHTML = `<p>${review.text}</p>`;
  return div;
}
```

### Error 41: Not using nullish coalescing for defaults
**Description:** Get product price with fallback
```javascript
function getPrice(product) {
  return product.salePrice || product.price || 0;
}
```

### Error 42: Array.flatMap on non-nested array
**Description:** Get all tags from products
```javascript
const products = [
  { tags: ['cotton', 'blue'] },
  { tags: ['polyester'] }
];
const tags = products.flatMap(p => p.tags.length);
```

### Error 43: Not handling network error in fetch
**Description:** Load product data
```javascript
async function loadProduct(id) {
  const res = await fetch(`/api/products/${id}`);
  return res.json();
}
```

### Error 44: Wrong variable used in loop
**Description:** Render product grid
```javascript
for (let i = 0; i < products.length; i++) {
  const card = document.createElement('div');
  card.textContent = product.name;
  container.appendChild(card);
}
```

### Error 45: Not closing DB transaction
**Description:** Save order to IndexedDB
```javascript
function saveOrder(order) {
  const request = indexedDB.open('StoreDB', 1);
  request.onsuccess = (e) => {
    const db = e.target.result;
    const tx = db.transaction('orders', 'readwrite');
    tx.objectStore('orders').add(order);
  };
}
```

### Error 46: Chaining sort after filter with side effects
**Description:** Get top-rated products
```javascript
const topRated = products
  .filter(p => p.rating > 4)
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 5);
```

### Error 47: Not preserving original in sort
**Description:** Display products sorted by name
```javascript
function displaySorted() {
  products.sort((a, b) => a.name.localeCompare(b.name));
  renderProducts(products);
}
```

### Error 48: ParseFloat with comma-separated number
**Description:** Parse European price format
```javascript
const price = parseFloat('25,99');
```

### Error 49: Wrong key in product filter
**Description:** Filter products by category
```javascript
const filtered = products.filter(p => p.cat === 'Clothing');
```

### Error 50: Not awaiting promise in map
**Description:** Fetch details for all products
```javascript
const details = products.map(async p => {
  const res = await fetch(`/api/products/${p.id}/details`);
  return res.json();
});
renderDetails(details);
```

### Error 51: Using const for mutable loop
**Description:** Process each product
```javascript
const items = ['Shirt', 'Pants', 'Hat'];
for (const item of items) {
  item = item.toUpperCase();
}
```

### Error 52: Wrong callback arguments for sort
**Description:** Sort products by price descending
```javascript
products.sort((a, b) => a.price - b.price);
```

### Error 53: Not using Array.isArray for validation
**Description:** Process product list from API
```javascript
function processProducts(data) {
  data.products.forEach(p => renderProduct(p));
}
```

### Error 54: Not accounting for floating point
**Description:** Calculate 10% off $29.99
```javascript
const price = 29.99;
const discount = price * 0.1;
const final = price - discount;
```

### Error 55: Using indexOf on array of objects
**Description:** Find product index in cart
```javascript
const cart = [
  { id: 1, name: 'Shirt' },
  { id: 2, name: 'Pants' }
];
const idx = cart.indexOf({ id: 1, name: 'Shirt' });
```

### Error 56: Not handling fetch abort
**Description:** Cancel product fetch
```javascript
const controller = new AbortController();
fetch('/api/products', { signal: controller.signal });
controller.abort();
```

### Error 57: Wrong ternary for product badge
**Description:** Show stock badge
```javascript
const badge = product.stock > 0 ? 'In Stock' : 'Out of Stock';
```

### Error 58: Not using promise all for parallel fetches
**Description:** Fetch product and reviews separately
```javascript
const product = await fetch('/api/product/1').then(r => r.json());
const reviews = await fetch('/api/product/1/reviews').then(r => r.json());
```

### Error 59: Using splice in forEach
**Description:** Remove out-of-stock products from display list
```javascript
displayList.forEach((p, i) => {
  if (p.stock === 0) displayList.splice(i, 1);
});
```

### Error 60: Semicolon after if condition
**Description:** Check product availability
```javascript
if (product.stock > 0);
{
  addToCart(product);
}
```

### Error 61: Wrong property for product image
**Description:** Display product image
```javascript
const img = document.createElement('img');
img.src = product.image;
```

### Error 62: Not handling tab sync for cart
**Description:** Save cart to localStorage
```javascript
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
```

### Error 63: Missing return in forEach callback
**Description:** Check if any product is on sale
```javascript
let hasSale = false;
products.forEach(p => {
  if (p.onSale) return true;
});
```

### Error 64: Forgot to call function in event handler
**Description:** Handle button click
```javascript
btn.addEventListener('click', handleClick());
```

### Error 65: Not grouping related state
**Description:** Manage product filter state
```javascript
let filterCategory = 'all';
let filterPriceMin = 0;
let filterPriceMax = 1000;
let filterSort = 'name';
```

### Error 66: Wrong method for cart quantity update
**Description:** Update quantity of cart item
```javascript
function updateQty(productId, newQty) {
  const item = cart.find(i => i.id === productId);
  item = { ...item, qty: newQty };
}
```

### Error 67: Not using debounce for resize
**Description:** Adjust product grid on resize
```javascript
window.addEventListener('resize', adjustGrid);
```

### Error 68: Overwriting module exports
**Description:** Export cart functions
```javascript
module.exports = { addToCart };
module.exports = { removeFromCart };
```

### Error 69: Confusing parameter order
**Description:** Calculate price with tax and discount
```javascript
function calculatePrice(price, tax, discount) {
  return price * (1 + tax) * (1 - discount);
}
```

### Error 70: Not handling JSON parse error
**Description:** Load saved cart
```javascript
function loadCart() {
  const saved = localStorage.getItem('cart');
  return JSON.parse(saved) || [];
}
```

## Issue Snippets

### Issue 1: Not breaking down large function
**Description:** Complete checkout process
```javascript
async function checkout() {
  const cart = getCart();
  const valid = validateCart(cart);
  if (!valid) return;
  const total = calculateTotal(cart);
  const shipping = getShipping();
  const payment = await processPayment(total);
  const order = createOrder(cart, shipping, payment);
  saveOrder(order);
  sendConfirmation(order);
  clearCart();
  redirectToThankYou();
}
```

### Issue 2: Re-rendering entire product list on filter change
**Description:** Filter products
```javascript
function applyFilter() {
  const filtered = filterProducts();
  renderProducts(filtered);
}
```

### Issue 3: Not memoizing computed values
**Description:** Get cart total multiple times
```javascript
function getTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}
```

### Issue 4: Using for loop instead of forEach
**Description:** Render product list
```javascript
for (let i = 0; i < products.length; i++) {
  renderProduct(products[i]);
}
```

### Issue 5: Not using CSS classes for styling
**Description:** Apply style to product card
```javascript
productCard.style.border = '1px solid #ddd';
productCard.style.padding = '10px';
productCard.style.margin = '5px';
```

### Issue 6: Global variables for cart state
**Description:** Manage cart globally
```javascript
let cart = [];
let total = 0;
let count = 0;
```

### Issue 7: Not using event delegation
**Description:** Add click to each product
```javascript
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => showProduct(card.dataset.id));
});
```

### Issue 8: Inconsistent naming conventions
**Description:** Product variable naming
```javascript
const product_name = 'Shirt';
const productPrice = 25;
const ProductCategory = 'Clothing';
```

### Issue 9: Not using early returns
**Description:** Validate product form
```javascript
function validateProduct(product) {
  if (!product.name) {
    return 'Name required';
  }
  if (!product.price) {
    return 'Price required';
  }
  return null;
}
```

### Issue 10: Not handling loading states
**Description:** Load product data
```javascript
function loadPage() {
  fetchProducts().then(renderProducts);
}
```

### Issue 11: Using confirm/prompt for user interaction
**Description:** Confirm delete product
```javascript
function deleteProduct(id) {
  const confirmed = confirm('Delete this product?');
  if (confirmed) {
    products = products.filter(p => p.id !== id);
  }
}
```

### Issue 12: Mutating props in render
**Description:** Prepare products for display
```javascript
function prepareProducts(products) {
  products.forEach(p => {
    p.displayPrice = `$${p.price.toFixed(2)}`;
  });
  return products;
}
```

### Issue 13: Not using URL params for filter state
**Description:** Filter products
```javascript
function filterProducts(category) {
  const filtered = products.filter(p => p.category === category);
  renderProducts(filtered);
}
```

### Issue 14: Re-fetching data on re-render
**Description:** Refresh product list
```javascript
async function refreshProducts() {
  const data = await fetchProducts();
  renderProducts(data);
}
```

### Issue 15: No error boundary for product rendering
**Description:** Render product with potentially missing data
```javascript
function renderProduct(product) {
  container.innerHTML += `
    <div class="product">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
    </div>
  `;
}
```

### Issue 16: Not handling empty cart display
**Description:** Show cart with no items
```javascript
function renderCart() {
  const items = getCart();
  items.forEach(item => container.appendChild(createCartRow(item)));
}
```

### Issue 17: Not checking product availability before add
**Description:** Add product to cart
```javascript
function addToCart(product) {
  cart.push(product);
  saveCart();
}
```

### Issue 18: Not validating order before submission
**Description:** Submit final order
```javascript
function placeOrder() {
  const order = createOrder(cart, shipping);
  saveOrder(order);
  clearCart();
}
```

### Issue 19: Not handling payment error gracefully
**Description:** Process payment
```javascript
async function chargeCard(paymentInfo) {
  const result = await api.charge(paymentInfo);
  return result;
}
```

### Issue 20: Not sorting orders by date
**Description:** Display order history
```javascript
function renderOrders() {
  const orders = getOrders();
  orders.forEach(o => container.appendChild(createOrderCard(o)));
}
```

### Issue 21: Not checking stock before checkout
**Description:** Validate cart before checkout
```javascript
function validateCart() {
  return cart.length > 0;
}
```

### Issue 22: Not formatting currency consistently
**Description:** Display price
```javascript
function formatPrice(amount) {
  return '$' + amount;
}
```

### Issue 23: Not handling missing product images
**Description:** Render product image
```javascript
function renderProductImage(product) {
  const img = document.createElement('img');
  img.src = product.image;
  return img;
}
```

### Issue 24: Not sanitizing product search input
**Description:** Search products
```javascript
function searchProducts(query) {
  return products.filter(p => p.name.includes(query));
}
```

### Issue 25: Not debouncing cart total recalculation
**Description:** Recalculate cart total
```javascript
function updateCartTotal() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cart-total').textContent = formatPrice(total);
}
```

### Issue 26: Not handling wishlist duplicates
**Description:** Add product to wishlist
```javascript
function addToWishlist(product) {
  wishlist.push(product);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
```

### Issue 27: Not validating review rating bounds
**Description:** Submit product review
```javascript
function submitReview(productId, rating, text) {
  reviews.push({ productId, rating, text });
  saveReviews();
}
```

### Issue 28: Not handling expired sessions
**Description:** Load user cart
```javascript
function loadUserCart(userId) {
  return JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
}
```

### Issue 29: Not paginating product listings
**Description:** Display all products
```javascript
function renderProducts() {
  products.forEach(p => container.appendChild(createProductCard(p)));
}
```

### Issue 30: Not memoizing category filter results
**Description:** Filter by category
```javascript
function filterByCategory(category) {
  return products.filter(p => p.category === category);
}
```

## Modify Snippets

### Modify 1: Add complete cart CRUD operations
**Description:** Full cart management with add, remove, update, clear
```javascript
class CartManager {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart') || '[]');
  }
  add(product, qty = 1) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) existing.qty += qty;
    else this.items.push({ ...product, qty });
    this.save();
  }
  remove(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.save();
  }
  updateQty(productId, qty) {
    const item = this.items.find(i => i.id === productId);
    if (item) { item.qty = Math.max(1, qty); this.save(); }
  }
  clear() { this.items = []; this.save(); }
  getTotal() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); }
  getCount() { return this.items.reduce((s, i) => s + i.qty, 0); }
  save() { localStorage.setItem('cart', JSON.stringify(this.items)); this.onUpdate?.(); }
  onUpdate = null;
}
```

### Modify 2: Add product search with debounce
**Description:** Search products with debounced API calls
```javascript
function createProductSearch() {
  let timeoutId;
  let lastQuery = '';
  return {
    search: (query, callback) => {
      clearTimeout(timeoutId);
      const trimmed = query.trim();
      if (trimmed.length < 2 || trimmed === lastQuery) return;
      timeoutId = setTimeout(async () => {
        lastQuery = trimmed;
        try {
          const results = await fetch(`/api/products/search?q=${encodeURIComponent(trimmed)}`).then(r => r.json());
          callback(results);
        } catch (err) {
          callback([]);
        }
      }, 300);
    },
    cancel: () => clearTimeout(timeoutId)
  };
}
```

### Modify 3: Add product filtering with URL sync
**Description:** Sync filters with URL parameters
```javascript
function getFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get('category') || 'all',
    minPrice: parseFloat(params.get('minPrice')) || 0,
    maxPrice: parseFloat(params.get('maxPrice')) || Infinity,
    sort: params.get('sort') || 'name-asc',
    search: params.get('q') || ''
  };
}
function applyFilters(products, filters) {
  return products
    .filter(p => filters.category === 'all' || p.category === filters.category)
    .filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
    .filter(p => !filters.search || p.name.toLowerCase().includes(filters.search.toLowerCase()))
    .sort((a, b) => {
      const [field, dir] = filters.sort.split('-');
      const mul = dir === 'desc' ? -1 : 1;
      return a[field] > b[field] ? mul : a[field] < b[field] ? -mul : 0;
    });
}
```

### Modify 4: Add product reviews with rating
**Description:** Submit and display product reviews
```javascript
function submitReview(productId, rating, text) {
  const review = {
    id: Date.now().toString(36),
    productId,
    rating,
    text,
    author: localStorage.getItem('userName') || 'Anonymous',
    timestamp: new Date().toISOString(),
    likes: 0
  };
  const reviews = JSON.parse(localStorage.getItem('productReviews') || '{}');
  if (!reviews[productId]) reviews[productId] = [];
  reviews[productId].push(review);
  localStorage.setItem('productReviews', JSON.stringify(reviews));
  updateProductRating(productId);
  return review;
}
function getProductRating(productId) {
  const reviews = JSON.parse(localStorage.getItem('productReviews') || '{}')[productId] || [];
  if (reviews.length === 0) return { average: 0, count: 0 };
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  return { average: (sum / reviews.length).toFixed(1), count: reviews.length };
}
```

### Modify 5: Add wishlist with localStorage
**Description:** Save favorite products
```javascript
class Wishlist {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }
  toggle(productId) {
    const idx = this.items.indexOf(productId);
    if (idx === -1) this.items.push(productId);
    else this.items.splice(idx, 1);
    localStorage.setItem('wishlist', JSON.stringify(this.items));
    return this.items.includes(productId);
  }
  has(productId) { return this.items.includes(productId); }
  getAll() { return this.items; }
  getCount() { return this.items.length; }
  clear() { this.items = []; localStorage.setItem('wishlist', '[]'); }
}
```

### Modify 6: Add order placement with validation
**Description:** Complete order placement flow
```javascript
async function placeOrder(cart, shipping, payment) {
  const errors = [];
  if (!cart || cart.length === 0) errors.push('Cart is empty');
  if (!shipping.address) errors.push('Shipping address required');
  if (!payment.cardNumber) errors.push('Payment required');
  if (errors.length > 0) return { success: false, errors };
  try {
    const order = {
      id: 'ORD-' + Date.now().toString(36).toUpperCase(),
      items: [...cart],
      shipping,
      payment: { lastFour: payment.cardNumber.slice(-4) },
      total: cart.reduce((s, i) => s + i.price * i.qty, 0),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    const saved = JSON.parse(localStorage.getItem('orders') || '[]');
    saved.unshift(order);
    localStorage.setItem('orders', JSON.stringify(saved));
    localStorage.removeItem('cart');
    return { success: true, order };
  } catch (err) {
    return { success: false, errors: [err.message] };
  }
}
```

### Modify 7: Add product category tree navigation
**Description:** Hierarchical category browser
```javascript
const categoryTree = {
  Clothing: {
    Men: ['Shirts', 'Pants', 'Jackets'],
    Women: ['Dresses', 'Blouses', 'Skirts'],
    Kids: ['Tops', 'Bottoms', 'Sets']
  },
  Electronics: {
    Phones: ['Smartphones', 'Accessories'],
    Computers: ['Laptops', 'Tablets', 'Peripherals']
  }
};
function getCategoryPath(categories, target) {
  for (const [key, value] of Object.entries(categories)) {
    if (key === target) return [key];
    if (typeof value === 'object') {
      const path = getCategoryPath(value, target);
      if (path) return [key, ...path];
    }
  }
  return null;
}
function flattenCategories(tree, prefix = '') {
  let result = [];
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix} > ${key}` : key;
    if (Array.isArray(value)) {
      result.push({ name: path, children: value.map(v => ({ name: `${path} > ${v}` })) });
    } else {
      result.push({ name: path, children: flattenCategories(value, path) });
    }
  }
  return result;
}
```

### Modify 8: Add product comparison tool
**Description:** Compare multiple products side by side
```javascript
class ProductComparator {
  constructor() { this.compareList = []; }
  add(productId) {
    if (this.compareList.length >= 4) return { success: false, message: 'Max 4 products' };
    if (!this.compareList.includes(productId)) this.compareList.push(productId);
    return { success: true, count: this.compareList.length };
  }
  remove(productId) {
    this.compareList = this.compareList.filter(id => id !== productId);
  }
  getComparisonData(products) {
    return this.compareList.map(id => products.find(p => p.id === id)).filter(Boolean);
  }
  clear() { this.compareList = []; }
  generateComparisonTable(products) {
    const items = this.getComparisonData(products);
    if (items.length < 2) return null;
    const keys = ['name', 'price', 'category', 'rating', 'stock', 'brand'];
    return {
      headers: items.map(i => i.name),
      rows: keys.map(key => ({
        attribute: key,
        values: items.map(i => key === 'price' ? `$${i[key]?.toFixed(2)}` : i[key] || '-')
      }))
    };
  }
}
```

### Modify 9: Add checkout with multiple payment methods
**Description:** Support credit card, PayPal, Apple Pay
```javascript
class PaymentProcessor {
  constructor() {
    this.methods = {
      card: this.processCard.bind(this),
      paypal: this.processPayPal.bind(this),
      apple: this.processApplePay.bind(this)
    };
  }
  async processCard(payment) {
    const validated = this.validateCard(payment);
    if (!validated.valid) return { success: false, errors: validated.errors };
    await new Promise(r => setTimeout(r, 1000));
    return { success: true, transactionId: 'TXN-' + Date.now() };
  }
  async processPayPal(payment) {
    window.open(`https://www.paypal.com/checkout?amount=${payment.amount}`, '_blank');
    return { success: true, transactionId: 'PP-' + Date.now() };
  }
  async processApplePay(payment) {
    if (!window.ApplePaySession) return { success: false, errors: ['Apple Pay not available'] };
    return { success: true, transactionId: 'AP-' + Date.now() };
  }
  validateCard(card) {
    const errors = [];
    if (!card.number || card.number.replace(/\D/g, '').length < 13) errors.push('Invalid card number');
    if (!card.expiry || card.expiry.length < 5) errors.push('Invalid expiry date');
    if (!card.cvc || card.cvc.length < 3) errors.push('Invalid CVC');
    return { valid: errors.length === 0, errors };
  }
  async process(method, payment) {
    const processor = this.methods[method];
    if (!processor) return { success: false, errors: ['Unsupported payment method'] };
    return processor(payment);
  }
}
```

### Modify 10: Add order tracking with status updates
**Description:** Track order status with timeline
```javascript
class OrderTracker {
  constructor(orderId) {
    this.orderId = orderId;
    this.statuses = [
      { status: 'confirmed', label: 'Order Confirmed' },
      { status: 'processing', label: 'Processing' },
      { status: 'shipped', label: 'Shipped' },
      { status: 'out_for_delivery', label: 'Out for Delivery' },
      { status: 'delivered', label: 'Delivered' }
    ];
  }
  getCurrentStatus(order) {
    return this.statuses.findIndex(s => s.status === order.status);
  }
  getProgress(order) {
    const current = this.getCurrentStatus(order);
    return Math.round((current / (this.statuses.length - 1)) * 100);
  }
  updateStatus(orderId, newStatus) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      order.updatedAt = new Date().toISOString();
      if (newStatus === 'shipped') {
        order.trackingNumber = 'TRK' + Math.random().toString(36).toUpperCase().slice(2, 10);
        order.carrier = ['UPS', 'FedEx', 'USPS'][Math.floor(Math.random() * 3)];
      }
      localStorage.setItem('orders', JSON.stringify(orders));
    }
    return order;
  }
}
```

### Modify 11: Add product inventory alerts
**Description:** Notify when product back in stock
```javascript
function requestStockAlert(productId, email) {
  const alerts = JSON.parse(localStorage.getItem('stockAlerts') || '[]');
  if (!alerts.find(a => a.productId === productId && a.email === email)) {
    alerts.push({ productId, email, createdAt: new Date().toISOString() });
    localStorage.setItem('stockAlerts', JSON.stringify(alerts));
  }
}
function checkStockAlerts(products) {
  const alerts = JSON.parse(localStorage.getItem('stockAlerts') || '[]');
  const triggered = [];
  products.forEach(product => {
    if (product.stock > 0) {
      const pending = alerts.filter(a => a.productId === product.id);
      pending.forEach(alert => {
        triggered.push({ ...alert, productName: product.name });
      });
    }
  });
  const remaining = alerts.filter(a => !triggered.find(t => t.productId === a.productId));
  localStorage.setItem('stockAlerts', JSON.stringify(remaining));
  return triggered;
}
```

### Modify 12: Add product recommendations
**Description:** Show related products based on cart
```javascript
function getRecommendations(cart, allProducts, limit = 4) {
  const cartCategories = new Set(cart.map(i => i.category));
  const cartIds = new Set(cart.map(i => i.id));
  const related = allProducts.filter(p =>
    !cartIds.has(p.id) && cartCategories.has(p.category)
  );
  const shuffled = [...related].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}
```

### Modify 13: Add product quick view modal
**Description:** Show product details in modal
```javascript
function showQuickView(productId, products) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const modal = document.createElement('div');
  modal.className = 'modal quick-view';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <div class="quick-view-grid">
        <div class="qv-image"><img src="${product.image}" alt="${product.name}"></div>
        <div class="qv-details">
          <h2>${product.name}</h2>
          <p class="qv-price">$${product.price.toFixed(2)}</p>
          <p class="qv-desc">${product.description || ''}</p>
          <p class="qv-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
            ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          <div class="qv-actions">
            <select id="qv-qty">${[1,2,3,4,5].map(n => `<option value="${n}">${n}</option>`).join('')}</select>
            <button class="btn-add-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('.modal-close').onclick = () => modal.remove();
  modal.querySelector('.btn-add-cart').onclick = () => {
    const qty = parseInt(modal.querySelector('#qv-qty').value);
    cartManager.add(product, qty);
    modal.remove();
    showNotification(`${product.name} added to cart!`);
  };
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}
```

### Modify 14: Add complete checkout flow with steps
**Description:** Multi-step checkout with validation
```javascript
class CheckoutFlow {
  constructor() {
    this.steps = [
      { id: 'cart', title: 'Review Cart', validator: () => cartManager.items.length > 0 },
      { id: 'shipping', title: 'Shipping', validator: () => this.data.shipping?.address },
      { id: 'payment', title: 'Payment', validator: () => this.data.payment?.cardNumber },
      { id: 'review', title: 'Review Order', validator: () => true }
    ];
    this.currentStep = 0;
    this.data = {};
  }
  next() {
    if (!this.steps[this.currentStep].validator()) return false;
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.render();
      return true;
    }
    return this.submit();
  }
  prev() {
    if (this.currentStep > 0) { this.currentStep--; this.render(); }
  }
  async submit() {
    const result = await placeOrder(cartManager.items, this.data.shipping, this.data.payment);
    if (result.success) {
      this.showConfirmation(result.order);
    }
    return result;
  }
  render() {
    const step = this.steps[this.currentStep];
    const container = document.getElementById('checkout-content');
    container.innerHTML = `<h2>${step.title}</h2>`;
    this.renderStep(step.id, container);
    this.updateProgress();
  }
  updateProgress() {
    const pct = (this.currentStep / (this.steps.length - 1)) * 100;
    document.getElementById('progress-bar').style.width = `${pct}%`;
  }
  renderStep(stepId, container) {
    const renderers = {
      cart: () => container.appendChild(this.renderCartStep()),
      shipping: () => container.appendChild(this.renderShippingForm()),
      payment: () => container.appendChild(this.renderPaymentForm()),
      review: () => container.appendChild(this.renderReviewStep())
    };
    renderers[stepId]?.();
  }
}
```

### Modify 15: Add complete e-commerce data export
**Description:** Export all e-commerce data
```javascript
function exportStoreData() {
  const data = {
    exportDate: new Date().toISOString(),
    products: JSON.parse(localStorage.getItem('products') || '[]'),
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    orders: JSON.parse(localStorage.getItem('orders') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
    reviews: JSON.parse(localStorage.getItem('productReviews') || '{}'),
    stats: {
      totalProducts: JSON.parse(localStorage.getItem('products') || '[]').length,
      totalOrders: JSON.parse(localStorage.getItem('orders') || '[]').length,
      totalRevenue: JSON.parse(localStorage.getItem('orders') || '[]').reduce((s, o) => s + o.total, 0)
    }
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `store-export-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  return data;
}
```

### Modify 16: Add product review system with ratings
**Description:** Display and submit product reviews
```javascript
class ReviewSystem {
  constructor(productId) {
    this.productId = productId;
    this.reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
  }
  addReview(user, rating, comment) {
    this.reviews.push({
      id: `REV-${Date.now()}`,
      user, rating, comment,
      date: new Date().toISOString(),
      helpful: 0
    });
    this.save();
  }
  getAverageRating() {
    if (!this.reviews.length) return 0;
    return this.reviews.reduce((s, r) => s + r.rating, 0) / this.reviews.length;
  }
  markHelpful(reviewId) {
    const review = this.reviews.find(r => r.id === reviewId);
    if (review) review.helpful++;
    this.save();
  }
  getSortedByDate() {
    return [...this.reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  getSortedByRating() {
    return [...this.reviews].sort((a, b) => b.rating - a.rating);
  }
  save() {
    localStorage.setItem(`reviews_${this.productId}`, JSON.stringify(this.reviews));
  }
}
```

### Modify 17: Add price history tracking
**Description:** Track and display price changes
```javascript
function recordPrice(productId, price) {
  const history = JSON.parse(localStorage.getItem(`priceHistory_${productId}`) || '[]');
  history.push({ price, date: new Date().toISOString() });
  localStorage.setItem(`priceHistory_${productId}`, JSON.stringify(history));
}
function getPriceHistory(productId) {
  const history = JSON.parse(localStorage.getItem(`priceHistory_${productId}`) || '[]');
  return history.slice(-30);
}
function getPriceDrop(productId, currentPrice) {
  const history = getPriceHistory(productId);
  if (history.length < 2) return 0;
  const avgPrice = history.reduce((s, h) => s + h.price, 0) / history.length;
  return ((avgPrice - currentPrice) / avgPrice) * 100;
}
function renderPriceChart(productId) {
  const history = getPriceHistory(productId);
  if (history.length < 2) return '<p>Not enough data</p>';
  const min = Math.min(...history.map(h => h.price));
  const max = Math.max(...history.map(h => h.price));
  const range = max - min || 1;
  const bars = history.map(h => {
    const height = ((h.price - min) / range) * 100;
    return `<div class="price-bar" style="height:${height}%" title="$${h.price.toFixed(2)}"></div>`;
  }).join('');
  return `<div class="price-chart">${bars}</div>`;
}
```

### Modify 18: Add bulk discount calculator
**Description:** Calculate tiered bulk pricing
```javascript
function calculateBulkDiscount(quantity, basePrice) {
  const tiers = [
    { min: 0, discount: 0 },
    { min: 10, discount: 0.05 },
    { min: 25, discount: 0.1 },
    { min: 50, discount: 0.15 },
    { min: 100, discount: 0.2 },
    { min: 500, discount: 0.25 }
  ];
  let applicable = tiers[0];
  for (const tier of tiers) {
    if (quantity >= tier.min) applicable = tier;
  }
  const unitPrice = basePrice * (1 - applicable.discount);
  return {
    quantity,
    unitPrice,
    total: unitPrice * quantity,
    savings: basePrice * quantity - unitPrice * quantity,
    discountPercent: applicable.discount * 100
  };
}
```

### Modify 19: Add wishlist sharing
**Description:** Share wishlist with others
```javascript
function generateWishlistShareLink(wishlistId) {
  const wishlist = JSON.parse(localStorage.getItem('wishlists') || '[]')
    .find(w => w.id === wishlistId);
  if (!wishlist) return null;
  const shareData = {
    id: wishlist.id,
    name: wishlist.name,
    items: wishlist.items.map(i => ({ id: i.id, name: i.name, price: i.price }))
  };
  const encoded = btoa(encodeURIComponent(JSON.stringify(shareData)));
  return `${window.location.origin}/shared-wishlist?data=${encoded}`;
}
function importSharedWishlist(encodedData) {
  try {
    const data = JSON.parse(decodeURIComponent(atob(encodedData)));
    const wishlists = JSON.parse(localStorage.getItem('wishlists') || '[]');
    wishlists.push({
      id: `WSH-${Date.now()}`,
      name: `${data.name} (Shared)`,
      items: data.items,
      shared: true,
      importedFrom: data.id,
      created: new Date().toISOString()
    });
    localStorage.setItem('wishlists', JSON.stringify(wishlists));
    return { success: true, count: data.items.length };
  } catch (e) {
    return { success: false, error: 'Invalid wishlist data' };
  }
}
```

### Modify 20: Add order cancellation with reason
**Description:** Cancel order with reason tracking
```javascript
function cancelOrder(orderId, reason) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = orders.find(o => o.id === orderId);
  if (!order) return { success: false, error: 'Order not found' };
  if (order.status === 'shipped' || order.status === 'delivered') {
    return { success: false, error: 'Order already shipped' };
  }
  order.status = 'cancelled';
  order.cancelledAt = new Date().toISOString();
  order.cancelReason = reason;
  localStorage.setItem('orders', JSON.stringify(orders));
  return { success: true, refund: order.total };
}
```

### Modify 21: Add product comparison tool
**Description:** Compare multiple products side by side
```javascript
function compareProducts(productIds, allProducts) {
  const selected = allProducts.filter(p => productIds.includes(p.id));
  if (selected.length < 2) return [];
  const features = ['price', 'rating', 'stock', 'category', 'brand'];
  return selected.map(product => {
    const specs = features.reduce((acc, f) => {
      acc[f] = product[f] || 'N/A';
      return acc;
    }, {});
    return { name: product.name, id: product.id, image: product.image, specs };
  });
}
function renderComparisonTable(products) {
  if (!products.length) return '<p>Select at least 2 products to compare</p>';
  const features = Object.keys(products[0].specs);
  let html = '<table class="comparison-table"><tr><th>Feature</th>';
  products.forEach(p => { html += `<th>${p.name}</th>`; });
  html += '</tr>';
  features.forEach(f => {
    html += `<tr><td>${f.charAt(0).toUpperCase() + f.slice(1)}</td>`;
    products.forEach(p => {
      html += `<td>${p.specs[f]}</td>`;
    });
    html += '</tr>';
  });
  html += '</table>';
  return html;
}
```

### Modify 22: Add product subscription/reorder
**Description:** Set up subscription for regular purchases
```javascript
function createSubscription(productId, frequency, quantity) {
  const subscription = {
    id: `SUB-${Date.now()}`,
    productId,
    frequency,
    quantity,
    active: true,
    nextDelivery: calculateNextDelivery(frequency),
    created: new Date().toISOString()
  };
  const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
  subscriptions.push(subscription);
  localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  return subscription;
}
function calculateNextDelivery(frequency) {
  const next = new Date();
  if (frequency === 'weekly') next.setDate(next.getDate() + 7);
  else if (frequency === 'biweekly') next.setDate(next.getDate() + 14);
  else if (frequency === 'monthly') next.setMonth(next.getMonth() + 1);
  else if (frequency === 'quarterly') next.setMonth(next.getMonth() + 3);
  return next.toISOString();
}
function processSubscriptions() {
  const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
  const now = Date.now();
  subscriptions.forEach(sub => {
    if (sub.active && new Date(sub.nextDelivery) <= now) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({ id: sub.productId, qty: sub.quantity });
      localStorage.setItem('cart', JSON.stringify(cart));
      sub.nextDelivery = calculateNextDelivery(sub.frequency);
      sub.lastProcessed = new Date().toISOString();
    }
  });
  localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
}
```

### Modify 23: Add inventory forecasting
**Description:** Predict stock needs based on sales history
```javascript
function forecastInventory(productId, daysAhead = 30) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const productSales = orders.flatMap(o => o.items.filter(i => i.productId === productId));
  const dailySales = {};
  productSales.forEach(sale => {
    const day = new Date(sale.date).toDateString();
    dailySales[day] = (dailySales[day] || 0) + sale.qty;
  });
  const days = Object.keys(dailySales);
  const avgDailySales = days.length ? days.reduce((s, d) => s + dailySales[d], 0) / days.length : 0;
  const projected = avgDailySales * daysAhead;
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const product = products.find(p => p.id === productId);
  const currentStock = product?.stock || 0;
  return {
    productId,
    productName: product?.name,
    currentStock,
    avgDailySales: Math.round(avgDailySales * 10) / 10,
    projectedNeeded: Math.ceil(projected),
    stockoutRisk: currentStock < projected ? 'High' : 'Low',
    recommendedOrder: Math.max(0, Math.ceil(projected - currentStock))
  };
}
```

### Modify 24: Add multi-currency store support
**Description:** Display prices in multiple currencies
```javascript
class MultiCurrencyStore {
  constructor() {
    this.rates = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 151.5, CAD: 1.36, AUD: 1.54 };
    this.symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$', AUD: 'A$' };
    this.current = localStorage.getItem('preferredCurrency') || 'USD';
  }
  setCurrency(code) {
    if (this.rates[code]) {
      this.current = code;
      localStorage.setItem('preferredCurrency', code);
      this.updateDisplayedPrices();
    }
  }
  convert(amountUSD) {
    return amountUSD * this.rates[this.current];
  }
  format(amountUSD) {
    const converted = this.convert(amountUSD);
    const symbol = this.symbols[this.current] || '$';
    return `${symbol}${converted.toFixed(2)}`;
  }
  updateDisplayedPrices() {
    document.querySelectorAll('[data-price-usd]').forEach(el => {
      const usd = parseFloat(el.dataset.priceUsd);
      el.textContent = this.format(usd);
    });
  }
  getAvailableCurrencies() {
    return Object.keys(this.rates);
  }
}
```

### Modify 25: Add gift card system
**Description:** Create and redeem gift cards
```javascript
class GiftCardSystem {
  generateCard(amount, message = '') {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) code += '-';
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    const card = {
      code,
      amount,
      balance: amount,
      message,
      created: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 86400000).toISOString(),
      active: true
    };
    const cards = JSON.parse(localStorage.getItem('giftCards') || '[]');
    cards.push(card);
    localStorage.setItem('giftCards', JSON.stringify(cards));
    return card;
  }
  redeem(code, amount) {
    const cards = JSON.parse(localStorage.getItem('giftCards') || '[]');
    const card = cards.find(c => c.code === code);
    if (!card) return { success: false, error: 'Invalid code' };
    if (!card.active) return { success: false, error: 'Card deactivated' };
    if (new Date(card.expiresAt) < new Date()) return { success: false, error: 'Card expired' };
    if (card.balance < amount) return { success: false, error: 'Insufficient balance' };
    card.balance -= amount;
    if (card.balance === 0) card.active = false;
    localStorage.setItem('giftCards', JSON.stringify(cards));
    return { success: true, remainingBalance: card.balance };
  }
  getBalance(code) {
    const cards = JSON.parse(localStorage.getItem('giftCards') || '[]');
    const card = cards.find(c => c.code === code);
    return card ? card.balance : 0;
  }
}
```

### Modify 26: Add loyalty rewards program
**Description:** Track and redeem loyalty points
```javascript
class LoyaltyProgram {
  constructor(userId) {
    this.userId = userId;
    this.data = JSON.parse(localStorage.getItem(`loyalty_${userId}`) || '{}');
    if (!this.data.points) this.data = { points: 0, tier: 'bronze', history: [] };
  }
  addPoints(amount) {
    const earned = Math.floor(amount * 10);
    this.data.points += earned;
    this.data.history.push({ type: 'earned', points: earned, date: new Date().toISOString() });
    this.updateTier();
    this.save();
    return earned;
  }
  redeemPoints(points, reward) {
    if (this.data.points < points) return { success: false, error: 'Not enough points' };
    this.data.points -= points;
    this.data.history.push({ type: 'redeemed', points, reward, date: new Date().toISOString() });
    this.updateTier();
    this.save();
    return { success: true, remaining: this.data.points };
  }
  updateTier() {
    if (this.data.points >= 10000) this.data.tier = 'platinum';
    else if (this.data.points >= 5000) this.data.tier = 'gold';
    else if (this.data.points >= 1000) this.data.tier = 'silver';
    else this.data.tier = 'bronze';
  }
  getBenefits() {
    const benefits = {
      bronze: { discount: 0, freeShipping: false, pointsMultiplier: 1 },
      silver: { discount: 0.05, freeShipping: true, pointsMultiplier: 1.25 },
      gold: { discount: 0.1, freeShipping: true, pointsMultiplier: 1.5 },
      platinum: { discount: 0.15, freeShipping: true, pointsMultiplier: 2 }
    };
    return benefits[this.data.tier];
  }
  save() { localStorage.setItem(`loyalty_${this.userId}`, JSON.stringify(this.data)); }
}
```

### Modify 27: Add real-time inventory dashboard
**Description:** Live inventory dashboard with WebSocket
```javascript
class InventoryDashboard {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('products') || '[]');
    this.watchers = [];
  }
  addWatcher(callback) { this.watchers.push(callback); }
  notifyWatchers(action, item) {
    this.watchers.forEach(cb => cb({ action, item, timestamp: Date.now() }));
  }
  updateStock(productId, newStock) {
    this.items = this.items.map(p => {
      if (p.id === productId) {
        const old = p.stock;
        p.stock = newStock;
        this.notifyWatchers('stockUpdate', { ...p, oldStock: old });
      }
      return p;
    });
    localStorage.setItem('products', JSON.stringify(this.items));
  }
  getLowStockItems(threshold = 10) {
    return this.items.filter(p => p.stock > 0 && p.stock < threshold);
  }
  getOutOfStockItems() {
    return this.items.filter(p => p.stock === 0);
  }
  getInventoryValue() {
    let totalValue = 0;
    this.items.forEach(p => { totalValue += p.price * p.stock; });
    return totalValue;
  }
  getCategoryBreakdown() {
    return this.items.reduce((acc, p) => {
      if (!acc[p.category]) acc[p.category] = { count: 0, totalValue: 0, totalStock: 0 };
      acc[p.category].count++;
      acc[p.category].totalValue += p.price * p.stock;
      acc[p.category].totalStock += p.stock;
      return acc;
    }, {});
  }
}
```

### Modify 28: Add order invoice PDF generation
**Description:** Generate printable PDF invoice
```javascript
function generateInvoiceHTML(order) {
  const itemsRows = order.items.map(i => `
    <tr><td>${i.name}</td><td>${i.qty}</td><td>$${i.price.toFixed(2)}</td><td>$${(i.price * i.qty).toFixed(2)}</td></tr>
  `).join('');
  return `
    <html><head><style>
      body{font-family:Arial;max-width:800px;margin:40px auto;padding:20px}
      h1{color:#333;border-bottom:2px solid #333;padding-bottom:10px}
      table{width:100%;border-collapse:collapse;margin:20px 0}
      th,td{padding:12px 8px;text-align:left;border-bottom:1px solid #ddd}
      th{background-color:#f5f5f5}
      .total-row td{font-weight:bold;font-size:1.1em}
      .footer{margin-top:40px;font-size:0.9em;color:#666;border-top:1px solid #ddd;padding-top:20px}
    </style></head><body>
      <h1>INVOICE #${order.id}</h1>
      <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
      <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
      ${order.shipping ? `<p><strong>Ship to:</strong> ${order.shipping.address}, ${order.shipping.city}, ${order.shipping.zip}</p>` : ''}
      <table>
        <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
        ${itemsRows}
        <tr class="total-row"><td colspan="3">Total</td><td>$${order.total.toFixed(2)}</td></tr>
      </table>
      <div class="footer">
        <p>Thank you for your business!</p>
        <p>Invoice generated: ${new Date().toLocaleString()}</p>
      </div>
    </body></html>`;
}
function printInvoice(order) {
  const win = window.open('', '_blank');
  win.document.write(generateInvoiceHTML(order));
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 500);
}
```

### Modify 29: Add product variant manager
**Description:** Manage product variants (size, color, etc.)
```javascript
class ProductVariantManager {
  constructor(productId) {
    this.productId = productId;
    this.variants = JSON.parse(localStorage.getItem(`variants_${productId}`) || '[]');
  }
  addVariant(name, options, priceDelta, stockDelta) {
    const variant = {
      id: `VAR-${Date.now()}`,
      name,
      options,
      priceDelta,
      stockDelta,
      sku: `${this.productId}-${name.replace(/\s+/g, '-').toUpperCase()}`
    };
    this.variants.push(variant);
    this.save();
    return variant;
  }
  getVariantPrice(basePrice, variantId) {
    const variant = this.variants.find(v => v.id === variantId);
    if (!variant) return basePrice;
    return basePrice + variant.priceDelta;
  }
  getVariantStock(baseStock, variantId) {
    const variant = this.variants.find(v => v.id === variantId);
    if (!variant) return baseStock;
    return baseStock + variant.stockDelta;
  }
  getOptionsByType(type) {
    return [...new Set(this.variants.map(v => v.options[type]).filter(Boolean))];
  }
  findVariant(selectedOptions) {
    return this.variants.find(v =>
      Object.entries(selectedOptions).every(([key, val]) => v.options[key] === val)
    );
  }
  save() { localStorage.setItem(`variants_${this.productId}`, JSON.stringify(this.variants)); }
}
```

### Modify 30: Add abandoned cart recovery
**Description:** Track and recover abandoned carts
```javascript
class AbandonedCartRecovery {
  constructor() {
    this.timeout = 30 * 60 * 1000;
  }
  trackCart(userId, cart) {
    const carts = JSON.parse(localStorage.getItem('abandonedCarts') || '[]');
    const existing = carts.findIndex(c => c.userId === userId);
    const entry = { userId, cart, timestamp: Date.now(), recovered: false };
    if (existing >= 0) carts[existing] = entry;
    else carts.push(entry);
    localStorage.setItem('abandonedCarts', JSON.stringify(carts));
  }
  getAbandonedCarts() {
    const carts = JSON.parse(localStorage.getItem('abandonedCarts') || '[]');
    const cutoff = Date.now() - this.timeout;
    return carts.filter(c => !c.recovered && c.timestamp < cutoff);
  }
  markRecovered(userId) {
    const carts = JSON.parse(localStorage.getItem('abandonedCarts') || '[]');
    const cart = carts.find(c => c.userId === userId);
    if (cart) { cart.recovered = true; cart.recoveredAt = Date.now(); }
    localStorage.setItem('abandonedCarts', JSON.stringify(carts));
  }
  getRecoveryRate() {
    const carts = JSON.parse(localStorage.getItem('abandonedCarts') || '[]');
    if (!carts.length) return 0;
    const recovered = carts.filter(c => c.recovered).length;
    return (recovered / carts.length) * 100;
  }
}
```

### Modify 31: Add store analytics dashboard
**Description:** Full analytics dashboard for store metrics
```javascript
class StoreAnalytics {
  constructor() {
    this.events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
  }
  trackEvent(type, data) {
    this.events.push({ type, data, timestamp: Date.now() });
    localStorage.setItem('analyticsEvents', JSON.stringify(this.events));
  }
  getPageViews(days = 7) {
    const cutoff = Date.now() - days * 86400000;
    return this.events.filter(e => e.type === 'pageView' && e.timestamp >= cutoff).length;
  }
  getAddToCarts(days = 7) {
    const cutoff = Date.now() - days * 86400000;
    return this.events.filter(e => e.type === 'addToCart' && e.timestamp >= cutoff).length;
  }
  getConversionRate(days = 7) {
    const cutoff = Date.now() - days * 86400000;
    const views = this.events.filter(e => e.type === 'pageView' && e.timestamp >= cutoff).length;
    const purchases = this.events.filter(e => e.type === 'purchase' && e.timestamp >= cutoff).length;
    return views ? (purchases / views) * 100 : 0;
  }
  getTopProducts(limit = 5) {
    const productViews = this.events.filter(e => e.type === 'productView')
      .reduce((acc, e) => {
        acc[e.data.productId] = (acc[e.data.productId] || 0) + 1;
        return acc;
      }, {});
    return Object.entries(productViews)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id, count]) => ({ productId: id, views: count }));
  }
  getRevenueReport(days = 30) {
    const cutoff = Date.now() - days * 86400000;
    const purchases = this.events.filter(e => e.type === 'purchase' && e.timestamp >= cutoff);
    const totalRevenue = purchases.reduce((s, p) => s + (p.data.total || 0), 0);
    const daily = purchases.reduce((acc, p) => {
      const day = new Date(p.timestamp).toDateString();
      acc[day] = (acc[day] || 0) + (p.data.total || 0);
      return acc;
    }, {});
    return { totalRevenue, totalOrders: purchases.length, averageOrderValue: purchases.length ? totalRevenue / purchases.length : 0, daily };
  }
}
```

### Modify 32: Add customer support ticket system
**Description:** Create and manage support tickets
```javascript
class SupportTicketSystem {
  createTicket(user, subject, message, orderId = null) {
    const ticket = {
      id: `TKT-${Date.now()}`,
      user, subject, message, orderId,
      status: 'open',
      priority: 'normal',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      messages: [{ from: user, text: message, date: new Date().toISOString() }]
    };
    const tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
    tickets.push(ticket);
    localStorage.setItem('supportTickets', JSON.stringify(tickets));
    return ticket;
  }
  replyToTicket(ticketId, from, message) {
    const tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return false;
    ticket.messages.push({ from, text: message, date: new Date().toISOString() });
    ticket.updated = new Date().toISOString();
    if (from !== 'support') ticket.status = 'awaiting_response';
    localStorage.setItem('supportTickets', JSON.stringify(tickets));
    return true;
  }
  updateStatus(ticketId, status) {
    const tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return false;
    ticket.status = status;
    ticket.updated = new Date().toISOString();
    localStorage.setItem('supportTickets', JSON.stringify(tickets));
    return true;
  }
  getUserTickets(user) {
    const tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
    return tickets.filter(t => t.user === user).sort((a, b) => new Date(b.updated) - new Date(a.updated));
  }
  getOpenTickets() {
    const tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
    return tickets.filter(t => t.status !== 'closed').sort((a, b) => new Date(b.updated) - new Date(a.updated));
  }
}
```

### Modify 33: Add product video gallery
**Description:** Manage and display product videos
```javascript
class ProductVideoGallery {
  constructor(productId) {
    this.productId = productId;
    this.videos = JSON.parse(localStorage.getItem(`videos_${productId}`) || '[]');
  }
  addVideo(url, title, thumbnail = '') {
    const video = {
      id: `VID-${Date.now()}`,
      url, title, thumbnail,
      type: url.includes('youtube') ? 'youtube' : url.includes('vimeo') ? 'vimeo' : 'direct',
      added: new Date().toISOString(),
      views: 0
    };
    this.videos.push(video);
    this.save();
    return video;
  }
  getEmbedUrl(video) {
    if (video.type === 'youtube') {
      const id = video.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      return id ? `https://www.youtube.com/embed/${id[1]}` : video.url;
    }
    return video.url;
  }
  removeVideo(videoId) {
    this.videos = this.videos.filter(v => v.id !== videoId);
    this.save();
  }
  reorder(videoIds) {
    this.videos = videoIds.map(id => this.videos.find(v => v.id === id)).filter(Boolean);
    this.save();
  }
  save() { localStorage.setItem(`videos_${this.productId}`, JSON.stringify(this.videos)); }
}
```

### Modify 34: Add store SEO manager
**Description:** Manage SEO metadata for products
```javascript
class SEOManager {
  constructor() {
    this.defaults = {
      title: 'My Store',
      description: 'Best products at great prices',
      keywords: 'shopping, ecommerce, store'
    };
  }
  generateProductMeta(product) {
    return {
      title: `${product.name} | My Store`,
      description: product.description?.slice(0, 160) || this.defaults.description,
      keywords: [product.category, product.name, ...(product.tags || [])].join(', '),
      ogImage: product.image,
      ogType: 'product',
      ogPrice: product.price,
      ogCurrency: 'USD'
    };
  }
  async generateSitemap() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const urls = ['/', '/products', '/cart', '/checkout'];
    products.forEach(p => urls.push(`/product/${p.id}`));
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.map(u => `<url><loc>${window.location.origin}${u}</loc><priority>${u === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
      </urlset>`;
    return sitemap;
  }
  applyMetaTags(meta) {
    document.title = meta.title;
    this.setMetaTag('description', meta.description);
    this.setMetaTag('keywords', meta.keywords);
    if (meta.ogImage) this.setMetaTag('og:image', meta.ogImage);
    if (meta.ogType) this.setMetaTag('og:type', meta.ogType);
    if (meta.ogPrice) this.setMetaTag('product:price:amount', meta.ogPrice.toString());
  }
  setMetaTag(name, content) {
    let tag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }
}
```

### Modify 35: Add store theme customizer
**Description:** Customize store appearance
```javascript
class StoreThemeCustomizer {
  constructor() {
    this.defaults = {
      primaryColor: '#0066cc',
      secondaryColor: '#ff9900',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      fontFamily: 'Arial, sans-serif',
      borderRadius: '4px',
      buttonStyle: 'solid'
    };
    this.theme = JSON.parse(localStorage.getItem('storeTheme') || 'null') || { ...this.defaults };
  }
  updateProperty(key, value) {
    if (key in this.defaults) {
      this.theme[key] = value;
      this.apply();
      this.save();
    }
  }
  apply() {
    Object.entries(this.theme).forEach(([key, val]) => {
      if (key === 'primaryColor') this.setCSSVar('--primary', val);
      else if (key === 'secondaryColor') this.setCSSVar('--secondary', val);
      else if (key === 'backgroundColor') this.setCSSVar('--bg', val);
      else if (key === 'textColor') this.setCSSVar('--text', val);
      else if (key === 'fontFamily') this.setCSSVar('--font', val);
      else if (key === 'borderRadius') this.setCSSVar('--radius', val);
    });
  }
  setCSSVar(name, value) { document.documentElement.style.setProperty(name, value); }
  save() { localStorage.setItem('storeTheme', JSON.stringify(this.theme)); }
  reset() { this.theme = { ...this.defaults }; this.apply(); this.save(); }
  exportTheme() { return btoa(JSON.stringify(this.theme)); }
  importTheme(encoded) {
    try { this.theme = JSON.parse(atob(encoded)); this.apply(); this.save(); return true; }
    catch { return false; }
  }
}
```

### Modify 36: Add product bundle builder
**Description:** Create product bundles with discount
```javascript
class ProductBundleBuilder {
  createBundle(name, productIds, discountPercent) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const bundleProducts = productIds.map(id => products.find(p => p.id === id)).filter(Boolean);
    if (bundleProducts.length < 2) return null;
    const fullPrice = bundleProducts.reduce((s, p) => s + p.price, 0);
    const bundlePrice = fullPrice * (1 - discountPercent / 100);
    const bundle = {
      id: `BNDL-${Date.now()}`,
      name,
      productIds,
      fullPrice: Math.round(fullPrice * 100) / 100,
      bundlePrice: Math.round(bundlePrice * 100) / 100,
      savings: Math.round((fullPrice - bundlePrice) * 100) / 100,
      discountPercent,
      created: new Date().toISOString(),
      active: true
    };
    const bundles = JSON.parse(localStorage.getItem('productBundles') || '[]');
    bundles.push(bundle);
    localStorage.setItem('productBundles', JSON.stringify(bundles));
    return bundle;
  }
  getBundleSavings(bundleId) {
    const bundles = JSON.parse(localStorage.getItem('productBundles') || '[]');
    const bundle = bundles.find(b => b.id === bundleId);
    return bundle ? bundle.savings : 0;
  }
  applyBundleToCart(bundleId) {
    const bundles = JSON.parse(localStorage.getItem('productBundles') || '[]');
    const bundle = bundles.find(b => b.id === bundleId);
    if (!bundle || !bundle.active) return false;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    bundle.productIds.forEach(id => {
      if (!cart.find(c => c.id === id)) cart.push({ id, qty: 1 });
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    return true;
  }
}
```

### Modify 37: Add store shipping calculator
**Description:** Calculate shipping based on location and weight
```javascript
class ShippingCalculator {
  constructor() {
    this.zones = {
      local: { countries: ['US'], baseRate: 4.99, freeThreshold: 50 },
      nearby: { countries: ['CA', 'MX'], baseRate: 9.99, freeThreshold: 100 },
      international: { countries: ['*'], baseRate: 19.99, freeThreshold: 200 }
    };
    this.methods = {
      standard: { multiplier: 1, days: '5-7' },
      express: { multiplier: 2, days: '2-3' },
      overnight: { multiplier: 3.5, days: '1' }
    };
  }
  getZone(country) {
    for (const [zone, config] of Object.entries(this.zones)) {
      if (config.countries.includes(country) || config.countries.includes('*')) return zone;
    }
    return 'international';
  }
  calculate(cart, country, method = 'standard') {
    const zone = this.getZone(country);
    const zoneConfig = this.zones[zone];
    const methodConfig = this.methods[method];
    if (!methodConfig) return { error: 'Invalid shipping method' };
    const subtotal = cart.reduce((s, item) => s + (item.price || 0) * (item.qty || 1), 0);
    if (subtotal >= zoneConfig.freeThreshold) {
      return { cost: 0, method, zone, estimatedDays: methodConfig.days, free: true };
    }
    const weight = cart.reduce((s, item) => s + (item.weight || 0.5) * (item.qty || 1), 0);
    const weightSurcharge = Math.max(0, (weight - 5) * 0.5);
    const cost = (zoneConfig.baseRate + weightSurcharge) * methodConfig.multiplier;
    return {
      cost: Math.round(cost * 100) / 100,
      method,
      zone,
      estimatedDays: methodConfig.days,
      weight: Math.round(weight * 10) / 10,
      free: false
    };
  }
}
```

### Modify 38: Add product flash sale system
**Description:** Time-limited flash sales on products
```javascript
class FlashSaleSystem {
  createSale(name, productIds, discountPercent, startTime, duration) {
    const sale = {
      id: `SALE-${Date.now()}`,
      name,
      productIds,
      discountPercent,
      startTime,
      endTime: startTime + duration,
      duration,
      active: true,
      created: new Date().toISOString()
    };
    const sales = JSON.parse(localStorage.getItem('flashSales') || '[]');
    sales.push(sale);
    localStorage.setItem('flashSales', JSON.stringify(sales));
    return sale;
  }
  getActiveSales() {
    const now = Date.now();
    const sales = JSON.parse(localStorage.getItem('flashSales') || '[]');
    return sales.filter(s => s.active && now >= s.startTime && now <= s.endTime);
  }
  getProductSale(productId) {
    return this.getActiveSales().find(s => s.productIds.includes(productId));
  }
  getSalePrice(product) {
    const sale = this.getProductSale(product.id);
    if (!sale) return product.price;
    return Math.round(product.price * (1 - sale.discountPercent / 100) * 100) / 100;
  }
  getSaleCountdown(saleId) {
    const sales = JSON.parse(localStorage.getItem('flashSales') || '[]');
    const sale = sales.find(s => s.id === saleId);
    if (!sale) return 0;
    return Math.max(0, sale.endTime - Date.now());
  }
  endSale(saleId) {
    const sales = JSON.parse(localStorage.getItem('flashSales') || '[]');
    const sale = sales.find(s => s.id === saleId);
    if (sale) sale.active = false;
    localStorage.setItem('flashSales', JSON.stringify(sales));
  }
}
```

### Modify 39: Add store API client
**Description:** API client for store backend
```javascript
class StoreAPIClient {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('apiToken');
  }
  setToken(token) { this.token = token; localStorage.setItem('apiToken', token); }
  async request(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    const response = await fetch(`${this.baseURL}${endpoint}`, { ...options, headers });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  }
  async getProducts(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.request(`/products${qs ? '?' + qs : ''}`);
  }
  async getProduct(id) { return this.request(`/products/${id}`); }
  async createOrder(cart, shipping, payment) {
    return this.request('/orders', { method: 'POST', body: JSON.stringify({ cart, shipping, payment }) });
  }
  async getOrders(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.request(`/orders${qs ? '?' + qs : ''}`);
  }
  async searchProducts(query) {
    return this.request(`/products/search?q=${encodeURIComponent(query)}`);
  }
  async getCategories() { return this.request('/categories'); }
  async getAnalytics(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.request(`/analytics${qs ? '?' + qs : ''}`);
  }
}
```

### Modify 40: Add product QR code generator
**Description:** Generate QR codes for products
```javascript
class ProductQRCode {
  constructor(product) {
    this.product = product;
  }
  generateData() {
    return JSON.stringify({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      url: `${window.location.origin}/product/${this.product.id}`
    });
  }
  generateQRURL(size = 200) {
    const data = this.generateData();
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
  }
  renderQR(container, size = 200) {
    const img = document.createElement('img');
    img.src = this.generateQRURL(size);
    img.alt = `QR Code for ${this.product.name}`;
    img.className = 'product-qr';
    container.appendChild(img);
  }
  getProductFromQR(data) {
    try {
      const parsed = JSON.parse(data);
      return {
        id: parsed.id,
        name: parsed.name,
        price: parsed.price,
        confidence: 'high'
      };
    } catch {
      return null;
    }
  }
}
```

### Modify 41: Add store backup/restore system
**Description:** Backup and restore all store data
```javascript
class StoreBackup {
  createBackup() {
    const backup = {
      version: '1.0',
      created: new Date().toISOString(),
      data: {
        products: JSON.parse(localStorage.getItem('products') || '[]'),
        orders: JSON.parse(localStorage.getItem('orders') || '[]'),
        cart: JSON.parse(localStorage.getItem('cart') || '[]'),
        wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
        reviews: JSON.parse(localStorage.getItem('productReviews') || '{}'),
        subscriptions: JSON.parse(localStorage.getItem('subscriptions') || '[]'),
        analytics: JSON.parse(localStorage.getItem('analyticsEvents') || '[]'),
        theme: JSON.parse(localStorage.getItem('storeTheme') || 'null')
      }
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `store-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    localStorage.setItem('lastBackup', new Date().toISOString());
    return backup;
  }
  async restoreFromFile(file) {
    try {
      const text = await file.text();
      const backup = JSON.parse(text);
      if (!backup.version || !backup.data) throw new Error('Invalid backup format');
      Object.entries(backup.data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          localStorage.setItem(key, JSON.stringify(value));
        }
      });
      return { success: true, date: backup.created, items: Object.keys(backup.data).length };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  getLastBackupDate() { return localStorage.getItem('lastBackup'); }
  scheduleBackup(intervalDays = 7) {
    const last = this.getLastBackupDate();
    if (!last || (Date.now() - new Date(last).getTime()) >= intervalDays * 86400000) {
      this.createBackup();
    }
  }
}
```

### Modify 42: Add product affiliate tracking
**Description:** Track affiliate referrals for products
```javascript
class AffiliateTracker {
  constructor(storeId) {
    this.storeId = storeId;
    this.commissions = JSON.parse(localStorage.getItem('affiliateCommissions') || '[]');
  }
  generateAffiliateLink(productId, affiliateId) {
    const base = `${window.location.origin}/product/${productId}`;
    const params = new URLSearchParams({ ref: affiliateId, utm_source: 'affiliate', utm_medium: 'link' });
    return `${base}?${params.toString()}`;
  }
  trackClick(affiliateId, productId) {
    const clicks = JSON.parse(localStorage.getItem('affiliateClicks') || '[]');
    clicks.push({ affiliateId, productId, timestamp: Date.now(), converted: false });
    localStorage.setItem('affiliateClicks', JSON.stringify(clicks));
  }
  trackConversion(affiliateId, productId, orderTotal) {
    const clicks = JSON.parse(localStorage.getItem('affiliateClicks') || '[]');
    const click = clicks.find(c => c.affiliateId === affiliateId && c.productId === productId && !c.converted);
    if (click) {
      click.converted = true;
      click.convertedAt = Date.now();
      click.commission = orderTotal * 0.1;
      this.commissions.push({ affiliateId, productId, amount: click.commission, date: new Date().toISOString() });
      localStorage.setItem('affiliateClicks', JSON.stringify(clicks));
      localStorage.setItem('affiliateCommissions', JSON.stringify(this.commissions));
    }
  }
  getAffiliateStats(affiliateId) {
    const clicks = JSON.parse(localStorage.getItem('affiliateClicks') || '[]')
      .filter(c => c.affiliateId === affiliateId);
    const commissions = this.commissions.filter(c => c.affiliateId === affiliateId);
    return {
      totalClicks: clicks.length,
      conversions: clicks.filter(c => c.converted).length,
      conversionRate: clicks.length ? (clicks.filter(c => c.converted).length / clicks.length) * 100 : 0,
      totalCommission: commissions.reduce((s, c) => s + c.amount, 0)
    };
  }
}
```

### Modify 43: Add store notification center
**Description:** In-app notification system
```javascript
class NotificationCenter {
  constructor() {
    this.notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  }
  add(type, title, message, data = {}) {
    const notification = {
      id: `NOTIF-${Date.now()}`,
      type, title, message, data,
      read: false,
      timestamp: Date.now()
    };
    this.notifications.unshift(notification);
    this.save();
    this.dispatch(notification);
    return notification;
  }
  markRead(id) {
    const n = this.notifications.find(n => n.id === id);
    if (n) n.read = true;
    this.save();
  }
  markAllRead() {
    this.notifications.forEach(n => { n.read = true; });
    this.save();
  }
  getUnread() { return this.notifications.filter(n => !n.read); }
  getByType(type) { return this.notifications.filter(n => n.type === type); }
  clear() { this.notifications = []; this.save(); }
  dispatch(notification) {
    const event = new CustomEvent('newNotification', { detail: notification });
    document.dispatchEvent(event);
  }
  save() { localStorage.setItem('notifications', JSON.stringify(this.notifications)); }
}
```

### Modify 44: Add product AR preview
**Description:** Augmented reality product preview
```javascript
class ARProductPreview {
  constructor(product) {
    this.product = product;
    this.supported = 'xr' in navigator || 'ARCore' in window || 'ARKit' in window;
  }
  isSupported() { return this.supported; }
  async startARSession() {
    if (!this.supported) return { success: false, error: 'AR not supported' };
    try {
      const session = await navigator.xr?.requestSession('immersive-ar', {
        requiredFeatures: ['local', 'hit-test'],
        optionalFeatures: ['dom-overlay']
      });
      return { success: true, session };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  generateARModel() {
    return {
      url: this.product.arModelUrl || this.product.model3dUrl,
      scale: this.product.arScale || 1,
      position: { x: 0, y: 0, z: -1 },
      rotation: { x: 0, y: 0, z: 0 }
    };
  }
  getARLink() {
    const model = this.generateARModel();
    if (this.product.arModelUrl) {
      return `https://arvr.google.com/scene-viewer?file=${encodeURIComponent(model.url)}&mode=ar_only&title=${encodeURIComponent(this.product.name)}`;
    }
    return null;
  }
}
```

### Modify 45: Add store voice search
**Description:** Voice-activated product search
```javascript
class VoiceSearch {
  constructor() {
    this.recognition = null;
    this.supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }
  isSupported() { return this.supported; }
  init() {
    if (!this.supported) return false;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 3;
    return true;
  }
  async start(onResult, onError) {
    if (!this.recognition && !this.init()) {
      onError?.('Speech recognition not supported');
      return;
    }
    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      onResult?.({ text: transcript, confidence });
    };
    this.recognition.onerror = (event) => { onError?.(event.error); };
    this.recognition.start();
  }
  stop() { this.recognition?.stop(); }
  speak(text) {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }
}
```

### Modify 46: Add store PWA support
**Description:** Progressive Web App features
```javascript
class StorePWA {
  constructor() {
    this.deferredPrompt = null;
  }
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        return { success: true };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }
    return { success: false, error: 'Service Worker not supported' };
  }
  async checkOffline() {
    return !navigator.onLine;
  }
  setupOfflineDetection(onlineCallback, offlineCallback) {
    window.addEventListener('online', () => onlineCallback?.());
    window.addEventListener('offline', () => {
      offlineCallback?.();
      this.showOfflineNotification();
    });
  }
  showOfflineNotification() {
    const banner = document.createElement('div');
    banner.className = 'offline-banner';
    banner.textContent = 'You are offline. Some features may be unavailable.';
    document.body.prepend(banner);
  }
  promptInstall() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then(choice => {
        if (choice.outcome === 'accepted') {
          localStorage.setItem('pwaInstalled', 'true');
        }
        this.deferredPrompt = null;
      });
    }
  }
  isInstallable() { return !!this.deferredPrompt; }
  isInstalled() { return localStorage.getItem('pwaInstalled') === 'true' || window.matchMedia('(display-mode: standalone)').matches; }
}
```

### Modify 47: Add product social share buttons
**Description:** Share products on social media
```javascript
class SocialShare {
  shareProduct(product, platform) {
    const url = `${window.location.origin}/product/${product.id}`;
    const text = `Check out ${product.name} - $${product.price.toFixed(2)}`;
    const urls = {
      facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };
    if (platform === 'native' && navigator.share) {
      navigator.share({ title: product.name, text, url });
      return;
    }
    const shareUrl = urls[platform];
    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
  }
  renderShareButtons(product) {
    const platforms = ['facebook', 'twitter', 'pinterest', 'whatsapp', 'email'];
    const container = document.createElement('div');
    container.className = 'share-buttons';
    platforms.forEach(platform => {
      const btn = document.createElement('button');
      btn.className = `share-btn share-${platform}`;
      btn.innerHTML = `<span class="share-icon">${platform.charAt(0).toUpperCase() + platform.slice(1)}</span>`;
      btn.addEventListener('click', () => this.shareProduct(product, platform));
      container.appendChild(btn);
    });
    return container;
  }
}
```

### Modify 48: Add store GDPR compliance
**Description:** GDPR cookie consent and data management
```javascript
class GDPRCompliance {
  constructor() {
    this.consent = JSON.parse(localStorage.getItem('gdprConsent') || 'null');
  }
  getRequiredConsents() {
    return {
      necessary: { label: 'Necessary', required: true, description: 'Essential for store functionality' },
      analytics: { label: 'Analytics', required: false, description: 'Help us improve our store' },
      marketing: { label: 'Marketing', required: false, description: 'Personalized offers and ads' },
      functional: { label: 'Functional', required: false, description: 'Enhanced features and preferences' }
    };
  }
  showConsentBanner() {
    if (this.consent) return;
    const banner = document.createElement('div');
    banner.className = 'gdpr-banner';
    banner.innerHTML = `
      <p>We use cookies to enhance your experience. By continuing, you agree to our use of cookies.</p>
      <div class="gdpr-actions">
        <button class="btn-accept-all">Accept All</button>
        <button class="btn-accept-necessary">Only Necessary</button>
        <button class="btn-customize">Customize</button>
      </div>
    `;
    banner.querySelector('.btn-accept-all').onclick = () => this.acceptAll();
    banner.querySelector('.btn-accept-necessary').onclick = () => this.acceptNecessary();
    banner.querySelector('.btn-customize').onclick = () => this.showCustomizeModal();
    document.body.prepend(banner);
  }
  acceptAll() {
    const consents = Object.keys(this.getRequiredConsents()).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    this.saveConsent(consents);
    this.removeBanner();
  }
  acceptNecessary() {
    const consents = Object.keys(this.getRequiredConsents()).reduce((acc, key) => ({ ...acc, [key]: key === 'necessary' }), {});
    this.saveConsent(consents);
    this.removeBanner();
  }
  saveConsent(consents) {
    this.consent = { ...consents, timestamp: Date.now(), version: '1.0' };
    localStorage.setItem('gdprConsent', JSON.stringify(this.consent));
  }
  hasConsent(category) { return this.consent?.[category] === true; }
  removeBanner() { document.querySelector('.gdpr-banner')?.remove(); }
  requestDataExport() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key.startsWith('gdpr')) data[key] = JSON.parse(localStorage.getItem(key));
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `my-data-${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
  }
  deleteAllData() {
    const exempt = ['gdprConsent'];
    Object.keys(localStorage).forEach(key => {
      if (!exempt.includes(key)) localStorage.removeItem(key);
    });
  }
}
```

### Modify 49: Add store performance monitoring
**Description:** Monitor store performance metrics
```javascript
class StorePerformance {
  constructor() {
    this.metrics = JSON.parse(localStorage.getItem('perfMetrics') || '[]');
    this.maxEntries = 1000;
  }
  recordMetric(name, value, tags = {}) {
    this.metrics.push({ name, value, tags, timestamp: Date.now() });
    if (this.metrics.length > this.maxEntries) {
      this.metrics = this.metrics.slice(-this.maxEntries);
    }
    localStorage.setItem('perfMetrics', JSON.stringify(this.metrics));
  }
  measureAsync(fn, name, tags = {}) {
    return async (...args) => {
      const start = performance.now();
      try {
        const result = await fn(...args);
        this.recordMetric(name, performance.now() - start, { ...tags, success: true });
        return result;
      } catch (e) {
        this.recordMetric(name, performance.now() - start, { ...tags, success: false, error: e.message });
        throw e;
      }
    };
  }
  getAverageMetric(name, duration = 3600000) {
    const cutoff = Date.now() - duration;
    const filtered = this.metrics.filter(m => m.name === name && m.timestamp >= cutoff);
    if (!filtered.length) return 0;
    return filtered.reduce((s, m) => s + m.value, 0) / filtered.length;
  }
  getMetricPercentile(name, percentile = 95, duration = 3600000) {
    const cutoff = Date.now() - duration;
    const values = this.metrics.filter(m => m.name === name && m.timestamp >= cutoff)
      .map(m => m.value).sort((a, b) => a - b);
    if (!values.length) return 0;
    const index = Math.ceil((percentile / 100) * values.length) - 1;
    return values[Math.max(0, index)];
  }
  getErrorRate(name, duration = 3600000) {
    const cutoff = Date.now() - duration;
    const filtered = this.metrics.filter(m => m.name === name && m.timestamp >= cutoff);
    if (!filtered.length) return 0;
    const errors = filtered.filter(m => m.tags?.success === false).length;
    return errors / filtered.length;
  }
  generateReport() {
    const metricNames = [...new Set(this.metrics.map(m => m.name))];
    const report = {};
    metricNames.forEach(name => {
      report[name] = {
        avg: this.getAverageMetric(name),
        p95: this.getMetricPercentile(name, 95),
        errorRate: this.getErrorRate(name),
        count: this.metrics.filter(m => m.name === name).length
      };
    });
    return report;
  }
}
```

### Modify 50: Add complete store management dashboard
**Description:** Central dashboard for store management
```javascript
class StoreDashboard {
  constructor() {
    this.sections = ['overview', 'products', 'orders', 'analytics', 'customers', 'settings'];
  }
  getOverview() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const analytics = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
    const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length;
    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: revenue,
      activeCarts: cart.length,
      pendingOrders,
      lowStockItems: lowStock,
      conversionRate: analytics.length ? (orders.length / analytics.filter(e => e.type === 'pageView').length) * 100 : 0,
      averageOrderValue: orders.length ? revenue / orders.length : 0
    };
  }
  renderDashboard() {
    const overview = this.getOverview();
    const container = document.getElementById('dashboard');
    container.innerHTML = `
      <div class="dashboard-grid">
        <div class="dash-card"><h3>Products</h3><p class="dash-stat">${overview.totalProducts}</p></div>
        <div class="dash-card"><h3>Orders</h3><p class="dash-stat">${overview.totalOrders}</p></div>
        <div class="dash-card"><h3>Revenue</h3><p class="dash-stat">$${overview.totalRevenue.toFixed(2)}</p></div>
        <div class="dash-card"><h3>Pending</h3><p class="dash-stat">${overview.pendingOrders}</p></div>
        <div class="dash-card"><h3>Low Stock</h3><p class="dash-stat ${overview.lowStockItems > 0 ? 'warning' : ''}">${overview.lowStockItems}</p></div>
        <div class="dash-card"><h3>Conversion</h3><p class="dash-stat">${overview.conversionRate.toFixed(1)}%</p></div>
      </div>
      <div class="dashboard-sections">
        ${this.sections.filter(s => s !== 'overview').map(s => `
          <button class="dash-section-btn" data-section="${s}">${s.charAt(0).toUpperCase() + s.slice(1)}</button>
        `).join('')}
      </div>
    `;
  }
  navigateTo(section) {
    if (section === 'overview') this.renderDashboard();
    else if (section === 'products') this.renderProductManager();
    else if (section === 'orders') this.renderOrderManager();
    else if (section === 'analytics') this.renderAnalytics();
  }
  renderProductManager() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const container = document.getElementById('dashboard');
    container.innerHTML = `
      <h2>Product Manager</h2>
      <input type="text" id="dash-search" placeholder="Search products..." class="dash-search">
      <table class="dash-table">
        <tr><th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Actions</th></tr>
        ${products.map(p => `
          <tr>
            <td>${p.name}</td>
            <td>$${p.price.toFixed(2)}</td>
            <td class="${p.stock < 10 ? 'low-stock' : ''}">${p.stock}</td>
            <td>${p.category || 'N/A'}</td>
            <td><button onclick="editProduct('${p.id}')">Edit</button> <button onclick="deleteProduct('${p.id}')">Delete</button></td>
          </tr>
        `).join('')}
      </table>
      <button class="btn-primary" onclick="showAddProductForm()">Add Product</button>
    `;
  }
}
```
