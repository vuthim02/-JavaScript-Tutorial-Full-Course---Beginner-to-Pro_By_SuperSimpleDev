# 21. Reverse Engineering Tactical Questions and Projects

## Tactical Questions

Whenever reading backend networking code ask:

| Question | Key Insight |
|----------|-------------|
| **Who is client?** | Browser, mobile app, another server, or CLI? |
| **Who is server?** | Node.js, Nginx, cloud function, or third-party API? |
| **Which protocol?** | HTTP, HTTPS, WebSocket, TCP, or UDP? |
| **HTTP or WebSocket?** | Request-response or persistent connection? |
| **Which method?** | GET, POST, PUT, PATCH, DELETE, or OPTIONS? |
| **Which status code?** | 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error)? |
| **Which headers matter?** | Content-Type, Authorization, Cookie, Origin, Cache-Control? |
| **Is request authenticated?** | JWT, session cookie, API key, or Basic Auth? |
| **Session or JWT?** | Server-side state or client-side token? |
| **Is HTTPS used?** | If not → man-in-the-middle risk. |
| **Is CORS involved?** | Cross-origin request → check `Access-Control-Allow-Origin`. |
| **Which attack is possible?** | XSS, CSRF, SQLi, MITM, brute force, replay? |
| **Which defense exists?** | HttpOnly, SameSite, CSP, CSRF tokens, rate limiting, input validation? |
| **Cache hit or miss?** | Check `Cache-Control`, `ETag`, `Last-Modified` headers. |
| **Is rate limiting required?** | Auth endpoints, public APIs → yes. |
| **Is pagination needed?** | Large datasets → yes. |
| **Is real-time needed?** | Chat, notifications → WebSocket or SSE. |

### Bottleneck Analysis

| Layer | Symptoms |
|-------|----------|
| **Network** | High latency, packet loss |
| **Database** | Slow queries, high CPU on DB |
| **CPU** | High `node` CPU usage |
| **Memory** | High RSS, frequent GC |

## Senior Reverse Coding Tactical Process

When seeing `app.get("/users", ...)` ask:

1. **Which HTTP method?** GET, POST, PUT, PATCH, DELETE?
2. **Which resource?** `/users`, `/users/:id`, `/users/:id/orders`?
3. **Authentication needed?** Check for JWT middleware, session check.
4. **Rate limiting needed?** Is this a public/auth endpoint?
5. **Pagination needed?** Does this return a list? Could it have 1000+ items?
6. **Cache needed?** Does data change infrequently?
7. **Database query?** How many queries? N+1 problem? Indexes?
8. **Security risks?** Input validation? SQL injection? XSS?
9. **Response format?** JSON, HTML, XML, binary?
10. **Status codes?** 200 for success, 201 for create, 400 for bad input, 404 for not found, 500 for error?
11. **Error handling?** Try/catch? Error middleware? Consistent error format?
12. **Logging?** Request ID? Duration? Status code?
13. **Metrics?** Request count, latency, error rate?
14. **Versioning?** `/v1/users` or header-based?
15. **Scalability concerns?** Will this handle 10 req/s? 1000? 100000?

## Projects

### 1. REST API
Full CRUD for a resource (blog posts, products, books). Input validation, proper status codes, error handling middleware, pagination, search/filtering via query params, environment variable configuration.

### 2. JWT Authentication System
`POST /register` (hashed password), `POST /login` (returns JWT), `GET /profile` (protected), `POST /refresh` (new access token), `POST /logout` (blacklist). Access token: 15min, refresh: 7 days.

### 3. Session Authentication System
`POST /register`, `POST /login` (create session, set cookie), `GET /profile` (read session), `POST /logout` (destroy session). Session store in Redis with expiration and cleanup.

### 4. Chat Server (WebSocket)
WebSocket server with join/leave rooms, send messages, broadcast, user presence (online/offline), message history (last 50), typing indicators, rate limiting (30 msgs/min/user).

### 5. GraphQL API
Schema with Query, Mutation, Subscription. Resolvers with DataLoader for N+1 prevention. Auth middleware, input validation, pagination (connection pattern), real-time subscriptions with WebSocket. Apollo Server Express.

### 6. File Upload Service
Upload single/multiple files. MIME type validation, size limit, virus scan (ClamAV), thumbnail generation for images. Serve and delete files. Track upload progress.

### 7. Rate Limiter
Implement Fixed Window and Sliding Window algorithms. Configurable per-route limits. Redis-backed for distributed rate limiting. Return `Retry-After` header and `X-RateLimit-*` headers.

### 8. API Gateway
Route requests to multiple microservices. JWT verification at gateway level. Rate limiting, logging with correlation ID, response aggregation, circuit breaker, graceful degradation.

### 9. Reverse Proxy Setup
Configure Nginx as reverse proxy for Node.js. SSL termination (Let's Encrypt), static file serving, gzip compression, security headers, load balancing across instances, WebSocket proxying.

### 10. Real-time Notification System
SSE endpoint for real-time notifications. User subscribes to channel. Admin panel to send. Notification persistence, unread count, mark as read. SSE reconnection with `Last-Event-ID`. Optional WebSocket version.

### 11. OAuth Login
Login with Google, GitHub, Facebook. Link/unlink social accounts. Profile picture from provider. Session management after OAuth login. Handle OAuth errors (denied, expired).

### 12. Caching Layer
Redis cache middleware for Express. Cache GET responses with configurable TTL. Invalidation on POST/PUT/PATCH/DELETE. Cache tags (invalidate by group). Statistics (hit rate, memory). Conditional caching. Cache warming on startup.

## Full Request Analysis Checklist

When reverse engineering a backend endpoint, document:

```
Method:    _______
Path:     _______
Headers:  _______
Body:     _______
Auth:     _______
Status:   _______
DB Queries: _______
Cache:    _______
Rate Limit: _______
```

## Architecture Decision Summary

| Decision | Options |
|----------|---------|
| **API style** | REST, GraphQL, WebSocket, gRPC |
| **Auth** | Session, JWT, OAuth, API Key, Basic |
| **Pagination** | Offset, Cursor, Keyset |
| **Rate limit** | Fixed window, Sliding window, Token bucket |
| **Cache** | Browser, CDN, Redis, In-memory |
| **Deployment** | Single server, Cluster, Nginx + Nodes, Microservices |

## What's Next — Part 15

Databases and Data Engineering: SQL, PostgreSQL, MySQL, SQLite, NoSQL, MongoDB, Redis, Indexes, Transactions, ACID, CAP theorem, Replication, Sharding, ORM, Prisma, Query optimization, Database internals, Reverse engineering coding tactics used by senior backend engineers.
## Next Steps

[Back to Chapter 20](20-load-balancing-webhooks.md): 20. Load Balancing and Webhooks
[Proceed to Chapter 22](22-owasp-top-10.md): 22. OWASP Top 10 Security Risks to learn about the OWASP Top 10 security risks.
