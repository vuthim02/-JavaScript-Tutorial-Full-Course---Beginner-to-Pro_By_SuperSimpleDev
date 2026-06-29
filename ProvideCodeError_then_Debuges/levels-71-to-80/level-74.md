# Level 74: Sharing Code Between Files and Checkout Page

## Error Snippets (1-70)

### Error 1: Checkout Module Duplicates Cart Logic
**Description:** The checkout module reimplements cart total calculation instead of importing it.
```javascript
export function calculateOrderTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}
```

### Error 2: Shared Formatting Function Missing Import
**Description:** A module uses `formatCurrency` without importing it from the shared module.
```javascript
export function displayPrice(amount) {
  return `$${amount.toFixed(2)}`;
}
```

### Error 3: Checkout Page Directly Accesses localStorage
**Description:** Instead of using a shared storage module, checkout directly accesses localStorage.
```javascript
export function loadCheckoutData() {
  return JSON.parse(localStorage.getItem('checkout'));
}
```

### Error 4: Inconsistent Import of Shared Validation
**Description:** One file imports validation as named, another imports it as default.
```javascript
// cart.js
import { validateQuantity } from './validators.js';

// checkout.js
import validateQuantity from './validators.js';
```

### Error 5: Shared Module Has Mutable State Modified by Multiple Consumers
**Description:** Multiple modules mutate a shared array, causing unpredictable behavior.
```javascript
export const sharedCart = [];
export function addToShared(item) {
  sharedCart.push(item);
}
```

### Error 6: Checkout Module Imports the Entire Cart Module
**Description:** The checkout module imports everything from cart when only one function is needed.
```javascript
import * as cart from './cart.js';
const total = cart.calculateTotal(cart.getItems());
```

### Error 7: Shared Config Module Gets Overwritten
**Description:** A module overwrites a property on the shared config object.
```javascript
// config.js
export const config = { apiUrl: '/api', debug: false };

// checkout.js
import { config } from './config.js';
config.apiUrl = 'https://malicious-site.com'; // security issue
```

### Error 8: Missing Shared Utility Import in Checkout
**Description:** Checkout page uses a utility function that exists in another module but isn't imported.
```javascript
export function formatOrderDate(date) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
```

### Error 9: Two Modules Define the Same Helper Function
**Description:** Both cart.js and checkout.js define their own `calculateTax` with slightly different logic.
```javascript
// cart.js
export function calculateTax(amount) { return amount * 0.08; }

// checkout.js
export function calculateTax(amount) { return amount * 0.085; }
```

### Error 10: Shared Module Exports as Default But Imported as Named
**Description:** A shared module exports `validateEmail` as default but checkout imports it with named syntax.
```javascript
// shared/validators.js: export default function validateEmail(email) { ... }
import { validateEmail } from '../shared/validators.js';
```

### Error 11: Checkout Page Has Tight Coupling to Cart Module
**Description:** The checkout module accesses the cart module's internal non-exported variables.
```javascript
import { cart } from './cart.js';
// cart.items is not exported but checkout accesses it
cart.items.forEach(item => processItem(item));
```

### Error 12: Order Confirmation Module Fetches Data Redundantly
**Description:** The confirmation page re-fetches data that was already available in the checkout module.
```javascript
export async function loadOrder() {
  const res = await fetch('/api/order/latest');
  return res.json();
}
```

### Error 13: Shared Constants Module Has Circular Dependency
**Description:** The constants module imports from a module that imports from constants.
```javascript
// constants.js
import { getApiBase } from './api.js';
export const API_URL = getApiBase() + '/v1';

// api.js
import { API_URL } from './constants.js';
export function getApiBase() { return 'https://api.example.com'; }
```

### Error 14: Checkout Module Creates Its Own HTTP Client
**Description:** Instead of sharing the API client, checkout creates a duplicate one.
```javascript
export async function apiPost(path, data) {
  const res = await fetch(`/api${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
  return res.json();
}
```

### Error 15: Shared Date Formatting Used Inconsistently
**Description:** Some modules format dates using `toLocaleDateString` while others use a custom formatter.
```javascript
// cart.js uses: date.toLocaleDateString('en-US')
// checkout.js uses: date.toLocaleDateString('en-GB')
```

### Error 16: Importing From Wrong Path for Shared Module
**Description:** The import path to the shared module is incorrect.
```javascript
import { formatCurrency } from './shared/formatCurrency.js';
// Actual path: ../shared/formatCurrency.js
```

### Error 17: Checkout Module Mutates Shared Array
**Description:** The checkout module pushes items directly into the shared cart's items array.
```javascript
import { cart } from './cart.js';
export function applyGiftCode(code) {
  cart.items.push({ type: 'discount', code, amount: -10 });
}
```

### Error 18: Price Formatting Function Not Consistent Across Modules
**Description:** Cart formats prices with `$` prefix while checkout formats with `USD` prefix.
```javascript
// cart.js
export function formatPrice(amount) { return `$${amount.toFixed(2)}`; }

