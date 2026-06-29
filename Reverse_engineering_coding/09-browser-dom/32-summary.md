# Part 9 Summary

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Key Takeaways

| Concept | Key Takeaway |
|---------|-------------|
| BOM | `window` object — browser-level APIs |
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
| IntersectionObserver | Detect element visibility (lazy loading, infinite scroll) |
| ResizeObserver | Watch element size changes |
| Web Workers | Background threads for heavy computation |
| Service Workers | Network proxy for offline support and caching |
| WebSocket | Persistent bidirectional real-time communication |
| Canvas | Programmatic 2D bitmap drawing |
| Web Components | Custom elements with Shadow DOM encapsulation |
| CORS | Cross-origin request security policy |
| IndexedDB | Client-side NoSQL database |
| postMessage | Cross-window/origin secure messaging |
| DOM Performance | DocumentFragment, layout thrashing, virtual scrolling |

---

# Next Part (Part 10)

We will enter one of the deepest sections of modern JavaScript engineering:

## Advanced JavaScript

Including absolutely everything about:
- Symbols
- Iterators
- Generators
- Maps
- Sets
- WeakMap
- WeakSet
- Proxies
- Reflect
- Descriptors
- Property attributes
- Optional chaining
- Nullish coalescing
- Tagged templates
- BigInt
- Regular expressions
- Internationalization API
- Meta-programming
- Memory behavior
- Reverse engineering tactics used by senior JavaScript engineers

This is where JavaScript starts revealing many of its internal mechanisms and advanced capabilities.
## Next Steps

[Back to Chapter 31](31-projects.md): Projects
[Proceed to Chapter 33](33-intersectionobserver.md): IntersectionObserver to learn about intersectionobserver.
