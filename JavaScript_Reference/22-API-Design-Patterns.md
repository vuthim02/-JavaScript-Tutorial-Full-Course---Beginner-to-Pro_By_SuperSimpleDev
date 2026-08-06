# 22 - API Design Patterns: REST, GraphQL, tRPC, WebSocket, SSE

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

## Table of Contents
- [PART 1 - REST API](#part-1---rest-api)
  - [1. REST Principles](#1-rest-principles)
  - [2. RESTful URL Design](#2-restful-url-design)
  - [3. Express.js REST API](#3-expressjs-rest-api)
  - [4. Input Validation](#4-input-validation)
  - [5. Pagination](#5-pagination)
  - [6. Filtering and Sorting](#6-filtering-and-sorting)
  - [7. Rate Limiting](#7-rate-limiting)
  - [8. Versioning Strategies](#8-versioning-strategies)
  - [9. CORS Configuration](#9-cors-configuration)
  - [10. API Documentation](#10-api-documentation)
- [PART 2 - GraphQL](#part-2---graphql)
  - [11. GraphQL Basics](#11-graphql-basics)
  - [12. Apollo Server](#12-apollo-server)
  - [13. Apollo Client](#13-apollo-client)
  - [14. Schema Design](#14-schema-design)
  - [15. DataLoader: N+1 Problem](#15-dataloader-n1-problem)
  - [16. Authentication in GraphQL](#16-authentication-in-graphql)
  - [17. File Uploads](#17-file-uploads)
  - [18. Subscriptions (WebSocket)](#18-subscriptions-websocket)
  - [19. Federation](#19-federation)
  - [20. REST vs GraphQL vs tRPC](#20-rest-vs-graphql-vs-trpc)
- [PART 3 - tRPC](#part-3---trpc)
  - [21. tRPC Basics](#21-trpc-basics)
  - [22. tRPC with React Query](#22-trpc-with-react-query)
  - [23. End-to-End Type Safety](#23-end-to-end-type-safety)
  - [24. Subscriptions](#24-subscriptions)
  - [25. Middleware](#25-middleware)
- [PART 4 - WebSocket API](#part-4---websocket-api)
  - [26. WebSocket Basics](#26-websocket-basics)
  - [27. Socket.IO](#27-socketio)
  - [28. Real-Time Patterns](#28-real-time-patterns)
- [PART 5 - Server-Sent Events](#part-5---server-sent-events)
  - [29. EventSource API](#29-eventsource-api)
  - [30. SSE Patterns](#30-sse-patterns)
- [PART 6 - API Patterns](#part-6---api-patterns)
  - [31. API Gateway Pattern](#31-api-gateway-pattern)
  - [32. Backend for Frontend (BFF)](#32-backend-for-frontend-bff)
  - [33. Idempotency Keys](#33-idempotency-keys)
  - [34. Webhooks](#34-webhooks)
  - [35. Long Polling vs WebSocket vs SSE](#35-long-polling-vs-websocket-vs-sse)

---

# PART 1 - REST API

## 1. REST Principles

REST (Representational State Transfer) is an architectural style defined by Roy Fielding in 2000. It is built on six constraints that, when applied together, embrace locality of simplicity while providing scaleable architecture.

### Six REST Constraints

1. **Client-Server** — Separation of concerns between UI (client) and data storage (server). They evolve independently.
2. **Stateless** — Each request from client to server must contain all information needed. The server stores no client context between requests.
3. **Cacheable** — Responses must define themselves as cacheable or not. Improves performance and scalability.
4. **Uniform Interface** — The fundamental constraint. All resources accessed through a standardized interface (URIs, HTTP methods, representations).
5. **Layered System** — A client cannot ordinarily tell whether it is connected directly to the server or through intermediaries (load balancers, proxies).
6. **Code on Demand (optional)** — Servers can temporarily extend client functionality by transferring executable code (JavaScript, etc.).

### Resources

In REST, everything is a resource. A resource is any concept that can be named and addressed: a user, a blog post, an order, a configuration setting. Each resource has:
- A unique identifier (its URL)
- One or more representations (JSON, XML, HTML)
- Metadata (headers, status codes)

Clients interact with representations of resources, never directly with the resource itself.

### HTTP Methods

| Method | Purpose | Idempotent | Safe | Request Body | Typical Status Codes |
|--------|---------|------------|------|-------------|---------------------|
| `GET` | Retrieve a resource or collection | Yes | Yes | No | 200, 304, 404 |
| `POST` | Create a new resource | No | No | Yes | 201, 202, 409 |
| `PUT` | Replace a resource entirely | Yes | No | Yes (complete) | 200, 201, 404 |
| `PATCH` | Partially update a resource | Depends | No | Yes (partial) | 200, 422 |
| `DELETE` | Remove a resource | Yes | No | Optional | 204, 404 |
| `HEAD` | Same as GET but no body | Yes | Yes | No | Same as GET |
| `OPTIONS` | Describe communication options | Yes | Yes | No | 200, 204 |

### HTTP Status Codes

**2xx Success:**
- `200 OK` — Successful GET, PUT, PATCH with response body
- `201 Created` — Successful POST; include `Location` header pointing to new resource
- `202 Accepted` — Request accepted, processing async; include URL to check status
- `204 No Content` — Successful DELETE; no response body

**3xx Redirection:**
- `304 Not Modified` — Resource unchanged since last request (used with ETags)

**4xx Client Errors:**
- `400 Bad Request` — Malformed JSON, missing required fields, type mismatches
- `401 Unauthorized` — Missing or invalid credentials ("who are you?")
- `403 Forbidden` — Authenticated but lacks permission ("I know who you are, you can't do this")
- `404 Not Found` — Resource does not exist
- `405 Method Not Allowed` — HTTP method not supported for this endpoint
- `409 Conflict` — Duplicate creation or version mismatch
- `422 Unprocessable Entity` — Valid JSON but business rule violation
- `429 Too Many Requests` — Rate limit exceeded; include `Retry-After` header

**5xx Server Errors:**
- `500 Internal Server Error` — Unhandled server exception; never expose stack traces
- `502 Bad Gateway` — Downstream dependency returned an error
- `503 Service Unavailable` — Server temporarily unavailable; include `Retry-After`
- `504 Gateway Timeout` — Upstream server did not respond in time

### HATEOAS (Hypermedia As The Engine Of Application State)

HATEOAS embeds navigational links in responses so clients can discover related actions without hardcoding URLs.

```json
{
  "id": "99",
  "status": "pending",
  "total": 149.99,
  "_links": {
    "self": {"href": "/api/v1/orders/99"},
    "customer": {"href": "/api/v1/customers/42"},
    "items": {"href": "/api/v1/orders/99/items"},
    "cancel": {"href": "/api/v1/orders/99/cancel", "method": "POST"},
    "pay": {"href": "/api/v1/orders/99/pay", "method": "POST"}
  }
}
```

**When to use HATEOAS:**
- Public APIs consumed by unknown third parties — HIGH value
- APIs with complex state machines (orders, workflows) — HIGH value
- Internal APIs between your own services — LOW value
- Simple CRUD APIs — LOW value
- APIs that change URL structure frequently — HIGH value

> Most "REST" APIs are Level 2 (resources + HTTP methods) on the Richardson Maturity Model. Full HATEOAS (Level 3) is rarely implemented in practice.

### Richardson Maturity Model

| Level | Description | Example |
|-------|-------------|---------|
| 0 | HTTP as transport tunnel | `POST /api` with SOAP envelope |
| 1 | Resources | `POST /api/orders` |
| 2 | Resources + HTTP methods | `GET /api/orders`, `POST /api/orders` |
| 3 | HATEOAS | Response includes links for available transitions |

---

## 2. RESTful URL Design

### Naming Conventions

| Pattern | Example | Notes |
|---------|---------|-------|
| Collection | `/users` | Plural noun, lowercase |
| Single resource | `/users/42` | Identifier in the path |
| Nested resource | `/users/42/orders` | Max 2 levels of nesting |
| Filtering | `/orders?status=pending` | Query params for filters |
| Avoid | `/getUser`, `/createOrder` | Verbs belong in HTTP methods |

**Rules:**
- Use **plural nouns** for collections: `/users`, `/orders`, `/products`
- Use **kebab-case** for multi-word resources: `/blog-posts`, `/order-items`
- Use **lowercase** for all URIs
- Nest only when there is a true parent-child relationship
- Keep nesting shallow — two levels maximum
- Total URI must not exceed 2000 characters

### Resource URIs

```
GET    /articles          → List articles (collection)
GET    /articles/7        → Get article 7 (single resource)
POST   /articles          → Create a new article
PUT    /articles/7        → Replace article 7 entirely
PATCH  /articles/7        → Partially update article 7
DELETE /articles/7        → Delete article 7
```

### Relationship Patterns

```
GET    /users/42/orders       → Orders for user 42
GET    /orders/99/customer    → Customer of order 99
GET    /orders/99/items       → Items in order 99
```

Avoid deep nesting like `/customers/1/orders/99/products` — use flat lookups instead.

### Query Parameters

| Parameter | Purpose | Example |
|-----------|---------|---------|
| `q` | Full-text search | `?q=search+term` |
| `sort` | Sort order | `?sort=price,-createdAt` |
| `fields` | Field selection (sparse fieldsets) | `?fields=id,name,email` |
| `limit` | Page size | `?limit=20` |
| `offset` | Offset for pagination | `?offset=40` |
| `cursor` | Opaque pagination cursor | `?cursor=eyJpZCI6MTIzfQ==` |
| `embed` | Expand embedded sub-entities | `?embed=author,comments` |

### Query Parameter Conventions

- Use `snake_case` for query parameters: `?created_at=2026-01-01`
- Use `camelCase` for JSON body fields: `{ "createdAt": "2026-01-01" }`
- Pick one style and be consistent
- Boolean values should be `true`/`false`, not `1`/`0`

---

## 3. Express.js REST API

### Project Structure

```
project-root/
├── src/
│   ├── app.js              # Express configuration
│   ├── server.js            # Server start
│   ├── routes/              # Route definitions
│   │   ├── index.js         # Main router
│   │   ├── auth.routes.js
│   │   └── users.routes.js
│   ├── controllers/         # Route logic
│   │   ├── auth.controller.js
│   │   └── users.controller.js
│   ├── middleware/           # Custom middleware
│   │   ├── errorHandler.js
│   │   ├── auth.middleware.js
│   │   └── validate.middleware.js
│   ├── models/              # Data schemas
│   ├── services/            # Business logic
│   ├── utils/               # Helper functions
│   └── config/              # Configurations
├── tests/
├── .env
└── package.json
```

### Express.js Setup

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// 1. Global middleware
app.use(helmet());
app.use(cors({ origin: config.cors.allowedOrigins, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// 2. Health check (before rate limiter)
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 3. Rate limiting
app.use('/api', rateLimit({ windowMs: 15 * 60000, max: 100 }));

// 4. Routes
app.use('/api', routes);

// 5. 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// 6. Error handler (MUST be last, MUST have 4 params)
app.use(errorHandler);

module.exports = app;
```

### Route Organization

```javascript
// src/routes/index.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./users.routes');
const productRoutes = require('./products.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);

module.exports = router;
```

```javascript
// src/routes/users.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const validators = require('../validators/users');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validators.create, validate, controller.create);
router.put('/:id', auth, validators.update, validate, controller.update);
router.delete('/:id', auth, controller.delete);

module.exports = router;
```

### Middleware Order

1. Global middleware (body-parser, cors, logging) — before anything else
2. Authentication middleware — if the route requires it
3. Validation middleware — before calling the controller
4. Controller — the final logic
5. Error handler — at the bottom, to catch everything

### Error Handler

```javascript
// src/middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Custom API error
  if (err.name === 'ApiError') {
    return res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message, details: err.details }
    });
  }

  // JSON parse error
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_JSON', message: 'Request body contains invalid JSON' }
    });
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message: 'Authentication token is invalid' }
    });
  }

  // Fallback
  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : err.message
    }
  });
}

module.exports = errorHandler;
```

### Async Handler Wrapper

```javascript
// src/utils/asyncHandler.js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage in controller:
exports.getAll = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ success: true, data: users });
});
```

### Custom Error Class

```javascript
// src/utils/HttpError.js
class HttpError extends Error {
  constructor(statusCode, message, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || 'ERROR';
  }

  static notFound(msg = 'Resource not found') {
    return new HttpError(404, msg, 'NOT_FOUND');
  }

  static unauthorized(msg = 'Unauthorized') {
    return new HttpError(401, msg, 'UNAUTHORIZED');
  }

  static forbidden(msg = 'Forbidden') {
    return new HttpError(403, msg, 'FORBIDDEN');
  }

  static badRequest(msg = 'Bad request') {
    return new HttpError(400, msg, 'BAD_REQUEST');
  }

  static conflict(msg = 'Conflict') {
    return new HttpError(409, msg, 'CONFLICT');
  }
}

module.exports = HttpError;
```

### JWT Authentication Middleware

```javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config');
const ApiError = require('../utils/HttpError');

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('No token provided'));
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    next(ApiError.unauthorized('Invalid or expired token'));
  }
}

module.exports = auth;
```

---

## 4. Input Validation

### Joi vs Zod vs Express-Validator Comparison

| Criteria | Joi | Zod | Express-Validator |
|----------|-----|-----|-------------------|
| Primary Focus | Robust object schema validation | TypeScript-first schema validation & type inference | Express middleware for request validation |
| Schema Definition | Chainable API | Chainable, similar to Joi | Validation chain in middleware |
| TypeScript Support | Good (requires separate types) | Excellent (automatic type inference) | Good |
| Sanitization | Built-in (coercion, trimming) | Limited | Extensive (built on `validator.js`) |
| Dependencies | Yes (`@hapi/joi`) | Zero | Yes (`validator.js`) |
| Error Handling | Detailed, customizable | User-friendly, structured | Attaches to Express request |
| Best For | Complex validation logic | TypeScript projects | Quick Express integration |

### Zod (Recommended for TypeScript)

```typescript
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(18).optional(),
  role: z.enum(['admin', 'user', 'moderator']),
});

// Type is automatically inferred
type CreateUser = z.infer<typeof CreateUserSchema>;
// { name: string; email: string; age?: number; role: 'admin' | 'user' | 'moderator' }

// Validation middleware
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({
        success: false,
        errors: result.error.flatten().fieldErrors
      });
    }
    req.body = result.data; // Replace with typed/coerced version
    next();
  };
}

// Usage
router.post('/', validate(CreateUserSchema), controller.create);
```

### Joi

```javascript
const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18),
  role: Joi.string().valid('admin', 'user', 'moderator').required(),
});

// Validation middleware
function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(d => ({
        field: d.path.join('.'),
        message: d.message
      }));
      return res.status(422).json({ success: false, errors });
    }
    next();
  };
}

router.post('/', validate(createUserSchema), controller.create);
```

### Express-Validator

```javascript
const { body, validationResult } = require('express-validator');

router.post('/',
  body('name').isLength({ min: 1, max: 100 }).trim(),
  body('email').isEmail().normalizeEmail(),
  body('age').optional().isInt({ min: 18 }),
  body('role').isIn(['admin', 'user', 'moderator']),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
      });
    }
    // Proceed with validated data
  }
);
```

### Validation Best Practices

- Validate `body`, `query`, `params`, and `headers` — not just `body`
- After validation, replace `req.body` with the typed/coerced version
- Use `.strict()` (Zod) to prevent unwanted type coercion
- Don't put domain rules (ownership, balance checks) in schemas
- Use discriminated unions for complex conditional validation
- Reject unknown fields to prevent prototype pollution

---

## 5. Pagination

### Three Main Strategies

#### Offset Pagination

```sql
SELECT * FROM posts ORDER BY created_at DESC LIMIT 20 OFFSET 100;
```

```json
{
  "data": [...],
  "meta": {
    "total": 1000,
    "page": 6,
    "pageSize": 20,
    "totalPages": 50
  }
}
```

**Pros:** Simple, random access ("page 5 of 50"), works with any sorting
**Cons:** Degrades to O(n) at deep pages, inconsistent during writes (skipped/duplicated records), `COUNT(*)` expensive on large tables
**Use when:** Small datasets (<100K records), admin panels, "page X of Y" UI required

#### Cursor-Based Pagination

```sql
SELECT * FROM posts
WHERE (created_at, id) < ('2024-01-15T10:00:00Z', 1234)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

```json
{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTIzNCwibmF0IjoiMjAyNC0wMS0xNVQxMDowMDowMFoifQ==",
    "has_more": true
  }
}
```

**Pros:** O(1) performance at any depth, consistent during writes, scales to any dataset size
**Cons:** No random access, no total count, cursor invalid if pointed-to record deleted
**Use when:** Large datasets, real-time data, infinite scroll, mobile apps

#### Keyset Pagination

```sql
SELECT * FROM posts
WHERE (created_at, id) < ('2024-01-15T10:00:00Z', 1234)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

**Pros:** O(1) performance, transparent (client sees actual values), debuggable
**Cons:** Exposes internal column names, sort order is fixed, complex multi-column sorts
**Use when:** Internal APIs, fixed sort orders, when transparency matters

### Performance Comparison (10M rows)

| Strategy | Page 1 | Page 100 | Page 10,000 |
|----------|--------|----------|-------------|
| Offset | 2ms | 45ms | 4500ms |
| Cursor | 2ms | 2ms | 2ms |
| Keyset | 2ms | 2ms | 2ms |

### Pagination Best Practices

- Default to **cursor pagination** for any list endpoint that could grow large
- Always return `has_more` boolean — fetch `limit+1` rows to check
- Never expose raw `COUNT(*)` as default on large tables
- Make cursors opaque (base64-encoded JSON)
- Set sensible default page size (20-100) and maximum (100-1000)
- Signal the last page with `next_cursor: null` or `has_more: false`
- Sort on stable, indexed fields for consistent ordering
- Include pagination metadata in a consistent envelope:
  ```json
  { "data": [...], "pagination": { "next_cursor": "...", "has_more": true } }
  ```

---

## 6. Filtering and Sorting

### Filtering Patterns

```http
# Simple equality
GET /orders?status=paid

# Multiple filters (implicit AND)
GET /orders?status=paid&customerId=cus_123

# Bracketed operators (concise and explicit)
GET /orders?status[in]=pending,processing&total[gte]=50

# Dot operators
GET /orders?total.gte=50&total.lte=100

# Date range
GET /orders?createdAt[between]=2025-01-01,2025-12-31

# Search
GET /orders?query=invoice
```

### Filter Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `eq` | Equals (default) | `?status=active` |
| `ne` | Not equals | `?status[ne]=deleted` |
| `lt`, `lte` | Less than, less than or equal | `?total[lte]=100` |
| `gt`, `gte` | Greater than, greater than or equal | `?total[gte]=50` |
| `in` | In list | `?status[in]=active,pending` |
| `nin` | Not in list | `?status[nin]=deleted` |
| `contains` | String contains | `?name[contains]=john` |
| `startsWith` | String starts with | `?name[startsWith]=j` |

### Sorting

```http
# Single field ascending (default)
GET /orders?sort=price

# Single field descending (minus prefix)
GET /orders?sort=-createdAt

# Multiple fields
GET /orders?sort=-createdAt,status

# Alternative: separate sort direction
GET /orders?sortBy=createdAt&sortDirection=desc
```

### Filtering Best Practices

- Use query params for common filters (visible, bookmarkable, cacheable)
- Keep filter names stable — don't use different names for the same concept
- Define exact match vs search clearly
- Maintain an allowlist of sortable/filterable fields
- Add composite indexes matching common filter + sort prefixes
- Return clear errors for unsupported filters with `400` or `422`
- Canonicalize query strings for CDN caching
- Combine with pagination carefully — changing filters should reset cursors
- Apply operations in order: Filter → Sort → Paginate

---

## 7. Rate Limiting

### Algorithms

| Algorithm | Description | Best For |
|-----------|-------------|----------|
| **Fixed Window** | Count requests in fixed time buckets | Most public APIs |
| **Sliding Window** | Track exact timestamps, count within rolling window | Login endpoints, sensitive ops |
| **Token Bucket** | Bucket refills at fixed rate, consume tokens per request | APIs with occasional bursts |
| **Leaky Bucket** | Queue with constant drain rate | Smooth throughput to downstream |

### Implementation with express-rate-limit

```javascript
const rateLimit = require('express-rate-limit');

// Global limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' }
});

// Auth endpoint limiter (strict)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skipSuccessfulRequests: true, // Only failures count
  message: { error: 'Too many login attempts. Try again in 15 minutes.' }
});

// Read endpoint limiter (permissive)
const readLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000
});

// Apply to routes
app.use('/api', globalLimiter);
app.post('/api/auth/login', authLimiter, loginHandler);
app.get('/api/products', readLimiter, getProducts);
```

### Per-Endpoint Decision Matrix

| Endpoint Type | Limit | Window | Key | Notes |
|---------------|-------|--------|-----|-------|
| Login/register | 5 | 15 min | IP | `skipSuccessfulRequests: true` |
| Authenticated reads | 200 | 1 min | User ID | Fall back to IP |
| Authenticated writes | 20-60 | 1 min | User ID | Fall back to IP |
| Public reads | 100 | 1 min | IP /56 | Most abuse target |
| Health checks | — | — | — | Skip entirely |

### Redis for Distributed Rate Limiting

```javascript
const RedisStore = require('rate-limit-redis');
const { createClient } = require('redis');

const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect();

const distributedLimiter = rateLimit({
  windowMs: 15 * 60000,
  limit: 100,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
    prefix: 'rl:global:'
  })
});
```

### Rate Limit Headers

Always return these headers:
- `RateLimit-Limit` — Maximum requests per window
- `RateLimit-Remaining` — Requests remaining
- `RateLimit-Reset` — Time until window resets (seconds)
- `Retry-After` — Seconds to wait (on 429)

### Progressive Throttling with express-slow-down

```javascript
const slowDown = require('express-slow-down');

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50, // Start adding delays after 50 requests
  delayMs: (hits) => hits * 100, // 100ms per additional request
  maxDelayMs: 5000 // Cap at 5 seconds
});
```

---

## 8. Versioning Strategies

### Strategy Comparison

| Criteria | URL Path | Header | Query Param | Content Negotiation |
|----------|----------|--------|-------------|-------------------|
| Visibility | Excellent (in URL) | Poor (hidden) | Good (in query) | Poor (hidden) |
| Simplicity | Simple | Medium | Simple | Complex |
| RESTfulness | Moderate | High | Low | Highest |
| Cacheability | Excellent | Requires Vary | Inconsistent | Requires Vary |
| Routing | Native (nginx, gateways) | Custom | Custom | Complex |
| Testing | Easy (paste URL) | Requires curl | Easy | Requires curl |
| Adoption | Most common | Moderate | Low | Rare |

### URL Path Versioning (Recommended Default)

```
GET /api/v1/users
GET /api/v2/users
```

Most widely adopted. GitHub, Stripe, Twilio, Google, Microsoft all use it.
- Distinct URLs cache cleanly at CDN
- Easy to test in browser
- Native routing support
- Downside: URL pollution, must update all endpoint URLs when migrating

### Header Versioning

```
GET /api/users
X-API-Version: 2
# OR
Accept: application/vnd.myapi.v2+json
```

- URLs stay clean across versions
- Supports per-request versioning
- Downside: can't test in browser, caching requires `Vary` header

### Query Parameter Versioning

```
GET /api/users?version=2
```

- Trivial to implement
- Visible in URL
- Downside: anti-pattern for permanent versioning, caching unreliable

### Date-Based Versioning (Stripe's Approach)

```
Stripe-Version: 2024-12-18
```

- Accounts pinned to API version at creation time
- Breaking changes create new dated versions
- Most changes are additive and don't require version bumps
- Used by Stripe, Twilio

### Versioning Best Practices

- Version from day one
- Only create new versions for **breaking** changes
- Additive changes (new fields, new endpoints) don't need version bumps
- Use `Deprecation` and `Sunset` headers for deprecated versions
- Minimum 12-month deprecation window for paid APIs
- Document version-specific changelogs

---

## 9. CORS Configuration

### What is CORS?

CORS (Cross-Origin Resource Sharing) is a browser-enforced HTTP-header based mechanism. The browser checks response headers to decide whether to allow JavaScript to read the response. Non-browser clients (curl, Postman) ignore CORS entirely.

### Same-Origin Policy

Same origin = same scheme + host + port.
- `http://localhost:3000` and `http://localhost:5000` are **different** origins
- `https://example.com` and `http://example.com` are **different** origins

