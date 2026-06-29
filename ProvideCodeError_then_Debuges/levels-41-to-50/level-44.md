# Debugging Challenge - Level 44
## Module 9: DOM Manipulation - createElement, appendChild, dataset, classList

---

### Error 1: createElement with text content not appended
**Description:** Create a heading and display it
```javascript
const h2 = document.createElement('h2');
h2.textContent = 'Section Title';
```

### Error 2: Dataset property with capital letters
**Description:** Access a camelCase data attribute
```javascript
const el = document.querySelector('[data-userName]');
console.log(el.dataset.userName);
```

### Error 3: className used instead of classList
**Description:** Add a class to an active element
```javascript
const el = document.querySelector('.item');
el.className = 'active';
```

### Error 4: appendChild on non-element
**Description:** Add a div to a text node
```javascript
const container = document.querySelector('.container');
const textNode = container.firstChild;
const div = document.createElement('div');
textNode.appendChild(div);
```

### Error 5: Dataset property hyphen not camelCase
**Description:** Access data-user-id from an element
```javascript
const el = document.querySelector('[data-user-id]');
console.log(el.dataset['user-id']);
```

### Error 6: classList.add with multiple classes as string
**Description:** Add multiple classes at once
```javascript
const el = document.querySelector('.card');
el.classList.add('is-active is-visible');
```

### Error 7: createElement used for text node
**Description:** Create a text node
```javascript
const text = document.createElement('text');
text.nodeValue = 'Hello World';
document.body.appendChild(text);
```

### Error 8: appendChild after removal
**Description:** Re-append an element after removing it
```javascript
const el = document.querySelector('#temp');
el.remove();
document.body.appendChild(el);
```

### Error 9: classList.remove on non-existent class
**Description:** Remove a class that may not exist
```javascript
const el = document.querySelector('.box');
el.classList.remove('non-existent-class');
```

### Error 10: Dataset not defined on SVG
**Description:** Get data attribute from SVG element
```javascript
const circle = document.querySelector('circle');
console.log(circle.dataset.index);
```

### Error 11: createElement with invalid tag
**Description:** Create a custom widget element
```javascript
const widget = document.createElement('my-widget-');
widget.textContent = 'Widget';
document.body.appendChild(widget);
```

### Error 12: classList.toggle with boolean
**Description:** Force remove a class
```javascript
const el = document.querySelector('.modal');
el.classList.toggle('open', false);
```

### Error 13: appendChild inside a loop recreating
**Description:** Create multiple list items
```javascript
for (let i = 0; i < 5; i++) {
  const item = document.createElement('li');
  item.textContent = 'Item ' + i;
}
```

### Error 14: Dataset value is always string
**Description:** Get a numeric data attribute
```javascript
const el = document.querySelector('[data-count]');
const count = el.dataset.count + 1;
console.log(count);
```

### Error 15: classList.contains on classList itself
**Description:** Check if classList contains a class
```javascript
const el = document.querySelector('.item');
if (el.classList.contains('active')) {
  el.classList.remove('active');
}
```

### Error 16: createElement with namespace for SVG
**Description:** Create an SVG circle element
```javascript
const circle = document.createElement('circle');
circle.setAttribute('cx', '10');
circle.setAttribute('cy', '10');
circle.setAttribute('r', '5');
document.body.appendChild(circle);
```

### Error 17: appendChild when parent has no children
**Description:** Add a child to an empty div
```javascript
const emptyDiv = document.querySelector('.empty');
const para = document.createElement('p');
para.textContent = 'Content';
emptyDiv.appendChild(para);
```

### Error 18: Dataset get with hasOwnProperty
**Description:** Check if dataset has a property
```javascript
const el = document.querySelector('[data-info]');
if (el.dataset.hasOwnProperty('info')) {
  console.log(el.dataset.info);
}
```

