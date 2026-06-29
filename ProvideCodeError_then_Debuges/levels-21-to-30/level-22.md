# Debugging Challenge - Level 22
## Module 5: Variables - Scope

---

### Error 1: Block-scoped variable accessed outside
**Description:** Accessing a let variable outside its block scope.
```javascript
{
  let secret = "hidden";
}
console.log(secret);
```

### Error 2: Var leaks from block
**Description:** Var declared inside a block is accessible outside.
```javascript
if (true) {
  var x = 10;
}
console.log(x);
```

### Error 3: TDZ with let before declaration
**Description:** Accessing let variable in temporal dead zone.
```javascript
console.log(x);
let x = 5;
```

### Error 4: TDZ with const before declaration
**Description:** Accessing const variable in temporal dead zone.
```javascript
console.log(PI);
const PI = 3.14;
```

### Error 5: Let shadowing in nested block
**Description:** Let variable in outer scope is shadowed by inner.
```javascript
let value = "outer";
if (true) {
  let value = "inner";
  console.log(value);
}
console.log(value);
```

### Error 6: Var hoisting confusion
**Description:** Var hoisting causes unexpected undefined.
```javascript
function test() {
  console.log(x);
  var x = 10;
  console.log(x);
}
test();
```

### Error 7: Function scope var leak
**Description:** Var from nested function is not accessible in parent.
```javascript
function outer() {
  function inner() {
    var x = 10;
  }
  console.log(x);
}
outer();
```

### Error 8: For loop var closure bug
**Description:** Var in for loop causes all callbacks to share the same value.
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Error 9: Catch block var leak
**Description:** Var declared in catch block leaks outside.
```javascript
try {
  throw new Error("fail");
} catch (e) {
  var message = "caught";
}
console.log(message);
```

### Error 10: Switch case let redeclaration
**Description:** Let in switch case without block scope causes redeclaration error.
```javascript
let value = 1;
switch (value) {
  case 1:
    let x = "one";
    console.log(x);
    break;
  case 2:
    let x = "two";
    console.log(x);
    break;
}
```

### Error 11: Nested function var hoisting
**Description:** Var hoisting within nested function causes undefined.
```javascript
function outer() {
  function inner() {
    console.log(x);
    var x = 5;
  }
  inner();
}
outer();
```

### Error 12: Block-scoped function redeclaration
**Description:** Block-scoped function declaration conflicts with outer.
```javascript
function foo() { return 1; }
{
  function foo() { return 2; }
}
console.log(foo());
```

### Error 13: TDZ with typeof
**Description:** Using typeof on a let variable before declaration throws ReferenceError.
```javascript
console.log(typeof x);
let x = 10;
```

### Error 14: Nested block const redeclaration
**Description:** Redeclaring const in a nested block.
```javascript
const x = 1;
{
  const x = 2;
  console.log(x);
}
console.log(x);
```

### Error 15: Var redeclaration in function
**Description:** Var redeclaration in same function is allowed but confusing.
```javascript
function test() {
  var x = 1;
  var x = 2;
  return x;
}
console.log(test());
```

### Error 16: Accessing inner block var after function return
**Description:** Var declared in block is accessible after function returns.
```javascript
function test() {
  if (true) {
    var x = 10;
  }
  return x;
}
console.log(test());
```

### Error 17: Let redeclaration in same block
**Description:** Trying to redeclare let in the same block.
```javascript
let a = 1;
let a = 2;
console.log(a);
```

### Error 18: Const in for loop header
**Description:** Using const in for loop header causes error.
```javascript
for (const i = 0; i < 5; i++) {
  console.log(i);
}
```

### Error 19: Eval var leak
**Description:** Var declared in eval leaks to containing scope.
```javascript
function test() {
  eval("var x = 10;");
  console.log(x);
}
test();
```

### Error 20: With statement scope confusion
**Description:** Using with statement causes scope ambiguity.
```javascript
const obj = { x: 10 };
with (obj) {
  var x = 20;
  console.log(x);
}
console.log(x);
```

### Error 21: IIFE var leak attempt
**Description:** Trying to access var from IIFE outside.
```javascript
(function() {
  var internal = "secret";
})();
console.log(internal);
```

