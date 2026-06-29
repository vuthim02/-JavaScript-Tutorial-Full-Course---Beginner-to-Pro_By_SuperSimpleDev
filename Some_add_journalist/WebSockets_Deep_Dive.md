# WebSockets Deep Dive — Real-Time Communication with Node.js

---

## 1. What Are WebSockets?

HTTP is **request-response**: client asks, server answers. Connection closes.

WebSocket is **full-duplex**: client and server can send messages anytime over one persistent connection.

```
HTTP:                              WebSocket:
Client          Server             Client          Server
  │               │                  │               │
  │── request ──→│                  │── handshake ──→│
  │←─ response ──│                  │←─ upgrade ─────│
  │── request ──→│                  │  (connection    │
  │←─ response ──│                  │   stays open)   │
  │               │                  │               │
  Connection closes                 │←─ push msg ────│
  each request                      │── send msg ───→│
                                    │←─ push msg ────│
                                    │  (anytime)      │
```

**Key difference:**
```
HTTP:  You ask → you get  ("Can I have the data?")
WS:    I tell you when   ("Here's the data, it just changed")
```

---

## 2. When to Use WebSockets

| Use Case | Why WS |
|---|---|
| Chat app | Messages arrive instantly without polling |
| Live notifications | Server pushes "new follower" without client asking |
| Real-time collaboration | Multiple users editing same doc (Google Docs) |
| Live sports scores / stock tickers | Data changes every second, push to all clients |
| Multiplayer games | Low-latency bidirectional updates |
| Progress updates | Server: "file 45% uploaded..." → client shows progress bar |

**Do NOT use WS for normal CRUD** (GET/POST/DELETE). Use REST for that, WS for real-time.

---

## 3. WebSocket Handshake — How It Starts

A WebSocket connection starts as HTTP, then **upgrades**:

**Client request:**
```
GET /chat HTTP/1.1
Host: localhost:3000
Upgrade: websocket          ← tells server "I want WS"
Connection: Upgrade         ← required header
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==  ← random key
Sec-WebSocket-Version: 13   ← protocol version
```

**Server response (101 Switching Protocols):**
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=  ← computed from key
```

After this, the connection **is no longer HTTP** — it's raw WebSocket frames.

---

## 4. Server Setup — Native `ws` Library

```bash
npm install ws
```

### Basic server

```js
// server.js
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();
const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  console.log('Client connected from:', req.socket.remoteAddress);

  // Send welcome message
  ws.send(JSON.stringify({ type: 'welcome', message: 'Connected!' }));

  // Receive messages
  ws.on('message', (data) => {
    console.log('Received:', data.toString());
    // Echo back
    ws.send(`Echo: ${data}`);
  });

  // Handle disconnect
  ws.on('close', (code, reason) => {
    console.log('Client disconnected:', code, reason.toString());
  });

  // Handle errors
  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server on port ${PORT} (HTTP + WS)`);
});
```

### Client side

```js
// Browser
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('Connected');
  ws.send('Hello server!');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Server:', data);
};

ws.onclose = (event) => {
  console.log('Disconnected:', event.code, event.reason);
};

ws.onerror = (err) => {
  console.error('WS Error:', err);
};

// Send later
ws.send(JSON.stringify({ type: 'chat', text: 'Hey!' }));

// Close
ws.close();
```

---

## 5. Socket.IO — The High-Level Alternative

Raw `ws` is low-level. Socket.IO adds: rooms, namespaces, auto-reconnect, fallback to HTTP polling, and a cleaner API.

```bash
npm install socket.io
```

### Server

```js
// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // your frontend
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  // Chat message
  socket.on('chat-message', (data) => {
    // Broadcast to everyone in the room (including sender)
    io.to(data.room).emit('chat-message', {
      userId: socket.id,
      text: data.text,
      timestamp: Date.now(),
    });
  });

  // Typing indicator
  socket.on('typing', (data) => {
    socket.to(data.room).emit('typing', { userId: socket.id });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000);
```

### Client (Browser)

```html
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
<script>
  const socket = io('http://localhost:3000');

  socket.on('connect', () => {
    console.log('Connected:', socket.id);
    socket.emit('join-room', 'room-123');
  });

  // Send message
  document.querySelector('#send-btn').onclick = () => {
    socket.emit('chat-message', {
      room: 'room-123',
      text: document.querySelector('#input').value,
    });
  };

  // Receive message
  socket.on('chat-message', (data) => {
    const div = document.createElement('div');
    div.textContent = `${data.userId}: ${data.text}`;
    document.querySelector('#messages').appendChild(div);
  });

  // Typing indicator
  socket.on('typing', (data) => {
    document.querySelector('#typing').textContent = 'Someone is typing...';
    setTimeout(() => { document.querySelector('#typing').textContent = ''; }, 1000);
  });
</script>
```

