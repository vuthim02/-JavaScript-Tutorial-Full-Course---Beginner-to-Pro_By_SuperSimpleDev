# DevOps and Deployment for JavaScript: Comprehensive Research

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

## Table of Contents

1. [Docker](#1-docker)
2. [Docker Best Practices](#2-docker-best-practices)
3. [CI/CD](#3-cicd)
4. [GitHub Actions](#4-github-actions)
5. [Deployment Platforms](#5-deployment-platforms)
6. [Serverless](#6-serverless)
7. [Edge Computing](#7-edge-computing)
8. [NGINX](#8-nginx)
9. [PM2](#9-pm2)
10. [Environment Management](#10-environment-management)
11. [Logging](#11-logging)
12. [Monitoring](#12-monitoring)
13. [APM (Application Performance Monitoring)](#13-apm)
14. [Error Tracking](#14-error-tracking)
15. [SSL/TLS Certificates](#15-ssltls-certificates)
16. [Domain Configuration](#16-domain-configuration)
17. [Load Balancing Strategies](#17-load-balancing-strategies)
18. [Blue-Green Deployment](#18-blue-green-deployment)
19. [Canary Deployment](#19-canary-deployment)
20. [Rollback Strategies](#20-rollback-strategies)
21. [Infrastructure as Code](#21-infrastructure-as-code)
22. [Kubernetes Basics](#22-kubernetes-basics)
23. [Reverse Proxy Patterns](#23-reverse-proxy-patterns)
24. [API Gateway Patterns](#24-api-gateway-patterns)
25. [Circuit Breaker Pattern](#25-circuit-breaker-pattern)
26. [Health Checks and Readiness Probes](#26-health-checks-and-readiness-probes)
27. [Graceful Shutdown](#27-graceful-shutdown)
28. [Database Migration in Production](#28-database-migration-in-production)
29. [Zero-Downtime Deployment](#29-zero-downtime-deployment)
30. [Cost Optimization](#30-cost-optimization)

---

## 1. Docker

### What is Docker?

Docker is a platform for building, shipping, and running applications in isolated environments called **containers**. Containers package an application with all its dependencies, libraries, and configuration files, ensuring it runs consistently across any environment.

### Dockerfile

A `Dockerfile` is a text file containing instructions to build a Docker image. Each instruction creates a **layer** in the image.

```dockerfile
# Basic Node.js Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
```

**Core Instructions:**

| Instruction | Purpose |
|------------|---------|
| `FROM` | Base image (must be first) |
| `WORKDIR` | Set working directory |
| `COPY` | Copy files from build context into image |
| `ADD` | Like COPY but auto-extracts tarballs and supports URLs |
| `RUN` | Execute command during build (creates a new layer) |
| `ENV` | Set runtime environment variable |
| `ARG` | Build-time variable (not in final image) |
| `EXPOSE` | Document which port the app listens on (informational only) |
| `CMD` | Default command to run when container starts |
| `ENTRYPOINT` | Fixed executable that always runs |
| `USER` | Switch to non-root user |
| `HEALTHCHECK` | Define how to test if container is working |
| `LABEL` | Add metadata (doesn't add size) |

### docker-compose

`docker-compose.yml` defines a multi-container application in a single YAML file. One command starts everything.

```yaml
# docker-compose.yml
name: myapp

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://user:pass@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

**Key Commands:**
```bash
docker compose up -d              # Start detached
docker compose up -d --build      # Rebuild and start
docker compose down               # Stop and remove
docker compose logs -f web        # Stream logs
docker compose exec web sh        # Shell into running container
docker compose ps                 # List running services
```

### Multi-Stage Builds

Multi-stage builds separate the build environment from the runtime environment, dramatically reducing final image size.

```dockerfile
# Stage 1: Build (includes all dev tools)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production (minimal runtime only)
FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

USER appuser
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

**Impact:** A Node.js app goes from ~1.2GB (single stage) to ~150MB (multi-stage) or ~80MB with distroless.

### Node.js Images

| Image | Size | Use Case |
|-------|------|----------|
| `node:20` | ~1GB | Full Debian with all build tools |
| `node:20-slim` | ~200MB | Minimal Debian (needs a shell) |
| `node:20-alpine` | ~50MB | Alpine Linux (musl libc, smaller) |
| `gcr.io/distroless/nodejs20` | ~60MB | No shell, no package manager (maximum security) |

---

## 2. Docker Best Practices

### .dockerignore

Prevents unnecessary files from entering the build context. Without it, `node_modules` (500MB+) gets sent every time.

```
# .dockerignore
node_modules
.git
.gitignore
.env
.env.*
*.log
coverage/
.nyc_output/
dist/
build/
.next/
.DS_Store
Thumbs.db
README.md
docs/
*.test.*
*.spec.*
__tests__/
Dockerfile*
docker-compose*.yml
```

### Layer Caching

The golden rule: **put things that change LESS OFTEN higher in the file**. A cache miss invalidates ALL layers below it.

```dockerfile
# BAD: Any source file change reinstalls everything
COPY . .
RUN npm ci

# GOOD: Dependencies cached separately from source
COPY package.json package-lock.json ./
RUN npm ci
COPY . .  # Source changes here — cheap layer
```

**Change frequency (least to most):** Base image → system deps → package.json → source code

### Non-Root User

Running as root is a security risk — if an attacker exploits the app, they get root access.

```dockerfile
# Node.js images include a built-in 'node' user (uid 1000)
FROM node:20-alpine
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node
CMD ["node", "server.js"]
```

### Health Checks

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

### BuildKit Cache Mounts

BuildKit (default since Docker 23) adds `RUN --mount` for advanced caching.

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci
```

### BuildKit Secret Mounts

Never bake secrets into image layers — use secret mounts.

```dockerfile
RUN --mount=type=secret,id=npm_token \
    NPM_TOKEN=$(cat /run/secrets/npm_token) npm install
```

```bash
docker build --secret id=npm_token,src=.npmrc .
```

### Security Scanning

```bash
# Docker Scout (built into Docker CLI)
docker scout cves myapp:latest --only-severity critical,high

# Trivy (open source)
trivy image --severity HIGH,CRITICAL --exit-code 1 myapp:latest
```

### Read-Only Containers

```bash
docker run -d --read-only --tmpfs /tmp --tmpfs /run myapp
```

### Capabilities

```bash
docker run -d --cap-drop ALL --cap-add NET_BIND_SERVICE myapp
```

---

## 3. CI/CD

### What is CI/CD?

- **Continuous Integration (CI):** Developers merge code frequently. Each merge triggers automated build and test. Target: under 10 minutes from commit to test results.
- **Continuous Delivery (CD):** Every passing CI build produces a deployable artifact. Deployment to staging is automatic; production requires human approval.
- **Continuous Deployment:** Every passing pipeline run deploys to production automatically with no human approval. Requires high test coverage and robust monitoring/rollback.

### CI/CD Tools Comparison (2026)

| Factor | GitHub Actions | Jenkins | GitLab CI | CircleCI |
|--------|---------------|---------|-----------|----------|
| Hosting | Managed | Self-hosted | Both | Managed |
| Cost | Free (2000 min/mo) | Infra only | Free tier, $19/mo+ | $15/mo/user |
| Setup | 5 minutes | 2-4 hours | 15 minutes | 10 minutes |
| Config | YAML | Groovy | YAML | YAML |
| Best for | GitHub teams | Enterprise | GitLab users | Speed/DX |

### Pipeline Stages

A production pipeline has distinct stages that run in sequence, each acting as a quality gate:

1. **Build & Lint** — compile code, check formatting
2. **Test** — unit, integration, e2e tests (parallel)
3. **Security Scan** — dependency vulnerabilities, SAST, container scanning
4. **Docker Build** — build and push container image
5. **Deploy to Staging** — automatic on develop branch
6. **Deploy to Production** — requires approval on main branch

---

## 4. GitHub Actions

### Workflow Structure

Workflows live in `.github/workflows/*.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm test
```

### Triggers

| Trigger | Description |
|---------|-------------|
| `on: push` | Run on every push |
| `on: push: branches: [main]` | Only on pushes to main |
| `on: pull_request` | On PR open/sync/reopen |
| `on: schedule: - cron: "0 6 * * 1"` | Scheduled (Mondays 06:00 UTC) |
| `on: workflow_dispatch` | Manual trigger via UI |
| `on: workflow_dispatch: inputs:` | Manual with user inputs |
| `on: workflow_call` | Callable by other workflows |
| `on: release: types: [published]` | On release published |
| `on: push: paths: ["src/**"]` | Only when src/ files change |

### Matrix Builds

Test across multiple versions/OS in parallel:

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18, 20, 22]
      fail-fast: false
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci && npm test
```

### Caching

```yaml
# Built-in caching for Node.js
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'

# Generic cache action
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: ${{ runner.os }}-node-
```

### Secrets

```yaml
# Repository secrets stored in Settings > Secrets
steps:
  - run: echo "Deploying..."
    env:
      API_KEY: ${{ secrets.API_KEY }}
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Reusable Workflows

```yaml
# Define reusable workflow
# .github/workflows/deploy.yml
on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
    secrets:
      DEPLOY_KEY:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    steps:
      - run: echo "Deploying to ${{ inputs.environment }}"
```

```yaml
# Call from another workflow
jobs:
  deploy:
    uses: ./.github/workflows/deploy.yml
    with:
      environment: production
    secrets:
      DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

### OIDC Authentication (No Static Keys)

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assum: arn:aws:iam::123456789:role/GitHubActionsRole
          aws-region: us-east-1
```

---

## 5. Deployment Platforms

### Platform Comparison

| Platform | Type | Free Tier | Best For |
|----------|------|-----------|----------|
| **Vercel** | Serverless-first | 100GB bandwidth | Next.js, frontend |
| **Netlify** | Serverless-first | 100GB bandwidth | Static sites, JAMstack |
| **Railway** | Container PaaS | $5 credit | Full-stack apps |
| **Render** | Container PaaS | Free tier | Simple deployments |
| **Fly.io** | Container PaaS | 3 shared VMs | Global distribution |
| **AWS EC2** | Virtual servers | 12mo free | Full control |
| **AWS ECS** | Container orchestration | Pay for resources | Production containers |
| **AWS Lambda** | Serverless functions | 1M requests/mo | Event-driven |
| **AWS Amplify** | Frontend + API | 12mo free | AWS-integrated apps |
| **Google Cloud Run** | Serverless containers | 2M requests/mo | Auto-scaling containers |
| **Azure** | Full cloud platform | $200 credit | Enterprise .NET |

### Vercel

```bash
npm install -g vercel
vercel              # Deploy preview
vercel --prod       # Deploy to production
```

- Automatic CI/CD on git push
- Serverless functions in `/api` directory
- Edge network (CDN) by default
- Zero-config for Next.js, React, Vue, Svelte

### Netlify

```bash
npm install -g netlify-cli
netlify init        # Connect to repo
netlify deploy      # Deploy preview
```

- Form handling, identity, functions built-in
- Deploy previews on PRs
- Serverless functions in `/netlify/functions`

### Railway

- Git-based deployment
- Automatic Dockerfile detection
- Built-in databases (Postgres, Redis, MySQL)
- Environment variables and secrets management

### Render

- Free tier for static sites and web services
- Auto-deploy from git
- Managed Postgres, Redis
- Background workers and cron jobs

### AWS Services

| Service | Use Case |
|---------|----------|
| **EC2** | Full virtual machine control |
| **ECS** | Container orchestration (Fargate for serverless containers) |
| **Lambda** | Serverless functions (Node.js supported natively) |
| **Amplify** | Frontend hosting + backend API |
| **EKS** | Managed Kubernetes |
| **RDS** | Managed relational databases |

### Google Cloud Run

- Deploy any container that listens on a port
- Scales to zero (no traffic = no cost)
- Automatic HTTPS
- CPU always allocated option available

---

## 6. Serverless

### What is Serverless?

Serverless computing runs code without managing servers. The cloud provider handles provisioning, scaling, and infrastructure. You pay only for execution time.

### AWS Lambda

```javascript
// handler.js
exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda!' }),
  };
  return response;
};
```

```bash
# Deploy with AWS CLI
aws lambda create-function \
  --function-name myFunction \
  --runtime nodejs20.x \
  --handler handler.handler \
  --role arn:aws:iam::role/lambda-role \
  --zip-file fileb://function.zip
```

**Lambda + API Gateway:**
```javascript
// Express app running in Lambda (with serverless-express)
const serverless = require('serverless-express');
const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  res.json({ users: [] });
});

module.exports.handler = serverless(app);
```

### Vercel Functions

```javascript
// api/hello.js — automatically becomes a serverless function
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Vercel!' });
}
```

```javascript
// api/users/[id].js — dynamic route
export default function handler(req, res) {
  const { id } = req.query;
  res.status(200).json({ userId: id });
}
```

### Netlify Functions

```javascript
// netlify/functions/hello.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify!' }),
  };
};
```

### Cloudflare Workers

```javascript
// worker.js — runs on Cloudflare's edge network
export default {
  async fetch(request, env, ctx) {
    return new Response('Hello from Cloudflare Workers!', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};
```

**Key Characteristics:**
- Cold starts: 1-5ms (Cloudflare), 50-500ms (AWS Lambda)
- Execution limits: 30s (Lambda), 30s (Vercel), 30s (Cloudflare)
- Memory: 128MB-10GB (Lambda), 128MB-3GB (Vercel), 128MB (Cloudflare)

---

## 7. Edge Computing

### What is Edge Computing?

Edge computing runs code closer to users, at CDN edge locations worldwide, reducing latency by serving requests from the nearest geographic point.

### Edge Functions

```javascript
// Vercel Edge Function
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  return new Response('Hello from the edge!', {
    headers: { 'content-type': 'text/plain' },
  });
}
```

### Edge Middleware

```javascript
// Vercel Edge Middleware (runs before request reaches your app)
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};

export function middleware(request) {
  const token = request.cookies.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}
```

### Cloudflare Workers (Edge-Native)

```javascript
// Runs in 300+ edge locations worldwide
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/api/geo') {
      const country = request.cf?.country || 'unknown';
      return Response.json({ country });
    }
  },
};
```

### Edge vs Serverless

| Feature | Edge Functions | Serverless Functions |
|---------|---------------|---------------------|
| Location | Single region (nearest edge) | Single AWS region |
| Cold start | < 1ms | 50-500ms |
| Runtime limitations | V8 isolates (no native modules) | Full Node.js |
| Use case | Middleware, A/B testing, auth | Heavy compute, DB operations |
| Execution time | 30s | 15 min |

---

## 8. NGINX

### What is NGINX?

NGINX is a high-performance web server, reverse proxy, load balancer, and HTTP cache. It handles concurrent connections efficiently using an event-driven architecture.

### Reverse Proxy

```nginx
# /etc/nginx/conf.d/myapp.conf
upstream myapp_backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
}

server {
    listen 80;
    server_name myapp.example.com;

    location / {
        proxy_pass http://myapp_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Load Balancing

```nginx
upstream backend {
    # Round-robin (default)
    server 10.0.0.1:3000;
    server 10.0.0.2:3000;

    # Least connections
    least_conn;
    server 10.0.0.3:3000;

    # IP hash (sticky sessions)
    ip_hash;
    server 10.0.0.4:3000;

    # Weighted
    server 10.0.0.5:3000 weight=3;
}
```

### SSL Termination

```nginx
server {
    listen 443 ssl http2;
    server_name myapp.example.com;

    ssl_certificate /etc/letsencrypt/live/myapp.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myapp.example.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:3000;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name myapp.example.com;
    return 301 https://$server_name$request_uri;
}
```

### Static File Serving

```nginx
server {
    listen 80;
    server_name myapp.example.com;

    location / {
        root /var/www/myapp/dist;
        try_files $uri $uri/ /index.html;  # SPA routing
    }

    location /static {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 9. PM2

### What is PM2?

PM2 is a Node.js process manager that keeps applications alive forever, provides clustering for load balancing, log management, and monitoring.

### Basic Usage

```bash
# Start application
pm2 start server.js

# Start with name
pm2 start server.js --name "myapp"

# List processes
pm2 list

# Monitor processes
pm2 monit

# View logs
pm2 logs
pm2 logs myapp

# Restart
pm2 restart myapp

# Stop
pm2 stop myapp

# Delete
pm2 delete myapp
```

### Clustering

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'myapp',
      script: './server.js',
      instances: 'max',         // Use all CPU cores
      exec_mode: 'cluster',     // Cluster mode (load balancing)
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      max_memory_restart: '500M',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
```

```bash
pm2 start ecosystem.config.js
pm2 save                          # Save process list
pm2 startup                       # Auto-start on system reboot
```

### Monitoring

```bash
pm2 monit                         # Real-time monitoring dashboard
pm2 status                        # Quick status overview
pm2 show myapp                    # Detailed process info
pm2 logs myapp --lines 100        # Last 100 lines of logs
```

### PM2 + NGINX (Production Setup)

The standard production stack: NGINX as reverse proxy (handles SSL, static files, load balancing) → PM2 cluster mode (distributes requests across Node.js workers).

```nginx
# NGINX upstream to PM2 cluster
upstream node_cluster {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}
```

Or use PM2's built-in `pm2 serve` for static files:
```bash
pm2 serve /var/www/myapp/dist 80 --name "static" --spa
```

---

## 10. Environment Management

### .env Files

```bash
# .env (local development - never commit to git)
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/mydb
JWT_SECRET=my-super-secret-key
API_KEY=sk_test_abc123
```

```bash
# .env.production (production settings)
NODE_ENV=production
PORT=3000
DATABASE_URL=postgres://user:password@prod-db:5432/mydb
JWT_SECRET=production-secret-key
```

### Using dotenv in Node.js

```javascript
// Load as early as possible
require('dotenv').config();

// Or with ES modules
import 'dotenv/config';

console.log(process.env.DATABASE_URL);
```

### .gitignore

```
.env
.env.local
.env.*.local
```

### Secrets Management

**Never commit secrets to git. Never put secrets in Docker ENV.**

| Method | Use Case |
|--------|----------|
| `.env` files (gitignored) | Local development |
| CI/CD secrets (GitHub Actions Secrets) | Pipeline credentials |
| AWS Secrets Manager | Production runtime secrets |
| HashiCorp Vault | Enterprise secrets management |
| Kubernetes Secrets | Container orchestration |

### Docker Secrets

```dockerfile
# BuildKit secret mounts (never in image layers)
RUN --mount=type=secret,id=db_password \
    DB_PASS=$(cat /run/secrets/db_password) npm run migrate
```

### HashiCorp Vault

```javascript
// Fetch secrets at runtime
const vault = require('node-vault')();
const { data } = await vault.read('secret/data/myapp/database');
const dbPassword = data.data.password;
```

---

## 11. Logging

### Structured Logging (JSON)

Structured logs are machine-parseable and essential for log aggregation systems.

```javascript
// Bad: unstructured
console.log('User 123 logged in from 192.168.1.1');

// Good: structured JSON
console.log(JSON.stringify({
  level: 'info',
  msg: 'User logged in',
  userId: '123',
  ip: '192.168.1.1',
  timestamp: new Date().toISOString(),
}));
```

### Winston

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

logger.info('Server started', { port: 3000 });
logger.error('Database connection failed', { error: err.message });
```

### Pino

Pino is faster than Winston (10x) and outputs JSON by default.

```javascript
const pino = require('pino');
const logger = pino({ level: 'info' });

logger.info({ port: 3000 }, 'Server started');
logger.error({ err: error }, 'Something went wrong');

// Pino + HTTP transport for production
const logger = pino({
  transport: {
    target: 'pino/file',
    options: { destination: '/var/log/app.log' },
  },
});
```

### Log Aggregation (Loki + Promtail)

```yaml
# Promtail config — ships Docker logs to Loki
scrape_configs:
  - job_name: docker
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
    relabel_configs:
      - source_labels: ['__meta_docker_container_name']
        target_label: container
```

**Query in Grafana (LogQL):**
```
{container="myapp-web"} |= "ERROR"
{service="api"} | json | level="error"
```

### Best Practices

- Always use structured logging (JSON)
- Include request ID / trace ID for distributed tracing
- Never log sensitive data (passwords, tokens, PII)
- Use different log levels: error > warn > info > debug
- Centralize logs with Loki, ELK, or CloudWatch

---

## 12. Monitoring

### The Monitoring Stack

```
Application → Metrics → Prometheus → Grafana (dashboards + alerts)
Application → Logs → Promtail → Loki → Grafana
Application → Traces → Jaeger/Tempo → Grafana
```

### Prometheus + Grafana (Self-Hosted)

```yaml
# docker-compose.monitoring.yml
services:
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:v0.49.1
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro

  prometheus:
    image: prom/prometheus:v2.53.0
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro

  grafana:
    image: grafana/grafana:11.1.0
    ports:
      - "3000:3000"
```

### Key Metrics to Monitor

| Category | Metrics |
|----------|---------|
| **Application** | Request rate, error rate, response time (p50, p95, p99) |
| **System** | CPU usage, memory usage, disk I/O, network |
| **Container** | Container CPU, memory, restarts, OOM kills |
| **Business** | Active users, signups, revenue |

### Essential PromQL Queries

```promql
# Request rate
rate(http_requests_total[5m])

# Error rate
rate(http_requests_total{status=~"5.."}[5m])

# 95th percentile response time
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Container CPU usage %
rate(container_cpu_usage_seconds_total[5m]) * 100

# Container memory usage
container_memory_working_set_bytes / 1024 / 1024

# Container restarts
increase(container_restarts_total[1h])
```

### Sentry (SaaS)

- Real-time error tracking
- Performance monitoring
- Session replay
- Release tracking

### DataDog

- Full observability platform
- APM, logs, metrics, traces in one
- 14-day free trial

### New Relic

- Full-stack observability
- Free tier: 100GB/month ingest
- Application, infrastructure, and browser monitoring

---

## 13. APM (Application Performance Monitoring)

### What is APM?

APM monitors application performance in real-time: response times, throughput, error rates, database queries, and external service calls.

### APM Tools

| Tool | Type | Free Tier |
|------|------|-----------|
| **New Relic** | Full APM | 100GB/month |
| **DataDog** | Full APM | 14-day trial |
| **Elastic APM** | Self-hosted | Open source |
| **Prometheus + Grafana** | Self-hosted | Open source |

### Node.js APM with New Relic

```javascript
// Require at the very top of your entry point
require('newrelic');

// newrelic.js
exports.config = {
  app_name: ['My Application'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: { level: 'info' },
};
```

### Custom Metrics

```javascript
// Record custom metrics
const newrelic = require('newrelic');

newrelic.incrementCounter('orders/created');
newrelic.recordMetric('orders/value', orderTotal);
newrelic.noticeError(error, { orderId: '123' });
```

### Key APM Metrics

- **Apdex score** (0-1): User satisfaction with response time
- **Throughput**: Requests per second
- **Error rate**: Percentage of failed requests
- **Response time percentiles**: p50, p95, p99
- **Database query time**: Slow query detection
- **External call time**: Third-party API latency

---

## 14. Error Tracking

### Sentry

```javascript
// Install: npm install @sentry/node
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0, // 100% of transactions for profiling
});

// Capture errors
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: { userId: '123' },
    extra: { orderTotal: 99.99 },
  });
}

// Capture messages
Sentry.captureMessage('Something important happened', 'info');
```

### Bugsnag

```javascript
const Bugsnag = require('@bugsnag/js');
Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  notifyReleaseStages: ['staging', 'production'],
});
```

### LogRocket

```javascript
// Frontend session replay + error tracking
import LogRocket from 'logrocket';
LogRocket.init('your-app/id');
```

### Best Practices

- Track errors across all environments (dev, staging, production)
- Use source maps for minified production code
- Set up alerts for new/regression errors
- Include user context and breadcrumbs
- Use release tracking to identify which deploy introduced bugs

---

## 15. SSL/TLS Certificates

### Let's Encrypt (Free SSL)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d myapp.example.com

# Auto-renewal (runs via cron)
sudo certbot renew --dry-run
```

### NGINX SSL Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name myapp.example.com;

    ssl_certificate /etc/letsencrypt/live/myapp.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myapp.example.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
}
```

### Cloudflare SSL

- Free SSL/TLS with any plan
- Full (strict) mode: end-to-end encryption
- Origin certificates available for your server
- Automatic certificate provisioning and renewal

### Docker SSL

```nginx
# NGINX in Docker with Let's Encrypt
services:
  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./certs:/etc/nginx/certs:ro
    ports:
      - "80:80"
      - "443:443"
```

---

## 16. Domain Configuration

### DNS (Domain Name System)

| Record Type | Purpose | Example |
|-------------|---------|---------|
| `A` | Maps domain to IPv4 address | `example.com → 1.2.3.4` |
| `AAAA` | Maps domain to IPv6 address | `example.com → 2001:db8::1` |
| `CNAME` | Alias to another domain | `www → example.com` |
| `MX` | Mail server | `example.com → mail.example.com` |
| `TXT` | Text records (verification, SPF) | `v=spf1 include:_spf.google.com ~all` |
| `NS` | Nameserver | `example.com → ns1.example.com` |

### CDN (Content Delivery Network)

```nginx
# Cache static assets with Cloudflare
# Cloudflare handles SSL termination, caching, DDoS protection
# Your origin server only handles dynamic requests

# Cache headers for static assets
location /static {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# No-cache for API responses
location /api {
    add_header Cache-Control "no-store, no-cache";
}
```

### Caching Strategy

```
Browser Cache → CDN Cache → NGINX Cache → Application Cache → Database
```

| Layer | TTL | What to Cache |
|-------|-----|---------------|
| Browser | 1 year | Static assets (hashed filenames) |
| CDN | 5 min - 1 hour | HTML pages, API responses |
| NGINX | 5 min | API responses, server-side renders |
| App (Redis/Memcached) | Varies | Database queries, sessions |

---

## 17. Load Balancing Strategies

### Strategies

| Strategy | How it Works | Best For |
|----------|-------------|----------|
| **Round Robin** | Requests distributed sequentially | Equal-weight servers |
| **Least Connections** | Send to server with fewest active connections | Long-lived connections |
| **IP Hash** | Same client always hits same server | Session persistence |
| **Weighted** | More requests to higher-capacity servers | Heterogeneous servers |
| **Random** | Random server selection | Simple load distribution |

### NGINX Load Balancing

```nginx
upstream backend {
    # Round Robin (default)
    server 10.0.0.1:3000;
    server 10.0.0.2:3000;

    # Least connections
    least_conn;
    server 10.0.0.3:3000;

    # Weighted
    server 10.0.0.4:3000 weight=3;

    # Backup server (used only when primary is down)
    server 10.0.0.5:3000 backup;

    # Health check
    server 10.0.0.6:3000 max_fails=3 fail_timeout=30s;
}
```

### Application-Level Load Balancing (Node.js)

```javascript
// Using a simple round-robin in the application itself
const servers = [
  { url: 'http://10.0.0.1:3000', active: 0 },
  { url: 'http://10.0.0.2:3000', active: 0 },
];

function getServer() {
  return servers.reduce((prev, curr) =>
    prev.active <= curr.active ? prev : curr
  );
}
```

---

## 18. Blue-Green Deployment

### Concept

Blue-green deployment maintains two identical production environments. Blue is live; green is idle. Deploy new version to green, test it, then switch traffic from blue to green instantly.

### How it Works

```
1. BLUE (live) serves all traffic
2. Deploy new version to GREEN
3. Run smoke tests on GREEN
4. Switch load balancer: BLUE → GREEN
5. GREEN is now live
6. Keep BLUE as rollback target
```

### NGINX Blue-Green

```nginx
upstream live {
    server 10.0.0.1:3000;  # Blue
}

upstream staging {
    server 10.0.0.2:3000;  # Green
}

# To switch: edit nginx.conf to point 'live' to green server
# Then: nginx -s reload
```

### Docker Compose Blue-Green

```yaml
services:
  blue:
    image: myapp:v1
    networks:
      - production

  green:
    image: myapp:v2
    networks:
      - production

  nginx:
    image: nginx:alpine
    depends_on:
      - blue
    networks:
      - production
    # Change nginx config to point to green after testing
```

### Advantages

- Zero-downtime deployment
- Instant rollback (switch back to blue)
- Full testing of new version before traffic switch

### Disadvantages

- 2x infrastructure cost during deployment
- Database schema changes need careful management

---

## 19. Canary Deployment

### Concept

Canary deployment routes a small percentage of traffic (1-10%) to the new version while the rest continues on the old version. Monitor for errors, then gradually increase traffic.

### How it Works

```
1. Deploy new version alongside old version
2. Route 1% traffic to new version
3. Monitor error rates, latency, metrics
4. If healthy: increase to 5%, 10%, 50%, 100%
5. If unhealthy: automatically rollback
```

### NGINX Canary

```nginx
upstream stable {
    server 10.0.0.1:3000;  # Current version
}

upstream canary {
    server 10.0.0.2:3000;  # New version
}

split_clients "$request_id" $backend {
    5%     canary;
    *      stable;
}

server {
    listen 80;
    location / {
        proxy_pass http://$backend;
    }
}
```

### Kubernetes Canary

```yaml
# Deploy canary with small replica count
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-canary
spec:
  replicas: 1  # 1 canary vs 9 stable = 10% traffic
  selector:
    matchLabels:
      app: myapp
      track: canary
```

---

## 20. Rollback Strategies

### Types of Rollbacks

| Strategy | Speed | Data Impact |
|----------|-------|-------------|
| **Version rollback** | Instant | None (if stateless) |
| **Database rollback** | Complex | Risk of data loss |
| **Feature flag** | Instant | None |
| **Traffic redirect** | Seconds | None |

### Docker Rollback

```bash
# List image history
docker images myapp

# Rollback to previous version
docker stop myapp
docker run -d --name myapp myapp:v1.0.0

# Docker Swarm rollback
docker service rollback myapp
```

### Kubernetes Rollback

```bash
# Check rollout history
kubectl rollout history deployment/myapp

# Rollback to previous version
kubectl rollout undo deployment/myapp

# Rollback to specific revision
kubectl rollout undo deployment/myapp --to-revision=3

# Watch rollout status
kubectl rollout status deployment/myapp
```

### Feature Flags for Rollback

```javascript
// LaunchDarkly, Split, or custom feature flags
const featureFlags = {
  newCheckoutFlow: false,  // Instantly disable feature without deployment
};

if (featureFlags.newCheckoutFlow) {
  // New code
} else {
  // Old code
}
```

### Best Practices

- Always keep previous version image available
- Use blue-green or canary deployments for safe rollback
- Test rollback procedures regularly
- Have a runbook for emergency rollbacks
- Database rollbacks need separate strategy (backups, migrations)

---

## 21. Infrastructure as Code (IaC)

### What is IaC?

Infrastructure as Code manages infrastructure through machine-readable configuration files rather than manual processes.

### Terraform

```hcl
# main.tf — Deploy an EC2 instance
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  tags = {
    Name = "myapp-web"
  }
}

resource "aws_security_group" "web" {
  name = "web-sg"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

```bash
terraform init          # Initialize
terraform plan         # Preview changes
terraform apply        # Apply changes
terraform destroy      # Tear down
```

### Pulumi (TypeScript)

```typescript
import * as aws from "@pulumi/aws";

const server = new aws.ec2.Instance("web", {
    ami: "ami-0c55b159cbfafe1f0",
    instanceType: "t3.micro",
    tags: { Name: "myapp-web" },
});

export const publicIp = server.publicIp;
```

### Key Concepts

- **State files**: Track current infrastructure state
- **Drift detection**: Compare actual vs desired state
- **Modules**: Reusable infrastructure components
- **Workspaces**: Environment isolation (dev/staging/prod)
- **Backends**: Store state remotely (S3, Terraform Cloud)

---

## 22. Kubernetes Basics

### Core Concepts

| Concept | Description |
|---------|-------------|
| **Pod** | Smallest deployable unit (1+ containers) |
| **Deployment** | Manages replica sets and rolling updates |
| **Service** | Stable network endpoint for pods |
| **ConfigMap** | Non-secret configuration data |
| **Secret** | Sensitive data (base64-encoded) |
| **PersistentVolumeClaim** | Request for storage |
| **Ingress** | HTTP routing rules (like NGINX) |
| **Namespace** | Virtual cluster partitioning |

### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: ghcr.io/org/myapp:v1.2.3
          ports:
            - containerPort: 3000
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 512Mi
```

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP  # or LoadBalancer for external access
```

### Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts: [myapp.example.com]
      secretName: myapp-tls
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: myapp
                port:
                  number: 80
```

### HPA (Horizontal Pod Autoscaler)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

### Health Probes

```yaml
spec:
  containers:
    - name: myapp
      startupProbe:
        httpGet:
          path: /health
          port: 3000
        failureThreshold: 30
        periodSeconds: 2
      livenessProbe:
        httpGet:
          path: /health
          port: 3000
        periodSeconds: 10
        failureThreshold: 3
      readinessProbe:
        httpGet:
          path: /ready
          port: 3000
        periodSeconds: 5
        failureThreshold: 2
```

---

## 23. Reverse Proxy Patterns

### What is a Reverse Proxy?

A reverse proxy sits between clients and backend servers, forwarding client requests to the appropriate server.

### NGINX as Reverse Proxy

```nginx
upstream app {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### HAProxy

```global
    maxconn 50000

defaults
    mode http
    timeout connect 5s
    timeout client 30s
    timeout server 30s

frontend http_front
    bind *:80
    default_backend app_back

backend app_back
    balance roundrobin
    server app1 127.0.0.1:3000 check
    server app2 127.0.0.1:3001 check
```

### Common Patterns

1. **SSL Termination**: Reverse proxy handles SSL, backend receives plain HTTP
2. **Load Balancing**: Distribute requests across multiple backend instances
3. **Caching**: Reverse proxy caches static and dynamic content
4. **Rate Limiting**: Protect backends from excessive requests
5. **Buffering**: Absorb slow backend responses

---

## 24. API Gateway Patterns

### What is an API Gateway?

An API gateway is a single entry point for all client requests, handling cross-cutting concerns like authentication, rate limiting, request transformation, and routing.

### NGINX as API Gateway

```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/s;

server {
    listen 443 ssl http2;
    server_name api.example.com;

    location /api/v1/users {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://user-service:3000;
    }

    location /api/v1/orders {
        limit_req zone=api burst=10 nodelay;
        proxy_pass http://order-service:4000;
    }

    location /api/v1/auth {
        proxy_pass http://auth-service:5000;
    }
}
```

### Kong (API Gateway)

```yaml
# Kong declarative config
services:
  - name: user-service
    url: http://user-service:3000
    routes:
      - name: users
        paths: ["/api/v1/users"]
    plugins:
      - name: rate-limiting
        config:
          minute: 100
      - name: jwt

  - name: order-service
    url: http://order-service:4000
    routes:
      - name: orders
        paths: ["/api/v1/orders"]
```

### Gateway Features

- **Authentication**: Verify JWT tokens, API keys
- **Rate Limiting**: Prevent abuse
- **Request/Response Transformation**: Modify headers, bodies
- **Circuit Breaking**: Stop requests to failing services
- **Logging/Monitoring**: Centralized request logging
- **CORS Handling**: Cross-origin request management
- **API Versioning**: Route to different versions

---

## 25. Circuit Breaker Pattern

### What is a Circuit Breaker?

A circuit breaker prevents an application from repeatedly trying to execute an operation that's likely to fail, allowing it to recover.

### States

```
CLOSED (normal) → OPEN (failing, reject requests) → HALF-OPEN (test if recovered)
```

### Implementation

```javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000;
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.lastFailureTime = null;
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = 'HALF-OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}

// Usage
const breaker = new CircuitBreaker({ failureThreshold: 3, resetTimeout: 10000 });

try {
  const data = await breaker.call(() => fetch('http://external-api.com/data'));
} catch (error) {
  // Fallback response
}
```

### Libraries

- `opossum` — Circuit breaker for Node.js
- `cockatiel` — Resilience and fault handling

---

## 26. Health Checks and Readiness Probes

### Why Health Checks?

Health checks tell orchestrators and load balancers whether your application is alive and ready to receive traffic.

### Health Endpoint

```javascript
// Express.js health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get('/ready', async (req, res) => {
  try {
    // Check database connectivity
    await db.query('SELECT 1');
    // Check Redis connectivity
    await redis.ping();
    res.status(200).json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready', error: error.message });
  }
});
```

### Probe Types

| Type | Purpose | Action on Failure |
|------|---------|-------------------|
| **Startup** | Is the app done starting? | Restart container |
| **Liveness** | Is the app alive? | Restart container |
| **Readiness** | Is the app ready for traffic? | Remove from load balancer |

### Kubernetes Probes

```yaml
spec:
  containers:
    - name: myapp
      startupProbe:
        httpGet: { path: /health, port: 3000 }
        failureThreshold: 30
        periodSeconds: 2
      livenessProbe:
        httpGet: { path: /health, port: 3000 }
        periodSeconds: 10
        failureThreshold: 3
      readinessProbe:
        httpGet: { path: /ready, port: 3000 }
        periodSeconds: 5
        failureThreshold: 2
```

### Docker HEALTHCHECK

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

---

## 27. Graceful Shutdown

### Why Graceful Shutdown?

When a container receives SIGTERM (e.g., during deployment or scale-down), the application should stop accepting new requests, finish processing in-flight requests, then exit cleanly.

### Node.js Implementation

```javascript
const express = require('express');
const app = express();
const server = app.listen(3000);

// Track in-flight connections
let connections = [];

server.on('connection', (conn) => {
  connections.push(conn);
  conn.on('close', () => {
    connections = connections.filter((c) => c !== conn);
  });
});

// Handle shutdown signals
function gracefulShutdown(signal) {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  // Stop accepting new connections
  server.close(() => {
    console.log('All connections closed. Exiting.');
    process.exit(0);
  });

  // Force shutdown after timeout
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 30000);

  // Close idle connections
  connections.forEach((conn) => conn.end());
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

### Using Tini (PID 1 Problem)

Node.js doesn't handle signals correctly when running as PID 1 in a container. Use Tini:

```dockerfile
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
```

### Kubernetes Graceful Shutdown

```yaml
spec:
  terminationGracePeriodSeconds: 60
  containers:
    - name: myapp
      lifecycle:
        preStop:
          exec:
            command: ["/bin/sh", "-c", "sleep 5"]
```

---

## 28. Database Migration in Production

### Migration Tools

| Tool | Database | Language |
|------|----------|----------|
| **Prisma Migrate** | PostgreSQL, MySQL, SQLite | JavaScript/TypeScript |
| **Knex.js** | PostgreSQL, MySQL, SQLite | JavaScript |
| **TypeORM** | Multiple | TypeScript |
| **Flyway** | Multiple | Java/SQL |
| **Alembic** | PostgreSQL, MySQL | Python |

### Prisma Migrate

```bash
# Create migration
npx prisma migrate dev --name add-users-table

# Deploy to production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

### Production Migration Strategy

1. **Back up the database** before running migrations
2. **Run migrations as a separate step** before deploying new code
3. **Use backward-compatible migrations** — old code must work with new schema
4. **Test migrations** on a staging database copy
5. **Have a rollback plan** for every migration

### Zero-Downtime Migrations

```bash
# Step 1: Add column (backward compatible)
ALTER TABLE users ADD COLUMN full_name VARCHAR(255);

# Step 2: Deploy code that writes to both columns
# Step 3: Backfill existing data
# Step 4: Deploy code that reads from new column only
# Step 5: Remove old column (after confirming no reads)
```

### Docker Compose Migration Service

```yaml
services:
  db-migrate:
    image: myapp:latest
    command: npx prisma migrate deploy
    depends_on:
      db:
        condition: service_healthy
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/mydb

  web:
    depends_on:
      db-migrate:
        condition: service_completed_successfully
```

---

## 29. Zero-Downtime Deployment

### Strategies for Zero Downtime

| Strategy | How it Works |
|----------|-------------|
| **Rolling Update** | Replace instances one by one |
| **Blue-Green** | Switch between two identical environments |
| **Canary** | Gradually shift traffic to new version |
| **Feature Flags** | Deploy code disabled, enable without restart |

### Rolling Update (Kubernetes)

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Allow 1 extra pod during rollout
      maxUnavailable: 0  # Never take a pod down before new one is ready
```

### Pre-stop Hook (Critical for Zero Downtime)

```yaml
# Wait for load balancer to deregister before shutting down
lifecycle:
  preStop:
    exec:
      command: ["/bin/sh", "-c", "sleep 5"]
```

### NGINX Zero-Downtime Reload

```bash
# NGINX config changes with zero downtime
nginx -t && nginx -s reload
# NGINX gracefully shuts down old workers after new ones start
```

### Requirements

1. Application handles SIGTERM gracefully
2. Health check endpoint exists
3. Load balancer checks health before routing
4. Database migrations are backward compatible
5. Graceful connection draining is implemented

---

## 30. Cost Optimization

### Infrastructure Cost Optimization

| Strategy | Impact |
|----------|--------|
| **Right-sizing** | Match instance size to actual usage |
| **Auto-scaling** | Scale down during low traffic |
| **Spot instances** | 60-90% discount for fault-tolerant workloads |
| **Reserved instances** | 30-75% discount for committed usage |
| **Serverless** | Pay only for execution time |
| **Cache aggressively** | Reduce compute and bandwidth costs |
| **CDN for static assets** | Offload bandwidth from origin |

### Docker Cost Optimization

```yaml
# Set resource limits to prevent runaway costs
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
    restart: unless-stopped

  # Use smaller images
  web:
    image: node:20-alpine  # ~50MB vs node:20 ~1GB
```

### CI/CD Cost Optimization

| Optimization | Savings |
|-------------|---------|
| Cache dependencies | 30-50% build time |
| Parallel test matrix | 40-60% pipeline time |
| Skip builds on docs-only changes | 10-20% compute |
| Use smaller runners | 20-50% cost |
| Docker layer caching | 50-70% build time |

### Cloud Cost Monitoring

```bash
# AWS cost optimization
aws ce get-cost-and-usage --time-period Start=2024-01-01,End=2024-01-31 \
  --granularity MONTHLY --metrics "BlendedCost"

# Key metrics to track
# - Cost per request
# - Cost per user
# - Cost per feature
# - Idle resources (unused instances, volumes)
```

### Platform-Specific Tips

| Platform | Optimization |
|----------|-------------|
| **Vercel** | Use Edge functions (cheaper than serverless) |
| **AWS Lambda** | Right-size memory (CPU scales with memory) |
| **Railway** | Use sleeping for dev/staging environments |
| **Render** | Free tier for non-production services |
| **Fly.io** | Use shared-cpu-1x for small apps |

---

## Summary: Production JavaScript Deployment Stack

```
┌─────────────────────────────────────────────────┐
│                   CDN / DNS                      │
│            (Cloudflare, Route53)                 │
├─────────────────────────────────────────────────┤
│              Load Balancer / API Gateway          │
│          (NGINX, ALB, Cloudflare)               │
├─────────────────────────────────────────────────┤
│              Reverse Proxy / SSL                 │
│               (NGINX / Traefik)                  │
├─────────────────────────────────────────────────┤
│           Application Runtime                    │
│  ┌─────────────┐  ┌─────────────┐  ┌────────┐  │
│  │  Node.js    │  │  Node.js    │  │ Worker │  │
│  │  (PM2/Docker)│  │  (PM2/Docker)│  │(PM2)  │  │
│  └─────────────┘  └─────────────┘  └────────┘  │
├─────────────────────────────────────────────────┤
│         Observability                            │
│  ┌──────────┐  ┌────────┐  ┌─────────────────┐ │
│  │ Prometheus│  │ Grafana │  │  Sentry         │ │
│  │ (metrics) │  │(dashbrd)│  │  (errors)       │ │
│  └──────────┘  └────────┘  └─────────────────┘ │
├─────────────────────────────────────────────────┤
│              Data Layer                          │
│  ┌──────────┐  ┌───────┐  ┌──────────────┐    │
│  │ Postgres  │  │ Redis │  │ Object Store │    │
│  │ (primary) │  │(cache)│  │  (S3/R2)     │    │
│  └──────────┘  └───────┘  └──────────────┘    │
└─────────────────────────────────────────────────┘
```

### Key Takeaways

1. **Docker** is the standard packaging format for JavaScript applications
2. **Multi-stage builds** reduce image size by 70-95%
3. **CI/CD** automates build, test, and deployment (GitHub Actions is the default in 2026)
4. **Serverless** (Lambda, Vercel Functions) scales to zero when no traffic
5. **Edge computing** reduces latency by running code closer to users
6. **NGINX** is the standard reverse proxy and load balancer
7. **PM2** keeps Node.js applications alive forever with clustering
8. **Structured logging** (JSON + Winston/Pino) is essential for production
9. **Monitoring** (Prometheus + Grafana) provides visibility into system health
10. **Health checks** enable automatic recovery from failures
11. **Graceful shutdown** prevents data loss during deployments
12. **Blue-green and canary deployments** enable zero-downtime releases
13. **Circuit breaker** prevents cascade failures in distributed systems
14. **SSL/TLS** with Let's Encrypt is free and automated
15. **Cost optimization** starts with right-sizing and auto-scaling
