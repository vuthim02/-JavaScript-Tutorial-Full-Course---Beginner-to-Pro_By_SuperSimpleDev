# Level 72: Default vs Named Exports and Import Paths

## Error Snippets (1-70)

### Error 1: Default Import Treated as Named Import
**Description:** Import a default export using named import syntax.
```javascript
// logger.js: export default function log(msg) { console.log(msg); }
import { log } from './logger.js';
log('Hello');
```

### Error 2: Named Export Imported With Default Syntax
**Description:** Import a named export `formatCurrency` using default import syntax.
```javascript
// utils.js: export const formatCurrency = (amt) => `$${amt.toFixed(2)}`;
import formatCurrency from './utils.js';
```

### Error 3: Missing Curly Braces for Multiple Named Imports
**Description:** Import two named exports without wrapping them in curly braces.
```javascript
import add, multiply from './math.js';
// math.js: export const add = (a,b) => a+b; export const multiply = (a,b) => a*b;
```

### Error 4: Default Import With Destructuring Instead of Named Imports
**Description:** Use destructuring syntax for a named import instead of curly braces.
```javascript
import { formatCurrency, formatDate } from './format.js';
```

### Error 5: Import Path With Extra Dot in Relative Path
**Description:** Import a file with an incorrect relative path containing an extra dot.
```javascript
import { config } from '././config.js';
```

### Error 6: Named Import of Non-Exported Variable
**Description:** Import `internalId` which is not exported from the target module.
```javascript
// user.js: const internalId = 42; export const name = 'Alice';
import { internalId } from './user.js';
```

### Error 7: Default Export Object Then Import Named Property Incorrectly
**Description:** Module exports an object as default, but importer tries named import.
```javascript
// settings.js: export default { theme: 'dark', lang: 'en' };
import { theme } from './settings.js';
```

### Error 8: Import Path With Missing Leading Dot
**Description:** Import a local module file without the `./` relative path prefix.
```javascript
import { validate } from 'validators.js';
```

### Error 9: Using `export default` With `var`
**Description:** Try to use `export default var` which is invalid syntax.
```javascript
export default var count = 0;
```

### Error 10: Two Modules With the Same Default Import Name Conflict
**Description:** Import two default exports and try to use the same name for both.
```javascript
import format from './formatCurrency.js';
import format from './formatDate.js';
```

### Error 11: Named Export of a Hoisted Variable Before Its Declaration
**Description:** Use a named import before the module's export declarations are evaluated.
```javascript
// ordering.js
export { processOrder };
const processOrder = (order) => { /* ... */ };
```

### Error 12: Re-export Default Without Renaming
**Description:** Try to re-export a default export using `export default from`.
```javascript
export default from './Button.js';
```

### Error 13: File Extension Mismatch Between Import and Actual File
**Description:** Import from `helper.js` but the actual file is `helper.mjs`.
```javascript
import { helper } from './helper.js';
```

### Error 14: Attempting to Default Export an Expression in a Variable Declaration
**Description:** Try to combine `const` declaration with `export default`.
```javascript
export default const PI = 3.14159;
```

### Error 15: Named Import Using `as` With Reserved Word
**Description:** Use a reserved word as the alias in a named import.
```javascript
import { default as format } from './format.js';
```

### Error 16: Importer Expects Class as Named Export but It's Default
**Description:** Import a class using named syntax when it's exported as default.
```javascript
// Cart.js: export default class Cart { /* ... */ }
import { Cart } from './Cart.js';
```

### Error 17: Module Imports Itself Via a Long Path
**Description:** A module accidentally imports itself using a different path alias.
```javascript
// src/services/service.js
import { something } from '../../src/services/service.js';
```

### Error 18: Using `export` With Object Literal Treated as Block
**Description:** Export an object literal but JavaScript interprets the braces as a block.
```javascript
export { key: 'value' };
```

### Error 19: Import From Path That Resolves to Directory Without Index
**Description:** Import from a directory that has no `index.js` file.
```javascript
import { helpers } from './helpers';
```

### Error 20: Default Export of Number Literal Not Assignable
**Description:** Trying to import a default-exported number as a function.
```javascript
// config.js: export default 42;
import config from './config.js';
config(); // Error: config is not a function
```

### Error 21: Named Export Confused With Object Method Shorthand
**Description:** Export an object method shorthand as if it's a named export.
```javascript
export {
  calculateTotal() { return 100; }
};
```

### Error 22: Dynamic Import With Incorrect Then Handler
**Description:** Use dynamic import but reference a non-existent named export improperly.
```javascript
import('./cart.js').then(module => {
  addItem('shirt');
});
```

### Error 23: Named Import With Spaces Around Dots in Path
**Description:** Import path has spaces around dots in the path segments.
```javascript
import { data } from './my . data . js';
```

### Error 24: Default Export Used as Object With Destructuring
**Description:** Import default export, then try to destructure properties that don't exist.
```javascript
import utils from './utils.js';
// utils.js: export default function parse(data) { /* ... */ }
const { format } = utils;
```