### Express CORS Setup

```javascript
const cors = require('cors');

// Simple: Allow all origins (dev only)
app.use(cors());

// Production: Specific origins
const corsOptions = {
  origin: ['https://app.example.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 600 // Cache preflight for 10 minutes
};
app.use(cors(corsOptions));
```

### Dynamic Origin Validation

```javascript
const allowedOrigins = new Set([
  'https://app.example.com',
  'https://admin.example.com'
]);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, false); // No origin = same-origin
    const isAllowed = allowedOrigins.has(origin);
    callback(null, isAllowed);
  },
  credentials: true
};
```

### CORS with Credentials

When using cookies or Authorization headers:
1. Server must set `Access-Control-Allow-Credentials: true`
2. `Access-Control-Allow-Origin` **cannot** be `*` — must be specific origin
3. Client must set `credentials: 'include'` in fetch

```javascript
// Server
app.use(cors({
  origin: 'https://app.example.com',
  credentials: true
}));

// Client
fetch('https://api.example.com/data', {
  credentials: 'include',
  headers: { 'Authorization': 'Bearer token123' }
});
```

### CORS Headers

| Header | Purpose |
|--------|---------|
| `Access-Control-Allow-Origin` | Which origins can read the response |
| `Access-Control-Allow-Methods` | Which HTTP methods are allowed |
| `Access-Control-Allow-Headers` | Which headers can be sent |
| `Access-Control-Allow-Credentials` | Whether cookies/auth can be sent |
| `Access-Control-Expose-Headers` | Which response headers are visible to JS |
| `Access-Control-Max-Age` | How long preflight results are cached |
| `Vary: Origin` | Tells caches the response varies by Origin |

