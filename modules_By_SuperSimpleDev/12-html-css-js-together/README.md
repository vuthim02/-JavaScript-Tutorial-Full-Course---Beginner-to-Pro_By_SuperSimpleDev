# Module 11: HTML, CSS, and JavaScript Together

**Duration:** ~45 minutes  
**Video Timestamp:** 06:49:08 - 09:28:26

## Learning Objectives

- Integrate CSS with JavaScript
- Use classList to manipulate classes
- Style elements dynamically
- Create responsive designs
- Organize files into folders

## Combining HTML, CSS, and JavaScript

### The Three Layers

```
HTML = Structure (content)
CSS = Presentation (styling)
JavaScript = Behavior (interactivity)
```

### Project Structure

```
project/
├── index.html
├── styles/
│   └── main.css
└── scripts/
    └── main.js
```

### Linking CSS and JS Files

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Project</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>
  <h1>Hello</h1>
  <button class="btn">Click me</button>
  
  <script src="scripts/main.js"></script>
</body>
</html>
```

## The classList Property

The `classList` property lets you control an element's classes:

```javascript
const button = document.querySelector('.btn');

// Add a class
button.classList.add('primary');

// Remove a class
button.classList.remove('primary');

// Toggle a class (add if missing, remove if present)
button.classList.toggle('active');

// Check if has a class
console.log(button.classList.contains('primary')); // true or false
```

### CSS File (styles/main.css)

```css
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn.primary {
  background-color: blue;
  color: white;
}

.btn.active {
  background-color: green;
  transform: scale(1.05);
}

.btn:hover {
  opacity: 0.9;
}
```

## Styling a Subscribe Button

### HTML

```html
<button class="subscribe-btn js-subscribe-btn">Subscribe</button>
```

### CSS (styles/buttons.css)

```css
.subscribe-btn {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.2s;
}

.subscribe-btn:hover {
  opacity: 0.8;
}

.subscribe-btn.subscribed {
  background-color: #cccccc;
  color: #000000;
}
```

### JavaScript (scripts/subscribe.js)

```javascript
const button = document.querySelector('.js-subscribe-btn');

button.addEventListener('click', () => {
  if (button.classList.contains('subscribed')) {
    button.classList.remove('subscribed');
    button.textContent = 'Subscribe';
  } else {
    button.classList.add('subscribed');
    button.textContent = 'Subscribed';
  }
});
```

## Styling Text

### CSS Typography

```css
.text {
  /* Font properties */
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;      /* normal, bold, 100-900 */
  font-style: italic;     /* normal, italic */
  
  /* Text properties */
  color: #333333;
  text-align: center;     /* left, center, right */
  line-height: 1.5;       /* spacing between lines */
  letter-spacing: 1px;    /* spacing between letters */
  text-transform: uppercase; /* uppercase, lowercase, capitalize */
}

.price {
  font-size: 24px;
  color: #b12704;         /* Amazon price color */
  font-weight: bold;
}
```

## Box Model Properties

### margin, padding, border

```css
.element {
  /* Margin = space outside the element */
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  
  /* Shorthand: top right bottom left */
  margin: 10px 20px 10px 20px;
  
  /* Or: vertical horizontal */
  margin: 10px 20px;
  
  /* Padding = space inside the element */
  padding: 15px;
  
  /* Border */
  border: 1px solid #ccc;
  border-radius: 5px;
}
```

### Display Property

```css
/* Block elements take full width */
div, p, h1 {
  display: block;
}

/* Inline elements flow with text */
span, a, button {
  display: inline;
}

/* Inline-block = inline but can have dimensions */
button {
  display: inline-block;
  width: 150px;
}

/* Hide element */
.hidden {
  display: none;
}
```

## Styling a Text Input

```css
.input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;  /* Remove default focus outline */
}

.input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
```

## Rock Paper Scissors Styling

### HTML Structure

```html
<div class="game-container">
  <img class="move-icon js-move-icon" src="images/rock.png" alt="Rock">
  
  <p class="result js-result">You win!</p>
  
  <div class="move-buttons">
    <button class="move-btn js-rock-btn">
      <img src="images/rock.png" alt="Rock">
    </button>
    <button class="move-btn js-paper-btn">
      <img src="images/paper.png" alt="Paper">
    </button>
    <button class="move-btn js-scissors-btn">
      <img src="images/scissors.png" alt="Scissors">
    </button>
  </div>
