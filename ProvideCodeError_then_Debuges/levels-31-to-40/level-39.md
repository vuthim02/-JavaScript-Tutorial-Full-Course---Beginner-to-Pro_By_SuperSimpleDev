# Level 39: localStorage & Object Persistence

## Error Snippets (1-70)

### Error 1: localStorage.getItem of missing key returns null
**Description:** Handle null return when key doesn't exist
```javascript
let data = localStorage.getItem('nonexistent');
console.log(data.toUpperCase());
```

### Error 2: Storing object without JSON.stringify
**Description:** Use JSON.stringify before storing objects
```javascript
let user = { name: 'Alice', age: 30 };
localStorage.setItem('user', user);
```

### Error 3: Reading object without JSON.parse
**Description:** Use JSON.parse after getting from localStorage
```javascript
localStorage.setItem('user', JSON.stringify({ name: 'Alice' }));
let user = localStorage.getItem('user');
console.log(user.name);
```

### Error 4: localStorage overflow
**Description:** Check storage quota before setting
```javascript
let bigData = new Array(10 * 1024 * 1024).fill('a');
localStorage.setItem('big', bigData);
```

### Error 5: Using localStorage in private mode
**Description:** Wrap localStorage calls in try-catch
```javascript
localStorage.setItem('test', 'value');
```

### Error 6: Wrong key name when retrieving
**Description:** Use the same key for get and set
```javascript
localStorage.setItem('username', 'Alice');
let name = localStorage.getItem('userName');
```

### Error 7: Not parsing JSON stored as string
**Description:** Parse the JSON string after retrieval
```javascript
let config = { theme: 'dark' };
localStorage.setItem('config', JSON.stringify(config));
let stored = localStorage.getItem('config');
console.log(stored.theme);
```

### Error 8: localStorage is synchronous
**Description:** Don't await localStorage operations
```javascript
async function save() {
  await localStorage.setItem('key', 'value');
}
```

### Error 9: Removing item with wrong key
**Description:** Use the correct key to remove
```javascript
localStorage.setItem('temp', 'value');
localStorage.removeItem('temporary');
```

### Error 10: Clearing all storage unintentionally
**Description:** Use removeItem for single key removal
```javascript
localStorage.setItem('key1', 'value1');
localStorage.clear();
```

### Error 11: Storing functions with JSON.stringify
**Description:** Functions are lost in JSON serialization
```javascript
let obj = {
  name: 'Alice',
  greet() { return 'Hello'; }
};

localStorage.setItem('obj', JSON.stringify(obj));
```

### Error 12: Checking key existence with getItem
**Description:** Use null check or hasOwnProperty
```javascript
if (localStorage.getItem('key')) {
  console.log('exists');
}
```

### Error 13: Storing undefined in localStorage
**Description:** undefined is converted to string 'undefined'
```javascript
localStorage.setItem('key', undefined);
let val = localStorage.getItem('key');
```

### Error 14: localStorage.setItem quota exceeded
**Description:** Handle QuotaExceededError
```javascript
try {
  localStorage.setItem('key', 'x'.repeat(10 * 1024 * 1024));
} catch (e) {
  console.log('Storage full');
}
```

### Error 15: Using localStorage in SSR/Node
**Description:** Check if localStorage is available
```javascript
localStorage.setItem('test', 'value');
```

### Error 16: Storing boolean without converting
**Description:** Booleans become strings in localStorage
```javascript
localStorage.setItem('isAdmin', true);
let val = localStorage.getItem('isAdmin');
if (val === true) {
  console.log('admin');
}
```

### Error 17: Storing number without converting
**Description:** Numbers become strings in localStorage
```javascript
localStorage.setItem('count', 5);
let count = localStorage.getItem('count');
console.log(count + 1);
```

### Error 18: Forgetting to stringify arrays
**Description:** Arrays also need JSON.stringify
```javascript
let items = [1, 2, 3];
localStorage.setItem('items', items);
```

