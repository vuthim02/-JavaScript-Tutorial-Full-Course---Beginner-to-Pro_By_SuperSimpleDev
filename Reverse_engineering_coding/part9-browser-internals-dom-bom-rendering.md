# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

# Part 9 — Browser Internals, DOM, BOM, Events, Forms, Storage, Rendering Pipeline, and Browser APIs

---

# Mission

This part explains how JavaScript interacts with browsers.

Understanding this section deeply is essential before learning:

* React
* Vue.js
* Angular
* Next.js

Modern frameworks are built on top of the browser's APIs.

---

# Overall Browser Architecture

```text
HTML
 │
 ▼ Parse HTML
 │
 ├────→ DOM Tree
 │
CSS
 │
 ▼ Parse CSS
 │
 ├────→ CSSOM Tree
 │
 ▼
Merge DOM + CSSOM
 │
 ├────→ Render Tree
 │
 ▼
Calculate positions
 │
 ├────→ Layout
 │
 ▼
Fill pixels
 │
 ├────→ Paint
 │
 ▼
Stack layers
 │
 ├────→ Composite
 │
 ▼
Output to screen
```

Meanwhile JavaScript interacts with:

```text
DOM (Document Object Model)
BOM (Browser Object Model)
Events (click, keydown, input, etc.)
Storage (localStorage, sessionStorage, cookies)
Network (fetch, XMLHttpRequest, WebSocket)
Timers (setTimeout, setInterval, requestAnimationFrame)
```

---

# Chapter 1 — Browser Object Model (BOM)

## What is BOM?

The BOM represents the browser itself — not the document. It provides objects for interacting with the browser window, navigation, screen, and more.

Main object:

```javascript
window
```

Everything in the browser begins here.

---

## Window as Global Object

```javascript
window.alert("Hello");
```

Usually written:

```javascript
alert("Hello");
```

because `window` is the global object in browsers.

All global variables become properties of `window`:

```javascript
var x = 5;
console.log(window.x); // 5

let y = 10;  // let does NOT create window property
console.log(window.y); // undefined
```

---

## What Window Contains

```text
window.document         ← DOM entry point
window.navigator        ← Browser info
window.location         ← URL
window.history          ← Navigation history
window.screen           ← Display info
window.localStorage     ← Persistent storage
window.sessionStorage   ← Tab-scoped storage
window.setTimeout       ← Timer
window.setInterval      ← Repeated timer
window.fetch            ← HTTP requests
window.console          ← DevTools console
window.Math             ← Math utilities
window.JSON             ← JSON parsing
window.requestAnimationFrame ← Smooth animation
```

---

## Window Properties and Methods

```javascript
// Window dimensions
console.log(window.innerWidth);   // Viewport width (px)
console.log(window.innerHeight);  // Viewport height (px)
console.log(window.outerWidth);   // Browser window width
console.log(window.outerHeight);  // Browser window height

// Scrolling
window.scrollTo(0, 0);            // Scroll to top
window.scrollBy(0, 100);          // Scroll down 100px
window.scrollY;                   // Current vertical scroll position

// Opening/closing windows
const popup = window.open("https://example.com", "name", "width=400,height=300");
popup.close();

// Dialogs
window.alert("Message");          // Alert box
const result = window.confirm("Continue?"); // OK/Cancel → boolean
const input = window.prompt("Name?");       // Text input → string or null
```

---

## Window Events

```javascript
window.addEventListener("load", () => {
    console.log("Page fully loaded (including images)");
});

window.addEventListener("DOMContentLoaded", () => {
    console.log("HTML parsed, DOM ready (images may still load)");
});

window.addEventListener("resize", () => {
    console.log("Window resized to:", window.innerWidth);
});

window.addEventListener("scroll", () => {
    console.log("Scrolled to:", window.scrollY);
});

window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    e.returnValue = "Unsaved changes!"; // Shows confirmation dialog
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this object provided by JavaScript? | Check if it's part of ECMAScript spec. If it starts with `window`, `document`, `navigator` → browser. |
| Or by the browser? | `alert`, `prompt`, `confirm`, `fetch`, `localStorage` are browser APIs, not JS language. |
| Is `window` always the global object? | In browsers, yes. In Web Workers, `self` is the global. In Node.js, `global` is the global. |
| What happens if I override `window.alert`? | You can: `window.alert = () => {}` – but this breaks expected behavior. |

---

# Chapter 2 — DOM (Document Object Model)

## What is the DOM?

DOM = Document Object Model. A tree representation of the HTML document.

HTML:

```html
<h1>Hello</h1>
```

Becomes a tree of objects:

```text
document
 │
 └── html
      │
      └── body
           │
           └── h1
                │
                └── text "Hello"
```

---

## Every Node is an Object

```javascript
console.log(typeof document);          // "object"
console.log(document.nodeType);        // 9 (DOCUMENT_NODE)
console.log(document.documentElement); // <html> element
console.log(document.body);            // <body> element
console.log(document.head);            // <head> element
```

---

## Node Types

| Constant | Value | Represents |
|----------|-------|------------|
| `ELEMENT_NODE` | 1 | HTML element (div, p, h1) |
| `ATTRIBUTE_NODE` | 2 | Attribute (deprecated) |
| `TEXT_NODE` | 3 | Text content |
| `COMMENT_NODE` | 8 | HTML comment `<!-- -->` |
| `DOCUMENT_NODE` | 9 | `document` itself |

```javascript
const div = document.createElement("div");
console.log(div.nodeType === Node.ELEMENT_NODE); // true

const text = document.createTextNode("Hello");
console.log(text.nodeType === Node.TEXT_NODE); // true
```

---

## DOM is Live

If you change the DOM, the page updates immediately:

```javascript
document.body.style.backgroundColor = "red";
// Background turns red instantly
```

But if you hold a reference to a removed element, it stays in memory:

```javascript
const div = document.getElementById("temp");
document.body.removeChild(div);
// div still exists in memory (detached from DOM)
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which HTML element does this object represent? | Check `element.tagName` or `element.id`. |
| Who created it? | The browser parser creates the initial DOM. JavaScript can create/modify more nodes. |
| Is this node attached to the DOM? | Check `document.contains(element)`. If false, it's detached. |
| What node type is this? | Check `element.nodeType`. |

---

# Chapter 3 — Selecting Elements

## By ID

```javascript
document.getElementById()
```

Example:

```javascript
let title =
document.getElementById("heading");
```

Returns one element (or `null` if not found).

---

## By Class

```javascript
document.getElementsByClassName()
```

Returns a live `HTMLCollection`.

```javascript
const boxes = document.getElementsByClassName("box");
console.log(boxes.length); // Number of elements with class "box"
```

**Live** = if the DOM changes after selection, the collection updates automatically.

---

## By Tag

```javascript
document.getElementsByTagName()
```

Also returns a live `HTMLCollection`.

```javascript
const paragraphs = document.getElementsByTagName("p");
```

---

## Modern: querySelector

```javascript
document.querySelector()
```

Returns the **first** match. Uses CSS selector syntax.

```javascript
document.querySelector(".box");          // Class
document.querySelector("#heading");      // ID
document.querySelector("div p");         // Descendant
document.querySelector("[data-type]");   // Attribute
document.querySelector("ul > li:first-child"); // Pseudo-class
```

---

## querySelectorAll

```javascript
document.querySelectorAll()
```

Returns a **static** `NodeList` (not live).

```javascript
const items = document.querySelectorAll(".item");
items.forEach(item => console.log(item.textContent));
```

---

## Performance Comparison

| Method | Speed | Returns | Live? |
|--------|-------|---------|-------|
| `getElementById` | Fastest | Element | N/A |
| `getElementsByClassName` | Very fast | HTMLCollection | Yes |
| `getElementsByTagName` | Very fast | HTMLCollection | Yes |
| `querySelector` | Moderate | Element | N/A |
| `querySelectorAll` | Moderate | NodeList | No |

---

## Selecting from a Specific Element

