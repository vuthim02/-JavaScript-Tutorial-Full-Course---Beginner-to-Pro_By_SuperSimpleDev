# 03 — Relational Model: Tables, Primary Keys, Foreign Keys

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Tables, Rows, Columns

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

### Creating Tables

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

## Primary Keys

Every table needs a **primary key** to uniquely identify each row.

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

### Primary Key Properties

| Property | Why |
|----------|-----|
| **Unique** | No two rows have the same PK |
| **Non-null** | Every row must have a PK |
| **Immutable** | PK should never change (or cascade updates) |

### Natural vs Surrogate Keys

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

## Foreign Keys

A **foreign key** links a column in one table to the primary key of another table. This enforces referential integrity.

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    -- user_id must exist in users.id
    total DECIMAL(10,2) NOT NULL
);
```

### Foreign Key Actions

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

### The Cost of Foreign Keys

- **Write slow-down**: Every INSERT/UPDATE checks referential integrity.
- **Locking**: Some databases lock parent rows during child inserts.
- **But**: Prevents orphaned data — worth the cost for data integrity.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which entity owns this data? | The table with the PK |
| Which table references another? | FK column points to PK of another table |
| What happens on delete? | Check FK action (CASCADE, SET NULL, RESTRICT) |
## Next Steps

[Back to Chapter 2](02-sql-vs-nosql.md): 02 — SQL vs NoSQL
[Proceed to Chapter 4](04-crud-basics.md): 04 — SQL CRUD Basics to learn about 04 — sql crud basics.
