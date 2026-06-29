# Level 71: Module Fundamentals - ES6 Import/Export Basics

## Error Snippets (1-70)

### Error 1: Missing Named Import
**Description:** Import the `calculateTotal` function from `cart.js` but the import name is misspelled.
```javascript
import { calculateTotl } from './cart.js';
console.log(calculateTotl(cartItems));
```

### Error 2: Named Export Without Curly Braces
**Description:** Export the `taxRate` constant using named export syntax without curly braces.
```javascript
export taxRate = 0.08;
```

### Error 3: Importing Default Export Without Curly Braces as Named
**Description:** Import the default export `shippingCost` from `shipping.js` using named import syntax.
```javascript
import { shippingCost } from './shipping.js';
```

### Error 4: Missing File Extension in Import
**Description:** Import `formatCurrency` from `utils.js` but omit the file extension.
```javascript
import { formatCurrency } from './utils';
console.log(formatCurrency(19.99));
```

### Error 5: Multiple Named Exports Without Commas
**Description:** Export multiple constants `price` and `quantity` without separating them by commas.
```javascript
export const price = 5;
export const quantity = 10;
export { price quantity };
```

### Error 6: Using `export default` with `const` on Same Line
**Description:** Create a default export of an arrow function assigned to `const`.
```javascript
export default const calculateTax = (amount) => amount * 0.08;
```

### Error 7: Import Syntax in Non-Module Script
**Description:** Use import statement in a regular script without `type="module"`.
```javascript
import { addItem } from './cart.js';
addItem('shirt', 29.99);
```

### Error 8: Circular Import Between Two Modules
**Description:** Module A imports from Module B which imports from Module A, creating a circular reference.
```javascript
// a.js
import { getB } from './b.js';
export const getA = () => getB();
```
```javascript
// b.js
import { getA } from './a.js';
export const getB = () => getA();
```

### Error 9: Exporting a Variable After Declaration Without Referencing It
**Description:** Declare a function `discountPrice` then export it but spell the name differently.
```javascript
function discountPrice(price, discount) {
  return price - (price * discount);
}
export { dicountPrice };
```

### Error 10: Default Export Followed by Another Default Export
**Description:** Attempt to have two default exports in the same file.
```javascript
export default function formatDate(date) {
  return date.toString();
}
export default class Order {
  constructor(id) { this.id = id; }
}
```

### Error 11: Importing a Non-Existent Named Export
**Description:** Import `processPayment` from `checkout.js` but the module only exports `handlePayment`.
```javascript
import { processPayment } from './checkout.js';
processPayment(5000);
```

### Error 12: Inline Export Missing the Export Keyword
**Description:** Define a function `getShippingDate` but forget the `export` keyword before it.
```javascript
function getShippingDate(orderDate) {
  return new Date(orderDate.getTime() + 86400000 * 3);
}
```

### Error 13: Mixing Default and Named Imports Incorrectly
**Description:** Import both the default export `api` and named export `fetchProducts` in wrong order.
```javascript
import { fetchProducts }, api from './api.js';
```

### Error 14: Re-export Without Using `from`
**Description:** Try to re-export everything from `utils.js` without using the `from` keyword.
```javascript
export * './utils.js';
```

### Error 15: Variable Used Before Import Is Evaluated
**Description:** Use an imported constant before the import statement.
```javascript
console.log(APP_NAME);
import { APP_NAME } from './config.js';
```

### Error 16: Named Import of a Default-Only Function
**Description:** Try to import `validateEmail` using named syntax when the module only has a default export.
```javascript
import { validateEmail } from './validators.js';
```

### Error 17: Forgetting the `./` in Relative Import Path
**Description:** Import `db` from a local file using a bare specifier without `./`.
```javascript
import { db } from 'database.js';
```

### Error 18: `export default` Applied to a Function Declaration with a Different Name
**Description:** Write a function `calculateTotal` then export it as default but the module already has a default.
```javascript
export default function calculateTotal(items) {
  return items.reduce((sum, i) => sum + i.price, 0);
}
export default 42;
```

### Error 19: Using `import *` Without an Alias
**Description:** Import all exports from `math.js` without providing a namespace object.
```javascript
import * from './math.js';
```

### Error 20: Dynamic Import Used Without `await`
**Description:** Call `import()` to load `theme.js` dynamically but forget to handle the promise.
```javascript
function loadTheme() {
  import('./theme.js');
}
```

### Error 21: Named Export Used in Source But Imported as Default
**Description:** Import the named export `sum` from `calc.js` as if it were the default.
```javascript
import sum from './calc.js';
// calc.js: export const sum = (a, b) => a + b;
```

### Error 22: Attempting to Assign to an Imported Binding
**Description:** Try to reassign a value to an imported constant.
```javascript
import { taxRate } from './config.js';
taxRate = 0.10;
```

### Error 23: Duplicate Named Export Identifiers
**Description:** Export two different values using the same name `total`.
```javascript
export const total = 100;
export function total(items) { return items.length; }
```