### Preflight Requests

For "non-simple" requests (PUT, DELETE, custom headers), the browser sends an `OPTIONS` request first. Express handles this automatically with the `cors` middleware.

---

## 10. API Documentation

### OpenAPI/Swagger

OpenAPI (formerly Swagger) is the industry standard for REST API documentation. It's a machine-readable YAML or JSON file describing every endpoint, parameter, schema, and authentication method.

**OpenAPI 3.1** is the current standard (2026), with full JSON Schema compatibility.

```yaml
openapi: 3.1.0
info:
  title: My API
  version: 1.0.0
servers:
  - url: https://api.example.com/v1
paths:
  /users:
    get:
      summary: List users
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: A list of users
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
    post:
      summary: Create a user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUser'
      responses:
        '201':
          description: User created

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        email:
          type: string
          format: email
```

### Documentation Tools

| Tool | Description | Best For |
|------|-------------|----------|
| **Swagger UI** | Interactive renderer from SmartBear | Raw API reference |
| **Redoc** | Three-panel responsive renderer | Typography-focused docs |
| **Scalar** | Modern open-source renderer | Clean default design |
| **Stoplight** | API design + docs platform | Mid-size teams |
| **Postman** | Import OpenAPI, generate collections | Testing + documentation |

### Auto-Generation from Code

- **FastAPI**: Generates OpenAPI spec natively from route handlers
- **NestJS**: Built-in OpenAPI support via `@nestjs/swagger`
- **Express**: Use `swagger-jsdoc` + `swagger-ui-express`

### Documentation Best Practices

- Get a developer from landing page to first successful API call in under 10 minutes
- Include copy-paste cURL examples for every endpoint
- Document all error responses with machine-readable codes
- Use tags to group endpoints by resource
- Validate specs in CI with Spectral or Redocly
- Include authentication guide prominently
- Provide SDK examples in popular languages

---

# PART 2 - GraphQL

## 11. GraphQL Basics

GraphQL is a query language for APIs and a runtime for fulfilling those queries. Created by Facebook in 2012, open-sourced in 2015. Clients request exactly the data they need — nothing more, nothing less.

### Single Endpoint

Unlike REST's multiple endpoints, GraphQL exposes a single endpoint (typically `/graphql`). All queries go through HTTP POST.

### Three Operation Types

| Operation | Purpose | Execution |
|-----------|---------|-----------|
| `query` | Read data | Parallel |
| `mutation` | Write data | Sequential (left to right) |
| `subscription` | Real-time push via WebSocket | Persistent connection |

### Schema Definition Language (SDL)

