# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

# Part 15 — Databases and Data Engineering

## (Reverse Engineering Coding Tactical Edition)

---

# Mission

Applications are fundamentally about managing data.

Everything eventually becomes:

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

Examples:

| Application | Data Entities |
|-------------|---------------|
| Facebook | Users, Posts, Comments, Likes, Friends |
| Amazon | Products, Orders, Payments, Reviews, Sellers |
| YouTube | Videos, Channels, Subscriptions, Comments |
| Bank | Accounts, Transactions, Customers, Loans |
| ChatGPT | Conversations, Messages, Users, Models |

---

# Overall Database Architecture

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

# PART I — WHY DATABASES EXIST

---

# Chapter 1 — The Problem with In-Memory Data

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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why store data? | If data must survive restarts → database needed |
| How long should data live? | Session: Redis (ephemeral). Permanent: PostgreSQL (disk) |
| Memory only? | Use Redis. Disk storage needed? Use SQL/NoSQL |
| Can data fit in memory? | If < 1 GB and ephemeral → in-memory Map. Else → database |

---

# PART II — SQL vs NoSQL

---

# Chapter 2 — SQL Databases

## Characteristics

| Property | SQL Databases |
|----------|---------------|
| **Structure** | Tables, rows, columns |
| **Schema** | Fixed (enforced at write time) |
| **Relationships** | Foreign keys, JOINs |
| **Consistency** | Strong (ACID) |
| **Query language** | SQL (standardized) |
| **Examples** | PostgreSQL, MySQL, SQLite, Microsoft SQL Server |

## When SQL is the Right Choice

- Data has clear relationships (users ↔ orders ↔ products).
- Need strong consistency (financial data, inventory).
- Complex queries involving multiple tables.
- Need transactions (bank transfers, booking systems).
- Unchanging schema that can be designed upfront.

## When SQL is NOT the Right Choice

- Rapidly evolving schema (new fields added constantly).
- Extremely large scale (billions of records across hundreds of servers).
- Simple key-value lookups with no relationships.
- High-velocity writes with no need for joins.

---

# Chapter 3 — NoSQL Databases

## Characteristics

| Property | NoSQL Databases |
|----------|-----------------|
| **Structure** | Documents, key-value, graphs, columns |
| **Schema** | Flexible (enforced at read time) |
| **Relationships** | Embedded references, less JOIN support |
| **Consistency** | Often eventual consistency (BASE) |
| **Query language** | Vendor-specific |
| **Examples** | MongoDB, Redis, Cassandra, Neo4j, DynamoDB |

## Types of NoSQL Databases

| Type | Examples | Best For |
|------|----------|----------|
| **Document** | MongoDB, Firestore, CouchDB | JSON-like data, flexible schema |
| **Key-Value** | Redis, DynamoDB, Memcached | Caching, sessions, simple lookups |
| **Column Family** | Cassandra, HBase, Bigtable | Time-series, analytics, high-write |
| **Graph** | Neo4j, ArangoDB | Social networks, recommendations, fraud detection |

## When NoSQL is the Right Choice

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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Need relationships? | SQL (JOINs, foreign keys) |
| Need extreme scalability? | NoSQL (horizontal scaling built-in) |
| Need transactions? | SQL (ACID). Some NoSQL (MongoDB 4.0+ has multi-doc transactions) |
| Schema evolving rapidly? | NoSQL (document databases) |
| Simple key-value? | Redis |

---

# PART III — RELATIONAL MODEL

---

# Chapter 4 — Tables, Rows, Columns

## Core Concepts

```
DATABASE
  └── TABLE: users
        ├── COLUMNS: id, name, email, created_at
        └── ROWS:
              ├── (1, 'Alice', 'alice@test.com', '2024-01-01')
              └── (2, 'Bob', 'bob@test.com', '2024-01-02')

  └── TABLE: orders
        ├── COLUMNS: id, user_id, total, created_at
        └── ROWS:
              ├── (100, 1, 29.99, '2024-02-01')
              └── (101, 1, 49.99, '2024-02-15')
```

## Creating Tables

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER CHECK (age > 0),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

# Chapter 5 — Primary Keys

## Every Table Needs a Primary Key

A **primary key** uniquely identifies each row.

```sql
-- Auto-incrementing integer (PostgreSQL)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- UUID primary key
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);

-- Composite primary key
CREATE TABLE order_items (
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    PRIMARY KEY (order_id, product_id)
);
```

## Primary Key Properties

| Property | Why |
|----------|-----|
| **Unique** | No two rows have the same PK |
| **Non-null** | Every row must have a PK |
| **Immutable** | PK should never change (or cascade updates) |

## Natural vs Surrogate Keys

| Type | Example | Pros | Cons |
|------|---------|------|------|
| **Natural** | `email` (unique) | Meaningful, no extra column | Can change, may not always be unique |
| **Surrogate** | `id` (auto-increment) | Stable, simple, immutable | Meaningless, extra column |

```sql
-- Natural key: email is the PK
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    name TEXT NOT NULL
);

-- Surrogate key: auto-increment ID
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name TEXT NOT NULL
);
```

---

# Chapter 6 — Foreign Keys

## Referential Integrity

A **foreign key** links a column in one table to the primary key of another table.

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    -- user_id must exist in users.id
    total DECIMAL(10,2) NOT NULL
);
```

## Foreign Key Actions

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE      -- Delete orders when user is deleted
        ON UPDATE CASCADE,     -- Update user_id if PK changes
    total DECIMAL(10,2)
);
```

| Action | Behavior |
|--------|----------|
| `NO ACTION` (default) | Prevent delete if references exist |
| `RESTRICT` | Same as NO ACTION (checked immediately) |
| `CASCADE` | Delete/update child rows automatically |
| `SET NULL` | Set foreign key to NULL when parent is deleted |
| `SET DEFAULT` | Set foreign key to default value |

## The Cost of Foreign Keys

- **Write slow-down**: Every INSERT/UPDATE checks referential integrity.
- **Locking**: Some databases lock parent rows during child inserts.
- **But**: Prevents orphaned data — worth the cost for data integrity.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which entity owns this data? | The table with the PK |
| Which table references another? | FK column points to PK of another table |
| What happens on delete? | Check FK action (CASCADE, SET NULL, RESTRICT) |

---

