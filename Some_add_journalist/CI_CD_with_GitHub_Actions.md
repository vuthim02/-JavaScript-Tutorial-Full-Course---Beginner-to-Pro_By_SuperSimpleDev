# CI/CD with GitHub Actions — Automatic Testing & Deployment

---

## 1. What Is CI/CD?

**CI (Continuous Integration):** Every push to GitHub automatically runs your tests.
**CD (Continuous Deployment):** If tests pass, automatically deploy to production.

```
Developer push → GitHub → CI runs tests → CD deploys
     │                                            │
     │                                            ↓
  git push origin main                     https://myapp.com
```

**Without CI/CD:**
```
git push → manually run tests → hope nothing broke → manually SSH → manually restart
```

**With CI/CD:**
```
git push → tests run automatically → deploy automatically → Slack notification
```

---

## 2. GitHub Actions Basics

A workflow is a YAML file in `.github/workflows/`. It defines:

- **When** to run (on push, on PR, on schedule)
- **Where** to run (Ubuntu, Windows, Mac)
- **What** to do (install deps, run tests, deploy)

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
```

---

## 3. CI Pipeline — Run Tests on Every Push

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: password
          POSTGRES_DB: myapp_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 5s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 5s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci

      - name: Run Prisma migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:password@localhost:5432/myapp_test

      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: postgresql://postgres:password@localhost:5432/myapp_test
          JWT_SECRET: test-secret
          REDIS_URL: redis://localhost:6379

      - name: Run linter
        run: npm run lint

      - name: Type check
        run: npm run typecheck
```

### Caching dependencies

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm'  # ← caches node_modules based on package-lock.json hash
```

### Matrix testing (multiple Node versions)

```yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      # ... rest is the same
```

---

## 4. CD Pipeline — Auto-Deploy on Main

### Deploy to Render

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Render
        run: |
          curl -X POST https://api.render.com/deploy/srv-${{ secrets.RENDER_SERVICE_ID }} \
            -H "Authorization: Bearer ${{ secrets.RENDER_API_KEY }}"
```

### Deploy to Railway

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Install Railway
        run: npm install -g @railway/cli

      - name: Deploy
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### Deploy to Fly.io

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: superfly/flyctl-actions/setup-flyctl@master

      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

---

## 5. Full CI + CD Workflow

```yaml
# .github/workflows/main.yml
name: CI/CD

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: password
          POSTGRES_DB: myapp_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 5s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:password@localhost:5432/myapp_test
      - run: npm test
        env:
          DATABASE_URL: postgresql://postgres:password@localhost:5432/myapp_test
          JWT_SECRET: test-secret

  deploy:
    needs: test                    # only runs if tests pass
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Render
        run: |
          curl -X POST https://api.render.com/deploy/srv-${{ secrets.RENDER_SERVICE_ID }} \
            -H "Authorization: Bearer ${{ secrets.RENDER_API_KEY }}"
```

**Flow:**
```
Push to dev → CI runs tests only
Push to main → CI runs tests → if passed → CD deploys
PR to main → CI runs tests (no deploy)
```

---

## 6. Docker Build & Push to Registry

```yaml
name: Build & Push Docker Image

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            myusername/myapp:latest
            myusername/myapp:${{ github.sha }}

      - name: Deploy to VPS via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /app
            docker compose pull
            docker compose up -d --force-recreate
```

---

## 7. Secrets — Never Hardcode Credentials

In your GitHub repo: **Settings → Secrets and variables → Actions**

Add these:
```
RENDER_API_KEY
RENDER_SERVICE_ID
RAILWAY_TOKEN
FLY_API_TOKEN
DOCKER_USERNAME
DOCKER_PASSWORD
VPS_HOST
VPS_SSH_KEY
```

Reference in workflows:
```yaml
${{ secrets.RENDER_API_KEY }}
```

---

## 8. Status Badges

Add a badge to your README.md showing CI status:

```markdown
![CI](https://github.com/yourname/your-repo/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/yourname/your-repo/actions/workflows/deploy.yml/badge.svg)
```

Result: badges at the top of your README showing ✅ passing or ❌ failing.

---

## 9. Testing Locally with Act

```bash
npm install -g @nektos/act

# Run CI workflow locally (requires Docker)
act -j test

# Run with specific event
act push -j test

# Use a specific GitHub token
act -s GITHUB_TOKEN=mytoken
```

This runs your GitHub Actions workflows on your machine — great for debugging before pushing.

---

## 10. Common CI Patterns

### Only run for specific paths

```yaml
on:
  push:
    paths:
      - 'src/**'
      - 'package.json'
      - '.github/workflows/**'
    paths-ignore:
      - '*.md'
      - 'docs/**'
```

### Manual approval for production

```yaml
jobs:
  deploy:
    environment: production
    # Requires approval from a reviewer before deploying
```

Set this in: GitHub → Settings → Environments → production → Required reviewers

### Slack notification

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    fields: repo,message,commit,author,action,workflow
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## 11. Quick Reference

| Concept | Key Point |
|---|---|
| Workflow | YAML file in `.github/workflows/` |
| `on:` | Trigger: push, pull_request, schedule |
| `jobs` | Parallel units of work (test, deploy, lint) |
| `needs` | Job dependency (deploy needs test) |
| `services` | Run PostgreSQL, Redis as containers for tests |
| `matrix` | Test across multiple Node versions |
| `secrets` | Encrypted env vars in GitHub Settings |
| `if:` | Conditional execution (e.g., only deploy on main) |
| `cache: 'npm'` | Speed up by caching `node_modules` |
| Environment | Manual approval gate for production deployments |
| Badge | README status badge from Actions |

---

*Last updated: June 2026*
