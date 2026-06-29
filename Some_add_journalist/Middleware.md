# Middleware — Between Request and Response in Express

---

## 1. What Is Middleware?

**Middleware** is a function that runs **between** receiving a request and sending a response. Every request passes through a pipeline of middleware functions.

```
Client             Middleware Pipeline               Route Handler
  │                     │                                │
  │─── REQUEST ───────→│──→ logger ──→ auth ──→ parser ──→ controller ──→│
  │                    │                                                │
  │←── RESPONSE ───────│←───────────────────────────────────────────────│
```

Each middleware can:
- **Modify** the request or response
- **End** the cycle (send a response)
- **Pass** to the next middleware (call `next()`)

---

## 2. Middleware Signature

Every middleware is a function with three parameters:

```js
function myMiddleware(req, res, next) {
  // req  — request object (incoming data)
  // res  — response object (outgoing data)
  // next — function to pass control to the next middleware

  console.log('Request received:', req.method, req.url);

  next();  // <-- MUST call next() or send a response
}
```

If you don't call `next()` and don't send a response, the request **hangs forever**.

---

## 3. Built-in Express Middleware

```js
const express = require('express');
const app = express();

// Parse JSON body (so you can read req.body)
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));
```

---

## 4. Custom Middleware — Examples

### Logger Middleware
```js
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`→ ${req.method} ${req.url}`);

  // Listen for response finish
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`← ${req.method} ${req.url} ${res.statusCode} (${duration}ms)`);
  });

  next();
});
```

### Auth Middleware
```js
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user data to request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Protect specific routes
app.get('/api/profile', auth, (req, res) => {
  res.json({ user: req.user });
});
```

### Timing Middleware
```js
app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});
```

---

## 5. Middleware Order Matters

Middleware runs in the **order you define it**.

```js
// ❌ Wrong — body won't be parsed yet
app.post('/api/items', (req, res) => {
  console.log(req.body);  // undefined!
});
app.use(express.json());

// ✅ Correct — parser runs first
app.use(express.json());
app.post('/api/items', (req, res) => {
  console.log(req.body);  // { name: "Buy milk" }
});
```

**Typical order:**
```js
// 1. Logging (info about every request)
app.use(logger);

// 2. Body parsing
app.use(express.json());

// 3. Static files (if no static match, continue)
app.use(express.static('public'));

// 4. Auth (protect API routes)
app.use('/api', auth);

// 5. Routes
app.use('/api/items', itemsRouter);

// 6. 404 handler (anything unmatched)
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// 7. Error handler (always last)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});
```

---

## 6. Router-Level Middleware

Attach middleware to specific routes or routers:

```js
// On all routes in this router
router.use(auth);

// On a specific route
router.get('/profile', auth, handler);

// Only for certain HTTP methods
router.route('/items')
  .get(handler)
  .post(auth, handler);  // Only POST needs auth
```

---

## 7. Third-Party Middleware

```bash
npm install cors morgan helmet
```

```js
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

app.use(helmet());             // Security headers
app.use(cors());               // Cross-Origin Resource Sharing
app.use(morgan('dev'));        // HTTP request logger (fancy)
app.use(express.json());       // Body parsing
```

---

## 8. Error Middleware (4 Parameters)

Express identifies error middleware by **4 parameters**:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
});
```

When any middleware calls `next(err)` with an argument, Express skips all normal middleware and jumps to the error middleware.

```js
app.get('/api/items', async (req, res, next) => {
  try {
    const items = await db.query('...');
    res.json(items);
  } catch (err) {
    next(err);  // <-- jumps to error middleware
  }
});
```

---

## 9. Full Pipeline Trace

For request `GET /api/items`:

```
1. morgan('dev')
   → logs: "GET /api/items 200 12ms"

2. express.json()
   → checks Content-Type, parses body (none for GET), does nothing

3. auth (if /api/*)
   → checks Authorization header
   → sets req.user
   → calls next()

4. itemsRouter.get('/')
   → runs route handler
   → res.json(items)

5. (If route didn't match)
   → 404 handler sends "Not found"

6. (If any middleware threw)
   → Error middleware sends 500
```

---

## 10. Quick Reference

| Concept             | Key Point                                    |
|---------------------|----------------------------------------------|
| What                | Function between request and response        |
| Signature           | `(req, res, next)`                           |
| next()              | Pass to next middleware (required unless sending response) |
| Order               | Defined order = execution order              |
| Router-level        | `router.use(mw)` or inline: `route.get('/', mw, handler)` |
| Error middleware    | 4 params: `(err, req, res, next)`           |
| Built-in            | `express.json()`, `express.static()`, `express.urlencoded()` |
| Common 3rd-party    | `cors`, `morgan`, `helmet`, `cookie-parser` |

---

*Last updated: June 2026*
