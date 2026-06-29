# Chapter 25 — Reverse Engineering Coding Tactics

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


When reading Express code like this:

```javascript
app.post("/users", authenticate, validate(createUserSchema), userController.create)
```

Ask these questions in order:

### Input Source?

`req.params`, `req.query`, `req.body`, `req.headers` — which one is used?

### Validation?

Is `zod`/`joi`/`yup` being used? What rules? What happens on validation failure?

### Authentication?

Which auth middleware? JWT? Session? API key?

### Authorization?

Role check? Permission check? Ownership check?

### Controller?

Function name → likely calls a service.

### Service?

Where is business logic? Does it throw `AppError`?

### Repository?

Where is database accessed? Prisma? Raw SQL?

### Database Query?

Which tables are read/written? What SQL does it generate?

### Transaction Needed?

Multiple writes that must be atomic?

### Cache Involved?

Is response cached? Cache invalidated on write?

### Logging?

Structured logs? Request ID? Error stack traces?

### Metrics?

Request duration? Status codes? Custom metrics?

### Error Handling?

Centralized `(err, req, res, next)` handler? `AppError` class?

### Response Format?

`{ data, meta }`? `{ error }`? Consistent format?

### Status Code?

200, 201, 204, 400, 401, 403, 404, 409, 500?

### Security Risks?

Input validated? Auth required? SQL injection possible? HTTPS?

### Performance Bottleneck?

N+1 queries? Missing indexes? No pagination? Large payload?

### Pagination Needed?

List endpoint without pagination = potential OOM.

### Rate Limiting?

Auth endpoints should have strict limits.

### Compression?

Large responses should be compressed.

### Monitoring?

Health check? Metrics endpoint?

### Versioning?

`/v1/` or `/v2/`? Breaking changes handled?

## Senior Engineer Mental Model

Never think just "Route". Think the full pipeline:

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

## Reverse Engineering Questions Summary

| Question | What to Check |
|----------|--------------|
| Input source? | `req.params` / `req.query` / `req.body` / `req.headers` |
| Validation? | `schema.parse()` / `.validate()` |
| Authentication? | `authenticate` middleware |
| Authorization? | `authorize()` / role/permission check |
| Error handling? | `(err, req, res, next)` middleware |
| Response format? | `{ data }` / `{ error }` structure |
| Database? | ORM (Prisma) vs raw SQL |
| Caching? | Redis / in-memory cache |
| Performance? | N+1 queries, pagination, indexes |
| Security? | Input validation, auth, HTTPS, Helmet |
## Next Steps

[Back to Chapter 16](16-observability-dependency-injection.md): Chapter 23 — Observability: Logs, Metrics, Traces
[Proceed to Chapter 18](18-projects-architecture.md): Chapter 26 — Project Ideas to learn about chapter 26 — project ideas.