### Error 22: Module scope confusion
**Description:** Assuming module-level variables are global.
```javascript
// module.js
let moduleVar = "test";
// main.js
console.log(moduleVar);
```

### Error 23: Block scope with label
**Description:** Labeled block scope confusion with variable access.
```javascript
block: {
  let x = 10;
  console.log(x);
}
console.log(x);
```

### Error 24: Nested blocks with same let name
**Description:** Same let name used in sibling blocks causes no error but confusing.
```javascript
{
  let x = 1;
  console.log(x);
}
{
  let x = 2;
  console.log(x);
}
```

### Error 25: Variable in debugger scope
**Description:** Variable scope in debugger evaluation context.
```javascript
function test() {
  let x = 10;
  debugger;
  console.log(x);
}
test();
```

### Error 26: Try block let in catch
**Description:** Accessing try-block let variable in catch block.
```javascript
try {
  let x = 10;
  throw new Error("test");
} catch (e) {
  console.log(x);
}
```

### Error 27: For-in with var leaks
**Description:** Var in for-in loop leaks to the enclosing function.
```javascript
function test() {
  for (var key in {a: 1}) {
    console.log(key);
  }
  console.log(key);
}
test();
```

### Error 28: Conditional block var hoisting
**Description:** Var hoisting inside conditional block.
```javascript
if (Math.random() > 0.5) {
  var x = 10;
}
console.log(x);
```

### Error 29: Nested scope TDZ
**Description:** TDZ across multiple nested scopes.
```javascript
function test() {
  if (true) {
    console.log(x);
  }
  let x = 10;
}
test();
```

### Error 30: Const object property mutation misunderstanding
**Description:** Thinking const prevents object property mutation.
```javascript
const obj = { value: 1 };
obj.value = 2;
console.log(obj.value);
```

### Error 31: Var in do-while loop leaks
**Description:** Var declared in do-while loop leaks to outer scope.
```javascript
do {
  var x = 10;
} while (false);
console.log(x);
```

### Error 32: Function declaration in block
**Description:** Function declaration inside block has inconsistent hoisting behavior.
```javascript
if (true) {
  function foo() { return 1; }
}
console.log(foo());
```

### Error 33: Sibling scope access
**Description:** Trying to access variable from sibling scope.
```javascript
{
  let a = 1;
}
{
  console.log(a);
}
```

### Error 34: Var in switch without braces leaks
**Description:** Var in switch case leaks to the switch block.
```javascript
switch (1) {
  case 1:
    var x = 10;
    break;
}
console.log(x);
```

### Error 35: Nested function scope with let
**Description:** Let in nested function is not accessible in outer.
```javascript
function outer() {
  function inner() {
    let x = 10;
  }
  inner();
  console.log(x);
}
outer();
```

### Error 36: For loop let and closure
**Description:** let in for loop creates new binding each iteration.
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Error 37: Const in nested block TDZ
**Description:** Accessing const in nested block before declaration.
```javascript
{
  console.log(x);
  const x = 10;
}
```

### Error 38: Global var overwritten by local
**Description:** Local variable shadows global with var.
```javascript
var x = 10;
function test() {
  var x = 20;
  return x;
}
console.log(test(), x);
```

### Error 39: Multiple catch blocks with same var name
**Description:** Using same var name in multiple catch blocks.
```javascript
try {
  throw Error("a");
} catch (e) {
  var msg = "first";
}
try {
  throw Error("b");
} catch (e) {
  var msg = "second";
}
console.log(msg);
```

### Error 40: Let in finally block
**Description:** Let declared in finally block is not accessible after.
```javascript
try {
  throw Error("test");
} catch (e) {
  console.log(e);
} finally {
  let cleanup = true;
}
console.log(cleanup);
```

### Error 41: Nested IIFE scope access
**Description:** Trying to access variable from nested IIFE.
```javascript
(function() {
  (function() {
    var x = 10;
  })();
  console.log(x);
})();
```

### Error 42: Global let collision with var
**Description:** Let and var with same name at global scope.
```javascript
var x = 10;
let x = 20;
console.log(x);
```

### Error 43: Block scope with comma expression
**Description:** Variable scope confusion with comma expressions.
```javascript
let x = (1, 2, 3);
console.log(x);
```

