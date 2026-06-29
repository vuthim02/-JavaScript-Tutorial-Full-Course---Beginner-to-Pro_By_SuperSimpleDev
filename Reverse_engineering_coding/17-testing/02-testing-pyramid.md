# Chapter 2 — Types of Tests

<img src="https://media.giphy.com/media/UcK7JalnjCz0k/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Testing Pyramid

```
                    ┌───────┐
                    │ E2E   │  ← few, slow, expensive
                   ┌┴───────┴┐
                   │Integration│ ← some, medium
                  ┌┴─────────┴┐
                  │  Unit     │  ← many, fast, cheap
                  └───────────┘
```

## Unit Tests

Test a single unit (function, module, class) in isolation.

```javascript
function add(a, b) {
  return a + b;
}

test("add returns the sum of two numbers", () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});
```

Characteristics:

- Fast (milliseconds)
- No external dependencies (no database, no network)
- High confidence in individual pieces
- Thousands of tests run in seconds

## Integration Tests

Test how multiple units work together.

```javascript
test("POST /users creates a user in the database", async () => {
  const response = await request(app)
    .post("/users")
    .send({ name: "Alice", email: "alice@example.com" });

  expect(response.status).toBe(201);

  const user = await db.query("SELECT * FROM users WHERE email = $1", ["alice@example.com"]);
  expect(user.rows[0].name).toBe("Alice");
});
```

Characteristics:

- Slower than unit tests
- Exercise real interactions between components
- Catch contract mismatches between layers
- Use real or in-memory databases

## End-to-End (E2E) Tests

Test the entire system from the user's perspective.

```javascript
test("user can sign up and see dashboard", async ({ page }) => {
  await page.goto("https://example.com/signup");
  await page.fill("#name", "Alice");
  await page.fill("#email", "alice@example.com");
  await page.fill("#password", "secure123");
  await page.click("button[type='submit']");
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.locator("h1")).toHaveText("Welcome, Alice");
});
```

Characteristics:

- Slowest (seconds to minutes per test)
- Simulate real user interactions
- Test the full stack: frontend → API → database
- Few in number, high in value

## Snapshot Tests

Capture the output of a component to detect unexpected changes.

```javascript
test("Button component matches snapshot", () => {
  const { container } = render(<Button label="Click me" variant="primary" />);
  expect(container).toMatchSnapshot();
});
```

Update snapshots intentionally:

```bash
npm test -- --updateSnapshot
```

## Visual Regression Tests

Compare screenshots pixel-by-pixel to catch visual bugs.

```javascript
test("homepage matches visual baseline", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveScreenshot("homepage.png", {
    maxDiffPixels: 100,
  });
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the difference between unit and integration tests? | Unit tests isolate a single unit; integration tests verify cooperation between units |
| Why not only write E2E tests? | E2E tests are slow, flaky, and expensive to maintain. The pyramid prioritizes fast, reliable unit tests |
| When would you update a snapshot? | When the UI change is intentional and verified visually |
| What is a visual regression? | A pixel-level difference in rendered output, not caught by DOM assertion |
## Next Steps

[Back to Chapter 1](01-why-testing.md): Chapter 1 — Why Testing Matters
[Proceed to Chapter 3](03-jest-foundation.md): Chapter 3 — Jest: The Foundation to learn about chapter 3 — jest: the foundation.
