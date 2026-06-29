# Level 18: Script Tag and Console.log

## Error Snippets (1-70)

### Error 1: Script tag in head blocking rendering
**Description:** Add JavaScript to a page
```html
<!DOCTYPE html>
<html>
<head>
  <script src="app.js"></script>
  <title>My Page</title>
</head>
<body>
  <h1>Hello</h1>
</body>
</html>
```

### Error 2: Missing src attribute quotes
**Description:** Load an external script
```html
<script src=app.js></script>
```

### Error 3: Self-closing script tag
**Description:** Add an external JavaScript file
```html
<script src="app.js" />
```

### Error 4: Script tag with type module and no src
**Description:** Add inline JavaScript with module type
```html
<script type="module">
  console.log('Hello');
</script>
```

### Error 5: Inline script with src attribute
**Description:** Add inline JavaScript with external src
```html
<script src="app.js">
  console.log('This will not run');
</script>
```

### Error 6: Multiple script tags with same src
**Description:** Load the same script twice
```html
<script src="app.js"></script>
<script src="app.js"></script>
```

### Error 7: Script loaded before DOM elements exist
**Description:** Access a DOM element that doesn't exist yet
```html
<head>
  <script>
    document.getElementById('title').textContent = 'Hello';
  </script>
</head>
<body>
  <h1 id="title">Original</h1>
</body>
```

### Error 8: Console.log with wrong method name
**Description:** Log a message to the console
```javascript
console.lg('Hello World');
```

### Error 9: Console.log with no parentheses
**Description:** Log a message using console.log
```javascript
console.log 'Hello';
```

### Error 10: Logging undefined variable
**Description:** Log a variable that hasn't been defined
```javascript
console.log(message);
```

### Error 11: Console.log with comma instead of plus
**Description:** Log multiple values together
```javascript
console.log('The value is ', count);
```

### Error 12: Console.error misspelled
**Description:** Log an error message to console
```javascript
console.eror('Something went wrong');
```

### Error 13: Console.warn misspelled
**Description:** Log a warning message
```javascript
console.warnn('This is a warning');
```

### Error 14: Console.info misspelled
**Description:** Log an info message
```javascript
console.nfo('Informational message');
```

### Error 15: Console.table with non-array
**Description:** Display a single object in table format
```javascript
console.table('hello');
```

### Error 16: Console.time with no label
**Description:** Start a performance timer
```javascript
console.time();
// code
console.timeEnd();
```

### Error 17: Console.timeEnd with different label
**Description:** Measure execution time with matching labels
```javascript
console.time('myTimer');
// code
console.timeEnd('myTimer2');
```

### Error 18: Console.assert with wrong assertion
**Description:** Assert that a condition is true
```javascript
console.assert(1 === 2, 'This is true');
```

### Error 19: Console.group without console.groupEnd
**Description:** Create a collapsible console group
```javascript
console.group('Details');
console.log('Item 1');
console.log('Item 2');
```

### Error 20: Console.count without label
**Description:** Count how many times a function is called
```javascript
function process() {
  console.count();
}
process();
process();
```

### Error 21: Console.trace not showing call stack
**Description:** Print a stack trace
```javascript
function inner() {
  console.trace();
}
function outer() {
  inner();
}
outer();
```

### Error 22: Using console.dir on simple value
**Description:** Display an object's properties
```javascript
console.dir('hello');
```

### Error 23: Console.clear used in production
**Description:** Clear the console
```javascript
console.clear();
```

### Error 24: Defer attribute with inline script
**Description:** Defer an inline script
```html
<script defer>
  console.log('deferred');
</script>
```

### Error 25: Async attribute on inline script
**Description:** Make an inline script async
```html
<script async>
  console.log('async');
</script>
```

### Error 26: Script placed in footer without need
**Description:** Add a script at the end of body unnecessarily
```html
<body>
  <h1>Title</h1>
  <script src="app.js"></script>
</body>
```

### Error 27: Logging a promise object instead of value
**Description:** Log the result of a promise
```javascript
let data = fetch('/api/data');
console.log(data);
```

### Error 28: Console.log inside a loop (performance)
**Description:** Log each item during iteration
```javascript
for (let i = 0; i < 1000; i++) {
  console.log(i);
}
```