### Error 19: Key length exceeds localStorage limit
**Description:** Keys have size limits too
```javascript
let longKey = 'x'.repeat(1000);
localStorage.setItem(longKey, 'value');
```

### Error 20: Using sessionStorage vs localStorage confusion
**Description:** Choose the correct storage type
```javascript
// Data should persist after closing browser
sessionStorage.setItem('theme', 'dark');
```

### Error 21: Storage event not triggered on same page
**Description:** Storage events only fire on other tabs
```javascript
window.addEventListener('storage', (e) => {
  console.log('Storage changed');
});

localStorage.setItem('test', 'value');
```

### Error 22: Modifying localStorage directly
**Description:** Use setItem/getItem API
```javascript
localStorage.key = 'value';
```

### Error 23: Accessing localStorage keys by index
**Description:** Use key() method for index access
```javascript
localStorage.setItem('a', '1');
localStorage.setItem('b', '2');
console.log(localStorage[0]);
```

### Error 24: Not handling null return from getItem
**Description:** Provide default value when key doesn't exist
```javascript
let config = JSON.parse(localStorage.getItem('config'));
```

### Error 25: Storing Date objects
**Description:** Dates become strings in JSON
```javascript
let data = { date: new Date() };
localStorage.setItem('data', JSON.stringify(data));
let retrieved = JSON.parse(localStorage.getItem('data'));
console.log(retrieved.date instanceof Date);
```

### Error 26: localStorage.length is read-only
**Description:** Use length to get count
```javascript
console.log(localStorage.length);
```

### Error 27: Iterating localStorage with for-in
**Description:** Use for loop with key() method
```javascript
for (let key in localStorage) {
  console.log(key);
}
```

### Error 28: Storing RegExp in localStorage
**Description:** RegExp doesn't survive JSON round-trip
```javascript
let data = { pattern: /hello/g };
localStorage.setItem('data', JSON.stringify(data));
```

### Error 29: Using delete operator on localStorage
**Description:** Use removeItem method
```javascript
delete localStorage.key;
```

### Error 30: Not escaping special characters in keys
**Description:** Keys are stored as-is
```javascript
localStorage.setItem('key with spaces', 'value');
```

### Error 31: Calling localStorage without window
**Description:** Access localStorage through window
```javascript
let storage = localStorage;
```

### Error 32: Assuming localStorage is always available
**Description:** Check availability before using
```javascript
if (typeof localStorage !== 'undefined') {
  localStorage.setItem('test', 'value');
}
```

### Error 33: Storing too much data synchronously
**Description:** Large writes can block the main thread
```javascript
localStorage.setItem('huge', 'x'.repeat(5 * 1024 * 1024));
```

### Error 34: Using getItem on removed key
**Description:** getItem returns null for missing keys
```javascript
localStorage.removeItem('temp');
let val = localStorage.getItem('temp');
```

### Error 35: Storing null values
**Description:** null becomes the string 'null'
```javascript
localStorage.setItem('key', null);
let val = localStorage.getItem('key');
```

### Error 36: Not using try-catch for quota errors
**Description:** quota exceeded throws an error
```javascript
function saveLargeData(key, data) {
  localStorage.setItem(key, data);
}
```

### Error 37: Cross-origin localStorage access
**Description:** localStorage is per-origin
```javascript
// Trying to access from different subdomain
localStorage.getItem('key');
```

### Error 38: Storing sensitive data in localStorage
**Description:** localStorage is not encrypted
```javascript
localStorage.setItem('apiKey', 'sk-secret123');
```

### Error 39: Reading non-existent config without default
**Description:** Provide default config when nothing is stored
```javascript
function loadConfig() {
  return JSON.parse(localStorage.getItem('config'));
}
```

### Error 40: Assuming localStorage preserves types
**Description:** All values are stored as strings
```javascript
localStorage.setItem('count', 0);
let count = localStorage.getItem('count');
if (count) {
  console.log('Has count');
}
```

### Error 41: Storing Infinity in localStorage
**Description:** Infinity becomes null in JSON
```javascript
let data = { max: Infinity };
localStorage.setItem('data', JSON.stringify(data));
```