```graphql
# Object types — the core building block
type User {
  id: ID!              # ! means non-nullable
  name: String!
  email: String!
  role: Role!
  posts: [Post!]!      # Non-nullable list of non-nullable Posts
  createdAt: DateTime!
}

type Post {
  id: ID!
  title: String!
  body: String!
  author: User!
  tags: [String!]!
  published: Boolean!
}

# Enum type
enum Role {
  ADMIN
  USER
  MODERATOR
}

# Input types — used for mutations
input CreatePostInput {
  title: String!
  body: String!
  tags: [String!]
}

# Interface — abstract type with shared fields
interface Node {
  id: ID!
}

# Union — one of several types (no shared fields)
union SearchResult = User | Post

# Root types
type Query {
  users: [User!]!
  user(id: ID!): User
  post(id: ID!): Post
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
  updatePost(id: ID!, input: CreatePostInput!): Post!
  deletePost(id: ID!): Boolean!
}

type Subscription {
  postCreated: Post!
}
```

### Queries

```graphql
# Basic query
query {
  users {
    id
    name
    email
  }
}

# With arguments
query {
  user(id: "42") {
    name
    posts(limit: 5) {
      title
    }
  }
}

# With variables
query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
  }
}

# Aliases (rename fields in response)
query {
  firstUser: user(id: "1") { name }
  secondUser: user(id: "2") { name }
}

# Fragments (reuse field selections)
fragment UserFields on User {
  id
  name
  email
}

query {
  users {
    ...UserFields
  }
}
```

### Directives

```graphql
# @include and @skip
query GetUser($id: ID!, $includeEmail: Boolean!) {
  user(id: $id) {
    name
    email @include(if: $includeEmail)
  }
}
```

### Mutations

```graphql
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    author {
      name
    }
  }
}
```

### Resolver Arguments

| Argument | Description |
|----------|-------------|
| `parent` | Return value of the parent resolver |
| `args` | Arguments passed to this field |
| `context` | Shared per-request state (auth, DB, DataLoaders) |
| `info` | AST and schema metadata about the query |

### Resolver Chain

```javascript
const resolvers = {
  Query: {
    users: () => db.users.findAll(),
    user: (_, { id }) => db.users.findById(id),
  },
  User: {
    posts: (user) => db.posts.findByAuthorId(user.id),
  },
  Post: {
    author: (post) => db.users.findById(post.authorId),
  },
};
```

### GraphQL Error Handling

GraphQL always returns HTTP 200 — even when things go wrong. Errors are in the response body:

```json
{
  "data": { "user": null },
  "errors": [
    {
      "message": "User not found",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["user"],
      "extensions": { "code": "NOT_FOUND" }
    }
  ]
}
```

### Introspection

GraphQL APIs are self-documenting. Clients can query the schema itself:

```graphql
{
  __schema {
    types {
      name
      fields {
        name
      }
    }
  }
}
```

> **Security:** Disable introspection in production. It exposes your entire API surface.

---

## 12. Apollo Server

### Setup (Apollo Server 5 + Express)

```typescript
// src/server.ts
import express from 'express';
import http from 'node:http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { createContext, type Context } from './context.js';

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: process.env.NODE_ENV !== 'production',
  formatError: (formattedError, error) => {
    if (formattedError.extensions?.code === 'INTERNAL_SERVER_ERROR') {
      console.error(error);
      return { message: 'Internal server error' };
    }
    return formattedError;
  },
});

await server.start();

app.use(
  '/graphql',
  cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? '*' }),
  express.json({ limit: '1mb' }),
  expressMiddleware(server, { context: createContext }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
```

### Resolvers

```typescript
export const resolvers = {
  Query: {
    users: async (_, __, { dataSources }) => {
      return dataSources.db.users.findMany();
    },
    user: async (_, { id }, { dataSources }) => {
      return dataSources.db.users.findOne(id);
    },
  },
  User: {
    posts: async (parent, _, { loaders }) => {
      return loaders.postsByAuthorId.load(parent.id);
    },
  },
  Mutation: {
    createPost: async (_, { input }, context) => {
      const post = await context.db.posts.create({
        ...input,
        authorId: context.user.id,
      });
      pubsub.publish('POST_CREATED', { postCreated: post });
      return { post, errors: [] };
    },
  },
};
```

### Context

The context function runs once per request. It's where you:
- Authenticate the user
- Create DataLoaders (per-request)
- Attach database connections

```typescript
export async function createContext({ req }: { req: Request }): Promise<Context> {
  return {
    user: await getUserFromAuth(req.headers.authorization),
    loaders: createLoaders(), // New loaders per request
    db: database,
  };
}
```

### Graceful Shutdown

```typescript
// Drain plugin for graceful shutdown
plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]

// Handle SIGTERM
process.on('SIGTERM', async () => {
  await server.stop();
  httpServer.close();
});
```

---

## 13. Apollo Client

### Setup

```typescript
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({ uri: 'https://api.example.com/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      if (extensions?.code === 'UNAUTHENTICATED') {
        // Handle logout
      }
    });
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: ['filter'],
            merge(existing = [], incoming, { args }) {
              if (!args?.cursor) return incoming;
              return { ...incoming, edges: [...(existing?.edges || []), ...incoming.edges] };
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
    query: { fetchPolicy: 'cache-first' },
  },
});
```

### Provider Setup

```tsx
import { ApolloProvider } from '@apollo/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <MyComponent />
    </ApolloProvider>
  );
}
```

### useQuery Hook

```tsx
import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts($limit: Int, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      edges {
        node { id title author { name } }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

function PostList() {
  const { data, loading, error, fetchMore, refetch } = useQuery(GET_POSTS, {
    variables: { limit: 10 },
    notifyOnNetworkStatusChange: true,
  });

  if (loading && !data) return <Skeleton />;
  if (error) return <ErrorMessage error={error} retry={() => refetch()} />;

  return (
    <div>
      {data.posts.edges.map(({ node }) => (
        <PostCard key={node.id} post={node} />
      ))}
      {data.posts.pageInfo.hasNextPage && (
        <button onClick={() => fetchMore({
          variables: { cursor: data.posts.pageInfo.endCursor }
        })}>
          Load More
        </button>
      )}
    </div>
  );
}
```

### useMutation Hook

```tsx
const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id title slug
    }
  }
`;

function CreatePostForm() {
  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    update(cache, { data: { createPost: newPost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: newPost,
              fragment: gql`fragment NewPost on Post { id title }`,
            });
            return [newPostRef, ...existingPosts];
          },
        },
      });
    },
    onCompleted: (data) => router.push(`/posts/${data.createPost.slug}`),
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      createPost({ variables: { input: { title: '...', body: '...' } } });
    }}>
      {/* form fields */}
    </form>
  );
}
```

### Optimistic Updates

```tsx
const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(id: $postId) { id likesCount isLikedByViewer }
  }
`;

function LikeButton({ post }) {
  const [likePost] = useMutation(LIKE_POST, {
    optimisticResponse: {
      likePost: {
        __typename: 'Post',
        id: post.id,
        likesCount: post.isLikedByViewer ? post.likesCount - 1 : post.likesCount + 1,
        isLikedByViewer: !post.isLikedByViewer,
      },
    },
  });
  // If mutation fails, Apollo automatically rolls back
}
```

### Cache Strategies

```typescript
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Cursor-based pagination merge
        feed: {
          keyArgs: false,
          merge(existing, incoming, { args }) {
            if (!args?.cursor) return incoming;
            return { ...incoming, edges: [...(existing?.edges || []), ...incoming.edges] };
          },
        },
      },
    },
  },
});

// Fetch policies
// 'cache-first' — Use cache, fetch only if not cached (default for queries)
// 'network-only' — Always fetch from network
// 'cache-and-network' — Return cache immediately, also fetch from network
// 'no-cache' — No cache, always fetch from network
// 'cache-only' — Only use cache, never fetch
```

---

## 14. Schema Design

### Type Design Patterns

#### Single Responsibility
Each type represents one clear concept:
```graphql
type User { id: ID!, name: String!, email: String! }
type Post { id: ID!, title: String!, author: User! }
```

#### Nullability Strategy
- Default to non-nullable (`!`) for fields that always have data
- Use nullable for fields that may genuinely be absent
- Lists should be non-nullable: `[Post!]!` (never return null for the list itself)

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  bio: String              # Nullable — user might not have a bio
  posts: [Post!]!          # Non-nullable list, non-nullable items
  friends: [User!]!        # Empty array, never null
}
```

### Interfaces

Use when types share common fields and behavior:

```graphql
interface Node {
  id: ID!
}

interface Timestamped {
  createdAt: DateTime!
  updatedAt: DateTime!
}

