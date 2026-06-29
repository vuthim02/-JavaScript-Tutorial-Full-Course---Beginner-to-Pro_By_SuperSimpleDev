# Level 34: Arrow Functions Basics

## Error Snippets (1-70)

### Error 1: Arrow function with wrong syntax
**Description:** Fix the arrow function syntax
```javascript
let greet = => {
  console.log('Hello');
};
```

### Error 2: Missing parentheses around single parameter
**Description:** Add parentheses around the parameter
```javascript
let double = x => {
  return x * 2;
};
```

### Error 3: Using function keyword in arrow function
**Description:** Remove the function keyword
```javascript
let add = function (a, b) => a + b;
```

### Error 4: Arrow function with block body missing return
**Description:** Add return for the block body
```javascript
let sum = (a, b) => {
  a + b;
};
```

### Error 5: Returning object literal without wrapping
**Description:** Wrap the object literal in parentheses
```javascript
let getPerson = () => { name: 'Alice', age: 30 };
```

### Error 6: Arrow function with multiple statements on one line
**Description:** Add a block body for multiple statements
```javascript
let process = (x) => console.log(x); return x * 2;
```

### Error 7: Arrow function with this binding confusion
**Description:** Arrow functions inherit this, they don't have their own
```javascript
let obj = {
  name: 'Alice',
  greet: () => {
    console.log('Hello ' + this.name);
  }
};
```

### Error 8: Arrow function as constructor
**Description:** Use a regular function for constructors
```javascript
let Person = (name) => {
  this.name = name;
};

new Person('Alice');
```

### Error 9: Rest parameter in arrow with wrong position
**Description:** Place rest parameter at the end
```javascript
let sum = (...args, extra) => args.reduce((a, b) => a + b, 0);
```

### Error 10: Arrow with default parameter syntax error
**Description:** Fix the default parameter syntax
```javascript
let greet = (name = 'Guest') => {
  return 'Hello ' + name;
};
```

### Error 11: Arrow function in array method missing parentheses
**Description:** Add parentheses around the single parameter
```javascript
let doubled = [1, 2, 3].map(x => x * 2);
```

### Error 12: Arrow function with line break after arrow
**Description:** Keep the arrow and body on the same line
```javascript
let multiply = (a, b)
  => a * b;
```

### Error 13: Returning nothing from arrow with expression body
**Description:** The expression body implicitly returns, no need for return
```javascript
let double = (x) => { return x * 2 };
```

### Error 14: Arrow function in object method with this
**Description:** Use method shorthand for object methods
```javascript
let counter = {
  count: 0,
  increment: () => {
    this.count++;
  }
};
```

### Error 15: Destructuring parameter without parentheses
**Description:** Wrap destructured parameter in parentheses
```javascript
let printName = { name } => console.log(name);
```

### Error 16: Arrow function with new.target
**Description:** Arrow functions cannot use new.target
```javascript
let MyClass = () => {
  console.log(new.target);
};
```

### Error 17: Arrow function with yield
**Description:** Arrow functions cannot be generators
```javascript
let generator = () => {
  yield 1;
  yield 2;
};
```

### Error 18: Arrow function with super
**Description:** Arrow functions cannot use super
```javascript
class Child extends Parent {
  constructor() {
    super();
    let fn = () => super.method();
  }
}
```

### Error 19: Empty arrow function returning undefined
**Description:** Return a value from the arrow function
```javascript
let getFive = () => {};
```

### Error 20: Arrow function reassigned
**Description:** Use const to prevent reassignment
```javascript
let double = (x) => x * 2;
double = 5;
```

### Error 21: Missing arrow in arrow function
**Description:** Add the arrow between parameters and body
```javascript
let square = (x) {
  return x * x;
};
```

### Error 22: Extra arrow in arrow function
**Description:** Remove the extra arrow
```javascript
let greet = (name) => => 'Hello ' + name;
```

### Error 23: Calling arrow before declaration with var
**Description:** Define the arrow function before calling
```javascript
console.log(double(5));

var double = (x) => x * 2;
```

### Error 24: Arrow function with comma in single parameter
**Description:** Remove the comma from single parameter
```javascript
let greet = (name,) => 'Hello ' + name;
```

