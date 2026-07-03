# Chapter 5 — Vitest

## Why Vitest

Vitest is the modern alternative to Jest with:

- Native Vite integration (uses Vite transform pipeline)
- Significantly faster (esbuild under the hood)
- Compatible API with Jest (same `describe`, `it`, `expect`)
- Built-in TypeScript support
- ESM-first
- HMR for tests (re-run changed tests instantly)

## Setup

```bash
npm install --save-dev vitest
```

`vitest.config.js`:

```javascript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
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

`package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

## Writing Tests

Same API as Jest:

```javascript
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("math", () => {
  it("adds numbers", () => {
    expect(1 + 1).toBe(2);
  });
});

// Mocking
const mockFn = vi.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// Spying
const spy = vi.spyOn(console, "log");
```

## Performance

| Aspect | Jest | Vitest |
|--------|------|--------|
| Transform | Babel | esbuild |
| Cold start | ~2-5s | ~200ms |
| HMR | No | Yes |
| ESM | Experimental | Native |
| TypeScript | Needs config | Built-in |

## Running Vitest

```bash
# Watch mode (default for development)
vitest

# Run once (CI)
vitest run

# With coverage
vitest run --coverage

# Specific test file
vitest run src/math.test.js

# UI mode
vitest --ui
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is Vitest a drop-in replacement for Jest? | Almost. The API is identical but some Jest-specific features differ |
| Why is Vitest faster than Jest? | Uses esbuild for transforms, native ESM, and HMR |
| Do you need Babel with Vitest? | No. esbuild handles transforms natively |
| How do you mock in Vitest? | Use `vi.fn()`, `vi.spyOn()`, `vi.mock()` (same pattern as Jest) |
## Next Steps

[Back to Chapter 4](04-jest-mocking.md): Chapter 4 — Mocking in Jest
[Proceed to Chapter 6](06-testing-async-code.md): Chapter 6 — Testing Asynchronous Code to learn about chapter 6 — testing asynchronous code.