# PART IV — SQL BASICS (CRUD)

---

# Chapter 7 — Create, Read, Update, Delete

## CREATE (INSERT)

```sql
-- Insert single row
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@test.com', 30);

-- Insert multiple rows
INSERT INTO users (name, email, age)
VALUES
    ('Bob', 'bob@test.com', 25),
    ('Charlie', 'charlie@test.com', 35);

-- Insert from query
INSERT INTO archived_users (name, email)
SELECT name, email FROM users WHERE deleted_at IS NOT NULL;

-- Returning clause (PostgreSQL)
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@test.com')
RETURNING id, created_at;
-- Returns: [{ id: 1, created_at: '2024-01-01T...' }]
```

## READ (SELECT)

```sql
-- All columns, all rows
SELECT * FROM users;

-- Specific columns
SELECT name, email FROM users;

-- Filter
SELECT * FROM users
WHERE age >= 18;

-- Multiple conditions
SELECT * FROM users
WHERE age >= 18
  AND country = 'US'
  AND name ILIKE '%alice%';

-- Ordering
SELECT * FROM users
ORDER BY created_at DESC;

-- Limit / Pagination
SELECT * FROM users
ORDER BY id
LIMIT 20 OFFSET 40;  -- Page 3 of 20

-- Aggregation
SELECT
    country,
    COUNT(*) AS user_count,
    AVG(age) AS avg_age
FROM users
GROUP BY country
HAVING COUNT(*) > 10
ORDER BY user_count DESC;

-- Subquery
SELECT * FROM users
WHERE id IN (
    SELECT user_id FROM orders
    WHERE total > 100
);
```

## UPDATE

```sql
-- Update single field
UPDATE users
SET age = 31
WHERE id = 1;

-- Update multiple fields
UPDATE users
SET
    name = 'Alice Smith',
    updated_at = NOW()
WHERE id = 1;

-- Update from another table
UPDATE products
SET stock = stock - oi.quantity
FROM order_items oi
WHERE products.id = oi.product_id
  AND oi.order_id = 100;

-- Update with returning
UPDATE users
SET last_login = NOW()
WHERE id = 1
RETURNING id, name, last_login;
```

## DELETE

```sql
-- Delete specific rows
DELETE FROM users
WHERE id = 10;

-- Delete all rows (DANGEROUS)
DELETE FROM users;

-- Truncate (faster, no rollback)
TRUNCATE TABLE users;

-- Delete with returning
DELETE FROM users
WHERE id = 10
RETURNING id, name;
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| CRUD operation? | INSERT (Create), SELECT (Read), UPDATE (Update), DELETE (Delete) |
| Is WHERE clause precise? | Missing WHERE → updates/deletes ALL rows |

---

# PART V — JOINS

---

# Chapter 8 — Combining Tables

## Why Joins Exist

Data is normalized across tables. Joins bring it together.

## INNER JOIN

Returns rows where there is a match in **both** tables.

```sql
SELECT users.name, orders.total, orders.created_at
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- Result: Only users who have orders
-- name    | total | created_at
-- Alice   | 29.99 | 2024-02-01
-- Alice   | 49.99 | 2024-02-15
```

```
Users:                Orders:
┌────┬───────┐       ┌────┬─────────┐
│ id │ name  │       │ id │ user_id │
├────┼───────┤       ├────┼─────────┤
│ 1  │ Alice │       │ 100│ 1       │
│ 2  │ Bob   │       │ 101│ 1       │
│ 3  │ Carol │       │ 102│ 3       │
└────┴───────┘       └────┴─────────┘

INNER JOIN result: (Bob excluded — no orders)
┌───────┬─────────┐
│ Alice │ Order100│
│ Alice │ Order101│
│ Carol │ Order102│
└───────┴─────────┘
```

## LEFT JOIN (LEFT OUTER JOIN)

Returns all rows from the **left** table, with NULLs where no match in right.

```sql
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- Result: All users, even those without orders
-- name    | total
-- Alice   | 29.99
-- Alice   | 49.99
-- Bob     | NULL    ← Bob has no orders
-- Carol   | 32.50
```

## RIGHT JOIN (RIGHT OUTER JOIN)

All rows from the **right** table. Rarely used (can rewrite as LEFT JOIN).

```sql
SELECT users.name, orders.total
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;
-- Equivalent to:
SELECT users.name, orders.total
FROM orders
LEFT JOIN users ON orders.user_id = users.id;
```

## FULL JOIN (FULL OUTER JOIN)

All rows from **both** tables, with NULLs where no match.

```sql
SELECT users.name, orders.id
FROM users
FULL JOIN orders ON users.id = orders.user_id;

-- Result: All users + all orders, matched where possible
```

## SELF JOIN

A table joined to itself (useful for hierarchical data).

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    manager_id INTEGER REFERENCES employees(id)
);

SELECT
    e.name AS employee,
    m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Result:
-- employee | manager
-- Alice    | NULL
-- Bob      | Alice
-- Carol    | Alice
-- Dave     | Bob
```

## JOIN Performance

| Join Type | Rows Returned | Performance |
|-----------|--------------|-------------|
| INNER JOIN | Matching only | Fastest (smallest result set) |
| LEFT JOIN | All left + matching right | Slightly slower |
| FULL JOIN | All rows from both | Slowest |

## Multiple Joins

```sql
SELECT
    users.name AS user_name,
    products.name AS product_name,
    order_items.quantity
FROM users
INNER JOIN orders ON users.id = orders.user_id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN products ON order_items.product_id = products.id
WHERE orders.id = 100;
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Where does data come from? | Which tables are JOINed? |
| Which relationship connects them? | FK = PK relationship |
| INNER or LEFT? | INNER: only matches. LEFT: keep all from one side |
| Multiple JOINs? | Chain of FK relationships |

---

# PART VI — INDEXES

---

# Chapter 9 — Why Indexes Matter

## Without Index

```sql
SELECT * FROM users WHERE email = 'alice@test.com';
```

The database must scan **every row** until it finds a match.

```
Scan: [row1][row2][row3][row4]...[row1000000]
        └───┘───┘───┘───┘        └──── Found at row 800,000
        O(n) — 1,000,000 comparisons in worst case
