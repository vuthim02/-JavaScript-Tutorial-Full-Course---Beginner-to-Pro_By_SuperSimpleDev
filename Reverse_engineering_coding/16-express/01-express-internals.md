# Chapter 1 — Express Internals

## What Express Is

Express is a **routing and middleware web framework**. It wraps Node's `http` module and adds a middleware pipeline.

```javascript
const express = require('express');
const app = express();
```

## Internal Request Flow

```
Node HTTP Server receives request
        ↓
Creates (req, res) objects
        ↓
Express middleware stack starts
        ↓
Middleware 1 executes (req, res, next)
        ↓  next()
Middleware 2 executes (req, res, next)
        ↓  next()
Route matching
        ↓  match found
Route handler executes
        ↓  res.send() / res.json()
Response sent to client
```

## What Express Actually Does Under the Hood

```javascript
// Express does this internally:
const http = require('http');

function createApp() {
    const middlewareQueue = [];
    const routes = [];

    const app = (req, res) => {
        let idx = 0;

        function next(err) {
            if (err) {
                return;
            }
            if (idx < middlewareQueue.length) {
                middlewareQueue[idx++](req, res, next);
            } else {
                // Match and run route
            }
        }

        next();
    };

    app.use = (fn) => middlewareQueue.push(fn);
    app.get = (path, handler) => routes.push({ method: 'GET', path, handler });

    return app;
}
```

## The Application Object

```javascript
const express = require('express');
const app = express();
```

| Method | Purpose |
|--------|---------|
| `app.get(path, handler)` | Register GET route |
| `app.post(path, handler)` | Register POST route |
| `app.put(path, handler)` | Register PUT route |
| `app.patch(path, handler)` | Register PATCH route |
| `app.delete(path, handler)` | Register DELETE route |
| `app.use(middleware)` | Register middleware (runs for all methods) |
| `app.all(path, handler)` | Register handler for all HTTP methods |
| `app.param(name, fn)` | Param preprocessing middleware |
| `app.set(key, value)` | Set app-level settings |
| `app.listen(port, cb)` | Start HTTP server |

## Application Settings

```javascript
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.set('json spaces', 2);
app.set('case sensitive routing', true);
app.set('strict routing', true);
app.enable('case sensitive routing');
app.disable('x-powered-by');
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which middleware runs first? | The first `.use()` call in order |
| Which route matches? | First matching route (order matters) |
| Is this Express or raw Node? | Check for `app.get/post/use` vs `http.createServer` |
| What settings are configured? | Check `app.set()` calls |
| Which port? | `app.get('port')` or `process.env.PORT` |
| Is X-Powered-By hidden? | `app.disable('x-powered-by')` |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-middleware-stack.md): Chapter 2 — The Middleware Stack to learn about chapter 2 — the middleware stack.
