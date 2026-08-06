# Comprehensive JavaScript Web APIs Reference

Web APIs are browser-provided interfaces that extend JavaScript beyond the core language, enabling interaction with the DOM, network, hardware, storage, graphics, and more. This guide covers 63+ Web APIs comprehensively.

---

## Table of Contents

1. [Fetch API](#1-fetch-api)
2. [Web Storage API](#2-web-storage-api)
3. [IndexedDB](#3-indexeddb)
4. [Web SQL (Deprecated)](#4-web-sql-deprecated)
5. [Cache API](#5-cache-api)
6. [Web Workers](#6-web-workers)
7. [Service Workers](#7-service-workers)
8. [WebSockets](#8-websockets)
9. [Server-Sent Events (EventSource)](#9-server-sent-events-eventsource)
10. [Broadcast Channel](#10-broadcast-channel)
11. [Notification API](#11-notification-api)
12. [Geolocation API](#12-geolocation-api)
13. [Canvas API](#13-canvas-api)
14. [WebGL / WebGL2](#14-webgl--webgl2)
15. [Web Audio API](#15-web-audio-api)
16. [WebRTC](#16-webrtc)
17. [Web Animations API](#17-web-animations-api)
18. [Intersection Observer](#18-intersection-observer)
19. [Mutation Observer](#19-mutation-observer)
20. [Resize Observer](#20-resize-observer)
21. [Performance Observer](#21-performance-observer)
22. [Reporting Observer](#22-reporting-observer)
23. [Page Visibility API](#23-page-visibility-api)
24. [History API](#24-history-api)
25. [URL API / URLSearchParams](#25-url-api--urlsearchparams)
26. [Navigation API](#26-navigation-api-new)
27. [View Transitions API](#27-view-transitions-api)
28. [AbortController / AbortSignal](#28-abortcontroller--abortsignal)
29. [Blob and File API](#29-blob-and-file-api)
30. [FileReader](#30-filereader)
31. [FormData](#31-formdata)
32. [URL.createObjectURL / revokeObjectURL](#32-urlcreateobjecturl--revokeobjecturl)
33. [TextEncoder / TextDecoder](#33-textencoder--textdecoder)
34. [Encoding API](#34-encoding-api)
35. [Base64: btoa / atob](#35-base64-encoding-btoa--atob)
36. [Crypto API](#36-crypto-api-windowcrypto)
37. [SubtleCrypto](#37-subtlecrypto)
38. [Console API](#38-console-api)
39. [Performance API](#39-performance-api)
40. [matchMedia / MediaQueryList](#40-matchmedia--mediaquerylist)
41. [Clipboard API](#41-clipboard-api)
42. [Drag and Drop API](#42-drag-and-drop-api)
43. [Fullscreen API](#43-fullscreen-api)
44. [Pointer Lock API](#44-pointer-lock-api)
45. [Vibration API](#45-vibration-api)
46. [Battery Status API](#46-battery-status-api)
47. [Gamepad API](#47-gamepad-api)
48. [Bluetooth API](#48-bluetooth-api)
49. [USB API](#49-usb-api)
50. [WebUSB](#50-webusb)
51. [Web Serial](#51-web-serial)
52. [Web Bluetooth](#52-web-bluetooth)
53. [Permissions API](#53-permissions-api)
54. [Storage API / StorageManager](#54-storage-api--storagemanager)
55. [Background Tasks (requestIdleCallback)](#55-background-tasks-requestidlecallback)
56. [requestAnimationFrame](#56-requestanimationframe)
57. [Cross-Origin Isolation](#57-cross-origin-isolation)
58. [SharedArrayBuffer / Atomics](#58-sharedarraybuffer--atomics)
59. [Trusted Types API](#59-trusted-types-api)
60. [Sanitizer API](#60-sanitizer-api)
61. [Content Security Policy (CSP)](#61-content-security-policy-csp)

---

## 1. Fetch API

The Fetch API provides a modern, Promise-based interface for making HTTP requests, replacing XMLHttpRequest (XHR). It works in both `Window` and `Worker` contexts.

### Core Concepts

- **`fetch()`** — Global method that takes a URL and optional init object, returns a `Promise<Response>`.
- **Request/Response pattern** — `fetch()` resolves to a `Response` object; body methods (`.json()`, `.text()`, `.blob()`, `.arrayBuffer()`, `.formData()`) return another Promise and can only be called **once** (body is a stream).
- **Error handling** — `fetch()` only rejects on **network failures**, NOT on HTTP error statuses (4xx/5xx). You must check `response.ok` manually.

### Basic Usage

```js
// GET request
async function getUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const user = await response.json();
  return user;
}

// POST request with JSON body
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' }),
});
const data = await response.json();
```

### Request Object

The `Request` interface represents a resource request with properties:
- `method` — HTTP method (GET, POST, PUT, PATCH, DELETE)
- `headers` — Associated `Headers` object
- `body` — `ReadableStream` of body contents
- `bodyUsed` — Boolean indicating if body has been consumed
- `cache` — Cache mode (`default`, `reload`, `no-cache`, `no-store`, `force-cache`, `only-if-cached`)
- `credentials` — Credential mode (`omit`, `same-origin`, `include`)
- `redirect` — Redirect handling (`follow`, `error`, `manual`)
- `integrity` — Subresource integrity value

### Response Object

```js
const response = await fetch(url);
console.log(response.status);       // 200
console.log(response.ok);           // true (200-299)
console.log(response.headers.get('content-type')); // 'application/json'
console.log(response.url);          // final URL after redirects
console.log(response.type);         // 'basic', 'cors', 'opaque', 'opaqueredirect'
```

### Headers API

```js
const headers = new Headers({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer token123',
});
headers.append('X-Custom', 'value');
headers.has('Content-Type'); // true
headers.get('Content-Type'); // 'application/json'
headers.delete('X-Custom');
// Iterate: headers.forEach((value, key) => {});
```

### Body Mixin

Both `Request` and `Response` share the Body mixin, providing:
- `body` — ReadableStream
- `bodyUsed` — Boolean
- `.arrayBuffer()` — Returns ArrayBuffer
- `.blob()` — Returns Blob
- `.formData()` — Returns FormData
- `.json()` — Returns parsed JSON
- `.text()` — Returns plain text string

### Streaming

```js
const response = await fetch(url);
const reader = response.body.getReader();
const totalLength = +response.headers.get('Content-Length');
let receivedLength = 0;

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  receivedLength += value.length;
  console.log(`Downloaded: ${(receivedLength / totalLength * 100).toFixed(1)}%`);
}
```

### Abort with AbortController

```js
const controller = new AbortController();
const signal = controller.signal;

fetch(url, { signal })
  .then(response => response.json())
  .catch(err => {
    if (err.name === 'AbortError') console.log('Request aborted');
  });

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);
```

### Other HTTP Methods

```js
// PUT (full update)
fetch('/api/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', email: 'new@example.com' }),
});

// PATCH (partial update)
fetch('/api/users/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice Updated' }),
});

// DELETE
fetch('/api/users/1', { method: 'DELETE' });
```

### fetchLater() (Deferred Fetch)

A newer API that allows requesting a deferred fetch, sent after a specified period or when the page is closed/navigated away from.

---

## 2. Web Storage API

The Web Storage API provides simple key-value storage mechanisms: `localStorage` and `sessionStorage`. Both implement the `Storage` interface.

### localStorage

- **Persists** indefinitely (until explicitly cleared or browser data is wiped)
- **Synchronous** API
- **~5-10 MB** per origin limit
- **Same-origin** access only
- Stores **strings only** (objects must be JSON-serialized)

```js
// Write
localStorage.setItem('username', 'alice');
localStorage.setItem('theme', 'dark');
const user = { id: 1, name: 'Alice', role: 'admin' };
localStorage.setItem('user', JSON.stringify(user));

// Read
const username = localStorage.getItem('username');
const userData = JSON.parse(localStorage.getItem('user'));
const theme = localStorage.getItem('theme') || 'light';

// Remove
localStorage.removeItem('username');

// Clear all
localStorage.clear();

// Iterate
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}

// Properties
console.log(localStorage.length); // number of items
```

### sessionStorage

- **Scoped to the browser tab** — data disappears when the tab is closed
- **Same API** as localStorage
- **~5 MB** per origin limit
- **Same-origin** access only
- **Not shared** between tabs (even same origin)

```js
sessionStorage.setItem('sessionId', '123456');
const sessionId = sessionStorage.getItem('sessionId');
sessionStorage.removeItem('sessionId');
sessionStorage.clear();
```

### Storage Event

Fires when storage changes in **another** window/tab of the same origin:

```js
window.addEventListener('storage', (event) => {
  console.log('Key:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
  console.log('URL:', event.url);
});
```

### Comparison Table

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|----------------|---------|
| Capacity | ~5-10 MB | ~5 MB | ~4 KB |
| Persistence | Until cleared | Until tab close | Configurable |
| Data type | Strings only | Strings only | Strings only |
| Sent to server | No | No | Yes |
| Accessible via JS | Yes | Yes | Yes |

---

## 3. IndexedDB

IndexedDB is a powerful, asynchronous, transactional database for storing structured data client-side. It can handle large datasets (hundreds of MB to GBs) and complex queries.

### Core Concepts

- **Database** — Contains object stores (like tables)
- **Object Store** — Where data is stored (like a table)
- **Index** — Allows querying by secondary keys
- **Transaction** — Group of operations that succeed or fail together
- **Cursor** — Iterates over records
- **Version** — Database schema version (triggers upgrade)

### Opening a Database

```js
const request = indexedDB.open('MyDatabase', 1); // version 1

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  if (!db.objectStoreNames.contains('users')) {
    const store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    store.createIndex('name', 'name', { unique: false });
    store.createIndex('email', 'email', { unique: true });
  }
};

request.onsuccess = (event) => {
  const db = event.target.result;
  // Use the database
};

request.onerror = (event) => {
  console.error('IndexedDB error:', event.target.error);
};
```

### CRUD Operations

```js
// Create/Add
const transaction = db.transaction(['users'], 'readwrite');
const store = transaction.objectStore('users');
const addRequest = store.add({ name: 'Alice', email: 'alice@example.com' });
addRequest.onsuccess = () => console.log('Added');

// Read
const getRequest = store.get(1); // by primary key
getRequest.onsuccess = () => console.log(getRequest.result);

// Read all
const getAllRequest = store.getAll();
getAllRequest.onsuccess = () => console.log(getAllRequest.result);

// Update
const putRequest = store.put({ id: 1, name: 'Alice Updated', email: 'alice@example.com' });

// Delete
const deleteRequest = store.delete(1);
```

### Using Indexes

```js
const index = store.index('name');
const indexRequest = index.get('Alice');
indexRequest.onsuccess = () => console.log(indexRequest.result);

// Range queries
const range = IDBKeyRange.bound('A', 'M');
const rangeRequest = store.index('name').openCursor(range);
```

### Cursor Iteration

```js
const cursorRequest = store.openCursor();
cursorRequest.onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    console.log(cursor.value);
    cursor.continue(); // move to next
  } else {
    console.log('All items read');
  }
};
```

### Wrapped with Promises (Modern Pattern)

```js
function openDB(name, version) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);
    request.onupgradeneeded = (e) => resolve(e.target.result);
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

async function getUsers(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
```

### Key Interfaces

| Interface | Purpose |
|-----------|---------|
| `IDBDatabase` | Connection to a database |
| `IDBTransaction` | Transaction scope |
| `IDBObjectStore` | Data store (like a table) |
| `IDBIndex` | Secondary index for fast queries |
| `IDBCursor` | Iterates over records |
| `IDBKeyRange` | Defines key ranges for queries |
| `IDBRequest` | Handles async requests |

---

## 4. Web SQL (Deprecated)

Web SQL was a browser database API using SQLite. It is **deprecated** and not supported in all browsers (Chrome had it, Firefox/Safari never did). Use IndexedDB instead.

### Legacy Interface (for reference)

```js
// Open/create database
const db = openDatabase('mydb', '1.0', 'My Database', 2 * 1024 * 1024);

db.transaction((tx) => {
  tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');
  tx.executeSql('INSERT INTO users (name) VALUES (?)', ['Alice']);
});

db.transaction((tx) => {
  tx.executeSql('SELECT * FROM users', [], (tx, results) => {
    console.log(results.rows);
  });
});
```

**Status:** Deprecated. Do NOT use in new projects.

---

## 5. Cache API

The Cache API provides a programmatic interface for storing and retrieving network responses (request/response pairs) in the browser. It is primarily used by **Service Workers** for offline support.

```js
// Open/create a cache
const cache = await caches.open('my-cache-v1');

// Add a response
await cache.put(
  new Request('/api/data'),
  new Response('{"key": "value"}', {
    headers: { 'Content-Type': 'application/json' },
  })
);

// Match a cached response
const response = await cache.match('/api/data');
if (response) {
  const data = await response.json();
}

// Check if cache has a request
const match = await cache.match('/api/data'); // undefined if not found

// Delete a cached response
await cache.delete('/api/data');

// Get all cache keys
const keys = await cache.keys();
keys.forEach(request => console.log(request.url));

// List all caches
const cacheNames = await caches.keys();

// Delete a cache
await caches.delete('my-cache-v1');
```

### Cache Strategies (used with Service Workers)

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Cache First | Check cache, fall back to network | Static assets (fonts, images) |
| Network First | Check network, fall back to cache | Frequently updated APIs |
| Stale While Revalidate | Serve cache, update in background | HTML, non-critical APIs |
| Cache Only | Only serve from cache | Pre-cached offline pages |
| Network Only | Only serve from network | Payments, real-time data |

---

## 6. Web Workers

Web Workers enable running JavaScript in **background threads**, keeping the main thread free for UI. They cannot access the DOM.

### Dedicated Worker

```js
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ data: [1, 2, 3, 4, 5] });

worker.onmessage = (event) => {
  console.log('Result from worker:', event.data);
};

worker.onerror = (error) => {
  console.error('Worker error:', error);
};

// worker.js
self.onmessage = (event) => {
  const result = event.data.data.reduce((a, b) => a + b, 0);
  self.postMessage(result);
};
```

### SharedWorker

```js
// main.js
const sharedWorker = new SharedWorker('shared-worker.js');
sharedWorker.port.start();
sharedWorker.port.postMessage('Hello from main');

sharedWorker.port.onmessage = (event) => {
  console.log('Message:', event.data);
};

// shared-worker.js
self.onconnect = (event) => {
  const port = event.ports[0];
  port.onmessage = (msgEvent) => {
    port.postMessage('Echo: ' + msgEvent.data);
  };
};
```

### Worker Capabilities

| Feature | Main Thread | Dedicated Worker | SharedWorker |
|---------|-------------|------------------|--------------|
| DOM access | Yes | No | No |
| fetch() | Yes | Yes | Yes |
| IndexedDB | Yes | Yes | Yes |
| postMessage | Yes | Yes | Yes |
| importScripts | No | Yes | Yes |
| Shared between tabs | No | No | Yes |

### Communication (Structured Clone + Transferable)

```js
// Transferable objects (zero-copy)
const buffer = new ArrayBuffer(1024);
worker.postMessage(buffer, [buffer]); // buffer transferred, not copied
// buffer.byteLength === 0 after transfer

// SharedArrayBuffer (shared memory)
const sharedBuffer = new SharedArrayBuffer(1024);
worker.postMessage(sharedBuffer); // shared, not transferred
```

---

## 7. Service Workers

Service Workers are specialized workers that act as **programmable network proxies** between the browser and the network. They enable offline support, push notifications, background sync, and caching strategies.

### Lifecycle

```
Registration → Installation → Activation → Idle → Fetch Events
```

1. **Install** — Cache static assets
2. **Activate** — Clean up old caches
3. **Fetch** — Intercept network requests, serve from cache or network
4. **Idle** — No events to handle
5. **Terminated** — Evicted from memory to save resources

### Registration

```js
// main.js
if ('serviceWorker' in navigator) {
  const registration = await navigator.serviceWorker.register('/sw.js', {
    scope: '/',
    updateViaCache: 'none',
  });

  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'activated') {
        console.log('New version ready!');
      }
    });
  });
}
```

### Service Worker File

```js
// sw.js
const CACHE_NAME = 'app-v1';
const STATIC_ASSETS = ['/', '/styles/main.css', '/scripts/main.js', '/offline.html'];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting(); // activate immediately
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // take control immediately
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => caches.match('/offline.html'));
    })
  );
});
```

### Caching Strategies

| Strategy | Implementation |
|----------|---------------|
| Cache First | Check cache → fallback to network |
| Network First | Check network → fallback to cache |
| Stale While Revalidate | Serve cache + update cache in background |
| Cache Only | Serve only from cache |
| Network Only | Serve only from network |

### Key Concepts

- **Scope** — Determines which pages the SW can control (based on script location)
- **`event.waitUntil()`** — Tells browser work is ongoing (don't terminate yet)
- **`self.clients.claim()`** — Immediately take control of all pages
- **`self.skipWaiting()`** — Skip waiting phase and activate immediately
- **HTTPS required** — Service workers only work over HTTPS (or localhost)

---

## 8. WebSockets

WebSockets provide **full-duplex, bidirectional** communication over a single TCP connection. After an HTTP upgrade handshake, the connection switches to the WebSocket protocol for low-overhead message exchange.

```js
// Client
const ws = new WebSocket('wss://api.example.com/chat');

ws.onopen = () => {
  console.log('Connected');
  ws.send(JSON.stringify({ type: 'join', room: 'general' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

ws.onerror = (error) => console.error('WebSocket error:', error);
ws.onclose = (event) => {
  console.log('Disconnected:', event.code, event.reason);
};

// Send data
ws.send(JSON.stringify({ type: 'message', text: 'Hello!' }));

// Binary data
const buffer = new ArrayBuffer(1024);
ws.send(buffer);

// Close connection
ws.close(1000, 'Normal closure');
```

### WebSocket States

| State | Constant | Description |
|-------|----------|-------------|
| 0 | `CONNECTING` | Connection being established |
| 1 | `OPEN` | Connection open, ready for communication |
| 2 | `CLOSING` | Connection closing in progress |
| 3 | `CLOSED` | Connection closed |

### Key Features

- **Low overhead** — After handshake, frames have minimal headers (2-14 bytes)
- **Binary support** — Native support for ArrayBuffer, Blob
- **Bidirectional** — Either side can send at any time
- **No automatic reconnection** — Must implement reconnection logic manually
- **No CORS restrictions** — After upgrade, no CORS headers needed
- **Auth challenge** — Cannot set custom headers during connection

---

## 9. Server-Sent Events (EventSource)

Server-Sent Events (SSE) provide **one-way server-to-client** streaming over a standard HTTP connection. The browser's `EventSource` API handles automatic reconnection.

```js
// Client
const eventSource = new EventSource('/api/stream');

// Default message handler
eventSource.onmessage = (event) => {
  console.log('Data:', event.data);
  console.log('Event ID:', event.lastEventId);
};

// Named events
eventSource.addEventListener('notification', (event) => {
  console.log('Notification:', JSON.parse(event.data));
});

eventSource.addEventListener('update', (event) => {
  console.log('Update:', JSON.parse(event.data));
});

// Error handling (auto-reconnects by default)
eventSource.onerror = (error) => {
  console.error('SSE error:', error);
};

// Close connection
eventSource.close();
```

### Server (Node.js/Express)

```js
app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify({ time: new Date().toISOString() })}\n\n`);
  }, 1000);

  req.on('close', () => clearInterval(intervalId));
});
```

### SSE Event Format

```
event: notification
id: 12345
retry: 5000
data: {"message": "Hello!"}

data: Second event with no event type

data: Multi-line
data: data continues here

```

### SSE vs WebSocket Comparison

| Feature | SSE | WebSocket |
|---------|-----|-----------|
| Direction | Server → Client | Bidirectional |
| Protocol | HTTP | WS/WSS |
| Auto-reconnect | Built-in | Must implement |
| Binary data | No (base64 only) | Yes |
| Text-based | Yes | Text + Binary |
| Infrastructure | Standard HTTP | WS-aware proxies needed |
| Use case | Notifications, dashboards, LLM streaming | Chat, gaming, collaboration |

---

## 10. Broadcast Channel

The Broadcast Channel API enables **same-origin** communication between browsing contexts (tabs, windows, iframes, workers) through a named channel.

```js
// Sender (Tab 1)
const channel = new BroadcastChannel('my-channel');
channel.postMessage({ type: 'update', data: 'Hello from Tab 1!' });
channel.postMessage('Simple text message');

// Receiver (Tab 2)
const channel = new BroadcastChannel('my-channel');
channel.onmessage = (event) => {
  console.log('Received:', event.data);
};

// Close the channel
channel.close();
```

### Key Points

- **Same-origin only** — Both contexts must be from the same origin
- **Structured clone** — Messages are cloned (supports complex objects)
- **Named channels** — Different channel names create isolated communication lanes
- **No delivery guarantee** — If a tab isn't listening, messages are lost

---

## 11. Notification API

The Notification API allows web pages to display **system-level notifications** to the user, even when the page is in the background.

### Request Permission

```js
// Must be called from a user gesture
const permission = await Notification.requestPermission();
console.log(permission); // 'granted', 'denied', or 'default'
```

### Show Notification

```js
if (Notification.permission === 'granted') {
  const notification = new Notification('Hello!', {
    body: 'This is a notification from the web page.',
    icon: '/icon.png',
    badge: '/badge.png',
    tag: 'unique-id', // prevents duplicate notifications
    data: { url: '/page' },
    requireInteraction: false,
    silent: false,
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };

  notification.onclose = () => console.log('Notification closed');
}
```

### Using Service Worker for Notifications (Push API)

```js
// In service worker
self.addEventListener('push', (event) => {
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
    })
  );
});
```

---

## 12. Geolocation API

The Geolocation API provides access to the device's physical location (GPS, Wi-Fi, cell tower triangulation).

```js
// Check support
if ('geolocation' in navigator) {
  // Get current position
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      console.log('Accuracy:', position.coords.accuracy, 'meters');
      console.log('Altitude:', position.coords.altitude);
      console.log('Speed:', position.coords.speed);
      console.log('Timestamp:', position.timestamp);
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log('User denied geolocation');
          break;
        case error.POSITION_UNAVAILABLE:
          console.log('Position unavailable');
          break;
        case error.TIMEOUT:
          console.log('Request timed out');
          break;
      }
    },
    {
      enableHighAccuracy: true, // GPS vs network-based
      timeout: 10000,           // max wait time (ms)
      maximumAge: 60000,        // max cached position age (ms)
    }
  );
}

// Watch position (continuous tracking)
const watchId = navigator.geolocation.watchPosition(
  (position) => updateMap(position),
  (error) => console.error(error)
);

// Stop watching
navigator.geolocation.clearWatch(watchId);
```

---

## 13. Canvas API

The Canvas API provides a means for drawing 2D graphics via JavaScript and the HTML `<canvas>` element. It can be used for animations, game graphics, data visualization, photo manipulation, and real-time video processing.

### Setup

```html
<canvas id="myCanvas" width="300" height="200"></canvas>
```

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d'); // 2D context
```

### Drawing Shapes

```js
// Rectangle
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 150, 100); // filled
ctx.strokeRect(10, 10, 150, 100); // outlined
ctx.clearRect(10, 10, 50, 50); // clear area

// Circle
ctx.beginPath();
ctx.arc(150, 100, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();

// Line
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.strokeStyle = 'green';
ctx.lineWidth = 3;
ctx.stroke();

// Path (complex shapes)
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(100, 150);
ctx.lineTo(150, 50);
ctx.closePath();
ctx.fillStyle = 'purple';
ctx.fill();
ctx.stroke();
```

### Text

```js
ctx.font = '24px Arial';
ctx.fillStyle = 'black';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('Hello Canvas!', 150, 100);
ctx.strokeText('Outline Text', 150, 130);

const metrics = ctx.measureText('Hello');
console.log('Width:', metrics.width);
```

### Images

```js
const img = new Image();
img.src = 'photo.jpg';
img.onload = () => {
  ctx.drawImage(img, 0, 0); // draw at original size
  ctx.drawImage(img, 0, 0, 300, 200); // scaled
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh); // crop + scale
};
```

### Transformations

```js
ctx.translate(100, 100);   // move origin
ctx.rotate(Math.PI / 4);   // rotate 45 degrees
ctx.scale(2, 2);           // scale 2x
ctx.transform(a, b, c, d, e, f); // custom transform
ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
```

### Animations

```js
let x = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(x, 50, 50, 50);
  x++;
  requestAnimationFrame(animate);
}
animate();
```

### Pixel Manipulation

```js
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const pixels = imageData.data; // Uint8ClampedArray [r,g,b,a, r,g,b,a, ...]
for (let i = 0; i < pixels.length; i += 4) {
  pixels[i] = 255 - pixels[i];     // invert red
  pixels[i + 1] = 255 - pixels[i + 1]; // invert green
  pixels[i + 2] = 255 - pixels[i + 2]; // invert blue
}
ctx.putImageData(imageData, 0, 0);
```

### Key Interfaces

| Interface | Purpose |
|-----------|---------|
| `CanvasRenderingContext2D` | 2D drawing context |
| `CanvasGradient` | Gradient fills |
| `CanvasPattern` | Pattern fills |
| `ImageData` | Pixel data |
| `TextMetrics` | Text measurement |
| `Path2D` | Reusable path objects |
| `OffscreenCanvas` | Canvas for workers |

---

## 14. WebGL / WebGL2

WebGL (Web Graphics Library) is a JavaScript API for rendering **hardware-accelerated 2D and 3D graphics** using OpenGL ES. WebGL2 adds OpenGL ES 3.0 features.

### Basic Setup

```js
const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl2'); // WebGL2

if (!gl) {
  console.error('WebGL2 not supported');
  // Fallback: getContext('webgl') for WebGL1
}

gl.clearColor(0.0, 0.0, 0.0, 1.0); // black background
gl.clear(gl.COLOR_BUFFER_BIT);
```

### Shaders (GLSL)

```js
// Vertex Shader
const vsSource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

// Fragment Shader
const fsSource = `
  void main() {
    gl_FragColor = vec4(1.0, 0.5, 0.2, 1.0); // orange
  }
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}
```

### WebGL2 Improvements over WebGL1

- **3D textures** and **array textures**
- **Uniform buffer objects** for sharing uniform data
- **Sampler objects** for separating texture data from sampling parameters
- **Transform feedback** for GPU-side particle systems
- **Multiple render targets (MRT)**
- **Instanced drawing** for rendering many similar objects efficiently
- **Query objects** for occlusion/timing queries
- **Required** to support ETC2/DXT/ASTC texture compression

### Common Libraries

- **Three.js** — Most popular 3D library
- **PixiJS** — 2D rendering engine
- **Babylon.js** — Full game engine
- **regl** — Functional WebGL wrapper

---

## 15. Web Audio API

The Web Audio API provides a powerful system for controlling audio on the Web, including synthesis, processing, analysis, and spatial audio.

### Audio Context

```js
const audioCtx = new AudioContext();
// or (with latency hint)
const audioCtx = new AudioContext({ latencyHint: 'interactive', sampleRate: 44100 });
```

### Playing Audio

```js
// From file
const audio = new Audio('sound.mp3');
audio.play();

// From URL with AudioContext
async function playAudio(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);
  source.start();
}
```

### Audio Nodes (Audio Graph)

```js
// Oscillator
const oscillator = audioCtx.createOscillator();
oscillator.type = 'sine'; // sine, square, sawtooth, triangle
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note

// Gain node (volume)
const gainNode = audioCtx.createGain();
gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);

// Connect: oscillator → gain → destination
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.start();
```

### Audio Analysis

```js
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Connect source to analyser
sourceNode.connect(analyser);
analyser.connect(audioCtx.destination);

// Get frequency data
analyser.getByteFrequencyData(dataArray); // 0-255 per frequency bin
analyser.getByteTimeDomainData(dataArray); // waveform data
```

### Common Audio Nodes

| Node | Purpose |
|------|---------|
| `OscillatorNode` | Generate tones |
| `GainNode` | Control volume |
| `BiquadFilterNode` | EQ, lowpass, highpass, etc. |
| `DelayNode` | Delay audio |
| `ConvolverNode` | Reverb effects |
| `AnalyserNode` | Frequency/time analysis |
| `MediaStreamSourceNode` | Microphone input |
| `PannerNode` | 3D spatial audio |

---

## 16. WebRTC

WebRTC (Web Real-Time Communication) enables **real-time audio, video, and data sharing** directly between browsers without intermediaries (peer-to-peer).

### Basic Flow

1. **Media Capture** — Access camera/microphone
2. **Signaling** — Exchange connection info (SDP, ICE candidates) via a signaling server
3. **Connection** — Direct P2P connection established
4. **Media/Data Exchange** — Stream audio/video or send arbitrary data

### Getting Media

```js
const stream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
});
const videoElement = document.getElementById('localVideo');
videoElement.srcObject = stream;
```

### Peer Connection

```js
const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

const peerConnection = new RTCPeerConnection(configuration);

// Add tracks to connection
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

// Handle incoming tracks
peerConnection.ontrack = (event) => {
  document.getElementById('remoteVideo').srcObject = event.streams[0];
};

// ICE candidates
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    // Send candidate to remote peer via signaling
  }
};

// Create offer
const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);
// Send offer to remote peer

// Answer
const answer = await peerConnection.createAnswer();
await peerConnection.setLocalDescription(answer);
```

### Data Channel

```js
const dataChannel = peerConnection.createDataChannel('myChannel');

dataChannel.onopen = () => {
  dataChannel.send('Hello!');
};

dataChannel.onmessage = (event) => {
  console.log('Received:', event.data);
};

// On remote peer
peerConnection.ondatachannel = (event) => {
  const channel = event.channel;
  channel.onmessage = (e) => console.log(e.data);
};
```

### Key Concepts

- **ICE** (Interactive Connectivity Establishment) — Finds the best connection path
- **STUN** — Discovers public IP/port for NAT traversal
- **TURN** — Relay server for when direct connection fails
- **SDP** (Session Description Protocol) — Describes media capabilities
- **Signaling Server** — Helps peers exchange connection info (not part of WebRTC spec)

---

## 17. Web Animations API

The Web Animations API provides a common syntax for creating animations, bridging CSS animations and JavaScript-based animation frameworks.

### Basic Animation

```js
const element = document.getElementById('box');

const animation = element.animate(
  [
    { transform: 'translateX(0)', backgroundColor: 'red' },
    { transform: 'translateX(100px)', backgroundColor: 'blue' },
  ],
  {
    duration: 1000,
    easing: 'ease-in-out',
    iterations: Infinity,
    direction: 'alternate',
    fill: 'forwards',
  }
);

// Control
animation.pause();
animation.play();
animation.reverse();
animation.cancel();
animation.finish();

// Playback rate
animation.playbackRate = 2; // 2x speed

// Events
animation.onfinish = () => console.log('Animation finished');
animation.oncancel = () => console.log('Animation cancelled');
```

### Keyframe Effects

```js
const keyframes = new KeyframeEffect(
  element,
  [
    { transform: 'scale(1)', opacity: 1 },
    { transform: 'scale(1.5)', opacity: 0.5 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  { duration: 2000, iterations: Infinity }
);

const animation = new Animation(keyframes, document.timeline);
animation.play();
```

### Timeline

```js
// Element timeline (synced to element render updates)
const animation = element.animate(keyframes, { timeline: element.animate([]).effect?.getTarget() });

// Document timeline
const animation = new Animation(keyframes, document.timeline);
```

---

## 18. Intersection Observer

The Intersection Observer API asynchronously observes changes in the intersection of a target element with an ancestor element or the document viewport. It replaces inefficient scroll event listeners.

### Basic Usage

```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('Element is visible');
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  },
  {
    root: null,           // viewport (default)
    rootMargin: '0px',    // margin around root
    threshold: 0.5,       // 50% visible triggers callback
  }
);

observer.observe(document.getElementById('myElement'));
observer.unobserve(element);
observer.disconnect(); // stop observing all
```

### Configuration Options

| Option | Description |
|--------|-------------|
| `root` | Element used as viewport (null = document viewport) |
| `rootMargin` | Margin around root (e.g., '10px 20px 30px 40px') |
| `threshold` | Number (0-1) or array of numbers indicating when to fire |

### Entry Properties

```js
entries.forEach((entry) => {
  console.log(entry.isIntersecting);   // Boolean
  console.log(entry.intersectionRatio); // 0-1
  console.log(entry.target);           // DOM element
  console.log(entry.boundingClientRect); // rect
  console.log(entry.intersectionRect);  // visible rect
  console.log(entry.time);             // timestamp
});
```

### Use Cases

```js
// Lazy Loading Images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});
document.querySelectorAll('img[data-src]').forEach((img) => imageObserver.observe(img));

// Infinite Scroll
const scrollObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMorePosts();
}, { rootMargin: '200px' });
scrollObserver.observe(document.getElementById('sentinel'));
```

---

## 19. Mutation Observer

The Mutation Observer API watches for changes in the DOM tree — child additions/removals, attribute changes, and text content changes.

### Basic Usage

```js
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log('Type:', mutation.type);
    console.log('Added nodes:', mutation.addedNodes);
    console.log('Removed nodes:', mutation.removedNodes);
    console.log('Target:', mutation.target);
  });
});

observer.observe(document.body, {
  childList: true,     // watch for added/removed children
  subtree: true,       // watch all descendants
  attributes: true,    // watch attribute changes
  attributeFilter: ['class', 'style'], // only these attributes
  attributeOldValue: true,
  characterData: true, // watch text content changes
  characterDataOldValue: true,
});

// Stop observing
observer.disconnect();

// Get pending mutations
const records = observer.takeRecords();
```

### Mutation Record Properties

| Property | Description |
|----------|-------------|
| `type` | 'childList', 'attributes', or 'characterData' |
| `target` | Node that changed |
| `addedNodes` | NodeList of added nodes |
| `removedNodes` | NodeList of removed nodes |
| `previousSibling` | Previous sibling of added/removed node |
| `nextSibling` | Next sibling of added/removed node |
| `attributeName` | Changed attribute name |
| `oldValue` | Previous value (if `attributeOldValue`/`characterDataOldValue` was true) |

---

## 20. Resize Observer

The Resize Observer API watches for changes to the dimensions of an element. It's useful for responsive layouts, container queries polyfills, and dynamic UI adjustments.

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    console.log(`Size: ${width}x${height}`);
  }
});

resizeObserver.observe(document.getElementById('myElement'));
resizeObserver.unobserve(element);
resizeObserver.disconnect();
```

### Configuration

```js
const observer = new ResizeObserver(callback, {
  box: 'content-box' // 'content-box' (default), 'border-box', or 'device-pixel-content-box'
});
```

### Entry Properties

| Property | Description |
|----------|-------------|
| `target` | The observed element |
| `contentRect` | `DOMRect` of the content box |
| `borderBoxSize` | Size of the border box |
| `contentBoxSize` | Size of the content box |
| `devicePixelContentBoxSize` | Size in device pixels |

---

## 21. Performance Observer

The Performance Observer API allows you to observe performance-related events (navigation, resource loading, paint, largest contentful paint, etc.).

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log('Entry:', entry.name);
    console.log('Type:', entry.entryType);
    console.log('Duration:', entry.duration);
  });
});

// Observe specific entry types
observer.observe({ type: 'navigation', buffered: true });
observer.observe({ type: 'resource', buffered: false });
observer.observe({ type: 'paint', buffered: true });
observer.observe({ type: 'largest-contentful-paint', buffered: true });
observer.observe({ type: 'first-input', buffered: true });
observer.observe({ type: 'layout-shift', buffered: true });
```

### Performance Entry Types

| Entry Type | What It Measures |
|------------|------------------|
| `navigation` | Page navigation timing |
| `resource` | Resource loading timing |
| `paint` | `first-paint`, `first-contentful-paint` |
| `largest-contentful-paint` | Largest visible element paint |
| `first-input` | First user interaction delay |
| `layout-shift` | Cumulative layout shift |
| `longtask` | Tasks blocking main thread >50ms |
| `measure` | Custom user-defined measurements |
| `mark` | Custom user-defined timestamps |

---

## 22. Reporting Observer

The Reporting Observer API observes reports generated by the browser (deprecation warnings, intervention reports, crash reports, etc.).

```js
const observer = new ReportingObserver((reports) => {
  reports.forEach((report) => {
    console.log('Type:', report.type);
    console.log('Body:', report.body);
    console.log('URL:', report.url);
    console.log('User agent:', report.userAgent);
  });
}, {
  types: ['deprecation', 'intervention', 'crash'],
  buffered: true,
});

observer.observe();
observer.disconnect();
```

---

## 23. Page Visibility API

The Page Visibility API lets you know when a page becomes visible or hidden, allowing you to pause/resume expensive operations.

```js
// Check current state
console.log(document.visibilityState); // 'visible', 'hidden', or 'prerender'

// Listen for changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page is hidden - pause animations/video/polling');
    pauseVideo();
    stopPolling();
  } else {
    console.log('Page is visible - resume');
    playVideo();
    startPolling();
  }
});
```

### Use Cases

- Pause video when tab is hidden
- Stop polling API when page is not visible
- Pause expensive animations
- Reduce server load by pausing analytics beacons
- Pause game when player switches tabs

---

## 24. History API

The History API enables manipulating the browser's session history, allowing URL changes without page reloads — essential for SPAs.

### Core Methods

```js
// pushState — Add a new entry to history stack
history.pushState(
  { page: 'about' },           // state object
  'About Page',                // title (mostly unused)
  '/about'                     // URL
);

// replaceState — Replace current entry
history.replaceState(
  { page: 'home-v2' },
  'Home',
  '/home'
);

// Navigate
history.back();    // same as browser back button
history.forward(); // same as browser forward button
history.go(-2);    // go back 2 entries
```

### Popstate Event

```js
window.addEventListener('popstate', (event) => {
  if (event.state) {
    console.log('State:', event.state);
    // Update UI based on state
    renderPage(event.state.page);
  }
});

// Read current state
console.log(history.state); // current state object
console.log(history.length); // number of entries
```

### SPA Router Example

```js
document.addEventListener('click', async (event) => {
  const link = event.target.closest('a[data-link]');
  if (!link) return;

  event.preventDefault();
  const url = link.getAttribute('href');

  history.pushState({ url }, '', url);
  const content = await fetch(url).then(r => r.text());
  document.querySelector('#content').innerHTML = content;
});

window.addEventListener('popstate', async () => {
  const content = await fetch(location.pathname).then(r => r.text());
  document.querySelector('#content').innerHTML = content;
});
```

---

## 25. URL API / URLSearchParams

The URL API provides a convenient way to parse, construct, and manipulate URLs.

### URL Object

```js
const url = new URL('https://example.com:8080/path/to/page?name=Alice&age=30#section1');

console.log(url.protocol); // 'https:'
console.log(url.hostname); // 'example.com'
console.log(url.port);     // '8080'
console.log(url.pathname); // '/path/to/page'
console.log(url.search);   // '?name=Alice&age=30'
console.log(url.hash);     // '#section1'
console.log(url.origin);   // 'https://example.com:8080'
console.log(url.href);     // full URL string

// Modify
url.pathname = '/new/path';
url.searchParams.set('city', 'NYC');
url.searchParams.append('hobby', 'reading');
url.searchParams.delete('age');
url.hash = '#new-section';
console.log(url.toString());
```

### URLSearchParams

```js
// Create from string
const params = new URLSearchParams('name=Alice&age=30&city=NYC');

// Create from object
const params2 = new URLSearchParams({ name: 'Bob', age: '25' });

// Get values
console.log(params.get('name'));  // 'Alice'
console.log(params.has('age'));   // true

// Set values
params.set('age', '31');
params.append('hobby', 'reading');
params.delete('city');

// Iterate
params.forEach((value, key) => console.log(key, value));
console.log(params.toString()); // 'name=Alice&age=31&hobby=reading'

// Sort
params.sort();
```

---

## 26. Navigation API (New)

The Navigation API provides a modern way to manage cross-document and same-document navigations, replacing much of the History API's functionality.

```js
// Basic navigation
const canNavigate = navigation.canIntercept;
if (canNavigate) {
  navigation.addEventListener('navigate', (event) => {
    event.intercept({
      handler: async () => {
        const response = await fetch(event.destination.url);
        const html = await response.text();
        document.body.innerHTML = html;
      },
    });
  });
}

// Current entry
const current = navigation.currentEntry;
console.log(current.url);
console.log(current.key);
console.log(state);

// Navigation history
console.log(navigation.entries());
console.log(navigation.canGoBack);
console.log(navigation.canGoForward);

// Programmatic navigation
navigation.navigate('/new-page', { state: { id: 1 } });
navigation.back();
navigation.forward();
navigation.go(-1);

// Navigate cross-document
navigation.reload({ state: navigation.currentEntry.state });
```

---

## 27. View Transitions API

The View Transition API enables smooth animated transitions between different views/states of a website, including both SPA and MPA transitions.

### Same-Document (SPA) Transitions

```js
function updateDOM() {
  document.querySelector('#content').innerHTML = '<h1>New Content</h1>';
}

// Basic usage
document.startViewTransition(() => {
  updateDOM();
});

// Custom transition with ViewTransition object
const transition = document.startViewTransition(() => {
  updateDOM();
});

transition.ready.then(() => {
  // Pseudo-elements created, animation about to start
  // Animate using Web Animations API
  document.documentElement.animate(
    { clipPath: ['circle(0%)', 'circle(100%)'] },
    { duration: 500, easing: 'ease-in', fill: 'forwards' }
  );
});

transition.finished.then(() => {
  // Animation complete
});
```

### CSS for View Transitions

```css
/* Default cross-fade */
::view-transition-old(root) {
  animation: fade-out 0.3s ease-in;
}
::view-transition-new(root) {
  animation: fade-in 0.3s ease-in;
}

/* Named transitions */
.hero-image {
  view-transition-name: hero;
}
.page-title {
  view-transition-name: title;
}

::view-transition-old(hero) {
  animation: slide-out 0.3s ease-in;
}
::view-transition-new(hero) {
  animation: slide-in 0.3s ease-in;
}
```

### Cross-Document (MPA) Transitions

```html
<style>
  @view-transition {
    navigation: auto;
  }
</style>
```

### Key Concepts

- Browser snapshots old and new states
- DOM updates while rendering is suppressed
- Animations powered by CSS Animations or Web Animations API
- `view-transition-name` CSS property links elements across snapshots

---

## 28. AbortController / AbortSignal

AbortController provides a signal-based mechanism for cancelling asynchronous operations like fetch requests, event listeners, and custom async tasks.

```js
// Basic fetch cancellation
const controller = new AbortController();
const signal = controller.signal;

fetch(url, { signal })
  .then((response) => response.json())
  .catch((err) => {
    if (err.name === 'AbortError') {
      console.log('Request was aborted');
    }
  });

// Cancel
controller.abort();
controller.abort('User cancelled'); // with reason
console.log(signal.aborted);       // true
console.log(signal.reason);        // 'User cancelled'
```

### Timeout Pattern

```js
// Manual timeout
const controller = new AbortController();
setTimeout(() => controller.abort('Timeout'), 5000);

fetch(url, { signal: controller.signal });

// Built-in timeout
fetch(url, { signal: AbortSignal.timeout(5000) });
```

### Multiple Operations

```js
const controller = new AbortController();

// Cancel multiple requests at once
Promise.all([
  fetch('/api/a', { signal: controller.signal }),
  fetch('/api/b', { signal: controller.signal }),
]);
// controller.abort() cancels both
```

### Custom Abortable Operations

```js
function fetchWithRetry(url, retries, signal) {
  return fetch(url, { signal }).catch((err) => {
    if (err.name === 'AbortError') throw err;
    if (retries > 0) return fetchWithRetry(url, retries - 1, signal);
    throw err;
  });
}
```

---

## 29. Blob and File API

Blob (Binary Large Object) represents raw binary data. File extends Blob with metadata about the file.

### Blob

```js
// Create from string
const blob = new Blob(['Hello, world!'], { type: 'text/plain' });

// Create from multiple parts
const blob2 = new Blob(['Hello, ', 'world!'], { type: 'text/plain' });

// Create from ArrayBuffer
const buffer = new ArrayBuffer(16);
const blob3 = new Blob([buffer], { type: 'application/octet-stream' });

// Properties
console.log(blob.size);      // 13 bytes
console.log(blob.type);      // 'text/plain'

// Read as text
const text = await blob.text();

// Read as ArrayBuffer
const arrayBuffer = await blob.arrayBuffer();

// Read as data URL
const reader = new FileReader();
reader.readAsDataURL(blob);
reader.onload = () => console.log(reader.result);

// Slice a blob
const partialBlob = blob.slice(0, 5, 'text/plain');
```

### File

```js
// From file input
const input = document.getElementById('fileInput');
input.addEventListener('change', (event) => {
  const file = event.target.files[0];
  console.log(file.name);    // 'photo.jpg'
  console.log(file.size);    // 123456
  console.log(file.type);    // 'image/jpeg'
  console.log(file.lastModified); // timestamp
});

// Create manually
const file = new File(['content'], 'readme.txt', {
  type: 'text/plain',
  lastModified: Date.now(),
});
```

---

## 30. FileReader

FileReader reads the contents of File or Blob objects asynchronously.

### Read as Text

```js
const reader = new FileReader();

reader.onload = (event) => {
  console.log(event.target.result); // file content as string
  // or: reader.result
};

reader.onerror = (error) => console.error(error);

reader.readAsText(file, 'UTF-8'); // optional encoding
```

### Read as Data URL (Base64)

```js
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
  // reader.result is 'data:image/jpeg;base64,...'
  const img = document.createElement('img');
  img.src = reader.result;
};
```

### Read as ArrayBuffer

```js
const reader = new FileReader();
reader.readAsArrayBuffer(file);
reader.onload = () => {
  const buffer = reader.result; // ArrayBuffer
};
```

### Events and Properties

| Property/Event | Description |
|----------------|-------------|
| `readyState` | 0=EMPTY, 1=LOADING, 2=DONE |
| `result` | File content |
| `error` | Error object |
| `onloadstart` | Reading started |
| `onprogress` | Progress event (with `loaded`/`total`) |
| `onload` | Read complete |
| `onloadend` | Read finished (success or error) |
| `onerror` | Error occurred |
| `onabort` | Reading aborted |

---

## 31. FormData

FormData provides a way to construct key-value pairs for form submission, including file uploads.

### Basic Usage

```js
// From form element
const form = document.getElementById('myForm');
const formData = new FormData(form);

// Manual construction
const formData2 = new FormData();
formData2.append('name', 'Alice');
formData2.append('age', '30');
formData2.append('avatar', fileInput.files[0], 'avatar.jpg');
formData2.append('hobby', 'reading');  // append multiple with same key
formData2.append('hobby', 'coding');

// From object
const formData3 = new FormData();
Object.entries({ name: 'Bob', age: '25' }).forEach(([key, value]) => {
  formData3.append(key, value);
});
```

### Methods

```js
formData.append('key', 'value');       // add
formData.set('key', 'newValue');       // set (replaces existing)
formData.delete('key');                // remove
formData.has('key');                   // check existence
formData.get('key');                   // get first value
formData.getAll('key');                // get all values for key
formData.forEach((value, key) => {});  // iterate
```

### Sending

```js
// With fetch
await fetch('/api/upload', {
  method: 'POST',
  body: formData,
  // Don't set Content-Type header! Browser sets it with boundary
});

// With XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('POST', '/api/upload');
xhr.send(formData);
```

---

## 32. URL.createObjectURL / revokeObjectURL

Creates blob URLs that reference in-memory objects, useful for displaying images, playing media, or providing download links.

```js
// Create blob URL
const blob = new Blob(['Hello'], { type: 'text/plain' });
const url = URL.createObjectURL(blob);
console.log(url); // 'blob:http://localhost:3000/123e4567-e89b-12d3-a456-426614174000'

// Use in img element
const img = document.getElementById('myImage');
img.src = URL.createObjectURL(file);

// Use in video element
video.src = URL.createObjectURL(mediaBlob);

// Use as download link
const a = document.createElement('a');
a.href = URL.createObjectURL(file);
a.download = 'document.pdf';
a.click();

// IMPORTANT: Release when done to free memory
URL.revokeObjectURL(url);

// Common pattern: revoke after load
const url = URL.createObjectURL(file);
const img = new Image();
img.onload = () => {
  img.src = url;
  URL.revokeObjectURL(url); // revoke after image loads
};
```

---

## 33. TextEncoder / TextDecoder

TextEncoder encodes strings into UTF-8 byte streams; TextDecoder decodes them back.

### TextEncoder

```js
const encoder = new TextEncoder();
const utf8 = encoder.encode('Hello, world!'); // Uint8Array
console.log(utf8); // [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]

// Only supports UTF-8
console.log(encoder.encoding); // 'utf-8'
```

### TextDecoder

```js
const decoder = new TextDecoder();
const text = decoder.decode(new Uint8Array([72, 101, 108, 108, 111])); // 'Hello'

// Decode specific encoding
const decoder2 = new TextDecoder('iso-8859-1');
const latin1 = decoder2.decode(latin1Bytes);

// Decode with options
const decoder3 = new TextDecoder('utf-8', { fatal: true }); // throw on invalid
const decoder4 = new TextDecoder('utf-8', { ignoreBOM: true });
```

---

## 34. Encoding API

The Encoding API provides interfaces for handling character encodings beyond just UTF-8.

### Available Encodings

```js
// List all supported encodings
console.log(Intl.supportedValuesOf('encoding'));
// ['big5', 'euc-jp', 'euc-kr', 'gb18030', 'iso-2022-jp', 'iso-8859-1', ..., 'utf-8']
```

### Usage

```js
// TextEncoder — always UTF-8
const encoder = new TextEncoder();
const encoded = encoder.encode('Hello');

// TextDecoder — any encoding
const decoder = new TextDecoder('iso-8859-1');
const decoded = decoder.decode(latin1EncodedBytes);
```

---

## 35. Base64 Encoding: btoa / atob

Global functions for Base64 encoding and decoding strings.

```js
// Encode string to Base64
const encoded = btoa('Hello, world!');
console.log(encoded); // 'SGVsbG8sIHdvcmxkIQ=='

// Decode Base64 to string
const decoded = atob('SGVsbG8sIHdvcmxkIQ==');
console.log(decoded); // 'Hello, world!'

// Handle Unicode: encode to UTF-8 first
const unicodeEncoded = btoa(encodeURIComponent('Hello 世界').replace(/%([0-9A-F]{2})/g,
  (_, p1) => String.fromCharCode('0x' + p1)));

// Decode Unicode
const unicodeDecoded = decodeURIComponent(atob(unicodeEncoded).split('').map(
  (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
).join(''));
```

---

## 36. Crypto API (window.crypto)

The Crypto interface provides access to basic cryptographic features — primarily a cryptographically strong random number generator.

```js
// Get random values
const array = new Uint32Array(10);
crypto.getRandomValues(array);
console.log(array);

// UUID generation
const uuid = crypto.randomUUID();
console.log(uuid); // '123e4567-e89b-12d3-a456-426614174000'

// SubtleCrypto access
console.log(crypto.subtle); // SubtleCrypto interface (see #37)
```

### getRandomValues()

```js
// Fill typed array with cryptographically strong random values
const randomBytes = new Uint8Array(16);
crypto.getRandomValues(randomBytes);

const randomInt = crypto.getRandomValues(new Uint32Array(1))[0];
```

---

## 37. SubtleCrypto

SubtleCrypto provides low-level cryptographic primitives. Available via `crypto.subtle`. **Requires HTTPS** (secure context).

### Methods

| Method | Purpose |
|--------|---------|
| `encrypt(algorithm, key, data)` | Encrypt data |
| `decrypt(algorithm, key, data)` | Decrypt data |
| `sign(algorithm, key, data)` | Create digital signature |
| `verify(algorithm, key, signature, data)` | Verify signature |
| `digest(algorithm, data)` | Hash data |
| `generateKey(algorithm, extractable, keyUsages)` | Generate key(s) |
| `importKey(format, keyData, algorithm, extractable, keyUsages)` | Import key |
| `exportKey(format, key)` | Export key |
| `deriveKey(algorithm, baseKey, derivedKeyType, extractable, keyUsages)` | Derive key |
| `deriveBits(algorithm, baseKey, length)` | Derive bits |
| `wrapKey(format, key, wrappingKey, wrapAlgorithm)` | Wrap key |
| `unwrapKey(format, wrappedKey, unwrappingKey, unwrapAlgorithm, keyAlgorithm, extractable, keyUsages)` | Unwrap key |

### Common Algorithms

**Hashing:**
```js
const data = new TextEncoder().encode('Hello, world!');
const hash = await crypto.subtle.digest('SHA-256', data);
console.log(new Uint8Array(hash));
```

**Encryption (AES-GCM):**
```js
const key = await crypto.subtle.generateKey(
  { name: 'AES-GCM', length: 256 },
  true, // extractable
  ['encrypt', 'decrypt']
);

const iv = crypto.getRandomValues(new Uint8Array(12));
const encrypted = await crypto.subtle.encrypt(
  { name: 'AES-GCM', iv },
  key,
  data
);

const decrypted = await crypto.subtle.decrypt(
  { name: 'AES-GCM', iv },
  key,
  encrypted
);
```

**HMAC Signing:**
```js
const key = await crypto.subtle.generateKey(
  { name: 'HMAC', hash: 'SHA-256' },
  false,
  ['sign', 'verify']
);

const signature = await crypto.subtle.sign('HMAC', key, data);
const valid = await crypto.subtle.verify('HMAC', key, signature, data);
```

---

## 38. Console API

The Console API provides methods for interacting with the browser's developer console.

### Methods

```js
console.log('Regular message');
console.info('Informational message');
console.warn('Warning message');
console.error('Error message');

// String substitution
console.log('Hello %s', 'world'); // 'Hello world'
console.log('Count: %d', 42);
console.log('Object: %O', { key: 'value' });

// Grouping
console.group('Section 1');
console.log('Item 1');
console.log('Item 2');
console.groupEnd();

console.groupCollapsed('Collapsed Section');
console.log('Hidden by default');
console.groupEnd();

// Table
console.table([
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
]);

// Timing
console.time('operation');
// ... some code ...
console.timeEnd('operation'); // 'operation: 123.456ms'
console.timeLog('operation', 'checkpoint'); // partial timing

// Counting
console.count('label');
console.countReset('label');

// Stack trace
console.trace('Trace message');

// Assertions
console.assert(false, 'This will show if condition is false');

// Clear
console.clear();

// Dir
console.dir(document.body);
console.dirxml(document.body); // XML/HTML representation
```

### Debug with `debug()` and `table()`

```js
console.debug('Debug message'); // only visible if verbose logging enabled

// Custom formatters (Chrome)
console.table(data, ['name', 'age']); // specify columns
```

---

## 39. Performance API

The Performance API provides high-resolution timestamps and tools for measuring performance.

### performance.now()

```js
const start = performance.now();
// ... code to measure ...
const end = performance.now();
console.log(`Duration: ${end - start} ms`);
```

### performance.mark() and performance.measure()

```js
// Mark a point in time
performance.mark('start-operation');

// ... do work ...

performance.mark('end-operation');

// Measure between marks
performance.measure('operation-duration', 'start-operation', 'end-operation');

// Get measurement
const measure = performance.getEntriesByName('operation-duration')[0];
console.log(`Duration: ${measure.duration} ms`);

// Get all performance entries
const entries = performance.getEntriesByType('measure');
entries.forEach((entry) => console.log(`${entry.name}: ${entry.duration}ms`));

// Clear
performance.clearMarks();
performance.clearMeasures();
```

### Navigation Timing

```js
const navigation = performance.getEntriesByType('navigation')[0];
console.log('DNS lookup:', navigation.domainLookupEnd - navigation.domainLookupStart);
console.log('TCP connection:', navigation.connectEnd - navigation.connectStart);
console.log('TTFB:', navigation.responseStart - navigation.requestStart);
console.log('DOM loaded:', navigation.domContentLoadedEventEnd - navigation.fetchStart);
console.log('Full load:', navigation.loadEventEnd - navigation.fetchStart);
```

### Resource Timing

```js
const resources = performance.getEntriesByType('resource');
resources.forEach((r) => {
  console.log(`${r.name}: ${r.duration.toFixed(2)}ms (${r.initiatorType})`);
});
```

---

## 40. matchMedia / MediaQueryList

The `matchMedia()` method tests CSS media queries in JavaScript and watches for changes.

### Basic Usage

```js
// Test a media query
const mql = window.matchMedia('(max-width: 768px)');
console.log(mql.matches); // true or false

// Listen for changes
mql.addEventListener('change', (event) => {
  if (event.matches) {
    console.log('Viewport is 768px or less');
  } else {
    console.log('Viewport is wider than 768px');
  }
});
```

### Practical Examples

```js
// Dark mode detection
const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
darkMode.addEventListener('change', (e) => {
  document.body.classList.toggle('dark', e.matches);
});

// Reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  // Disable animations
}

// High DPI
const highDPI = window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)');
```

### MediaQueryList Properties

| Property | Description |
|----------|-------------|
| `matches` | Boolean — does the query match? |
| `media` | The media query string |

### MediaQueryList Methods

| Method | Description |
|--------|-------------|
| `addListener(fn)` | Deprecated — use `addEventListener` |
| `removeListener(fn)` | Deprecated |
| `addEventListener('change', fn)` | Listen for changes |
| `removeEventListener('change', fn)` | Stop listening |

---

## 41. Clipboard API

The Clipboard API provides asynchronous, Promise-based access to the system clipboard. It requires a **user gesture** and **secure context (HTTPS)**.

### Copy Text

```js
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied!');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}
```

### Paste Text

```js
async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Pasted:', text);
  } catch (err) {
    console.error('Failed to read clipboard:', err);
  }
}
```

### Rich Clipboard (ClipboardItem)

```js
async function copyImage(imageBlob) {
  await navigator.clipboard.write([
    new ClipboardItem({
      'image/png': imageBlob,
    }),
  ]);
}
```

### Clipboard Events

```js
document.addEventListener('copy', (event) => {
  console.log('Copy event');
  // event.clipboardData.setData('text/plain', 'custom text');
});

document.addEventListener('cut', (event) => {
  console.log('Cut event');
});

document.addEventListener('paste', (event) => {
  const text = event.clipboardData.getData('text/plain');
  console.log('Pasted:', text);
});
```

### Security Requirements

- **Secure context** — HTTPS or localhost
- **User gesture** — Must be triggered by user interaction
- **Permission** — `clipboard-read` and `clipboard-write` permissions
- **Focus** — Document must be focused

---

## 42. Drag and Drop API

The Drag and Drop API enables dragging elements and dropping them onto target areas.

### Making an Element Draggable

```html
<div draggable="true" id="draggable">Drag me!</div>
<div id="droppable">Drop here!</div>
```

### Event Handlers

```js
const draggable = document.getElementById('draggable');
const droppable = document.getElementById('droppable');

// Drag events on source
draggable.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text/plain', 'Hello from drag!');
  event.dataTransfer.effectAllowed = 'copy';
  draggable.classList.add('dragging');
});

draggable.addEventListener('dragend', () => {
  draggable.classList.remove('dragging');
});

// Drop events on target
droppable.addEventListener('dragover', (event) => {
  event.preventDefault(); // Required to allow drop
  event.dataTransfer.dropEffect = 'copy';
  droppable.classList.add('dragover');
});

droppable.addEventListener('dragleave', () => {
  droppable.classList.remove('dragover');
});

droppable.addEventListener('drop', (event) => {
  event.preventDefault();
  droppable.classList.remove('dragover');
  const data = event.dataTransfer.getData('text/plain');
  droppable.textContent = data;
});
```

### DataTransfer Methods

| Method | Description |
|--------|-------------|
| `setData(format, data)` | Set drag data |
| `getData(format)` | Get drag data |
| `clearData(format)` | Clear drag data |
| `setDragImage(img, x, y)` | Custom drag image |
| `types` | List of data formats |
| `files` | Dropped files |
| `effectAllowed` | Allowed effects: `none`, `copy`, `copyLink`, `copyMove`, `link`, `linkMove`, `move`, `all` |
| `dropEffect` | Actual effect: `none`, `copy`, `link`, `move` |

---

## 43. Fullscreen API

The Fullscreen API lets you display a single element using the entire screen.

### Enter Fullscreen

```js
const elem = document.getElementById('video');

if (document.fullscreenEnabled) {
  elem.requestFullscreen().catch((err) => {
    console.error(`Fullscreen error: ${err.message}`);
  });
}
```

### Exit Fullscreen

```js
document.exitFullscreen();
```

### Check State

```js
console.log(document.fullscreenElement); // element or null
console.log(document.fullscreenEnabled); // boolean
```

### Listen for Changes

```js
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    console.log('Entered fullscreen');
  } else {
    console.log('Exited fullscreen');
  }
});

document.addEventListener('fullscreenerror', (event) => {
  console.error('Fullscreen error:', event);
});
```

### CSS for Fullscreen

```css
#video:fullscreen {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

#video::backdrop {
  background-color: black;
}
```

### Rules

- **User gesture required** — Must be called from a click/keypress handler
- **Returns a Promise** — Always handle rejection
- **User can always exit** — Pressing Esc exits fullscreen
- **Only one element at a time** — Latest request wins

---

## 44. Pointer Lock API

The Pointer Lock API provides access to raw mouse movement data (not absolute position) and hides the cursor — essential for FPS games and 3D applications.

```js
const canvas = document.getElementById('gameCanvas');

canvas.addEventListener('click', () => {
  canvas.requestPointerLock();
});

document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement === canvas) {
    console.log('Pointer locked');
    document.addEventListener('mousemove', onMouseMove);
  } else {
    console.log('Pointer unlocked');
    document.removeEventListener('mousemove', onMouseMove);
  }
});

function onMouseMove(event) {
  const movementX = event.movementX; // relative mouse movement
  const movementY = event.movementY;
  // Update game camera, etc.
  cameraX += movementX * sensitivity;
  cameraY += movementY * sensitivity;
}

// Exit pointer lock
document.exitPointerLock();
```

### Properties

| Property | Description |
|----------|-------------|
| `document.pointerLockElement` | Currently locked element |
| `element.requestPointerLock()` | Request lock |
| `document.exitPointerLock()` | Release lock |

### Events

| Event | Description |
|-------|-------------|
| `pointerlockchange` | Lock state changed |
| `pointerlockerror` | Lock request failed |

---

## 45. Vibration API

The Vibration API provides access to the device's vibration motor (mobile devices primarily).

```js
// Vibrate for 200ms
navigator.vibrate(200);

// Vibrate pattern: vibrate, pause, vibrate, pause, ...
navigator.vibrate([100, 50, 200, 50, 100]); // vibrate 100ms, pause 50ms, vibrate 200ms, etc.

// Stop vibrating
navigator.vibrate(0);

// Check support
if ('vibrate' in navigator) {
  console.log('Vibration API supported');
}
```

---

## 46. Battery Status API

The Battery Status API provides information about the device's battery level and charging state. **Note:** Being deprecated/removed from some browsers.

```js
async function getBatteryInfo() {
  if ('getBattery' in navigator) {
    const battery = await navigator.getBattery();

    console.log('Level:', battery.level);       // 0.0 to 1.0
    console.log('Charging:', battery.charging);  // boolean
    console.log('Charging time:', battery.chargingTime); // seconds
    console.log('Discharging time:', battery.dischargingTime); // seconds

    battery.addEventListener('chargingchange', () => {
      console.log('Charging:', battery.charging);
    });

    battery.addEventListener('levelchange', () => {
      console.log('Level:', battery.level);
    });
  }
}
```

---

## 47. Gamepad API

The Gamepad API provides access to gamepad and joystick input.

```js
// Poll gamepads (they're not event-driven like other APIs)
window.addEventListener('gamepadconnected', (event) => {
  console.log('Gamepad connected:', event.gamepad);
});

window.addEventListener('gamepaddisconnected', (event) => {
  console.log('Gamepad disconnected:', event.gamepad);
});

function gameLoop() {
  const gamepads = navigator.getGamepads();

  for (const gamepad of gamepads) {
    if (!gamepad) continue;

    // Axes (joysticks)
    const leftX = gamepad.axes[0];  // -1 to 1
    const leftY = gamepad.axes[1];
    const rightX = gamepad.axes[2];
    const rightY = gamepad.axes[3];

    // Buttons
    gamepad.buttons.forEach((button, index) => {
      if (button.pressed) {
        console.log(`Button ${index} pressed, value: ${button.value}`);
      }
    });
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
```

### Gamepad Properties

| Property | Description |
|----------|-------------|
| `id` | Gamepad identifier string |
| `index` | Index in `navigator.getGamepads()` |
| `connected` | Boolean |
| `timestamp` | Last update timestamp |
| `axes` | Array of axis values (-1 to 1) |
| `buttons` | Array of button objects (`pressed`, `value`) |

---

## 48. Bluetooth API

The Web Bluetooth API allows web pages to communicate with Bluetooth Low Energy (BLE) devices.

```js
try {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ services: ['heart_rate'] }],
  });

  const server = await device.gatt.connect();
  const service = await server.getPrimaryService('heart_rate');
  const characteristic = await service.getCharacteristic('heart_rate_measurement');

  characteristic.startNotifications();
  characteristic.addEventListener('characteristicvaluechanged', (event) => {
    const value = event.target.value.getUint8(1);
    console.log('Heart rate:', value);
  });
} catch (error) {
  console.error('Bluetooth error:', error);
}
```

### Key Concepts

- **GATT** (Generic Attribute Profile) — BLE protocol
- **Service** — Group of related characteristics
- **Characteristic** — Individual data point (read/write/notify)
- **User gesture required** — Must be triggered by user interaction
- **Secure context** — HTTPS required

---

## 49. USB API

The USB interface provides access to USB devices from the browser.

```js
// Get previously paired devices
const devices = await navigator.usb.getDevices();

// Request new device
const device = await navigator.usb.requestDevice({ filters: [] });
await device.open();

// Select configuration
await device.selectConfiguration(1);

// Claim interface
await device.claimInterface(0);

// Transfer data
const result = await device.transferOut(1, data);
const result2 = await device.transferIn(1, 64);
```

---

## 50. WebUSB

WebUSB is the specification for the USB interface described in #49. It provides a way to expose USB device services to the web without native drivers.

### Key Points

- **Chrome only** (limited browser support)
- **Secure context** — HTTPS required
- **No native drivers needed** — Browser handles device communication
- **Hardware manufacturers** can build cross-platform JavaScript SDKs

### Use Cases

- Educational devices (microcontrollers)
- 3D printers
- Device updates and diagnostics
- IoT devices
- Hardware development tools

---

## 51. Web Serial

The Web Serial API provides access to serial ports from the browser, useful for communicating with hardware devices like Arduino, microcontrollers, and IoT devices.

```js
// Request a serial port
const port = await navigator.serial.requestPort();

// Open the port
await port.open({ baudRate: 9600 });

// Read data
const reader = port.readable.getReader();
while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  console.log('Received:', new TextDecoder().decode(value));
}
reader.releaseLock();

// Write data
const writer = port.writable.getWriter();
await writer.write(new TextEncoder().encode('Hello, device!'));
writer.releaseLock();

// Close
await port.close();
```

### Use Cases

- Arduino/microcontroller communication
- Serial debugging
- IoT device configuration
- Hardware prototyping

---

## 52. Web Bluetooth

Web Bluetooth is the Bluetooth API described in #48. See that section for full details.

---

## 53. Permissions API

The Permissions API provides a consistent way to query permission status and request permissions.

### Query Permission

```js
const result = await navigator.permissions.query({ name: 'geolocation' });
console.log(result.state); // 'granted', 'denied', or 'prompt'

result.addEventListener('change', () => {
  console.log('Permission state:', result.state);
});
```

### Known Permission Names

| Permission | Description |
|-----------|-------------|
| `'geolocation'` | Location access |
| `'notifications'` | Desktop notifications |
| `'camera'` | Camera access |
| `'microphone'` | Microphone access |
| `'clipboard-read'` | Reading clipboard |
| `'clipboard-write'` | Writing to clipboard |
| `'midi'` | MIDI access |
| `'push'` | Push notifications |
| `'camera'` | Camera |
| `'persistent-storage'` | Persistent storage |

### PermissionStatus Properties

| Property | Description |
|----------|-------------|
| `state` | `'granted'`, `'denied'`, or `'prompt'` |
| `name` | Permission name |
| `onchange` | Event handler for state changes |

---

## 54. Storage API / StorageManager

The Storage API provides estimates of storage usage and availability. StorageManager manages persistent storage.

### Estimate Storage

```js
const estimate = await navigator.storage.estimate();
console.log(`Usage: ${estimate.usage} bytes`);
console.log(`Quota: ${estimate.quota} bytes`);
console.log(`Usage: ${(estimate.usage / 1024 / 1024).toFixed(2)} MB`);
console.log(`Quota: ${(estimate.quota / 1024 / 1024).toFixed(2)} MB`);
```

### Persistent Storage

```js
// Request persistent storage (data won't be evicted)
const isPersisted = await navigator.storage.persist();
console.log('Persistent:', isPersisted);

// Check if persistent
const persisted = await navigator.storage.persisted();
console.log('Already persistent:', persisted);
```

### StorageManager Methods

| Method | Description |
|--------|-------------|
| `estimate()` | Returns usage and quota estimates |
| `persist()` | Request persistent storage |
| `persisted()` | Check if persistent |

### Other StorageManager Features

```js
// Invalidate caches (for PWA updates)
navigator.storage.getDirectory(); // Origin Private File System
```

---

## 55. Background Tasks (requestIdleCallback)

`requestIdleCallback` defers non-urgent work until the browser is idle, preventing interference with user interactions and animations.

```js
// Basic usage
const id = requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0 || deadline.didTimeout) {
    // Do small chunks of work
    processItem();
  }
}, { timeout: 1000 }); // force execution after 1 second even if not idle

// Cancel
cancelIdleCallback(id);
```

### Deadline Object

| Property/Method | Description |
|-----------------|-------------|
| `timeRemaining()` | ms of idle time left in current frame |
| `didTimeout` | Boolean — was callback forced due to timeout? |

### Chunked Work Pattern

```js
function processLargeQueue(items) {
  let index = 0;

  function processChunk(deadline) {
    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && index < items.length) {
      processItem(items[index]);
      index++;
    }

    if (index < items.length) {
      requestIdleCallback(processChunk, { timeout: 1000 });
    }
  }

  requestIdleCallback(processChunk);
}
```

### Browser Support

- Chrome, Edge, Firefox: Supported
- Safari: Not supported (use `setTimeout` fallback)

### Polyfill / Fallback

```js
const requestIdleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
const cancelIdleCallback = window.cancelIdleCallback || clearTimeout;
```

---

## 56. requestAnimationFrame

`requestAnimationFrame` schedules a callback before the next browser repaint, ensuring smooth animations synced to the display refresh rate.

```js
// Basic animation loop
function animate(timestamp) {
  // Update animation state
  element.style.transform = `translateX(${Math.sin(timestamp / 1000) * 100}px)`;

  requestAnimationFrame(animate);
}
const animationId = requestAnimationFrame(animate);

// Cancel animation
cancelAnimationFrame(animationId);
```

### Key Characteristics

- **Synced to display refresh** — Usually ~60fps (16.67ms per frame)
- **Pauses when tab is hidden** — Saves battery/CPU
- **One callback per frame** — Even if called multiple times
- **Timestamp parameter** — High-resolution DOMHighResTimeStamp

### Comparison with setTimeout

```js
// Bad: doesn't sync with display, can cause jank
setTimeout(() => { /* update */ }, 1000 / 60);

// Good: synced to display refresh
requestAnimationFrame((timestamp) => { /* update */ });

// setTimeout: runs even when tab is hidden
// requestAnimationFrame: pauses when tab is hidden
```

### Compound Example

```js
let startTime = null;
const duration = 2000;

function animate(timestamp) {
  if (!startTime) startTime = timestamp;
  const progress = timestamp - startTime;
  const percentage = Math.min(progress / duration, 1);

  element.style.opacity = percentage;
  element.style.transform = `scale(${1 + percentage * 0.5})`;

  if (progress < duration) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
```

---

## 57. Cross-Origin Isolation

Cross-Origin Isolation ensures that a web page cannot be partially compromised by a cross-origin attack. It's required for `SharedArrayBuffer`, `Atomics`, and high-resolution timers.

### Headers Required

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

### Check Isolation Status

```js
console.log(window.crossOriginIsolated); // true or false
```

### Isolated Features

| Feature | Requires Isolation |
|---------|-------------------|
| `SharedArrayBuffer` | Yes |
| `Performance.now()` high-resolution | Yes |
| `Atomics` | Yes |
| `crypto.randomUUID()` | No |
| `WebGL` | No |

### Service Worker Setup

```js
self.addEventListener('install', (event) => {
  // Pre-cache resources
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then((response) => {
      response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
      response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
      return response;
    })
  );
});
```

---

## 58. SharedArrayBuffer / Atomics

`SharedArrayBuffer` allows multiple web workers to share the same memory, enabling true parallelism. `Atomics` provides atomic operations on shared memory.

### SharedArrayBuffer

```js
// Main thread
const sharedBuffer = new SharedArrayBuffer(1024); // 1024 bytes
const int32Array = new Int32Array(sharedBuffer);

// Send to workers
worker1.postMessage(sharedBuffer);
worker2.postMessage(sharedBuffer);

// Worker
self.onmessage = (event) => {
  const shared = new Int32Array(event.data);
  // Read/write to shared memory
  Atomics.add(shared, 0, 1); // atomically add 1 to index 0
  console.log(shared[0]);
};
```

### Atomics Methods

| Method | Description |
|--------|-------------|
| `Atomics.add(typedArray, index, value)` | Atomic addition |
| `Atomics.sub(typedArray, index, value)` | Atomic subtraction |
| `Atomics.load(typedArray, index)` | Atomic read |
| `Atomics.store(typedArray, index, value)` | Atomic write |
| `Atomics.exchange(typedArray, index, value)` | Atomic swap |
| `Atomics.compareExchange(typedArray, index, expected, replacement)` | CAS operation |
| `Atomics.wait(typedArray, index, value, timeout)` | Block until value changes |
| `Atomics.notify(typedArray, index, count)` | Wake waiting threads |
| `Atomics.isLockFree(size)` | Check if operation is lock-free |

### Worker Synchronization Example

```js
// Worker 1
const shared = new Int32Array(event.data);
Atomics.store(shared, 0, 42); // set value
Atomics.notify(shared, 0, 1); // wake one waiter

// Worker 2
const shared = new Int32Array(event.data);
Atomics.wait(shared, 0, 0); // block until value != 0
console.log('Value received:', Atomics.load(shared, 0)); // 42
```

### Important Notes

- **Requires Cross-Origin Isolation** — Both COOP and COEP headers
- **Thread safety** — Developers must manage synchronization
- **No DOM access** — Like regular workers
- **Not a replacement for Web Workers** — Web Workers are for parallelism, SharedArrayBuffer is for shared memory

---

## 59. Trusted Types API

Trusted Types helps prevent **DOM XSS** attacks by requiring that certain DOM sink APIs only accept sanitized values instead of raw strings.

### Enable Trusted Types

```html
<meta http-equiv="Content-Security-Policy" content="trusted-types default">
```

### Create Trusted Types

```js
// Create a trusted type policy
const policy = trustedTypes.createPolicy('default', {
  createHTML: (input) => DOMPurify.sanitize(input),
  createScriptURL: (input) => new URL(input, document.baseURI).toString(),
  createScript: (input) => input,
});

// Use trusted types
element.innerHTML = policy.createHTML('<img src="safe.jpg">');
script.src = policy.createScriptURL('/safe.js');
```

### What It Protects

| Sink | Risk |
|------|------|
| `element.innerHTML` | XSS via string injection |
| `element.outerHTML` | XSS via string injection |
| `document.write()` | XSS via string injection |
| `eval()` | Code injection |
| `setTimeout(string)` | Code injection |
| `element.src` | Script injection |
| `element.href` | Navigation hijacking |

### Benefits

- **Defense-in-depth** against DOM XSS
- **Audit trail** of all HTML/script/URL creation
- **Integration with CSP** — Can enforce via Content Security Policy

---

## 60. Sanitizer API

The Sanitizer API provides a native browser mechanism for sanitizing HTML strings before inserting them into the DOM, replacing manual sanitization libraries like DOMPurify.

### Basic Usage

```js
// Sanitize HTML with default settings
const sanitizer = new Sanitizer();
const cleanHTML = sanitizer.sanitize('<img src=x onerror="alert(1)">Hello');
// Result: 'Hello' (dangerous parts removed)

// Custom configuration
const customSanitizer = new Sanitizer({
  allowElements: ['b', 'i', 'em', 'strong', 'a'],
  allowAttributes: { 'a': ['href'] },
  allowUnknownProtocols: false,
  allowComments: false,
});

const safeHTML = customSanitizer.sanitize('<b>Bold</b><script>alert(1)</script>');
// Result: '<b>Bold</b>'

// Use with innerHTML (if Trusted Types enabled)
element.setHTML('<img src=x onerror="alert(1)">Hello', { sanitizer: customSanitizer });
```

### Configuration Options

| Option | Description |
|--------|-------------|
| `allowElements` | Whitelist of allowed elements |
| `blockElements` | Elements to strip but keep content |
| `dropElements` | Elements to drop with content |
| `allowAttributes` | Whitelist of allowed attributes |
| `dropAttributes` | Attributes to drop |
| `allowUnknownProtocols` | Allow non-http(s) protocols |
| `allowComments` | Allow HTML comments |

### Browser Support

- Chrome 93+: Supported
- Firefox, Safari: Not yet widely supported
- **Use DOMPurify as fallback** for production apps

---

## 61. Content Security Policy (CSP)

CSP is a security layer that helps detect and mitigate certain types of attacks (XSS, data injection). It's enforced via HTTP headers or meta tags.

### Enable via HTTP Header

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
```

### Enable via Meta Tag

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
```

### Common Directives

| Directive | Controls |
|-----------|----------|
| `default-src` | Default policy for all resource types |
| `script-src` | JavaScript sources |
| `style-src` | CSS stylesheets |
| `img-src` | Images |
| `font-src` | Fonts |
| `connect-src` | XHR, WebSocket, EventSource |
| `media-src` | Audio/video |
| `frame-src` | iframes |
| `object-src` | Plugins (object, embed, applet) |
| `base-uri` | Base URL for document |
| `form-action` | Form submission targets |
| `frame-ancestors` | Embedding in frames (replaces X-Frame-Options) |

### Source Values

| Value | Description |
|-------|-------------|
| `'none'` | Block all |
| `'self'` | Same origin only |
| `'unsafe-inline'` | Allow inline scripts/styles |
| `'unsafe-eval'` | Allow eval() |
| `'strict-dynamic'` | Trust scripts loaded by trusted scripts |
| `'nonce-xyz'` | Allow scripts with matching nonce |
| `'sha256-...'` | Allow scripts with matching hash |
| `https:` | HTTPS sources only |
| `data:` | Allow data: URIs |

### Report-Only Mode

```
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report
```

### Report Format

```json
{
  "csp-report": {
    "document-uri": "https://example.com/page",
    "violated-directive": "script-src 'self'",
    "blocked-uri": "https://evil.com/script.js",
    "original-policy": "script-src 'self'"
  }
}
```

### Best Practices

1. **Start with report-only** — Monitor violations before enforcing
2. **Avoid `'unsafe-inline'`** — Use nonces or hashes instead
3. **Avoid `'unsafe-eval'`** — Never use in production
4. **Use `'strict-dynamic'`** — For modern frameworks
5. **Set `default-src`** as fallback for unspecified directives
6. **Use `report-uri`** or `report-to`** — Monitor violations in production

---

## Quick Reference: API Availability

| API | Requires HTTPS | User Gesture | Browser Support |
|-----|---------------|-------------|-----------------|
| Fetch | No | No | All modern |
| Web Storage | No | No | All modern |
| IndexedDB | No | No | All modern |
| Service Workers | Yes | No | All modern |
| WebSockets | No | No | All modern |
| WebRTC | Yes | Yes | All modern |
| Geolocation | Yes | Yes | All modern |
| Notifications | Yes | Yes | All modern |
| Clipboard | Yes | Yes | All modern |
| Web Bluetooth | Yes | Yes | Chrome, Edge |
| WebUSB | Yes | Yes | Chrome only |
| Web Serial | Yes | Yes | Chrome only |
| Fullscreen | No | Yes | All modern |
| Pointer Lock | No | Yes | All modern |
| Vibration | No | No | Mobile browsers |
| Gamepad | No | No | All modern |
| Permissions | No | No | All modern |

---

*This guide covers the essential JavaScript Web APIs. For the most up-to-date and detailed information, refer to [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API).*
