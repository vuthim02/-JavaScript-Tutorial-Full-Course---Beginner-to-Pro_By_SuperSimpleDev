# Debugging Challenge - Level 48
## Module 10: File Organization, CSS with JavaScript

---

### Error 1: Script loaded before external CSS
**Description:** Load script and CSS in correct order
```javascript
// In HTML:
// <script src="app.js"></script>
// <link rel="stylesheet" href="styles.css">
```

### Error 2: Missing defer on script that accesses DOM
**Description:** Initialize app in head script
```javascript
// <head>
//   <script src="app.js"></script>
// </head>
// app.js: document.querySelector('#app').textContent = 'Hello';
```

### Error 3: Module script without type="module"
**Description:** Import a module
```javascript
<script src="utils.js"></script>
// utils.js: export function formatDate() {}
```

### Error 4: External CSS loaded after inline style override
**Description:** Link CSS after style tag
```javascript
<style>.box { color: red; }</style>
<link rel="stylesheet" href="styles.css">
// styles.css: .box { color: blue; }
```

### Error 5: Import path without proper extension
**Description:** Import a JS module
```javascript
import { helper } from './utils';
```

### Error 6: Dynamic import without await
**Description:** Lazy load a module
```javascript
function loadModule() {
  import('./lazy.js').then(m => m.run());
}
```

### Error 7: Missing script tag for external library
**Description:** Use a library without loading it
```javascript
// Use lodash without script tag
const result = _.chunk([1, 2, 3, 4], 2);
```

### Error 8: Script order dependency
**Description:** Script A depends on Script B but loads first
```javascript
// <script src="app.js"></script>
// <script src="utils.js"></script>
// app.js: const result = utils.helper();
```

### Error 9: IIFE wrapping prevents module exports
**Description:** Wrap code in IIFE then try to export
```javascript
(function() {
  export function helper() {}
})();
```

### Error 10: Missing type="module" for import syntax
**Description:** Use import without module type
```javascript
// <script src="main.js"></script>
// main.js: import { data } from './data.js';
```

### Error 11: Async script with DOM manipulation
**Description:** Load script asynchronously that accesses DOM
```javascript
// <script async src="app.js"></script>
// app.js: document.querySelector('h1').textContent = 'Title';
```

### Error 12: CSS @import in external stylesheet
**Description:** Use @import in CSS file
```css
@import url('reset.css');
body { margin: 0; }
```

### Error 13: Inline script before external CSS
**Description:** Script runs before CSS loads
```javascript
// <head>
//   <script>document.querySelector('h1').style.color = 'red';</script>
//   <link rel="stylesheet" href="styles.css">
// </head>
```

### Error 14: Multiple script tags with same src
**Description:** Load the same script twice
```javascript
// <script src="bundle.js"></script>
// <script src="bundle.js"></script>
```

### Error 15: Fallback script not loading
**Description:** Load polyfill with fallback
```javascript
// <script src="modern.js"></script>
// <script>if (!window.feature) loadFallback();</script>
```

### Error 16: Server-side rendering mismatch
**Description:** Hydrate a server-rendered element
```javascript
const root = document.querySelector('#root');
root.innerHTML = '<h1>Client content</h1>';
```

### Error 17: CSS loaded after DOMContentLoaded
**Description:** Dynamically load CSS late
```javascript
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'styles.css';
document.head.appendChild(link);
```

### Error 18: JSDelivr CDN version mismatch
**Description:** Load specific version of a library
```javascript
// <script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
```

### Error 19: Import map not supported
**Description:** Use import map in older browser
```javascript
// <script type="importmap">
// { "imports": { "lodash": "/node_modules/lodash/lodash.js" } }
// </script>
```

### Error 20: Nomodule attribute for fallback
**Description:** Serve different scripts for old browsers
```javascript
// <script type="module" src="modern.js"></script>
// <script nomodule src="legacy.js"></script>
```

### Error 21: Cross-origin script error
**Description:** Load script from CDN without crossorigin
```javascript
// <script src="https://cdn.example.com/analytics.js"></script>
```

