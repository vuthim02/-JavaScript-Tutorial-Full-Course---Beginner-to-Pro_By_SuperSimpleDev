# 18 — Replication: Scaling Reads

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Architecture

```
Application
    │
    ├──► Primary (writes) ──► Disk
    │          │
    │          ├──► Replica 1 (reads)
    │          ├──► Replica 2 (reads)
    │          └──► Replica 3 (reads)
```

Primary handles all writes. Changes stream to replicas.

## Streaming Replication (PostgreSQL)

```bash
# postgresql.conf on Primary
wal_level = replica
max_wal_senders = 5

# On Replica
primary_conninfo = 'host=primary-host port=5432 user=replicator'
```

## Read/Write Splitting in Application

```javascript
const { Pool } = require('pg');

const primary = new Pool({ host: 'primary-host' });   // Writes
const replica = new Pool({ host: 'replica-host' });   // Reads

async function query(sql, params, isRead = true) {
    const pool = isRead ? replica : primary;
    return pool.query(sql, params);
}

// Reads go to replica
const users = await query('SELECT * FROM users LIMIT 10', [], true);

// Writes go to primary
await query(
    'INSERT INTO users (name) VALUES ($1)',
    ['Alice'],
    false  // isRead = false → primary
);
```

## Replication Lag

```
Primary: INSERT user 'Alice' at T=0
         ↓
Replica: Receives WAL at T=0.1  ← Lag = 100ms

Application writes to primary, then reads from replica:
→ User may not exist yet on replica
→ Solution: Read-your-writes consistency
```

Handling replication lag:

```javascript
// Route reads for recently-written data to primary
let lastWriteTime = 0;

async function writeUser(data) {
    await primary.query('INSERT INTO users ...', [data]);
    lastWriteTime = Date.now();
}

async function readUser(id) {
    // If write happened < 1 second ago, read from primary
    const usePrimary = (Date.now() - lastWriteTime) < 1000;
    const pool = usePrimary ? primary : replica;
    return pool.query('SELECT * FROM users WHERE id = $1', [id]);
}
```

## Types of Replication

| Type | How It Works | Use Case |
|------|-------------|----------|
| **Synchronous** | Primary waits for replica ack before confirming write | Strong consistency (financial) |
| **Asynchronous** | Primary confirms immediately, replica catches up later | High performance, eventual consistency |
| **Semi-synchronous** | At least one replica must ack | Balance of safety and performance |

## Monitoring Replication

```sql
-- Check replication status in PostgreSQL
SELECT
    application_name,
    state,
    sync_state,
    write_lag,
    flush_lag,
    replay_lag
FROM pg_stat_replication;

-- Check if replica is caught up
SELECT
    pg_last_wal_receive_lsn(),
    pg_last_wal_replay_lsn(),
    pg_is_in_recovery();
```

## Failover Strategies

```
Automatic Failover:
Primary crashes → replica promoted → app reconnects
     ↓
Downside: brief downtime (seconds to minutes)
     ↓
Tools: Patroni, pg_auto_failover, Stolon

Manual Failover:
DBA promotes replica → update DNS/connection string
     ↓
Downside: requires human intervention
     ↓
Benefit: controlled, avoids split-brain
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Replication in use? | Check if reads go to different host than writes |
| Replication lag acceptable? | Depends on consistency requirements |
| Read-your-writes handled? | Route recent data reads to primary |
## Next Steps

[Back to Chapter 17](17-n-plus-one.md): 17 — The N+1 Problem
[Proceed to Chapter 19](19-sharding-cap.md): 19 — Sharding and the CAP Theorem to learn about 19 — sharding and the cap theorem.
