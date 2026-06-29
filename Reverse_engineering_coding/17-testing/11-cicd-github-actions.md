# Chapter 11 — CI/CD with GitHub Actions

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What is CI/CD?

- **CI (Continuous Integration)**: Automatically test every commit
- **CD (Continuous Deployment/Delivery)**: Automatically deploy to production

## Basic CI Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Unit tests
        run: npm run test:ci

      - name: Coverage
        run: npm run test:coverage
```

## Full Pipeline with E2E and Deploy

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

  e2e:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Run E2E tests
        run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  deploy:
    needs: e2e
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          echo "Deploying..."
          # Actual deploy command here
```

## Skipping Tests

```yaml
on:
  push:
    branches: [main]
    paths-ignore:
      - "*.md"
      - "docs/**"
```

## Caching Dependencies

```yaml
- name: Cache npm dependencies
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

## Environment Variables and Secrets

```yaml
- name: Run tests with secrets
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
    API_KEY: ${{ secrets.API_KEY }}
  run: npm test
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the difference between CI and CD? | CI tests every commit; CD deploys after tests pass |
| What does `npm ci` do vs `npm install`? | `npm ci` installs exact versions from lockfile (faster, stricter) |
| Why use a matrix strategy? | Test against multiple Node.js versions or OS platforms |
| How do you access secrets in GitHub Actions? | `${{ secrets.MY_SECRET }}` |
| What happens if a CI job fails? | The PR is blocked from merging (if branch protection is configured) |
## Next Steps

[Back to Chapter 10](10-code-quality-tools.md): Chapter 10 — Code Quality Tools
[Proceed to Chapter 12](12-coverage-thresholds.md): Chapter 12 — Coverage Thresholds to learn about chapter 12 — coverage thresholds.
