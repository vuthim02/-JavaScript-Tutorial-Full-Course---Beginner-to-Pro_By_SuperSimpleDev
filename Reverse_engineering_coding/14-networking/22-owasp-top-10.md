# 22 — OWASP Top 10 Security Risks (2021)

The OWASP Top 10 is the industry standard for web application security. Each entry includes a **risk**, a **realistic Node.js example**, and a **defense**.

## A01 — Broken Access Control

**Risk**: Users can access resources or perform actions they shouldn't.

```javascript
// VULNERABLE — no authorization check
app.get('/api/admin/users', (req, res) => {
    db.all('SELECT * FROM users', (err, users) => res.json(users));
});

// FIX — check role before access
const requireRole = (role) => (req, res, next) => {
    if (req.user?.role !== role) return res.sendStatus(403);
    next();
};
app.get('/api/admin/users', requireRole('admin'), (req, res) => {
    db.all('SELECT * FROM users', (err, users) => res.json(users));
});
```

## A02 — Cryptographic Failures

**Risk**: Sensitive data exposed due to weak encryption, missing HTTPS, or storing passwords in plaintext.

```javascript
// VULNERABLE — plaintext password storage
db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);

// FIX — hash with bcrypt (cost factor 12)
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 12);
db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash]);
```

Always use HTTPS in production. Never roll your own crypto.

## A03 — Injection

**Risk**: Untrusted input executed as code — not just SQL. NoSQL injection is common in Node.js.

```javascript
// VULNERABLE — NoSQL injection
const user = await User.findOne({ username: req.body.username });

// If attacker sends { "username": { "$gt": "" } }, they get the first user

// FIX — validate that input is a string
if (typeof req.body.username !== 'string') return res.status(400).end();
const user = await User.findOne({ username: req.body.username });
```

For SQL, always use parameterized queries or an ORM.

## A04 — Insecure Design

**Risk**: Architecture-level flaws that no amount of implementation care can fix.

```javascript
// VULNERABLE — no rate limiting on password reset
app.post('/api/reset-password', async (req, res) => {
    const token = crypto.randomBytes(32).toString('hex');
    await sendEmail(req.body.email, token); // Anyone can spam any email
});

// FIX — rate limit + require CAPTCHA for sensitive flows
const rateLimit = require('express-rate-limit');
const passwordResetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: 'Too many password reset requests'
});
app.post('/api/reset-password', passwordResetLimiter, async (req, res) => {
    // ...
});
```

## A05 — Security Misconfiguration

**Risk**: Default credentials, verbose error messages, unnecessary features enabled.

```javascript
// VULNERABLE — Express in production with debug info
app.set('env', 'development'); // default
app.use(errorHandler); // stack traces leaked to client

// FIX — environment-specific configuration
app.set('env', process.env.NODE_ENV || 'production');
if (app.get('env') === 'production') {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// Use helmet to set secure defaults
const helmet = require('helmet');
app.use(helmet());
```

## A06 — Vulnerable & Outdated Components

**Risk**: Using npm packages with known vulnerabilities.

```bash
# Check for vulnerabilities
npm audit

# Automatically fix
npm audit fix

# Keep dependencies updated
npm install -g npm-check-updates
ncu -u
```

Use **Dependabot** or **Renovate** for automated dependency updates. Pin versions in `package.json` for critical dependencies.

```javascript
// Recommended — review package.json semver ranges
// "express": "^4.18.0"   ← accepts patches & minors
// "helmet": "7.1.0"      ← pinned exact version for security-critical package
```

## A07 — Identification & Authentication Failures

**Risk**: Weak password policies, no MFA, session fixation, credential stuffing.

```javascript
// VULNERABLE — no lockout on failed attempts
app.post('/api/login', async (req, res) => {
    const user = await db.findUserByEmail(req.body.email);
    const match = await bcrypt.compare(req.body.password, user?.password || '');
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    // create session...
});

// FIX — rate limit + account lockout
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts'
});
app.post('/api/login', loginLimiter, async (req, res) => {
    // ...
    if (!match) {
        await db.incrementFailedLogins(req.body.email);
        const attempts = await db.getFailedLogins(req.body.email);
        if (attempts >= 5) await db.lockAccount(req.body.email);
    }
});
```

## A08 — Software & Data Integrity Failures

**Risk**: Installing untrusted code or accepting unsigned data.

```javascript
// VULNERABLE — loading third-party script without integrity check
// <script src="https://cdn.example.com/analytics.js">

// FIX — Subresource Integrity (SRI)
// <script src="https://cdn.example.com/analytics.js"
//         integrity="sha384-ABC123..."
//         crossorigin="anonymous">
```

In Node.js, always use `package-lock.json` (or `yarn.lock` / `pnpm-lock.yaml`) to ensure reproducible installs. In CI, use `npm ci` instead of `npm install`.

## A09 — Security Logging & Monitoring Failures

**Risk**: You can't detect or respond to attacks because there's no audit trail.

```javascript
// VULNERABLE — no logging of security events
app.post('/api/login', async (req, res) => {
    // success or failure — nothing is recorded
});

// FIX — log security-relevant events
app.post('/api/login', async (req, res) => {
    const result = await authenticate(req.body);
    logger.info({
        event: 'login_attempt',
        userId: req.body.email,
        success: result.success,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    });
    // ...
});

// Alert on suspicious patterns
// Failed login > 5/min → alert
// 403 > 20/min → alert
// New user from known-bad IP → alert
```

## A10 — Server-Side Request Forgery (SSRF)

**Risk**: Attacker tricks your server into making requests to internal services.

```javascript
// VULNERABLE — user controls the URL
app.get('/api/fetch', async (req, res) => {
    const response = await fetch(req.query.url);
    const data = await response.text();
    res.send(data);
});
// Attacker: /api/fetch?url=http://169.254.169.254/latest/meta-data/ ← AWS metadata

// FIX — validate and allowlist URLs
const ALLOWED_HOSTS = new Set(['api.example.com', 'api.trusted.com']);

app.get('/api/fetch', async (req, res) => {
    const url = new URL(req.query.url);
    if (!ALLOWED_HOSTS.has(url.hostname)) {
        return res.status(403).json({ error: 'Host not allowed' });
    }
    const response = await fetch(url);
    const data = await response.text();
    res.send(data);
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is there an authorization check? | Look for role/permission middleware before sensitive routes |
| Are passwords hashed? | Check for `bcrypt`, `argon2` — not plaintext in DB |
| Is input validated? | Look for type checks, schema validation (Joi, Zod) |
| Are error messages safe? | Production errors should not include stack traces |
| Is `npm audit` clean? | Run `npm audit` — any HIGH/CRITICAL findings need triage |
| Is rate limiting applied? | Check for `express-rate-limit` on auth endpoints |
| Are there security logs? | Look for audit logs of auth events, sensitive operations |
| Is HTTPS enforced? | Check for HSTS header, redirect from HTTP to HTTPS |
| Are dependencies pinned? | Security-critical packages should be exact versions |
| Can user-supplied URLs reach internal networks? | Check for SSRF — requires URL allowlist |
## Next Steps

[Back to Chapter 21](21-tactical-questions-projects.md): 21 — Tactical Questions & Projects

[Proceed to Module 15](../15-databases/README.md): Databases and Data Engineering to learn about databases and data engineering.