### Error 44: Destructuring scope confusion
**Description:** Destructured variable scope misunderstanding.
```javascript
const obj = { x: 10 };
{
  const { x } = obj;
  console.log(x);
}
console.log(x);
```

### Error 45: For loop var with closure and timeout
**Description:** Classic var closure bug with multiple timeouts.
```javascript
for (var i = 0; i < 5; i++) {
  (function() {
    setTimeout(() => console.log(i), 100);
  })();
}
```

### Error 46: Arrow function block scope
**Description:** Block scope inside arrow function is confusing.
```javascript
const fn = () => {
  let x = 10;
};
console.log(x);
```

### Error 47: Class field scope
**Description:** Class field variable scope confusion.
```javascript
class MyClass {
  #privateField = 10;
  getValue() {
    return #privateField;
  }
}
console.log(#privateField);
```

### Error 48: Static block scope
**Description:** Variable from static initialization block not accessible outside.
```javascript
class MyClass {
  static {
    let x = 10;
  }
}
console.log(x);
```

### Error 49: Dynamic import scope
**Description:** Variable from dynamic import not accessible.
```javascript
import("./module.js").then(mod => {
  let x = mod.value;
});
console.log(x);
```

### Error 50: Worker scope variables
**Description:** Variables declared in worker are not accessible in main.
```javascript
const worker = new Worker("worker.js");
// worker.js: let x = 10;
console.log(x);
```

### Error 51: Proxy handler scope
**Description:** Variable scope inside proxy handler.
```javascript
const target = {};
const handler = {
  get() {
    let x = 10;
    return x;
  }
};
const proxy = new Proxy(target, handler);
console.log(x);
```

### Error 52: Generator function scope
**Description:** Variable inside generator function scope.
```javascript
function* gen() {
  let x = 10;
  yield x;
}
const g = gen();
console.log(x);
```

### Error 53: Async function scope leak
**Description:** Trying to access async function variable outside.
```javascript
async function fetch() {
  let data = await Promise.resolve(42);
  return data;
}
console.log(data);
```

### Error 54: Module export scope
**Description:** Module-level variable not exported is inaccessible.
```javascript
// module.mjs
let privateVar = "secret";
// main.mjs
import "./module.mjs";
console.log(privateVar);
```

### Error 55: Global this reference
**Description:** Global variable access through this in different contexts.
```javascript
function test() {
  "use strict";
  let x = 10;
  console.log(this.x);
}
test();
```

### Error 56: Block scope with switch fall-through
**Description:** Variable scope issues in switch fall-through cases.
```javascript
let x = 1;
switch (x) {
  case 1:
    let y = "one";
    console.log(y);
  case 2:
    console.log(y);
    break;
}
```

### Error 57: Labeled block with var
**Description:** Var inside labeled block leaks to outer scope.
```javascript
myBlock: {
  var x = 10;
  console.log(x);
}
console.log(x);
```

### Error 58: Array destructuring scope
**Description:** Destructured variable scope is same as parent.
```javascript
let x = 1;
[ x ] = [10];
console.log(x);
```

### Error 59: Object destructuring scope
**Description:** Renamed destructured variable scope.
```javascript
const obj = { x: 10 };
const { x: y } = obj;
console.log(x);
```

### Error 60: Default parameter scope
**Description:** Default parameter has its own scope.
```javascript
let x = 10;
function foo(x = x) {
  return x;
}
console.log(foo());
```

### Error 61: Rest parameter scope
**Description:** Rest parameter collects remaining arguments.
```javascript
function foo(a, ...rest) {
  console.log(rest);
}
console.log(rest);
```

### Error 62: Arguments object scope
**Description:** Arguments object is function-scoped.
```javascript
function foo() {
  console.log(arguments);
}
console.log(arguments);
```

### Error 63: New.target scope
**Description:** new.target is only available in function scope.
```javascript
function Foo() {
  console.log(new.target);
}
console.log(new.target);
```

### Error 64: Import.meta scope
**Description:** import.meta is only available in modules.
```javascript
console.log(import.meta);
```

### Error 65: Super property scope
**Description:** Super is only available in class methods.
```javascript
const obj = {
  foo() {
    console.log(super.toString);
  }
};
console.log(super.toString);
```

