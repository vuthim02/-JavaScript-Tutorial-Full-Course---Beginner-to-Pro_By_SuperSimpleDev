# 14 — MongoDB: Document Database

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
## Next Steps

[Back to Chapter 13](13-query-optimization.md): 13 — Query Optimization
[Proceed to Chapter 15](15-redis.md): 15 — Redis: In-Memory Data Store to learn about 15 — redis: in-memory data store.
