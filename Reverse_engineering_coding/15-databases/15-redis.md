# 15 — Redis: In-Memory Data Store

<img src="https://media.giphy.com/media/3oEjI9xj49ehuAGLQY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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
## Next Steps

[Back to Chapter 14](14-mongodb.md): 14 — MongoDB: Document Database
[Proceed to Chapter 16](16-orm.md): 16 — ORM: Object Relational Mapper to learn about 16 — orm: object relational mapper.