```

## With Index

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

## B-Tree Index Structure

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

---

# PART VII — ACID

---

# Chapter 10 — Database Transaction Guarantees

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

## Isolation Levels

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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Can partial updates happen? | Need transactions |
| What if power fails mid-INSERT? | WAL replay ensures consistency |
| Are concurrent updates safe? | Depends on isolation level |
| Need serializable? | Only for financial/booking where perfect accuracy required |

---

# PART VIII — TRANSACTIONS

---

# Chapter 11 — Using Transactions

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

---

# PART IX — NORMALIZATION

---

# Chapter 12 — Reducing Redundancy

## The Problem

```sql
CREATE TABLE orders_bad (
    id SERIAL PRIMARY KEY,
    product_name TEXT,
    product_price DECIMAL,
    customer_name TEXT,
    customer_email TEXT,
    customer_address TEXT
);
```

Problems:
- Customer name repeated in every order.
- Change address → must update every order.
- Delete order → lose customer data.

## Normal Forms

### 1NF — Atomic Columns

```sql
-- BAD: Non-atomic column
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    tags TEXT  -- 'electronics,gadgets,portable'
);

-- GOOD: Atomic (one value per cell)
CREATE TABLE product_tags (
    product_id INTEGER REFERENCES products(id),
    tag TEXT,
    PRIMARY KEY (product_id, tag)
);
```

### 2NF — No Partial Dependency

```sql
-- BAD: Partial dependency (order_date depends only on order_id, not product)
CREATE TABLE order_items_bad (
    order_id INTEGER,
    product_id INTEGER,
    order_date DATE,   -- ◄ Depends only on order_id, not (order_id, product_id)
    quantity INTEGER,
    PRIMARY KEY (order_id, product_id)
);

-- GOOD: Split into two tables
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_date DATE NOT NULL
);

CREATE TABLE order_items (
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    PRIMARY KEY (order_id, product_id)
);
```

### 3NF — No Transitive Dependency

```sql
-- BAD: Transitive dependency (customer_name depends on customer_id, not order_id)
CREATE TABLE orders_bad (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER,
    customer_name TEXT,  -- ◄ Depends on customer_id, not order_id
    total DECIMAL
);

-- GOOD: Customer name belongs in customers table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    total DECIMAL
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
```

## When to Stop Normalizing

- 3NF is usually sufficient.
- Higher normal forms (BCNF, 4NF, 5NF) are rarely needed.
- Sometimes **denormalization** is better for performance.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is data duplicated? | Normalize further |
| Can update cause inconsistency? | Normalize: put data in one place |
| Is query too slow due to joins? | Consider denormalization |

---

# PART X — DENORMALIZATION

---

# Chapter 13 — Trading Storage for Speed

## When to Denormalize

Normalization is correct by default. Denormalize only when profiling proves it's needed.

```sql
-- Normalized (correct)
SELECT posts.title, users.name AS author
FROM posts
INNER JOIN users ON posts.author_id = users.id;

-- Denormalized (faster reads)
SELECT title, author_name  -- ← Stored directly in posts table
FROM posts;
```

## Common Denormalization Patterns

### 1. Pre-computed aggregates

```sql
-- Instead of COUNT every time:
SELECT COUNT(*) FROM likes WHERE post_id = 1;

-- Store count directly in posts:
ALTER TABLE posts ADD COLUMN like_count INTEGER DEFAULT 0;

-- Update on each like:
UPDATE posts SET like_count = like_count + 1 WHERE id = 1;
```

### 2. Embedded data

```sql
-- Instead of JOIN for frequently accessed data:
ALTER TABLE posts ADD COLUMN author_name TEXT;
-- Copy name when post is created, update if name changes
```

### 3. Redundant arrays (PostgreSQL)

```sql
-- Store tag names directly instead of JOIN
ALTER TABLE posts ADD COLUMN tags TEXT[];
-- Index with GIN:
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
```

## Trade-offs

| Aspect | Normalized | Denormalized |
|--------|-----------|--------------|
| **Read performance** | Slower (JOINs) | Faster (single table) |
| **Write performance** | Faster (single place) | Slower (update multiple copies) |
| **Data integrity** | Strong | Weaker (can get out of sync) |
| **Storage** | Less | More (duplication) |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Performance optimization? | Profile first, then denormalize if JOINs are bottleneck |
| Storage vs speed? | Denormalization trades storage for speed |
| Data consistency risk? | Denormalized data can become stale |

---

# PART XI — DATABASE INTERNALS

---

# Chapter 14 — How a Database Engine Works

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

## Parser

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

## Optimizer

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

## Storage Engine

### Page Structure

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

### Buffer Pool (Shared Buffers)

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

### Write-Ahead Log (WAL)

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

---

# PART XII — QUERY OPTIMIZATION

---

# Chapter 15 — Making Queries Fast

## Read the Execution Plan

```sql
EXPLAIN ANALYZE
SELECT * FROM users
WHERE email = 'alice@test.com';

-- Good: Index Scan
-- Bad: Seq Scan (sequential scan of entire table)
```

## Optimization Techniques

### 1. Add Missing Indexes

```sql
-- Slow: Seq Scan
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'x';

-- Create index:
CREATE INDEX ON users(email);

-- Fast: Index Scan
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'x';
```

### 2. Covering Indexes (Index-Only Scan)

```sql
-- If only querying email and name:
CREATE INDEX ON users(email) INCLUDE (name);

-- Now:
SELECT name FROM users WHERE email = 'x';
-- Index-Only Scan: never touches the table
```

### 3. Avoid Functions on Indexed Columns

```sql
-- BAD: Function wraps column → can't use index
SELECT * FROM users WHERE LOWER(email) = 'alice@test.com';

-- GOOD: Use the raw value
SELECT * FROM users WHERE email = 'Alice@test.com';

-- Or create an expression index:
CREATE INDEX ON users(LOWER(email));
```

### 4. Use Partial Indexes for Common Filters

```sql
-- If 90% of queries filter active users:
CREATE INDEX ON users(email) WHERE active = true;

-- The index is smaller, faster to scan
```

### 5. Limit the Result Set

```sql
-- Always limit unless you need everything:
SELECT * FROM users LIMIT 100;

-- If you only need count:
SELECT COUNT(*) FROM users;  -- Much faster than fetching all rows
```

### 6. Avoid SELECT *

```sql
-- BAD: Reads all columns, prevents index-only scans
SELECT * FROM users WHERE email = 'x';