```javascript
const list = document.getElementById("myList");
const firstItem = list.querySelector("li"); // Only searches inside list
const allItems = list.querySelectorAll("li");
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| One element? | Use `getElementById` or `querySelector` (returns one or null). |
| Multiple elements? | Use `querySelectorAll` (NodeList) or `getElementsByClassName` (HTMLCollection). |
| CSS selector? | `querySelector` and `querySelectorAll` accept any CSS selector. |
| Live or static? | `HTMLCollection` is live. `querySelectorAll` returns a static snapshot. |

---

# Chapter 4 — Reading Content

## textContent

Gets or sets the **text** content of an element (ignores HTML tags).

HTML:

```html
<h1>Hello</h1>
```

Read:

```javascript
element.textContent
```

Output:

```text
Hello
```

---

HTML with nested tags:

```html
<div>
    <b>Hello</b>
</div>
```

```javascript
console.log(div.textContent);
// "Hello" (tags removed, only text)
```

---

## innerText vs textContent

```html
<div>
  <span style="display: none;">Hidden</span>
  Visible
</div>
```

```javascript
console.log(element.textContent); // " Hidden\n  Visible" (includes hidden text)
console.log(element.innerText);   // "Visible" (respects CSS, excludes hidden)
```

| Property | Includes hidden text | Includes spacing | Triggers reflow |
|----------|---------------------|------------------|-----------------|
| `textContent` | Yes | Yes | No |
| `innerText` | No | Normalized | Yes (slower) |

---

## innerHTML

Gets or sets HTML markup (including tags).

HTML:

```html
<div>
    <b>Hello</b>
</div>
```

```javascript
console.log(div.innerHTML);
// "<b>Hello</b>"
```

---

## outerHTML

Gets or sets the element **including itself**.

```html
<div id="box"><b>Hello</b></div>
```

```javascript
console.log(box.outerHTML);
// '<div id="box"><b>Hello</b></div>'

box.outerHTML = "<p>Replaced</p>";
// The div is GONE from the DOM, replaced by p
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Plain text? | Use `textContent` (faster, safer). |
| HTML markup? | Use `innerHTML` (but beware of XSS). |
| What is the difference between `textContent` and `innerText`? | `innerText` respects CSS (slower). `textContent` returns all text (faster). |
| Is `innerHTML` safe? | Only if the content is trusted. User input in `innerHTML` = XSS vulnerability. |

---

# Chapter 5 — Modifying Content

## Setting Text

```javascript
title.textContent="Welcome";
```

This replaces all content with plain text. Safe from XSS.

---

## Setting HTML

```javascript
title.innerHTML="<b>Welcome</b>";
```

This parses and inserts HTML. **XSS risk** if content contains user input:

```javascript
// DANGEROUS:
const username = "<script>stealCookies()</script>";
title.innerHTML = "Welcome, " + username; // Script executes!

// SAFE:
title.textContent = "Welcome, " + username; // Text only
```

---

## Inserting Adjacent HTML

```javascript
// Insert before the element
element.insertAdjacentHTML("beforebegin", "<div>Before</div>");

// Insert as first child
element.insertAdjacentHTML("afterbegin", "<div>First child</div>");

// Insert as last child
element.insertAdjacentHTML("beforeend", "<div>Last child</div>");

// Insert after the element
element.insertAdjacentHTML("afterend", "<div>After</div>");
```

More efficient than `innerHTML` += because it does not re-parse the entire element.

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Are tags required? | For `textContent`: no. For `innerHTML`: if you want HTML, yes. |
| Is this vulnerable to XSS? | If you put user input into `innerHTML`, yes. Use `textContent` for untrusted data. |
| What is `insertAdjacentHTML` good for? | Inserting HTML snippets at specific positions without re-parsing the whole element. |

---

# Chapter 6 — Attributes

## Reading and Writing Attributes

HTML:

```html
<img src="cat.jpg">
```

Read:

```javascript
img.getAttribute("src");
```

Set:

```javascript
img.setAttribute(
    "src",
    "dog.jpg"
);
```

Remove:

```javascript
img.removeAttribute(
    "src"
);
```

---

## Properties vs Attributes

Some HTML attributes have corresponding DOM properties:

```html
<input id="email" type="text" value="user@example.com">
```

```javascript
// Attribute access
console.log(input.getAttribute("value")); // "user@example.com" (initial value)

// Property access
console.log(input.value); // Current value (changes as user types)
```

**Key difference:** Properties are **live** (current state). Attributes are **initial** (HTML source). For `value`, `checked`, `disabled`, `selected` — properties reflect current state.

---

## Boolean Attributes

```html
<button disabled>Click</button>
```

```javascript
// Checking boolean attributes
console.log(button.disabled); // true (property)
console.log(button.hasAttribute("disabled")); // true

// Setting
button.disabled = true; // Adds disabled attribute
button.disabled = false; // Removes disabled attribute

// Using setAttribute
button.setAttribute("disabled", ""); // Any value = true
button.removeAttribute("disabled"); // Removes
```

---

## data-* Attributes

```html
<div data-user-id="42" data-role="admin">John</div>
```

```javascript
console.log(div.dataset.userId); // "42" (camelCase!)
console.log(div.dataset.role);   // "admin"

div.dataset.userId = "100";
// Updates data-user-id in HTML
```

---

## class and id Attributes

```javascript
// id
element.id = "newId";

// class (use classList instead of setAttribute)
element.className = "box active"; // Replaces all classes
element.classList.add("highlight");
element.classList.remove("active");
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Property? | `.value`, `.id`, `.disabled` – access current state. |
| Attribute? | `getAttribute("value")` – access initial HTML value. |
| Not always identical. | Property is live; attribute is initial. Check which one you need. |
| How to store custom data? | Use `data-*` attributes and `dataset` property. |

---

# Chapter 7 — Classes

## classList API

The modern way to manage CSS classes.

Add:

```javascript
element.classList.add("active");
```

Remove:

```javascript
element.classList.remove("active");
```

Toggle:

```javascript
element.classList.toggle("active"); // Adds if missing, removes if present
element.classList.toggle("active", condition); // Force add/remove based on condition
```

Contains:

```javascript
element.classList.contains("active"); // true/false
```

---

## Multiple Classes

```javascript
element.classList.add("box", "highlight", "visible");
element.classList.remove("hidden", "inactive");
element.classList.replace("old-class", "new-class");
```

---

## className (Older Way)

```javascript
// Gets all classes as a string
console.log(element.className); // "box active"

// Sets all classes (replaces everything)
element.className = "box highlight"; // Previous classes are lost

// Append to existing
element.className += " highlight";
```

`classList` is preferred because it's more precise and doesn't accidentally wipe existing classes.

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which CSS class changes appearance? | Check the element's `classList` or CSS rules in DevTools Styles panel. |
| How to check if an element has a class? | `element.classList.contains("classname")`. |
| How to toggle a class? | `element.classList.toggle("classname")`. |

---

# Chapter 8 — Creating Elements

## Creating New DOM Nodes

Create:

```javascript
document.createElement()
```

Example:

```javascript
let li =
document.createElement("li");
```

---

## Adding Content

Insert text:

```javascript
li.textContent="Apple";
```

---

## Inserting into DOM

Append (as last child):

```javascript
list.appendChild(li);
```

---

## More Insertion Methods

```javascript
// Append (newer, accepts multiple)
parent.append(li, textNode, "string"); // Can append strings directly

// Prepend
parent.prepend(li); // Insert as first child

// Insert before
parent.insertBefore(li, referenceChild); // Insert before a specific child

// Insert adjacent
reference.insertAdjacentElement("afterend", li);
```

---

## Memory Visualization

```text
Before:
DOM Tree:  ul#list → [empty]

After:
JavaScript: document.createElement("li")
DOM Tree:   ul#list → [in-memory node, not yet attached]

After: list.appendChild(li)
DOM Tree:   ul#list → li "Apple"
```

---

## Creating Text Nodes

```javascript
const textNode = document.createTextNode("Hello");
element.appendChild(textNode);
```

---

## Cloning Nodes

```javascript
const clone = element.cloneNode();      // Shallow clone (no children)
const deepClone = element.cloneNode(true); // Deep clone (including children)
clone.id = "new-id"; // Avoid duplicate IDs
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is element already in HTML? | Check if it's in the original HTML source. If not, it was created dynamically. |
| Or created dynamically? | `document.createElement()` or `innerHTML` assignment. |
| Is the element attached to the DOM? | Check `document.body.contains(element)`. |
| How to move an element? | Just append it to a new parent (it moves, not copies). |