</div>
```

### CSS (styles/game.css)

```css
.game-container {
  font-family: Arial;
  text-align: center;
  padding: 50px;
}

.move-icon {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.result {
  font-size: 32px;
  font-weight: bold;
  margin: 20px 0;
  min-height: 40px;
}

.move-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.move-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: transform 0.2s, box-shadow 0.2s;
}

.move-btn:hover {
  transform: scale(1.1);
}

.move-btn:active {
  transform: scale(0.95);
}

.move-btn img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}
```

## File Paths (Filepaths)

### Relative Paths

```
project/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
└── images/
    └── logo.png
```

From `index.html`:
```html
<link rel="stylesheet" href="styles/main.css">
<script src="scripts/main.js"></script>
<img src="images/logo.png">
```

From `styles/main.css`:
```css
/* Go up one level, then into images */
background-image: url('../images/logo.png');

/* Or from root */
background-image: url('/images/logo.png');
```

From `scripts/main.js`:
```javascript
// Same - go up one level, then into images
const imagePath = '../images/logo.png';
```

### Absolute vs Relative

```html
<!-- Absolute path (full URL) -->
<img src="https://example.com/images/logo.png">

<!-- Relative path (relative to current file) -->
<img src="images/logo.png">
```

## Organizing Project Files

### Recommended Structure

```
project/
├── index.html
├── checkout.html
├── orders.html
├── css/
│   ├── main.css
│   ├── buttons.css
│   └── forms.css
├── js/
│   ├── main.js
│   ├── cart.js
│   └── checkout.js
├── images/
│   ├── products/
│   └── icons/
└── fonts/
```

### Importing CSS into CSS

```css
/* main.css */
@import url('buttons.css');
@import url('forms.css');

/* Or use multiple <link> tags in HTML */
```

## Practical Examples

### Toggle Button Styles

```css
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

/* Primary button */
.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Success button */
.btn-success {
  background-color: #28a745;
  color: white;
}

/* Danger button */
.btn-danger {
  background-color: #dc3545;
  color: white;
}
```

### Card Component

```css
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 300px;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
}
```

### Loading State

```css
.loading {
  opacity: 0.7;
  pointer-events: none;
}

.loading::after {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## Practice Exercises

### Exercise 11.1: Styled Button Toggle

Create a button that toggles between "Follow" and "Following" states with different styles.

```html
<button class="follow-btn js-follow-btn">Follow</button>
```

```css
.follow-btn {
  background-color: #1a87e8;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.follow-btn.following {
  background-color: white;
  color: #333;
  border: 1px solid #ccc;
}
```

```javascript
const btn = document.querySelector('.js-follow-btn');

btn.addEventListener('click', () => {
  btn.classList.toggle('following');
  btn.textContent = btn.classList.contains('following') 
    ? 'Following' 
    : 'Follow';
});
```

### Exercise 11.2: Styled Calculator

Create a calculator with proper styling.

```html
<div class="calculator">
  <input type="text" class="calc-display js-calc-display" readonly>
  <div class="calc-buttons">
    <button class="calc-btn">1</button>
    <!-- ... more buttons -->
  </div>
</div>
```

```css
.calculator {
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.calc-display {
  width: 100%;
  padding: 15px;
  font-size: 24px;
  text-align: right;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.calc-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.calc-btn {
  padding: 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: white;
  transition: background 0.2s;
}

.calc-btn:hover {
  background: #e0e0e0;
}
```

## Summary

- Separate HTML, CSS, and JavaScript into different files
- Use `classList` to add, remove, toggle classes
- Organize files into folders (css/, js/, images/)
- Use relative file paths to link resources
- CSS handles all styling, JavaScript handles behavior
- Combine them for interactive, styled web pages

## Next Steps

Proceed to Module 12: Arrays and Loops to learn about handling collections of data.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)