### Error 19: classList.item index out of bounds
**Description:** Get the first class of an element
```javascript
const el = document.querySelector('.a.b.c');
console.log(el.classList.item(5));
```

### Error 20: createElement with self-closing tag
**Description:** Create a br element
```javascript
const br = document.createElement('br/>');
document.body.appendChild(br);
```

### Error 21: appendChild after innerHTML assignment
**Description:** Build a card with both methods
```javascript
const card = document.createElement('div');
card.innerHTML = '<h3>Title</h3>';
const para = document.createElement('p');
para.textContent = 'Text';
card.appendChild(para);
```

### Error 22: Dataset with special characters
**Description:** Access data-attribute with special chars
```javascript
const el = document.querySelector('[data-key]');
console.log(el.dataset.key);
```

### Error 23: classList.replace with missing old class
**Description:** Replace a class that might not be present
```javascript
const el = document.querySelector('.item');
el.classList.replace('old-class', 'new-class');
```

### Error 24: createElement with document fragment
**Description:** Create elements in a fragment
```javascript
const fragment = document.createDocumentFragment();
const div = document.createElement('div');
div.textContent = 'Inside fragment';
fragment.appendChild(div);
```

### Error 25: Append child to document
**Description:** Add an element directly to document
```javascript
const el = document.createElement('p');
el.textContent = 'Hello';
document.appendChild(el);
```

### Error 26: Dataset on non-HTML element
**Description:** Get dataset from MathML element
```javascript
const mathEl = document.querySelector('math');
console.log(mathEl.dataset.info);
```

### Error 27: classList.toString
**Description:** Get all classes as a string
```javascript
const el = document.querySelector('.item.active');
console.log(el.classList.toString());
```

### Error 28: createElement with text node and element order
**Description:** Create a paragraph with bold text
```javascript
const para = document.createElement('p');
const bold = document.createElement('strong');
bold.textContent = 'Important';
para.appendChild(bold);
para.appendChild(' text');
document.body.appendChild(para);
```

### Error 29: appendChild before element exists
**Description:** Append to element not yet in DOM
```javascript
const container = document.createElement('div');
const child = document.createElement('span');
child.textContent = 'Hello';
container.appendChild(child);
```

### Error 30: Dataset mutation
**Description:** Update data attribute value
```javascript
const el = document.querySelector('[data-status]');
el.dataset.status = 'updated';
```

### Error 31: classList.add on SVG
**Description:** Add a class to SVG element
```javascript
const rect = document.querySelector('rect');
rect.classList.add('highlight');
```

### Error 32: createElement with non-string tag
**Description:** Create element from variable
```javascript
const tag = 123;
const el = document.createElement(tag);
el.textContent = 'Invalid';
document.body.appendChild(el);
```

### Error 33: Multiple appendChild calls moving element
**Description:** Display an element in two places
```javascript
const el = document.querySelector('#shared');
const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
box1.appendChild(el);
box2.appendChild(el);
```

### Error 34: Dataset length property
**Description:** Count data attributes
```javascript
const el = document.querySelector('[data-a][data-b]');
console.log(el.dataset.length);
```

### Error 35: classList on XML element
**Description:** Add class to XML element
```javascript
const xmlEl = document.querySelector('note');
xmlEl.classList.add('important');
```

### Error 36: createElement with empty string
**Description:** Create an element with empty tag
```javascript
const el = document.createElement('');
el.textContent = 'Empty';
document.body.appendChild(el);
```

### Error 37: appendChild returns the appended child
**Description:** Chain appendChild calls
```javascript
const parent = document.querySelector('.parent');
const child1 = document.createElement('div');
const child2 = document.createElement('div');
parent.appendChild(child1).appendChild(child2);
```

### Error 38: Dataset keys iteration
**Description:** Loop over all data attributes
```javascript
const el = document.querySelector('[data-a][data-b]');
for (const key in el.dataset) {
  console.log(key);
}
```

