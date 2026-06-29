# Level 57: Anonymous & Arrow Functions

## Challenges 1-70: Error Snippets

### Error 1: Arrow Function this Binding
**Description:** Use arrow function for object method
```javascript
const obj = {
  name: 'Alice',
  greet: () => {
    console.log('Hello ' + this.name);
  }
};
obj.greet();
```

### Error 2: Arrow Return Object
**Description:** Return object from arrow function
```javascript
const makePoint = (x, y) => {x, y};
console.log(makePoint(10, 20));
```

### Error 3: Arrow Function in Constructor
**Description:** Use arrow as constructor
```javascript
const Person = (name) => {
  this.name = name;
};
const p = new Person('Alice');
```

### Error 4: Arrow and arguments Object
**Description:** Access arguments inside arrow
```javascript
const sum = () => {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
};
console.log(sum(1, 2, 3));
```

### Error 5: Arrow Function for addEventListener
**Description:** Remove event listener with arrow
```javascript
const button = { onClick: null };
button.addEventListener = function(evt, fn) { this.onClick = fn; };
button.removeEventListener = function(evt, fn) { this.onClick = null; };
const handler = () => console.log('clicked');
button.addEventListener('click', handler);
button.removeEventListener('click', handler);
button.onClick && button.onClick();
```

### Error 6: Arrow in Object Literal
**Description:** Create object method with arrow
```javascript
const counter = {
  count: 0,
  increment: () => {
    this.count++;
  }
};
counter.increment();
console.log(counter.count);
```

### Error 7: Anonymous Function Recursion
**Description:** Recursively call anonymous function
```javascript
const factorial = function(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
};
console.log(factorial(5));
```

### Error 8: Arrow with Block Body Return
**Description:** Use block body without return
```javascript
const nums = [1, 2, 3];
const doubled = nums.map(n => {
  n * 2;
});
console.log(doubled);
```

### Error 9: Arrow Function Hoisting
**Description:** Call arrow before declaration
```javascript
console.log(double(5));
const double = (n) => n * 2;
```

### Error 10: Anonymous Function in Loop
**Description:** Create functions in loop with var
```javascript
const funcs = [];
for (var i = 0; i < 3; i++) {
  funcs.push(function() { console.log(i); });
}
funcs[0]();
```

### Error 11: Arrow Function with New
**Description:** Use new with arrow function
```javascript
const Foo = () => {};
const f = new Foo();
```

