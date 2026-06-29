# 13. Server-Sent Events (SSE) — One-Way Real-Time

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## SSE vs WebSocket

| Feature | SSE | WebSocket |
|---------|-----|-----------|
| Direction | Server → Client only | Bidirectional |
| Protocol | HTTP | Upgraded to ws:// |
| Auto-reconnect | Built-in (browser) | Manual implementation |
| Binary data | No (text only) | Yes |
| Browser support | Excellent (except IE) | Excellent |
| Simpler | Yes | More complex |

## SSE Server (Node)

```javascript
const http = require('http');

http.createServer((req, res) => {
    if (req.url === '/events') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        });

        const intervalId = setInterval(() => {
            const data = JSON.stringify({
                time: new Date().toISOString(),
                value: Math.random()
            });
            res.write(`data: ${data}\n\n`);
        }, 2000);

        req.on('close', () => {
            clearInterval(intervalId);
            res.end();
        });
    } else {
        res.end('SSE server');
    }
}).listen(3000);
```

## SSE Client (Browser)

```javascript
const eventSource = new EventSource('http://localhost:3000/events');

eventSource.onopen = () => console.log('SSE connected');

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Event:', data);
};

eventSource.onerror = (err) => {
    console.error('SSE error:', err);
};

// Named events
eventSource.addEventListener('stock-update', (event) => {
    console.log('Stock update:', JSON.parse(event.data));
});

// To close:
// eventSource.close();
```

## SSE Event Format

```text
data: {"message": "Hello"}\n\n           ← Single event

data: {"id": 1}\n
data: {"id": 2}\n\n                      ← Two-line event

id: 12345\n                               ← Event ID (for Last-Event-ID)
event: stock-update\n                     ← Event name
data: {"symbol": "AAPL", "price": 150}\n\n
```

## Named Event Types

SSE supports named events that the client can listen for specifically:

```javascript
// Server
res.write(`event: stock-update\n`);
res.write(`data: {"symbol": "AAPL", "price": 150}\n\n`);

res.write(`event: news-alert\n`);
res.write(`data: {"headline": "Markets rally"}\n\n`);
```

```javascript
// Client
const source = new EventSource('/events');

source.addEventListener('stock-update', (event) => {
    console.log('Stock:', JSON.parse(event.data));
});

source.addEventListener('news-alert', (event) => {
    console.log('News:', JSON.parse(event.data));
});
```

## SSE Reconnection

Browsers automatically reconnect SSE connections when they drop. The server can use `Last-Event-ID` to replay missed events:

```javascript
// Server checks for Last-Event-ID
app.get('/events', (req, res) => {
    const lastId = req.headers['last-event-id'];
    const eventsSince = getEventsSince(lastId);
    eventsSince.forEach(event => {
        res.write(`id: ${event.id}\n`);
        res.write(`data: ${JSON.stringify(event.data)}\n\n`);
    });
});
```

## SSE vs Polling

| Approach | Latency | Server Load | Complexity |
|----------|---------|-------------|------------|
| **Polling (every 5s)** | ~5s average | High (many empty responses) | Low |
| **Long polling** | ~0.5s | Medium (held connections) | Medium |
| **SSE** | ~0.1s | Low (single connection) | Low |
| **WebSocket** | ~0.05s | Low (persistent connection) | Higher |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Server→Client only? | Use SSE. Bidirectional? Use WebSocket |
| Auto-reconnect needed? | SSE has built-in reconnection |
| Binary data? | SSE text-only. WebSocket supports binary |
| Need event types? | SSE supports named events via `event:` field |
| Missed messages? | Use `Last-Event-ID` header for replay |
## Next Steps

[Back to Chapter 12](12-websockets.md): 12. WebSockets — Full-Duplex Real-Time Communication
[Proceed to Chapter 14](14-graphql.md): 14. GraphQL — Query Language for APIs to learn about 14. graphql — query language for apis.