### Error 25: Named Export of a Constant Re-Assigned Later
**Description:** Export a `const` variable but then try to reassign it in the same module.
```javascript
export const maxRetries = 3;
maxRetries = 5;
```

### Error 26: Importing a Bare Specifier That Isn't in node_modules
**Description:** Import a package name that doesn't exist in `node_modules`.
```javascript
import { superCalc } from 'super-calc';
```

### Error 27: Module Path Uses URL Instead of File Path
**Description:** Use a full URL as the import specifier in a Node.js context.
```javascript
import { api } from 'https://cdn.example.com/api.js';
```

### Error 28: Incorrect Order of Default and Named in Import
**Description:** Place named imports before the default import in the import statement.
```javascript
import { namedExport }, defaultExport from './module.js';
```

### Error 29: Named Export of a Variable Declared With `let` but Not Initialized
**Description:** Export a `let` variable that is used before being assigned.
```javascript
export let config;
console.log(config); // undefined but perhaps should have a default
```

### Error 30: Re-export All With Name Conflict
**Description:** Re-export all from two modules that export the same name.
```javascript
export * from './validators.js';
export * from './formatters.js';
// Both export a function named "format"
```

### Error 31: Using `import` as a Function Call in Non-Module Context
**Description:** Try to use `import()` syntax in a regular non-module script.
```javascript
// In a regular <script> tag
import('./module.js').then(m => m.init());
```

### Error 32: Module Uses `require` Inside ES Module
**Description:** Mix `require()` calls inside an ES module file.
```javascript
import { readFile } from 'fs';
const config = require('./config.json');
```

### Error 33: Named Import Alias With Hyphen
**Description:** Use a hyphen in an import alias name, which is invalid.
```javascript
import { formatCurrency as format-currency } from './utils.js';
```

### Error 34: Export Statement With Semicolons Between Braces
**Description:** Put semicolons between named exports inside the braces.
```javascript
const a = 1;
const b = 2;
const c = 3;
export { a; b; c; };
```

### Error 35: Default Export of Anonymous Arrow Assigned to Const
**Description:** Use `export default const` with an arrow function.
```javascript
export default const fetchData = async (url) => {
  const res = await fetch(url);
  return res.json();
};
```

### Error 36: Named Import of a Variable Renamed on Export With Wrong Original
**Description:** Use the original variable name instead of the export alias.
```javascript
// data.js: const x = 10; export { x as value };
import { x } from './data.js';
```

### Error 37: Importing a Module That Has Syntax Error
**Description:** Import a module that contains a syntax error, which fails at parse time.
```javascript
// broken.js: export const data = { name: "Alice", age: 30, }
import { data } from './broken.js';
```

### Error 38: Circular Dependency Between Three Modules
**Description:** Three modules import each other forming a cycle: A→B→C→A.
```javascript
// a.js: import { b } from './b.js';
// b.js: import { c } from './c.js';
// c.js: import { a } from './a.js';
```

### Error 39: Named Export Using `exports` Instead of `export`
**Description:** Use CommonJS `exports` syntax inside an ES module.
```javascript
exports.calculateTax = (amount) => amount * 0.08;
exports.formatPrice = (amount) => `$${amount.toFixed(2)}`;
```

### Error 40: Import From Path With Dot-File (Hidden) Directory
**Description:** Import from a path containing a hidden directory.
```javascript
import { helper } from './.internal/helper.js';
```

### Error 41: Default Import of Named Export Using Incorrect Alias
**Description:** Import a named export `calculate` as if it's the default, giving it an alias.
```javascript
import calc from './math.js';
// math.js: export const calculate = (a,b) => a + b;
```

### Error 42: Missing Closing Brace in Import Statement
**Description:** Import statement with a missing closing curly brace.
```javascript
import { add, subtract, multiply from './math.js';
```

### Error 43: Static Import Inside a Try-Catch Block
**Description:** Place a static import inside a try-catch block, which is not allowed.
```javascript
try {
  import { optional } from './optional.js';
} catch (e) {
  console.log('Module not available');
}
```

### Error 44: Named Import of `default` Without Alias
**Description:** Try to import the `default` export as a named export named `default`.
```javascript
import { default } from './module.js';
```

### Error 45: Module Path Uses Mixed Forward and Backward Slashes
**Description:** Import path with mixed slash styles on a Unix system.
```javascript
import { helper } from './utils\\helper.js';
```

### Error 46: Two Default Imports in One Statement
**Description:** Try to import default exports from two different modules in one statement.
```javascript
import Cart from './Cart.js', format from './format.js';
```

### Error 47: Named Export With Computed Property Name
**Description:** Try to export a computed property name.
```javascript
const key = 'dynamicName';
export { [key]: value };
```

### Error 48: Import of Module That Throws at Top Level
**Description:** Import a module that throws an error at the top level during evaluation.
```javascript
// fail.js: throw new Error('Init failed');
import { something } from './fail.js';
```