### Error 12: Arrow and Prototype
**Description:** Add method to prototype with arrow
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = () => {
  console.log('Hello ' + this.name);
};
const p = new Person('Alice');
p.greet();
```

### Error 13: Anonymous Function Name
**Description:** Get name of anonymous function
```javascript
const fn = function() {};
console.log(fn.name);
```

### Error 14: Arrow in setTimeout this
**Description:** Use this in setTimeout callback
```javascript
const obj = {
  name: 'Alice',
  delayed: function() {
    setTimeout(function() {
      console.log(this.name);
    }, 100);
  }
};
obj.delayed();
```

### Error 15: Arrow with Default Parameters
**Description:** Arrow with default parameter
```javascript
const greet = (name = 'Guest') => 'Hello ' + name;
console.log(greet());
```

### Error 16: Arrow in Array Method Context
**Description:** Use this in arrow inside array method
```javascript
const obj = {
  multiplier: 2,
  double: function(arr) {
    return arr.map(n => n * this.multiplier);
  }
};
console.log(obj.double([1, 2, 3]));
```

### Error 17: Anonymous IIFE
**Description:** Immediately invoke anonymous function
```javascript
(function() {
  console.log('IIFE');
})();
```

### Error 18: Arrow with Line Break
**Description:** Arrow function with line break before arrow
```javascript
const fn = (a, b)
=> a + b;
console.log(fn(1, 2));
```

### Error 19: Arrow in Conditional
**Description:** Ternary returning arrow
```javascript
const fn = true ? () => 'yes' : () => 'no';
console.log(fn());
```

### Error 20: Anonymous Function in Reduce
**Description:** Use anonymous function in reduce
```javascript
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce(function(a, b) { return a + b; }, 0);
console.log(sum);
```

### Error 21: Arrow Function Multiple Statements
**Description:** Multiple statements in arrow without block
```javascript
const process = (n) => console.log(n); return n * 2;
console.log(process(5));
```

### Error 22: Arrow Function as Getter
**Description:** Use arrow as object getter
```javascript
const obj = {
  name: 'Alice',
  get upperName: () => this.name.toUpperCase()
};
console.log(obj.upperName);
```

### Error 23: Anonymous Function with Bind
**Description:** Bind anonymous function
```javascript
function greet() {
  console.log('Hello ' + this.name);
}
const obj = {name: 'Alice'};
const bound = greet.bind(obj);
bound();
```

### Error 24: Arrow Rest Parameters
**Description:** Rest params with arrow
```javascript
const sum = (...args) => args.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3, 4));
```

### Error 25: Arrow Function Methods Call
**Description:** Call arrow method indirectly
```javascript
const obj = {
  name: 'Alice',
  greet: () => 'Hello ' + this.name
};
const {greet} = obj;
console.log(greet());
```

### Error 26: Anonymous Callback Not Function
**Description:** Check anonymous function type
```javascript
function run(fn) {
  if (typeof fn === 'function') fn();
}
run(() => console.log('runs'));
```

### Error 27: Arrow in Object DefineProperty
**Description:** Use arrow in defineProperty getter
```javascript
const obj = {};
Object.defineProperty(obj, 'name', {
  get: () => this.name
});
obj.name = 'test';
console.log(obj.name);
```

### Error 28: Arrow with Conditional Return
**Description:** Arrow returning conditional
```javascript
const max = (a, b) => a > b ? a : b;
console.log(max(5, 3));
```

### Error 29: Anonymous Function in Promise
**Description:** Use anonymous in promise chain
```javascript
Promise.resolve(42)
  .then(function(v) { return v * 2; })
  .then(function(v) { console.log(v); });