### Error 29: Using console.log for debugging in production
**Description:** Debug a function's return value
```javascript
function calculate(a, b) {
  console.log('a:', a, 'b:', b);
  return a + b;
}
```

### Error 30: String concatenation in console.log
**Description:** Log a variable with its name
```javascript
console.log('The value of count is: ' + count);
```

### Error 31: Console.dirxml on non-XML element
**Description:** Display an element as XML
```javascript
console.dirxml(document.body);
```

### Error 32: Using console.profile in non-Chrome browser
**Description:** Start a JavaScript profile
```javascript
console.profile('myProfile');
// code
console.profileEnd('myProfile');
```

### Error 33: Nested console.time calls with same label
**Description:** Time nested operations
```javascript
console.time('op');
console.time('op');
// code
console.timeEnd('op');
console.timeEnd('op');
```

### Error 34: Console.timeLog with no matching timer
**Description:** Log timer value without starting timer
```javascript
console.timeLog('noTimer');
```

### Error 35: Console.warn inside catch block
**Description:** Handle errors in a catch block
```javascript
try {
  riskyOperation();
} catch (err) {
  console.warn(err);
}
```

### Error 36: Console.error with string formatting missing args
**Description:** Log an error with placeholder
```javascript
console.error('Error: %s has code %d', 'Server');
```

### Error 37: Using console.log with %o on primitive
**Description:** Log an object using format specifier
```javascript
console.log('%o', 42);
```

### Error 38: Console.info with %c for styling
**Description:** Log styled message to console
```javascript
console.info('%cCustom styled message', 'color: red');
```

### Error 39: Console.debug not visible by default
**Description:** Log a debug message
```javascript
console.debug('Debug info');
```

### Error 40: Missing semicolon before IIFE
**Description:** Create an immediately invoked function expression
```javascript
(function() {
  console.log('IIFE');
})()
```

### Error 41: Using console in Node.js with undefined methods
**Description:** Log a custom console method
```javascript
console.fatal('Critical error');
```

### Error 42: Console.log with Symbol
**Description:** Log a Symbol value
```javascript
let sym = Symbol('id');
console.log(sym);
```

### Error 43: Console.log inside setTimeout callback
**Description:** Log after a delay
```javascript
setTimeout(() => {
  console.log('Delayed');
}, 1000);
```

### Error 44: Logging mutable object by reference
**Description:** Log an object that changes later
```javascript
let obj = { value: 1 };
console.log(obj);
obj.value = 2;
```

### Error 45: Using console.table with circular reference
**Description:** Display a table with objects that reference each other
```javascript
let a = { name: 'A' };
let b = { name: 'B', ref: a };
a.ref = b;
console.table([a, b]);
```

### Error 46: Console.groupCollapsed without groupEnd
**Description:** Create a collapsed console group
```javascript
console.groupCollapsed('Hidden Details');
console.log('Secret info');
```

### Error 47: Multiple console.assert with side effects
**Description:** Assert with a function call that has side effects
```javascript
console.assert(updateCounter(), 'Counter updated');
```

### Error 48: Using console.memory in non-Chrome
**Description:** Check memory usage
```javascript
console.log(console.memory);
```

### Error 49: Console.log with date object
**Description:** Log a Date object
```javascript
let d = new Date();
console.log(d);
```

### Error 50: Logging window object
**Description:** Log the global window object
```javascript
console.log(window);
```

### Error 51: Console.countReset without prior count
**Description:** Reset a count label that doesn't exist
```javascript
console.countReset('unknown');
```

### Error 52: Logging with cyclic object value
**Description:** Log a deeply nested object
```javascript
let data = { level: 1 };
let current = data;
for (let i = 0; i < 10; i++) {
  current.next = { level: i + 1 };
  current = current.next;
}
console.log(data);
```

### Error 53: Using console.log with array and spread
**Description:** Log array elements
```javascript
let arr = [1, 2, 3];
console.log(...arr);
```

### Error 54: Console.dir with wrong options
**Description:** Display object properties with options
```javascript
console.dir(document.body, { colors: false, depth: 1 });
```

