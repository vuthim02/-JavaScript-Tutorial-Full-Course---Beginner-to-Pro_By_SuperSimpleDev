# Level 37: Methods & the `this` Keyword

## Error Snippets (1-70)

### Error 1: Method called without object context
**Description:** Call the method on the object
```javascript
let obj = {
  name: 'Alice',
  greet() {
    console.log('Hello ' + this.name);
  }
};

let fn = obj.greet;
fn();
```

### Error 2: Losing this in nested function
**Description:** Use arrow function or capture this
```javascript
let obj = {
  name: 'Alice',
  greet() {
    function inner() {
      console.log('Hello ' + this.name);
    }
    inner();
  }
};

obj.greet();
```

### Error 3: Arrow function this in object method
**Description:** Use regular function for dynamic this
```javascript
let obj = {
  name: 'Alice',
  greet: () => {
    console.log('Hello ' + this.name);
  }
};

obj.greet();
```

### Error 4: This in event handler refers to element
**Description:** Use arrow function or bind
```javascript
let obj = {
  name: 'Alice',
  setup() {
    button.addEventListener('click', function() {
      console.log(this.name);
    });
  }
};
```

### Error 5: Method shorthand missing this
**Description:** Use this to access other properties
```javascript
let obj = {
  name: 'Alice',
  greet() {
    console.log('Hello ' + name);
  }
};
```

### Error 6: Forgot to call method
**Description:** Call the method with parentheses
```javascript
let obj = {
  greet() {
    return 'Hello';
  }
};

let message = obj.greet;
```

### Error 7: This in constructor without new
**Description:** Use new keyword when calling constructor
```javascript
function Person(name) {
  this.name = name;
}

let alice = Person('Alice');
console.log(alice.name);
```

### Error 8: This in static method
**Description:** Static method this refers to the class
```javascript
class MyClass {
  static greet() {
    console.log('Hello from ' + this.name);
  }
}

MyClass.greet();
```

### Error 9: Method assigned to variable loses this
**Description:** Bind the method when assigning
```javascript
let obj = {
  name: 'Alice',
  greet() {
    return 'Hi ' + this.name;
  }
};

let greetFn = obj.greet;
console.log(greetFn());
```

### Error 10: Calling prototype method on wrong object
**Description:** Call prototype method on correct instance
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return 'Hello ' + this.name;
};

let alice = new Person('Alice');
let method = Person.prototype.greet;
console.log(method());
```

### Error 11: This in setTimeout callback
**Description:** Use arrow function or bind for setTimeout
```javascript
let obj = {
  name: 'Alice',
  greet() {
    setTimeout(function() {
      console.log('Hello ' + this.name);
    }, 100);
  }
};

obj.greet();
```

### Error 12: Method chaining without returning this
**Description:** Return this from chainable methods
```javascript
let calc = {
  value: 0,
  add(n) {
    this.value += n;
  },
  multiply(n) {
    this.value *= n;
  }
};

calc.add(5).multiply(2);
```

### Error 13: This in arrow function cannot be bound
**Description:** Arrow functions ignore bind, call, apply
```javascript
let greet = () => {
  console.log('Hello ' + this.name);
};

let obj = { name: 'Alice' };
greet.call(obj);
```

### Error 14: This in class method destructured
**Description:** Keep method on instance when destructuring
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log('Hi ' + this.name);
  }
}

let { greet } = new Person('Alice');
greet();
```

### Error 15: Method overwritten with non-function
**Description:** Assign a function to the method
```javascript
let obj = {
  greet() {
    console.log('Hello');
  }
};

obj.greet = 'not a function';
obj.greet();
```

### Error 16: This in getter/setter
**Description:** Use this to access backing property
```javascript
let obj = {
  _name: 'Alice',
  get name() {
    return _name;
  },
  set name(val) {
    _name = val;
  }
};
```

### Error 17: Calling method on undefined object
**Description:** Check if object exists before calling method
```javascript
let obj = null;
obj.greet();
```

### Error 18: This in nested arrow methods
**Description:** Arrow functions inherit this from parent scope
```javascript
let obj = {
  name: 'Alice',
  outer() {
    let inner = () => {
      console.log(this.name);
    };
    inner();
  }
};

obj.outer();
```

### Error 19: Method name typo
**Description:** Use the correct method name
```javascript
let obj = {
  greet() {
    console.log('Hello');
  }
};

obj.gret();
```

