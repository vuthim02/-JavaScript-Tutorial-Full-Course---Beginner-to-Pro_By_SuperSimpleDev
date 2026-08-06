# Error Handling and Debugging in JavaScript

## Complete Reference Guide

---

## Table of Contents

1. [JavaScript Error Types](#1-javascript-error-types)
2. [try/catch/finally](#2-trycatchfinally)
3. [throw Statement](#3-throw-statement)
4. [Creating Custom Error Classes](#4-creating-custom-error-classes)
5. [Error Properties](#5-error-properties)
6. [Error Propagation](#6-error-propagation)
7. [Uncaught Errors and Unhandled Rejections](#7-uncaught-errors-and-unhandled-rejections)
8. [Global Error Handlers](#8-global-error-handlers)
9. [Console Debugging Methods](#9-console-debugging-methods)
10. [debugger Statement](#10-debugger-statement)
11. [Browser DevTools](#11-browser-devtools)
12. [Breakpoints](#12-breakpoints)
13. [Call Stack Analysis](#13-call-stack-analysis)
14. [Source Maps](#14-source-maps)
15. [Error Boundary Patterns](#15-error-boundary-patterns)
16. [Assertion Patterns](#16-assertion-patterns)
17. [Logging Patterns and Best Practices](#17-logging-patterns-and-best-practices)
18. [Performance Profiling](#18-performance-profiling)
19. [Memory Profiling](#19-memory-profiling)
20. [Network Debugging](#20-network-debugging)
21. [Linting with ESLint](#21-linting-with-eslint)
22. [Common Error Patterns and Fixes](#22-common-error-patterns-and-fixes)
23. [Defensive Programming](#23-defensive-programming)
24. [Input Validation](#24-input-validation)
25. [Sanitization](#25-sanitization)

---

## 1. JavaScript Error Types

JavaScript has several built-in error classes that inherit from the base `Error` object. Each type represents a specific category of problem.

### Base Error Object

```javascript
// Every error in JavaScript is an object inheriting from Error
const err = new Error('Something went wrong');
console.log(err.name);    // "Error"
console.log(err.message); // "Something went wrong"
console.log(err.stack);   // Stack trace (string)
```

---

### 1.1 Error (Base Class)

The generic error type. Use when no specific error type applies.

```javascript
throw new Error('A general error occurred');
```

---

### 1.2 EvalError

Thrown when there is a problem with the `eval()` function. This is rarely encountered in modern JavaScript.

```javascript
// Thrown when eval() is used incorrectly
eval('alert("Hello)');  // SyntaxError (not EvalError in modern engines)

// EvalError is more of a legacy error type
// It was historically thrown when:
// - eval() is called recursively
// - eval is used as a variable name
// - eval() is assigned to a variable incorrectly
```

---

### 1.3 InternalError

Thrown when the engine encounters something it doesn't understand — a bug in the JavaScript engine itself. Non-standard but recognized by Firefox/SpiderMonkey.

```javascript
// Occurs with extremely deep recursion or very large switch statements
// Example: infinite recursion (if tail-call optimization not available)
function recurse() {
    return recurse(); // May throw InternalError: "too much recursion"
}
recurse();
```

---

### 1.4 RangeError

Thrown when a value is not in the allowed set or range of values.

```javascript
// Numeric range errors
Number.MAX_SAFE_INTEGER + 1; // May lose precision
(2).toFixed(100);            // RangeError: toFixed() digits out of range

// Array/String length errors
new Array(-1);               // RangeError: Invalid array length
[].length = -5;              // RangeError: Invalid array length

// String repeat
'x'.repeat(-1);              // RangeError: Invalid count value

// Function arguments
function greet(name) {
    if (typeof name !== 'string') {
        throw new RangeError('Name must be a string');
    }
}
```

---

### 1.5 ReferenceError

Thrown when trying to access a variable that has not been declared.

```javascript
// Variable not declared
console.log(x);       // ReferenceError: x is not defined

// Accessing before declaration (in temporal dead zone)
console.log(y);       // ReferenceError: Cannot access 'y' before initialization
const y = 10;

// Assigning to const
const z = 10;
z = 20;               // TypeError (not ReferenceError) in modern JS

// Deleting undeletable
delete Object.prototype; // ReferenceError
```

---

### 1.6 SyntaxError

Thrown when the JavaScript parser encounters code that violates the language syntax rules.

```javascript
// Invalid syntax
const obj = {{ a: 1 }};    // SyntaxError
function(                   // SyntaxError: Unexpected token
const = 5;                  // SyntaxError: Unexpected token '='
if (x {                     // SyntaxError: Missing parenthesis
JSON.parse('{"key": }');    // SyntaxError: Unexpected token
eval('var 123abc = 5');     // SyntaxError
```

---

### 1.7 TypeError

Thrown when an operation is performed on an incorrect or unexpected type of value.

```javascript
// Undefined/null property access
const obj = null;
obj.foo;                    // TypeError: Cannot read properties of null

// Calling non-function
const num = 42;
num();                      // TypeError: num is not a function

// Wrong type in operation
undefined + 5;              // NaN (not error)
null.toUpperCase();         // TypeError: Cannot read properties of null

// Using new on non-constructor
new 42;                     // TypeError: 42 is not a constructor

// Modifying immutable property
const str = "hello";
str.length = 10;            // TypeError (in strict mode)
```

---

### 1.8 URIError

Thrown when the `encodeURI()`, `decodeURI()`, `encodeURIComponent()`, or `decodeURIComponent()` functions receive invalid arguments.

```javascript
// Malformed URI
decodeURIComponent('%E0%A4%A'); // URIError: URI malformed
decodeURI('%%');                 // URIError: URI malformed
encodeURI('\uD800');            // URIError: URI malformed
```

---

### 1.9 AggregateError

Represents an error when multiple errors need to be bundled together. Commonly used with `Promise.any()`.

```javascript
// Creating an AggregateError manually
const errors = [
    new Error('First failure'),
    new Error('Second failure'),
    new Error('Third failure')
];
const aggregate = new AggregateError(errors, 'Multiple operations failed');
console.log(aggregate.message); // "Multiple operations failed"
console.logaggregate.errors);  // Array of 3 Error objects

// Promise.any() throws AggregateError when all promises reject
const promises = [
    Promise.reject(new Error('fail 1')),
    Promise.reject(new Error('fail 2')),
    Promise.reject(new Error('fail 3'))
];

try {
    await Promise.any(promises);
} catch (err) {
    console.log(err instanceof AggregateError); // true
    console.log(err.errors); // [Error, Error, Error]
    err.errors.forEach(e => console.log(e.message));
}
```

---

## 2. try/catch/finally

The `try...catch...finally` statement is JavaScript's primary mechanism for handling exceptions.

### Basic Syntax

```javascript
try {
    // Code that might throw an error
    riskyOperation();
} catch (error) {
    // Code to handle the error
    console.error('Something went wrong:', error.message);
} finally {
    // Code that ALWAYS runs, whether or not an error occurred
    cleanup();
}
```

### try Block

- Contains code that might throw an error
- If no error is thrown, the `catch` block is skipped entirely
- The `finally` block still runs after the `try` block completes

### catch Block

- Only executes if an error is thrown inside the `try` block
- The parameter (`error`) is the error object that was thrown
- In modern JavaScript, you can use binding patterns in catch:

```javascript
// Catch with error destructuring
try {
    riskyOperation();
} catch ({ name, message, stack }) {
    console.error(`${name}: ${message}`);
    console.error(stack);
}
```

### finally Block

- ALWAYS executes after `try` and `catch`, regardless of outcome
- Runs even if `try` or `catch` contains a `return` statement
- Runs even if `try` or `catch` contains a `throw` statement
- Primarily used for cleanup operations

```javascript
function processFile(file) {
    let resource = openFile(file);
    try {
        return resource.read();
    } catch (error) {
        console.error('Read failed:', error.message);
        throw error;
    } finally {
        resource.close(); // Always closes, even if error occurred
    }
}
```

### Nested try/catch

```javascript
try {
    const data = JSON.parse(inputString);
    try {
        validateData(data);
        processData(data);
    } catch (validationError) {
        console.error('Validation failed:', validationError.message);
        // Inner error handled
    }
} catch (parseError) {
    console.error('JSON parse failed:', parseError.message);
    // Outer error handled
}
```

### Best Practices for try/catch

```javascript
// BAD: Wrapping too much code in try/catch
try {
    const data = fetchUserData();
    const validated = validate(data);
    const saved = saveToDatabase(validated);
    sendEmail(saved);
} catch (e) {
    // Which line failed? Unclear.
    console.error(e);
}

// GOOD: Narrow try blocks focused on the risky operation
let data;
try {
    data = fetchUserData();
} catch (e) {
    console.error('Failed to fetch user data:', e.message);
    return fallbackData;
}

const validated = validate(data); // No try/catch needed - programming error

try {
    saveToDatabase(validated);
} catch (e) {
    console.error('Database save failed:', e.message);
    retryLater(validated);
}
```

### try/catch with Async/Await

```javascript
// Async/await error handling
async function loadUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to load user:', error.message);
        return null;
    }
}
```

### Only Caught at Runtime

Syntax errors are NOT caught by try/catch because they happen during parsing, before execution:

```javascript
// This will NOT work:
try {
    const obj = {{ key: 'value' }}; // SyntaxError
} catch (e) {
    console.log('Caught!', e); // Never reached - parse error before execution
}
```

---

## 3. throw Statement

The `throw` statement lets you create and raise custom exceptions.

### Throwing Different Types

```javascript
// Throw a string
throw "Something went wrong";       // Bad practice

// Throw a number
throw 42;                           // Bad practice

// Throw a boolean
throw true;                         // Bad practice

// Throw an Error object (recommended)
throw new Error("Something went wrong");

// Throw specific error types
throw new TypeError("Expected a string");
throw new RangeError("Value out of range");
throw new ReferenceError("Variable not defined");
throw new SyntaxError("Invalid syntax");
throw new URIError("Malformed URI");

// Throw a custom error class
throw new ValidationError("Email is required");
```

### Throwing Custom Objects (Not Recommended)

```javascript
// You CAN throw any expression, but don't do this:
throw { code: 404, message: "Not found" };
throw { toString() { return "I'm an error object"; } };
```

### Re-throwing Errors

```javascript
try {
    riskyOperation();
} catch (error) {
    // Handle the error
    logToServer(error);

    // Re-throw the original error (preserves stack trace)
    throw error;

    // Re-throw with additional context
    throw new Error(`Operation failed: ${error.message}`);

    // Re-throw wrapped in a new error type
    throw new DatabaseError('Query failed', { cause: error });
}
```

### Conditional Throwing

```javascript
function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('Both arguments must be numbers');
    }
    if (b === 0) {
        throw new RangeError('Cannot divide by zero');
    }
    return a / b;
}
```

---

## 4. Creating Custom Error Classes

Custom errors allow you to create domain-specific error types with additional properties and behavior.

### Basic Custom Error

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

// Usage
throw new ValidationError('Email is required');
```

### Custom Error with Extra Properties

```javascript
class ValidationError extends Error {
    constructor(field, message) {
        super(`${field}: ${message}`);
        this.name = 'ValidationError';
        this.field = field;
    }
}

// Usage
function validateEmail(email) {
    if (!email) {
        throw new ValidationError('email', 'is required');
    }
    if (!email.includes('@')) {
        throw new ValidationError('email', 'must contain @');
    }
}

try {
    validateEmail('invalid-email');
} catch (error) {
    if (error instanceof ValidationError) {
        console.error(`Validation failed on field "${error.field}": ${error.message}`);
    } else {
        throw error; // Re-throw unknown errors
    }
}
```

### Custom Error Preserving Stack Trace

```javascript
class ValidationError extends Error {
    constructor(field, message) {
        super(`${field}: ${message}`);
        this.name = 'ValidationError';
        this.field = field;

        // Preserves proper stack trace in V8 engines (Node.js, Chrome)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationError);
        }
    }
}
```

### Custom Error Hierarchy

```javascript
class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.isOperational = true;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

class ValidationError extends AppError {
    constructor(field, message) {
        super(message, 'VALIDATION_ERROR');
        this.field = field;
    }
}

class DatabaseError extends AppError {
    constructor(message, query) {
        super(message, 'DATABASE_ERROR');
        this.query = query;
    }
}

class NetworkError extends AppError {
    constructor(message, statusCode) {
        super(message, 'NETWORK_ERROR');
        this.statusCode = statusCode;
    }
}

// Usage
throw new ValidationError('email', 'is required');
throw new DatabaseError('Connection failed', 'SELECT * FROM users');
throw new NetworkError('Request timeout', 408);
```

### Custom Error with Cause (ES2022+)

```javascript
class DatabaseError extends Error {
    constructor(message, options = {}) {
        super(message, { cause: options.cause });
        this.name = 'DatabaseError';
        this.query = options.query;
        this.retryable = options.retryable ?? false;
    }
}

// Usage with cause chain
async function fetchUser(id) {
    try {
        const row = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return row;
    } catch (dbError) {
        throw new DatabaseError('Failed to fetch user', {
            cause: dbError,
            query: `SELECT * FROM users WHERE id = ${id}`,
            retryable: true
        });
    }
}
```

---

## 5. Error Properties

### message

Contains the human-readable description of the error.

```javascript
const err = new Error('File not found');
console.log(err.message); // "File not found"

// Can be set via constructor
class CustomError extends Error {
    constructor(message) {
        super(message); // Sets this.message
    }
}
```

### name

Identifies the error type. By default, it's the constructor name.

```javascript
const err = new TypeError('Bad type');
console.log(err.name); // "TypeError"

// Custom errors should set name explicitly
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError'; // Must set explicitly
    }
}
```

### stack

A string containing the stack trace at the point where the error was created. Shows the call path that led to the error, including file names and line numbers.

```javascript
function a() { b(); }
function b() { c(); }
function c() { throw new Error('Stack trace example'); }

try {
    a();
} catch (e) {
    console.log(e.stack);
    // Error: Stack trace example
    //     at c (script.js:3:11)
    //     at b (script.js:2:5)
    //     at a (script.js:1:5)
    //     at script.js:6:5
}
```

The stack trace is formatted as:
```
ErrorType: message
    at functionName (filename:line:column)
    at functionName (filename:line:column)
    ...
```

### cause (ES2022+)

Allows chaining errors to preserve the original cause.

```javascript
try {
    fetchData();
} catch (originalError) {
    throw new Error('Failed to load data', { cause: originalError });
}

// Accessing the cause
try {
    fetchData();
} catch (err) {
    console.log(err.message);       // "Failed to load data"
    console.log(err.cause);         // The original error object
    console.log(err.cause.message); // Original error message
    console.log(err.cause.stack);   // Original stack trace
}
```

---

## 6. Error Propagation

Errors can be propagated up the call stack through throwing and re-throwing.

### Synchronous Propagation

```javascript
function level3() {
    throw new Error('Error in level 3');
}

function level2() {
    level3(); // Error propagates up if not caught
}

function level1() {
    level2(); // Error propagates up if not caught
}

// Error propagates: level3 → level2 → level1 → caller
try {
    level1(); // Caught at top level
} catch (error) {
    console.error('Caught:', error.message);
}
```

### Catch and Re-throw Pattern

```javascript
function saveData(data) {
    try {
        validateInput(data);
        writeToFile(data);
    } catch (error) {
        // Add context, then re-throw
        throw new Error(`saveData failed: ${error.message}`);
    }
}
```

### Async Propagation with Promises

```javascript
function fetchUser(id) {
    return fetch(`/api/users/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        });
}

function loadDashboard() {
    return fetchUser(123)
        .then(user => {
            return renderDashboard(user);
        });
}

// Error propagates through promise chain
loadDashboard().catch(error => {
    console.error('Dashboard failed:', error.message);
});
```

### Async Propagation with Async/Await

```javascript
async function fetchUser(id) {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}

async function loadDashboard() {
    const user = await fetchUser(123);  // Throws if fetchUser fails
    return renderDashboard(user);        // Throws if renderDashboard fails
}

// Propagate up or handle at boundary
async function main() {
    try {
        await loadDashboard();
    } catch (error) {
        console.error('Dashboard failed:', error.message);
    }
}
```

---

## 7. Uncaught Errors and Unhandled Rejections

### Uncaught Exceptions

When an error is thrown and not caught by any `try/catch`, it becomes an "uncaught exception." In browsers, this typically logs to the console and stops script execution for that thread.

### Unhandled Promise Rejections

When a Promise rejects and no `.catch()` handler is attached, it becomes an "unhandled rejection." In Node.js (v15+), unhandled rejections crash the process.

```javascript
// This creates an unhandled rejection:
async function riskyOperation() {
    throw new Error('Something failed');
}

// BAD: No .catch() handler
riskyOperation();

// BAD: Missing final .catch() in chain
fetch('/api/data')
    .then(response => response.json())
    .then(data => processData(data));
    // If any .then() throws, no catch handler!

// GOOD: Always add a .catch()
riskyOperation().catch(err => console.error(err));

// GOOD: Always end promise chains with .catch()
fetch('/api/data')
    .then(response => response.json())
    .then(data => processData(data))
    .catch(err => console.error('Pipeline failed:', err));
```

---

## 8. Global Error Handlers

### window.onerror (Browser)

Captures uncaught synchronous errors in scripts. Returns `true` to prevent default browser error handling.

```javascript
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Uncaught error:', {
        message,    // Error message string
        source,     // Script file URL
        lineno,     // Line number
        colno,      // Column number
        error       // Error object (if available)
    });
    // Return true to prevent default browser error handling
    return true;
};
```

### window.addEventListener('error')

More flexible alternative to `window.onerror`. Also catches resource loading errors (images, scripts, etc.).

```javascript
// Catch all uncaught errors
window.addEventListener('error', (event) => {
    console.error('Error caught:', event.message);
    console.error('Source:', event.filename);
    console.error('Line:', event.lineno);
    console.error('Column:', event.colno);
    console.error('Error object:', event.error);

    // For resource errors (images, scripts, etc.)
    if (event.target !== window) {
        console.error('Resource failed to load:', event.target.src);
    }
});

// For resource loading errors specifically
window.addEventListener('error', (event) => {
    if (event.target !== window) {
        const resource = event.target;
        console.error(`Failed to load: ${resource.tagName} - ${resource.src}`);
    }
}, true); // Use capture phase for resource errors
```

### window.addEventListener('unhandledrejection')

Captures unhandled Promise rejections.

```javascript
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
    console.error('Promise:', event.promise);

    // Prevent default behavior (e.g., console error in browser)
    event.preventDefault();
});
```

### Node.js Global Error Handlers

```javascript
// Node.js uncaught exception handler
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Log and gracefully shut down
    process.exit(1);
});

// Node.js unhandled rejection handler
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

### React Error Boundaries (Error Boundary Pattern)

```javascript
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error Boundary caught:', error);
        console.error('Component stack:', errorInfo.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-fallback">
                    <h2>Something went wrong</h2>
                    <p>{this.state.error?.message}</p>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Try again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

// Usage
<ErrorBoundary>
    <App />
</ErrorBoundary>
```

### Functional Error Boundary (Custom Hook)

```javascript
function useErrorHandler() {
    const [error, setError] = React.useState(null);

    const handleError = React.useCallback((error) => {
        console.error('Caught by error handler:', error);
        setError(error);
    }, []);

    const clearError = React.useCallback(() => {
        setError(null);
    }, []);

    return { error, handleError, clearError };
}
```

---

## 9. Console Debugging Methods

The `console` object provides multiple methods for debugging, beyond just `console.log`.

### console.log

General purpose logging. Accepts multiple arguments.

```javascript
console.log('Hello World');
console.log('Value:', 42);
console.log('Object:', { name: 'Alice', age: 30 });
console.log('Array:', [1, 2, 3]);
console.log('Multiple:', 'a', 'b', 'c');
```

### console.warn

Logs a warning message (yellow triangle in browser console).

```javascript
console.warn('This feature is deprecated');
console.warn('Value might be undefined:', possiblyUndefined);
console.warn('Performance warning: operation took too long');
```

### console.error

Logs an error message (red error icon in browser console).

```javascript
console.error('Something went wrong');
console.error('Error details:', errorObject);
console.error('Failed to load resource:', url);
```

### console.info

Logs informational messages (blue info icon in some browsers).

```javascript
console.info('Application started');
console.info('Server running on port 3000');
```

### console.debug

Logs debug-level messages. May be hidden by default in some consoles.

```javascript
console.debug('Debug info:', debugData);
console.debug('Variable state:', variable);
```

### console.table

Displays tabular data (arrays and objects) as a formatted table. Extremely useful for inspecting arrays of objects.

```javascript
const users = [
    { name: 'Alice', age: 30, role: 'Developer' },
    { name: 'Bob', age: 25, role: 'Designer' },
    { name: 'Charlie', age: 35, role: 'Manager' }
];
console.table(users);

// With column filter
console.table(users, ['name', 'role']);

// Works with plain objects too
console.table({ name: 'Alice', age: 30, active: true });
```

### console.dir

Displays the object's properties as an interactive, expandable list. Particularly useful for DOM elements where `console.log` shows HTML representation instead.

```javascript
const element = document.querySelector('#myDiv');
console.log(element);    // Shows HTML: <div id="myDiv">...</div>
console.dir(element);    // Shows DOM properties: { id: "myDiv", classList: [...], ... }

// For inspecting deep objects
const complex = { a: { b: { c: { d: 'deep' } } } };
console.dir(complex);
```

### console.dirxml

Displays an XML/HTML representation of an object (typically DOM nodes).

```javascript
const element = document.querySelector('#app');
console.dirxml(element); // Shows XML/HTML tree
```

### console.group / console.groupEnd / console.groupCollapsed

Groups related log messages together for cleaner output.

```javascript
// Basic grouping
console.group('User Authentication');
console.log('Validating credentials...');
console.log('Checking permissions...');
console.log('Authentication successful!');
console.groupEnd();

// Collapsed group (starts collapsed, click to expand)
console.groupCollapsed('Debug Info');
console.log('State:', state);
console.log('Props:', props);
console.log('Context:', context);
console.groupEnd();

// Nested groups
console.group('Outer Group');
console.log('Outer message');
    console.group('Inner Group');
    console.log('Inner message');
    console.groupEnd();
console.groupEnd();
```

### console.time / console.timeEnd / console.timeLog

Measures the execution time of code blocks.

```javascript
// Start a timer
console.time('fetchData');

// ... some operation ...

// End timer and log result: "fetchData: 123.456ms"
console.timeEnd('fetchData');

// Log intermediate time without ending
console.time('process');
step1();
console.timeLog('process');      // "process: 50.123ms"
step2();
console.timeLog('process');      // "process: 150.456ms"
step3();
console.timeEnd('process');      // "process: 200.789ms"
```

### console.trace

Outputs a stack trace to the console. Useful for understanding how a function was called.

```javascript
function a() { b(); }
function b() { c(); }
function c() {
    console.trace('Call stack trace');
    // Will show: c → b → a in the console
}
a();
```

### console.assert

Logs a message if the assertion condition is falsy. Does NOT throw an error.

```javascript
const count = -1;
console.assert(count >= 0, 'Count must be non-negative, got:', count);
// Logs: "Assertion failed: Count must be non-negative, got: -1"

// Useful for validating assumptions during debugging
const user = null;
console.assert(user !== null, 'User should not be null');
```

### console.count / console.countReset

Counts how many times a line of code is executed.

```javascript
// Count how many times a function is called
function processItem(item) {
    console.count('processItem called');
    // First call: "processItem called: 1"
    // Second call: "processItem called: 2"
    // Third call: "processItem called: 3"
    return item * 2;
}

// Reset counter
console.countReset('processItem called');

// Multiple independent counters
console.count('Type A');
console.count('Type B');
console.count('Type A'); // "Type A: 2"
```

### console.clear

Clears the console.

```javascript
console.clear();
```

### console.profile / console.profileEnd

Starts and stops the browser's JavaScript profiler.

```javascript
console.profile('My Profile');
// ... code to profile ...
console.profileEnd('My Profile');
// Opens the Performance/Profiler tab with results
```

### CSS Styling in Console

```javascript
// Apply CSS to console output
console.log('%cStyled text', 'color: blue; font-size: 20px; font-weight: bold');
console.log('%cWarning!', 'color: orange; font-size: 16px');
console.log('%cError!', 'color: red; font-size: 14px; text-decoration: underline');

// Combining multiple styles
console.log('%c%s', 'background: red; color: white; padding: 5px;', 'ALERT');
```

### Substitution Patterns

```javascript
// %s - string
// %d or %i - integer
// %f - float
// %o - object
// %c - CSS styling
console.log('Hello %s, you are %d years old', 'Alice', 30);
console.log('Object: %o', { key: 'value' });
```

---

## 10. debugger Statement

The `debugger` statement invokes any available debugging functionality (such as setting a breakpoint). If no debugging functionality is available, this statement has no effect.

```javascript
function calculateTotal(items) {
    let total = 0;

    for (const item of items) {
        total += item.price;
    }

    debugger; // Execution pauses here when DevTools is open

    return total;
}
```

### Conditional debugger

```javascript
function processUser(user) {
    if (!user) {
        debugger; // Pauses only when user is falsy
        return null;
    }
    return user.name;
}
```

### Practical Use Cases

```javascript
// Debugging a specific condition
function findItem(items, targetId) {
    for (const item of items) {
        if (item.id === targetId) {
            debugger; // Inspect the found item
            return item;
        }
    }
    return null;
}

// Debugging async code
async function fetchData(url) {
    debugger; // Before the request
    const response = await fetch(url);
    debugger; // After the request, inspect response
    return response.json();
}
```

---

## 11. Browser DevTools

### Opening DevTools

- **Windows/Linux**: F12 or `Ctrl + Shift + I`
- **macOS**: `Cmd + Option + I`
- **Right-click → Inspect**

### 11.1 Elements Panel

Inspect and modify the DOM tree and CSS in real-time.

**Features:**
- View and edit HTML elements
- Modify CSS properties live
- Add/remove CSS classes
- View computed styles
- Check box model (margin, border, padding, content)
- Search the DOM (`Ctrl+F` / `Cmd+F`)
- Simulate CSS media queries
- Toggle element states (`:hover`, `:active`, `:focus`, `:visited`)

**Usage:**
- Click any element in the Elements panel to see its properties
- Edit attributes directly on the DOM node
- Edit CSS rules in the Styles pane
- View the box model visually in the Computed pane

### 11.2 Console Panel

Interactive JavaScript console for evaluating expressions and inspecting objects.

**Features:**
- Execute JavaScript code in the page's context
- Inspect returned values
- Auto-completion of properties and methods
- Multi-line expressions with `Shift+Enter`
- `$0` references the currently selected element in Elements panel
- `$_` references the result of the last expression
- `copy(obj)` copies to clipboard

### 11.3 Sources Panel

The primary debugging panel for setting breakpoints, stepping through code, and inspecting variables.

**Features:**
- File navigator (left): Shows all loaded JavaScript files
- Code editor (center): Displays source code
- Debugger sidebar (right): Breakpoints, Scope, Call Stack, Watch

**Key Functions:**
- Set breakpoints on lines
- Conditional breakpoints
- Logpoints (log without pausing)
- Step through code (step over, step into, step out)
- Watch expressions
- Scope inspection
- Call stack navigation
- Snippets (code editor for testing)

### 11.4 Network Panel

Monitor and debug all network requests.

**Features:**
- Request/response headers
- Request/response body
- Timing breakdown for each request
- Filter by type (XHR, Fetch, JS, CSS, Image, etc.)
- Waterfall view for timing analysis
- Throttling (simulate slow networks)
- Block requests
- Copy as cURL/fetch
- HAR export/import

**Timing Breakdown:**
- Queueing: Time waiting for available connection
- Stalled: Time spent waiting
- DNS Lookup: Domain resolution time
- Initial Connection: TCP/TLS setup time
- Waiting (TTFB): Time to first byte from server
- Content Download: Response download time

### 11.5 Performance Panel

Record and analyze runtime performance.

**Features:**
- Flame chart visualization
- CPU profiling
- Layout/paint analysis
- Frame rate monitoring
- Screenshots during recording
- Call tree view
- Bottom-up view
- Summary view

**What the Flame Chart Shows:**
- Red triangles: Performance warnings
- Long yellow bars: JavaScript execution blocking the main thread
- Purple bars: Layout/reflow operations
- Green bars: Painting operations

### 11.6 Memory Panel

Analyze memory usage and find memory leaks.

**Features:**
- Heap snapshots
- Allocation timeline
- Allocation sampling
- Object retention analysis
- Comparison between snapshots

**Common Memory Leak Patterns:**
- Detached DOM nodes referenced in closures
- Event listeners not removed
- Global variables accumulating data
- Timers not cleared
- Forgotten subscriptions

### 11.7 Application Panel

Inspect web app storage and resources.

**Features:**
- Local Storage
- Session Storage
- Cookies
- IndexedDB
- Web SQL
- Cache Storage
- Application Cache
- Service Workers
- Manifest inspection

---

## 12. Breakpoints

### Line Breakpoints

Click the line number in the Sources panel. Execution stops before that line runs.

```javascript
function calculateTotal(price, tax) {
    const taxAmount = price * tax;  // ← Click line number here
    return price + taxAmount;
}
```

### Conditional Breakpoints

Right-click a line number → "Add conditional breakpoint." Only pauses when the condition is true.

```javascript
// Right-click line number → Add conditional breakpoint
// Condition: user.id === 123

function processItems(items) {
    for (const item of items) {
        // Conditional breakpoint: item.price > 100
        console.log(item);
    }
}
```

### Logpoints (Chrome)

Right-click line → "Add logpoint." Logs a message to the console without stopping execution.

```
// Logpoint expression (not code, just a template):
User updated: {user.name}, Price: {item.price}
```

### DOM Mutation Breakpoints

Break when a DOM element or its children are modified.

1. Select element in Elements panel
2. Right-click → "Break on..."
3. Options:
   - Subtree removals
   - Subtree modifications
   - Attribute modifications

### XHR/Fetch Breakpoints

Break when a specific network request is made.

1. Go to Sources panel → XHR Breakpoints section
2. Click "+" to add
3. Enter a URL string (substring match)

```
// Example: breaks on any request to /api/users
/api/users
```

### Event Listener Breakpoints

Break when specific event handlers fire.

1. Go to Sources panel → Event Listener Breakpoints
2. Expand event category (Mouse, Keyboard, etc.)
3. Check the specific event type

```
// Example: breaks on any click event
click
```

### Exception Breakpoints

Break on uncaught or caught exceptions.

1. Go to Sources panel
2. Check:
   - "Pause on exceptions" (⏸️ icon)
   - "Pause on caught exceptions" (sub-option)

### Breakpoint Controls

| Button | Shortcut | Action |
|--------|----------|--------|
| ▶ Resume | `F8` | Continue until next breakpoint |
| ⤓ Step Over | `F10` | Execute current line, move to next |
| ⤵ Step Into | `F11` | Enter into function call |
| ⤴ Step Out | `Shift+F11` | Exit current function |
| 🔄 Restart | `Ctrl+Shift+F5` | Restart current debugging session |
| ⏹ Stop | `Shift+F8` | Resume and ignore all breakpoints |

### Programmatic Breakpoints with debugger

```javascript
function complexOperation(data) {
    debugger; // Programmatic breakpoint - pauses when DevTools open
    const result = transform(data);
    return result;
}
```

### Using $0 in Console

```javascript
// After selecting an element in Elements panel:
$0.style.color = 'red'           // Modifies selected element
$0.getAttribute('id')            // Gets attribute
$0.parentNode                    // Gets parent
document.querySelectorAll($0.tagName).length // Count similar elements
```

---

## 13. Call Stack Analysis

The call stack shows the sequence of function calls that led to the current point of execution.

### Reading Stack Traces

```javascript
function third() {
    throw new Error('Something went wrong');
}

function second() {
    third();
}

function first() {
    second();
}

first();

// Stack trace output (bottom = error origin):
// Error: Something went wrong
//     at third (script.js:2:11)        ← Most recent call
//     at second (script.js:6:5)
//     at first (script.js:10:5)
//     at script.js:13:1                ← Initial call
```

**Reading order:** The last line is where the error originated. Read upward to trace the path back to the initial call.

### Inspecting Call Stack in DevTools

1. Pause execution (breakpoint or `debugger`)
2. Look at the Call Stack pane in the Sources panel
3. Click any frame to jump to that function
4. Inspect Scope and Local variables for each frame

### console.trace() for Call Stack Inspection

```javascript
function debugFunction() {
    console.trace('Current call stack');
    // Outputs formatted call stack to console
}
```

### Deep Stack Analysis

```javascript
// Useful for understanding recursive call issues
function factorial(n) {
    if (n <= 1) {
        console.trace('Base case reached');
        return 1;
    }
    return n * factorial(n - 1);
}

// In DevTools, look for repeated function entries in the call stack
// This helps identify infinite recursion
```

---

## 14. Source Maps

Source maps translate minified/compiled code back to the original source, enabling debugging of original source code even in production.

### What Source Maps Do

```
Original Source:     compiled.js (minified/bundled)
                      ↓
Source Map:           compiled.js.map
                      ↓
DevTools Display:    Shows original .js files
```

### Generating Source Maps

**Webpack:**
```javascript
// webpack.config.js
module.exports = {
    devtool: 'source-map', // or 'cheap-module-source-map', 'eval-source-map'
};
```

**Terser (minifier):**
```javascript
// TerserPlugin configuration
new TerserPlugin({
    sourceMap: true,
});
```

**Babel:**
```javascript
// babel.config.js
{
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-transform-runtime"]
    // Source maps generated with --source-maps flag
}
```

**TypeScript:**
```json
{
    "compilerOptions": {
        "sourceMap": true,
        "declaration": true
    }
}
```

### Source Map Types

| devtool Value | Build Speed | Rebuild Speed | Quality | Production |
|---------------|-------------|---------------|---------|------------|
| `(none)` | ★★★★★ | ★★★★★ | No source map | Yes |
| `eval` | ★★★★★ | ★★★★★ | Generated code | No |
| `cheap-source-map` | ★★★★ | ★★★★★ | Line only | No |
| `source-map` | ★★★ | ★★★ | Original source | Yes |
| `hidden-source-map` | ★★★ | ★★★ | Original source | Yes* |
| `nosources-source-map` | ★★★ | ★★★ | No source code | Yes |

*`hidden-source-map` generates the map but doesn't reference it in the bundle.

### Browser Source Map Usage

1. Open DevTools → Sources panel
2. Source maps are loaded automatically if referenced
3. Toggle between compiled and original source using `{}` button

### Security Considerations

```javascript
// In production, use hidden or nosources source maps
// hidden-source-map: Map is generated but not referenced in the bundle
// nosources-source-map: Map doesn't include original source code
// This prevents users from viewing your original source code
```

---

## 15. Error Boundary Patterns

Error boundaries catch JavaScript errors anywhere in their child component tree and display a fallback UI.

### React Class Component Error Boundary

```javascript
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        // Log to error reporting service
        logErrorToService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>Something went wrong</h2>
                    <p>{this.state.error?.message}</p>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Try Again
                    </button>
                    {process.env.NODE_ENV === 'development' && (
                        <details>
                            <summary>Error Details</summary>
                            <pre>{this.state.error?.stack}</pre>
                            <pre>{this.state.errorInfo?.componentStack}</pre>
                        </details>
                    )}
                </div>
            );
        }
        return this.props.children;
    }
}
```

### Granular Error Boundaries

```javascript
// Wrap individual features, not the whole app
function App() {
    return (
        <ErrorBoundary>
            <Header />
            <ErrorBoundary fallback={<SidebarError />}>
                <Sidebar />
            </ErrorBoundary>
            <ErrorBoundary fallback={<ContentError />}>
                <MainContent />
            </ErrorBoundary>
            <Footer />
        </ErrorBoundary>
    );
}
```

### Error Boundary with Retry Logic

```javascript
class RetryErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, retryCount: 0 };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        logErrorToService(error, errorInfo);
    }

    handleRetry = () => {
        this.setState(prev => ({
            hasError: false,
            error: null,
            retryCount: prev.retryCount + 1
        }));
    };

    render() {
        if (this.state.hasError) {
            const maxRetries = this.props.maxRetries || 3;
            if (this.state.retryCount >= maxRetries) {
                return (
                    <div>
                        <p>Maximum retries exceeded</p>
                        <button onClick={() => window.location.reload()}>
                            Reload Page
                        </button>
                    </div>
                );
            }
            return (
                <div>
                    <p>Error occurred. Retrying ({this.state.retryCount + 1}/{maxRetries})...</p>
                    <button onClick={this.handleRetry}>Retry</button>
                </div>
            );
        }
        return this.props.children;
    }
}
```

### Generic Error Handling Pattern (Non-React)

```javascript
// Generic error handler with retry logic
async function withRetry(fn, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            console.warn(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Usage
try {
    const data = await withRetry(() => fetch('/api/data'));
} catch (error) {
    console.error('All retries failed:', error.message);
}
```

---

## 16. Assertion Patterns

Assertions validate assumptions in your code. They throw errors when conditions aren't met.

### Basic Assertion Function

```javascript
function assert(condition, message = 'Assertion failed') {
    if (!condition) {
        throw new Error(message);
    }
}

// Usage
function divide(a, b) {
    assert(typeof a === 'number', 'First argument must be a number');
    assert(typeof b === 'number', 'Second argument must be a number');
    assert(b !== 0, 'Cannot divide by zero');
    return a / b;
}
```

### Detailed Assertion with Custom Error

```javascript
class AssertionError extends Error {
    constructor(expected, actual, message = '') {
        super(
            message || `Expected ${JSON.stringify(expected)} but received ${JSON.stringify(actual)}`
        );
        this.name = 'AssertionError';
        this.expected = expected;
        this.actual = actual;
    }
}

function assertEqual(actual, expected, message = '') {
    if (actual !== expected) {
        throw new AssertionError(expected, actual, message);
    }
}

function assertNotNull(value, name = 'value') {
    if (value === null || value === undefined) {
        throw new Error(`Expected ${name} to be defined, got ${value}`);
    }
}

function assertType(value, type, name = 'value') {
    if (typeof value !== type) {
        throw new Error(`Expected ${name} to be of type ${type}, got ${typeof value}`);
    }
}
```

### Development-Only Assertions

```javascript
// Only assert in development mode
function devAssert(condition, message) {
    if (process.env.NODE_ENV === 'development') {
        if (!condition) {
            console.error('Assertion failed:', message);
            // In development, we want to catch these early
            throw new Error(`Dev Assertion: ${message}`);
        }
    }
}

// Usage - assertions are removed in production
function updateScore(score) {
    devAssert(score >= 0 && score <= 100, `Invalid score: ${score}`);
    // ... rest of logic
}
```

### console.assert (Browser/Node)

```javascript
// Doesn't throw - just logs to console
console.assert(Array.isArray(items), 'Items should be an array:', items);
console.assert(user.email.includes('@'), 'Invalid email:', user.email);
console.assert(status >= 200 && status < 300, 'Unexpected HTTP status:', status);
```

### Type Checking Assertions

```javascript
function assertString(value, name) {
    if (typeof value !== 'string') {
        throw new TypeError(`${name} must be a string, got ${typeof value}`);
    }
}

function assertFunction(value, name) {
    if (typeof value !== 'function') {
        throw new TypeError(`${name} must be a function, got ${typeof value}`);
    }
}

function assertArray(value, name) {
    if (!Array.isArray(value)) {
        throw new TypeError(`${name} must be an array, got ${typeof value}`);
    }
}
```

---

## 17. Logging Patterns and Best Practices

### Structured Logging

```javascript
// Use consistent log format
const logger = {
    info: (message, data = {}) => {
        console.log(JSON.stringify({
            level: 'info',
            timestamp: new Date().toISOString(),
            message,
            ...data
        }));
    },
    error: (message, error, data = {}) => {
        console.error(JSON.stringify({
            level: 'error',
            timestamp: new Date().toISOString(),
            message,
            error: error?.message,
            stack: error?.stack,
            ...data
        }));
    }
};

// Usage
logger.info('User login', { userId: 123, ip: '192.168.1.1' });
logger.error('API request failed', error, { endpoint: '/api/users', method: 'GET' });
```

### Production Logging

```javascript
// In production, use logging levels
const LOG_LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL || 'INFO'];

const logger = {
    debug: (msg) => currentLevel <= LOG_LEVELS.DEBUG && console.debug(msg),
    info: (msg) => currentLevel <= LOG_LEVELS.INFO && console.info(msg),
    warn: (msg) => currentLevel <= LOG_LEVELS.WARN && console.warn(msg),
    error: (msg, err) => currentLevel <= LOG_LEVELS.ERROR && console.error(msg, err),
};
```

### Removing Debug Logs for Production

```javascript
// Use build-time replacement (Webpack, Rollup)
if (process.env.NODE_ENV !== 'production') {
    console.log('Debug info:', data);
}

// Or use a logging library with level support
import log from 'loglevel';
log.setLevel('warn'); // Only warn and error in production
```

### Error Reporting Services

```javascript
// Integrate with error tracking services like Sentry
Sentry.init({ dsn: 'YOUR_DSN' });

try {
    riskyOperation();
} catch (error) {
    Sentry.captureException(error);
    // Show user-friendly message
    showUserError('Something went wrong');
}
```

### Avoid Console Noise

```javascript
// BAD: Excessive logging clutters the console
function processItems(items) {
    console.log('Starting processing');  // Noise
    for (const item of items) {
        console.log('Processing item:', item); // Noise in loop
        console.log('Item processed');    // Noise
    }
    console.log('Done processing');      // Noise
}

// GOOD: Log only meaningful information
function processItems(items) {
    console.info(`Processing ${items.length} items`);
    const results = items.map(processItem);
    console.info(`Processed ${results.length} items successfully`);
    return results;
}

// GOOD: Use conditional logging
function debugProcess(item) {
    if (debugMode) {
        console.debug('Item state:', item);
    }
}
```

---

## 18. Performance Profiling

### Measuring Execution Time

```javascript
// Manual timing
const start = performance.now();
// ... code ...
const end = performance.now();
console.log(`Execution took ${end - start}ms`);

// Using console.time
console.time('operation');
// ... code ...
console.timeEnd('operation');

// Performance API for more precise measurement
function measureAsync(label, fn) {
    const start = performance.now();
    const result = fn();
    if (result instanceof Promise) {
        return result.then(value => {
            const duration = performance.now() - start;
            console.log(`${label}: ${duration.toFixed(2)}ms`);
            return value;
        });
    }
    const duration = performance.now() - start;
    console.log(`${label}: ${duration.toFixed(2)}ms`);
    return result;
}
```

### Using Performance API

```javascript
// Mark specific points in code
performance.mark('start-fetch');
await fetch('/api/data');
performance.mark('end-fetch');

// Measure between marks
performance.measure('fetch-duration', 'start-fetch', 'end-fetch');
const measure = performance.getEntriesByName('fetch-duration')[0];
console.log(`Fetch took: ${measure.duration}ms`);

// Clear marks
performance.clearMarks();
performance.clearMeasures();
```

### Browser Performance Tab Usage

1. Open DevTools → Performance tab
2. Click record (circle icon)
3. Perform the interaction you want to profile
4. Stop recording
5. Analyze the flame chart:
   - Long yellow bars = JavaScript blocking main thread
   - Purple bars = Layout operations
   - Green bars = Paint operations
6. Click on any bar to see detailed timing

---

## 19. Memory Profiling

### Identifying Memory Leaks

```javascript
// Common memory leak patterns

// 1. Event listeners not removed
function setup() {
    const handler = () => console.log('clicked');
    document.getElementById('btn').addEventListener('click', handler);
    // Forgot to store handler reference for cleanup
}
// Fix:
const handlers = new Map();
function setup() {
    const handler = () => console.log('clicked');
    handlers.set('btn', handler);
    document.getElementById('btn').addEventListener('click', handler);
}
function teardown() {
    handlers.forEach((handler, id) => {
        document.getElementById(id).removeEventListener('click', handler);
    });
    handlers.clear();
}

// 2. Closures holding references
function createHandler() {
    const hugeData = new Array(1000000).fill('x');
    return function handler() {
        // hugeData is referenced in this closure
        console.log(hugeData.length);
    };
}
// Fix: Don't capture large data unnecessarily

// 3. Global variables accumulating data
const cache = {};
function processData(key, value) {
    cache[key] = value; // Never cleaned up
}
// Fix: Use WeakMap, set cache size limits, or provide cleanup

// 4. Timers not cleared
function startPolling() {
    setInterval(() => {
        // polling logic
    }, 1000);
    // Forgot to store interval ID
}
// Fix:
let pollingId;
function startPolling() {
    pollingId = setInterval(() => { /* ... */ }, 1000);
}
function stopPolling() {
    clearInterval(pollingId);
}
```

### Heap Snapshot Analysis

1. Open DevTools → Memory tab
2. Take a heap snapshot
3. Interact with the page
4. Take another snapshot
5. Compare the two snapshots:
   - Look for detached DOM nodes
   - Check objects that were added between snapshots
   - Look for growing arrays or maps

### Memory Leak Detection Code

```javascript
// Detect DOM memory leaks
function getDetachedElements() {
    const all = document.querySelectorAll('*');
    const detached = [];
    for (const el of all) {
        if (!el.isConnected) {
            detached.push(el);
        }
    }
    return detached;
}

// Log memory usage (Chrome DevTools)
if (performance.memory) {
    console.log({
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
    });
}
```

---

## 20. Network Debugging

### Viewing Requests

1. Open DevTools → Network tab
2. Filter by type: XHR, Fetch, JS, CSS, Img, etc.
3. Click on any request to see details:
   - Headers (request and response)
   - Preview (formatted response body)
   - Response (raw response body)
   - Timing (detailed timing breakdown)

### Request Timing Breakdown

```
Stalled:          Browser waiting for available connection
DNS Lookup:       Domain name resolution
Initial Connection: TCP/TLS connection setup
SSL:              SSL/TLS handshake
Request Sent:     Time to send request data
Waiting (TTFB):   Time to first byte from server
Content Download: Time to download response
```

### Simulating Network Conditions

1. Open DevTools → Network tab
2. Click "No throttling" dropdown
3. Options:
   - Offline
   - Slow 3G
   - Fast 3G
   - Custom profiles

### Copying Requests as cURL/Fetch

```javascript
// Right-click any request in Network panel
// Copy → Copy as Fetch (for JavaScript)
// Copy → Copy as cURL (for terminal)
```

### Inspecting Request Details

```javascript
// In the Network tab, select a request to see:

// Headers tab:
// General: Request URL, Method, Status Code
// Response Headers: Content-Type, Cache-Control, etc.
// Request Headers: Authorization, Content-Type, etc.

// Payload tab:
// Query String Parameters (GET requests)
// Request Payload (POST/PUT requests)

// Response tab:
// Response body (raw or formatted)
```

### XHR/Fetch Monitoring

```javascript
// Monitor all network requests programmatically
const originalFetch = window.fetch;
window.fetch = async function(...args) {
    const start = performance.now();
    try {
        const response = await originalFetch.apply(this, args);
        const duration = performance.now() - start;
        console.log(`[Network] ${args[0]}: ${response.status} (${duration.toFixed(0)}ms)`);
        return response;
    } catch (error) {
        const duration = performance.now() - start;
        console.error(`[Network] ${args[0]}: FAILED (${duration.toFixed(0)}ms)`, error);
        throw error;
    }
};
```

---

## 21. Linting with ESLint

### What ESLint Does

ESLint statically analyzes JavaScript code to find problems, enforce coding standards, and suggest fixes.

### Installation

```bash
npm install --save-dev eslint @eslint/js
npx eslint --init
```

### Basic Configuration

```javascript
// eslint.config.js (flat config format)
import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'error',
            'no-console': 'warn',
            'eqeqeq': ['error', 'always'],
            'no-var': 'error',
            'prefer-const': 'error',
            'no-unused-expressions': 'error',
            'curly': ['error', 'all'],
            'no-throw-literal': 'error',
            'no-debugger': 'warn',
            'no-alert': 'warn',
            'prefer-template': 'warn',
            'no-duplicate-imports': 'error',
            'no-shadow': 'warn',
        }
    }
];
```

### Key Error-Related Rules

```javascript
// ESLint rules that help prevent errors

// no-undef: Catches ReferenceError before runtime
// Prevents using variables that haven't been declared

// no-unused-vars: Catches variables declared but never used
// Helps spot typos and dead code

// eqeqeq: Enforces strict equality (===)
// Prevents type coercion bugs

// no-throw-literal: Only throw Error objects
// throw "error" → throw new Error("error")

// no-debugger: Warns about debugger statements left in code

// no-implicit-globals: Prevents global variable creation
// Catches missing var/let/const

// no-unreachable: Warns about code after return/throw/continue/break
```

### Custom Rule Configuration

```javascript
// .eslintrc.js (legacy format)
module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    rules: {
        // Error prevention
        'no-undef': 'error',
        'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
        'no-implicit-coercion': 'warn',
        'no-loss-of-precision': 'error',

        // Best practices
        'eqeqeq': ['error', 'always'],
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        'no-return-assign': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-unused-expressions': 'error',
        'no-useless-call': 'error',
        'no-useless-concat': 'error',
        'no-useless-throw': 'error',
        'no-void': 'error',
        'no-with': 'error',
        'prefer-promise-reject-errors': 'error',
        'radix': 'error',

        // Variables
        'no-shadow': 'warn',
        'no-use-before-define': ['error', { 'functions': false }],
    },
    env: {
        browser: true,
        node: true,
        es2022: true,
    }
};
```

### Running ESLint

```bash
# Check for issues
npx eslint .

# Fix issues automatically
npx eslint . --fix

# Check specific files
npx eslint src/app.js

# Check with specific config
npx eslint --config .eslintrc.custom.js .
```

---

## 22. Common Error Patterns and Fixes

### ReferenceError: x is not defined

```javascript
// Problem: Variable not declared
console.log(name); // ReferenceError

// Fix 1: Declare the variable
let name = 'Alice';
console.log(name); // 'Alice'

// Fix 2: Check before use
if (typeof name !== 'undefined') {
    console.log(name);
}
```

### TypeError: Cannot read properties of null/undefined

```javascript
// Problem: Accessing property of null/undefined
const user = null;
console.log(user.name); // TypeError

// Fix 1: Optional chaining
console.log(user?.name); // undefined

// Fix 2: Nullish coalescing
const name = user?.name ?? 'Unknown';

// Fix 3: Type check
if (user && typeof user === 'object') {
    console.log(user.name);
}
```

### SyntaxError: Unexpected token

```javascript
// Problem: JSON parsing
JSON.parse('{invalid json}'); // SyntaxError

// Fix: Try/catch
let data;
try {
    data = JSON.parse(inputString);
} catch (e) {
    console.error('Invalid JSON:', e.message);
    data = null;
}
```

### RangeError: Maximum call stack size exceeded

```javascript
// Problem: Infinite recursion
function recurse() {
    return recurse(); // Never stops
}

// Fix: Add base case
function recurse(n) {
    if (n <= 0) return; // Base case
    return recurse(n - 1);
}
```

### TypeError: X is not a function

```javascript
// Problem: Calling non-function
const num = 42;
num(); // TypeError: num is not a function

// Fix: Check type
if (typeof num === 'function') {
    num();
}
```

### Common Async Errors

```javascript
// Problem: Unhandled promise rejection
fetch('/api/data')
    .then(res => res.json())
    .then(data => {
        throw new Error('Processing failed');
        // No catch handler → unhandled rejection
    });

// Fix: Always add catch
fetch('/api/data')
    .then(res => res.json())
    .then(data => {
        throw new Error('Processing failed');
    })
    .catch(err => console.error(err));

// Problem: Parallel failures
async function loadAll() {
    const [users, posts] = await Promise.all([
        fetchUsers(),  // If this throws...
        fetchPosts()   // ...this never runs
    ]);
}

// Fix: Handle individual failures
async function loadAll() {
    const results = await Promise.allSettled([
        fetchUsers(),
        fetchPosts()
    ]);

    const failed = results.filter(r => r.status === 'rejected');
    if (failed.length > 0) {
        console.error('Some requests failed:', failed.map(f => f.reason));
    }

    return results.filter(r => r.status === 'fulfilled').map(r => r.value);
}
```

### Common DOM Errors

```javascript
// Problem: Element not found
document.getElementById('nonexistent').addEventListener('click', handler);
// TypeError: Cannot read properties of null

// Fix: Check existence
const element = document.getElementById('myButton');
if (element) {
    element.addEventListener('click', handler);
}

// Problem: DOM not ready
document.querySelector('#data').textContent = 'Hello';
// Element might not exist yet if script runs before DOM loads

// Fix: Wait for DOM ready
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#data').textContent = 'Hello';
});
```

---

## 23. Defensive Programming

Defensive programming anticipates unexpected inputs, states, and failures.

### Input Type Checking

```javascript
function greet(name) {
    // Defensive: check type before using
    if (typeof name !== 'string') {
        throw new TypeError('Name must be a string');
    }
    return `Hello, ${name}!`;
}

// Alternative: coerce or default
function greet(name = 'Guest') {
    return `Hello, ${String(name)}!`;
}
```

### Null/Undefined Checks

```javascript
// Deep property access with defensive checks
function getUserCity(user) {
    if (user == null) return 'Unknown';
    if (user.address == null) return 'Unknown';
    return user.address.city ?? 'Unknown';
}

// Using optional chaining (modern)
function getUserCity(user) {
    return user?.address?.city ?? 'Unknown';
}
```

### Default Parameters

```javascript
// Defensive function parameters
function createUser(options = {}) {
    const {
        name = 'Anonymous',
        age = 0,
        role = 'user',
        email = null
    } = options;

    // Validate critical fields
    if (!name) {
        throw new ValidationError('name', 'is required');
    }

    return { name, age, role, email };
}
```

### Immutability

```javascript
// Defensive: prefer immutability
const original = { name: 'Alice', age: 30 };

// Bad: mutates original
original.name = 'Bob';

// Good: create new object
const updated = { ...original, name: 'Bob' };

// Freeze to prevent mutation (shallow)
const config = Object.freeze({
    apiUrl: 'https://api.example.com',
    timeout: 5000
});
config.apiUrl = 'hacked'; // Silently fails (or throws in strict mode)
```

### Fail Fast

```javascript
// Validate inputs immediately
function divide(a, b) {
    // Fail fast with clear error messages
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('Arguments must be numbers');
    }
    if (b === 0) {
        throw new RangeError('Cannot divide by zero');
    }
    return a / b;
}
```

### Guard Clauses

```javascript
// Use guard clauses to reduce nesting
function processOrder(order) {
    // Guard clauses at the top
    if (!order) {
        return { error: 'Order is required' };
    }
    if (!order.items || order.items.length === 0) {
        return { error: 'Order must have items' };
    }
    if (order.status === 'cancelled') {
        return { error: 'Cannot process cancelled order' };
    }

    // Main logic (no nesting needed)
    const total = calculateTotal(order.items);
    const discount = calculateDiscount(order);
    return { total, discount };
}
```

---

## 24. Input Validation

Validation ensures input meets expected format, type, range, and business rules.

### Validation Principles

1. **Validate on the server** - Client-side validation is for UX only, never trust it for security
2. **Whitelist over blacklist** - Define what is allowed, not what is forbidden
3. **Validate early** - Check input as soon as it enters your system
4. **Fail securely** - Reject invalid input with safe error messages
5. **Context matters** - Validation depends on how data will be used

### Common Validation Functions

```javascript
// Email validation
function isValidEmail(email) {
    if (typeof email !== 'string') return false;
    const trimmed = email.trim().toLowerCase();
    if (trimmed.length > 254) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(trimmed);
}

// Username validation
function isValidUsername(username) {
    if (typeof username !== 'string') return false;
    return /^[a-zA-Z0-9_-]{3,32}$/.test(username);
}

// Phone number (simple US format)
function isValidPhone(phone) {
    if (typeof phone !== 'string') return false;
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^\+?1?\d{10,15}$/.test(cleaned);
}

// Password strength
function isStrongPassword(password) {
    if (typeof password !== 'string') return false;
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[!@#$%^&*]/.test(password)) return false;
    return true;
}
```

### Validation Classes

```javascript
class ValidationResult {
    constructor() {
        this.errors = [];
        this.isValid = true;
    }

    addError(field, message) {
        this.errors.push({ field, message });
        this.isValid = false;
    }

    getErrorFor(field) {
        return this.errors.find(e => e.field === field);
    }
}

function validateUser(data) {
    const result = new ValidationResult();

    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        result.addError('name', 'Name is required');
    } else if (data.name.length > 100) {
        result.addError('name', 'Name is too long');
    }

    if (!isValidEmail(data.email)) {
        result.addError('email', 'Invalid email format');
    }

    if (data.age !== undefined && (typeof data.age !== 'number' || data.age < 0 || data.age > 150)) {
        result.addError('age', 'Age must be between 0 and 150');
    }

    return result;
}
```

### Real-Time Validation

```javascript
// Debounced validation for user input
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

const validateEmailInput = debounce((email) => {
    const errorEl = document.getElementById('email-error');
    if (email.length === 0) {
        errorEl.textContent = '';
    } else if (!isValidEmail(email)) {
        errorEl.textContent = 'Please enter a valid email address';
    } else {
        errorEl.textContent = '';
    }
}, 300);

document.getElementById('email').addEventListener('input', (e) => {
    validateEmailInput(e.target.value);
});
```

### Server-Side Validation (Express.js Example)

```javascript
// Always validate on the server, regardless of client-side validation
app.post('/api/users', (req, res) => {
    const { name, email, age } = req.body;

    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('Name is required');
    }

    if (!isValidEmail(email)) {
        errors.push('Valid email is required');
    }

    if (age !== undefined && (typeof age !== 'number' || age < 0 || age > 150)) {
        errors.push('Age must be between 0 and 150');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Process valid data
    createUser({ name: name.trim(), email: email.toLowerCase(), age });
    res.status(201).json({ message: 'User created' });
});
```

---

## 25. Sanitization

Sanitization cleans or encodes input to make it safe for the target context (HTML, SQL, URLs, etc.).

### HTML Escaping (XSS Prevention)

```javascript
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
        '/': '&#x2F;',
        '`': '&#x60;',
    };
    return str.replace(/[&<>"'`/]/g, char => map[char]);
}

// Usage - always escape when inserting user content into HTML
const userInput = '<script>alert("XSS")</script>';
const safeHTML = escapeHTML(userInput);
// Result: &lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;
```

### URL Sanitization

```javascript
function sanitizeURL(url) {
    try {
        const parsed = new URL(url);
        // Only allow safe protocols
        const allowedProtocols = ['http:', 'https:', 'mailto:'];
        if (!allowedProtocols.includes(parsed.protocol)) {
            return null;
        }
        return parsed.href;
    } catch {
        return null; // Invalid URL
    }
}
```

### SQL Injection Prevention

```javascript
// NEVER concatenate user input into SQL queries
// BAD:
const query = `SELECT * FROM users WHERE name = '${userName}'`;
// User could input: ' OR '1'='1

// GOOD: Use parameterized queries
const query = 'SELECT * FROM users WHERE name = ?';
db.query(query, [userName]);

// GOOD: Use ORM (e.g., Prisma, Sequelize)
const user = await prisma.user.findUnique({
    where: { name: userName }
});
```

### File Name Sanitization

```javascript
function sanitizeFileName(filename) {
    // Remove path traversal characters
    return filename
        .replace(/[^a-zA-Z0-9._-]/g, '_')  // Replace special chars
        .replace(/\.{2,}/g, '.')            // Remove multiple dots
        .replace(/^\.+/, '')                // Remove leading dots
        .substring(0, 255);                 // Limit length
}
```

### Content Security Policy (CSP)

```html
<!-- Add CSP header or meta tag to prevent XSS -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'">
```

### Using Trusted Types (Modern API)

```javascript
// Trusted Types API prevents DOM XSS by default
if (window.trustedTypes && window.trustedTypes.createPolicy) {
    const policy = trustedTypes.createPolicy('default', {
        createHTML: (input) => escapeHTML(input),
        createScript: (input) => input,
        createScriptURL: (input) => {
            const url = new URL(input, document.baseURI);
            if (url.origin !== window.location.origin) {
                throw new TypeError('Cross-origin script URL blocked');
            }
            return url.href;
        }
    });
}
```

### Sanitization Libraries

```javascript
// DOMPurify - HTML sanitization
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);

// validator.js - Input validation
import validator from 'validator';
validator.isEmail('test@example.com');    // true
validator.isURL('https://example.com');   // true
validator.escape('<script>');             // '&lt;script&gt;'

// xss - XSS filtering
import xss from 'xss';
const clean = xss(userInput);
```

### Sanitize Before Output, Not Before Storage

```javascript
// BAD: Sanitize before storing (data gets mangled)
const cleanName = escapeHTML(dirtyName);
await db.save(cleanName); // Stores &amp; instead of &

// GOOD: Store original data, sanitize on output
await db.save(dirtyName);
const displayHTML = escapeHTML(dirtyName); // Sanitize when rendering
```

---

## Summary: Quick Reference

### Error Handling Checklist

- [ ] Use specific error types (TypeError, RangeError, etc.)
- [ ] Create custom error classes for domain-specific errors
- [ ] Use try/catch narrowly, around risky operations only
- [ ] Always rethrow or handle - never swallow errors silently
- [ ] Use `finally` for cleanup
- [ ] Always add `.catch()` to promise chains
- [ ] Use `try/catch` with `async/await`
- [ ] Set up global error handlers (`window.onerror`, `unhandledrejection`)
- [ ] Validate and sanitize all user input
- [ ] Use ESLint to catch errors at development time
- [ ] Generate and upload source maps for production debugging
- [ ] Use console methods strategically (not just console.log)
- [ ] Master DevTools breakpoints and stepping
- [ ] Profile performance and memory regularly
- [ ] Implement error boundaries in component-based UIs
- [ ] Log errors to a tracking service in production
