# IntersectionObserver

## Watching Element Visibility

Detects when an element enters or leaves the viewport (or another container).

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("Element is visible:", entry.target);
        }
    });
});

observer.observe(document.querySelector(".lazy-image"));
```

## Observer Options

```javascript
const observer = new IntersectionObserver(callback, {
    root: null,              // Viewport (null) or specific element
    rootMargin: "0px",       // Expand/shrink the root's bounding box
    threshold: [0, 0.5, 1]   // Trigger at 0%, 50%, 100% visibility
});
```

| Option | Purpose |
|--------|---------|
| `root` | Scroll container (null = viewport) |
| `rootMargin` | CSS-like margin around root (e.g., "100px" triggers earlier) |
| `threshold` | Single number or array of percentages (0.0 to 1.0) |

## Lazy Loading Images

```javascript
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;     // Set real source
            img.classList.remove("lazy");
            observer.unobserve(img);       // Stop watching
        }
    });
}, { rootMargin: "200px" });              // Load 200px before visible

document.querySelectorAll("img[data-src]").forEach(img => {
    imageObserver.observe(img);
});
```

## Infinite Scroll

```javascript
const sentinel = document.getElementById("scroll-sentinel");

const scrollObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMoreItems();     // Fetch next page of data
    }
}, { rootMargin: "100px" });

scrollObserver.observe(sentinel);
```

## Tracking Ad/Widget Visibility

```javascript
const adObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(`Ad ${entry.target.id} viewed`);
            trackImpression(entry.target.id);
        }
    });
}, { threshold: 0.5 });  // 50% visible = counted as view
```

## intersectionRatio and isIntersecting

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log("Ratio visible:", entry.intersectionRatio);
        // 0 = not visible, 0.5 = half visible, 1 = fully visible
        console.log("Bounding rect:", entry.boundingClientRect);
        console.log("Intersection rect:", entry.intersectionRect);
        console.log("Root bounds:", entry.rootBounds);
    });
});
```

## Performance Benefits

```
Before: scroll event listener + getBoundingClientRect() calls
        → fires on EVERY scroll pixel (60fps = 60 checks/sec)
        → forces synchronous reflow

After: IntersectionObserver
    → fires only when visibility changes
    → no scroll event needed
    → no layout thrashing
    → browser-optimized
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How is lazy loading implemented? | Check for `IntersectionObserver` on images. |
| Is infinite scroll used? | Look for a sentinel element near the bottom being observed. |
| When does the callback fire? | At the configured thresholds — not on every scroll pixel. |
| Why use IntersectionObserver over scroll events? | Performance: no layout thrashing, browser-optimized. |
## Next Steps

[Back to Chapter 32](32-summary.md): Part 9 Summary
[Proceed to Chapter 34](34-resizeobserver.md): ResizeObserver to learn about resizeobserver.
