# Testing Express APIs — Jest, Supertest, Unit & Integration Tests

---

## 1. Why Test?

Without tests, you manually check after every change:

```
Change code → open browser → click around → hope nothing broke
```

With tests, you run one command:

```
npm test  → ✅ 47 passed, 0 failed  (in 2 seconds)
```

Tests catch regressions, document behavior, and give you confidence to refactor.

---

## 2. Types of Tests

```
Unit Tests              Integration Tests          E2E Tests
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│ Test one     │       │ Test real        │       │ Test full    │
│ function     │       │ DB + routes      │       │ browser flow │
│ in isolation │       │ together         │       │ (Cypress)    │
│ Fast (ms)    │       │ Medium (seconds) │       │ Slow (mins)  │
│ Many (100s)  │       │ Fewer (tens)     │       │ Few (5-10)   │
└──────────────┘       └──────────────────┘       └──────────────┘
```

For a todo API, you'll write mostly **integration tests** — hit real routes, test real DB behavior.

---

## 3. Setup

```bash
npm install --save-dev jest supertest
```

```json
// package.json
{
  "scripts": {
    "test": "jest --watch",
    "test:ci": "jest --coverage"
  }
}
```

```js
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFilesAfterSetup: ['./jest.setup.js'],
};
```

---

## 4. Your First Test

```js
// __tests__/math.test.js
function add(a, b) {
  return a + b;
}

test('adds 1 + 2 = 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('adds negative numbers', () => {
  expect(add(-1, -1)).toBe(-2);
});
```

```bash
npm test
```

---

## 5. Testing Express Routes (Integration Tests)

### Basic route test

```js
// __tests__/items.test.js
const request = require('supertest');
const app = require('../server');  // Export app (not server.listen)

describe('GET /api/items', () => {
  it('returns 200 with array of items', async () => {
    const res = await request(app)
      .get('/api/items')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    // or if you paginate:
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('total');
  });

  it('filters by completed status', async () => {
    const res = await request(app)
      .get('/api/items?completed=true')
      .expect(200);

    res.body.data.forEach(item => {
      expect(item.completed).toBe(true);
    });
  });
});

describe('POST /api/items', () => {
  it('creates a new item and returns 201', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Test item' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test item');
  });

  it('returns 400 when name is missing', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({})
      .expect(400);

    expect(res.body).toHaveProperty('error');
  });
});
```

### Server must export app, not listen

```js
// server.js — structure for testability
const express = require('express');
const app = express();

// ... middleware, routes ...

// DON'T call app.listen() here
module.exports = app;

// start.js — separate file for starting the server
const app = require('./server');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));
```

Or use a conditional:

```js
if (require.main === module) {
  app.listen(PORT);
}
module.exports = app;
```

---

## 6. Testing with a Real Database

### Test database setup

Use a **separate test database** so tests don't touch your dev data.

```js
// jest.setup.js
const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

beforeAll(async () => {
  // Ensure test DB has latest schema
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: process.env.TEST_DATABASE_URL },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

// Clean data between tests
afterEach(async () => {
  await prisma.item.deleteMany();
  await prisma.user.deleteMany();
});
```

```env
# .env.test
DATABASE_URL=postgresql://postgres:password@localhost:5432/myapp_test
```

### Seeding test data

```js
describe('GET /api/items with seeded data', () => {
  beforeEach(async () => {
    await prisma.user.create({
      data: {
        id: 1,
        email: 'test@test.com',
        name: 'Test User',
        password: 'hashed',
        items: {
          create: [
            { name: 'Buy milk', completed: false },
            { name: 'Learn testing', completed: true },
          ],
        },
      },
    });
  });

  it('returns seeded items', async () => {
    const res = await request(app)
      .get('/api/items')
      .set('Authorization', 'Bearer test-token')  // if auth required
      .expect(200);

    expect(res.body.data).toHaveLength(2);
  });
});
```

### Auth in tests

```js
// __tests__/helpers/auth.js
const jwt = require('jsonwebtoken');

function getAuthToken(userId = 1) {
  return jwt.sign(
    { userId, role: 'user' },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
}

// Usage in test:
const token = getAuthToken();
const res = await request(app)
  .get('/api/items')
  .set('Authorization', `Bearer ${token}`);
```

---

## 7. Testing Individual Functions (Unit Tests)

```js
// utils/validation.js
function validateItem(data) {
  const errors = [];
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required and must be a string');
  }
  if (data.name && data.name.length > 200) {
    errors.push('Name must be under 200 characters');
  }
  return errors;
}

module.exports = { validateItem };
```

