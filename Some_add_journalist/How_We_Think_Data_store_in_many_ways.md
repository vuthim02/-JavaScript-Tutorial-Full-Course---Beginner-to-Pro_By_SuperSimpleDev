# How We Store Data in Web Projects — Every Way Explained

## Overview

Data storage in web development splits into **two locations**:

```
CLIENT (Browser)                         SERVER
─────────────────                        ──────
localStorage                             In-Memory
sessionStorage                           File (JSON, SQLite)
Cookies                                  Relational DB (PostgreSQL, MySQL)
IndexedDB                                NoSQL DB (MongoDB, Redis)
Cache API                                Cloud / Managed DB
```

Each has trade-offs in **persistence**, **capacity**, **speed**, **security**, and **complexity**.

---

## 1. Client-Side Storage (Browser)

### 1.1 localStorage

**What it is:** Key-value store in the browser. Data lives until explicitly deleted.

| Property          | Value            |
|-------------------|------------------|
| Capacity          | ~5-10 MB         |
| Persistence       | Survives browser close, restart, reboot |
| Scope             | Per origin (protocol + domain + port) |
| Data type         | Strings only (JSON.stringify/parse for objects) |
| Async?            | Synchronous (blocks the main thread) |
| Sent to server?   | No               |

**When to use:**
- User preferences (theme, language)
- Shopping cart (small, non-critical)
- Form auto-save / drafts
- Game high scores

**When NOT to use:**
- Sensitive data (passwords, tokens — use httpOnly cookies instead)
- Large data (use IndexedDB)
- Must sync across devices (use a server)

**Code:**
```js
// Save
localStorage.setItem('theme', 'dark');
localStorage.setItem('cart', JSON.stringify([{ id: 1, qty: 2 }]));

// Read
const theme = localStorage.getItem('theme');
const cart = JSON.parse(localStorage.getItem('cart') || '[]');

// Remove
localStorage.removeItem('theme');

// Clear all
localStorage.clear();
```

**In Alpine.js:**
```html
<div x-data="{ theme: localStorage.getItem('theme') || 'light' }">
  <button @click="theme = 'dark'; localStorage.setItem('theme', 'dark')">
    Dark Mode
  </button>
</div>
```

---

### 1.2 sessionStorage

**What it is:** Identical to localStorage but cleared when the tab/window closes.

| Property          | Value            |
|-------------------|------------------|
| Capacity          | ~5-10 MB         |
| Persistence       | Until tab closes |
| Scope             | Per tab + origin  |
| Data type         | Strings only     |
| Async?            | Synchronous      |

**When to use:**
- Multi-step form data (wizard)
- One-time session flags (first-visit tour)
- Tab-specific temporary state

**Code:**
```js
sessionStorage.setItem('formStep', '3');
const step = sessionStorage.getItem('formStep');
sessionStorage.clear();
```

---

### 1.3 Cookies

**What it is:** Small text files stored in the browser, automatically sent with every HTTP request to the server.

| Property          | Value            |
|-------------------|------------------|
| Capacity          | ~4 KB per cookie |
| Persistence       | Controllable via `Expires`/`Max-Age` |
| Scope             | Per domain + path |
| Sent to server?   | Yes (every request) |
| Security          | Can be `httpOnly` (inaccessible to JS), `secure` (HTTPS only), `SameSite` |

**Types:**
- **Session cookies** — deleted when browser closes
- **Persistent cookies** — have an expiry date
- **Third-party cookies** — set by a domain other than the one you're visiting (being phased out)

**When to use:**
- Session IDs / auth tokens (with httpOnly flag)
- User tracking / analytics
- Consent banners (GDPR)
- Shopping carts (though localStorage is common now)

**When NOT to use:**
- Large data (4KB limit, sent with every request — slow)
- Sensitive data without httpOnly + secure flags

**Server-side (Express with cookie-parser):**
```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Set cookie
res.cookie('sessionId', 'abc123', {
  httpOnly: true,
  secure: true,
  maxAge: 1000 * 60 * 60 * 24, // 1 day
});

// Read cookie
app.get('/profile', (req, res) => {
  console.log(req.cookies.sessionId);
});

// Clear cookie
res.clearCookie('sessionId');
```

**Client-side (document.cookie):**
```js
// Set (only accessible to JS if httpOnly is NOT set)
document.cookie = 'theme=dark; path=/; max-age=86400';

// Read (returns all cookies as a string)
console.log(document.cookie);

// Delete (set max-age to 0)
document.cookie = 'theme=; max-age=0';
```

---

### 1.4 IndexedDB

**What it is:** A full NoSQL database built into the browser. Stores structured data (objects, blobs, files) asynchronously.

