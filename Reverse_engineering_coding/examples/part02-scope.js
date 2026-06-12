/**
 * PART 2 — Scope, hoisting, let/const/var, Temporal Dead Zone (TDZ)
 * Run with: node part02-scope.js
 */

// ---------------------------------------------------------------
// 1. Global scope — accessible everywhere
// ---------------------------------------------------------------

const globalVar = 'I am global';

function showGlobal() {
  console.log('Accessing global from inside a function:', globalVar);
}

showGlobal();
console.log('Accessing global from top-level:', globalVar);

// ---------------------------------------------------------------
// 2. Function scope — var is function-scoped
// ---------------------------------------------------------------

function functionScopeDemo() {
  var functionScoped = 'I exist only inside this function';
  console.log('Inside function:', functionScoped);
}

functionScopeDemo();
// console.log(functionScoped); // ReferenceError: functionScoped is not defined

// ---------------------------------------------------------------
// 3. Block scope — let and const are block-scoped
// ---------------------------------------------------------------

if (true) {
  let blockLet = 'I am block-scoped with let';
  const blockConst = 'I am block-scoped with const';
  var blockVar = 'I am NOT block-scoped (var leaks out)';
  console.log('Inside block:', blockLet, blockConst);
}

// console.log(blockLet);  // ReferenceError
// console.log(blockConst); // ReferenceError
console.log('var leaks out of block:', blockVar); // works — var is function-scoped

// ---------------------------------------------------------------
// 4. Hoisting — declarations are moved to the top
// ---------------------------------------------------------------

// Function declarations are hoisted entirely
hoistedFunction(); // works — function declaration is hoisted

function hoistedFunction() {
  console.log('I am hoisted — can be called before my definition');
}

// var is hoisted (declaration only, not initialization)
console.log('hoistedVar before assignment:', hoistedVar); // undefined, not ReferenceError
var hoistedVar = 'I am hoisted but undefined until this line';
console.log('hoistedVar after assignment:', hoistedVar);

// let and const are hoisted BUT not initialized (Temporal Dead Zone)
// console.log(tdzLet); // ReferenceError: Cannot access before initialization
// console.log(tdzConst); // ReferenceError: Cannot access before initialization
let tdzLet = 'I am in the TDZ until this line';
const tdzConst = 'Me too';
console.log('let works fine after initialization:', tdzLet);

// ---------------------------------------------------------------
// 5. Temporal Dead Zone (TDZ) explained
// ---------------------------------------------------------------

{
  // This is the TDZ for `name` — from block start to the declaration
  // console.log(name); // ReferenceError if uncommented
  const name = 'Alice';
  console.log('TDZ is over, name is:', name);
}

// ---------------------------------------------------------------
// 6. Lexical scope (static scope) — inner functions see outer scopes
// ---------------------------------------------------------------

const outer = 'outer';

function outerFunction() {
  const middle = 'middle';

  function innerFunction() {
    const inner = 'inner';
    console.log('Lexical scope chain:', outer, middle, inner);
  }

  innerFunction();
}

outerFunction();

// ---------------------------------------------------------------
// 7. Closure — a function retains access to its lexical scope
// ---------------------------------------------------------------

function createCounter() {
  let count = 0; // private variable — cannot be accessed from outside

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log('Closure count:', counter()); // 1
console.log('Closure count:', counter()); // 2
console.log('Closure count:', counter()); // 3
// console.log(count); // ReferenceError: count is not defined

// ---------------------------------------------------------------
// 8. Practical example — var vs let in loops
// ---------------------------------------------------------------

// var in loop — all callbacks share the same `i`
const varCallbacks = [];
for (var i = 0; i < 3; i++) {
  varCallbacks.push(function () {
    return i;
  });
}
console.log('var loop — all return 3:', varCallbacks[0](), varCallbacks[1](), varCallbacks[2]());

// let in loop — each callback gets its own `i`
const letCallbacks = [];
for (let j = 0; j < 3; j++) {
  letCallbacks.push(function () {
    return j;
  });
}
console.log('let loop — each has own value:', letCallbacks[0](), letCallbacks[1](), letCallbacks[2]());
