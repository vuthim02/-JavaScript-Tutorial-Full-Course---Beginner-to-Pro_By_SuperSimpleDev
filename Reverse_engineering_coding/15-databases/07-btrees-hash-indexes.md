# 07 — B-Trees and Hash Indexes

## B-Trees: The Most Important Data Structure in Databases

A B-tree is a self-balancing tree data structure that maintains sorted data and allows searches, insertions, and deletions in O(log n).

```
                    ┌──────┐
                    │  50  │   ← Internal node (keys + pointers)
                  ┌─┴──┬───┴──┐
                  │    │      │
              ┌───┘    │      └───┐
          ┌───┴──┐ ┌──┴───┐ ┌───┴──┐
          │ 20   │ │  70  │ │ 90   │  ← Leaf nodes (keys + row pointers)
          │ 30   │ │  80  │ │ 95   │
          └──────┘ └──────┘ └──────┘
```

### Properties

| Property | Value |
|----------|-------|
| **Depth** | Usually 3-4 for millions of rows |
| **Order** | Maximum number of keys per node (often hundreds) |
| **Fan-out** | Each node points to many children (unlike binary tree) |
| **Self-balancing** | Insert/delete maintain balance automatically |
| **Pages** | Each node fits in one database page (typically 8 KB) |

### B-Tree vs Binary Search Tree

```
Binary Search Tree (BST):
        ┌──┐
        │50│
       ╱    ╲
    ┌──┐    ┌──┐
    │20│    │70│
   ╱    ╲     ╲
┌──┐  ┌──┐   ┌──┐
│10│  │30│   │80│
└──┘  └──┘   └──┘
- Two children per node
- Depth = O(log n) but worse in practice (more levels)
- Poor cache locality (nodes scattered in memory)

B-Tree:
┌──────────────────┐
│  50   100   150  │  ← One node (one page)
├──────────────────┤
│ Child pointers   │
└──────────────────┘
- Hundreds of keys per node
- Depth = O(log_fan-out n) = very shallow
- Excellent cache locality (one page = many keys)
```

### Search Algorithm

```
Find key 72 in B-tree:

1. Read root page: [50, 100, 150]
   72 > 50 and 72 < 100 → follow pointer to child node 2

2. Read child page: [60, 70, 80, 90]
   72 > 70 and 72 < 80 → found it (no exact match = no such row)

Total: 2 page reads (from cache or disk)
```

---

## Hash Indexes: O(1) Lookups

### Structure

```
Key: 'alice@test.com'
       ↓
Hash Function
       ↓
Hash: 0x7f83b165
       ↓
Bucket: #42 → Row pointer
```

### When Hash Indexes Excel

```sql
-- Exact match only — very fast
CREATE INDEX ON users USING HASH(email);

SELECT * FROM users WHERE email = 'alice@test.com';  -- O(1)
```

### When Hash Indexes Fail

```sql
SELECT * FROM users WHERE email > 'alice@test.com';
-- Hash index cannot do range queries
-- Falls back to sequential scan

SELECT * FROM users ORDER BY email;
-- Hash index cannot return sorted data
```

### B-Tree vs Hash Comparison

| Feature | Hash | B-tree |
|---------|------|--------|
| Equality | O(1) | O(log n) |
| Range | Impossible | O(log n + k) |
| Sorting | Impossible | O(log n + k) |
| Prefix match | Impossible | O(log n + k) |
## Next Steps

[Back to Chapter 6](06-indexes.md): 06 — Indexes
[Proceed to Chapter 8](08-acid.md): 08 — ACID: Database Transaction Guarantees to learn about 08 — acid: database transaction guarantees.
