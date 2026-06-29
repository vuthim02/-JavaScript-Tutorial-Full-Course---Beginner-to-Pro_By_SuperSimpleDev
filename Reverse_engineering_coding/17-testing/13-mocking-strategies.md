# Chapter 13 — Mocking Strategies

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Network Requests

```javascript
// Mock fetch globally
global.fetch = vi.fn();

// Simulate a successful response
fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => ({ id: 1 }),
});

// Simulate a network error
fetch.mockRejectedValueOnce(new Error("Network failure"));
```

## Axios

```javascript
import axios from "axios";

vi.mock("axios");

test("fetches users via axios", async () => {
  axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: "Alice" }] });

  const users = await getUsers();

  expect(users).toEqual([{ id: 1, name: "Alice" }]);
  expect(axios.get).toHaveBeenCalledWith("/users");
});
```

## Database

```javascript
// Mock database client
vi.mock("../db", () => ({
  query: vi.fn(),
}));

import { query } from "../db";

test("fetches user from database", async () => {
  query.mockResolvedValueOnce({ rows: [{ id: 1, name: "Alice" }] });

  const user = await findUserById(1);

  expect(user.name).toBe("Alice");
  expect(query).toHaveBeenCalledWith(
    "SELECT * FROM users WHERE id = $1",
    [1],
  );
});
```

## Date.now and Math.random

```javascript
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2025-01-15T12:00:00Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

test("generates timestamp", () => {
  const result = generateTimestamp();
  expect(result).toBe("2025-01-15T12:00:00.000Z");
});

// Math.random
const mockRandom = vi.spyOn(Math, "random").mockReturnValue(0.5);

test("random value is deterministic", () => {
  expect(Math.random()).toBe(0.5);
});

mockRandom.mockRestore();
```

## Partial Mocks

Mock some methods of a module while keeping others:

```javascript
vi.mock("../payment-processor", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    chargeCustomer: vi.fn().mockResolvedValue({ success: true }),
  };
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Should you mock every dependency? | No. Mock external I/O (network, DB); use real implementations for pure logic |
| What is the risk of over-mocking? | Tests pass but code breaks in production because mocks are wrong |
| How do you mock a specific method while keeping the rest? | Use `vi.mock` with the factory returning the original plus overrides |
| How do you reset mocks between tests? | `vi.clearAllMocks()` or `beforeEach` with `vi.resetAllMocks()` |
## Next Steps

[Back to Chapter 12](12-coverage-thresholds.md): Chapter 12 — Coverage Thresholds
[Proceed to Chapter 14](14-complete-project-setup.md): Chapter 14 — Putting It All Together to learn about chapter 14 — putting it all together.
