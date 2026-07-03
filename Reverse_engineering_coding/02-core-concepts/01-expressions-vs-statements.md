# Expressions vs Statements

## The Building Blocks of All Code

Every JavaScript program is built from two kinds of "things":

| Kind | What it does | Example |
|------|-------------|---------|
| **Expression** | Produces a **value** | `5 + 3` produces `8` |
| **Statement** | Performs an **action** | `if (x > 5) { }` does something |

Think of it like English:
- An **expression** is a noun phrase → "a red apple" → it **is** something
- A **statement** is a sentence → "Eat the apple." → it **does** something

---

## What Is an Expression?

An **expression** is any piece of code that produces a value. When JavaScript runs an expression, it evaluates it and gets a result.

```javascript
// All of these are EXPRESSIONS because they produce values:
10                     // → produces the number 10
5 + 3                  // → produces 8
true                   // → produces true
"Hello"                // → produces the string "Hello"
x * y                  // → produces whatever x multiplied by y is
Math.sqrt(16)          // → produces 4
age > 18               // → produces true or false
a ? b : c              // → produces b or c
```

**The golden test:** Can you put it on the right side of `=`? Then it's an expression!

```javascript
let result = 5 + 3;          // ✅ OK — 5+3 is an expression
let result = Math.sqrt(16);  // ✅ OK — Math.sqrt(16) produces 4
let result = if (true) { };  // ❌ SyntaxError — if is a statement, not an expression
```

### Types of Expressions

| Expression Type | Example | What it Produces |
|----------------|---------|-----------------|
| Number literal | `42` | The number 42 |
| String literal | `"Hello"` | The string "Hello" |
| Boolean literal | `true` | The boolean true |
| Variable reference | `name` | Whatever value is stored in `name` |
| Arithmetic | `a + b` | A number |
| String concatenation | `"Hi" + " " + "Tim"` | `"Hi Tim"` |
| Logical | `a && b` | The truthy or falsy value |
| Comparison | `x > 5` | `true` or `false` |
| Assignment | `x = 5` | The assigned value (`5`) |
| Function call | `foo()` | The return value (or `undefined`) |
| Ternary | `a ? b : c` | Either `b` or `c` |
| Array literal | `[1, 2, 3]` | An array object |
| Object literal | `{ name: "Tim" }` | An object |

### Assignment IS an Expression

This surprises many beginners: assignment itself produces a value.

```javascript
let x;
console.log(x = 10);   // Prints: 10 — the assignment x=10 produces the value 10
```

This is why you can **chain assignments**:

```javascript
let a, b, c;
a = b = c = 5;

// JavaScript reads it RIGHT to LEFT:
// Step 1: c = 5   → c is now 5, this expression produces 5
// Step 2: b = 5   → b is now 5, this expression produces 5
// Step 3: a = 5   → a is now 5
console.log(a, b, c);  // 5  5  5
```

---

## What Is a Statement?

A **statement** is an instruction that performs an **action**. It does NOT necessarily produce a value.

```javascript
let x = 10;                         // declares a variable (declaration statement)
if (x > 5) { }                     // makes a decision (if statement)
for (let i = 0; i < 5; i++) { }    // repeats something (for loop statement)
return x;                           // exits a function (return statement)
throw new Error("Oops");            // throws an error (throw statement)
break;                              // exits a loop (break statement)
```

### Expression Statements

When you add a semicolon after an expression, it becomes a **statement**:

```javascript
console.log("Hello");   // function call expression used as a statement (prints!)
x = 5;                  // assignment expression used as a statement (stores a value!)
```

---

## Function Declaration vs Function Expression

The same idea (creating a function) can be written as either a declaration or an expression:

```javascript
// Way 1: Function DECLARATION (STATEMENT)
// Starts with keyword "function" — performs action of creating a named function
function add(a, b) {
    return a + b;
}

// Way 2: Function EXPRESSION
// The function is on the RIGHT side of = — it's a value
const add = function(a, b) {
    return a + b;
};

// Way 3: Arrow Function (EXPRESSION)
const add = (a, b) => a + b;
```

**Why this matters:**
- Function **declarations** are fully **hoisted** (usable before they appear)
- Function **expressions** are **not hoisted** (must be defined before use)

---

## Reverse Engineering Questions

### For `5 + 3`

| Question | Answer |
|----------|--------|
| Does this produce a value? | Yes — it produces `8` |
| What type of value? | A number |
| Is it an expression? | Yes — arithmetic expression |
| Where can it appear? | Anywhere a value is expected: `let x = 5+3`, `console.log(5+3)` |

### For `if (age > 18)`

| Question | Answer |
|----------|--------|
| Does `if` produce a value? | No — `if` is a statement |
| Is `age > 18` an expression? | Yes — comparison expression, produces `true` or `false` |
| Can `if` be used as a value? | No — `let x = if (true) { }` is a SyntaxError |

### Quick Test

```javascript
console.log(5 + 3);          // ✅ Works → 5+3 is an expression
console.log(Math.sqrt(9));   // ✅ Works → Math.sqrt(9) is an expression
console.log(x = 10);         // ✅ Works → assignment is an expression
console.log(let y = 5);      // ❌ SyntaxError → let declaration is a statement
console.log(if (true) { });  // ❌ SyntaxError → if is a statement
```
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Module 2 Chapter 3](../02-core-concepts/03-var-let-const.md): Scope Chain and TDZ to learn about scope.