---

# Chapter 9 — Removing Elements

## Modern Way

```javascript
element.remove();
```

Removes the element from the DOM directly.

---

## Parent-Based Removal

```javascript
parent.removeChild(child);
```

Returns the removed child (can be re-inserted later).

---

## Replacing Elements

```javascript
parent.replaceChild(newChild, oldChild);

// Or
oldElement.replaceWith(newElement);
```

---

## Clearing All Children

```javascript
// Slow (one by one)
while (element.firstChild) {
    element.removeChild(element.firstChild);
}

// Faster (removes everything)
element.innerHTML = "";

// Modern
element.replaceChildren(); // Removes all children
element.replaceChildren(newChild1, newChild2); // Replaces with new children
```

---

## Detached Elements (Memory)

```javascript
const div = document.getElementById("temp");
const removed = div.remove();
// div reference still exists → detached node in memory
// If no references remain → garbage collected
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the element still in memory? | If you hold a reference to a removed element, it stays in memory (detached). |
| How to check if an element is in the DOM? | `document.contains(element)` or `element.isConnected`. |
| What happens to event listeners on removed elements? | The element and its listeners are garbage collected if no references remain. |

---

# Chapter 10 — Traversing DOM

## Navigating the DOM Tree

Parent:

```javascript
element.parentElement     // Element parent (excludes text/comment nodes)
element.parentNode        // Any parent node (including document)
```

---

Children:

```javascript
element.children           // HTMLCollection of child elements
element.childNodes         // NodeList of all child nodes (text, comment, element)
element.firstElementChild  // First child element
element.lastElementChild   // Last child element
element.firstChild         // First child node (could be text)
element.lastChild          // Last child node
```

---

Siblings:

```javascript
element.nextElementSibling     // Next sibling element
element.previousElementSibling // Previous sibling element
element.nextSibling            // Next sibling node
element.previousSibling        // Previous sibling node
```

---

## Closest (Traversing Up)

```javascript
// Find nearest ancestor matching a selector
const card = button.closest(".card");
// Traverses up: button → li → div.card (stops at first match)
```

Useful for event delegation to find the relevant parent.

---

## Contains (Check Descendant)

```javascript
// Is child inside parent?
const isInside = parent.contains(child); // true/false
```

---

## Traversal Diagram

```text
         document
            │
          <html>
            │
          <body>
            │
     ┌──────┼──────┐
     │             │
   <header>      <main>
     │             │
   <nav>        <article>
     │             │
   <a>           <section>
                    │
                  <p>
```

```javascript
const article = document.querySelector("article");
console.log(article.parentElement);      // <main>
console.log(article.children);           // [<section>]
console.log(article.previousElementSibling); // <header>
console.log(article.nextElementSibling); // null (no sibling after main)
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Parent? | `element.parentElement` (element) or `element.parentNode` (any node). |
| Child? | `element.children` (elements) or `element.childNodes` (all nodes). |
| Sibling? | `element.nextElementSibling` or `element.previousElementSibling`. |
| How to find the closest ancestor matching a condition? | `element.closest(selector)`. |

---

# Chapter 11 — Events

## Event-Driven Programming

Everything interactive depends on events.

Examples:

```text
click          ← Mouse click
input          ← Typing in input
change         ← Value changed (input, select, checkbox)
keydown        ← Key pressed
keyup          ← Key released
submit         ← Form submitted
mouseover      ← Mouse enters element
mouseout       ← Mouse leaves element
scroll         ← Scrolling
resize         ← Window resized
load           ← Element loaded
DOMContentLoaded ← HTML parsed
focus          ← Element focused
blur           ← Element lost focus
```

---

## Adding Event Listeners

```javascript
button.addEventListener(
    "click",
    handler
);
```

---

## Remove Event Listeners

```javascript
function handler() {
    console.log("Clicked");
}

button.addEventListener("click", handler);

// Later:
button.removeEventListener("click", handler);
// handler will no longer fire
```

Must pass the **same function reference**. Anonymous functions cannot be removed.

---

## One-Time Listener

```javascript
button.addEventListener("click", handler, { once: true });
// Automatically removed after first invocation
```

---

## Passive Listeners

```javascript
// For scroll/touch events: tells browser not to call preventDefault
window.addEventListener("scroll", handler, { passive: true });
// Improves scroll performance
```

---

## Execution Flow

```text
User clicks button
       │
       ▼
Browser detects click event
       │
       ▼
Event goes to macrotask queue
       │
       ▼
Event loop: stack empty? Microtasks drained?
       │
       ▼
Event handler pushed onto stack
       │
       ▼
Handler executes
```

---

## Event Listener Options

```javascript
element.addEventListener(event, handler, {
    capture: false,    // Use capturing phase? (default: false = bubbling)
    once: false,       // Auto-remove after one call?
    passive: false     // Don't call preventDefault? (performance hint)
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Who triggers this event? | User action (click, keypress) or browser (load, DOMContentLoaded) or JS code. |
| User? | Click, keydown, scroll, input. |
| Browser? | Load, DOMContentLoaded, resize. |
| Timer? | setTimeout/setInterval callbacks are events too. |
| Is listener passive? | Check `addEventListener` options. Passive listeners improve scroll performance. |

---

# Chapter 12 — Event Object

## The Event Parameter

When a handler fires, it receives an event object:

```javascript
button.addEventListener(
"click",
function(event)
{
}
);
```

---

## Event Properties

```javascript
button.addEventListener("click", (e) => {
    e.target;          // Element that triggered the event
    e.currentTarget;   // Element the listener is attached to
    e.type;            // "click"
    e.clientX;         // Mouse X (relative to viewport)
    e.clientY;         // Mouse Y (relative to viewport)
    e.pageX;           // Mouse X (relative to document)
    e.pageY;           // Mouse Y (relative to document)
    e.timeStamp;       // Time when event was created
    e.bubbles;         // Does this event bubble? (true for most)
    e.cancelable;      // Can preventDefault() be called?
    e.defaultPrevented; // Was preventDefault() called?
});
```

---

## Keyboard Events

```javascript
document.addEventListener("keydown", (e) => {
    e.key;       // "Enter", "Escape", "a", "A"
    e.code;      // "Enter", "KeyA", "Digit1"
    e.ctrlKey;   // Ctrl held?
    e.shiftKey;  // Shift held?
    e.altKey;    // Alt held?
    e.metaKey;   // Meta (Cmd on Mac, Win on Windows)?
});
```

---

## Mouse Events

```javascript
element.addEventListener("mousedown", (e) => {
    e.button;    // 0 = left, 1 = middle, 2 = right
    e.buttons;   // Bitmask of pressed buttons
    e.clientX;   // X within viewport
    e.clientY;   // Y within viewport
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which element generated event? | `e.target` (the element that was actually clicked/acted upon). |
| Which element is listening? | `e.currentTarget` (the element with addEventListener). |
| What type of event? | `e.type` property. |
| Was default prevented? | `e.defaultPrevented`. |

---

# Chapter 13 — Event Propagation

## Three Phases

When an event occurs on an element, it travels through three phases:

```text
1. Capturing phase:  window → document → ancestors → target's parent
2. Target phase:     the target element itself
3. Bubbling phase:   target's parent → ancestors → document → window
```

---

## Visual Example

```html
<div id="outer">
    <div id="inner">
        <button id="btn">Click</button>
    </div>
</div>
```

Click on button:

```text
Capturing (event travels down):
window → document → body → div#outer → div#inner → button

Target:
button

Bubbling (event travels up):
button → div#inner → div#outer → body → document → window
```

---

## Listening on Capturing Phase

```javascript
// Bubbling phase (default: capture = false)
document.getElementById("outer").addEventListener("click", () => {
    console.log("outer (bubbling)");
});

// Capturing phase (capture = true)
document.getElementById("outer").addEventListener("click", () => {
    console.log("outer (capturing)");
}, true);
```

Order of output when clicking button:

```text
outer (capturing)  ← capturing fires first
button             ← target
outer (bubbling)   ← bubbling fires last
```

---

## stopPropagation

```javascript
button.addEventListener("click", (e) => {
    e.stopPropagation(); // Event stops here. No bubbling up.
    console.log("Button clicked");
});

// Parent listener never fires
document.body.addEventListener("click", () => {
    console.log("Body click"); // Never runs
});
```

---

## stopImmediatePropagation

```javascript
button.addEventListener("click", () => console.log("First"));
button.addEventListener("click", (e) => {
    e.stopImmediatePropagation(); // Stops propagation AND other listeners
    console.log("Second");
});
button.addEventListener("click", () => console.log("Third")); // Never runs

// Output: "First" "Second" (Third is never called)
```

---

## preventDefault vs stopPropagation

```javascript
e.preventDefault();  // Stops browser's default action (navigation, form submit, etc.)
                     // Does NOT stop propagation

e.stopPropagation(); // Stops event from bubbling up
                     // Does NOT prevent default action
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why did parent event execute? | Because the event bubbled up from the child to the parent. |
| Did bubbling occur? | Check if `e.bubbles` is true. Most events bubble (focus, blur, scroll, and load do not). |
| How to stop bubbling? | `e.stopPropagation()`. |
| How to stop all listeners? | `e.stopImmediatePropagation()`. |
| Is the event in capturing or bubbling phase? | `e.eventPhase`: 1 = capturing, 2 = target, 3 = bubbling. |

---

# Chapter 14 — Event Delegation

## The Problem

If you have 1,000 list items, adding a listener to each is wasteful:

```javascript
// BAD: adding 1000 listeners
document.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => handleClick(li));
});
```

---

## The Solution

Use **one** listener on a parent element. The event bubbles up from whatever child was clicked.

```javascript
list.addEventListener(
"click",
e => {
    const li = e.target.closest("li"); // Find the <li> ancestor
    if (li) handleClick(li);
}
);
```

---

## Benefits

```text
Faster:
  - One listener vs thousands
  - Less memory
  - Faster setup