-- GOOD: Only needed columns
SELECT id, name FROM users WHERE email = 'x';
-- May use covering index (index-only scan)
```

### 7. Use EXISTS Instead of IN for Subqueries

```sql
-- Slow with large subquery:
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders);

-- Faster (stops at first match):
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
```

### 8. Window Functions vs Self-Joins

```sql
-- Instead of self-join for running totals:
SELECT
    date,
    amount,
    SUM(amount) OVER (ORDER BY date) AS running_total
FROM sales;
```

## Common Performance Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| N+1 queries | Loop in app code makes many SQL calls | JOIN or batch load |
| Missing index on FK | JOINs slow | Index foreign key columns |
| SELECT * on wide table | Reads unnecessary data | Select only needed columns |
| Using OR with different columns | Cannot use single index | UNION with separate queries |
| Leading wildcard LIKE | Cannot use B-tree index | `LIKE 'abc%'` is fine. `LIKE '%abc'` is not |
| No LIMIT | Returns millions of rows | Always set LIMIT for list endpoints |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the query using an index? | Check EXPLAIN ANALYZE |
| Is there a Seq Scan on a large table? | Missing index |
| Is N+1 happening? | Check if app loops making queries |
| Are all JOIN columns indexed? | FK columns need indexes |
| Is the query returning too much? | Check LIMIT, SELECT columns |

---

# PART XIII — B-TREES

---

# Chapter 16 — The Most Important Data Structure in Databases

## Structure

A B-tree is a self-balancing tree data structure that maintains sorted data and allows searches, insertions, and deletions in O(log n).

```
                    ┌──────┐
                    │  50  │   ← Internal node (keys + pointers)
                  ┌─┴──┬───┴──┐
                  │    │      │
              ┌───┘    │      └───┐
          ┌───┴──┐ ┌──┴───┐ ┌───┴──┐
          │ 20   │ │  70  │ │ 90   │  ← Leaf nodes (keys + row pointers)
          │ 30   │ │  80  │ │ 95   │
          └──────┘ └──────┘ └──────┘
```

## Properties

| Property | Value |
|----------|-------|
| **Depth** | Usually 3-4 for millions of rows |
| **Order** | Maximum number of keys per node (often hundreds) |
| **Fan-out** | Each node points to many children (unlike binary tree) |
| **Self-balancing** | Insert/delete maintain balance automatically |
| **Pages** | Each node fits in one database page (typically 8 KB) |

## B-Tree vs Binary Search Tree

```
Binary Search Tree (BST):
        ┌──┐
        │50│
       ╱    ╲
    ┌──┐    ┌──┐
    │20│    │70│
   ╱    ╲     ╲
┌──┐  ┌──┐   ┌──┐
│10│  │30│   │80│
└──┘  └──┘   └──┘
- Two children per node
- Depth = O(log n) but worse in practice (more levels)
- Poor cache locality (nodes scattered in memory)

B-Tree:
┌──────────────────┐
│  50   100   150  │  ← One node (one page)
├──────────────────┤
│ Child pointers   │
└──────────────────┘
- Hundreds of keys per node
- Depth = O(log_fan-out n) = very shallow
- Excellent cache locality (one page = many keys)
```

## Search Algorithm

```text
Find key 72 in B-tree:

1. Read root page: [50, 100, 150]
   72 > 50 and 72 < 100 → follow pointer to child node 2

2. Read child page: [60, 70, 80, 90]
   72 > 70 and 72 < 80 → found it (no exact match = no such row)

Total: 2 page reads (from cache or disk)
```

## Why B-Trees, Not Hash Indexes for Ranges

| Operation | B-tree | Hash |
|-----------|--------|------|
| `WHERE id = 5` | O(log n) | O(1) |
| `WHERE id > 5` | O(log n + k) | O(n) — cannot do ranges |
| `ORDER BY id` | O(log n) to find first, then traverse | O(n log n) — sort required |
| `LIKE 'abc%'` | O(log n + k) prefix match | O(n) — no prefix support |

---

# PART XIV — HASH INDEXES

---

# Chapter 17 — O(1) Lookups

## Structure

```
Key: 'alice@test.com'
       ↓
Hash Function
       ↓
Hash: 0x7f83b165
       ↓
Bucket: #42 → Row pointer
```

## When Hash Indexes Excel

```sql
-- Exact match only — very fast
CREATE INDEX ON users USING HASH(email);

SELECT * FROM users WHERE email = 'alice@test.com';  -- O(1)
```

## When Hash Indexes Fail

```sql
SELECT * FROM users WHERE email > 'alice@test.com';
-- Hash index cannot do range queries
-- Falls back to sequential scan

SELECT * FROM users ORDER BY email;
-- Hash index cannot return sorted data
```

| Feature | Hash | B-tree |
|---------|------|--------|
| Equality | O(1) | O(log n) |
| Range | Impossible | O(log n + k) |
| Sorting | Impossible | O(log n + k) |
| Prefix match | Impossible | O(log n + k) |

---

# PART XV — MONGODB (Document Database)

---

# Chapter 18 — Documents Instead of Rows

## Document Model

```javascript
// MongoDB document (BSON)
{
    _id: ObjectId("507f1f77bcf86cd799439011"),
    name: "Alice",
    email: "alice@test.com",
    age: 30,
    address: {
        city: "New York",
        country: "US"
    },
    orders: [
        { product: "Laptop", total: 999.99 },
        { product: "Mouse", total: 29.99 }
    ]
}
```

## Embedded vs Referenced Documents

### Embedded (denormalized)

```javascript
// User document contains address directly
{
    _id: 1,
    name: "Alice",
    address: { city: "NYC", zip: "10001" }
}
```

- **Pros**: Single read, no JOIN.
- **Cons**: Data duplication if address shared.

### Referenced (normalized)

```javascript
// User references address by ID
{
    _id: 1,
    name: "Alice",
    address_id: ObjectId("...")
}

// Address in separate collection
{
    _id: ObjectId("..."),
    city: "NYC",
    zip: "10001"
}
```

- **Pros**: No duplication, easy updates.
- **Cons**: Multiple queries or $lookup (JOIN equivalent).

## Indexes in MongoDB

```javascript
// Single field index
db.users.createIndex({ email: 1 });

// Compound index
db.users.createIndex({ country: 1, age: -1 });

