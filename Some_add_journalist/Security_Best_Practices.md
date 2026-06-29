# Security Best Practices — Protect Your Express App

---

## 1. The Threat Model

```
Attacker ──→ Your Express App

Common attacks:
├── SQL Injection     → steal / delete your database
├── XSS               → run malicious JS in users' browsers
├── CSRF              → make users do things without consent
├── Brute Force       → guess passwords
├── Rate Limit Abuse  → DDoS your API
├── Information Leak  → stack traces, exposed secrets
└── MITM             → intercept data in transit (← solved by HTTPS)
```

This guide covers defenses against every one.

---

## 2. Helmet — Security Headers in One Line

```bash
npm install helmet
```

```js
const helmet = require('helmet');
app.use(helmet());
```

That single line sets **15+ HTTP headers** that close common browser-side attacks:

| Header | Blocks |
|---|---|
| `X-Content-Type-Options: nosniff` | MIME-type sniffing |
| `X-Frame-Options: DENY` | Clickjacking (your site in an iframe) |
| `X-XSS-Protection: 0` | Legacy XSS filter |
| `Strict-Transport-Security` | Forces HTTPS |
| `Content-Security-Policy` | XSS (controls what scripts can run) |
| `Referrer-Policy` | Information leak via referrer header |

### Customize CSP (Content Security Policy)

```js
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
    },
  },
}));
```

---

## 3. Rate Limiting — Stop Brute Force & Abuse

```bash
npm install express-rate-limit
```

```js
const rateLimit = require('express-rate-limit');

// Global limiter — 100 requests per 15 minutes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 100,                     // max 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, try later' },
});
app.use(globalLimiter);

// Strict limiter for login — 5 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts, try again in 15 minutes' },
});
app.post('/api/login', loginLimiter, loginHandler);
```

### Store rate limit data in Redis (for multi-server)

```bash
npm install rate-limit-redis ioredis
```

```js
const RedisStore = require('rate-limit-redis').default;
const { Redis } = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URL);

const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
});
```

---

## 4. Input Validation & Sanitization

Never trust user input. Validate shape + sanitize content.

### Manual validation

```js
function validateItemInput(body) {
  const errors = [];

  if (!body.name || typeof body.name !== 'string') {
    errors.push('Name is required and must be a string');
  } else {
    // Sanitize: trim whitespace, strip HTML tags
    body.name = body.name.trim().replace(/<[^>]*>/g, '');
    if (body.name.length < 1 || body.name.length > 200) {
      errors.push('Name must be 1-200 characters');
    }
  }

  if (body.completed !== undefined && typeof body.completed !== 'boolean') {
    errors.push('Completed must be a boolean');
  }

  return errors;
}

// Route
app.post('/api/items', (req, res) => {
  const errors = validateItemInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }
  // proceed...
});
```

### Express validator (structured)

```bash
npm install express-validator
```

```js
const { body, validationResult } = require('express-validator');

app.post('/api/items',
  body('name')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Name must be 1-200 characters')
    .escape(),                           // sanitize: converts <script> to &lt;script&gt;
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // proceed...
  }
);
```

### Validation middleware (DRY)

```js
function validate(schemas) {
  return async (req, res, next) => {
    for (const [field, rules] of Object.entries(schemas)) {
      for (const rule of rules) {
        const result = await rule.run(req);
        if (result.errors.length > 0) {
          return res.status(400).json({
            error: result.errors.map(e => e.msg).join(', '),
          });
        }
      }
    }
    next();
  };
}

// Usage
app.post('/api/items', validate({
  body: [body('name').trim().isLength({ min: 1 }).escape()],
}), handler);
```

---

## 5. SQL Injection Prevention

SQL injection is **trivially preventable**. Always use parameterized queries.

```js
// ❌ DANGEROUS — string interpolation
const query = `SELECT * FROM items WHERE id = ${req.params.id}`;

// What happens when attacker sends: id = "1; DROP TABLE items; --"
// Query becomes: SELECT * FROM items WHERE id = 1; DROP TABLE items; --"
// → Your items table is gone.
```

```js
// ✅ Safe — parameterized query
await pool.query('SELECT * FROM items WHERE id = $1', [req.params.id]);

// ✅ Safe — Prisma (parameterized automatically)
await prisma.item.findUnique({ where: { id: parseInt(req.params.id) } });

// ✅ Safe — Knex (parameterized automatically)
await db('items').where('id', req.params.id);
```

**Golden rule:** Never concatenate user input into SQL. Use `$1`, `$2`, or your ORM's parameterization.

---

## 6. XSS (Cross-Site Scripting) Prevention

**XSS** is when an attacker injects `<script>` tags that run in other users' browsers.

```js
// If your API returns unsanitized user input:
const item = { name: '<script>stealCookies()</script>' };

// And your frontend renders it with innerHTML:
div.innerHTML = item.name;
// → Attacker's script runs in every user's browser.
```

### API-level defenses

```js
// 1. Strip HTML on input
const sanitized = item.name.replace(/<[^>]*>/g, '');

// 2. Use express-validator .escape()
body('name').escape()

// 3. Send plain text, let frontend handle escaping
// (never return raw HTML from your API)
```

### Most important: Never return unsanitized HTML

