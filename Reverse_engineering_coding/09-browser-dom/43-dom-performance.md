# DOM Performance Optimization

## Why DOM Operations Are Slow

Every DOM change can trigger layout, paint, or composite — expensive browser operations.

```
JavaScript engine  ← fast
        │
        ▼
DOM API call       ← fast (in JS)
        │
        ▼
Reflow / Repaint   ← SLOW (browser rendering)
        │
        ▼
Screen update      ← VSync locked (~16ms per frame)
```

## DocumentFragment (Batch DOM Changes)

Instead of adding elements one by one (causing multiple reflows):

```javascript
// BAD: causes reflow on every append
const list = document.getElementById("list");
for (let i = 0; i < 1000; i++) {
    const li = document.createElement("li");
    li.textContent = `Item ${i}`;
    list.appendChild(li);  // Reflow each time!
}

// GOOD: batch with DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const li = document.createElement("li");
    li.textContent = `Item ${i}`;
    fragment.appendChild(li);
}
list.appendChild(fragment);  // ONE reflow
```

## innerHTML vs createElement

```javascript
// Method 1: innerHTML (faster for large HTML strings)
const container = document.getElementById("container");
container.innerHTML = `
    <div class="card">
        <h2>Title</h2>
        <p>Content</p>
    </div>
`;

// Method 2: createElement (safer, better for dynamic data)
const card = document.createElement("div");
card.className = "card";
const h2 = document.createElement("h2");
h2.textContent = "Title";
card.appendChild(h2);
container.appendChild(card);
```

## Batch Style Changes

```javascript
// BAD: multiple reflows
element.style.width = "100px";
element.style.height = "200px";
element.style.margin = "10px";

// GOOD: single reflow via class
element.classList.add("box-active");

// GOOD: cssText
element.style.cssText = "width: 100px; height: 200px; margin: 10px;";
```

## Read/Write Batching (Layout Thrashing)

Reading layout properties forces reflow. Writing also triggers reflow. Interleaving them causes multiple reflows.

```javascript
// BAD: layout thrashing (read → write → read → write)
const w = box.offsetWidth;
box.style.width = (w + 10) + "px";
const h = box.offsetHeight;
box.style.height = (h + 10) + "px";

// GOOD: batch reads then writes
const w = box.offsetWidth;
const h = box.offsetHeight;
box.style.width = (w + 10) + "px";
box.style.height = (h + 10) + "px";

// BEST: use requestAnimationFrame for writes
const w = box.offsetWidth;
requestAnimationFrame(() => {
    box.style.width = (w + 10) + "px";
});
```

## Virtual Scrolling

For lists with thousands of items, only render visible items:

```javascript
// Instead of appending 10,000 <li> elements:
// Only render ~20 visible items + a few buffer items
// Recycle DOM nodes as user scrolls

function VirtualList({ items, itemHeight, containerHeight }) {
    const visibleCount = Math.ceil(containerHeight / itemHeight) + 5;
    const [scrollTop, setScrollTop] = useState(0);
    const startIndex = Math.floor(scrollTop / itemHeight);

    return (
        <div style={{ height: containerHeight, overflow: "auto" }}
             onScroll={(e) => setScrollTop(e.target.scrollTop)}>
            <div style={{ height: items.length * itemHeight }}>
                {items.slice(startIndex, startIndex + visibleCount)
                    .map(item => <ListItem key={item.id} item={item} />)}
            </div>
        </div>
    );
}
```

## Debouncing Expensive Operations

```javascript
// BAD: runs on every keystroke
searchInput.addEventListener("input", (e) => {
    filterResults(e.target.value);  // Expensive DOM operation
});

// GOOD: debounce to run after user stops typing
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

searchInput.addEventListener("input", debounce((e) => {
    filterResults(e.target.value);
}, 300));
```

## will-change CSS Hint

```javascript
// Tell browser which properties will change (for optimization)
element.style.willChange = "transform";
// or in CSS:
// .animated { will-change: transform; }

// Remove after animation (memory usage)
element.addEventListener("animationend", () => {
    element.style.willChange = "auto";
});
```

## Performance Checklist

```
□ Batch DOM reads before writes
□ Use DocumentFragment for multiple insertions
□ Use classList instead of individual style changes
□ Use requestAnimationFrame for visual updates
□ Debounce scroll/resize handlers
□ Use transform/opacity for animations (GPU composited)
□ Avoid forced reflows (reading layout after writing)
□ Virtual scroll for long lists
□ Lazy load off-screen images
□ Remove or hide off-screen elements
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the page janky? | Check Performance tab in DevTools for long frames (>50ms). |
| Are there forced reflows? | Look for layout reads after writes in the same frame. |
| Is virtual scrolling used? | Check if only visible items are rendered. |
| Are animations smooth? | Check if `transform`/`opacity` are used (GPU composited). |
| How to find performance bottlenecks? | DevTools Performance → record → analyze frames. |
## Next Steps

[Back to Chapter 42](42-postmessage.md): Cross-Window Communication (postMessage)
[Proceed to Chapter 44](44-web-vitals.md): 44 — Web Performance & Core Web Vitals to learn about Core Web Vitals and performance optimization.
