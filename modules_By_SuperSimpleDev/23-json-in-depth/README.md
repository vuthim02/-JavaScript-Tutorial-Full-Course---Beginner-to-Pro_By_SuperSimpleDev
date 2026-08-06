# Module 23: JSON In Depth

**Duration:** ~30 minutes  
**Additional Content:** Not covered in original video

## Learning Objectives

- Understand JSON format and its importance
- Parse JSON strings to JavaScript objects
- Convert JavaScript objects to JSON strings
- Handle JSON errors gracefully
- Work with complex JSON structures
- Use JSON for data storage and API communication

## What is JSON?

JSON (JavaScript Object Notation) is a lightweight data interchange format. It's:
- Human-readable
- Easy to parse and generate
- Language-independent (despite the name)
- The standard for API communication

```json
{
  "name": "John",
  "age": 30,
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "New York"
  },
  "hobbies": ["reading", "gaming", "coding"]
}
```

## JSON vs JavaScript Objects

### Key Differences

| Feature | JavaScript Object | JSON |
|---------|------------------|------|
| Keys | Unquoted or quoted | Must be quoted |
| Strings | Single or double quotes | Double quotes only |
| Values | Any type | String, number, boolean, null, array, object |
| Functions | Allowed | Not allowed |
| undefined | Allowed | Not allowed |
| Trailing commas | Allowed | Not allowed |

```javascript
// JavaScript Object (valid)
const jsObject = {
  name: 'John',           // Unquoted key
  'age': 30,              // Quoted key
  greet() {},             // Method
  undefined: undefined,   // Undefined value
};

// JSON (must follow strict rules)
const jsonString = '{"name": "John", "age": 30}';
```

## JSON Methods

### JSON.parse()

Converts JSON string to JavaScript object:

```javascript
const jsonString = '{"name": "John", "age": 30, "isActive": true}';
const user = JSON.parse(jsonString);

console.log(user.name);      // 'John'
console.log(user.age);       // 30
console.log(user.isActive);  // true
```

### JSON.stringify()

Converts JavaScript object to JSON string:

```javascript
const user = {
  name: 'John',
  age: 30,
  isActive: true
};

const jsonString = JSON.stringify(user);
console.log(jsonString);  // '{"name":"John","age":30,"isActive":true}'
```

### Pretty Printing

```javascript
const user = { name: 'John', age: 30, address: { city: 'NYC' } };

// Pretty print with 2-space indent
console.log(JSON.stringify(user, null, 2));

// Pretty print with 4-space indent
console.log(JSON.stringify(user, null, 4));

// Output:
// {
//   "name": "John",
//   "age": 30,
//   "address": {
//     "city": "NYC"
//   }
// }
```

## Handling Errors

### Try-Catch for Parsing

```javascript
const invalidJson = '{"name": "John",,}';

try {
  const obj = JSON.parse(invalidJson);
  console.log(obj);
} catch (error) {
  console.error('Invalid JSON:', error.message);
  // 'Invalid JSON: Unexpected token , in JSON at position 28'
}
```

### Safe JSON Parse

```javascript
function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON parse error:', error);
    return defaultValue;
  }
}

const data = safeJsonParse('invalid json', {});
console.log(data);  // {}

const validData = safeJsonParse('{"key": "value"}');
console.log(validData);  // { key: 'value' }
```

## Working with Complex JSON

### Nested Objects

```javascript
const company = {
  name: 'TechCorp',
  departments: {
    engineering: {
      employees: [
        { name: 'Alice', role: 'Developer' },
        { name: 'Bob', role: 'Designer' }
      ]
    },
    sales: {
      employees: [
        { name: 'Charlie', role: 'Sales Rep' }
      ]
    }
  }
};

const json = JSON.stringify(company, null, 2);
console.log(json);

// Parse back
const parsed = JSON.parse(json);
console.log(parsed.departments.engineering.employees[0].name);  // 'Alice'
```

### Arrays of Objects

```javascript
const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 699 },
  { id: 3, name: 'Tablet', price: 499 }
];

const jsonString = JSON.stringify(products);
console.log(jsonString);

const parsed = JSON.parse(jsonString);
console.log(parsed.filter(p => p.price > 600));
// [{ id: 1, name: 'Laptop', price: 999 }, { id: 2, name: 'Phone', price: 699 }]
```

## Custom Serialization

### Replacer Function

Control what gets serialized:

```javascript
const user = {
  name: 'John',
  age: 30,
  password: 'secret123',
  email: 'john@example.com'
};

// Exclude sensitive fields
const safeUser = JSON.stringify(user, (key, value) => {
  if (key === 'password') return undefined;  // Exclude
  return value;
});

console.log(safeUser);
// '{"name":"John","age":30,"email":"john@example.com"}'

// Or use array of allowed keys
const filtered = JSON.stringify(user, ['name', 'age', 'email']);
console.log(filtered);
```

