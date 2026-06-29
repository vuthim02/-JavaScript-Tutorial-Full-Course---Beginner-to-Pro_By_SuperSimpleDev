# REST API Design — Naming Routes, Structuring Responses

---

## 1. What Is REST?

**REST** = Representational State Transfer. A set of conventions for building APIs that are predictable, consistent, and easy to use.

The core idea: **resources** (nouns) + **HTTP methods** (verbs).

```
Resource: /items
  ├── GET    /items       → List all items
  ├── POST   /items       → Create a new item
  ├── GET    /items/:id   → Get one item
  ├── PATCH  /items/:id   → Update one item
  └── DELETE /items/:id   → Delete one item
```

---

## 2. URL Naming Conventions

### Use plural nouns for collections
```
✅ /items          → collection of items
✅ /items/5        → a specific item
✅ /users/3/orders → orders belonging to user 3

❌ /getItem        → verbs in URLs (that's what HTTP methods are for)
❌ /item-list      → inconsistent naming
```

### Nest related resources
```
GET  /users/5/orders           → orders for user 5
GET  /users/5/orders/2         → specific order for user 5
POST /users/5/orders           → create order for user 5
```

**Rule of thumb:** Nest no more than 2 levels deep. After that, use query params:
```
✅ /users/5/orders              → good
✅ /orders?userId=5             → also good (sometimes better)
❌ /users/5/orders/2/items/3    → too deep
```

### Use kebab-case or snake_case (be consistent)
```
✅ /api/order-items
✅ /api/order_items
❌ /api/orderItems
❌ /api/OrderItems
```

---

## 3. HTTP Methods == CRUD

| Action   | HTTP Method | Route           | Status Code | Notes                        |
|----------|-------------|-----------------|-------------|------------------------------|
| Create   | POST        | `/items`        | 201         | Body contains new resource   |
| Read all | GET         | `/items`        | 200         | Returns array                |
| Read one | GET         | `/items/:id`    | 200         | Returns object               |
| Replace  | PUT         | `/items/:id`    | 200         | Send entire resource         |
| Update   | PATCH       | `/items/:id`    | 200         | Send only changed fields     |
| Delete   | DELETE      | `/items/:id`    | 204         | No body in response          |

**PUT vs PATCH:**
```js
// PUT — replace entire resource
PUT /items/5
body: { name: "Milk", completed: false, priority: 1 }
// Result: item 5 is now EXACTLY { name: "Milk", completed: false, priority: 1 }

// PATCH — update specific fields
PATCH /items/5
body: { completed: true }
// Result: item 5 changes only completed, keeps everything else
```

---

## 4. Response Structure

### Consistent format

```js
// Success — single item
{
  "id": 5,
  "name": "Buy milk",
  "completed": false,
  "createdAt": "2026-06-27T12:00:00Z"
}

// Success — collection
{
  "data": [
    { "id": 1, "name": "Buy milk", "completed": false },
    { "id": 2, "name": "Learn REST", "completed": true }
  ],
  "total": 2,
  "page": 1,
  "perPage": 20
}

// Error
{
  "error": "Item not found",
  "status": 404
}
```

### Always return consistent error shapes

```js
// Centralized error helper
function errorResponse(res, status, message) {
  return res.status(status).json({
    error: message,
    status: status,
  });
}

// Usage
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return errorResponse(res, 404, 'Item not found');
  res.json(item);
});
```

---

## 5. Query Parameters (Filtering, Sorting, Pagination)

```js
GET /items?completed=true&sortBy=name&order=asc&page=2&perPage=10
```

```js
app.get('/api/items', (req, res) => {
  let result = [...items];

  // Filtering
  if (req.query.completed !== undefined) {
    const isCompleted = req.query.completed === 'true';
    result = result.filter(i => i.completed === isCompleted);
  }

  // Sorting
  if (req.query.sortBy === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 20;
  const total = result.length;
  const start = (page - 1) * perPage;
  const paged = result.slice(start, start + perPage);

  res.json({
    data: paged,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  });
});
```

---

## 6. API Versioning

**Why:** So you can change the API without breaking existing clients.

```js
// URL versioning (most common)
GET /api/v1/items
GET /api/v2/items
```

```js
// Express implementation
const v1Router = express.Router();
const v2Router = express.Router();

v1Router.get('/items', (req, res) => { /* v1 logic */ });
v2Router.get('/items', (req, res) => { /* v2 logic */ });

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
```

**Other versioning strategies:** Header versioning (`Accept: application/vnd.myapp.v1+json`), query param (`?version=1`).

---

## 7. Common Patterns

### Partial responses (select fields)
```
GET /items?fields=id,name
→ [{ "id": 1, "name": "Buy milk" }]
```

### Search
```
GET /items?search=milk
```

### Include related resources
```
GET /orders/5?include=items
→ { "id": 5, "items": [...], "total": 29.99 }
```

### Bulk operations
```
POST /items/bulk
body: { "items": [{ "name": "Milk" }, { "name": "Eggs" }] }
```

---

## 8. Our Todo App — REST Analysis

```js
// Current routes (api.js)
GET    /api/items     → ✅ /items (collection)
POST   /api/items     → ✅ /items (create)
PATCH  /api/items/:id → ✅ /items/:id (update)
DELETE /api/items/:id → ✅ /items/:id (delete)
```

**What's missing:**
```js
GET    /api/items/:id → get single item (optional but good practice)
PUT    /api/items/:id → full replace (rarely needed for todos)
```

**Improved version:**
```js
router.get('/items', getAllItems);        // List (with query params)
router.get('/items/:id', getItem);        // Get one
router.post('/items', createItem);        // Create
router.patch('/items/:id', updateItem);   // Partial update
router.delete('/items/:id', deleteItem);  // Delete
```

---

## 9. Quick Reference

| Principle                     | Rule                                      |
|-------------------------------|-------------------------------------------|
| Nouns not verbs               | `/items` not `/getItems`                  |
| Plural collections            | `/items` not `/item`                      |
| HTTP methods = actions        | POST = create, DELETE = remove            |
| Consistent error format       | `{ error: "message", status: 404 }`       |
| Status codes matter           | 201 for create, 204 for delete            |
| Version your API              | `/api/v1/items`                           |
| Paginate collections          | `?page=2&perPage=20`                      |
| Nest wisely (max 2 levels)    | `/users/5/orders` ✅, `/a/b/c/d` ❌       |
| Return 404 for missing resources | Don't return empty 200                |

---

*Last updated: June 2026*
