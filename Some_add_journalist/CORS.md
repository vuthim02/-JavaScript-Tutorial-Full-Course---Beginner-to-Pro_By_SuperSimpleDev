# CORS — Why Your API Blocks Cross-Domain Requests & How to Fix It

---

## 1. The Problem

Open your browser console. Run this on any website:

```js
fetch('http://localhost:3000/api/items');
```

You get:
```
Access to fetch at 'http://localhost:3000/api/items' from origin 'http://example.com'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

**Why?** The browser enforces a security rule called the **Same-Origin Policy**.

---

## 2. Same-Origin Policy

An **origin** is: `protocol + domain + port`

```
http://example.com:3000
│      └─── domain ───┘│
└─ protocol             └─ port
```

Two URLs are same-origin only if **protocol, domain, and port all match**:

| URL                               | Same origin as `http://example.com:3000`? |
|-----------------------------------|-------------------------------------------|
| `http://example.com:3000/page`    | ✅ Yes (same protocol, domain, port)      |
| `https://example.com:3000/page`   | ❌ No (different protocol: https)         |
| `http://api.example.com:3000`     | ❌ No (different domain)                  |
| `http://example.com:4000`         | ❌ No (different port)                    |
| `http://localhost:3000`           | ❌ No (localhost ≠ example.com)           |

The browser blocks cross-origin requests to protect users from **malicious sites** reading their data from another site (e.g., your bank).

---

## 3. How CORS Fixes It

**CORS** = Cross-Origin Resource Sharing. It's a mechanism that lets servers tell browsers: "It's OK, I trust this origin."

The server sends a special header:

```
Access-Control-Allow-Origin: http://example.com
```

If the browser sees this header matching the requesting origin, it allows the request.

**Three ways to set it:**

```js
// 1. Allow everyone (development only)
Access-Control-Allow-Origin: *

// 2. Allow one specific origin (production)
Access-Control-Allow-Origin: https://myapp.com

// 3. Allow multiple (must set dynamically)
Access-Control-Allow-Origin: https://myapp.com  // (only one value allowed)
```

---

## 4. Simple vs Preflight Requests

### Simple Request (no preflight)

Request that uses only:
- Method: GET, HEAD, or POST
- Headers: Accept, Content-Type, etc. (limited set)
- Content-Type: `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`

Browser sends the request directly, checks the response headers.

### Preflight Request (OPTIONS)

If the request uses any "non-simple" feature, the browser first sends a **preflight** (OPTIONS) to ask permission:

```
─── OPTIONS /api/items ──────────────────────────→
    Origin: http://example.com
    Access-Control-Request-Method: DELETE
    Access-Control-Request-Headers: Authorization

←── Response ─────────────────────────────────────
    Access-Control-Allow-Origin: http://example.com
    Access-Control-Allow-Methods: GET,POST,DELETE
    Access-Control-Allow-Headers: Content-Type,Authorization
    Access-Control-Max-Age: 86400
```

If the preflight succeeds, the browser sends the real request.

**Triggers preflight:**
- Methods other than GET/HEAD/POST (PUT, DELETE, PATCH)
- Custom headers (Authorization, X-Custom-Header)
- Content-Type other than the three "simple" ones (e.g., `application/json`)

---

## 5. Fixing CORS in Express

### Option 1 — cors package (recommended)

```bash
npm install cors
```

```js
const cors = require('cors');

// Allow all origins (development only)
app.use(cors());

// Allow specific origin (production)
app.use(cors({
  origin: 'https://myapp.com',
}));

// Allow multiple origins
app.use(cors({
  origin: ['https://myapp.com', 'https://admin.myapp.com'],
}));

// Dynamic (check origin against a list)
const allowedOrigins = ['https://myapp.com', 'https://staging.myapp.com'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
```

### Option 2 — Manual headers (no package)

```js
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
  res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});
```

### Option 3 — Per-route

```js
app.get('/api/public', cors(), (req, res) => {
  res.json({ message: 'Public data — accessible from anywhere' });
});
```

---

## 6. CORS with Credentials (Cookies + Auth)

If you need to send cookies or Authorization headers cross-origin:

**Client side:**
```js
fetch('https://api.myapp.com/items', {
  credentials: 'include',  // Send cookies with the request
});
```

**Server side:**
```js
app.use(cors({
  origin: 'https://myapp.com',
  credentials: true,  // Allow cookies
}));
```

**Restriction:** When `credentials: true`, the origin **cannot be `*`** — you must specify exact origins.

---

## 7. Common CORS Errors & Fixes

| Error Message                                       | Cause                           | Fix                                              |
|-----------------------------------------------------|---------------------------------|--------------------------------------------------|
| No 'Access-Control-Allow-Origin' header             | Server didn't send CORS header  | Add `cors()` middleware                          |
| Multiple CORS headers                               | Two middleware setting the header| Remove duplicate, set in one place               |
| Credentials flag is 'true', but header is '*'       | Can't use `*` with credentials  | Set explicit origin                               |
| Method DELETE is not allowed by Access-Control-Allow-Methods | Preflight rejected DELETE | Add DELETE to allowed methods                     |
| Request header field authorization is not allowed   | Preflight rejected custom header| Add `Authorization` to allowed headers           |

---

## 8. Development vs Production CORS

```js
const cors = require('cors');

const corsOptions = {
  development: {
    origin: 'http://localhost:5173',  // Vite dev server
    credentials: true,
  },
  production: {
    origin: 'https://myapp.com',
    credentials: true,
  },
};

const env = process.env.NODE_ENV || 'development';
app.use(cors(corsOptions[env]));
```

---

## 9. Quick Reference

| Concept               | Key Point                                    |
|-----------------------|----------------------------------------------|
| Same-Origin Policy    | Browser blocks cross-origin requests by default |
| CORS                  | Server tells browser "this origin is allowed" |
| Key header            | `Access-Control-Allow-Origin`                  |
| Preflight             | OPTIONS request before non-simple requests    |
| cors package          | `npm install cors` → `app.use(cors())`        |
| Credentials           | Set `credentials: true` + explicit origin     |
| `*` vs specific       | `*` for development, specific for production  |

---

*Last updated: June 2026*