### Reviver Function

Transform values during parsing:

```javascript
const jsonString = '{"name": "John", "birthDate": "2000-01-15T00:00:00.000Z"}';

const user = JSON.parse(jsonString, (key, value) => {
  if (key === 'birthDate') return new Date(value);
  return value;
});

console.log(user.birthDate instanceof Date);  // true
console.log(user.birthDate.getFullYear());    // 2000
```

### Transforming Data

```javascript
// Convert dates in an array
const events = [
  { name: 'Meeting', date: '2024-01-15' },
  { name: 'Conference', date: '2024-02-20' }
];

const jsonString = JSON.stringify(events);
const parsed = JSON.parse(jsonString, (key, value) => {
  if (key === 'date') return new Date(value);
  return value;
});

console.log(parsed[0].date instanceof Date);  // true
```

## Deep Cloning with JSON

```javascript
const original = {
  name: 'John',
  address: {
    city: 'NYC',
    coords: { lat: 40.7128, lng: -74.0060 }
  }
};

// Deep clone using JSON
const clone = JSON.parse(JSON.stringify(original));

clone.address.city = 'Boston';
console.log(original.address.city);  // 'NYC' (unchanged)
```

**Limitations:**
- Cannot clone functions
- Cannot clone undefined
- Cannot clone circular references
- Cannot clone Date objects (becomes string)

```javascript
const obj = {
  fn: () => {},
  date: new Date(),
  undef: undefined
};

const clone = JSON.parse(JSON.stringify(obj));
console.log(clone);  // { date: '2024-01-15T...' } - fn and undef missing
```

## localStorage with JSON

### Storing Objects

```javascript
const user = { name: 'John', age: 30, preferences: { theme: 'dark' } };

// Store
localStorage.setItem('user', JSON.stringify(user));

// Retrieve
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

// Save to localStorage
localStorage.setItem('cart', JSON.stringify(cart));

// Load from localStorage
const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(savedCart);
```

### Utility Functions

```javascript
const storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },
  
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage error:', error);
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

// Usage
storage.set('user', { name: 'John' });
const user = storage.get('user', {});
```

## API Communication

### Fetching JSON

```javascript
async function fetchUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users = await response.json();  // Automatically parses JSON
    return users;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
```

### Sending JSON

```javascript
async function createUser(userData) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  return await response.json();
}

// Usage
createUser({ name: 'John', email: 'john@example.com' });
```

### Handling API Responses

```javascript
async function apiRequest(url, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };
  
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }
  
  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Usage
const user = await apiRequest('/api/users', {
  method: 'POST',
  body: { name: 'John' }
});
```

## Practical Examples

### JSON Diff

```javascript
function jsonDiff(obj1, obj2) {
  const diff = {};
  
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      diff[key] = { old: obj1[key], new: obj2[key] };
    }
  }
  
  for (const key in obj2) {
    if (!(key in obj1)) {
      diff[key] = { old: undefined, new: obj2[key] };
    }
  }
  
  return diff;
}

const before = { name: 'John', age: 30, city: 'NYC' };
const after = { name: 'John', age: 31, email: 'john@example.com' };

console.log(jsonDiff(before, after));
// { age: { old: 30, new: 31 }, city: { old: 'NYC', new: undefined }, email: { old: undefined, new: 'john@example.com' } }
```

### JSON Flatten

```javascript
function flattenObject(obj, prefix = '') {
  const result = {};
  
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flattenObject(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }
  
  return result;
}

const nested = {
  name: 'John',
  address: {
    street: '123 Main St',
    city: 'NYC'
  }
};

console.log(flattenObject(nested));
// { name: 'John', 'address.street': '123 Main St', 'address.city': 'NYC' }
```

## Practice Exercises

### Exercise 23.1: JSON Validator
Create a function that validates if a string is valid JSON.

### Exercise 23.2: Deep Merge
Write a function that deeply merges two JSON objects.

### Exercise 23.3: JSON to CSV
Convert an array of objects to CSV format.

### Exercise 23.4: API Cache
Implement a simple API response cache using localStorage.

## Summary

- JSON is the standard format for data exchange
- `JSON.parse()` converts string to object
- `JSON.stringify()` converts object to string
- Use try-catch for error handling
- Reviver/s replacer functions customize serialization
- localStorage uses JSON for storing objects
- APIs send and receive JSON data
- Deep clone with `JSON.parse(JSON.stringify(obj))` (with limitations)

## Previous

[Proceed to Module 22](../22-date-time/README.md)

## Next Steps

[Proceed to Module 24](../24-storage-apis/README.md): Storage APIs to learn about localStorage, sessionStorage, and IndexedDB.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)