### Error 42: Storing NaN in localStorage
**Description:** NaN becomes null in JSON
```javascript
let data = { value: NaN };
localStorage.setItem('data', JSON.stringify(data));
```

### Error 43: Using setItem with undefined key
**Description:** Key must be a string
```javascript
localStorage.setItem(undefined, 'value');
```

### Error 44: Using getItem with null key
**Description:** Key must be a string
```javascript
localStorage.getItem(null);
```

### Error 45: Multiple tabs overwriting data
**Description:** Coordinate between tabs using storage events
```javascript
window.addEventListener('storage', (e) => {
  if (e.key === 'data') {
    // Tab A writes data
    // Tab B overwrites without knowing
  }
});
```

### Error 46: Storing circular reference
**Description:** Circular objects cause JSON.stringify to throw
```javascript
let obj = { name: 'Alice' };
obj.self = obj;
localStorage.setItem('obj', JSON.stringify(obj));
```

### Error 47: Not encoding binary data
**Description:** Binary data needs encoding for localStorage
```javascript
let binary = new Uint8Array([0, 255, 128]);
localStorage.setItem('binary', binary.toString());
```

### Error 48: Using localStorage for caching without expiry
**Description:** Add timestamp for cache expiry
```javascript
function getCache(key) {
  return JSON.parse(localStorage.getItem(key));
}
```

### Error 49: JSON.parse of empty localStorage value
**Description:** Handle empty/null stored values
```javascript
let data = JSON.parse(localStorage.getItem('list') || '');
```

### Error 50: Not trimming whitespace from stored keys
**Description:** Keys with whitespace are different
```javascript
localStorage.setItem('key', 'value');
localStorage.getItem(' key ');
```

### Error 51: Using non-string keys
**Description:** Keys are converted to string automatically
```javascript
localStorage.setItem(42, 'value');
console.log(localStorage.getItem(42));
```

### Error 52: Forgetting to call localStorage methods
**Description:** Call setItem, not just reference it
```javascript
let key = 'test';
localStorage.setItem;
localStorage.setItem(key, 'value');
```

### Error 53: Storage event has oldValue and newValue as strings
**Description:** Parse values if they are JSON
```javascript
window.addEventListener('storage', (e) => {
  console.log(e.oldValue, e.newValue);
});
```

### Error 54: Overriding localStorage methods
**Description:** Don't override built-in storage methods
```javascript
localStorage.setItem = function() {
  console.log('mock');
};
```

### Error 55: Storing large base64 strings
**Description:** Base64 increases size by ~33%
```javascript
let base64 = 'data:image/png;base64,' + longBase64String;
localStorage.setItem('image', base64);
```

### Error 56: Cross-tab synchronization race conditions
**Description:** Use storage events for synchronization
```javascript
localStorage.setItem('counter', JSON.stringify({ count: 0 }));
```

### Error 57: Using length property incorrectly
**Description:** length is the number of stored items
```javascript
localStorage.setItem('a', '1');
localStorage.setItem('b', '2');
console.log(localStorage.length());
```

### Error 58: Not handling private browsing mode
**Description:** Some browsers throw in private mode
```javascript
localStorage.setItem('test', 'value');
```

### Error 59: Storing too many keys
**Description:** Each origin has a storage limit
```javascript
for (let i = 0; i < 10000; i++) {
  localStorage.setItem('key' + i, 'value');
}
```

### Error 60: Not migrating storage format
**Description:** Handle old format data
```javascript
function loadData() {
  let raw = localStorage.getItem('data');
  return JSON.parse(raw);
}
```

### Error 61: Missing key quotes in JSON stored
**Description:** Ensure valid JSON when storing
```javascript
localStorage.setItem('data', "{name: 'Alice'}");
```

### Error 62: Using localStorage for session data
**Description:** Use sessionStorage for session-only data
```javascript
localStorage.setItem('sessionToken', 'abc123');
```