// Text index
db.posts.createIndex({ content: 'text' });

// TTL index (auto-expire after 3600 seconds)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
```

## When MongoDB Over SQL

| Scenario | Why MongoDB |
|----------|-------------|
| Flexible schema | Products with varying attributes |
| Hierarchical data | Blog posts with comments nested inside |
| Rapid prototyping | No schema migrations |
| Horizontal scaling | Native sharding |

## Relationship Handling

```
SQL:              Always normalize + JOIN
MongoDB:          Embed or reference

Rule of thumb:
- "Contains" relationship → embed (order contains items)
- "Belongs to" many → reference (user has many orders)
- Needs its own query → reference (standalone entity)
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Highly relational? | SQL is better |
| Document-oriented? | MongoDB works well |
| Schema changing often? | MongoDB flexible schema |
| Need complex transactions? | MongoDB 4.0+ has multi-doc transactions |

---

# PART XVI — REDIS

---

# Chapter 19 — In-Memory Data Store

## Why Redis is Fast

| Reason | Detail |
|--------|--------|
| **In-memory** | All data in RAM. No disk reads |
| **Single-threaded** | No locking overhead for simple operations |
| **O(1) operations** | Most commands are O(1) |
| **No query parsing** | Simple command protocol |

## Data Structures

```javascript
const redis = require('redis');
const client = redis.createClient();

// String — most basic
await client.set('key', 'value');
await client.get('key'); // 'value'
await client.incr('counter'); // Atomic increment

// Hash — map of fields
await client.hSet('user:1', 'name', 'Alice');
await client.hSet('user:1', 'age', '30');
await client.hGetAll('user:1');
// { name: 'Alice', age: '30' }

// List — ordered collection (push/pop from ends)
await client.lPush('queue', 'job1');
await client.lPush('queue', 'job2');
await client.rPop('queue'); // 'job1'

// Set — unique, unordered
await client.sAdd('tags:post:1', 'javascript', 'nodejs', 'redis');
await client.sMembers('tags:post:1');
await client.sIsMember('tags:post:1', 'nodejs'); // true

// Sorted Set — ordered by score
await client.zAdd('leaderboard', [
    { score: 100, value: 'Alice' },
    { score: 85, value: 'Bob' }
]);
await client.zRange('leaderboard', 0, -1, { REV: true });
// Top scores: ['Alice', 'Bob']
```

## Use Cases

### 1. Caching

```javascript
// Cache middleware
async function getCached(key, fetchFn, ttl = 60) {
    const cached = await client.get(key);
    if (cached) return JSON.parse(cached);

    const data = await fetchFn();
    await client.setEx(key, ttl, JSON.stringify(data));
    return data;
}
```

### 2. Session Store

```javascript
// Store session
await client.hSet(`session:${sessionId}`, {
    userId: 1,
    role: 'admin',
    createdAt: Date.now()
});
await client.expire(`session:${sessionId}`, 86400); // 24h TTL
```

### 3. Rate Limiting

```javascript
// Sliding window rate limit
async function checkRateLimit(ip, max = 100, windowMs = 60000) {
    const key = `ratelimit:${ip}`;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Remove old entries
    await client.zRemRangeByScore(key, 0, windowStart);

    // Count current entries
    const count = await client.zCard(key);

    if (count >= max) return false;

    // Add this request
    await client.zAdd(key, { score: now, value: String(now) });
    await client.expire(key, Math.ceil(windowMs / 1000));
    return true;
}
```

### 4. Pub/Sub

```javascript
// Publisher
await client.publish('notifications', JSON.stringify({
    userId: 1,
    message: 'New message'
}));

// Subscriber
const subscriber = redis.createClient();
await subscriber.subscribe('notifications', (message) => {
    const data = JSON.parse(message);
    console.log('Notification:', data);
});
```

### 5. Message Queue

```javascript
// Producer
await client.lPush('email:queue', JSON.stringify(email));

// Consumer (worker)
while (true) {
    const job = await client.brPop('email:queue', 0); // Blocking pop
    const email = JSON.parse(job.element);
    await sendEmail(email);
}
```

## Redis Persistence

| Mode | How it works | Use case |
|------|-------------|----------|
| **RDB** (snapshot) | Periodic dump to disk | Cache, can lose some data |
| **AOF** (append-only) | Every write logged | Durability-critical |
| **None** | No persistence | Ephemeral cache |

```bash
# redis.conf
save 900 1       # RDB snapshot every 15 min if >=1 key changed
save 300 10      # Every 5 min if >=10 keys changed
save 60 10000    # Every 1 min if >=10000 keys changed
appendonly yes   # Enable AOF
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this cache? | Redis for frequently accessed, rarely changed data |
| Need fast key-value? | Redis O(1) operations |
| Is data ephemeral? | Redis with TTL |
| Persistent needed? | RDB/AOF or use PostgreSQL |

---

# PART XVII — ORM (Object Relational Mapper)

---

# Chapter 20 — Prisma, TypeORM, Sequelize

## What an ORM Does

```
JavaScript Class: User
       ↓
ORM maps to:
       ↓
SQL Table: users
       ↓
Row: { id: 1, name: 'Alice', email: 'alice@test.com' }
```

## Prisma Example

```prisma
// schema.prisma
model User {
    id        Int      @id @default(autoincrement())
    name      String
    email     String   @unique
    posts     Post[]
    createdAt DateTime @default(now())
}

model Post {
    id        Int      @id @default(autoincrement())
    title     String
    content   String?
    author    User     @relation(fields: [authorId], references: [id])
    authorId  Int
}
```

```javascript
// Usage
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create
const user = await prisma.user.create({
    data: { name: 'Alice', email: 'alice@test.com' }
});

// Read with includes (JOIN)
const users = await prisma.user.findMany({
    include: { posts: true },
    where: { email: { contains: 'alice' } },
    orderBy: { createdAt: 'desc' },
    take: 20,
    skip: 0
});

// Update
await prisma.user.update({
    where: { id: 1 },
    data: { name: 'Alice Smith' }
});

// Delete
await prisma.user.delete({ where: { id: 1 } });
```

## Generated SQL

Prisma translates to SQL:

```javascript
// This Prisma call:
const users = await prisma.user.findMany({
    where: { email: { contains: 'alice' } },
    include: { posts: true },
    take: 10
});

