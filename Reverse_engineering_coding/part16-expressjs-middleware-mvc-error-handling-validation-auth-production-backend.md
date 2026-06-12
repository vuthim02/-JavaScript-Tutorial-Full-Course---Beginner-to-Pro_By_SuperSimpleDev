# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

# Part 16 — Express.js, Middleware, MVC Architecture, Error Handling, Validation, Authentication, Logging, Caching, and Production Backend Engineering

## (Reverse Engineering Coding Tactical Edition)

---

# Mission

Most Node.js applications are not simply:

```javascript
http.createServer()
```

Professional backend systems usually use frameworks such as:

- **Express** — most popular, minimalist, huge ecosystem
- **Fastify** — faster, schema-based, built-in validation
- **NestJS** — opinionated, modular, TypeScript-native

Their goal:

```
Request
↓
Business Logic
↓
Database
↓
Response
```

---

# OVERALL ARCHITECTURE

```
Client
↓
HTTP Request
↓
HTTP Server (Node)
↓
Middleware Stack (logging, auth, cors, compression, body parsing)
↓
Router (matches URL path)
↓
Controller (handles request, calls service)
↓
Service (business logic)
↓
Repository (data access)
↓
Database
↓
Response
```

Senior engineers think in layers:

```
Transport Layer     (HTTP, WebSocket, gRPC)
    ↓
Business Layer      (services, use cases, domain logic)
    ↓
Persistence Layer   (repositories, ORM, queries)
    ↓
Infrastructure Layer (caching, logging, messaging, auth)
```

---

# PART I — EXPRESS ARCHITECTURE

---

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
        // Run middleware chain then route handler
        let idx = 0;

        function next(err) {
            if (err) {
                // Error middleware
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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which middleware runs first? | The first `.use()` call in order |
| Which route matches? | First matching route (order matters) |
| Which controller executes? | The handler on the matching route |
| Is this Express or raw Node? | Check for `app.get/post/use` vs `http.createServer` |

---

# Chapter 2 — Application Object

```javascript
const express = require('express');
const app = express();
```

The `app` object is the central Express application. It contains:

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
| `app.route(path)` | Chainable route registration |

## Application Settings

```javascript
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('trust proxy', 1); // Trust X-Forwarded-For header
app.set('json spaces', 2); // Pretty-print JSON
app.set('case sensitive routing', true); // /Users ≠ /users
app.set('strict routing', true); // /users ≠ /users/
app.enable('case sensitive routing'); // Shortcut for boolean settings
app.disable('x-powered-by'); // Remove Express header
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What settings are configured? | Check `app.set()` calls |
| Which port? | `app.get('port')` or `process.env.PORT` |
| Is X-Powered-By hidden? | `app.disable('x-powered-by')` |

---

# PART II — ROUTING

---

# Chapter 3 — Route Definitions

## Basic Routes

```javascript
app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'Alice' }]);
});

app.post('/users', (req, res) => {
    // Create user
    res.status(201).json(req.body);
});

app.put('/users/:id', (req, res) => {
    // Replace user
    res.json({ id: req.params.id, ...req.body });
});

app.patch('/users/:id', (req, res) => {
    // Partial update
    res.json({ updated: true });
});

app.delete('/users/:id', (req, res) => {
    // Delete user
    res.status(204).send();
});
```

## Route Parameters

```javascript
// :param — required parameter
app.get('/users/:userId/posts/:postId', (req, res) => {
    console.log(req.params.userId); // "5"
    console.log(req.params.postId); // "12"
});

// Query parameters
app.get('/users', (req, res) => {
    console.log(req.query.page);  // "2"
    console.log(req.query.limit); // "20"
    console.log(req.query.filter); // "active"
    // GET /users?page=2&limit=20&filter=active
});

// Optional parameter
app.get('/users/:id?', (req, res) => {
    if (req.params.id) {
        // Single user
    } else {
        // All users
    }
});

