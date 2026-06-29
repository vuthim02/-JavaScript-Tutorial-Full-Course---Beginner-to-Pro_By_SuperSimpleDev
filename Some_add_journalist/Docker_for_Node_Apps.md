# Docker for Node Apps — Containers, Compose, Dev & Prod

---

## 1. What Is Docker?

Docker packages your app + all its dependencies into a **container** — a lightweight, portable unit that runs identically everywhere.

```
Without Docker:            With Docker:
"It works on my machine"   "It works everywhere"

Your laptop             Your laptop
├── Node 18              ├── Docker
├── PostgreSQL 16        ├── Container: app (Node 20)
├── Redis 7              ├── Container: postgres (PG 16)
└── Ubuntu 22             └── Container: redis (Redis 7)

Production server        Production server
├── Node 20               ├── Docker
├── PostgreSQL 15         ├── Container: app (Node 20)
├── Redis 6               ├── Container: postgres (PG 16)
└── Debian 12             └── Container: redis (Redis 7)
```

**Problem:** Different OS, different Node versions, different Postgres versions → bugs.
**Solution:** Containers bundle the exact version of everything.

---

## 2. Dockerfile — Define Your App Container

```dockerfile
# Dockerfile
# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (for layer caching)
COPY package*.json ./
RUN npm ci --only=production

# ---- Runtime Stage ----
FROM node:20-alpine

WORKDIR /app

# Copy only what's needed
COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Why multi-stage?

Without multi-stage, the final image includes build tools (TypeScript compiler, devDependencies) — making it 10x larger.

```dockerfile
# Single stage (bad — 1.2GB)
FROM node:20
COPY . .
RUN npm ci
CMD ["node", "server.js"]

# Multi-stage (good — 180MB)
FROM node:20-alpine AS builder
FROM node:20-alpine
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["node", "server.js"]
```

### .dockerignore

```dockerignore
# .dockerignore
node_modules
.env
.git
logs
*.md
.DS_Store
```

---

## 3. Building & Running

```bash
# Build the image
docker build -t todo-api .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://postgres:password@host.docker.internal:5432/myapp \
  -e JWT_SECRET=my-secret \
  todo-api
```

**Flag breakdown:**
| Flag | What it does |
|---|---|
| `-p 3000:3000` | Map host port 3000 to container port 3000 |
| `-e KEY=VALUE` | Set environment variable |
| `-d` | Run in background (detached) |
| `--name my-app` | Give container a name |
| `--rm` | Auto-delete container when stopped |

---

## 4. Docker Compose — Run Everything Together

Compose defines your **multi-container setup** (app + database + cache) in one YAML file.

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
      - JWT_SECRET=dev-secret
    volumes:
      - .:/app              # live-reload in dev
      - /app/node_modules   # don't override container's node_modules
    depends_on:
      - db
    command: npx nodemon server.js  # dev with auto-restart

  db:
    image: postgres:16-alpine
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data  # persist data

volumes:
  pgdata:
```

### Usage

```bash
# Start everything
docker compose up

# Start in background
docker compose up -d

# Rebuild and start (after changing Dockerfile or package.json)
docker compose up --build

# View logs
docker compose logs -f app

# Run inside container
docker compose exec app sh

# Run Prisma migration inside container
docker compose exec app npx prisma migrate dev

# Stop everything
docker compose down

# Stop + delete volumes (wipes database data)
docker compose down -v
```

---

## 5. Production Dockerfile

```dockerfile
# Dockerfile.prod
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
```

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    restart: always
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: always

volumes:
  pgdata:
```

```bash
# Run production stack
docker compose -f docker-compose.prod.yml up -d
```

---

## 6. Docker Compose for Testing

```yaml
# docker-compose.test.yml
version: '3.8'

services:
  test:
    build: .
    environment:
      - NODE_ENV=test
      - DATABASE_URL=postgresql://postgres:password@test-db:5432/myapp_test
      - JWT_SECRET=test-secret
    command: npx prisma migrate deploy && npm test
    depends_on:
      test-db:
        condition: service_healthy

  test-db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp_test
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 5s
      timeout: 5s
      retries: 5
