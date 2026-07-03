# Debouncing and Throttling

## Debouncing — Wait Before Executing

Debouncing ensures a function is called only after a certain amount of time has passed **since the last invocation**. Search boxes use this.

### Without Debounce

Typing "Hello" triggers 5 API calls: H, He, Hel, Hell, Hello.

### With Debounce

Typing "Hello" → pause 300ms → one API call with "Hello".

### Debounce Implementation

```javascript
function debounce(fn, delay) {
    let timerId = null;

    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const search = debounce(async (query) => {
    const results = await fetch(`/search?q=${query}`);
    console.log(await results.json());
}, 300);

searchInput.addEventListener("input", (e) => {
    search(e.target.value);
});
```

### Immediate Debounce (Leading Edge)

```javascript
function debounce(fn, delay, immediate = false) {
    let timerId = null;

    return function(...args) {
        const callNow = immediate && !timerId;
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            timerId = null;
            if (!immediate) fn.apply(this, args);
        }, delay);
        if (callNow) fn.apply(this, args);
    };
}
```

## Throttling — Limits Frequency

Throttling ensures a function is called **at most once** in a given time interval.

Useful for: scroll, resize, mouse movement, game input.

### Throttle Implementation

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

const handleScroll = throttle(() => {
    console.log("Scrolled at", Date.now());
}, 200);

window.addEventListener("scroll", handleScroll);
```

### Throttle vs Debounce Visual

```
Events:     X   X   X   X   X   X   X   X
            │   │   │   │   │   │   │   │
Debounce:   ───────────────────────X──────
            (only last event after pause)

Throttle:   X──────X──────X──────X──────X──
            (one per interval)
```

### Throttle with Trailing Edge

```javascript
function throttle(fn, limit) {
    let inThrottle = false;
    let lastArgs = null;

    return function(...args) {
        if (inThrottle) {
            lastArgs = args;
            return;
        }
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => {
            inThrottle = false;
            if (lastArgs) {
                fn.apply(this, lastArgs);
                lastArgs = null;
            }
        }, limit);
    };
}
```

## Real-world Use Cases

```
Search input     → 300-500ms debounce
Window resize    → 200ms debounce/throttle
Button click     → prevent double-submit (immediate debounce)
Auto-save        → 1000ms debounce
Scroll handler   → 100-200ms throttle
Mouse move       → 50-100ms throttle
```

## Q&A

| Question | Answer |
|----------|--------|
| What problem does debounce solve? | Reduces frequency of expensive operations (API calls, re-renders). |
| How does debounce work internally? | Cancels previous timer, sets new timer. Only the last call fires. |
| Difference between debounce and throttle? | Debounce delays until activity stops. Throttle limits rate (max once per interval). |
| When use throttle instead of debounce? | When you want periodic updates during continuous activity (scroll, resize). |
| Can throttled function miss the last call? | Yes, unless trailing-edge handling is implemented. |
## Next Steps

[Back to Chapter 18](18-concurrency-patterns.md): Concurrency Patterns
[Proceed to Module 12 Chapter 9](../12-v8-engine/09-memory-leaks-globals-timers-dom.md): Memory Leaks — Globals, Timers & DOM to learn about memory leaks.
