# Performance Optimization — Caching, Indexing, N+1, Compression

---

## 1. The Performance Pyramid

```
        ┌──────────┐
        │  Cache   │  ← fastest, biggest impact
        ├──────────┤
        │ Database │  ← indexes, query optimization, N+1 fixes
        ├──────────┤
        │  Network │  ← compression, CDN, HTTP/2
        ├──────────┤
        │   Code   │  ← algorithm optimization, async
        └──────────┘
```

Fix top layers first. Caching beats code optimization 100:1.

---

## 2. Response Compression

```bash
npm install compression
```

```js
const compression = require('compression');
app.use(compression());
```

```
Before:  JSON response = 45 KB
After:   JSON response = 12 KB (gzip)
Time:    Without compression: 120ms
         With compression:    45ms
```

One line of code, instant speed improvement. Do this first.

---

## 3. Database Indexing

An index is like a book's index — without it, the database reads every row (full table scan).

```sql
-- Without index:
SELECT * FROM items WHERE user_id = 5;
-- Database reads ALL rows → slow on 1M rows

-- With index:
CREATE INDEX idx_items_user_id ON items (user_id);
-- Database jumps directly to user 5's rows → fast
```

### Identify slow queries

```sql
-- PostgreSQL: log slow queries
SET log_min_duration_statement = 200;  -- log queries > 200ms

-- Find them:
SELECT * FROM pg_stat_activity WHERE state = 'active';
```

### Prisma: add indexes

```prisma
model Item {
  id        Int      @id @default(autoincrement())
  name      String
  completed Boolean  @default(false)
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())

  @@index([userId])                    // single column
  @@index([userId, completed])         // composite (for: WHERE user_id=? AND completed=?)
  @@index([name])                      // for search
}
```

### When to index

```
✅ Index this:               ❌ Don't index:
WHERE user_id = 5            boolean flags (low cardinality)
WHERE email = 'a@b.com'      tiny tables (< 1000 rows)
ORDER BY created_at DESC     columns you never filter/sort
JOIN ... ON items.user_id    columns updated every second
```

**Rule:** Index columns used in `WHERE`, `JOIN`, `ORDER BY`. Each index slows writes slightly, so don't over-index.

---

## 4. The N+1 Query Problem

The #1 performance killer in ORM-based apps.

```js
// ❌ N+1: 1 query for users + N queries for items
const users = await prisma.user.findMany();          // 1 query
for (const user of users) {
  const items = await prisma.item.findMany({          // N queries
    where: { userId: user.id },
  });
  user.items = items;
}
// 100 users = 101 database queries
```

```js
// ✅ Fix: eager load with include (1 query)
const users = await prisma.user.findMany({
  include: { items: true },                           // 1 query (SQL JOIN)
});
// 100 users = 1 database query
```

### Prisma: use `include` or `select`

```js
// Bad: N+1
const items = await prisma.item.findMany();
for (const item of items) {
  const user = await prisma.user.findUnique({ where: { id: item.userId } });
}

// Good: eager load
const items = await prisma.item.findMany({
  include: { user: true },
});
```

### Raw SQL: use JOINs

```sql
-- Bad: N+1
SELECT * FROM items;              -- get items
SELECT * FROM users WHERE id = X; -- for each item

-- Good: JOIN
SELECT items.*, users.name AS user_name
FROM items
JOIN users ON users.id = items.user_id;
```

### Detect N+1 with Prisma

```bash
npm install prisma-n+1-detector
# or use Prisma's built-in query logging:
```

```js
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
// Watch for repeated identical queries with different IDs
```

---

## 5. Redis Caching

Cache **expensive or frequent** database results in Redis (in-memory, sub-millisecond).

```bash
npm install ioredis
```

```js
// cache.js
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Helper
async function getOrSet(key, fetchFn, ttl = 60) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const data = await fetchFn();
  await redis.setex(key, ttl, JSON.stringify(data));
  return data;
}

module.exports = { redis, getOrSet };
```

### Cache-aside pattern (most common)

```js
// Without cache:
app.get('/api/items', async (req, res) => {
  const items = await prisma.item.findMany();  // 50ms query
  res.json(items);
});

// With cache:
app.get('/api/items', async (req, res) => {
  const items = await getOrSet(
    `items:user:${req.user.id}`,
    () => prisma.item.findMany({ where: { userId: req.user.id } }),
    60  // cache for 60 seconds
  );
  res.json(items);
});
// First request: 50ms (cache miss)
// Next 60 seconds: <1ms (cache hit)
```

### Cache invalidation

The hardest problem in computer science. Three strategies:

```js
// 1. TTL (Time-To-Live) — simplest, automatic expiry
await redis.setex('key', 60, data);  // expires in 60s

// 2. Write-through — update cache when data changes
router.post('/api/items', async (req, res) => {
  const item = await prisma.item.create({ data: { name: req.body.name, userId: req.user.id } });
  await redis.del(`items:user:${req.user.id}`);  // delete stale cache
  res.status(201).json(item);
});

router.patch('/api/items/:id', async (req, res) => {
  const item = await prisma.item.update({ where: { id: +req.params.id }, data: req.body });
  await redis.del(`items:user:${req.user.id}`);  // delete stale cache
  res.json(item);
});

// 3. Cache tags — delete related keys by pattern
await redis.del(`items:user:${req.user.id}`);
await redis.del(`item:${item.id}`);
```

### What to cache

| Cache It | TTL |
|---|---|
| User profile (rarely changes) | 1 hour |
| Item list (read often, write occasionally) | 30-60 seconds |
| Database query results (expensive) | 5-60 seconds |
| API responses to external services | 10-60 minutes |
| Static config / settings | 1 day |

### Don't cache

- Per-user sensitive data without proper invalidation
- Real-time data (stock prices, chat messages)
- Write-heavy data (no benefit)

---

## 6. Database Connection Pool Tuning

```js
// Default pool (pg)
const { Pool } = require('pg');
const pool = new Pool({ max: 10 });

// Tuned for your server
const pool = new Pool({
  max: 20,                          // (CPU cores * 2) + disk IO
  idleTimeoutMillis: 30000,          // close idle connections after 30s
  connectionTimeoutMillis: 2000,     // fail fast if DB is down
  maxUses: 7500,                     // recycle connection after 7500 queries
});
```

**Too many connections:** Database runs out of memory/connections.
**Too few:** Requests queue up waiting for a free connection.

**Rule of thumb:** `max = (CPU cores * 2) + effective_disk_IO`

---

## 7. Pagination Done Right

```js
// ❌ Bad — loads ALL rows into memory
const items = await prisma.item.findMany();

// ✅ Good — paginated
const items = await prisma.item.findMany({
  skip: (page - 1) * perPage,
  take: perPage,
});

// ✅ Better — cursor-based (for large datasets)
const items = await prisma.item.findMany({
  take: perPage,
  cursor: { id: cursor },
  skip: 1,  // skip the cursor itself
  orderBy: { id: 'asc' },
});
```

Cursor-based pagination is faster for deep pages (page 1000 of 1M rows). Offset pagination gets slower the deeper you go.

---

## 8. Batch Operations

```js
// ❌ Bad — N queries
for (const item of items) {
  await prisma.item.create({ data: item });
}

// ✅ Good — single batch query
await prisma.item.createMany({
  data: items,
  skipDuplicates: true,
});

// Raw SQL batch insert
const values = items.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ');
const params = items.flatMap(i => [i.name, i.userId]);
await pool.query(
  `INSERT INTO items (name, user_id) VALUES ${values}`,
  params
);
```

---

## 9. Selective Field Fetching

```js
// ❌ Bad — fetches all columns
const items = await prisma.item.findMany();

// ✅ Good — only what you need
const items = await prisma.item.findMany({
  select: { id: true, name: true, completed: true },
  // Skip: user, createdAt, updatedAt, etc.
});
```

Less data from DB → faster query, smaller response, less parsing.

---

## 10. Measurement — Know What's Slow

```bash
npm install express-response-time
```

```js
const responseTime = require('response-time');
app.use(responseTime((req, res, time) => {
  console.log(`${req.method} ${req.url} ${time.toFixed(0)}ms`);

  // Alert on slow requests
  if (time > 1000) {
    logger.warn('Slow request', { url: req.url, time: `${time.toFixed(0)}ms` });
  }
}));
```

### Prisma query logging

```js
const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'stdout', level: 'warn' },
  ],
});

prisma.$on('query', (e) => {
  if (e.duration > 100) {
    logger.warn('Slow query', { query: e.query, duration: `${e.duration}ms` });
  }
});
```

---

## 11. Quick Wins Checklist

```
☐ Compression (app.use(compression()))
☐ Database indexes on WHERE/JOIN/ORDER BY columns
☐ Fix N+1 queries (use include/join)
☐ Redis cache for frequent queries
☐ Paginated responses (never return all rows)
☐ Select only needed fields
☐ Connection pool tuned for your server
☐ HTTP/2 or HTTP/3
☐ CDN for static assets
☐ Response time monitoring + alerts
```

---

## 12. Quick Reference

| Technique | Impact | Effort |
|---|---|---|
| Compression | High | 1 line |
| Database index | High | 1 line (per column) |
| Fix N+1 | High | Medium (restructure query) |
| Redis cache | Very high | Medium (add cache layer) |
| Pagination | Medium | Low |
| Select fields | Medium | Low |
| Pool tuning | Medium | Low |
| Batch operations | High (for bulk) | Low |
| Cursor pagination | High (deep pages) | Medium |

---

*Last updated: June 2026*