Dynamic elements:
  - New children automatically work (no need to re-attach)
  - Even elements added later are caught

Cleaner:
  - Event logic is centralized
  - Easy to remove (one removeEventListener)
```

---

## Delegation Pattern

```javascript
// HTML: <ul id="list"><li>Item 1</li><li>Item 2</li>...</ul>

document.getElementById("list").addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return; // Not a list item

    console.log("Clicked:", li.textContent);

    // Identify which item
    if (li.dataset.action === "delete") {
        deleteItem(li.dataset.id);
    }
});
```

---

## Delegation with Data Attributes

```html
<ul id="toolbar">
    <li data-action="save">Save</li>
    <li data-action="delete">Delete</li>
    <li data-action="edit">Edit</li>
</ul>
```

```javascript
document.getElementById("toolbar").addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (!action) return;
    
    switch (action) {
        case "save":   saveDocument(); break;
        case "delete": deleteDocument(); break;
        case "edit":   editDocument(); break;
    }
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is listener attached to child? | Direct listener on each element (no delegation). |
| Or parent? | Listener on ancestor, using event.target to find the actual element. |
| What if the clicked element contains child elements? | Use `e.target.closest(selector)` to find the intended element, not `e.target` directly. |
| Does delegation work for dynamically added elements? | Yes – because the listener is on the parent, not the child. |

---

# Chapter 15 — Forms

## Input Elements

```html
<input id="name" type="text" value="John">
```

```javascript
const input = document.getElementById("name");
input.value;     // Current value ("John")
input.type;      // "text"
input.name;      // "name"
input.placeholder; // "" (placeholder text)
input.disabled;  // false
input.readOnly;  // false
```

---

## Checkbox

```html
<input type="checkbox" id="agree" checked>
```

```javascript
const checkbox = document.getElementById("agree");
checkbox.checked; // true (not .value)
```

---

## Radio Buttons

```html
<input type="radio" name="color" value="red" checked>
<input type="radio" name="color" value="blue">
```

```javascript
const radios = document.querySelectorAll('input[name="color"]');
radios.forEach(r => {
    if (r.checked) console.log(r.value); // "red"
});
```

---

## Select / Dropdown

```html
<select id="city">
    <option value="nyc">New York</option>
    <option value="london" selected>London</option>
</select>
```

```javascript
const select = document.getElementById("city");
select.value;    // "london" (selected option value)
select.selectedIndex; // 1 (index of selected option)
```

---

## Textarea

```html
<textarea id="bio">Hello world</textarea>
```

```javascript
const textarea = document.getElementById("bio");
textarea.value; // "Hello world"
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How to get value from an input? | `input.value`. |
| How to check if a checkbox is checked? | `checkbox.checked`. |
| How to get selected value from a dropdown? | `select.value`. |
| What is the difference between `value` and `defaultValue`? | `value` is current; `defaultValue` is the initial HTML value. |

---

# Chapter 16 — Form Submission

## The submit Event

```javascript
const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop page reload
    // Process form data
});
```

---

## Why preventDefault?

Without `preventDefault()`:

```text
User clicks submit → form submits → page reloads
                                       ↓
                              All JavaScript state lost
```

With `preventDefault()`:

```text
User clicks submit → e.preventDefault() → JavaScript handles data
                                          ↓
                         Fetch API (AJAX) → update page dynamically
```

---

## Getting Form Data

```javascript
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Method 1: individual fields
    const name = document.getElementById("name").value;

    // Method 2: FormData
    const formData = new FormData(form);
    const name2 = formData.get("name");

    // Method 3: Object from FormData
    const data = Object.fromEntries(formData);
    console.log(data); // { name: "John", email: "john@example.com" }
});
```

---

## Submit Button Identification

```javascript
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitter = e.submitter; // The button that was clicked
    console.log(submitter.value); // "save" or "delete" depending on button
});
```

```html
<button type="submit" name="action" value="save">Save</button>
<button type="submit" name="action" value="delete">Delete</button>
```

---

## Input Events

```javascript
// Fires on every keystroke
input.addEventListener("input", () => {
    console.log("Current value:", input.value);
});

// Fires when focus leaves and value changed
input.addEventListener("change", () => {
    console.log("Final value:", input.value);
});

// Fires when element gains focus
input.addEventListener("focus", () => {
    input.style.borderColor = "blue";
});

// Fires when element loses focus
input.addEventListener("blur", () => {
    input.style.borderColor = "";
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why page reload? | The `submit` event default action was not prevented. |
| Was default prevented? | Check if `e.preventDefault()` is called inside the submit handler. |
| How to get all form values at once? | Use `new FormData(form)` and `Object.fromEntries()`. |
| What is the difference between `input` and `change` events? | `input` fires on every keystroke. `change` fires when the value is committed (blur + changed). |

---

# Chapter 17 — Validation

## JavaScript Validation

```javascript
const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    let isValid = true;

    if (name === "") {
        showError("name", "Name is required");
        isValid = false;
    } else if (name.length < 2) {
        showError("name", "Name must be at least 2 characters");
        isValid = false;
    }

    if (email === "") {
        showError("email", "Email is required");
        isValid = false;
    } else if (!email.includes("@")) {
        showError("email", "Invalid email format");
        isValid = false;
    }

    if (isValid) {
        submitForm({ name, email });
    }
});
```

---

## Regex Patterns

```javascript
// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    showError("email", "Invalid email");
}

// Phone validation (US format)
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
// Matches: (555) 123-4567

// Password strength
const hasUpperCase = /[A-Z]/;
const hasNumber = /[0-9]/;
const hasSpecial = /[!@#$%^&*]/;
```

---

## HTML5 Built-in Validation

```html
<form>
    <input type="text" required minlength="2" maxlength="50">
    <input type="email" required>
    <input type="number" min="0" max="100">
    <input type="password" pattern=".{8,}" title="At least 8 characters">
    <input type="url">
    <input type="date">
    
    <button type="submit">Submit</button>
</form>
```

---

## Constraint Validation API

```javascript
const input = document.getElementById("email");

// Check validity
console.log(input.validity.valid);       // true/false
console.log(input.validity.valueMissing); // Required field empty?
console.log(input.validity.typeMismatch); // Wrong type (email, url)?
console.log(input.validity.tooShort);     // Too few characters?
console.log(input.validity.rangeUnderflow); // Number too small?

// Custom validation message
input.setCustomValidity("Please enter a valid email address");

// Report validation
input.reportValidity(); // Shows the browser's validation bubble
```

---

## Showing Errors

```javascript
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = field.nextElementSibling; // Assume <span class="error"> exists
    
    if (error && error.classList.contains("error")) {
        error.textContent = message;
        error.style.display = "block";
    }
    
    field.classList.add("invalid");
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.style.display = "none");
    document.querySelectorAll(".invalid").forEach(e => e.classList.remove("invalid"));
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is validation server-side or client-side? | Client-side = immediate feedback. Server-side = security. Both are needed. |
| Is HTML5 validation being used? | Check for `required`, `pattern`, `min`, `max`, `type` attributes. |
| Is custom validation in JavaScript? | Check for `.validity`, `.setCustomValidity()`, or manual checks. |
| Can client-side validation be bypassed? | Yes (disable JS, modify requests). Always validate on the server too. |

---

# Chapter 18 — Timers

## Delayed Execution

```javascript
setTimeout()
```

```javascript
const timerId = setTimeout(() => {
    console.log("Runs once after 1 second");
}, 1000);

clearTimeout(timerId); // Cancel before it fires
```

---

## Repeated Execution

```javascript
setInterval()
```

```javascript
const counter = document.getElementById("counter");
let count = 0;

const intervalId = setInterval(() => {
    count++;
    counter.textContent = count;
    
    if (count >= 10) {
        clearInterval(intervalId);
    }
}, 1000);
```

---

## Recursive setTimeout (Better than setInterval)

```javascript
// Guarantees delay BETWEEN end of execution and next start
function tick() {
    console.log("Tick at", Date.now());
    setTimeout(tick, 1000); // 1s after this tick FINISHES
}

tick();

// vs setInterval (drifts):
setInterval(() => {
    console.log("Interval at", Date.now()); // 1s from SCHEDULE, not end
}, 1000);
```

---

## Debounce with Timers

```javascript
function debounce(fn, delay) {
    let timerId = null;
    
    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), delay);
    };
}