```

### Error 30: Arrow Parenthesized Body
**Description:** Arrow returning object literal
```javascript
const getObj = () => ({name: 'Alice', age: 30});
console.log(getObj());
```

### Error 31: Arrow with Spread Operator
**Description:** Use spread in arrow params
```javascript
const merge = (a, ...rest) => [a, ...rest];
console.log(merge(1, 2, 3, 4));
```

### Error 32: Anonymous Recursion with Callee
**Description:** Use arguments.callee in anonymous
```javascript
const factorial = function(n) {
  return n <= 1 ? 1 : n * arguments.callee(n - 1);
};
console.log(factorial(5));
```

### Error 33: Arrow in Class
**Description:** Arrow function as class method
```javascript
class Person {
  constructor(name) { this.name = name; }
  greet = () => console.log('Hello ' + this.name);
}
const p = new Person('Alice');
p.greet();
```

### Error 34: Arrow with Destructuring
**Description:** Arrow with destructured params
```javascript
const sum = ({a, b}) => a + b;
console.log(sum({a: 5, b: 3}));
```

### Error 35: Anonymous Function in forEach
**Description:** Anonymous forEach callback
```javascript
[1, 2, 3].forEach(function(n) {
  console.log(n);
});
```

### Error 36: Arrow Function Tagged Template
**Description:** Arrow as tagged template literal
```javascript
const tag = (strings, ...values) => strings[0] + values[0];
const result = tag`Hello ${'world'}`;
console.log(result);
```

### Error 37: Arrow with Void
**Description:** Arrow that returns undefined
```javascript
const log = (msg) => console.log(msg);
const result = log('test');
console.log(result);
```

### Error 38: Anonymous Function Scope
**Description:** Anonymous function variable scope
```javascript
const x = 10;
const fn = function() {
  console.log(x);
};
fn();
```

### Error 39: Arrow Wrapping Number
**Description:** Arrow returning number in parens
```javascript
const getFive = () => (5);
console.log(getFive());
```

### Error 40: Anonymous Generator Function
**Description:** Anonymous generator expression
```javascript
const gen = function*() {
  yield 1;
  yield 2;
};
console.log(gen().next().value);
```

### Error 41: Arrow with Boolean Return
**Description:** Arrow returning boolean
```javascript
const isEven = n => n % 2 === 0;
console.log(isEven(4));
```

### Error 42: Arrow Async Function
**Description:** Async arrow function
```javascript
const fetchData = async () => {
  return 'data';
};
fetchData().then(console.log);
```

### Error 43: Anonymous Function with New.target
**Description:** Use new.target in anonymous
```javascript
function Person(name) {
  if (!new.target) return new Person(name);
  this.name = name;
}
const p = Person('Alice');
console.log(p.name);
```

### Error 44: Arrow in Array.from Map
**Description:** Arrow in Array.from
```javascript
const arr = Array.from({length: 5}, (_, i) => i * 2);
console.log(arr);
```

### Error 45: Anonymous Function as Property
**Description:** Anonymous function as object property
```javascript
const obj = {
  greet: function() {
    console.log('Hello');
  }
};
obj.greet();
```

### Error 46: Arrow with null/undefined
**Description:** Arrow called with null
```javascript
const fn = (x) => x * 2;
console.log(fn(null));
```

### Error 47: Anonymous Function in Set
**Description:** Store function in Set
```javascript
const set = new Set();
const fn1 = function() {};
const fn2 = function() {};
set.add(fn1);
set.add(fn2);
console.log(set.size);
```

### Error 48: Arrow Method Call on Object
**Description:** Method call on arrow function result
```javascript
const create = () => ({log: () => console.log('hi')});
create().log();
```

### Error 49: Anonymous with Call
**Description:** Anonymous function with call
```javascript
const obj = {name: 'Alice'};
(function() {
  console.log(this.name);
}).call(obj);
```

### Error 50: Arrow Return from Map
**Description:** Arrow implicit return in map
```javascript
const nums = [1, 2, 3];
const result = nums.map(n => n * 2);
console.log(result);
```

### Error 51: Anonymous Function Debug
**Description:** Debug anonymous function
```javascript
const fn = function() {
  debugger;
};
fn();
```

### Error 52: Arrow with Template Literal
**Description:** Template literal in arrow
```javascript
const greet = name => `Hello ${name}`;
console.log(greet('Alice'));
```

### Error 53: Anonymous vs Named in Stack Trace
**Description:** Named function in stack trace
```javascript
const fn = function myName() {
  throw new Error('fail');
};
try { fn(); } catch (e) { console.log(e.stack); }
```

### Error 54: Arrow in Object.assign
**Description:** Arrow in Object.assign
```javascript
const obj = {};
Object.assign(obj, {fn: () => console.log('hi')});
obj.fn();
```

### Error 55: Anonymous Function Immediately Invoked
**Description:** IIFE with anonymous
```javascript
(function(x) {
  console.log(x);
})(5);
```

### Error 56: Arrow Dynamic Property
**Description:** Arrow in computed property
```javascript
const key = 'greet';
const obj = {
  [key]: () => console.log('Hello')
};
obj.greet();
```

### Error 57: Anonymous Function in Filter
**Description:** Anonymous filter callback
```javascript
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(function(n) { return n % 2 === 0; });
console.log(evens);
```

### Error 58: Arrow with Logical OR
**Description:** Arrow using logical OR
```javascript
const getName = (name) => name || 'Guest';
console.log(getName(''));
```

### Error 59: Anonymous Function Hoisting Var
**Description:** Var with anonymous function
```javascript
console.log(fn);
var fn = function() {};
```

### Error 60: Arrow with Comma Operator
**Description:** Comma in arrow body
```javascript
const fn = (x) => (console.log(x), x * 2);
console.log(fn(5));
```

### Error 61: Anonymous Recursion with Name
**Description:** Named function expression for recursion
```javascript
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};
console.log(factorial(5));
```

### Error 62: Arrow with Optional Chaining
**Description:** Optional chaining with arrow
```javascript
const obj = null;
const fn = (o) => o?.name;
console.log(fn(obj));
```

### Error 63: Anonymous Function in WeakMap
**Description:** Function as WeakMap key
```javascript
const wm = new WeakMap();
const fn = function() {};
wm.set(fn, 'value');
console.log(wm.get(fn));
```

### Error 64: Arrow with Nullish Coalescing
**Description:** Arrow using nullish coalescing
```javascript
const getValue = (v) => v ?? 'default';
console.log(getValue(0));
```

### Error 65: Anonymous Filter Map Chain
**Description:** Chain with anonymous functions
```javascript
const nums = [1, 2, 3, 4, 5];
const result = nums
  .filter(function(n) { return n > 2; })
  .map(function(n) { return n * 3; });