### Error 20: Using this in static initializer
**Description:** Static blocks have their own scope
```javascript
class MyClass {
  static x = this.y;
  static y = 10;
}
```

### Error 21: This in module scope
**Description:** In modules, this is undefined
```javascript
console.log(this);
```

### Error 22: Method returns this but caller ignores
**Description:** Use the return value for chaining
```javascript
let obj = {
  value: 0,
  add(n) {
    this.value += n;
    return this;
  }
};

obj.add(5);
console.log(obj.value);
```

### Error 23: Bind with wrong this context
**Description:** Bind to the correct object
```javascript
function greet() {
  console.log('Hello ' + this.name);
}

let obj1 = { name: 'Alice' };
let obj2 = { name: 'Bob' };

let bound = greet.bind(obj1);
bound.call(obj2);
```

### Error 24: Apply with wrong arguments format
**Description:** Pass arguments as an array to apply
```javascript
function sum(a, b) {
  return a + b;
}

console.log(sum.apply(null, 5, 10));
```

### Error 25: Call with wrong argument list
**Description:** Pass arguments individually to call
```javascript
function sum(a, b) {
  return a + b;
}

console.log(sum.call(null, [5, 10]));
```

### Error 26: This in class field initializer
**Description:** Arrow function in class field captures this
```javascript
class MyClass {
  name = 'Alice';
  greet = () => {
    console.log('Hello ' + this.name);
  };
}
```

### Error 27: Missing this in method reference
**Description:** Use this to access the property
```javascript
let obj = {
  name: 'Alice',
  greet() {
    console.log('Hello ' + name);
  }
};
```

### Error 28: Private method this binding
**Description:** Private methods also need correct this
```javascript
class Person {
  #name = 'Alice';
  #greet() {
    console.log('Hi ' + this.#name);
  }
  greet() {
    const fn = this.#greet;
    fn();
  }
}
```

### Error 29: Proxy handler this issue
**Description:** Proxy handlers have their own this context
```javascript
let target = { name: 'Alice' };
let handler = {
  get(obj, prop) {
    return this[prop] || obj[prop];
  }
};

let proxy = new Proxy(target, handler);
console.log(proxy.name);
```

### Error 30: This in global scope
**Description:** In browsers, global this is window
```javascript
console.log(this === global);
```

### Error 31: Strict mode this in function
**Description:** In strict mode, this is undefined
```javascript
'use strict';

function show() {
  console.log(this);
}

show();
```

### Error 32: Method extracted from prototype
**Description:** Bind prototype method to instance
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return 'Hi ' + this.name;
};

let alice = new Person('Alice');
let greet = Person.prototype.greet;
console.log(greet());
```

### Error 33: This in tag function for template literal
**Description:** Tag functions have specific this
```javascript
function tag(strings, ...values) {
  return this.prefix + strings[0] + values[0];
}

let obj = { prefix: 'Hello ' };
let result = tag`World`;
```

### Error 34: Callback this in array methods
**Description:** Array methods accept thisArg
```javascript
let obj = {
  multiplier: 2,
  double(arr) {
    return arr.map(function(n) {
      return n * this.multiplier;
    });
  }
};
```

### Error 35: Redux-style reducer this
**Description:** Reducers should be pure functions, no this
```javascript
function reducer(state, action) {
  this.called = true;
  return state;
}
```

### Error 36: This in class getter
**Description:** Use this in getter to access instance properties
```javascript
class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }

  get fullName() {
    return first + ' ' + last;
  }
}
```

### Error 37: This in default parameter
**Description:** Default parameters have their own scope
```javascript
let obj = {
  name: 'Alice',
  greet(name = this.name) {
    console.log('Hello ' + name);
  }
};
```

### Error 38: Calling method on number/string
**Description:** Primitives auto-box when calling methods
```javascript
let num = 5;
num.toFixed(2);
```

### Error 39: This in class extends constructor
**Description:** Must call super before using this
```javascript
class Child extends Parent {
  constructor() {
    this.name = 'Child';
    super();
  }
}
```

### Error 40: Method added to object after creation
**Description:** Methods can be added after object creation
```javascript
let obj = {};
obj.greet();
```

### Error 41: This in function returned from function
**Description:** Returned functions have their own this
```javascript
function createLogger(prefix) {
  return function(message) {
    console.log(this.prefix + ': ' + message);
  };
}