### Error 55: Script loaded with both async and defer
**Description:** Add conflicting attributes to script
```html
<script src="app.js" async defer></script>
```

### Error 56: Dynamic script element without proper error handling
**Description:** Create a script element dynamically
```javascript
let script = document.createElement('script');
script.src = 'app.js';
document.head.appendChild(script);
```

### Error 57: Document.write in deferred script
**Description:** Write to the document from a deferred script
```html
<script defer>
  document.write('Deferred write');
</script>
```

### Error 58: Module script without proper CORS
**Description:** Load a module script from another domain
```html
<script type="module" src="https://other-domain.com/module.js"></script>
```

### Error 59: Inline event handler with console.log
**Description:** Log a click event from HTML
```html
<button onclick="console.log('clicked')">Click</button>
```

### Error 60: Logging null as string
**Description:** Log a null value as if it were a string
```javascript
let val = null;
console.log('Value: ' + val);
```

### Error 61: Console.log with undefined as first arg
**Description:** Log a message with undefined prefix
```javascript
console.log(undefined, 'message');
```

### Error 62: Using console.log to debug API responses
**Description:** Log full API response in production
```javascript
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Error 63: Console.log in module scope
**Description:** Log from an ES module
```javascript
// module.js
console.log('Module loaded');
export const value = 42;
```

### Error 64: Script loaded before CSS
**Description:** Load JavaScript before stylesheets
```html
<head>
  <script src="app.js"></script>
  <link rel="stylesheet" href="styles.css">
</head>
```

### Error 65: Missing crossorigin on error logging script
**Description:** Log errors from a cross-origin script
```html
<script src="https://cdn.example.com/analytics.js"></script>
```

### Error 66: Console.group with too many indentations
**Description:** Create deeply nested console groups
```javascript
console.group('Level 1');
console.group('Level 2');
console.group('Level 3');
console.group('Level 4');
console.group('Level 5');
console.log('Deep');
```

### Error 67: Using console in a Web Worker
**Description:** Log from a Web Worker
```javascript
// worker.js
self.addEventListener('message', () => {
  console.log('Message received');
});
```

### Error 68: Console.log with function declaration
**Description:** Log a function definition
```javascript
console.log(function myFunc() { return 42; });
```

### Error 69: Logging prototype chain
**Description:** Log an object's prototype
```javascript
let arr = [];
console.log(arr.__proto__);
```

### Error 70: Console.assert with objects
**Description:** Assert with object comparison
```javascript
console.assert({a: 1} === {a: 1}, 'Objects should be equal');
```

## Issue Snippets (1-30)

### Issue 1: Leftover console.log statements
**Description:** Debug a calculation function
```javascript
function calculateTotal(items) {
  console.log('items received:', items);
  let total = 0;
  for (let item of items) {
    console.log('processing item:', item);
    total += item.price;
    console.log('running total:', total);
  }
  console.log('final total:', total);
  return total;
}
```

### Issue 2: Logging sensitive information
**Description:** Debug user authentication
```javascript
function login(username, password) {
  console.log('Login attempt:', username, password);
  return authenticate(username, password);
}
```

### Issue 3: Using console.log for user output
**Description:** Display a welcome message to the user
```javascript
console.log('Welcome to our app! Visit our website for more info.');
```

### Issue 4: Excessive console.log in loops
**Description:** Process items in a list
```javascript
for (let i = 0; i < items.length; i++) {
  console.log('Processing item ' + i + ': ' + items[i].name);
  processItem(items[i]);
}
```

### Issue 5: Logging without context labels
**Description:** Debug function parameters
```javascript
function saveUser(user) {
  console.log(user);
  // save logic
}
```

### Issue 6: Using alert instead of console.log for debugging
**Description:** Debug a value during development
```javascript
function debugValue(val) {
  alert('Value is: ' + val);
}
```

### Issue 7: Not removing debug scripts before production
**Description:** Add a debugging script tag
```html
<script src="debug.js"></script>
<script src="app.js"></script>
```

### Issue 8: Logging large data structures
**Description:** Debug a large API response
```javascript
fetch('/api/users')
  .then(res => res.json())
  .then(users => console.log(users));
