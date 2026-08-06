# Database and ORM Concepts for JavaScript - Complete Research

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

## Table of Contents
- [PART 1: MongoDB](#part-1-mongodb)
- [PART 2: SQL Databases](#part-2-sql-databases)
- [PART 3: ORMs](#part-3-orms)
- [PART 4: Patterns](#part-4-patterns)
- [PART 5: NoSQL Alternatives](#part-5-nosql-alternatives)

---

## PART 1: MongoDB

### 1. MongoDB Basics: Documents, Collections, CRUD Operations

**What is MongoDB?**
MongoDB is a NoSQL document-oriented database that stores data in JSON-like documents (BSON format). Unlike relational databases, it allows flexible schemas and rich data structures.

**Core Concepts:**
- **Document**: A record in MongoDB, stored as a BSON (Binary JSON) object with key-value pairs
- **Collection**: A group of documents (similar to a table in SQL)
- **Database**: A container for collections
- **_id**: A unique identifier automatically generated for each document (ObjectId)

**Document Structure:**
```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Grace Hopper",
  "occupations": ["Computer Scientist", "Mathematician"],
  "location": {
    "city": "Arlington",
    "state": "Virginia"
  }
}
```

**CRUD Operations:**

| Operation | Method | Description |
|-----------|--------|-------------|
| Create | `insertOne()` | Insert a single document |
| Create | `insertMany()` | Insert multiple documents |
| Read | `find()` | Retrieve multiple documents |
| Read | `findOne()` | Retrieve a single document |
| Update | `updateOne()` | Update a single document |
| Update | `updateMany()` | Update multiple documents |
| Delete | `deleteOne()` | Delete a single document |
| Delete | `deleteMany()` | Delete multiple documents |

**Example CRUD Operations:**
```javascript
// Create
db.users.insertOne({ name: "Alice", age: 30, email: "alice@example.com" })
db.users.insertMany([
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 }
])

// Read
db.users.find({ age: { $gte: 30 } })
db.users.findOne({ _id: ObjectId("507f1f77bcf86cd799439011") })

// Update
db.users.updateOne({ name: "Alice" }, { $set: { age: 31 } })
db.users.updateMany({ age: { $lt: 30 } }, { $inc: { age: 1 } })

// Delete
db.users.deleteOne({ name: "Bob" })
db.users.deleteMany({ age: { $lt: 25 } })
```

**Query Operators:**
- Comparison: `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$nin`
- Logical: `$and`, `$or`, `$not`, `$nor`
- Element: `$exists`, `$type`
- Array: `$all`, `$elemMatch`, `$size`

---

### 2. MongoDB with Node.js: Mongoose ODM, Schema Definition, Validation

**What is Mongoose?**
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides schema-based modeling with built-in validation, type casting, and business logic hooks.

**Installation:**
```bash
npm install mongoose
```

**Connecting to MongoDB:**
```javascript
const mongoose = require('mongoose');

// Local connection
mongoose.connect('mongodb://127.0.0.1:27017/myapp');

// Atlas connection
mongoose.connect('mongodb+srv://user:pass@cluster.mongodb.net/myapp');

// With options
mongoose.connect(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
});
```

**Schema Definition:**
```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },
  age: {
    type: Number,
    min: 18,
    max: 120
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt
});
```

**Built-in Validators:**
- `required`: Field must be present
- `unique`: Creates unique index
- `min` / `max`: For numbers and dates
- `minlength` / `maxlength`: For strings
- `enum`:限定 to specific values
- `match`: Regex pattern matching

**Custom Validators:**
```javascript
const phoneSchema = new Schema({
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
});
```

---

### 3. Mongoose: Models, Queries, Middleware, Population, Virtuals, Methods

**Creating Models:**
```javascript
const User = mongoose.model('User', userSchema);

// The first argument 'User' becomes the collection name (lowercased: 'users')
```

**Query Methods:**
```javascript
// Finding
const users = await User.find({ role: 'admin' });
const user = await User.findById(userId);
const user = await User.findOne({ email: 'alice@example.com' });

// Chaining
const users = await User
  .find({ age: { $gte: 18 } })
  .sort({ name: 1 })
  .limit(10)
  .select('name email');

// Updating
await User.findByIdAndUpdate(id, { $set: { name: 'New Name' } }, { new: true });
await User.updateMany({ role: 'user' }, { $inc: { loginCount: 1 } });

// Deleting
await User.findByIdAndDelete(id);
await User.deleteMany({ inactive: true });

// Aggregation
const stats = await User.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $group: { _id: '$role', count: { $sum: 1 } } }
]);
```

**Middleware (Hooks):**
```javascript
// Pre-save middleware
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Post-save middleware
userSchema.post('save', function(doc) {
  console.log(`User ${doc.name} was saved`);
});

// Query middleware
userSchema.pre('find', function() {
  this.where({ deleted: false });
});
```

**Virtual Properties:**
```javascript
// Virtual getter
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual setter
userSchema.virtual('fullName').set(function(name) {
  const parts = name.split(' ');
  this.firstName = parts[0];
  this.lastName = parts.slice(1).join(' ');
});

// Include virtuals in JSON
userSchema.set('toJSON', { virtuals: true });
```

**Instance Methods:**
```javascript
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getPublicProfile = function() {
  const { password, __v, ...publicData } = this.toObject();
  return publicData;
};

// Static methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};
```

**Population (References):**
```javascript
const authorSchema = new Schema({ name: String });
const Author = mongoose.model('Author', authorSchema);

const postSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'Author' }
});
const Post = mongoose.model('Post', postSchema);

// Populate
const posts = await Post.find().populate('author');
// posts[0].author is now a full Author document
```

---

### 4. MongoDB Atlas: Cloud Database, Connection Strings

**What is MongoDB Atlas?**
MongoDB Atlas is a fully managed cloud database service that handles deployment, scaling, and maintenance of MongoDB deployments.

**Key Features:**
- Free tier available (512MB)
- Automatic backups and point-in-time recovery
- Built-in security (encryption, access control)
- Horizontal scaling with sharding
- Global distribution with multi-region clusters

**Connection String Formats:**

**SRV Format (Recommended):**
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```

**Standard Format:**
```
mongodb://<username>:<password>@<host1>,<host2>,<host3>/<dbname>?replicaSet=<replSetName>
```

**Connecting from Node.js:**
```javascript
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  maxPoolSize: 20,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000
});

async function connectDB() {
  await client.connect();
  return client.db('myapp');
}
```

**Using Mongoose with Atlas:**
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Connection error:', err));
```

**Best Practices:**
- Use environment variables for connection strings
- Implement connection pooling (10-20 connections for most workloads)
- Handle connection errors gracefully
- Use `retryWrites=true` for automatic retry on transient errors
- Set appropriate timeouts

---

### 5. Aggregation Pipeline

**What is Aggregation Pipeline?**
A framework for data transformation and analysis directly in the database. Documents pass through multiple stages, each performing an operation.

**Basic Syntax:**
```javascript
db.collection.aggregate([
  { $stage1 },
  { $stage2 },
  ...
], { options })
```

**Common Stages:**

| Stage | Description | Example |
|-------|-------------|---------|
| `$match` | Filter documents | `{ $match: { status: "active" } }` |
| `$group` | Group by field | `{ $group: { _id: "$category", total: { $sum: "$amount" } } }` |
| `$sort` | Sort results | `{ $sort: { total: -1 } }` |
| `$project` | Reshape documents | `{ $project: { name: 1, total: 1 } }` |
| `$limit` | Limit results | `{ $limit: 10 }` |
| `$unwind` | Flatten arrays | `{ $unwind: "$items" }` |
| `$lookup` | Join collections | `{ $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "orders" } }` |
| `$addFields` | Add new fields | `{ $addFields: { fullName: { $concat: ["$first", " ", "$last"] } } }` |
| `$count` | Count documents | `{ $count: "total" }` |
| `$facet` | Multiple pipelines | `{ $facet: { byCategory: [...], byStatus: [...] } }` |

**Practical Example: Sales Report**
```javascript
db.orders.aggregate([
  // Filter to completed orders in last 30 days
  { $match: {
    status: "completed",
    createdAt: { $gte: new Date(Date.now() - 30*24*60*60*1000) }
  }},
  // Unwind items array
  { $unwind: "$items" },
  // Calculate revenue per item
  { $addFields: {
    revenue: { $multiply: ["$items.quantity", "$items.price"] }
  }},
  // Group by category
  { $group: {
    _id: "$items.category",
    totalRevenue: { $sum: "$revenue" },
    orderCount: { $sum: 1 }
  }},
  // Sort by revenue descending
  { $sort: { totalRevenue: -1 } },
  // Limit to top 5
  { $limit: 5 }
]);
```

**Performance Tips:**
- Place `$match` early to reduce documents processed
- Use indexes on `$match` and `$sort` fields
- Avoid `$unwind` on large arrays when possible
- Use `$project` to reduce document size early

---

### 6. Indexes and Performance

**What are Indexes?**
Indexes are data structures that improve query performance by allowing MongoDB to locate documents without scanning the entire collection.

**Types of Indexes:**

| Type | Description | Use Case |
|------|-------------|----------|
| Single Field | Index on one field | `{ email: 1 }` |
| Compound | Index on multiple fields | `{ lastName: 1, firstName: 1 }` |
| Unique | Ensures uniqueness | `{ email: 1, unique: true }` |
| TTL | Auto-deletes after time | Session expiration |
| Text | Full-text search | `{ name: "text", bio: "text" }` |
| Geospatial | Location-based queries | `{ location: "2dsphere" }` |
| Hashed | Even distribution | Sharding key |

**Creating Indexes:**
```javascript
// Single field
db.users.createIndex({ email: 1 })

// Compound index
db.users.createIndex({ lastName: 1, firstName: 1 })

// Unique index
db.users.createIndex({ email: 1 }, { unique: true })

// TTL index (expire after 3600 seconds)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })

// Text index
db.articles.createIndex({ title: "text", content: "text" })
```

**With Mongoose:**
```javascript
const userSchema = new Schema({
  email: { type: String, required: true },
  name: String
});

// Create index
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ name: 'text' });

// Compound index
userSchema.index({ lastName: 1, firstName: 1 });
```

**Query Performance with `explain()`:**
```javascript
db.users.find({ email: "alice@example.com" }).explain("executionStats")
```

**Key Metrics:**
- `IXSCAN`: Index scan (good)
- `COLLSCAN`: Collection scan (bad - needs index)
- `totalDocsExamined`: Should be close to `nReturned`

**Performance Best Practices:**
1. Index fields used in queries and sorts
2. Use compound indexes for multi-field queries
3. Use covered queries (all fields in index)
4. Avoid over-indexing (slows writes)
5. Use `lean()` for read-only queries
6. Implement connection pooling (10-20 connections)

---

### 7. Transactions

**What are Transactions?**
Transactions ensure that a group of operations either all succeed or all fail, maintaining data consistency (ACID properties).

**ACID Properties:**
- **Atomicity**: All operations complete or none do
- **Consistency**: Data remains valid after transaction
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data persists

**MongoDB Transactions (v4.0+):**
- Single-document operations are always atomic
- Multi-document transactions require replica set or sharded cluster
- Transactions have performance overhead - use judiciously

**Transaction Example with Mongoose:**
```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  const sender = await User.findById(senderId).session(session);
  const receiver = await User.findById(receiverId).session(session);

  if (!sender || !receiver) throw new Error('User not found');
  if (sender.balance < amount) throw new Error('Insufficient funds');

  sender.balance -= amount;
  receiver.balance += amount;

  await sender.save({ session });
  await receiver.save({ session });

  await session.commitTransaction();
  console.log('Transaction committed');
} catch (error) {
  await session.abortTransaction();
  console.error('Transaction aborted:', error);
} finally {
  session.endSession();
}
```

**Transaction Options:**
```javascript
session.startTransaction({
  readConcern: { level: 'snapshot' },
  writeConcern: { w: 'majority' },
  maxCommitTimeMS: 5000
});
```

**Key Considerations:**
- Use sessions and pass to each operation
- Keep transactions short
- Handle errors and abort when needed
- Transactions add overhead - use only when needed
- Use read/write concerns for consistency guarantees

---

## PART 2: SQL Databases

### 8. PostgreSQL Basics: Tables, Rows, SQL Queries

**What is PostgreSQL?**
PostgreSQL is an advanced, open-source relational database management system (RDBMS) that supports both SQL and JSON queries.

**Core Concepts:**
- **Table**: Structure with columns and rows (like a spreadsheet)
- **Row**: A single record in a table
- **Column**: A field with a specific data type
- **Primary Key**: Unique identifier for each row
- **Foreign Key**: References primary key in another table

**Data Types:**
- Numeric: `INTEGER`, `SERIAL`, `BIGINT`, `NUMERIC`, `REAL`
- Text: `VARCHAR(n)`, `TEXT`, `CHAR(n)`
- Date/Time: `DATE`, `TIME`, `TIMESTAMP`, `INTERVAL`
- Boolean: `BOOLEAN`
- JSON: `JSON`, `JSONB`
- Array: `ARRAY`

**Basic SQL Operations:**

```sql
-- Create table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INTEGER CHECK (age >= 18),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert
INSERT INTO users (name, email, age) 
VALUES ('Alice', 'alice@example.com', 30);

INSERT INTO users (name, email, age) VALUES
  ('Bob', 'bob@example.com', 25),
  ('Charlie', 'charlie@example.com', 35);

-- Select
SELECT * FROM users;
SELECT name, email FROM users WHERE age >= 30;
SELECT * FROM users ORDER BY name ASC;
SELECT * FROM users LIMIT 10 OFFSET 20;

-- Update
UPDATE users SET age = 31 WHERE email = 'alice@example.com';

-- Delete
DELETE FROM users WHERE email = 'bob@example.com';
```

**Advanced Queries:**
```sql
-- Joins
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- Aggregation
SELECT role, COUNT(*) as count, AVG(age) as avg_age
FROM users
GROUP BY role
HAVING COUNT(*) > 5;

-- Subqueries
SELECT * FROM users 
WHERE age > (SELECT AVG(age) FROM users);

-- Window functions
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) as rank
FROM employees;
```

**Node.js Connection:**
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myapp',
  password: 'password',
  port: 5432,
  max: 20
});

const result = await pool.query('SELECT * FROM users');
```

---

### 9. MySQL Basics

**What is MySQL?**
MySQL is the world's most popular open-source relational database, known for reliability and performance.

**Key Differences from PostgreSQL:**
- MySQL is simpler, faster for read-heavy workloads
- PostgreSQL has more advanced features (JSONB, arrays, CTEs)
- MySQL uses `AUTO_INCREMENT`, PostgreSQL uses `SERIAL`
- MySQL has stricter SQL mode options

**Basic Operations:**
```sql
-- Create table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');

-- Select
SELECT * FROM users WHERE name LIKE '%li%';

-- Update
UPDATE users SET name = 'Alicia' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;
```

**Node.js Connection (mysql2):**
```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'myapp',
  password: 'password',
  waitForConnections: true,
  connectionLimit: 10
});