### Error 24: Import Path With Wrong Case
**ErrorMessage:** The file system is case-sensitive but the import uses wrong casing.
```javascript
import { User } from './Models/User.js';
// Actual file: ./models/User.js
```

### Error 25: Using `export` With a Class After Declaration Without the Same Name
**Description:** Define class `OrderManager` then export it with a different name `OrderHandler`.
```javascript
class OrderManager {
  create() { /* ... */ }
}
export { OrderManager as OrderHandler };
```
Then trying `import { OrderManager } from './orders.js';` fails.

### Error 26: Missing Comma in Object Import
**Description:** Import multiple named exports `product`, `price` and `quantity` without a comma.
```javascript
import { product, price quantity } from './product.js';
```

### Error 27: Importing From a Directory Instead of a File
**Description:** Import from `./components` which is a directory with no `index.js` entry point.
```javascript
import { Header } from './components';
```

### Error 28: Default Export as Expression Without Semicolon
**Description:** Try to default export a ternary expression directly.
```javascript
export default discount > 0 ? discountedPrice : fullPrice;
```

### Error 29: Named Export of a Variable That Was Never Declared
**Description:** Export a variable `shippingCost` that was never declared in the module scope.
```javascript
shippingCost = 5.99;
export { shippingCost };
```

### Error 30: `import.meta` Used in Non-Module Script
**Description:** Use `import.meta.url` in a regular script tag.
```javascript
console.log(import.meta.url);
```

### Error 31: Exporting a Block-Scoped Variable After Its Block Ends
**Description:** Declare `const cache` inside an `if` block then try to export it outside.
```javascript
if (config.caching) {
  const cache = new Map();
}
export { cache };
```

### Error 32: Using String Literal Path Without Quotes
**Description:** Import `helper` from `helper.js` but use backticks instead of quotes.
```javascript
import { helper } from `./helper.js`;
```

### Error 33: Re-exporting a Named Export That Doesn't Exist
**Description:** Re-export `parseXML` from `parser.js` but the module only exports `parseJSON`.
```javascript
export { parseXML } from './parser.js';
```

### Error 34: Inline Export of an Anonymous Class Without Default
**Description:** Export an anonymous class without the `default` keyword.
```javascript
export class {
  constructor(name) { this.name = name; }
}
```

### Error 35: Using `import` Inside a Function Body
**Description:** Place a static import statement inside a function body (not at top level).
```javascript
function loadConfig() {
  import { config } from './config.js';
  return config;
}
```

### Error 36: Mismatched Default Import Name Used as Named
**Description:** Module `logger.js` has `export default function log() {}`. Import using named syntax with wrong name.
```javascript
import { log } from './logger.js';
```

### Error 37: Exported Variable Using `var` With Same Name as Imported Binding
**Description:** Export `var status = 'active'` and import it in another module that also declares `status`.
```javascript
// user.js
export var status = 'active';

// profile.js
import { status } from './user.js';
var status = 'inactive';
```

### Error 38: Module Uses `this` Expecting Window Context
**Description:** Reference `this` at the top level of a module, expecting it to be the global object.
```javascript
export const globalContext = this;
// In a module, this is undefined, not window
```

### Error 39: Re-export With Alias Using Wrong Syntax
**Description:** Try to re-export `getPrice` as `calculatePrice` using incorrect arrow syntax.
```javascript
export getPrice as calculatePrice from './pricing.js';
```

### Error 40: Named Export of a Function Expression Without Identifier
**Description:** Export a function expression without assigning it to a named variable.
```javascript
export function() {
  return 'hello';
};
```

### Error 41: Import Path Uses Backslash Instead of Forward Slash
**Description:** Import `data` from a path using Windows-style backslashes.
```javascript
import { data } from '.\\data.js';
```

### Error 42: Multiple Default Exports in Same Module
**Description:** Export default an object and also export default a function in the same file.
```javascript
export default { key: 'value' };
export default () => 'hello';
```

### Error 43: Imported Module Tries to Access `window.onload`
**Description:** A module script sets `window.onload` which conflicts with other scripts.
```javascript
window.onload = () => {
  console.log('Module loaded');
};
```

### Error 44: Named Import Used but Export Was Renamed on Export
**Description:** Import `originalName` but the module exported it as `renamed`.
```javascript
// data.js
const originalName = 'secret';
export { originalName as renamed };

// app.js
import { originalName } from './data.js';
```

### Error 45: Forgetting to Wrap Default Import in Curly Braces for Re-Export
**Description:** Re-export the default export of `format.js` without using `export { default }`.
```javascript
export default from './format.js';
```

### Error 46: Using `export default` With `let` Declaration
**Description:** Try to default export a `let` variable declaration.
```javascript
export default let counter = 0;
```

### Error 47: Importing Both Default and Namespace Incorrectly
**Description:** Try to import default export and use namespace syntax simultaneously with wrong syntax.
```javascript
import default as utils, * as all from './utils.js';
```

