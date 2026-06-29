# HTTP Deep Dive — Status Codes, Headers, Request & Response Anatomy

---

## 1. What Is HTTP?

**HTTP** = HyperText Transfer Protocol. It's the language browsers and servers use to talk.

```
Client (Browser)                     Server (Express)
      │                                   │
      │────── HTTP REQUEST ──────────────→│
      │                                   │
      │←───── HTTP RESPONSE ──────────────│
      │                                   │
```

Every interaction is: Client sends a **Request** → Server sends back a **Response**.

---

## 2. Request Anatomy

When you type a URL and press Enter, the browser builds and sends this:

```
 ┌── METHOD     POST
 │              │
 │    ┌──── URL PATH     ┌── HTTP VERSION
 │    │                  │
POST /api/items HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer abc123            ←── HEADERS
User-Agent: Chrome/120.0

{"name": "Buy milk"}                    ←── BODY (optional)
```

### 2.1 Request Line

```
METHOD  PATH  HTTP_VERSION
```

**Methods (verbs):**
| Method  | Purpose                | Has Body? | Idempotent? | Safe? |
|---------|------------------------|-----------|-------------|-------|
| GET     | Read data              | No        | Yes         | Yes   |
| POST    | Create new resource    | Yes       | No          | No    |
| PUT     | Replace resource       | Yes       | Yes         | No    |
| PATCH   | Partial update         | Yes       | No          | No    |
| DELETE  | Remove resource        | Usually No| Yes         | No    |
| HEAD    | GET without body (check headers only) | No | Yes | Yes |
| OPTIONS | Ask what methods are allowed | No    | Yes         | Yes   |

- **Idempotent** — calling it 10 times has the same effect as calling it once
- **Safe** — doesn't change anything on the server (read-only)

### 2.2 Request Headers

Headers are `Key: Value` pairs with metadata.

**Standard headers you'll use daily:**

| Header                | Example                          | Purpose                                |
|-----------------------|----------------------------------|----------------------------------------|
| `Host`                | `Host: localhost:3000`           | Which server (required in HTTP/1.1)    |
| `Content-Type`        | `Content-Type: application/json` | Format of the body                     |
| `Content-Length`      | `Content-Length: 42`             | Body size in bytes                     |
| `Authorization`       | `Authorization: Bearer eyJ...`   | Authentication token                   |
| `Accept`              | `Accept: application/json`       | What format client wants back          |
| `User-Agent`          | `User-Agent: Chrome/120`         | Client software identification         |
| `Cookie`              | `Cookie: sessionId=abc123`       | Previously stored cookies              |
| `Referer`             | `Referer: https://site.com/page` | Where the request came from            |

**Most important Content-Type values:**
```
application/json          — JSON data
application/x-www-form-urlencoded — form data (key=value&key2=value2)
multipart/form-data       — file uploads
text/plain                — plain text
text/html                 — HTML
```

### 2.3 Request Body

Not all requests have a body. GET and DELETE usually don't. POST, PUT, PATCH do.

```json
{"name": "Buy milk", "completed": false}
```

The server reads it with:
```js
app.post('/api/items', (req, res) => {
  console.log(req.body.name);    // "Buy milk"
  console.log(req.body.completed); // false
});
```

---

## 3. Response Anatomy

```
 ┌── HTTP VERSION  STATUS CODE  ┌── STATUS TEXT
 │                 │             │
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/items/4                        ←── HEADERS
Set-Cookie: sessionId=abc123; HttpOnly

{"id":4,"name":"Buy milk","completed":false}   ←── BODY (optional)
```

### 3.1 Status Line

```
HTTP_VERSION  STATUS_CODE  STATUS_TEXT
```

The status code is **the most important thing** — it tells the client what happened.

---

## 4. Status Codes — The Complete Reference

### 1xx — Informational (rare in web apps)

| Code | Name          | Meaning                              |
|------|---------------|--------------------------------------|
| 100  | Continue      | Server got headers, client can send body |
| 101  | Switching Protocols | Switching to WebSocket           |

### 2xx — Success (everything worked)

| Code | Name          | Meaning                              | When to Use                          |
|------|---------------|--------------------------------------|--------------------------------------|
| 200  | OK            | Request succeeded                     | GET, PUT, PATCH (read/update)        |
| 201  | Created       | Resource created                     | POST (create)                        |
| 202  | Accepted      | Request accepted, processing async   | Background jobs                      |
| 204  | No Content    | Success, but no body to send back    | DELETE (or when response is empty)   |

