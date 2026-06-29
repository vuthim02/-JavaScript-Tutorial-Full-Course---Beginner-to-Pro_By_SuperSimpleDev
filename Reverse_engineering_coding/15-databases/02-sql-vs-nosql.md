# 02 — SQL vs NoSQL

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## SQL Databases

### Characteristics

| Property | SQL Databases |
|----------|---------------|
| **Structure** | Tables, rows, columns |
| **Schema** | Fixed (enforced at write time) |
| **Relationships** | Foreign keys, JOINs |
| **Consistency** | Strong (ACID) |
| **Query language** | SQL (standardized) |
| **Examples** | PostgreSQL, MySQL, SQLite, Microsoft SQL Server |

### When SQL is the Right Choice

- Data has clear relationships (users ↔ orders ↔ products).
- Need strong consistency (financial data, inventory).
- Complex queries involving multiple tables.
- Need transactions (bank transfers, booking systems).
- Unchanging schema that can be designed upfront.

### When SQL is NOT the Right Choice

- Rapidly evolving schema (new fields added constantly).
- Extremely large scale (billions of records across hundreds of servers).
- Simple key-value lookups with no relationships.
- High-velocity writes with no need for joins.

---

## NoSQL Databases

### Characteristics

| Property | NoSQL Databases |
|----------|-----------------|
| **Structure** | Documents, key-value, graphs, columns |
| **Schema** | Flexible (enforced at read time) |
| **Relationships** | Embedded references, less JOIN support |
| **Consistency** | Often eventual consistency (BASE) |
| **Query language** | Vendor-specific |
| **Examples** | MongoDB, Redis, Cassandra, Neo4j, DynamoDB |

### Types of NoSQL Databases

| Type | Examples | Best For |
|------|----------|----------|
| **Document** | MongoDB, Firestore, CouchDB | JSON-like data, flexible schema |
| **Key-Value** | Redis, DynamoDB, Memcached | Caching, sessions, simple lookups |
| **Column Family** | Cassandra, HBase, Bigtable | Time-series, analytics, high-write |
| **Graph** | Neo4j, ArangoDB | Social networks, recommendations, fraud detection |

### When NoSQL is the Right Choice

- Flexible schema (product catalog with varying attributes).
- Massive scale (Cassandra handles petabytes).
- Simple, fast lookups by key (Redis: O(1)).
- Document-oriented data with nested structures (MongoDB).

## The Multi-Database Pattern

Modern applications often use **both**:

```
PostgreSQL (primary data, relationships, transactions)
     +
Redis (caching, sessions, rate limiting)
     +
Elasticsearch (full-text search, analytics)
```

## Detailed Comparison Table

| Aspect | SQL | NoSQL |
|--------|-----|-------|
| **Schema** | Fixed, predefined | Dynamic, flexible |
| **Scaling** | Vertical (scale up) | Horizontal (scale out) |
| **ACID** | Full ACID support | BASE (eventual consistency) |
| **JOINs** | Native, powerful | Manual or $lookup equivalent |
| **Maturity** | 50+ years | 15-20 years |
| **Tooling** | Rich ecosystem (migrations, ORMs) | Growing, vendor-specific |
| **Use case** | Structured data with relationships | Semi-structured, fast-changing models |

## Choosing a Database: Decision Matrix

| Scenario | Recommended DB | Reason |
|----------|---------------|--------|
| E-commerce platform | PostgreSQL | Complex relationships, transactions, inventory |
| Real-time chat | Redis + MongoDB | Pub/sub for messaging, flexible message schema |
| Analytics / Time-series | Cassandra / ClickHouse | High write throughput, columnar storage |
| User sessions | Redis | TTL, fast key-value, O(1) lookups |
| Product catalog | MongoDB | Varying attributes per product |
| Financial system | PostgreSQL | ACID compliance, consistency critical |
| Social network | Neo4j (graph) + PostgreSQL | Friend graphs + transactional data |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Need relationships? | SQL (JOINs, foreign keys) |
| Need extreme scalability? | NoSQL (horizontal scaling built-in) |
| Need transactions? | SQL (ACID). Some NoSQL (MongoDB 4.0+ has multi-doc transactions) |
| Schema evolving rapidly? | NoSQL (document databases) |
| Simple key-value? | Redis |
## Next Steps

[Back to Chapter 1](01-storage-types.md): 01 — Storage Types: In-Memory vs Persistent
[Proceed to Chapter 3](03-relational-model.md): 03 — Relational Model: Tables, Primary Keys, Foreign Keys to learn about 03 — relational model: tables, primary keys, foreign keys.
