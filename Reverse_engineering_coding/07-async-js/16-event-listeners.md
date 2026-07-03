# Event Listeners

## How Events Work

When a user interacts with the page (click, keydown, scroll), an event is generated and placed in the **macrotask queue**.

```javascript
button.addEventListener("click", () => {
    console.log("Clicked");
});
```

## Event Task Flow

```
User clicks button
       │
       ▼
Browser creates: "click" event
       │
       ▼
Event added to macrotask queue
       │
       ▼
Event Loop picks it (when stack + microtasks are clear)
       │
       ▼
Event handler executes on the stack
       │
       ▼
"Clicked" logged
```

## Event Propagation: Three Phases

```
            Capturing ↓          ↑ Bubbling
window       ──────────→    ←─────────────────
document     ──────────→    ←─────────────────
body         ──────────→    ←─────────────────
button       ──────────→    ←─── Target ──────
```

1. **Capturing phase** — event travels from `window` down to the target
2. **Target phase** — event reaches the target element
3. **Bubbling phase** — event travels back up from target to `window`

```javascript
// Bubbling (default: third arg false/omitted)
button.addEventListener("click", () => console.log("button"));     // phase 2
parent.addEventListener("click", () => console.log("parent"));    // phase 3
document.addEventListener("click", () => console.log("document")); // phase 3

// Capturing (third arg true)
document.addEventListener("click", () => console.log("capture"), true); // phase 1
parent.addEventListener("click", () => console.log("parent capture"), true); // phase 1
```

## stopPropagation() vs stopImmediatePropagation()

```javascript
// stopPropagation — stops further propagation (capturing + bubbling)
parent.addEventListener("click", (e) => {
    e.stopPropagation(); // child's handler still runs, but document never gets it
});
child.addEventListener("click", () => console.log("child")); // runs

// stopImmediatePropagation — stops propagation AND other handlers on same element
button.addEventListener("click", (e) => {
    e.stopImmediatePropagation(); // stops ALL other handlers
});
button.addEventListener("click", () => console.log("never runs"));
```

## preventDefault()

Prevents the browser's default action (e.g., link navigation, form submit).

```javascript
// Prevent link navigation
document.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Link clicked but no navigation");
});

// Prevent form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Validate and submit via AJAX instead
});
```

**Does NOT stop propagation.** Use `stopPropagation()` separately.

## Multiple Handlers on Same Element

```javascript
button.addEventListener("click", () => console.log("Handler 1"));
button.addEventListener("click", () => console.log("Handler 2"));

// On click: Handler 1, then Handler 2
// Both run in the same macrotask (FIFO order)
```

## Event Listener Removal

```javascript
function handler() {
    console.log("Clicked");
}

button.addEventListener("click", handler);

// Later:
button.removeEventListener("click", handler);
// handler will no longer fire
```

**Important:** To remove, you must pass the **same function reference**. Anonymous functions cannot be removed.

```javascript
// CANNOT be removed:
button.addEventListener("click", () => console.log("anonymous"));
```

## Event Delegation Pattern

Attach a single listener to a parent instead of many to children.

```javascript
// WITHOUT delegation — many listeners
document.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => li.classList.toggle("done"));
});

// WITH delegation — one listener
document.querySelector("ul").addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) li.classList.toggle("done");
});
```

**Benefits:** Works for dynamically added elements, uses less memory.

## One-Time Event Listener

```javascript
button.addEventListener("click", () => {
    console.log("This runs only once");
}, { once: true });
```

The `{ once: true }` option automatically removes the listener after one invocation.

## Passive Event Listeners

```javascript
// Optimizes scroll performance — tells browser you won't call preventDefault()
document.addEventListener("touchstart", handler, { passive: true });

// passive: false — you might call preventDefault() (slower)
document.addEventListener("touchstart", handler, { passive: false });
```

## Asynchronous Event Handlers

```javascript
button.addEventListener("click", async () => {
    // This works but the returned promise is ignored
    const data = await fetch("/api");
    console.log(await data.json());
});

// If it rejects → unhandled rejection!
// Fix:
button.addEventListener("click", async () => {
    try {
        const data = await fetch("/api");
        console.log(await data.json());
    } catch (err) {
        console.error("Failed:", err);
    }
});
```

## Event Constructor (Programmatic Dispatch)

```javascript
// Create and dispatch synthetic events
const event = new MouseEvent("click", { bubbles: true, cancelable: true });
button.dispatchEvent(event);

// Custom events
const customEvent = new CustomEvent("userAction", {
    detail: { userId: 123, action: "login" }
});
document.dispatchEvent(customEvent);

document.addEventListener("userAction", (e) => {
    console.log("User action:", e.detail);
});
```

## Q&A

| Question | Answer |
|----------|--------|
| What queue does an event handler go into? | Macrotask queue |
| Does `preventDefault()` stop propagation? | No. It prevents default browser action. `stopPropagation()` stops propagation |
| What is event delegation? | Single parent listener that handles events from children via `e.target` |
| Can you have both capturing and bubbling handlers? | Yes. Capturing fires before target, bubbling fires after |
| What if the event handler throws? | Error goes to global `error` event. Does not affect other handlers |
| Difference between `stopPropagation` and `stopImmediatePropagation`? | `stopPropagation` stops propagation only; `stopImmediatePropagation` also stops other handlers on the same element |
| How to add a one-time listener? | Pass `{ once: true }` as the third argument |
| Can synthetic events be created? | Yes — `new Event()`, `new CustomEvent()`, `element.dispatchEvent()` |
## Next Steps

[Back to Chapter 15](15-task-queues.md): Task Queues: Macrotask vs Microtask
[Proceed to Chapter 17](17-error-handling.md): Async Error Handling to learn about async error handling.