### Error 25: Arrow function used as prototype method
**Description:** Use regular function for prototype
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = () => {
  return 'Hello ' + this.name;
};
```

### Error 26: Arguments object used in arrow
**Description:** Use rest parameter instead of arguments
```javascript
let sum = () => {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
};
```

### Error 27: Arrow function with duplicate parameters
**Description:** Remove duplicate parameter
```javascript
let add = (a, a) => a + a;
```

### Error 28: Arrow function missing parentheses when passing to event listener
**Description:** Pass the reference without calling
```javascript
button.addEventListener('click', () => handleClick());
```

### Error 29: Arrow function in ternary
**Description:** Fix the ternary expression with arrow
```javascript
let fn = true ? () => true : () => false;
```

### Error 30: Arrow function returning template literal without interpolation
**Description:** Use template literal correctly
```javascript
let greet = (name) => `Hello, name`;
```

### Error 31: Nested arrow returning arrow with wrong syntax
**Description:** Fix the nested arrow function syntax
```javascript
let add = (x) => (y) => x + y;
```

### Error 32: Arrow function with new keyword
**Description:** Use regular function with new
```javascript
let instance = new (() => {})();
```

### Error 33: Arrow function in logical operator
**Description:** Wrap the arrow function in parentheses
```javascript
let fn = false || x => x * 2;
```

### Error 34: Using arrow function with call, apply, bind
**Description:** Arrow functions ignore this binding
```javascript
let greet = () => {
  console.log('Hello ' + this.name);
};

let obj = { name: 'Alice' };
greet.call(obj);
```

### Error 35: Arrow function with spread in wrong position
**Description:** Move the spread operator to the correct position
```javascript
let max = (...nums, extra) => Math.max(...nums);
```

### Error 36: Missing const or let for arrow function
**Description:** Assign the arrow function to a variable
```javascript
greet = (name) => 'Hello ' + name;
```

### Error 37: Arrow function with async but not awaiting
**Description:** Add await inside the async arrow
```javascript
let fetchData = async () => {
  let data = fetch('/api/data');
  return data.json();
};
```

### Error 38: Arrow function with braces mistaken for block
**Description:** Use parentheses instead of braces for object literal
```javascript
let getObj = () => { key: 'value' };
```

### Error 39: Arrow with expression body returning nothing
**Description:** The expression body will return the expression result
```javascript
let max = (a, b) => { a > b ? a : b };
```

### Error 40: Arrow function in Promise executor
**Description:** Arrow functions work in Promise but be careful with this
```javascript
let p = new Promise((resolve, reject) => {
  resolve('done');
});
```

### Error 41: Using arrow function as getter
**Description:** Use a regular function for getters
```javascript
let obj = {
  get name: () => 'Alice'
};
```

### Error 42: Arrow function inside a class method
**Description:** Arrow function in class creates a method on instance
```javascript
class MyClass {
  greet = () => {
    console.log('Hi');
  }
}
```

### Error 43: Arrow function with too many arrows
**Description:** Use only one arrow
```javascript
let add = (a, b) => => a + b;
```

### Error 44: Arrow function body with semicolons inside object literal
**Description:** Remove semicolons from object literal in arrow
```javascript
let getPerson = () => ({ name: 'Alice'; age: 30 });
```

### Error 45: Arrow function in a context needing dynamic this
**Description:** Use regular function for event handlers needing dynamic this
```javascript
button.addEventListener('click', () => {
  this.classList.toggle('active');
});
```

### Error 46: Arrow function with comments inside parameters
**Description:** Remove comments from parameter list
```javascript
let add = (a /* first */, b /* second */) => a + b;
```

### Error 47: Arrow function default parameter with destructuring
**Description:** Fix the default parameter syntax with destructuring
```javascript
let greet = ({ name } = { name: 'Guest' }) => 'Hello ' + name;
```

### Error 48: Arrow function in switch case
**Description:** Move the arrow function outside the switch
```javascript
switch (1) {
  case 1: () => console.log('one');
}
```

### Error 49: Arrow function with trailing comma after rest
**Description:** Remove trailing comma after rest parameter
```javascript
let fn = (...args,) => args;
```

### Error 50: Arrow function returning undefined with void
**Description:** Use return or expression body directly
```javascript
let getNothing = () => void 0;
```

### Error 51: Arrow function in object literal missing colon
**Description:** Use the correct property assignment syntax
```javascript
let obj = {
  greet: (name) => 'Hello ' + name
};
```

### Error 52: Arrow function with computed property key
**Description:** Fix the computed property syntax with arrow
```javascript
let key = 'method';
let obj = {
  [key]: () => 'value'
};
```

### Error 53: Arrow function in array literal with wrong parens
**Description:** Use correct arrow function syntax in array
```javascript
let arr = [
  (x) => x * 2
];
```

### Error 54: Arrow function with line break between params
**Description:** Keep parameters on same line or use parentheses
```javascript
let add = (a,
  b) => a + b;