let log = createLogger('INFO');
log('test');
```

### Error 42: Object method used as callback without bind
**Description:** Bind the method when passing as callback
```javascript
let obj = {
  name: 'Alice',
  greet() {
    console.log('Hello ' + this.name);
  }
};

document.addEventListener('click', obj.greet);
```

### Error 43: This in eval
**Description:** eval uses the calling context's this
```javascript
let obj = {
  name: 'Alice',
  greet() {
    eval("console.log(this.name)");
  }
};

obj.greet();
```

### Error 44: This with computed property name
**Description:** this in computed property keys refers to surrounding scope
```javascript
let obj = {
  name: 'Alice',
  ['greet_' + this.name]() {
    console.log('Hello');
  }
};
```

### Error 45: Bind chaining does not override
** Description:** Once bound, this cannot be overridden
```javascript
function greet() {
  console.log(this.name);
}

let obj1 = { name: 'Alice' };
let obj2 = { name: 'Bob' };

let bound = greet.bind(obj1);
let boundAgain = bound.bind(obj2);
boundAgain();
```

### Error 46: This in web workers
**Description:** In workers, this is the worker global
```javascript
self.onmessage = function() {
  console.log(this);
};
```

### Error 47: Missing return in method chain
**Description:** Return this from each method
```javascript
class Builder {
  constructor() {
    this.items = [];
  }
  add(item) {
    this.items.push(item);
  }
  build() {
    return this.items;
  }
}

let result = new Builder().add('a').add('b').build();
```

### Error 48: This with destructured method
**Description:** Destructuring a method loses this binding
```javascript
let obj = {
  name: 'Alice',
  greet() {
    return this.name;
  }
};

let { greet } = obj;
console.log(greet());
```

### Error 49: This in object inside class method
**Description:** Nested object methods have their own this
```javascript
class MyClass {
  constructor() {
    this.name = 'Alice';
    this.actions = {
      greet() {
        console.log('Hello ' + this.name);
      }
    };
  }
}
```

### Error 50: Method with same name as property
**Description:** Method and data property can't share name
```javascript
let obj = {
  name: 'Alice',
  name() {
    return this.name;
  }
};
```

### Error 51: This in async function
**Description:** Async functions have their own this context
```javascript
let obj = {
  name: 'Alice',
  async greet() {
    return 'Hello ' + this.name;
  }
};
```

### Error 52: This in generator function
**Description:** Generator functions preserve this
```javascript
let obj = {
  name: 'Alice',
  *greet() {
    yield 'Hello ' + this.name;
  }
};
```

### Error 53: Method reference with super
**Description:** super keyword works only in methods
```javascript
let obj = {
  name: 'Alice',
  greet() {
    console.log(super.name);
  }
};
```

### Error 54: This inside function expression in class
**Description:** Function expressions have their own this
```javascript
class MyClass {
  constructor() {
    this.name = 'Alice';
    this.greet = function() {
      console.log('Hello ' + this.name);
    };
  }
}
```

### Error 55: Calling method statically when not static
**Description:** Non-static methods need an instance
```javascript
class Person {
  greet() {
    return 'Hello';
  }
}

console.log(Person.greet());
```

### Error 56: This in Reflect.apply
**Description:** Reflect.apply can set this
```javascript
function greet() {
  console.log('Hello ' + this.name);
}

Reflect.apply(greet, null, []);
```

### Error 57: Bind with null this
**Description:** Binding to null uses global this
```javascript
'use strict';
function greet() {
  console.log(this);
}

let bound = greet.bind(null);
bound();
```

### Error 58: This in property value shorthand
**Description:** this in property values is evaluated at creation
```javascript
let obj = {
  name: 'Alice',
  self: this
};
```

### Error 59: Method called during object construction
**Description:** Calling method in constructor before initialization
```javascript
class MyClass {
  constructor() {
    this.init();
    this.name = 'Alice';
  }
  init() {
    console.log(this.name);
  }
}
```

### Error 60: This inside catch block
**Description:** catch blocks don't have their own this
```javascript
let obj = {
  name: 'Alice',
  greet() {
    try {
      throw 'error';
    } catch {
      console.log(this.name);
    }
  }
};
```

### Error 61: Calling method on frozen object
**Description:** Frozen objects can still have methods called
```javascript
let obj = Object.freeze({
  name: 'Alice',
  greet() {
    return 'Hi ' + this.name;
  }
});

