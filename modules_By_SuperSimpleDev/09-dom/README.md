# Module 9: Document Object Model (DOM)

**Duration:** ~83 minutes  
**Video Timestamp:** 05:25:46 - 06:49:08

## Learning Objectives

- Understand what the DOM is
- Select HTML elements using JavaScript
- Modify elements (content, styles, attributes)
- Handle events (click, submit, etc.)
- Create and remove elements
- Work with forms

## What is the DOM?

The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.

```
Document
  └── html
      ├── head
      │   ├── title
      │   └── meta
      └── body
          ├── h1
          ├── p
          └── div.container
              ├── button
              └── input
```

## Selecting Elements

### getElementById()

Select a single element by its ID:

```javascript
// HTML: <div id="header">Welcome</div>
const header = document.getElementById('header');
console.log(header.textContent);  // Welcome
```

### getElementsByClassName()

Select elements by class name (returns HTMLCollection):

```javascript
// HTML: <p class="intro">Hello</p>
// HTML: <p class="intro">World</p>

const intros = document.getElementsByClassName('intro');
console.log(intros.length);       // 2
console.log(intros[0].textContent); // Hello
console.log(intros[1].textContent); // World
```

### getElementsByTagName()

Select elements by tag name:

```javascript
// HTML: <button>Click</button>
// HTML: <button>Submit</button>

const buttons = document.getElementsByTagName('button');
console.log(buttons.length);  // 2
```

### querySelector()

Select the FIRST element matching a CSS selector:

```javascript
// Select by ID
const header = document.querySelector('#header');

// Select by class
const intro = document.querySelector('.intro');

// Select by tag
const button = document.querySelector('button');

// Select by attribute
const input = document.querySelector('[type="text"]');

// Complex selector
const link = document.querySelector('nav a.active');
```

### querySelectorAll()

Select ALL elements matching a CSS selector (returns NodeList):

```javascript
// HTML: <li>Item 1</li>
// HTML: <li>Item 2</li>

const items = document.querySelectorAll('li');
items.forEach(item => {
  console.log(item.textContent);
});
```

## Modifying Elements

### textContent

Change or get the text content:

```javascript
const heading = document.querySelector('h1');
console.log(heading.textContent);  // Get text

heading.textContent = 'New Heading';  // Change text
heading.textContent = 'Hello <em>World</em>';  // Escaped, not rendered!
```

### innerHTML

Change the HTML inside an element:

```javascript
const container = document.querySelector('.container');

container.innerHTML = '<h2>New Title</h2><p>New paragraph</p>';

container.innerHTML += '<button>Add Button</button>';  // Append
```

### innerText

Like textContent but respects CSS visibility:

```javascript
const element = document.querySelector('.hidden');
console.log(element.textContent);  // Includes hidden text
console.log(element.innerText);      // Ignores hidden text
```

## Modifying Attributes

### getAttribute() and setAttribute()

```javascript
const link = document.querySelector('a');

// Get attribute
console.log(link.getAttribute('href'));

// Set attribute
link.setAttribute('href', 'https://newsite.com');
link.setAttribute('target', '_blank');
```

### Direct Property Access

```javascript
const input = document.querySelector('input');

// Get/set value
console.log(input.value);
input.value = 'New value';

// Get/set src
const img = document.querySelector('img');
console.log(img.src);
img.src = 'new-image.jpg';

// Get/set href
const link = document.querySelector('a');
console.log(link.href);
link.href = 'https://example.com';
```

### Checking Attributes

```javascript
const button = document.querySelector('button');

console.log(button.hasAttribute('disabled'));  // false
button.disabled = true;
console.log(button.hasAttribute('disabled'));  // true

button.removeAttribute('disabled');
```

## Modifying Styles

### style Property

```javascript
const element = document.querySelector('.box');

element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '20px';
element.style.display = 'none';
```

### classList

Manage CSS classes:

```javascript
const element = document.querySelector('.box');

// Add class
element.classList.add('active');
element.classList.add('highlight', 'bordered');

// Remove class
element.classList.remove('active');

// Toggle class
element.classList.toggle('active');  // Adds if not present
element.classList.toggle('active');  // Removes if present

// Check if has class
console.log(element.classList.contains('active'));  // false
```