const [rows] = await pool.query('SELECT * FROM users');
```

---

### 10. SQLite for Development

**What is SQLite?**
SQLite is a lightweight, serverless, self-contained SQL database engine. Perfect for development, testing, and mobile applications.

**Advantages:**
- No server required (file-based)
- Zero configuration
- Single file database
- Great for testing and prototyping
- Used in mobile apps (iOS, Android)

**Basic Operations:**
```sql
-- SQLite uses .db files
-- No explicit CREATE DATABASE needed

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- SQLite-specific features
INSERT OR REPLACE INTO users (id, name, email)
VALUES (1, 'Alice', 'alice@example.com');

-- Date functions
SELECT datetime('now');
```

**Node.js Connection (better-sqlite3):**
```javascript
const Database = require('better-sqlite3');
const db = new Database('myapp.db');

// Synchronous operations
const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
const user = stmt.get(userId);

// Insert
db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
  .run('Alice', 'alice@example.com');

// Transaction
const insertMany = db.transaction((users) => {
  for (const user of users) {
    db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
      .run(user.name, user.email);
  }
});
```

**Use Cases:**
- Local development
- Testing (in-memory with `:memory:`)
- Mobile applications
- Desktop apps
- Embedded systems
- Prototyping

---

## PART 3: ORMs

### 11. Prisma: Schema, Migrations, Client API, Relations, Queries, Transactions

**What is Prisma?**
Prisma is a next-generation ORM for Node.js and TypeScript. It consists of Prisma Client (query builder), Prisma Migrate (migrations), and Prisma Studio (GUI).

**Schema Definition:**
```prisma
// schema.prisma
generator client {
  provider = "prisma-client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

**Relations:**
```prisma
// One-to-Many
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])
  authorId Int
}

// Many-to-Many
model Post {
  id         Int        @id @default(autoincrement())
  categories Category[] @relation("PostCategories")
}

model Category {
  id    Int    @id @default(autoincrement())
  posts Post[] @relation("PostCategories")
}
```

**Client API:**
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create
const user = await prisma.user.create({
  data: { email: 'alice@example.com', name: 'Alice' }
});

// Read
const users = await prisma.user.findMany({
  where: { email: { contains: '@example.com' } },
  include: { posts: true },
  orderBy: { createdAt: 'desc' },
  take: 10
});

// Update
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Alicia' }
});