### Error 22: SRI hash mismatch
**Description:** Use integrity attribute
```javascript
// <script src="app.js" integrity="sha384-abc123"></script>
```

### Error 23: Defer vs async confusion
**Description:** Load scripts in order with defer
```javascript
// <script defer src="lib.js"></script>
// <script async src="app.js"></script>
```

### Error 24: Relative import path from different directory
**Description:** Import from a sibling directory
```javascript
import { helper } from '../shared/helper.js';
```

### Error 25: Barrel imports causing circular dependency
**Description:** Import from index that re-exports
```javascript
// utils/index.js: export { helper } from './helper.js';
// helper.js: import { config } from './index.js';
```

### Error 26: Missing .js extension in import
**Description:** Import without file extension
```javascript
import { Component } from './Component';
```

### Error 27: HTML without DOCTYPE
**Description:** Start HTML document
```html
<html>
<head><title>Page</title></head>
<body></body>
</html>
```

### Error 28: Meta charset not first
**Description:** Set character encoding
```html
<head>
  <title>Page</title>
  <meta charset="UTF-8">
</head>
```

### Error 29: Script in body with document.write
**Description:** Use document.write from executed script
```javascript
// In body: <script>document.write('<p>test</p>');</script>
```

### Error 30: CSS file with BEM convention broken
**Description:** Style a component
```css
.card { }
.card__title { }
.cardTitle { }
```

### Error 31: Inline SVG with external CSS dependency
**Description:** Style SVG from external CSS
```css
circle { fill: blue; }
/* SVG loaded via <img> won't apply */
```

### Error 32: CSS specificity battles with multiple files
**Description:** Two CSS files conflicting
```css
/* reset.css */
button { padding: 0; }
/* components.css */
.btn { padding: 10px; }
```

### Error 33: Media query in JS instead of CSS
**Description:** Handle responsive styles
```javascript
if (window.innerWidth < 600) {
  document.querySelector('.sidebar').style.display = 'none';
}
```

### Error 34: HTML entity in JavaScript string
**Description:** Display copyright symbol
```javascript
const footer = document.querySelector('footer');
footer.textContent = '&copy; 2024 Company';
```

### Error 35: Loading script that doesn't exist
**Description:** Load a 404 script
```javascript
// <script src="nonexistent.js"></script>
```

### Error 36: CSS custom property in inline style
**Description:** Use CSS variable in inline style
```javascript
const el = document.querySelector('.box');
el.style.color = 'var(--text-color)';
```

### Error 37: Importing default without default export
**Description:** Import a named export as default
```javascript
import helper from './utils.js';
// utils.js exports: export const helper = () => {};
```

### Error 38: Script type module with defer
**Description:** Use type="module" with defer
```javascript
// <script type="module" defer src="app.js"></script>
```

### Error 39: CSS @charset not at beginning
**Description:** Specify CSS encoding
```css
body { margin: 0; }
@charset "UTF-8";
```

### Error 40: HTML comment in CSS
**Description:** Comment out CSS
```css
<!-- .box { color: red; } -->
```

### Error 41: External link target missing
**Description:** Open external link in new tab
```html
<a href="https://example.com">Visit</a>
```

### Error 42: Missing viewport meta tag
**Description:** Set responsive viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Error 43: Importing from node_modules without bundler
**Description:** Use npm package in browser
```javascript
import { debounce } from 'lodash';
```

### Error 44: CSS nesting without proper syntax
**Description:** Use CSS nesting
```css
.parent {
  color: red;
  .child { color: blue; }
}
```

### Error 45: Dynamic script insertion order
**Description:** Create script element dynamically
```javascript
const script = document.createElement('script');
script.src = 'app.js';
document.body.appendChild(script);
```

### Error 46: CSS layer ordering
**Description:** Use @layer
```css
@layer base, components;
@layer components { .btn { color: red; } }
@layer base { body { margin: 0; } }
```

### Error 47: Container query without support check
**Description:** Use container queries
```css
.card { container-type: inline-size; }
@container (min-width: 400px) { .title { font-size: 24px; } }
```

### Error 48: Has selector in old browser
**Description:** Use :has() selector
```css
.parent:has(.active) { border-color: green; }
```