### Working with CSS Classes

```javascript
// CSS
// .highlight { background: yellow; }
// .big { font-size: 24px; }
// .hidden { display: none; }

const element = document.querySelector('.item');

element.classList.add('highlight');
element.classList.add('big');

// Multiple classes
element.classList.add('highlight', 'big', 'shadow');
```

## Event Handling

### The Event Model

Events are actions that happen in the browser (clicks, keypresses, etc.):

```javascript
const button = document.querySelector('button');

button.addEventListener('click', function(event) {
  console.log('Button clicked!');
});
```

### Common Events

| Event | Description |
|-------|-------------|
| `click` | Element clicked |
| `dblclick` | Double click |
| `mouseover` | Mouse enters element |
| `mouseout` | Mouse leaves element |
| `submit` | Form submitted |
| `keydown` | Key pressed down |
| `keyup` | Key released |
| `change` | Input value changed |
| `focus` | Element focused |
| `blur` | Element loses focus |
| `load` | Page/element loaded |
| `scroll` | Page scrolled |

### Click Event

```javascript
// HTML: <button id="btn">Click Me</button>

const button = document.querySelector('#btn');

button.addEventListener('click', function() {
  console.log('Clicked!');
});

// Arrow function
button.addEventListener('click', () => {
  console.log('Arrow function click');
});

// Using onclick (less flexible)
button.onclick = function() {
  console.log('Using onclick');
};
```

### Event Parameter

Events give you information about what happened:

```javascript
const button = document.querySelector('button');

button.addEventListener('click', function(event) {
  console.log(event);           // Full event object
  console.log(event.target);     // The clicked element
  console.log(event.type);      // 'click'
  console.log(event.clientX);   // Mouse X position
  console.log(event.clientY);   // Mouse Y position
});
```

### Event Propagation

Events bubble up through the DOM:

```javascript
// Clicking inner also triggers outer!
document.querySelector('.outer').addEventListener('click', () => {
  console.log('Outer clicked');
});

document.querySelector('.inner').addEventListener('click', (e) => {
  console.log('Inner clicked');
  e.stopPropagation();  // Stop bubbling
});
```

### Prevent Default Behavior

```javascript
// Prevent link from navigating
document.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Link clicked but not navigated');
});

// Prevent form submission
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form not submitted');
});
```

## Form Handling

### Getting Form Values

```javascript
// HTML: <input id="name" type="text">
// HTML: <input id="age" type="number">

const nameInput = document.querySelector('#name');
const ageInput = document.querySelector('#age');

console.log(nameInput.value);  // User's input
console.log(ageInput.value);    // User's age
```

### Form Submission

```javascript
// HTML:
// <form id="signup-form">
//   <input type="text" id="email" placeholder="Email">
//   <input type="password" id="password" placeholder="Password">
//   <button type="submit">Sign Up</button>
// </form>

document.querySelector('#signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  
  console.log(`Email: ${email}, Password: ${password}`);
});
```

### Input Events

```javascript
const input = document.querySelector('input');

input.addEventListener('input', (e) => {
  console.log('Input changed:', e.target.value);
});

input.addEventListener('focus', () => {
  console.log('Input focused');
});

input.addEventListener('blur', () => {
  console.log('Input lost focus');
});

input.addEventListener('change', () => {
  console.log('Input value confirmed:', input.value);
});
```

## Creating and Removing Elements

### Creating Elements

```javascript
// Create new element
const newDiv = document.createElement('div');
newDiv.textContent = 'New div content';
newDiv.classList.add('container');

// Add to page
document.querySelector('.parent').appendChild(newDiv);
```

### Adding Elements

```javascript
const parent = document.querySelector('.container');

// Append (at the end)
parent.appendChild(newElement);

// Prepend (at the beginning)
parent.prepend(newElement);

// Insert before another element
parent.insertBefore(newElement, parent.firstChild);

// insertAdjacentHTML
element.insertAdjacentHTML('beforeend', '<p>New paragraph</p>');
// 'beforebegin' - before the element
// 'afterbegin' - inside, before first child
// 'beforeend' - inside, after last child
// 'afterend' - after the element
```

### Removing Elements