### Error 48: Module Script Uses `document.write`
**Description:** Use `document.write` inside a module script which causes problems.
```javascript
export function renderBanner() {
  document.write('<h1>Welcome</h1>');
}
```

### Error 49: Export Statement at Bottom But Name Doesn't Match Any Declaration
**Description:** Write an export list with names that don't correspond to any declarations.
```javascript
const a = 1;
const b = 2;
export { a, b, c };
```

### Error 50: Dynamic Import `.then()` Not Handling Errors
**Description:** Use dynamic import without a `.catch()` for potential network failures.
```javascript
function loadWidget() {
  import('./widget.js').then(w => w.init());
}
```

### Error 51: Named Export With Reserved Word as Name
**Description:** Try to export a variable named `default` which is a reserved word.
```javascript
const default = 42;
export { default };
```

### Error 52: Missing Quotes Around Module Specifier
**Description:** Omit the quotes when specifying the module path.
```javascript
import { add } from ./math.js;
```

### Error 53: Top-Level Await in Non-Module Script
**Description:** Use `await` at the top level outside of a module context.
```javascript
const data = await fetch('/api/data').then(r => r.json());
```

### Error 54: Named Import Destructuring Syntax Confusion
**Description:** Use destructuring syntax instead of named import syntax.
```javascript
import { first: firstName, last: lastName } from './user.js';
```

### Error 55: Self-Importing Module
**Description:** A module that imports from itself, causing an infinite loop.
```javascript
import { something } from './self.js';
export const something = 42;
```

### Error 56: `import` Statement After Regular Code
**Description:** Place an import statement after some executable code (not at top).
```javascript
console.log('Starting...');
import { config } from './config.js';
```

### Error 57: Module Uses `var` at Top Level Expecting Global
**Description:** Declare `var` at the top level of a module expecting it to create a global.
```javascript
export var items = [];
// Expecting window.items to work
```

### Error 58: Importing `.mjs` File With `.js` Extension
**Description:** Import from a file that actually has `.mjs` extension but using `.js`.
```javascript
import { helper } from './helper.mjs';
// File on disk: helper.mjs
```

### Error 59: Re-export All From Module Without Excluding Something
**Description:** Re-export everything from `auth.js` but it also exports `internalToken` which shouldn't be exposed.
```javascript
export * from './auth.js';
// auth.js exports: login, logout, internalToken
```

### Error 60: Named Export Using `default` as Identifier
**Description:** Try to export a variable named `default` using `export { default }`.
```javascript
const default = 'fallback';
export { default };
```

### Error 61: Module Tries to Access DOM Before It's Ready
**Description:** Run DOM manipulation code at the top level of a module before DOM is ready.
```javascript
document.getElementById('app').innerHTML = 'Hello';
```

### Error 62: Using `import` With Template Literal Path
**Description:** Use a template literal for a static import (which must be a string literal).
```javascript
import { lang } from `./i18n/${locale}.js`;
```

### Error 63: `export *` From a Module That Has a Default Export
**Description:** Re-export all from a module that has a default export, which is not included.
```javascript
export * from './components.js';
// components.js has: export default Button, export const Input = ...
// Button is not re-exported
```

### Error 64: Importing Module That Was Never Installed
**Description:** Import `lodash` but the package was never installed via npm.
```javascript
import { debounce } from 'lodash';
```

### Error 65: Named Export Confusion With Destructured Object
**Description:** Try to export a destructured property directly without proper syntax.
```javascript
const user = { name: 'Alice', age: 30 };
export user.name;
```

### Error 66: Export Statement That References a Local Variable With Typo
**Description:** Export list references `shippingCost` but the actual variable is `shippingCosts`.
```javascript
const shippingCosts = [4.99, 9.99, 14.99];
export { shippingCosts, shippingCost };
```

### Error 67: Module-Level Code Throws Unhandled Error
**Description:** Top-level module code throws an error that blocks all imports.
```javascript
throw new Error('Module failed to load');
export const data = 'valuable';
```

### Error 68: Importing Two Modules That Both Set the Same Global
**Description:** Two modules both try to set `window.appName` to different values.
```javascript
// module-a.js
window.appName = 'Store';

// module-b.js
window.appName = 'Shop';
```

### Error 69: Dynamic Import With Relative Path That's Actually Absolute
**Description:** Use an absolute path in a dynamic import that should be relative.
```javascript
async function load() {
  const mod = await import('/src/utils/helper.js');
  return mod;
}
```

### Error 70: Named Import of a Default Export Using `* as` Syntax
**Description:** Use namespace import to import a module that only has a default export, then try to use it.
```javascript
import * as utils from './utils.js';
// utils.js: export default function parse() {}
utils.parse(); // Error: parse is not a function
```

## Issue Snippets (1-30)

### Issue 1: Monolithic Utility Module
**Description:** All utility functions are crammed into one file instead of being organized into separate modules.
```javascript
export function formatDate(date) { /* ... */ }
export function formatCurrency(amount) { /* ... */ }
export function validateEmail(email) { /* ... */ }
export function validatePhone(phone) { /* ... */ }
export function capitalize(str) { /* ... */ }
export function pluralize(str) { /* ... */ }
export function truncate(str, len) { /* ... */ }
export function slugify(str) { /* ... */ }
export function randomId() { /* ... */ }
export function debounce(fn, ms) { /* ... */ }
```

