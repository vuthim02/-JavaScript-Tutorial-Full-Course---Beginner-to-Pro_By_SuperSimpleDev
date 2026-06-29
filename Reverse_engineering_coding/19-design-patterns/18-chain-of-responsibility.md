# Chain of Responsibility Pattern

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Problem It Solves

A request should be processed by one of several handlers, but the sender should not know which handler. The handlers are chained, and each decides whether to process the request or pass it to the next.

## Implementation

```javascript
class Handler {
    constructor() { this.nextHandler = null; }

    setNext(handler) { this.nextHandler = handler; return handler; }

    handle(request) {
        if (this.nextHandler) return this.nextHandler.handle(request);
        return null;
    }
}

class AuthenticationHandler extends Handler {
    handle(request) {
        if (!request.token) return { error: "Authentication required", status: 401 };
        console.log("Authentication passed");
        return super.handle(request);
    }
}

class AuthorizationHandler extends Handler {
    handle(request) {
        if (request.role !== "admin") return { error: "Insufficient permissions", status: 403 };
        console.log("Authorization passed");
        return super.handle(request);
    }
}

class ValidationHandler extends Handler {
    handle(request) {
        if (!request.body || Object.keys(request.body).length === 0)
            return { error: "Request body is required", status: 400 };
        console.log("Validation passed");
        return super.handle(request);
    }
}

class CacheHandler extends Handler {
    constructor() { super(); this.cache = new Map(); }

    handle(request) {
        const key = JSON.stringify(request);
        if (this.cache.has(key)) return { cached: true, data: this.cache.get(key) };
        const result = super.handle(request);
        if (result && !result.error) this.cache.set(key, result.data);
        return result;
    }
}

class BusinessLogicHandler extends Handler {
    handle(request) {
        return { data: `Processed by ${request.role}`, status: 200 };
    }
}

// Build the chain
const auth = new AuthenticationHandler();
auth
    .setNext(new AuthorizationHandler())
    .setNext(new ValidationHandler())
    .setNext(new CacheHandler())
    .setNext(new BusinessLogicHandler());

const validRequest = { token: "abc", role: "admin", body: { action: "delete" } };
console.log(auth.handle(validRequest));
// { data: "Processed by admin", status: 200 }

const invalidRequest = { token: "abc", role: "user", body: { action: "read" } };
console.log(auth.handle(invalidRequest));
// { error: "Insufficient permissions", status: 403 }
```

## Chain with Functions

```javascript
function createMiddleware(...handlers) {
    return function (request) {
        let index = 0;
        function next() {
            const handler = handlers[index++];
            if (handler) return handler(request, next);
            return { data: "No handler processed", status: 500 };
        }
        return next();
    };
}

const pipeline = createMiddleware(
    (req, next) => {
        if (!req.token) return { error: "Unauthorized", status: 401 };
        return next();
    },
    (req, next) => {
        if (req.role !== "admin") return { error: "Forbidden", status: 403 };
        return next();
    },
    (req, next) => {
        return { data: `Hello ${req.role}`, status: 200 };
    }
);

console.log(pipeline({ token: "x", role: "admin" }));
// { data: "Hello admin", status: 200 }
```

## Real-World Use Case

Express/Koa middleware is a chain of responsibility. Each middleware handles the request or passes it to the `next()` function.

```javascript
class MiddlewareChain {
    constructor() { this.middlewares = []; }

    use(fn) { this.middlewares.push(fn); return this; }

    execute(req, res) {
        let index = 0;
        const next = () => {
            const middleware = this.middlewares[index++];
            if (middleware) middleware(req, res, next);
        };
        next();
    }
}

const app = new MiddlewareChain();
app.use((req, res, next) => { console.log("Logger:", req.url); next(); });
app.use((req, res, next) => { req.user = { id: 1, name: "Alice" }; next(); });
app.use((req, res, next) => { res.body = `Hello ${req.user.name}`; console.log(res.body); });
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | How does Chain of Responsibility differ from a simple `if/else` chain? |
| 2 | What happens if no handler in the chain processes the request? |
| 3 | How would you handle errors thrown by a handler? |
| 4 | Can a handler both process the request AND pass it forward? When would this be useful? |
## Next Steps

[Back to Chapter 17](17-iterator.md): Iterator Pattern
[Proceed to Chapter 19](19-comparison-table.md): Comparison Tables & Reverse Engineering Questions to learn about comparison tables & reverse engineering questions.
