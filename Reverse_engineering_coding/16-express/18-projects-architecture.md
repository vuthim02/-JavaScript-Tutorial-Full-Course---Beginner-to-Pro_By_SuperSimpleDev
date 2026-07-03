# Chapter 18 — Project Ideas

## 1. Blog API

Build a complete blog API with Express.

- **Auth**: JWT-based registration/login
- **CRUD**: Posts, comments, users
- **Relationships**: User has many posts, post has many comments
- **Pagination**: Offset-based on post listing
- **Validation**: Zod schemas for all inputs
- **Error handling**: Centralized error middleware
- **Layered**: Controllers → Services → Repositories
- **Logging**: Morgan + Winston
- **Testing**: Jest + Supertest

## 2. JWT Authentication System

- `POST /auth/register` — create user with bcrypt-hashed password
- `POST /auth/login` — return access token + refresh token
- `POST /auth/refresh` — issue new access token
- `POST /auth/logout` — invalidate refresh token
- `GET /auth/me` — return current user from JWT payload
- **Security**: Rate limiting on login, password strength validation, HttpOnly cookies

## 3. Role-Based Access Control

Extend the auth system with roles.

- Roles: `admin`, `moderator`, `user`
- Permissions: `read:users`, `create:users`, `delete:users`
- Middleware: `authorize('admin')`, `authorizePermission('delete:users')`
- Ownership check: users can edit their own posts but not others'

## 4. File Upload Service

- Upload: single, multiple, field-named
- Validation: file type (MIME), file size
- Storage: disk (local) or cloud (S3)
- Processing: image resizing (Sharp), thumbnail generation
- Serving: static file serving via Express

## 5. Redis Cache Layer

- Middleware: cache GET responses with configurable TTL
- Tag-based invalidation: `POST /users` invalidates `cache:/api/users*`
- Metrics: cache hit/miss ratio endpoint
- Graceful fallback: if Redis is down, pass through to DB

## 6. Rate Limiter

- Global: 100 req/15min per IP
- Auth: 5 req/min per IP
- Per-user: 30 req/min for authenticated users
- Redis-backed: shared state across multiple server instances

## 7. Logging System

- Structured JSON logs (Winston or Pino)
- Log levels: debug, info, warn, error
- Request logging: method, URL, status, duration
- Error logging: stack traces, request context
- Log rotation: max 10 MB per file, keep 5 files
- Correlation ID: UUID per request

## 8. Error Handling Framework

- `AppError` base class with `statusCode`, `code`, `isOperational`
- Specific errors: `NotFoundError`, `ValidationError`, `UnauthorizedError`
- Error middleware: catch all, format response, log
- Async handler wrapper: catch promise rejections
- Development mode: include stack traces in response

## 9. API Documentation Generator

- OpenAPI 3.0 specification
- Swagger UI at `/api-docs`
- JSDoc annotations on all routes
- Tag organization (Users, Posts, Auth)

## 10. Monitoring Dashboard

- Health check endpoint: DB, Redis, uptime
- Prometheus metrics: request count, duration histogram
- Metrics dashboard endpoint (`/metrics`)
- Alert triggers: >5% error rate, >1s p99 latency

## 11. Production REST API

Combine everything into a production-grade API.

- **Transport**: HTTPS (or behind Nginx reverse proxy)
- **Middleware**: Helmet, CORS, Compression, Morgan, Rate limiter, Auth
- **Layers**: Controller → Service → Repository
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis for frequently accessed data
- **Testing**: Unit + Integration + E2E

## 12. Multi-layer Backend Architecture

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

## Overall Architecture Flow

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
- **Transport Layer** — HTTP, WebSocket, gRPC
- **Business Layer** — services, use cases, domain logic
- **Persistence Layer** — repositories, ORM, queries
- **Infrastructure Layer** — caching, logging, messaging, auth
## Next Steps

[Back to Chapter 17](17-reverse-engineering-tactics.md): Chapter 17 — Reverse Engineering Coding Tactics
[Proceed to Module 17](../17-testing/README.md): Testing, Quality Assurance, and CI/CD to learn about testing and CI/CD practices.
