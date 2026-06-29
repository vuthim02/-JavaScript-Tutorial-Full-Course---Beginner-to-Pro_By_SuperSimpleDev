# Level 36: Object Literals & Properties

## Error Snippets (1-70)

### Error 1: Missing comma between properties
**Description:** Add a comma between object properties
```javascript
let person = {
  name: 'Alice'
  age: 30
};
```

### Error 2: Trailing comma with no next property
**Description:** Remove the trailing comma
```javascript
let obj = {
  key: 'value',
};
```

### Error 3: Using equals instead of colon
**Description:** Use colon for property assignment
```javascript
let person = {
  name = 'Alice',
  age = 30
};
```

### Error 4: Missing quotes for string key
**Description:** Add quotes around the key with a hyphen
```javascript
let obj = {
  first-name: 'Alice'
};
```

### Error 5: Accessing non-existent property
**Description:** Check if the property exists before accessing
```javascript
let obj = { name: 'Alice' };
console.log(obj.age.toUpperCase());
```

### Error 6: Dot notation with variable key
**Description:** Use bracket notation for variable keys
```javascript
let key = 'name';
let obj = { name: 'Alice' };
console.log(obj.key);
```

### Error 7: Bracket notation with string literal missing quotes
**Description:** Add quotes around the string key
```javascript
let obj = { name: 'Alice' };
console.log(obj[name]);
```

### Error 8: Using dot notation for numeric key
**Description:** Use bracket notation for numeric keys
```javascript
let obj = { 0: 'zero', 1: 'one' };
console.log(obj.0);
```

### Error 9: Object property assigned with const
**Description:** Object properties can be modified even with const object
```javascript
const obj = { name: 'Alice' };
obj = { name: 'Bob' };
```

### Error 10: Deleting non-configurable property
**Description:** Check if property is configurable before deleting
```javascript
let obj = {};
Object.defineProperty(obj, 'key', { value: 42, configurable: false });
delete obj.key;
```

### Error 11: Property name with dot character
**Description:** Use bracket notation for keys with dots
```javascript
let obj = { 'first.name': 'Alice' };
console.log(obj.first.name);
```

### Error 12: Using reserved words as property names
**Description:** Quote reserved word property keys
```javascript
let obj = { delete: true };
```

### Error 13: Object literal with duplicate keys
**Description:** Remove the duplicate key
```javascript
let obj = {
  name: 'Alice',
  name: 'Bob'
};
```

### Error 14: Missing property value
**Description:** Provide a value for the property
```javascript
let obj = {
  name: 'Alice',
  age
};
```

### Error 15: Wrong syntax for computed property
**Description:** Use brackets for computed property name
```javascript
let key = 'dynamic';
let obj = {
  key: 'value'
};
```

### Error 16: Accessing deeply nested property on undefined
**Description:** Add optional chaining or check existence
```javascript
let data = { user: { profile: { name: 'Alice' } } };
console.log(data.user.address.city);
```

### Error 17: Object literal with function missing keyword
**Description:** Add the function keyword or use method shorthand
```javascript
let obj = {
  greet: {
    console.log('Hi');
  }
};
```

### Error 18: Using object as key without toString
**Description:** Objects as keys are converted to [object Object]
```javascript
let key1 = { id: 1 };
let key2 = { id: 2 };
let map = {
  [key1]: 'first',
  [key2]: 'second'
};
```

### Error 19: HasOwnProperty called on null prototype
**Description:** Use Object.hasOwn instead
```javascript
let obj = Object.create(null);
obj.name = 'Alice';
console.log(obj.hasOwnProperty('name'));
```

### Error 20: For-in loop iterating prototype properties
**Description:** Use hasOwnProperty check in for-in
```javascript
let obj = { name: 'Alice' };
for (let key in obj) {
  console.log(key);
}
```

### Error 21: Object.keys called on non-object
**Description:** Ensure the argument is an object
```javascript
console.log(Object.keys(null));
```