```js
// __tests__/validation.test.js
const { validateItem } = require('../utils/validation');

describe('validateItem', () => {
  it('returns no errors for valid data', () => {
    expect(validateItem({ name: 'Buy milk' })).toEqual([]);
  });

  it('returns error when name is missing', () => {
    const errors = validateItem({});
    expect(errors).toContain('Name is required and must be a string');
  });

  it('returns error when name is not a string', () => {
    const errors = validateItem({ name: 123 });
    expect(errors).toHaveLength(1);
  });

  it('returns error when name exceeds 200 characters', () => {
    const errors = validateItem({ name: 'a'.repeat(201) });
    expect(errors).toHaveLength(1);
  });
});
```

---

## 8. Mocking External Services

When your API calls Stripe, SendGrid, or OpenAI — don't call them in tests. Mock them.

```js
// services/payment.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function chargeCustomer(amount, token) {
  const charge = await stripe.charges.create({ amount, currency: 'usd', source: token });
  return charge;
}
```

```js
// __tests__/payment.test.js
const stripe = require('stripe');

jest.mock('stripe', () => {
  return jest.fn(() => ({
    charges: {
      create: jest.fn().mockResolvedValue({ id: 'ch_mock', amount: 2000, status: 'succeeded' }),
    },
  }));
});

describe('chargeCustomer', () => {
  it('creates a charge successfully', async () => {
    const { chargeCustomer } = require('../services/payment');
    const result = await chargeCustomer(2000, 'tok_visa');
    expect(result.status).toBe('succeeded');
    expect(result.id).toBe('ch_mock');
  });
});
```

### Mocking Prisma

```js
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client', () => {
  const mockClient = {
    item: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mockClient) };
});

const prisma = new PrismaClient();

test('findAllItems returns items', async () => {
  prisma.item.findMany.mockResolvedValue([
    { id: 1, name: 'Mocked item', completed: false },
  ]);

  const items = await prisma.item.findMany();
  expect(items).toHaveLength(1);
  expect(items[0].name).toBe('Mocked item');
});
```

---

## 9. Coverage

```bash
npm test -- --coverage
```

Output:
```
File              | % Stmts | % Branch | % Funcs | % Lines
------------------|---------|----------|---------|--------
server.js         |    85.7 |       75 |   88.88 |    85.7
routes/items.js   |     100 |      100 |     100 |     100
middleware/auth.js |     100 |      100 |     100 |     100
------------------|---------|----------|---------|--------
All files         |    91.3 |    83.33 |   93.75 |   91.3
```

**Aim for:** 80%+ coverage. 100% is nice but diminishing returns.

---

## 10. Full Test Suite Example

```js
// __tests__/api/items.test.js
const request = require('supertest');
const app = require('../../server');
const prisma = require('../../prisma/client');

let token;

beforeAll(async () => {
  // Create test user
  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      name: 'Tester',
      password: '$2b$10$...', // pre-hashed
    },
  });

  // Generate token
  const jwt = require('jsonwebtoken');
  token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await prisma.item.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe('Items API', () => {
  let createdItemId;

  it('POST /api/items — creates an item', async () => {
    const res = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Integration test item' })
      .expect(201);

    expect(res.body.name).toBe('Integration test item');
    createdItemId = res.body.id;
  });

  it('GET /api/items — lists items', async () => {
    const res = await request(app)
      .get('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it('GET /api/items/:id — returns single item', async () => {
    const res = await request(app)
      .get(`/api/items/${createdItemId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.id).toBe(createdItemId);
  });

  it('PATCH /api/items/:id — updates an item', async () => {
    const res = await request(app)
      .patch(`/api/items/${createdItemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ completed: true })
      .expect(200);

    expect(res.body.completed).toBe(true);
  });

  it('DELETE /api/items/:id — deletes an item', async () => {
    await request(app)
      .delete(`/api/items/${createdItemId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    // Verify it's gone
    await request(app)
      .get(`/api/items/${createdItemId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });

  it('POST /api/items — returns 400 for invalid data', async () => {
    await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400);
  });

  it('GET /api/items — returns 401 without token', async () => {
    await request(app)
      .get('/api/items')
      .expect(401);
  });
});
```

---

## 11. CI Integration (GitHub Actions)

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: password
          POSTGRES_DB: myapp_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:password@localhost:5432/myapp_test
      - run: npm test
        env:
          DATABASE_URL: postgresql://postgres:password@localhost:5432/myapp_test
          JWT_SECRET: test-secret
```

---

## 12. Quick Reference

| Concept | Key Point |
|---|---|
| Jest | Test runner + assertions (`expect().toBe()`) |
| Supertest | Hit Express routes without a real server |
| `request(app)` | Mounts app on ephemeral port, sends requests |
| Test DB | Use a separate database (never test on production) |
| `beforeEach` | Set up data before each test |
| `afterEach` | Clean up data after each test (delete seeded rows) |
| Coverage | `--coverage` flag, target 80%+ |
| Mocking | `jest.mock()` for external services (Stripe, email) |
| Auth in tests | Create a test user, generate a JWT, send in header |
| CI | Use GitHub Actions with PostgreSQL service container |

---

*Last updated: June 2026*
