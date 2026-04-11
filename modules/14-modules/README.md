# Module 14: Modules

**Duration:** ~88 minutes  
**Video Timestamp:** 12:28:00 - 13:56:33

## Learning Objectives

- Understand JavaScript modules
- Use ES6 import/export syntax
- Organize code into separate files
- Configure module scripts in HTML
- Use barrel exports

## What are Modules?

Modules let you split code into separate files, making it:
- Easier to organize
- Easier to maintain
- Reusable across projects
- Encapsulated (private by default)

## ES6 Module Syntax

### Exporting

**Named exports:**
```javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

**Default export:**
```javascript
// logger.js
export default function log(message) {
  console.log(message);
}
```

**Multiple exports (alternative):**
```javascript
// utils.js
const API_URL = 'https://api.example.com';

function formatDate(date) {
  return date.toISOString();
}

export { API_URL, formatDate };
```

### Importing

**Import named exports:**
```javascript
import { PI, add, subtract } from './math.js';

console.log(PI);              // 3.14159
console.log(add(2, 3));      // 5
console.log(subtract(5, 2)); // 3
```

**Import default export:**
```javascript
import log from './logger.js';

log('Hello!');  // Hello!
```

**Import everything:**
```javascript
import * as Math from './math.js';

console.log(Math.PI);
console.log(Math.add(2, 3));
```

**Rename imports:**
```javascript
import { add as sum } from './math.js';

console.log(sum(2, 3));  // 5
```

**Combined imports:**
```javascript
import log, { PI } from './utils.js';

log(PI);
```

## Module Files

### project/
```
├── index.html
├── main.js
├── utils/
│   ├── index.js       (barrel export)
│   ├── math.js
│   ├── string.js
│   └── date.js
└── components/
    ├── Button.js
    └── Modal.js
```

### Example: utils/math.js

```javascript
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export default function subtract(a, b) {
  return a - b;
}
```

### Example: utils/string.js

```javascript
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str, length) {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export default function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}
```

### Example: utils/index.js (Barrel Export)

```javascript
export { PI } from './math.js';
export { add, multiply } from './math.js';
export { default as subtract } from './math.js';

export { capitalize, truncate } from './string.js';
export { default as formatCurrency } from './string.js';
```

### Using Modules in HTML

```html
<script type="module" src="main.js"></script>
```

**Important:** Modules are always deferred and run in strict mode.

## Organizing a Project

### Project Structure

```
src/
├── index.html
├── main.js
├── styles/
│   └── main.css
├── modules/
│   ├── cart/
│   │   ├── cart.js
│   │   ├── cart-items.js
│   │   └── cart-total.js
│   │   └── index.js
│   ├── products/
│   │   ├── products.js
│   │   ├── product-render.js
│   │   └── product-filter.js
│   │   └── index.js
│   └── utils/
│       ├── format.js
│       ├── storage.js
│       ├── validation.js
│       └── index.js
```

### Module Examples

**cart/index.js:**
```javascript
export { addToCart, removeFromCart, updateQuantity } from './cart.js';
export { renderCartItems } from './cart-items.js';
export { getCartTotal } from './cart-total.js';
```

**main.js:**
```javascript
import { addToCart } from './modules/cart/index.js';
import { products, filterProducts } from './modules/products/index.js';
import { formatCurrency, saveToStorage } from './modules/utils/index.js';

console.log(products);
```

## CommonJS vs ES Modules

### CommonJS (Node.js traditional)

```javascript
// Export
module.exports = { add, subtract };

// Import
const { add, subtract } = require('./math');
```

### ES Modules (Modern)

```javascript
// Export
export { add, subtract };
export default function multiply() {};

// Import
import { add, subtract } from './math.js';
import multiply from './math.js';
```

### Using Both

For Node.js projects, update `package.json`:
```json
{
  "type": "module"
}
```

## Dynamic Imports

Load modules on demand:

```javascript
// Instead of static import
import { heavyFunction } from './heavy.js';