### Error 22: Property access on primitive
**Description:** Primitives can have properties temporarily
```javascript
let str = 'hello';
str.custom = 'value';
console.log(str.custom);
```

### Error 23: Object values with undefined as value
**Description:** Check for undefined before using
```javascript
let obj = { name: undefined };
console.log(obj.name.toUpperCase());
```

### Error 24: Spread of null in object literal
**Description:** Check for null before spreading
```javascript
let obj = null;
let copy = { ...obj };
```

### Error 25: Property shorthand with wrong variable
**Description:** Use the correct variable name for shorthand
```javascript
let first = 'Alice';
let last = 'Smith';
let person = { firstName: first, lastName: last };
```

### Error 26: Object.seal prevents adding properties
**Description:** Define all properties before sealing
```javascript
let obj = Object.seal({ name: 'Alice' });
obj.age = 30;
```

### Error 27: Object.freeze prevents modification
**Description:** Object.freeze makes properties read-only
```javascript
let obj = Object.freeze({ name: 'Alice' });
obj.name = 'Bob';
```

### Error 28: Nested freeze not deep
**Description:** Use deep freeze for nested objects
```javascript
let obj = Object.freeze({
  name: 'Alice',
  address: { city: 'NYC' }
});

obj.address.city = 'LA';
```

### Error 29: Using new Object() with wrong args
**Description:** Use object literal instead
```javascript
let obj = new Object('hello');
```

### Error 30: Getter without get keyword
**Description:** Use the get keyword for getters
```javascript
let obj = {
  name: 'Alice',
  uppercaseName() {
    return this.name.toUpperCase();
  }
};
```

### Error 31: Setter without set keyword
**Description:** Use the set keyword for setters
```javascript
let obj = {
  _name: 'Alice',
  name(value) {
    this._name = value;
  }
};
```

### Error 32: Getter and setter with same name
**Description:** Getters and setters share the same name
```javascript
let obj = {
  get name() { return 'Alice'; },
  set name(val) { this._name = val; },
  name: 'Bob'
};
```

### Error 33: in operator with wrong operand
**Description:** Use the in operator correctly (property in object)
```javascript
let obj = { name: 'Alice' };
console.log(obj in 'name');
```

### Error 34: Property access with template literal as key
**Description:** Use bracket notation with template literal
```javascript
let key = 'name';
let obj = { name: 'Alice' };
console.log(obj.`${key}`);
```

### Error 35: Using Object.assign on nested objects
**Description:** Object.assign does shallow copying
```javascript
let obj1 = { nested: { value: 1 } };
let obj2 = Object.assign({}, obj1);
obj2.nested.value = 2;
```

### Error 36: Property value shorthand with undeclared variable
**Description:** Declare the variable before using it in shorthand
```javascript
let obj = { name, age };
```

### Error 37: Symbol property accessed with dot notation
**Description:** Use bracket notation for Symbol keys
```javascript
let sym = Symbol('key');
let obj = { [sym]: 'value' };
console.log(obj.sym);
```

### Error 38: Object.keys returns strings not symbols
**Description:** Use Object.getOwnPropertySymbols for symbol keys
```javascript
let sym = Symbol('key');
let obj = { [sym]: 'value', name: 'Alice' };
console.log(Object.keys(obj));
```

### Error 39: Accessor property overwritten by data property
**Description:** Don't mix accessor and data properties with same name
```javascript
let obj = {
  get name() { return 'Getter'; },
  set name(val) {},
  name: 'Data'
};
```

### Error 40: Object.preventExtensions allows deletion but not addition
**Description:** PreventExtensions stops new properties
```javascript
let obj = Object.preventExtensions({ name: 'Alice' });
obj.name = 'Bob';
delete obj.name;
```

### Error 41: Property defined with defineProperty wrong descriptor
**Description:** Use correct descriptor format
```javascript
let obj = {};
Object.defineProperty(obj, 'key', 'value');
```

### Error 42: JSON like object with trailing comma
**Description:** Remove trailing comma for JSON-like object
```javascript
let obj = {
  "name": "Alice",
  "age": 30,
};
```

