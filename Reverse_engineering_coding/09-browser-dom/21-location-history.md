# Location Object

## Current URL

```javascript
location.href     // Full URL: "https://example.com/page?q=hello#section"
location.protocol // "https:"
location.hostname // "example.com"
location.port     // "443" (or "" for default)
location.pathname // "/page"
location.search   // "?q=hello"
location.hash     // "#section"
location.origin   // "https://example.com"
```

---

## Navigation

```javascript
// Redirect to new page
location.assign("https://other.com");

// Same as assign (most common)
location.href = "https://other.com";

// Replace (no history entry)
location.replace("https://other.com");
// User cannot click "Back" to return

// Reload
location.reload();          // Reload from cache
location.reload(true);      // Force reload from server (deprecated)
```

---

## URL Manipulation

```javascript
// Parse current URL
const url = new URL(location.href);

// Read search params
console.log(url.searchParams.get("q")); // "hello"
url.searchParams.set("page", "2");
url.searchParams.delete("filter");

// Update URL without reload
history.pushState({}, "", url.toString());
// Or
window.history.replaceState({}, "", url.toString());
```

---

## URL Search Params

```javascript
const params = new URLSearchParams("?name=John&age=30");

params.get("name");     // "John"
params.has("age");      // true
params.set("name", "Jane");
params.append("role", "admin");
params.delete("age");

console.log(params.toString()); // "name=Jane&role=admin"
```

---

# History API

## Browser Navigation History

```javascript
history.back();     // Go back one page
history.forward();  // Go forward one page
history.go(-2);     // Go back two pages
history.go(1);      // Same as forward()
```

```javascript
console.log(history.length); // Number of entries in session history
```

---

## pushState and replaceState

Modern SPAs (Single Page Applications) use these to update URL without page reload:

```javascript
// Add entry to history (user can click Back)
history.pushState({ page: 1 }, "", "/page1");

// Replace current entry (no new history entry)
history.replaceState({ page: 2 }, "", "/page2");
```

---

## popstate Event

Fires when user clicks Back/Forward (but not on pushState/replaceState):

```javascript
window.addEventListener("popstate", (e) => {
    console.log("State:", e.state); // The state object passed to pushState
    // Update UI based on the state
});
```

---

## SPA Routing Example

```javascript
// Navigation
function navigate(path, data = {}) {
    history.pushState(data, "", path);
    render(path);
}

// Handle back/forward
window.addEventListener("popstate", (e) => {
    render(location.pathname);
});

// Initial load
render(location.pathname);
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the current URL? | `location.href`. |
| How to redirect? | `location.href = newUrl` or `location.assign()`. |
| How to modify query parameters? | `new URLSearchParams(location.search)` or `URL.searchParams`. |
| How to update URL without page reload? | `history.pushState({}, "", newUrl)`. |
## Next Steps

[Back to Chapter 20](20-json.md): JSON — Serialization and Deserialization
[Proceed to Chapter 22](22-navigator-screen.md): Navigator Object to learn about navigator object.