const handleSearch = debounce((query) => {
    console.log("Searching:", query);
}, 300);

searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
```

---

# Chapter 19 — Storage

## localStorage

Persists after browser closes. Survives page reloads and browser restarts.

```javascript
localStorage.setItem(
"name",
"John"
);
```

Read:

```javascript
localStorage.getItem(
"name"
);
```

Remove:

```javascript
localStorage.removeItem("name");
```

Clear:

```javascript
localStorage.clear();
```

---

## Storage Limits

```text
localStorage: ~5-10MB per origin
sessionStorage: ~5-10MB per origin
Cookies: ~4KB per cookie, ~20 cookies per domain
```

---

## Data is Stored as Strings

```javascript
// Objects must be serialized
const user = { name: "John", age: 30 };
localStorage.setItem("user", JSON.stringify(user));

// Read back
const stored = JSON.parse(localStorage.getItem("user"));
console.log(stored.name); // "John"

// Numbers are stored as strings
localStorage.setItem("count", 42);
console.log(typeof localStorage.getItem("count")); // "string" (not number)
```

---

## sessionStorage

Same API as localStorage, but:

```text
Data is destroyed when the tab is closed
Data is NOT shared between tabs (even same origin)
```

```javascript
sessionStorage.setItem("temp", "This will be gone when tab closes");
```

---

## Storage Event

Fires when localStorage changes in **another tab** (same origin):

```javascript
window.addEventListener("storage", (e) => {
    console.log("Changed key:", e.key);       // "name"
    console.log("Old value:", e.oldValue);    // null
    console.log("New value:", e.newValue);    // "John"
    console.log("Origin URL:", e.url);        // "https://example.com"
});
```

---

## Cookies (Legacy)

```javascript
// Set cookie (expires in 7 days)
document.cookie = "theme=dark; max-age=" + 60 * 60 * 24 * 7 + "; path=/";

// Read all cookies
console.log(document.cookie); // "theme=dark; session=abc123"

// Delete cookie
document.cookie = "theme=; max-age=0; path=/";
```

---

## Storage Comparison

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|----------------|---------|
| Persists after browser close | Yes | No | Yes (based on expiry) |
| Survives page reload | Yes | Yes | Yes |
| Shared between tabs | Yes | No | Yes |
| Sent to server automatically | No | No | Yes |
| Capacity | ~5-10MB | ~5-10MB | ~4KB |
| Accessible from | Client JS | Client JS | Client + Server |
| Expires | Never (manual delete) | Tab close | Set by `max-age` or `expires` |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Temporary? | Use `sessionStorage` (cleared on tab close). |
| Permanent? | Use `localStorage` (persists until manually cleared). |
| Is data serialized/deserialized correctly? | Check for `JSON.parse` on read and `JSON.stringify` on write for objects. |
| Are there remaining data from previous sessions? | Check DevTools Application → Local Storage / Session Storage. |

---

# Chapter 20 — JSON

## Serialization and Deserialization

Convert object to string:

```javascript
JSON.stringify()
```

Restore string to object:

```javascript
JSON.parse()
```

---

## JSON.stringify Options

```javascript
const user = {
    name: "John",
    age: 30,
    role: "admin",
    password: "secret",
    createdAt: new Date()
};

// Pretty print
console.log(JSON.stringify(user, null, 2));
// {
//   "name": "John",
//   "age": 30,
//   "role": "admin",
//   "password": "secret",
//   "createdAt": "2025-01-15T10:30:00.000Z"
// }

// With replacer (filter keys)
const safe = JSON.stringify(user, ["name", "age", "role"]);
// {"name":"John","age":30,"role":"admin"} — password excluded
```

---

## JSON.parse with Reviver

```javascript
const json = '{"name":"John","birth":"1990-01-01T00:00:00.000Z"}';

const user = JSON.parse(json, (key, value) => {
    if (key === "birth") return new Date(value); // Convert date string back to Date
    return value;
});

console.log(user.birth instanceof Date); // true
```

---

## Storage Example

```javascript
localStorage.setItem(
"user",
JSON.stringify(user)
);

const restored = JSON.parse(
    localStorage.getItem("user")
);
```

---

## What JSON Cannot Serialize

```javascript
const bad = {
    func: () => console.log("hi"),  // Functions → removed
    undef: undefined,                // undefined → removed
    symbol: Symbol("id"),            // Symbols → removed
    nan: NaN,                        // NaN → null
    inf: Infinity,                   // Infinity → null
    date: new Date(),                // Date → string (works, but need reviver)
    map: new Map([["a", 1]]),        // Map → "{}" (empty object)
    set: new Set([1, 2, 3]),         // Set → "{}" (empty object)
    circular: {}                     // Circular reference → Error
};
bad.circular.self = bad; // Circular → throws TypeError
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the data a string or an object? | If it came from `JSON.stringify`, it's a string. Parse with `JSON.parse`. |
| Why is `[object Object]` stored? | Forgot to call `JSON.stringify` – the object's toString was used. |
| Why is `undefined` missing? | JSON cannot represent `undefined`; it's omitted. Use `null` instead. |

---

# Chapter 21 — Location Object

## Current URL

```javascript
location.href     // Full URL: "https://example.com/page?q=hello#section"
location.protocol // "https:"
location.hostname // "example.com"
location.port     // "443" (or "" for default)
location.pathname // "/page"
location.search   // "?q=hello"
location.hash     // "#section"
location.origin   // "https://example.com"
```

---

## Navigation

```javascript
// Redirect to new page
location.assign("https://other.com");

// Same as assign (most common)
location.href = "https://other.com";

// Replace (no history entry)
location.replace("https://other.com");
// User cannot click "Back" to return

// Reload
location.reload();          // Reload from cache
location.reload(true);      // Force reload from server (deprecated)
```

---

## URL Manipulation

```javascript
// Parse current URL
const url = new URL(location.href);

// Read search params
console.log(url.searchParams.get("q")); // "hello"
url.searchParams.set("page", "2");
url.searchParams.delete("filter");

// Update URL without reload
history.pushState({}, "", url.toString());
// Or
window.history.replaceState({}, "", url.toString());
```

---

## URL Search Params