### Error 43: Method shorthand with arrow this
**Description:** Use method shorthand or regular function for object methods
```javascript
let obj = {
  name: 'Alice',
  greet: () => {
    console.log('Hello ' + this.name);
  }
};
```

### Error 44: Nested destructuring with default value
**Description:** Provide default values for nested destructuring
```javascript
let obj = { a: { b: undefined } };
let { a: { b = 'default' } } = obj;
```

### Error 45: Property existence check with truthy
**Description:** Use in operator instead of truthy check
```javascript
let obj = { count: 0 };
if (obj.count) {
  console.log('has count');
}
```

### Error 46: Spreading object into array
**Description:** Objects are not iterable with spread into arrays
```javascript
let obj = { a: 1, b: 2 };
let arr = [...obj];
```

### Error 47: Object values comparison with ==
**Description:** Objects are compared by reference
```javascript
let a = { name: 'Alice' };
let b = { name: 'Alice' };
console.log(a == b);
```

### Error 48: Overwriting Object prototype
**Description:** Don't modify Object.prototype
```javascript
Object.prototype.custom = 'value';
```

### Error 49: Constructor without new keyword
**Description:** Use new keyword for constructor functions
```javascript
function Person(name) {
  this.name = name;
}

let alice = Person('Alice');
```

### Error 50: This binding lost in method extraction
**Description:** Bind the method when extracting
```javascript
let obj = {
  name: 'Alice',
  greet() { console.log('Hi ' + this.name); }
};

let fn = obj.greet;
fn();
```

### Error 51: Rest properties in object destructuring
**Description:** Use rest syntax for remaining properties
```javascript
let obj = { a: 1, b: 2, c: 3 };
let { a, b } = obj;
console.log(a, b, c);
```

### Error 52: Computed key with template literal
**Description:** Use template literal inside computed key brackets
```javascript
let prefix = 'prop';
let obj = {
  `${prefix}Name`: 'value'
};
```

### Error 53: Object destructuring without declaration
**Description:** Use parentheses for destructuring assignment without declaration
```javascript
let obj = { a: 1, b: 2 };
{ a, b } = obj;
```

### Error 54: Wrong destructuring syntax for nested object
**Description:** Use correct nested destructuring syntax
```javascript
let data = { user: { name: 'Alice', age: 30 } };
let { user.name, user.age } = data;
```

### Error 55: Using delete on array element
**Description:** Use splice instead of delete for arrays
```javascript
let arr = [1, 2, 3];
delete arr[1];
```

### Error 56: Object.entries with for-of destructuring
**Description:** Use correct destructuring for entries
```javascript
let obj = { a: 1, b: 2 };
for (let [key, value] of Object.entries(obj)) {
  console.log(key, value);
}
```

### Error 57: Using for-in for arrays
**Description:** Use for-of or forEach for arrays
```javascript
let arr = [1, 2, 3];
for (let key in arr) {
  console.log(arr[key]);
}
```

### Error 58: Property descriptor writable confusion
**Description:** Set writable to true for mutable properties
```javascript
let obj = {};
Object.defineProperty(obj, 'key', {
  value: 42,
  writable: false
});
obj.key = 100;
```

### Error 59: Assigning to getter-only property
**Description:** Add a setter for assignment
```javascript
let obj = {
  get name() { return 'Alice'; }
};
obj.name = 'Bob';
```

### Error 60: Object spread with getters
**Description:** Spread invokes getters
```javascript
let obj = {
  get name() {
    console.log('Getter called');
    return 'Alice';
  }
};
let copy = { ...obj };
```

### Error 61: Property enumeration order dependency
**Description:** Don't rely on property order for integer-like keys
```javascript
let obj = { '2': 'two', '1': 'one' };
console.log(Object.keys(obj));
```

### Error 62: Using valueOf incorrectly
**Description:** valueOf is called implicitly in certain contexts
```javascript
let obj = { valueOf: () => 42 };
console.log(obj + 1);
```