// checkout.js
export function formatPrice(amount) { return `USD ${amount.toFixed(2)}`; }
```

### Error 19: Shared Validation Module Not Used in Checkout
**Description:** Checkout module has its own email validation instead of using the shared one.
```javascript
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### Error 20: Checkout Creates Its Own Shipping Calculator
**Description:** The checkout module duplicates the shipping calculation from the shared module.
```javascript
export function calculateShipping(items) {
  const weight = items.reduce((s, i) => s + (i.weight || 1), 0);
  if (weight > 10) return 14.99;
  if (weight > 5) return 9.99;
  return 4.99;
}
```

### Error 21: Shared Event Bus Has Listener Leaks
**Description:** Modules add event listeners to the shared event bus but never remove them.
```javascript
export const eventBus = {
  listeners: {},
  on(event, fn) { this.listeners[event] = (this.listeners[event] || []).concat(fn); },
  emit(event, data) { (this.listeners[event] || []).forEach(fn => fn(data)); }
};
```

### Error 22: Checkout Module Depends on Global Variable
**Description:** The checkout module accesses a global variable set by another module.
```javascript
export function getShippingAddress() {
  return window.checkoutData.shippingAddress;
}
```

### Error 23: Shared CSS Import in Multiple Modules
**Description:** Both cart and checkout modules import the same CSS file.
```javascript
// cart.js
import './styles/cart.css';

// checkout.js
import './styles/cart.css';
```

### Error 24: Checkout Page Loads Cart Data Twice
**Description:** Both the cart module and checkout module fetch the same cart API data.
```javascript
// cart.js
export async function fetchCart() {
  return fetch('/api/cart').then(r => r.json());
}

// checkout.js
export async function fetchCart() {
  return fetch('/api/cart').then(r => r.json());
}
```

### Error 25: Shared Module Returns Undefined Due to Wrong Export
**Description:** A shared function returns `undefined` because the export name doesn't match.
```javascript
// shared/utils.js
function calculateDiscount(price, percent) { return price * (percent / 100); }
export { calculateDiscout }; // typo

// checkout.js
import { calculateDiscount } from './shared/utils.js';
```

### Error 26: Order Summary Module Recalculates Everything
**Description:** The order summary module recalculates totals instead of using the passed values.
```javascript
export function renderOrderSummary(items) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  // render...
}
```

### Error 27: Shared Module Uses `this` Context Inappropriately
**Description:** A shared utility function uses `this` expecting it to be the caller's context.
```javascript
export function getTotal() {
  return this.items.reduce((s, i) => s + i.price, 0);
}
```

### Error 28: Checkout Module Re-Imports Re-Exported Functions
**Description:** The checkout module imports from both the original module and the barrel file.
```javascript
import { formatCurrency } from './utils/formatCurrency.js';
import { formatCurrency } from './utils/index.js';
```

### Error 29: Shared API Module Has Race Condition
**Description:** Multiple modules call `api.init()` simultaneously, causing race conditions.
```javascript
export let api;
export function init() {
  api = { baseUrl: '/api' };
}
```

### Error 30: Checkout Page Directly Manipulates Cart DOM
**Description:** The checkout module directly updates the cart's DOM elements.
```javascript
export function hideCartItems() {
  document.querySelectorAll('.cart-item').forEach(el => el.style.display = 'none');
}
```

### Error 31: Shared Module Exports Promise Instead of Resolved Value
**Description:** A shared module exports a promise that each consumer must await individually.
```javascript
export const config = fetch('/config.json').then(r => r.json());
```

### Error 32: Checkout Uses Deprecated Shared Function
**Description:** The checkout module calls a shared function that was marked as deprecated.
```javascript
import { oldCalculateShipping } from './shipping.js';
const cost = oldCalculateShipping(items); // deprecated
```

### Error 33: Shared Module Has Inconsistent Error Handling
**Description:** Some shared functions throw errors while others return error objects.
```javascript
export function validateCard(card) {
  if (card.length !== 16) throw new Error('Invalid card');
}
export function validateZip(zip) {
  if (zip.length !== 5) return { valid: false, error: 'Invalid zip' };
}
```

### Error 34: Checkout Module Bypasses Shared Authentication
**Description:** Checkout checks auth status directly instead of using the shared auth module.
```javascript
export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
```

### Error 35: Shared Module Uses Browser API Without Checking
**Description:** A shared module uses `localStorage` which may not be available in all contexts.
```javascript
export function savePreference(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
```

### Error 36: Checkout Page Import Doesn't Match Export Case
**Description:** Import uses different capitalization than the export name.
```javascript
import { FormatCurrency } from './utils.js';
// export: export function formatCurrency(amount) { ... }
```

