# requestAnimationFrame

## Smooth Animation

```javascript
requestAnimationFrame()
```

```javascript
function animate(timestamp) {
    console.log("Frame at:", timestamp);
    // Update animation state
    element.style.transform = `translateX(${Math.sin(timestamp / 1000) * 100}px)`;
    
    requestAnimationFrame(animate); // Schedule next frame
}

requestAnimationFrame(animate);
```

---

## Why It's Better than setInterval

| Feature | `setInterval(fn, 16)` | `requestAnimationFrame(fn)` |
|---------|----------------------|---------------------------|
| Timing | Approximate (~16ms) | Syncs with screen refresh |
| Tab inactive | Still runs (wasteful) | Pauses automatically |
| Battery | Drains battery | Battery-friendly |
| Frames dropped | Continues regardless | Adapts to monitor refresh |
| Callback arg | None | High-resolution timestamp |

---

## FPS Counter

```javascript
let frameCount = 0;
let lastTime = performance.now();

function countFPS(timestamp) {
    frameCount++;
    
    if (timestamp - lastTime >= 1000) {
        console.log(`FPS: ${frameCount}`);
        frameCount = 0;
        lastTime = timestamp;
    }
    
    requestAnimationFrame(countFPS);
}

requestAnimationFrame(countFPS);
```

---

## Cancelling Animation

```javascript
const animationId = requestAnimationFrame(animate);

// Cancel
cancelAnimationFrame(animationId);
```
## Next Steps

[Back to Chapter 27](27-reflow-vs-repaint.md): Reflow vs Repaint
[Proceed to Chapter 29](29-mutationobserver.md): MutationObserver to learn about mutationobserver.
