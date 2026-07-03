# Part 9 — Browser Internals, DOM, BOM, Events, Forms, Storage, Rendering Pipeline, and Browser APIs

## Mission

This part explains how JavaScript interacts with browsers.

Understanding this section deeply is essential before learning:
- React
- Vue.js
- Angular
- Next.js

Modern frameworks are built on top of the browser's APIs.

---

## Overall Browser Architecture

```
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

---

## How JavaScript Interacts with the Browser

```
DOM (Document Object Model)
BOM (Browser Object Model)
Events (click, keydown, input, etc.)
Storage (localStorage, sessionStorage, cookies)
Network (fetch, XMLHttpRequest, WebSocket)
Timers (setTimeout, setInterval, requestAnimationFrame)
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this a browser API or JavaScript? | Browser APIs: `document`, `fetch`, `localStorage`. JavaScript: `Array`, `Object`, `Promise`. |
| How does JS talk to the browser? | Through the DOM API (document), BOM (window), and Web APIs (fetch, storage). |
| What happens when I call `document.querySelector()`? | The browser's engine (Blink, WebKit, Gecko) implements the DOM binding. |
| Why do I need both JS and browser APIs? | JS provides language features; browser APIs provide environment-specific features. |
| Can I use browser APIs in Node.js? | No — Node.js has its own APIs (fs, http, path). |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-window-object.md): Browser Object Model (BOM) to learn about browser object model (bom).