### Issue 2: Everything Imported With Wildcard
**Description:** Import everything from a module when only a few functions are actually used.
```javascript
import * as utils from './utils.js';
const total = utils.calculateTotal(items);
const formatted = utils.formatCurrency(total);
// Only 2 functions used out of 30 exported
```

### Issue 3: Missing `.js` Extension in All Imports
**Description:** Multiple imports omit the `.js` extension consistently.
```javascript
import { Cart } from './cart';
import { Product } from './product';
import { User } from './user';
import { Order } from './order';
import { Payment } from './payment';
```

### Issue 4: Single Module With Mixed Concerns
**Description:** A single file handles cart logic, payment processing, and UI rendering together.
```javascript
export function addToCart(item) { cart.push(item); renderCart(); }
export function renderCart() { /* DOM updates */ }
export function processPayment(total) { /* API call */ renderConfirmation(); }
export function renderConfirmation() { /* DOM updates */ }
function calculateTax(amount) { return amount * 0.08; }
```

### Issue 5: Named Exports Used When Default Would Be Better
**Description:** Exporting a single class using named export instead of default export.
```javascript
export class ShoppingCart {
  constructor() { this.items = []; }
  add(item) { this.items.push(item); }
  remove(id) { this.items = this.items.filter(i => i.id !== id); }
  getTotal() { return this.items.reduce((s, i) => s + i.price, 0); }
}
```

### Issue 6: Over-Splitting Into Too Many Tiny Modules
**Description:** Each tiny function is in its own file, making imports cumbersome.
```javascript
// add.js
export function add(a, b) { return a + b; }

// subtract.js
export function subtract(a, b) { return a - b; }

// multiply.js
export function multiply(a, b) { return a * b; }

// divide.js
export function divide(a, b) { return a / b; }
```

### Issue 7: Tight Coupling Between Cart and Checkout Modules
**Description:** Cart module directly references checkout module's internal functions.
```javascript
// cart.js
import { renderPaymentForm, validateCard } from './checkout.js';
export function checkout() {
  renderPaymentForm();
  validateCard('4111111111111111');
}
```

### Issue 8: Importing Entire Library for One Function
**Description:** Import a full library namespace when only one method is needed.
```javascript
import * as moment from 'moment';
const today = moment().format('YYYY-MM-DD');
```

### Issue 9: Module Side Effects at Top Level
**Description:** A module performs side effects (API calls) at the top level when imported.
```javascript
console.log('Cart module loaded');
fetch('/api/cart/init').then(r => r.json()).then(initCart);
export function addItem(item) { /* ... */ }
export function removeItem(id) { /* ... */ }
```

### Issue 10: No Barrel Exports for Component Directory
**Description:** Components directory has many files but no `index.js` barrel export.
```javascript
// User must import each component individually
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { Sidebar } from './components/Sidebar.js';
import { ProductCard } from './components/ProductCard.js';
import { CartItem } from './components/CartItem.js';
```

### Issue 11: Circular Dependency via Barrel File
**Description:** Barrel file creates a circular dependency between modules.
```javascript
// index.js
export { auth } from './auth.js';
export { user } from './user.js';

// auth.js
import { user } from './index.js';

// user.js
import { auth } from './index.js';
```

### Issue 12: Inconsistent Naming of Exports
**Description:** Some exports use camelCase, some use PascalCase, some use snake_case.
```javascript
export const tax_rate = 0.08;
export const shippingCost = 5.99;
export const CalculateTotal = (items) => { /* ... */ };
```

### Issue 13: Module Uses Both Default and Named Exports Unnecessarily
**Description:** Exporting both a default and many named exports from the same file adds confusion.
```javascript
export default class Cart { /* ... */ }
export const TAX_RATE = 0.08;
export const FREE_SHIPPING_MIN = 50;
export function validateCart(cart) { /* ... */ }
export function calculateShipping(zip) { /* ... */ }
```

### Issue 14: Relative Import Paths Too Deep
**Description:** Import paths with many `../` levels making refactoring difficult.
```javascript
import { formatCurrency } from '../../../../utils/formatCurrency.js';
import { api } from '../../../../services/api.js';
import { auth } from '../../../../services/auth.js';
```

### Issue 15: Module Not Using `export` But Expecting Externals to Access
**Description:** Functions defined in a module but not exported, yet other files try to use them.
```javascript
function calculateTotal(items) {
  return items.reduce((s, i) => s + i.price, 0);
}
function applyDiscount(total) {
  return total > 100 ? total * 0.9 : total;
}
```