| Property          | Value                    |
|-------------------|--------------------------|
| Capacity          | Hundreds of MBs to GBs   |
| Persistence       | Until manually deleted    |
| Scope             | Per origin                |
| Data type         | Any structured data (objects, arrays, blobs, files) |
| Async?            | Yes (callbacks / promises, non-blocking) |
| Query language    | IndexedDB API (not SQL)   |

**When to use:**
- Offline-first apps (PWA)
- Large datasets (e.g., a music library, map tiles)
- File/blob storage (images, PDFs)
- Complex querying and indexing

**When NOT to use:**
- Simple key-value pairs (use localStorage)
- Need SQL queries

**Code (using idb wrapper for cleaner promises):**
```js
import { openDB } from 'https://unpkg.com/idb';

const db = await openDB('myApp', 1, {
  upgrade(db) {
    const store = db.createObjectStore('notes', {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('byDate', 'createdAt');
  },
});

// Add
await db.add('notes', { title: 'My note', body: '...', createdAt: new Date() });

// Read all
const notes = await db.getAll('notes');

// Read by index
const todayNotes = await db.getAllFromIndex('notes', 'byDate', someDate);

// Delete
await db.delete('notes', 1);
```

---

### 1.5 Cache API

**What it is:** Part of the Service Worker API. Stores HTTP responses for offline access.

| Property          | Value                    |
|-------------------|--------------------------|
| Capacity          | Browser-dependent (often large) |
| Persistence       | Until manually deleted or storage quota exceeded |
| Scope             | Per origin (Service Worker controlled) |
| Data type         | `Request` / `Response` pairs |
| Async?            | Yes (promises)            |

**When to use:**
- Progressive Web Apps (offline support)
- Caching API responses for speed
- Pre-caching static assets (HTML, CSS, JS)

**Code (in Service Worker):**
```js
// Install — pre-cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(['/', '/index.html', '/style.css', '/app.js']);
    })
  );
});

// Fetch — serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
```

**Outside Service Worker (for cache management):**
```js
// Check if cached
const cached = await caches.match('/api/items');
if (cached) {
  const data = await cached.json();
}

// Store a response
await caches.open('my-cache').then(cache => {
  cache.put('/api/items', new Response(JSON.stringify(items)));
});
```

---

## 2. Server-Side Storage

### 2.1 In-Memory (Array / Map)

**What it is:** Data stored in variables while the server runs.

| Property          | Value                    |
|-------------------|--------------------------|
| Persistence       | Lost on server restart    |
| Speed             | Fastest option            |
| Capacity          | RAM-dependent             |
| Setup             | Zero                      |

**When to use:**
- Prototyping / learning
- Caching (with Redis for production)
- Temporary data (sessions, rate-limiting counters)

**When NOT to use:**
- Any data you can't afford to lose
- Multiple server instances (each has its own memory)

**Code:**
```js
const items = [];

// Create
items.push({ id: 1, name: 'Learn Express' });

// Read
const item = items.find(i => i.id === 1);

// Update
const idx = items.findIndex(i => i.id === 1);
items[idx].name = 'Learn more';

// Delete
const filtered = items.filter(i => i.id !== 1);
```

---

### 2.2 File-Based Storage (JSON File / SQLite)

#### JSON File

**What it is:** Read/write a JSON file on the server disk.

| Property          | Value                    |
|-------------------|--------------------------|
| Persistence       | Survives restarts         |
| Speed             | Slow for large data (reads/writes entire file) |
| Capacity          | Disk-limited              |
| Setup             | Zero (just `fs`)         |

**When to use:**
- Simple config/settings
- Small datasets (under a few MB)
- No desire for a real database yet

**Code:**
```js
const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, 'data.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Usage
let items = readData();
items.push({ id: Date.now(), name: 'New item' });
writeData(items);
```

#### SQLite

**What it is:** A full SQL database in a single file. No separate server process.

| Property          | Value                    |
|-------------------|--------------------------|
| Persistence       | Survives restarts         |
| Speed             | Fast (indexed, queries don't read entire file) |
| Capacity          | Disk-limited (terabytes possible) |
| Setup             | `npm install better-sqlite3` |
| SQL support       | Full SQL (most features)  |

**When to use:**
- Production-ready for small-to-medium apps
- Single-server apps (no need for a separate DB server)
- Embedded / desktop apps

**Code:**
```js
const Database = require('better-sqlite3');
const db = new Database('app.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`);

// Create
const stmt = db.prepare('INSERT INTO items (name) VALUES (?)');
const result = stmt.run('Learn SQLite');
console.log(result.lastInsertRowid);