// Delete
await prisma.user.delete({ where: { id: 1 } });
```

**Advanced Queries:**
```typescript
// Filtering
const filtered = await prisma.user.findMany({
  where: {
    AND: [
      { age: { gte: 18 } },
      { role: 'ADMIN' }
    ]
  }
});

// Aggregation
const stats = await prisma.user.aggregate({
  _avg: { age: true },
  _count: true,
  where: { role: 'USER' }
});

// Raw SQL
const result = await prisma.$queryRaw`
  SELECT * FROM users WHERE age > ${minAge}
`;
```

**Migrations:**
```bash
# Create migration
npx prisma migrate dev --name init

# Apply to production
npx prisma migrate deploy

# Reset dev database
npx prisma migrate reset

# Generate client
npx prisma generate

# Open Prisma Studio
npx prisma studio
```

**Transactions:**
```typescript
// Interactive transaction
const result = await prisma.$transaction(async (tx) => {
  const sender = await tx.user.findUnique({ where: { id: senderId } });
  const receiver = await tx.user.findUnique({ where: { id: receiverId } });

  await tx.user.update({
    where: { id: senderId },
    data: { balance: { decrement: amount } }
  });

  await tx.user.update({
    where: { id: receiverId },
    data: { balance: { increment: amount } }
  });

  return { success: true };
});

