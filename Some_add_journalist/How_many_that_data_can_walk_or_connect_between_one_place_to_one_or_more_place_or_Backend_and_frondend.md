# How Data Walks — Communication Between Frontend, Backend, Databases & Services

## The Big Picture

Data travels in **layers**. Each layer talks to the next:

```
[Browser] ←→ [Server/API] ←→ [Database]
    ↕                ↕
[Client Cache]   [Cache Layer]
(localStorage,    (Redis, Memcached)
 IndexedDB)
                       ↕
                 [External APIs]
                 (Stripe, Google,
                  GitHub, etc.)
```

Each arrow (←→) is a **data transfer method**. This doc covers every way data moves between these places.

---

## 1. Browser ←→ Server (Frontend ↔ Backend)

These are the ways your client-side JavaScript talks to your Express (or any) server.

### 1.1 HTTP Requests (fetch / XMLHttpRequest)

**What it is:** The foundation of web communication. Client sends an HTTP request, server sends back a response.

```
Client                          Server
  │                               │
  │─── GET /api/items ──────────→│
  │                               │  Query DB
  │←── JSON [{id:1, name:...}] ──│
  │                               │
  │─── POST /api/items ─────────→│
  │    body: {name: "Buy milk"}   │
  │←── JSON {id:4, name:"..."} ──│
```

**Methods (CRUD):**
- `GET` — Read data
- `POST` — Create data
- `PUT` / `PATCH` — Update data
- `DELETE` — Remove data

**Code (client):**
```js
// GET
const res = await fetch('/api/items');
const items = await res.json();

// POST
const res = await fetch('/api/items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'New item' }),
});
const newItem = await res.json();
```

**Code (server — Express):**
```js
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const item = { id: Date.now(), name: req.body.name };
  items.push(item);
  res.status(201).json(item);
});
```

**Variations:**
| Technique       | What It Does                              | When to Use                      |
|-----------------|-------------------------------------------|----------------------------------|
| `fetch`         | Modern browser API, promise-based         | Default choice (all modern apps) |
| `axios`         | Third-party lib (auto JSON parse, better error handling) | When you want cleaner syntax |
| `XMLHttpRequest`| Old browser API, callback-based           | Legacy code only                 |
| `$.ajax`        | jQuery wrapper                            | Legacy code only                 |

---

### 1.2 WebSockets (Full-Duplex Real-Time)

**What it is:** A persistent two-way connection. Server can push data to client without the client asking.

```
Client                          Server
  │                               │
  │─── WebSocket handshake ─────→│
  │←──── Connection open ────────│
  │                               │
  │←── "New message from user" ──│  (server pushes)
  │─── "Typing..." ─────────────→│  (client sends)
  │←── "User is typing" ────────│  (broadcast)
```

**When to use:**
- Chat apps
- Live notifications
- Real-time collaboration (Google Docs)
- Live sports scores / stock tickers
- Multiplayer games

**Code (server — ws library with Express):**
```js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.send('Welcome!');
});
```

**Code (client):**
```js
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  ws.send('Hello server!');
};

ws.onmessage = (event) => {
  console.log('Server says:', event.data);
};

ws.onclose = () => {
  console.log('Disconnected');
};
```

**Comparison with HTTP:**
| Feature          | HTTP Request            | WebSocket              |
|------------------|-------------------------|------------------------|
| Connection       | Opens and closes each request | Persistent (stays open) |
| Direction        | Client → Server (request/response) | Bidirectional anytime  |
| Real-time        | Polling needed          | Native (instant)       |
| Overhead         | Headers every request   | Small frames after handshake |
| Use case         | REST APIs, CRUD         | Live updates, chat     |

---

### 1.3 Server-Sent Events (SSE)

**What it is:** One-way from server to client over HTTP. Client subscribes, server pushes updates.

```
Client                          Server
  │                               │
  │─── GET /events ─────────────→│
  │←── "data: update 1\n\n" ─────│
  │←── "data: update 2\n\n" ─────│
  │←── "data: update 3\n\n" ─────│  (auto-reconnect if dropped)
```

