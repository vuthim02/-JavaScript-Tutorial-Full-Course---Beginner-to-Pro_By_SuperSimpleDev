# 12 — Database Engine Internals

## Query Execution Pipeline

```
SQL Query
    ↓
Parser → Produces parse tree
    ↓
Rewriter → Applies rules (views, security)
    ↓
Optimizer → Generates multiple plans, picks cheapest
    ↓
Executor → Runs the plan
    ↓
Storage Engine → Reads/writes pages from disk
```

### Parser

```
SELECT * FROM users WHERE id = 5;

Parse tree:
  SelectStmt
    ├── targetList: [All]
    ├── fromClause: [RangeVar: users]
    └── whereClause: OpExpr(=)
                  ├── ColumnRef: id
                  └── Const: 5
```

### Optimizer

The optimizer's job: find the cheapest execution plan.

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE u.country = 'US';
```

Possible plans:

1. **Seq Scan users → Hash Join (filter US) → Seq Scan orders**
2. **Index Scan on users.country → Nested Loop Join with orders**
3. **Hash Join (users filtered) → Index Scan on orders.user_id**

The optimizer estimates costs using:
- Statistics (row count, value distribution).
- Available indexes.
- Table sizes.
- CPU cost constants.

### Storage Engine

#### Page Structure

Database stores data in **pages** (typically 8 KB).

```
Page (8 KB)
┌──────────────────────────────┐
│ Page Header (24 bytes)       │ ← Page type, checksum, LSN, free space
├──────────────────────────────┤
│ Row Pointers                 │ ← Array of (offset, length) for each row
├──────────────────────────────┤
│ ┌────────────────────────┐   │
│ │ Row 1 data             │   │
│ ├────────────────────────┤   │
│ │ Row 2 data             │   │
│ ├────────────────────────┤   │
│ │ ...                    │   │
│ └────────────────────────┘   │
├──────────────────────────────┤
│ Free Space                   │
├──────────────────────────────┤
│ Special Space                │
└──────────────────────────────┘
```

#### Buffer Pool (Shared Buffers)

All reads/writes go through a memory cache.

```
Application: SELECT ...
    ↓
Buffer Pool (memory)
    ├── Page 1 (cached)  ← Read from here (fast)
    ├── Page 2 (cached)
    └── Page 3 (not cached)
            ↓
        Disk → Page 3 loaded into buffer (slow)
```

PostgreSQL's `shared_buffers` configures this:

```ini
# postgresql.conf
shared_buffers = 4GB          # 25% of RAM typically
effective_cache_size = 12GB   # OS cache + shared_buffers estimate
```

#### Write-Ahead Log (WAL)

Every write is first recorded in the WAL, then applied to data pages.

```
COMMIT
  ↓
1. Write to WAL (fsync)  ← Ensures durability
2. Acknowledge COMMIT    ← Fast response to client
3. Write to data pages   ← Happens later (background writer)
4. Checkpoint            ← Flush all dirty pages to disk
```

On crash recovery:

```
Restart
  ↓
Replay WAL from last checkpoint
  ↓
Apply committed transactions
  ↓
Rollback uncommitted transactions
  ↓
Database is consistent
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why is query slow? | Check execution plan |
| Is plan using index? | Look for Index Scan vs Seq Scan |
| Is data cached? | Check shared buffers hit ratio |
| Is disk I/O the bottleneck? | Check `pg_stat_io` or OS `iostat` |
## Next Steps

[Back to Chapter 11](11-denormalization.md): 11 — Denormalization: Trading Storage for Speed
[Proceed to Chapter 13](13-query-optimization.md): 13 — Query Optimization to learn about 13 — query optimization.