// Batch transaction
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: userData }),
  prisma.post.create({ data: postData })
]);
```

---

### 12. Drizzle ORM: Schema, Queries, Type-Safe

**What is Drizzle ORM?**
Drizzle is a lightweight TypeScript-first ORM with zero runtime dependencies. It's SQL-first and provides full type safety without code generation.

**Installation:**
```bash
# PostgreSQL
npm install drizzle-orm postgres
npm install -D drizzle-kit

# MySQL
npm install drizzle-orm mysql2
npm install -D drizzle-kit

# SQLite
npm install drizzle-orm better-sqlite3
npm install -D drizzle-kit
```

**Schema Definition:**
```typescript
import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  age: integer('age'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow()
});
```

**Relations:**
```typescript
import { relations } from 'drizzle-orm';

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] })
}));
```

**Query Builder:**
```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

// Select
const allUsers = await db.select().from(users);
const filtered = await db.select().from(users).where(eq(users.age, 30));

// Insert
await db.insert(users).values({ name: 'Alice', email: 'alice@example.com' });

// Update
await db.update(users).set({ name: 'Alicia' }).where(eq(users.id, 1));

// Delete
await db.delete(users).where(eq(users.id, 1));

// Joins
const result = await db
  .select()
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId));
```

**Relational Query API:**
```typescript
const result = await db.query.users.findMany({
  with: {
    posts: {
      where: eq(posts.published, true),
      limit: 5
    }
  }
});
```

**Key Advantages:**
- ~7.4kb minified+gzipped (vs Prisma's ~100MB)
- No code generation required
- SQL-like syntax
- Works in serverless environments
- Full TypeScript inference

---

### 13. TypeORM: Entities, Repositories, Migrations

**What is TypeORM?**
TypeORM is an ORM for TypeScript and JavaScript that supports multiple databases. It uses decorators and follows Active Record or Data Mapper patterns.

**Installation:**
```bash
npm install typeorm reflect-metadata
npm install -D @types/node typescript ts-node
```

**Entity Definition:**
```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, user => user.posts)
  author: User;
}
```

**Repository Pattern:**
```typescript
import { AppDataSource } from './data-source';
import { User } from './entity/User';

const userRepository = AppDataSource.getRepository(User);

// Create
const user = new User();
user.name = 'Alice';
user.email = 'alice@example.com';
await userRepository.save(user);

// Read
const users = await userRepository.find();
const user = await userRepository.findOneBy({ id: 1 });

// Update
user.name = 'Alicia';
await userRepository.save(user);

// Delete
await userRepository.remove(user);
```

**Query Builder:**
```typescript
const users = await userRepository
  .createQueryBuilder('user')
  .where('user.age > :age', { age: 18 })
  .leftJoinAndSelect('user.posts', 'posts')
  .orderBy('user.name', 'ASC')
  .getMany();