### Error 49: Scoped CSS with @scope
**Description:** Use @scope rule
```css
@scope (.card) {
  p { color: red; }
}
```

### Error 50: CSS module script type
**Description:** Import CSS as module
```javascript
import styles from './styles.css' assert { type: 'css' };
```

### Error 51: Missing alt attribute on images
**Description:** Add image
```html
<img src="photo.jpg">
```

### Error 52: Duplicate id in HTML
**Description:** Two elements with same id
```html
<div id="unique">First</div>
<div id="unique">Second</div>
```

### Error 53: HTML form without name attributes
**Description:** Create form fields
```html
<input type="text" id="name">
<input type="email" id="email">
```

### Error 54: Table without tbody
**Description:** Create an HTML table
```html
<table>
  <tr><td>Cell</td></tr>
</table>
```

### Error 55: Button inside anchor tag
**Description:** Nest interactive elements
```html
<a href="/page"><button>Go</button></a>
```

### Error 56: Heading hierarchy skipped
**Description:** Create document outline
```html
<h1>Title</h1>
<h3>Subsection</h3>
```

### Error 57: Div instead of semantic elements
**Description:** Create a navigation
```html
<div class="nav">
  <div class="nav-item">Home</div>
</div>
```

### Error 58: Form without submit button
**Description:** Create a search form
```html
<form>
  <input type="search">
</form>
```

### Error 59: Label not associated with input
**Description:** Create form label
```html
<label>Name</label>
<input type="text">
```

### Error 60: Unclosed HTML tags
**Description:** Create a list
```html
<ul>
  <li>Item 1
  <li>Item 2
</ul>
```

### Error 61: Script tag in wrong location for performance
**Description:** Load blocking script in head
```html
<head>
  <script src="heavy.js"></script>
</head>
```

### Error 62: Inline event handlers in HTML
**Description:** Add click behavior to button
```html
<button onclick="handleClick()">Click</button>
```

### Error 63: HTML comments revealing sensitive info
**Description:** Add HTML comment
```html
<!-- TODO: Remove API key: sk-123456 -->
```

### Error 64: Style tag in body
**Description:** Add inline styles
```html
<body>
  <style> .box { color: red; } </style>
</body>
```

### Error 65: Multiple H1 elements
**Description:** Add main headings
```html
<h1>Section 1</h1>
<h1>Section 2</h1>
```

### Error 66: Input type without proper validation
**Description:** Create email input
```html
<input type="text" id="email">
```

### Error 67: Missing for attribute on label
**Description:** Associate label with input
```html
<label>Email:</label>
<input id="email">
```

### Error 68: Using br for spacing
**Description:** Create vertical spacing
```html
<p>First paragraph</p>
<br><br><br>
<p>Second paragraph</p>
```

### Error 69: HTML entities for special characters
**Description:** Display angle brackets
```html
<div><Hello></div>
```

### Error 70: CSS display none for accessibility
**Description:** Hide content visually but keep accessible
```html
<div style="display: none;">Screen reader text</div>
```

---

### Issue 1: All JavaScript in one file
**Description:** Organize application code
```javascript
// app.js: 5000 lines of code with all logic here
```

### Issue 2: CSS and JS in HTML file
**Description:** Build a component
```html
<div style="..." onclick="...">Content</div>
<script>/* lots of JS */</script>
<style>/* lots of CSS */</style>
```

### Issue 3: Inconsistent file naming conventions
**Description:** Name project files
```
UserProfile.js
user-data.js
utils.helper.js
```

### Issue 4: Mixing kebab-case and camelCase in CSS
**Description:** Name CSS classes
```css
.card-title { }
.cardBody { }
.card_footer { }
```

### Issue 5: Not using CSS variables for theme values
**Description:** Hardcode colors in multiple files
```css
/* header.css */
.header { background: #333; }
/* footer.css */
.footer { background: #333; }
/* sidebar.css */
.sidebar { background: #333; }
```

### Issue 6: Large bundle without code splitting
**Description:** Import everything at once
```javascript
import { utility1, utility2, utility3, ... } from './big-utils.js';
```

