# Service Workers

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Network Proxy for Your App

A Service Worker is a programmable network proxy that runs in the background, separate from the web page.

```javascript
// sw.js — registered from main page
self.addEventListener("install", (event) => {
    console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker activated");
});

self.addEventListener("fetch", (event) => {
    console.log("Fetch intercepted:", event.request.url);
});
```

## Registration

```javascript
// main.js
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then(reg => console.log("SW registered:", reg.scope))
        .catch(err => console.error("SW registration failed:", err));
}
```

## Lifecycle

```
Registration
    │
    ▼
Install event  →  Cache static assets
    │
    ▼
Activate event  →  Clean old caches
    │
    ▼
Idle (waiting for fetch events)
    │
    ▼
Fetch events  →  Serve from cache or network
    │
    ▼
Update (new SW detected) → Install → Wait → Activate
```

## Caching Strategies

### Cache First (Offline-first)

```javascript
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(cached => cached || fetch(event.request))
    );
});
```

### Network First (Fresh content)

```javascript
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    );
});
```

### Cache Then Network (Fast + Fresh)

```javascript
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            const network = fetch(event.request).then(response => {
                caches.open("dynamic").then(cache => cache.put(event.request, response.clone()));
                return response;
            });
            return cached || network;
        })
    );
});
```

## Pre-caching Static Assets

```javascript
const CACHE_NAME = "my-app-v1";
const ASSETS = [
    "/",
    "/index.html",
    "/styles.css",
    "/app.js",
    "/logo.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())  // Activate immediately
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
});
```

## Updating Service Workers

```javascript
// main.js — listen for update
navigator.serviceWorker.register("/sw.js").then(reg => {
    reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                console.log("New version available! Refresh to update.");
            }
        });
    });
});
```

## Limitations

```
- Requires HTTPS (except localhost)
- No DOM access
- Lifecycle is asynchronous (not always running)
- Maximum idle timeout (~30 seconds after no events)
- Maximum cache storage (~50MB per origin, varies)
- Registration scope limits which pages it controls
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does this site work offline? | Check if a Service Worker is registered (DevTools → Application → Service Workers). |
| What is cached? | Check Cache Storage in DevTools → Application → Cache Storage. |
| Which strategy is used? | Cache First (offline), Network First (fresh), or Cache Then Network (hybrid). |
| Is there a Service Worker? | `navigator.serviceWorker.controller` is non-null, or check DevTools. |
| Why isn't the latest version loading? | Service Worker may be serving a cached version. Shift+Reload bypasses SW. |
## Next Steps

[Back to Chapter 35](35-web-workers.md): Web Workers
[Proceed to Chapter 37](37-websocket.md): WebSocket to learn about websocket.
