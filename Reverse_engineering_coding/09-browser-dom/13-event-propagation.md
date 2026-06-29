# Event Propagation

<img src="https://media.giphy.com/media/3oEjI9xj49ehuAGLQY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Three Phases

When an event occurs on an element, it travels through three phases:

```
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

```
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

```
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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why did parent event execute? | Because the event bubbled up from the child to the parent. |
| Did bubbling occur? | Check if `e.bubbles` is true. Most events bubble (focus, blur, scroll, and load do not). |
| How to stop bubbling? | `e.stopPropagation()`. |
| How to stop all listeners? | `e.stopImmediatePropagation()`. |
| Is the event in capturing or bubbling phase? | `e.eventPhase`: 1 = capturing, 2 = target, 3 = bubbling. |
## Next Steps

[Back to Chapter 12](12-events-basics.md): Events
[Proceed to Chapter 14](14-event-delegation.md): Event Delegation to learn about event delegation.