// Generates:
SELECT id, name, email, created_at
FROM users
WHERE email ILIKE '%alice%'
LIMIT 10;
-- Then for each user:
SELECT * FROM posts WHERE author_id IN ($1, $2, ...);
```

## ORM Pros and Cons

| Pros | Cons |
|------|------|
| Type safety (TypeScript) | Hidden complexity |
| Productivity (faster dev) | Generated SQL may be inefficient |
| Migrations built-in | Debugging harder (generated code) |
| Less boilerplate | Learning curve for complex queries |
| Database-agnostic | Can't use DB-specific features easily |

## When to Use Raw SQL Over ORM

- Complex reporting queries with many JOINs, aggregations, window functions.
- Performance-critical paths (ORM overhead matters at scale).
- Batch operations (bulk INSERT, UPDATE).
- Database-specific features (PostgreSQL full-text search, JSONB operations).

```javascript
// Prisma allows raw queries:
const users = await prisma.$queryRaw`
    SELECT u.*, COUNT(p.id) as post_count
    FROM users u
    LEFT JOIN posts p ON p.author_id = u.id
    GROUP BY u.id
    HAVING COUNT(p.id) > 5
    ORDER BY post_count DESC
`;
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What SQL is ORM generating? | Check logs or `EXPLAIN` |
| Is there N+1? | Check if ORM makes separate queries per row |
| Can raw SQL be faster? | For complex queries, likely yes |

---

# PART XVIII — N+1 PROBLEM

---

# Chapter 21 — The Most Common Database Performance Bug

## The Problem

```javascript
// N+1: 1 query for users + N queries for orders
const users = await User.findAll();  // 1 query

for (const user of users) {
    const orders = await Order.findAll({
        where: { userId: user.id }
    });  // N queries (one per user)
}

// If 100 users: 1 + 100 = 101 queries
// If 10000 users: 1 + 10000 = 10001 queries
```

## The Fix: Eager Loading

```javascript
// Prisma: Include all at once
const users = await prisma.user.findMany({
    include: { orders: true }
});  // 2 queries total (users + orders)

// Sequelize: Eager loading
const users = await User.findAll({
    include: [{ model: Order }]
});

// TypeORM: Relations
const users = await userRepository.find({
    relations: ['orders']
});
```

## The Fix: Batch Loading

```javascript
// Batch loading with DataLoader
const DataLoader = require('dataloader');

const orderLoader = new DataLoader(async (userIds) => {
    const orders = await Order.findAll({
        where: { userId: userIds }
    });

    // Group by userId
    return userIds.map(id =>
        orders.filter(o => o.userId === id)
    );
});

// Usage: No N+1
const users = await User.findAll();
for (const user of users) {
    const orders = await orderLoader.load(user.id);
    // DataLoader batches all loads into one query
}
```

## The Fix: JOIN

```javascript
// Raw SQL JOIN
const users = await prisma.$queryRaw`
    SELECT u.*, json_agg(o.*) as orders
    FROM users u
    LEFT JOIN orders o ON o.user_id = u.id
    GROUP BY u.id
`;
```

## Visualizing N+1

```
BAD: N+1
Users:            Network:            Orders:
SELECT * FROM  ───►                  (1 query)
Loop:
  SELECT *       ───►                (1 query)
  SELECT *       ───►                (1 query)
  SELECT *       ───►                (1 query)
  ... (N times)

Total: 1 + N queries

GOOD: Eager Loading
Users:            Network:            Orders:
SELECT * FROM  ───►                  (1 query)
SELECT * WHERE  ◄──────────────────► (1 query, batched)

Total: 2 queries (always)
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| N+1 happening? | Check if loop makes separate DB queries |
| Eager loading available? | Use ORM's `include`, `relations`, `eager` |
| DataLoader available? | Batch loads into single query |

---

# PART XIX — REPLICATION

---

# Chapter 22 — Scaling Reads

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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Replication in use? | Check if reads go to different host than writes |
| Replication lag acceptable? | Depends on consistency requirements |
| Read-your-writes handled? | Route recent data reads to primary |

---

# PART XX — SHARDING

---

# Chapter 23 — Horizontal Scaling

## What Sharding Solves

A single database has limits:

- Storage: disk fills up.
- CPU: query processing maxes out.
- Memory: buffer pool cannot grow infinitely.

## Sharding Strategies

### Range-Based Sharding

```text
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

## Sharding Complexity

| Concern | Issue |
|---------|-------|
| **Cross-shard queries** | JOINs across shards are expensive or impossible |
| **Transactions** | Multi-shard transactions are complex (2PC) |
| **Re-sharding** | Moving data when adding/removing shards |
| **Indexing** | Global indexes are hard (each shard has its own) |
| **Backups** | Must coordinate across all shards |

## When to Shard

- Data size exceeds one machine's storage (> 5-10 TB).
- Write throughput exceeds one machine's capacity.
- You have exhausted all other optimizations (indexes, query tuning, replication).

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Sharding in use? | Check if data is distributed across hosts |
| Cross-shard queries? | Performance bottleneck |
| Re-sharding strategy? | Consistent hashing helps |

---

# PART XXI — CAP THEOREM

---

# Chapter 24 — The Fundamental Trade-off

## The Theorem

You can have at most **two** of three properties in a distributed system:

```
          Consistency (C)
              │
              │
     Availability (A) ──── Partition Tolerance (P)
```

## What Each Means

| Property | Meaning |
|----------|---------|
| **Consistency** | Every read receives the most recent write (all nodes see same data) |
| **Availability** | Every request receives a response (non-error, possibly stale) |
| **Partition Tolerance** | System continues despite network failures between nodes |

## The Trade-off

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

## Database Choices

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
| Strong consistency needed? | Financial transactions → CP |
| High availability needed? | Global services → AP |
| Partition tolerance needed? | Distributed systems → must accept P |

---

# PART XXII — CONNECTION POOL

---

# Chapter 25 — Reusing Database Connections

## Why a Pool?

```javascript
// BAD: New connection for every request
app.get('/users', async (req, res) => {
    const client = new pg.Client();
    await client.connect();      // TCP + auth handshake ~10ms
    const result = await client.query('SELECT * FROM users');
    await client.end();          // Close connection
    res.json(result.rows);
});
// 1000 req/s → 1000 connections/second → expensive
```