### Error 37: Shared Module Side Effect on Import
**Description:** Importing the shared module causes a side effect that affects checkout.
```javascript
console.log('Shared module loaded');
document.title = 'Store';
```

### Error 38: Checkout Module Doesn't Handle Missing Cart Items
**Description:** Checkout assumes cart always has items and doesn't handle the empty case.
```javascript
export function renderCheckout() {
  const total = cart.items.reduce((s, i) => s + i.price, 0);
  // Crashes if cart.items is undefined
}
```

### Error 39: Shared Waitlist Module Has No Export
**Description:** A shared module defines functions but doesn't export them.
```javascript
function addToWaitlist(email) {
  // add email to waitlist
}
function getWaitlistCount() {
  // return count
}
```

### Error 40: Checkout Module Creates Its Own Logger
**Description:** Checkout creates its own logging instead of using the shared logger.
```javascript
export function logError(error) {
  console.error('[Checkout Error]', error);
}
```

### Error 41: Shared Module Returns Different Types
**Description:** A shared function sometimes returns a number, sometimes a string.
```javascript
export function getShippingCost(zip) {
  if (zip.length !== 5) return 'Invalid ZIP';
  return 5.99;
}
```

### Error 42: Checkout Module Interferes With Cart Module State
**Description:** Checkout calls cart's internal reset function through a side channel.
```javascript
import { cart } from './cart.js';
export function cancelCheckout() {
  cart._reset(); // accessing private method
}
```

### Error 43: Shared Module Creates Global Polyfill
**Description:** A shared module modifies global prototypes, affecting all other modules.
```javascript
Array.prototype.first = function() { return this[0]; };
String.prototype.capitalize = function() { return this.charAt(0).toUpperCase() + this.slice(1); };
```

### Error 44: Checkout Module Imports the Same Module Twice
**Description:** Checkout imports the same module with two different import paths.
```javascript
import { formatCurrency } from './utils/formatCurrency.js';
import { formatCurrency } from '../checkout/../utils/formatCurrency.js';
```

### Error 45: Shared Module Has Unused Exports
**Description:** The shared module exports functions that nobody uses.
```javascript
export function calculateTotal(items) { /* used */ }
export function calculateTax(total) { /* used */ }
export function calculateDiscount(total) { /* used */ }
export function calculateShipping(items) { /* used */ }
export function calculateWeight(items) { /* never used */ }
export function calculateVolume(items) { /* never used */ }
```

### Error 46: Checkout Module Uses Cart Constant Wrong Value
**Description:** Checkout module imports `TAX_RATE` from cart but cart's value is outdated.
```javascript
import { TAX_RATE } from './cart.js';
// cart.js has TAX_RATE = 0.08 but the rate changed to 0.09
// cart.js was updated but checkout still uses old import
```

### Error 47: Shared Module's Default Export Gets Named Wrong
**Description:** Each consumer imports the default export with a different name.
```javascript
// File 1: import cart from './cart.js';
// File 2: import shoppingCart from './cart.js';
// File 3: import CartModule from './cart.js';
```

### Error 48: Checkout Module Has Its Own Copy of Cart Data
**Description:** Checkout maintains a separate local cart copy that gets out of sync.
```javascript
let localCart = [];
export function syncCart() {
  localCart = [...cart.items];
}
```

### Error 49: Shared Config Has Nested Properties Changed by Modules
**Description:** Modules modify deeply nested config properties, causing unexpected behavior.
```javascript
import { config } from './config.js';
config.features.checkout.discountEnabled = false;
// Cart module depends on this being true
```

### Error 50: Checkout Module Skips Shared Validation
**Description:** Checkout doesn't use the shared form validation and trusts input directly.
```javascript
export function processPayment(cardNumber) {
  // No validation, sends raw card to API
  return api.post('/payments', { card: cardNumber });
}
```

### Error 51: Shared Module Has Async Init That's Not Exported
**Description:** The shared module initializes asynchronously but doesn't export the init promise.
```javascript
const initPromise = fetch('/config.json').then(r => r.json()).then(data => {
  window.config = data;
});
export function getConfig() { return window.config; }
```

### Error 52: Checkout Page Doesn't Import Shared Error Handler
**Description:** Checkout catches errors but doesn't use the shared error reporting module.
```javascript
try {
  await processPayment();
} catch (error) {
  console.log('Payment failed:', error);
}
```

### Error 53: Shared Module Exports Mutable Array by Reference
**Description:** The shared module exports an array that consumers accidentally mutate.
```javascript
export const activePromotions = [
  { code: 'SAVE10', discount: 0.1 },
  { code: 'FREESHIP', discount: 0.05 }
];
```

### Error 54: Checkout Module Calls Cart's Init Multiple Times
**Description:** Checkout calls cart initialization again, resetting cart state.
```javascript
import { init, addItem } from './cart.js';
export function startCheckout() {
  init(); // This resets the cart!
  addItem(currentProduct);
}
```

