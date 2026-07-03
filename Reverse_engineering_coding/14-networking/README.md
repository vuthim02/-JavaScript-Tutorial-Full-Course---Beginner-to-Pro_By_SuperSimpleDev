# Part 14 — Networking, HTTP, REST APIs, WebSockets, GraphQL, Authentication, Security, and API Architecture

Split chapter files from the original comprehensive guide. Each file covers one focused subtopic (100-200 lines).

## Files

| # | File | Topic |
|---|------|-------|
| 01 | [01-osi-model.md](01-osi-model.md) | OSI model layers, Client-Server model, IP addressing (IPv4/IPv6) |
| 02 | [02-dns.md](02-dns.md) | Domain Name System — resolution flow, record types, Node.js API, caching |
| 03 | [03-tcp-udp.md](03-tcp-udp.md) | TCP vs UDP — handshake, ports, termination, Node.js `net` module |
| 04 | [04-http-versions-methods.md](04-http-versions-methods.md) | HTTP protocol, HTTP/1.1 vs HTTP/2 vs HTTP/3, HTTP methods |
| 05 | [05-http-status-headers-body.md](05-http-status-headers-body.md) | Status codes (2xx-5xx), HTTP headers, request body formats |
| 06 | [06-json-rest-url.md](06-json-rest-url.md) | JSON serialization, REST architecture, URL structure |
| 07 | [07-cookies-sessions.md](07-cookies-sessions.md) | HTTP cookies, SameSite, server-side sessions |
| 08 | [08-jwt.md](08-jwt.md) | JWT structure, creation/verification, refresh tokens |
| 09 | [09-authentication-authorization.md](09-authentication-authorization.md) | AuthN vs AuthZ, RBAC, password hashing with bcrypt |
| 10 | [10-oauth.md](10-oauth.md) | OAuth 2.0 authorization code flow, OpenID Connect, Passport |
| 11 | [11-cors-tls.md](11-cors-tls.md) | Same-origin policy, CORS, preflight, TLS handshake |
| 12 | [12-websockets.md](12-websockets.md) | WebSocket handshake, server/client, heartbeat |
| 13 | [13-sse.md](13-sse.md) | Server-Sent Events — one-way real-time communication |
| 14 | [14-graphql.md](14-graphql.md) | GraphQL schema, queries, mutations, resolvers, DataLoader |
| 15 | [15-file-uploads-pagination.md](15-file-uploads-pagination.md) | File uploads (multer), offset/cursor pagination |
| 16 | [16-rate-limiting.md](16-rate-limiting.md) | Rate limiting algorithms, fixed window, brute-force protection |
| 17 | [17-caching-api-versioning.md](17-caching-api-versioning.md) | Caching strategies (Redis), cache headers, API versioning |
| 18 | [18-security.md](18-security.md) | XSS, CSRF, SQL injection, Helmet, security headers |
| 19 | [19-api-gateway-reverse-proxy.md](19-api-gateway-reverse-proxy.md) | API gateway, Nginx reverse proxy, SSL termination |
| 20 | [20-load-balancing-webhooks.md](20-load-balancing-webhooks.md) | Load balancing algorithms, webhooks, polling vs push |
| 21 | [21-tactical-questions-projects.md](21-tactical-questions-projects.md) | Reverse engineering questions, bottleneck analysis, projects |
| 22 | [22-owasp-top-10.md](22-owasp-top-10.md) | OWASP Top 10 security risks: broken access control, injection, SSRF, crypto failures, and more with Node.js defenses |

## Index of Topics

- **OSI model**, TCP/UDP, DNS
- **HTTP/1.1 vs HTTP/2 vs HTTP/3**
- **REST API design**: resource naming, status codes, versioning
- **WebSockets**: handshake, frames, `ws` library
- **GraphQL**: queries, mutations, resolvers
- **Authentication**: Basic, Session, JWT, OAuth 2.0, OpenID Connect
- **Security**: CORS, CSRF, XSS, SQL injection, Helmet
- **Rate limiting**, API gateways, caching, load balancing, webhooks

## Practice

Test your understanding with coding exercises:

```bash
node ../exercises/14-networking.js
```

## Next Steps

[Back to Module 13](../13-nodejs/README.md): Node.js Ecosystem, Runtime Internals, Streams, Buffers, Processes

[Proceed to Module 15](../15-databases/README.md): Databases and Data Engineering to learn about databases and data engineering.
