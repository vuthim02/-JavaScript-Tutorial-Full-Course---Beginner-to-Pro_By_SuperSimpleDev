# 12. WebSockets — Full-Duplex Real-Time Communication

## HTTP vs WebSocket

```
HTTP:
Client ──── Request ────► Server
Client ◄─── Response ──── Server
(Cycle ends — connection may close)

WebSocket:
Client ◄═══ Continuous ═══► Server
(Bidirectional, persistent connection)
```

## When to Use WebSockets

| Use Case | Example |
|----------|---------|
| **Real-time chat** | Slack, Discord, WhatsApp Web |
| **Live updates** | Stock prices, sports scores |
| **Collaboration** | Google Docs, Figma, VS Code Live Share |
| **Gaming** | Multiplayer browser games |

## WebSocket Handshake

```
Client                                              Server
  │────── Upgrade Request ──────────────────────────►│
  │   GET /ws HTTP/1.1                               │
  │   Upgrade: websocket                             │
  │   Connection: Upgrade                            │
  │   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==    │
  │   Sec-WebSocket-Version: 13                      │
  │◄───── Upgrade Response ──────────────────────────│
  │   HTTP/1.1 101 Switching Protocols                │
  │   Upgrade: websocket                             │
  │   Connection: Upgrade                            │
  │   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo= │
```

## WebSocket Server (Node)

```javascript
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws, req) => {
    console.log('Client connected');
    ws.send(JSON.stringify({ type: 'welcome', message: 'Connected!' }));

    ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        // Broadcast to all clients
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'broadcast', data: message }));
            }
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
    ws.on('error', (err) => console.error('WebSocket error:', err));
});
```

## WebSocket Client

```javascript
// Browser
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('Connected');
    ws.send(JSON.stringify({ text: 'Hello server!' }));
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Server:', data);
};

ws.onclose = () => console.log('Disconnected');
ws.onerror = (err) => console.error('Error:', err);
```

## WebSocket with HTTP Server (Same Port)

```javascript
const server = http.createServer((req, res) => {
    res.end('HTTP server');
});
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => ws.send('WebSocket connected'));
server.listen(3000);
```

## Heartbeat / Keep-Alive

```javascript
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.isAlive = true;
    ws.on('pong', () => { this.isAlive = true; });
});

const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
    });
}, 30000);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Real-time communication needed? | WebSocket for bidirectional, SSE for server→client |
| Is HTTP polling being used? | Could be replaced with WebSocket for efficiency |
| Connection persistence? | WebSocket stays open. HTTP closes after response |
## Next Steps

[Back to Chapter 11](11-cors-tls.md): 11. CORS and HTTPS/TLS
[Proceed to Chapter 13](13-sse.md): 13. Server-Sent Events (SSE) — One-Way Real-Time to learn about 13. server-sent events (sse) — one-way real-time.