type User implements Node & Timestamped {
  id: ID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### Unions

Use for mutually exclusive types with no shared fields:

```graphql
union SearchResult = User | Post | Comment

# Must use inline fragments to query
query {
  search(query: "hello") {
    ... on User { name }
    ... on Post { title }
    ... on Comment { text }
  }
}
```

### Result Type Pattern (Error Handling)

```graphql
type CreatePostPayload {
  post: Post
  errors: [UserError!]!
}

type UserError {
  field: String
  message: String!
}

type Mutation {
  createPost(input: CreatePostInput!): CreatePostPayload!
}
```

### Enums

```graphql
enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

enum SortDirection {
  ASC
  DESC
}
```

### Custom Scalars

```graphql
scalar DateTime
scalar JSON
scalar Email

type User {
  createdAt: DateTime!
  metadata: JSON
  email: Email!
}
```

### Schema Design Best Practices

- Design schema before implementing resolvers (contract-first)
- Use descriptive names: `createPost`, not `postCreate`
- Return mutated objects from mutations (enables cache updates)
- Use input types for mutation arguments
- Avoid deep nesting (max 3-4 levels)
- Use Relay Connection spec for pagination
- Add descriptions to types and fields using `"""`

---

## 15. DataLoader: N+1 Problem

### The N+1 Problem

If you query 50 posts and each post resolves its author:
- 1 query for posts
- 50 queries for authors (one per post)
- **= 51 database round-trips**

### DataLoader Solution

DataLoader (created by Facebook) batches and caches within a single request:

```typescript
import DataLoader from 'dataloader';

// Create loaders per request (NEVER as singletons)
export function createLoaders(db: DB) {
  return {
    userById: new DataLoader<string, User>(async (ids) => {
      const users = await db.user.findMany({ where: { id: { in: [...ids] } } });
      const userMap = new Map(users.map(u => [u.id, u]));
      return ids.map(id => userMap.get(id) ?? new Error(`User not found: ${id}`));
    }),

    postsByAuthorId: new DataLoader<string, Post[]>(async (authorIds) => {
      const posts = await db.post.findMany({
        where: { authorId: { in: [...authorIds] } }
      });
      const grouped = new Map(authorIds.map(id => [id, []]));
      for (const post of posts) {
        grouped.get(post.authorId)?.push(post);
      }
      return authorIds.map(id => grouped.get(id) ?? []);
    }),
  };
}
```

### Resolver Usage

```typescript
const resolvers = {
  Post: {
    author: (post, _, { loaders }) => loaders.userById.load(post.authorId),
  },
  User: {
    posts: (user, _, { loaders }) => loaders.postsByAuthorId.load(user.id),
  },
};
```

### Performance Impact

| Query Pattern | DB Queries | Latency (100 posts) |
|---------------|-----------|---------------------|
| No DataLoader (sequential) | 101 | ~2000ms |
| No DataLoader (parallel) | 101 | ~200ms |
| With DataLoader | 2-3 | ~20ms |

### DataLoader Best Practices

- **Always create per request** — global singletons leak data between users
- **Batch functions must return array same length as keys** — in same order
- Use `clear(id)` after mutations to invalidate cache
- Use `prime(id, value)` to pre-fill cache after creating/updating
- Cap batch sizes (100-500) to prevent huge `IN (...)` clauses
- Use `Promise.all` to preserve batching opportunities
- Return `null` or empty array for missing items, not `undefined`

---

## 16. Authentication in GraphQL

### Pattern: Authenticate in Context

```typescript
export async function createContext({ req }: { req: Request }) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const user = token ? await verifyJWT(token) : null;

  return {
    user,
    loaders: createLoaders(),
  };
}
```

### Pattern: Higher-Order Resolver Wrapper

```typescript
import { GraphQLError } from 'graphql';

function requireAuth(fn) {
  return (parent, args, ctx) => {
    if (!ctx.user) {
      throw new GraphQLError('Not authenticated', {
        extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
      });
    }
    return fn(parent, args, ctx);
  };
}

function requireRole(role, fn) {
  return requireAuth((parent, args, ctx) => {
    if (ctx.user.role !== role) {
      throw new GraphQLError('Forbidden', {
        extensions: { code: 'FORBIDDEN', http: { status: 403 } },
      });
    }
    return fn(parent, args, ctx);
  });
}

// Usage
export const resolvers = {
  Query: {
    me: requireAuth((_, __, ctx) => db.user.findUnique({ where: { id: ctx.user.id } })),
  },
  Mutation: {
    deleteUser: requireRole('ADMIN', (_, { id }) => db.user.delete({ where: { id } })),
  },
};
```

### Pattern: Schema Directives

```graphql
directive @auth(requires: Role = USER) on FIELD_DEFINITION

enum Role { ADMIN USER }

type Query {
  me: User @auth(requires: USER)
  adminDashboard: Dashboard @auth(requires: ADMIN)
}

type User {
  id: ID!
  email: String! @auth(requires: ADMIN)
  name: String!
}
```

### Authorization Best Practices

- Delegate authorization to the business logic layer, not resolvers
- Don't put auth checks in every resolver — use wrappers or directives
- Pass a fully-hydrated user object to business logic (not raw tokens)
- Return `null` for unauthorized fields rather than throwing (for optional data)
- Use `UNAUTHENTICATED` (401) vs `FORBIDDEN` (403) correctly

---

## 17. File Uploads

### GraphQL Multipart Request Specification

GraphQL doesn't natively support file uploads. The community standard is the [GraphQL multipart request spec](https://github.com/jaydenseric/graphql-multipart-request-spec):

```graphql
# Schema
scalar Upload

type Mutation {
  uploadFile(file: Upload!): File!
}

type File {
  id: ID!
  filename: String!
  url: String!
}
```

### Server Implementation (Apollo Server)

```typescript
import { ApolloServerPluginUploadHandler } from '@apollo/server/plugin/uploadHandler';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginUploadHandler()],
});
```

### Client Implementation (React)

```tsx
import { gql, useMutation } from '@apollo/client';

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      id
      filename
      url
    }
  }
`;

function FileUpload() {
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    await uploadFile({ variables: { file } });
  };

  return <input type="file" onChange={handleUpload} />;
}
```

### Alternative: REST Endpoint for Uploads

Many teams use a separate REST endpoint for file uploads and reference the file URL in GraphQL mutations:

```javascript
// REST endpoint for uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Then in GraphQL mutation
type Mutation {
  createPost(input: CreatePostInput!, imageUrl: String): Post!
}
```

---

## 18. Subscriptions (WebSocket)

### Schema

```graphql
type Subscription {
  postCreated: Post!
  commentAdded(postId: ID!): Comment!
  messageSent(chatId: ID!): Message!
}
```

### Server Implementation

```typescript
import { PubSub } from 'graphql-subscriptions';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const pubsub = new PubSub();

// WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer(
  {
    schema,
    context: async (ctx) => {
      const token = ctx.connectionParams?.authorization;
      const user = token ? await verifyJWT(token) : null;
      return { user };
    },
  },
  wsServer
);

// In resolvers
const resolvers = {
  Mutation: {
    createPost: async (_, { input }, context) => {
      const post = await db.posts.create(input);
      pubsub.publish('POST_CREATED', { postCreated: post });
      return post;
    },
  },
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
    },
    commentAdded: {
      subscribe: (_, { postId }) =>
        pubsub.asyncIterator([`COMMENT_ADDED_${postId}`]),
    },
  },
};
```

### Client Subscription

```tsx
import { gql, useSubscription } from '@apollo/client';

const POST_CREATED = gql`
  subscription OnPostCreated {
    postCreated {
      id
      title
      author { name }
    }
  }
`;

function NewPosts() {
  const { data, loading } = useSubscription(POST_CREATED);

  if (data) {
    // Show notification or add to list
  }

  return null;
}
```

### Subscription Best Practices

- Use subscriptions only when real-time push is truly needed
- Clean up subscriptions on component unmount
- Handle reconnection gracefully
- Use `subscriptionFilter` for per-user filtering
- Scale with Redis PubSub for multi-server deployments
- Consider SSE for simpler server→client push (no bidirectional needed)

---

## 19. Federation

### Schema Stitching vs Federation

**Schema Stitching:** Combine multiple GraphQL schemas into one at runtime. The gateway fetches schemas from services, merges them, and resolves cross-service references.

**Apollo Federation:** Define schemas with `@key` directives. The gateway (Apollo Router) composes them at build time. Each service owns its portion of the graph.

### Apollo Federation Example

```graphql
# Users subgraph
type User @key(fields: "id") {
  id: ID!
  name: String!
  email: String!
}

# Orders subgraph
type Order @key(fields: "id") {
  id: ID!
  user: User!  # References User from users subgraph
  items: [OrderItem!]!
  total: Float!
}

type OrderItem {
  product: Product!
  quantity: Int!
}

# Products subgraph
type Product @key(fields: "id") {
  id: ID!
  name: String!
  price: Float!
}
```

### Federation Architecture

```
Client → Apollo Router (Gateway) → Users Subgraph
                                → Orders Subgraph
                                → Products Subgraph
```

### When to Use Federation

- Multiple teams owning different parts of the schema
- Large organizations with many domain-specific services
- Need to evolve parts of the schema independently
- Combining multiple data sources into one graph

### Federation Best Practices

- Use `@key` to define how services resolve entity references
- Keep each subgraph focused on a single domain
- Use `@requires` for fields that depend on other services' data
- Monitor query plan performance with Apollo Studio
- Use `@shareable` for fields defined in multiple subgraphs

---

## 20. REST vs GraphQL vs tRPC

| Criteria | REST | GraphQL | tRPC |
|----------|------|---------|------|
| **Type Safety** | Manual (OpenAPI codegen) | Schema-based | End-to-end TypeScript |
| **Over-fetching** | Common (fixed response shapes) | Eliminated (client chooses fields) | Eliminated |
| **Under-fetching** | Common (multiple requests) | Eliminated (single request) | Eliminated |
| **Caching** | HTTP caching built-in | Cache needs client configuration | HTTP caching (via batching) |
| **Learning Curve** | Low | Medium | Low (TypeScript only) |
| **Tooling** | Mature (Swagger, Postman) | Growing (Apollo, Relay) | Growing (tRPC) |
| **File Uploads** | Native | Requires spec (multipart) | Native (via HTTP) |
| **Real-time** | WebSocket/SSE separately | Subscriptions built-in | SSE/HTTP streaming |
| **Ecosystem** | Largest | Large | TypeScript-focused |

### When to Use Each

**REST when:**
- Building a public API consumed by diverse clients
- Team has mixed tech stacks (not all TypeScript)
- HTTP caching is critical
- Simple CRUD operations dominate
- You need broad tooling support

**GraphQL when:**
- Complex data requirements with nested relationships
- Multiple clients need different data shapes
- Real-time features (subscriptions)
- Reducing number of API calls is important
- You have the team to manage schema design

**tRPC when:**
- Full TypeScript stack (client + server)
- You want maximum type safety with minimal overhead
- Monorepo setup (Next.js, Remix)
- Rapid prototyping with type safety
- No need for public API or cross-language support

---

# PART 3 - tRPC

## 21. tRPC Basics

tRPC enables end-to-end typesafe APIs without code generation or schemas. The client imports the router type directly — TypeScript infers all input/output types automatically.

### Setup

```typescript
// server/trpc.ts — Initialize tRPC (once per app)
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;
```

### Defining Procedures

```typescript
// server/appRouter.ts
import { z } from 'zod';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  // Query — read data (uses HTTP GET)
  userList: publicProcedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),

  // Query with input validation (Zod)
  userById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const user = await db.user.findUnique({ where: { id: input } });
      if (!user) throw new TRPCError({ code: 'NOT_FOUND' });
      return user;
    }),

  // Mutation — write data (uses HTTP POST)
  userCreate: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      const user = await db.user.create({ data: input });
      return user;
    }),
});

