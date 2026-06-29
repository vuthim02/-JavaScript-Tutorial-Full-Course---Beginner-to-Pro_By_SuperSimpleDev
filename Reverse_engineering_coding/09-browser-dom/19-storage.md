# Storage

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## localStorage

Persists after browser closes. Survives page reloads and browser restarts.

```javascript
localStorage.setItem("name", "John");
```

Read:

```javascript
localStorage.getItem("name");
```

Remove:

```javascript
localStorage.removeItem("name");
```

Clear:

```javascript
localStorage.clear();
```

---

## Storage Limits

```
localStorage: ~5-10MB per origin
sessionStorage: ~5-10MB per origin
Cookies: ~4KB per cookie, ~20 cookies per domain
```

---

## Data is Stored as Strings

```javascript
// Objects must be serialized
const user = { name: "John", age: 30 };
localStorage.setItem("user", JSON.stringify(user));

// Read back
const stored = JSON.parse(localStorage.getItem("user"));
console.log(stored.name); // "John"

// Numbers are stored as strings
localStorage.setItem("count", 42);
console.log(typeof localStorage.getItem("count")); // "string" (not number)
```

---

## sessionStorage

Same API as localStorage, but:

```
Data is destroyed when the tab is closed
Data is NOT shared between tabs (even same origin)
```

```javascript
sessionStorage.setItem("temp", "This will be gone when tab closes");
```

---

## Storage Event

Fires when localStorage changes in **another tab** (same origin):

```javascript
window.addEventListener("storage", (e) => {
    console.log("Changed key:", e.key);       // "name"
    console.log("Old value:", e.oldValue);    // null
    console.log("New value:", e.newValue);    // "John"
    console.log("Origin URL:", e.url);        // "https://example.com"
});
```

---

## Cookies (Legacy)

```javascript
// Set cookie (expires in 7 days)
document.cookie = "theme=dark; max-age=" + 60 * 60 * 24 * 7 + "; path=/";

// Read all cookies
console.log(document.cookie); // "theme=dark; session=abc123"

// Delete cookie
document.cookie = "theme=; max-age=0; path=/";
```

---

## Storage Comparison

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|----------------|---------|
| Persists after browser close | Yes | No | Yes (based on expiry) |
| Survives page reload | Yes | Yes | Yes |
| Shared between tabs | Yes | No | Yes |
| Sent to server automatically | No | No | Yes |
| Capacity | ~5-10MB | ~5-10MB | ~4KB |
| Accessible from | Client JS | Client JS | Client + Server |
| Expires | Never (manual delete) | Tab close | Set by `max-age` or `expires` |

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Temporary? | Use `sessionStorage` (cleared on tab close). |
| Permanent? | Use `localStorage` (persists until manually cleared). |
| Is data serialized/deserialized correctly? | Check for `JSON.parse` on read and `JSON.stringify` on write for objects. |
| Are there remaining data from previous sessions? | Check DevTools Application → Local Storage / Session Storage. |
## Next Steps

[Back to Chapter 18](18-timers.md): Timers
[Proceed to Chapter 20](20-json.md): JSON — Serialization and Deserialization to learn about json — serialization and deserialization.
