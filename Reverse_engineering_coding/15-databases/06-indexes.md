# 06 — Indexes

## Why Indexes Matter

### Without Index

```sql
SELECT * FROM users WHERE email = 'alice@test.com';
```

The database must scan **every row** until it finds a match.

```
Scan: [row1][row2][row3][row4]...[row1000000]
        └───┘───┘───┘───┘        └──── Found at row 800,000
        O(n) — 1,000,000 comparisons in worst case
```

### With Index

```sql
CREATE INDEX idx_users_email ON users(email);

SELECT * FROM users WHERE email = 'alice@test.com';
```

The database traverses a B-tree.

```
                            ┌───┐
                            │500k│
                          ┌─┴───┴─┐
                      ┌───┤       ├───┐
                    ┌─┴─┐ │       │ ┌─┴─┐
                    │250k│ └───────┘ │750k│
                    └───┘           └───┘
                        ...             ...
Search for 'alice@test.com':
→ Compare → go left → compare → go right → ... → leaf node
→ O(log n) — about 20 comparisons for 1,000,000 rows
```

### B-Tree Index Structure

```
Root node (page)
├── Keys: [100, 200, 300]
├── Pointer to child < 100
├── Pointer to child 100-200
├── Pointer to child 200-300
└── Pointer to child > 300

Leaf nodes (pages):
┌──────┬──────────┬──────────┐
│ key  │ row_ptr  │ key │ row│ ...
├──────┼──────────┼──────────┤
│ 100  │ page 5   │ 101 │ p5 │ ...
│ 200  │ page 12  │ 201 │ p12│ ...
└──────┴──────────┴──────────┘
```

## Types of Indexes

```sql
-- B-tree index (default)
CREATE INDEX idx_users_email ON users(email);

-- Unique index (also enforces uniqueness)
CREATE UNIQUE INDEX idx_users_email ON users(email);
-- Same as: ALTER TABLE users ADD UNIQUE(email);

-- Composite index (multiple columns)
CREATE INDEX idx_users_country_age ON users(country, age);
-- Useful for: WHERE country = 'US' AND age >= 18

-- Partial index (only index some rows)
CREATE INDEX idx_active_users ON users(email) WHERE deleted_at IS NULL;

-- Hash index (equality only, faster than B-tree)
CREATE INDEX idx_users_id_hash ON users USING HASH(id);

-- Covering index (includes extra columns for index-only scans)
CREATE INDEX idx_users_email_covering ON users(email) INCLUDE (name, age);
-- Query doesn't need to touch the table at all
```

## When Indexes Help

```sql
-- Great for indexes:
SELECT * FROM users WHERE email = 'alice@test.com';  -- Equality
SELECT * FROM users WHERE age > 18;                   -- Range
SELECT * FROM users ORDER BY created_at;              -- Sorting
JOIN users ON users.id = orders.user_id;              -- Joins

-- Not useful for indexes:
SELECT * FROM users WHERE LOWER(email) = 'alice';     -- Function wrapping column
SELECT * FROM users WHERE name LIKE '%alice%';        -- Leading wildcard
```

## The Cost of Indexes

| Cost | Explanation |
|------|-------------|
| **Write slow-down** | Every INSERT/UPDATE/DELETE must update all indexes |
| **Disk space** | Indexes can be larger than the table itself |
| **Memory** | Index pages cached in buffer pool, competing with data |

## EXPLAIN ANALYZE — Checking Index Usage

```sql
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'alice@test.com';

-- Without index:
-- Seq Scan on users  (cost=0.00..172.00 rows=1 width=36)
--   Filter: (email = 'alice@test.com'::text)
--   (actual time=12.342..34.567 rows=1 loops=1)

-- With index:
-- Index Scan using idx_users_email on users  (cost=0.28..8.29 rows=1 width=36)
--   Index Cond: (email = 'alice@test.com'::text)
--   (actual time=0.023..0.024 rows=1 loops=1)
```

1500x faster.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why is query slow? | Check `EXPLAIN ANALYZE` — Seq Scan = no index |
| Missing index? | Check WHERE, JOIN, ORDER BY columns |
| Is index helping? | Look for Index Scan vs Seq Scan |
| Too many indexes? | Check write performance |
## Next Steps

[Back to Chapter 5](05-joins.md): 05 — JOINs: Combining Tables
[Proceed to Chapter 7](07-btrees-hash-indexes.md): 07 — B-Trees and Hash Indexes to learn about 07 — b-trees and hash indexes.