### Error 63: Storing nested objects deeply
**Description:** Deep nesting can hit JSON.stringify limits
```javascript
let deep = { a: { b: { c: { d: { e: 'value' } } } } };
localStorage.setItem('deep', JSON.stringify(deep));
```

### Error 64: Not sanitizing keys from user input
**Description:** User input could create prototype pollution
```javascript
let userKey = '__proto__';
localStorage.setItem(userKey, 'polluted');
```

### Error 65: Storing data before checking quota
**Description:** Estimate size before storing
```javascript
function estimateSize(data) {
  return new Blob([JSON.stringify(data)]).size;
}
```

### Error 66: Not using JSON.parse for stored arrays
**Description:** Arrays are stored as JSON strings
```javascript
localStorage.setItem('list', JSON.stringify([1, 2, 3]));
let list = localStorage.getItem('list');
console.log(list.length);
```

### Error 67: Storing with undefined value through JSON
**Description:** undefined becomes null in JSON arrays
```javascript
localStorage.setItem('data', JSON.stringify([1, undefined, 3]));
```

### Error 68: localStorage key collision with library
**Description:** Use namespaced keys
```javascript
localStorage.setItem('data', 'value');
localStorage.setItem('data', 'overwritten');
```

### Error 69: Not compressing data before storage
**Description:** Large text can be compressed
```javascript
let longText = 'a'.repeat(100000);
localStorage.setItem('text', longText);
```

### Error 70: Assuming synchronous storage is fast
**Description:** Large writes can be slow
```javascript
console.time('storage');
localStorage.setItem('large', 'x'.repeat(2 * 1024 * 1024));
console.timeEnd('storage');
```

## Issue Snippets (1-30)

### Issue 1: Storing raw objects without serialization
**Description:** Always stringify objects before storing
```javascript
let user = { name: 'Alice', age: 30 };
localStorage.setItem('user', user);
```

### Issue 2: No fallback for missing localStorage
**Description:** Provide in-memory fallback when unavailable
```javascript
let storage = localStorage;
```

### Issue 3: Not wrapping in try-catch
**Description:** localStorage operations can fail
```javascript
function save(key, value) {
  localStorage.setItem(key, value);
}
```

### Issue 4: Storing too much data in a single key
**Description:** Split large data across multiple keys
```javascript
let bigArray = new Array(10000).fill('data');
localStorage.setItem('bigData', JSON.stringify(bigArray));
```

### Issue 5: No versioning in stored data
**Description:** Add version field for future migrations
```javascript
localStorage.setItem('config', JSON.stringify({ theme: 'dark' }));
```

### Issue 6: Storing raw user input without escaping
**Description:** Sanitize user input before storing
```javascript
let userInput = '<script>alert("xss")</script>';
localStorage.setItem('input', userInput);
```

### Issue 7: Not using namespaced keys
**Description:** Prefix keys with app name
```javascript
localStorage.setItem('name', 'Alice');
localStorage.setItem('theme', 'dark');
```

### Issue 8: Reading from localStorage on every access
**Description:** Cache values in memory after first read
```javascript
function getConfig(key) {
  return JSON.parse(localStorage.getItem('config'))[key];
}
```

### Issue 9: Storing default values redundantly
**Description:** Only store non-default values
```javascript
function saveConfig(config) {
  localStorage.setItem('config', JSON.stringify(config));
}
```

### Issue 10: Not removing obsolete keys
**Description:** Clean up old data when migrating
```javascript
function migrateV1toV2() {
  let data = JSON.parse(localStorage.getItem('data'));
  localStorage.setItem('newData', JSON.stringify(data));
}
```

### Issue 11: Using JSON.parse directly without validation
**Description:** Validate parsed data structure
```javascript
let config = JSON.parse(localStorage.getItem('config'));
console.log(config.theme);
```

### Issue 12: Storing functions or class instances
**Description:** Store plain data only
```javascript
class User {}
let user = new User();
user.name = 'Alice';
localStorage.setItem('user', JSON.stringify(user));
```