### Issue 16: Re-Exporting Without Filtering Internal API
**Description:** A barrel file re-exports everything including internal helper functions.
```javascript
// internal helpers exposed unintentionally
export { formatDate } from './helpers/date.js';
export { validateEmail, validatePhone, validateZip, sanitizeInput, hashPassword } from './helpers/validators.js';
export { parseCSV, parseJSON, parseXML, parseYAML, stringifyCSV } from './helpers/parsers.js';
```

### Issue 17: Imported Binding Accidentally Mutated via Method Call
**Description:** Calling a method on an imported object that mutates the original in the source module.
```javascript
import { cart } from './cart.js';
export function clearCart() {
  cart.items.length = 0; // Mutates the array in the source module
}
```

### Issue 18: Static Import Inside a Conditional
**Description:** Using a static import (not dynamic) but only using the import conditionally.
```javascript
import { heavyComputation } from './heavy.js';
export function process(flag) {
  if (flag) {
    heavyComputation(data);
  }
}
// heavy.js is always loaded even when not needed
```

### Issue 19: Module Relies on Global State Set by Another Module
**Description:** Module assumes `window.user` exists because another module sets it, rather than importing.
```javascript
export function getUserPreferences() {
  return {
    theme: window.user?.theme || 'light',
    lang: window.user?.lang || 'en'
  };
}
```

### Issue 20: Named Exports With Non-Descriptive Names
**Description:** Export names like `a`, `b`, `c` that are ambiguous in other modules.
```javascript
export const a = (items) => items.reduce((s, i) => s + i.price, 0);
export const b = (total) => total > 50;
export const c = (total, shipping) => total + shipping;
```

### Issue 21: Missing `type="module"` on Script Tag
**Description:** The HTML loads a JavaScript file using ES6 imports but forgets `type="module"`.
```javascript
// HTML file
<script src="js/app.js"></script>
```

### Issue 22: Both Default and Named Imports Use Same Local Name
**Description:** Import default as `data` and named export `data` from same module.
```javascript
import data, { data } from './module.js';
```

### Issue 23: Module File Named With Spaces
**Description:** A JavaScript module file has spaces in its name causing import issues.
```javascript
import { helpers } from './my helpers.js';
```

### Issue 24: No Separation of Concerns Between Data and View
**Description:** Data logic and DOM manipulation are mixed throughout every module.
```javascript
export function updateQuantity(productId, newQty) {
  const items = JSON.parse(localStorage.getItem('cart')) || [];
  const item = items.find(i => i.id === productId);
  if (item) item.quantity = newQty;
  localStorage.setItem('cart', JSON.stringify(items));
  document.querySelector(`.qty-${productId}`).textContent = newQty;
  document.querySelector('.total').textContent = calculateTotal(items);
}
```

### Issue 25: Module Uses `export default` Object Instead of Named Exports
**Description:** Exporting an object with methods instead of using individual named exports.
```javascript
export default {
  add(a, b) { return a + b; },
  subtract(a, b) { return a - b; },
  multiply(a, b) { return a * b; },
  divide(a, b) { return a / b; }
};
```

### Issue 26: Inline Script in HTML Mixed With Module Imports
**Description:** An inline `<script>` block tries to use imported values without being a module.
```javascript
<script>
  import { app } from './app.js';
  app.init();
</script>
```

### Issue 27: Exporting Mutable Global Arrays Directly
**Description:** Exporting an array reference that allows external mutation of internal state.
```javascript
export const activeOrders = [];
export function addOrder(order) {
  activeOrders.push(order);
}
```

### Issue 28: Module Path Uses Non-Canonical Relative Form
**Description:** Import paths unnecessarily use `./` combined with `../` in confusing ways.
```javascript
import { validate } from './../validators/validate.js';
import { format } from './../formatters/./format.js';
```

### Issue 29: Importing From `node_modules` Without Package Name
**Description:** Import using a path that goes into `node_modules` directly instead of bare specifier.
```javascript
import { React } from './node_modules/react/index.js';
```

### Issue 30: Module-Level Async Initialization Without Error Handling
**Description:** Top-level await or async init in a module with no error handling for failures.
```javascript
const config = await fetch('/config.json').then(r => r.json());
export function getConfig() {
  return config;
}
```

## Modification Snippets (1-50)

### Modify 1: Split Monolithic Cart File Into Separate Modules
**Description:** Split the cart logic into `cart-state.js`, `cart-display.js`, and `cart-events.js`.
```javascript
// cart.js (monolithic)
let items = [];
export function addItem(product) { items.push(product); render(); }
export function removeItem(id) { items = items.filter(i => i.id !== id); render(); }
export function getTotal() { return items.reduce((s, i) => s + i.price, 0); }
function render() { /* DOM update */ }
document.querySelector('.checkout-btn').addEventListener('click', () => { /* ... */ });
```

### Modify 2: Convert to Named Exports
**Description:** The module uses `export default` with an object. Convert to individual named exports.
```javascript
export default {
  formatCurrency(amount) { return `$${amount.toFixed(2)}`; },
  formatDate(date) { return date.toLocaleDateString(); },
  formatNumber(num) { return num.toLocaleString(); }
};
```