### Error 49: Using `export default` Twice in the Same Module
**Description:** Two default exports in the same module (different approach than earlier).
```javascript
export default 42;
export default class Handler { /* ... */ }
```

### Error 50: Named Import With Incorrect Destructuring-Like Rename
**Description:** Use `:` instead of `as` for renaming an import.
```javascript
import { formatCurrency: fc } from './utils.js';
```

### Error 51: Module Script Uses `window` Without Checking
**Description:** Use `window` object in a module that might run in a worker.
```javascript
export function getAppName() {
  return window.APP_NAME;
}
```

### Error 52: Re-export From Module With Incorrect Specifier
**Description:** Re-export from a module but typo the re-exported name.
```javascript
export { calculateTotal as calculateTotl } from './cart.js';
// Importer does: import { calculateTotl } from './index.js';
```

### Error 53: Exporting a Getter/Setter Using Invalid Syntax
**Description:** Try to export a getter or setter directly.
```javascript
export get fullName() { return `${this.first} ${this.last}`; }
```

### Error 54: Static Import After Dynamic Import Confusion
**Description:** Use static import syntax where dynamic import is needed.
```javascript
const moduleName = './' + type + '.js';
import { handler } from moduleName;
```

### Error 55: Named Import From Module With No Exports
**Description:** Import a named export from a module that exports nothing.
```javascript
// empty.js: (no exports)
import { something } from './empty.js';
```

### Error 56: Using `import.meta` in a String Interpolation Incorrectly
**Description:** Try to use `import.meta` inside a template string incorrectly.
```javascript
const url = `base/${import.meta.url}/assets`;
```

### Error 57: Exporting a Class After Using It in the Same Module
**Description:** Use a class in the module before its export declaration.
```javascript
const cart = new ShoppingCart();
export class ShoppingCart { /* ... */ }
```

### Error 58: Missing Comma Between Two Import Statements on Same Line
**Description:** Put two import statements on one line without a semicolon or newline.
```javascript
import { a } from './a.js' import { b } from './b.js';
```

### Error 59: Import Path Points to a Symlink That Breaks
**Description:** Import from a path that is a broken symbolic link.
```javascript
import { config } from './configs/current-config.js';
// current-config.js is a broken symlink
```

### Error 60: Named Export of a Variable That Shadows Imported Name
**Description:** Export a variable that has the same name as an imported binding.
```javascript
import { format } from './format.js';
export function format(data) { return JSON.stringify(data); }
```

### Error 61: Using `delete` on an Imported Binding
**Description:** Try to delete an imported binding.
```javascript
import { cache } from './cache.js';
delete cache;
```

### Error 62: Dynamic Import With Variable That's Not a String
**Description:** Pass a non-string value to `import()`.
```javascript
const mod = import(42);
```

### Error 63: Export Statement With Empty Named Export List
**Description:** Write an empty export statement.
```javascript
export { };
```

### Error 64: Import Path With Trailing Slash
**Description:** Import from a path ending with a trailing slash.
```javascript
import { utils } from './utils/';
```

### Error 65: Module That Mutates an Imported Array
**Description:** Import an array and mutate it with array methods affecting source module.
```javascript
import { items } from './store.js';
items.push('new-item'); // Mutates source module's array
```

### Error 66: Named Import of `then` Property Causes Promise-Like Behavior
**Description:** Import an object that has a `then` property, making it thenable.
```javascript
import { then } from './config.js';
// config.js: export const then = 'value';
```

### Error 67: Using `export default` With an IIFE
**Description:** Try to export the result of an IIFE as default.
```javascript
export default (function() {
  return { name: 'module' };
})();
```

### Error 68: Import Path With URL Fragment Identifier
**Description:** Append a fragment identifier to the module specifier.
```javascript
import { data } from './data.js#section';
```

### Error 69: Named Export of Destructured Parameter Pattern
**Description:** Try to export a destructured parameter pattern directly.
```javascript
export const { name, age } = user;
```

### Error 70: Importing a Module That Depends on a Missing Transpilation
**Description:** Import a modern JS module that uses features not supported without transpilation.
```javascript
// modern.js: export const data = { name: 'test' };
import { data } from './modern.js';
```

## Issue Snippets (1-30)

### Issue 1: Mixing Default and Named Exports Unnecessarily
**Description:** A module has one default export and twenty named exports, confusing consumers.
```javascript
export default class OrderProcessor { /* ... */ }
export const STATUS_PENDING = 'pending';
export const STATUS_CONFIRMED = 'confirmed';
export const STATUS_SHIPPED = 'shipped';
export const STATUS_DELIVERED = 'delivered';
export const STATUS_CANCELLED = 'cancelled';
export function validateOrder(order) { /* ... */ }
export function calculateSubtotal(items) { /* ... */ }
export function calculateTax(subtotal) { /* ... */ }
export function calculateShipping(items) { /* ... */ }
export function calculateTotal(items) { /* ... */ }
export function sendConfirmation(order) { /* ... */ }
export function generateInvoice(order) { /* ... */ }
```