### Error 55: Shared Module Has Platform-Specific Code
**Description:** The shared module uses Node.js `process.env` in a browser context.
```javascript
export const isDev = process.env.NODE_ENV === 'development';
```

### Error 56: Checkout Page Has Unnecessary Re-Import
**Description:** Checkout re-imports and re-exports a module that's already available.
```javascript
export { formatCurrency } from './utils.js';
import { formatCurrency } from './utils.js';
```

### Error 57: Shared Module Creates Circular Reference Through Events
**Description:** Two shared modules emit events to each other, creating infinite loops.
```javascript
// cart-events.js emits 'cart:updated' -> checkout-events.js handles it -> emits 'checkout:updated' -> cart-events.js handles it
```

### Error 58: Checkout Module Uses Hardcoded API URLs
**Description:** Instead of using the shared API config, checkout has hardcoded endpoints.
```javascript
const API_URL = 'https://api.example.com';
export function submitOrder(order) {
  return fetch(`${API_URL}/orders`, { method: 'POST', body: JSON.stringify(order) });
}
```

### Error 59: Shared Module Returns Useless Wrapper Object
**Description:** A shared function wraps a simple value in an object unnecessarily.
```javascript
export function getSubtotal(items) {
  return { value: items.reduce((s, i) => s + i.price, 0) };
}
// Consumers must do: getSubtotal(items).value
```

### Error 60: Checkout Module Has Inline Styling in JS
**Description:** Checkout module contains hardcoded CSS styles instead of using CSS classes.
```javascript
export function renderError(message) {
  const el = document.createElement('div');
  el.style.color = 'red';
  el.style.backgroundColor = '#ffeeee';
  el.style.padding = '10px';
  el.style.border = '1px solid red';
  el.style.borderRadius = '4px';
  el.textContent = message;
  return el;
}
```

### Error 61: Shared Module Not Using Strict Equality
**Description:** A shared comparison function uses loose equality.
```javascript
export function isFreeShipping(total) {
  return total == 0; // loose equality
}
```

### Error 62: Checkout Module Overwrites Imported Function
**Description:** Checkout declares a local function with the same name as an imported one.
```javascript
import { calculateTotal } from './cart.js';
function calculateTotal(items) {
  return items.reduce((s, i) => s + i.price, 0) * 1.1; // adds 10% fee
}
```

### Error 63: Shared Module Throws Non-Standard Error Types
**Description:** The shared module throws string errors instead of Error objects.
```javascript
export function validateQuantity(qty) {
  if (qty < 1) throw 'Quantity must be at least 1';
  if (qty > 100) throw 'Quantity cannot exceed 100';
}
```

### Error 64: Checkout Module Has Dead Code From Copied Module
**Description:** Checkout contains unused functions copied from the cart module.
```javascript
export function addItem(product) { /* not used in checkout */ }
export function removeItem(id) { /* not used in checkout */ }
export function clearCart() { /* not used in checkout */ }
export function submitOrder(order) { /* only this is used */ }
```

### Error 65: Shared Module Exports Are Not Immutable
**Description:** Shared constants are exported as `let` instead of `const`, allowing reassignment.
```javascript
export let MAX_ITEMS = 100;
export let FREE_SHIPPING_MIN = 50;
```

### Error 66: Checkout Module Has Wrong Import for Shipping Service
**Description:** Checkout imports from the wrong shipping module path.
```javascript
import { calculateShipping } from './cart.js';
// Should be: ./shipping.js
```

### Error 67: Shared Module Has Conflicting Export Names
**Description:** Two shared modules export functions with the same name.
```javascript
// dateUtils.js: export function format(date) { ... }
// currencyUtils.js: export function format(amount) { ... }
```

### Error 68: Checkout Module Calls Shared Function With Wrong Arguments
**Description:** Checkout passes arguments in the wrong order to a shared function.
```javascript
import { calculateDiscount } from './pricing.js';
// calculateDiscount(price, percent) - but called as:
const discount = calculateDiscount(20, 100); // 20% of 100, not 20% off 100
```

### Error 69: Shared Module's Init Function Not Called
**Description:** The shared module has an `init()` function but nobody calls it.
```javascript
export function init() {
  // Setup shared resources
}
export function doSomething() {
  // Uses shared resources
}
```

### Error 70: Checkout Module Creates Duplicate API Calls
**Description:** Cart and checkout both fetch the same product data independently.
```javascript
// cart.js fetches products
// checkout.js also fetches products
```

## Issue Snippets (1-30)

### Issue 1: Checkout Module Duplicates Cart's Total Calculation
**Description:** The checkout module reimplements the total calculation from the cart module.
```javascript
export function calculateCheckoutTotal(items) {
  return items.reduce((s, i) => s + i.price * i.quantity, 0);
}
```