### Modify 3: Add Default Export
**Description:** Add a default export for the main `ShoppingCart` class alongside existing named utility exports.
```javascript
export const TAX_RATE = 0.08;
export const FREE_SHIPPING = 50;
export function calculateTax(amount) { return amount * TAX_RATE; }
export function calculateShipping(total) { return total > FREE_SHIPPING ? 0 : 5.99; }
```

### Modify 4: Create Entry Point Module
**Description:** Create an `index.js` entry point that imports and re-exports all public API from the cart module.
```javascript
// Currently users import from multiple files:
import { addToCart } from './cart/cart-core.js';
import { renderCart } from './cart/cart-ui.js';
import { cartEvents } from './cart/cart-events.js';
```

### Modify 5: Add Barrel Exports for Components
**Description:** Create an `index.js` barrel file that re-exports all components.
```javascript
// Currently:
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { Sidebar } from './components/Sidebar.js';
import { ProductGrid } from './components/ProductGrid.js';
import { ProductCard } from './components/ProductCard.js';
```

### Modify 6: Convert to Dynamic Import for Heavy Module
**Description:** Convert a static import of a rarely used chart module to dynamic import.
```javascript
import { renderChart } from './charts.js';
export function showAnalytics() {
  renderChart(salesData);
}
```

### Modify 7: Reorganize Utility Functions Into Sub-Modules
**Description:** Split a large `utils.js` into `date-utils.js`, `string-utils.js`, and `math-utils.js`.
```javascript
export function formatDate(date) { /* ... */ }
export function parseDate(str) { /* ... */ }
export function capitalize(str) { /* ... */ }
export function pluralize(str) { /* ... */ }
export function round(num, decimals) { /* ... */ }
export function clamp(num, min, max) { /* ... */ }
export function randomInt(min, max) { /* ... */ }
```

### Modify 8: Add Module-Level Error Boundary
**Description:** Wrap the module's initialization in a try-catch to handle load failures gracefully.
```javascript
const config = await fetch('/config.json').then(r => r.json());
export const API_KEY = config.apiKey;
export const BASE_URL = config.baseUrl;
```

### Modify 9: Convert CommonJS to ES6 Module
**Description:** Convert the CommonJS module to ES6 import/export syntax.
```javascript
const path = require('path');
const fs = require('fs');
module.exports = {
  readConfig() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
  }
};
```

### Modify 10: Add Lazy Loading for Admin Module
**Description:** Make the admin panel module load only when the user clicks "Admin" button.
```javascript
import { AdminPanel } from './admin/AdminPanel.js';
document.getElementById('admin-btn').addEventListener('click', () => {
  AdminPanel.open();
});
```

### Modify 11: Create a Shared Constants Module
**Description:** Extract hardcoded constants from various modules into a shared constants module.
```javascript
// cart.js uses: const TAX_RATE = 0.08;
// shipping.js uses: const TAX_RATE = 0.08;
// checkout.js uses: const TAX_RATE = 0.08;
```

### Modify 12: Refactor Circular Dependencies
**Description:** Break the circular dependency between `auth.js` and `user.js` by creating a shared module.
```javascript
// auth.js imports from user.js
// user.js imports from auth.js
```

### Modify 13: Add Proper Error Handling for Dynamic Imports
**Description:** Add error handling to the dynamic import of the payment module.
```javascript
function loadPaymentModule() {
  import('./payment.js').then(module => {
    module.init();
  });
}
```

### Modify 14: Create a Config Module With Environment Awareness
**Description:** Create a configuration module that selects the right API URLs based on environment.
```javascript
export const API_URL = 'http://localhost:3000/api';
export const CDN_URL = 'http://localhost:8080';
```

### Modify 15: Convert Module to Use Named Exports for Tree-Shaking
**Description:** Refactor an object-export pattern to named exports for better tree-shaking.
```javascript
const api = {
  get(url) { return fetch(url); },
  post(url, data) { return fetch(url, { method: 'POST', body: JSON.stringify(data) }); },
  put(url, data) { return fetch(url, { method: 'PUT', body: JSON.stringify(data) }); },
  delete(url) { return fetch(url, { method: 'DELETE' }); }
};
export default api;
```

### Modify 16: Add `import.meta.url` Based Asset Path Resolution
**Description:** Use `import.meta.url` to resolve asset paths relative to the current module.
```javascript
const assetsBase = '/assets/';
export function getAssetUrl(path) {
  return `${assetsBase}${path}`;
}
```

### Modify 17: Split Large Validation Module
**Description:** Break one large `validators.js` into focused validator modules by domain.
```javascript
export function validateEmail(email) { /* ... */ }
export function validatePhone(phone) { /* ... */ }
export function validateCreditCard(card) { /* ... */ }
export function validateAddress(address) { /* ... */ }
export function validateZipCode(zip) { /* ... */ }
export function validateName(name) { /* ... */ }
export function validatePassword(password) { /* ... */ }
export function validateDate(date) { /* ... */ }
```

