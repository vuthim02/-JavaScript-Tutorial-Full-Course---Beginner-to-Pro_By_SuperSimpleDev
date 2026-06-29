# Web Dev Learning Roadmap — Order to Learn

---

## Phase 1: Foundations
                        
```
 1. HTTP_Deep_Dive.md              ─── How browsers & servers talk
 2. WH5H2_is_Port.md               ─── What ports are and why they matter
 3. NPM_and_Dependencies.md        ─── package.json, npm commands
 4. Version_Numbers.md             ─── SemVer, ^ vs ~, ranges
 5. Environment_Variables.md       ─── .env, secrets, NODE_ENV
```

**Goal:** Understand the building blocks of every web app.

---

## Phase 2: Backend Core

```
 6. Middleware.md                  ─── Express pipeline, req/res cycle
 7. REST_API_Design.md             ─── Routes, methods, status codes
 8. Error_Handling.md              ─── try/catch, error middleware, custom errors
 9. CORS.md                        ─── Cross-origin requests, preflight
10. Authentication.md              ─── Sessions, JWT, bcrypt
```

**Goal:** Build a working API with auth.

---

## Phase 3: Data

```
11. How_We_Think_Data_store_in_many_ways.md    ─── All storage options overview
12. Databases_and_ORM_in_Practice.md           ─── SQL, Prisma, Knex, relationships
13. How_many_that_data_can_walk_or_connect_between_one_place_to_one_or_more_place_or_Backend_and_frondend.md
                                               ─── HTTP, WebSocket, SSE, DB connections
```

**Goal:** Store and move data properly.

---

## Phase 4: Quality & Safety

```
14. Testing_Express_APIs.md        ─── Jest, Supertest, test DB
15. Security_Best_Practices.md     ─── Helmet, rate limit, validation, SQL injection
16. Error_Handling.md              ─── (review with security mindset)
```

**Goal:** Make your app reliable and secure.

---

## Phase 5: Real-World Features

```
17. WebSockets_Deep_Dive.md        ─── Socket.IO, rooms, live updates
18. Background_Jobs_with_Bull.md   ─── Redis queues, async workers
19. Logging_and_Monitoring.md      ─── Winston, Sentry, health checks
```

**Goal:** Add real-time, async processing, and observability.

---

## Phase 6: Deploy & Scale

```
20. Deployment.md                  ─── Render, Railway, PM2, Nginx
21. Docker_for_Node_Apps.md        ─── Containers, Compose, multi-stage
22. CI_CD_with_GitHub_Actions.md   ─── Auto-test, auto-deploy
23. Performance_Optimization.md    ─── Caching, indexing, N+1, compression
```

**Goal:** Ship to production with confidence.

---

## Phase 7: Level Up

```
24. TypeScript_with_Node_Express_Prisma.md   ─── Types, Zod, typed Express
```

**Goal:** Industry-standard type safety.

---

## One-Sentence Summary Per File

| # | File | One Sentence |
|---|------|-------------|
| 1 | HTTP_Deep_Dive | Every web interaction is a request + response with a status code and headers. |
| 2 | WH5H2_is_Port | A port is a door on a machine that identifies which app gets the data. |
| 3 | NPM_and_Dependencies | npm installs packages; package.json tracks them; never commit node_modules. |
| 4 | Version_Numbers | `^` locks major, `~` locks minor, exact locks everything. |
| 5 | Environment_Variables | Secrets live in env vars, not code; .env is never committed. |
| 6 | Middleware | Functions that run between request and response in a pipeline. |
| 7 | REST_API_Design | Use nouns for URLs, HTTP methods for actions, consistent error shapes. |
| 8 | Error_Handling | Wrap async routes, use error middleware with 4 params, never leak stack traces in prod. |
| 9 | CORS | Browsers block cross-origin by default; servers opt in with Access-Control-Allow-Origin. |
| 10 | Authentication | Sessions (server state) vs JWT (self-contained token); always hash passwords with bcrypt. |
| 11 | Data Storage Overview | Client: localStorage/cookies/IndexedDB. Server: in-memory/file/SQLite/PostgreSQL/Redis. |
| 12 | Databases & ORM | SQL is the language; Prisma generates types; indexes make queries fast. |
| 13 | Data Communication | HTTP for CRUD, WebSocket for real-time, SSE for server push, polling as fallback. |
| 14 | Testing | Jest runs tests, Supertest hits routes, test DB keeps data isolated. |
| 15 | Security | Helmet for headers, rate limiting for abuse, parameterized queries for SQL injection. |
| 16 | Error Handling | (review) Known errors show messages, unknown errors hide details, always log. |
| 17 | WebSockets | Persistent bidirectional connection; Socket.IO adds rooms, reconnect, fallback. |
| 18 | Background Jobs | Bull + Redis: enqueue work in HTTP handler, process async in a worker. |
| 19 | Logging & Monitoring | Winston for structured logs, Sentry for errors, health endpoint for uptime. |
| 20 | Deployment | Use `process.env.PORT`, bind to `0.0.0.0`, set env vars on platform dashboard. |
| 21 | Docker | Containers bundle app + deps; Compose runs app + DB + Redis together. |
| 22 | CI/CD | Push → GitHub Actions → tests run → if main + pass → auto-deploy. |
| 23 | Performance | Compress responses, index DB columns, cache in Redis, fix N+1 queries. |
| 24 | TypeScript | Types catch bugs at compile time; Prisma generates types from schema. |

---

## If You Only Have Time for 10 Files

For someone who wants to build and ship a production app:

```
 1. Middleware
 2. REST_API_Design
 3. Error_Handling
 4. Authentication
 5. Databases_and_ORM_in_Practice
 6. Security_Best_Practices
 7. Testing_Express_APIs
 8. Deployment
 9. Docker_for_Node_Apps
10. CI_CD_with_GitHub_Actions
```

---

*Last updated: June 2026*