**When to use:**
- News feeds
- Live notifications (one-way)
- Stock tickers
- Progress bars (file upload)

**Code (server):**
```js
app.get('/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  setInterval(() => {
    res.write(`data: ${JSON.stringify({ time: new Date() })}\n\n`);
  }, 1000);
});
```

**Code (client):**
```js
const evtSource = new EventSource('/events');
evtSource.onmessage = (event) => {
  console.log('Got:', JSON.parse(event.data));
};
```

---

### 1.4 Polling (Short & Long)

**Short Polling:** Client asks "any updates?" every N seconds.
**Long Polling:** Client asks, server holds the request until it has data, then responds. Client re-connects immediately.

```
Short Polling:
Client: "Any updates?"  →  Server: "No"      (every 2 seconds)
Client: "Any updates?"  →  Server: "No"
Client: "Any updates?"  →  Server: "Here!"    (wasteful)

Long Polling:
Client: "Any updates?"  →  Server: (holds...) → "Here!"
Client: "Any updates?"  →  Server: (holds...) → "Here!"  (efficient, but still HTTP overhead)
```

**When to use:** Legacy fallback when WebSockets aren't available.
**Avoid in new code.** Use WebSockets or SSE instead.

---

## 2. Server ←→ Database

### 2.1 Direct Connection (pg, mysql2, mongodb driver)

**What it is:** Server opens a TCP connection to the database and sends queries.

```
Server                     Database Server
  │                           │
  │─── TCP connect ─────────→│
  │─── "SELECT * FROM ..." ─→│
  │←── [rows...] ────────────│
```

**Connection types:**
- **Single connection** — one client at a time
- **Connection pool** — reusable set of connections (standard for web servers)

**Code (PostgreSQL with pool):**
```js
const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'postgres',
  password: 'secret',
  max: 20,         // max connections in pool
  idleTimeoutMillis: 30000,
});

app.get('/api/items', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM items');
  res.json(rows);
});
```

### 2.2 ORM / Query Builder (Higher-Level Abstraction)

Instead of raw SQL, use a library that maps database tables to JavaScript objects.

| Library     | Database       | Style        |
|-------------|----------------|--------------|
| Prisma      | PostgreSQL, MySQL, SQLite, MongoDB | Schema-first, auto-generated client |
| Sequelize   | PostgreSQL, MySQL, SQLite, MariaDB | Model-based ORM |
| Knex        | PostgreSQL, MySQL, SQLite | Query builder (write SQL-like JS) |
| Mongoose    | MongoDB        | Schema + model for MongoDB |
| Drizzle     | PostgreSQL, MySQL, SQLite | TypeScript-first, lightweight |

**Code (Prisma):**
```js
// schema.prisma
model Item {
  id        Int     @id @default(autoincrement())
  name      String
  completed Boolean @default(false)
}

// server.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/api/items', async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const item = await prisma.item.create({
    data: { name: req.body.name },
  });
  res.json(item);
});
```

---

### 2.3 Database Replication (Data Moving Between Databases)

Databases can talk to other databases:

```
Master DB ──→ Replica 1 (read-only)
         └──→ Replica 2 (read-only)
                   │
              App reads from replica for speed
              App writes to master (propagated automatically)
```

**Types:**
- **Master-Replica** — one write, many read copies (scales reads)
- **Multi-Master** — multiple nodes accept writes
- **Sharding** — data split across databases by key (e.g., user_id % 10)

---

## 3. Server ←→ External APIs (Third-Party Services)

**What it is:** Your server makes HTTP requests to other servers (Stripe, GitHub, Google, OpenAI).

```
Your Server                 External API (e.g., Stripe)
  │                               │
  │─── POST /v1/charges ─────────→│
  │    Authorization: sk_test_xxx  │
  │    body: {amount: 2000, ...}   │
  │←── {id: "ch_123", status:...} │
```

**Code:**
```js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/checkout', async (req, res) => {
  const payment = await stripe.charges.create({
    amount: 2000,
    currency: 'usd',
    source: req.body.token,
    description: 'Example charge',
  });
  res.json(payment);
});
```