obj.greet();
```

### Error 62: This in setInterval
**Description:** setInterval callback this is global
```javascript
let obj = {
  count: 0,
  start() {
    setInterval(function() {
      this.count++;
    }, 1000);
  }
};
```

### Error 63: Method defined with arrow in class
**Description:** Arrow class methods are on instance, not prototype
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  greet = () => {
    return 'Hello ' + this.name;
  };
}
```

### Error 64: This in nested objects with method
**Description:** this refers to the immediate object
```javascript
let outer = {
  name: 'outer',
  inner: {
    name: 'inner',
    greet() {
      console.log(this.name);
    }
  }
};

outer.inner.greet();
```

### Error 65: Method called as constructor
**Description:** Methods can be called with new
```javascript
let obj = {
  greet() {
    this.message = 'Hello';
  }
};

let instance = new obj.greet();
console.log(instance.message);
```

### Error 66: Undefined method called
**Description:** Call a method that exists on the object
```javascript
let obj = { name: 'Alice' };
obj.greet();
```

### Error 67: This inside class with private fields
**Description:** Private fields must be accessed with this
```javascript
class Person {
  #name = 'Alice';
  greet() {
    console.log('Hello ' + #name);
  }
}
```

### Error 68: Method as property getter shorthand
**Description:** Use get keyword for getters
```javascript
let obj = {
  name: 'Alice',
  getName() {
    return this.name;
  }
};
```

### Error 69: This in tail-call optimized function
**Description:** Tail call optimization preserves this
```javascript
function repeat(n, action) {
  if (n <= 0) return;
  action();
  return repeat(n - 1, action);
}

let obj = {
  count: 0,
  start() {
    repeat(5, function() {
      this.count++;
    });
  }
};
```

### Error 70: Object literal method vs class method this
**Description:** Class methods are strict by default
```javascript
class MyClass {
  greet() {
    console.log(this);
  }
}

let obj = {
  greet() {
    console.log(this);
  }
};
```

## Issue Snippets (1-30)

### Issue 1: Inconsistent method syntax
**Description:** Use method shorthand consistently
```javascript
let obj = {
  add: function(a, b) { return a + b; },
  subtract(a, b) { return a - b; },
  multiply: (a, b) => a * b
};
```

### Issue 2: Method does not use this
**Description:** Make it a standalone function or static
```javascript
let obj = {
  name: 'Alice',
  greet() {
    return 'Hello world';
  }
};
```

### Issue 3: Method modifies this properties without validation
**Description:** Add validation before updating properties
```javascript
let person = {
  name: 'Alice',
  setAge(age) {
    this._age = age;
  }
};
```

### Issue 4: Method with too many responsibilities
**Description:** Split into smaller methods
```javascript
let user = {
  process() {
    this.validate();
    this.save();
    this.sendEmail();
    this.logActivity();
    this.cleanup();
  }
};
```

### Issue 5: Method modifies global state
**Description:** Keep changes local to the object
```javascript
let counter = {
  count: 0,
  increment() {
    window.globalCount = this.count++;
  }
};
```

### Issue 6: Using function expression as method
**Description:** Use method shorthand
```javascript
let obj = {
  name: 'Alice',
  greet: function() {
    return 'Hello ' + this.name;
  }
};
```

### Issue 7: Method returning magic numbers
**Description:** Use named constants
```javascript
let config = {
  getTimeout() {
    return 5000;
  },
  getRetries() {
    return 3;
  }
};
```

### Issue 8: Chaining without returning this
**Description:** Return this from all chainable methods
```javascript
let query = {
  table: '',
  where: '',
  select(fields) {
    this.fields = fields;
  },
  from(table) {
    this.table = table;
  }
};
```

### Issue 9: Method called unnecessarily in loop
**Description:** Cache method result outside loop
```javascript
function processItems(items) {
  for (let item of items) {
    console.log(item.getName());
  }
}
```

### Issue 10: Not using optional chaining with method
**Description:** Use ?.() for optional method call
```javascript
if (obj.greet) {
  obj.greet();
}
```

### Issue 11: Getters and setters for every property
**Description:** Only use getters/setters when needed
```javascript
let person = {
  _name: 'Alice',
  get name() { return this._name; },
  set name(val) { this._name = val; },
  _age: 30,
  get age() { return this._age; },
  set age(val) { this._age = val; }
};
```