```

**Migrations:**
```typescript
// migration
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1234567890 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
      )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE user');
  }
}
```

---

### 14. Sequelize: Models, Associations, Queries

**What is Sequelize?**
Sequelize is a promise-based Node.js ORM for SQL databases. It supports PostgreSQL, MySQL, SQLite, and MS SQL Server.

**Installation:**
```bash
npm install sequelize pg pg-hstore
```

**Model Definition:**
```javascript
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      min: 18
    }
  }
}, {
  timestamps: true,
  paranoid: true  // Soft deletes
});
```

**Associations:**
```javascript
// One-to-Many
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

// Many-to-Many
User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });
```

**Queries:**
```javascript
// Create
const user = await User.create({ name: 'Alice', email: 'alice@example.com' });

// Read
const users = await User.findAll({
  where: { age: { [Op.gte]: 18 } },
  include: [{ model: Post, as: 'posts' }],
  order: [['name', 'ASC']],
  limit: 10
});

const user = await User.findByPk(1);

// Update
await User.update({ name: 'Alicia' }, { where: { id: 1 } });

// Delete
await User.destroy({ where: { id: 1 } });

// Aggregation
const stats = await User.findAll({
  attributes: [
    'role',
    [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
    [sequelize.fn('AVG', sequelize.col('age')), 'avgAge']
  ],
  group: ['role']
});
```

**Transactions:**
```javascript
const transaction = await sequelize.transaction();
try {
  await User.create({ name: 'Alice' }, { transaction });
  await Post.create({ title: 'Hello' }, { transaction });
  await transaction.commit();
} catch (error) {
  await transaction.rollback();
}
```

---

### 15. Knex.js: Query Builder, Migrations, Seeds

**What is Knex.js?**
Knex.js is a SQL query builder for Node.js that supports multiple databases. It's not an ORM but provides a flexible, chainable API for building queries.

**Installation:**
```bash
npm install knex pg
```

**Configuration:**
```javascript
// knexfile.js
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'password',
      database: 'myapp_dev'
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 }
  }
};
```

**Migrations:**
```javascript
// migrations/20240101_create_users.js
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.integer('age');
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
```

**Query Builder:**
```javascript
const knex = require('knex')(require('./knexfile').development);

// Select
const users = await knex('users')
  .select('id', 'name', 'email')
  .where('age', '>=', 18)
  .orderBy('name', 'asc')
  .limit(10);

// Insert
await knex('users').insert({ name: 'Alice', email: 'alice@example.com' });

// Update
await knex('users').where({ id: 1 }).update({ name: 'Alicia' });

// Delete
await knex('users').where({ id: 1 }).del();

// Joins
const posts = await knex('posts')
  .join('users', 'posts.user_id', 'users.id')
  .select('posts.*', 'users.name as author_name');

// Aggregation
const stats = await knex('users')
  .select('role')
  .count('id as count')
  .avg('age as avgAge')
  .groupBy('role');

// Transactions
await knex.transaction(async (trx) => {
  await trx('users').insert({ name: 'Alice' });
  await trx('posts').insert({ title: 'Hello', userId: 1 });
});
```

**Seeds:**
```javascript
// seeds/01_users.js
exports.seed = async function(knex) {
  await knex('users').del();
  await knex('users').insert([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
  ]);
};
```

**Commands:**
```bash
npx knex migrate:latest
npx knex migrate:rollback
npx knex seed:run
npx knex migrate:make create_users_table
```

---

### 16. Kysely: Type-Safe SQL Query Builder

**What is Kysely?**
Kysely is a TypeScript-first, type-safe SQL query builder. It's not an ORM but provides excellent type inference and SQL-like syntax.

**Installation:**
```bash
npm install kysely pg
npm install -D @types/pg
```

**Setup:**
```typescript
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

interface Database {
  users: {
    id: number;
    name: string;
    email: string;
    age: number;
    created_at: Date;
  };
  posts: {
    id: number;
    title: string;
    content: string;
    author_id: number;
    created_at: Date;
  };
}

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: 'localhost',
      database: 'myapp',
      user: 'postgres',
      password: 'password'
    })
  })
});
```

**Queries:**
```typescript
// Select - fully typed
const users = await db
  .selectFrom('users')
  .select(['id', 'name', 'email'])
  .where('age', '>=', 18)
  .orderBy('name', 'asc')
  .execute();

// Insert
await db.insertInto('users').values({
  name: 'Alice',
  email: 'alice@example.com',
  age: 30
}).execute();

// Update
await db.updateTable('users')
  .set({ name: 'Alicia' })
  .where('id', '=', 1)
  .execute();

// Delete
await db.deleteFrom('users')
  .where('id', '=', 1)
  .execute();

// Joins
const postsWithAuthors = await db
  .selectFrom('posts')
  .innerJoin('users', 'users.id', 'posts.author_id')
  .select([
    'posts.id',
    'posts.title',
    'users.name as author_name'
  ])
  .execute();

// Aggregation
const stats = await db
  .selectFrom('users')
  .select([
    'role',
    db.fn.count<number>('id').as('count'),
    db.fn.avg<number>('age').as('avg_age')
  ])
  .groupBy('role')
  .execute();