```

### Issue 9: Using console.log in production error handling
**Description:** Handle errors in production
```javascript
try {
  processData();
} catch (err) {
  console.log(err);
}
```

### Issue 10: Multiple console methods for same debug info
**Description:** Debug a variable value
```javascript
console.log('Value:', value);
console.info('Value:', value);
console.debug('Value:', value);
```

### Issue 11: Logging DOM elements directly
**Description:** Debug a DOM element
```javascript
let el = document.getElementById('header');
console.log(el);
```

### Issue 12: String interpolation in console.log
**Description:** Log formatted data
```javascript
console.log('User ' + name + ' is ' + age + ' years old and lives in ' + city);
```

### Issue 13: Using console.log for timing instead of console.time
**Description:** Measure execution time manually
```javascript
let start = Date.now();
performTask();
let end = Date.now();
console.log('Task took ' + (end - start) + 'ms');
```

### Issue 14: Logging undefined as string concatenation
**Description:** Log an optional variable
```javascript
let optional;
console.log('Optional value: ' + optional);
```

### Issue 15: Console.log on every function entry
**Description:** Trace function calls
```javascript
function doSomething() {
  console.log('doSomething called');
  // logic
}
function doSomethingElse() {
  console.log('doSomethingElse called');
  // logic
}
```

### Issue 16: Mixing console.log with other console methods
**Description:** Log mixed severity messages
```javascript
console.log('Starting process');
console.info('Step 1 complete');
console.warn('Step 2 might be slow');
console.log('Step 3 complete');
console.error('Step 4 failed');
```

### Issue 17: Using console.log to return values
**Description:** Return a value from a function
```javascript
function getConfig() {
  let config = loadConfig();
  console.log(config);
}
```

### Issue 18: Logging inside Promises without handling errors
**Description:** Process async data
```javascript
fetch('/data')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Issue 19: Not using console.group for related logs
**Description:** Log related details separately
```javascript
console.log('User details:');
console.log('Name: ' + user.name);
console.log('Email: ' + user.email);
console.log('Role: ' + user.role);
```

### Issue 20: Console.log with template literals
**Description:** Log a formatted string
```javascript
console.log(`Processing ${count} items from ${source} with status ${status}`);
```

### Issue 21: Logging error objects without message
**Description:** Log an error object
```javascript
try {
  throw new Error('Failed');
} catch (e) {
  console.log(e);
}
```

### Issue 22: Using console.log in place of a proper logger
**Description:** Create a logging system
```javascript
function logInfo(msg) { console.log(msg); }
function logError(msg) { console.log(msg); }
function logWarn(msg) { console.log(msg); }
```

### Issue 23: Console.log in event handlers
**Description:** Handle form submission
```javascript
form.addEventListener('submit', (e) => {
  console.log('Form submitted');
  console.log('Name:', nameInput.value);
  console.log('Email:', emailInput.value);
  submitForm();
});
```

### Issue 24: Blocking console with excessive output
**Description:** Debug an array transformation
```javascript
let result = data
  .map(item => {
    console.log('mapping:', item);
    return transform(item);
  })
  .filter(item => {
    console.log('filtering:', item);
    return item.active;
  });
```

### Issue 25: Logging function source code
**Description:** Debug a function
```javascript
console.log(processFunction.toString());
```

### Issue 26: Using console.log for flow control
**Description:** Check if a condition is met
```javascript
if (condition) {
  console.log('Condition is true');
  doSomething();
} else {
  console.log('Condition is false');
  doSomethingElse();
}
```

### Issue 27: Logging with %c format specifier without styling
**Description:** Log with format specifier
```javascript
console.log('%cHello', 'World');
```

### Issue 28: Not using console.assert for conditional logging
**Description:** Log only when a condition fails
```javascript
if (value !== expected) {
  console.log('Assertion failed: expected', expected, 'got', value);
}
```

### Issue 29: Logging entire this context
**Description:** Log the current context in a method
```javascript
class Service {
  process() {
    console.log(this);
  }
}
```

### Issue 30: Leaving debugger statements in code
**Description:** Debug a function
```javascript
function calculate(a, b) {
  debugger;
  return a + b;
}
```

## Modify Snippets (1-50)

