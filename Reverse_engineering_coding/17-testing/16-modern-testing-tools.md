# 16 — Modern Testing Tools: MSW, Property-Based Testing, Fixtures

## Mock Service Worker (MSW)

Intercept network requests at the service worker level — no mocking library needed in your test code:

```javascript
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Alice' },
    ]);
  }),
  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: 2, ...body }, { status: 201 });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Why MSW Over Manual Mocks

| Aspect | Manual `vi.mock()` | MSW |
|--------|-------------------|-----|
| Real HTTP | No — mocks the module | Yes — intercepts at fetch/XMLHttpRequest |
| Code path | Tests use mocked code | Tests run real code, network is intercepted |
| E2E reuse | Useless in E2E | Same handlers work in Playwright/Cypress |
| Debugging | Hard to tell what's mocked | Visible in DevTools Network tab |

### MSW in E2E (Playwright)

```javascript
import { test, expect } from '@playwright/test';
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

test('shows user list', async ({ page }) => {
  const worker = setupWorker(
    http.get('/api/users', () => HttpResponse.json([{ id: 1, name: 'Alice' }])),
  );
  await worker.start();
  await page.goto('/users');
  await expect(page.locator('text=Alice')).toBeVisible();
  await worker.stop();
});
```

---

## Property-Based Testing

Instead of writing specific examples, define **properties** that should always hold and let the framework generate random inputs:

```javascript
import * as fc from 'fast-check';

test('reverse of reverse is identity', () => {
  fc.assert(
    fc.property(fc.array(fc.anything()), (arr) => {
      expect(arr.reverse().reverse()).toEqual(arr);
    })
  );
});

test('parseInt should not produce NaN for valid integer strings', () => {
  fc.assert(
    fc.property(fc.integer(), (n) => {
      const result = parseInt(n.toString(), 10);
      expect(Number.isNaN(result)).toBe(false);
    })
  );
});
```

### When to Use Property-Based Tests

| Good For | Not Good For |
|----------|-------------|
| Pure functions with clear invariants | UI component rendering |
| Parser/serializer round-trips (parse(serialize(x)) === x) | Complex async workflows |
| Sorting, filtering, validation logic | Third-party integrations (use MSW) |
| Math, string manipulation, data transforms | Snapshot-heavy tests |

### Common Property Patterns

| Property | Example |
|----------|---------|
| **Idempotence** | Running twice = running once: `sort(sort(arr)) === sort(arr)` |
| **Round-trip** | serialize(parse(x)) === x for JSON, URI encode/decode |
| **Invariant** | Result always satisfies a condition (age > 0, email has @) |
| **Monotonic** | Adding items increases count, sorting preserves length |

---

## Test Data Factories

Replace hardcoded test data with factories that generate fresh objects on demand:

```javascript
// Without factory — brittle, mixed concerns
const user = { id: 1, name: 'Alice', email: 'alice@test.com', role: 'admin' };

// With factory — intent is clear, fields can be overridden per test
function buildUser(overrides = {}) {
  return {
    id: 1,
    name: 'Alice',
    email: 'alice@test.com',
    role: 'user',
    createdAt: new Date('2026-01-01'),
    ...overrides,
  };
}

test('admin can delete posts', () => {
  const admin = buildUser({ role: 'admin' });
  expect(canDelete(admin)).toBe(true);
});

test('regular user cannot delete posts', () => {
  const regularUser = buildUser({ role: 'user' });
  expect(canDelete(regularUser)).toBe(false);
});
```

### Using Faker for Realistic Data

```javascript
import { faker } from '@faker-js/faker';

function buildUser(overrides = {}) {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['user', 'admin', 'editor']),
    createdAt: faker.date.past(),
    ...overrides,
  };
}

test('email format is valid', () => {
  const user = buildUser();
  expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});
```

Benefits: tests reveal intent (only overriding what matters), data changes in one place, random data surfaces edge cases.

---

## Recommended Tool Versions (2026)

| Tool | Package | When to Use |
|------|---------|-------------|
| MSW | `msw` | API mocking in unit, integration, and E2E tests |
| fast-check | `fast-check` | Property-based testing for pure logic |
| Faker | `@faker-js/faker` | Generating realistic test data |
| Fishery | `fishery` | Type-safe factory definitions |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How is MSW different from mocking fetch? | MSW intercepts at the network level — real HTTP calls are made and caught. No module mocking needed. |
| Can MSW be reused across test types? | Yes — share handler definitions between Vitest (unit) and Playwright (E2E). |
| When should I use property-based tests? | For pure functions with clear invariants: parsers, validators, sort/search, math. |
| What is the simplest property to test? | Round-trip: `parse(serialize(x))` should return to the original state. |
| Why use Faker over hardcoded data? | Surfaces edge cases, keeps test intent clean, centralizes data changes. |
| What is the danger of property-based tests? | Flaky failures from rare edge cases — run with `fc.assert(..., { numRuns: 100 })` for CI stability. |
## Next Steps

[Back to Chapter 15](15-test-quality-mutation.md): 15 — Test Quality & Mutation Testing

[Proceed to Module 18](../18-typescript/README.md): TypeScript Deep Dive to learn about TypeScript and type-safe JavaScript.