### Error 66: This binding scope
**Description:** This binding changes based on calling context.
```javascript
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name);
  }
};
const greet = obj.greet;
greet();
```

### Error 67: Arrow function this scope
**Description:** Arrow function inherits this from parent scope.
```javascript
const obj = {
  name: "Alice",
  greet: () => {
    console.log(this.name);
  }
};
obj.greet();
```

### Error 68: Tagged template scope
**Description:** Variables in tagged templates follow normal scope.
```javascript
function tag(strings, ...values) {
  return strings[0];
}
let x = 10;
console.log(tag`${x}`);
console.log(strings);
```

### Error 69: Reflect construct scope
**Description:** Variables in Reflect.construct target scope.
```javascript
function Target() {
  let x = 10;
}
const instance = Reflect.construct(Target, []);
console.log(x);
```

### Error 70: Optional chaining scope
**Description:** Using optional chaining on variable.
```javascript
const obj = null;
console.log(obj?.nested?.value);
```

---

### Issue 1: Deeply nested scope with var
**Description:** Using var across deeply nested blocks causes confusion.
```javascript
function process() {
  if (true) {
    for (let i = 0; i < 5; i++) {
      if (i > 2) {
        var result = i;
      }
    }
  }
  console.log(result);
}
```

### Issue 2: Shadowing variable with same name
**Description:** Inner scope shadows outer variable making both inaccessible.
```javascript
let user = "Alice";
function updateUser() {
  let user = "Bob";
  console.log(user);
}
updateUser();
```

### Issue 3: Inconsistent scope patterns
**Description:** Mixing var and let inconsistently creates confusion.
```javascript
function test() {
  var x = 1;
  if (true) {
    let y = 2;
    console.log(x, y);
  }
  var z = 3;
  console.log(x, z);
}
```

### Issue 4: Variable declaration hoisting dependency
**Description:** Relying on hoisting to access variables before declaration.
```javascript
function test() {
  console.log(name);
  var name = "Alice";
}
test();
```

### Issue 5: Global namespace pollution
**Description:** Multiple scripts pollute global scope with var.
```javascript
<script>
  var appName = "MyApp";
</script>
<script>
  var appName = "YourApp";
</script>
```

### Issue 6: Block-level function declaration
**Description:** Function declarations inside blocks have inconsistent behavior.
```javascript
if (true) {
  function getValue() { return 1; }
} else {
  function getValue() { return 2; }
}
console.log(getValue());
```

### Issue 7: Variable access before initialization
**Description:** Using let/const before declaration causes ReferenceError.
```javascript
function test() {
  console.log(result);
  const result = compute();
}
```

### Issue 8: Shared scope in closures
**Description:** Multiple closures sharing the same var have unexpected values.
```javascript
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => console.log(i));
}
fns.forEach(fn => fn());
```

### Issue 9: Accidental global in callback
**Description:** Missing declaration in callback creates global variable.
```javascript
function fetchData(callback) {
  const data = "result";
  callback(data);
}
fetchData(data => {
  result = data;
});
console.log(result);
```

### Issue 10: Deeply nested IIFE scopes
**Description:** Deeply nested IIFE with same variable names.
```javascript
(function() {
  var x = 1;
  (function() {
    var x = 2;
    (function() {
      var x = 3;
      console.log(x);
    })();
    console.log(x);
  })();
  console.log(x);
})();
```

### Issue 11: Loop variable mutation in closures
**Description:** Mutating loop variable inside closures causes bugs.
```javascript
const buttons = document.querySelectorAll("button");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    console.log(i);
  };
}
```

### Issue 12: Conditional variable declaration
**Description:** Declaring variables inside conditional blocks inconsistently.
```javascript
function getDiscount(level) {
  if (level === "gold") {
    let discount = 0.2;
    return discount;
  }
  if (level === "silver") {
    let discount = 0.1;
    return discount;
  }
}
```

### Issue 13: Var in for-of loop
**Description:** Using var in for-of loop leaks to outer scope.
```javascript
const items = [1, 2, 3];
for (var item of items) {
  console.log(item);
}
console.log(item);
```

