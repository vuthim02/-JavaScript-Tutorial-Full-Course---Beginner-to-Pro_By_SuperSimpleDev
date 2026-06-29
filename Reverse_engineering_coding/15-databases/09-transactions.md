# 09 — Transactions in Practice

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The Three Commands

```sql
BEGIN;        -- Start transaction
-- SQL operations...
COMMIT;       -- Make changes permanent
-- OR:
ROLLBACK;     -- Undo all changes since BEGIN
```

## Savepoints

```sql
BEGIN;
INSERT INTO users (name) VALUES ('Alice');

SAVEPOINT after_user;

INSERT INTO orders (user_id, total) VALUES (1, 100);
-- Oops, wrong total
ROLLBACK TO SAVEPOINT after_user;
-- User 'Alice' exists, but order was rolled back

INSERT INTO orders (user_id, total) VALUES (1, 50);
COMMIT;
```

## Transactions in Code (Node.js + pg)

```javascript
const { Pool } = require('pg');
const pool = new Pool();

async function transferMoney(fromAccount, toAccount, amount) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Check balance
        const { rows } = await client.query(
            'SELECT balance FROM accounts WHERE id = $1 FOR UPDATE',
            [fromAccount]
        );

        if (rows[0].balance < amount) {
            throw new Error('Insufficient funds');
        }

        // Deduct
        await client.query(
            'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
            [amount, fromAccount]
        );

        // Add
        await client.query(
            'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
            [amount, toAccount]
        );

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}
```

## Prisma Transactions

```javascript
// Sequential
const [user, account] = await prisma.$transaction([
    prisma.user.create({ data: { name: 'Alice' } }),
    prisma.account.create({ data: { balance: 1000 } })
]);

// Interactive
await prisma.$transaction(async (tx) => {
    const account = await tx.account.findUnique({
        where: { id: 1 }
    });

    if (account.balance < amount) throw new Error('Insufficient');

    await tx.account.update({
        where: { id: 1 },
        data: { balance: { decrement: amount } }
    });

    await tx.account.update({
        where: { id: 2 },
        data: { balance: { increment: amount } }
    });
});
```

## Timeouts and Deadlocks

```sql
-- Transaction timeout
SET statement_timeout = '10s';

-- Deadlock: Two transactions waiting on each other
-- Transaction A: UPDATE accounts SET balance = ... WHERE id = 1;
-- Transaction B: UPDATE accounts SET balance = ... WHERE id = 2;
-- Transaction A: UPDATE accounts SET balance = ... WHERE id = 2;  -- WAIT
-- Transaction B: UPDATE accounts SET balance = ... WHERE id = 1;  -- WAIT
-- → DEADLOCK! Database kills one transaction
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Need transaction? | Multiple dependent writes |
| Deadlock possible? | Check lock order — always acquire locks in same order |
| Savepoint useful? | Partial rollback within large transaction |
## Next Steps

[Back to Chapter 8](08-acid.md): 08 — ACID: Database Transaction Guarantees
[Proceed to Chapter 10](10-normalization.md): 10 — Normalization: Reducing Redundancy to learn about 10 — normalization: reducing redundancy.