### Modify 18: Create API Service Module With Proper Exports
**Description:** Refactor the raw fetch calls into a dedicated API service module.
```javascript
// Used in multiple files:
fetch('/api/products').then(r => r.json());
fetch('/api/cart').then(r => r.json());
fetch('/api/orders').then(r => r.json());
```

### Modify 19: Convert to Default Export for Single-Class Module
**Description:** Change named export to default export for a module that only has one class.
```javascript
export class ProductManager {
  constructor() { this.products = []; }
  async fetchAll() { /* ... */ }
  async getById(id) { /* ... */ }
  async search(query) { /* ... */ }
}
```

### Modify 20: Add Module Preload Tags for Critical Modules
**Description:** Add `<link rel="modulepreload">` for critical modules in the HTML.
```javascript
// Critical modules that should be preloaded:
// app.js, cart.js, checkout.js
```

### Modify 21: Create a Hooks/Plugin Module Pattern
**Description:** Implement a simple hook system that allows modules to extend each other.
```javascript
// Currently modules directly call each other's functions
```

### Modify 22: Extract Payment Processing Into Separate Module
**Description:** Separate payment processing logic from the checkout module.
```javascript
// checkout.js currently has:
export function processOrder() {
  validateCart();
  calculateTotal();
  processPayment();
  sendConfirmation();
}
```

### Modify 23: Create a Centralized Event Bus Module
**Description:** Create an event bus module to decouple modules from direct imports.
```javascript
// cart.js directly calls checkout.js functions
import { updateCheckoutUI } from './checkout.js';
export function addItem(product) {
  items.push(product);
  updateCheckoutUI(items);
}
```

### Modify 24: Normalize All Imports to Use `.js` Extension
**Description:** Add missing `.js` extensions to all import statements throughout the project.
```javascript
import { Cart } from './cart';
import { Product } from './product';
import { User } from './user';
import { Order } from './order';
import { Payment } from './payment';
```

### Modify 25: Create a Vendor Module for Third-Party Libraries
**Description:** Wrap third-party library imports in a vendor module so the rest of the code doesn't depend directly on the library.
```javascript
// Multiple files use DayJS directly:
import dayjs from 'dayjs';
```

### Modify 26: Implement Tree-Shakeable Module Structure
**Description:** Restructure the module so unused exports can be tree-shaken by the bundler.
```javascript
export default {
  featureA() { /* ... */ },
  featureB() { /* ... */ },
  featureC() { /* ... */ },
  featureD() { /* ... */ },
  featureE() { /* ... */ }
};
```

### Modify 27: Add Type-Safe Module Boundary Checks
**Description:** Add runtime type checking at module boundaries for exported functions.
```javascript
export function setQuantity(productId, quantity) {
  // Currently no validation
  cart[productId] = quantity;
}
```

### Modify 28: Create a Localization Module With Dynamic Loading
**Description:** Create a module that loads locale-specific translations dynamically.
```javascript
// Currently all translations are in one file
export const translations = {
  en: { hello: 'Hello' },
  es: { hello: 'Hola' },
  fr: { hello: 'Bonjour' }
};
```

### Modify 29: Extract Cart State Management Into a Module
**Description:** Separate cart state management from cart UI rendering into distinct modules.
```javascript
// cart.js currently mixes state and rendering:
let items = [];
export function addItem(product) {
  items.push(product);
  renderCart();
}
function renderCart() { /* DOM */ }
```

### Modify 30: Create a Module That Re-Exports Only What's Needed
**Description:** Create facade modules that re-export only the public API of a subsystem.
```javascript
// Currently all internal functions are importable:
export function init() { /* ... */ }
export function render() { /* ... */ }
export function handleClick() { /* ... */ }
export function validateInput(input) { /* ... */ }
export function formatOutput(data) { /* ... */ }
export function calculateMetrics(data) { /* ... */ }
```

### Modify 31: Add Dynamic Import Retry Logic
**Description:** Implement retry logic for dynamic imports that fail due to network issues.
```javascript
async function loadModule(path) {
  return import(path);
}
```

### Modify 32: Convert Global Functions to Module Exports
**Description:** Refactor globally-defined functions into proper module exports.
```javascript
// index.html has:
function showNotification(msg) { /* ... */ }
function hideNotification() { /* ... */ }
function updateCartBadge(count) { /* ... */ }
function calculateTotal(items) { /* ... */ }
function formatPrice(amount) { /* ... */ }
```

### Modify 33: Create a Module Dependency Graph Documentation
**Description:** Add module dependency comments at the top of each file to document the import structure.
```javascript
import { Cart } from './cart.js';
import { Product } from './product.js';
import { Checkout } from './checkout.js';
import { api } from './api.js';
```

### Modify 34: Extract Button Components Into Their Own Module
**Description:** Move all button component definitions from `components.js` into a dedicated `buttons.js` module.
```javascript
// components.js has:
export class PrimaryButton { /* ... */ }
export class SecondaryButton { /* ... */ }
export class DangerButton { /* ... */ }
export class IconButton { /* ... */ }
export class LinkButton { /* ... */ }
```

