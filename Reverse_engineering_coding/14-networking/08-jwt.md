# 8. JWT — JSON Web Tokens

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

## Creating and Verifying JWT

```javascript
const jwt = require('jsonwebtoken');
const SECRET = 'your-256-bit-secret';

function createToken(user) {
    return jwt.sign(
        { sub: user.id, role: user.role },
        SECRET,
        { expiresIn: '1h' }
    );
}

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing token' });
    }
    const token = authHeader.slice(7);
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
  │◄──── data ─────│

JWT:
Client           Server
  │                │
  │── token ──────►│  Verify signature, extract payload
  │◄──── data ─────│  (No store lookup needed)
```

## Refresh Token Pattern

```javascript
const accessToken = jwt.sign({ sub: userId }, ACCESS_SECRET, { expiresIn: '15m' });
const refreshToken = jwt.sign({ sub: userId, type: 'refresh' }, REFRESH_SECRET, { expiresIn: '7d' });

app.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;
    try {
        const payload = jwt.verify(refreshToken, REFRESH_SECRET);
        const newAccessToken = jwt.sign({ sub: payload.sub }, ACCESS_SECRET, { expiresIn: '15m' });
        res.json({ accessToken: newAccessToken });
    } catch {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
});
```

## JWT Best Practices

- **Keep payload small** (token is sent with every request).
- **Use short expiration** (15 min - 1 hour).
- **Use refresh tokens** for long-lived sessions.
- **Store tokens securely** (HttpOnly cookie, not localStorage).
- **Use RS256** (asymmetric) for microservices.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Session or JWT? | Session: server state. JWT: client state |
| Is token expired? | Check `exp` claim |
| Can payload be read? | Base64-decoded — always readable (but signed) |
| Can payload be modified? | No — signature verification fails |
## Next Steps

[Back to Chapter 7](07-cookies-sessions.md): 7. HTTP Cookies and Server-Side Sessions
[Proceed to Chapter 9](09-authentication-authorization.md): 9. Authentication, Authorization, and Password Security to learn about 9. authentication, authorization, and password security.