### Error 63: toString not overridden for object
**Description:** Override toString for meaningful string conversion
```javascript
let obj = { name: 'Alice' };
console.log('Hello ' + obj);
```

### Error 64: Checking property existence with undefined
**Description:** Property can exist with value undefined
```javascript
let obj = { name: undefined };
console.log(obj.name === undefined);
```

### Error 65: Object.assign with same target and source
**Description:** Avoid self-assignment
```javascript
let obj = { a: 1 };
Object.assign(obj, obj);
```

### Error 66: With statement with object
**Description:** Avoid using with statement
```javascript
let obj = { a: 1, b: 2 };
with (obj) {
  console.log(a + b);
}
```

### Error 67: Iterating object with Symbol.iterator
**Description:** Objects are not iterable by default
```javascript
let obj = { a: 1, b: 2 };
for (let item of obj) {
  console.log(item);
}
```

### Error 68: Unwrapping optional chaining wrong
**Description:** Use ?. for optional chaining
```javascript
let obj = { user: null };
console.log(obj.user.name);
```

### Error 69: Nullish coalescing with && confusion
**Description:** Use ?? for null/undefined check
```javascript
let count = 0;
console.log(count || 10);
```

### Error 70: globalThis vs this in objects
**Description:** Use globalThis for global object access
```javascript
function createObj() {
  return { name: this };
}
```

## Issue Snippets (1-30)

### Issue 1: Using new Object() instead of literal
**Description:** Use object literal syntax
```javascript
let person = new Object();
person.name = 'Alice';
person.age = 30;
```

### Issue 2: Very long inline object literal
**Description:** Break into multiple lines
```javascript
let config = { theme: 'dark', lang: 'en', fontSize: 14, showSidebar: true, autoSave: false, maxItems: 50 };
```

### Issue 3: Not using shorthand properties
**Description:** Use property shorthand
```javascript
let name = 'Alice';
let age = 30;
let person = { name: name, age: age };
```

### Issue 4: Deeply nested object
**Description:** Flatten the object structure
```javascript
let config = {
  database: {
    connection: {
      host: {
        primary: 'localhost',
        backup: 'backup.local'
      }
    }
  }
};
```

### Issue 5: Using string concatenation for dynamic keys
**Description:** Use computed property names
```javascript
let key = 'name';
let obj = {};
obj[key] = 'Alice';
```

### Issue 6: Verbose property access
**Description:** Use destructuring for cleaner access
```javascript
let name = user.name;
let age = user.age;
let email = user.email;
```

### Issue 7: Object with many null/undefined values
**Description:** Omit null/undefined properties
```javascript
let user = {
  name: 'Alice',
  age: null,
  email: undefined,
  phone: null,
  address: undefined
};
```

### Issue 8: Not using method shorthand
**Description:** Use method shorthand
```javascript
let calculator = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  }
};
```

### Issue 9: Mutating objects passed to function
**Description:** Clone before mutating
```javascript
function addAge(user) {
  user.age = 30;
  return user;
}
```

### Issue 10: Using Object.keys for array iteration
**Description:** Arrays already have index iteration
```javascript
let arr = ['a', 'b', 'c'];
Object.keys(arr).forEach(i => console.log(arr[i]));
```

### Issue 11: Too many properties in single object
**Description:** Split into related sub-objects
```javascript
let user = {
  name: 'Alice',
  email: 'alice@test.com',
  age: 30,
  street: '123 Main St',
  city: 'NYC',
  zip: '10001',
  cardNumber: '4111-1111-1111-1111',
  cardExpiry: '12/28',
  preferences: { theme: 'dark' }
};
```

### Issue 12: Modifying Object.prototype
**Description:** Don't extend built-in prototypes
```javascript
Object.prototype.print = function() {
  console.log(JSON.stringify(this));
};
```

### Issue 13: Using object as a map without null prototype
**Description:** Use Map or Object.create(null)
```javascript
let map = {};
map['toString'] = 'value';
```