## Connection Pool

```javascript
const { Pool } = require('pg');

// Create pool at startup (once)
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'mydb',
    user: 'user',
    password: 'secret',
    max: 20,          // Maximum connections in pool
    idleTimeoutMillis: 30000,  // Close idle connections after 30s
    connectionTimeoutMillis: 2000  // Fail fast if no connection available
});

// Use pool for queries
app.get('/users', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
    // Connection is automatically returned to pool
});

// For transactions
app.post('/transfer', async (req, res) => {
    const client = await pool.connect();  // Acquire from pool
    try {
        await client.query('BEGIN');
        // ... transaction ...
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();  // Return to pool
    }
});
```

## Pool Internals

```
Pool (max: 20)
├── Active connections: 5  (in use by queries)
├── Idle connections: 12   (ready, waiting for work)
├── Waiting requests: 0    (queue when all 20 are busy)
└── Creating: 0            (connections being established)

When a query arrives:
1. Check idle connections → use one (fast)
2. If none idle and count < max → create new (slow but allowed)
3. If at max → wait in queue (until timeout)
```

## Pool Sizing

| Scenario | Pool Size | Rationale |
|----------|-----------|-----------|
| Node.js (single thread, async) | CPU cores × 2 + disk spindles | ~10-20 typically |
| High-latency queries (100ms+) | Larger pool (30-50) | Connections wait longer |
| Low-latency queries (1ms) | Smaller pool (5-10) | Connections released quickly |

## Connection String

```javascript
// PostgreSQL connection string
const pool = new Pool({
    connectionString: 'postgresql://user:password@host:5432/dbname'
});

// Or from environment
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Connection pool used? | Check for `Pool` or `createPool` |
| Pool size appropriate? | Too small: queue wait. Too large: DB overload |
| Connections leaking? | Check if `release()` is called in `finally` |

---

# PART XXIII — MIGRATIONS

---

# Chapter 26 — Evolving the Schema

## Why Migrations

```sql
-- Without migrations: manually run SQL
ALTER TABLE users ADD COLUMN phone TEXT;
-- Did this run on production? On staging? On Bob's laptop?
-- No one knows. Disaster.
```

## Migration Files

```javascript
// migrations/20240101_add_phone_to_users.js
exports.up = async (db) => {
    await db.query(`
        ALTER TABLE users ADD COLUMN phone TEXT;
    `);
};

exports.down = async (db) => {
    await db.query(`
        ALTER TABLE users DROP COLUMN phone;
    `);
};
```

## Prisma Migrations

```bash
# After changing schema.prisma:
npx prisma migrate dev --name add-phone-to-users

# Generated SQL file:
-- migrations/20240101_add_phone_to_users/migration.sql
ALTER TABLE "users" ADD COLUMN "phone" TEXT;
```

## Migration Flow

```
Development:
1. Edit schema/model
2. Generate migration
3. Apply locally
4. Test
5. Commit migration file

Production:
6. Run migration (deploy step)
   npm run migrate
```

## Safe Migration Practices

| Practice | Why |
|----------|-----|
| **Backward-compatible changes** | Add columns (don't remove during deploy) |
| **Deploy migrations before code** | Old code runs against new schema safely |
| **Test rollback** | `down` function restores previous state |
| **No long-running locks** | `ADD COLUMN` is instant. `ALTER COLUMN TYPE` may lock table |
| **Run during low traffic** | Heavy migrations can lock tables |

```sql
-- Safe: Add nullable column (instant)
ALTER TABLE users ADD COLUMN phone TEXT;

-- Generally safe: Add column with default (may lock in some DBs)
ALTER TABLE users ADD COLUMN subscription_status TEXT DEFAULT 'free';

-- Risky: Change column type (rewrites entire table)
ALTER TABLE users ALTER COLUMN id TYPE BIGINT;
-- Use: CREATE TABLE new, migrate data, swap
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Are migrations used? | Check `migrations/` directory |
| Is schema in sync? | Run migration status command |
| Migration safe? | Additive changes are safe. Destructive changes risk data loss |

---

# PART XXIV — REVERSE ENGINEERING CODING TACTICS

---

# Chapter 27 — Database-Focused Code Review

## When reading:

```javascript
await prisma.user.findMany({ ... })
```

## Ask:

### Which table?

The model name maps to a table name.

---

### Which indexes?

Check the `@@index` or `CREATE INDEX` for the columns in WHERE/JOIN/ORDER BY.

---

### Generated SQL?

Turn on query logging:

```javascript
// Prisma
const prisma = new PrismaClient({ log: ['query'] });

// Sequelize
const sequelize = new Sequelize(..., { logging: console.log });
```

---

### Execution plan?

```sql
EXPLAIN ANALYZE <generated-sql>;
```

---

### Full scan?

Look for `Seq Scan` in EXPLAIN output.

---

### Join?

Which tables? Which FK relationship? INNER or LEFT?

---

### Transaction needed?

Multiple related writes → transaction.

---

### Cache needed?

Same data read repeatedly → cache.

---

### Replication?

Reads could go to replica. Writes must go to primary.

---

### Sharding?

Check if data is partitioned across databases.

---

### Memory usage?

Large result sets consume RAM. Use LIMIT, pagination, stream.

---

### Complexity?

O(n) scan? O(log n) index? O(n²) nested loop?

---

### Can query batch?

Instead of N queries in a loop, use WHERE IN or JOIN.

---

### N+1 problem?

Does the code loop making individual queries?

---

### Data consistency requirements?

Strong consistency → primary. Eventual consistency → replica.

---

# SENIOR ENGINEER THINKING

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

## The Senior Engineer's Database Checklist

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

# REVERSE ENGINEERING QUESTIONS FOR EVERY DATABASE PROBLEM

---

### What entity exists?

Identify the real-world entity (User, Product, Order, etc.).

---

### Which table stores it?

Map entity to database table.

---

### Relationships?

One-to-one? One-to-many? Many-to-many?

---

### Primary keys?

How is each row uniquely identified?

---

### Foreign keys?

How are tables connected?

---

### Indexes?

Are query columns indexed?

---

### Complexity?

O(log n) with index? O(n) without?

---

### Transactions?

Multiple writes that must be atomic?

---

### Isolation?

What isolation level? Dirty reads acceptable?

---

### Cache?

