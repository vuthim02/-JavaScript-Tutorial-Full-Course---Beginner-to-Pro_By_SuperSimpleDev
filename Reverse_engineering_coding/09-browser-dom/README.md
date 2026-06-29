# 09 — Browser DOM, BOM, Events, Forms, Storage, Rendering Pipeline

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


Split from `part9-browser-internals-dom-bom-rendering.md`. Each file covers one focused subtopic (100–200 lines).

## Files

| # | File | Topics |
|---|------|--------|
| 01 | [01-intro-to-browser-apis.md](01-intro-to-browser-apis.md) | Browser architecture, JS ↔ browser interaction |
| 02 | [02-window-object.md](02-window-object.md) | BOM, window as global, properties, methods, events |
| 03 | [03-dom-tree-nodes.md](03-dom-tree-nodes.md) | DOM tree structure, node types, live DOM |
| 04 | [04-selecting-elements.md](04-selecting-elements.md) | getElementById, querySelector, HTMLCollection, NodeList |
| 05 | [05-reading-content.md](05-reading-content.md) | textContent, innerText, innerHTML, outerHTML |
| 06 | [06-modifying-content.md](06-modifying-content.md) | Setting text/HTML, insertAdjacentHTML, XSS |
| 07 | [07-attributes.md](07-attributes.md) | get/set/removeAttribute, properties vs attributes, data-* |
| 08 | [08-classes.md](08-classes.md) | classList API, className |
| 09 | [09-creating-elements.md](09-creating-elements.md) | createElement, append/prepend/insertBefore, cloneNode |
| 10 | [10-removing-elements.md](10-removing-elements.md) | remove, removeChild, replaceChild, clear children |
| 11 | [11-traversing-dom.md](11-traversing-dom.md) | parentElement, children, siblings, closest |
| 12 | [12-events-basics.md](12-events-basics.md) | addEventListener, event object, keyboard/mouse events |
| 13 | [13-event-propagation.md](13-event-propagation.md) | Capturing, bubbling, stopPropagation |
| 14 | [14-event-delegation.md](14-event-delegation.md) | Delegation pattern, data-attribute actions |
| 15 | [15-forms-basics.md](15-forms-basics.md) | Input, checkbox, radio, select, textarea |
| 16 | [16-form-submission.md](16-form-submission.md) | submit, preventDefault, FormData, input/change/focus/blur |
| 17 | [17-validation.md](17-validation.md) | JS validation, regex, HTML5 validation, Constraint API |
| 18 | [18-timers.md](18-timers.md) | setTimeout, setInterval, recursive setTimeout, debounce |
| 19 | [19-storage.md](19-storage.md) | localStorage, sessionStorage, cookies, comparison |
| 20 | [20-json.md](20-json.md) | JSON.stringify, JSON.parse, serialization limits |
| 21 | [21-location-history.md](21-location-history.md) | Location, URL parts, History API, SPA routing |
| 22 | [22-navigator-screen.md](22-navigator-screen.md) | Navigator, user agent, device capabilities, Screen |
| 23 | [23-clipboard-geolocation.md](23-clipboard-geolocation.md) | Clipboard API, Geolocation API |
| 24 | [24-drag-and-drop.md](24-drag-and-drop.md) | Drag and Drop API |
| 25 | [25-fetch-api.md](25-fetch-api.md) | Fetch, request methods, response, error handling, abort |
| 26 | [26-rendering-pipeline.md](26-rendering-pipeline.md) | DOM/CSSOM → Render Tree → Layout → Paint → Composite |
| 27 | [27-reflow-vs-repaint.md](27-reflow-vs-repaint.md) | Reflow vs Repaint, performance optimization |
| 28 | [28-requestanimationframe.md](28-requestanimationframe.md) | requestAnimationFrame, FPS counter |
| 29 | [29-mutationobserver.md](29-mutationobserver.md) | MutationObserver, watching DOM changes |
| 30 | [30-senior-checklist.md](30-senior-checklist.md) | Senior reverse engineering checklist |
| 31 | [31-projects.md](31-projects.md) | Project ideas (Todo, Calculator, Validator, Notes, Kanban, Weather) |
| 32 | [32-summary.md](32-summary.md) | Part 9 summary, next part preview |
| 33 | [33-intersectionobserver.md](33-intersectionobserver.md) | IntersectionObserver: lazy loading, infinite scroll |
| 34 | [34-resizeobserver.md](34-resizeobserver.md) | ResizeObserver: element size changes, responsive components |
| 35 | [35-web-workers.md](35-web-workers.md) | Web Workers: background threads, transferable objects |
| 36 | [36-service-workers.md](36-service-workers.md) | Service Workers: offline support, caching strategies, PWA |
| 37 | [37-websocket.md](37-websocket.md) | WebSocket: real-time communication, reconnection |
| 38 | [38-canvas.md](38-canvas.md) | Canvas API: 2D drawing, animation, gradients |
| 39 | [39-web-components.md](39-web-components.md) | Web Components: Custom Elements, Shadow DOM, Templates |
| 40 | [40-cors.md](40-cors.md) | CORS: same-origin policy, preflight, headers |
| 41 | [41-indexeddb.md](41-indexeddb.md) | IndexedDB: client-side NoSQL database, CRUD, indexes |
| 42 | [42-postmessage.md](42-postmessage.md) | postMessage: cross-window communication, BroadcastChannel |
| 43 | [43-dom-performance.md](43-dom-performance.md) | DOM performance: DocumentFragment, layout thrashing, virtual scroll |

## Source

Original: `part9-browser-internals-dom-bom-rendering.md` (3440 lines)

## Next Steps

[Back to Module 8](../08-modules-build/README.md): Modules, npm, Bundlers & Build Tools

[Proceed to Module 10](../10-advanced-js/README.md): Advanced JavaScript to learn about advanced JavaScript features and metaprogramming.
