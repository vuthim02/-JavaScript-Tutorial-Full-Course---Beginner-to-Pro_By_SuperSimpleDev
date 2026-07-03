# WebSocket

## Real-Time, Bidirectional Communication

WebSocket provides a persistent connection between client and server for real-time data exchange.

```javascript
const socket = new WebSocket("wss://example.com/chat");
```

## Connection Lifecycle

```javascript
const socket = new WebSocket("wss://echo.websocket.org");

socket.addEventListener("open", () => {
    console.log("Connected");
    socket.send("Hello server!");
});

socket.addEventListener("message", (e) => {
    console.log("Received:", e.data);
});

socket.addEventListener("close", (e) => {
    console.log("Disconnected:", e.code, e.reason);
});

socket.addEventListener("error", (e) => {
    console.error("WebSocket error:", e);
});
```

## Sending Data

```javascript
// Send text
socket.send("Plain text message");

// Send JSON
socket.send(JSON.stringify({
    type: "chat",
    user: "John",
    message: "Hello!"
}));

// Send binary
socket.send(new Blob(["binary data"]));
socket.send(new ArrayBuffer(8));
```

## Receiving Data

```javascript
socket.addEventListener("message", (e) => {
    if (typeof e.data === "string") {
        const data = JSON.parse(e.data);
        handleMessage(data);
    } else if (e.data instanceof Blob) {
        handleBlob(e.data);
    }
});
```

## Reconnection Logic

```javascript
function connectWebSocket(url) {
    let socket;
    let reconnectTimer;
    let reconnectAttempts = 0;
    const maxReconnect = 10;

    function connect() {
        socket = new WebSocket(url);

        socket.addEventListener("open", () => {
            console.log("Connected");
            reconnectAttempts = 0;
        });

        socket.addEventListener("close", () => {
            console.log("Disconnected");
            scheduleReconnect();
        });

        socket.addEventListener("error", () => {
            socket.close();
        });
    }

    function scheduleReconnect() {
        if (reconnectAttempts >= maxReconnect) return;
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
        reconnectTimer = setTimeout(() => {
            reconnectAttempts++;
            connect();
        }, delay);
    }

    connect();

    return {
        send: (data) => socket.send(data),
        close: () => {
            clearTimeout(reconnectTimer);
            socket.close();
        }
    };
}
```

## WebSocket vs HTTP

| Feature | HTTP | WebSocket |
|---------|------|-----------|
| Direction | Client → Server (request/response) | Bidirectional |
| Connection | Short-lived (one request) | Persistent |
| Overhead | Headers per request | Minimal framing |
| Real-time | Polling, SSE | True real-time |
| Protocol | `http://` / `https://` | `ws://` / `wss://` |
| Browser support | Universal | Modern browsers |

## Common Use Cases

```
- Chat applications
- Live notifications
- Real-time collaboration (Google Docs)
- Online gaming
- Stock tickers / live prices
- Collaborative drawing
- Live sports scores
```

## Security Notes

```
- Always use wss:// (WebSocket Secure) in production
- Same-origin policy does NOT apply to WebSocket (check server validates Origin header)
- WebSocket connections can be hijacked if server doesn't validate
- Authentication should happen in the application layer (tokens in messages)
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How is real-time data delivered? | Check for `WebSocket`, `EventSource` (SSE), or polling (`setInterval` + `fetch`). |
| What's the WebSocket URL? | Look for `new WebSocket("...")`. Often starts with `wss://`. |
| What data format is used over WebSocket? | Usually JSON, sometimes binary (protobuf, msgpack). |
| Is reconnection implemented? | Check for `close` event handler with reconnect logic. |
| How is authentication handled? | Look for tokens sent in the first message after connection. |
## Next Steps

[Back to Chapter 36](36-service-workers.md): Service Workers
[Proceed to Chapter 38](38-canvas.md): Canvas API to learn about canvas api.
