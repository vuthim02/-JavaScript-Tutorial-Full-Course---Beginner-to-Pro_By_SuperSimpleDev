/**
 * PART 10 — Advanced JS: Symbols, Map, Set, WeakMap, Generators, Proxy
 * Run with: node part10-advanced.js
 */

// ---------------------------------------------------------------
// 1. Symbol — unique, immutable primitive for property keys
// ---------------------------------------------------------------

const sym1 = Symbol('debug');
const sym2 = Symbol('debug');
console.log('Symbols are unique:', sym1 === sym2); // false

// Using Symbol as an object property key (avoids name collision)
const hidden = Symbol('hidden');
const obj = {
  name: 'Alice',
  [hidden]: 'secret value',
};
console.log('Symbol property:', obj[hidden]); // 'secret value'
console.log('Symbol hidden from Object.keys:', Object.keys(obj)); // ['name']

// Well-known Symbol: Symbol.iterator
const iterable = {
  data: [10, 20, 30],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

console.log('Custom iterable with Symbol.iterator:');
for (const val of iterable) {
  console.log('  ', val);
}

// ---------------------------------------------------------------
// 2. Map — key-value with any type as key
// ---------------------------------------------------------------

const map = new Map();

// Keys can be any type — objects, functions, etc.
const objKey = { id: 1 };
const fnKey = function () {};

map.set('string', 'value1');
map.set(42, 'value2');
map.set(objKey, 'value3');
map.set(fnKey, 'value4');

console.log('Map size:', map.size);
console.log('Map get string:', map.get('string'));
console.log('Map get object key:', map.get(objKey));
console.log('Map has fnKey:', map.has(fnKey));

// Iterate over Map
for (const [key, value] of map) {
  console.log('  Map entry:', typeof key, '→', value);
}

// ---------------------------------------------------------------
// 3. Set — unique values collection
// ---------------------------------------------------------------

const set = new Set([1, 2, 2, 3, 3, 3, 4]);
console.log('Set size (duplicates removed):', set.size); // 4
console.log('Set has 2:', set.has(2));
console.log('Set has 5:', set.has(5));

set.add(5);
set.delete(1);
console.log('Set after add/delete:', [...set]);

// ---------------------------------------------------------------
// 4. WeakMap — keys must be objects, no prevent GC
// ---------------------------------------------------------------

const weakMap = new WeakMap();

// Keys MUST be objects
const user1 = { name: 'Alice' };
const user2 = { name: 'Bob' };

weakMap.set(user1, 'secret data for Alice');
weakMap.set(user2, 'secret data for Bob');

console.log('WeakMap get:', weakMap.get(user1));

// WeakMap does NOT prevent garbage collection
// When `user1` goes out of scope, the entry is automatically removed
// This is useful for private data in classes

// Private data pattern with WeakMap
const privateData = new WeakMap();

class Person {
  constructor(name, ssn) {
    // Store sensitive data in WeakMap — not enumerable on the object
    privateData.set(this, { ssn });
    this.name = name;
  }

  getSSN() {
    return privateData.get(this).ssn;
  }
}

const alice = new Person('Alice', '123-45-6789');
console.log('WeakMap private data — ssn:', alice.getSSN());
console.log('SSN not on the object itself:', Object.keys(alice));

// ---------------------------------------------------------------
// 5. Generator function — function* with yield
// ---------------------------------------------------------------

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++; // Pause and return id, resume on next call
  }
}

const gen = idGenerator();
console.log('Generator yield:', gen.next().value); // 1
console.log('Generator yield:', gen.next().value); // 2
console.log('Generator yield:', gen.next().value); // 3

// Generator for custom iteration
function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}

console.log('Generator range:');
for (const n of range(1, 5)) {
  console.log('  ', n);
}

// ---------------------------------------------------------------
// 6. Proxy — intercept operations on an object
// ---------------------------------------------------------------

const target = {
  name: 'Alice',
  age: 25,
};

const handler = {
  // Trap property access
  get(obj, prop) {
    if (prop === 'age') {
      return obj[prop] + ' years old';
    }
    return obj[prop];
  },

  // Trap property assignment
  set(obj, prop, value) {
    if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new Error('Age must be a positive number');
    }
    obj[prop] = value;
    return true;
  },

  // Trap property existence check
  has(obj, prop) {
    if (prop === 'hiddenField') return false;
    return prop in obj;
  },

  // Trap property deletion
  deleteProperty(obj, prop) {
    if (prop === 'name') {
      throw new Error('Cannot delete name');
    }
    delete obj[prop];
    return true;
  },
};

const proxy = new Proxy(target, handler);
console.log('Proxy get age:', proxy.age); // '25 years old'
proxy.age = 30;
console.log('Proxy set age:', proxy.age); // '30 years old'
// proxy.age = -1; // Error: Age must be a positive number
console.log('Proxy has hiddenField:', 'hiddenField' in proxy); // false

// Proxy for validation
function createValidatedUser(data) {
  return new Proxy(data, {
    set(obj, prop, value) {
      if (prop === 'email' && !value.includes('@')) {
        throw new Error('Invalid email');
      }
      obj[prop] = value;
      return true;
    },
  });
}

const user = createValidatedUser({ email: 'test@example.com' });
console.log('Proxy validation works:', user.email);
// user.email = 'bademail'; // Error: Invalid email