### Issue 7: Not extracting reusable utilities
**Description:** Duplicate DOM helpers in multiple files
```javascript
// file1.js
function $(sel) { return document.querySelector(sel); }
// file2.js
function $(sel) { return document.querySelector(sel); }
```

### Issue 8: Using relative paths that are too deep
**Description:** Import from a deeply nested directory
```javascript
import { helper } from '../../../../utils/helpers/string/format.js';
```

### Issue 9: Not organizing CSS by component
**Description:** Single CSS file with all styles
```css
/* styles.css: 3000 lines */
```

### Issue 10: Module circular dependencies
**Description:** Two files importing each other
```javascript
// a.js: import { b } from './b.js';
// b.js: import { a } from './a.js';
```

### Issue 11: Not using index.js barrel exports
**Description:** Import directly from each file
```javascript
import { User } from './models/User.js';
import { Product } from './models/Product.js';
import { Order } from './models/Order.js';
```

### Issue 12: Hardcoded API URLs in multiple files
**Description:** Fetch from API in different modules
```javascript
// user.js: fetch('https://api.example.com/users')
// product.js: fetch('https://api.example.com/products')
```

### Issue 13: Global CSS that leaks across components
**Description:** Style that affects all elements
```css
div { margin: 0; padding: 0; }
```

### Issue 14: Not using semantic HTML tags
**Description:** Build page structure with divs
```html
<div class="header">...</div>
<div class="main">...</div>
<div class="footer">...</div>
```

### Issue 15: No fallback for CSS features
**Description:** Use modern CSS without fallback
```css
.container { display: grid; gap: 20px; }
```

### Issue 16: Not minifying production assets
**Description:** Use full source files in production
```html
<script src="app.js"></script>
<link rel="stylesheet" href="styles.css">
```

### Issue 17: No cache busting on assets
**Description:** Load static files
```html
<script src="app.js"></script>
<link rel="stylesheet" href="style.css">
```

### Issue 18: Inline CSS in JavaScript
**Description:** Style elements in JS
```javascript
el.style.backgroundColor = 'red';
el.style.padding = '10px';
el.style.borderRadius = '5px';
el.style.color = 'white';
```

### Issue 19: Using CSS !important frequently
**Description:** Override styles
```css
.btn { color: red !important; }
.special { color: blue !important; }
```

### Issue 20: Not separating config from code
**Description:** Hardcode configuration values
```javascript
function fetchUsers() {
  return fetch('https://api.example.com/v1/users');
}
```

### Issue 21: Using multiple style tags
**Description:** Add styles in different parts of HTML
```html
<style>.a { color: red; }</style>
<div>...</div>
<style>.b { color: blue; }</style>
```

### Issue 22: Not using CSS reset/normalize
**Description:** Start with browser defaults
```css
/* No reset - relying on browser defaults */
```

### Issue 23: Large CSS files with unused styles
**Description:** Accumulate unused CSS
```css
/* Hundreds of classes never used in HTML */
```

### Issue 24: Not using CSS shorthand properties
**Description:** Verbose CSS
```css
.box {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}
```

### Issue 25: Overusing specificity for no reason
**Description:** Deeply nested selectors
```css
body div.container div.wrapper div.content p { color: red; }
```

### Issue 26: Using px for responsive values
**Description:** Set font sizes
```css
body { font-size: 16px; }
h1 { font-size: 32px; }
```

### Issue 27: Not extracting color palette to variables
**Description:** Repeat color values
```css
.btn-primary { background: #0066cc; }
.btn-secondary { background: #6c757d; }
.link { color: #0066cc; }
```

### Issue 28: JavaScript event handlers in HTML
**Description:** Attach events in markup
```html
<button onclick="submit()">Submit</button>
<button onmouseover="highlight(this)">Hover</button>
```

### Issue 29: Using CSS @import in production
**Description:** Import CSS files
```css
@import 'reset.css';
@import 'components.css';
@import 'utilities.css';
```

### Issue 30: Not using link prefetch/preload
**Description:** Optimize resource loading
```html
<link rel="stylesheet" href="style.css">
```

---