### Issue 2: Importing Everything When Only Default Is Needed
**Description:** Use `* as` import when only the default export is needed.
```javascript
import * as cart from './cart.js';
// cart.js has only: export default class Cart { ... }
const myCart = new cart.default();
```

### Issue 3: Default Import With Arbitrary Name
**Description:** Different files import the same default export with wildly different names.
```javascript
// File 1:
import cartManager from './cart.js';
// File 2:
import shoppingCart from './cart.js';
// File 3:
import cartModule from './cart.js';
// File 4:
import CartService from './cart.js';
```

### Issue 4: Deeply Nested Relative Imports
**Description:** Long relative import paths that are fragile to restructuring.
```javascript
import { User } from '../../../../models/user.js';
import { Order } from '../../../../models/order.js';
import { Product } from '../../../../models/product.js';
import { Cart } from '../../../../models/cart.js';
import { Payment } from '../../../../models/payment.js';
```

### Issue 5: Module Has Both `export default` and `module.exports`
**Description:** Mix ES6 `export default` with CommonJS `module.exports` in the same file.
```javascript
export default function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}
module.exports = { formatPrice };
```

### Issue 6: Unnecessary Use of `export default` for Named Constants
**Description:** Using `export default` for a configuration object when named exports would be clearer.
```javascript
export default {
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000,
  RETRY_COUNT: 3,
  CACHE_TTL: 3600,
  MAX_ITEMS: 100
};
```

### Issue 7: Import Order Inconsistency
**Description:** Imports are not grouped or ordered consistently across files.
```javascript
import { calculateTotal } from './cart.js';
import { Component } from 'react';
import './styles.css';
import { formatCurrency } from './utils.js';
import dayjs from 'dayjs';
```

### Issue 8: Re-Exporting With Different Names Causing Confusion
**Description:** Module re-exports with aliases that differ from original names, making tracing difficult.
```javascript
export { calculateTotal as totalPrice } from './cart.js';
export { formatCurrency as formatPrice } from './utils.js';
export { validateEmail as checkEmail } from './validators.js';
export { sendConfirmation as sendEmail } from './email.js';
```

### Issue 9: Module Imported but Never Used
**Description:** An import statement exists for a module whose exports are never used.
```javascript
import { formatDate } from './date-utils.js';
import { calculateTotal, calculateTax } from './pricing.js';
export function processOrder(order) {
  return calculateTotal(order.items);
}
```

### Issue 10: Single Module With Multiple Responsibilities Exported
**Description:** A single module handles user auth, product catalog, and order processing.
```javascript
export function login(email, password) { /* ... */ }
export function logout() { /* ... */ }
export function fetchProducts() { /* ... */ }
export function searchProducts(query) { /* ... */ }
export function createOrder(items) { /* ... */ }
export function cancelOrder(id) { /* ... */ }
export function trackOrder(id) { /* ... */ }
export function getOrderHistory(userId) { /* ... */ }
```

### Issue 11: Default Export of Functions Losing Named Debugging
**Description:** Exporting anonymous functions as default makes stack traces unhelpful.
```javascript
export default function(items) {
  return items.reduce((s, i) => s + i.price, 0);
}
```

### Issue 12: Inline Named Exports With Inconsistent Style
**Description:** Some exports inline, some at bottom, making exports hard to find.
```javascript
export const TAX_RATE = 0.08;
export function calculateTotal(items) { return items.reduce((s, i) => s + i.price, 0); }
const shippingCost = 5.99;
const freeShippingMin = 50;
export { shippingCost, freeShippingMin };
```

### Issue 13: Module That Reaches Into Sibling Module's Internals
**Description:** Instead of importing the public API, the module accesses another module's internal file directly.
```javascript
import { processInternal } from '../checkout/internal/process.js';
import { validateInternal } from '../checkout/internal/validate.js';
import { formatInternal } from '../checkout/internal/format.js';
```

### Issue 14: All Imports Use Absolute Paths From Project Root
**Description:** Using absolute path imports that break when the project is mounted in a subdirectory.
```javascript
import { User } from '/src/models/user.js';
import { Cart } from '/src/models/cart.js';
import { Order } from '/src/models/order.js';
```

### Issue 15: Exporting Mutable Objects via Default Export
**Description:** Default exporting a mutable object that is then modified by consumers.
```javascript
export default {
  items: [],
  add(item) { this.items.push(item); },
  clear() { this.items.length = 0; }
};
```

### Issue 16: Module With Only One Export Uses Named Instead of Default
**Description:** A module exporting only a single class uses named export unnecessarily.
```javascript
export class Logger {
  info(msg) { console.log('[INFO]', msg); }
  warn(msg) { console.warn('[WARN]', msg); }
  error(msg) { console.error('[ERROR]', msg); }
}
```

### Issue 17: Barrel File Creates Ambiguity With Default Exports
**Description:** A barrel file re-exports default exports without proper naming.
```javascript
export { default as default } from './Button.js';
export { default as default } from './Input.js';
export { default as default } from './Select.js';
```