```

### Error 55: Arrow function inside template literal
**Description:** Template literals don't execute arrow functions
```javascript
let result = `${(x => x * 2)(5)}`;
```

### Error 56: Arrow function with async keyword after params
**Description:** Place async keyword before parameters
```javascript
let load = () => async {
  await fetch('/data');
};
```

### Error 57: Arrow function with block body and expression on same line
**Description:** Use return for block body
```javascript
let double = (x) => { x * 2 };
```

### Error 58: Arrow function as static property
**Description:** Use regular method for static
```javascript
class Config {
  static getDefault = () => ({ theme: 'light' });
}
```

### Error 59: Arrow function with comma operator wrong
**Description:** Fix the comma operator usage in arrow
```javascript
let logAndReturn = (x) => (console.log(x), x);
```

### Error 60: Arrow function missing in reduce callback
**Description:** Provide a valid arrow function as callback
```javascript
let sum = [1, 2, 3].reduce((a, b));
```

### Error 61: Arrow function with rest parameter in middle
**Description:** Rest parameter must be last
```javascript
let fn = (a, ...rest, b) => [a, ...rest, b];
```

### Error 62: Arrow function body with only a label
**Description:** Add actual code to the arrow body
```javascript
let fn = () => {
  label: 'value';
};
```

### Error 63: Arrow function used with debugger statement
**Description:** Arrow functions can contain debugger statements
```javascript
let fn = () => {
  debugger;
  return 42;
};
```

### Error 64: Arrow function with getter/setter syntax
**Description:** Use regular functions for getters/setters
```javascript
let obj = {
  get value: () => 42
};
```

### Error 65: Arrow function with yield expression
**Description:** Arrow functions cannot be generators
```javascript
let gen = () => {
  let i = 0;
  while (true) yield i++;
};
```

### Error 66: Arrow function wrapped in parentheses incorrectly
**Description:** Use correct grouping
```javascript
let result = (x) => x * 2;
```

### Error 67: Arrow function with prototype property
**Description:** Arrow functions have no prototype
```javascript
let Person = (name) => {
  this.name = name;
};