### Issue 14: Multiple script scope issues
**Description:** Different script tags sharing variables improperly.
```javascript
<script>
  let shared = "value";
</script>
<script>
  console.log(shared);
</script>
```

### Issue 15: Async callback scope confusion
**Description:** Async callbacks capturing loop variables incorrectly.
```javascript
for (var i = 0; i < 3; i++) {
  fs.readFile("file.txt", () => {
    console.log(i);
  });
}
```

### Issue 16: Scope pollution from libraries
**Description:** Libraries creating global variables that conflict.
```javascript
// library1.js
var $ = "dollar";
// library2.js
var $ = "money";
console.log($);
```

### Issue 17: Module import shadowing
**Description:** Imported name shadowed by local variable.
```javascript
import { readFile } from "fs";
const readFile = "custom";
console.log(readFile);
```

### Issue 18: const in loop body
**Description:** Declaring const inside loop body with same name.
```javascript
for (let i = 0; i < 3; i++) {
  const item = i;
  console.log(item);
}
```

### Issue 19: Var in try-catch-finally
**Description:** Var declarations across try-catch-finally blocks.
```javascript
try {
  var x = 1;
  throw Error("test");
} catch (e) {
  var x = 2;
} finally {
  var x = 3;
}
console.log(x);
```

### Issue 20: Nested block return scope
**Description:** Returning from nested block scope confusion.
```javascript
function test() {
  {
    let x = 10;
    return x;
  }
}
console.log(test());
```

### Issue 21: Object method scope
**Description:** This scope inside object methods.
```javascript
const obj = {
  value: 42,
  getValue: function() {
    return this.value;
  }
};
const getValue = obj.getValue;
console.log(getValue());
```

### Issue 22: Class method scope
**Description:** This binding in class methods.
```javascript
class Counter {
  count = 0;
  increment() {
    this.count++;
  }
}
const counter = new Counter();
const inc = counter.increment;
inc();
console.log(counter.count);
```

### Issue 23: Dynamic property scope
**Description:** Dynamic property access scope confusion.
```javascript
const obj = { a: 1, b: 2 };
const key = "a";
console.log(obj[key]);
console.log(key);
```

### Issue 24: Function expression hoisting
**Description:** Function expressions are not hoisted like declarations.
```javascript
console.log(foo);
var foo = function() {
  return 10;
};
```

### Issue 25: Named function expression scope
**Description:** Named function expression creates a scoped name.
```javascript
const foo = function bar() {
  console.log(bar);
};
console.log(bar);
```

### Issue 26: Object literal scope
**Description:** Variable scope inside object literals.
```javascript
const x = 10;
const obj = {
  x: 20,
  getX() {
    return x;
  }
};
console.log(obj.getX());
```

### Issue 27: Computed property scope
**Description:** Scope in computed property keys.
```javascript
const key = "name";
const obj = {
  [key]: "Alice",
  [key + "2"]: "Bob"
};
console.log(obj);
```

### Issue 28: Array method callback scope
**Description:** Variable scope in array method callbacks.
```javascript
const items = [1, 2, 3];
const multiplier = 2;
const doubled = items.map(function(item) {
  return item * multiplier;
});
console.log(multiplier);
```

### Issue 29: Promise chain scope
**Description:** Variable scope across promise chain.
```javascript
Promise.resolve(1)
  .then(value => {
    let result = value * 2;
    return result;
  })
  .then(value => {
    console.log(result);
  });
```

### Issue 30: Event handler scope
**Description:** Variable scope in event handlers.
```javascript
const button = document.querySelector("button");
for (var i = 0; i < 3; i++) {
  button.addEventListener("click", function() {
    console.log(i);
  });
}
```

---

### Modify 1: Replace var with let for block scoping
**Description:** Change var to let so the variable is block-scoped.
```javascript
if (true) {
  var x = 10;
}
console.log(x);
```

### Modify 2: Fix variable scope - move declaration
**Description:** Move the let declaration outside the block.
```javascript
{
  let x = 10;
}
console.log(x);
```

### Modify 3: Fix TDZ by reordering
**Description:** Move the let declaration before its usage.
```javascript
console.log(x);
let x = 10;
```