### Issue 12: Method name is too generic
**Description:** Use descriptive method names
```javascript
let api = {
  get() { return fetch('/data'); },
  set(data) { return fetch('/data', { method: 'POST', body: data }); }
};
```

### Issue 13: Method that returns different types
**Description:** Consistent return type
```javascript
let cache = {
  get(key) {
    if (this._data[key]) {
      return this._data[key];
    }
    return null;
  }
};
```

### Issue 14: Method with side effect inside conditional
**Description:** Separate side effects from conditions
```javascript
if (user.save() && user.sendEmail()) {
  console.log('Done');
}
```

### Issue 15: Not using private fields with class
**Description:** Use # private fields for internal state
```javascript
class Counter {
  constructor() {
    this._count = 0;
  }
  increment() { this._count++; }
}
```

### Issue 16: Method calls other methods with wrong context
**Description:** Ensure this is correct for internal calls
```javascript
let obj = {
  name: 'Alice',
  init() {
    setTimeout(function() {
      this.greet();
    }, 100);
  },
  greet() { console.log('Hi'); }
};
```

### Issue 17: Overwriting prototype methods
**Description:** Don't override built-in methods
```javascript
Array.prototype.push = function(item) {
  console.log('push called');
};
```

### Issue 18: Method with optional parameter no default
**Description:** Provide default parameters
```javascript
let logger = {
  log(message, level) {
    console.log(`[${level}] ${message}`);
  }
};
```

### Issue 19: Missing validation in setter
**Description:** Validate values in setter
```javascript
let person = {
  _age: 0,
  set age(val) {
    this._age = val;
  }
};
```

### Issue 20: Getter with side effects
**Description:** Getters should not have side effects
```javascript
let user = {
  get profile() {
    this.loadedCount++;
    return this._profile;
  }
};
```

### Issue 21: Method that could be static
**Description:** Use static for methods that don't use this
```javascript
class MathUtils {
  double(x) {
    return x * 2;
  }
}
```

### Issue 22: Arrow function as object method
**Description:** Use method shorthand for object methods
```javascript
let obj = {
  name: 'Alice',
  greet: () => {
    return 'Hello ' + this.name;
  }
};
```

### Issue 23: Method with unclear parameter names
**Description:** Use descriptive parameter names
```javascript
let calc = {
  add(x, y) { return x + y; }
};
```

### Issue 24: Inline method definition with this confusion
**Description:** Be explicit about this usage
```javascript
let obj = {
  name: 'Alice',
  init: (function() {
    return function() {
      console.log(this.name);
    };
  })()
};
```

### Issue 25: Method calling itself recursively without guard
**Description:** Add base case for recursive methods
```javascript
let counter = {
  countdown(n) {
    console.log(n);
    this.countdown(n - 1);
  }
};
```

### Issue 26: Not using bind in React-like pattern
**Description:** Bind methods or use arrow class fields
```javascript
class MyComponent {
  constructor() {
    this.name = 'Alice';
  }
  handleClick() {
    console.log(this.name);
  }
}
```

### Issue 27: Method depends on external state
**Description:** Pass external state as parameter
```javascript
class Timer {
  start() {
    this.startTime = Date.now();
  }
  getElapsed() {
    return Date.now() - this.startTime;
  }
}
```

### Issue 28: Long method name
**Description:** Use concise but clear names
```javascript
let api = {
  getAllActiveUsersFromDatabaseWithPagination() {
    // long method
  }
};
```

### Issue 29: Method with unreachable code
**Description:** Remove code after return statement
```javascript
let obj = {
  check(n) {
    if (n > 0) {
      return 'positive';
      console.log('checked');
    }
    return 'non-positive';
  }
};
```

### Issue 30: Not using nullish coalescing in method
**Description:** Use ?? for default values in methods
```javascript
let config = {
  get(key) {
    return this.settings[key] || 'default';
  }
};
```

## Modification Snippets (1-50)

### Modify 1: Add method to object
**Description:** Add a greet method to the person object
```javascript
let person = {
  name: 'Alice'
};
```

### Modify 2: Convert function to method
**Description:** Move the standalone function into the object as a method
```javascript
function greet() {
  return 'Hello ' + this.name;
}

let person = { name: 'Alice' };
```

### Modify 3: Use method shorthand
**Description:** Convert the function expression to method shorthand
```javascript
let obj = {
  greet: function() {
    return 'Hello';
  }
};
```

