/**
 * PART 1 — Foundations: console.log, variables, data types
 * Run with: node part01-intro.js
 */

// ---------------------------------------------------------------
// 1. console.log — the most basic debugging tool
// ---------------------------------------------------------------

console.log('Hello, JavaScript Ecosystem Mastery!');
console.log('This is a string:', 'Hello');
console.log('This is a number:', 42);
console.log('This is a boolean:', true);
console.log('This is an object:', { key: 'value' });
console.log('This is an array:', [1, 2, 3]);

// String interpolation with template literals (backticks)
const topic = 'variables';
console.log(`We are learning about ${topic}.`);

// ---------------------------------------------------------------
// 2. Variables — let, const, var
// ---------------------------------------------------------------

// let — mutable, block-scoped (modern, preferred)
let score = 0;
score = 10; // can be reassigned
console.log('let score:', score);

// const — immutable binding, block-scoped (modern, preferred)
const playerName = 'Alice';
// playerName = 'Bob'; // TypeError: Assignment to constant variable
console.log('const playerName:', playerName);

// const does NOT make the value immutable, only the binding
const person = { name: 'Alice' };
person.name = 'Bob'; // allowed — object properties can change
console.log('const person (mutated):', person);

// var — function-scoped, hoisted (legacy, avoid)
var oldWay = 'I am var';
console.log('var oldWay:', oldWay);

// ---------------------------------------------------------------
// 3. Data Types — 7 primitive types + Object
// ---------------------------------------------------------------

// String
const str = 'hello';
console.log('string:', typeof str, str);

// Number (includes integers and floats — all IEEE 754)
const int = 42;
const float = 3.14;
const neg = -10;
console.log('number:', typeof int, int, float, neg);

// BigInt (for arbitrarily large integers)
const big = 9007199254740991n;
console.log('bigint:', typeof big, big);

// Boolean
const yes = true;
const no = false;
console.log('boolean:', typeof yes, yes, no);

// undefined — variable declared but no value assigned
let nothing;
console.log('undefined:', typeof nothing, nothing);

// null — intentional absence of any object value
const empty = null;
console.log('null:', typeof empty, empty); // typeof null === 'object' (legacy bug)

// Symbol — unique, immutable identifier
const sym1 = Symbol('id');
const sym2 = Symbol('id');
console.log('symbol:', typeof sym1, sym1, sym2);
console.log('symbols are unique:', sym1 === sym2); // false

// Object — collection of key/value pairs
const obj = { name: 'Alice', age: 25 };
console.log('object:', typeof obj, obj);

// Array — ordered list (actually an object)
const arr = [1, 2, 3];
console.log('array:', typeof arr, arr); // typeof arr === 'object'

// Function — callable object
function greet() {
  return 'Hi!';
}
console.log('function:', typeof greet, greet);

// ---------------------------------------------------------------
// 4. Type coercion and type checking
// ---------------------------------------------------------------

console.log('"5" - 2:', '5' - 2); // 3 (string coerced to number)
console.log('"5" + 2:', '5' + 2); // "52" (number coerced to string, concatenation)
console.log('Boolean(0):', Boolean(0)); // false
console.log('Boolean(""):', Boolean('')); // false
console.log('Boolean("hello"):', Boolean('hello')); // true

// Use === not == (strict equality checks value AND type)
console.log('5 == "5":', 5 == '5'); // true (loose, coerces)
console.log('5 === "5":', 5 === '5'); // false (strict, no coercion)

// typeof operator
console.log('typeof "hello":', typeof 'hello');
console.log('typeof 42:', typeof 42);
console.log('typeof true:', typeof true);
console.log('typeof undefined:', typeof undefined);
console.log('typeof null:', typeof null); // 'object' — famous JS bug
console.log('typeof {}:', typeof {});
console.log('typeof []:', typeof []); // 'object'
console.log('typeof function(){}:', typeof function () {}); // 'function'
