# 10 — Normalization: Reducing Redundancy

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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
## Next Steps

[Back to Chapter 9](09-transactions.md): 09 — Transactions in Practice
[Proceed to Chapter 11](11-denormalization.md): 11 — Denormalization: Trading Storage for Speed to learn about 11 — denormalization: trading storage for speed.