### Client (Alpine.js)

```html
<div x-data="chat()" x-init="init()">
  <div id="messages">
    <template x-for="msg in messages" :key="msg.id">
      <div x-text="msg.text"></div>
    </template>
  </div>
  <input x-model="newMessage" @keydown.enter="send()">
</div>

<script>
  function chat() {
    return {
      socket: null,
      messages: [],
      newMessage: '',

      init() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', () => {
          this.socket.emit('join-room', 'room-123');
        });
        this.socket.on('chat-message', (data) => {
          this.messages.push(data);
        });
      },

      send() {
        this.socket.emit('chat-message', {
          room: 'room-123',
          text: this.newMessage,
        });
        this.newMessage = '';
      },
    };
  }
</script>
```

---

## 6. Socket.IO — Key Concepts

### Rooms

Divide connected clients into groups:

```js
// Server
socket.join('room-123');            // join room
socket.leave('room-123');           // leave room

io.to('room-123').emit('event', data);     // all in room
socket.to('room-123').emit('event', data);  // all EXCEPT sender
io.emit('event', data);                     // ALL connected clients
```

### Namespaces

Create separate channels within one server:

```js
const chat = io.of('/chat');
const admin = io.of('/admin');

chat.on('connection', (socket) => {
  // handles /chat namespace
});

admin.on('connection', (socket) => {
  // handles /admin namespace (different logic)
});
```

Client connects to specific namespace:
```js
const chatSocket = io('/chat');
const adminSocket = io('/admin');
```

### Events (vs raw `onmessage`)

Socket.IO uses named events instead of parsing everything manually:

```js
// Server
socket.on('chat-message', (data) => { ... });
socket.emit('new-notification', { count: 3 });

// Client
socket.on('new-notification', (data) => { ... });
socket.emit('chat-message', { text: 'Hey' });
```

### Auto-reconnect

```js
const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionAttempts: 10,     // try 10 times
  reconnectionDelay: 1000,      // start at 1s
  reconnectionDelayMax: 5000,   // max 5s between attempts
});
```

### Ack (Acknowledgement)

```js
// Client sends and waits for confirmation
socket.emit('request-data', { id: 5 }, (response) => {
  console.log('Server acknowledged:', response);
});

// Server sends ack
socket.on('request-data', (data, callback) => {
  const result = getData(data.id);
  callback({ status: 'ok', data: result });
});
```

---

## 7. Broadcasting Patterns

### Broadcast to all connected clients

```js
// ws
wss.clients.forEach((client) => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(data));
  }
});

// Socket.IO
io.emit('event', data);
```

### Broadcast to all except sender

```js
// ws
wss.clients.forEach((client) => {
  if (client !== ws && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(data));
  }
});

// Socket.IO
socket.broadcast.emit('event', data);
```

### Broadcast to specific room

```js
// Socket.IO
io.to('room-456').emit('event', data);
socket.to('room-456').emit('event', data);  // exclude sender
```

---

## 8. Real-World Example: Live Todo List

When one user adds a todo, every other connected user sees it instantly.

### Server

```js
// server.js
const { Server } = require('socket.io');

const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:5173' },
});

// Auth middleware — verify JWT on connection
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch (err) {
    next(new Error('Authentication failed'));
  }
});

io.on('connection', (socket) => {
  console.log(`User ${socket.userId} connected`);

  // Join personal room (for private updates)
  socket.join(`user:${socket.userId}`);

  socket.on('item-created', (item) => {
    // Notify the creator's other tabs/devices
    io.to(`user:${socket.userId}`).emit('item-added', item);
  });

  socket.on('item-updated', (item) => {
    socket.to(`user:${socket.userId}`).emit('item-changed', item);
  });

  socket.on('item-deleted', (itemId) => {
    socket.to(`user:${socket.userId}`).emit('item-removed', itemId);
  });
});
```

### REST endpoints emit WebSocket events

```js
// routes/items.js
router.post('/items', async (req, res) => {
  const item = await prisma.item.create({
    data: { name: req.body.name, userId: req.user.id },
  });

  // Notify user's other clients via WS
  req.app.get('io').to(`user:${req.user.id}`).emit('item-added', item);

  res.status(201).json(item);
});

router.patch('/items/:id', async (req, res) => {
  const item = await prisma.item.update({
    where: { id: +req.params.id },
    data: req.body,
  });

  req.app.get('io').to(`user:${req.user.id}`).emit('item-changed', item);

  res.json(item);
});

router.delete('/items/:id', async (req, res) => {
  await prisma.item.delete({ where: { id: +req.params.id } });

  req.app.get('io').to(`user:${req.user.id}`).emit('item-removed', +req.params.id);

  res.status(204).send();
});
```