```javascript
const params = new URLSearchParams("?name=John&age=30");

params.get("name");     // "John"
params.has("age");      // true
params.set("name", "Jane");
params.append("role", "admin");
params.delete("age");

console.log(params.toString()); // "name=Jane&role=admin"
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the current URL? | `location.href`. |
| How to redirect? | `location.href = newUrl` or `location.assign()`. |
| How to modify query parameters? | `new URLSearchParams(location.search)` or `URL.searchParams`. |
| How to update URL without page reload? | `history.pushState({}, "", newUrl)`. |

---

# Chapter 22 — History

## Browser Navigation History

```javascript
history.back();     // Go back one page
history.forward();  // Go forward one page
history.go(-2);     // Go back two pages
history.go(1);      // Same as forward()
```

---

## History Length

```javascript
console.log(history.length); // Number of entries in session history
```

---

## pushState and replaceState

Modern SPAs (Single Page Applications) use these to update URL without page reload:

```javascript
// Add entry to history (user can click Back)
history.pushState({ page: 1 }, "", "/page1");

// Replace current entry (no new history entry)
history.replaceState({ page: 2 }, "", "/page2");
```

---

## popstate Event

Fires when user clicks Back/Forward (but not on pushState/replaceState):

```javascript
window.addEventListener("popstate", (e) => {
    console.log("State:", e.state); // The state object passed to pushState
    // Update UI based on the state
});
```

---

## SPA Routing Example

```javascript
// Navigation
function navigate(path, data = {}) {
    history.pushState(data, "", path);
    render(path);
}

// Handle back/forward
window.addEventListener("popstate", (e) => {
    render(location.pathname);
});

// Initial load
render(location.pathname);
```

---

# Chapter 23 — Navigator

## Browser Information

```javascript
navigator.userAgent       // Browser identification string
navigator.language        // Browser language ("en-US")
navigator.languages       // Array of preferred languages
navigator.platform        // OS ("Win32", "MacIntel", "Linux x86_64")
navigator.onLine          // Is the browser online?
navigator.cookieEnabled   // Are cookies enabled?
```

---

## User Agent Parsing (Caution)

```javascript
// User agent is unreliable (can be spoofed)
console.log(navigator.userAgent);
// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ..."

// Use feature detection instead of browser detection:
if ("geolocation" in navigator) {
    // Use geolocation
} else {
    // Fallback
}
```

---

## Device Capabilities

```javascript
// Battery (deprecated in some browsers)
navigator.getBattery().then(battery => {
    console.log(battery.level);       // 0.85 (85%)
    console.log(battery.charging);    // true/false
});

// Connection
const connection = navigator.connection;
if (connection) {
    console.log(connection.effectiveType); // "4g", "3g", "2g", "slow-2g"
    console.log(connection.downlink);      // Mbps
}

// Memory
console.log(navigator.deviceMemory); // 4, 8 (GB, approximate)
```

---

## Permissions

```javascript
navigator.permissions.query({ name: "geolocation" }).then(result => {
    console.log(result.state); // "granted", "denied", "prompt"
    
    result.onchange = () => {
        console.log("Permission changed to:", result.state);
    };
});
```

---

# Chapter 24 — Screen

## Display Information

```javascript
screen.width        // Total screen width (px)
screen.height       // Total screen height (px)
screen.availWidth   // Available width (minus taskbar)
screen.availHeight  // Available height (minus taskbar)
screen.colorDepth   // Color depth (24, 32)
screen.pixelDepth   // Pixel depth
screen.orientation  // Screen orientation object
```

---

## Orientation

```javascript
console.log(screen.orientation.type);
// "portrait-primary", "landscape-primary"

// Lock orientation (requires fullscreen)
screen.orientation.lock("landscape").catch(err => console.warn(err));

// Unlock
screen.orientation.unlock();

// Listen for changes
screen.orientation.addEventListener("change", () => {
    console.log("Orientation changed:", screen.orientation.type);
});
```

---

## Window vs Screen

```javascript
// Viewport (visible document area)
window.innerWidth    // Content area width
window.innerHeight   // Content area height

// Browser window
window.outerWidth    // Entire browser window width
window.outerHeight   // Entire browser window height

// Display
screen.width         // Physical monitor width
screen.height        // Physical monitor height
```

---

# Chapter 25 — Clipboard API

## Copying to Clipboard

```javascript
navigator.clipboard.writeText()
```

```javascript
navigator.clipboard.writeText("Hello, world!")
    .then(() => console.log("Copied!"))
    .catch(err => console.error("Copy failed:", err));

// Async/await:
async function copy(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error("Copy failed:", err);
    }
}
```

---

## Reading from Clipboard

```javascript
navigator.clipboard.readText()
```

```javascript
navigator.clipboard.readText()
    .then(text => console.log("Pasted:", text))
    .catch(err => console.error("Read failed:", err));
```

---

## Copying Images and Rich Content

```javascript
async function copyImage() {
    const canvas = document.getElementById("myCanvas");
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    
    await navigator.clipboard.write([
        new ClipboardItem({
            "image/png": blob
        })
    ]);
}
```

---

## Permissions

```javascript
// Clipboard API requires:
// 1. HTTPS (or localhost)
// 2. User gesture (click, keypress) for write
// 3. Permission for read
```

---

# Chapter 26 — Geolocation

## Getting Position

```javascript
navigator.geolocation.getCurrentPosition()
```

```javascript
navigator.geolocation.getCurrentPosition(
    (position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
        console.log("Accuracy:", position.coords.accuracy, "meters");
    },
    (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied permission");
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Position unavailable");
                break;
            case error.TIMEOUT:
                console.error("Request timed out");
                break;
        }
    },
    {
        enableHighAccuracy: true,  // Use GPS if available (slower, more battery)
        timeout: 10000,            // Max wait (ms)
        maximumAge: 60000          // Accept cached position up to 1 min old
    }
);
```

---

## Watching Position

```javascript
const watchId = navigator.geolocation.watchPosition(
    (position) => {
        console.log("New position:", position.coords);
        updateMap(position.coords.latitude, position.coords.longitude);
    },
    (error) => console.error(error),
    { enableHighAccuracy: true }
);

// Stop watching
navigator.geolocation.clearWatch(watchId);
```

---

## Position Object

```javascript
position.coords.latitude       // Latitude (degrees)
position.coords.longitude      // Longitude (degrees)
position.coords.accuracy       // Accuracy (meters)
position.coords.altitude       // Altitude (meters above sea level)
position.coords.altitudeAccuracy // Altitude accuracy
position.coords.heading        // Direction (degrees clockwise from North)
position.coords.speed          // Speed (meters/second)
position.timestamp             // When position was acquired
```

---

# Chapter 27 — Drag and Drop

## HTML5 Drag and Drop API

Events:

```text
Drag source:          dragstart, drag, dragend
Drop target:          dragenter, dragover, dragleave, drop
```

---

## Dragging an Element

```javascript
const draggable = document.getElementById("item");

draggable.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", draggable.id);
    e.dataTransfer.effectAllowed = "move";
    draggable.classList.add("dragging");
});

draggable.addEventListener("dragend", (e) => {
    draggable.classList.remove("dragging");
});
```

---

## Drop Target

```javascript
const dropZone = document.getElementById("dropZone");

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault(); // Required to allow drop
    e.dataTransfer.dropEffect = "move";
    dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");

    const id = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(id);
    dropZone.appendChild(draggedElement); // Move the element
});
```

---

## Drag Data (dataTransfer)

```javascript
// Set data types
e.dataTransfer.setData("text/plain", "Some text");
e.dataTransfer.setData("text/html", "<b>HTML</b>");
e.dataTransfer.setData("application/json", JSON.stringify(obj));

// Get data (on drop)
const text = e.dataTransfer.getData("text/plain");

// Drag image
e.dataTransfer.setDragImage(imgElement, offsetX, offsetY);

// Available effects
e.dataTransfer.effectAllowed = "copy";     // Copy only
e.dataTransfer.effectAllowed = "move";     // Move only
e.dataTransfer.effectAllowed = "link";     // Link only
e.dataTransfer.effectAllowed = "all";      // Any (default)
```

---

## File Drag and Drop

```javascript
dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
        console.log("Dropped file:", file.name, file.size, file.type);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            showPreview(e.target.result); // data URL
        };
        reader.readAsDataURL(file);
    });
});
```

---

# Chapter 28 — Fetch API

## Making Requests

```javascript
fetch(url)
```

Returns a Promise that resolves to a Response object.

```javascript
// GET request
fetch("https://api.example.com/users")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error("Network error:", err));
```

---

## Request Methods

```javascript
// GET
fetch("/api/users");