```js
// ❌ Bad — returning raw HTML from API
res.json({ html: '<b>' + userInput + '</b>' });

// ✅ Good — return data, let frontend handle rendering
res.json({ text: userInput });
```

Frontend should use `textContent` not `innerHTML`:
```js
// ❌ Bad
div.innerHTML = userInput;

// ✅ Safe
div.textContent = userInput;
```

---

## 7. CSRF (Cross-Site Request Forgery)

CSRF tricks logged-in users into performing actions without consent:

```
1. User is logged into myapp.com
2. Attacker sends them to evil.com
3. evil.com has: <img src="https://myapp.com/api/items/5/delete">
4. Browser sends cookie → request succeeds → item deleted
```

### Fix with double-submit cookie pattern (same-site cookies)

```js
// Modern Express-session with sameSite
app.use(session({
  cookie: {
    sameSite: 'strict',    // ← blocks cross-site cookie sending
    httpOnly: true,
    secure: true,
  },
}));
```

### CSRF token for extra protection

```bash
npm install csurf
```

```js
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// Generate token
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Protected routes
app.post('/api/items', csrfProtection, (req, res) => {
  // only proceeds if CSRF token is valid
});
```

**Client sends token back:**
```js
const res = await fetch('/api/csrf-token');
const { csrfToken } = await res.json();

await fetch('/api/items', {
  method: 'POST',
  headers: {
    'CSRF-Token': csrfToken,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'Buy milk' }),
});
```

---

## 8. Password Security

Already covered in Authentication.md, but the essentials:

```js
const bcrypt = require('bcrypt');

// Hash (cost factor 10-12)
const hash = await bcrypt.hash(password, 10);

// Compare
const match = await bcrypt.compare(input, hash);

// NEVER: MD5, SHA1, plain text, or unsalted hashes
```

### Password policies

```js
function validatePassword(password) {
  if (password.length < 8) return 'Must be at least 8 characters';
  if (password.length > 128) return 'Must be under 128 characters';
  // Optionally: require uppercase, number, special char
  return null;
}
```

---

## 9. Secrets Management

```js
// ❌ NEVER hardcode secrets
const SECRET = 'my-password-123';

// ✅ Always use environment variables
const SECRET = process.env.JWT_SECRET;

// ✅ Validate required secrets on startup
function requireEnv(name) {
  if (!process.env[name]) {
    throw new Error(`Missing required env: ${name}`);
  }
  return process.env[name];
}
```

| Don't | Do |
|---|---|
| Commit `.env` | Add `.env.example` (no real values) |
| Log passwords | Redact secrets in logs |
| Hardcode API keys | Use env vars |
| Use weak JWT secrets | `openssl rand -hex 64` |

---

## 10. HTTPS & Secure Cookies

HTTPS is non-negotiable in production.

```js
// Cookie security flags
res.cookie('sessionId', token, {
  httpOnly: true,   // JS can't read it (XSS protection)
  secure: true,     // only send over HTTPS
  sameSite: 'lax',  // CSRF protection
  maxAge: 24 * 60 * 60 * 1000, // 24h
});
```

**In production:** Use a reverse proxy (Nginx, Caddy) for SSL termination. Your Express app talks HTTP internally on a different port.

---

## 11. Additional Defenses

### Disable x-powered-by

```js
app.disable('x-powered-by');
// Removes: X-Powered-By: Express
// (hides technology stack from attackers)
```

### JSON body size limit

```js
app.use(express.json({ limit: '10kb' }));
// Prevents large payload DoS attacks
```

### Escape regex input

```js
// If user input goes into RegExp:
const searchTerm = req.query.q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regex = new RegExp(searchTerm, 'i');
```

### Noeval()

```js
// ❌ Never
eval(userInput);
new Function(userInput);
setTimeout(userInput, 100);
```

---

## 12. Production Security Checklist

```
☐ Helmet() added
☐ Rate limiting on all routes (global + login)
☐ Input validation + sanitization (express-validator)
☐ Parameterized SQL queries (no string interpolation)
☐ No eval(), no innerHTML with user content
☐ JWT/session secrets in env vars, not code
☐ SameSite cookies (lax or strict)
☐ httpOnly + secure cookies
☐ HTTPS only (redirect HTTP → HTTPS)
☐ X-Powered-By disabled
☐ JSON body size limit
☐ Passwords hashed with bcrypt (cost >= 10)
☐ Rate limiting on login (5 attempts/15min)
☐ Error messages don't leak stack traces
☐ npm audit run (fix vulnerabilities)
```

---

## 13. Quick Reference

| Attack | Defense |
|---|---|
| SQL Injection | Parameterized queries (`$1`, `$2`), ORM |
| XSS | Input escaping, `textContent` not `innerHTML`, CSP header |
| CSRF | `sameSite: 'strict'`, CSRF tokens |
| Brute Force | Rate limiting on login |
| DDoS | Global rate limiting |
| Information Leak | Disable `x-powered-by`, hide stack traces in prod |
| MITM | HTTPS (cert via Let's Encrypt) |
| Cookie theft | `httpOnly`, `secure`, `sameSite` |
| DoS (large payload) | `express.json({ limit: '10kb' })` |
| Clickjacking | `helmet()` (X-Frame-Options) |

---

*Last updated: June 2026*
