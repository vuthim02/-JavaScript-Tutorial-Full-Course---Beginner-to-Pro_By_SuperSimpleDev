# 19 — Sharding and the CAP Theorem

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Sharding: Horizontal Scaling

### What Sharding Solves

A single database has limits:

- Storage: disk fills up.
- CPU: query processing maxes out.
- Memory: buffer pool cannot grow infinitely.

### Range-Based Sharding

```
Shard 1: users id 1-1000000
Shard 2: users id 1000001-2000000
Shard 3: users id 2000001-3000000
```

**Problem**: Hot spots (most recent users active → Shard 3 overloaded).

### Hash-Based Sharding

```javascript
function getShard(userId) {
    const shardCount = 4;
    const hash = hashCode(String(userId)) % shardCount;
    return `shard_${hash}`;
    // userId 1 → shard_1
    // userId 2 → shard_2
    // userId 3 → shard_3
    // userId 4 → shard_0
}
```

**Benefit**: Even distribution.
**Problem**: Adding shards requires rehashing (or consistent hashing).

### Consistent Hashing

Used by: Cassandra, DynamoDB, Redis Cluster.

```
Ring:
             ┌───┐
         ┌───┤ S4├───┐
         │   └───┘   │
       ┌─┴─┐       ┌─┴─┐
       │ S1│       │ S3│
       └───┘       └───┘
         │           │
         └───┐   ┌───┘
             ├───┤
             │ S2│
             └───┘

Adding S5: Only neighboring keys need to move
```

### Sharding Complexity

| Concern | Issue |
|---------|-------|
| **Cross-shard queries** | JOINs across shards are expensive or impossible |
| **Transactions** | Multi-shard transactions are complex (2PC) |
| **Re-sharding** | Moving data when adding/removing shards |
| **Indexing** | Global indexes are hard (each shard has its own) |
| **Backups** | Must coordinate across all shards |

### When to Shard

- Data size exceeds one machine's storage (> 5-10 TB).
- Write throughput exceeds one machine's capacity.
- You have exhausted all other optimizations (indexes, query tuning, replication).

---

## CAP Theorem: The Fundamental Trade-off

You can have at most **two** of three properties in a distributed system:

```
          Consistency (C)
              │
              │
     Availability (A) ──── Partition Tolerance (P)
```

| Property | Meaning |
|----------|---------|
| **Consistency** | Every read receives the most recent write (all nodes see same data) |
| **Availability** | Every request receives a response (non-error, possibly stale) |
| **Partition Tolerance** | System continues despite network failures between nodes |

### The Trade-off

```
Network partition happens (P is required — must choose CA):

CP: Choose Consistency over Availability
    Example: Bank transaction system
    → If partition, stop accepting writes until resolved
    → Users see errors during partition

AP: Choose Availability over Consistency
    Example: Social media likes
    → Accept writes on both sides of partition
    → Users see different like counts temporarily
    → Eventual consistency
```

### Database Choices

| Database | Category | CAP |
|----------|----------|-----|
| PostgreSQL, MySQL | SQL (single node) | CA (no partition tolerance built-in) |
| MongoDB | Document (replica set) | CP (primary handles writes, secondaries consistent) |
| Cassandra | Column family | AP (tuneable consistency) |
| Redis | Key-value (cluster) | CP (cluster mode) |
| DynamoDB | Key-value | AP (eventual consistency default) |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Sharding in use? | Check if data is distributed across hosts |
| Cross-shard queries? | Performance bottleneck |
| Re-sharding strategy? | Consistent hashing helps |
| Strong consistency needed? | Financial transactions → CP |
| High availability needed? | Global services → AP |
| Partition tolerance needed? | Distributed systems → must accept P |
## Next Steps

[Back to Chapter 18](18-replication.md): 18 — Replication: Scaling Reads
[Proceed to Chapter 20](20-connection-pool.md): 20 — Connection Pooling to learn about 20 — connection pooling.
