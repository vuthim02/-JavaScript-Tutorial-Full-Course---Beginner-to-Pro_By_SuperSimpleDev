# 7. HTTP Cookies and Server-Side Sessions

## HTTP Cookies

### What Cookies Do

Cookies allow servers to store state on the client. The browser automatically sends cookies with every request to the same domain.

### Flow

```
Server → Set-Cookie header → Browser stores cookie
Browser → Cookie header → Server receives cookie
```

### Setting Cookies

```javascript
// Server sends cookie
res.setHeader('Set-Cookie', 'sessionId=abc123; HttpOnly; Secure; SameSite=Lax');

// Or with Express:
res.cookie('sessionId', 'abc123', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 3600000,
    path: '/'
});
```

### Cookie Attributes

| Attribute | Meaning | Example |
|-----------|---------|---------|
| `Expires` | Expiration date | `Expires=Wed, 21 Oct 2025 07:28:00 GMT` |
| `Max-Age` | Lifetime in seconds | `Max-Age=3600` |
| `Secure` | HTTPS only | `Secure` |
| `HttpOnly` | JS cannot read via `document.cookie` | `HttpOnly` |
| `SameSite` | CSRF protection | `Strict`, `Lax`, `None` |

### SameSite Explained

| Value | Behavior |
|-------|----------|
| `Strict` | Cookie sent only for same-site requests |
| `Lax` (default) | Cookie sent for same-site and top-level GET navigation from other sites |
| `None` | Cookie sent for all requests. Requires `Secure` |

### Reading and Deleting Cookies

```javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req.cookies); // { sessionId: 'abc123' }
});

res.clearCookie('sessionId');
```

## Server-Side Sessions

### How Sessions Work

```
1. Client sends login request (username + password)
2. Server validates credentials
3. Server creates session (stored in memory/Redis/DB)
4. Server returns session ID in a cookie
5. Browser stores cookie
6. Client sends subsequent requests with cookie
7. Server looks up session by ID
```

### Session Middleware (Express)

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

function login(req, res, userId) {
    const sessionId = crypto.randomUUID();
    sessions.set(sessionId, { userId, createdAt: Date.now() });
    res.cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    });
}

function logout(req, res) {
    if (req.cookies?.sessionId) {
        sessions.delete(req.cookies.sessionId);
    }
    res.clearCookie('sessionId');
}
```

### Session Stores

| Store | Characteristics |
|-------|-----------------|
| **In-memory** | Fast but lost on restart, not shareable |
| **Redis** | Fast, persistent, shared across processes |
| **Database** | Persistent, slower, good for long-term sessions |

### Session vs JWT

| Feature | Session | JWT |
|---------|---------|-----|
| State location | Server-side | Client-side |
| Revocation | Immediate | Cannot revoke (until expiry) |
| Scaling | Need shared store | Stateless |
| Size | Cookie is small (session ID) | Token can be large |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Stored in browser? | Yes — cookies are client-side storage |
| JS can read? | Only if NOT HttpOnly |
| State stored server-side? | Session (lookup by ID) |
| Can session be revoked? | Yes — delete from store |
## Next Steps

[Back to Chapter 6](06-json-rest-url.md): 6. JSON, REST API Design, and URL Structure
[Proceed to Chapter 8](08-jwt.md): 8. JWT — JSON Web Tokens to learn about 8. jwt — json web tokens.