### Issue 18: Import Path With Upper Case Drive Letter (Windows)
**Description:** Import path has inconsistent drive letter case across imports.
```javascript
import { data } from 'C:/project/src/data.js';
import { config } from 'c:/project/src/config.js';
```

### Issue 19: No Clear Separation Between Internal and Public Exports
**Description:** Both internal helper functions and public API functions are exported together.
```javascript
export function parseResponse(response) { /* internal - used by fetchData */ }
export function transformPayload(data) { /* internal - used by sendData */ }
export function fetchData(url) { /* public API */ }
export function sendData(url, data) { /* public API */ }
export function validateResponse(response) { /* internal */ }
```

### Issue 20: Module Imports Everything From a Large Library
**Description:** Importing an entire UI library when only a few components are used.
```javascript
import { Button, Card, Grid, Modal, Toast, Tooltip, Dropdown, Badge, Tabs, Accordion } from 'ui-library';
```

### Issue 21: Using Same Import Name for Different Things in Different Files
**Description:** `format` refers to currency formatting in one file and date formatting in another.
```javascript
// In cart.js: import { formatCurrency as format } from './utils.js';
// In orders.js: import { formatDate as format } from './utils.js';
```

### Issue 22: Module Group Exports by Type Rather Than Feature
**Description:** Grouping all exports by type (all classes, all functions, all constants) instead of by feature.
```javascript
// Classes
export class Cart { /* ... */ }
export class Product { /* ... */ }
export class Order { /* ... */ }
// Functions
export function validateCart(cart) { /* ... */ }
export function calculateTotal(items) { /* ... */ }
// Constants
export const TAX_RATE = 0.08;
export const FREE_SHIPPING_MIN = 50;
```

### Issue 23: Missing Newline Between Import Groups
**Description:** All imports are clumped together without blank-line separation.
```javascript
import { Cart } from './cart.js';
import dayjs from 'dayjs';
import './styles.css';
import { api } from './api.js';
import { formatCurrency } from './utils.js';
import relativeTime from 'dayjs/plugin/relativeTime';
```

### Issue 24: Exported Names That Are Too Generic
**Description:** Export names like `getData`, `process`, `handle`, `doStuff` that clash with other modules.
```javascript
export function getData() { return fetch('/api/data').then(r => r.json()); }
export function process(data) { return data.map(format); }
export function handle(event) { event.preventDefault(); doStuff(); }
export function doStuff() { /* ... */ }
```

### Issue 25: Using `export default` for Multiple Single-Export Modules Inconsistently
**Description:** Some single-export modules use `export default` while others use `export const`.
```javascript
// cart.js: export default class Cart { ... }
// product.js: export class Product { ... }
// order.js: export default class Order { ... }
// payment.js: export class Payment { ... }
```

### Issue 26: Dynamic Import Without Caching the Module
**Description:** Re-importing the same module dynamically multiple times without caching.
```javascript
async function showModal() {
  const modal = await import('./modal.js');
  modal.open();
}
async function hideModal() {
  const modal = await import('./modal.js');
  modal.close();
}
async function updateModal() {
  const modal = await import('./modal.js');
  modal.update();
}
```

### Issue 27: Importing From Both `src` and `dist` Directories
**Description:** Some imports point to source files while others point to built distribution files.
```javascript
import { Cart } from './src/cart/Cart.js';
import { format } from './dist/utils/format.js';
import { api } from './src/services/api.js';
```

### Issue 28: Module Uses Global `this` to Store State
**Description:** Using `this` at module scope to store shared state between functions.
```javascript
this.cache = new Map();
export function getCached(key) {
  return this.cache.get(key);
}
export function setCached(key, value) {
  this.cache.set(key, value);
}
```

### Issue 29: Named Export Names Conflict With Built-In Globals
**Description:** Exporting names like `name`, `status`, `location` that shadow global APIs.
```javascript
export const name = 'Shopping Cart App';
export const status = 'active';
export const location = 'checkout';
export const find = (items, id) => items.find(i => i.id === id);
export const fetch = (url) => globalThis.fetch(url);
```

### Issue 30: Re-exporting Everything With No Namespace
**Description:** Barrel file that re-exports everything from all modules without using namespaces.
```javascript
export * from './cart.js';
export * from './product.js';
export * from './order.js';
export * from './payment.js';
export * from './shipping.js';
export * from './user.js';
export * from './auth.js';
```

## Modification Snippets (1-50)

### Modify 1: Convert Named Exports to Default Export
**Description:** The module has multiple named exports but should export a single class as default.
```javascript
export class CartManager {
  constructor() { this.items = []; }
  add(item) { this.items.push(item); }
  remove(id) { this.items = this.items.filter(i => i.id !== id); }
  getTotal() { return this.items.reduce((s, i) => s + i.price, 0); }
}
export const TAX_RATE = 0.08;
export const SHIPPING_COST = 5.99;
```