### Modify 1: Move inline styles to CSS classes
**Description:** Style a button with blue background and white text
```javascript
const btn = document.querySelector('#actionBtn');
btn.style.backgroundColor = 'blue';
btn.style.color = 'white';
btn.style.padding = '10px 20px';
```

### Modify 2: Add defer to script tag
**Description:** Load script that accesses DOM
```html
<script src="app.js"></script>
```

### Modify 3: Add type="module" to script
**Description:** Use ES module imports
```html
<script src="main.js"></script>
```

### Modify 4: Extract CSS to external file
**Description:** Move component styles out of HTML
```html
<style>
  .card { border: 1px solid #ddd; padding: 20px; }
  .card-title { font-size: 24px; }
</style>
```

### Modify 5: Fix the script loading order
**Description:** Ensure utils loads before app
```html
<script src="app.js"></script>
<script src="utils.js"></script>
```

### Modify 6: Add proper HTML structure
**Description:** Create a basic HTML page skeleton
```html
<html>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

### Modify 7: Fix the module import path
**Description:** Import helper from utils directory
```javascript
import { helper } from 'utils';
```

### Modify 8: Move JavaScript to external file
**Description:** Extract inline script from HTML
```html
<!DOCTYPE html>
<html>
<head></head>
<body>
  <h1>Page</h1>
  <script>
    document.querySelector('h1').textContent = 'Updated';
  </script>
</body>
</html>
```

### Modify 9: Add viewport meta tag
**Description:** Make page responsive on mobile
```html
<head>
  <title>Page</title>
</head>
```

### Modify 10: Fix the CSS @import to link tag
**Description:** Load reset.css
```css
@import url('reset.css');
```

### Modify 11: Add cache busting to script
**Description:** Force reload of updated script
```html
<script src="app.js"></script>
```

### Modify 12: Use semantic HTML instead of divs
**Description:** Create page structure
```html
<div class="header">Site Title</div>
<div class="nav">Navigation</div>
<div class="main">Content</div>
<div class="footer">Footer</div>
```

### Modify 13: Fix the script type for module
**Description:** Import and use a module
```html
<script>
  import { greet } from './greet.js';
  greet('World');