// POST
fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "John" })
});

// PUT
fetch("/api/users/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Jane" })
});

// DELETE
fetch("/api/users/1", {
    method: "DELETE"
});
```

---

## Response Object

```javascript
const response = await fetch("/api/data");

console.log(response.status);         // 200, 404, 500
console.log(response.ok);             // true if 200-299
console.log(response.statusText);     // "OK", "Not Found"
console.log(response.headers.get("Content-Type"));

const data = await response.json();   // Parse JSON body
// OR: const text = await response.text();
// OR: const blob = await response.blob();
// OR: const formData = await response.formData();
```

---

## Error Handling

```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (err) {
        // Network error OR HTTP error
        console.error("Fetch failed:", err.message);
        return null;
    }
}
```

---

## Aborting Requests

```javascript
const controller = new AbortController();
const signal = controller.signal;

// Start request
const promise = fetch("/large-file", { signal });

// Timeout after 5 seconds
setTimeout(() => controller.abort(), 5000);

try {
    const response = await promise;
    console.log("Response received");
} catch (err) {
    if (err.name === "AbortError") {
        console.log("Request was cancelled");
    } else {
        console.error("Request failed:", err);
    }
}
```

---

## Upload Progress (with XMLHttpRequest)

```javascript
function uploadFile(file) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                console.log(`Upload: ${percent}%`);
            }
        });
        
        xhr.addEventListener("load", () => resolve(xhr.response));
        xhr.addEventListener("error", () => reject(new Error("Upload failed")));
        
        xhr.open("POST", "/upload");
        const formData = new FormData();
        formData.append("file", file);
        xhr.send(formData);
    });
}
```

---

# Chapter 29 — Rendering Pipeline

## The Critical Rendering Path

The browser performs these steps for every frame:

```text
1. DOM Construction
   HTML → Tokens → Nodes → DOM Tree
   
2. CSSOM Construction
   CSS → Tokens → Nodes → CSSOM Tree
   
3. Render Tree
   DOM + CSSOM → visible nodes with computed styles
   
4. Layout (Reflow)
   Calculate position and size for each node
   
5. Paint
   Fill pixels (colors, images, shadows, text)
   
6. Composite
   Stack painted layers together
```

---

## Step 1: DOM Construction

```text
Bytes → Characters → Tokens → Nodes → DOM Tree

<html>
  <body>
    <h1>Hello</h1>
    <p>World</p>
  </body>
</html>
```

The browser parser builds the DOM **incrementally** – it can start building before the full HTML is downloaded.

---

## Step 2: CSSOM Construction

CSS is **render-blocking**: the browser waits for CSS before rendering.

```text
body { font-size: 16px; }
h1 { color: blue; }
p { margin: 10px; }
```

---

## Step 3: Render Tree

The render tree contains only **visible** nodes:

```text
html, body, h1, p   ← included
<head>, <script>    ← not rendered (no box)
display: none       ← not in render tree
visibility: hidden  ← IN render tree (occupies space, just invisible)
```

---

## Step 4: Layout (Reflow)

Calculate geometry:

```text
body: x=0, y=0, width=800, height=600
h1:   x=8, y=8, width=784, height=32
p:    x=8, y=48, width=784, height=20
```

**Expensive** – affects all descendants.

---

## Step 5: Paint

Fill pixels:

```text
Fill body with white background
Fill h1 with blue text
Fill p with black text
Draw borders, shadows, images
```

---

## Step 6: Composite

If the page has layers (transform, opacity, will-change, iframe, video):

```text
Layer 1: Background
Layer 2: Fixed header
Layer 3: Scrolling content
     ↓
Composite: stack layers together
```

---

# Chapter 30 — Reflow vs Repaint

## Reflow (Layout)

Changes that affect **geometry**:

```javascript
element.style.width = "200px";
element.style.margin = "10px";
element.style.fontSize = "20px";
element.style.display = "none";
element.style.top = "100px";
```

Triggers layout recalculation for the element (and often its children, ancestors).

**Most expensive operation.**

---

## Repaint (Paint)

Changes that affect **appearance only**:

```javascript
element.style.color = "red";
element.style.background = "blue";
element.style.visibility = "hidden";  // Still occupies space
element.style.outline = "1px solid";
```

**Less expensive** (no geometry calculation).

---

## Composite Only (Best)

Changes that only affect the **composite layer**:

```javascript
element.style.transform = "translateX(100px)";
element.style.opacity = "0.5";
```

**Cheapest** – no layout, no repaint. GPU accelerated.

---

## Performance Hierarchy

```text
Composite only (transform, opacity)
    → Fastest (GPU)
    
Repaint (color, background, visibility)
    → Moderate (CPU paint)
    
Reflow (width, height, margin, padding, font-size)
    → Slowest (layout calculation)
```

---

## Minimizing Reflows

```javascript
// BAD: multiple reflows
element.style.width = "100px";
element.style.height = "200px";
element.style.margin = "10px";

// GOOD: single reflow via class
element.className = "box-active";

// OR: batch with cssText
element.style.cssText = "width: 100px; height: 200px; margin: 10px;";
```

---

## Reading Triggers Reflow

```javascript
// Reading these forces an immediate reflow (to give you the correct value):
element.offsetWidth;     // Forces reflow
element.offsetHeight;
element.getBoundingClientRect();
element.scrollTop;
window.getComputedStyle(element);
```

**Batch your reads and writes:**

```javascript
// BAD: read → write → read → write (multiple reflows)
const w = box.offsetWidth;
box.style.width = (w + 10) + "px";
const h = box.offsetHeight;
box.style.height = (h + 10) + "px";

// GOOD: read → read → write → write (one reflow)
const w = box.offsetWidth;
const h = box.offsetHeight;
box.style.width = (w + 10) + "px";
box.style.height = (h + 10) + "px";
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does this change trigger layout? | Width, height, margin, padding, font-size, top, left → yes (reflow). |
| Does it trigger paint? | Color, background, shadow, outline → yes (repaint). |
| Is it GPU-accelerated? | Transform, opacity → yes (composite only). |
| How to check in DevTools? | Performance tab → record → see Layout, Paint, Composite events. |

---

# Chapter 31 — requestAnimationFrame

## Smooth Animation

```javascript
requestAnimationFrame()
```

```javascript
function animate(timestamp) {
    console.log("Frame at:", timestamp);
    // Update animation state
    element.style.transform = `translateX(${Math.sin(timestamp / 1000) * 100}px)`;
    
    requestAnimationFrame(animate); // Schedule next frame
}

requestAnimationFrame(animate);
```

---

## Why It's Better than setInterval

| Feature | `setInterval(fn, 16)` | `requestAnimationFrame(fn)` |
|---------|----------------------|---------------------------|
| Timing | Approximate (~16ms) | Syncs with screen refresh |
| Tab inactive | Still runs (wasteful) | Pauses automatically |
| Battery | Drains battery | Battery-friendly |
| Frames dropped | Continues regardless | Adapts to monitor refresh |
| Callback arg | None | High-resolution timestamp |

---

## FPS Counter

```javascript
let frameCount = 0;
let lastTime = performance.now();

function countFPS(timestamp) {
    frameCount++;
    
    if (timestamp - lastTime >= 1000) {
        console.log(`FPS: ${frameCount}`);
        frameCount = 0;
        lastTime = timestamp;
    }
    
    requestAnimationFrame(countFPS);
}

requestAnimationFrame(countFPS);
```

---

## Cancelling Animation

```javascript
const animationId = requestAnimationFrame(animate);

// Cancel
cancelAnimationFrame(animationId);
```

---

# Chapter 32 — MutationObserver

## Watching DOM Changes

```javascript
new MutationObserver()
```

