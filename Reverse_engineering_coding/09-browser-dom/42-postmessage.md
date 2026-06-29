# Cross-Window Communication (postMessage)

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Sending Messages Between Windows

`postMessage` enables secure cross-origin communication between browser windows, iframes, and popups.

```javascript
// sender.html (sends a message)
const popup = window.open("https://other-site.com/receiver.html");
popup.postMessage({ type: "greeting", text: "Hello from main window!" }, "https://other-site.com");
```

```javascript
// receiver.html (receives the message)
window.addEventListener("message", (event) => {
    // ALWAYS check origin!
    if (event.origin !== "https://my-site.com") return;

    console.log("Received:", event.data);
    // event.data: { type: "greeting", text: "Hello from main window!" }

    // Reply to sender
    event.source.postMessage({ reply: "Hello back!" }, event.origin);
});
```

## The Message Event Object

```javascript
window.addEventListener("message", (event) => {
    event.data;          // The sent data (any structured clone)
    event.origin;        // Origin of the sender (MUST verify!)
    event.source;        // Reference to the sender window (for replies)
    event.lastEventId;   // For server-sent events (rare)
});
```

## Communication Between iframe and Parent

```javascript
// parent page
const iframe = document.getElementById("myIframe");

// Send to iframe
iframe.contentWindow.postMessage({ action: "updateTheme", theme: "dark" }, "https://app.example.com");

// Listen from iframe
window.addEventListener("message", (event) => {
    if (event.origin !== "https://app.example.com") return;
    console.log("Data from iframe:", event.data);
});
```

```javascript
// iframe page
// Send to parent
window.parent.postMessage({ height: document.body.scrollHeight }, "https://parent-site.com");

// Receive from parent
window.addEventListener("message", (event) => {
    if (event.origin !== "https://parent-site.com") return;
    applyTheme(event.data.theme);
});
```

## Security: ALWAYS Check origin

```javascript
// INSECURE — anyone can send messages
window.addEventListener("message", (event) => {
    document.title = event.data;  // XSS vulnerability!
});

// SECURE — verify the sender
const ALLOWED_ORIGINS = ["https://myapp.com", "https://app.myapp.com"];

window.addEventListener("message", (event) => {
    if (!ALLOWED_ORIGINS.includes(event.origin)) return;
    if (typeof event.data !== "object" || !event.data.type) return;

    handleMessage(event.data);
});
```

## Communication Between Tabs

```javascript
// Tab 1: Open a channel
const channel = new BroadcastChannel("app-sync");

channel.postMessage({ type: "user-logged-in", userId: 42 });

channel.onmessage = (event) => {
    console.log("Tab received:", event.data);
};
```

```javascript
// Tab 2: Listen on the same channel
const channel = new BroadcastChannel("app-sync");

channel.onmessage = (event) => {
    if (event.data.type === "user-logged-in") {
        updateUI(event.data.userId);
    }
};
```

`BroadcastChannel` is simpler than `postMessage` for same-origin tab-to-tab communication.

## Use Cases

```
- Cross-origin iframe communication (embedded widgets, payments)
- Popup window communication (OAuth login flow)
- Multi-window apps (sync state between windows)
- Developer tools (DevTools extensions communicate with pages)
- Cross-origin analytics/embeds
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is cross-window communication used? | Check for `postMessage`, `BroadcastChannel`, or `window.open` + messaging. |
| What data is exchanged? | Check the message event handler's `event.data`. |
| Is the origin verified? | Check if `event.origin` is validated in the message handler. |
| Is it secure? | If `event.origin` is not checked, it's vulnerable to cross-site attacks. |
| Which windows communicate? | Look for `window.open`, `iframe.contentWindow`, or `BroadcastChannel`. |
## Next Steps

[Back to Chapter 41](41-indexeddb.md): IndexedDB
[Proceed to Chapter 43](43-dom-performance.md): DOM Performance Optimization to learn about dom performance optimization.