</script>
```

### Modify 14: Add crossorigin to CDN script
**Description:** Load analytics from CDN
```html
<script src="https://cdn.example.com/analytics.js"></script>
```

### Modify 15: Use CSS custom properties for theming
**Description:** Define and use theme colors
```css
.header { background: #333; color: white; }
.btn { background: #0066cc; color: white; }
```

### Modify 16: Fix the relative import path
**Description:** Import from parent directory
```javascript
import { config } from './config.js';
// File is in src/components/, config is in src/
```

### Modify 17: Add async to non-critical script
**Description:** Load analytics script without blocking
```html
<script src="analytics.js"></script>
```

### Modify 18: Separate HTML, CSS, JS into files
**Description:** Extract all code from a single file
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; }
    h1 { color: blue; }
  </style>
</head>
<body>
  <h1>Title</h1>
  <script>
    document.querySelector('h1').textContent = 'Hello';
  </script>
</body>
</html>
```

### Modify 19: Add SRI integrity to CDN links
**Description:** Load jQuery from CDN securely
```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```

### Modify 20: Fix the barrel export circular dependency
**Description:** Import helper directly from its file
```javascript
// index.js
export { default as Button } from './Button.js';
export { default as Input } from './Input.js';
```

### Modify 21: Add noscript fallback
**Description:** Message for users without JavaScript
```html
<div id="app">App content</div>
```

### Modify 22: Use dynamic import for code splitting
**Description:** Lazy load the chart module
```javascript
import { Chart } from './Chart.js';
```

### Modify 23: Fix the CSS specificity issue
**Description:** Style buttons without !important
```css
button { color: blue; }
.special-btn { color: red; }
/* HTML: <button class="special-btn">Click</button> */
```

### Modify 24: Add proper document structure
**Description:** Complete HTML with head and body
```html
<div>Content</div>
```

### Modify 25: Organize CSS by component
**Description:** Split large CSS into components
```css
/* single-file styles.css with all rules */
```

### Modify 26: Fix the media query in JS
**Description:** Move responsive logic to CSS
```javascript
if (window.innerWidth < 768) {
  document.querySelector('.sidebar').style.display = 'none';
}
```

### Modify 27: Add prefetch for critical CSS
**Description:** Optimize CSS loading
```html
<link rel="stylesheet" href="style.css">
```

### Modify 28: Extract API URL to config
**Description:** Move hardcoded API URL
```javascript
function getUsers() {
  return fetch('https://api.example.com/users');
}
function getProducts() {
  return fetch('https://api.example.com/products');
}
```

### Modify 29: Fix the HTML lang attribute
**Description:** Set page language to English
```html
<html>
<head><title>Page</title></head>
<body></body>
</html>
```

### Modify 30: Add proper form labels
**Description:** Create an accessible form
```html
<form>
  Name: <input type="text" id="name">
  Email: <input type="email" id="email">
  <button type="submit">Submit</button>
</form>
```

### Modify 31: Use CSS nesting properly
**Description:** Style card header inside card
```css
.card { }
.card .card-header { }
.card .card-body { }
```

### Modify 32: Fix the CSS variable fallback
**Description:** Use variable with fallback value
```css
.title { color: var(--primary-color); }
```

### Modify 33: Add responsive images with srcset
**Description:** Serve different image sizes
```html
<img src="photo.jpg">
```

### Modify 34: Fix the duplicate id in HTML
**Description:** Create two different sections
```html
<div id="section">First</div>
<div id="section">Second</div>
```

### Modify 35: Use arrow functions in modules
**Description:** Export a utility function
```javascript
// utils.js
function formatDate(date) { return date.toISOString(); }
export { formatDate };
```

### Modify 36: Fix the CSS selector naming consistency
**Description:** Name all classes in kebab-case
```css
.cardTitle { }
.cardBody { }
.cardFooter { }
```

### Modify 37: Add defer to all non-critical scripts
**Description:** Load multiple scripts efficiently
```html
<script src="vendor.js"></script>
<script src="app.js"></script>
```

### Modify 38: Extract constants to separate file
**Description:** Move magic numbers
```javascript
const API_TIMEOUT = 5000;
const MAX_RETRIES = 3;
const PAGE_SIZE = 20;
```

### Modify 39: Fix the table structure
**Description:** Create a proper HTML table
```html
<table>
  <tr><td>Name</td><td>Age</td></tr>
  <tr><td>Alice</td><td>30</td></tr>
</table>
```

### Modify 40: Add proper heading hierarchy
**Description:** Structure document headings
```html
<h1>Main Title</h1>
<h3>Subsection</h3>
<h4>Detail</h4>
```

### Modify 41: Use CSS grid instead of float layouts
**Description:** Create a 2-column layout
```css
.layout { }
.sidebar { float: left; width: 30%; }
.main { float: right; width: 70%; }
```

### Modify 42: Fix the image alt text
**Description:** Add accessible alt text
```html
<img src="logo.png">
```

### Modify 43: Add form validation attributes
**Description:** Make email field required
```html
<input type="email" id="email">
```

### Modify 44: Extract inline event handlers
**Description:** Move onclick from HTML to JS
```html
<button onclick="submitForm()">Submit</button>
```

### Modify 45: Fix the CSS shorthand for margin
**Description:** Use shorthand for margin values
```css
.box {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}
```

### Modify 46: Use content-visibility for lazy rendering
**Description:** Optimize rendering of below-fold content
```css
.section { }
```

### Modify 47: Fix the HTML entity encoding
**Description:** Display angle brackets text
```html
<div>The <tag> element</div>
```

### Modify 48: Add label accessibility
**Description:** Associate label with input via for
```html
<label>Username</label>
<input id="username" type="text">
```

### Modify 49: Move CSS from JavaScript to stylesheet
**Description:** Replace JS styling with class toggles
```javascript
function highlight(el) {
  el.style.backgroundColor = 'yellow';
  el.style.fontWeight = 'bold';
}
```

### Modify 50: Fix the script loading order for dependencies
**Description:** Ensure jQuery loads before dependent script
```html
<script src="app.js"></script>
<script src="jquery.js"></script>
```
