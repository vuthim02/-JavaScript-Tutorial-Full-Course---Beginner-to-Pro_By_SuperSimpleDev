# Debugging Challenge - Level 41
## Module 9: DOM Basics - querySelector, innerHTML, textContent

---

### Error 1: Missing dot in class selector
**Description:** Select an element by its class name
```javascript
const header = document.querySelector('header-class');
header.textContent = 'Welcome';
```

### Error 2: Missing hash in id selector
**Description:** Select an element by its id
```javascript
const main = document.querySelector('main-content');
main.innerHTML = '<p>Main content here</p>';
```

### Error 3: innerHTML used for text
**Description:** Set the text content of a paragraph
```javascript
const para = document.querySelector('.description');
para.innerHTML = 'This is a description';
```

### Error 4: textContent used for HTML
**Description:** Insert bold text into a div
```javascript
const container = document.querySelector('.container');
container.textContent = '<strong>Important</strong>';
```

### Error 5: querySelector on wrong element
**Description:** Select a button inside a form
```javascript
const form = document.querySelector('form');
const button = form.querySelector('.btn');
button.textContent = 'Submit';
```

### Error 6: Null reference from querySelector
**Description:** Change the text of a paragraph that doesn't exist yet
```javascript
const paragraph = document.querySelector('.dynamic-text');
paragraph.textContent = 'Hello';
```

### Error 7: QuerySelectorAll used as single element
**Description:** Hide all elements with class 'item'
```javascript
const items = document.querySelectorAll('.item');
items.style.display = 'none';
```

### Error 8: innerHTML with unescaped content
**Description:** Display user input in a div
```javascript
const userInput = '<script>alert("hack")</script>';
const output = document.querySelector('#output');
output.innerHTML = userInput;
```

### Error 9: TextContent used on non-element
**Description:** Set text on a text node
```javascript
const container = document.querySelector('.container');
const textNode = container.firstChild;
textNode.textContent = 'New text';
```

### Error 10: QuerySelector with invalid selector
**Description:** Select an element with a numeric id
```javascript
const element = document.querySelector('#123element');
element.style.color = 'red';
```

### Error 11: innerHTML assignment before element exists
**Description:** Write content to the page body
```javascript
document.querySelector('body').innerHTML = '<h1>Hello</h1>';
```

### Error 12: querySelector returns null on misspelled class
**Description:** Select a card element by class
```javascript
const card = document.querySelector('.crd');
card.classList.add('active');
```

### Error 13: Missing querySelectorAll iteration
**Description:** Change text of all list items
```javascript
const items = document.querySelectorAll('li');
items.textContent = 'Updated';
```

### Error 14: Concatenating HTML with innerHTML incorrectly
**Description:** Add a new item to a list
```javascript
const list = document.querySelector('#list');
list.innerHTML = list.innerHTML + '<li>New item</li>' + ;
```

### Error 15: Typo in querySelector method name
**Description:** Select the first button on the page
```javascript
const btn = document.queryselector('button');
btn.textContent = 'Click me';
```

### Error 16: innerHTML instead of inserting element
**Description:** Add a paragraph element to a div
```javascript
const div = document.querySelector('.content');
const para = document.createElement('p');
para.textContent = 'New paragraph';
div.innerHTML = para;
```

### Error 17: textContent used on input element
**Description:** Set the value of an input field
```javascript
const input = document.querySelector('#name');
input.textContent = 'John Doe';
```

### Error 18: QuerySelector with wrong nesting
**Description:** Select a span inside a specific div
```javascript
const span = document.querySelector('div span .text');
span.innerHTML = 'Hello';
```

### Error 19: HTML in textContent
**Description:** Display a greeting with a line break
```javascript
const greeting = document.querySelector('.greeting');
greeting.textContent = 'Hello<br>World';
```

### Error 20: innerHTML not clearing previous content
**Description:** Replace existing content with a new message
```javascript
const notification = document.querySelector('.notif');
notification.innerHTML += 'New notification';
```

