# 18 — Docker & Containerization for Node.js

## Why Docker?

Docker packages your Node.js application with its environment into a **container** — a lightweight, portable unit that runs identically on any system. This solves the "it works on my machine" problem and is essential for modern CI/CD and cloud deployment.

## Dockerfile Basics

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

| Instruction | Purpose |
|-------------|---------|
| `FROM` | Base image (Alpine = ~5 MB Linux) |
| `WORKDIR` | Working directory inside container |
| `COPY` | Copy files from host to image |
| `RUN` | Execute build-time commands |
| `EXPOSE` | Document which port the container listens on |
| `CMD` | Default command when container starts |

## Best Practices

### 1. Use `.dockerignore`

Prevent unnecessary files from bloating the image:

```
node_modules
.git
*.md
.env
coverage/
dist/
```

### 2. Multi-stage Builds

Separate build dependencies from the production image:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

Final image: build tools (TypeScript, webpack) not included.

### 3. Run as Non-root User

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && \
    chown -R node:node /app
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]
```

### 4. Minimize Layers

```dockerfile
# Bad — three layers
RUN apt-get update
RUN apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*

# Good — one layer
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*
```

## docker-compose for Local Development

Orchestrate multiple services with one command:

```yaml
# docker-compose.yml
version: "3.9"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
      - redis

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  pgdata:
```

```bash
# Start everything
docker compose up -d

# View logs
docker compose logs -f app

# Rebuild after package changes
docker compose up --build -d
```

## Health Checks

Docker can restart unhealthy containers automatically. Add a health endpoint:

```javascript
// server.js
app.get('/health', (req, res) => {
    const healthy = db.connected && redis.connected;
    res.status(healthy ? 200 : 503).json({ status: healthy ? 'ok' : 'degraded' });
});
```

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
```

## Graceful Shutdown

Node.js must handle `SIGTERM` (sent by Docker when stopping a container):

```javascript
const server = app.listen(3000);

process.on('SIGTERM', async () => {
    console.log('SIGTERM received — shutting down gracefully');

    // Stop accepting new connections
    server.close(() => {
        console.log('HTTP server closed');
    });

    // Close database connections
    await db.end();
    await redis.quit();

    // Exit after cleanup (Docker gives 10s by default)
    process.exit(0);
});
```

## Logging

Containers write logs to stdout/stderr — never to files:

```javascript
// Bad — Docker can't see this
fs.writeFileSync('/var/log/app.log', message);

// Good — Docker captures stdout/stderr automatically
console.log(JSON.stringify({ level: 'info', message, timestamp: new Date().toISOString() }));
```

## Environment Variables

```dockerfile
# Dockerfile — no secrets in image layers
# Use --env-file or docker-compose env_file at runtime
```

```bash
docker run -d --env-file .env.production myapp:latest
```

Never bake secrets into `Dockerfile` — they leak in image layers.

## Image Tagging Strategy

```bash
# Build with semantic version + git SHA
docker build -t myapp:1.2.3 -t myapp:latest .

# In CI, also tag with commit SHA for traceability
docker tag myapp:latest registry.example.com/myapp:$(git rev-parse --short HEAD)
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the app containerized? | Check for `Dockerfile`, `docker-compose.yml` in the project root |
| Is the base image minimal? | Alpine-based images are ~150 MB vs ~1 GB for full images |
| Are secrets baked into the image? | Check `Dockerfile` for hardcoded passwords/API keys |
| Does the app handle `SIGTERM`? | Check for `process.on('SIGTERM', ...)` — without it, containers are killed hard after 10s |
| Are logs written to files? | Should write to stdout — `docker logs` captures stdout/stderr only |
| Is there a health check? | Check for `HEALTHCHECK` in Dockerfile or `/health` endpoint |
| Is the app running as root? | Check for `USER node` in Dockerfile |
| Can CI reproduce the build? | `npm ci` (uses lockfile) is preferred over `npm install` |
| Are dev dependencies in production? | Multi-stage builds or `--only=production` prevent this |
| Is `.dockerignore` present? | Without it, `COPY . .` includes `node_modules` and build artifacts |
## Next Steps

[Back to Chapter 17](17-production-observability.md): 17 — Production Observability

[Proceed to Module 14](../14-networking/README.md): Networking, HTTP, REST APIs, WebSockets, GraphQL, Security to learn about networking and API development.