Person.prototype.greet = function() {};
```

### Error 68: Arrow function with caller property access
**Description:** Arrow functions don't have caller
```javascript
let fn = () => {
  console.log(fn.caller);
};
```

### Error 69: Arrow function in eval context
**Description:** Arrow functions work in eval
```javascript
let fn = eval('() => 42');
```

### Error 70: Arrow function body with block and expression mixed
**Description:** Either use block with return or expression body
```javascript
let add = (a, b) => { return a + b };
```

## Issue Snippets (1-30)

### Issue 1: Arrow function too complex for single line
**Description:** Use block body for complex logic
```javascript
let process = (items) => items.filter(i => i.active).map(i => i.name).sort().join(', ');
```

### Issue 2: Regular function could be arrow
**Description:** Convert to arrow function for shorter syntax
```javascript
function double(x) {
  return x * 2;
}
```

### Issue 3: Arrow used where this binding is needed
**Description:** Use regular function to preserve dynamic this
```javascript
let obj = {
  items: [1, 2, 3],
  process: () => {
    this.items.forEach(item => console.log(item));
  }
};
```

### Issue 4: Arrow function with unnecessary block body
**Description:** Use expression body for simple arrow
```javascript
let add = (a, b) => {
  return a + b;
};
```

### Issue 5: Overusing arrow functions for methods
**Description:** Use method shorthand in objects
```javascript
let calc = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
```

### Issue 6: Arrow function with too many nested arrows
**Description:** Use named functions for readability
```javascript
let complex = (x) => (y) => (z) => x + y + z;
```

### Issue 7: Implicit return confusion with object literal
**Description:** Add parentheses for object literal implicit return
```javascript
let getPerson = (name, age) => { name, age };
```

### Issue 8: Regular function used as callback
**Description:** Use arrow function for cleaner callbacks
```javascript
let doubled = [1, 2, 3].map(function(x) {
  return x * 2;
});
```

### Issue 9: Arrow function with console.log side effect
**Description:** Separate logging from computation
```javascript
let result = [1, 2, 3].map(x => (console.log(x), x * 2));
```

### Issue 10: Arrow function without parentheses when mixing types
**Description:** Be consistent with parameter parentheses
```javascript
[1, 2, 3].map(x => x * 2);
[1, 2, 3].filter((x, i) => i > 0);
```

### Issue 11: Arrow function assigned to const but with block body
**Description:** Use expression body for simple return
```javascript
const getMax = (a, b) => {
  return a > b ? a : b;
};
```

### Issue 12: Using arrow where function hoisting is needed
**Description:** Use function declaration when hoisting behavior needed
```javascript
const greet = () => 'Hello';
console.log(greet());
```

### Issue 13: Arrow function in namespace pattern
**Description:** Use regular functions for namespace methods
```javascript
const App = {
  init: () => {
    console.log('init');
  }
};
```

### Issue 14: Arrow function with rest parameter but no other params
**Description:** Use rest parameter with no named parameters
```javascript
let sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
```

### Issue 15: Arrow function with default parameter that calls function
**Description:** Be careful with default parameter expressions
```javascript
let greet = (name = getName()) => 'Hello ' + name;
```

### Issue 16: Arrow function returning null
**Description:** Return null explicitly
```javascript
let getNothing = () => null;
```

### Issue 17: Inline arrow not assigned to variable
**Description:** Assign the arrow to a variable for reuse
```javascript
[1, 2, 3].map(x => x * 2);
[4, 5, 6].map(x => x * 2);
```

### Issue 18: Arrow function with too many arguments on one line
**Description:** Break into multiple lines for readability
```javascript
let result = complexArray
  .filter(x => x > 0)
  .map(x => x * 2)
  .reduce((a, b) => a + b, 0);
```

### Issue 19: Arrow function with no clear purpose
**Description:** Add a descriptive comment or name
```javascript
let fn = (x) => x > 0 ? x * 2 : x * 3;
```

### Issue 20: Arrow function that mutates its parameter
**Description:** Return a new value without mutation
```javascript
let addItem = (arr, item) => { arr.push(item); return arr; };
```

### Issue 21: Arrow function with many parameters on one line
**Description:** Break into multiple lines
```javascript
let createUser = (name, email, age, city, country) => ({ name, email, age, city, country });
```

### Issue 22: Arrow function used for recursion
**Description:** Arrow functions can be recursive but need a name
```javascript
const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
```

### Issue 23: Missing parentheses when destructuring
**Description:** Add parentheses around destructured parameter
```javascript
let greet = { name } => 'Hello ' + name;
```

### Issue 24: Arrow inline in template literal
**Description:** Use arrow function inside ${} in template literal
```javascript
let result = `The double is ${((x) => x * 2)(5)}`;
```

### Issue 25: Arrow function used in IIFE without wrapping
**Description:** Wrap arrow IIFE in parentheses
```javascript
let value = (() => 42)();
```

### Issue 26: Arrow function as event handler removes this context
**Description:** Use regular function when this is needed
```javascript
element.addEventListener('click', () => {
  this.style.color = 'red';
});
```

### Issue 27: Using async with arrow for simple operations
**Description:** Only use async when needed
```javascript
let getData = async () => 'data';
```

### Issue 28: Arrow function with side effects in method chain
**Description:** Separate side effects from transformations
```javascript
let result = arr
  .map(x => { console.log(x); return x * 2; })
  .filter(x => x > 0);