### Modify 2: Add Missing `.js` Extensions to Imports
**Description:** Add the missing `.js` extension to all import paths in the file.
```javascript
import { Cart } from './cart';
import { Product } from './product';
import { User } from './user';
import { formatCurrency } from './utils/formatCurrency';
import { api } from './services/api';
```

### Modify 3: Convert Default Import to Named Import
**Description:** Change a default import to use named import syntax for better tree-shaking.
```javascript
import utils from './utils.js';
const total = utils.calculateTotal(items);
const formatted = utils.formatCurrency(total);
```

### Modify 4: Create a Barrel File With Clear Names
**Description:** Create a barrel file that re-exports modules with distinct names.
```javascript
// Currently re-exporting creates ambiguity
export { default } from './Button.js';
export { default } from './Input.js';
export { default } from './Select.js';
```

### Modify 5: Add Proper Aliases for Renamed Exports
**Description:** A module renamed some exports but consumers still use old names.
```javascript
// Before rename:
export function calculateTotal(items) { /* ... */ }
export function formatPrice(amount) { /* ... */ }
// After rename:
export function computeTotal(items) { /* ... */ }
export function formatCurrency(amount) { /* ... */ }
```

### Modify 6: Break Large Module Into Feature Modules
**Description:** Split a large module that mixes authentication, cart, and payments.
```javascript
export function login(email, pass) { /* ... */ }
export function logout() { /* ... */ }
export function addToCart(item) { /* ... */ }
export function removeFromCart(id) { /* ... */ }
export function processPayment(card) { /* ... */ }
export function validateCard(card) { /* ... */ }
```

### Modify 7: Convert Module From CommonJS to ES6
**Description:** Convert a CommonJS module to use ES6 import/export.
```javascript
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

function loadConfig() {
  return JSON.parse(readFileSync(path.join(__dirname, 'config.json')));
}

function saveConfig(config) {
  writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(config));
}

module.exports = { loadConfig, saveConfig };
```

### Modify 8: Add Default Export to a Named-Export Only Module
**Description:** Add a default export for the primary class in a module with many named exports.
```javascript
export const API_URL = 'https://api.example.com';
export const TIMEOUT = 5000;
export function fetchProducts() { /* ... */ }
export function fetchProduct(id) { /* ... */ }
export function createProduct(data) { /* ... */ }
```

### Modify 9: Fix Import Paths After Restructuring
**Description:** Update import paths after moving files from a flat structure to a folder structure.
```javascript
// Old flat structure:
import { Cart } from './Cart.js';
import { Product } from './Product.js';
import { Order } from './Order.js';
// New folder structure:
// ./models/Cart.js, ./models/Product.js, ./models/Order.js
```

### Modify 10: Remove Unused Imports
**Description:** Remove import statements for modules whose exports are never used.
```javascript
import { calculateTotal } from './cart.js';
import { formatCurrency } from './utils.js';
import { validateEmail } from './validators.js';
import { sendEmail } from './email.js';
import { logError } from './logger.js';

export function checkout(cart) {
  return calculateTotal(cart.items);
}
```

### Modify 11: Convert to Dynamic Import for Conditional Module
**Description:** Change a static import to dynamic import for a module only used in one code path.
```javascript
import { AdminDashboard } from './admin.js';
export function renderPage(pageName) {
  if (pageName === 'admin') {
    AdminDashboard.init();
  }
}
```

### Modify 12: Create Directory Index Files for Cleaner Imports
**Description:** Create `index.js` files so directories can be imported without specifying the exact file.
```javascript
// Currently:
import { formatCurrency } from './utils/formatCurrency.js';
import { formatDate } from './utils/formatDate.js';
import { capitalize } from './utils/capitalize.js';
import { pluralize } from './utils/pluralize.js';
```

### Modify 13: Standardize Import Ordering
**Description:** Reorder imports to follow convention: third-party, then own modules, then styles.
```javascript
import dayjs from 'dayjs';
import { Cart } from './cart.js';
import { formatCurrency } from './utils.js';
import { api } from './api.js';
import './styles.css';
```

### Modify 14: Rename Imports for Clarity
**Description:** Give more descriptive names to imports that are ambiguous.
```javascript
import { format } from './formatCurrency.js';
import { format } from './formatDate.js';
```

### Modify 15: Convert Object Namespace to Named Exports
**Description:** Change a default-exported object with methods to individual named exports.
```javascript
export default {
  validateEmail(email) { return email.includes('@'); },
  validatePhone(phone) { return phone.length === 10; },
  validateZip(zip) { return zip.length === 5; },
  validateCard(card) { return card.length === 16; }
};
```

### Modify 16: Add Error Handling to Dynamic Import
**Description:** Add catch handler to a dynamic import that currently has no error handling.
```javascript
async function loadPaymentWidget() {
  const widget = await import('./payment-widget.js');
  widget.render('#payment');
}
```

### Modify 17: Create Re-Export Module for Public API
**Description:** Create a public API module that selectively re-exports only intended exports.
```javascript
// Internal modules export many things:
// cart.js exports: addItem, removeItem, getTotal, items, TAX_RATE, internalHelper, formatLineItem
// Public API should only expose: addItem, removeItem, getTotal
```