### Issue 14: Confusing dot notation with bracket notation
**Description:** Use bracket notation for dynamic keys consistently
```javascript
let key = 'name';
let person = { name: 'Alice' };
console.log(person[key]);
```

### Issue 15: Not using optional chaining
**Description:** Use optional chaining for nested access
```javascript
let city = user && user.address && user.address.city;
```

### Issue 16: Object literal with duplicate structure
**Description:** Create a factory function instead
```javascript
let user1 = { name: 'Alice', age: 30, role: 'admin' };
let user2 = { name: 'Bob', age: 25, role: 'user' };
let user3 = { name: 'Charlie', age: 35, role: 'admin' };
```

### Issue 17: Unnecessarily copying properties
**Description:** Use spread or Object.assign
```javascript
let obj1 = { a: 1, b: 2 };
let obj2 = {};
obj2.a = obj1.a;
obj2.b = obj1.b;
```

### Issue 18: Checking property with undefined comparison
**Description:** Use in operator or hasOwnProperty
```javascript
if (obj.prop !== undefined) {
  console.log('exists');
}
```

### Issue 19: Object spread in wrong context
**Description:** Use spread only in object literals
```javascript
function sum({ a, b }) {
  return a + b;
}
```

### Issue 20: Missing default values in destructuring
**Description:** Provide defaults for destructured properties
```javascript
function greet({ name, age }) {
  console.log('Hello ' + name);
}
```

### Issue 21: Creating objects with class when simple literal works
**Description:** Use object literal for simple objects
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