### Issue 2: Shared Utility Functions Are Scattered Across Files
**Description:** Utility functions are duplicated across cart.js, checkout.js, and product.js.
```javascript
// cart.js has formatPrice
// checkout.js has formatPrice (same logic)
// product.js has formatPrice (same logic)
```

### Issue 3: No Shared Validation Module for Forms
**Description:** Each module with form inputs has its own validation logic.
```javascript
// checkout.js: email validation regex
// account.js: email validation regex
// contact.js: email validation regex
```

### Issue 4: Tight Coupling Between Checkout and Payment
**Description:** The checkout module directly calls payment gateway internals.
```javascript
import { encryptCard, sendToGateway, handleResponse } from './payment.js';
export function processCheckout() {
  const encrypted = encryptCard(cardData);
  const result = sendToGateway(encrypted);
  return handleResponse(result);
}
```

### Issue 5: Shared State Mutated by Multiple Modules
**Description:** The `sharedState` object in the common module is modified by cart and checkout.
```javascript
export const sharedState = { cartItems: [], total: 0, discount: 0 };
```

### Issue 6: Checkout Page Has Duplicate CSS Imports
**Description:** Both the parent component and child component import the same CSS file.
```javascript
// checkout.js imports: './checkout.css'
// checkout-form.js imports: './checkout.css'
```

### Issue 7: No Centralized API Service
**Description:** Each module creates its own fetch calls with different error handling.
```javascript
// cart.js: fetch('/api/cart').then(r => r.json())
// checkout.js: fetch('/api/checkout').then(r => r.json())
// product.js: fetch('/api/products').then(r => r.json())
```

### Issue 8: Checkout Module Accesses Cart's Internal Array
**Description:** Checkout directly accesses `cart._items` instead of using `cart.getItems()`.
```javascript
import { cart } from './cart.js';
export function getCheckoutItems() {
  return cart._items; // accessing private property
}
```

### Issue 9: Shared Constants Defined in Multiple Files
**Description:** `TAX_RATE`, `FREE_SHIPPING_MIN`, and `SHIPPING_COST` are defined in multiple modules.
```javascript
// cart.js: const TAX_RATE = 0.08;
// checkout.js: const TAX_RATE = 0.08;
// order.js: const TAX_RATE = 0.08;
```

### Issue 10: Checkout Module Has UI Logic Mixed With Data Logic
**Description:** The checkout module combines data processing and DOM manipulation in one function.
```javascript
export function processOrder() {
  const total = calculateTotal();
  const tax = calculateTax(total);
  document.querySelector('.total').textContent = formatCurrency(total);
  document.querySelector('.tax').textContent = formatCurrency(tax);
  api.submitOrder({ total, tax });
}
```

### Issue 11: Shared Module Has No Error Handling
**Description:** The shared API utility doesn't handle network errors.
```javascript
export async function get(path) {
  const res = await fetch(`/api${path}`);
  return res.json();
}
```

### Issue 12: Checkout Module Not Using Shared Date Formatting
**Description:** Checkout formats dates inline instead of using the shared date utility.
```javascript
export function displayDeliveryDate(date) {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}
```

### Issue 13: Shared Module Has Mixed Naming Conventions
**Description:** Some exports use camelCase, some use PascalCase, some use snake_case.
```javascript
export function formatCurrency(amount) { /* ... */ }
export function FormatDate(date) { /* ... */ }
export function calculate_shipping(items) { /* ... */ }
```

### Issue 14: Checkout Module Directly Accesses DOM Outside Its Scope
**Description:** The checkout module modifies elements in the header and footer.
```javascript
export function updateCheckoutBadge(count) {
  document.querySelector('.header-cart-count').textContent = count;
  document.querySelector('.footer-summary').textContent = `Items: ${count}`;
}
```

### Issue 15: Shared Module Has No Default Export for Convenience
**Description:** A module used primarily for one main class has no default export.
```javascript
export class ShoppingCart {
  constructor() { this.items = []; }
  add(item) { this.items.push(item); }
  getTotal() { return this.items.reduce((s, i) => s + i.price, 0); }
}
```

### Issue 16: Checkout Module Repeats Cart Item Rendering
**Description:** The checkout module renders cart items again instead of reusing cart's render.
```javascript
export function renderCheckoutItems(items) {
  const container = document.getElementById('checkout-items');
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'checkout-item';
    div.innerHTML = `
      <span>${item.name}</span>
      <span>${formatCurrency(item.price)}</span>
    `;
    container.appendChild(div);
  });
}
```

### Issue 17: Shared Module Exports Too Many Internal Helpers
**Description:** The shared module exports helper functions only used internally.
```javascript
export function sanitizeInput(input) { /* used internally */ }
export function validateForm(data) { /* public API */ }
export function formatPayload(data) { /* used internally */ }
export function parseResponse(data) { /* used internally */ }
export function submitForm(data) { /* public API */ }
```

