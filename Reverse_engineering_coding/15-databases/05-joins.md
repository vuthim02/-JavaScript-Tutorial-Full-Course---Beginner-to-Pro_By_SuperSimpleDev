# 05 — JOINs: Combining Tables

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
## Next Steps

[Back to Chapter 4](04-crud-basics.md): 04 — SQL CRUD Basics
[Proceed to Chapter 6](06-indexes.md): 06 — Indexes to learn about 06 — indexes.
