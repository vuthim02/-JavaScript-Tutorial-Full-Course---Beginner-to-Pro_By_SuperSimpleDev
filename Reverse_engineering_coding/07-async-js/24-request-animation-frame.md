# requestAnimationFrame

## What Is requestAnimationFrame?

A browser API that schedules a function to run **before the next paint/repaint**. The browser controls the timing — typically 60fps (every ~16.67ms).

```javascript
function animate() {
    // Update animation state
    element.style.transform = `translateX(${position}px)`;

    // Schedule the next frame
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

## Why Use It Instead of setInterval?

| Feature | setInterval(fn, 16) | requestAnimationFrame |
|---------|-------------------|----------------------|
| Timing | Fixed interval | Synchronized with browser paint |
| Tab hidden | Still runs (throttled) | **Pauses automatically** |
| Battery friendly | No | Yes — pauses when not visible |
| Frame skipping | May queue up | Drops frames if behind |
| Precision | ~4ms minimum | Vsync-aligned |

## Basic Usage

```javascript
const box = document.getElementById("box");
let position = 0;

function move() {
    position += 2;
    box.style.transform = `translateX(${position}px)`;

    if (position < 500) {
        requestAnimationFrame(move);
    }
}

requestAnimationFrame(move);
```

## Cancelling

```javascript
let animationId;

function start() {
    function loop() {
        update();
        animationId = requestAnimationFrame(loop);
    }
    animationId = requestAnimationFrame(loop);
}

function stop() {
    cancelAnimationFrame(animationId);
}
```

## FPS Control

requestAnimationFrame runs at display refresh rate. For lower FPS:

```javascript
let lastTime = 0;
const TARGET_FPS = 30;
const INTERVAL = 1000 / TARGET_FPS;

function loop(timestamp) {
    const delta = timestamp - lastTime;

    if (delta >= INTERVAL) {
        update(delta);
        lastTime = timestamp - (delta % INTERVAL);
    }

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
```

## Timestamp Parameter

The callback receives a high-resolution timestamp (DOMHighResTimeStamp):

```javascript
let startTime = null;

function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    const progress = Math.min(elapsed / 2000, 1); // 2 second animation
    element.style.opacity = progress;

    if (progress < 1) {
        requestAnimationFrame(step);
    }
}

requestAnimationFrame(step);
```

## Delta-Time Based Animation

```javascript
let lastTimestamp = 0;

function gameLoop(timestamp) {
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    // Move based on elapsed time (frame-rate independent)
    player.x += player.speed * (delta / 16.67);

    render();
    requestAnimationFrame(gameLoop);
}

gameLoop(performance.now());
```

## Polyfill for Older Browsers

```javascript
const rAF = window.requestAnimationFrame ||
    function(callback) {
        return setTimeout(callback, 1000 / 60);
    };

const cAF = window.cancelAnimationFrame ||
    function(id) { clearTimeout(id); };
```

## requestAnimationFrame in Node.js

Not available natively. Use `setImmediate` or `setTimeout` with polyfill.

## Use Cases

| Use Case | Why rAF? |
|----------|----------|
| CSS animations (JS-driven) | Smooth, vsync-aligned |
| Canvas/WebGL rendering | Syncs with display refresh |
| Scroll-based effects | Efficient, pauses when hidden |
| Game loops | Frame-rate independent timing |
| Lazy loading (check visibility) | Runs before paint, efficient |

## Q&A

| Question | Answer |
|----------|--------|
| When does the callback run? | Before the next browser paint/repaint |
| How many times per second? | Matches display refresh (typically 60fps) |
| Does it run when tab is hidden? | No — automatically pauses |
| Can you control FPS? | Yes — manually throttle by checking timestamps |
| What argument does callback receive? | A DOMHighResTimeStamp (ms since page load) |
| Difference from setInterval(fn, 16)? | rAF pauses when hidden, drops frames if behind, is vsync-aligned |
| How to cancel? | `cancelAnimationFrame(id)` |
## Next Steps

[Back to Chapter 23](23-set-interval.md): setInterval & clearInterval
[Proceed to Chapter 25](25-web-workers.md): Web Workers — True Parallelism to learn about web workers — true parallelism.
