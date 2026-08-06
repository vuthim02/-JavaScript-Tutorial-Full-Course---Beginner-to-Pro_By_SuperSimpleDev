# Chapter 20 — Cancellation Patterns

## Overview

JavaScript doesn't have built-in cancellation for Promises. This lesson covers the standard patterns for cancelling async operations.

---

## AbortController (Recommended)

```javascript
const controller = new AbortController();
const { signal } = controller;

fetch('/api/data', { signal })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => {
        if (err.name === 'AbortError') {
            console.log('Fetch cancelled');
        }
    });

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);
```

---

## Custom Abort Pattern for Promises

```javascript
function cancellableFetch(url, options = {}) {
    const controller = new AbortController();
    const promise = fetch(url, { ...options, signal: controller.signal });
    return { promise, abort: () => controller.abort() };
}

const { promise, abort } = cancellableFetch('/api/data');
promise.then(res => res.json()).then(console.log);

// Cancel if needed
abort();
```

---

## Race-Based Cancellation

```javascript
function withTimeout(promise, ms) {
    let timerId;
    const timeout = new Promise((_, reject) => {
        timerId = setTimeout(() => reject(new Error('Timeout')), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timerId));
}

withTimeout(fetch('/api/slow'), 3000)
    .then(res => res.json())
    .catch(err => console.log(err.message)); // "Timeout" after 3s
```

---

## Cleanup Pattern (React)

```javascript
useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
        try {
            const res = await fetch('/api/data', {
                signal: controller.signal
            });
            const data = await res.json();
            setData(data);
        } catch (err) {
            if (err.name !== 'AbortError') throw err;
        }
    }

    loadData();
    return () => controller.abort(); // cleanup
}, []);
```

---

## Next Steps

[Back to Chapter 19](19-debounce-throttle.md): Debounce and Throttle
[Proceed to Chapter 21](21-review-checklist.md): Review Checklist