### Error 39: classList value not reflected in className
**Description:** After classList change, check className
```javascript
const el = document.querySelector('.box');
el.classList.add('active');
console.log(el.className);
```

### Error 40: createElement with HTML entities
**Description:** Create an element with entity in text
```javascript
const el = document.createElement('div');
el.innerHTML = '&copy; 2024';
document.body.appendChild(el);
```

### Error 41: appendChild with document fragment after use
**Description:** Reuse a document fragment
```javascript
const fragment = document.createDocumentFragment();
const div = document.createElement('div');
fragment.appendChild(div);
document.body.appendChild(fragment);
fragment.appendChild(document.createElement('span'));
```

### Error 42: Dataset boolean attributes
**Description:** Check if data attribute is present
```javascript
const el = document.querySelector('[data-visible]');
if (el.dataset.visible) {
  console.log('Visible');
}
```

### Error 43: classList.value
**Description:** Get all classes as a string
```javascript
const el = document.querySelector('.item.active');
console.log(el.classList.value);
```

### Error 44: createElement with table elements
**Description:** Create a table row
```javascript
const tr = document.createElement('tr');
const td = document.createElement('td');
td.textContent = 'Cell';
tr.appendChild(td);
document.body.appendChild(tr);
```

### Error 45: appendChild with text node from variable
**Description:** Add text after an element
```javascript
const el = document.querySelector('.target');
const text = 'Some text';
el.appendChild(text);
```

### Error 46: Dataset changes not reflecting in HTML
**Description:** Update data attribute via dataset
```javascript
const el = document.querySelector('[data-role]');
el.dataset.role = 'admin';
console.log(el.getAttribute('data-role'));
```

### Error 47: classList for measuring
**Description:** Use classList length in condition
```javascript
const el = document.querySelector('.item');
if (el.classList.length > 0) {
  console.log('Has classes');
}
```

### Error 48: createElement with comment node
**Description:** Create a comment
```javascript
const comment = document.createElement('<!-- comment -->');
document.body.appendChild(comment);
```

### Error 49: appendChild cyclic reference
**Description:** Try to append element to itself
```javascript
const el = document.createElement('div');
el.textContent = 'Self';
el.appendChild(el);
```

### Error 50: Dataset on detached element
**Description:** Set dataset on element not in DOM
```javascript
const el = document.createElement('div');
el.dataset.test = 'value';
console.log(el.outerHTML);
```

### Error 51: classList.add missing argument
**Description:** Add a class with no argument
```javascript
const el = document.querySelector('.box');
el.classList.add();
```

### Error 52: createElement with doctype
**Description:** Create a doctype node
```javascript
const doctype = document.createElement('!DOCTYPE html');
document.appendChild(doctype);
```

### Error 53: appendChild to comment node
**Description:** Append to a comment
```javascript
const comment = document.createComment('comment');
const div = document.createElement('div');
comment.appendChild(div);
```

### Error 54: Dataset numeric keys
**Description:** Access data attribute with number
```javascript
const el = document.querySelector('[data-1]');
console.log(el.dataset.1);
```

### Error 55: classList on text node
**Description:** Add class to a text node
```javascript
const container = document.querySelector('.container');
const textNode = container.firstChild;
textNode.classList.add('highlight');
```

### Error 56: createElement with fragment children
**Description:** Create element and add fragment children
```javascript
const parent = document.createElement('div');
const frag = document.createDocumentFragment();
const child = document.createElement('span');
frag.appendChild(child);
parent.appendChild(frag);
parent.appendChild(frag);
```

### Error 57: appendChild in document.write
**Description:** Use appendChild during document.write
```javascript
document.write('<div id="temp"></div>');
const div = document.querySelector('#temp');
const span = document.createElement('span');
div.appendChild(span);
```

### Error 58: Dataset with null value
**Description:** Set data attribute to null
```javascript
const el = document.querySelector('[data-test]');
el.dataset.test = null;
console.log(el.dataset.test);
```