// Use dynamic import when needed
async function loadHeavyModule() {
  const module = await import('./heavy.js');
  module.heavyFunction();
}

// Only load when user clicks
button.addEventListener('click', loadHeavyModule);
```

## Module Patterns

### Singleton Pattern

```javascript
// store.js
let instance = null;

export function getStore() {
  if (!instance) {
    instance = {
      state: {},
      setState(key, value) {
        this.state[key] = value;
      },
      getState(key) {
        return this.state[key];
      }
    };
  }
  return instance;
}

// Usage
import { getStore } from './store.js';
const store = getStore();
```

### Factory Pattern

```javascript
// createLogger.js
export function createLogger(prefix) {
  return {
    log: (msg) => console.log(`[${prefix}] ${msg}`),
    error: (msg) => console.error(`[${prefix}] ERROR: ${msg}`),
    warn: (msg) => console.warn(`[${prefix}] WARN: ${msg}`)
  };
}

// Usage
import { createLogger } from './createLogger.js';
const apiLogger = createLogger('API');
apiLogger.log('Request sent');
```

### Service Pattern

```javascript
// api.js
const BASE_URL = 'https://api.example.com';

export const apiService = {
  async get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return response.json();
  },
  
  async post(endpoint, data) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

// Usage
import { apiService } from './api.js';
const users = await apiService.get('/users');
```

## Module Dependencies

### Circular Dependencies

Be careful with circular dependencies:

```javascript
// a.js
import { b } from './b.js';
export const a = 'I am A';
console.log(b);  // Might be undefined!

// b.js
import { a } from './a.js';
export const b = 'I am B';
```

### Dependency Order

```javascript
// Dependencies are loaded top to bottom
import { config } from './config.js';     // Loaded first
import { api } from './api.js';           // Loaded second
import { app } from './app.js';           // Loaded third
```

## Best Practices

### 1. Single Responsibility
```javascript
// Good: Each module has one purpose
export { formatDate } from './date.js';
export { formatCurrency } from './currency.js';
```

### 2. Use Barrel Exports
```javascript
// modules/products/index.js
export * from './products.js';
export * from './product-render.js';
export * from './product-filter.js';
```

### 3. Avoid Deep Nesting
```javascript
// Bad
import { something } from '../../../utils/helpers.js';

// Good - use shorter, flat structure or barrel exports
```

### 4. Consistent Naming
```javascript
// Use consistent naming conventions
export { formatDate, parseDate } from './date.js';
export { formatCurrency, parseCurrency } from './currency.js';
```

## Practice Exercises

### Exercise 14.1: Create a Calculator Module

**calculator/calculator.js:**
```javascript
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }
export function divide(a, b) { return b !== 0 ? a / b : 'Error'; }
```

**calculator/index.js:**
```javascript
export { add, subtract, multiply, divide } from './calculator.js';
```

**main.js:**
```javascript
import { add, multiply } from './calculator/index.js';

console.log(add(5, 3));       // 8
console.log(multiply(4, 2));  // 8
```

### Exercise 14.2: Create an API Module

```javascript
// api/users.js
export async function getUsers() {
  return [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];
}

export async function getUser(id) {
  const users = await getUsers();
  return users.find(u => u.id === id);
}

// api/index.js
export * from './users.js';
```

### Exercise 14.3: Convert Project to Modules

Take the Amazon project and split it into modules:

```
src/
├── main.js
├── modules/
│   ├── cart/
│   │   ├── cart.js
│   │   ├── cart-render.js
│   │   └── index.js
│   ├── products/
│   │   ├── products.js
│   │   ├── product-render.js
│   │   └── index.js
│   └── utils/
│       ├── format.js
│       ├── storage.js
│       └── index.js
```

## Summary

- ES6 modules use `import` and `export` syntax
- Named exports for multiple values
- Default export for single main value
- Use `type="module"` in HTML script tags
- Barrel exports (`index.js`) simplify imports
- Modules are always in strict mode
- Use dynamic `import()` for on-demand loading

## Next Steps

Proceed to Module 15: External Libraries to learn how to use third-party code.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)
