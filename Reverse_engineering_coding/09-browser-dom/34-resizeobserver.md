# ResizeObserver

<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Watching Element Size Changes

Fires when an element's dimensions change.

```javascript
const observer = new ResizeObserver((entries) => {
    entries.forEach(entry => {
        console.log("Element:", entry.target);
        console.log("New size:", entry.contentRect);
    });
});

observer.observe(document.getElementById("sidebar"));
```

## entry.contentRect Properties

```javascript
const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const rect = entry.contentRect;
        console.log("Width:", rect.width);          // Content box width
        console.log("Height:", rect.height);        // Content box height
        console.log("X:", rect.x);                  // Left edge
        console.log("Y:", rect.y);                  // Top edge
        console.log("Top:", rect.top);
        console.log("Bottom:", rect.bottom);
        console.log("Left:", rect.left);
        console.log("Right:", rect.right);
    }
});
```

## Responsive Components

```javascript
const component = document.querySelector(".responsive-card");

const resizeObserver = new ResizeObserver((entries) => {
    const { width } = entries[0].contentRect;

    if (width < 400) {
        component.classList.add("compact");
        component.classList.remove("expanded");
    } else if (width < 800) {
        component.classList.add("medium");
        component.classList.remove("compact");
    } else {
        component.classList.add("expanded");
        component.classList.remove("compact", "medium");
    }
});

resizeObserver.observe(component);
```

## Watching Multiple Elements

```javascript
const observer = new ResizeObserver((entries) => {
    entries.forEach(entry => {
        updateLayout(entry.target, entry.contentRect);
    });
});

document.querySelectorAll(".resizable").forEach(el => observer.observe(el));
```

## Stopping Observation

```javascript
// Stop watching a specific element
observer.unobserve(element);

// Stop watching all elements
observer.disconnect();
```

## vs window.resize Event

```
window.resize:
  - Fires when the VIEWPORT changes
  - Does NOT fire when individual elements resize
  - Performance: fires rapidly during resize

ResizeObserver:
  - Fires when ANY observed element changes size
  - Includes viewport changes that affect element size
  - More efficient: targeted observations
```

## Use Cases

```
- Responsive charts/graphs that need to redraw on container resize
- Textarea auto-grow (watch textarea, update height)
- Dashboard widgets that adapt to available space
- Virtual scroll lists that need container dimensions
- Iframe resizing (watch parent, adjust iframe)
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does this component respond to size changes? | Check for `ResizeObserver`. |
| How does the layout adapt? | The observer callback checks `contentRect.width/height` and applies classes. |
| Is it using window.resize instead? | `window.resize` is less efficient and doesn't catch individual element resizes. |
| When should I use ResizeObserver? | When an element needs to react to its own size changes, not just viewport changes. |
## Next Steps

[Back to Chapter 33](33-intersectionobserver.md): IntersectionObserver
[Proceed to Chapter 35](35-web-workers.md): Web Workers to learn about web workers.