### Error 59: classList for attribute selectors
**Description:** Select by partial class
```javascript
const el = document.querySelector('[class~="icon-"]');
el.classList.add('active');
```

### Error 60: createElement with processing instruction
**Description:** Create a processing instruction
```javascript
const pi = document.createElement('?xml version="1.0"?');
document.appendChild(pi);
```

### Error 61: appendChild after document fragment
**Description:** Add fragment and then single element
```javascript
const container = document.querySelector('.container');
const frag = document.createDocumentFragment();
frag.appendChild(document.createElement('div'));
container.appendChild(frag);
container.appendChild(frag);
```

### Error 62: Dataset proxy behavior
**Description:** Delete a data attribute
```javascript
const el = document.querySelector('[data-temp]');
delete el.dataset.temp;
console.log(el.dataset.temp);
```

### Error 63: classList multiple toggle
**Description:** Toggle two classes independently
```javascript
const el = document.querySelector('.item');
el.classList.toggle('a', 'b');
```

### Error 64: createElement with html tag name
**Description:** Create element from HTML string
```javascript
const html = '<div><p>Text</p></div>';
const el = document.createElement(html);
document.body.appendChild(el);
```

### Error 65: appendChild with template content
**Description:** Append template content
```javascript
const template = document.querySelector('template');
const clone = template.content.cloneNode(true);
document.body.appendChild(clone);
```

### Error 66: Dataset when attribute not set
**Description:** Get unset data attribute
```javascript
const el = document.querySelector('.box');
console.log(el.dataset.nonexistent);
```

### Error 67: classList.replace with regex
**Description:** Replace classes matching pattern
```javascript
const el = document.querySelector('.item');
el.classList.replace(/^icon-/, 'icon-new');
```

### Error 68: createElement with namespaced attributes
**Description:** Create element with XML namespace
```javascript
const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
el.setAttribute('cx', '10');
document.body.appendChild(el);
```

### Error 69: appendChild return value misconception
**Description:** Use return value of appendChild
```javascript
const parent = document.querySelector('.parent');
const child = document.createElement('div');
const returned = parent.appendChild(child);
returned.textContent = 'Returned';
```

### Error 70: Dataset with conflicting name
**Description:** Access data-class attribute
```javascript
const el = document.querySelector('[data-class]');
console.log(el.dataset.class);
```

---

### Issue 1: Using className instead of classList
**Description:** Toggle between active and inactive
```javascript
if (isActive) {
  el.className = 'active';
} else {
  el.className = 'inactive';
}
```

### Issue 2: Not caching DOM queries for repeated access
**Description:** Get an element multiple times
```javascript
document.querySelector('.item').textContent = 'First';
document.querySelector('.item').style.color = 'red';
document.querySelector('.item').classList.add('updated');
```

### Issue 3: Inconsistent naming of IDs
**Description:** Name related elements
```javascript
<div id="card-header">
<div id="cardBody">
<div id="card_footer">
```

### Issue 4: Using innerHTML to create elements
**Description:** Dynamically add content
```javascript
container.innerHTML += '<div class="new-item"><span>Content</span></div>';
```

### Issue 5: Direct style manipulation vs classes
**Description:** Style a success message
```javascript
message.style.backgroundColor = 'green';
message.style.color = 'white';
message.style.padding = '10px';
message.style.borderRadius = '4px';
```

### Issue 6: Forgetting to use createDocumentFragment
**Description:** Bulk add 500 items
```javascript
for (let i = 0; i < 500; i++) {
  const li = document.createElement('li');
  li.textContent = 'Item ' + i;
  list.appendChild(li);
}
```

### Issue 7: Script in head without defer
**Description:** Create elements at page load
```javascript
const container = document.querySelector('.container');
const heading = document.createElement('h1');
heading.textContent = 'Dynamic Title';
container.appendChild(heading);
```