// Export the TYPE (not the value) — stripped at build time
export type AppRouter = typeof appRouter;
```

### Client

```typescript
// client/index.ts
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/appRouter'; // Type-only import

const trpc = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:3000/trpc' })],
});

// Fully typed — editor knows input and return types
const users = await trpc.userList.query();
const user = await trpc.userById.query('1');
const created = await trpc.userCreate.mutate({ name: 'Katt', email: 'katt@example.com' });
```

### Key Concepts

- `initTRPC.create()` — Initialize once per application
- `router()` — Group related procedures
- `publicProcedure.query()` — Read operation (GET)
- `publicProcedure.mutation()` — Write operation (POST)
- `.input(zodSchema)` — Validate and type the input
- `export type AppRouter` — Type-only export for client inference
- `httpBatchLink` — Automatically batches multiple calls into one HTTP request

### TRPCError

```typescript
import { TRPCError } from '@trpc/server';

// Error codes map to HTTP status codes automatically
throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
throw new TRPCError({ code: 'UNAUTHORIZED' });
throw new TRPCError({ code: 'FORBIDDEN' });
throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid input' });
throw new TRPCError({ code: 'CONFLICT', message: 'Email already taken' });
```

---

## 22. tRPC with React Query

### Setup

```typescript
// lib/trpc.ts
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from '../server/appRouter';

export const trpc = createTRPCReact<AppRouter>();

// Provider
function TRPCProvider({ children }) {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: 'http://localhost:3000/trpc' })],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
}
```

### Queries

```tsx
function UserList() {
  const { data, isLoading, error } = trpc.userList.useQuery();

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  return (
    <ul>
      {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

// Query with variables
function UserProfile({ userId }: { userId: string }) {
  const { data: user } = trpc.userById.useQuery(userId);
  return <div>{user?.name}</div>;
}
```

### Mutations

```tsx
function CreateUserForm() {
  const utils = trpc.useUtils();
  const createUser = trpc.userCreate.useMutation({
    onSuccess: () => {
      // Invalidate and refetch user list
      utils.userList.invalidate();
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      createUser.mutate({ name: 'New User', email: 'new@example.com' });
    }}>
      <button type="submit" disabled={createUser.isLoading}>
        {createUser.isLoading ? 'Creating...' : 'Create User'}
      </button>
      {createUser.error && <p>Error: {createUser.error.message}</p>}
    </form>
  );
}
```

### Optimistic Updates

```tsx
function TodoList() {
  const utils = trpc.useUtils();
  const toggleTodo = trpc.toggleTodo.useMutation({
    onMutate: async (newTodo) => {
      // Cancel outgoing refetches
      await utils.todoList.cancel();

      // Snapshot previous value
      const previousTodos = utils.todoList.getData();

      // Optimistically update
      utils.todoList.setData(undefined, (old) =>
        old?.map(todo =>
          todo.id === newTodo.id ? { ...todo, done: !todo.done } : todo
        )
      );

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      // Rollback on error
      utils.todoList.setData(undefined, context?.previousTodos);
    },
    onSettled: () => {
      // Refetch after error or success
      utils.todoList.invalidate();
    },
  });

  // ...
}
```

---

## 23. End-to-End Type Safety

tRPC achieves type safety without code generation:

1. Server defines procedures with Zod schemas
2. `export type AppRouter` exports the TypeScript type
3. Client imports the type with `import type` (stripped at build time)
4. TypeScript compiler verifies all calls match the server definition

### What You Get

- **Compile-time errors** if you call a procedure that doesn't exist
- **Compile-time errors** if you pass wrong input types
- **Autocomplete** for all procedures and their inputs
- **Inferred return types** — no manual interfaces needed
- **Zero runtime overhead** — types are erased at build time

### Changing the Server Breaks the Client

```typescript
// Server: rename a field
export const appRouter = router({
  userById: publicProcedure
    .input(z.string())
    .query(({ input }) => db.user.findUnique({ where: { id: input } })),
});

// Client: TypeScript error if you try to use old field name
const user = await trpc.userByID.query('1'); // ❌ Error: 'userByID' does not exist
```

### Validation Integration

Zod schemas serve double duty:
- **Runtime:** Validate incoming requests
- **TypeScript:** Infer the types for handlers and clients

```typescript
const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1),
  published: z.boolean().default(false),
});

// At runtime: validates the request
// At compile time: infers { title: string; body: string; published: boolean }
```

---

## 24. Subscriptions

tRPC supports subscriptions over HTTP streams (SSE) and WebSockets.

### Server

```typescript
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'events';

const ee = new EventEmitter();

export const appRouter = router({
  // Subscription using observable
  onMessage: publicProcedure.subscription(() => {
    return observable((emit) => {
      const handler = (data: string) => emit.next(data);
      ee.on('message', handler);
      return () => ee.off('message', handler);
    });
  }),

  // Triggering a subscription event
  sendMessage: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      ee.emit('message', input.text);
      return { success: true };
    }),
});
```

### Client

```typescript
// Subscribe to real-time events
const unsubscribe = trpc.onMessage.subscribe(undefined, {
  onData: (data) => {
    console.log('New message:', data);
  },
  onError: (error) => {
    console.error('Subscription error:', error);
  },
});

// Later: cleanup
unsubscribe();
```

---

## 25. Middleware

### Base Procedures Pattern

```typescript
import { initTRPC, TRPCError } from '@trpc/server';

const t = initTRPC.context<Context>().create();

// Public — no auth required
export const publicProcedure = t.procedure;

// Authenticated — requires valid user
export const authedProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next({
    ctx: { user: ctx.user }, // Non-null in downstream resolvers
  });
});

// Organization-scoped — requires membership
export const orgProcedure = authedProcedure
  .input(z.object({ organizationId: z.string() }))
  .use(function isMemberOfOrganization(opts) {
    const membership = opts.ctx.user.memberships.find(
      (m) => m.orgId === opts.input.organizationId
    );
    if (!membership) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }
    return opts.next({
      ctx: { organization: membership.organization },
    });
  });
```

### Usage

```typescript
export const appRouter = router({
  // Public endpoint
  health: publicProcedure.query(() => 'ok'),

  // Auth-required endpoint
  profile: authedProcedure.query(({ ctx }) => ctx.user),

  // Org-scoped endpoint
  orgMembers: orgProcedure.query(({ ctx }) => {
    return db.members.findMany({ where: { orgId: ctx.organization.id } });
  }),

  // Org-scoped mutation
  inviteMember: orgProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(({ ctx, input }) => {
      return inviteService.send(ctx.organization.id, input.email);
    }),
});
```

### Middleware Chaining

Middleware can be chained. Each `.use()` call wraps the next:

```typescript
const procedure = t.procedure
  .use(authMiddleware)        // 1. Check auth
  .use(validationMiddleware)  // 2. Validate input
  .use(loggingMiddleware);    // 3. Log the request
```

### Error Handling in Middleware

```typescript
import { TRPCError } from '@trpc/server';

// TRPCError codes map to HTTP status codes:
// BAD_REQUEST → 400
// UNAUTHORIZED → 401
// FORBIDDEN → 403
// NOT_FOUND → 404
// CONFLICT → 409
// TOO_MANY_REQUESTS → 429
// INTERNAL_SERVER_ERROR → 500
```

---

# PART 4 - WebSocket API

## 26. WebSocket Basics

WebSocket provides full-duplex communication over a single TCP connection. Unlike HTTP (request-response), WebSocket enables persistent bidirectional messaging.

### Connection Lifecycle

```
Client                          Server
  |                               |
  |--- HTTP Upgrade Request ----->|
  |<-- HTTP 101 Switching --------|
  |                               |
  |<==== WebSocket Connection ===>|
  |                               |
  |--- send(message) ------------>|
  |<-- onmessage(message) --------|
  |--- ping --------------------->|
  |<-- pong ---------------------|
  |                               |
  |--- close(1000) -------------->|
  |<-- close(1000) ---------------|
```

### Browser WebSocket API

```javascript
// Client-side
const ws = new WebSocket('wss://api.example.com/ws');