### Issue 18: Checkout Module Fetches Data That Cart Already Has
**Description:** Checkout fetches product details even though cart already has them.
```javascript
export async function getProductDetails(productId) {
  const res = await fetch(`/api/products/${productId}`);
  return res.json();
}
```

### Issue 19: No Shared Event Bus for Cross-Module Communication
**Description:** Modules communicate by directly calling each other's functions.
```javascript
// cart.js calls checkout functions directly:
import { updateCheckoutTotal } from './checkout.js';
export function addItem(item) {
  items.push(item);
  updateCheckoutTotal(items);
}
```

### Issue 20: Checkout Module Has Redundant Data Transformations
**Description:** Checkout transforms data into a format that cart already transformed.
```javascript
export function transformCartItems(items) {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity
  }));
}
```

### Issue 21: Shared Module Has Inconsistent Return Types
**Description:** Some functions return promises, some return values, some use callbacks.
```javascript
export function getCart(callback) { /* callback-based */ }
export async function getProducts() { /* promise-based */ }
export function getConfig() { /* sync return */ }
```

### Issue 22: Checkout Module Doesn't Reuse Cart's Loading State
**Description:** Checkout creates its own loading indicator instead of using cart's.
```javascript
export function showCheckoutLoading() {
  document.getElementById('checkout-loading').style.display = 'block';
}
```

### Issue 23: Shared Module Has No Type Annotations
**Description:** Shared functions lack documentation about expected parameter types.
```javascript
export function calculateTotal(items) {
  return items.reduce((s, i) => s + i.price, 0);
}
```

### Issue 24: Checkout Module Has Deep Import Chain
**Description:** Checkout imports a function through a long chain of barrel files.
```javascript
import { formatCurrency } from '../../utils/formatters/index.js';
```

### Issue 25: Shared Module's Public API Is Not Documented
**Description:** No documentation about which functions are meant for public use vs internal.
```javascript
export function init() { /* setup */ }
export function _internalHelper() { /* should be private */ }
export function formatCurrency(amount) { /* public */ }
export function __secretProcessor() { /* should be private */ }
```

### Issue 26: Checkout Module Creates Global Event Handlers
**Description:** Checkout attaches event handlers to document without namespacing.
```javascript
document.addEventListener('click', (e) => {
  if (e.target.matches('.checkout-btn')) processCheckout();
  if (e.target.matches('.apply-coupon')) applyCoupon();
});
```

### Issue 27: Shared Module Has Dead Code From Refactoring
**Description:** The shared module exports functions that were replaced but not removed.
```javascript
export function oldCalculateTax(amount) { return amount * 0.08; }
export function calculateTax(amount) { return amount * 0.09; }
```

### Issue 28: Checkout Module Not Using Shared Loading/Error Components
**Description:** Checkout creates its own loading spinner and error messages.
```javascript
export function showSpinner() {
  const spinner = document.createElement('div');
  spinner.className = 'custom-spinner';
  document.body.appendChild(spinner);
}
```

### Issue 29: Shared Module Imported With Inconsistent Paths
**Description:** Different files import the same shared module with different relative paths.
```javascript
// File in src/: import { api } from './services/api.js';
// File in src/cart/: import { api } from '../services/api.js';
// File in src/checkout/: import { api } from '../../src/services/api.js';
```

### Issue 30: Checkout Page Has Duplicate Imports From Same Module
**Description:** Multiple import statements from the same module in one file.
```javascript
import { calculateTotal } from './cart.js';
import { TAX_RATE } from './cart.js';
import { FREE_SHIPPING } from './cart.js';
import { calculateShipping } from './cart.js';
```

## Modification Snippets (1-50)

### Modify 1: Extract Shared Formatting Functions
**Description:** Create a shared `formatting.js` module for currency and date formatting used by cart and checkout.
```javascript
// cart.js has: function formatCurrency(amount) { return `$${amount.toFixed(2)}`; }
// checkout.js has: function formatCurrency(amount) { return `$${amount.toFixed(2)}`; }
```

### Modify 2: Create Shared Validation Module
**Description:** Extract validation logic used in multiple modules into a shared validators module.
```javascript
// checkout.js validates emails and phone numbers
// account.js validates emails and phone numbers
// contact.js validates emails and phone numbers
```

### Modify 3: Create Shared API Service
**Description:** Create a single API service module used by both cart and checkout.
```javascript
// cart.js: fetch('/api/cart').then(r => r.json()).catch(...)
// checkout.js: fetch('/api/checkout').then(r => r.json()).catch(...)
```

### Modify 4: Extract Shared Constants
**Description:** Move shared constants like TAX_RATE and SHIPPING_COST into a dedicated constants module.
```javascript
// cart.js: const TAX_RATE = 0.08;
// checkout.js: const TAX_RATE = 0.08;
// order.js: const TAX_RATE = 0.08;
```