console.log(result);
```

### Error 66: Arrow Prototype Method
**Description:** Arrow as prototype method
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = () => 'Hello ' + this.name;
const p = new Person('Alice');
console.log(p.greet());
```

### Error 67: Anonymous Async IIFE
**Description:** Async IIFE
```javascript
(async function() {
  const data = await Promise.resolve('data');
  console.log(data);
})();
```

### Error 68: Arrow with Destructuring Defaults
**Description:** Arrow params with defaults destructuring
```javascript
const fn = ({name = 'Guest'} = {}) => 'Hello ' + name;
console.log(fn());
```

### Error 69: Anonymous Function toString
**Description:** Anonymous function toString
```javascript
const fn = function() { return 42; };
console.log(fn.toString());
```

### Error 70: Arrow in EventEmitter
**Description:** Arrow as event listener
```javascript
const emitter = {
  handlers: [],
  on(fn) { this.handlers.push(fn); },
  emit() { this.handlers.forEach(fn => fn()); }
};
emitter.on(() => console.log('event'));
emitter.emit();
```

## Challenges 71-100: Issue Snippets

### Issue 1: Anonymous Function for Short Callback
**Description:** Use named function unnecessarily
```javascript
const nums = [1, 2, 3];
function double(n) { return n * 2; }
const doubled = nums.map(double);
console.log(doubled);
```

### Issue 2: Arrow Lacks Block for Side Effects
**Description:** Arrow with side effects in expression body
```javascript
const nums = [1, 2, 3];
nums.forEach(n => console.log(n));
```

### Issue 3: Anonymous Function for Simple Predicate
**Description:** Named function for simple predicate
```javascript
function isEven(n) { return n % 2 === 0; }
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(isEven);
console.log(evens);
```

### Issue 4: Arrow with Too Many Braces
**Description:** Unnecessary block body in arrow
```javascript
const add = (a, b) => {
  return a + b;
};
console.log(add(3, 4));
```

### Issue 5: Anonymous Function for Sort
**Description:** Sort with anonymous function
```javascript
const nums = [3, 1, 4, 1, 5];
nums.sort(function(a, b) { return a - b; });
console.log(nums);
```

### Issue 6: Arrow Without Parentheses (Single Param)
**Description:** Single param without parens
```javascript
const double = n => n * 2;
console.log(double(5));
```

### Issue 7: Anonymous for forEach
**Description:** forEach with anonymous
```javascript
const items = ['a', 'b', 'c'];
items.forEach(function(item) {
  console.log(item);
});
```

### Issue 8: Arrow for Complex Logic
**Description:** Arrow with complex block body
```javascript
const process = (items) => {
  const filtered = items.filter(n => n > 0);
  const doubled = filtered.map(n => n * 2);
  return doubled.reduce((a, b) => a + b, 0);
};
console.log(process([1, -2, 3, -4, 5]));
```

### Issue 9: Anonymous for Reduce Initial Value
**Description:** Reduce with anonymous function
```javascript
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce(function(a, b) {
  return a + b;
}, 0);
console.log(sum);
```