### Client

```js
// Alpine.js
function todoApp() {
  return {
    items: [],
    socket: null,

    async init() {
      // Fetch initial data via REST
      const res = await fetch('/api/items', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      this.items = data.data;

      // Connect WebSocket
      this.socket = io('http://localhost:3000', {
        auth: { token: localStorage.getItem('token') },
      });

      this.socket.on('item-added', (item) => {
        this.items.unshift(item);
      });

      this.socket.on('item-changed', (item) => {
        const idx = this.items.findIndex(i => i.id === item.id);
        if (idx !== -1) this.items[idx] = item;
      });

      this.socket.on('item-removed', (id) => {
        this.items = this.items.filter(i => i.id !== id);
      });
    },
  };
}
```

---

## 9. Scaling WebSockets

A single server works for small apps. For multiple servers, you need a **pub/sub layer** (Redis):

```
                    ┌───────────┐
                    │   Redis    │
                    │ (pub/sub)  │
                    └─────┬─────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
    ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐
    │ Server 1  │   │ Server 2  │   │ Server 3  │
    │ (ws users)│   │ (ws users)│   │ (ws users)│
    └───────────┘   └───────────┘   └───────────┘
```

```js
// Socket.IO with Redis adapter
npm install @socket.io/redis-adapter ioredis
```

```js
const { createAdapter } = require('@socket.io/redis-adapter');
const { Redis } = require('ioredis');

const pubClient = new Redis(process.env.REDIS_URL);
const subClient = pubClient.duplicate();
io.adapter(createAdapter(pubClient, subClient));
```

Now `io.to('room-123').emit(...)` works across all servers.

---

## 10. WebSocket vs Socket.IO — Comparison

| Feature | `ws` (raw) | Socket.IO |
|---|---|---|
| Package size | Tiny | Larger |
| Auto-reconnect | Manual | Built-in |
| Rooms | Manual | Built-in |
| Namespaces | No | Built-in |
| Fallback (polling) | No | HTTP long-polling |
| Ack | Manual | Built-in |
| Binary data | Native | Supported |
| Learning curve | Low (but more work) | Medium |
| When to use | Simple real-time, performance-critical | Chat, rooms, fallback needed |

**Rule:** Use Socket.IO unless you have a specific reason not to (extreme performance, tiny bundle size).

---

## 11. Security

### Validate origin

```js
const wss = new WebSocketServer({
  server,
  verifyClient: (info, cb) => {
    const origin = info.origin || info.req.headers.origin;
    if (origin !== 'https://myapp.com') {
      cb(false, 403, 'Forbidden');
      return;
    }
    cb(true);
  },
});
```

### Authenticate on connection

```js
// Socket.IO — use middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Unauthorized'));
  try {
    socket.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    next(new Error('Invalid token'));
  }
});
```

### Rate limit messages

```js
const rateLimit = new Map();

io.use((socket, next) => {
  socket.messageCount = 0;
  socket.lastReset = Date.now();
  next();
});

socket.on('chat-message', (data) => {
  socket.messageCount++;
  if (Date.now() - socket.lastReset > 1000) {
    socket.messageCount = 0;
    socket.lastReset = Date.now();
  }
  if (socket.messageCount > 5) {
    socket.emit('error', { message: 'Rate limited' });
    return;
  }
  // process message...
});
```

### Validate message data

```js
socket.on('chat-message', (data) => {
  if (!data || typeof data.text !== 'string' || data.text.length > 500) {
    return;
  }
  // sanitize
  const clean = data.text.replace(/<[^>]*>/g, '');
  // ...
});
```

---

## 12. Quick Reference

| Concept | Key Point |
|---|---|
| WebSocket | Persistent bidirectional connection over TCP |
| Handshake | HTTP 101 Upgrade, then raw WS frames |
| `ws` library | Low-level, lightweight, full control |
| Socket.IO | High-level: rooms, namespaces, auto-reconnect, fallback |
| `io.emit()` | Send to all connected clients |
| `socket.emit()` | Send to one client |
| `socket.to(room).emit()` | Send to room EXCEPT sender |
| `io.to(room).emit()` | Send to room INCLUDING sender |
| `socket.join()` | Add client to a room |
| Rooms | Logical groups of sockets (chat rooms, user's private room) |
| Namespaces | Separate channels (`/chat`, `/admin`) on one server |
| Scaling | Redis adapter for multi-server WS |
| Security | Validate origin, auth on connect, rate limit, sanitize input |

---

*Last updated: June 2026*