### Modify 4: Fix this in nested function
**Description:** Arrow function preserves this
```javascript
let obj = {
  name: 'Alice',
  greet() {
    function inner() {
      console.log(this.name);
    }
    inner();
  }
};
```

### Modify 5: Return this for chaining
**Description:** Return this from the add method
```javascript
let calc = {
  value: 0,
  add(n) {
    this.value += n;
  }
};
```

### Modify 6: Bind method for callback
**Description:** Use bind to preserve this in callback
```javascript
let obj = {
  name: 'Alice',
  setup() {
    button.addEventListener('click', this.handleClick);
  },
  handleClick() {
    console.log(this.name);
  }
};
```

### Modify 7: Add getter method
**Description:** Add a getter for full name
```javascript
let person = {
  first: 'Alice',
  last: 'Smith'
};
```

### Modify 8: Add setter with validation
**Description:** Add a setter that validates age is positive
```javascript
let person = {
  _age: 0
};
```

### Modify 9: Fix method call
**Description:** Call the method with parentheses
```javascript
let obj = {
  greet() { return 'Hello'; }
};

let message = obj.greet;
```

### Modify 10: Add static method
**Description:** Add a static method to the class
```javascript
class MathUtils {
  double(x) {
    return x * 2;
  }
}
```

### Modify 11: Convert arrow to method
**Description:** Change arrow function to method shorthand
```javascript
let obj = {
  name: 'Alice',
  greet: () => {
    return 'Hello ' + this.name;
  }
};
```

### Modify 12: Add method to prototype
**Description:** Add a greet method to Person prototype
```javascript
function Person(name) {
  this.name = name;
}

let alice = new Person('Alice');
```

### Modify 13: Use call to set this
**Description:** Use call to invoke function with specific this
```javascript
function greet() {
  return 'Hello ' + this.name;
}

let person = { name: 'Alice' };
```

### Modify 14: Use apply to set this with arguments
**Description:** Use apply to call the function with array arguments
```javascript
function sum(a, b) {
  return a + b;
}

let result = sum(5, 10);
```

### Modify 15: Use bind to create bound function
**Description:** Create a bound version of the function
```javascript
function greet() {
  return 'Hello ' + this.name;
}

let person = { name: 'Alice' };
```

### Modify 16: Add private method with #
**Description:** Make the helper method private
```javascript
class MyClass {
  helper() {
    return 'private';
  }
  publicMethod() {
    return this.helper();
  }
}
```

### Modify 17: Extract method from large function
**Description:** Extract the validation logic into its own method
```javascript
class User {
  constructor(data) {
    if (!data.name) throw 'Name required';
    if (!data.email) throw 'Email required';
    this.name = data.name;
    this.email = data.email;
  }
}
```

### Modify 18: Add method delegation
**Description:** Delegate greet call to the nested object
```javascript
let person = {
  name: 'Alice',
  details: {
    greet() {
      return 'Hello';
    }
  }
};
```

### Modify 19: Convert standalone function to class method
**Description:** Move the function into the class
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

function greet() {
  return 'Hello ' + this.name;
}
```

### Modify 20: Fix setTimeout this
**Description:** Use arrow function to preserve this
```javascript
let obj = {
  name: 'Alice',
  greet() {
    setTimeout(function() {
      console.log(this.name);
    }, 100);
  }
};
```

### Modify 21: Add method to check property
**Description:** Add a method that checks if a property exists
```javascript
let person = {
  name: 'Alice',
  age: 30
};
```

### Modify 22: Add chainable setter
**Description:** Return this from setName
```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  setName(name) {
    this.name = name;
  }
}
```

### Modify 23: Add method default parameter
**Description:** Add default value for the method parameter
```javascript
let logger = {
  log(message, level) {
    console.log(`[${level}] ${message}`);
  }
};
```

### Modify 24: Fix method reference in destructuring
**Description:** Bind the method before destructuring
```javascript
let obj = {
  name: 'Alice',
  greet() {
    console.log('Hello ' + this.name);
  }
};