```

```bash
docker compose -f docker-compose.test.yml up --abort-on-container-exit
```

---

## 7. Common Docker Commands

```bash
# Images
docker images                  # list images
docker build -t my-app .       # build image
docker rmi my-app              # remove image
docker prune                   # clean unused images/containers

# Containers
docker ps                      # running containers
docker ps -a                   # all containers (including stopped)
docker logs -f container-name  # follow logs
docker exec -it container sh   # shell into running container
docker stop container          # stop gracefully
docker kill container          # force stop
docker rm container            # delete stopped container

# Compose
docker compose up -d           # start all services in background
docker compose down            # stop + remove containers
docker compose logs -f         # follow all logs
docker compose ps              # show service status
```

---

## 8. Environment Variables with Compose

```yaml
# Option 1 — inline
services:
  app:
    environment:
      - NODE_ENV=production

# Option 2 — from .env file (auto-loaded by docker compose)
services:
  app:
    env_file: .env

# Option 3 — mix: base in file, secrets passed separately
services:
  app:
    env_file: .env
    environment:
      - JWT_SECRET=${JWT_SECRET}  # from host env or .env
```

**.env file (auto-loaded by docker compose):**
```
DATABASE_URL=postgresql://postgres:password@db:5432/myapp
JWT_SECRET=dev-secret
```

**Note:** `docker compose` automatically reads `.env` from the same directory. These are NOT the same as container env vars — they're substituted into the compose file.

---

## 9. Networking — How Containers Talk

When Compose creates services, they join a **default network** and can reach each other by **service name**.

```yaml
services:
  app:
    # Can reach: db:5432
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
                    #                              ↑ service name, not localhost

  db:
    # Can reach: app:3000
```

**Why not `localhost`?** Each container has its own localhost. `localhost` inside the `app` container refers to itself, not the database. Use the service name (`db`) as the hostname.

### Custom networks

```yaml
services:
  app:
    networks:
      - frontend
      - backend
  db:
    networks:
      - backend  # db is NOT on frontend — isolated

networks:
  frontend:
  backend:
```

---

## 10. Volumes — Persistent Data

Container filesystems are **ephemeral** — gone when the container stops. Volumes persist data.

```yaml
services:
  db:
    volumes:
      - pgdata:/var/lib/postgresql/data   # named volume (persists across restarts)

  app:
    volumes:
      - .:/app                             # bind mount (syncs host ↔ container)
      - /app/node_modules                  # anonymous volume (prevents overwrite)

volumes:
  pgdata:  # named volume declared here
```

| Type | Syntax | Persists? | Use |
|---|---|---|---|
| Named volume | `pgdata:/path` | Yes | Database data |
| Bind mount | `.:/app` | N/A (syncs) | Live code reload |
| Anonymous | `/app/node_modules` | No | Don't overwrite container files |

---

## 11. .dockerignore — Don't Send the Kitchen Sink

```dockerignore
node_modules
.git
.env
*.md
logs/
coverage/
.DS_Store
.vscode/
.gitignore
```

Without this, `docker build` sends your entire project (including `node_modules`) to the Docker daemon. The build context (what gets sent) should be as small as possible.

---

## 12. Production Checklist

```
☐ Multi-stage Dockerfile (small image size)
☐ .dockerignore (exclude node_modules, .git, .env)
☐ Non-root user in container (USER appuser)
☐ HEALTHCHECK defined
☐ restart: always on services
☐ Secrets via env vars, not baked into image
☐ Database volume persists (named volume)
☐ docker-compose.prod.yml separate from dev
☐ Image tagged with version (my-app:v1.2.3)
☐ CI/CD builds and pushes to registry
```

---

## 13. Quick Reference

| Concept | Key Point |
|---|---|
| Container | Lightweight VM — bundles app + dependencies |
| Image | Snapshot of a container (built from Dockerfile) |
| Dockerfile | Recipe to build your image |
| Compose | Define multi-container setup in YAML |
| Volume | Persist data across container restarts |
| Bind mount | Sync host directory into container (dev) |
| Service name | Container hostname in Compose network |
| Multi-stage | Build in one stage, copy only artifacts to final |
| .dockerignore | Exclude files from build context |
| HEALTHCHECK | Docker checks if app is alive |

---

*Last updated: June 2026*
