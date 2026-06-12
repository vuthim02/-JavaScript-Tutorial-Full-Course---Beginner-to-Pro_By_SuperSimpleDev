/**
 * PART 15 — Database simulation: in-memory data store with query-like operations
 * Run with: node part15-database.js
 */

// ---------------------------------------------------------------
// 1. In-memory data store — simulates a simple database
// ---------------------------------------------------------------

class InMemoryStore {
  constructor() {
    this.tables = {};
  }

  // Create a table with schema definition
  createTable(tableName, schema) {
    this.tables[tableName] = {
      schema, // e.g., { id: 'number', name: 'string', age: 'number' }
      rows: [],
      autoIncrement: 1,
    };
    return this;
  }

  // INSERT — add a row
  insert(tableName, data) {
    const table = this.tables[tableName];
    if (!table) throw new Error(`Table "${tableName}" does not exist`);

    // Validate and auto-generate id
    const row = { id: table.autoIncrement++, ...data };
    table.rows.push(row);
    return row;
  }

  // SELECT * — return all rows
  selectAll(tableName) {
    const table = this.tables[tableName];
    if (!table) throw new Error(`Table "${tableName}" does not exist`);
    return [...table.rows]; // Return a copy (immutability)
  }

  // SELECT with WHERE clause
  selectWhere(tableName, predicate) {
    const table = this.tables[tableName];
    if (!table) throw new Error(`Table "${tableName}" does not exist`);
    return table.rows.filter(predicate);
  }

  // SELECT by id
  selectById(tableName, id) {
    const table = this.tables[tableName];
    if (!table) throw new Error(`Table "${tableName}" does not exist`);
    return table.rows.find(row => row.id === id) || null;
  }

  // UPDATE — update rows matching a predicate
  updateWhere(tableName, predicate, updates) {
    const table = this.tables[tableName];
    if (!table) throw new Error(`Table "${tableName}" does not exist`);

    const updated = [];
    table.rows.forEach(row => {
      if (predicate(row)) {
        Object.assign(row, updates);
        updated.push(row);
      }
    });
    return updated;
  }

  // DELETE — remove rows matching a predicate
  deleteWhere(tableName, predicate) {
    const table = this.tables[tableName];
    if (!table) throw new Error(`Table "${tableName}" does not exist`);

    const before = table.rows.length;
    table.rows = table.rows.filter(row => !predicate(row));
    return before - table.rows.length; // Number of deleted rows
  }

  // Aggregate — count
  count(tableName, predicate) {
    const table = this.tables[tableName];
    if (!table) throw new Error(`Table "${tableName}" does not exist`);
    if (!predicate) return table.rows.length;
    return table.rows.filter(predicate).length;
  }
}

// ---------------------------------------------------------------
// 2. Demo — using the in-memory store
// ---------------------------------------------------------------

const db = new InMemoryStore();

// Create tables
db.createTable('users', { id: 'number', name: 'string', age: 'number', role: 'string' });
db.createTable('products', { id: 'number', name: 'string', price: 'number', inStock: 'boolean' });

// Insert users
const alice = db.insert('users', { name: 'Alice', age: 30, role: 'admin' });
const bob = db.insert('users', { name: 'Bob', age: 25, role: 'user' });
const charlie = db.insert('users', { name: 'Charlie', age: 35, role: 'user' });
db.insert('users', { name: 'Diana', age: 28, role: 'moderator' });

// Insert products
db.insert('products', { name: 'Laptop', price: 1200, inStock: true });
db.insert('products', { name: 'Mouse', price: 25, inStock: true });
db.insert('products', { name: 'Keyboard', price: 80, inStock: false });

// Query: SELECT * FROM users
console.log('All users:');
console.log(' ', db.selectAll('users'));

// Query: SELECT * FROM users WHERE age > 28
console.log('Users with age > 28:');
console.log(' ', db.selectWhere('users', u => u.age > 28));

// Query: SELECT * FROM products WHERE inStock = true
console.log('Products in stock:');
console.log(' ', db.selectWhere('products', p => p.inStock));

// Query: SELECT by id
console.log('User id=2:', db.selectById('users', 2));

// Query: UPDATE users SET role='senior' WHERE age >= 30
const updated = db.updateWhere('users', u => u.age >= 30, { role: 'senior' });
console.log(`Updated ${updated.length} users to senior role`);

// Query: Count users by role
console.log('Senior count:', db.count('users', u => u.role === 'senior'));
console.log('Total users:', db.count('users'));

// Query: DELETE users WHERE age < 26
const deleted = db.deleteWhere('users', u => u.age < 26);
console.log(`Deleted ${deleted} user(s) under 26`);

// Final state
console.log('Remaining users:');
db.selectAll('users').forEach(u => console.log(' ', u));

// ---------------------------------------------------------------
// 3. Query simulation — simple query builder pattern
// ---------------------------------------------------------------

class QueryBuilder {
  constructor(store, tableName) {
    this.store = store;
    this.tableName = tableName;
    this.filters = [];
    this.sortField = null;
    this.sortAscending = true;
    this.limitCount = null;
  }

  where(predicate) {
    this.filters.push(predicate);
    return this;
  }

  orderBy(field, ascending = true) {
    this.sortField = field;
    this.sortAscending = ascending;
    return this;
  }

  limit(count) {
    this.limitCount = count;
    return this;
  }

  execute() {
    let results = this.store.selectAll(this.tableName);

    // Apply filters
    for (const filter of this.filters) {
      results = results.filter(filter);
    }

    // Apply sorting
    if (this.sortField) {
      results.sort((a, b) => {
        if (a[this.sortField] < b[this.sortField]) return this.sortAscending ? -1 : 1;
        if (a[this.sortField] > b[this.sortField]) return this.sortAscending ? 1 : -1;
        return 0;
      });
    }

    // Apply limit
    if (this.limitCount !== null) {
      results = results.slice(0, this.limitCount);
    }

    return results;
  }
}

// Usage of QueryBuilder
const query = new QueryBuilder(db, 'users')
  .where(u => u.age > 25)
  .orderBy('age', true)
  .limit(2);

console.log('Query builder result:');
console.log(' ', query.execute());
