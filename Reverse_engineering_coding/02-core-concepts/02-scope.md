# Scope

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Is Scope?

**Scope** answers the question: **"From where in my code can I see this variable?"**

Think of it like rooms in a house:
- Variables declared in the **kitchen** are only visible in the kitchen
- Variables declared in the **living room** are only visible in the living room
- Variables declared **in the hallway** (global) are visible everywhere
- A child in the kitchen can see the hallway, but NOT into the living room

```
     🌐 Global Scope (hallway — visible everywhere)
         ↓ contains:
    📦 Function Scope (a room — visible only inside)
         ↓ contains:
     🧊 Block Scope (a corner — visible only in that block)
```

---

## Global Scope — Variables Visible Everywhere

Variables declared **outside** any function or block are **global**. They can be accessed from anywhere.

```javascript
let userName = "Tim";       // global scope
let score = 100;            // global scope

function showScore() {
    console.log(userName + " scored " + score);  // ✅ Can access globals
}

if (true) {
    console.log(userName);   // ✅ Can access globals from inside a block
}
```

### Global Memory Diagram

```
┌──────────────────────────────────────────────┐
│               🌐 GLOBAL MEMORY               │
│                                              │
│   userName  ──────────────  "Tim"            │
│   score     ──────────────  100              │
│   showScore ──────────────  [Function]       │
│                                              │
│   (Lives for the ENTIRE lifetime of the app) │
└──────────────────────────────────────────────┘
```

### Dangers of Global Variables

```javascript
let total = 0;

function addPoints(n) {
    total += n;    // modifies the global — hidden side effect!
}

function resetGame() {
    total = 0;     // another function modifies the same global!
}
// Problem: ANY function can modify "total" — bugs are hard to find!
```

**Why globals are dangerous:**
- Any code can accidentally overwrite them
- Hard to find which function changed the value
- Memory is never freed until the page is closed

---

## Function Scope — Variables Visible Only Inside a Function

Variables declared **inside a function** live and die with that function.

```javascript
function makeGreeting() {
    let greeting = "Hello!";    // function-scoped
    let punctuation = "!!!";    // function-scoped
    console.log(greeting + punctuation);  // ✅ OK
}

makeGreeting();   // "Hello!!!!"

console.log(greeting);    // ❌ ReferenceError — doesn't exist outside
console.log(punctuation); // ❌ ReferenceError — doesn't exist outside
```

### Function Scope Memory Diagram

```
DURING makeGreeting():
┌───────────────────┐     ┌──────────────────────────────┐
│  🌐 GLOBAL        │     │  📦 makeGreeting() MEMORY    │
│  makeGreeting ──  │     │  greeting → "Hello!"         │
│  [Function]       │     │  punctuation → "!!!!"        │
└───────────────────┘     └──────────────────────────────┘

AFTER makeGreeting() returns: makeGreeting's memory is DESTROYED
```

---

## Block Scope — Variables Visible Only Inside `{ }`

A **block** is anything between curly braces `{ }`. Variables declared with `let` or `const` inside a block are **block-scoped**.

```javascript
{
    let blockVar = "I live in this block";
    const alsoBlock = "Me too";
    var notBlock = "I escape blocks!";  // ⚠️ var is different!

    console.log(blockVar);    // ✅ OK
}

console.log(blockVar);   // ❌ ReferenceError — blockVar is gone
console.log(alsoBlock);  // ❌ ReferenceError — alsoBlock is gone
console.log(notBlock);   // ✅ "I escape blocks!" — var ignores blocks!
```

---

## The Scope Chain — How JavaScript Searches for Variables

JavaScript searches **outward** through parent scopes until it finds the variable:

```javascript
let level1 = "I am global";

function outer() {
    let level2 = "I am in outer";

    function inner() {
        let level3 = "I am in inner";

        console.log(level3);  // 1️⃣ Found in inner's own scope ✅
        console.log(level2);  // 2️⃣ Not in inner → checks outer → found! ✅
        console.log(level1);  // 3️⃣ Not in inner/outer → checks global → found! ✅
        console.log(unknown); // 4️⃣ Not found anywhere → 💥 ReferenceError
    }
    inner();
}
outer();
```

### Scope Chain Diagram

```
inner() scope    ────── { level3 }
    ↑ not found? go up
outer() scope    ────── { level2 }
    ↑ not found? go up
Global scope     ────── { level1 }
    ↑ not found? go up
null             ────── ReferenceError! ❌
```

---

## Reverse Engineering Questions

### For `console.log(score)`

| Question | Answer |
|----------|--------|
| Where is `score` declared? | Trace outward through scopes until you find its declaration |
| Is it global? | Is the declaration at the top level, outside all functions and blocks? |
| Is it local? | Is the declaration inside the current function or block? |
| What if it's not found? | JavaScript throws `ReferenceError: score is not defined` |
| Which scope wins if there are two? | The **closest** (innermost) one — inner scope shadows outer scope |

### Scope Tracing Exercise

```javascript
let color = "blue";          // Global scope

function paintWall() {
    let color = "red";       // paintWall's local scope
    let brushSize = "large"; // paintWall's local scope

    function applyPaint() {
        console.log(color);      // Which "color"? → "red" (shadows global)
        console.log(brushSize);  // → "large" (from parent scope)
        console.log(texture);    // → ReferenceError (not declared)
    }
    applyPaint();
}

paintWall();
```
## Next Steps

[Back to Chapter 1](01-expressions-vs-statements.md): Expressions vs Statements
[Proceed to Chapter 3](03-var-let-const.md): var vs let vs const to learn about var vs let vs const.