### Modify 5: Create Event Bus for Cart-Checkout Communication
**Description:** Replace direct coupling between cart and checkout with an event bus.
```javascript
// cart.js directly imports and calls checkout functions:
import { updateCheckoutTotal } from './checkout.js';
export function addItem(item) {
  items.push(item);
  updateCheckoutTotal(items);
}
```

### Modify 6: Extract Shared Cart State Module
**Description:** Create a shared cart state module that both cart display and checkout use.
```javascript
// cart.js owns state AND displays it
// checkout.js has its own copy of cart data
```

### Modify 7: Create a Shared Shipping Calculator
**Description:** Extract shipping calculation into a shared module used by cart and checkout.
```javascript
// cart.js calculates shipping for display
// checkout.js calculates shipping for final total
```

### Modify 8: Add Shared Error Handler
**Description:** Create a centralized error handling module for all modules to use.
```javascript
// cart.js: try { ... } catch(e) { console.error(e); }
// checkout.js: try { ... } catch(e) { console.error(e); }
```

### Modify 9: Create a Shared Loading State Manager
**Description:** Create a shared loading state manager for consistent loading indicators.
```javascript
// cart.js has its own loading logic
// checkout.js has its own loading logic
```

### Modify 10: Extract Order Processing to Shared Module
**Description:** Create a shared order processing module used by both checkout and confirmation.
```javascript
// checkout.js processes orders
// confirmation.js re-processes orders
```

### Modify 11: Create Shared Price Calculator
**Description:** Extract total, tax, discount calculations into a shared pricing module.
```javascript
// cart.js: calculateSubtotal, calculateTax, calculateTotal
// checkout.js: calculateSubtotal, calculateTax, calculateTotal
```

### Modify 12: Add Shared Storage Module
**Description:** Create a shared storage module for localStorage operations.
```javascript
// cart.js: localStorage.setItem('cart', JSON.stringify(items))
// checkout.js: localStorage.getItem('checkout')
// preferences.js: localStorage.getItem('theme')
```

### Modify 13: Extract Cart Item Validation
**Description:** Create a shared cart item validator used by both cart and checkout.
```javascript
// cart.js validates item quantity before adding
// checkout.js validates item quantity before processing
```

### Modify 14: Create Shared UI Component Library
**Description:** Extract reusable UI components (buttons, inputs, modals) into shared modules.
```javascript
// cart.js renders its own buttons
// checkout.js renders its own buttons
```

### Modify 15: Add Shared Config Module With Immutable Properties
**Description:** Create a config module that prevents property overwriting.
```javascript
export const config = {
  apiUrl: '/api',
  taxRate: 0.08
};
// Problem: modules can overwrite these values
```

### Modify 16: Extract Address Validation to Shared Module
**Description:** Create a shared address validation module used throughout the app.
```javascript
// checkout.js validates shipping address
// account.js validates billing address
```

### Modify 17: Create a Shared Logger Module
**Description:** Create a centralized logging module for consistent log output.
```javascript
// cart.js: console.log('Item added:', item);
// checkout.js: console.log('Checkout started');
```

### Modify 18: Extract Date Formatting to Shared Module
**Description:** Create a shared date formatting module for consistent date display.
```javascript
// cart.js: date.toLocaleDateString('en-US')
// checkout.js: date.toLocaleDateString('en-US')
// order.js: date.toLocaleDateString('en-US')
```

### Modify 19: Create Shared Coupon/Discount Module
**Description:** Extract coupon validation and discount calculation into a shared module.
```javascript
// cart.js: validates and applies coupons
// checkout.js: validates and applies coupons
```

### Modify 20: Add Shared Module for Tax Calculation
**Description:** Create a shared tax calculation module that handles different tax rates.
```javascript
// cart.js: amount * 0.08
// checkout.js: amount * 0.08
```

### Modify 21: Extract Checkout Steps Into a Shared Module
**Description:** Create a shared checkout step manager instead of inline step logic.
```javascript
// Currently checkout steps are managed inline in checkout.js
```

### Modify 22: Create a Shared Module for Order Summary
**Description:** Extract order summary generation into a shared module.
```javascript
// checkout.js renders order summary
// confirmation.js renders order summary
```

### Modify 23: Add Shared Form State Manager
**Description:** Create a shared form state module to manage form data across checkout steps.
```javascript
// Currently each form step manages its own state separately
```

### Modify 24: Extract Payment Method Selection to Shared Module
**Description:** Create a shared payment method module used by checkout and settings.
```javascript
// checkout.js has payment method selection
// account.js has payment method selection
```

### Modify 25: Create Shared Delivery Option Module
**Description:** Create a shared module for delivery option calculations.
```javascript
// checkout.js calculates delivery dates
// order.js shows delivery dates
```

### Modify 26: Add Shared Data Transform Module
**Description:** Create a shared module for transforming data between API and UI formats.
```javascript
// cart.js: maps API products to cart items
// checkout.js: maps cart items to order items
```

