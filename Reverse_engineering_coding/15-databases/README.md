# Part 15 — Databases and Data Engineering

Split chapter files from the main `part15-databases-and-data-engineering.md`.

## Files

| # | File | Topic |
|---|------|-------|
| 01 | [01-storage-types.md](01-storage-types.md) | In-memory vs persistent storage, architecture overview |
| 02 | [02-sql-vs-nosql.md](02-sql-vs-nosql.md) | SQL vs NoSQL comparison, multi-database pattern |
| 03 | [03-relational-model.md](03-relational-model.md) | Tables, rows, columns, primary keys, foreign keys |
| 04 | [04-crud-basics.md](04-crud-basics.md) | SQL CRUD: INSERT, SELECT, UPDATE, DELETE |
| 05 | [05-joins.md](05-joins.md) | INNER, LEFT, RIGHT, FULL, SELF JOINs |
| 06 | [06-indexes.md](06-indexes.md) | B-tree indexes, unique, composite, partial, covering |
| 07 | [07-btrees-hash-indexes.md](07-btrees-hash-indexes.md) | B-tree internals, hash index structure |
| 08 | [08-acid.md](08-acid.md) | Atomicity, Consistency, Isolation, Durability |
| 09 | [09-transactions.md](09-transactions.md) | Transaction commands, savepoints, code examples |
| 10 | [10-normalization.md](10-normalization.md) | 1NF, 2NF, 3NF, reducing redundancy |
| 11 | [11-denormalization.md](11-denormalization.md) | Pre-computed aggregates, embedded data, trade-offs |
| 12 | [12-database-internals.md](12-database-internals.md) | Query pipeline, parser, optimizer, storage engine, WAL |
| 13 | [13-query-optimization.md](13-query-optimization.md) | Indexes, covering indexes, EXISTS, window functions |
| 14 | [14-mongodb.md](14-mongodb.md) | Document model, embedded vs referenced, indexes |
| 15 | [15-redis.md](15-redis.md) | Data structures, caching, rate limiting, pub/sub |
| 16 | [16-orm.md](16-orm.md) | Prisma, generated SQL, raw queries |
| 17 | [17-n-plus-one.md](17-n-plus-one.md) | N+1 problem, eager loading, DataLoader, JOIN fix |
| 18 | [18-replication.md](18-replication.md) | Primary-replica, read/write splitting, replication lag |
| 19 | [19-sharding-cap.md](19-sharding-cap.md) | Sharding strategies, consistent hashing, CAP theorem |
| 20 | [20-connection-pool.md](20-connection-pool.md) | Pool setup, sizing, internals |
| 21 | [21-migrations.md](21-migrations.md) | Migration files, Prisma migrations, safe practices |
| 22 | [22-code-review-checklist.md](22-code-review-checklist.md) | Code review questions, senior engineer checklist |
| 23 | [23-projects.md](23-projects.md) | 12 hands-on database projects |

## Practice

Test your understanding with coding exercises:

```bash
node ../exercises/15-databases.js
```

## Next Steps

[Back to Module 14](../14-networking/README.md): Networking, HTTP, REST APIs, WebSockets, GraphQL, Security

[Proceed to Module 16](../16-express/README.md): Express.js, Middleware, MVC, Error Handling, Validation, Auth, Production Backend to learn about building backend applications with Express.