### Issue 13: Repeatedly stringifying the same data
**Description:** Cache the serialized string
```javascript
function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function updateUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}
```

### Issue 14: Not handling storage event
**Description:** Listen for cross-tab changes
```javascript
// Tab A saves data
localStorage.setItem('data', 'value');
// Tab B has no listener
```

### Issue 15: Using localStorage for authentication tokens
**Description:** Use httpOnly cookies for auth tokens
```javascript
localStorage.setItem('authToken', 'eyJhbGciOiJI...');
```

### Issue 16: Not providing defaults for missing keys
**Description:** Use fallback values
```javascript
function loadSetting(key) {
  return localStorage.getItem(key);
}
```

### Issue 17: Storing large blobs as single string
**Description:** Use IndexedDB for large data
```javascript
localStorage.setItem('bigBlob', veryLargeString);
```

### Issue 18: Overwriting data without confirmation
**Description:** Check before overwriting
```javascript
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
```

### Issue 19: Not using sessionStorage for session data
**Description:** Use sessionStorage for sensitive session data
```javascript
localStorage.setItem('tempToken', 'abc');
```

### Issue 20: Inefficient JSON queries on stored data
**Description:** Load data once and query in memory
```javascript
function findUser(id) {
  let users = JSON.parse(localStorage.getItem('users'));
  return users.find(u => u.id === id);
}
```

### Issue 21: Storing defaults with every save
**Description:** Remove default values from stored data
```javascript
function savePreferences(prefs) {
  const defaults = { theme: 'light', lang: 'en' };
  localStorage.setItem('prefs', JSON.stringify({ ...defaults, ...prefs }));
}
```

### Issue 22: Not encrypting sensitive stored data
**Description:** Encrypt sensitive data before storing
```javascript
localStorage.setItem('creditCard', '4111-1111-1111-1111');
```

### Issue 23: Using typeof check incorrectly
**Description:** Properly check localStorage availability
```javascript
if (typeof localStorage !== 'undefined') {
  localStorage.setItem('test', 'value');
}
```

### Issue 24: Storing derived data
**Description:** Store source data, derive when needed
```javascript
let user = { firstName: 'Alice', lastName: 'Smith' };
localStorage.setItem('fullName', user.firstName + ' ' + user.lastName);
```

### Issue 25: Not batching localStorage writes
**Description:** Write all changes at once
```javascript
function updateSettings(settings) {
  localStorage.setItem('theme', settings.theme);
  localStorage.setItem('lang', settings.lang);
  localStorage.setItem('font', settings.font);
}
```

### Issue 26: Mixing data types in stored JSON
**Description:** Use consistent data types
```javascript
localStorage.setItem('data', JSON.stringify({ count: '5' }));
```

### Issue 27: Not using storage quota estimate
**Description:** Check remaining space before writing
```javascript
if (navigator.storage && navigator.storage.estimate) {
  // Unused
}
```

### Issue 28: Storing timestamps as locale strings
**Description:** Use ISO format for dates
```javascript
localStorage.setItem('lastVisit', new Date().toString());
```

### Issue 29: Over-fetching from localStorage
**Description:** Minimize getItem calls
```javascript
for (let i = 0; i < 100; i++) {
  let val = localStorage.getItem('key' + i);
}
```

### Issue 30: Not clearing temporary data
**Description:** Clean up temporary storage entries
```javascript
function loadData() {
  let temp = localStorage.getItem('tempData');
  // Use data but never remove tempData
}
```

## Modification Snippets (1-50)

### Modify 1: Serialize object before storing
**Description:** Use JSON.stringify before setItem
```javascript
let user = { name: 'Alice', age: 30 };
localStorage.setItem('user', user);
```

### Modify 2: Parse JSON after retrieval
**Description:** Use JSON.parse after getItem
```javascript
let raw = localStorage.getItem('user');
let user = raw;
```

### Modify 3: Handle null from getItem
**Description:** Provide default object when key is missing
```javascript
let config = JSON.parse(localStorage.getItem('config'));
```