// Read all
const items = db.prepare('SELECT * FROM items').all();

// Read one
const item = db.prepare('SELECT * FROM items WHERE id = ?').get(1);

// Update
db.prepare('UPDATE items SET completed = ? WHERE id = ?').run(1, 1);

// Delete
db.prepare('DELETE FROM items WHERE id = ?').run(1);
```

---

### 2.3 Relational Databases (PostgreSQL, MySQL, MariaDB)

**What it is:** Databases that store data in tables with rows and columns, using SQL. Run as a separate server process.

| Property          | Value                    |
|-------------------|--------------------------|
| Persistence       | Survives restarts         |
| Speed             | Very fast with proper indexing |
| Capacity          | TBs (scales horizontally) |
| Setup             | Requires installing/running a DB server |
| Schema            | Strict (define tables and types upfront) |
| Relationships     | Native (JOINs, foreign keys) |

**When to use:**
- Any production app with structured data
- Apps with complex relationships (users, orders, products)
- Need ACID transactions (banking, e-commerce)

**Popular options:**

| Database    | Strengths                              |
|-------------|----------------------------------------|
| PostgreSQL  | Most features, JSON support, extensions (PostGIS) |
| MySQL       | Very fast reads, widely hosted (WordPress) |
| MariaDB     | MySQL fork, more open, same ecosystem  |

**Code (PostgreSQL with `pg`):**
```js
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: '...',
  host: 'localhost',
  database: 'myapp',
  port: 5432,
});

// Create
await pool.query('INSERT INTO items (name) VALUES ($1)', ['New item']);

// Read
const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [1]);

// Update
await pool.query('UPDATE items SET completed = $1 WHERE id = $2', [true, 1]);

// Delete
await pool.query('DELETE FROM items WHERE id = $1', [1]);
```

---

### 2.4 NoSQL Databases (MongoDB, Firebase Firestore, Redis)

#### MongoDB (Document Store)

**What it is:** Stores data as JSON-like documents (BSON). No strict schema.

| Property          | Value                    |
|-------------------|--------------------------|
| Schema            | Flexible (documents can differ) |
| Query language    | MongoDB Query Language (MQL) |
| Relationships     | Embedding or references (no JOINs) |
| Best for          | Rapid prototyping, unstructured data, JSON-heavy apps |

**Code:**
```js
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('myapp');
const items = db.collection('items');

// Create
await items.insertOne({ name: 'Learn MongoDB', completed: false });

// Read
const item = await items.findOne({ _id: ObjectId('...') });
const allItems = await items.find().toArray();

// Update
await items.updateOne({ _id: ObjectId('...') }, { $set: { completed: true } });

// Delete
await items.deleteOne({ _id: ObjectId('...') });
```

#### Firebase Firestore (Cloud Document Store)

**What it is:** Google's managed NoSQL database. Real-time sync, serverless.

| Property          | Value                    |
|-------------------|--------------------------|
| Hosting           | Fully managed (Google Cloud) |
| Real-time         | Built-in (websocket listeners) |
| Offline support   | Built-in                  |
| Auth integration  | Built-in (Firebase Auth)  |
| Pricing           | Pay per read/write/delete |

**Code (client-side):**
```js
import { db } from './firebase.js';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Create
await addDoc(collection(db, 'items'), { name: 'Learn Firestore', completed: false });

// Read all
const snapshot = await getDocs(collection(db, 'items'));
snapshot.forEach(doc => console.log(doc.id, doc.data()));

// Update
await updateDoc(doc(db, 'items', 'docId'), { completed: true });

// Delete
await deleteDoc(doc(db, 'items', 'docId'));
```

#### Redis (In-Memory Key-Value Store)

**What it is:** An in-memory data structure store, often used as a cache or session store.

| Property          | Value                    |
|-------------------|--------------------------|
| Persistence       | Optional (RDB/AOF snapshots) |
| Speed             | Sub-millisecond (all data in RAM) |
| Capacity          | RAM-limited               |
| Data types        | Strings, hashes, lists, sets, sorted sets |

**When to use:**
- Caching database queries
- Session storage
- Rate limiting
- Real-time leaderboards / pub/sub

**Code:**
```js
const Redis = require('ioredis');
const redis = new Redis();

// String
await redis.set('key', 'value');
const val = await redis.get('key');

// Hash (like an object)
await redis.hset('item:1', 'name', 'Learn Redis', 'completed', 'false');
const item = await redis.hgetall('item:1');

// List
await redis.lpush('items', 'item1');
const list = await redis.lrange('items', 0, -1);