### Modify 1: Add proper logging abstraction
**Description:** Create a Logger utility that wraps console methods
```javascript
function log(message) {
  console.log(message);
}
```

### Modify 2: Add timestamps to logs
**Description:** Prefix each log with a timestamp
```javascript
console.log('User logged in');
```

### Modify 3: Create a conditional logger
**Description:** Only log when DEBUG mode is enabled
```javascript
function debug(...args) {
  console.log(...args);
}
```

### Modify 4: Add log levels
**Description:** Create a logger with info, warn, error levels
```javascript
const logger = {
  info: (msg) => {},
  warn: (msg) => {},
  error: (msg) => {}
};
```

### Modify 5: Implement log batching
**Description:** Collect logs and output them in a batch
```javascript
function log(message) {
  console.log(message);
}
```

### Modify 6: Add structured JSON logging
**Description:** Log structured data as formatted JSON
```javascript
console.log({ userId: 123, action: 'login' });
```

### Modify 7: Create a performance monitor
**Description:** Measure and log function execution time
```javascript
function performTask() {
  // task logic
}
```

### Modify 8: Add error tracking wrapper
**Description:** Wrap console.error to send errors to a server
```javascript
console.error = function(...args) {
  // original error behavior
};
```

### Modify 9: Implement a log buffer
**Description:** Store recent logs in memory for debugging
```javascript
const logBuffer = [];
function log(message) {
  // log and store
}
```

### Modify 10: Create a logging middleware
**Description:** Add logging to function calls automatically
```javascript
function withLogging(fn) {
  return function(...args) {
    return fn(...args);
  };
}
```

### Modify 11: Add script loading fallback
**Description:** Load a script and provide a fallback
```html
<script src="app.js"></script>
```

### Modify 12: Implement lazy script loading
**Description:** Load a script only when needed
```javascript
function loadScript(src) {
  // create and append script tag
}
```

### Modify 13: Add script error handling
**Description:** Handle errors when loading external scripts
```html
<script src="analytics.js"></script>
```

### Modify 14: Create a script loader with callback
**Description:** Load a script and execute callback on load
```javascript
function loadScript(src, callback) {
  // implement
}
```

### Modify 15: Implement script dependency loading
**Description:** Load scripts in order, waiting for each to complete
```javascript
const scripts = ['lib.js', 'app.js'];
```

### Modify 16: Add console method for table display
**Description:** Log an array of objects as a formatted table
```javascript
function displayTable(data) {
  console.log(data);
}
```

### Modify 17: Create a collapsible debug panel
**Description:** Group related debug information
```javascript
console.log('Debug info');
console.log('More info');
```

### Modify 18: Implement a logging service
**Description:** Create a class-based logger with configurable output
```javascript
class Logger {
  constructor(options) {
    this.options = options;
  }
  log(level, message) {}
}
```

### Modify 19: Add memory usage logging
**Description:** Log current memory usage
```javascript
function logMemoryUsage() {
  // log memory info
}
```

### Modify 20: Create a timing decorator
**Description:** Add timing to any function via decorator
```javascript
function timed(fn) {
  return function(...args) {
    return fn(...args);
  };
}
```

### Modify 21: Implement a progress logger
**Description:** Log progress as a percentage
```javascript
function logProgress(current, total) {
  // log progress
}
```

### Modify 22: Add colorful console output
**Description:** Use CSS styling in console.log
```javascript
console.log('Success message');
console.log('Error message');
console.log('Warning message');
```

### Modify 23: Create a log aggregator
**Description:** Collect logs from multiple sources
```javascript
const aggregator = {
  logs: [],
  add(source, message) {},
  flush() {}
};
```

### Modify 24: Implement a log rotation
**Description:** Keep only the last N log entries
```javascript
const MAX_LOGS = 100;
let logs = [];
function addLog(entry) {
  logs.push(entry);
}
```

### Modify 25: Add request/response logging
**Description:** Log API request details
```javascript
async function apiCall(url, options) {
  return fetch(url, options).then(res => res.json());
}
```

### Modify 26: Create a component lifecycle logger
**Description:** Log when components mount, update, and unmount
```javascript
class Component {
  constructor() {}
  mount() {}
  update() {}
  unmount() {}
}
```

