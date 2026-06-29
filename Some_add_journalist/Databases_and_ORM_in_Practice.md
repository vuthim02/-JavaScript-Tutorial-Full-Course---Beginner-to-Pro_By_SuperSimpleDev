# Databases & ORM in Practice — SQL, Prisma, Knex, Relationships

---

## 1. SQL Foundation — The Language of Databases

SQL is the language every relational database speaks. You need **5 commands** for 90% of work:

### CRUD in SQL

```sql
-- CREATE
INSERT INTO items (name, completed) VALUES ('Buy milk', false);

-- READ (all)
SELECT * FROM items;

-- READ (one)
SELECT * FROM items WHERE id = 1;

-- UPDATE
UPDATE items SET completed = true WHERE id = 1;

-- DELETE
DELETE FROM items WHERE id = 1;
```

### WHERE clause — filtering

```sql
SELECT * FROM items
WHERE completed = false
  AND name LIKE '%milk%'
  AND created_at > '2026-01-01'
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;
```

### JOINs — combining tables

```sql
-- One-to-many: users have many items
SELECT users.name, items.name AS item_name
FROM users
JOIN items ON items.user_id = users.id
WHERE users.id = 1;

-- Left join (include users with no items)
SELECT users.name, COUNT(items.id) AS item_count
FROM users
LEFT JOIN items ON items.user_id = users.id
GROUP BY users.id;
```

---

## 2. PostgreSQL Setup

### Local installation

```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-client

# Start service
sudo systemctl start postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE myapp;
CREATE USER myuser WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE myapp TO myuser;
```

### Connecting from Node.js

```bash
npm install pg
```

Create a connection pool (never use a single connection for a web server):

```js
// db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'myapp',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'password',
  max: 20,                    // max connections in pool
  idleTimeoutMillis: 30000,    // close idle clients after 30s
  connectionTimeoutMillis: 2000, // fail fast if DB is down
});

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
});

module.exports = pool;
```

### Raw SQL CRUD example

