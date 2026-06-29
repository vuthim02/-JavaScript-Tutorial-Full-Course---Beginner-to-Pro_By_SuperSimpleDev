# 20 — Connection Pooling

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Why a Pool?

```javascript
// BAD: New connection for every request
app.get('/users', async (req, res) => {
    const client = new pg.Client();
    await client.connect();      // TCP + auth handshake ~10ms
    const result = await client.query('SELECT * FROM users');
    await client.end();          // Close connection
    res.json(result.rows);
});
// 1000 req/s → 1000 connections/second → expensive
```

## Connection Pool

```javascript
const { Pool } = require('pg');

// Create pool at startup (once)
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'mydb',
    user: 'user',
    password: 'secret',
    max: 20,          // Maximum connections in pool
    idleTimeoutMillis: 30000,  // Close idle connections after 30s
    connectionTimeoutMillis: 2000  // Fail fast if no connection available
});

// Use pool for queries
app.get('/users', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
    // Connection is automatically returned to pool
});

// For transactions
app.post('/transfer', async (req, res) => {
    const client = await pool.connect();  // Acquire from pool
    try {
        await client.query('BEGIN');
        // ... transaction ...
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();  // Return to pool
    }
});
```

## Pool Internals

```
Pool (max: 20)
├── Active connections: 5  (in use by queries)
├── Idle connections: 12   (ready, waiting for work)
├── Waiting requests: 0    (queue when all 20 are busy)
└── Creating: 0            (connections being established)

When a query arrives:
1. Check idle connections → use one (fast)
2. If none idle and count < max → create new (slow but allowed)
3. If at max → wait in queue (until timeout)
```

## Pool Sizing

| Scenario | Pool Size | Rationale |
|----------|-----------|-----------|
| Node.js (single thread, async) | CPU cores × 2 + disk spindles | ~10-20 typically |
| High-latency queries (100ms+) | Larger pool (30-50) | Connections wait longer |
| Low-latency queries (1ms) | Smaller pool (5-10) | Connections released quickly |

## Connection String

```javascript
// PostgreSQL connection string
const pool = new Pool({
    connectionString: 'postgresql://user:password@host:5432/dbname'
});

// Or from environment
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Connection pool used? | Check for `Pool` or `createPool` |
| Pool size appropriate? | Too small: queue wait. Too large: DB overload |
| Connections leaking? | Check if `release()` is called in `finally` |
## Next Steps

[Back to Chapter 19](19-sharding-cap.md): 19 — Sharding and the CAP Theorem
[Proceed to Chapter 21](21-migrations.md): 21 — Migrations: Evolving the Schema to learn about 21 — migrations: evolving the schema.
