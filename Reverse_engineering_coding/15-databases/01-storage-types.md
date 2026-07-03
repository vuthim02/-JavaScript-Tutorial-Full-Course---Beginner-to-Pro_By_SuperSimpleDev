# 01 — Storage Types: In-Memory vs Persistent

## Overall Database Architecture

Applications are fundamentally about managing data. Everything eventually becomes:

```
Input
↓
Store Data
↓
Process Data
↓
Retrieve Data
↓
Output
```

| Application | Data Entities |
|-------------|---------------|
| Facebook | Users, Posts, Comments, Likes, Friends |
| Amazon | Products, Orders, Payments, Reviews, Sellers |
| YouTube | Videos, Channels, Subscriptions, Comments |
| Bank | Accounts, Transactions, Customers, Loans |
| ChatGPT | Conversations, Messages, Users, Models |

A typical database architecture stacks layers from application down to disk:

```
Application
      ↓
ORM / Query Builder (Prisma, Sequelize, Knex)
      ↓
Database Driver (pg, mysql2, mongodb)
      ↓
Database Engine (PostgreSQL, MySQL, MongoDB, Redis)
      ↓
Storage Engine (B-tree, LSM-tree, WiredTiger, InnoDB)
      ↓
Disk / SSD / Memory
```

Senior engineers think in layers:

```
Data → Schema → Indexes → Queries → Performance → Scaling
```

---

## The Problem with In-Memory Data

```javascript
// In-memory storage — data disappears on restart
const users = [];

users.push({ id: 1, name: 'Alice' });

// After server restart:
console.log(users); // [] — data lost
```

**Problems with no database:**

| Problem | Consequence |
|---------|-------------|
| **Persistence** | Data lost on restart |
| **Concurrency** | Race conditions with multiple users |
| **Search** | Must iterate all items — O(n) |
| **Scaling** | Cannot share across processes/machines |
| **Integrity** | No constraints, corruption possible |
| **Transactions** | Partial updates corrupt state |

## What a Database Provides

| Feature | Benefit |
|---------|---------|
| **Persistence** | Data survives crashes, restarts |
| **Concurrency** | Multiple users safely read/write simultaneously |
| **Integrity** | Constraints (unique, foreign keys, check) prevent bad data |
| **Transactions** | All-or-nothing operations maintain consistency |
| **Query language** | Search, filter, aggregate efficiently |
| **Indexes** | O(log n) lookups instead of O(n) scans |
| **Scaling** | Replication, sharding, connection pooling |

## Storage Decision Flow

```
Is data needed after restart?
├── No  → In-memory (Map, plain object)
└── Yes → Need a database
          ├── Key-value, ephemeral → Redis
          ├── Relational, complex queries → SQL (PostgreSQL, MySQL)
          ├── Flexible schema, documents → NoSQL (MongoDB)
          └── Full-text search → Elasticsearch
```

## Example: Session Storage Comparison

| Storage | Pros | Cons |
|---------|------|------|
| In-memory Map | Fastest, simple | Lost on restart, not shared across processes |
| Redis | Fast, shared, TTL, persistence options | Extra infrastructure, RAM cost |
| PostgreSQL | Durable, ACID, can query sessions | Slower than Redis for ephemeral data |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why store data? | If data must survive restarts → database needed |
| How long should data live? | Session: Redis (ephemeral). Permanent: PostgreSQL (disk) |
| Memory only? | Use Redis. Disk storage needed? Use SQL/NoSQL |
| Can data fit in memory? | If < 1 GB and ephemeral → in-memory Map. Else → database |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-sql-vs-nosql.md): 02 — SQL vs NoSQL to learn about 02 — sql vs nosql.