### Issue 8: Missing type="module" for imports
**Description:** Import a DOM utility
```javascript
import { createElement } from './domUtils.js';
const div = createElement('div', { class: 'box' });
```

### Issue 9: Using setAttribute for class
**Description:** Set class attribute
```javascript
el.setAttribute('class', 'highlight');
```

### Issue 10: Not removing children before re-render
**Description:** Replace all children
```javascript
container.innerHTML = '';
data.forEach(item => {
  const div = document.createElement('div');
  div.textContent = item;
  container.appendChild(div);
});
```

### Issue 11: Using appendChild in a read-only tree
**Description:** Append to a frozen element
```javascript
const el = Object.freeze(document.querySelector('.frozen'));
const child = document.createElement('div');
el.appendChild(child);
```

### Issue 12: Creating the same element multiple times
**Description:** Create the same button on each render
```javascript
function render() {
  const btn = document.createElement('button');
  btn.textContent = 'Click';
  container.innerHTML = '';
  container.appendChild(btn);
}
```

### Issue 13: Not using textContent for security
**Description:** Display user input
```javascript
const userInput = '<script>alert("xss")</script>';
const display = document.createElement('div');
display.innerHTML = userInput;
```

### Issue 14: Using outerHTML to replace
**Description:** Replace an element with a new one
```javascript
const old = document.querySelector('.old');
old.outerHTML = '<div class="new">Replaced</div>';
```

### Issue 15: Not checking for null before creating
**Description:** Create child for potentially null parent
```javascript
const parent = document.querySelector('.optional-parent');
const child = document.createElement('div');
parent.appendChild(child);
```

### Issue 16: Confusing firstChild and firstElementChild
**Description:** Get first child element
```javascript
const first = container.firstChild;
first.style.display = 'none';
```

### Issue 17: Using insertBefore with null
**Description:** Insert at end of list
```javascript
list.insertBefore(newItem, null);
```

### Issue 18: Not handling DOMException from appendChild
**Description:** Try to append invalid node type
```javascript
try {
  document.body.appendChild(document);
} catch(e) {
  console.log('Cannot append document');
}
```

### Issue 19: Reusing a removed element
**Description:** Remove and re-add element with events
```javascript
const el = document.querySelector('#widget');
el.remove();
el.addEventListener('click', handler);
document.body.appendChild(el);
```

### Issue 20: Using contains incorrectly
**Description:** Check if element is inside container
```javascript
const container = document.querySelector('.container');
const el = document.querySelector('.inside');
if (container.contains(el)) {
  console.log('Inside');
}
```

### Issue 21: Not using closest for parent traversal
**Description:** Find parent with specific class
```javascript
const btn = document.querySelector('.btn');
const card = btn.parentElement.parentElement;
```

### Issue 22: Comparing elements with ==
**Description:** Check if two references are the same element
```javascript
if (el1 == el2) {
  console.log('Same element');
}
```

### Issue 23: Using childElementCount without understanding
**Description:** Count child elements
```javascript
console.log(container.children.length);
```

### Issue 24: Not using after/before modern methods
**Description:** Insert element before another
```javascript
parent.insertBefore(newEl, refEl.nextSibling);
```

### Issue 25: Using append with strings
**Description:** Add text to container
```javascript
container.append('<p>string</p>');
```

### Issue 26: Confusing prepend and append
**Description:** Add element at the beginning
```javascript
container.append(newEl);
```

### Issue 27: Using replaceChildren without args
**Description:** Clear all children
```javascript
container.replaceChildren();
```

### Issue 28: Not handling template elements
**Description:** Clone template content
```javascript
const template = document.querySelector('#card-template');
const clone = template.content.cloneNode(true);
container.appendChild(clone);
```

### Issue 29: Using children on non-element parent
**Description:** Get children of document fragment
```javascript
const frag = document.createDocumentFragment();
console.log(frag.children);
```