// Transactions
await db.transaction().execute(async (trx) => {
  await trx.insertInto('users').values({ name: 'Alice' }).execute();
  await trx.insertInto('posts').values({ title: 'Hello', author_id: 1 }).execute();
});
```

**Key Advantages:**
- Full TypeScript type inference
- No code generation
- SQL-like syntax
- Lightweight (~20KB)
- Excellent IntelliSense support

---

## PART 4: Patterns

### 17. Repository Pattern

**What is Repository Pattern?**
Repository Pattern provides an abstraction between business logic and data access layers. It makes database look like an in-memory collection.

**Benefits:**
- Decouples business logic from data access
- Centralizes query logic
- Improves testability (mock repositories)
- Supports multiple data sources

**Implementation:**
```typescript
// interfaces/user.repository.ts
interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: Partial<User>): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}

// repositories/user.repository.ts
class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: Partial<User>): Promise<User> {
    return this.prisma.user.create({ data });
  }

  // ... other methods
}

// Usage in service
class UserService {
  constructor(private userRepo: IUserRepository) {}

  async getUser(id: string) {
    return this.userRepo.findById(id);
  }
}
```

---

### 18. Unit of Work Pattern

**What is Unit of Work Pattern?**
Unit of Work maintains a list of objects affected by a business transaction and coordinates writing out changes in a single transaction.

**Benefits:**
- Atomic transactions (all or nothing)
- Reduces database roundtrips
- Coordinates multiple repositories
- Manages transaction lifecycle

**Implementation:**
```typescript
interface IUnitOfWork {
  execute<T>(fn: (repos: Repositories) => Promise<T>): Promise<T>;
}

class UnitOfWork implements IUnitOfWork {
  constructor(private db: PrismaClient) {}

  async execute<T>(fn: (repos: Repositories) => Promise<T>): Promise<T> {
    return this.db.$transaction(async (tx) => {
      const repos = {
        users: new UserRepository(tx),
        posts: new PostRepository(tx)
      };
      return fn(repos);
    });
  }
}

// Usage
const result = await unitOfWork.execute(async (repos) => {
  const user = await repos.users.create({ name: 'Alice' });
  const post = await repos.posts.create({ title: 'Hello', authorId: user.id });
  return { user, post };
});
```

---

### 19. Data Mapper vs Active Record

**Data Mapper:**
- Separates domain logic from persistence logic
- Entities are plain objects
- Mappers handle database operations
- More flexible, testable
- Used by: TypeORM, Prisma, Drizzle

```typescript
// Data Mapper
const user = new User('Alice', 'alice@example.com');
await userRepository.save(user);
const found = await userRepository.findById(1);
```

**Active Record:**
- Entities contain both data and persistence logic
- Models inherit from base class
- Simpler, less code
- Used by: Sequelize, Mongoose

```typescript
// Active Record
const user = new User();
user.name = 'Alice';
await user.save();
const found = await User.findById(1);
```

**Comparison:**

| Aspect | Data Mapper | Active Record |
|--------|-------------|---------------|
| Complexity | Higher | Lower |
| Testability | Better | Moderate |
| Flexibility | More flexible | Less flexible |
| Code | More boilerplate | Less code |
| Use Case | Complex domains | Simple CRUD |

---

### 20. Connection Pooling

**What is Connection Pooling?**
Connection pooling maintains a pool of reusable database connections to avoid the overhead of creating new connections for each request.

**Benefits:**
- Reduces connection overhead
- Limits maximum connections
- Improves performance
- Manages connection lifecycle

**Configuration:**
```javascript
// Node.js pg pool
const { Pool } = require('pg');
const pool = new Pool({
  max: 20,           // Maximum connections
  min: 5,            // Minimum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// MongoDB Mongoose
mongoose.connect(uri, {
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 30000
});

// Prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Connection pooling configured via URL params
  // ?connection_limit=20&pool_timeout=20
}
```

**Best Practices:**
- Set appropriate pool size (10-20 for most apps)
- Monitor connection usage
- Handle connection errors
- Close connections when done
- Use different pools for reads/writes

---

### 21. N+1 Problem and Solutions

**What is N+1 Problem?**
When querying a list of N items, then making N additional queries for related data, resulting in 1 + N queries.

**Example of N+1 Problem:**
```typescript
// Bad: 1 query for users + N queries for posts
const users = await User.find();  // 1 query
for (const user of users) {
  user.posts = await Post.find({ authorId: user.id });  // N queries
}
```

**Solutions:**

**1. Eager Loading (Include):**
```typescript
// Prisma
const users = await prisma.user.findMany({
  include: { posts: true }
});

// Mongoose
const users = await User.find().populate('posts');

// TypeORM
const users = await userRepository.find({ relations: ['posts'] });
```

**2. JOIN Queries:**
```typescript
// Knex
const users = await knex('users')
  .join('posts', 'users.id', 'posts.author_id')
  .select('users.*', 'posts.title');

// Raw SQL
const users = await db.query(`
  SELECT u.*, p.title 
  FROM users u 
  LEFT JOIN posts p ON u.id = p.author_id
`);
```

**3. DataLoader Pattern:**
```typescript
import DataLoader from 'dataloader';

const postLoader = new DataLoader(async (userIds) => {
  const posts = await Post.find({ authorId: { $in: userIds } });
  return userIds.map(id => posts.filter(p => p.authorId === id));
});

// Usage
const posts = await postLoader.load(userId);
```

**4. Batching:**
```typescript
// Prisma - automatic batching
const usersWithPosts = await prisma.user.findMany({
  include: { posts: true }
});
// Prisma automatically batches the queries
```

---

### 22. Database Migrations

**What are Migrations?**
Migrations are version control for database schema, allowing you to track and apply changes over time.

**Benefits:**
- Track schema changes
- Reproduce environments
- Rollback changes
- Team collaboration
- CI/CD integration

**Migration Tools by ORM:**

**Prisma Migrate:**
```bash
npx prisma migrate dev --name add_user_table
npx prisma migrate deploy
npx prisma migrate rollback
```

**Drizzle Kit:**
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
npx drizzle-kit push  # Push schema directly
npx drizzle-kit pull  # Introspect database
```

**Knex Migrations:**
```bash
npx knex migrate:make create_users_table
npx knex migrate:latest
npx knex migrate:rollback
```

**TypeORM Migrations:**
```bash
typeorm migration:generate -n UserTable
typeorm migration:run
typeorm migration:revert
```

**Best Practices:**
- Review generated SQL before applying
- Keep migrations small and focused
- Never edit applied migrations
- Use descriptive names
- Test migrations in development first
- Always have a rollback strategy

---

### 23. Seeding Data

**What is Data Seeding?**
Populating a database with initial data for development, testing, or production setup.

**Why Seed?**
- Development environment setup
- Test data generation
- Default configuration data
- Demo data for presentations

**Seeding with Prisma:**
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' }
    ]
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
```

```json
// package.json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

