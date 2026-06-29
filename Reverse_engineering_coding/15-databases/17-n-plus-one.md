# 17 — The N+1 Problem

<img src="https://media.giphy.com/media/NSzHiAwAcazs7dcDr9/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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
SELECT * WHERE  ◄──────────────────► (2 queries, batched)

Total: 2 queries (always)
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| N+1 happening? | Check if loop makes separate DB queries |
| Eager loading available? | Use ORM's `include`, `relations`, `eager` |
| DataLoader available? | Batch loads into single query |
## Next Steps

[Back to Chapter 16](16-orm.md): 16 — ORM: Object Relational Mapper
[Proceed to Chapter 18](18-replication.md): 18 — Replication: Scaling Reads to learn about 18 — replication: scaling reads.