**In your Express routes:**
```js
// GET — 200 with data
app.get('/api/items', (req, res) => {
  res.json(items);  // default status is 200
});

// POST — 201 Created
app.post('/api/items', (req, res) => {
  const item = { id: nextId++, name: req.body.name };
  items.push(item);
  res.status(201).json(item);
});

// DELETE — 204 No Content
app.delete('/api/items/:id', (req, res) => {
  // ... delete from array
  res.status(204).send();
});
```

### 3xx — Redirection (the resource moved)

| Code | Name          | Meaning                              |
|------|---------------|--------------------------------------|
| 301  | Moved Permanently | Resource has new URL, update bookmarks |
| 302  | Found         | Temporarily at another URL           |
| 304  | Not Modified  | Use your cached version (browser optimization) |
| 307  | Temporary Redirect | Like 302 but must keep same method |

**When you see these:**
- `http://` → `https://` (301 redirect)
- `/old-page` → `/new-page` (301)
- Login page after expired session (302)

### 4xx — Client Error (you did something wrong)

| Code | Name                | Meaning                                  | When to Use                          |
|------|---------------------|------------------------------------------|--------------------------------------|
| 400  | Bad Request         | Server can't understand the request      | Missing/invalid body, bad JSON       |
| 401  | Unauthorized        | You need to log in first                 | No token or invalid token            |
| 403  | Forbidden           | You're logged in but not allowed         | Role-based access denied             |
| 404  | Not Found           | Resource doesn't exist                   | Wrong URL or ID                      |
| 405  | Method Not Allowed  | Wrong HTTP method                        | PUT on a read-only endpoint          |
| 408  | Request Timeout     | Server waited too long                   | Slow client connections              |
| 409  | Conflict            | Conflict with current state              | Duplicate entry, version mismatch    |
| 422  | Unprocessable Entity| Valid syntax but semantic errors         | Validation errors (missing field)    |
| 429  | Too Many Requests   | Rate limit exceeded                      | API throttling                       |

**In your Express routes:**
```js
// 400 — Bad Request (missing field)
app.post('/api/items', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  // ...
});

// 401 — Unauthorized (middleware)
function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No token provided' });
  }
  next();
}

// 404 — Not Found
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// 409 — Conflict (duplicate)
app.post('/api/users', (req, res) => {
  const exists = users.find(u => u.email === req.body.email);
  if (exists) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  // ...
});
```

### 5xx — Server Error (something broke on our side)

| Code | Name                | Meaning                                  | When to Use                          |
|------|---------------------|------------------------------------------|--------------------------------------|
| 500  | Internal Server Error | Generic server crash                    | Uncaught exceptions, DB down         |
| 502  | Bad Gateway         | Upstream server gave invalid response    | Nginx can't reach your app           |
| 503  | Service Unavailable | Server overloaded or under maintenance   | Rate limiting, downtime              |
| 504  | Gateway Timeout     | Upstream server didn't respond in time   | Slow database query                  |

**In your Express routes:**
```js
// 500 — catch unexpected errors
app.get('/api/items', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    // Log the real error for debugging
    console.error('Database error:', err);
    // Send generic message to client
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Status Code Decision Flowchart

```
Request arrives
  │
  ├── Did the server crash?        → 500
  ├── Is the server overloaded?    → 503
  │
  ├── Did the request reach the server?
  │   ├── NO → 404 (route not found)
  │   └── YES →
  │       ├── Is the user authenticated?
  │       │   ├── NO  → 401
  │       │   └── YES →
  │       │       ├── Is user authorized?
  │       │       │   ├── NO  → 403
  │       │       │   └── YES →
  │       │       │       ├── Is the request body valid?
  │       │       │       │   ├── NO  → 400 / 422
  │       │       │       │   └── YES →
  │       │       │       │       ├── Does resource exist?
  │       │       │       │       │   ├── NO  → 404
  │       │       │       │       │   └── YES →
  │       │       │       │       │       └── Operation succeeded?
  │       │       │       │       │           ├── Created   → 201
  │       │       │       │       │           ├── Updated   → 200
  │       │       │       │       │           ├── Deleted   → 204
  │       │       │       │       │           └── Read      → 200