// Wildcard route
app.get('/*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});
```

## Route Matching Order

Routes are matched in the order they are registered:

```javascript
// Order matters!

// 1. Specific routes first
app.get('/users/admin', (req, res) => {
    res.send('Admin panel');
});

// 2. Parameterized routes second
app.get('/users/:id', (req, res) => {
    res.send(`User ${req.params.id}`);
});

// 3. Wildcard last
app.get('/users/*', (req, res) => {
    res.status(404).send('Not found');
});
```

## Chained Routes

```javascript
app.route('/users/:id')
    .get((req, res) => { /* GET */ })
    .put((req, res) => { /* PUT */ })
    .patch((req, res) => { /* PATCH */ })
    .delete((req, res) => { /* DELETE */ });
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Where is the input coming from? | `req.params` (path), `req.query` (URL params), `req.body` (body), `req.headers` |
| Which route matches this URL? | First matching route — check order |
| Is route specific or parameterized? | `/users/admin` matches before `/users/:id` |

---

# PART III — MIDDLEWARE

---

# Chapter 4 — The Middleware Stack

## What is Middleware?

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` function.

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
        // Something that might throw
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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which middleware terminated request? | Look for `res.send()` or `res.json()` without `next()` |
| Did `next()` execute? | If not, request hangs |
| Is middleware order correct? | Order of `app.use()` determines execution |
| Error middleware present? | 4 parameters: `(err, req, res, next)` |

---

# PART IV — BUILT-IN MIDDLEWARE

---

# Chapter 5 — Express Built-in Middleware

## express.json()

Parses incoming JSON request bodies.

```javascript
app.use(express.json());
// Now req.body contains parsed JSON

app.post('/users', (req, res) => {
    console.log(req.body.name); // 'Alice'
});
```

Options:

```javascript
app.use(express.json({
    limit: '10mb',          // Max body size
    strict: true,           // Only objects/arrays (not strings)
    verify: (req, res, buf) => {
        // Custom verification (e.g., signature check)
    }
}));
```

## express.urlencoded()

Parses form data (`application/x-www-form-urlencoded`).

```javascript
app.use(express.urlencoded({ extended: true }));
// extended: true — parses nested objects (uses qs)
// extended: false — simple key-value (uses querystring)
```

## express.static()

Serves static files.

```javascript
// Serve files from 'public' directory
app.use(express.static('public'));

// Multiple directories
app.use(express.static('public'));
app.use(express.static('uploads'));

// Virtual path prefix
app.use('/static', express.static('public'));
// File: public/css/style.css → /static/css/style.css

// Options
app.use(express.static('public', {
    maxAge: '1d',               // Cache control
    etag: true,                 // ETag for caching
    setHeaders: (res, path) => {
        if (path.endsWith('.gz')) {
            res.setHeader('Content-Encoding', 'gzip');
        }
    }
}));
```

## express.Router()

Creates modular route handlers.

```javascript
const router = express.Router();

router.use((req, res, next) => {
    // Middleware specific to this router
    console.log('User router:', req.url);
    next();
});

router.get('/', (req, res) => {
    res.json({ users: [] });
});

router.get('/:id', (req, res) => {
    res.json({ id: req.params.id });
});

// Mount router
app.use('/api/users', router);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is JSON body parsed? | Check for `express.json()` middleware |
| Is body size limited? | Check `limit` option in `express.json()` |
| Are static files served? | Check for `express.static()` |
| Is Router used? | Check for `express.Router()` and `app.use('/path', router)` |

---

# PART V — EXPRESS ROUTER

---

# Chapter 6 — Modular Route Organization

## Router Pattern

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

// Middleware specific to users
router.use((req, res, next) => {
    console.log('Users route:', req.method, req.url);
    next();
});

router.get('/', (req, res) => {
    res.json({ users: [] });
});

router.post('/', (req, res) => {
    res.status(201).json(req.body);
});

router.get('/:id', (req, res) => {
    res.json({ id: req.params.id });
});

module.exports = router;
```

```javascript
// app.js
const express = require('express');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

const app = express();

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
```

## Router Organization

```
routes/
├── index.js        ← Main router, aggregates others
├── users.js        ← /api/users/*
├── products.js     ← /api/products/*
├── orders.js       ← /api/orders/*
└── auth.js         ← /api/auth/*
```

```javascript
// routes/index.js
const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/auth', require('./auth'));

module.exports = router;

// app.js
app.use('/api', require('./routes'));
```

## Router with Param Middleware

```javascript
router.param('id', (req, res, next, id) => {
    // Runs when :id is in the route path
    console.log('Loading user:', id);
    req.user = { id: Number(id), name: 'Alice' };
    next();
});

router.get('/:id', (req, res) => {
    res.json(req.user); // User already loaded by param middleware
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which router handles this path? | Trace `app.use('/prefix', router)` |
| Is param middleware used? | Look for `router.param('name', fn)` |
| How are routes organized? | Check file structure under `routes/` |

---

# PART VI — MVC ARCHITECTURE

---

# Chapter 7 — Model-View-Controller

## The Pattern

```
Request → Controller (handles HTTP) → Model (data) → View (renders)
```

## Model

Represents data and business logic.

```javascript
// models/user.js
class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.createdAt = data.createdAt;
    }

    get displayName() {
        return this.name || this.email.split('@')[0];
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        };
    }
}

module.exports = User;
```

## View

Renders output. In API servers, views are often JSON (or template engines like EJS/Pug).

```javascript
// views/user.ejs
<h1><%= user.name %></h1>
<p>Email: <%= user.email %></p>
```

```javascript
app.set('view engine', 'ejs');
app.get('/users/:id', (req, res) => {
    const user = getUser(req.params.id);
    res.render('user', { user });  // Renders views/user.ejs
});
```

## Controller

Handles HTTP requests and responses.

```javascript
// controllers/userController.js
const User = require('../models/User');
const userService = require('../services/userService');

exports.list = async (req, res, next) => {
    try {
        const users = await userService.getAll();
        res.json({ data: users.map(u => new User(u)) });
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const user = await userService.getById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Not found' });
        res.json({ data: new User(user) });
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const user = await userService.create(req.body);
        res.status(201).json({ data: new User(user) });
    } catch (err) {
        next(err);
    }
};
```

```javascript
// routes/users.js
const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.list);
router.post('/', userController.create);
router.get('/:id', userController.getById);

module.exports = router;
```

## MVC Flow Diagram

```
Browser                        Server
  │                              │
  │──── GET /users/5 ──────────►│  Router
  │                              │  ↓
  │                              │  userController.getById
  │                              │  ↓
  │                              │  userService.getById(5)
  │                              │  ↓
  │                              │  User.findByPk(5) (Model)
  │                              │  ↓
  │◄──── JSON Response ─────────│  Controller → res.json()
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which controller handles this? | Trace route → controller function |
| Which model is used? | Data representation |
| Is there a view? | Template rendering or JSON response |

---

# PART VII — LAYERED ARCHITECTURE (Beyond MVC)

---

# Chapter 8 — Controller → Service → Repository

Senior engineers organize code into clear layers.

## The Layers

```
┌─────────────────────────────────────┐
│         Controller Layer            │ ← HTTP concerns only
│   Parses request, calls service,    │
│   sends response                    │
├─────────────────────────────────────┤
│          Service Layer              │ ← Business logic
│   Orchestration, validation,        │
│   business rules, transactions      │
├─────────────────────────────────────┤
│        Repository Layer             │ ← Data access
│   Database queries, caching,        │
│   data transformation               │
├─────────────────────────────────────┤
│         Database                    │
└─────────────────────────────────────┘
```

## Example: Three-Layer Architecture

### Repository Layer

```javascript
// repositories/userRepository.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserRepository {
    async findAll(filters = {}) {
        return prisma.user.findMany({
            where: filters,
            include: { posts: true },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findById(id) {
        return prisma.user.findUnique({
            where: { id },
            include: { posts: true }
        });
    }

    async create(data) {
        return prisma.user.create({ data });
    }

    async update(id, data) {
        return prisma.user.update({
            where: { id },
            data
        });
    }

    async delete(id) {
        return prisma.user.delete({ where: { id } });
    }

    async findByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
}

module.exports = new UserRepository();
```

### Service Layer

```javascript
// services/userService.js
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const AppError = require('../errors/AppError');

class UserService {
    async getAll() {
        return userRepository.findAll();
    }

    async getById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return user;
    }

    async create(data) {
        // Business validation
        if (!data.email) {
            throw new AppError('Email is required', 400);
        }

        // Check for duplicates
        const existing = await userRepository.findByEmail(data.email);
        if (existing) {
            throw new AppError('Email already in use', 409);
        }

        // Hash password (business rule)
        const hashedPassword = await bcrypt.hash(data.password, 12);

        return userRepository.create({
            ...data,
            password: hashedPassword
        });
    }

    async update(id, data) {
        // Only allow specific fields
        const allowed = ['name', 'email'];
        const filtered = {};
        for (const key of allowed) {
            if (data[key] !== undefined) {
                filtered[key] = data[key];
            }
        }

        return userRepository.update(id, filtered);
    }

    async delete(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return userRepository.delete(id);
    }
}

module.exports = new UserService();
```

### Controller Layer

```javascript
// controllers/userController.js
const userService = require('../services/userService');

class UserController {
    async list(req, res, next) {
        try {
            const users = await userService.getAll();
            res.json({ data: users });
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const user = await userService.getById(Number(req.params.id));
            res.json({ data: user });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const user = await userService.create(req.body);
            res.status(201).json({ data: user });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const user = await userService.update(Number(req.params.id), req.body);
            res.json({ data: user });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await userService.delete(Number(req.params.id));
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();
```

## Directory Structure

```
src/
├── controllers/       ← HTTP handlers
│   ├── userController.js
│   └── productController.js
├── services/          ← Business logic
│   ├── userService.js
│   └── productService.js
├── repositories/      ← Data access
│   ├── userRepository.js
│   └── productRepository.js
├── middleware/        ← Express middleware
│   ├── auth.js
│   ├── validate.js
│   └── errorHandler.js
├── routes/           ← Route definitions
│   ├── index.js
│   ├── users.js
│   └── products.js
├── errors/           ← Custom error classes
│   └── AppError.js
├── utils/           ← Helpers
│   └── logger.js
├── config/          ← Configuration
│   └── index.js
└── app.js          ← Express setup
```

## Benefits

| Benefit | Explanation |
|---------|-------------|
| **Testability** | Each layer can be tested independently |
| **Separation of concerns** | HTTP logic doesn't mix with business logic |
| **Maintainability** | Clear boundaries, easier to change one layer |
| **Reusability** | Services can be used by multiple controllers |
| **Parallel development** | Multiple devs can work on different layers |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Business logic belongs where? | Service layer |
| Database logic belongs where? | Repository layer |
| HTTP logic belongs where? | Controller layer |
| Is there layering? | Check directory structure |

---

# PART VIII — ERROR HANDLING

---

# Chapter 9 — Centralized Error Handling

## The Problem

```javascript
// BAD: Inline error handling everywhere
app.get('/users/:id', async (req, res) => {
    try {
        const user = await findUser(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something broke' });
    }
});
// Every route repeats the same pattern
```

## The Solution: Custom Error Class + Error Middleware

### Custom Error Class

```javascript
// errors/AppError.js
class AppError extends Error {
    constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true; // Distinguishes expected errors from bugs
        Error.captureStackTrace(this, this.constructor);
    }
}

// Specific errors
class NotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 404, 'NOT_FOUND');
    }
}

class ValidationError extends AppError {
    constructor(message = 'Validation failed') {
        super(message, 400, 'VALIDATION_ERROR');
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401, 'UNAUTHORIZED');
    }
}

module.exports = { AppError, NotFoundError, ValidationError, UnauthorizedError };
```

### Error Middleware

```javascript
// middleware/errorHandler.js
const { AppError } = require('../errors/AppError');
const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
    // Log the error
    logger.error({
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip
    });

    // Mongoose/Objection validation errors
    if (err.name === 'ValidationError') {
        err = new AppError(err.message, 400, 'VALIDATION_ERROR');
    }

    // PostgreSQL unique violation
    if (err.code === '23505') {
        err = new AppError('Duplicate entry', 409, 'DUPLICATE');
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        err = new AppError('Invalid token', 401, 'INVALID_TOKEN');
    }
    if (err.name === 'TokenExpiredError') {
        err = new AppError('Token expired', 401, 'TOKEN_EXPIRED');
    }

    // Default to 500 for unexpected errors
    const statusCode = err.statusCode || 500;
    const code = err.code || 'INTERNAL_ERROR';
    const message = err.isOperational
        ? err.message
        : 'Internal server error';

    res.status(statusCode).json({
        error: {
            code,
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
}

module.exports = errorHandler;
```

### Async Wrapper

```javascript
// utils/asyncHandler.js
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
const getById = asyncHandler(async (req, res) => {
    const user = await userService.getById(req.params.id);
    res.json({ data: user });
});
```

### App Setup

```javascript
// app.js
const express = require('express');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Routes
app.use('/api', require('./routes'));

// Error handler (MUST be last)
app.use(errorHandler);

// 404 catch-all
app.use((req, res) => {
    res.status(404).json({
        error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.url} not found` }
    });
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Client error (4xx) or server error (5xx)? | 4xx: client fixable. 5xx: bug or infrastructure |
| Is error handling centralized? | Check for error middleware: `(err, req, res, next)` |
| Is async wrapped? | Look for `asyncHandler` or `catch(next)` |
| Are operational errors distinguished? | Check for `isOperational` flag |

---

# PART IX — ASYNC ERRORS

---

# Chapter 10 — Handling Async Errors in Express

## The Problem

Express 4 does **not** catch promise rejections automatically:

```javascript
// THIS CRASHES THE PROCESS
app.get('/users', async (req, res) => {
    const users = await User.find(); // If this throws...
    res.json(users); // Never executes
    // Express silently swallows the error — process crashes!
});
```

## Solution 1: Try/Catch in Every Handler

```javascript
app.get('/users', async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err); // Forward to error middleware
    }
});
```

## Solution 2: Async Handler Wrapper

```javascript
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
}));
```

## Solution 3: Express 5 (Alpha)

Express 5 automatically catches promise rejections:

```javascript
// Express 5 — no wrapper needed
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
    // Rejections are caught automatically
});
```

## Global Unhandled Rejection Handler

```javascript
// Always have this somewhere in your app
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', reason);
    // Optionally crash and restart (recommended)
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
});
```

---

# PART X — VALIDATION

---

# Chapter 11 — Input Validation

## Why Validate

```javascript
// Without validation — dangerous
app.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    // If req.body is {}:
    //   User created with no name, no email — garbage data
    // If req.body contains { role: 'admin' }:
    //   User can escalate privileges
    // If req.body.name is 10000 characters:
    //   Database might reject, or server memory spikes
    res.json(user);
});
```

## Zod Validation

```javascript
const { z } = require('zod');

const createUserSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(128),
    age: z.number().int().positive().optional()
});

// Validation middleware
function validate(schema) {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err) {
            const errors = err.errors.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }));
            res.status(400).json({
                error: { code: 'VALIDATION_ERROR', details: errors }
            });
        }
    };
}

// Route with validation
app.post('/users',
    validate(createUserSchema),
    userController.create
);
```

## Joi Validation

```javascript
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required(),
    age: Joi.number().integer().positive()
});

function validate(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(d => ({
                field: d.path.join('.'),
                message: d.message
            }));
            return res.status(400).json({
                error: { code: 'VALIDATION_ERROR', details: errors }
            });
        }

        req.body = value; // Use validated (and stripped) values
        next();
    };
}
```

## Common Validation Rules

```javascript
const userSchema = z.object({
    // String validations
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain uppercase')
        .regex(/[0-9]/, 'Must contain number'),

    // Number validations
    age: z.number().int().positive().max(150),

    // Enum validation
    role: z.enum(['user', 'admin', 'moderator']),

    // Optional with defaults
    status: z.enum(['active', 'inactive']).default('active'),

    // Nested objects
    address: z.object({
        city: z.string(),
        country: z.string()
    }).optional(),

    // Arrays
    tags: z.array(z.string()).max(5)
});
```

## Query and Params Validation

```javascript
const querySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    sort: z.enum(['name', 'createdAt', 'email']).default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc')
});

function validateQuery(schema) {
    return (req, res, next) => {
        try {
            req.query = schema.parse(req.query);
            next();
        } catch (err) {
            res.status(400).json({
                error: { code: 'VALIDATION_ERROR', details: err.errors }
            });
        }
    };
}

app.get('/users',
    validateQuery(querySchema),
    userController.list
);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Has user input been validated? | Look for `schema.parse()`, `.validate()`, or validation middleware |
| Where is validation? | Route level (middleware) or service level |
| Are types coerced? | `z.coerce.number()` for query params (always strings) |
| Is unknown data stripped? | Look for `stripUnknown: true` |

---

# PART XI — AUTHENTICATION

---

# Chapter 12 — Verifying Identity

## JWT Authentication Middleware

```javascript
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            error: { code: 'UNAUTHORIZED', message: 'Missing or invalid token' }
        });
    }

    const token = authHeader.slice(7);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: { code: 'TOKEN_EXPIRED', message: 'Token has expired' }
            });
        }
        return res.status(401).json({
            error: { code: 'INVALID_TOKEN', message: 'Invalid token' }
        });
    }
}

module.exports = authenticate;
```

## Session Authentication Middleware

```javascript
const sessionStore = require('../services/sessionStore');

function authenticateSession(req, res, next) {
    const sessionId = req.cookies?.sessionId;

    if (!sessionId) {
        return res.status(401).json({
            error: { code: 'UNAUTHORIZED', message: 'Not logged in' }
        });
    }

    const session = sessionStore.get(sessionId);
    if (!session) {
        return res.status(401).json({
            error: { code: 'SESSION_EXPIRED', message: 'Session expired' }
        });
    }

    if (session.expiresAt < Date.now()) {
        sessionStore.delete(sessionId);
        return res.status(401).json({
            error: { code: 'SESSION_EXPIRED', message: 'Session expired' }
        });
    }

    req.user = session.user;
    next();
}
```

## API Key Authentication

```javascript
function authenticateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({
            error: { code: 'MISSING_API_KEY', message: 'API key required' }
        });
    }

    // Look up key in database or cache
    const client = apiKeys.get(apiKey);

    if (!client) {
        return res.status(403).json({
            error: { code: 'INVALID_API_KEY', message: 'Invalid API key' }
        });
    }

    req.client = client;
    next();
}
```

## Authentication Flow

```
Login Request (POST /auth/login)
    ↓
Validate credentials (email + password)
    ↓
Create JWT (sign with secret)
    ↓
Return token to client
    ↓
Client stores token (HttpOnly cookie or memory)
    ↓
Subsequent requests include Authorization: Bearer <token>
    ↓
authenticate middleware verifies token
    ↓
Sets req.user
    ↓
Route handler uses req.user
```

---

# PART XII — AUTHORIZATION

---

# Chapter 13 — Role-Based Access Control

## Authorization Middleware

```javascript
// middleware/authorize.js
function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: { code: 'UNAUTHORIZED', message: 'Authentication required' }
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: {
                    code: 'FORBIDDEN',
                    message: `Requires one of: ${allowedRoles.join(', ')}`
                }
            });
        }

        next();
    };
}

module.exports = authorize;
```

## Usage

```javascript
// Admin only
app.delete('/users/:id',
    authenticate,
    authorize('admin'),
    userController.delete
);

// Admin or moderator
app.put('/posts/:id',
    authenticate,
    authorize('admin', 'moderator'),
    postController.update
);

// Any authenticated user
app.get('/profile',
    authenticate,
    profileController.get
);

// Public (no auth)
app.post('/auth/login', authController.login);
```

## Permission-Based Authorization (More Granular)

```javascript
// Permission definitions
const permissions = {
    'read:users': ['admin', 'moderator', 'viewer'],
    'create:users': ['admin'],
    'delete:users': ['admin'],
    'read:reports': ['admin', 'moderator']
};

function authorizePermission(permission) {
    return (req, res, next) => {
        const userRole = req.user?.role;
        const allowedRoles = permissions[permission];

        if (!allowedRoles?.includes(userRole)) {
            return res.status(403).json({
                error: {
                    code: 'FORBIDDEN',
                    message: `Missing permission: ${permission}`
                }
            });
        }

        next();
    };
}

// Usage
app.delete('/users/:id',
    authenticate,
    authorizePermission('delete:users'),
    userController.delete
);
```

## Resource Ownership

```javascript
function authorizeOwner(options = {}) {
    const { model, paramName = 'id', idType = Number } = options;

    return async (req, res, next) => {
        const resourceId = idType(req.params[paramName]);
        const resource = await model.findById(resourceId);

        if (!resource) {
            return res.status(404).json({
                error: { code: 'NOT_FOUND', message: 'Resource not found' }
            });
        }

        // Allow admin to access any resource
        if (req.user.role === 'admin') {
            req.resource = resource;
            return next();
        }

        // Check ownership
        if (resource.userId !== req.user.id) {
            return res.status(403).json({
                error: { code: 'FORBIDDEN', message: 'You do not own this resource' }
            });
        }

        req.resource = resource;
        next();
    };
}

// Usage — user can only edit their own posts
app.put('/posts/:id',
    authenticate,
    authorizeOwner({ model: Post, paramName: 'id' }),
    postController.update
);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Authentication in place? | Check for `authenticate` middleware |
| Authorization in place? | Check for `authorize` or role check after auth |
| Is it role-based or permission-based? | Roles: group check. Permissions: individual check |
| Is ownership checked? | Can user modify their own resource? |

---

# PART XIII — PASSWORD SECURITY

---

# Chapter 14 — Storing Passwords Correctly

```javascript
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12; // Higher = slower = more secure

async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}

// Registration
async function register(req, res) {
    const { email, password } = req.body;

    const existing = await User.findByEmail(email);
    if (existing) {
        throw new ValidationError('Email already registered');
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
        email,
        password: hashedPassword
    });

    res.status(201).json({ data: { id: user.id, email: user.email } });
    // Never return the password hash
}

// Login
async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
        // Don't reveal whether email exists
        throw new UnauthorizedError('Invalid email or password');
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
        throw new UnauthorizedError('Invalid email or password');
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ data: { token } });
}
```

## Password Policy

```javascript
const passwordSchema = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password is too long')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character')
});

// Check against common passwords
const commonPasswords = new Set(['password', '12345678', 'qwerty123', ...]);
if (commonPasswords.has(password.toLowerCase())) {
    throw new ValidationError('This password is too common');
}
```

---

# PART XIV — CORS

---

# Chapter 15 — Cross-Origin Resource Sharing

## CORS Middleware

```javascript
const cors = require('cors');

// Allow all (development only)
app.use(cors());

// Specific origin
app.use(cors({
    origin: 'https://myapp.com',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Allow cookies/auth headers
    maxAge: 86400       // Cache preflight for 24 hours
}));

// Multiple origins
const allowedOrigins = ['https://app1.com', 'https://app2.com'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Per-route CORS
app.get('/api/public', cors(), (req, res) => {
    res.json({ message: 'Public data — accessible from any origin' });
});

app.get('/api/private', cors({
    origin: 'https://myapp.com'
}), (req, res) => {
    res.json({ message: 'Private data — myapp.com only' });
});
```

---

# PART XV — FILE UPLOADS

---

# Chapter 16 — Handling File Uploads with Multer

## Setup

```javascript
const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError('Only JPEG, PNG, GIF, and WebP images are allowed', 400), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
        files: 5                   // Max 5 files per request
    }
});
```

## Routes

```javascript
// Single file field named 'avatar'
app.post('/upload/avatar',
    authenticate,
    upload.single('avatar'),
    (req, res) => {
        res.json({
            data: {
                filename: req.file.filename,
                size: req.file.size,
                mimetype: req.file.mimetype,
                url: `/uploads/${req.file.filename}`
            }
        });
    }
);

// Multiple files, same field 'photos'
app.post('/upload/photos',
    authenticate,
    upload.array('photos', 10),
    (req, res) => {
        const files = req.files.map(f => ({
            filename: f.filename,
            size: f.size,
            url: `/uploads/${f.filename}`
        }));
        res.json({ data: files });
    }
);

// Multiple fields
app.post('/upload/profile',
    authenticate,
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'gallery', maxCount: 5 }
    ]),
    (req, res) => {
        console.log(req.files['avatar'][0]);
        console.log(req.files['gallery']);
        res.json({ data: req.files });
    }
);

// No file (only form data)
app.post('/upload/no-file',
    upload.none(),
    (req, res) => {
        res.json({ data: req.body });
    }
);
```

## Error Handling for Multer

```javascript
// Multer-specific errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: { code: 'FILE_TOO_LARGE', message: 'File exceeds 5 MB limit' }
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                error: { code: 'TOO_MANY_FILES', message: 'Too many files' }
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                error: { code: 'UNEXPECTED_FILE', message: 'Unexpected file field' }
            });
        }
    }

    next(err);
});
```

## Cloud Storage (S3)

```javascript
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const crypto = require('crypto');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'myapp-uploads',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const id = crypto.randomBytes(16).toString('hex');
            const ext = path.extname(file.originalname);
            cb(null, `uploads/${id}${ext}`);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
});
```

---

# PART XVI — LOGGING

---

# Chapter 17 — Structured Logging

## Winston Logger

```javascript
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()  // Structured JSON logs
    ),
    defaultMeta: { service: 'my-api' },
    transports: [
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
            maxsize: 10 * 1024 * 1024, // 10 MB per file
            maxFiles: 5
        }),
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
            maxsize: 10 * 1024 * 1024,
            maxFiles: 5
        })
    ]
});

// In development, also log to console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger;
```

## Pino (Faster Logger)

```javascript
const pino = require('pino');

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined
});

// Usage
logger.info({ userId: 123, action: 'login' }, 'User logged in');
logger.error({ err, userId: 123 }, 'Failed to process payment');
```

## Request Logging Middleware (Morgan)

```javascript
const morgan = require('morgan');

// Standard Apache combined format
app.use(morgan('combined'));

// Custom format with timing
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

// Write to log file
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs', 'access.log'),
    { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

// Skip logging for health checks
app.use(morgan('combined', {
    skip: (req) => req.url === '/health'
}));
```

## Logging Middleware (Custom)

```javascript
function requestLogger(req, res, next) {
    const start = Date.now();

    // Log on response finish
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logData = {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            userId: req.user?.id
        };

        if (res.statusCode >= 500) {
            logger.error(logData, 'Request failed');
        } else if (res.statusCode >= 400) {
            logger.warn(logData, 'Client error');
        } else {
            logger.info(logData, 'Request completed');
        }
    });

    next();
}

app.use(requestLogger);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Where are failures recorded? | Check logging middleware and error logger |
| Structured or plain? | Structured (JSON) is better for log aggregation |
| Is request ID tracked? | Look for `req.id` or correlation ID |
| Are errors logged with stack traces? | Check `winston.format.errors({ stack: true })` |

---

# PART XVII — CACHING

---

# Chapter 18 — Response Caching

## In-Memory Cache Middleware

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // 60 second default TTL

function cacheMiddleware(duration) {
    return (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        const key = req.originalUrl;
        const cached = cache.get(key);

        if (cached) {
            // Log cache hit
            logger.debug({ key }, 'Cache hit');
            return res.json(cached);
        }

        // Override res.json to cache the response
        const originalJson = res.json.bind(res);
        res.json = (body) => {
            cache.set(key, body, duration);
            originalJson(body);
        };

        next();
    };
}

// Usage
app.get('/api/users',
    cacheMiddleware(300), // Cache for 5 minutes
    userController.list
);
```

## Redis Cache Middleware

```javascript
const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

async function redisCache(duration) {
    return async (req, res, next) => {
        if (req.method !== 'GET') {
            return next();
        }

        const key = `cache:${req.originalUrl}`;

        try {
            const cached = await client.get(key);
            if (cached) {
                logger.debug({ key }, 'Redis cache hit');
                return res.json(JSON.parse(cached));
            }
        } catch (err) {
            logger.error({ err }, 'Redis cache error — falling through');
            // Don't fail request if Redis is down
        }

        const originalJson = res.json.bind(res);
        res.json = (body) => {
            client.setEx(key, duration, JSON.stringify(body)).catch(() => {});
            originalJson(body);
        };

        next();
    };
}
```

## Cache Invalidation

```javascript
// After a write, invalidate related caches
async function invalidateCache(pattern) {
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
        await client.del(keys);
    }
}

app.post('/users', async (req, res, next) => {
    try {
        const user = await userService.create(req.body);
        await invalidateCache('cache:/api/users*');
        res.status(201).json({ data: user });
    } catch (err) {
        next(err);
    }
});
```

---

# PART XVIII — RATE LIMITING

---

# Chapter 19 — Rate Limiting Middleware

```javascript
const rateLimit = require('express-rate-limit');

// Global limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,                    // 100 requests per window
    standardHeaders: true,       // Return rate limit info in headers
    legacyHeaders: false,
    message: {
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests, please try again later'
        }
    }
});

app.use(globalLimiter);

// Strict limiter for auth endpoints
const authLimiter = rateLimit({
    windowMs: 60 * 1000,    // 1 minute
    max: 5,                  // 5 attempts per minute
    skipSuccessfulRequests: false,
    message: {
        error: {
            code: 'AUTH_RATE_LIMIT',
            message: 'Too many login attempts. Try again in 1 minute.'
        }
    }
});

app.use('/auth/login', authLimiter);

// Per-route custom limiter
const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    keyGenerator: (req) => {
        // Rate limit by user ID if authenticated, or by IP
        return req.user?.id || req.ip;
    }
});

app.use('/api', apiLimiter);
```

## Header Response

```text
RateLimit-Limit: 100
RateLimit-Remaining: 87
RateLimit-Reset: 1682345678
Retry-After: 360
```

---

# PART XIX — COMPRESSION

---

# Chapter 20 — Response Compression

```javascript
const compression = require('compression');

// Compress all responses
app.use(compression());

// Compress with options
app.use(compression({
    level: 6,                   // Compression level (0-9)
    threshold: 1024,            // Minimum response size in bytes
    filter: (req, res) => {
        // Don't compress if client sends x-no-compression header
        if (req.headers['x-no-compression']) {
            return false;
        }
        // Use default filter (compress text/json/html)
        return compression.filter(req, res);
    }
}));

// For large JSON responses
// Before: 2.3 MB
// After gzip: 180 KB
// 92% reduction
```

---

# PART XX — SECURITY HEADERS

---

# Chapter 21 — Helmet

```javascript
const helmet = require('helmet');

// All default security headers
app.use(helmet());

// Specific configuration
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://trusted-cdn.com"],
            connectSrc: ["'self'", "https://api.example.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"]
        }
    },
    referrerPolicy: { policy: 'same-origin' },
    crossOriginEmbedderPolicy: false
}));
```

## Headers Set by Helmet

```text
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=15552000; includeSubDomains
Referrer-Policy: no-referrer
Permissions-Policy: geolocation=(), microphone=()
```

---

# PART XXI — ENVIRONMENT VARIABLES

---

# Chapter 22 — Configuration Management

```javascript
// config/index.js
const path = require('path');

// Load .env file in development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

const config = {
    env: process.env.NODE_ENV || 'development',

    server: {
        port: parseInt(process.env.PORT, 10) || 3000,
        host: process.env.HOST || '0.0.0.0'
    },

    database: {
        url: process.env.DATABASE_URL,
        pool: {
            min: parseInt(process.env.DB_POOL_MIN, 10) || 2,
            max: parseInt(process.env.DB_POOL_MAX, 10) || 10
        }
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    },

    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    },

    cors: {
        origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000']
    },

    log: {
        level: process.env.LOG_LEVEL || 'info'
    },

    upload: {
        maxSize: parseInt(process.env.UPLOAD_MAX_SIZE, 10) || 5 * 1024 * 1024,
        directory: process.env.UPLOAD_DIR || 'uploads'
    }
};

// Validate required config
function validateConfig() {
    const required = ['DATABASE_URL', 'JWT_SECRET'];
    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

validateConfig();

module.exports = config;
```

## .env.example

```env
# Server
PORT=3000
NODE_ENV=development
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
DB_POOL_MIN=2
DB_POOL_MAX=10

# JWT
JWT_SECRET=your-256-bit-secret-here
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://localhost:6379

# CORS
CORS_ORIGIN=http://localhost:3000,https://myapp.com

# Logging
LOG_LEVEL=debug

# Upload
UPLOAD_MAX_SIZE=5242880
UPLOAD_DIR=uploads
```

## Never Hardcode Secrets

```javascript
// BAD
const secret = 'my-super-secret-key-12345';

// GOOD
const secret = process.env.JWT_SECRET;

// EVEN BETTER: use env validation
const secret = require('./config').jwt.secret;
```

---

# PART XXII — API DESIGN

---

# Chapter 23 — Consistent API Responses

## Standard Response Format

```javascript
// Success response
{
    "data": { ... },           // Single object
    // OR
    "data": [ ... ],           // Array
    "meta": {                  // Pagination info (for lists)
        "page": 1,
        "limit": 20,
        "total": 150,
        "totalPages": 8
    }
}

// Error response
{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid input",
        "details": [
            { "field": "email", "message": "Must be a valid email" }
        ]
    }
}
```

## Response Helpers

```javascript
class ApiResponse {
    static success(res, data, statusCode = 200, meta = null) {
        const response = { data };
        if (meta) response.meta = meta;
        return res.status(statusCode).json(response);
    }

    static created(res, data) {
        return this.success(res, data, 201);
    }

    static noContent(res) {
        return res.status(204).send();
    }

    static paginated(res, data, pagination) {
        return res.status(200).json({
            data,
            meta: pagination
        });
    }
}

// Usage in controller
class UserController {
    async list(req, res, next) {
        try {
            const result = await userService.getAll(req.query);
            return ApiResponse.paginated(res, result.data, result.pagination);
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const user = await userService.getById(req.params.id);
            return ApiResponse.success(res, user);
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const user = await userService.create(req.body);
            return ApiResponse.created(res, user);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await userService.delete(req.params.id);
            return ApiResponse.noContent(res);
        } catch (err) {
            next(err);
        }
    }
}
```

## Naming Conventions

| ✅ Good | ❌ Bad |
|---------|--------|
| `GET /users` | `GET /getAllUsers` |
| `GET /users/:id` | `GET /getUser?id=5` |
| `POST /users` | `POST /createNewUser` |
| `GET /users/:id/orders` | `GET /getOrdersListForUser` |
| `PATCH /users/:id` | `POST /updateUser` |
| `DELETE /users/:id` | `POST /removeUser` |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the format consistent? | Check response structure across all endpoints |
| Is pagination included? | Check `meta` in list responses |
| Are errors consistent? | Check error format: `{ error: { code, message } }` |

---

# PART XXIII — PAGINATION

---

# Chapter 24 — Consistent Pagination

## Offset Pagination Middleware

```javascript
function paginate(defaultLimit = 20, maxLimit = 100) {
    return (req, res, next) => {
        let page = parseInt(req.query.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || defaultLimit;

        // Validate
        if (page < 1) page = 1;
        if (limit < 1) limit = 1;
        if (limit > maxLimit) limit = maxLimit;

        const offset = (page - 1) * limit;

        req.pagination = { page, limit, offset };
        next();
    };
}

// Usage
app.get('/users',
    paginate(20, 100),
    userController.list
);

// Controller
async list(req, res, next) {
    try {
        const { page, limit, offset } = req.pagination;
        const { rows, count } = await userRepository.findAndCount({
            limit,
            offset,
            where: req.query.filter
        });

        return ApiResponse.paginated(res, rows, {
            page,
            limit,
            total: count,
            totalPages: Math.ceil(count / limit)
        });
    } catch (err) {
        next(err);
    }
}
```

---

# PART XXIV — VERSIONING

---

# Chapter 25 — API Versioning Strategies

## URL Versioning

```javascript
// routes/v1/users.js
router.get('/users', v1UserController.list);

// routes/v2/users.js
router.get('/users', v2UserController.list);

// app.js
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
```

## Express Versioning Middleware

```javascript
function apiVersion(version) {
    return (req, res, next) => {
        req.apiVersion = version;
        next();
    };
}

// Version-specific logic in controller
class UserController {
    async list(req, res, next) {
        try {
            const users = await userService.getAll();

            if (req.apiVersion === 1) {
                // V1: return only name and email
                return ApiResponse.success(res,
                    users.map(u => ({ name: u.name, email: u.email }))
                );
            }

            // V2: return full user data
            return ApiResponse.success(res, users);
        } catch (err) {
            next(err);
        }
    }
}
```

---

# PART XXV — DOCUMENTATION

---

# Chapter 26 — OpenAPI / Swagger

```javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation'
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Development' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./routes/*.js', './controllers/*.js'] // JSDoc comments
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

## JSDoc Annotations

```javascript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get('/users', authenticate, userController.list);
```

---

# PART XXVI — TESTING

---

# Chapter 27 — Testing Express Applications

## Unit Testing Services

```javascript
const { UserService } = require('./userService');

// Mock repository
const mockRepo = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn()
};

const userService = new UserService(mockRepo);

test('getAll returns users from repository', async () => {
    const expected = [{ id: 1, name: 'Alice' }];
    mockRepo.findAll.mockResolvedValue(expected);

    const result = await userService.getAll();

    expect(result).toEqual(expected);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
});

test('getById throws NotFoundError for missing user', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(userService.getById(999))
        .rejects
        .toThrow('User not found');
});
```

## Integration Testing Endpoints

```javascript
const request = require('supertest');
const app = require('../app');

describe('GET /api/users', () => {
    test('returns 200 with users list', async () => {
        const res = await request(app)
            .get('/api/users')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('returns 401 without auth token', async () => {
        const res = await request(app)
            .get('/api/users/me')
            .expect(401);

        expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    test('returns 403 for insufficient role', async () => {
        const token = generateToken({ role: 'viewer' });

        const res = await request(app)
            .delete('/api/users/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(403);

        expect(res.body.error.code).toBe('FORBIDDEN');
    });
});
```

## Test Database Setup

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

beforeEach(async () => {
    // Clean database before each test
    await prisma.user.deleteMany();
    await prisma.post.deleteMany();
});

afterAll(async () => {
    await prisma.$disconnect();
});
```

---

# PART XXVII — OBSERVABILITY

---

# Chapter 28 — Logs, Metrics, Traces

## Health Check Endpoint

```javascript
app.get('/health', async (req, res) => {
    const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    };

    try {
        // Check database
        await prisma.$queryRaw`SELECT 1`;
        health.database = 'connected';
    } catch (err) {
        health.database = 'disconnected';
        health.status = 'degraded';
    }

    try {
        // Check Redis
        await redisClient.ping();
        health.redis = 'connected';
    } catch (err) {
        health.redis = 'disconnected';
        health.status = 'degraded';
    }

    const statusCode = health.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(health);
});
```

## Prometheus Metrics

```javascript
const prometheus = require('prom-client');

// Collect default metrics (CPU, memory, etc.)
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ register: prometheus.register });

// Custom metrics
const httpRequestDuration = new prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
});

const httpRequestTotal = new prometheus.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status']
});

// Middleware to record metrics
app.use((req, res, next) => {
    const end = httpRequestDuration.startTimer();

    res.on('finish', () => {
        const route = req.route?.path || req.originalUrl;
        const labels = {
            method: req.method,
            route,
            status: res.statusCode
        };

        httpRequestTotal.inc(labels);
        end(labels);
    });

    next();
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.send(await prometheus.register.metrics());
});
```

---

# PART XXVIII — DEPENDENCY INJECTION

---

# Chapter 29 — Loose Coupling

## Without DI (Tight Coupling)

```javascript
// Tight coupling — hard to test, hard to swap implementations
class UserController {
    constructor() {
        this.userService = new UserService(); // Direct instantiation
    }
}

class UserService {
    constructor() {
        this.repository = new UserRepository(); // Direct instantiation
    }
}

class UserRepository {
    constructor() {
        this.db = new PrismaClient(); // Direct instantiation
    }
}
```

## With DI (Loose Coupling)

```javascript
// Dependency Injection — dependencies passed from outside
class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async list(req, res, next) {
        try {
            const users = await this.userService.getAll();
            return ApiResponse.success(res, users);
        } catch (err) {
            next(err);
        }
    }
}

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getAll() {
        return this.userRepository.findAll();
    }
}

class UserRepository {
    constructor(db) {
        this.db = db;
    }

    async findAll() {
        return this.db.user.findMany();
    }
}

// Wiring it all together (composition root)
const db = new PrismaClient();
const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Routes
router.get('/users', (req, res, next) => userController.list(req, res, next));
```

## Testing with DI

```javascript
// Test with mock
const mockRepo = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Test' }])
};

const service = new UserService(mockRepo);
const controller = new UserController(service);

const req = {};
const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
const next = jest.fn();

await controller.list(req, res, next);

expect(res.json).toHaveBeenCalledWith({ data: [{ id: 1, name: 'Test' }] });
```

---

# PART XXIX — REVERSE ENGINEERING CODING TACTICS

When reading:

```javascript
app.post("/users", authenticate, validate(createUserSchema), userController.create)
```

Ask:

---

### Input source?

`req.params`, `req.query`, `req.body`, `req.headers` — which one?

---

### Validation?

Is `zod`/`joi`/`yup` being used? What rules? What happens on validation failure?

---

### Authentication?

Which auth middleware? JWT? Session? API key?

---

### Authorization?

Role check? Permission check? Ownership check?

---

### Controller?

Function name → likely calls a service.

---

### Service?

Where is business logic? Does it throw `AppError`?

---

### Repository?

Where is database accessed? Prisma? Raw SQL?

---

### Database query?

Which tables are read/written? What SQL does it generate?

---

### Transaction needed?

Multiple writes that must be atomic?

---

### Cache involved?

Is response cached? Cache invalidated on write?

---

### Logging?

Structured logs? Request ID? Error stack traces?

---

### Metrics?

Request duration? Status codes? Custom metrics?

---

### Error handling?

Centralized `(err, req, res, next)` handler? `AppError` class?

---

### Response format?

`{ data, meta }`? `{ error }`? Consistent?

---

### Status code?

200, 201, 204, 400, 401, 403, 404, 409, 500?

---

### Security risks?

Input validated? Auth required? SQL injection possible? HTTPS?

---

### Performance bottleneck?

N+1 queries? Missing indexes? No pagination? Large payload?

---

### Pagination needed?

List endpoint without pagination = potential OOM.

---

### Rate limiting?

Auth endpoints should have strict limits.

---

### Compression?

Large responses should be compressed.

---

### Monitoring?

Health check? Metrics endpoint?

---

### Versioning?

`/v1/` or `/v2/`? Breaking changes handled?

---

# SENIOR ENGINEER MENTAL MODEL

Never think:

```
Route
```

Think:

```
HTTP Request
    ↓
    1. Compression middleware (decompress)
    2. CORS middleware (check origin)
    3. Security headers (helmet)
    4. Body parser (JSON, urlencoded)
    5. Request logging (Morgan)
    6. Rate limiter
    7. Authentication (JWT/session)
    8. Authorization (role/permission)
    9. Validation (Zod/Joi)
    10. Route matching
    11. Controller
        ↓
    12. Service (business logic)
        ↓
    13. Repository (data access)
        ↓
    14. Database
        ↓
    15. Response
    16. Cache (if GET)
    17. Log response
    18. Record metrics
```

---

# PROJECTS

---

### 1. Blog API

Build a complete blog API with Express.

- **Auth**: JWT-based registration/login.
- **CRUD**: Posts, comments, users.
- **Relationships**: User has many posts, post has many comments.
- **Pagination**: Offset-based on post listing.
- **Validation**: Zod schemas for all inputs.
- **Error handling**: Centralized error middleware.
- **Layered**: Controllers → Services → Repositories.
- **Logging**: Morgan + Winston.
- **Testing**: Jest + Supertest.

---

### 2. JWT Authentication System

- `POST /auth/register` — create user with bcrypt-hashed password.
- `POST /auth/login` — return access token + refresh token.
- `POST /auth/refresh` — issue new access token.
- `POST /auth/logout` — invalidate refresh token.
- `GET /auth/me` — return current user from JWT payload.
- **Security**: Rate limiting on login, password strength validation, HttpOnly cookies for refresh token.

---

### 3. Role-Based Access Control

Extend the auth system with roles.

- Roles: `admin`, `moderator`, `user`.
- Permissions: `read:users`, `create:users`, `delete:users`, `read:posts`, `create:posts`, `delete:posts`.
- Middleware: `authorize('admin')`, `authorizePermission('delete:users')`.
- Admin panel routes that only admin can access.
- Ownership check: users can edit their own posts but not others'.

---

### 4. File Upload Service

- Upload: single, multiple, field-named.
- Validation: file type (MIME), file size.
- Storage: disk (local) or cloud (S3).
- Processing: image resizing (Sharp), thumbnail generation.
- Serving: static file serving via Express.
- Security: scan uploads, sanitize filenames, limit concurrency.

---

### 5. Redis Cache Layer

- Middleware: cache GET responses with configurable TTL.
- Tag-based invalidation: `POST /users` invalidates `cache:/api/users*`.
- Metrics: cache hit/miss ratio endpoint.
- Graceful fallback: if Redis is down, pass through to DB.
- Cache warming: pre-populate cache on startup for hot endpoints.

---

### 6. Rate Limiter

- Global: 100 req/15min per IP.
- Auth: 5 req/min per IP.
- Per-user: 30 req/min for authenticated users.
- Custom response: `Retry-After` header, proper error code.
- Redis-backed: shared state across multiple server instances.
- Dashboard: view current rate limit status for all users.

---

### 7. Logging System

- Structured JSON logs (Winston or Pino).
- Log levels: debug, info, warn, error.
- Request logging: method, URL, status, duration, user agent.
- Error logging: stack traces, request context.
- Log rotation: max 10 MB per file, keep 5 files.
- Correlation ID: UUID per request, passed to all logs.

---

### 8. Error Handling Framework

- `AppError` base class with `statusCode`, `code`, `isOperational`.
- Specific errors: `NotFoundError`, `ValidationError`, `UnauthorizedError`, `ForbiddenError`.
- Error middleware: catch all, format response, log.
- Async handler wrapper: catch promise rejections.
- 404 handler for unmatched routes.
- Development mode: include stack traces in response.

---

### 9. API Documentation Generator

- OpenAPI 3.0 specification.
- Swagger UI at `/api-docs`.
- JSDoc annotations on all routes.
- Tag organization (Users, Posts, Auth).
- Request/response schemas.
- Authentication flow documented.

---

### 10. Monitoring Dashboard

- Health check endpoint: DB, Redis, uptime.
- Prometheus metrics: request count, duration histogram, memory usage.
- Metrics dashboard endpoint (`/metrics`).
- Custom metrics: user registrations, orders placed.
- Alert triggers: >5% error rate, >1s p99 latency.

---

### 11. Production REST API

Combine everything into a production-grade API.

- **Transport**: HTTPS (or behind Nginx reverse proxy).
- **Middleware**: Helmet, CORS, Compression, Morgan, Rate limiter, Auth.
- **Layers**: Controller → Service → Repository.
- **Database**: PostgreSQL with Prisma ORM.
- **Cache**: Redis for frequently accessed data.
- **Validation**: Zod for all inputs.
- **Error handling**: Centralized with custom errors.
- **Testing**: Unit + Integration + E2E.
- **CI/CD**: GitHub Actions, Docker.

---

### 12. Multi-layer Backend Architecture

Build a complete system demonstrating all layers:

```
Client (React/Vanilla HTML)
    │
API Gateway (Express router)
    │
Controllers (parse request, call service)
    │
Services (business rules, orchestration)
    │
Repositories (database queries)
    │
Database (PostgreSQL + Redis)
    │
Logging → Elasticsearch (or files)
Metrics → Prometheus
Authentication → JWT
```

Each layer is independently testable, swappable, and follows single responsibility.

---

# Next Part (Part 17)

We enter one of the largest and deepest sections in the JavaScript ecosystem:

# TypeScript Ecosystem and Advanced Type Engineering

Including absolutely everything:

- Type System
- Compiler Internals
- Generics
- Utility Types
- Conditional Types
- Mapped Types
- Type Inference
- Declaration Files
- Modules
- Decorators
- Advanced Patterns
- Type-Level Programming
- Reverse Engineering Coding Tactics used by senior TypeScript engineers

This is where JavaScript evolves into large-scale enterprise engineering.
