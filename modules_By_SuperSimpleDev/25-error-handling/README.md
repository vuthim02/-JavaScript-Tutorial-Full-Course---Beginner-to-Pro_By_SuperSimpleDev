# Module 25: Error Handling In Depth

**Duration:** ~35 minutes  
**Additional Content:** Not covered in original video

## Learning Objectives

- Understand JavaScript error types
- Use try-catch-finally effectively
- Create custom error classes
- Implement error boundaries
- Debug common JavaScript errors

## Error Types

### SyntaxError

```javascript
// Missing closing bracket
const obj = { name: 'John';

// Missing quote
const str = 'hello;

// Invalid syntax
if (x = 5) {}
```

### ReferenceError

```javascript
// Using undeclared variable
console.log(nonExistentVar);

// Typo in variable name
const userName = 'John';
console.log(userNmae);  // Typo!
```

### TypeError

```javascript
// Calling non-function
const obj = {};
obj.notAFunction();

// Accessing property of null
const nullValue = null;
console.log(nullValue.property);

// Wrong type operation
const str = 'hello';
str.push('world');  // Strings don't have push
```

### RangeError

```javascript
// Number out of range
const arr = new Array(-1);

// Too much recursion
function recurse() { recurse(); }
recurse();

// Invalid array index
const arr = [1, 2, 3];
arr.length = -1;
```

### URIError

```javascript
// Invalid URI
decodeURIComponent('%');
```

## try-catch-finally

### Basic Syntax

```javascript
try {
  // Code that might throw an error
  const data = JSON.parse('invalid json');
} catch (error) {
  // Handle the error
  console.error('Error:', error.message);
} finally {
  // Always runs (optional)
  console.log('Cleanup code');
}
```

### Multiple Catch Blocks

```javascript
try {
  const value = someOperation();
} catch (error) {
  if (error instanceof TypeError) {
    console.error('Type error:', error.message);
  } else if (error instanceof ReferenceError) {
    console.error('Reference error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

### Error Properties

```javascript
try {
  throw new Error('Something went wrong');
} catch (error) {
  console.log(error.name);      // 'Error'
  console.log(error.message);   // 'Something went wrong'
  console.log(error.stack);     // Stack trace
}
```

## Custom Error Classes

### Basic Custom Error

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateEmail(email) {
  if (!email.includes('@')) {
    throw new ValidationError('Invalid email', 'email');
  }
  return true;
}

try {
  validateEmail('invalid');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`${error.field}: ${error.message}`);
  }
}
```

### Error Hierarchy

```javascript
class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

class ValidationError extends AppError {
  constructor(message, field) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    this.field = field;
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`, 'NOT_FOUND');
    this.name = 'NotFoundError';
    this.resource = resource;
    this.id = id;
  }
}

class DatabaseError extends AppError {
  constructor(message, query) {
    super(message, 'DATABASE_ERROR');
    this.name = 'DatabaseError';
    this.query = query;
  }
}
```

## Throwing Errors

### Custom Throw

```javascript
function divide(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Arguments must be numbers');
  }
  
  if (b === 0) {
    throw new Error('Division by zero');
  }
  
  return a / b;
}
```

### Re-throwing Errors

```javascript
function processUser(user) {
  try {
    validateUser(user);
    saveUser(user);
  } catch (error) {
    console.error('Failed to process user:', error);
    throw error;  // Re-throw for caller to handle
  }
}
```

### Error Chaining

```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch data', { cause: error });
  }
}

try {
  await fetchData();
} catch (error) {
  console.log(error.message);      // 'Failed to fetch data'
  console.log(error.cause);        // Original fetch error
}
```

## Error Handling Patterns

### Result Pattern

```javascript
function divide(a, b) {
  if (b === 0) {
    return { success: false, error: 'Division by zero' };
  }
  return { success: true, result: a / b };
}

const result = divide(10, 0);
if (result.success) {
  console.log(result.result);
} else {
  console.error(result.error);
}
```

### Null Object Pattern

```javascript
class NullUser {
  get name() { return 'Guest'; }
  get isLoggedIn() { return false; }
  greet() { return 'Hello, guest!'; }
}

function getUser(id) {
  const user = database.findUser(id);
  return user || new NullUser();
}

const user = getUser(999);
console.log(user.greet());  // Works even if user not found
```

### Error Boundary (React-style)

```javascript
class ErrorBoundary {
  constructor(fallback) {
    this.fallback = fallback;
  }
  
  async execute(fn) {
    try {
      return await fn();
    } catch (error) {
      console.error('Error caught:', error);
      return this.fallback(error);
    }
  }
}

const boundary = new ErrorBoundary((error) => {
  return { error: error.message };
});

const result = await boundary.execute(() => {
  throw new Error('Something failed');
});

console.log(result);  // { error: 'Something failed' }
```

## Debugging Techniques

### console Methods

```javascript
console.log('Regular log');
console.warn('Warning');
console.error('Error');
console.info('Info');
console.debug('Debug');

// Grouping
console.group('User Data');
console.log('Name: John');
console.log('Age: 30');
console.groupEnd();

// Table
console.table([{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]);

// Timing
console.time('loop');
for (let i = 0; i < 1000000; i++) {}
console.timeEnd('loop');  // 'loop: 2.345ms'

// Stack trace
function a() { b(); }
function b() { c(); }
function c() { console.trace(); }
a();  // Shows call stack
```

### Debugging with debugger Keyword

```javascript
function problematicFunction() {
  const x = 10;
  debugger;  // Execution pauses here in browser dev tools
  const y = x * 2;
  return y;
}
```

### Error Logging Service

```javascript
class ErrorLogger {
  constructor() {
    this.errors = [];
    
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
      this.log({
        type: 'unhandled',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });
    
    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.log({
        type: 'unhandledrejection',
        reason: event.reason
      });
    });
  }
  
  log(error) {
    this.errors.push({
      ...error,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    
    // Send to server in production
    // this.sendToServer(error);
  }
  
  sendToServer(error) {
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(error)
    });
  }
}

const logger = new ErrorLogger();
```

## Practice Exercises

### Exercise 25.1: Input Validator
Create a validator that throws specific errors for different validation failures.

### Exercise 25.2: Retry Mechanism
Implement a function that retries failed operations with exponential backoff.

### Exercise 25.3: Error Aggregator
Build a system that collects and reports multiple errors.

## Summary

- Use try-catch for error handling
- Create custom error classes for specific cases
- Always clean up in finally block
- Log errors for debugging
- Use debugger keyword for breakpoints
- Implement error boundaries for robust apps

## Previous

[Proceed to Module 24](../24-storage-apis/README.md)

## Next Steps

[Proceed to Module 26](../26-modern-data-structures/README.md): Modern Data Structures to learn about Map, Set, WeakMap, and WeakSet.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)