```

---

## 5. Response Headers

**Standard response headers:**

| Header                | Example                          | Purpose                                |
|-----------------------|----------------------------------|----------------------------------------|
| `Content-Type`        | `Content-Type: application/json` | Format of the response body            |
| `Content-Length`      | `Content-Length: 42`             | Body size in bytes                     |
| `Location`            | `Location: /api/items/4`         | URL of newly created resource (201)    |
| `Set-Cookie`          | `Set-Cookie: sessionId=abc; HttpOnly` | Store a cookie in browser         |
| `Cache-Control`       | `Cache-Control: max-age=3600`    | How long browser can cache response    |
| `Access-Control-Allow-Origin` | `Access-Control-Allow-Origin: *` | CORS — who can access this API  |
| `ETag`                | `ETag: "33a64df"`               | Cache validation (version hash)        |

**In Express:**
```js
app.get('/api/items', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.set('X-Custom-Header', 'my-value');
  res.json(items);
});

// Or chain:
res.status(201)
   .set('Location', `/api/items/${item.id}`)
   .json(item);
```

---

## 6. Full Request/Response Cycle — Trace

Here's exactly what happens when Alpine calls `fetch('/api/items')`:

```
─── REQUEST ──────────────────────────────────────────────
GET /api/items HTTP/1.1
Host: localhost:3000
Accept: */*
User-Agent: Mozilla/5.0 (X11; Linux x86_64) ...

─── SERVER PROCESSING ────────────────────────────────────
Express receives request
  → app.use(express.json())  — parses body (none for GET)
  → app.use(express.static(...))  — not a static file, skip
  → app.use('/api', apiRoutes)  — match!
  → apiRoutes.get('/items')  — handler runs
  → Response sent

─── RESPONSE ─────────────────────────────────────────────
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 156
Date: Sat, 27 Jun 2026 12:00:00 GMT
Connection: keep-alive

[{"id":1,"name":"Learn Alpine.js","completed":false}, ...]
```

---

## 7. Quick Reference

### Status Codes — The Only 8 You Need to Memorize

| Code | Name       | When                          |
|------|------------|-------------------------------|
| 200  | OK         | GET, PUT, PATCH succeeded     |
| 201  | Created    | POST succeeded                |
| 204  | No Content | DELETE succeeded              |
| 400  | Bad Request| Client sent invalid data      |
| 401  | Unauthorized | Not logged in               |
| 403  | Forbidden  | Logged in but no permission   |
| 404  | Not Found  | Resource doesn't exist        |
| 500  | Server Error | Something broke on backend  |

### Key Headers — The Only 8 You Need to Memorize

| Header             | Request | Response | Purpose                 |
|--------------------|---------|----------|-------------------------|
| `Content-Type`     | ✓       | ✓        | Format of body          |
| `Authorization`    | ✓       |          | Send auth token         |
| `Accept`           | ✓       |          | Client says what it wants |
| `Host`             | ✓       |          | Which server (required) |
| `Location`         |         | ✓        | URL of new resource (201) |
| `Set-Cookie`       |         | ✓        | Store cookie            |
| `Cache-Control`    |         | ✓        | Caching instructions    |
| `Access-Control-*` | ✓       | ✓        | CORS headers            |

### HTTP Versions

| Version | Year | Key Feature                         |
|---------|------|-------------------------------------|
| HTTP/1.0| 1996 | Basic request/response              |
| HTTP/1.1| 1999 | Persistent connections, Host header (still dominant) |
| HTTP/2  | 2015 | Multiplexing (multiple requests over one connection) |
| HTTP/3  | 2022 | Uses QUIC (UDP-based, faster, no head-of-line blocking) |

---

## 8. How to See All This in Real-Time

**Browser DevTools (F12 → Network tab):**
```
Name          Status  Type    Size   Time
api/items     200     json    156 B  12ms
  └── Headers tab → full request headers + response headers
  └── Response tab → the JSON body
  └── Timing tab   → DNS, TCP, TLS, request, response
```

**curl (command line):**
```bash
# Full request and response
curl -v http://localhost:3000/api/items

# Just response headers
curl -I http://localhost:3000/api/items

# POST with headers and body
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mytoken" \
  -d '{"name":"Buy milk"}'
```

---

*Last updated: June 2026*