**Common external APIs:**
| Service       | What It Does                    |
|---------------|---------------------------------|
| Stripe        | Payments                        |
| SendGrid      | Email sending                   |
| Twilio        | SMS / phone calls               |
| OpenAI        | AI / LLM                        |
| GitHub API    | Repos, issues, auth             |
| Google Maps   | Geocoding, directions           |
| Auth0         | Authentication                  |

---

## 4. Server ←→ Cache Layer (Redis / Memcached)

**What it is:** A fast in-memory store sits between server and database to avoid repeated expensive queries.

```
Server
  │
  ├──→ Check Redis cache
  │      ├── Hit  → return data (fast)
  │      └── Miss → query DB → store in Redis → return (slow once)
  │
  Database (slower, disk-based)
```

**Code (Cache-Aside Pattern):**
```js
async function getItem(id) {
  const cacheKey = `item:${id}`;

  // 1. Try cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // 2. Cache miss — query DB
  const item = await db.query('SELECT * FROM items WHERE id = $1', [id]);

  // 3. Store in cache (expire after 1 hour)
  await redis.setex(cacheKey, 3600, JSON.stringify(item));

  return item;
}
```

**Cache Invalidation (hardest problem in CS):**
- **TTL (Time-To-Live)** — auto-expire after N seconds
- **Write-through** — update cache when DB updates
- **Write-behind** — async update (risky)
- **Manual invalidation** — delete cache key when data changes

---

## 5. Client ←→ Client (Same Device)

### 5.1 BroadcastChannel API (Between Tabs)

```js
// Tab A
const channel = new BroadcastChannel('app_channel');
channel.postMessage({ type: 'LOGOUT' });

// Tab B
const channel = new BroadcastChannel('app_channel');
channel.onmessage = (event) => {
  if (event.data.type === 'LOGOUT') {
    alert('You logged out in another tab!');
  }
};
```

### 5.2 SharedWorker (Shared Background Thread)

A SharedWorker runs as a single instance shared across all tabs/windows of the same origin.

### 5.3 postMessage (Between iframe / Window)

```js
// Parent window
const iframe = document.querySelector('iframe');
iframe.contentWindow.postMessage('Hello iframe!', '*');

// Iframe
window.addEventListener('message', (event) => {
  console.log('Parent says:', event.data);
});
```

---

## 6. Client ←→ Browser Storage (Local, No Network)

These are **read/write within the same browser tab** — no data leaves the device:

```
Tab A (current)          Tab B (same origin)
  │                         │
  ├── localStorage ────────→│  (shared — same origin)
  ├── sessionStorage ──────→│  (NOT shared — per tab)
  ├── IndexedDB ───────────→│  (shared — same origin)
  └── Cookies ─────────────→│  (shared — same origin)
```

Data flows **only** between:
- Your JavaScript ↔ Browser Storage APIs
- Same-origin tabs (localStorage, IndexedDB, Cookies)
- A single tab only (sessionStorage)

---

## 7. End-to-End Walk: A Todo App Request

Here's every step data walks when you add a todo:

```
1. User types "Buy milk" and clicks Add

2. Alpine.js (client)
   → reads x-model="newItemName" → "Buy milk"
   → calls addItem()
   → calls fetch('/api/items', { method: 'POST', body: '{"name":"Buy milk"}' })

3. HTTP Request walks:
   Browser → TCP connection → DNS lookup → Server IP → Express

4. Express (server.js)
   → parses JSON body
   → routes to POST /api/items
   → calls api.js handler

5. Data walks to storage (choose one):
   ├── In-Memory: items.push(newItem)        (RAM, lost on restart)
   ├── JSON File: fs.writeFileSync(...)      (disk, survives restart)
   ├── SQLite:    db.prepare('INSERT...')    (disk, SQL)
   └── PostgreSQL: pool.query('INSERT...')   (disk, another server)

6. Response walks back:
   Express → HTTP response (JSON) → TCP → Browser → Alpine

7. Alpine reads response:
   → this.items.push(newItem)
   → DOM updates → user sees "Buy milk" checked off
```