ws.onopen = () => {
  console.log('Connected');
  ws.send(JSON.stringify({ type: 'subscribe', channel: 'prices' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

ws.onclose = (event) => {
  console.log('Disconnected:', event.code, event.reason);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Server-side (Node.js with ws library)
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    // Process message
    ws.send(JSON.stringify({ type: 'response', data: 'ok' }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
```

### WebSocket Events

| Event | Description |
|-------|-------------|
| `open` | Connection established |
| `message` | Data received from server |
| `error` | Error occurred |
| `close` | Connection closed |

### WebSocket Close Codes

| Code | Meaning |
|------|---------|
| 1000 | Normal closure |
| 1001 | Going away (page navigation) |
| 1002 | Protocol error |
| 1003 | Unsupported data type |
| 1006 | Abnormal closure (no close frame) |
| 1008 | Policy violation |
| 1011 | Server error |

---

## 27. Socket.IO

Socket.IO is NOT a WebSocket implementation. It uses WebSocket when possible but adds:
- Automatic reconnection
- HTTP long-polling fallback
- Packet buffering
- Acknowledgements
- Rooms and namespaces
- Broadcasting

### Server Setup

```javascript
import { Server } from 'socket.io';

const io = new Server(3000, {
  cors: { origin: '*' },
  pingInterval: 25000,
  pingTimeout: 20000,
});

// Connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for events
  socket.on('message', (data) => {
    // Broadcast to all clients
    io.emit('message', data);
  });

  // Acknowledgement pattern
  socket.on('message-with-ack', (data, callback) => {
    callback({ status: 'received' });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
```

### Rooms

Rooms are server-side channels that sockets can join and leave.

```javascript
io.on('connection', (socket) => {
  // Join a room
  socket.join('news');

  // Broadcast to everyone in the room
  io.to('news').emit('breaking-news', { title: 'Big Event' });

  // Broadcast to room except sender
  socket.to('news').emit('update', { text: 'Update' });

  // Leave a room
  socket.leave('news');

  // Multiple rooms
  socket.join(['room1', 'room2']);
  io.to('room1').to('room2').emit('multi-room-event');
});

// Track rooms
io.on('connection', (socket) => {
  socket.on('disconnecting', () => {
    console.log(socket.rooms); // Set of rooms before disconnect
  });
});
```

### Namespaces

Namespaces split logic over a single connection:

```javascript
// Default namespace
io.on('connection', (socket) => {
  console.log('Regular user connected');
});

// Admin namespace
io.of('/admin').on('connection', (socket) => {
  console.log('Admin connected');
  socket.emit('admin-welcome', 'Welcome, admin');
});

// Custom namespace with middleware
io.of('/chat')
  .use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (verifyToken(token)) {
      next();
    } else {
      next(new Error('Authentication required'));
    }
  })
  .on('connection', (socket) => {
    console.log('Authenticated chat user connected');
  });
```

### Client

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: { token: 'jwt-token-here' },
});

socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

socket.on('message', (data) => {
  console.log('Message:', data);
});

// Emit with acknowledgement
socket.emit('hello', 'world', (response) => {
  console.log(response); // "got it"
});

// Auto-reconnection handled automatically
socket.on('connect_error', (error) => {
  console.log('Connection error:', error.message);
});
```

### Multi-Server with Redis Adapter

```javascript
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));
// Now rooms and broadcasting work across multiple server instances
```

---

## 28. Real-Time Patterns

### Chat Application

```javascript
// Server
io.on('connection', (socket) => {
  // Join a chat room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', {
      userId: socket.userId,
      timestamp: Date.now()
    });
  });

  // Send message
  socket.on('send-message', ({ roomId, text }) => {
    const message = {
      id: generateId(),
      userId: socket.userId,
      text,
      timestamp: Date.now()
    };
    io.to(roomId).emit('new-message', message);
    // Persist to database
    db.messages.create(message);
  });

  // Typing indicator
  socket.on('typing', (roomId) => {
    socket.to(roomId).emit('user-typing', { userId: socket.userId });
  });

  socket.on('stop-typing', (roomId) => {
    socket.to(roomId).emit('user-stopped-typing', { userId: socket.userId });
  });
});
```

### Notifications

```javascript
// Server
io.on('connection', (socket) => {
  // User joins their personal notification room
  socket.join(`user:${socket.userId}`);
});

function sendNotification(userId, notification) {
  io.to(`user:${userId}`).emit('notification', notification);
}

// Usage
sendNotification('user-123', {
  type: 'like',
  message: 'Alice liked your post',
  postId: 'post-456'
});
```

### Live Updates (Dashboard)

```javascript
// Server — push metrics to dashboard clients
setInterval(() => {
  const metrics = getMetrics(); // CPU, memory, requests, etc.
  io.to('dashboard').emit('metrics-update', metrics);
}, 5000);

// Client
socket.on('metrics-update', (data) => {
  updateDashboard(data);
});
```

### Presence System

```javascript
io.on('connection', (socket) => {
  // Mark user as online
  presenceService.setOnline(socket.userId);

  // Broadcast presence
  io.emit('presence-update', {
    userId: socket.userId,
    status: 'online'
  });

  socket.on('disconnect', async () => {
    // Mark as offline
    await presenceService.setOffline(socket.userId);
    io.emit('presence-update', {
      userId: socket.userId,
      status: 'offline'
    });
  });
});
```

---

# PART 5 - Server-Sent Events

## 29. EventSource API

SSE (Server-Sent Events) is a server-to-client push technology over HTTP. Unlike WebSocket, SSE is unidirectional (server→client only).

### Browser API

```javascript
// Create EventSource connection
const eventSource = new EventSource('https://api.example.com/events');

// Listen for default message events
eventSource.onmessage = (event) => {
  console.log('Message:', event.data);
};

// Listen for named events
eventSource.addEventListener('price-update', (event) => {
  const data = JSON.parse(event.data);
  updatePrice(data.symbol, data.price);
});

eventSource.addEventListener('notification', (event) => {
  showNotification(JSON.parse(event.data));
});

// Error handling
eventSource.onerror = (event) => {
  console.error('SSE error. ReadyState:', eventSource.readyState);
  // readyState: 0=CONNECTING, 1=OPEN, 2=CLOSED
  // EventSource auto-reconnects unless readyState is CLOSED
};

// Close connection
eventSource.close();
```

### Server Implementation (Node.js/Express)

```javascript
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Nginx

  // Send event
  const sendEvent = (eventType, data) => {
    res.write(`event: ${eventType}\n`);
    res.write(`data: ${JSON.stringify(data)}\n`);
    res.write(`id: ${Date.now()}\n`);
    res.write('\n');
  };

  // Send heartbeat every 15 seconds (prevent proxy timeouts)
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 15000);

  // Listen for events from your event emitter
  const onPriceUpdate = (data) => sendEvent('price-update', data);
  const onNotification = (data) => sendEvent('notification', data);

  eventEmitter.on('price-update', onPriceUpdate);
  eventEmitter.on('notification', onNotification);

  // Cleanup on disconnect
  req.on('close', () => {
    clearInterval(heartbeat);
    eventEmitter.off('price-update', onPriceUpdate);
    eventEmitter.off('notification', onNotification);
  });
});
```

### SSE Event Format

```
# Default event (message type)
data: Hello World

# Named event
event: price-update
data: {"symbol":"AAPL","price":150.25}
id: 12345

# Multi-line data
data: line 1
data: line 2
data: line 3

# Comment (ignored, used as heartbeat)
: this is a comment

# With retry interval
retry: 5000
data: reconnect in 5 seconds
```

### Auto-Reconnection

EventSource automatically reconnects. The `Last-Event-ID` header tells the server where to resume:

```javascript
// Client — event IDs are tracked automatically
const es = new EventSource('/events');

// Server — use Last-Event-ID to resume
app.get('/events', (req, res) => {
  const lastId = req.headers['last-event-id'];
  const events = eventStore.getEventsSince(lastId);

  // Send missed events, then continue streaming
  events.forEach(event => {
    res.write(`id: ${event.id}\ndata: ${JSON.stringify(event.data)}\n\n`);
  });
});
```

---

## 30. SSE Patterns

### Financial Data Streaming

```javascript
// Server
app.get('/api/prices', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  const symbols = req.query.symbols?.split(',') || ['AAPL', 'GOOGL'];

  const interval = setInterval(() => {
    const prices = symbols.map(symbol => ({
      symbol,
      price: (Math.random() * 100 + 100).toFixed(2),
      change: (Math.random() * 4 - 2).toFixed(2),
      timestamp: new Date().toISOString()
    }));

    res.write(`event: price-update\ndata: ${JSON.stringify(prices)}\n\n`);
  }, 2000);

  req.on('close', () => clearInterval(interval));
});
```

### Progress Updates

```javascript
// Server — long-running operation with progress
app.post('/api/export', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');

  const totalRows = 100000;
  let processed = 0;

  const processBatch = async () => {
    while (processed < totalRows) {
      processed += 1000;

      res.write(`event: progress\ndata: ${JSON.stringify({
        processed,
        total: totalRows,
        percentage: Math.round((processed / totalRows) * 100)
      })}\n\n`);
    }

    res.write(`event: complete\ndata: ${JSON.stringify({
      downloadUrl: '/exports/report.csv'
    })}\n\n`);

    res.end();
  };

  processBatch();
});
```

### SSE vs WebSocket Comparison

| Feature | SSE | WebSocket |
|---------|-----|-----------|
| Direction | Server→Client (unidirectional) | Bidirectional |
| Protocol | HTTP | WS/WSS (separate protocol) |
| Auto-reconnect | Built-in | Manual implementation |
| Event IDs | Built-in (Last-Event-ID) | Manual |
| Binary data | Text only | Binary supported |
| Browser support | All modern browsers | All modern browsers |
| Firewall/proxy | Works through HTTP | May be blocked |
| Complexity | Low | Medium-High |

### SSE Best Practices

- Send heartbeat comments (`:`) every 15 seconds to prevent proxy timeouts
- Use event IDs for resumability
- Set `Cache-Control: no-cache` and `X-Accel-Buffering: no` for Nginx
- Handle cleanup on client disconnect
- Use named events for different data types
- Consider SSE over WebSocket when server→client push is sufficient

---

# PART 6 - API Patterns

## 31. API Gateway Pattern

An API Gateway is a single entry point for all client requests. It handles routing, authentication, rate limiting, request transformation, and response aggregation.

### Architecture

```
Client → API Gateway → Microservice A
                    → Microservice B
                    → Microservice C
```

### Responsibilities

| Responsibility | Description |
|----------------|-------------|
| **Routing** | Direct requests to appropriate services |
| **Authentication** | Verify tokens before forwarding |
| **Rate Limiting** | Protect services from abuse |
| **Request Transformation** | Modify requests for different service protocols |
| **Response Aggregation** | Combine responses from multiple services |
| **Load Balancing** | Distribute traffic across service instances |
| **Caching** | Cache frequently accessed responses |
| **Monitoring** | Log and trace all API traffic |
| **SSL Termination** | Handle HTTPS at the gateway |

### Implementation (Express)

```javascript
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Auth middleware
app.use('/api', authenticateToken);

// Route to services
app.use('/api/users', createProxyMiddleware({
  target: 'http://user-service:3001',
  pathRewrite: { '^/api/users': '/users' },
}));

app.use('/api/orders', createProxyMiddleware({
  target: 'http://order-service:3002',
  pathRewrite: { '^/api/orders': '/orders' },
}));

app.use('/api/products', createProxyMiddleware({
  target: 'http://product-service:3003',
  pathRewrite: { '^/api/products': '/products' },
}));
```

### Popular Gateway Solutions

- **Kong** — Open-source, plugin-based
- **AWS API Gateway** — Managed service
- **NGINX** — Reverse proxy with routing
- **Express Gateway** — Node.js native
- **Traefik** — Cloud-native, auto-discovery

---

## 32. Backend for Frontend (BFF)

A BFF is a dedicated backend for each frontend type. Instead of one API serving all clients, each frontend gets its own tailored API.

### Architecture

```
Mobile App → Mobile BFF → Services
Web App   → Web BFF   → Services
Admin UI  → Admin BFF → Services
```

### When to Use BFF

- Different clients need different data shapes (mobile vs web)
- Different authentication mechanisms per platform
- Need to optimize for specific client constraints (bandwidth, latency)
- Separate teams own different frontends

### BFF vs API Gateway

| Aspect | API Gateway | BFF |
|--------|------------|-----|
| Scope | All clients share one gateway | One BFF per client type |
| Coupling | Loosely coupled | Tightly coupled to specific client |
| Optimization | General-purpose | Client-specific |
| Ownership | Platform team | Frontend team |

### Implementation

```javascript
// Mobile BFF — optimized for mobile
app.get('/api/mobile/feed', async (req, res) => {
  const [posts, user, notifications] = await Promise.all([
    postService.getFeed(req.user.id, { limit: 10 }),
    userService.getProfile(req.user.id),
    notificationService.getUnread(req.user.id)
  ]);

  // Transform for mobile: smaller payloads, fewer fields
  res.json({
    posts: posts.map(p => ({
      id: p.id,
      title: p.title,
      thumbnailUrl: p.imageUrl, // Use thumbnail, not full image
      authorName: p.author.name,
    })),
    user: { name: user.name, avatar: user.avatarUrl },
    unreadCount: notifications.count
  });
});
```

---

## 33. Idempotency Keys

An idempotency key ensures that repeating a request produces the same result. Critical for POST endpoints where network retries could cause duplicate operations.

### The Problem

```
Client → POST /api/payments (charge $100)
         → Request times out
         → Client retries POST /api/payments
         → Customer charged twice!
```

### The Solution

```javascript
// Server-side implementation
const idempotencyStore = new Map(); // Use Redis in production

async function processPayment(req, res, next) {
  const idempotencyKey = req.headers['idempotency-key'];

  if (idempotencyKey) {
    // Check if we've seen this key
    const existing = await idempotencyStore.get(idempotencyKey);
    if (existing) {
      // Return cached response (don't process again)
      return res.status(existing.statusCode).json(existing.body);
    }
  }

  try {
    // Process the request
    const result = await paymentService.charge(req.body);

    // Store the result
    if (idempotencyKey) {
      await idempotencyStore.set(idempotencyKey, {
        statusCode: 201,
        body: result,
        timestamp: Date.now()
      }, 'EX', 86400); // 24-hour TTL (Stripe pattern)
    }

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
```

### Idempotency Key Patterns

| Pattern | Description |
|---------|-------------|
| **Client-generated** | Client creates UUID, sends in header |
| **Server-generated** | Server creates from request hash |
| **Stripe approach** | Client sends `Idempotency-Key` header, cached 24h |
| **Natural key** | Use business key (e.g., `order_id`) instead of UUID |

### HTTP Methods and Idempotency

| Method | Idempotent by Spec | Notes |
|--------|-------------------|-------|
| `GET` | Yes | Safe, no side effects |
| `PUT` | Yes | Replaces resource entirely |
| `DELETE` | Yes | Same result on repeat |
| `POST` | No | Needs idempotency key |
| `PATCH` | Depends | Can be with correct implementation |

---

## 34. Webhooks

Webhooks are HTTP callbacks from one system to another. Instead of polling for changes, a system pushes notifications when events occur.

### How Webhooks Work

```
1. Your system registers a webhook URL with the provider
2. Provider sends POST request to your URL when an event occurs
3. Your system processes the event
4. Return 200 OK to acknowledge receipt
```

### Implementation (Receiving Webhooks)

```javascript
import express from 'express';
import crypto from 'crypto';

const app = express();

// Raw body needed for signature verification
app.post('/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Process event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const payment = event.data.object;
        await handlePaymentSuccess(payment);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Always return 200 quickly
    res.json({ received: true });
  }
);
```

### Webhook Security

```javascript
// Signature verification
function verifyWebhookSignature(payload, signature, secret) {
  const timestamp = signature.split('t=')[1].split(',')[0];
  const sig = signature.split('v1=')[1];

  const signedPayload = `${timestamp}.${payload}`;
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(sig),
    Buffer.from(expectedSig)
  );
}
```

### Webhook Best Practices

- **Verify signatures** on every incoming webhook
- **Return 200 quickly** — process asynchronously
- **Handle retries** — providers retry on non-200 responses (use idempotency)
- **Log everything** — webhooks are asynchronous and hard to debug
- **Use queues** — push to a message queue, process asynchronously
- **Set timeouts** — don't let webhook processing block the response
- **Include timestamps** — detect stale or out-of-order webhooks

---

## 35. Long Polling vs WebSocket vs SSE

### Comparison Matrix

| Feature | Long Polling | WebSocket | SSE |
|---------|-------------|-----------|-----|
| **Direction** | Client→Server (request) | Bidirectional | Server→Client |
| **Protocol** | HTTP | WS/WSS | HTTP |
| **Connection** | Temporary (per request) | Persistent | Persistent |
| **Latency** | High (reconnect overhead) | Low | Low |
| **Server Load** | High (constant reconnections) | Low | Low |
| **Firewall** | Works everywhere | May be blocked | Works everywhere |
| **Auto-reconnect** | Manual | Manual | Built-in |
| **Binary data** | Yes | Yes | Text only |
| **Scalability** | Poor | Good | Good |
| **Complexity** | Low | Medium | Low |

### When to Use Each

**Long Polling:**
- Fallback for environments that block WebSockets
- Simple APIs where real-time isn't critical
- Legacy system compatibility

```javascript
// Client
async function longPoll() {
  try {
    const response = await fetch('/api/events?timeout=30');
    const data = await response.json();
    handleEvent(data);
  } catch (e) {
    // Retry
  }
  longPoll(); // Re-poll
}
```

**WebSocket:**
- Bidirectional communication (chat, gaming, collaboration)
- Low-latency requirements
- Client needs to send frequent updates
- Binary data transfer

```javascript
// Client
const ws = new WebSocket('wss://api.example.com/ws');
ws.onmessage = (event) => handleEvent(JSON.parse(event.data));
ws.send(JSON.stringify({ type: 'action', data: '...' }));
```

**SSE:**
- Server-to-client push only (notifications, feeds, dashboards)
- Need auto-reconnection
- Behind restrictive proxies
- Simpler implementation than WebSocket

```javascript
// Client
const source = new EventSource('/api/events');
source.onmessage = (event) => handleEvent(JSON.parse(event.data));
```

### Decision Flowchart

```
Need bidirectional communication?
├── YES → WebSocket
└── NO → Server pushing data to client?
    ├── YES → Need binary data?
    │   ├── YES → WebSocket
    │   └── NO → SSE (simpler)
    └── NO → Standard REST (request-response)
```

### Performance Comparison

| Metric | Long Polling | WebSocket | SSE |
|--------|-------------|-----------|-----|
| Messages/sec (server→client) | ~10 | ~10,000+ | ~10,000+ |
| Messages/sec (client→server) | ~10 | ~10,000+ | N/A (use REST) |
| Connection overhead | High (HTTP headers each time) | Low (single upgrade) | Low (single HTTP) |
| Memory per connection | High | Low | Low |
| CPU (server) | High | Low | Low |

### Real-World Usage

| Service | Protocol | Reason |
|---------|----------|--------|
| Slack | WebSocket | Bidirectional chat |
| GitHub | SSE | Event notifications |
| Stripe | Webhooks | Async payment events |
| Twitter | Long Polling | Fallback for WS |
| Discord | WebSocket | Real-time messaging |
| Google Maps | SSE | Location updates |
| Jira | Webhooks | Issue updates |
| ChatGPT | SSE | Streaming responses |

---

## Summary

### API Design Decision Tree

```
What are you building?
├── Public API → REST + OpenAPI docs
├── Internal TypeScript monorepo → tRPC
├── Complex data relationships → GraphQL
├── Real-time chat/collaboration → WebSocket
├── Server push (feeds, dashboards) → SSE
├── Third-party integrations → Webhooks
└── Microservices → API Gateway + BFF pattern
```

### Key Takeaways

1. **REST** is the default for most APIs — simple, well-understood, great tooling
2. **GraphQL** excels when clients need flexible data shapes
3. **tRPC** is ideal for TypeScript monorepos with maximum type safety
4. **WebSocket** for bidirectional real-time communication
5. **SSE** for simpler server→client push with auto-reconnection
6. **Always validate input**, **paginate collections**, **rate limit endpoints**
7. **Use idempotency keys** for POST endpoints that shouldn't be duplicated
8. **Document your APIs** with OpenAPI/Swagger specs
9. **Version from day one** — URL path versioning is the safest default
10. **Choose the right tool** — no single protocol fits every use case
