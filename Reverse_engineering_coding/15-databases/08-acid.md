# 08 — ACID: Database Transaction Guarantees

## What is ACID?

| Letter | Property | Meaning |
|--------|----------|---------|
| **A** | Atomicity | Transaction succeeds completely or not at all |
| **C** | Consistency | Data always satisfies all constraints |
| **I** | Isolation | Concurrent transactions don't interfere |
| **D** | Durability | Committed data survives system crash |

## Atomicity — All or Nothing

```sql
-- Bank transfer: Atomic
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- Deduct $100
UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- Add $100
COMMIT;
-- Both succeed, or both fail (if power loss during transaction,
-- database rolls back automatically on restart)
```

Without atomicity: money disappears (debited but not credited).

## Consistency — Data is Always Valid

Constraints prevent invalid data:

```sql
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    balance DECIMAL(10,2) CHECK (balance >= 0)  -- Cannot go negative
);

BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;  -- Balance = -100
-- CONSTRAINT VIOLATION: balance < 0
-- Transaction is aborted, rollback happens
```

## Isolation — Concurrent Users Don't Interfere

```sql
-- User A: Transfer $100 from Account 1 to Account 2
BEGIN;  -- Isolation level: READ COMMITTED
UPDATE accounts SET balance = balance - 100 WHERE id = 1;

-- User B (at the same time): Read Account 1 balance
SELECT balance FROM accounts WHERE id = 1;
-- With READ COMMITTED: sees old balance (before subtraction)
-- With READ UNCOMMITTED: could see new balance even if transaction rolls back
-- With SERIALIZABLE: B waits until A commits or aborts
```

### Isolation Levels

| Level | Dirty Read | Non-repeatable Read | Phantom Read |
|-------|-----------|---------------------|--------------|
| READ UNCOMMITTED | Possible | Possible | Possible |
| READ COMMITTED (default in PG) | Prevented | Possible | Possible |
| REPEATABLE READ | Prevented | Prevented | Possible (PG prevents) |
| SERIALIZABLE | Prevented | Prevented | Prevented |

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

## Durability — Surviving Crashes

```
Application: COMMIT;
    ↓
Database: Write to Write-Ahead Log (WAL)
    ↓
Database: Acknowledge commit to application
    ↓
Database: Write changes to data files (lazily)
    ↓
On crash recovery: Replay WAL to restore committed data
```

## Practical Isolation Examples

```sql
-- Phantom Read Example
-- Transaction A:
BEGIN;
SELECT COUNT(*) FROM orders WHERE total > 100;  -- Returns 5

-- Transaction B (concurrent):
INSERT INTO orders (total) VALUES (150);
COMMIT;

-- Transaction A:
SELECT COUNT(*) FROM orders WHERE total > 100;  -- Returns 6 (phantom!)
-- SERIALIZABLE would prevent this
```

```sql
-- Non-repeatable Read Example
-- Transaction A:
BEGIN;
SELECT balance FROM accounts WHERE id = 1;  -- Returns 1000

-- Transaction B (concurrent):
UPDATE accounts SET balance = 500 WHERE id = 1;
COMMIT;

-- Transaction A:
SELECT balance FROM accounts WHERE id = 1;  -- Returns 500 (changed!)
-- REPEATABLE READ would prevent this
```

## ACID Trade-offs

| Property | Performance Cost | Benefit |
|----------|-----------------|---------|
| Atomicity | WAL writes, rollback segments | No partial updates |
| Consistency | Constraint checking overhead | Data always valid |
| Isolation | Lock contention, slower concurrency | Predictable behavior |
| Durability | fsync on every commit | Data survives crashes |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Can partial updates happen? | Need transactions |
| What if power fails mid-INSERT? | WAL replay ensures consistency |
| Are concurrent updates safe? | Depends on isolation level |
| Need serializable? | Only for financial/booking where perfect accuracy required |
## Next Steps

[Back to Chapter 7](07-btrees-hash-indexes.md): 07 — B-Trees and Hash Indexes
[Proceed to Chapter 9](09-transactions.md): 09 — Transactions in Practice to learn about 09 — transactions in practice.