let { greet } = obj;
greet();
```

### Modify 25: Add getter for computed property
**Description:** Add a getter that returns years since creation
```javascript
let project = {
  name: 'App',
  created: 2020
};
```

### Modify 26: Convert to class with methods
**Description:** Convert the object to a class
```javascript
let calculator = {
  value: 0,
  add(n) { this.value += n; },
  getResult() { return this.value; }
};
```

### Modify 27: Add async method
**Description:** Make the fetchData method async
```javascript
let api = {
  fetchData() {
    return fetch('/data').then(r => r.json());
  }
};
```

### Modify 28: Add error handling to method
**Description:** Wrap the method body in try-catch
```javascript
let parser = {
  parseJSON(str) {
    return JSON.parse(str);
  }
};
```

### Modify 29: Add method overload simulation
**Description:** Handle both string and number inputs
```javascript
let formatter = {
  format(input) {
    return input.toString();
  }
};
```

### Modify 30: Add decorator method
**Description:** Add a method that wraps another method
```javascript
class Service {
  getData() {
    return fetch('/data');
  }
}
```

### Modify 31: Add cached method result
**Description:** Cache the result of the expensive method
```javascript
class DataLoader {
  load(key) {
    return fetch('/data/' + key);
  }
}
```

### Modify 32: Add method for deep merge
**Description:** Add a merge method that deeply merges objects
```javascript
let utils = {
};
```

### Modify 33: Add pipe method
**Description:** Add a method that chains transformations
```javascript
class Pipeline {
  constructor(value) {
    this.value = value;
  }
}
```

### Modify 34: Add tap method for debugging
**Description:** Add a tap method that logs and passes through
```javascript
class Stream {
  constructor(data) {
    this.data = data;
  }
}
```

### Modify 35: Convert to method with rest params
**Description:** Accept variable arguments in the method
```javascript
let math = {
  add(a, b) {
    return a + b;
  }
};
```

### Modify 36: Add method using Symbol.iterator
**Description:** Make the object iterable
```javascript
let range = {
  start: 0,
  end: 5
};
```

### Modify 37: Add clone method
**Description:** Add a method that returns a shallow clone
```javascript
class Config {
  constructor(settings) {
    this.settings = settings;
  }
}
```

### Modify 38: Add toJSON method
**Description:** Customize JSON serialization
```javascript
class Person {
  constructor(name, secret) {
    this.name = name;
    this.secret = secret;
  }
}
```

### Modify 39: Add equals method
**Description:** Add a method to compare objects by value
```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

### Modify 40: Add method for copy with changes
**Description:** Return a new object with updated property
```javascript
class User {
  constructor(data) {
    Object.assign(this, data);
  }
}
```

### Modify 41: Add accessor for private state
**Description:** Add a getter for the private _count
```javascript
class Counter {
  constructor() {
    this._count = 0;
  }
  increment() { this._count++; }
}
```

### Modify 42: Add method that throws custom error
**Description:** Throw a typed error from the method
```javascript
class Validator {
  check(name) {
    if (!name) throw 'Name required';
  }
}
```

### Modify 43: Add memoized method
**Description:** Cache method results by argument
```javascript
class Fibonacci {
  compute(n) {
    if (n <= 1) return n;
    return this.compute(n - 1) + this.compute(n - 2);
  }
}
```

### Modify 44: Add retry method wrapper
**Description:** Add a method that retries on failure
```javascript
class ApiClient {
  async fetch(url) {
    return fetch(url).then(r => r.json());
  }
}
```

### Modify 45: Add debounced method
**Description:** Return a debounced version of the method
```javascript
class Search {
  query(text) {
    console.log('Searching', text);
  }
}
```

### Modify 46: Add throttled method
**Description:** Return a throttled version of the method
```javascript
class Scroller {
  onScroll() {
    console.log('scrolled');
  }
}
```

### Modify 47: Add method using Proxy
**Description:** Use Proxy to intercept method calls
```javascript
class Service {
  getData() { return 'data'; }
  saveData(d) { return 'saved'; }
}
```

### Modify 48: Add mixin method
**Description:** Copy methods from another object
```javascript
let canEat = {
  eat() { console.log('eating'); }
};

let person = { name: 'Alice' };
```

### Modify 49: Add fluent interface
**Description:** Make all setters return this
```javascript
class EmailBuilder {
  constructor() {
    this._to = '';
    this._subject = '';
    this._body = '';
  }
  setTo(email) { this._to = email; }
  setSubject(subj) { this._subject = subj; }
  setBody(body) { this._body = body; }
}
```

### Modify 50: Add method validation decorator
**Description:** Add validation check before method execution
```javascript
class Account {
  withdraw(amount) {
    this.balance -= amount;
  }
}
```