### Issue 10: Arrow Nested Too Deep
**Description:** Nested arrow functions
```javascript
const result = [1, 2, 3]
  .map(n => n * 2)
  .filter(n => n > 3)
  .reduce((a, b) => a + b, 0);
console.log(result);
```

### Issue 11: Anonymous for Map
**Description:** Map with anonymous
```javascript
const names = ['Alice', 'Bob'];
const upper = names.map(function(n) {
  return n.toUpperCase();
});
console.log(upper);
```

### Issue 12: Arrow in Object Returning this
**Description:** Arrow in object method returning this
```javascript
const obj = {
  count: 0,
  increment: () => {
    this.count++;
  }
};
```

### Issue 13: Anonymous for Filter with Index
**Description:** Filter with index using anonymous
```javascript
const arr = ['a', 'b', 'c', 'd'];
const filtered = arr.filter(function(_, i) {
  return i % 2 === 0;
});
console.log(filtered);
```

### Issue 14: Arrow with Destructuring in Params
**Description:** Arrow destructuring param
```javascript
const users = [{name: 'Alice'}, {name: 'Bob'}];
const names = users.map(({name}) => name);
console.log(names);
```

### Issue 15: Anonymous Callback in setTimeout
**Description:** setTimeout with anonymous
```javascript
setTimeout(function() {
  console.log('delayed');
}, 1000);
```

### Issue 16: Arrow vs Function in Mocha
**Description:** Arrow in test suite
```javascript
describe('test', () => {
  it('should work', () => {
    console.log('testing');
  });
});
```

### Issue 17: Anonymous for Event Listener
**Description:** Anonymous event listener
```javascript
document.addEventListener('click', function() {
  console.log('clicked');
});
```

### Issue 18: Arrow with Multiple Params No Parens
**Description:** Multiple params without parens
```javascript
const add = (a, b) => a + b;
console.log(add(3, 4));
```

### Issue 19: Anonymous for Promise Then
**Description:** Anonymous in promise
```javascript
Promise.resolve(42)
  .then(function(v) { return v + 1; })
  .then(function(v) { console.log(v); });
```

### Issue 20: Arrow with Ternary
**Description:** Arrow returning ternary
```javascript
const classify = n => n >= 0 ? 'positive' : 'negative';
console.log(classify(-5));
```

### Issue 21: Anonymous for setInterval
**Description:** setInterval with anonymous
```javascript
setInterval(function() {
  console.log('tick');
}, 1000);
```

### Issue 22: Arrow for Short Callback
**Description:** Short arrow callback
```javascript
const nums = [1, 2, 3, 4, 5];
const even = nums.filter(n => n % 2 === 0);
console.log(even);
```

### Issue 23: Anonymous Generator
**Description:** Anonymous generator function
```javascript
const gen = function*() {
  yield 1;
  yield 2;
};
for (const v of gen()) console.log(v);
```

### Issue 24: Arrow with Short Body vs Block
**Description:** Inconsistent arrow body style
```javascript
const f1 = n => n + 1;
const f2 = n => { return n + 1; };
```

### Issue 25: Anonymous Async
**Description:** Anonymous async function
```javascript
const load = async function() {
  return await Promise.resolve('data');
};
load().then(console.log);
```

### Issue 26: Arrow for Reduce Expression
**Description:** Arrow in reduce
```javascript
const nums = [1, 2, 3, 4, 5];
const product = nums.reduce((a, b) => a * b, 1);
console.log(product);
```

### Issue 27: Anonymous for Array.from
**Description:** Array.from with anonymous
```javascript
const arr = Array.from({length: 5}, function(_, i) {
  return i * 2;
});
console.log(arr);
```

### Issue 28: Arrow IIFE
**Description:** Arrow IIFE
```javascript
(() => {
  console.log('IIFE arrow');
})();
```

### Issue 29: Anonymous for flatMap
**Description:** flatMap with anonymous
```javascript
const words = ['hi', 'bye'];
const chars = words.flatMap(function(w) {
  return w.split('');
});
console.log(chars);
```