// Set TTL (auto-expire after 60 seconds)
await redis.setex('session:123', 60, 'user_data');
```

---

### 2.5 Cloud / Managed Databases

Instead of installing and maintaining a database yourself, use a cloud provider:

| Service            | What It Is                  |
|--------------------|-----------------------------|
| Supabase           | Open-source Firebase alternative (PostgreSQL-based) |
| PlanetScale        | MySQL-compatible serverless  |
| MongoDB Atlas      | Hosted MongoDB               |
| AWS RDS            | Managed PostgreSQL, MySQL, MariaDB |
| Railway / Render   | Deploy + DB in one platform  |
| Vercel + Neon      | Serverless PostgreSQL        |

**Advantages:** No ops, auto-scaling, backups, monitoring.
**Disadvantages:** Vendor lock-in, cost at scale, internet dependency.

---

## 3. Hybrid / Advanced Patterns

### 3.1 Cache-Aside (Redis + Database)

```js
async function getUser(id) {
  // 1. Try cache
  const cached = await redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);

  // 2. Cache miss — fetch from database
  const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);

  // 3. Store in cache for next time
  await redis.setex(`user:${id}`, 3600, JSON.stringify(user));

  return user;
}
```

### 3.2 Offline-First (IndexedDB + Server Sync)

```
User action → Save to IndexedDB → Queue sync → Send to server when online
                                 → Show immediately (optimistic UI)
```

Libraries: `rxdb`, `PouchDB`, `Firebase Firestore` (built-in).

### 3.3 Static Site + Headless CMS

For content sites (blog, docs, portfolio):

```
CMS (Contentful, Sanity, Strapi) → API → Static Site Generator (Next.js, Astro)
                                         → Deploys static HTML to CDN
```

Data is stored in the CMS, pulled at build time, served as static files.

---

## 4. Decision Flowchart

```
Do you need the data to persist after page refresh?
├── NO  → In-memory JS variable (const/let)
└── YES →
    Does the data need to be available on multiple devices / users?
    ├── NO → Client-side
    │   ├── Small (<5MB), simple strings → localStorage
    │   ├── Temporary (tab-only)          → sessionStorage
    │   ├── Auto-sent with requests       → Cookies
    │   ├── Large / complex / offline     → IndexedDB
    │   └── Caching HTTP responses        → Cache API
    └── YES → Server-side
        ├── Prototype / tiny app          → In-memory → JSON file → SQLite
        ├── Structured data, relationships → PostgreSQL / MySQL
        ├── Flexible schema, rapid changes → MongoDB
        ├── Real-time sync                → Firebase Firestore / Supabase
        ├── Extreme speed (cache)         → Redis
        └── Zero ops / serverless         → Supabase / Neon / PlanetScale
```

---

## 5. Quick Reference Table

| Method            | Location   | Capacity    | Persists Restart? | Sync to Server? | Complexity |
|-------------------|------------|-------------|-------------------|-----------------|------------|
| JS Variable       | Client     | RAM         | No                | No              | 0          |
| localStorage      | Client     | 5-10 MB     | Yes               | No              | 1          |
| sessionStorage    | Client     | 5-10 MB     | No (tab closes)   | No              | 1          |
| Cookies           | Client     | 4 KB each   | Configurable      | Yes (auto)      | 2          |
| IndexedDB         | Client     | GBs         | Yes               | No (manual)     | 3          |
| Cache API         | Client     | Large       | Yes               | No (manual)     | 3          |
| In-Memory (server)| Server     | RAM         | No                | N/A             | 0          |
| JSON File         | Server     | Disk        | Yes               | N/A             | 1          |
| SQLite            | Server     | Disk        | Yes               | N/A             | 2          |
| PostgreSQL/MySQL  | Server     | Disk/TBs    | Yes               | N/A             | 3          |
| MongoDB           | Server     | Disk/TBs    | Yes               | N/A             | 3          |
| Firebase Firestore| Cloud      | Unlimited   | Yes               | N/A (is server) | 2          |
| Redis             | Server     | RAM         | Optional          | N/A             | 2          |

**Complexity scale:** 0 = zero setup, 1 = trivial, 2 = moderate, 3 = significant setup/ops

---

## How This Todo App Could Evolve

| Stage | Storage                          | Why                           |
|-------|----------------------------------|-------------------------------|
| 1     | In-memory (current)              | Learning / prototyping        |
| 2     | JSON file (`fs.writeFileSync`)   | Survives restarts, no new deps|
| 3     | SQLite (`better-sqlite3`)        | Proper queries, fast, reliable|
| 4     | PostgreSQL (Supabase/Neon)       | Production, multi-user, auth  |
| 5     | Add Redis cache                  | Speed under heavy load        |

---

*Last updated: June 2026*