**Time breakdown** (approximate):
| Step               | Time           |
|--------------------|----------------|
| Alpine reads input | < 1ms          |
| HTTP request       | 10-100ms       |
| Express routing    | < 1ms          |
| In-memory write    | < 1ms          |
| SQLite write       | 1-5ms          |
| PostgreSQL write   | 2-20ms         |
| HTTP response      | 10-100ms       |
| Alpine re-render   | < 1ms          |
| **Total**          | **~20-250ms**  |

---

## 8. Full Communication Map

```
                             ┌──────────────────┐
                             │   Another        │
                             │   Client         │
                             │  (mobile app,    │
                             │   another user)  │
                             └────────┬─────────┘
                                      │ WebSocket / HTTP
                                      │
┌──────────────────────┐    HTTP/WS    ┌──────────────────────────────┐
│   BROWSER (Client)   │←────────────→│         SERVER               │
│                      │              │                              │
│  Alpine.js / React   │  SSE (1-way) │  Express / Node.js           │
│  localStorage ◄──────┤  ←────────── │                              │
│  sessionStorage ◄────┤  Server Push │  ┌─────────────────┐        │
│  IndexedDB ◄─────────┤              │  │  Cache (Redis)   │◄───────┤
│  Cookies ◄───────────┤              │  └─────────────────┘        │
│  Cache API ◄─────────┤              │         ↕                    │
│                      │              │  ┌─────────────────┐        │
│  BroadcastChannel ◄──┤ (tab-to-tab) │  │  Database        │        │
│  SharedWorker ◄──────┤              │  │  (PostgreSQL,    │◄───────┤
└──────────────────────┘              │  │   SQLite,        │        │
                                      │  │   MongoDB)       │        │
                                      │  └─────────────────┘        │
                                      │         ↕                    │
                                      │  ┌─────────────────┐        │
                                      │  │  External APIs   │        │
                                      │  │  (Stripe,        │◄───────┤
                                      │  │   GitHub,        │        │
                                      │  │   OpenAI)        │        │
                                      │  └─────────────────┘        │
                                      └──────────────────────────────┘
                                                  ↕
                                        (DB replication)
                                                  ↕
                                      ┌──────────────────────────────┐
                                      │     Another Server           │
                                      │  (microservice, replica,     │
                                      │   backup)                    │
                                      └──────────────────────────────┘
```

---

## 9. Quick Reference

| From → To                | Method                 | Protocol        | Real-Time? | Direction           |
|--------------------------|------------------------|-----------------|------------|---------------------|
| Browser → Server         | fetch / axios          | HTTP(S)         | No         | Request/Response    |
| Browser → Server         | WebSocket              | WS(S)           | Yes        | Bidirectional       |
| Server → Browser         | SSE                    | HTTP(S)         | Yes        | Server → Client     |
| Server → Database        | Driver (pg, mysql2)    | TCP             | No         | Query/Result        |
| Server → Cache           | Redis client           | TCP / RESP      | Yes        | Request/Response    |
| Server → External API    | fetch / axios          | HTTP(S)         | No         | Request/Response    |
| Tab → Tab (same origin)  | BroadcastChannel       | Browser API     | Yes        | Bidirectional       |
| Tab → Tab (same origin)  | localStorage event     | Browser API     | Yes        | One tab → All others|
| Iframe → Parent          | postMessage            | Browser API     | Yes        | Bidirectional       |
| Server → Server          | HTTP / gRPC / message queue| TCP        | Varies     | Bidirectional       |

**Protocols:**
| Protocol | Layer    | Used By                     |
|----------|----------|-----------------------------|
| HTTP     | App      | REST APIs, fetch            |
| WS       | App      | WebSockets                  |
| TCP      | Transport| Database drivers, Redis     |
| RESP     | App      | Redis protocol              |
| gRPC     | App      | Server-to-server (microservices) |

---

*Last updated: June 2026*