```javascript
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        console.log("Type:", mutation.type); // "childList", "attributes", "characterData"
        
        if (mutation.type === "childList") {
            console.log("Added nodes:", mutation.addedNodes);
            console.log("Removed nodes:", mutation.removedNodes);
        }
        
        if (mutation.type === "attributes") {
            console.log("Attribute changed:", mutation.attributeName);
            console.log("Old value:", mutation.oldValue);
        }
    });
});

// Start observing
observer.observe(document.getElementById("target"), {
    childList: true,      // Watch for added/removed children
    attributes: true,     // Watch for attribute changes
    characterData: true,  // Watch for text changes
    subtree: true,        // Watch descendants too
    attributeOldValue: true, // Record old attribute value
    characterDataOldValue: true // Record old text value
});

// Stop observing
observer.disconnect();
```

---

## Use Cases

```javascript
// 1. Extensions: detect changes on dynamic pages
const pageObserver = new MutationObserver(() => {
    const newElement = document.querySelector(".dynamic-content");
    if (newElement) {
        processElement(newElement);
    }
});

pageObserver.observe(document.body, {
    childList: true,
    subtree: true
});

// 2. Detect when element is added
const waitForElement = (selector) => {
    return new Promise((resolve) => {
        const existing = document.querySelector(selector);
        if (existing) return resolve(existing);
        
        const observer = new MutationObserver(() => {
            const element = document.querySelector(selector);
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};

// Usage
const modal = await waitForElement(".modal");
console.log("Modal appeared:", modal);
```

---

## Performance Warning

```javascript
// BAD: very expensive (watches every attribute on every node)
observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: [] // ALL attributes
});

// GOOD: only watch specific attributes
observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ["class", "style"] // Only these
});
```

---

# Senior Reverse Engineering Checklist

Whenever reading browser code ask:

### Which element is selected?

Check the selector: `#id`, `.class`, `[attribute]`, tag.

---

### How was it found?

`getElementById`, `querySelector`, `getElementsByClassName`. Legacy methods are slower.

---

### Who created it?

Parsed from HTML? Created by `createElement`? Cloned? innerHTML?

---

### Which event triggers execution?

Click? Load? Input? Scroll? Custom event?

---

### Is bubbling involved?

Could `stopPropagation` affect other listeners? Is delegation used?

---

### Does event delegation exist?

Is there one listener on a parent instead of many on children?

---

### Does DOM change?

Is there a MutationObserver? Does the element get removed/replaced?

---

### Is layout recalculated?

Changing width/height/margin/padding triggers reflow. Check for performance issues.

---

### Is data persistent?

localStorage (permanent), sessionStorage (tab), cookie (server), or in-memory (volatile)?

---

### Which storage mechanism is used?

Check for `localStorage`, `sessionStorage`, `document.cookie`, `indexedDB`.

---

### Is network request involved?

`fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `Service Worker`.

---

### Which browser API provides functionality?

`navigator.geolocation`, `navigator.clipboard`, `IntersectionObserver`, `ResizeObserver`.

---

# Projects

## Todo Application

Using:

* DOM creation (`createElement`, `appendChild`)
* localStorage (persist todos)
* event delegation (click on list items to toggle/delete)
* form submit (add new todo)

```javascript
// Core features:
// 1. Add todo (form submit → create li → append to ul → save to localStorage)
// 2. Toggle todo (click li → toggle .completed → save)
// 3. Delete todo (click .delete button → remove li → save)
// 4. Filter (show all / active / completed)
```

---

## Calculator

Using:

* click events (on number and operation buttons)
* dynamic display (update result element)
* state management (current value, operator, previous value)

```javascript
// Core logic:
// 1. Number buttons → append to current display
// 2. Operator buttons → store current value + operator
// 3. Equals button → calculate result
// 4. Clear → reset all state
```

---

## Form Validator

Using:

* regex (email, phone, password patterns)
* submit (preventDefault, validate all fields)
* DOM updates (show/hide error messages, add/remove CSS classes)

```javascript
// Validation rules:
// - Name: required, min 2 chars
// - Email: required, valid format
// - Password: required, min 8 chars, 1 uppercase, 1 number
// - Confirm: must match password
```

---

## Notes App

Using:

* localStorage (save/load notes as JSON array)
* JSON (stringify/parse for storage)
* DOM creation (display notes dynamically)

```javascript
// Features:
// 1. Create note (title + content → add to array → save to localStorage → render)
// 2. Edit note (click edit → populate form → save changes)
// 3. Delete note (click delete → remove from array → save → re-render)
// 4. Search notes (input event → filter displayed notes)
```

---

## Drag-and-Drop Kanban Board

Using:

* dragstart, dragover, drop (move cards between columns)
* localStorage (persist board state)
* DOM updates (reorder elements)

```javascript
// Structure:
// Columns: "To Do", "In Progress", "Done"
// Cards: draggable elements with task info
// Drop zones: columns that accept cards
// State: array of cards with status property
```

---

## Weather Dashboard

Using:

* fetch() (get weather data from OpenWeatherMap API or similar)
* geolocation (get user's current position for weather)
* DOM updates (display temperature, humidity, conditions)

```javascript
async function getWeather(lat, lon) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_KEY`
    );
    const data = await response.json();
    displayWeather(data);
}

navigator.geolocation.getCurrentPosition(
    (pos) => getWeather(pos.coords.latitude, pos.coords.longitude),
    () => getWeather(40.7128, -74.0060) // Default: New York
);

function displayWeather(data) {
    document.getElementById("temp").textContent = 
        Math.round(data.main.temp - 273.15) + "°C";
    document.getElementById("condition").textContent = 
        data.weather[0].description;
    document.getElementById("icon").src = 
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}
```

---

# Part 9 Summary

| Concept | Key Takeaway |
|---------|-------------|
| BOM | `window` object – browser-level APIs |
| DOM | Tree of objects representing HTML |
| Selecting elements | `getElementById`, `querySelector`, `querySelectorAll` |
| Reading content | `textContent` (text), `innerHTML` (HTML) |
| Modifying content | `textContent =`, `innerHTML =` (caution: XSS) |
| Attributes | `getAttribute`, `setAttribute`, `dataset` |
| Classes | `classList.add`, `remove`, `toggle`, `contains` |
| Creating elements | `createElement`, `appendChild`, `insertBefore` |
| Removing elements | `remove()`, `removeChild()` |
| Traversing DOM | `parentElement`, `children`, `nextElementSibling` |
| Events | `addEventListener`, event object, propagation |
| Event propagation | Capturing → Target → Bubbling |
| Event delegation | One parent listener for many children |
| Forms | `.value`, `.checked`, FormData, preventDefault |
| Validation | HTML5 built-in (`required`, `pattern`) + JS checks |
| Timers | `setTimeout` (once), `setInterval` (repeating) |
| localStorage | Persistent, ~5-10MB, strings only |
| sessionStorage | Tab-scoped, cleared on close |
| JSON | `stringify`, `parse` for storage/network |
| Location | `location.href`, `search`, `hash` |
| History | `back`, `forward`, `pushState` for SPA routing |
| Navigator | `userAgent`, `language`, `onLine` |
| Screen | `width`, `height`, `orientation` |
| Clipboard | `writeText`, `readText` (async, needs permission) |
| Geolocation | `getCurrentPosition`, `watchPosition` |
| Drag and Drop | `dragstart`, `dragover`, `drop` events |
| Fetch | Promise-based HTTP, `POST`, `PUT`, `DELETE` |
| Rendering Pipeline | DOM → CSSOM → Render Tree → Layout → Paint → Composite |
| Reflow vs Repaint | Layout changes (expensive) vs visual changes (cheaper) |
| requestAnimationFrame | Syncs with screen refresh, pauses when inactive |
| MutationObserver | Watch DOM changes (additions, removals, attributes) |

---

# Next Part (Part 10)

We will enter one of the deepest sections of modern JavaScript engineering:

# Advanced JavaScript

Including absolutely everything about:

* Symbols
* Iterators
* Generators
* Maps
* Sets
* WeakMap
* WeakSet
* Proxies
* Reflect
* Descriptors
* Property attributes
* Optional chaining
* Nullish coalescing
* Tagged templates
* BigInt
* Regular expressions
* Internationalization API
* Meta-programming
* Memory behavior
* Reverse engineering tactics used by senior JavaScript engineers

This is where JavaScript starts revealing many of its internal mechanisms and advanced capabilities.