### Issue 30: Not using isConnected
**Description:** Check if element is in DOM
```javascript
const el = document.createElement('div');
if (el.isConnected) {
  console.log('In DOM');
}
```

---

### Modify 1: Use createElement and appendChild instead of innerHTML
**Description:** Add a new paragraph with bold text
```javascript
const container = document.querySelector('.content');
container.innerHTML = '<p><strong>Important</strong> notice</p>';
```

### Modify 2: Fix the classList.add with multiple classes
**Description:** Add three classes to an element
```javascript
const el = document.querySelector('.card');
el.classList.add('highlight visible active');
```

### Modify 3: Fix the dataset property access
**Description:** Get the data-user-role value
```javascript
const el = document.querySelector('[data-user-role]');
console.log(el.dataset.userRole);
```

### Modify 4: Create a document fragment for batch adds
**Description:** Add 100 list items efficiently
```javascript
const list = document.querySelector('#largeList');
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = 'Row ' + i;
  list.appendChild(li);
}
```

### Modify 5: Fix the className overwriting existing classes
**Description:** Add 'active' class without removing existing ones
```javascript
const el = document.querySelector('.item');
el.className = 'active';
```

### Modify 6: Use classList.toggle with condition
**Description:** Toggle 'dark' class based on isDark variable
```javascript
const el = document.querySelector('.theme');
const isDark = true;
if (isDark) {
  el.classList.add('dark');
} else {
  el.classList.remove('dark');
}
```

### Modify 7: Fix the createElement method name typo
**Description:** Create a div element
```javascript
const div = document.creatElement('div');
div.textContent = 'Hello';
document.body.appendChild(div);
```

### Modify 8: Use the append method for multiple elements
**Description:** Add two spans to a div
```javascript
const container = document.querySelector('.container');
const span1 = document.createElement('span');
const span2 = document.createElement('span');
container.appendChild(span1);
container.appendChild(span2);
```

### Modify 9: Fix the dataset value type
**Description:** Increment a numeric data attribute
```javascript
const el = document.querySelector('[data-counter]');
el.dataset.counter = el.dataset.counter + 1;
```

### Modify 10: Use replaceChildren to update content
**Description:** Replace all children with new content
```javascript
const container = document.querySelector('.dynamic-content');
container.innerHTML = '';
const newDiv = document.createElement('div');
newDiv.textContent = 'New content';
container.appendChild(newDiv);
```

### Modify 11: Fix the classList.contains check
**Description:** Only add class if not already present
```javascript
const el = document.querySelector('.item');
el.classList.add('highlighted');
```

### Modify 12: Use prepend to add at beginning
**Description:** Add an item at the start of a list
```javascript
const list = document.querySelector('#taskList');
const newItem = document.createElement('li');
newItem.textContent = 'Urgent task';
list.appendChild(newItem);
```

### Modify 13: Fix the createElement for SVG namespace
**Description:** Create an SVG rect element
```javascript
const rect = document.createElement('rect');
rect.setAttribute('width', '100');
rect.setAttribute('height', '50');
document.body.appendChild(rect);
```

### Modify 14: Use closest for event delegation
**Description:** Find the parent card when a button is clicked
```javascript
const buttons = document.querySelectorAll('.card .action-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.parentElement.parentElement;
    console.log(card.dataset.id);
  });
});
```

### Modify 15: Fix the text node creation
**Description:** Create a text node and append it
```javascript
const container = document.querySelector('.output');
const text = 'Hello World';
container.appendChild(text);
```

### Modify 16: Use after() to insert after an element
**Description:** Insert a paragraph after a heading
```javascript
const heading = document.querySelector('h2');
const para = document.createElement('p');
para.textContent = 'After heading';
heading.appendChild(para);
```

### Modify 17: Fix the classList.replace for non-existent class
**Description:** Replace 'old' with 'new' safely
```javascript
const el = document.querySelector('.box');
el.classList.replace('old', 'new');
```