### Modify 4: Add try-catch for localStorage
**Description:** Wrap storage operations in try-catch
```javascript
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
```

### Modify 5: Convert stored string back to number
**Description:** Parse the stored string as a number
```javascript
localStorage.setItem('count', 5);
let count = localStorage.getItem('count');
```

### Modify 6: Add data versioning
**Description:** Include version field in stored data
```javascript
function saveData(data) {
  localStorage.setItem('data', JSON.stringify(data));
}
```

### Modify 7: Add expiry to cached data
**Description:** Include timestamp and check expiry
```javascript
function setCache(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getCache(key) {
  let data = JSON.parse(localStorage.getItem(key));
  return data;
}
```

### Modify 8: Use namespaced keys
**Description:** Prefix keys with app name
```javascript
function save(key, value) {
  localStorage.setItem(key, value);
}
```

### Modify 9: Add storage availability check
**Description:** Check if localStorage is available
```javascript
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
```

### Modify 10: Fix key name typo
**Description:** Use the same key for get and set
```javascript
localStorage.setItem('userName', 'Alice');
let name = localStorage.getItem('username');
```

### Modify 11: Convert boolean string back to boolean
**Description:** Parse the stored string as boolean
```javascript
localStorage.setItem('isAdmin', true);
let val = localStorage.getItem('isAdmin');
if (val) { }
```

### Modify 12: Add default config on first load
**Description:** Store default config when none exists
```javascript
function loadConfig() {
  let raw = localStorage.getItem('config');
  return JSON.parse(raw);
}
```

### Modify 13: Add storage event listener
**Description:** Listen for cross-tab storage changes
```javascript
localStorage.setItem('shared', 'value');
```

### Modify 14: Fix array storage
**Description:** Stringify array before storing
```javascript
let items = [1, 2, 3];
localStorage.setItem('items', items);
```

### Modify 15: Add in-memory fallback
**Description:** Use object fallback when localStorage unavailable
```javascript
function getStorage() {
  return localStorage;
}
```

### Modify 16: Prevent overwriting without confirmation
**Description:** Check if key exists before writing
```javascript
function saveOnce(key, value) {
  localStorage.setItem(key, value);
}
```

### Modify 17: Add data migration
**Description:** Migrate old data format to new format
```javascript
function loadData() {
  let raw = localStorage.getItem('data');
  return JSON.parse(raw);
}
```

### Modify 18: Use sessionStorage for temporary data
**Description:** Switch to sessionStorage for session data
```javascript
localStorage.setItem('pageState', 'scroll: 100');
```

### Modify 19: Add namespace utility functions
**Description:** Create helper functions with prefix
```javascript
function save(key, value) {
  localStorage.setItem('app_' + key, value);
}
```

### Modify 20: Fix quota exceeded error
**Description:** Handle storage full gracefully
```javascript
localStorage.setItem('key', 'large value');
```

### Modify 21: Add data compression
**Description:** Compress data before storing
```javascript
function saveCompressed(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
```

### Modify 22: Add clear old data function
**Description:** Remove items older than 30 days
```javascript
function cleanOldData() {
  localStorage.clear();
}
```

### Modify 23: Add batch save
**Description:** Save multiple items at once
```javascript
function saveAll(items) {
  items.forEach(item => localStorage.setItem(item.key, item.value));
}
```

### Modify 24: Add change detection
**Description:** Only save if data changed
```javascript
function saveIfChanged(key, newData) {
  localStorage.setItem(key, JSON.stringify(newData));
}
```

### Modify 25: Fix stored number addition
**Description:** Parse stored numbers before arithmetic
```javascript
localStorage.setItem('score', 100);
let score = localStorage.getItem('score');
console.log(score + 50);
```

### Modify 26: Add TypeScript-like validation
**Description:** Validate data shape after loading
```javascript
function loadUser() {
  let raw = localStorage.getItem('user');
  let user = JSON.parse(raw);
}
```