```javascript
const element = document.querySelector('.to-remove');

// Remove element
element.remove();

// Remove child
parent.removeChild(element);
```

### Example: Dynamic List

```javascript
// HTML: <ul id="list"></ul>

const list = document.querySelector('#list');
const items = ['Apple', 'Banana', 'Orange'];

// Clear list
list.innerHTML = '';

// Add items
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  list.appendChild(li);
});
```

## Working with Multiple Elements

### Looping Through Elements

```javascript
// querySelectorAll returns NodeList
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});
```

### Converting to Array

```javascript
const elements = document.querySelectorAll('.item');

// Convert NodeList to Array
Array.from(elements).forEach(el => { /* ... */ });

// Or using spread
[...elements].forEach(el => { /* ... */ });
```

## Practical Examples

### Counter Application

```javascript
// HTML:
// <p id="count">0</p>
// <button id="increase">+</button>
// <button id="decrease">-</button>

let count = 0;
const display = document.querySelector('#count');
const increaseBtn = document.querySelector('#increase');
const decreaseBtn = document.querySelector('#decrease');

increaseBtn.addEventListener('click', () => {
  count++;
  display.textContent = count;
});

decreaseBtn.addEventListener('click', () => {
  count--;
  display.textContent = count;
});
```

### Toggle Dark Mode

```javascript
// HTML: <button id="theme-toggle">Toggle Theme</button>

const toggle = document.querySelector('#theme-toggle');
const body = document.body;

toggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    toggle.textContent = 'Light Mode';
  } else {
    toggle.textContent = 'Dark Mode';
  }
});
```

### Dynamic Todo List

```javascript
// HTML:
// <input id="todo-input" placeholder="Enter todo">
// <button id="add-btn">Add</button>
// <ul id="todo-list"></ul>

const input = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const list = document.querySelector('#todo-list');

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text) {
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
    input.value = '';
  }
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});
```

### Form Validation

```javascript
// HTML:
// <form id="form">
//   <input id="email" type="text">
//   <span id="error"></span>
//   <button type="submit">Submit</button>
// </form>

const form = document.querySelector('#form');
const email = document.querySelector('#email');
const error = document.querySelector('#error');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const emailValue = email.value;
  
  if (!emailValue.includes('@')) {
    error.textContent = 'Please enter a valid email';
    error.style.color = 'red';
    email.style.borderColor = 'red';
  } else {
    error.textContent = '';
    email.style.borderColor = 'green';
    console.log('Form submitted:', emailValue);
  }
});
```

## Event Delegation

Handle events on parent to affect children:

```javascript
// Instead of adding listeners to each button
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// Use delegation - add ONE listener to parent
document.querySelector('.container').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    console.log('Button clicked:', e.target.textContent);
  }
});
```

## Practice Exercises

### Exercise 9.1: Simple Calculator
Create a calculator with two inputs and operation buttons.

```javascript
// Create HTML and handle:
// - Addition
// - Subtraction
// - Multiplication
// - Division
// - Clear
```

### Exercise 9.2: Color Picker
Create color boxes that change the background when clicked.

```javascript
// HTML: 
// <div class="color-box red"></div>
// <div class="color-box blue"></div>
// <div class="color-box green"></div>

document.querySelectorAll('.color-box').forEach(box => {
  box.addEventListener('click', () => {
    document.body.style.backgroundColor = window.getComputedStyle(box).backgroundColor;
  });
});
```

### Exercise 9.3: Accordion
Create expandable content sections.

```javascript
// HTML:
// <div class="accordion">
//   <div class="item">
//     <button class="header">Section 1</button>
//     <div class="content">Content 1</div>
//   </div>
// </div>

document.querySelectorAll('.accordion .header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});
```

## Summary

- The DOM represents HTML as objects JavaScript can manipulate
- Use `querySelector()` and `querySelectorAll()` to select elements
- Modify elements using `textContent`, `innerHTML`, `style`, `classList`
- Handle events with `addEventListener()`
- Create elements with `document.createElement()`
- Add/remove elements with `appendChild()`, `remove()`
- Event delegation handles events on parent elements

## Next Steps

Proceed to Module 10: Arrays and Loops to learn about handling collections of data.