### Modify 4: Fix var closure bug in loop
**Description:** Use let in for loop for proper closure behavior.
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Modify 5: Fix switch case scoping
**Description:** Add braces to switch cases for proper scoping.
```javascript
switch (value) {
  case 1:
    let x = "one";
    console.log(x);
    break;
  case 2:
    let x = "two";
    console.log(x);
    break;
}
```

### Modify 6: Remove var leak from catch
**Description:** Use let instead of var in catch block.
```javascript
try {
  throw Error("fail");
} catch (e) {
  var msg = "caught";
}
console.log(msg);
```

### Modify 7: Fix hoisting dependency
**Description:** Move variable declaration before its usage.
```javascript
function test() {
  console.log(x);
  var x = 10;
}
```

### Modify 8: Fix nested scope variable
**Description:** Return the variable from nested function instead.
```javascript
function outer() {
  function inner() {
    let x = 10;
  }
  console.log(x);
}
```

### Modify 9: Fix for-in scope leak
**Description:** Use let in for-in to scope the variable to the loop.
```javascript
const obj = { a: 1 };
for (var key in obj) {
  console.log(key);
}
console.log(key);
```

### Modify 10: Remove global leak from IIFE
**Description:** Capture the variable as a return value instead.
```javascript
(function() {
  var internal = "secret";
})();
console.log(internal);
```

### Modify 11: Fix const in for loop
**Description:** Use let instead of const in for loop header.
```javascript
for (const i = 0; i < 5; i++) {
  console.log(i);
}
```

### Modify 12: Fix try-catch scope
**Description:** Declare variable outside try-catch if needed after.
```javascript
try {
  let x = 10;
  throw Error("test");
} catch (e) {
  console.log(x);
}
```

### Modify 13: Fix do-while scope leak
**Description:** Use let to scope the variable to the loop.
```javascript
do {
  var x = 10;
} while (false);
console.log(x);
```

### Modify 14: Fix function in block
**Description:** Move function declaration to proper scope.
```javascript
if (true) {
  function foo() { return 1; }
}
console.log(foo());
```

### Modify 15: Fix sibling scope access
**Description:** Use a shared outer scope for the variable.
```javascript
{
  let x = 1;
}
{
  console.log(x);
}
```

### Modify 16: Fix nested function scope
**Description:** Return the value from the nested function.
```javascript
function outer() {
  function inner() {
    let x = 10;
    return x;
  }
}
outer();
```

### Modify 17: Remove const redeclaration
**Description:** Use unique names for const variables in nested blocks.
```javascript
const x = 1;
{
  const x = 2;
}
```

### Modify 18: Fix eval var leak
**Description:** Use strict mode or avoid var in eval.
```javascript
function test() {
  eval("var x = 10;");
  console.log(x);
}
```

### Modify 19: Fix with statement scope
**Description:** Avoid with statement and use explicit property access.
```javascript
const obj = { x: 10 };
with (obj) {
  var x = 20;
}
```

### Modify 20: Fix labeled block scope
**Description:** Remove the label or use proper scoping.
```javascript
myBlock: {
  var x = 10;
}
console.log(x);
```

### Modify 21: Fix default parameter scope
**Description:** Use different name for parameter default.
```javascript
let x = 10;
function foo(x = x) {
  return x;
}
```

### Modify 22: Fix rest parameter scope
**Description:** Access rest parameter within the function only.
```javascript
function foo(...rest) {
  console.log(rest);
}
console.log(rest);
```

### Modify 23: Fix conditional block var
**Description:** Initialize var at top of function instead.
```javascript
if (Math.random() > 0.5) {
  var x = 10;
}
console.log(x);
```

### Modify 24: Fix nested if var scope
**Description:** Declare the variable at the function level instead.
```javascript
function test() {
  if (true) {
    if (Math.random() > 0.5) {
      var x = 10;
    }
    console.log(x);
  }
}
test();
```

### Modify 25: Fix IIFE return value
**Description:** Return the value from IIFE instead of leaking.
```javascript
const value = (function() {
  var internal = "secret";
})();
console.log(internal);
```

### Modify 26: Fix class field scope
**Description:** Use a method to access the private field.
```javascript
class MyClass {
  #value = 10;
}
const instance = new MyClass();
console.log(instance.#value);
```

