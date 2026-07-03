# 11 — Denormalization: Trading Storage for Speed

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

### 1. Pre-computed Aggregates

```sql
-- Instead of COUNT every time:
SELECT COUNT(*) FROM likes WHERE post_id = 1;

-- Store count directly in posts:
ALTER TABLE posts ADD COLUMN like_count INTEGER DEFAULT 0;

-- Update on each like:
UPDATE posts SET like_count = like_count + 1 WHERE id = 1;
```

### 2. Embedded Data

```sql
-- Instead of JOIN for frequently accessed data:
ALTER TABLE posts ADD COLUMN author_name TEXT;
-- Copy name when post is created, update if name changes
```

### 3. Redundant Arrays (PostgreSQL)

```sql
-- Store tag names directly instead of JOIN
ALTER TABLE posts ADD COLUMN tags TEXT[];
-- Index with GIN:
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
```

## Real-World Denormalization Scenarios

### Social Feed (High Read Volume)

```sql
-- Normalized (slow for feeds):
SELECT p.*, u.name, COUNT(l.id) as likes
FROM posts p
JOIN users u ON p.author_id = u.id
LEFT JOIN likes l ON l.post_id = p.id
GROUP BY p.id, u.id
ORDER BY p.created_at DESC
LIMIT 50;

-- Denormalized (fast for feeds):
SELECT id, title, body, author_name, like_count
FROM posts
ORDER BY created_at DESC
LIMIT 50;
-- Single table scan, no JOINs, no aggregation
```

### E-commerce Product Page

```sql
-- Normalized (5+ JOINs per page load):
SELECT p.*, c.name as category, AVG(r.rating) as avg_rating,
       COUNT(r.id) as review_count, s.stock_count
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN reviews r ON r.product_id = p.id
JOIN stock s ON s.product_id = p.id
WHERE p.id = 42
GROUP BY p.id, c.id, s.id;

-- Denormalized (single query, no JOINs):
SELECT id, name, price, category_name, avg_rating,
       review_count, stock_count
FROM products WHERE id = 42;
```

## Maintaining Denormalized Data

### Strategy 1: Update on Write

```javascript
async function likePost(postId, userId) {
    await db.query(`
        INSERT INTO likes (post_id, user_id) VALUES ($1, $2)
    `, [postId, userId]);

    await db.query(`
        UPDATE posts SET like_count = like_count + 1 WHERE id = $1
    `, [postId]);
}
```

### Strategy 2: Background Sync (Eventual Consistency)

```javascript
// After write, enqueue sync job
await queue.add('sync-post-stats', { postId });

// Worker periodically recalculates denormalized fields
async function syncPostStats(postId) {
    const { rows } = await db.query(`
        SELECT COUNT(*) as likes FROM likes WHERE post_id = $1
    `, [postId]);
    await db.query(`
        UPDATE posts SET like_count = $1 WHERE id = $2
    `, [rows[0].likes, postId]);
}
```

### Strategy 3: Trigger-Based Sync

```sql
CREATE OR REPLACE FUNCTION update_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE posts SET like_count = like_count - 1 WHERE id = OLD.post_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER like_sync
AFTER INSERT OR DELETE ON likes
FOR EACH ROW EXECUTE FUNCTION update_like_count();
```

## Trade-offs

| Aspect | Normalized | Denormalized |
|--------|-----------|--------------|
| **Read performance** | Slower (JOINs) | Faster (single table) |
| **Write performance** | Faster (single place) | Slower (update multiple copies) |
| **Data integrity** | Strong | Weaker (can get out of sync) |
| **Storage** | Less | More (duplication) |
| **Development complexity** | Simpler | More sync code needed |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Performance optimization? | Profile first, then denormalize if JOINs are bottleneck |
| Storage vs speed? | Denormalization trades storage for speed |
| Data consistency risk? | Denormalized data can become stale |
| How to keep in sync? | Triggers, background jobs, or update-on-write |
| Read-to-write ratio? | High reads → denormalize helps. High writes → may hurt |
## Next Steps

[Back to Chapter 10](10-normalization.md): 10 — Normalization: Reducing Redundancy
[Proceed to Chapter 12](12-database-internals.md): 12 — Database Engine Internals to learn about 12 — database engine internals.