Can this data be cached? How long?

---

### Replication?

Can reads go to replica?

---

### Sharding?

Data too large for one machine?

---

### Bottleneck?

Where is the time spent?

---

### CPU?

Database CPU at 100%? Need query optimization or more replicas.

---

### Memory?

Buffer pool misses? Need more RAM.

---

### Disk?

Slow I/O? Need SSDs.

---

### Network?

High latency between app and DB? Need to colocate.

---

### Query optimizer behavior?

Check EXPLAIN ANALYZE for unexpected plans.

---

### Can schema improve?

Add missing indexes? Normalize? Denormalize?

---

### Can denormalization help?

Reduce JOINs for read-heavy workloads.

---

### Can batching help?

Replace N queries with 1 query using WHERE IN.

---

### Can caching help?

Reduce DB load by caching frequent queries.

---

# Projects

---

## 1. Mini SQL Engine

Build a simple in-memory SQL engine in JavaScript.

- Support `CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE`, `DELETE`.
- Support `WHERE` with AND/OR conditions.
- Support `INNER JOIN`.
- Support `ORDER BY`, `LIMIT`.
- No external dependencies.
- Bonus: B-tree index for O(log n) lookups.

```
const db = new Database();
db.execute("CREATE TABLE users (id INT, name TEXT)");
db.execute("INSERT INTO users VALUES (1, 'Alice')");
const result = db.execute("SELECT * FROM users WHERE id = 1");
```

---

## 2. Blog Database

Design and build a blog database schema.

- Tables: `users`, `posts`, `comments`, `tags`, `post_tags`.
- Relationships:
  - User has many posts.
  - Post has many comments.
  - Post has many tags (M:N).
- Queries:
  - Get all posts by a user with comment count.
  - Get recent posts with author name and tags.
  - Search posts by title.
- Indexes on: `posts.author_id`, `posts.created_at`, `posts.title` (GIN for full-text).

---

## 3. Banking System (with Transactions)

- Tables: `accounts(id, balance)`, `transactions(id, from_account_id, to_account_id, amount, created_at)`.
- Transfer money with transaction:
  - Check balance.
  - Deduct from sender.
  - Add to receiver.
  - Record transaction.
  - All or nothing.
- Handle: insufficient funds, deadlocks, concurrent transfers.
- Test with 100 concurrent transfers.

---

## 4. E-commerce Database

- Tables: `users`, `products`, `categories`, `orders`, `order_items`, `reviews`.
- Features:
  - Product catalog with categories.
  - Shopping cart.
  - Order with multiple items.
  - Inventory management (reduce stock on order).
  - Product reviews with ratings.
- Advanced queries:
  - Top-selling products this month.
  - User's order history with totals.
  - Products frequently bought together.

---

## 5. Redis Cache Layer

Build a Redis caching middleware for Express.

- Cache GET responses with configurable TTL.
- Cache-aside pattern: check Redis first, fall back to DB, populate cache.
- Invalidate on POST/PUT/PATCH/DELETE (delete related cache keys).
- Cache hit/miss metrics endpoint.
- Auto-cleanup of expired keys.
- Graceful handling of Redis down (fall through to DB).

---

## 6. URL Shortener

- Table: `urls(id, short_code, long_url, created_at, click_count)`.
- API:
  - `POST /shorten` — accepts long URL, returns short code.
  - `GET /:code` — redirects to long URL (301).
  - `GET /:code/stats` — click count.
- Performance:
  - Index on `short_code`.
  - Redis cache for most-accessed URLs.
  - Count clicks asynchronously.
- Handle: duplicate URLs (return existing short code), invalid codes (404).

---

## 7. Chat Application Database

- Tables: `users`, `rooms`, `messages`, `room_members`.
- Queries:
  - Get all rooms for a user.
  - Get last 50 messages in a room.
  - Get unread count for each room.
  - Mark messages as read.
- Performance:
  - Pagination for messages (cursor-based).
  - Index on `(room_id, created_at)`.
  - Archive old messages to separate table.

---

## 8. Inventory System

- Tables: `products(id, name, stock)`, `reservations(id, product_id, quantity, expires_at)`.
- Features:
  - Reserve stock when user adds to cart (limited time).
  - Release expired reservations.
  - Prevent overselling (CHECK constraint or lock).
  - Audit log of stock changes.
- Concurrency:
  - Use `SELECT ... FOR UPDATE` to prevent race conditions.
  - Handle: two users buying last item simultaneously.

---

## 9. Analytics Engine

Build a simple analytics system that tracks page views.

- Table: `page_views(id, url, user_id, ip, user_agent, created_at)`.
- Real-time aggregation with Redis:
  - Increment Redis counters per URL per minute.
  - Periodically flush to PostgreSQL.
- Queries:
  - Total views per URL in last hour/day/week.
  - Unique visitors per URL.
  - Top 10 most viewed pages.
- Handle: high write volume with batch inserts.

---

## 10. Prisma ORM Project

Build a complete application using Prisma.

- Define models with relations.
- Run migrations.
- CRUD operations.
- Nested reads (include, select).
- Transactions.
- Raw SQL for complex queries.
- Connection pooling.
- Pagination.
- Filtering and sorting.

---

## 11. Connection Pool Simulator

Build a visual simulator of a database connection pool.

- Show: active connections, idle connections, waiting queue.
- Configurable: pool size, query duration, request rate.
- Visual indicators:
  - Green: idle connection.
  - Blue: active connection processing query.
  - Yellow: waiting in queue.
  - Red: timeout.
- Metrics: average wait time, queue length over time, throughput.

---

## 12. Query Optimizer Visualizer

Build a tool that shows how the database executes queries.

- Input: SQL query.
- Output: step-by-step execution plan visualization.
- Show: Seq Scan vs Index Scan, JOIN methods (Hash, Nested Loop, Merge), sort operations.
- Display: estimated vs actual row counts, time spent per step.
- Animate: data flowing through each step.
- Bonus: suggest indexes based on query.

---

# Next Part (Part 16)

We enter one of the deepest sections of the JavaScript ecosystem:

# Express.js, Middleware, Routing, MVC Architecture, Error Handling, Validation, Authentication, Logging, Caching, API Design, and Production Backend Engineering

This is where JavaScript becomes a professional backend framework and where senior Node.js engineers spend most of their time.
