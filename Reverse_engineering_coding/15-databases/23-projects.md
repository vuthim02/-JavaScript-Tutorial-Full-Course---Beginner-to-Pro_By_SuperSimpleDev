# 23 — Database Projects

<img src="https://media.giphy.com/media/wcgn5fVDjvR7pdvz4C/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## 1. Mini SQL Engine

Build a simple in-memory SQL engine in JavaScript.

- Support `CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE`, `DELETE`.
- Support `WHERE` with AND/OR conditions.
- Support `INNER JOIN`.
- Support `ORDER BY`, `LIMIT`.
- No external dependencies.
- Bonus: B-tree index for O(log n) lookups.

```
const db = new Database();
db.execute("CREATE TABLE users (id INT, name TEXT)");
db.execute("INSERT INTO users VALUES (1, 'Alice')");
const result = db.execute("SELECT * FROM users WHERE id = 1");
```

## 2. Blog Database

Design and build a blog database schema.

- Tables: `users`, `posts`, `comments`, `tags`, `post_tags`.
- Relationships:
  - User has many posts.
  - Post has many comments.
  - Post has many tags (M:N).
- Queries:
  - Get all posts by a user with comment count.
  - Get recent posts with author name and tags.
  - Search posts by title.
- Indexes on: `posts.author_id`, `posts.created_at`, `posts.title` (GIN for full-text).

## 3. Banking System (with Transactions)

- Tables: `accounts(id, balance)`, `transactions(id, from_account_id, to_account_id, amount, created_at)`.
- Transfer money with transaction:
  - Check balance.
  - Deduct from sender.
  - Add to receiver.
  - Record transaction.
  - All or nothing.
- Handle: insufficient funds, deadlocks, concurrent transfers.
- Test with 100 concurrent transfers.

## 4. E-commerce Database

- Tables: `users`, `products`, `categories`, `orders`, `order_items`, `reviews`.
- Features:
  - Product catalog with categories.
  - Shopping cart.
  - Order with multiple items.
  - Inventory management (reduce stock on order).
  - Product reviews with ratings.
- Advanced queries:
  - Top-selling products this month.
  - User's order history with totals.
  - Products frequently bought together.

## 5. Redis Cache Layer

Build a Redis caching middleware for Express.

- Cache GET responses with configurable TTL.
- Cache-aside pattern: check Redis first, fall back to DB, populate cache.
- Invalidate on POST/PUT/PATCH/DELETE (delete related cache keys).
- Cache hit/miss metrics endpoint.
- Auto-cleanup of expired keys.
- Graceful handling of Redis down (fall through to DB).

## 6. URL Shortener

- Table: `urls(id, short_code, long_url, created_at, click_count)`.
- API:
  - `POST /shorten` — accepts long URL, returns short code.
  - `GET /:code` — redirects to long URL (301).
  - `GET /:code/stats` — click count.
- Performance:
  - Index on `short_code`.
  - Redis cache for most-accessed URLs.
  - Count clicks asynchronously.
- Handle: duplicate URLs (return existing short code), invalid codes (404).

## 7. Chat Application Database

- Tables: `users`, `rooms`, `messages`, `room_members`.
- Queries:
  - Get all rooms for a user.
  - Get last 50 messages in a room.
  - Get unread count for each room.
  - Mark messages as read.
- Performance:
  - Pagination for messages (cursor-based).
  - Index on `(room_id, created_at)`.
  - Archive old messages to separate table.

## 8. Inventory System

- Tables: `products(id, name, stock)`, `reservations(id, product_id, quantity, expires_at)`.
- Features:
  - Reserve stock when user adds to cart (limited time).
  - Release expired reservations.
  - Prevent overselling (CHECK constraint or lock).
  - Audit log of stock changes.
- Concurrency:
  - Use `SELECT ... FOR UPDATE` to prevent race conditions.
  - Handle: two users buying last item simultaneously.

## 9. Analytics Engine

Build a simple analytics system that tracks page views.

- Table: `page_views(id, url, user_id, ip, user_agent, created_at)`.
- Real-time aggregation with Redis:
  - Increment Redis counters per URL per minute.
  - Periodically flush to PostgreSQL.
- Queries:
  - Total views per URL in last hour/day/week.
  - Unique visitors per URL.
  - Top 10 most viewed pages.
- Handle: high write volume with batch inserts.

## 10. Prisma ORM Project

Build a complete application using Prisma.

- Define models with relations.
- Run migrations.
- CRUD operations.
- Nested reads (include, select).
- Transactions.
- Raw SQL for complex queries.
- Connection pooling.
- Pagination.
- Filtering and sorting.

## 11. Connection Pool Simulator

Build a visual simulator of a database connection pool.

- Show: active connections, idle connections, waiting queue.
- Configurable: pool size, query duration, request rate.
- Visual indicators:
  - Green: idle connection.
  - Blue: active connection processing query.
  - Yellow: waiting in queue.
  - Red: timeout.
- Metrics: average wait time, queue length over time, throughput.

## 12. Query Optimizer Visualizer

Build a tool that shows how the database executes queries.

- Input: SQL query.
- Output: step-by-step execution plan visualization.
- Show: Seq Scan vs Index Scan, JOIN methods (Hash, Nested Loop, Merge), sort operations.
- Display: estimated vs actual row counts, time spent per step.
- Animate: data flowing through each step.
- Bonus: suggest indexes based on query.

---

Next: **Express.js, Middleware, Routing, MVC Architecture, Error Handling, Validation, Authentication, Logging, Caching, API Design, and Production Backend Engineering**
## Next Steps

[Back to Chapter 22](22-code-review-checklist.md): 22 — Database-Focused Code Review Checklist
[Proceed to Module 16](../16-express/README.md): Express.js, Middleware, MVC, Error Handling, Validation, Auth, Production Backend to learn about building backend applications with Express.