let alice = new Person('Alice', 30);
```

### Issue 22: Overwriting properties unintentionally
**Description:** Check for existing properties before assigning
```javascript
function merge(target, source) {
  for (let key in source) {
    target[key] = source[key];
  }
  return target;
}
```

### Issue 23: Not using nullish coalescing for defaults
**Description:** Use ?? for default values
```javascript
let name = obj.name || 'default';
```

### Issue 24: Using bracket notation unnecessarily
**Description:** Use dot notation for static keys
```javascript
let obj = { name: 'Alice' };
console.log(obj['name']);
```

### Issue 25: Confusing assignments with comparisons
**Description:** Use === for comparison, = for assignment
```javascript
if (obj.name = 'Alice') {
  console.log('found');
}
```

### Issue 26: Not using Object.freeze for constants
**Description:** Freeze configuration objects
```javascript
const CONFIG = {
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000
};
```

### Issue 27: Meaningless object property names
**Description:** Use descriptive property names
```javascript
let data = {
  d: '2024-01-01',
  n: 'Alice',
  a: 30
};
```

### Issue 28: Using JSON.parse(JSON.stringify(obj)) for clone
**Description:** Use structuredClone or spread for shallow clone
```javascript
let clone = JSON.parse(JSON.stringify(original));
```

### Issue 29: Not using Object.groupBy
**Description:** Use Object.groupBy for grouping
```javascript
let grouped = {};
items.forEach(item => {
  if (!grouped[item.type]) grouped[item.type] = [];
  grouped[item.type].push(item);
});
```

### Issue 30: Nested ternary for property assignment
**Description:** Use object lookup instead
```javascript
let color = theme === 'dark' ? '#000' : theme === 'light' ? '#fff' : '#888';
```

## Modification Snippets (1-50)

### Modify 1: Add missing property
**Description:** Add an age property to the person object
```javascript
let person = {
  name: 'Alice'
};
```

### Modify 2: Convert to shorthand property
**Description:** Use property shorthand
```javascript
let name = 'Alice';
let age = 30;
let person = {
  name: name,
  age: age
};
```

### Modify 3: Use computed property name
**Description:** Use a dynamic key with computed property syntax
```javascript
let key = 'dynamicKey';
let obj = {
  staticKey: 'value'
};
```

### Modify 4: Add optional chaining for safe access
**Description:** Use ?. to safely access nested city
```javascript
let user = { profile: { address: { city: 'NYC' } } };
let city = user.profile.address.city;
```

### Modify 5: Use nullish coalescing for default
**Description:** Use ?? to provide a default value
```javascript
let config = { timeout: 0 };
let timeout = config.timeout || 5000;
```

### Modify 6: Convert to method shorthand
**Description:** Use method shorthand syntax
```javascript
let obj = {
  greet: function() {
    return 'Hello';
  }
};
```

### Modify 7: Add Object.freeze
**Description:** Freeze the config object to prevent modification
```javascript
const CONFIG = {
  API: 'https://api.example.com',
  VERSION: '1.0'
};
```

### Modify 8: Use Object.assign to merge
**Description:** Merge default config with user config
```javascript
function mergeConfig(userConfig) {
  let defaultConfig = { theme: 'light', lang: 'en' };
}
```

### Modify 9: Use spread operator
**Description:** Create a copy of the object with spread
```javascript
let original = { a: 1, b: 2 };
let copy = original;
```

### Modify 10: Add property validation
**Description:** Check if property exists before using it
```javascript
function printName(obj) {
  console.log(obj.name.toUpperCase());
}
```

### Modify 11: Convert for-in to Object.keys
**Description:** Use Object.keys with forEach
```javascript
let obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}
```

### Modify 12: Add destructuring in function params
**Description:** Destructure the object parameter
```javascript
function greet(user) {
  console.log('Hello ' + user.name);
}
```

### Modify 13: Add default value in destructuring
**Description:** Provide default for missing properties
```javascript
function parseConfig({ theme, lang }) {
  return { theme, lang };
}
```

### Modify 14: Use Object.entries to iterate
**Description:** Convert to entries and iterate
```javascript
let obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  console.log(key + ': ' + obj[key]);
}
```

### Modify 15: Add getter for computed property
**Description:** Add a getter that returns the full name
```javascript
let person = {
  first: 'Alice',
  last: 'Smith'
};
```

### Modify 16: Add setter with validation
**Description:** Add a setter that validates the age
```javascript
let person = {
  _age: 0
};
```

### Modify 17: Convert to destructured assignment
**Description:** Use destructuring to extract properties
```javascript
let obj = { a: 1, b: 2, c: 3 };
let a = obj.a;
let b = obj.b;
let c = obj.c;
```

### Modify 18: Use Object.values
**Description:** Get all values from the object
```javascript
let obj = { a: 1, b: 2, c: 3 };
```

### Modify 19: Add Symbol property
**Description:** Add a Symbol-keyed property for internal use
```javascript
let obj = {
  name: 'Alice',
  age: 30
};
```

### Modify 20: Use Object.fromEntries
**Description:** Convert entries array back to object
```javascript
let entries = [['name', 'Alice'], ['age', 30]];
```

### Modify 21: Add property descriptor
**Description:** Make the property non-writable
```javascript
let obj = { name: 'Alice' };
```

### Modify 22: Use hasOwn correctly
**Description:** Use Object.hasOwn instead of hasOwnProperty
```javascript
let obj = { name: 'Alice' };
if (obj.hasOwnProperty('name')) {
  console.log('has name');
}
```

### Modify 23: Fix property key with hyphen
**Description:** Use bracket notation for hyphenated key
```javascript
let obj = { 'first-name': 'Alice' };
console.log(obj.first-name);
```

### Modify 24: Add Object.seal
**Description:** Prevent adding new properties
```javascript
let obj = { name: 'Alice', age: 30 };
```

### Modify 25: Convert nested access to destructuring
**Description:** Use nested destructuring for user.address.city
```javascript
let user = { address: { city: 'NYC', zip: '10001' } };
let city = user.address.city;
let zip = user.address.zip;
```

### Modify 26: Add string key with dot notation
**Description:** Access property with dot in key using bracket
```javascript
let obj = { 'nested.key': 'value' };
console.log(obj.nested.key);
```

### Modify 27: Use Object.keys for dynamic access
**Description:** Get all keys and access each dynamically
```javascript
let obj = { a: 1, b: 2, c: 3 };
```

### Modify 28: Add non-enumerable property
**Description:** Make a property hidden from enumeration
```javascript
let obj = { name: 'Alice', _secret: 'hidden' };
```

### Modify 29: Use Object.assign for defaults
**Description:** Apply default values without overwriting existing
```javascript
function applyDefaults(options) {
  return options;
}
```

### Modify 30: Convert to using Map
**Description:** Use Map instead of object for dynamic keys
```javascript
let cache = {};
```

### Modify 31: Add object factory function
**Description:** Create a function that returns a new object
```javascript
let user1 = { name: 'Alice', role: 'admin' };
let user2 = { name: 'Bob', role: 'user' };
```

### Modify 32: Use Object.groupBy
**Description:** Group items by their type property
```javascript
let items = [
  { type: 'fruit', name: 'apple' },
  { type: 'fruit', name: 'banana' },
  { type: 'veg', name: 'carrot' }
];
```

### Modify 33: Add toString method
**Description:** Override toString to return a formatted string
```javascript
let person = { name: 'Alice', age: 30 };
console.log(String(person));
```

### Modify 34: Add valueOf method
**Description:** Override valueOf for numeric conversion
```javascript
let counter = { count: 5 };
console.log(counter + 1);
```

### Modify 35: Use Object.preventExtensions
**Description:** Prevent new properties but allow modification
```javascript
let obj = { name: 'Alice' };
```

### Modify 36: Create object from array with reduce
**Description:** Convert array of pairs to object
```javascript
let pairs = [
  ['name', 'Alice'],
  ['age', 30],
  ['city', 'NYC']
];
```

### Modify 37: Rename property in destructuring
**Description:** Use destructuring with renaming
```javascript
let user = { firstName: 'Alice', lastName: 'Smith' };
let first = user.firstName;
let last = user.lastName;
```

### Modify 38: Add dynamic property based on condition
**Description:** Conditionally add a property to the object
```javascript
let obj = { name: 'Alice' };
let includeAge = true;
```

### Modify 39: Use nested object spread
**Description:** Spread nested object with defaults
```javascript
let user = { name: 'Alice', address: { city: 'NYC' } };
```

### Modify 40: Convert object keys to camelCase
**Description**: Use camelCase for all property names
```javascript
let data = {
  'first_name': 'Alice',
  'last_name': 'Smith',
  'user_age': 30
};
```

### Modify 41: Add property count getter
**Description**: Add a getter that returns the number of properties
```javascript
let obj = { a: 1, b: 2, c: 3 };
```

### Modify 42: Use Object.is for comparison
**Description:** Compare two objects using Object.is
```javascript
let a = { name: 'Alice' };
let b = { name: 'Alice' };
console.log(a === b);
```

### Modify 43: Add property existence check
**Description:** Check if the age property exists before using
```javascript
let obj = { name: 'Alice' };
console.log(obj.age + 1);
```

### Modify 44: Convert object to query string
**Description:** Convert object properties to URL query string
```javascript
let params = { search: 'hello', page: 1, limit: 10 };
```

### Modify 45: Add clone with JSON methods
**Description:** Use JSON methods for deep clone
```javascript
let original = { nested: { value: 42 } };
let clone = original;
```

### Modify 46: Use structuredClone
**Description:** Use structuredClone for deep cloning
```javascript
let original = { nested: { value: 42 } };
let clone = JSON.parse(JSON.stringify(original));
```

### Modify 47: Add object size property
**Description:** Add a dynamic size property
```javascript
let obj = { a: 1, b: 2, c: 3 };
```

### Modify 48: Convert to use optional chaining with array
**Description:** Safely access first item city
```javascript
let data = { users: [{ address: { city: 'NYC' } }] };
let city = data.users[0].address.city;
```

### Modify 49: Create chainable object methods
**Description:** Return this from each method for chaining
```javascript
let calculator = {
  value: 0,
  add(n) { this.value += n; }
};
```

### Modify 50: Add property getter/setter with backing store
**Description:** Add a temperature property with Celsius/Fahrenheit conversion
```javascript
let thermometer = {
  _celsius: 0
};
```