### Modify 27: Fix static block scope
**Description:** Store static block variables on the class.
```javascript
class MyClass {
  static {
    let x = 10;
  }
}
console.log(x);
```

### Modify 28: Fix arrow function block scope
**Description:** Access variable before the arrow function scope.
```javascript
const fn = () => {
  let x = 10;
};
console.log(x);
```

### Modify 29: Fix generator function scope
**Description:** Access generator variable through yielded value.
```javascript
function* gen() {
  let x = 10;
  yield x;
}
console.log(x);
```

### Modify 30: Fix async function scope
**Description:** Access async function result through promise.
```javascript
async function fetch() {
  let data = 42;
  return data;
}
console.log(data);
```

### Modify 31: Fix destructuring scope
**Description:** Destructure with proper variable name in scope.
```javascript
const obj = { x: 10 };
{
  const { x } = obj;
}
console.log(x);
```

### Modify 32: Fix object destructuring rename
**Description:** Use renamed destructured variable.
```javascript
const obj = { x: 10 };
const { x: y } = obj;
console.log(x);
```

### Modify 33: Move shared variable to outer scope
**Description:** Declare the variable at the outer scope.
```javascript
{
  let x = 1;
}
{
  console.log(x);
}
```

### Modify 34: Fix for loop with var and timeout
**Description:** Use an IIFE to capture each iteration.
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Modify 35: Fix global var collision
**Description:** Use let instead of var at global scope.
```javascript
var x = 10;
var x = 20;
console.log(x);
```

### Modify 36: Remove implicit global
**Description:** Add declaration for the variable.
```javascript
function setValue() {
  value = 42;
}
setValue();
```

### Modify 37: Fix script scope conflict
**Description:** Use module or IIFE to isolate scope.
```javascript
<script>
  var appName = "MyApp";
</script>
```

### Modify 38: Move declaration before usage in block
**Description:** Reorder declarations to avoid TDZ.
```javascript
{
  console.log(x);
  let x = 10;
}
```

### Modify 39: Fix closure with correct variable
**Description:** Capture the correct value in each closure.
```javascript
for (var i = 0; i < 3; i++) {
  fns.push(() => console.log(i));
}
```

### Modify 40: Extract variable from nested scope
**Description:** Extract the inner variable to outer scope.
```javascript
function test() {
  if (true) {
    let x = 10;
  }
  return x;
}
```

### Modify 41: Fix catch block variable
**Description:** Use a different variable name in catch block.
```javascript
try {
  throw Error("fail");
} catch (e) {
  let e = "error";
  console.log(e);
}
```

### Modify 42: Add block scope for switch cases
**Description:** Add curly braces to each switch case.
```javascript
switch (value) {
  case 1:
    let x = "one";
    break;
}
```

### Modify 43: Fix promise chain scope
**Description:** Declare variable before the promise chain.
```javascript
Promise.resolve(1)
  .then(value => {
    let result = value * 2;
    return result;
  })
  .then(value => {
    console.log(result);
  });
```

### Modify 44: Fix event handler scope
**Description:** Use let or closure to capture correct value.
```javascript
for (var i = 0; i < 3; i++) {
  button.addEventListener("click", () => console.log(i));
}
```

### Modify 45: Fix arguments object scope
**Description:** Access arguments only inside the function.
```javascript
function foo() {
  console.log(arguments);
}
console.log(arguments);
```

### Modify 46: Fix this binding scope
**Description:** Use arrow function or bind to preserve this.
```javascript
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name);
  }
};
const greet = obj.greet;
greet();
```

### Modify 47: Fix new.target scope
**Description:** Access new.target only inside constructor.
```javascript
function Foo() {
  console.log(new.target);
}
console.log(new.target);
```

### Modify 48: Fix super scope
**Description:** Use super only inside class methods.
```javascript
class Foo {
  bar() {
    console.log(super.toString);
  }
}
```

### Modify 49: Remove global from callback
**Description:** Properly declare the variable in callback.
```javascript
function fetchData(callback) {
  callback("data");
}
fetchData(data => {
  result = data;
});
```

### Modify 50: Fix optional chaining scope
**Description:** Handle null/undefined with default value.
```javascript
const obj = null;
console.log(obj?.value);
```
