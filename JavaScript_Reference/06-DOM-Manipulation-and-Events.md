# JavaScript DOM Manipulation and Events - Complete Reference

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

The Document Object Model (DOM) is a programming interface that represents HTML/XML documents as a tree of nodes. JavaScript interacts with the DOM to dynamically read, modify, add, or remove elements, content, attributes, and styles on a web page. Events are the mechanism by which the browser notifies your code about user interactions, state changes, and other occurrences.

---

## Table of Contents

1. [DOM Tree Structure](#1-dom-tree-structure)
2. [Selecting Elements](#2-selecting-elements)
3. [Creating Elements](#3-creating-elements)
4. [Modifying Elements](#4-modifying-elements)
5. [Attributes](#5-attributes)
6. [CSS Manipulation](#6-css-manipulation)
7. [DOM Traversal](#7-dom-traversal)
8. [DOM Manipulation Methods](#8-dom-manipulation-methods)
9. [Event System](#9-event-system)
10. [Event Object](#10-event-object)
11. [Event Phases](#11-event-phases)
12. [Propagation Control](#12-propagation-control)
13. [Event Delegation Pattern](#13-event-delegation-pattern)
14. [Mouse Events](#14-mouse-events)
15. [Keyboard Events](#15-keyboard-events)
16. [Form Events](#16-form-events)
17. [Touch Events](#17-touch-events)
18. [Drag Events](#18-drag-events)
19. [Clipboard Events](#19-clipboard-events)
20. [Window Events](#20-window-events)
21. [Media Events](#21-media-events)
22. [Animation Events](#22-animation-events)
23. [Transition Events](#23-transition-events)
24. [MutationObserver](#24-mutationobserver)
25. [Range and Selection API](#25-range-and-selection-api)
26. [Accessibility Considerations](#26-accessibility-considerations)
27. [Web Components](#27-web-components)
28. [CSSOM](#28-cssom)
29. [Window vs Document vs Element](#29-window-vs-document-vs-element)
30. [getBoundingClientRect and getClientRects](#30-getboundingclientrect-and-getclientrects)

---

## 1. DOM Tree Structure

### Overview

When a browser loads an HTML page, it creates a **Document Object Model** — a tree-structured representation of the document. Every HTML tag becomes an **element node**, text becomes **text nodes**, and comments become **comment nodes**. The `document` object is the root entry point for all DOM access.

### Node Types

| Node Type | Constant | Description |
|---|---|---|
| Element Node | `Node.ELEMENT_NODE` (1) | An HTML tag (e.g., `<div>`, `<p>`) |
| Text Node | `Node.TEXT_NODE` (3) | Text content between tags |
| Comment Node | `Node.COMMENT_NODE` (8) | `<!-- comment -->` |
| Document Node | `Node.DOCUMENT_NODE` (9) | The root `document` object |
| DocumentFragment | `Node.DOCUMENT_FRAGMENT_NODE` (11) | Lightweight container for batch DOM operations |

### Tree Terminology

- **Root Node**: The topmost node — `HTML` in an HTML document.
- **Parent Node**: A node that contains another node (e.g., `<body>` is the parent of `<div>`).
- **Child Node**: A node directly inside another node (e.g., `<p>` inside `<div>`).
- **Sibling Nodes**: Nodes sharing the same parent.
- **Descendant Node**: Any node nested inside another node at any depth.
- **Ancestor Node**: Any node that contains another node at any depth above it.

### The `document` Object

```javascript
// Entry point to the DOM
document           // Document object (root)
document.documentElement  // <html> element
document.body      // <body> element
document.head      // <head> element
```

### DocumentFragment

A `DocumentFragment` is a lightweight container that holds a subtree of nodes. It is **not** part of the live DOM tree. Changes made to a fragment do not cause reflows until the fragment is appended to the actual DOM.

```javascript
const fragment = document.createDocumentFragment();

// Build up children in memory (no reflows)
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}

// Single reflow when appended
document.getElementById('list').appendChild(fragment);
```

**Use case**: Batch DOM insertions to minimize reflows and repaints.

---

## 2. Selecting Elements

### `getElementById()`

Returns a single element by its `id` attribute. Fastest lookup method.

```javascript
const header = document.getElementById('main-header');
```

### `getElementsByClassName()`

Returns a **live HTMLCollection** of elements matching the class name. Updates automatically when the DOM changes.

```javascript
const items = document.getElementsByClassName('list-item');
// HTMLCollection is array-like, use Array.from() to convert
Array.from(items).forEach(item => console.log(item));
```

### `getElementsByTagName()`

Returns a **live HTMLCollection** of elements matching the tag name.

```javascript
const paragraphs = document.getElementsByTagName('p');
console.log(paragraphs.length);
```

### `querySelector()`

Returns the **first element** matching a CSS selector. Most flexible and recommended for single-element selection.

```javascript
const firstItem = document.querySelector('#list .item');
const form = document.querySelector('form[data-validate]');
```

### `querySelectorAll()`

Returns a **static NodeList** of all elements matching the CSS selector. Unlike HTMLCollection, it is static (does not update when the DOM changes).

```javascript
const allItems = document.querySelectorAll('.list-item');

// Supports forEach natively
allItems.forEach(item => item.classList.add('active'));

// Convert to array for map/filter
const activeItems = Array.from(allItems).filter(el => el.classList.contains('active'));
```

### Comparison Table

| Method | Returns | Live? | Selector Support | Speed |
|---|---|---|---|---|
| `getElementById()` | Single Element | N/A | ID only | Fastest |
| `getElementsByClassName()` | HTMLCollection | Yes | Class name | Fast |
| `getElementsByTagName()` | HTMLCollection | Yes | Tag name | Fast |
| `querySelector()` | Single Element | No | Any CSS selector | Moderate |
| `querySelectorAll()` | NodeList (static) | No | Any CSS selector | Moderate |

### Modern Traversal Helper: `closest()`

`closest()` walks up the DOM tree from the element itself, returning the first ancestor (including itself) matching the selector.

```javascript
const button = event.target.closest('.action-button');
if (button) {
  // Found the button, even if user clicked a child icon
}
```

---

## 3. Creating Elements

### `createElement()`

Creates a new HTML element in memory. The element is **not** part of the DOM until inserted.

```javascript
const div = document.createElement('div');
div.textContent = 'Hello';
div.classList.add('greeting');
document.body.appendChild(div);
```

### `createDocumentFragment()`

Creates a lightweight `DocumentFragment` for batch operations.

```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 50; i++) {
  const li = document.createElement('li');
  li.textContent = `Row ${i}`;
  fragment.appendChild(li);
}
document.querySelector('ul').appendChild(fragment); // Single reflow
```

### `createTextNode()`

Creates a text node containing the specified text.

```javascript
const text = document.createTextNode('Hello World');
const para = document.createElement('p');
para.appendChild(text);
document.body.appendChild(para);
```

### `cloneNode(deep)`

Clones an existing node. Pass `true` for a deep clone (including all children).

```javascript
const original = document.getElementById('card');
const clone = original.cloneNode(true); // deep clone with all children
clone.id = 'card-clone';
document.body.appendChild(clone);
```

---

## 4. Modifying Elements

### `innerHTML`

Gets or sets the HTML content inside an element. Parses HTML strings.

```javascript
// Set HTML content (WARNING: XSS risk with user input)
div.innerHTML = '<strong>Bold</strong> text';

// Get HTML content
const html = div.innerHTML;
```

> **Warning**: `innerHTML` should never be used with untrusted user input as it can inject malicious scripts (XSS). Use `textContent` for plain text.

### `textContent`

Gets or sets the **text content** of all descendants, ignoring HTML tags. Fast and safe.

```javascript
// Set plain text (HTML entities are escaped automatically)
div.textContent = 'Hello <b>World</b>'; // Displays literally, no bold

// Get all text content including hidden elements
const text = div.textContent;
```

### `innerText`

Gets or sets the **visible** text content. Respects CSS styling (skips `display: none` elements). Slower because it requires layout calculation.

```javascript
// Only returns visible text
const visibleText = div.innerText;
```

### `outerHTML`

Gets or sets the HTML **including the element itself**.

```javascript
// Replace entire element with new HTML
div.outerHTML = '<section><p>New content</p></section>';

// Get the element's HTML including itself
const full = div.outerHTML;
```

### Comparison

| Property | Includes HTML | Ignores Hidden | XSS Risk | Speed |
|---|---|---|---|---|
| `innerHTML` | Yes | No | High | Fast |
| `textContent` | No (plain text) | No (includes all) | None | Fastest |
| `innerText` | No (plain text) | Yes (visible only) | None | Slowest |
| `outerHTML` | Yes (element + children) | No | High | Fast |

---

## 5. Attributes

### `getAttribute(name)`

Returns the value of the named attribute, or `null` if not present.

```javascript
const link = document.querySelector('a');
const href = link.getAttribute('href');
```

### `setAttribute(name, value)`

Sets the value of the named attribute. Creates the attribute if it doesn't exist.

```javascript
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');
link.setAttribute('rel', 'noopener noreferrer');
```

### `removeAttribute(name)`

Removes the named attribute from the element.

```javascript
link.removeAttribute('target');
```

### `hasAttribute(name)`

Returns `true` if the element has the named attribute.

```javascript
if (link.hasAttribute('target')) {
  // Opens in new tab
}
```

### Direct Property Access

Common attributes can be accessed as properties on the element:

```javascript
element.id          // id attribute
element.className   // class attribute (space-separated string)
element.classList   // DOMTokenList for class manipulation
element.src         // src attribute
element.href        // href attribute
element.value       // value attribute (for form elements)
element.disabled    // disabled attribute
```

### `dataset` (Data Attributes)

HTML `data-*` attributes are accessible via the `dataset` property. Names are converted from `kebab-case` to `camelCase`.

```html
<div id="card" data-user-id="42" data-role="admin" data-long-name="test">
```

```javascript
const card = document.getElementById('card');

// Read
card.dataset.userId    // "42"
card.dataset.role      // "admin"
card.dataset.longName  // "test"

// Write (creates/updates data attributes)
card.dataset.userId = '99';
card.dataset.newAttr = 'value';

// Delete
delete card.dataset.newAttr;
```

### `attributes` Property

Returns a `NamedNodeMap` of all attributes on the element.

```javascript
const attrs = element.attributes;
for (let i = 0; i < attrs.length; i++) {
  console.log(`${attrs[i].name} = ${attrs[i].value}`);
}
```

---

## 6. CSS Manipulation

### `style` Property (Inline Styles)

Directly read or write inline CSS properties. Property names use **camelCase**.

```javascript
const el = document.querySelector('.box');

// Set styles
el.style.backgroundColor = 'red';
el.style.fontSize = '20px';
el.style.transform = 'rotate(45deg)';

// Read inline styles
console.log(el.style.color);

// Remove a style
el.style.backgroundColor = '';
```

> **Limitation**: Can only access **inline** styles, not computed styles from stylesheets.

### `classList` API

Manages CSS classes without string manipulation. Returns a `DOMTokenList`.

```javascript
const el = document.querySelector('.box');

// Add class(es)
el.classList.add('active');
el.classList.add('active', 'highlighted', 'visible');

// Remove class(es)
el.classList.remove('active');
el.classList.remove('active', 'visible');

// Toggle class (add if absent, remove if present)
el.classList.toggle('active');
el.classList.toggle('active', forceBoolean); // force add/remove

// Check if class exists
el.classList.contains('active'); // true or false

// Replace one class with another
el.classList.replace('old-class', 'new-class');

// Number of classes
el.classList.length;

// Iterate
el.classList.forEach(cls => console.log(cls));
```

### `className` Property

Gets/sets the entire class attribute as a string.

```javascript
el.className;           // "box active highlighted"
el.className = 'box new'; // Replaces ALL classes
```

### `getComputedStyle()`

Returns the **computed (final)** CSS values after all stylesheets and calculations are applied.

```javascript
const el = document.querySelector('.box');
const styles = window.getComputedStyle(el);

console.log(styles.backgroundColor); // "rgb(255, 0, 0)"
console.log(styles.fontSize);        // "16px"
console.log(styles.display);         // "flex"
console.log(styles.transitionDuration); // "0.3s"
```

### CSS Custom Properties (Variables)

```javascript
// Read
const primary = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color');

// Set
document.documentElement.style.setProperty('--primary-color', '#ff0000');
```

### `styleSheets` Access

```javascript
const sheets = document.styleSheets;
for (const sheet of sheets) {
  try {
    const rules = sheet.cssRules || sheet.rules;
    for (const rule of rules) {
      // Inspect or modify CSS rules
    }
  } catch (e) {
    // Cross-origin stylesheets throw SecurityError
  }
}
```

---

## 7. DOM Traversal

### Parent Traversal

```javascript
element.parentNode;     // Parent node (any type)
element.parentElement;  // Parent element (skips text/comment nodes)
```

### Child Traversal

```javascript
element.childNodes;       // NodeList of ALL child nodes (elements, text, comments)
element.children;         // HTMLCollection of child ELEMENTS only
element.firstChild;       // First child node (any type)
element.lastChild;        // Last child node (any type)
element.firstElementChild;  // First child ELEMENT
element.lastElementChild;   // Last child ELEMENT
```

### Sibling Traversal

```javascript
element.nextSibling;          // Next sibling node (any type)
element.previousSibling;      // Previous sibling node (any type)
element.nextElementSibling;   // Next sibling ELEMENT
element.previousElementSibling; // Previous sibling ELEMENT
```

### `closest(selector)`

Walks up the DOM tree from the element, returning the first ancestor (including itself) matching the selector, or `null`.

```javascript
const panel = event.target.closest('.panel');
```

### `matches(selector)`

Checks if the element matches a CSS selector.

```javascript
if (element.matches('.active')) {
  // Element has the 'active' class
}
```

### `compareDocumentPosition(otherNode)`

Returns a bitmask indicating the position relationship between two nodes.

```javascript
const relationship = nodeA.compareDocumentPosition(nodeB);
// Node.DOCUMENT_POSITION_FOLLOWING (4) — B comes after A
// Node.DOCUMENT_POSITION_PRECEDING (2) — B comes before A
// Node.DOCUMENT_POSITION_CONTAINS (8) — A contains B
// Node.DOCUMENT_POSITION_CONTAINED_BY (16) — B contains A
```

---

## 8. DOM Manipulation Methods

### `appendChild(node)`

Appends a node as the **last child** of the parent. If the node already exists in the DOM, it is **moved** (not cloned).

```javascript
parent.appendChild(child);
```

### `prepend(node)`

Inserts nodes at the **beginning** of the parent's children.

```javascript
parent.prepend(child1, child2, 'Text node');
```

### `append(node)`

Appends nodes at the **end** of the parent's children. Accepts multiple arguments and strings (auto-converted to text nodes).

```javascript
parent.append(child1, child2, 'Some text');
```

### `before(node)` / `after(node)`

Inserts nodes **before** or **after** the element in its parent.

```javascript
element.before(newNode);
element.after(newNode);
```

### `removeChild(node)`

Removes a child node from the parent and returns the removed node.

```javascript
const removed = parent.removeChild(child);
```

### `remove()`

Removes the element from the DOM directly (modern, simpler API).

```javascript
element.remove();
```

### `replaceChild(newChild, oldChild)`

Replaces an existing child with a new node. Returns the removed node.

```javascript
parent.replaceChild(newNode, oldNode);
```

### `replaceWith(node)`

Replaces the element with one or more nodes (modern API).

```javascript
element.replaceWith(newNode1, newNode2);
```

### `insertBefore(newNode, referenceNode)`

Inserts `newNode` before `referenceNode` in the parent.

```javascript
parent.insertBefore(newNode, referenceNode);
```

### `cloneNode(deep)`

Clones the element. `deep = true` clones all descendants; `deep = false` clones only the element itself.

```javascript
const clone = element.cloneNode(true);
```

### `adoptNode(node)`

Adopts a node from another document into the current document.

```javascript
const imported = document.adoptNode(nodeFromOtherDocument);
```

### `insertAdjacentHTML(position, htmlString)`

Inserts HTML string at the specified position relative to the element.

```javascript
element.insertAdjacentHTML('beforebegin', '<p>Before element</p>');
element.insertAdjacentHTML('afterbegin', '<p>First child</p>');
element.insertAdjacentHTML('beforeend', '<p>Last child</p>');
element.insertAdjacentHTML('afterend', '<p>After element</p>');
```

### `insertAdjacentElement(position, element)`

Inserts an element at the specified position.

```javascript
element.insertAdjacentElement('beforeend', newDiv);
```

### `insertAdjacentText(position, text)`

Inserts a text node at the specified position.

```javascript
element.insertAdjacentText('beforeend', 'Some text');
```

### Position Diagram

```
beforebegin
  <element>
    afterbegin
      first child
    beforeend
  </element>
afterend
```

---

## 9. Event System

### `addEventListener(type, listener, options)`

The standard way to attach event handlers. Supports multiple listeners per event.

```javascript
button.addEventListener('click', function(event) {
  console.log('Clicked!');
});
```

#### Options Object

```javascript
element.addEventListener('click', handler, {
  capture: false,   // Listen during capture phase (default: false)
  once: true,       // Auto-remove after first trigger
  passive: true,    // Handler won't call preventDefault() (improves scroll perf)
  signal: controller.signal  // AbortController for cleanup
});
```

| Option | Type | Default | Description |
|---|---|---|---|
| `capture` | boolean | `false` | Fire during capture phase |
| `once` | boolean | `false` | Remove listener after one call |
| `passive` | boolean | `false` | Never calls `preventDefault()` |
| `signal` | AbortSignal | `null` | Abort signal for batch cleanup |

### `removeEventListener(type, listener, options)`

Removes a previously added event listener. Requires the **exact same function reference**.

```javascript
function handleClick(e) { console.log(e); }
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick); // Works

// This does NOT work (different function reference):
button.removeEventListener('click', (e) => console.log(e));
```

### `AbortController` for Cleanup

The cleanest way to remove multiple listeners at once:

```javascript
const controller = new AbortController();

window.addEventListener('scroll', handleScroll, { signal: controller.signal });
window.addEventListener('resize', handleResize, { signal: controller.signal });
document.addEventListener('keydown', handleKeydown, { signal: controller.signal });

// Remove ALL listeners at once
controller.abort();
```

### `dispatchEvent(event)`

Manually dispatch a custom or built-in event on an element.

```javascript
const event = new CustomEvent('myEvent', { detail: { id: 42 } });
element.dispatchEvent(event);
```

### Event Handler Properties (Legacy)

```javascript
element.onclick = function(e) { console.log('clicked'); };
// Only one handler per event — overwrites previous
```

### Passive Listeners

Modern browsers default `passive: true` for `wheel`, `mousewheel`, `touchstart`, and `touchmove` on `document`-level nodes to improve scroll performance. If you need to call `preventDefault()`, explicitly set `passive: false`.

```javascript
document.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Only works with passive: false
}, { passive: false });
```

---

## 10. Event Object

Every event handler receives an `Event` object (or a subclass like `MouseEvent`, `KeyboardEvent`, etc.).

### Common Event Properties

| Property | Type | Description |
|---|---|---|
| `type` | string | Event name (e.g., `"click"`) |
| `target` | Element | Element that originated the event |
| `currentTarget` | Element | Element the listener is attached to |
| `timeStamp` | number | Milliseconds since page load |
| `bubbles` | boolean | Does the event bubble? |
| `cancelable` | boolean | Can `preventDefault()` be called? |
| `composed` | boolean | Does the event cross shadow DOM boundary? |
| `defaultPrevented` | boolean | Has `preventDefault()` been called? |
| `isTrusted` | boolean | `true` if triggered by user action, `false` if programmatic |

### Common Event Methods

| Method | Description |
|---|---|
| `preventDefault()` | Cancel the default browser action |
| `stopPropagation()` | Stop event from reaching other elements |
| `stopImmediatePropagation()` | Stop all handlers on the current element too |
| `composedPath()` | Returns the path of elements the event will travel through |

### Mouse/Pointer-Specific Properties

| Property | Description |
|---|---|
| `clientX`, `clientY` | Mouse position relative to viewport |
| `pageX`, `pageY` | Mouse position relative to document |
| `screenX`, `screenY` | Mouse position relative to screen |
| `offsetX`, `offsetY` | Mouse position relative to the target element |
| `button` | Which button was pressed (0=left, 1=middle, 2=right) |
| `buttons` | Bitmask of currently pressed buttons |
| `shiftKey`, `ctrlKey`, `altKey`, `metaKey` | Modifier key states |

### KeyboardEvent-Specific Properties

| Property | Description |
|---|---|
| `key` | Key value (e.g., `"Enter"`, `"a"`, `"ArrowUp"`) |
| `code` | Physical key code (e.g., `"KeyA"`, `"Enter"`) |
| `location` | Key location (0=standard, 1=left, 2=right, 3=numpad) |
| `repeat` | Is this a repeated keydown? |

### `target` vs `currentTarget`

```javascript
// In event delegation, these differ:
parentElement.addEventListener('click', (e) => {
  e.target;        // The actual clicked child element
  e.currentTarget; // parentElement (where listener is)
});
```

---

## 11. Event Phases

Events travel through three phases when they fire:

### Phase 1: Capturing Phase (top-down)

The event travels **down** from `window` → `document` → `<html>` → `<body>` → ... → parent of target.

```javascript
// Listen during capture phase (third arg = true)
grandparent.addEventListener('click', handler, { capture: true });
```

### Phase 2: At Target

The event fires on the **actual target element**.

### Phase 3: Bubbling Phase (bottom-up)

The event travels **up** from the target → parent → grandparent → ... → `document` → `window`.

```javascript
// Listen during bubble phase (default)
parent.addEventListener('click', handler); // capture: false by default
```

### Visual Example

```html
<div id="grandparent">
  <div id="parent">
    <button id="child">Click me</button>
  </div>
</div>
```

```
Capture:   window → document → grandparent → parent → child
Target:    child
Bubble:    child → parent → grandparent → document → window
```

### Key Points

- By default, listeners fire during the **bubble** phase.
- Use `{ capture: true }` to fire during the **capture** phase.
- For the **target** element, both capture and bubble listeners fire in registration order.
- Most event handling uses bubbling; capture is used for intercepting events before they reach the target.

---

## 12. Propagation Control

### `stopPropagation()`

Prevents the event from continuing to propagate to other elements (up or down the tree). Does **not** affect other listeners on the **same element**.

```javascript
child.addEventListener('click', (e) => {
  e.stopPropagation(); // Parent listeners won't fire
});
```

> **Caution**: Overusing `stopPropagation()` can break event delegation, analytics, and other unrelated code.

### `stopImmediatePropagation()`

Prevents the event from propagating **and** prevents any remaining listeners on the **same element** from firing.

```javascript
element.addEventListener('click', (e) => {
  e.stopImmediatePropagation(); // Second handler below won't fire
});
element.addEventListener('click', (e) => {
  console.log('Never reached'); // Blocked
});
```

### `preventDefault()`

Cancels the browser's **default behavior** for the event (e.g., form submission, link navigation, context menu). Does **not** stop propagation.

```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevents form from submitting and page reload
});

link.addEventListener('click', (e) => {
  e.preventDefault(); // Prevents navigation to href
});
```

### `return false` (Only in jQuery / Inline Handlers)

In vanilla JavaScript, `return false` in `addEventListener` has no effect. It only works with `onclick` property handlers and jQuery.

### Summary

| Method | Stops Propagation | Stops Other Handlers on Same Element | Stops Default Behavior |
|---|---|---|---|
| `stopPropagation()` | Yes | No | No |
| `stopImmediatePropagation()` | Yes | Yes | No |
| `preventDefault()` | No | No | Yes |

---

## 13. Event Delegation Pattern

Event delegation leverages **event bubbling** to handle events for many child elements with a **single listener** on a parent.

### Why Use It

1. **Performance**: One listener instead of hundreds/thousands.
2. **Dynamic elements**: Works for elements added after the listener was set up.
3. **Memory efficiency**: Fewer listener references for the garbage collector.

### Basic Pattern

```javascript
// BAD: One listener per item
document.querySelectorAll('.list-item').forEach(item => {
  item.addEventListener('click', handleClick); // Doesn't work for new items
});

// GOOD: Event delegation
document.querySelector('.list').addEventListener('click', (e) => {
  const item = e.target.closest('.list-item');
  if (!item) return; // Click wasn't on a list item
  handleClick(item);
});
```

### Using `closest()` for Reliability

Always use `closest()` instead of checking `e.target.tagName` directly, because clicks may land on child elements (icons, text spans) inside the target.

```javascript
list.addEventListener('click', (e) => {
  const button = e.target.closest('button[data-action]');
  if (!button) return;

  const action = button.dataset.action;
  const id = button.closest('[data-id]').dataset.id;
  performAction(action, id);
});
```

### Data Attribute Pattern

```javascript
// HTML: <button data-action="delete" data-id="42">Delete</button>

document.getElementById('table').addEventListener('click', (e) => {
  const actionEl = e.target.closest('[data-action]');
  if (!actionEl) return;

  switch (actionEl.dataset.action) {
    case 'delete': deleteItem(actionEl.dataset.id); break;
    case 'edit':   editItem(actionEl.dataset.id); break;
  }
});
```

---

## 14. Mouse Events

### Event Types

| Event | Fires When |
|---|---|
| `click` | Left mouse button pressed and released on element |
| `dblclick` | Two rapid clicks |
| `mousedown` | Mouse button pressed (before release) |
| `mouseup` | Mouse button released |
| `mouseenter` | Pointer enters the element (**does not bubble**) |
| `mouseleave` | Pointer leaves the element (**does not bubble**) |
| `mouseover` | Pointer enters element or its child (bubbles) |
| `mouseout` | Pointer leaves element or moves to a child (bubbles) |
| `mousemove` | Pointer moves within element |
| `contextmenu` | Right-click (opens context menu unless prevented) |
| `wheel` | Mouse wheel or trackpad scroll |

### `mouseenter` vs `mouseover`

```javascript
// mouseenter: fires once when pointer enters the element
// Does NOT re-fire when moving between children
element.addEventListener('mouseenter', (e) => {
  console.log('Pointer entered element');
});

// mouseover: fires when pointer enters element OR moves between children
// Bubbles, so parent receives events from children too
element.addEventListener('mouseover', (e) => {
  console.log('Pointer over element or child');
});
```

### `click` Event Sequence

When a left-click occurs, events fire in this order:
1. `mousedown`
2. `mouseup`
3. `click`

### Context Menu

```javascript
element.addEventListener('contextmenu', (e) => {
  e.preventDefault(); // Prevent default context menu
  showCustomMenu(e.clientX, e.clientY);
});
```

---

## 15. Keyboard Events

### Event Types

| Event | Fires When |
|---|---|
| `keydown` | Key is pressed down (fires for every key including modifiers) |
| `keypress` | **Deprecated** — only fired for character-producing keys |
| `keyup` | Key is released |

### Event Order

For a single key press: `keydown` → (possibly `keypress`) → `keyup`

### KeyboardEvent Properties

```javascript
document.addEventListener('keydown', (e) => {
  e.key;      // "Enter", "Escape", "a", "ArrowUp", "F5"
  e.code;     // "Enter", "Escape", "KeyA", "ArrowUp", "F5"
  e.location; // 0=standard, 1=left, 2=right, 3=numpad
  e.repeat;   // true if key is held down

  // Modifier keys
  e.shiftKey; // boolean
  e.ctrlKey;  // boolean
  e.altKey;   // boolean
  e.metaKey;  // boolean (Cmd on Mac, Win on Windows)
});
```

### `key` vs `code`

- `key`: The **character or value** produced (e.g., `"a"`, `"A"`, `"1"` with Shift)
- `code`: The **physical key** on the keyboard (e.g., `"KeyA"`, `"Digit1"`, `"ShiftLeft"`)

### Common Keyboard Patterns

```javascript
// Enter key
if (e.key === 'Enter') submitForm();

// Escape key
if (e.key === 'Escape') closeModal();

// Keyboard shortcut (Ctrl/Cmd + S)
if ((e.ctrlKey || e.metaKey) && e.key === 's') {
  e.preventDefault();
  saveDocument();
}

// Arrow keys
if (e.key === 'ArrowUp') moveSelection(-1);
if (e.key === 'ArrowDown') moveSelection(1);
```

### `beforeinput` Event

Fires before the browser updates the input value. Provides `e.inputType` for the kind of change.

```javascript
input.addEventListener('beforeinput', (e) => {
  if (e.inputType === 'insertText') {
    // Character being typed
  }
});
```

---

## 16. Form Events

### Event Types

| Event | Fires When |
|---|---|
| `submit` | Form is submitted (button click or Enter key) |
| `reset` | Form is reset |
| `input` | Value changes in real-time (every keystroke, paste, etc.) |
| `change` | Value is committed (on blur after change, or checkbox/radio change) |
| `focus` | Element gains focus (**does not bubble**) |
| `blur` | Element loses focus (**does not bubble**) |
| `focusin` | Element gains focus (**bubbles**) |
| `focusout` | Element loses focus (**bubbles**) |
| `invalid` | Form field fails validation |

### Form Submission

```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  if (validate(data)) {
    submitToServer(data);
  }
});
```

### Real-Time Input Validation

```javascript
input.addEventListener('input', (e) => {
  const value = e.target.value;
  if (value.length < 3) {
    showError('Minimum 3 characters');
  } else {
    clearError();
  }
});
```

### `input` vs `change`

```javascript
// input: fires on every keystroke, paste, cut, drag-drop
input.addEventListener('input', (e) => {
  console.log('Current value:', e.target.value);
});

// change: fires when value is committed (blur after change) or for checkbox/radio
input.addEventListener('change', (e) => {
  console.log('Final value:', e.target.value);
});
```

### Form Data API

```javascript
const form = document.getElementById('myForm');
const formData = new FormData(form);

// Iterate entries
for (const [key, value] of formData.entries()) {
  console.log(`${key}: ${value}`);
}

// Convert to object
const data = Object.fromEntries(formData);

// Append additional data
formData.append('timestamp', Date.now());
```

---

## 17. Touch Events

Touch events provide low-level APIs for interpreting finger or stylus activity on touch screens.

### Event Types

| Event | Fires When |
|---|---|
| `touchstart` | Touch point is placed on the surface |
| `touchmove` | Touch point moves across the surface |
| `touchend` | Touch point is removed from the surface |
| `touchcancel` | Touch is interrupted (e.g., phone call, too many fingers) |

### TouchEvent Properties

```javascript
element.addEventListener('touchstart', (e) => {
  e.touches;         // TouchList — all current touch points on screen
  e.targetTouches;   // TouchList — touch points on the target element
  e.changedTouches;  // TouchList — touch points that changed in this event
});
```

### Touch Interface Properties

```javascript
const touch = e.changedTouches[0];
touch.identifier;  // Unique ID for the touch point
touch.target;      // Element the touch started on
touch.clientX;     // X position relative to viewport
touch.clientY;     // Y position relative to viewport
touch.pageX;       // X position relative to document
touch.pageY;       // Y position relative to document
touch.screenX;     // X position relative to screen
touch.screenY;     // Y position relative to screen
touch.radiusX;     // X radius of touch area (elliptical touch)
touch.force;       // Pressure (0.0 to 1.0)
```

### Basic Touch Handling

```javascript
element.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevent scrolling during drag
  const touch = e.changedTouches[0];
  startX = touch.clientX;
  startY = touch.clientY;
}, { passive: false }); // Must be false to use preventDefault

element.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const touch = e.changedTouches[0];
  const deltaX = touch.clientX - startX;
  const deltaY = touch.clientY - startY;
  element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}, { passive: false });

element.addEventListener('touchend', (e) => {
  const touch = e.changedTouches[0];
  // Finalize position or trigger snap-back animation
});
```

### Pointer Events (Recommended Alternative)

Pointer Events unify mouse, touch, and pen into a single API:

```javascript
element.addEventListener('pointerdown', handleStart);
element.addEventListener('pointermove', handleMove);
element.addEventListener('pointerup', handleEnd);

// Identify device type
event.pointerType; // "mouse", "touch", or "pen"
```

> **Note**: Touch Events are considered a legacy API. W3C strongly recommends Pointer Events for new applications.

---

## 18. Drag Events

### Event Types

| Event | Fires On | Fires When |
|---|---|---|
| `dragstart` | Draggable element | Drag begins |
| `drag` | Draggable element | Being dragged (every few hundred ms) |
| `dragenter` | Potential drop target | Dragged item enters the element |
| `dragover` | Potential drop target | Dragged item is over the element (every few hundred ms) |
| `dragleave` | Potential drop target | Dragged item leaves the element |
| `drop` | Drop target | Item is dropped |
| `dragend` | Draggable element | Drag ends (success or failure) |

### Making an Element Draggable

```html
<div draggable="true">Drag me</div>
```

### Basic Drag and Drop

```javascript
// Draggable element
const card = document.getElementById('card');

card.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', card.id);
  e.dataTransfer.effectAllowed = 'move';
  card.classList.add('dragging');
});

card.addEventListener('dragend', () => {
  card.classList.remove('dragging');
});

// Drop target
const zone = document.getElementById('drop-zone');

zone.addEventListener('dragover', (e) => {
  e.preventDefault(); // REQUIRED — without this, drop won't fire
  e.dataTransfer.dropEffect = 'move';
  zone.classList.add('is-over');
});

zone.addEventListener('dragleave', () => {
  zone.classList.remove('is-over');
});

zone.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const dragged = document.getElementById(id);
  if (dragged) zone.appendChild(dragged);
  zone.classList.remove('is-over');
});
```

### `dataTransfer` Object

| Property/Method | Description |
|---|---|
| `setData(format, data)` | Store data (only in `dragstart`) |
| `getData(format)` | Retrieve data (only in `drop`) |
| `clearData(format)` | Remove stored data |
| `types` | Available data formats |
| `files` | Files being dragged (for OS file drops) |
| `setDragImage(element, x, y)` | Custom drag preview |
| `effectAllowed` | Allowed operations (`copy`, `move`, `link`, `none`) |
| `dropEffect` | Expected operation at drop target |

### Critical Notes

- You **must** call `e.preventDefault()` in `dragover` for `drop` to fire.
- `dataTransfer` data is only readable in `dragstart` and `drop`.
- HTML5 Drag and Drop does **not** fire touch events on mobile. Use Pointer Events as a fallback.

---

## 19. Clipboard Events

### Event Types

| Event | Fires When |
|---|---|
| `copy` | Content is copied to clipboard |
| `cut` | Content is cut to clipboard |
| `paste` | Content is pasted from clipboard |

### Clipboard API

```javascript
// Copy
document.addEventListener('copy', (e) => {
  e.preventDefault();
  e.clipboardData.setData('text/plain', 'Custom copied text');
});

// Cut
document.addEventListener('cut', (e) => {
  e.preventDefault();
  e.clipboardData.setData('text/plain', 'Custom cut text');
  // Optionally delete selected content
});

// Paste
document.addEventListener('paste', (e) => {
  e.preventDefault();
  const text = e.clipboardData.getData('text/plain');
  input.value += text;
});
```

### Async Clipboard API

```javascript
// Write to clipboard
await navigator.clipboard.writeText('Hello World');

// Read from clipboard
const text = await navigator.clipboard.readText();

// Write rich content
await navigator.clipboard.write([
  new ClipboardItem({
    'text/plain': new Blob(['Plain text'], { type: 'text/plain' }),
    'text/html': new Blob(['<b>Rich text</b>'], { type: 'text/html' })
  })
]);
```

> **Note**: `navigator.clipboard` requires a secure context (HTTPS) and user permission.

---

## 20. Window Events

### Page Lifecycle Events

| Event | Fires When |
|---|---|
| `DOMContentLoaded` | HTML is parsed (scripts, styles may still be loading) |
| `load` | All resources loaded (images, stylesheets, iframes, etc.) |
| `beforeunload` | Page is about to unload (can show confirmation dialog) |
| `unload` | Page is being unloaded |
| `pageshow` | Page is shown (including after back/forward cache) |
| `pagehide` | Page is hidden (navigating away, going to b/f cache) |

```javascript
// Fires when DOM is ready — use this for most initialization
document.addEventListener('DOMContentLoaded', () => {
  // DOM is fully parsed
});

// Fires after ALL resources loaded
window.addEventListener('load', () => {
  // Everything is ready
});

// Warning dialog before leaving
window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = ''; // Required for Chrome
});
```

### Resize Events

```javascript
window.addEventListener('resize', () => {
  console.log(window.innerWidth, window.innerHeight);
});
```

### Scroll Events

```javascript
window.addEventListener('scroll', () => {
  console.log(window.scrollX, window.scrollY);
}, { passive: true }); // Use passive for scroll performance
```

### Error Events

```javascript
window.addEventListener('error', (e) => {
  console.log('Error:', e.message, 'at', e.filename, 'line', e.lineno);
});

window.addEventListener('unhandledrejection', (e) => {
  console.log('Unhandled Promise rejection:', e.reason);
});
```

### Focus Events

```javascript
window.addEventListener('focus', () => {
  console.log('Window gained focus');
});

window.addEventListener('blur', () => {
  console.log('Window lost focus');
});
```

### Hash Change and Popstate

```javascript
window.addEventListener('hashchange', (e) => {
  console.log('Hash changed:', window.location.hash);
});

window.addEventListener('popstate', (e) => {
  console.log('History state:', e.state);
});
```

---

## 21. Media Events

Fired by `<audio>` and `<video>` elements.

### Common Media Events

| Event | Fires When |
|---|---|
| `play` | Playback has started |
| `pause` | Playback has been paused |
| `ended` | Playback has reached the end |
| `loadeddata` | First frame of media has loaded |
| `loadedmetadata` | Metadata (duration, dimensions) has loaded |
| `timeupdate` | Current playback position has changed |
| `progress` | Browser is downloading media |
| `volumechange` | Volume has changed |
| `ratechange` | Playback rate has changed |
| `seeking` | A seek operation has started |
| `seeked` | A seek operation has completed |
| `stalled` | Browser is trying to fetch data but isn't getting any |
| `waiting` | Playback has stopped due to insufficient data |
| `canplay` | Enough data available to start playing |
| `canplaythrough` | Enough data available to play to the end |

```javascript
const video = document.getElementById('myVideo');

video.addEventListener('play', () => {
  console.log('Video started playing');
});

video.addEventListener('timeupdate', () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progress}%`;
});

video.addEventListener('ended', () => {
  showReplayButton();
});
```

---

## 22. Animation Events

Fired by CSS animations using `@keyframes`.

### Event Types

| Event | Fires When |
|---|---|
| `animationstart` | Animation has started |
| `animationend` | Animation has completed |
| `animationiteration` | Animation has completed one iteration (fires again on loop) |

### TransitionEvent Properties

| Property | Description |
|---|---|
| `animationName` | Name of the `@keyframes` animation |
| `elapsedTime` | Time the animation has been running (seconds) |
| `pseudoElement` | Pseudo-element the animation runs on (`::before`, `::after`, or `""`) |

```javascript
const element = document.querySelector('.animated');

element.addEventListener('animationstart', (e) => {
  console.log(`Animation "${e.animationName}" started`);
});

element.addEventListener('animationend', (e) => {
  console.log(`Animation "${e.animationName}" ended after ${e.elapsedTime}s`);
  element.classList.remove('animated');
});

element.addEventListener('animationiteration', (e) => {
  console.log(`Iteration ${e.elapsedTime}s`);
});
```

```css
.animated {
  animation: slide-in 2s ease-in-out;
}

@keyframes slide-in {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
```

---

## 23. Transition Events

Fired when CSS transitions complete.

### Event Types

| Event | Fires When |
|---|---|
| `transitionrun` | Transition is first created (before delay) |
| `transitionstart` | Transition has actually started (after delay) |
| `transitionend` | Transition has completed |
| `transitioncancel` | Transition was canceled |

### TransitionEvent Properties

| Property | Description |
|---|---|
| `propertyName` | Name of the CSS property that transitioned |
| `elapsedTime` | Time the transition has been running (seconds, excludes delay) |
| `pseudoElement` | Pseudo-element the transition runs on |

```javascript
const box = document.querySelector('.box');

box.addEventListener('transitionend', (e) => {
  console.log(`Transition on "${e.propertyName}" ended`);
  console.log(`Duration: ${e.elapsedTime}s`);
  box.classList.remove('transitioning');
});
```

```css
.box {
  width: 100px;
  transition: width 0.5s ease;
}

.box.expanded {
  width: 300px;
}
```

### Key Points

- `transitionend` fires **once per property** that transitions.
- If a transition is removed before completion (e.g., `display: none`), `transitioncancel` fires instead of `transitionend`.
- `transitionend` fires in both directions (to the transitioned state and back).
- If no delay or duration is declared, no transition events fire.

---

## 24. MutationObserver

`MutationObserver` watches for changes in the DOM tree — child additions/removals, attribute changes, and text content changes. It replaces the older (deprecated) `MutationEvents`.

### Creating and Using

```javascript
const observer = new MutationObserver((mutationRecords, observer) => {
  for (const record of mutationRecords) {
    console.log('Type:', record.type);
    console.log('Target:', record.target);
  }
});

observer.observe(targetNode, {
  childList: true,       // Watch for added/removed child nodes
  subtree: true,         // Watch the entire subtree
  attributes: true,      // Watch attribute changes
  attributeFilter: ['class', 'style'], // Only watch specific attributes
  attributeOldValue: true, // Include old attribute values
  characterData: true,   // Watch text content changes
  characterDataOldValue: true // Include old text values
});
```

### Configuration Options

| Option | Type | Description |
|---|---|---|
| `childList` | boolean | Watch for child node additions/removals |
| `subtree` | boolean | Extend to all descendants |
| `attributes` | boolean | Watch attribute changes |
| `attributeFilter` | string[] | Specific attributes to watch |
| `attributeOldValue` | boolean | Record previous attribute value |
| `characterData` | boolean | Watch text node content changes |
| `characterDataOldValue` | boolean | Record previous text content |

### MutationRecord Properties

| Property | Description |
|---|---|
| `type` | `"childList"`, `"attributes"`, or `"characterData"` |
| `target` | Node where mutation occurred |
| `addedNodes` | NodeList of added nodes |
| `removedNodes` | NodeList of removed nodes |
| `previousSibling` | Node before the added/removed node |
| `nextSibling` | Node after the added/removed node |
| `attributeName` | Name of changed attribute |
| `oldValue` | Previous value (if `attributeOldValue`/`characterDataOldValue` is true) |

### Methods

```javascript
// Stop observing
observer.disconnect();

// Get pending records (unprocessed changes)
const records = observer.takeRecords();
```

### Practical Example

```javascript
// Auto-highlight code snippets when they appear in the DOM
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (!(node instanceof HTMLElement)) continue;
      if (node.matches('pre code')) {
        highlightElement(node);
      }
      node.querySelectorAll?.('pre code').forEach(highlightElement);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
```

### Performance Tips

1. **Scope narrowly**: Observe the smallest possible subtree.
2. **Filter aggressively**: Use `attributeFilter` to watch only needed attributes.
3. **Keep callback lightweight**: Batch processing with `queueMicrotask()` or `requestAnimationFrame()`.
4. **Disconnect when done**: Call `observer.disconnect()` when observation is no longer needed.

---

## 25. Range and Selection API

### Selection API

The Selection API represents the user's current text selection or caret position.

```javascript
const selection = window.getSelection(); // or document.getSelection()
```

#### Selection Properties

| Property | Description |
|---|---|
| `anchorNode` | Node where selection starts |
| `anchorOffset` | Offset within anchorNode |
| `focusNode` | Node where selection ends |
| `focusOffset` | Offset within focusNode |
| `isCollapsed` | True if selection is empty (caret) |
| `rangeCount` | Number of ranges in selection |
| `type` | `"None"`, `"Range"`, or `"Caret"` |

#### Selection Methods

```javascript
// Get selected text
const text = selection.toString();

// Check if node is within selection
selection.containsNode(node, allowPartial);

// Collapse selection (make it a caret)
selection.collapse(node, offset);
selection.collapseToStart();
selection.collapseToEnd();

// Modify selection
selection.extend(node, offset);
selection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
selection.selectAllChildren(node);

// Remove selection
selection.removeAllRanges();
selection.deleteFromDocument();

// Add a range
const range = document.createRange();
range.selectNodeContents(element);
selection.removeAllRanges();
selection.addRange(range);
```

### Range API

A `Range` represents a contiguous portion of a document.

```javascript
const range = document.createRange();

// Select an entire element
range.selectNodeContents(element);

// Select specific portion
range.setStart(textNode, 0);
range.setEnd(textNode, 10);

// Manipulate
range.deleteContents();              // Remove selected content
range.extractContents();             // Remove and return as DocumentFragment
range.cloneContents();               // Copy as DocumentFragment
range.insertNode(newNode);           // Insert node at start of range
range.surroundContents(wrapElement); // Wrap range contents with element

// Information
range.collapsed;           // Boolean
range.startContainer;      // Node
range.startOffset;         // Number
range.endContainer;        // Node
range.endOffset;           // Number
range.commonAncestorContainer; // Nearest common ancestor
range.getBoundingClientRect(); // DOMRect of the range
```

### Practical: Copy Selected Content

```javascript
document.addEventListener('copy', (e) => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const fragment = range.cloneContents();
    const container = document.createElement('div');
    container.appendChild(fragment);
    e.clipboardData.setData('text/html', container.innerHTML);
    e.clipboardData.setData('text/plain', selection.toString());
    e.preventDefault();
  }
});
```

### Form Input Selection

```javascript
input.selectionStart;    // Position of selection start (read/write)
input.selectionEnd;      // Position of selection end (read/write)
input.selectionDirection; // "forward", "backward", or "none"

input.select();                          // Select all text
input.setSelectionRange(0, 5);           // Select first 5 characters
input.setRangeText('replacement', 0, 5); // Replace range
```

---

## 26. Accessibility Considerations

### Semantic HTML First

Use native HTML elements for their built-in accessibility:

```html
<!-- Good: native semantics and keyboard behavior -->
<button>Click me</button>
<a href="/page">Link</a>
<nav><ul>...</ul></nav>
<main>...</main>
<header>...</header>
<footer>...</footer>

<!-- Bad: loses semantics, keyboard behavior, and screen reader support -->
<div onclick="...">Click me</div>
<div class="link">Link</div>
```

### ARIA (Accessible Rich Internet Applications)

Use ARIA attributes **only when** native HTML cannot convey the semantics:

```html
<!-- Role -->
<div role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  75%
</div>

<!-- States -->
<button aria-expanded="false" aria-controls="menu-1">Menu</button>
<div id="menu-1" role="menu" hidden>...</div>

<!-- Labels -->
<input type="text" aria-label="Search">
<div aria-labelledby="heading-1">Content</div>

<!-- Live regions (dynamic updates) -->
<div aria-live="polite" aria-atomic="true">
  <!-- Updates announced to screen readers -->
  3 items in cart
</div>

<!-- Hidden from assistive tech -->
<div aria-hidden="true">Decorative content</div>
```

### Keyboard Navigation

```javascript
// Make custom widgets keyboard-accessible
widget.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault();
      activateWidget();
      break;
    case 'Escape':
      closeWidget();
      break;
    case 'ArrowDown':
      e.preventDefault();
      moveFocusToNext();
      break;
    case 'ArrowUp':
      e.preventDefault();
      moveFocusToPrevious();
      break;
  }
});
```

### Focus Management

```javascript
// Trap focus in a modal
function trapFocus(modal) {
  const focusable = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
```

### Motion and Animation Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Dynamic Content

```javascript
// Announce status updates to screen readers
const status = document.getElementById('live-status');
status.textContent = 'Form submitted successfully'; // Announced by screen reader
```

### Key ARIA Rules

1. **Don't use ARIA if native HTML works** — `<button>` beats `<div role="button">`.
2. **All interactive elements must be keyboard accessible** — focusable and operable.
3. **Don't hide focusable elements** with `display: none` or `aria-hidden="true"`.
4. **Maintain focus order** that matches visual order.
5. **Use `aria-live`** for dynamic content updates that screen readers should announce.

---

## 27. Web Components

Web Components are a suite of browser-native APIs for creating reusable, encapsulated custom HTML elements.

### Three Pillars

1. **Custom Elements** — Define new HTML tags with custom behavior.
2. **Shadow DOM** — Encapsulated DOM and CSS tree.
3. **HTML Templates** — Inert markup for reusable structures.

### Custom Elements

```javascript
class MyCounter extends HTMLElement {
  static get observedAttributes() {
    return ['count'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('button')
      .addEventListener('click', () => this.increment());
  }

  disconnectedCallback() {
    // Cleanup: remove event listeners
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'count' && oldValue !== newValue) {
      this.render();
    }
  }

  get count() {
    return parseInt(this.getAttribute('count')) || 0;
  }

  set count(val) {
    this.setAttribute('count', val);
  }

  increment() {
    this.count = this.count + 1;
    this.dispatchEvent(new CustomEvent('count-change', {
      detail: { count: this.count },
      bubbles: true
    }));
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button { padding: 8px 16px; cursor: pointer; }
      </style>
      <button>Count: ${this.count}</button>
    `;
  }
}

customElements.define('my-counter', MyCounter);
```

```html
<my-counter count="0"></my-counter>
```

### Lifecycle Callbacks

| Callback | Fires When |
|---|---|
| `constructor()` | Element is created (not yet in DOM) |
| `connectedCallback()` | Element is inserted into the DOM |
| `disconnectedCallback()` | Element is removed from the DOM |
| `attributeChangedCallback(name, old, new)` | Observed attribute changes |
| `adoptedCallback()` | Element is moved to a new document |

### Shadow DOM

```javascript
class MyComponent extends HTMLElement {
  constructor() {
    super();
    // mode: 'open' allows external JS access via .shadowRoot
    // mode: 'closed' hides .shadowRoot (not a security boundary)
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Styles are scoped — won't leak out */
        :host { display: block; padding: 16px; }
        p { color: navy; }
      </style>
      <p><slot>Default content</slot></p>
    `;
  }
}

customElements.define('my-component', MyComponent);
```

### Slots (Content Projection)

```html
<my-card>
  <span slot="title">Card Title</span>
  <p>Default slot content</p>
</my-card>
```

```javascript
// Inside shadow root:
this.shadowRoot.innerHTML = `
  <h2><slot name="title"></slot></h2>
  <div class="body"><slot></slot></div>
`;
```

### `::slotted()` and `:host`

```css
/* Inside shadow root */
:host { display: block; }
:host(.large) { padding: 32px; }

::slotted([slot="title"]) {
  font-weight: bold;
  color: navy;
}
```

### Cross-Boundary Styling

CSS custom properties (variables) pierce the Shadow DOM boundary:

```css
/* External page */
my-component { --component-color: red; }

/* Inside shadow root */
p { color: var(--component-color, navy); }
```

### `<template>` and `<slot>`

```html
<template id="card-template">
  <style>
    .card { border: 1px solid #ccc; border-radius: 8px; padding: 16px; }
  </style>
  <div class="card">
    <h2><slot name="title"></slot></h2>
    <div><slot></slot></div>
  </div>
</template>
```

```javascript
class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.getElementById('card-template');
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
```

### Form-Associated Custom Elements

```javascript
class MyInput extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  set value(val) {
    this.internals.setFormValue(val);
  }
}
```

### Framework Interop

- **React 19+**: Native custom element support (properties and events).
- **Vue/Angular/Svelte**: All support custom elements natively.
- **React 18**: Use `ref` callbacks to set properties on custom elements.

---

## 28. CSSOM (CSS Object Model)

The CSSOM is the browser's representation of CSS styles, complementing the DOM.

### `document.styleSheets`

```javascript
const sheets = document.styleSheets;
for (const sheet of sheets) {
  console.log(sheet.href);      // Stylesheet URL (or null for inline)
  console.log(sheet.disabled);  // Is it disabled?
  console.log(sheet.rules);     // CSSRuleList (use .cssRules in standards mode)
}
```

### `getComputedStyle()`

Returns the final computed styles after all inheritance and cascade.

```javascript
const el = document.querySelector('.box');
const cs = window.getComputedStyle(el);

cs.backgroundColor;    // "rgb(255, 0, 0)"
cs.fontSize;           // "16px"
cs.transitionDuration; // "0.3s"
cs.display;            // "flex"
cs.getPropertyValue('--custom-var'); // Custom property value
```

### CSS Custom Properties

```javascript
// Read
const color = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color');

// Write
document.documentElement.style.setProperty('--primary-color', '#ff5500');

// Delete
document.documentElement.style.removeProperty('--primary-color');
```

### Constructible Stylesheets

```javascript
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  .highlight { background: yellow; }
  .hidden { display: none; }
`);

// Apply to document
document.adoptedStyleSheets = [sheet];

// Apply to shadow root
shadowRoot.adoptedStyleSheets = [sheet];

// Mutate (propagates to all adopters)
sheet.replaceSync('.highlight { background: lime; }');
```

### `element.computedStyleMap()`

Modern API for batch computed style access:

```javascript
const styles = el.computedStyleMap();
const fontSize = styles.get('font-size');    // CSSUnitValue
const display = styles.get('display');       // CSSKeywordValue
```

### Scroll-Related Properties

```javascript
window.scrollX;        // Horizontal scroll position
window.scrollY;        // Vertical scroll position
document.scrollingElement; // The element that scrolls (usually document.documentElement)

el.scrollTop;          // Element's scroll position
el.scrollHeight;       // Total scrollable height
el.clientHeight;       // Visible height (excluding scrollbar)
el.scrollIntoView({ behavior: 'smooth' }); // Scroll element into view
```

---

## 29. Window vs Document vs Element

### `window`

The `window` object represents the **browser tab/window**. It is the global scope in browsers.

```javascript
window.innerWidth;       // Viewport width
window.innerHeight;      // Viewport height
window.outerWidth;       // Browser window width
window.outerHeight;      // Browser window height
window.location;         // Current URL
window.history;          // Browser history
window.localStorage;     // Local storage
window.sessionStorage;   // Session storage
window.fetch;            // Fetch API
window.setTimeout();     // Timer
window.requestAnimationFrame(); // Animation frame
window.console;          // Console
window.navigator;        // Browser info
window.document;         // The Document object
```

### `document`

The `document` object represents the **HTML document** inside the window. It is the entry point to the DOM.

```javascript
document.title;           // Page title
document.body;            // <body> element
document.head;            // <head> element
document.documentElement; // <html> element
document.cookie;          // Cookies
document.domain;          // Document domain
document.URL;             // Document URL
document.readyState;      // "loading", "interactive", or "complete"
document.all;             // All elements (deprecated, always falsy)
document.styleSheets;     // CSSStyleSheets
```

### `element`

Represents a single DOM element. Inherits from `Node` → `Element` → `HTMLElement` → specific element types.

```javascript
element.tagName;          // "DIV", "P", etc. (uppercase)
element.id;               // ID attribute
element.className;        // Space-separated class string
element.classList;        // DOMTokenList
element.dataset;          // Data attributes
element.innerHTML;        // HTML content
element.textContent;      // Text content
element.style;            // CSSStyleDeclaration (inline styles)
element.attributes;       // NamedNodeMap
element.parentNode;       // Parent node
element.children;         // Child elements
element.getBoundingClientRect(); // Position and size
```

### Relationship

```
window
├── document (HTML document)
│   ├── documentElement (<html>)
│   │   ├── head
│   │   └── body
│   │       ├── div#app
│   │       ├── p.intro
│   │       └── ...
├── navigator (browser info)
├── history (navigation history)
├── localStorage / sessionStorage
└── console
```

### Key Differences

| Feature | `window` | `document` | `element` |
|---|---|---|---|
| Represents | Browser tab | HTML document | Single element |
| Events | `resize`, `scroll`, `load` | `DOMContentLoaded`, `click` | `click`, `input`, etc. |
| Storage | `localStorage`, `sessionStorage` | `cookie` | — |
| Navigation | `window.location`, `history` | `document.URL` | — |
| DOM Access | `window.document` | `document.querySelector()` | `element.querySelector()` |
| Global Scope | Yes (`window.xxx`) | No | No |

---

## 30. getBoundingClientRect and getClientRects

### `element.getBoundingClientRect()`

Returns a `DOMRect` object with the element's size and position relative to the **viewport**.

```javascript
const rect = element.getBoundingClientRect();

rect.top;      // Distance from viewport top to element top
rect.left;     // Distance from viewport left to element left
rect.bottom;   // Distance from viewport top to element bottom
rect.right;    // Distance from viewport left to element right
rect.width;    // Element width
rect.height;   // Element height
rect.x;        // Same as left
rect.y;        // Same as top
```

### Checking Visibility

```javascript
function isElementVisible(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  );
}
```

### Scroll-Adjusted Position

```javascript
// Position relative to the document (not viewport)
const rect = el.getBoundingClientRect();
const docScrollTop = window.scrollY || document.documentElement.scrollTop;
const docScrollLeft = window.scrollX || document.documentElement.scrollLeft;

const absoluteTop = rect.top + docScrollTop;
const absoluteLeft = rect.left + docScrollLeft;
```

### `element.getClientRects()`

Returns a `DOMRectList` — one rectangle per line box (useful for inline elements that wrap across multiple lines).

```javascript
const rects = element.getClientRects();

console.log(rects.length); // Number of line boxes
for (const rect of rects) {
  console.log(rect.top, rect.left, rect.width, rect.height);
}
```

### Use Case: Highlight Selection Highlight Color

```javascript
// Get the visual selection rectangle for highlighting
function getSelectionRect() {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  return range.getBoundingClientRect();
}
```

### `range.getBoundingClientRect()`

Returns the bounding box of the range's content:

```javascript
const range = document.createRange();
range.selectNodeContents(textNode);
const rect = range.getBoundingClientRect();
```

### `element.scrollIntoView()`

Scrolls the element into the visible area:

```javascript
element.scrollIntoView();                           // Instant
element.scrollIntoView({ behavior: 'smooth' });     // Animated
element.scrollIntoView({ block: 'center' });        // Center vertically
element.scrollIntoView({ block: 'start' });         // Align to top
element.scrollIntoView({ inline: 'nearest' });      // Horizontal alignment
```

### Intersection Observer (Modern Alternative)

For scroll-based visibility detection, prefer `IntersectionObserver`:

```javascript
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      console.log('Element is visible');
    }
  }
}, { threshold: 0.1 });

observer.observe(element);
```

---

## Quick Reference Card

| Task | API |
|---|---|
| Select by ID | `document.getElementById()` |
| Select by CSS | `querySelector()` / `querySelectorAll()` |
| Get/set text | `textContent` (safe) / `innerHTML` (parses HTML) |
| Add/remove class | `classList.add()` / `.remove()` / `.toggle()` |
| Set inline style | `element.style.property` |
| Get computed style | `getComputedStyle(element)` |
| Create element | `document.createElement()` |
| Append to parent | `element.append()` / `.appendChild()` |
| Remove element | `element.remove()` |
| Insert adjacent | `insertAdjacentHTML(position, html)` |
| Clone | `element.cloneNode(true)` |
| Batch insert | `DocumentFragment` |
| Add event | `addEventListener(type, handler, options)` |
| Remove event | `removeEventListener()` / `AbortController` |
| Delegate events | Parent listener + `event.target.closest()` |
| Prevent default | `event.preventDefault()` |
| Stop propagation | `event.stopPropagation()` |
| Custom data | `element.dataset` |
| Watch DOM changes | `MutationObserver` |
| Get element size/position | `getBoundingClientRect()` |
| Observe visibility | `IntersectionObserver` |
| Clipboard | `navigator.clipboard.writeText()` |
| Custom element | `customElements.define()` |
