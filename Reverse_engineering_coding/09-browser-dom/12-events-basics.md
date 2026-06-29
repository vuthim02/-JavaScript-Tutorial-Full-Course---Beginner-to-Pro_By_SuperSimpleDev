# Events

<img src="https://media.giphy.com/media/3oEjI9xj49ehuAGLQY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Event-Driven Programming

Everything interactive depends on events.

Examples:

```
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
button.addEventListener("click", handler);
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

```
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

## The Event Object

When a handler fires, it receives an event object:

```javascript
button.addEventListener("click", function(event) {
});
```

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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Who triggers this event? | User action (click, keypress) or browser (load, DOMContentLoaded) or JS code. |
| User? | Click, keydown, scroll, input. |
| Browser? | Load, DOMContentLoaded, resize. |
| Timer? | setTimeout/setInterval callbacks are events too. |
| Is listener passive? | Check `addEventListener` options. Passive listeners improve scroll performance. |
| Which element generated event? | `e.target` (the element that was actually clicked/acted upon). |
| Which element is listening? | `e.currentTarget` (the element with addEventListener). |
| What type of event? | `e.type` property. |
| Was default prevented? | `e.defaultPrevented`. |
## Next Steps

[Back to Chapter 11](11-traversing-dom.md): Traversing DOM
[Proceed to Chapter 13](13-event-propagation.md): Event Propagation to learn about event propagation.