### Error 21: Null check missing after querySelector
**Description:** Get the text of a heading and convert to uppercase
```javascript
const heading = document.querySelector('h1');
const text = heading.textContent.toUpperCase();
console.log(text);
```

### Error 22: querySelector with tag name only
**Description:** Select the first paragraph specifically
```javascript
const firstPara = document.querySelector('p');
firstPara.className = 'highlight';
```

### Error 23: innerHTML assignment with template literal error
**Description:** Display a dynamic message with a username
```javascript
const username = 'Alice';
const msgDiv = document.querySelector('#message');
msgDiv.innerHTML = `<p>Welcome ${username</p>`;
```

### Error 24: Wrong method for getting text
**Description:** Get the text from a div and log it
```javascript
const div = document.querySelector('.info');
const text = div.innerText();
console.log(text);
```

### Error 25: Accidental reassignment of querySelectorAll result
**Description:** Count the number of list items
```javascript
const items = document.querySelectorAll('li');
items = Array.from(items);
console.log(items.length);
```

### Error 26: innerHTML with self-closing tag misuse
**Description:** Create a line break in a div
```javascript
const div = document.querySelector('.text');
div.innerHTML = 'Line one<br></br>Line two';
```

### Error 27: textContent on document
**Description:** Get the full text of the page
```javascript
const pageText = document.textContent;
console.log(pageText);
```

### Error 28: querySelector with comma instead of space
**Description:** Select a paragraph inside a section
```javascript
const para = document.querySelector('section,p');
para.style.fontSize = '16px';
```

### Error 29: Using querySelectorAll on non-element
**Description:** Select all buttons in a fragment
```javascript
const fragment = document.createDocumentFragment();
const buttons = fragment.querySelectorAll('button');
buttons.forEach(btn => btn.textContent = 'Click');
```

### Error 30: innerHTML with undefined variable
**Description:** Display a user's age in a div
```javascript
const age = 25;
const display = document.querySelector('#ageDisplay');
display.innerHTML = `Age: ${age}`;
```

### Error 31: Missing quotation in selector
**Description:** Select an element with id "main-title"
```javascript
const title = document.querySelector(#main-title);
title.textContent = 'Hello';
```

### Error 32: innerHTML used on null
**Description:** Set content of a div that might not exist
```javascript
const box = document.querySelector('.optional-box');
box.innerHTML = 'Content';
```

### Error 33: TextContent with number
**Description:** Display a counter value
```javascript
const counter = document.querySelector('.counter');
counter.textContent = 0;
```

### Error 34: QuerySelector with double class
**Description:** Select an element with both classes active and highlighted
```javascript
const el = document.querySelector('.active.highlighted.');
el.innerHTML = 'Both classes';
```

### Error 35: innerHTML slow in loop
**Description:** Add 100 items to a list
```javascript
const list = document.querySelector('#myList');
for (let i = 0; i < 100; i++) {
  list.innerHTML += '<li>Item ' + i + '</li>';
}
```

### Error 36: textContent instead of value for textarea
**Description:** Get the content of a textarea
```javascript
const textarea = document.querySelector('#bio');
const content = textarea.textContent;
console.log(content);
```

### Error 37: querySelector with attribute but wrong syntax
**Description:** Select an input with type "text"
```javascript
const textInput = document.querySelector('input[type=text]');
textInput.value = 'Hello';
```

### Error 38: innerHTML with malformed HTML
**Description:** Create a nested list
```javascript
const container = document.querySelector('.list-container');
container.innerHTML = '<ul><li>Item 1<li>Item 2</li></ul>';
```

### Error 39: Null on querySelector with dynamic class
**Description:** Select an element that gets a class added later
```javascript
const el = document.querySelector('.dynamic-class');
console.log(el.classList);
```

### Error 40: innerHTML escaping issue
**Description:** Display a price with a dollar sign
```javascript
const priceDisplay = document.querySelector('.price');
priceDisplay.innerHTML = '$19.99';
```

### Error 41: querySelectorAll misspelling length
**Description:** Get number of paragraphs
```javascript
const paragraphs = document.querySelectorAll('p');
console.log(paragraphs.lengh);
```

### Error 42: innerHTML with JavaScript in string
**Description:** Make a button that shows an alert
```javascript
const btnDiv = document.querySelector('.btn-container');
btnDiv.innerHTML = '<button onclick="alert('hi')">Click</button>';
```

### Error 43: textContent not updating
**Description:** Update a status message
```javascript
const status = document.querySelector('#status');
status.textContent = 'Loading...';
status.textContent = 'Complete';
```

### Error 44: Wrong use of single and double quotes in selector
**Description:** Select an element with class "user-name"
```javascript
const user = document.querySelector('.user-name');
user.innerHTML = '<a href='link'>Profile</a>';
```

### Error 45: QuerySelector with child combinator typo
**Description:** Select direct children of a list
```javascript
const items = document.querySelectorAll('ul >li');
items.forEach(item => item.textContent = 'Child');
```

### Error 46: innerHTML boolean conversion
**Description:** Toggle visibility message
```javascript
const toggleDiv = document.querySelector('#toggle');
let isVisible = true;
toggleDiv.innerHTML = isVisible;
```

### Error 47: textContent fetching before DOM ready
**Description:** Get heading text at page load
```javascript
const heading = document.querySelector('h1');
console.log(heading.textContent);
```

### Error 48: querySelector returning undefined property
**Description:** Get the class name of a div
```javascript
const div = document.querySelector('.box');
console.log(div.classname);
```

### Error 49: innerHTML script injection via user data
**Description:** Display a username safely
```javascript
const username = '<img src=x onerror=alert(1)>';
const profile = document.querySelector('.profile-name');
profile.innerHTML = username;
```

### Error 50: textContent on SVG element
**Description:** Set text inside an SVG text element
```javascript
const svgText = document.querySelector('text');
svgText.textContent = 'SVG label';
```

### Error 51: Using querySelector on window
**Description:** Select the document body
```javascript
const body = window.querySelector('body');
body.innerHTML = '<h1>Hello</h1>';
```

### Error 52: innerHTML with array
**Description:** Display a list of names
```javascript
const names = ['Alice', 'Bob', 'Charlie'];
const list = document.querySelector('.name-list');
list.innerHTML = names;
```

### Error 53: Missing parentheses on querySelector
**Description:** Select the main heading
```javascript
const heading = document.querySelector'h1';
heading.textContent = 'Title';
```

### Error 54: innerHTML with null toString
**Description:** Display a null value
```javascript
const value = null;
const display = document.querySelector('.display');
display.innerHTML = value.toString();
```

### Error 55: textContent from script element
**Description:** Get content from a script tag
```javascript
const scriptContent = document.querySelector('script').textContent;
console.log(scriptContent);
```

### Error 56: QuerySelectorAll not spreadable directly
**Description:** Get all buttons and add click events
```javascript
const buttons = document.querySelectorAll('button');
buttons.map(btn => btn.addEventListener('click', () => alert('clicked')));
```

### Error 57: innerHTML in select element
**Description:** Add options to a select dropdown
```javascript
const select = document.querySelector('#country');
select.innerHTML = '<option value="us">USA</option>';
```

### Error 58: textContent on style element
**Description:** Read CSS from a style tag
```javascript
const styleTag = document.querySelector('style');
const css = styleTag.textContent;
console.log(css);
```

### Error 59: QuerySelector with leading space
**Description:** Select an element with class "content"
```javascript
const content = document.querySelector(' .content');
content.innerHTML = 'Hello';
```

### Error 60: innerHTML causing layout thrash
**Description:** Update multiple parts of a page
```javascript
document.querySelector('.header').innerHTML = 'Header';
document.querySelector('.main').innerHTML = 'Main';
document.querySelector('.footer').innerHTML = 'Footer';
```

### Error 61: Wrong variable name in querySelector
**Description:** Select the element with id "app"
```javascript
const el = document.querySelector('#appp');
el.innerHTML = 'App';
```

### Error 62: textContent with object
**Description:** Display user object
```javascript
const user = { name: 'Alice', age: 25 };
const display = document.querySelector('.user-display');
display.textContent = user;
```

### Error 63: querySelector on detached element
**Description:** Query inside a newly created element before appending
```javascript
const div = document.createElement('div');
const span = div.querySelector('span');
span.textContent = 'Hello';
```

### Error 64: innerHTML overriding event listeners
**Description:** Add a button with an existing click handler
```javascript
const container = document.querySelector('.actions');
container.innerHTML = '<button>Save</button>';
container.innerHTML = '<button>Cancel</button>';
```

### Error 65: Typo in textContent
**Description:** Set heading text
```javascript
const h1 = document.querySelector('h1');
h1.textContet = 'Page Title';
```

### Error 66: querySelector with unclosed bracket
**Description:** Select an input with attribute
```javascript
const input = document.querySelector('input[name="email');
input.value = 'test@test.com';
```

### Error 67: innerHTML with duplicate IDs
**Description:** Create two elements with same id
```javascript
const container = document.querySelector('.container');
container.innerHTML = '<div id="unique">First</div><div id="unique">Second</div>';
```

### Error 68: textContent on title element
**Description:** Change the page title
```javascript
const title = document.querySelector('title');
title.textContent = 'New Page Title';
```

### Error 69: QuerySelector with trailing whitespace
**Description:** Select a paragraph inside a section
```javascript
const para = document.querySelector('section p ');
para.textContent = 'Hello';
```

### Error 70: innerHTML with deprecated tags
**Description:** Create a styled text block
```javascript
const content = document.querySelector('.content');
content.innerHTML = '<center><font color="red">Warning</font></center>';
```

---

### Issue 1: Mixing HTML in JS strings
**Description:** Create a card component
```javascript
const card = '<div class="card"><h2>' + title + '</h2><p>' + desc + '</p></div>';
container.innerHTML = card;
```

### Issue 2: Inline event handler instead of addEventListener
**Description:** Add click behavior to a button
```javascript
button.onclick = function() { alert('Clicked'); };
```

### Issue 3: Direct style manipulation instead of classes
**Description:** Make a button red on hover
```javascript
button.style.backgroundColor = 'red';
button.style.color = 'white';
button.style.padding = '10px';
```

### Issue 4: Not caching DOM queries
**Description:** Update the same element multiple times
```javascript
document.querySelector('.status').textContent = 'Loading';
document.querySelector('.status').style.color = 'blue';
document.querySelector('.status').style.fontWeight = 'bold';
```

### Issue 5: Too many DOM updates in a loop
**Description:** Create 50 list items
```javascript
for (let i = 0; i < 50; i++) {
  const li = document.createElement('li');
  li.textContent = 'Item ' + i;
  document.querySelector('#list').appendChild(li);
}
```

### Issue 6: Script in head without defer
**Description:** Access DOM elements at load
```javascript
document.querySelector('h1').textContent = 'Hello';
```

### Issue 7: Missing type="module" for imports
**Description:** Use ES module imports
```javascript
import { formatDate } from './utils.js';
document.querySelector('.date').textContent = formatDate();
```

### Issue 8: Inconsistent naming of IDs
**Description:** Create navigation elements
```javascript
<div id="nav-bar">
<div id="navBarContent">
<div id="navbar-footer">
```

### Issue 9: Using innerHTML with user content
**Description:** Display a user's comment
```javascript
commentDiv.innerHTML = '<p>' + userComment + '</p>';
```

### Issue 10: Multiple querySelectorAll calls
**Description:** Get all items and paragraphs separately
```javascript
const items = document.querySelectorAll('.item');
const paras = document.querySelectorAll('p');
```

### Issue 11: Hardcoding strings instead of constants
**Description:** Toggle a CSS class
```javascript
element.classList.add('active');
element.classList.remove('active');
element.classList.add('active');
```

### Issue 12: Not using template literals
**Description:** Build an HTML string with variables
```javascript
const html = '<div class="item-' + id + '">' + name + ' (' + age + ')</div>';
```

### Issue 13: Creating elements with innerHTML instead of DOM methods
**Description:** Add a new paragraph to the page
```javascript
container.innerHTML += '<p>New paragraph</p>';
```

### Issue 14: Global scope pollution
**Description:** Define a utility function
```javascript
function updateDisplay(value) {
  document.querySelector('.display').textContent = value;
}
```

### Issue 15: Not using querySelector shortcuts
**Description:** Get the first list item
```javascript
const items = document.querySelectorAll('li');
const firstItem = items[0];
```

### Issue 16: Overwriting existing content accidentally
**Description:** Append a button to a toolbar
```javascript
toolbar.innerHTML = '<button>Save</button>';
```

### Issue 17: Not checking element existence before manipulation
**Description:** Update a status bar that might not be on the page
```javascript
document.querySelector('.status-bar').textContent = 'Ready';
```

### Issue 18: Using concatenation instead of template literals
**Description:** Create a greeting message
```javascript
greeting.innerHTML = 'Hello, ' + name + '! You have ' + count + ' messages.';
```

### Issue 19: Direct manipulation of style attribute
**Description:** Style a notification banner
```javascript
banner.style.display = 'block';
banner.style.backgroundColor = '#ff0';
banner.style.padding = '15px';
banner.style.borderRadius = '5px';
banner.style.marginBottom = '10px';
```

### Issue 20: Not removing event listeners
**Description:** Add click handler to a button
```javascript
button.addEventListener('click', handleClick);
```

### Issue 21: Using querySelectorAll when getElementById is faster
**Description:** Get an element by its ID
```javascript
const main = document.querySelector('#main');
```

### Issue 22: Polluting HTML with JS logic
**Description:** Conditionally display a message
```javascript
container.innerHTML = '<div class="' + (isActive ? 'active' : 'inactive') + '">Status</div>';
```

### Issue 23: Not using data attributes properly
**Description:** Store item ID in an element
```javascript
element.setAttribute('data-id', itemId);
```

### Issue 24: Multiple innerHTML assignments
**Description:** Build a complex component
```javascript
container.innerHTML = '<h2>Title</h2>';
container.innerHTML += '<p>Description</p>';
container.innerHTML += '<button>Click</button>';
```

### Issue 25: Using nodeType without understanding
**Description:** Iterate over child nodes
```javascript
for (let i = 0; i < container.childNodes.length; i++) {
  console.log(container.childNodes[i].textContent);
}
```

### Issue 26: Not using const for DOM references
**Description:** Reference the same element multiple times
```javascript
let title = document.querySelector('h1');
title.textContent = 'New';
title.style.color = 'red';
```

### Issue 27: Attribute vs property confusion
**Description:** Set the checked state of a checkbox
```javascript
checkbox.setAttribute('checked', true);
```

### Issue 28: Using innerHTML to clear then rebuild
**Description:** Refresh a list with new data
```javascript
list.innerHTML = '';
for (const item of data) {
  list.innerHTML += '<li>' + item + '</li>';
}
```

### Issue 29: Not preserving event listeners during update
**Description:** Re-render a component that has interactive elements
```javascript
function render() {
  container.innerHTML = '<button class="action">Do Something</button>';
}
```

### Issue 30: Using setAttribute instead of property
**Description:** Set the href of a link
```javascript
link.setAttribute('href', 'https://example.com');
```

---

### Modify 1: Add a click event listener
**Description:** Make a button show an alert when clicked
```javascript
const button = document.querySelector('#myButton');
```

### Modify 2: Use textContent instead of innerHTML
**Description:** Set the text of a paragraph safely
```javascript
const para = document.querySelector('.message');
para.innerHTML = 'Hello World';
```

### Modify 3: Cache DOM query in a variable
**Description:** Update the same heading multiple times
```javascript
document.querySelector('h1').textContent = 'Step 1';
document.querySelector('h1').textContent = 'Step 2';
document.querySelector('h1').textContent = 'Step 3';
```

### Modify 4: Add error handling for null querySelector
**Description:** Change text of a paragraph that may not exist
```javascript
const para = document.querySelector('.optional');
para.textContent = 'Content';
```

### Modify 5: Use a for loop to create list items
**Description:** Add 10 items to an unordered list
```javascript
const list = document.querySelector('#itemList');
```

### Modify 6: Fix the HTML string with proper escaping
**Description:** Display user-provided text safely
```javascript
const userText = '<b>bold text</b>';
const display = document.querySelector('.output');
display.innerHTML = userText;
```

### Modify 7: Convert to using createElement
**Description:** Add a new div with content
```javascript
const container = document.querySelector('.container');
container.innerHTML += '<div class="card"><p>Content</p></div>';
```

### Modify 8: Add a keyboard event listener
**Description:** Log the key pressed in an input field
```javascript
const input = document.querySelector('#textInput');
```

### Modify 9: Use classList toggle on click
**Description:** Toggle a 'highlight' class on a paragraph
```javascript
const para = document.querySelector('.toggle-para');
```

### Modify 10: Add a loading state
**Description:** Show "Loading..." while data is being fetched
```javascript
const statusDiv = document.querySelector('.loading-status');
// Simulate fetch
setTimeout(() => {
  statusDiv.textContent = 'Done';
}, 2000);
```

### Modify 11: Fix the onclick assignment
**Description:** Attach a click handler to a button
```javascript
const btn = document.querySelector('#actionBtn');
function handleClick() { alert('Clicked!'); }
btn.onclick = handleClick();
```

### Modify 12: Fix null reference error
**Description:** Get the text content of a heading
```javascript
const heading = document.querySelector('.heading');
const text = heading.textContent.toUpperCase();
```

### Modify 13: Add event listener with options
**Description:** Add a one-time click listener
```javascript
const btn = document.querySelector('#onceBtn');
```

### Modify 14: Fix innerHTML for numeric display
**Description:** Display a number in a div
```javascript
const score = 100;
const scoreDiv = document.querySelector('#score');
scoreDiv.innerHTML = score;
```

### Modify 15: Create elements using DOM methods
**Description:** Build a card component programmatically
```javascript
const container = document.querySelector('.cards-container');
// Instead of: container.innerHTML = '<div class="card"><h3>Title</h3></div>';
```

### Modify 16: Add a mouseenter event
**Description:** Change background color on hover
```javascript
const box = document.querySelector('.hover-box');
```

### Modify 17: Fix querySelector with missing selector prefix
**Description:** Select the element with class "content"
```javascript
const content = document.querySelector('content');
content.innerHTML = 'Main content';
```

### Modify 18: Add a debounced input handler
**Description:** React to input changes after user stops typing
```javascript
const searchInput = document.querySelector('#search');
```

### Modify 19: Fix textContent for multiline display
**Description:** Show a multiline message
```javascript
const msg = document.querySelector('.message');
msg.textContent = 'Line 1\nLine 2\nLine 3';
```

### Modify 20: Add a change event listener
**Description:** Log the selected value from a dropdown
```javascript
const select = document.querySelector('#colorPicker');
```

### Modify 21: Create a fragment for batch DOM updates
**Description:** Add 100 list items efficiently
```javascript
const list = document.querySelector('#bigList');
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = 'Item ' + i;
  list.appendChild(li);
}
```

### Modify 22: Add an error message display
**Description:** Show a red error message
```javascript
const errorDiv = document.querySelector('#errorMessages');
```

### Modify 23: Fix the innerHTML string concatenation
**Description:** Build a profile card with variables
```javascript
const name = 'Alice';
const role = 'Admin';
const card = document.querySelector('.profile-card');
card.innerHTML = '<div class="name">' + name + '</div><div class="role">' + role + '</div>';
```

### Modify 24: Add a double-click event
**Description:** Make text editable on double-click
```javascript
const text = document.querySelector('.editable');
```

### Modify 25: Add a reset form functionality
**Description:** Clear the input fields in a form
```javascript
const form = document.querySelector('#myForm');
```

### Modify 26: Fix the querySelectorAll iteration
**Description:** Style all paragraphs blue
```javascript
const paras = document.querySelectorAll('p');
paras.style.color = 'blue';
```

### Modify 27: Add a focus event for inputs
**Description:** Highlight input on focus
```javascript
const inputs = document.querySelectorAll('input');
```

### Modify 28: Add data attribute access
**Description:** Get the data-id from a button
```javascript
const btn = document.querySelector('[data-id]');
```

### Modify 29: Fix event listener not being called
**Description:** Log when a form is submitted
```javascript
const form = document.querySelector('#signupForm');
form.addEventListener('submit', handleSubmit());
function handleSubmit() { console.log('Submitted'); }
```

### Modify 30: Add a removeEventListener call
**Description:** Remove click handler after first use
```javascript
const btn = document.querySelector('#oneTimeBtn');
function handleClick() { alert('Done'); }
btn.addEventListener('click', handleClick);
```

### Modify 31: Convert to using querySelector shorthand
**Description:** Get the element with id "app"
```javascript
const app = document.getElementById('app');
```

### Modify 32: Add a transition effect with classList
**Description:** Fade in a notification element
```javascript
const notification = document.querySelector('.notif');
```

### Modify 33: Fix the misinterpreted className assignment
**Description:** Add a class 'card' to a div
```javascript
const div = document.querySelector('.box');
div.className = 'card';
```

### Modify 34: Add a wheel event listener
**Description:** Detect scroll on a container
```javascript
const scrollBox = document.querySelector('.scrollable');
```

### Modify 35: Create a counter with event listeners
**Description:** Increment count on button click
```javascript
let count = 0;
const display = document.querySelector('#countDisplay');
const button = document.querySelector('#incrementBtn');
```

### Modify 36: Fix the appendChild order
**Description:** Add a paragraph before the existing content
```javascript
const container = document.querySelector('.container');
const para = document.createElement('p');
para.textContent = 'Prepended';
container.appendChild(para);
```

### Modify 37: Add a paste event handler
**Description:** Sanitize pasted content in an input
```javascript
const input = document.querySelector('#textInput');
```

### Modify 38: Add a resize observer
**Description:** Log when a div changes size
```javascript
const resizable = document.querySelector('.resizable');
```

### Modify 39: Fix the incorrect querySelector path
**Description:** Select a nested paragraph inside article
```javascript
const para = document.querySelector('article p .text');
para.textContent = 'Content';
```

### Modify 40: Add an animation end event
**Description:** Remove an element after its exit animation
```javascript
const modal = document.querySelector('.modal');
modal.classList.add('closing');
```

### Modify 41: Add a context menu prevention
**Description:** Prevent right-click on an image
```javascript
const img = document.querySelector('img');
```

### Modify 42: Fix the innerHTML XSS vulnerability
**Description:** Display a username that may contain HTML
```javascript
const username = '<b>injected</b>';
const display = document.querySelector('.username');
display.innerHTML = username;
```

### Modify 43: Add a drag event handler
**Description:** Make a div draggable
```javascript
const draggable = document.querySelector('.drag-item');
```

### Modify 44: Add a visibility check before update
**Description:** Only update text if element is visible
```javascript
const message = document.querySelector('.conditional-msg');
message.textContent = 'Visible update';
```

### Modify 45: Use closest() method
**Description:** Find the nearest parent with class "card"
```javascript
const btn = document.querySelector('.card .action-btn');
```

### Modify 46: Add a beforeunload event
**Description:** Warn user before leaving with unsaved data
```javascript
const hasUnsavedChanges = true;
```

### Modify 47: Fix the querySelector with escaped characters
**Description:** Select an element with a colon in its id
```javascript
const el = document.querySelector('#section:1');
el.innerHTML = 'Section';
```

### Modify 48: Add an intersection observer
**Description:** Lazy load content when visible
```javascript
const lazyContent = document.querySelector('.lazy');
```

### Modify 49: Add a mutation observer
**Description:** Watch for new children in a container
```javascript
const container = document.querySelector('#dynamicContainer');
```

### Modify 50: Fix the improper textContent on button
**Description:** Set button label text
```javascript
const submitBtn = document.querySelector('#submit');
submitBtn.textContent = submitBtn.textContent;
