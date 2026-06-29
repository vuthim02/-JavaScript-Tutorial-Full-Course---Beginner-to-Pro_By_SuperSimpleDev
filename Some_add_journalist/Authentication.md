# Authentication — How the Server Knows Who You Are

---

## 1. What Is Authentication?

**Authentication** (auth) = verifying who the user is. Different from **authorization** (what the user can do).

```
Authentication: "Who are you?"    → Login with email + password
Authorization:  "Can you do this?" → Check if user is admin
```

Every request after login needs to **prove identity**. Two main approaches:

1. **Sessions** (cookie-based, server stores session)
2. **JWT** (token-based, client stores token)

---

## 2. The Password Foundation

Before any auth method, you need to store passwords **securely**.

### NEVER store plain text passwords

```js
// ❌ DANGEROUS — never do this
users.push({ email: 'a@b.com', password: 'mypassword123' });
```

### Always hash passwords with bcrypt

```bash
npm install bcrypt
```

```js
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Signup — hash before storing
async function signup(email, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  users.push({ email, password: hashedPassword });
}

// Login — compare hash
async function login(email, password) {
  const user = users.find(u => u.email === email);
  if (!user) return false;

  const match = await bcrypt.compare(password, user.password);
  return match ? user : null;
}
```

**How bcrypt works:**
```
"password123" → [bcrypt.hash] → "$2b$10$..." (60 chars, includes salt)
                                                   └── can't reverse to "password123"
                                                       can only compare against another input
```

---

## 3. Session-Based Authentication

**Flow:**
```
1. User logs in with email + password
2. Server creates a session, stores it in memory/db/Redis
3. Server sends session ID to browser as a cookie
4. Browser sends cookie with every request
5. Server looks up session → knows who the user is
```

```
Browser                          Server
  │                                │
  │── POST /login {email,pass} ──→│  Verify password
  │←── Set-Cookie: sessionId=abc  │  Create session in store
  │                                │
  │── GET /profile (cookie: abc) ─→│  Look up session → user found
  │←── {user: {name: "..."}} ─────│
```

### Server implementation

```bash
npm install express-session
```

```js
const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,  // sign the cookie
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,   // JS can't read the cookie (XSS protection)
    secure: true,     // only send over HTTPS
    maxAge: 1000 * 60 * 60 * 24,  // 1 day
    sameSite: 'lax',
  },
}));

// Login
app.post('/login', async (req, res) => {
  const user = await login(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  req.session.userId = user.id;  // Store user ID in session
  res.json({ message: 'Logged in' });
});

// Protected route
app.get('/profile', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const user = await db.findUser(req.session.userId);
  res.json({ user });
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});
```

**Session storage options:**
| Store       | Pros                     | Cons                        |
|-------------|--------------------------|-----------------------------|
| In-memory   | Zero setup               | Lost on restart, not shared across servers |
| Database    | Persistent, shared       | Slower, adds DB load        |
| Redis       | Fast, shared, auto-expire| Requires Redis server       |

---

## 4. JWT (JSON Web Token) Authentication

**Flow:**
```
1. User logs in with email + password
2. Server creates a JWT (signed JSON token)
3. Server sends JWT to client (in response body, not cookie)
4. Client stores JWT (localStorage or memory) and sends it in Authorization header
5. Server verifies signature → extracts user info from token
```

```
Browser                          Server
  │                                │
  │── POST /login {email,pass} ──→│  Verify password
  │←── {token: "eyJhbGci..."} ────│  Sign JWT and return it
  │                                │
  │── GET /profile                │
  │    Authorization: Bearer eyJ ─→│  Verify signature → user data
  │←── {user: {name: "..."}} ─────│
```

### What a JWT looks like

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOjEsInJvbGUiOiJ1c2VyIn0.
dGhpcyBpcyB0aGUgc2lnbmF0dXJl
│                                  │
└────────── 3 parts ───────────────┘
  ├── Header (algorithm + type)
  ├── Payload (data — userId, role, exp)
  └── Signature (verifies it wasn't tampered with)
```

### Server implementation

```bash
npm install jsonwebtoken
```

```js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;  // MUST be in .env

// Login — return token
app.post('/login', async (req, res) => {
  const user = await login(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user.id, role: user.role },  // payload
    JWT_SECRET,                              // secret key
    { expiresIn: '24h' }                     // auto-expire
  );

  res.json({ token, user: { id: user.id, email: user.email } });
});

// Auth middleware
function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // { userId: 1, role: "user", iat: ..., exp: ... }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Protected route
app.get('/profile', auth, (req, res) => {
  res.json({ user: req.user });
});
```

### Client side (Alpine.js)

```js
// Login
async login() {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: this.email, password: this.password }),
  });
  const data = await res.json();
  localStorage.setItem('token', data.token);  // Store token
  this.user = data.user;
}

// Fetch protected data
async fetchProfile() {
  const res = await fetch('/api/profile', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  this.profile = await res.json();
}
```

---

## 5. Sessions vs JWT — Comparison

| Feature           | Sessions                     | JWT                          |
|-------------------|------------------------------|------------------------------|
| Storage           | Server stores session data   | Client stores token          |
| State             | Stateful (server remembers)  | Stateless (token is self-contained) |
| Scaling           | Need shared session store (Redis) | Works across servers automatically |
| Revocation        | Instant (delete session)     | Must wait for expiry or maintain blocklist |
| Payload           | Only session ID in cookie    | Token contains user data     |
| Mobile/API        | Awkward (cookies)            | Natural (Authorization header) |
| Size              | Minimal (cookie is ~32 chars)| Larger (base64-encoded JSON) |

---

## 6. Security Best Practices

| Practice                         | Why                                      |
|----------------------------------|------------------------------------------|
| Hash passwords (bcrypt)          | Can't recover original password          |
| httpOnly cookies (sessions)      | JS can't steal the cookie (XSS)          |
| secure cookies                   | Only sent over HTTPS                     |
| JWT expiry (short: 15min-24h)    | Limits damage if token is stolen         |
| Store JWT in memory, not localStorage | XSS can read localStorage           |
| Use HTTPS everywhere             | Encrypts all traffic                     |
| Rate-limit login attempts        | Prevents brute force                     |
| Validate all inputs              | Prevents injection attacks               |
| Never trust the client           | Always re-validate on server             |

---

## 7. Quick Reference

| Concept          | Key Point                                    |
|------------------|----------------------------------------------|
| Authentication   | "Who are you?" — verify identity             |
| Authorization    | "What can you do?" — check permissions       |
| bcrypt           | Hash passwords before storing                |
| Sessions         | Server stores session, cookie links them     |
| JWT              | Self-contained token, signed by server       |
| Token flow       | Client: `Authorization: Bearer <token>`      |
| Secrets          | JWT_SECRET, SESSION_SECRET — always in .env  |

---

*Last updated: June 2026*
