# Error Handling — try/catch, Error Middleware, Meaningful Messages

---

## 1. Why Error Handling Matters

Without it, one crash takes down your entire server:

```js
// ❌ No error handling
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  res.json(item.toUpperCase());  // TypeError: Cannot read property of null
});

// → CRASH! Server stops. All users lose access.
```

With error handling, you catch the problem, log it, and tell the client what happened — server keeps running.

---

## 2. Synchronous Error Handling

Express automatically catches sync errors if you call `throw`:

```js
app.get('/api/items/:id', (req, res) => {
  throw new Error('Boom!');  // Express catches this
});
```

But this only works for **synchronous** code. Async code (database queries, file reads, fetch) needs explicit handling.

---

## 3. Async Error Handling — try/catch

Every async route handler needs try/catch:

```js
app.get('/api/items', async (req, res) => {
  try {
    const items = await db.query('SELECT * FROM items');
    res.json(items.rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});
```

**Problem:** Writing try/catch in every handler is repetitive.

**Solution 1 — Wrapper function:**
```js
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

app.get('/api/items', asyncHandler(async (req, res) => {
  const items = await db.query('SELECT * FROM items');
  res.json(items.rows);
}));
```

**Solution 2 — Express 5 (alpha):**
Express 5 catches rejected promises automatically. In Express 4, you need the wrapper.

---

## 4. Express Error Middleware (4 Parameters)

Error middleware has **exactly 4 parameters**. Express identifies it by the function's `.length` property:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);       // Log full error for debugging
  res.status(500).json({
    error: 'Internal server error',
  });
});
```

**When you call `next(err)`**, Express skips all normal middleware and jumps to error middleware:

```js
app.get('/api/items/:id', async (req, res, next) => {
  try {
    const item = await db.findItem(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    next(err);  // → skip to error middleware
  }
});
```

---

## 5. The Error Middleware Pipeline

```
Request → Route Handler → throws / next(err)
                              ↓
                    Error Middleware (catches all)
                              ↓
                     Sends response to client
```

**Full setup:**
```js
// 1. Routes (normal handlers)
app.get('/api/items', async (req, res, next) => {
  try {
    const items = await db.query('SELECT * FROM items');
    res.json(items.rows);
  } catch (err) {
    next(err);
  }
});

// 2. 404 handler — catches unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 3. Global error handler — catches everything
app.use((err, req, res, next) => {
  console.error(err);  // Always log for debugging
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});
```

---

## 6. Custom Error Classes

Create typed errors with status codes:

```js
// errors.js
class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

class AuthError extends AppError {
  constructor(message = 'Not authenticated') {
    super(message, 401);
  }
}

module.exports = { AppError, NotFoundError, ValidationError, AuthError };
```

**Usage in routes:**
```js
const { NotFoundError, ValidationError } = require('./errors');

app.post('/api/items', async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw new ValidationError('Name is required');
    }
    const item = await db.createItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});
```

**Error middleware handles them:**
```js
app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.status  // Known error → show message
    ? err.message
    : 'Internal server error';  // Unknown error → hide details

  res.status(status).json({ error: message });
});
```

---

## 7. Operational vs Programmer Errors

| Type              | Meaning                        | Example                    | Response      |
|-------------------|--------------------------------|----------------------------|---------------|
| Operational       | Expected failure, we can handle| Invalid input, DB timeout  | Show message  |
| Programmer        | Bug in code                    | TypeError, ReferenceError  | Log full stack, show generic message |

```js
app.use((err, req, res, next) => {
  // Operational — known error type
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  // Programmer error — log everything, hide details
  console.error('UNEXPECTED ERROR:', err);
  res.status(500).json({
    error: 'Something went wrong',
    ...(process.env.NODE_ENV !== 'production' && { details: err.message }),
    // ^ show details only in development
  });
});
```

---

## 8. 404 Handler — Always Include This

This catches any request that doesn't match a route:

```js
// Must be AFTER all routes
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});
```

**Without it, unmatched requests hang** or return HTML with "Cannot GET /xyz".

---

## 9. Common Error Scenarios & Responses

| Scenario                    | Status | Error Message                   |
|-----------------------------|--------|---------------------------------|
| Missing required field      | 400    | "Name is required"              |
| Invalid email format        | 422    | "Invalid email format"          |
| Wrong password              | 401    | "Invalid credentials"           |
| Expired token               | 401    | "Token expired"                 |
| Resource not found          | 404    | "Item not found"                |
| Duplicate email             | 409    | "Email already registered"      |
| Database connection failed  | 500    | "Internal server error"         |
| Rate limit exceeded         | 429    | "Too many requests, try later"  |

---

## 10. Full Example — Todo App with Error Handling

```js
// server.js
const { AppError, NotFoundError } = require('./errors');

// Wrapper to avoid try/catch in every handler
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Routes
router.get('/items', asyncHandler(async (req, res) => {
  const items = await db.query('SELECT * FROM items');
  res.json(items.rows);
}));

router.get('/items/:id', asyncHandler(async (req, res) => {
  const item = await db.query('SELECT * FROM items WHERE id = $1', [req.params.id]);
  if (!item) throw new NotFoundError('Item');
  res.json(item);
}));

router.post('/items', asyncHandler(async (req, res) => {
  if (!req.body.name) {
    throw new AppError('Name is required', 400);
  }
  const item = await db.createItem(req.body);
  res.status(201).json(item);
}));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = status < 500 ? err.message : 'Internal server error';
  res.status(status).json({ error: message });
});
```

---

## 11. Quick Reference

| Concept                     | Key Point                                    |
|-----------------------------|----------------------------------------------|
| try/catch                   | Wrap every async handler                     |
| asyncHandler wrapper        | Reuse to avoid repetitive try/catch          |
| Error middleware            | 4 params: `(err, req, res, next)` — catches all errors |
| next(err)                   | Pass to error middleware                     |
| Custom errors              | `class AppError extends Error { constructor(msg, status) }` |
| 404 handler                 | After all routes, catch unmatched paths      |
| Never expose internals      | In production, hide stack traces             |
| Always log                  | `console.error(err)` before sending response |

---

*Last updated: June 2026*