### Modify 27: Implement a log viewer
**Description:** Display logs in the browser UI
```javascript
function showLogs() {
  // display logs in a div
}
```

### Modify 28: Add session-based logging
**Description:** Group logs by user session
```javascript
const sessionId = generateId();
function log(message) {
  console.log(`[${sessionId}]`, message);
}
```

### Modify 29: Create a log exporter
**Description:** Export logs as a downloadable file
```javascript
function exportLogs() {
  // create and download log file
}
```

### Modify 30: Implement log filtering
**Description:** Filter logs by level or source
```javascript
const filter = { level: 'error', source: '' };
function shouldLog(entry) {
  return true;
}
```

### Modify 31: Add async operation logging
**Description:** Log the start and completion of async operations
```javascript
async function asyncOperation() {
  // log start
  await doWork();
  // log complete
}
```

### Modify 32: Create a trace utility
**Description:** Log function entry and exit with arguments
```javascript
function trace(fn) {
  return function(...args) {
    return fn(...args);
  };
}
```

### Modify 33: Implement log sampling
**Description:** Only log a percentage of events
```javascript
const sampleRate = 0.1;
function shouldSample() {
  return Math.random() < sampleRate;
}
```

### Modify 34: Add environment-based logging
**Description:** Adjust log level based on environment
```javascript
const env = 'production';
const logLevels = { debug: 0, info: 1, warn: 2, error: 3 };
```

### Modify 35: Create a log dashboard
**Description:** Build a simple HTML dashboard for logs
```html
<div id="log-dashboard"></div>
```

### Modify 36: Implement structured error logging
**Description:** Log errors with stack traces and context
```javascript
function logError(error, context) {
  console.error(error);
}
```

### Modify 37: Add user action tracking
**Description:** Log user interactions for analytics
```javascript
function trackAction(action, data) {
  // log and send to analytics
}
```

### Modify 38: Create a console wrapper for mobile
**Description:** Display console logs on screen for mobile debugging
```javascript
class MobileConsole {
  constructor() {
    this.container = null;
  }
  init() {}
  log(message) {}
}
```

### Modify 39: Implement a log search
**Description:** Search through stored logs
```javascript
function searchLogs(query) {
  return [];
}
```

### Modify 40: Add log throttling
**Description:** Limit how often the same log can appear
```javascript
const throttleMap = new Map();
function throttleLog(key, message, interval) {
  // implement throttling
}
```

### Modify 41: Create a script loading queue
**Description:** Queue scripts and load them sequentially
```javascript
class ScriptQueue {
  constructor() {}
  add(src) {}
  start() {}
}
```

### Modify 42: Implement module loading with progress
**Description:** Load ES modules and show progress
```javascript
async function loadModules(modulePaths) {
  // load with progress tracking
}
```

### Modify 43: Add script integrity checking
**Description:** Verify script integrity with SRI hashes
```html
<script src="app.js" integrity="sha384-..."></script>
```

### Modify 44: Create a script cache buster
**Description:** Add cache-busting query params to script URLs
```javascript
function scriptUrl(src) {
  return src;
}
```

### Modify 45: Implement cross-origin script loading
**Description:** Load scripts from different origins with error handling
```javascript
function loadCrossOriginScript(src) {
  // handle CORS errors
}
```

### Modify 46: Add script preloading
**Description:** Preload critical scripts for faster loading
```html
<link rel="preload" href="critical.js" as="script">
```

### Modify 47: Create a deferred script executor
**Description:** Queue functions to run after scripts load
```javascript
const afterLoad = {
  queue: [],
  add(fn) {},
  execute() {}
};
```

### Modify 48: Implement script error recovery
**Description:** Retry loading a script if it fails
```javascript
function loadWithRetry(src, maxRetries) {
  // implement retry logic
}
```

### Modify 49: Add script loading animation
**Description:** Show a loading indicator while scripts load
```javascript
function showLoading() {
  // show spinner
}
function hideLoading() {
  // hide spinner
}
```

### Modify 50: Create a comprehensive logging framework
**Description:** Build a full-featured logging library
```javascript
class LogManager {
  constructor(config) {}
  getLogger(name) {}
  setLevel(level) {}
  addTransport(transport) {}
}
```