### Modify 35: Add Module Initialization Order Validation
**Description:** Add checks to ensure modules are initialized in the correct order.
```javascript
// app.js
import { initAuth } from './auth.js';
import { initCart } from './cart.js';
import { initCheckout } from './checkout.js';
initAuth();
initCart();
initCheckout();
```

### Modify 36: Create a Singleton Module Pattern
**Description:** Convert a module that creates multiple instances into a proper singleton pattern.
```javascript
import { CartService } from './CartService.js';
const cart1 = new CartService();
const cart2 = new CartService();
// Two instances when only one should exist
```

### Modify 37: Refactor to Use `export default` Function
**Description:** Change a named export function to a default export for a single-function module.
```javascript
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

### Modify 38: Add Module-Level Caching With Proper Exports
**Description:** Add caching to an expensive computation module while properly exporting the cache.
```javascript
export function computeHeavyMetrics(data) {
  // Expensive computation every time
  return data.map(/* complex */).filter(/* complex */);
}
```

### Modify 39: Split Configuration by Environment Into Modules
**Description:** Create separate config modules for development, staging, and production.
```javascript
export const config = {
  apiUrl: 'http://localhost:3000',
  cdnUrl: 'http://localhost:8080',
  debug: true
};
```

### Modify 40: Create a Module That Combines Multiple Services
**Description:** Create a `checkout-service.js` that combines cart, payment, and shipping services.
```javascript
// Currently three separate imports:
import { getCart } from './cart.js';
import { createPayment } from './payment.js';
import { calculateShipping } from './shipping.js';
```

### Modify 41: Add Named Export Aliases for Backward Compatibility
**Description:** Add aliases for renamed exports so existing imports continue to work.
```javascript
// Renamed calculateTotal to computeTotal
export function computeTotal(items) { /* ... */ }
// Need to also export as calculateTotal for backward compatibility
```

### Modify 42: Convert Side-Effect Module to Pure Module With Init Function
**Description:** Refactor a module that runs side effects on import to use an explicit `init()` function.
```javascript
// Currently runs on import:
fetch('/api/init').then(data => setup(data));
export function doSomething() { /* ... */ }
```

### Modify 43: Create Named Exports for Each API Endpoint
**Description:** Replace a generic API module with specific named export functions per endpoint.
```javascript
export default {
  getProducts: () => fetch('/api/products').then(r => r.json()),
  getProduct: (id) => fetch(`/api/products/${id}`).then(r => r.json()),
  createOrder: (data) => fetch('/api/orders', { method: 'POST', body: JSON.stringify(data) }),
  getOrders: () => fetch('/api/orders').then(r => r.json())
};
```

### Modify 44: Add Dev-Only Module With Conditional Export
**Description:** Create a module with development-only utilities that are excluded in production builds.
```javascript
export function logState(store) {
  console.log('Current state:', store.getState());
}
export function inspectComponent(component) {
  console.log('Component props:', component.props);
}
```

### Modify 45: Extract Date Formatting Into a Shared Module
**Description:** Move date formatting functions from multiple modules into a shared `date-utils.js`.
```javascript
// Used in cart.js:
function formatOrderDate(date) { /* ... */ }

// Used in checkout.js:
function formatDeliveryDate(date) { /* ... */ }

// Used in order-history.js:
function formatHistoryDate(date) { /* ... */ }
```

### Modify 46: Create a Module Bundle Strategy
**Description:** Decide which modules should be bundled together and which should be lazy-loaded.
```javascript
// Currently all modules are loaded eagerly:
import './header.js';
import './footer.js';
import './cart.js';
import './checkout.js';
import './product-list.js';
import './product-detail.js';
import './admin-panel.js';
import './analytics.js';
import './settings.js';
import './reports.js';
```

### Modify 47: Add Import Validation With ESLint Rules
**Description:** Add ESLint configuration to enforce proper module import patterns.
```javascript
// Currently allows any import pattern:
import { something } from '../../some/deep/path/module.js';
import * as all from 'library';
import defaultExport, { named1, named2 } from './module.js';
```

### Modify 48: Create a Testing Module With Mock Exports
**Description:** Create a module that exports mock implementations for testing purposes.
```javascript
export const api = {
  getProducts() { return Promise.resolve([{ id: 1, name: 'Test' }]); },
  getCart() { return Promise.resolve({ items: [], total: 0 }); }
};
```

### Modify 49: Refactor to Use `import()` for Code Splitting Routes
**Description:** Convert static imports of page components to dynamic imports for route-based code splitting.
```javascript
import HomePage from './pages/HomePage.js';
import CartPage from './pages/CartPage.js';
import CheckoutPage from './pages/CheckoutPage.js';
import AdminPage from './pages/AdminPage.js';
import SettingsPage from './pages/SettingsPage.js';
```

### Modify 50: Create a Module That Wraps localStorage With Versioning
**Description:** Create a storage module that adds versioning to localStorage data with proper exports.
```javascript
export function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function removeItem(key) {
  localStorage.removeItem(key);
}
