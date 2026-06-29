# Chapter 2 — The Middleware Stack

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What is Middleware?

Middleware functions have access to the request object (`req`), the response object (`res`), and the `next` function.

```javascript
function myMiddleware(req, res, next) {
    // Do something
    next(); // Pass control to the next middleware
}
```

## Middleware Flow

```
Request → Middleware 1 → Middleware 2 → Middleware 3 → Route Handler
                                                              ↓
                                                         Response
```

If a middleware does NOT call `next()`, the request hangs or must send a response itself.

## Categories of Middleware

| Category | Examples |
|----------|----------|
| **Application-level** | `app.use(logger)` — runs on every request |
| **Router-level** | `router.use(auth)` — runs for routes on that router |
| **Error-handling** | `app.use((err, req, res, next) => {})` — 4 parameters |
| **Built-in** | `express.json()`, `express.static()`, `express.urlencoded()` |
| **Third-party** | `cors()`, `helmet()`, `morgan()`, `compression()` |

## Application-Level Middleware

```javascript
// Runs for EVERY request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Runs only for /api routes
app.use('/api', (req, res, next) => {
    console.log('API request:', req.url);
    next();
});
```

## Multiple Middleware on One Route

```javascript
app.get('/profile',
    authenticate,      // Check JWT
    loadUser,          // Load user from DB
    authorize('admin'), // Check role
    (req, res) => {    // Handler
        res.json(req.user);
    }
);
```

## next() with Error

```javascript
app.use((req, res, next) => {
    try {
        parseBody(req);
        next();
    } catch (err) {
        next(err); // Skip to error middleware
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
});
```

## Built-in Middleware

### express.json()

Parses incoming JSON request bodies.

```javascript
app.use(express.json());

app.post('/users', (req, res) => {
    console.log(req.body.name);
});

app.use(express.json({
    limit: '10mb',
    strict: true,
    verify: (req, res, buf) => {
        // Custom verification
    }
}));
```

### express.urlencoded()

Parses form data (`application/x-www-form-urlencoded`).

```javascript
app.use(express.urlencoded({ extended: true }));
// extended: true — parses nested objects (uses qs)
// extended: false — simple key-value (uses querystring)
```

### express.static()

Serves static files.

```javascript
app.use(express.static('public'));

// Virtual path prefix
app.use('/static', express.static('public'));

app.use(express.static('public', {
    maxAge: '1d',
    etag: true,
    setHeaders: (res, path) => {
        if (path.endsWith('.gz')) {
            res.setHeader('Content-Encoding', 'gzip');
        }
    }
}));
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which middleware terminated request? | Look for `res.send()` or `res.json()` without `next()` |
| Did `next()` execute? | If not, request hangs |
| Is middleware order correct? | Order of `app.use()` determines execution |
| Is JSON body parsed? | Check for `express.json()` middleware |
| Are static files served? | Check for `express.static()` |
| Error middleware present? | 4 parameters: `(err, req, res, next)` |
## Next Steps

[Back to Chapter 1](01-express-internals.md): Chapter 1 — Express Internals
[Proceed to Chapter 3](03-routing.md): Chapter 3 — Routing to learn about chapter 3 — routing.
