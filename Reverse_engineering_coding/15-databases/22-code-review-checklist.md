# 22 — Database-Focused Code Review Checklist

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## When Reading Code

```javascript
await prisma.user.findMany({ ... })
```

### Which table?

The model name maps to a table name.

### Which indexes?

Check the `@@index` or `CREATE INDEX` for the columns in WHERE/JOIN/ORDER BY.

### Generated SQL?

Turn on query logging:

```javascript
// Prisma
const prisma = new PrismaClient({ log: ['query'] });

// Sequelize
const sequelize = new Sequelize(..., { logging: console.log });
```

### Execution plan?

```sql
EXPLAIN ANALYZE <generated-sql>;
```

### Full scan?

Look for `Seq Scan` in EXPLAIN output.

### Join?

Which tables? Which FK relationship? INNER or LEFT?

### Transaction needed?

Multiple related writes → transaction.

### Cache needed?

Same data read repeatedly → cache.

### Replication?

Reads could go to replica. Writes must go to primary.

### Sharding?

Check if data is partitioned across databases.

### Memory usage?

Large result sets consume RAM. Use LIMIT, pagination, stream.

### Complexity?

O(n) scan? O(log n) index? O(n²) nested loop?

### Can query batch?

Instead of N queries in a loop, use WHERE IN or JOIN.

### N+1 problem?

Does the code loop making individual queries?

### Data consistency requirements?

Strong consistency → primary. Eventual consistency → replica.

---

## Senior Engineer Thinking

Never think only about **code**. Think through the full stack:

```
Code
   ↓
SQL Query
   ↓
Execution Plan (Seq Scan vs Index Scan)
   ↓
Storage Engine (B-tree pages, buffer pool)
   ↓
Disk I/O (sequential vs random, latency)
   ↓
Network (client → app → DB)
```

### The Senior Engineer's Database Checklist

```
□  What does the data model look like?
□  Tables, columns, types, constraints
□  Primary keys, foreign keys
□  Indexes on WHERE/JOIN/ORDER BY columns
□  Query execution plan (no Seq Scans on large tables)
□  N+1 problem?
□  Transaction boundaries?
□  Connection pool configured?
□  Migrations in place?
□  Read replicas used for read scaling?
□  Sharding needed?
□  Cache layer (Redis) reducing database load?
□  Monitoring (slow queries, connection count, replication lag)?
```

---

## Reverse Engineering Questions for Every Database Problem

| Question | Focus |
|----------|-------|
| What entity exists? | Identify the real-world entity (User, Product, Order, etc.) |
| Which table stores it? | Map entity to database table |
| Relationships? | One-to-one? One-to-many? Many-to-many? |
| Primary keys? | How is each row uniquely identified? |
| Foreign keys? | How are tables connected? |
| Indexes? | Are query columns indexed? |
| Complexity? | O(log n) with index? O(n) without? |
| Transactions? | Multiple writes that must be atomic? |
| Isolation? | What isolation level? Dirty reads acceptable? |
| Cache? | Can this data be cached? How long? |
| Replication? | Can reads go to replica? |
| Sharding? | Data too large for one machine? |
| Bottleneck? | Where is the time spent? |
| CPU? | Database CPU at 100%? Need query optimization or more replicas |
| Memory? | Buffer pool misses? Need more RAM |
| Disk? | Slow I/O? Need SSDs |
| Network? | High latency between app and DB? Need to colocate |
| Query optimizer behavior? | Check EXPLAIN ANALYZE for unexpected plans |
| Can schema improve? | Add missing indexes? Normalize? Denormalize? |
| Can denormalization help? | Reduce JOINs for read-heavy workloads |
| Can batching help? | Replace N queries with 1 query using WHERE IN |
| Can caching help? | Reduce DB load by caching frequent queries |
## Next Steps

[Back to Chapter 21](21-migrations.md): 21 — Migrations: Evolving the Schema
[Proceed to Chapter 23](23-projects.md): 23 — Database Projects to learn about 23 — database projects.