```

### Issue 29: Arrow function with inconsistent brace style
**Description:** Use consistent brace style
```javascript
let fn1 = (x) => { return x * 2; };
let fn2 = (x) => x * 2;
```

### Issue 30: Arrow function used with call/apply unnecessarily
**Description:** Arrow functions ignore custom this binding
```javascript
let greet = () => this.name;
let obj = { name: 'Alice' };
greet.call(obj);
```

## Modification Snippets (1-50)

### Modify 1: Convert to arrow function
**Description:** Convert the function expression to arrow syntax
```javascript
let double = function(x) {
  return x * 2;
};
```

### Modify 2: Add implicit return
**Description:** Use expression body for implicit return
```javascript
let add = (a, b) => {
  return a + b;
};
```

### Modify 3: Remove block body
**Description:** Convert to expression body
```javascript
let isEven = (n) => {
  return n % 2 === 0;
};
```

### Modify 4: Fix object return
**Description:** Wrap the returned object in parentheses
```javascript
let getConfig = () => {
  theme: 'dark', lang: 'en'
};
```

### Modify 5: Convert function declaration to arrow
**Description:** Convert to const arrow function
```javascript
function multiply(a, b) {
  return a * b;
}
```

### Modify 6: Add parentheses around parameter
**Description:** Add parentheses around the single parameter
```javascript
let greet = name => 'Hello ' + name;
```

### Modify 7: Remove unnecessary return
**Description:** Use implicit return in expression body
```javascript
let square = (x) => {
  return x * x;
};
```

### Modify 8: Add default parameter
**Description:** Add a default value for the parameter
```javascript
let greet = (name) => 'Hello ' + name;
```

### Modify 9: Convert callback to arrow
**Description:** Replace the anonymous function with arrow
```javascript
let numbers = [1, 2, 3];
let doubled = numbers.map(function(n) {
  return n * 2;
});
```

### Modify 10: Fix this binding with arrow
**Description:** Use arrow function to preserve this
```javascript
let obj = {
  name: 'Alice',
  greet: function() {
    setTimeout(function() {
      console.log('Hello ' + this.name);
    }, 100);
  }
};
```

### Modify 11: Add rest parameter to arrow
**Description:** Use rest parameter to accept any number of args
```javascript
let sum = (a, b) => a + b;
```

### Modify 12: Convert method to arrow
**Description:** Use arrow function for the object method
```javascript
let calc = {
  add: function(a, b) {
    return a + b;
  }
};
```

### Modify 13: Simplify filter callback
**Description:** Use arrow with implicit return
```javascript
let evens = [1, 2, 3, 4].filter(function(n) {
  return n % 2 === 0;
});
```

### Modify 14: Add destructuring to arrow params
**Description:** Destructure the object parameter
```javascript
let greet = (user) => 'Hello ' + user.name;
```

### Modify 15: Fix missing return in arrow block
**Description:** Add return to arrow function with block body
```javascript
let max = (a, b) => {
  a > b ? a : b;
};
```

### Modify 16: Convert map callback to arrow
**Description:** Use arrow function for map
```javascript
let lengths = ['hi', 'hello', 'hey'].map(function(s) {
  return s.length;
});
```

### Modify 17: Add async to arrow
**Description:** Make the arrow function async
```javascript
let loadData = () => {
  return fetch('/data').then(r => r.json());
};
```

### Modify 18: Create arrow IIFE
**Description:** Use an arrow function as an IIFE
```javascript
(function() {
  return 42;
})();
```

### Modify 19: Convert nested function to arrow
**Description:** Use arrow for the inner function
```javascript
function multiply(factor) {
  return function(x) {
    return x * factor;
  };
}
```

### Modify 20: Simplify reduce callback with arrow
**Description:** Use arrow for reduce callback
```javascript
let sum = [1, 2, 3].reduce(function(a, b) {
  return a + b;
}, 0);
```

### Modify 21: Convert ternary with arrow
**Description:** Use arrow function inside ternary expression
```javascript
let fn = true ? function() { return 1; } : function() { return 2; };
```

### Modify 22: Use arrow for simple transformation
**Description:** Convert the function to a one-liner arrow
```javascript
function toUpperCase(str) {
  return str.toUpperCase();
}
```

### Modify 23: Add parentheses for implicit object return
**Description:** Wrap the object in parentheses for implicit return
```javascript
let getPerson = (name, age) => { name: name, age: age };
```

### Modify 24: Convert forEach callback to arrow
**Description:** Use arrow for forEach
```javascript
[1, 2, 3].forEach(function(n) {
  console.log(n);
});
```

### Modify 25: Chain arrow functions
**Description:** Use arrow functions for all callbacks in the chain
```javascript
let result = [1, 2, 3]
  .filter(function(n) { return n > 1; })
  .map(function(n) { return n * 2; });