### Modify 18: Convert Default Export Function to Named
**Description:** Change an anonymous default export function to a named export for better debugging.
```javascript
export default function(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### Modify 19: Add Module-Level Config With Named Constants
**Description:** Extract magic numbers and strings into named exported constants.
```javascript
export function calculateShipping(total) {
  if (total > 50) return 0;
  if (total > 25) return 4.99;
  return 9.99;
}
```

### Modify 20: Consolidate Duplicate Imports
**Description:** Merge imports from the same module that are split across multiple lines.
```javascript
import { calculateTotal } from './cart.js';
import { TAX_RATE, FREE_SHIPPING } from './cart.js';
import { calculateTax } from './cart.js';
```

### Modify 21: Create a Services Index Module
**Description:** Create an index file that aggregates all service modules into one import.
```javascript
// Currently:
import { CartService } from './services/CartService.js';
import { OrderService } from './services/OrderService.js';
import { PaymentService } from './services/PaymentService.js';
import { ShippingService } from './services/ShippingService.js';
import { UserService } from './services/UserService.js';
```

### Modify 22: Add `type="module"` to Script Tag
**Description:** Add the missing `type="module"` attribute to the HTML script tag.
```javascript
<!DOCTYPE html>
<html>
<head>
  <title>Store</title>
  <script src="js/app.js"></script>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

### Modify 23: Convert Module to Use `export` at Bottom
**Description:** Move all inline exports to a single export statement at the bottom of the file.
```javascript
export const TAX_RATE = 0.08;
export function calculateTax(amount) { return amount * TAX_RATE; }
export class Cart { /* ... */ }
```

### Modify 24: Separate Public API From Internal Functions
**Description:** Only export functions that should be part of the public API; keep helpers private.
```javascript
export function processOrder(order) {
  validateOrder(order);
  calculateTotals(order);
  const result = submitOrder(order);
  return formatResponse(result);
}
function validateOrder(order) { /* internal */ }
function calculateTotals(order) { /* internal */ }
function submitOrder(order) { /* internal */ }
function formatResponse(result) { /* internal */ }
```

### Modify 25: Create a Re-exports File for Third-Party Libraries
**Description:** Create a module that imports and re-exports third-party libraries to centralize dependencies.
```javascript
// Currently imported directly in many files:
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
```