### Issue 30: Arrow with Negation
**Description:** Arrow with boolean negation
```javascript
const isOdd = n => !(n % 2 === 0);
console.log(isOdd(3));
```

## Challenges 101-150: Modification Snippets

### Modify 1: Convert to Arrow Function
**Description:** Refactor regular function to arrow
```javascript
function double(n) {
  return n * 2;
}
console.log(double(5));
```

### Modify 2: Add Arrow for Short Callback
**Description:** Use arrow in map callback
```javascript
const nums = [1, 2, 3];
const doubled = nums.map(function(n) {
  return n * 2;
});
console.log(doubled);
```

### Modify 3: Convert to Implicit Return
**Description:** Use implicit return in arrow
```javascript
const add = (a, b) => {
  return a + b;
};
console.log(add(3, 4));
```

### Modify 4: Add Arrow for Filter
**Description:** Convert filter callback to arrow
```javascript
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(function(n) {
  return n % 2 === 0;
});
console.log(evens);
```

### Modify 5: Refactor to Arrow with this Binding
**Description:** Fix this binding with arrow
```javascript
const obj = {
  name: 'Alice',
  greet: function() {
    setTimeout(function() {
      console.log('Hello ' + this.name);
    }, 100);
  }
};
obj.greet();
```

### Modify 6: Add Arrow for forEach
**Description:** Convert forEach to arrow
```javascript
const colors = ['red', 'green', 'blue'];
colors.forEach(function(color) {
  console.log(color);
});
```

### Modify 7: Convert to Single Param No Parens
**Description:** Remove parens from single param arrow
```javascript
const double = (n) => n * 2;
console.log(double(5));
```

### Modify 8: Add Arrow Return Object
**Description:** Return object from arrow correctly
```javascript
const makePoint = (x, y) => {
  return {x: x, y: y};
};
console.log(makePoint(10, 20));
```

### Modify 9: Refactor to Arrow in setTimeout
**Description:** Use arrow in setTimeout
```javascript
setTimeout(function() {
  console.log('Delayed');
}, 1000);
```

### Modify 10: Add Arrow for Reduce
**Description:** Convert reduce callback to arrow
```javascript
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce(function(a, b) {
  return a + b;
}, 0);
console.log(sum);
```

### Modify 11: Convert to Arrow with Block
**Description:** Arrow with block body for multiple statements
```javascript
const process = n => n * 2;
const nums = [1, 2, 3];
nums.forEach(n => console.log(process(n)));
```

### Modify 12: Add Arrow for Some/Every
**Description:** Use arrow for some/every
```javascript
const nums = [1, 2, 3, 4, 5];
const hasEven = nums.some(function(n) {
  return n % 2 === 0;
});
console.log(hasEven);
```

### Modify 13: Refactor to Arrow Method
**Description:** Use arrow for class property
```javascript
class Button {
  constructor(label) {
    this.label = label;
  }
  click() {
    console.log('Clicked ' + this.label);
  }
}
const btn = new Button('Submit');
btn.click();
```

### Modify 14: Add Arrow for Sort
**Description:** Arrow sort comparator
```javascript
const nums = [3, 1, 4, 1, 5];
nums.sort(function(a, b) {
  return a - b;
});
console.log(nums);
```

### Modify 15: Convert to Arrow in Promise
**Description:** Arrow in promise chain
```javascript
Promise.resolve(42)
  .then(function(v) { return v * 2; })
  .then(function(v) { console.log(v); });
```

### Modify 16: Add Arrow for Find
**Description:** Arrow in find callback
```javascript
const users = [
  {name: 'Alice', age: 25},
  {name: 'Bob', age: 30}
];
const found = users.find(function(u) {
  return u.age > 28;
});
console.log(found);
```

### Modify 17: Refactor to Arrow in addEventListener
**Description:** Arrow as event listener
```javascript
const button = document.createElement('button');
button.addEventListener('click', function() {
  console.log('clicked');
});
```

### Modify 18: Add Arrow for flatMap
**Description:** Arrow in flatMap
```javascript
const sentences = ['hello world', 'foo bar'];
const words = sentences.flatMap(function(s) {
  return s.split(' ');
});
console.log(words);
```