### Modify 18: Use removeChild to clear a container
**Description:** Remove all children from a div
```javascript
const container = document.querySelector('.clear-me');
container.innerHTML = '';
```

### Modify 19: Fix the element creation with variable tag
**Description:** Create an element from a variable tag name
```javascript
const tagName = 'section';
const el = document.createElement(tagName);
el.textContent = 'Dynamic section';
```

### Modify 20: Use insertAdjacentElement
**Description:** Insert a div after a reference element
```javascript
const ref = document.querySelector('.ref');
const div = document.createElement('div');
div.textContent = 'After ref';
ref.appendChild(div);
```

### Modify 21: Fix the classList.toggle second parameter
**Description:** Toggle 'active' based on condition
```javascript
const el = document.querySelector('.tab');
const shouldBeActive = true;
el.classList.toggle('active', shouldBeActive);
```

### Modify 22: Use the replace method for element swap
**Description:** Replace an old element with a new one
```javascript
const parent = document.querySelector('.container');
const oldEl = document.querySelector('.old');
const newEl = document.createElement('div');
newEl.textContent = 'New element';
parent.removeChild(oldEl);
parent.appendChild(newEl);
```

### Modify 23: Fix the appendChild with fragment reuse
**Description:** Append a fragment once and reuse its content
```javascript
const container = document.querySelector('.list');
const frag = document.createDocumentFragment();
for (let i = 0; i < 3; i++) {
  const li = document.createElement('li');
  frag.appendChild(li);
}
container.appendChild(frag);
container.appendChild(frag);
```

### Modify 24: Use HTML templates to create elements
**Description:** Create cards from a template
```javascript
const container = document.querySelector('.cards');
const data = [{ title: 'Card 1' }, { title: 'Card 2' }];
data.forEach(item => {
  const div = document.createElement('div');
  div.className = 'card';
  div.textContent = item.title;
  container.appendChild(div);
});
```

### Modify 25: Fix the isConnected check
**Description:** Only modify element if it's in the DOM
```javascript
const el = document.querySelector('#maybe-removed');
el.textContent = 'Updated';
```

### Modify 26: Use the children property
**Description:** Get the number of child elements (not nodes)
```javascript
const container = document.querySelector('.container');
const count = container.childNodes.length;
```

### Modify 27: Fix the dataset attribute deletion
**Description:** Remove the data-temp attribute
```javascript
const el = document.querySelector('[data-temp]');
el.dataset.temp = '';
```

### Modify 28: Use firstElementChild instead of firstChild
**Description:** Get the first child element
```javascript
const container = document.querySelector('.container');
const first = container.firstChild;
first.style.color = 'red';
```

### Modify 29: Fix the createElement with namespace
**Description:** Create an SVG circle
```javascript
const circle = document.createElement('circle');
circle.setAttribute('cx', '50');
circle.setAttribute('cy', '50');
circle.setAttribute('r', '20');
```

### Modify 30: Use remove and re-append pattern
**Description:** Move an element to the end of its parent
```javascript
const item = document.querySelector('#moveMe');
const parent = item.parentNode;
parent.removeChild(item);
parent.appendChild(item);
```

### Modify 31: Fix the classList.length check
**Description:** Check if element has any classes
```javascript
const el = document.querySelector('.box');
if (el.className.length > 0) {
  console.log('Has classes');
}
```

### Modify 32: Use the matches() method
**Description:** Check if element matches a selector
```javascript
const el = document.querySelector('.item');
if (el.className === 'item active') {
  console.log('Active');
}
```

### Modify 33: Fix the appendChild with string
**Description:** Add text content to a container
```javascript
const container = document.querySelector('.output');
container.appendChild('Some text');
```

### Modify 34: Use after() and before() methods
**Description:** Insert elements around a reference
```javascript
const ref = document.querySelector('.reference');
const before = document.createElement('div');
const after = document.createElement('div');
ref.parentNode.insertBefore(before, ref);
ref.parentNode.insertBefore(after, ref.nextSibling);
```

