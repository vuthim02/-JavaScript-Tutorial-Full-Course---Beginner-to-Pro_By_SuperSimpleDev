# Module 24: Storage APIs

**Duration:** ~40 minutes  
**Additional Content:** Not covered in original video

## Learning Objectives

- Understand browser storage options
- Use localStorage for persistent storage
- Use sessionStorage for session-based storage
- Work with IndexedDB for complex data
- Implement storage best practices

## Storage Options Overview

| Feature | localStorage | sessionStorage | IndexedDB |
|---------|-------------|----------------|-----------|
| Capacity | ~5-10MB | ~5-10MB | Unlimited |
| Duration | Until cleared | Until tab closes | Until cleared |
| Scope | Same origin | Same origin + tab | Same origin |
| Storage | Strings only | Strings only | Any type |
| API | Simple | Simple | Complex |
| Async | No | No | Yes |

## localStorage

Persistent storage that survives browser restarts.

### Basic Operations

```javascript
// Store data
localStorage.setItem('username', 'John');
localStorage.setItem('age', '30');  // Always stored as string

// Retrieve data
const username = localStorage.getItem('username');
console.log(username);  // 'John'

// Remove item
localStorage.removeItem('username');

// Clear all
localStorage.clear();

// Get storage length
console.log(localStorage.length);

// Get key by index
console.log(localStorage.key(0));
```

### Storing Objects

```javascript
const user = {
  name: 'John',
  age: 30,
  preferences: { theme: 'dark', language: 'en' }
};

// Must stringify objects
localStorage.setItem('user', JSON.stringify(user));

// Parse when retrieving
const stored = localStorage.getItem('user');
const parsedUser = JSON.parse(stored);
console.log(parsedUser.name);  // 'John'
```

### Storing Arrays

```javascript
let cart = [
  { id: 1, name: 'Laptop', quantity: 1 },
  { id: 2, name: 'Mouse', quantity: 2 }
];

// Save
localStorage.setItem('cart', JSON.stringify(cart));

// Load
const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
```

### Storage Events

```javascript
// Listen for storage changes (in other tabs/windows)
window.addEventListener('storage', (event) => {
  console.log('Key changed:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
  console.log('URL:', event.url);
});
```

### Utility Wrapper

```javascript
const Storage = {
  set(key, value, expiry = null) {
    const item = {
      value: value,
      expiry: expiry ? Date.now() + expiry : null
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      
      const parsed = JSON.parse(item);
      
      // Check expiry
      if (parsed.expiry && Date.now() > parsed.expiry) {
        localStorage.removeItem(key);
        return defaultValue;
      }
      
      return parsed.value;
    } catch {
      return defaultValue;
    }
  },
  
  remove(key) {
    localStorage.removeItem(key);
  },
  
  clear() {
    localStorage.clear();
  }
};

// Usage with expiry (1 hour)
Storage.set('token', 'abc123', 60 * 60 * 1000);
const token = Storage.get('token');
```

## sessionStorage

Temporary storage cleared when the tab closes.

```javascript
// Same API as localStorage
sessionStorage.setItem('currentTab', 'home');
const tab = sessionStorage.getItem('currentTab');

// Useful for:
// - Form data preservation during session
// - Temporary state
// - Single-page app navigation state
```

### Multi-Tab Isolation

```javascript
// Each tab has its own sessionStorage
// Tab 1:
sessionStorage.setItem('user', 'Alice');

// Tab 2:
sessionStorage.getItem('user');  // null (different session)
```

## IndexedDB

Advanced client-side database for complex data.

### Opening a Database

```javascript
const request = indexedDB.open('MyDatabase', 1);

request.onerror = (event) => {
  console.error('Database error:', event.target.error);
};

request.onsuccess = (event) => {
  const db = event.target.result;
  console.log('Database opened successfully');
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  
  // Create object store (like a table)
  const store = db.createObjectStore('users', { keyPath: 'id' });
  
  // Create indexes
  store.createIndex('email', 'email', { unique: true });
  store.createIndex('name', 'name', { unique: false });
};
```

### CRUD Operations

```javascript
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MyDatabase', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

// CREATE - Add user
async function addUser(user) {
  const db = await openDatabase();
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  
  return new Promise((resolve, reject) => {
    const request = store.add(user);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// READ - Get user by ID
async function getUser(id) {
  const db = await openDatabase();
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  
  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// UPDATE - Modify user
async function updateUser(user) {
  const db = await openDatabase();
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  
  return new Promise((resolve, reject) => {
    const request = store.put(user);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// DELETE - Remove user
async function deleteUser(id) {
  const db = await openDatabase();
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// GET ALL - Get all users
async function getAllUsers() {
  const db = await openDatabase();
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
```

### Using Indexes

```javascript
async function getUserByEmail(email) {
  const db = await openDatabase();
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  const index = store.index('email');
  
  return new Promise((resolve, reject) => {
    const request = index.get(email);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Get users with cursor (for large datasets)
async function getUsersByName(start, end) {
  const db = await openDatabase();
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  const index = store.index('name');
  const range = IDBKeyRange.bound(start, end);
  
  return new Promise((resolve, reject) => {
    const users = [];
    const request = index.openCursor(range);
    
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        users.push(cursor.value);
        cursor.continue();
      } else {
        resolve(users);
      }
    };
    
    request.onerror = () => reject(request.error);
  });
}
```

## Best Practices

### Data Validation

```javascript
// Always validate before storing
function safeSetItem(key, value) {
  try {
    const serialized = JSON.stringify(value);
    
    // Check size (localStorage limit is ~5MB)
    if (serialized.length > 5 * 1024 * 1024) {
      throw new Error('Data too large for localStorage');
    }
    
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
}
```

### Error Handling

```javascript
function getStorageItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from storage:', error);
    return defaultValue;
  }
}

// Handle quota exceeded
function setWithQuotaCheck(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded');
      // Try to free space
      clearOldStorage();
      // Retry
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    }
    throw error;
  }
}
```

### Storage Cleanup

```javascript
function clearOldStorage() {
  const now = Date.now();
  
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    
    try {
      const item = JSON.parse(localStorage.getItem(key));
      
      // Remove expired items
      if (item && item.expiry && now > item.expiry) {
        localStorage.removeItem(key);
      }
    } catch {
      // Remove invalid JSON
      localStorage.removeItem(key);
    }
  }
}
```

## Practice Exercises

### Exercise 24.1: User Preferences Manager
Create a system to save and load user preferences (theme, language, etc.).

### Exercise 24.2: Shopping Cart with Persistence
Implement a shopping cart that persists across page refreshes.

### Exercise 24.3: Form Auto-Save
Auto-save form data as user types, restore on page load.

### Exercise 24.4: Offline Data Sync
Implement a simple offline-first data storage system.

## Summary

- localStorage: persistent, ~5MB, string only
- sessionStorage: tab-specific, cleared on close
- IndexedDB: async, large capacity, complex queries
- Always JSON.stringify objects before storing
- Always JSON.parse when retrieving
- Handle errors and quota limits
- Validate data before storage

## Previous

[Proceed to Module 23](../23-json-in-depth/README.md)

## Next Steps

[Proceed to Module 25](../25-error-handling/README.md): Error Handling to learn about try-catch, custom errors, and debugging.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)