```bash
npx prisma db seed
```

**Seeding with Knex:**
```javascript
// seeds/01_users.js
exports.seed = async function(knex) {
  await knex('users').del();
  await knex('users').insert([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
  ]);
};
```

```bash
npx knex seed:run
```

**Using Faker for Test Data:**
```typescript
import { faker } from '@faker-js/faker';

const users = Array.from({ length: 100 }, () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  age: faker.number.int({ min: 18, max: 65 })
}));

await prisma.user.createMany({ data: users });
```

---

### 24. Database Testing

**Testing Strategies:**

**1. In-Memory Database:**
```typescript
// SQLite in-memory for testing
const testDb = new Database(':memory:');

// Or use Prisma with SQLite
datasource db {
  provider = "sqlite"
  url      = "file:./test.db"
}
```

**2. Test Containers:**
```typescript
import { PostgreSqlContainer } from '@testcontainers/postgresql';

const container = await new PostgreSqlContainer()
  .withDatabase('test')
  .withUsername('test')
  .withPassword('test')
  .start();

// Use container.getConnectionUri()
```

**3. Rollback After Tests:**
```typescript
describe('User Repository', () => {
  let db: PrismaClient;

  beforeEach(async () => {
    // Clear data before each test
    await db.post.deleteMany();
    await db.user.deleteMany();
  });

  it('should create a user', async () => {
    const user = await db.user.create({
      data: { name: 'Alice', email: 'alice@example.com' }
    });
    expect(user.name).toBe('Alice');
  });
});
```

**4. Mocking:**
```typescript
const mockRepository = {
  findById: jest.fn(),
  create: jest.fn()
};

const service = new UserService(mockRepository);

it('should return user', async () => {
  mockRepository.findById.mockResolvedValue({ id: 1, name: 'Alice' });
  const user = await service.getUser(1);
  expect(user.name).toBe('Alice');
});
```

**Best Practices:**
- Use isolated test databases
- Clean up after tests
- Test edge cases and errors
- Use fixtures for consistent data
- Test transactions and rollbacks
- Mock external dependencies

---

## PART 5: NoSQL Alternatives

### 25. Redis: Caching, Sessions, Pub/Sub

**What is Redis?**
Redis (Remote Dictionary Server) is an in-memory data structure store used as cache, message broker, and session store. It's 10-100x faster than disk-based databases.

**Data Types:**

| Type | Use Case | Commands |
|------|----------|----------|
| String | Cache, counters | GET, SET, INCR, EXPIRE |
| Hash | User profiles | HGET, HSET, HMGET |
| List | Queues, feeds | LPUSH, RPOP, LRANGE |
| Set | Tags, unique items | SADD, SMEMBERS, SINTER |
| Sorted Set | Leaderboards | ZADD, ZRANGE, ZREVRANK |
| Stream | Event logs | XADD, XREAD, XGROUP |

**Node.js Connection:**
```javascript
const redis = require('redis');
const client = redis.createClient();

client.on('error', err => console.log('Redis Client Error', err));
await client.connect();
```

**Caching:**
```javascript
// Cache middleware
const cacheMiddleware = async (req, res, next) => {
  const key = `user:${req.params.id}`;
  const cached = await client.get(key);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  // Store original send
  const originalSend = res.json.bind(res);
  res.json = (data) => {
    client.setEx(key, 3600, JSON.stringify(data)); // 1 hour TTL
    originalSend(data);
  };
  
  next();
};
```

**Sessions:**
```javascript
const session = require('express-session');
const RedisStore = require('connect-redis').default;

app.use(session({
  store: new RedisStore({ client }),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 86400000 }
}));
```

**Pub/Sub:**
```javascript
// Publisher
await client.publish('notifications', JSON.stringify({
  type: 'user_joined',
  userId: 123
}));

// Subscriber
const subscriber = client.duplicate();
await subscriber.subscribe('notifications', (message) => {
  console.log('Received:', JSON.parse(message));
});
```

**Best Practices:**
- Always set TTL for cached data
- Use key namespacing (`user:123:profile`)
- Enable persistence (RDB/AOF)
- Monitor memory usage
- Use connection pooling