### Modify 26: Add Module Documentation Comments
**Description:** Add JSDoc comments to document the module exports.
```javascript
export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### Modify 27: Fix Default Export of Class With Static Methods
**Description:** A class with static methods should also export those statics for tree-shaking.
```javascript
export default class Validator {
  static isValidEmail(email) { return email.includes('@'); }
  static isValidPhone(phone) { return phone.length === 10; }
  validate(input) { /* instance method */ }
}
```

### Modify 28: Normalize Import Path Slashes
**Description:** Convert all Windows-style backslashes in imports to forward slashes.
```javascript
import { models } from '.\\models\\index.js';
import { services } from '.\\services\\index.js';
import { utils } from '.\\utils\\index.js';
```

### Modify 29: Add Named Export for Default-Only Module
**Description:** Add a named export alongside the existing default export for convenience.
```javascript
export default class Cart {
  constructor() { this.items = []; }
  add(item) { this.items.push(item); }
}
```

### Modify 30: Create an Init Module for Module Initialization Order
**Description:** Create an initialization module that imports and initializes other modules in order.
```javascript
import { initAuth } from './auth.js';
import { initCart } from './cart.js';
import { initUI } from './ui.js';
```

### Modify 31: Convert Relative Paths to Absolute Aliases
**Description:** Configure import aliases so deep relative paths become clean absolute-like paths.
```javascript
import { User } from '../../models/user.js';
import { Cart } from '../../models/cart.js';
import { Order } from '../../../services/order.js';
```

### Modify 32: Split Utility Module Into Domain-Specific Modules
**Description:** Break a generic utility module into modules grouped by domain (date, string, math).
```javascript
export function formatDate(date) { /* ... */ }
export function parseDate(str) { /* ... */ }
export function isWeekend(date) { /* ... */ }
export function capitalize(str) { /* ... */ }
export function pluralize(str) { /* ... */ }
export function clamp(num, min, max) { /* ... */ }
export function roundTo(num, decimals) { /* ... */ }
export function randomBetween(min, max) { /* ... */ }
```

### Modify 33: Add `export` to Functions That Are Missing It
**Description:** Functions defined in a module file are not exported but used by other modules.
```javascript
function calculateTotal(items) { return items.reduce((s, i) => s + i.price, 0); }
function calculateTax(total) { return total * 0.08; }
function formatPrice(amount) { return `$${amount.toFixed(2)}`; }
function validateCart(cart) { return cart.items.length > 0; }
```

### Modify 34: Refactor to Use Re-Export Aliases for Clarity
**Description:** Re-export with clearer names when the original export names are vague.
```javascript
export { calculateTotal as computeCartTotal } from './cart.js';
export { process } as processCheckout from './checkout.js';
```

### Modify 35: Create a Module That Combines Multiple Feature Modules
**Description:** Create a composite module that aggregates related feature modules.
```javascript
// Currently three separate modules for checkout flow:
// cart.js, checkout.js, confirmation.js
```

### Modify 36: Convert `import *` to Specific Named Imports
**Description:** Replace wildcard imports with specific named imports for clarity and tree-shaking.
```javascript
import * as cart from './cart.js';
const total = cart.calculateTotal(cart.items);
const formatted = cart.formatCurrency(total);
```

### Modify 37: Add Platform-Aware Import Paths
**Description:** Make import paths work across different platforms (Node, browser, etc.).
```javascript
import { config } from './config.js';
```

### Modify 38: Create a Module That Exports Factory Functions
**Description:** Replace class exports with factory function exports for simpler module API.
```javascript
export class CartService {
  constructor(api) { this.api = api; }
  async fetch() { return this.api.get('/cart'); }
  async add(item) { return this.api.post('/cart/items', item); }
  async remove(id) { return this.api.delete(`/cart/items/${id}`); }
}
```

### Modify 39: Reorganize Module to Group Related Exports
**Description:** Group related exports together and separate by feature domain.
```javascript
export function validateEmail(email) { /* ... */ }
export function validatePhone(phone) { /* ... */ }
export function validateZip(zip) { /* ... */ }
export function formatCurrency(amount) { /* ... */ }
export function formatDate(date) { /* ... */ }
export function formatNumber(num) { /* ... */ }
export function calculateTax(amount) { /* ... */ }
export function calculateShipping(total) { /* ... */ }
export function calculateDiscount(amount, percent) { /* ... */ }
```

### Modify 40: Add Dynamic Import for Heavy Visualization Library
**Description:** Make the chart rendering module load lazily.
```javascript
import { renderChart } from './charts.js';
export function showSalesChart(data) {
  renderChart(data);
}
```

### Modify 41: Fix Module That Exports Both `default` and `module.exports`
**Description:** Convert a file that uses both ES6 and CommonJS export patterns.
```javascript
export default class Product { /* ... */ }
module.exports = { Product };
```

### Modify 42: Create Path Aliases Configuration
**Description:** Configure path aliases in the project to avoid deep relative imports.
```javascript
import { User } from '../../models/user.js';
import { Cart } from '../../models/cart.js';
import { Order } from '../../models/order.js';
import { Product } from '../../models/product.js';
```

### Modify 43: Add Proper Extension to All Import Specifiers
**Description:** Ensure all import specifiers have the correct file extension.
```javascript
import { Cart } from './models/Cart';  // missing .js
import { Product } from './models/Product.js';
import { Order } from './models/Order.mjs';  // wrong extension
```

### Modify 44: Move Side Effects to an Init Function
**Description:** Refactor a module that executes side effects at import time.
```javascript
export const api = createApi();
export function fetchProducts() { return api.get('/products'); }
export function fetchProduct(id) { return api.get(`/products/${id}`); }

function createApi() {
  const baseUrl = localStorage.getItem('api_url') || '/api';
  console.log('API initialized with:', baseUrl);
  return {
    get(path) { return fetch(`${baseUrl}${path}`).then(r => r.json()); }
  };
}
```

### Modify 45: Create a Utils Barrel With Selective Re-Exports
**Description:** Create a barrel file that re-exports only specific functions from utility modules.
```javascript
export { formatDate, parseDate } from './utils/date.js';
export { capitalize, pluralize } from './utils/string.js';
export { clamp, roundTo } from './utils/math.js';
```

### Modify 46: Add Versioned Module Loading
**Description:** Add cache-busting version query parameters to dynamic module imports.
```javascript
async function loadModule(name) {
  return import(`./modules/${name}.js`);
}
```

### Modify 47: Create a Dependency Injection Module
**Description:** Create a simple DI container module to decouple module creation from usage.
```javascript
import { CartService } from './services/CartService.js';
import { OrderService } from './services/OrderService.js';
import { PaymentService } from './services/PaymentService.js';

const cartService = new CartService(api);
const orderService = new OrderService(api);
const paymentService = new PaymentService(api);
```

### Modify 48: Add Named Export Aliases for Backward Compatibility
**Description:** After renaming a function, provide the old name as an alias export.
```javascript
export function calculateCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
// Old name was calculateTotal
```

### Modify 49: Convert Script Tags to Module Scripts
**Description:** Update HTML script tags from regular scripts to module scripts.
```javascript
<script src="js/app.js"></script>
<script src="js/cart.js"></script>
<script src="js/checkout.js"></script>
```

### Modify 50: Create a Module That Manages Its Own State
**Description:** Convert a stateless utility module into a stateful module with private state.
```javascript
export function getItem(key) { /* ... */ }
export function setItem(key, value) { /* ... */ }
export function removeItem(key) { /* ... */ }
export function clear() { /* ... */ }
export function getAll() { /* ... */ }
```