### Modify 19: Convert to Arrow with Destructuring
**Description:** Arrow with destructured params
```javascript
const fullName = function(person) {
  return person.first + ' ' + person.last;
};
console.log(fullName({first: 'Alice', last: 'Smith'}));
```

### Modify 20: Add Arrow IIFE
**Description:** Convert to arrow IIFE
```javascript
(function() {
  console.log('IIFE');
})();
```

### Modify 21: Refactor to Arrow for Conciseness
**Description:** Make callback more concise with arrow
```javascript
const names = ['Alice', 'Bob', 'Charlie'];
const upper = names.map(function(name) {
  return name.toUpperCase();
});
console.log(upper);
```

### Modify 22: Add Arrow with Rest Params
**Description:** Arrow with rest parameters
```javascript
function sum() {
  return Array.from(arguments).reduce(function(a, b) {
    return a + b;
  }, 0);
}
console.log(sum(1, 2, 3, 4, 5));
```

### Modify 23: Convert to Arrow for Chain
**Description:** Arrow in method chain
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const result = nums
  .filter(function(n) { return n % 2 === 0; })
  .map(function(n) { return n * 3; })
  .reduce(function(a, b) { return a + b; }, 0);
console.log(result);
```

### Modify 24: Add Arrow for Short Predicate
**Description:** Arrow predicate
```javascript
const isPositive = function(n) {
  return n > 0;
};
console.log([1, -2, 3].filter(isPositive));
```

### Modify 25: Refactor to One-Liner Arrow
**Description:** Convert to one-line arrow
```javascript
const greet = function(name) {
  return 'Hello ' + name;
};
console.log(greet('Alice'));
```

### Modify 26: Add Arrow for Event Handler
**Description:** Arrow event handler preserving this
```javascript
class Component {
  constructor() {
    this.count = 0;
  }
  handleClick() {
    this.count++;
  }
}
const comp = new Component();
document.addEventListener('click', comp.handleClick);
```

### Modify 27: Convert to Arrow with Template
**Description:** Arrow returning template literal
```javascript
function createMessage(name, item) {
  return name + ' bought ' + item;
}
console.log(createMessage('Alice', 'book'));
```

### Modify 28: Add Arrow for findIndex
**Description:** Arrow in findIndex
```javascript
const arr = [10, 20, 30, 40];
const idx = arr.findIndex(function(n) {
  return n > 25;
});
console.log(idx);
```

### Modify 29: Refactor to Arrow Async
**Description:** Async arrow function
```javascript
async function fetchData() {
  return await fetch('/api/data');
}
fetchData().then(console.log);
```

### Modify 30: Add Arrow in Array.from
**Description:** Arrow in Array.from map
```javascript
const arr = Array.from({length: 5}, function(_, i) {
  return i * i;
});
console.log(arr);
```

### Modify 31: Convert to Arrow for Side Effects
**Description:** Arrow with side effects
```javascript
const items = ['A', 'B', 'C'];
items.forEach(function(item) {
  console.log('Processing: ' + item);
});
```

### Modify 32: Add Arrow in Object Method
**Description:** Arrow as object method
```javascript
const obj = {
  name: 'Alice',
  greet: function() {
    return 'Hello ' + this.name;
  }
};
console.log(obj.greet());
```

### Modify 33: Refactor to Implicit Object Return
**Description:** Arrow returning object wrapper
```javascript
const getConfig = () => {
  return {theme: 'dark', size: 'large'};
};
console.log(getConfig());
```

### Modify 34: Add Arrow for Sort by Property
**Description:** Arrow sort comparator
```javascript
const users = [{name: 'Bob'}, {name: 'Alice'}];
users.sort(function(a, b) {
  return a.name.localeCompare(b.name);
});
console.log(users);
```

### Modify 35: Convert to Arrow in Generator
**Description:** Generator using arrow
```javascript
function* range(n) {
  for (let i = 0; i < n; i++) yield i;
}
for (const v of range(3)) console.log(v);
```

### Modify 36: Add Arrow with Defaults
**Description:** Arrow with default parameters
```javascript
function multiply(a, b = 2) {
  return a * b;
}
console.log(multiply(5));
```

### Modify 37: Refactor to Arrow for FlatMap
**Description:** flatMap with arrow
```javascript
const nums = [[1, 2], [3, 4], [5, 6]];
const flat = nums.reduce(function(a, b) {
  return a.concat(b);
}, []);
console.log(flat);
```

### Modify 38: Add Arrow for GroupBy
**Description:** Arrow in reduce for grouping
```javascript
const items = [{type: 'A'}, {type: 'B'}, {type: 'A'}];
const grouped = items.reduce(function(acc, item) {
  (acc[item.type] = acc[item.type] || []).push(item);
  return acc;
}, {});
console.log(grouped);
```

### Modify 39: Convert to Arrow for Stats
**Description:** Arrow for statistical functions
```javascript
function average(nums) {
  return nums.reduce(function(a, b) { return a + b; }, 0) / nums.length;
}
console.log(average([1, 2, 3, 4, 5]));
```

### Modify 40: Add Arrow as Factory
**Description:** Arrow factory function
```javascript
function createCounter(start) {
  return function() {
    return start++;
  };
}
const counter = createCounter(0);
console.log(counter());
```

### Modify 41: Refactor to Arrow with Every
**Description:** Arrow in every
```javascript
const nums = [1, 2, 3, 4, 5];
const allPositive = nums.every(function(n) {
  return n > 0;
});
console.log(allPositive);
```

### Modify 42: Add Arrow for Method Reference
**Description:** Arrow for passing method
```javascript
const nums = [1, 2, 3];
const strNums = nums.map(function(n) {
  return n.toString();
});
console.log(strNums);
```

### Modify 43: Convert to Arrow in Chunk
**Description:** Arrow for chunking logic
```javascript
function chunk(arr, size) {
  return arr.reduce(function(acc, _, i) {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
}
console.log(chunk([1,2,3,4,5,6], 2));
```

### Modify 44: Add Arrow for Callback
**Description:** Arrow callback parameter
```javascript
function fetch(url, callback) {
  callback('data for ' + url);
}
fetch('/api', function(data) {
  console.log(data);
});
```

### Modify 45: Refactor to Arrow with Chaining
**Description:** Convert to chained arrows
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const result = nums
  .filter(function(n) { return n % 2 === 0; })
  .map(function(n) { return n * n; });
console.log(result);
```

### Modify 46: Add Arrow for Memoization
**Description:** Arrow in memoization
```javascript
function memoize(fn) {
  const cache = {};
  return function(n) {
    if (cache[n] !== undefined) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
}
const factorial = memoize(function(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
});
console.log(factorial(5));
```

### Modify 47: Convert to Arrow Pipe
**Description:** Arrow pipe implementation
```javascript
function pipe() {
  const fns = Array.from(arguments);
  return function(x) {
    return fns.reduce(function(v, fn) { return fn(v); }, x);
  };
}
const add1 = n => n + 1;
const double = n => n * 2;
const f = pipe(add1, double);
console.log(f(5));
```

### Modify 48: Add Arrow for Ternary Map
**Description:** Map with arrow ternary
```javascript
const nums = [1, 2, 3, 4, 5];
const labels = nums.map(function(n) {
  if (n % 2 === 0) return 'even';
  return 'odd';
});
console.log(labels);
```

### Modify 49: Refactor to Arrow with Optional Chaining
**Description:** Arrow with optional chaining
```javascript
function getCity(user) {
  if (user && user.address) {
    return user.address.city;
  }
  return 'Unknown';
}
console.log(getCity({address: {city: 'NYC'}}));
```

### Modify 50: Add Arrow for Curry
**Description:** Arrow currying
```javascript
function curry(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
}
const add = function(a, b) { return a + b; };
const add5 = curry(add)(5);
console.log(add5(3));
```