---

### 26. Firebase/Firestore

**What is Firebase/Firestore?**
Firebase is Google's app development platform. Cloud Firestore is its NoSQL document database with real-time synchronization.

**Key Features:**
- Real-time data synchronization
- Offline support
- Automatic scaling
- Built-in authentication
- Cloud Functions integration

**Firestore Data Model:**
```javascript
// Collections contain documents
// Documents contain fields
{
  users: {
    "user123": {
      name: "Alice",
      email: "alice@example.com",
      posts: ["post1", "post2"]
    }
  }
}
```

**Node.js Usage:**
```javascript
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, getDoc, setDoc } = require('firebase/firestore');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add document
await setDoc(doc(db, 'users', 'user123'), {
  name: 'Alice',
  email: 'alice@example.com'
});

// Get document
const docSnap = await getDoc(doc(db, 'users', 'user123'));
if (docSnap.exists()) {
  console.log(docSnap.data());
}

// Query
const q = query(collection(db, 'users'), where('age', '>=', 18));
const snapshot = await getDocs(q);
```

**Real-time Listeners:**
```javascript
import { onSnapshot } from 'firebase/firestore';

const unsubscribe = onSnapshot(doc(db, 'users', 'user123'), (doc) => {
  console.log('Current data:', doc.data());
});

// Cleanup
unsubscribe();
```

**Use Cases:**
- Mobile apps with offline support
- Real-time chat applications
- Collaborative tools
- Small to medium web apps

---

### 27. Supabase: Postgres as a Service

**What is Supabase?**
Supabase is an open-source Firebase alternative built on PostgreSQL. It provides a complete backend with database, authentication, real-time subscriptions, and storage.

**Key Features:**
- Full PostgreSQL database
- Real-time subscriptions
- Built-in authentication
- Row Level Security (RLS)
- Auto-generated REST APIs
- Edge Functions
- Storage for files

**Getting Started:**
```bash
npm install @supabase/supabase-js
```

**Client Setup:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
);
```

**CRUD Operations:**
```typescript
// Insert
const { data, error } = await supabase
  .from('users')
  .insert({ name: 'Alice', email: 'alice@example.com' });

// Select
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('role', 'admin')
  .order('name');

// Update
const { data, error } = await supabase
  .from('users')
  .update({ name: 'Alicia' })
  .eq('id', 1);

// Delete
const { error } = await supabase
  .from('users')
  .delete()
  .eq('id', 1);
```

**Real-time Subscriptions:**
```typescript
const channel = supabase
  .channel('users-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'users' },
    (payload) => console.log('Change:', payload)
  )
  .subscribe();
```

**Row Level Security:**
```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);
```

**Advantages:**
- No backend code needed for basic apps
- PostgreSQL power with Firebase ease
- Free tier available
- Open source

---

### 28. PlanetScale: Serverless MySQL

**What is PlanetScale?**
PlanetScale is a serverless MySQL platform built on Vitess. It provides branching, non-blocking schema changes, and horizontal scaling.

**Key Features:**
- Serverless MySQL
- Database branching (like Git)
- Non-blocking schema changes
- Horizontal scaling with Vitess
- Connection pooling built-in
- GitHub integration

**Branching Workflow:**
```bash
# Create a branch for development
pscale branch create my-db add-users-table

# Make schema changes on branch
pscale shell my-db add-users-table
> CREATE TABLE users (...);

# Deploy to production
pscale deploy-request my-db add-users-table
```

**Node.js Connection:**
```typescript
import { connect } from '@planetscale/database';

const conn = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
});

// Query
const results = await conn.execute('SELECT * FROM users WHERE id = ?', [userId]);

// Insert
await conn.execute(
  'INSERT INTO users (name, email) VALUES (?, ?)',
  ['Alice', 'alice@example.com']
);
```

**Using with ORMs:**

**Prisma:**
```prisma
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}
```

**Drizzle:**
```typescript
import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

const connection = connect({ url: process.env.DATABASE_URL });
const db = drizzle(connection);
```

**Advantages:**
- Zero-downtime schema changes
- No connection limits
- Branch-based development
- Auto-scaling
- Free tier for small projects

---

## Summary

### Database Selection Guide

| Use Case | Recommended Database |
|----------|---------------------|
| Real-time apps | Firebase, Supabase |
| Complex queries | PostgreSQL |
| High-speed caching | Redis |
| Serverless/Edge | PlanetScale, Supabase |
| Document storage | MongoDB |
| Development/Testing | SQLite |
| Enterprise apps | PostgreSQL, MySQL |

### ORM Selection Guide

| ORM | Best For | Key Feature |
|-----|----------|-------------|
| Prisma | Type-safe TypeScript | Schema-first, migrations |
| Drizzle | Serverless, performance | SQL-first, lightweight |
| TypeORM | Enterprise, decorators | Active Record/Data Mapper |
| Sequelize | Traditional Node.js | Wide database support |
| Knex | Query building | Flexible, no abstraction |
| Kysely | Type-safe SQL | Full type inference |

### Key Patterns Summary

| Pattern | Purpose |
|---------|---------|
| Repository | Abstract data access |
| Unit of Work | Atomic transactions |
| Data Mapper | Separate domain from persistence |
| Active Record | Combine data and behavior |
| Connection Pool | Reuse connections |
| DataLoader | Batch and cache queries |
| Migration | Version control schema |
| Seeding | Populate test data |
