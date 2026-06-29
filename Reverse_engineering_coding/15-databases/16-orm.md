# 16 — ORM: Object Relational Mapper

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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
## Next Steps

[Back to Chapter 15](15-redis.md): 15 — Redis: In-Memory Data Store
[Proceed to Chapter 17](17-n-plus-one.md): 17 — The N+1 Problem to learn about 17 — the n+1 problem.
