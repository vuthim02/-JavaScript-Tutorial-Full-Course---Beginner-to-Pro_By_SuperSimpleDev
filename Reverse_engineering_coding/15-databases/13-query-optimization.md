# 13 — Query Optimization

## Read the Execution Plan

```sql
EXPLAIN ANALYZE
SELECT * FROM users
WHERE email = 'alice@test.com';

-- Good: Index Scan
-- Bad: Seq Scan (sequential scan of entire table)
```

## Optimization Techniques

### 1. Add Missing Indexes

```sql
-- Slow: Seq Scan
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'x';

-- Create index:
CREATE INDEX ON users(email);

-- Fast: Index Scan
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'x';
```

### 2. Covering Indexes (Index-Only Scan)

```sql
-- If only querying email and name:
CREATE INDEX ON users(email) INCLUDE (name);

-- Now:
SELECT name FROM users WHERE email = 'x';
-- Index-Only Scan: never touches the table
```

### 3. Avoid Functions on Indexed Columns

```sql
-- BAD: Function wraps column → can't use index
SELECT * FROM users WHERE LOWER(email) = 'alice@test.com';

-- GOOD: Use the raw value
SELECT * FROM users WHERE email = 'Alice@test.com';

-- Or create an expression index:
CREATE INDEX ON users(LOWER(email));
```

### 4. Use Partial Indexes for Common Filters

```sql
-- If 90% of queries filter active users:
CREATE INDEX ON users(email) WHERE active = true;

-- The index is smaller, faster to scan
```

### 5. Limit the Result Set

```sql
-- Always limit unless you need everything:
SELECT * FROM users LIMIT 100;

-- If you only need count:
SELECT COUNT(*) FROM users;  -- Much faster than fetching all rows
```

### 6. Avoid SELECT *

```sql
-- BAD: Reads all columns, prevents index-only scans
SELECT * FROM users WHERE email = 'x';

-- GOOD: Only needed columns
SELECT id, name FROM users WHERE email = 'x';
-- May use covering index (index-only scan)
```

### 7. Use EXISTS Instead of IN for Subqueries

```sql
-- Slow with large subquery:
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders);

-- Faster (stops at first match):
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
```

### 8. Window Functions vs Self-Joins

```sql
-- Instead of self-join for running totals:
SELECT
    date,
    amount,
    SUM(amount) OVER (ORDER BY date) AS running_total
FROM sales;
```

## Common Performance Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| N+1 queries | Loop in app code makes many SQL calls | JOIN or batch load |
| Missing index on FK | JOINs slow | Index foreign key columns |
| SELECT * on wide table | Reads unnecessary data | Select only needed columns |
| Using OR with different columns | Cannot use single index | UNION with separate queries |
| Leading wildcard LIKE | Cannot use B-tree index | `LIKE 'abc%'` is fine. `LIKE '%abc'` is not |
| No LIMIT | Returns millions of rows | Always set LIMIT for list endpoints |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the query using an index? | Check EXPLAIN ANALYZE |
| Is there a Seq Scan on a large table? | Missing index |
| Is N+1 happening? | Check if app loops making queries |
| Are all JOIN columns indexed? | FK columns need indexes |
| Is the query returning too much? | Check LIMIT, SELECT columns |
## Next Steps

[Back to Chapter 12](12-database-internals.md): 12 — Database Engine Internals
[Proceed to Chapter 14](14-mongodb.md): 14 — MongoDB: Document Database to learn about 14 — mongodb: document database.
