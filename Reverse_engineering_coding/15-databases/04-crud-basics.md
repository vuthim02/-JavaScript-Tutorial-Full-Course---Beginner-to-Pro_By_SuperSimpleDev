# 04 — SQL CRUD Basics

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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
## Next Steps

[Back to Chapter 3](03-relational-model.md): 03 — Relational Model: Tables, Primary Keys, Foreign Keys
[Proceed to Chapter 5](05-joins.md): 05 — JOINs: Combining Tables to learn about 05 — joins: combining tables.