```

### Modify 26: Fix arrow function in event listener
**Description:** Use arrow function for the event listener
```javascript
button.addEventListener('click', function() {
  console.log('clicked');
});
```

### Modify 27: Convert to arrow with default parameter
**Description:** Add default parameter to arrow function
```javascript
let greet = (name) => 'Hello ' + name;
```

### Modify 28: Fix arrow returning template literal
**Description:** Use template literal with interpolation
```javascript
let greet = (name) => 'Hello, ' + name;
```

### Modify 29: Convert sort comparator to arrow
**Description:** Use arrow for sort comparator
```javascript
let sorted = [3, 1, 2].sort(function(a, b) {
  return a - b;
});
```

### Modify 30: Add block body for multiple statements
**Description:** Convert expression body to block body
```javascript
let process = (x) => x * 2;
```

### Modify 31: Convert to arrow with destructured param
**Description:** Destructure the parameter in the arrow function
```javascript
let getFullName = (user) => user.first + ' ' + user.last;
```

### Modify 32: Fix arrow function in Promise chain
**Description:** Use arrow functions in the Promise .then
```javascript
fetch('/data')
  .then(function(res) { return res.json(); })
  .then(function(data) { console.log(data); });
```

### Modify 33: Convert every/some callback to arrow
**Description:** Use arrow for array every/some methods
```javascript
let allPositive = [1, 2, 3].every(function(n) {
  return n > 0;
});
```

### Modify 34: Use arrow for setTimeout callback
**Description:** Convert the setTimeout callback to arrow
```javascript
setTimeout(function() {
  console.log('Timeout');
}, 1000);
```

### Modify 35: Fix arrow returning at wrong indentation
**Description:** Format the arrow function properly
```javascript
let fn = (x) =>
x * 2;
```

### Modify 36: Add type check with arrow
**Description:** Use arrow function for the type check
```javascript
function isString(val) {
  return typeof val === 'string';
}
```

### Modify 37: Convert find callback to arrow
**Description:** Use arrow for find callback
```javascript
let found = [1, 2, 3].find(function(n) {
  return n === 2;
});
```

### Modify 38: Add arrow function as property value
**Description:** Use arrow function directly as property value
```javascript
let obj = {
  greet: function() {
    return 'Hello';
  }
};
```

### Modify 39: Simplify some callback with arrow
**Description:** Use arrow for some method
```javascript
let hasEven = [1, 2, 3].some(function(n) {
  return n % 2 === 0;
});
```

### Modify 40: Convert arrow to use spread in params
**Description:** Use rest parameter in arrow function
```javascript
let max = () => Math.max(...arguments);
```

### Modify 41: Fix arrow function with logical operators
**Description:** Use arrow with logical AND/OR
```javascript
let greet = (name) => name && 'Hello ' + name;
```

### Modify 42: Convert computed property method to arrow
**Description:** Use arrow for computed object property
```javascript
let key = 'method';
let obj = {
  [key]: function() {
    return 42;
  }
};
```

### Modify 43: Use arrow for array fill
**Description:** Use arrow in Array.from map function
```javascript
let arr = Array.from({ length: 5 }, function(_, i) {
  return i * 2;
});
```

### Modify 44: Convert flatMap callback to arrow
**Description:** Use arrow for flatMap
```javascript
let result = [1, 2, 3].flatMap(function(n) {
  return [n, n * 2];
});
```

### Modify 45: Add arrow for groupBy (Object.groupBy)
**Description:** Use arrow for grouping callback
```javascript
let grouped = Object.groupBy([1, 2, 3], function(n) {
  return n % 2 === 0 ? 'even' : 'odd';
});
```

### Modify 46: Fix arrow function returning conditional
**Description:** Use ternary with implicit return
```javascript
let max = (a, b) => {
  if (a > b) return a;
  return b;
};
```

### Modify 47: Convert generator to arrow (not possible, explain)
**Description:** Use regular function for generators
```javascript
function* range(n) {
  for (let i = 0; i < n; i++) yield i;
}
```

### Modify 48: Use arrow for replace callback
**Description:** Use arrow in string replace
```javascript
let result = 'hello world'.replace(/l+/g, function(match) {
  return match.toUpperCase();
});
```

### Modify 49: Convert to arrow with computed return
**Description:** Use arrow with computed property name
```javascript
function createObject(key, value) {
  var obj = {};
  obj[key] = value;
  return obj;
}
```

### Modify 50: Add arrow to custom iterator
**Description:** Use arrow for the next method
```javascript
let iterable = {
  [Symbol.iterator]: function() {
    let i = 0;
    return {
      next: function() {
        return i < 5 ? { value: i++, done: false } : { done: true };
      }
    };
  }
};
```