### Modify 27: Extract Notification System to Shared Module
**Description:** Create a shared notification module for toast messages and alerts.
```javascript
// cart.js shows "Item added" notification
// checkout.js shows "Order placed" notification
```

### Modify 28: Create Shared Payment Processing Module
**Description:** Extract payment processing into a shared module used by checkout and recurring payments.
```javascript
// checkout.js processes one-time payments
// subscriptions.js processes recurring payments
```

### Modify 29: Add Shared Address Book Module
**Description:** Create a shared address module for saved addresses.
```javascript
// checkout.js uses shipping addresses
// account.js manages saved addresses
```

### Modify 30: Extract Cart Summary to Shared Module
**Description:** Create a shared cart summary component used in cart page and checkout sidebar.
```javascript
// cart page has cart summary
// checkout page has cart summary (duplicated)
```

### Modify 31: Create Shared Localization Module
**Description:** Create a shared module for text translations.
```javascript
// cart.js has inline English text
// checkout.js has inline English text
```

### Modify 32: Add Shared Accessibility Module
**Description:** Create a shared module for accessibility helpers.
```javascript
// cart.js has aria-label attributes
// checkout.js has aria-label attributes
```

### Modify 33: Extract Analytics Tracking to Shared Module
**Description:** Create a shared analytics module for consistent event tracking.
```javascript
// cart.js tracks "add_to_cart" events inline
// checkout.js tracks "checkout_started" events inline
```

### Modify 34: Create Shared Currency Conversion Module
**Description:** Create a shared module for currency conversion.
```javascript
// product.js shows prices in USD
// checkout.js shows prices in USD
```

### Modify 35: Add Shared Feature Flag Module
**Description:** Create a shared feature flag module that controls feature availability.
```javascript
// cart.js checks: if (localStorage.getItem('enable_new_cart'))
// checkout.js checks: if (localStorage.getItem('enable_new_checkout'))
```

### Modify 36: Extract Image URL Formatting to Shared Module
**Description:** Create a shared module for generating image URLs with correct paths.
```javascript
// product.js: /images/products/${id}.jpg
// cart.js: /images/products/${id}.jpg
```

### Modify 37: Create Shared Module for Order Tracking
**Description:** Create a shared order tracking module used by checkout and order history.
```javascript
// checkout.js fetches order status
// order-history.js fetches order status
```

### Modify 38: Add Shared Quantity Selector Component
**Description:** Create a shared quantity selector component.
```javascript
// cart.js has quantity selector
// product-detail.js has quantity selector
```

### Modify 39: Extract Search Functionality to Shared Module
**Description:** Create a shared search module.
```javascript
// header.js has search
// products.js has search
```

### Modify 40: Create Shared Auth State Module
**Description:** Create a shared authentication state module.
```javascript
// cart.js checks: localStorage.getItem('token')
// checkout.js checks: localStorage.getItem('token')
```

### Modify 41: Add Shared Responsive Layout Helpers
**Description:** Create a shared module for responsive layout utilities.
```javascript
// cart.js has responsive layout code
// checkout.js has responsive layout code
```

### Modify 42: Extract Confirmation Email Logic to Shared Module
**Description:** Create a shared module for generating confirmation content.
```javascript
// checkout.js sends confirmation email
// admin.js resends confirmation emails
```

### Modify 43: Create Shared Module for URL Parameter Handling
**Description:** Create a shared module for reading and writing URL parameters.
```javascript
// products.js reads ?category= from URL
// checkout.js reads ?promo= from URL
```

### Modify 44: Add Shared Cookie Consent Module
**Description:** Create a shared module for cookie consent management.
```javascript
// Multiple modules check cookie consent
```

### Modify 45: Extract Product Media Gallery to Shared Module
**Description:** Create a shared product media gallery component.
```javascript
// product-detail.js has image gallery
// quick-view.js has image gallery
```

### Modify 46: Create Shared Module for Breadcrumb Navigation
**Description:** Create a shared breadcrumb component.
```javascript
// product.js generates breadcrumbs
// checkout.js generates breadcrumbs
```

### Modify 47: Add Shared Scroll Position Manager
**Description:** Create a shared module for saving and restoring scroll positions.
```javascript
// cart.js saves scroll position
// product-list.js saves scroll position
```

### Modify 48: Extract Progress Indicator to Shared Module
**Description:** Create a shared multi-step progress indicator.
```javascript
// checkout.js has progress steps
// onboarding.js has progress steps
```

### Modify 49: Create Shared Module for Retry Logic
**Description:** Create a shared retry utility for failed API calls.
```javascript
// cart.js retries failed fetches
// checkout.js retries failed fetches
```

### Modify 50: Add Shared Debounce/Throttle Module
**Description:** Create a shared module for debounce and throttle utilities.
```javascript
// search.js debounces input
// checkout.js debounces form validation
```
