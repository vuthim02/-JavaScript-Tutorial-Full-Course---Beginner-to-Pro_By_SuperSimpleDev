# Chapter 14 — Putting It All Together

<img src="https://media.giphy.com/media/wcgn5fVDjvR7pdvz4C/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Project Structure

```text
project/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── src/
│   ├── math.js
│   ├── api.js
│   ├── db.js
│   └── app.js
│
├── tests/
│   ├── unit/
│   │   ├── math.test.js
│   │   └── api.test.js
│   ├── integration/
│   │   └── user-flow.test.js
│   └── e2e/
│       └── login.spec.js
│
├── node_modules/
│
├── package.json
├── vitest.config.js
├── eslint.config.js
├── .prettierrc
├── .husky/
│   ├── pre-commit
│   └── pre-push
│
├── playwright.config.js
└── README.md
```

## package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:ci": "vitest run --reporter=junit --outputFile=junit.xml",
    "test:e2e": "playwright test",
    "lint": "eslint src/ tests/",
    "lint:fix": "eslint src/ tests/ --fix",
    "format": "prettier --write 'src/**/*.js' 'tests/**/*.js'",
    "format:check": "prettier --check 'src/**/*.js' 'tests/**/*.js'",
    "prepare": "husky"
  }
}
```

## Full CI Workflow

```yaml
name: Full CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check

  unit-and-integration:
    runs-on: ubuntu-latest
    needs: lint-and-format
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npm run test:ci
      - run: npm run test:coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  e2e:
    runs-on: ubuntu-latest
    needs: unit-and-integration
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Common Gotchas

```javascript
// GOTCHA 1: Forgetting to return/await a promise
test("this test will always pass", () => {
  expect(1).toBe(2); // fail
  // but test passes because no return/await
});

// FIX:
test("this test will fail correctly", async () => {
  await expect(1).toBe(2);
});

// GOTCHA 2: Mock not reset between tests
test("test A", () => {
  fetch.mockResolvedValue({ data: "A" });
});

test("test B", () => {
  // fetch still returns { data: "A" } from test A
});

// FIX:
beforeEach(() => {
  vi.clearAllMocks();
});

// GOTCHA 3: Testing async state updates synchronously
test("fails because state is async", () => {
  render(<Counter />);
  fireEvent.click(screen.getByText("Increment"));
  expect(screen.getByTestId("count")).toHaveTextContent("1"); // may fail
});

// FIX: Use waitFor or findBy*
test("works with async state", async () => {
  render(<Counter />);
  fireEvent.click(screen.getByText("Increment"));
  await waitFor(() => {
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the most common mistake in async tests? | Forgetting to `return` the promise or use `await` |
| Why do tests pass despite failing assertions? | The test function finishes before the assertion runs |
| How do you prevent mock leakage between tests? | Call `vi.clearAllMocks()` in `beforeEach` |
| How does `waitFor` work? | Retries the callback until it passes or the timeout expires |
| What order should CI jobs run? | Lint → Unit → Integration → E2E → Deploy |
## Next Steps

[Back to Chapter 13](13-mocking-strategies.md): Chapter 13 — Mocking Strategies
[Proceed to Module 18](../18-typescript/README.md): TypeScript Deep Dive to learn about TypeScript and type-safe JavaScript.
