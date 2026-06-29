# Chapter 12 — Coverage Thresholds

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What is Coverage?

Measures how much of your code is executed during tests:

- **Line coverage**: percentage of executable lines executed
- **Branch coverage**: percentage of branches (if/else, switch cases) executed
- **Function coverage**: percentage of functions called
- **Statement coverage**: percentage of statements executed

```bash
npm test -- --coverage
```

Output:

```text
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #
-----------------|---------|----------|---------|---------|-------------------
All files        |   87.5  |    80.0  |   90.0  |   87.5  |
 src/math.js     |     100 |      100 |     100 |     100 |
 src/api.js      |   66.66 |       50 |     100 |   66.66 | 15-18
 src/utils.js    |     100 |      100 |     100 |     100 |
-----------------|---------|----------|---------|---------|-------------------
```

## Setting Thresholds

Jest:

```javascript
export default {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    "./src/critical/**/*.js": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
```

Vitest:

```javascript
export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
});
```

## Coverage Reporting

```json
{
  "scripts": {
    "test:coverage": "vitest run --coverage",
    "test:coverage:check": "vitest run --coverage --coverage.thresholds.branches=90"
  }
}
```

HTML reports:

```bash
open coverage/index.html
```

## Coverage-Driven Development

```
Start: 40% coverage
Goal:  Add tests for uncovered branches
Result: 85% coverage → threshold passes CI
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What does 100% branch coverage mean? | Every possible branch (if/else, switch) was executed |
| Is 100% coverage a guarantee of no bugs? | No. It only proves code was executed, not that it's correct |
| Why set per-file thresholds? | Critical files (pricing, auth, payments) demand higher coverage |
| What is the difference between line and branch coverage? | Line = lines executed; Branch = decision paths taken |
## Next Steps

[Back to Chapter 11](11-cicd-github-actions.md): Chapter 11 — CI/CD with GitHub Actions
[Proceed to Chapter 13](13-mocking-strategies.md): Chapter 13 — Mocking Strategies to learn about chapter 13 — mocking strategies.