### Modify 35: Fix the childNodes iteration
**Description:** Iterate only over element children
```javascript
const container = document.querySelector('.container');
for (let i = 0; i < container.childNodes.length; i++) {
  const child = container.childNodes[i];
  child.style.margin = '10px';
}
```

### Modify 36: Use replaceChildren() to update
**Description:** Replace all children with a new single element
```javascript
const container = document.querySelector('.dynamic');
container.innerHTML = '';
container.appendChild(document.createElement('p'));
```

### Modify 37: Fix the dataset property camelCase conversion
**Description:** Access data-my-value attribute
```javascript
const el = document.querySelector('[data-my-value]');
console.log(el.dataset.myValue);
```

### Modify 38: Use the toggle method for boolean data attributes
**Description:** Toggle data-visible between true and false
```javascript
const el = document.querySelector('.toggle-el');
const current = el.dataset.visible;
el.dataset.visible = current === 'true' ? 'false' : 'true';
```

### Modify 39: Fix the multiple classList.remove calls
**Description:** Remove three classes at once
```javascript
const el = document.querySelector('.box');
el.classList.remove('a');
el.classList.remove('b');
el.classList.remove('c');
```

### Modify 40: Use insertAdjacentHTML for better performance
**Description:** Add a complex HTML string at the end
```javascript
const container = document.querySelector('.content');
container.innerHTML += '<div class="card"><h3>New</h3><p>Content</p></div>';
```

### Modify 41: Fix the element cloning with events
**Description:** Clone a button and preserve functionality
```javascript
const btn = document.querySelector('#actionBtn');
const clone = btn.cloneNode(true);
btn.parentNode.appendChild(clone);
```

### Modify 42: Use the append method with multiple args
**Description:** Add text and element to a container
```javascript
const container = document.querySelector('.output');
const span = document.createElement('span');
span.textContent = 'World';
container.appendChild('Hello ');
container.appendChild(span);
```

### Modify 43: Fix the createElement for custom elements
**Description:** Create a custom element with valid name
```javascript
const el = document.createElement('myElement');
el.textContent = 'Custom';
document.body.appendChild(el);
```

### Modify 44: Use the remove() method
**Description:** Remove an element from the DOM
```javascript
const el = document.querySelector('#deleteMe');
el.parentNode.removeChild(el);
```

### Modify 45: Fix the classList add in conditional
**Description:** Add 'error' class only if hasError is true
```javascript
const el = document.querySelector('.field');
const hasError = true;
if (hasError === true) {
  el.classList.add('error');
}
if (hasError === false) {
  el.classList.remove('error');
}
```

### Modify 46: Use previousElementSibling
**Description:** Get the previous sibling element
```javascript
const current = document.querySelector('.current');
const prev = current.previousSibling;
prev.classList.add('before');
```

### Modify 47: Fix the createElement with DocumentFragment
**Description:** Create a fragment and append children
```javascript
const frag = document.createDocumentFragment();
const p1 = document.createElement('p');
const p2 = document.createElement('p');
frag.appendChild(p1);
frag.appendChild(p2);
```

### Modify 48: Use the error message for dataset validation
**Description:** Check if data-count is a valid number
```javascript
const el = document.querySelector('[data-count]');
const count = el.dataset.count;
if (count) {
  console.log(count * 2);
}
```

### Modify 49: Fix the classList.add for SVG elements
**Description:** Add highlight class to an SVG rect
```javascript
const rect = document.querySelector('rect');
rect.setAttribute('class', 'highlight');
```

### Modify 50: Use the element position methods
**Description:** Insert a paragraph as the first child
```javascript
const container = document.querySelector('.container');
const para = document.createElement('p');
para.textContent = 'First paragraph';
container.appendChild(para);
