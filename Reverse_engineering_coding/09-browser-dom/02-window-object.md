# Browser Object Model (BOM)

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

```
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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this object provided by JavaScript? | Check if it's part of ECMAScript spec. If it starts with `window`, `document`, `navigator` → browser. |
| Or by the browser? | `alert`, `prompt`, `confirm`, `fetch`, `localStorage` are browser APIs, not JS language. |
| Is `window` always the global object? | In browsers, yes. In Web Workers, `self` is the global. In Node.js, `global` is the global. |
| What happens if I override `window.alert`? | You can: `window.alert = () => {}` — but this breaks expected behavior. |
## Next Steps

[Back to Chapter 1](01-intro-to-browser-apis.md): Part 9 — Browser Internals, DOM, BOM, Events, Forms, Storage, Rendering Pipeline, and Browser APIs
[Proceed to Chapter 3](03-dom-tree-nodes.md): DOM (Document Object Model) to learn about dom (document object model).