```js
// models/item.js
const pool = require('../db');

const Item = {
  async findAll({ completed, page = 1, perPage = 20 } = {}) {
    let query = 'SELECT * FROM items';
    const params = [];
    let paramIndex = 1;

    if (completed !== undefined) {
      query += ` WHERE completed = $${paramIndex++}`;
      params.push(completed === 'true');
    }

    query += ' ORDER BY created_at DESC';
    query += ` LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    params.push(perPage, (page - 1) * perPage);

    const { rows } = await pool.query(query, params);
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { rows } = await pool.query(
      'INSERT INTO items (name, completed, user_id) VALUES ($1, $2, $3) RETURNING *',
      [data.name, data.completed || false, data.userId]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = [];
    const params = [];
    let paramIndex = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      params.push(data.name);
    }
    if (data.completed !== undefined) {
      fields.push(`completed = $${paramIndex++}`);
      params.push(data.completed);
    }

    if (fields.length === 0) return null;

    params.push(id);
    const { rows } = await pool.query(
      `UPDATE items SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      params
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
  },
};

module.exports = Item;
```

**Note:** `$1`, `$2` are **parameterized queries** — they prevent SQL injection. NEVER use string interpolation for values:

```js
// ❌ DANGEROUS — SQL injection!
pool.query(`SELECT * FROM items WHERE id = ${id}`);

// ✅ Safe — parameterized
pool.query('SELECT * FROM items WHERE id = $1', [id]);
```

---

## 3. Prisma ORM — The Modern Way

Prisma is a **schema-first ORM**. You define your data model, and it generates a type-safe client.

### Setup

```bash
npm install @prisma/client
npm install --save-dev prisma

npx prisma init
```

This creates `prisma/schema.prisma` and a `.env` with `DATABASE_URL`.

### Schema definition

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  items     Item[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Item {
  id        Int      @id @default(autoincrement())
  name      String
  completed Boolean  @default(false)
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Run migration

```bash
npx prisma migrate dev --name init
```

This creates the SQL migration file, applies it to the DB, and generates the Prisma Client.

### Prisma Client CRUD

```js
// prisma/client.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;
```

```js
// routes/items.js
const prisma = require('../prisma/client');

// READ all (with filtering, pagination, includes)
router.get('/items', async (req, res) => {
  const { completed, page = 1, perPage = 20 } = req.query;

  const where = {};
  if (completed !== undefined) {
    where.completed = completed === 'true';
  }

  const [items, total] = await Promise.all([
    prisma.item.findMany({
      where,
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.item.count({ where }),
  ]);

  res.json({
    data: items,
    total,
    page: page,
    perPage: perPage,
    totalPages: Math.ceil(total / perPage),
  });
});

// READ one
router.get('/items/:id', async (req, res) => {
  const item = await prisma.item.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { user: true },
  });
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// CREATE
router.post('/items', async (req, res) => {
  const item = await prisma.item.create({
    data: {
      name: req.body.name,
      userId: req.user.id,  // from auth middleware
    },
  });
  res.status(201).json(item);
});

// UPDATE
router.patch('/items/:id', async (req, res) => {
  const item = await prisma.item.update({
    where: { id: parseInt(req.params.id) },
    data: {
      ...(req.body.name !== undefined && { name: req.body.name }),
      ...(req.body.completed !== undefined && { completed: req.body.completed }),
    },
  });
  res.json(item);
});

// DELETE
router.delete('/items/:id', async (req, res) => {
  await prisma.item.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).send();
});
```

### Migrations workflow

```bash
# After changing schema.prisma:
npx prisma migrate dev --name add-category-field

# Review the generated SQL in prisma/migrations/ before applying:
# Then apply:

# In production:
npx prisma migrate deploy

# Generate client without running migration (if already applied):
npx prisma generate

# Visualize data in browser:
npx prisma studio
```

---

## 4. Knex.js — Query Builder (Middle Ground)

Knex is not an ORM — it's a **query builder**. You write SQL-like JavaScript.

```bash
npm install knex pg
```

### Setup

```js
// knexfile.js
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'myapp',
      user: 'postgres',
      password: 'password',
    },
    pool: { min: 2, max: 10 },
    migrations: { directory: './db/migrations' },
    seeds: { directory: './db/seeds' },
  },
  production: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 2, max: 10 },
    migrations: { directory: './db/migrations' },
  },
};
```

### CRUD with Knex

```js
const db = require('knex')(require('../knexfile').development);

// READ all
router.get('/items', async (req, res) => {
  const { completed, page = 1, perPage = 20 } = req.query;

  let query = db('items');

  if (completed !== undefined) {
    query = query.where('completed', completed === 'true');
  }

  const [items, total] = await Promise.all([
    query.clone()
      .orderBy('created_at', 'desc')
      .limit(perPage)
      .offset((page - 1) * perPage),
    query.clone().count('* as count').first(),
  ]);

  res.json({
    data: items,
    total: parseInt(total.count),
    page,
    perPage,
    totalPages: Math.ceil(total.count / perPage),
  });
});

// CREATE
router.post('/items', async (req, res) => {
  const [item] = await db('items')
    .insert({ name: req.body.name, user_id: req.user.id })
    .returning('*');
  res.status(201).json(item);
});

// UPDATE
router.patch('/items/:id', async (req, res) => {
  const [item] = await db('items')
    .where('id', req.params.id)
    .update(req.body)
    .returning('*');
  res.json(item);
});

// DELETE
router.delete('/items/:id', async (req, res) => {
  await db('items').where('id', req.params.id).del();
  res.status(204).send();
});
```

### Migrations with Knex

```bash
npx knex migrate:make create_items_table
```

```js
// db/migrations/20260627000001_create_items_table.js
exports.up = function (knex) {
  return knex.schema.createTable('items', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.boolean('completed').defaultTo(false);
    table.integer('user_id').references('id').inTable('users');
    table.timestamps(true, true);  // created_at, updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('items');
};
```

```bash
npx knex migrate:latest
npx knex migrate:rollback
npx knex seed:make seed_items
npx knex seed:run
```

---

## 5. Relationships Deep Dive

### One-to-Many (User → Items)

This is what we've been using. One user has many items.

**Prisma:**
```prisma
model User {
  items Item[]   // User can have many items
}

model Item {
  user   User @relation(fields: [userId], references: [id])
  userId Int
}
```

**Raw SQL:**
```sql
SELECT items.*, users.name AS user_name
FROM items
JOIN users ON users.id = items.user_id
WHERE users.id = 1;
```

### Many-to-Many (Items ↔ Tags)

An item can have many tags, a tag can belong to many items. Requires a **junction table**.

**Prisma:**
```prisma
model Item {
  id       Int
  name     String
  tags     ItemTag[]
}

model Tag {
  id    Int
  name  String  @unique
  items ItemTag[]
}

model ItemTag {
  itemId Int
  tagId  Int
  item   Item @relation(fields: [itemId], references: [id])
  tag    Tag  @relation(fields: [tagId], references: [id])

  @@id([itemId, tagId])
}
```

**Prisma queries:**
```js
// Create item with tags
await prisma.item.create({
  data: {
    name: 'Buy milk',
    tags: {
      create: [
        { tag: { connectOrCreate: { where: { name: 'groceries' }, create: { name: 'groceries' } } } },
        { tag: { connectOrCreate: { where: { name: 'urgent' }, create: { name: 'urgent' } } } },
      ],
    },
  },
  include: { tags: { include: { tag: true } } },
});

// Find items with a specific tag
await prisma.item.findMany({
  where: { tags: { some: { tag: { name: 'groceries' } } } },
});
```

**Raw SQL many-to-many:**
```sql
-- Find all items with tag 'groceries'
SELECT items.*
FROM items
JOIN item_tags ON item_tags.item_id = items.id
JOIN tags ON tags.id = item_tags.tag_id
WHERE tags.name = 'groceries';
```

### One-to-One (User ↔ Profile)

Each user has exactly one profile.

**Prisma:**
```prisma
model User {
  profile Profile?
}

model Profile {
  userId Int   @unique  // ← unique makes it one-to-one
  bio    String
  user   User  @relation(fields: [userId], references: [id])
}
```

---

## 6. Transactions

A transaction ensures **all operations succeed or none do**. If one fails, everything rolls back.

### Raw SQL / pg

```js
const client = await pool.connect();
try {
  await client.query('BEGIN');

  const { rows } = await client.query(
    'INSERT INTO items (name, user_id) VALUES ($1, $2) RETURNING id',
    [itemName, userId]
  );
  const itemId = rows[0].id;

  await client.query(
    'INSERT INTO audit_log (action, item_id) VALUES ($1, $2)',
    ['created', itemId]
  );

  await client.query('COMMIT');
} catch (err) {
  await client.query('ROLLBACK');
  throw err;
} finally {
  client.release();
}
```

### Prisma

```js
await prisma.$transaction(async (tx) => {
  const item = await tx.item.create({
    data: { name: 'Buy milk', userId: 1 },
  });

  await tx.auditLog.create({
    data: { action: 'created', itemId: item.id },
  });

  return item;
});
```

### Knex

```js
await db.transaction(async (trx) => {
  const [item] = await trx('items')
    .insert({ name: 'Buy milk', user_id: userId })
    .returning('*');

  await trx('audit_log')
    .insert({ action: 'created', item_id: item.id });

  return item;
});
```

---

## 7. Connection Pooling — Why It Matters

Each database connection consumes resources. A **pool** reuses connections.

```
Without pool (bad):
  Request 1 → open connection → query → close
  Request 2 → open connection → query → close
  Request 3 → open connection → query → close
  (opens/closes for every request — slow)

With pool (good):
  [===== Pool (20 connections) =====]
  Request 1 → grab from pool → query → return to pool
  Request 2 → grab from pool → query → return to pool
  (connections stay open, reused instantly)
```

**Pool size formula:**
```
pool_max = (num_CPUs * 2) + effective_concurrent_disk_IO
```

For a typical 2-CPU web server: `max: 10-20` is fine.

**What happens when pool is exhausted:**
```
Request waits (queued) until a connection is free
or times out after connectionTimeoutMillis
```

---

## 8. Migration Workflow (Production)

```
1. Developer changes schema.prisma
2. npx prisma migrate dev --name add-due-date
   → Generates SQL file in prisma/migrations/
   → Applies to local database
   → Regenerates Prisma Client

3. Commit: schema.prisma + migration folder + generated client

4. Deploy to production
   → npx prisma migrate deploy
   → (applies only pending migrations)
```

**Golden rules:**
- Never edit existing migration files (they've already run)
- Always test migrations on a staging DB first
- Backup production DB before running migrations
- Schema changes + code changes should be deployed together

**Rollback:**
```bash
prisma migrate dev --create-only  # generate SQL without applying
prisma migrate resolve --rolled-back  # mark a failed migration as rolled back
```

---

## 9. Decision Guide: Which Approach?

| Approach | When to Use | Pros | Cons |
|---|---|---|---|
| Raw `pg` | Simple queries, full control, you know SQL | Zero abstraction, fastest, tiny bundle | Manual everything, no type safety |
| Knex | You like SQL but want query building + migrations | Familiar SQL syntax, great migrations, flexible | No type safety, verbose for complex queries |
| Prisma | New projects, need speed + type safety | Auto-generated client, amazing DX, easy relations | Another abstraction to learn, migration rollback is tricky |

**Recommendation for a todo app:**
1. **Start with Prisma** — fastest to build, migrations are easy, type safety prevents bugs
2. **Raw `pg`** if you want to deeply understand SQL first
3. **Knex** if you prefer SQL-like syntax but want structured migrations

---

## 10. Full Prisma Todo API — Reference

```prisma
// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  items     Item[]
  createdAt DateTime @default(now())
}

model Item {
  id        Int      @id @default(autoincrement())
  name      String
  completed Boolean  @default(false)
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

```js
// server.js
const prisma = require('./prisma/client');

// READ — with filter, sort, pagination, include
app.get('/api/items', async (req, res) => {
  const { completed, sort = 'createdAt', order = 'desc', page = 1, perPage = 20 } = req.query;

  const where = { userId: req.user.id };
  if (completed !== undefined) where.completed = completed === 'true';

  const [items, total] = await Promise.all([
    prisma.item.findMany({
      where,
      orderBy: { [sort]: order },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.item.count({ where }),
  ]);

  res.json({ data: items, total, page: +page, perPage: +perPage, totalPages: Math.ceil(total / perPage) });
});

// CREATE
app.post('/api/items', async (req, res) => {
  const item = await prisma.item.create({
    data: { name: req.body.name, userId: req.user.id },
  });
  res.status(201).json(item);
});

// UPDATE
app.patch('/api/items/:id', async (req, res) => {
  const item = await prisma.item.update({
    where: { id: +req.params.id },
    data: {
      ...(req.body.name !== undefined && { name: req.body.name }),
      ...(req.body.completed !== undefined && { completed: req.body.completed }),
    },
  });
  res.json(item);
});

// DELETE
app.delete('/api/items/:id', async (req, res) => {
  await prisma.item.delete({ where: { id: +req.params.id } });
  res.status(204).send();
});
```

---

## 11. Quick Reference

| Concept | Key Point |
|---|---|
| SQL injection | Always use parameterized queries (`$1`, `$2`) |
| Connection pool | Reuse connections, don't open/close per request |
| Pool size | `(CPU * 2) + disk IO` — typically 10-20 |
| Prisma schema | Define models, run `prisma migrate dev` |
| Prisma client | `prisma.item.findMany()`, `.create()`, `.update()`, `.delete()` |
| Migrations | Never edit applied migrations, always create new ones |
| Transactions | All-or-nothing — use `prisma.$transaction()` |
| JOINs | Combine tables — Prisma uses `include` or `relations` |
| N+1 problem | Use `include` or batch queries to avoid N+1 queries |
| Parameterized queries | `WHERE id = $1` — values separated from SQL |

---

*Last updated: June 2026*