### Modify 27: Add encrypted storage
**Description:** Simple encode before storing
```javascript
function saveSecure(key, value) {
  localStorage.setItem(key, btoa(JSON.stringify(value)));
}
```

### Modify 28: Fix cross-tab counter
**Description:** Use storage events to sync counter
```javascript
let counter = 0;
function increment() {
  counter++;
  localStorage.setItem('counter', counter);
}
```

### Modify 29: Add lazy loading from storage
**Description:** Only load data when first accessed
```javascript
class Settings {
  constructor() {
    this._data = null;
  }
}
```

### Modify 30: Add fallback for null/empty data
**Description:** Use default when stored data is null
```javascript
function getArray(key) {
  return JSON.parse(localStorage.getItem(key));
}
```

### Modify 31: Add storage size estimator
**Description:** Calculate used storage
```javascript
function getStorageSize() {
}
```

### Modify 32: Fix boolean check from storage
**Description:** Compare with string 'true' not boolean
```javascript
localStorage.setItem('enabled', true);
if (localStorage.getItem('enabled') === true) {
  console.log('enabled');
}
```

### Modify 33: Add auto-save with debounce
**Description:** Debounce save operations
```javascript
function autoSave(data) {
  localStorage.setItem('autosave', JSON.stringify(data));
}
```

### Modify 34: Add storage change notification
**Description:** Notify other parts of the app on change
```javascript
function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
```

### Modify 35: Fix JSON parse of stored array
**Description:** Parse the stored JSON string
```javascript
localStorage.setItem('list', JSON.stringify([1, 2, 3]));
let list = localStorage.getItem('list');
console.log(list.length);
```

### Modify 36: Add schema validation
**Description:** Validate stored data against schema
```javascript
function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}
```

### Modify 37: Add atomic read-modify-write
**Description:** Read, modify, write in sequence
```javascript
function incrementCounter() {
  let count = localStorage.getItem('counter');
}
```

### Modify 38: Add default value function
**Description:** Provide default for any missing key
```javascript
function getWithDefault(key, defaultValue) {
  return localStorage.getItem(key);
}
```

### Modify 39: Add storage listener cleanup
**Description:** Remove event listener when component unmounts
```javascript
function startListening() {
  window.addEventListener('storage', handler);
}

function stopListening() {
}
```

### Modify 40: Add batch JSON parse
**Description:** Parse multiple stored JSON values
```javascript
function loadMultiple(keys) {
  let result = {};
  keys.forEach(key => {
    result[key] = localStorage.getItem(key);
  });
  return result;
}
```

### Modify 41: Add transactional storage
**Description:** Rollback on failure
```javascript
function transactionalSave(changes) {
  changes.forEach(c => localStorage.setItem(c.key, c.value));
}
```

### Modify 42: Fix stored boolean conversion
**Description:** Convert stored 'true'/'false' to boolean
```javascript
localStorage.setItem('active', true);
let active = localStorage.getItem('active');
```

### Modify 43: Add prefix-based cleanup
**Description:** Remove all keys starting with prefix
```javascript
function clearNamespace(prefix) {
}
```

### Modify 44: Add maximum retry for storage
**Description:** Retry storage operation on failure
```javascript
function saveWithRetry(key, value, retries) {
}
```

### Modify 45: Add storage mutation observer
**Description:** Watch for changes to specific key
```javascript
function watchKey(key, callback) {
}
```

### Modify 46: Add storage limit warning
**Description:** Warn when storage is nearly full
```javascript
function checkStorage() {
}
```

### Modify 47: Add cross-origin storage sync
**Description:** Sync localStorage across subdomains
```javascript
// Example using postMessage
```

### Modify 48: Add storage encryption
**Description:** Encrypt values before storing
```javascript
function encryptAndSave(key, value, password) {
}
```

### Modify 49: Add storage compression ratio check
**Description:** Compare compressed vs uncompressed size
```javascript
function compareSize(data) {
}
```

### Modify 50: Add storage defragmentation
**Description:** Reorganize stored data to reclaim space
```javascript
function defragment() {
}
```
