# 16 — Performance Patterns II: DOM, Debounce, Throttle, rAF

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Batch DOM Updates

**Problem:** Each `appendChild` triggers reflow (layout + paint).

```javascript
const list = document.getElementById('list');
for (let i = 0; i < 1000; i++) {
    const item = document.createElement('li');
    item.textContent = `Item ${i}`;
    list.appendChild(item);  // Causes reflow every time
}
```
1000 iterations = 1000 reflows.

**Fix: Document Fragment**

```javascript
const list = document.getElementById('list');
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const item = document.createElement('li');
    item.textContent = `Item ${i}`;
    fragment.appendChild(item);  // No reflow — not in DOM
}

list.appendChild(fragment);  // Single reflow
```

**Fix: innerHTML**

```javascript
let html = '';
for (let i = 0; i < 1000; i++) {
    html += `<li>Item ${i}</li>`;
}
document.getElementById('list').innerHTML = html; // Single reflow
```

### Benchmark

| Approach | Reflows | Time (approx) |
|----------|---------|---------------|
| Individual appends | 1000 | ~50ms |
| DocumentFragment | 1 | ~2ms |
| innerHTML | 1 | ~1ms |

## Debounce

**Problem:** API calls on every keystroke — most are wasted.

```javascript
searchInput.addEventListener('input', (e) => {
    fetch(`/api/search?q=${e.target.value}`);
    // 10 keystrokes = 10 API calls
});
```

**Solution:** Delay execution until a pause in events.

```javascript
function debounce(fn, delay) {
    let timerId;

    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const debouncedSearch = debounce(async (query) => {
    const results = await fetch(`/api/search?q=${query}`);
    // update UI
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

### How It Works

```
Keystroke:     u  s  e  r    p  r  o  f  i  l  e
API calls
  Without:     ↑  ↑  ↑  ↑    ↑  ↑  ↑  ↑  ↑  ↑  ↑   (11 calls)
  With (300ms):              ↑                       (1 call — after pause)
```

## Throttle

**Problem:** Scroll events fire at 60fps+ — most handler calls are wasteful.

```javascript
window.addEventListener('scroll', () => {
    // Complex layout calculation
});
```

**Solution:** Ensure execution at most once per time interval.

```javascript
function throttle(fn, limit) {
    let inThrottle = false;

    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

const throttledScroll = throttle(() => {
    console.log('Scroll position:', window.scrollY);
}, 100);

window.addEventListener('scroll', throttledScroll);
```

### Debounce vs Throttle

| | Debounce | Throttle |
|---|---------|----------|
| **When to use** | After burst stops (search, autocomplete) | During continuous events (scroll, resize, mousemove) |
| **Executes** | Once after pause | Regularly at interval |
| **Guarantees** | Last event triggers | Event triggers at most every N ms |

## requestAnimationFrame

**Problem:** `setTimeout` doesn't sync with the browser's paint cycle → jank + wasted work.

```javascript
function animate() {
    element.style.left = `${parseFloat(element.style.left || 0) + 1}px`;
    setTimeout(animate, 10); // 100fps — unpredictable
}
```

**Solution**

```javascript
function animate(timestamp) {
    element.style.left = `${parseFloat(element.style.left || 0) + 1}px`;
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

`requestAnimationFrame` runs right before the browser paints. Benefits:

| Benefit | Explanation |
|---------|-------------|
| **Syncs with display refresh** | Typically 60fps (16.6ms intervals) |
| **Pauses in background tabs** | Saves battery/CPU |
| **Gets timestamp** | High-resolution time for smooth animation |

**Batch DOM Reads Then Writes**

```javascript
function batchUpdate(timestamp) {
    // Read phase — read all values
    const rects = elements.map(el => el.getBoundingClientRect());

    // Write phase — calculate and apply
    elements.forEach((el, i) => {
        el.style.transform = `translateX(${rects[i].x + 1}px)`;
    });

    requestAnimationFrame(batchUpdate);
}

requestAnimationFrame(batchUpdate);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the loop creating DOM elements? | If yes, batch them |
| Can use DocumentFragment? | Yes, avoids multiple reflows |
| Can use innerHTML? | Yes, single string parse |
| Are rapid repeated events likely? | If yes, use debounce |
| Continuous event? | Throttle |
| Burst followed by pause? | Debounce |
| Is this animation? | Use `requestAnimationFrame` |
## Next Steps

[Back to Chapter 15](15-performance-patterns-i.md): 15 — Performance Patterns I: Loops, Memoization & Lazy Evaluation
[Proceed to Chapter 17](17-web-workers.md): 17 — Web Workers & SharedArrayBuffer to learn about 17 — web workers & sharedarraybuffer.
