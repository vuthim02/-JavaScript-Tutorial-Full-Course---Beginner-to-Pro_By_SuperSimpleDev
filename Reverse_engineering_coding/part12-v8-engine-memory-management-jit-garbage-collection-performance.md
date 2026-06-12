# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

# Part 12 — V8 Engine Internals, Memory Management, JIT Compilation, Hidden Classes, Garbage Collection, and Performance Engineering

---

# Mission

This part explores how JavaScript actually runs inside engines such as:

- V8 (Chrome, Node.js, Deno, Electron)
- SpiderMonkey (Firefox)
- JavaScriptCore (Safari)

Understanding these internals explains:

- Why some code is fast.
- Why some code becomes slow.
- How memory is managed.
- Why memory leaks happen.
- How modern JavaScript engines optimize code.

---

# Overall Pipeline

```
Source Code
     ↓
Parser
     ↓
AST
     ↓
Interpreter
     ↓
Bytecode
     ↓
Profiler
     ↓
JIT Compiler
     ↓
Machine Code
     ↓
CPU
```

Every JavaScript engine follows this general pipeline. The details differ between engines but the conceptual flow is the same.

---

# PART I — SOURCE CODE TO EXECUTION

---

# Chapter 1 — Parsing

## How Parsing Works

When the engine receives source code, the first step is **parsing**. The parser reads raw text character by character and converts it into a stream of **tokens**.

```javascript
let x = 10;
```

The parser produces tokens:

```
Token: KEYWORD    -> "let"
Token: IDENTIFIER -> "x"
Token: OPERATOR   -> "="
Token: NUMBER     -> "10"
Token: PUNCTUATOR -> ";"
```

## Two Modes of Parsing

V8 uses a **two-pass parser**:

| Mode | Speed | Output | When Used |
|------|-------|--------|-----------|
| **Eager (full) parse** | Slower | Full AST | Top-level code, immediately invoked functions |
| **Lazy (pre) parse** | Faster | Skipped body | Functions not yet called |

```javascript
function eagerlyParsed() {
    // fully parsed now
}

function lazilyParsed() {
    // only pre-parsed now
    // fully parsed when first called
}
```

V8 pre-parses the second function to avoid the cost of building a full AST until the function is actually needed.

## Syntax Errors Happen Here

```javascript
let x = ;  // SyntaxError: Unexpected token ';'
```

The parser throws immediately. No execution occurs.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How does engine understand text? | Tokenization then parsing |
| What structure represents code? | Abstract Syntax Tree (AST) |
| Which functions parse eagerly? | Top-level code and IIFEs |
| Which functions parse lazily? | Functions defined but not yet invoked |
| What happens on syntax error? | Parser throws, no execution |

---

# Chapter 2 — AST (Abstract Syntax Tree)

## What is an AST?

The parser produces an **Abstract Syntax Tree** — a tree representation of the code structure. Each node represents a construct in the code.

```javascript
let x = 10 + 5;
```

AST representation:

```
Program
  └── VariableDeclaration
        ├── Identifier ("x")
        └── BinaryExpression (+)
              ├── Literal (10)
              └── Literal (5)
```

## AST Node Types

| Node Type | Example Code |
|-----------|-------------|
| `VariableDeclaration` | `let x = 10` |
| `BinaryExpression` | `a + b` |
| `CallExpression` | `foo()` |
| `MemberExpression` | `obj.prop` |
| `FunctionDeclaration` | `function f() {}` |
| `IfStatement` | `if (x) {}` |
| `ForStatement` | `for (;;) {}` |

## AST in Practice

Frameworks operate on ASTs:

- **Babel** — transforms modern JS to backwards-compatible JS by rewriting the AST.
- **ESLint** — analyzes AST nodes to detect rule violations.
- **Prettier** — reformats code by printing the AST back to text.
- **Webpack/Rollup** — parse imports/exports via AST.

Example Babel transformation:

```javascript
// Input (arrow function)
const add = (a, b) => a + b;

// AST node types change
// ArrowFunctionExpression → FunctionExpression
// Output (regular function)
const add = function(a, b) { return a + b; };
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which node represents `a + b`? | `BinaryExpression` |
| Which child nodes does `BinaryExpression` have? | `left`, `right`, `operator` |
| Can tools transform code without running it? | Yes, via AST manipulation |
| What type of node is `if (x) { y() }`? | `IfStatement` with `test`, `consequent`, `alternate` |
| How does ESLint detect unused variables? | Analyzes `VariableDeclarator` nodes and reference counts |

---

# Chapter 3 — Interpreter

## Ignition (V8's Interpreter)

After parsing produces the AST, V8's **Ignition** interpreter converts the AST into **bytecode**.

```javascript
let a = 5;
let b = 10;
let c = a + b;
```

Bytecode (simplified):

```
LdaSmi [5]        // Load Small Integer 5 into accumulator
Star r0           // Store to register r0 (a)
LdaSmi [10]       // Load 10 into accumulator
Star r1           // Store to register r1 (b)
Ldar r0           // Load r0 into accumulator
Add r1            // Add r1 to accumulator
Star r2           // Store to register r2 (c)
```

## Why Bytecode?

| Reason | Explanation |
|--------|-------------|
| **Fast startup** | Bytecode generates quickly, execution starts immediately |
| **Compact** | Bytecode is smaller than machine code, saves memory |
| **Portable** | Same bytecode works across CPU architectures |

## Execution Speed Hierarchy

```
Fastest:  Machine Code (compiled)
Medium:   Bytecode (interpreted)
Slowest:  AST walking (naive interpreter)
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is code interpreted or compiled first? | Interpreted first (bytecode) |
| Why not compile directly to machine code? | Slower startup, more memory |
| What converts AST to bytecode? | Ignition interpreter (V8) |
| What are V8 bytecodes like? | Register-based instructions (Ldar, Star, Add, etc.) |

---

# Chapter 4 — JIT Compiler

## What is JIT?

**JIT** = **Just-In-Time Compilation**. The engine compiles code during execution, not ahead of time.

## TurboFan (V8's Optimizing Compiler)

V8 uses **TurboFan** as its JIT compiler. It compiles **hot code** — functions that execute frequently.

```javascript
function sum(a, b) {
    return a + b;
}

// Cold run (interpreted)
for (let i = 0; i < 100; i++) {
    sum(i, i + 1);
}

// Gets hot around 10,000+ invocations
// TurboFan compiles to machine code
```

## How JIT Works

```
Interpreter runs bytecode
       ↓
Profiler counts executions
       ↓
Hot function detected (>threshold)
       ↓
TurboFan compiles to optimized machine code
       ↓
Machine code replaces interpreted version
       ↓
Even faster execution
```

## Performance Impact

| Operation | Interpreted | JIT Compiled |
|-----------|-------------|--------------|
| `a + b` | ~10-50 ns | ~1-3 ns |
| Property access | ~50-100 ns | ~2-5 ns |
| Function call | ~20-100 ns | ~2-10 ns |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which functions execute most? | Hot candidates for JIT |
| Can optimization occur? | Yes, if code is stable and hot |
| What triggers compilation? | Execution count threshold |
| What is TurboFan? | V8's optimizing JIT compiler |
| What was Crankshaft? | Older V8 JIT compiler (replaced by TurboFan) |

---

# PART II — MEMORY MODEL

---

# Chapter 5 — Stack Memory

## Characteristics

| Property | Detail |
|----------|--------|
| **Size** | Small (~1-8 MB per thread) |
| **Speed** | Very fast (push/pop) |
| **Lifetime** | Automatic (function scope) |
| **Stores** | Primitives, references, call frames |

## What Lives on the Stack

```javascript
let age = 20;           // Primitive → stack
let name = "Alice";     // Primitive (string) → stack or interned
let active = true;      // Primitive → stack
let user = {};          // Reference (pointer) → stack, object → heap
```

Memory layout:

```
Stack (high to low address)
┌─────────────────────┐
│  Call Frame: test()  │
│  ├── age: 20        │
│  ├── name: "Alice"  │
│  └── user: ref ────┐│
├─────────────────────┤│
│  Call Frame: main()  ││
│  └── ...            ││
└─────────────────────┘│
                       │
Heap                   │
┌───────────────────┐  │
│ { name: "Alice" }  ◄─┘
└───────────────────┘
```

## Stack Overflow

```javascript
function recurse() {
    recurse();
}
recurse();
// RangeError: Maximum call stack size exceeded
```

Each recursive call pushes a new frame. When the stack limit is reached, the engine throws.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What lives on the stack? | Primitives, references, call frames |
| Is `let x = 5` on stack? | Yes (primitive) |
| Is `let x = {}` on stack? | The reference is on stack; the object is on heap |
| What happens on stack overflow? | RangeError thrown |

---

# Chapter 6 — Heap Memory

## Characteristics

| Property | Detail |
|----------|--------|
| **Size** | Large (GBs, limited by RAM) |
| **Speed** | Slower (allocation + GC) |
| **Lifetime** | Manual/automatic (GC) |
| **Stores** | Objects, arrays, closures, functions |

## What Lives on the Heap

```javascript
let user = { name: "John" };         // Object → heap
let items = [1, 2, 3];               // Array → heap
let greet = function() { return "hi"; }; // Function → heap
let bigData = new Array(1000000);     // Large array → heap
```

Memory diagram:

```
Stack
┌──────────────┐
│ user: ref ─────┐
│ items: ref ───┐│
│ greet: ref ──┐││
└──────────────┘│││
                │││
Heap            │││
┌───────────────┘││
│  Object        ││
│  └── name: "John"│
│                ││
│  Array         ◄┘│
│  └── [1, 2, 3]  │
│                 │
│  Function      ◄┘
│  └── body: return "hi"
└─────────────────┘
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What lives on the heap? | Objects, arrays, closures, functions |
| Is the value `5` on heap? | No, primitive on stack |
| Is `[1, 2, 3]` on heap? | Yes, array is an object |
| Are functions on heap? | Yes, they're objects |

---

# Chapter 7 — References

## Reference Semantics

```javascript
let a = { x: 10 };
let b = a;
```

Memory:

```
Stack

a: REF#1234 ─────────┐
b: REF#1234 ─────────┤
                     ▼
Heap: REF#1234
┌──────────────┐
│ { x: 10 }    │
└──────────────┘
```

Changing through one reference affects the other:

```javascript
b.x = 100;
console.log(a.x); // 100 — same object
```

## Assignment is Not Copy

```javascript
let a = { x: 10 };
let b = a;           // Reference copy, NOT object copy
let c = { x: 10 };   // New object, different reference

console.log(b === a); // true (same reference)
console.log(c === a); // false (different object)
```

## Null vs Undefined References

```javascript
let ref1 = null;      // Explicitly no reference
let ref2;             // undefined — not initialized
let ref3 = {};        // Valid reference
ref3 = null;          // Reference removed, object becomes collectible
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is object copied on assignment? | No, only reference is copied |
| Can two variables point to same object? | Yes |
| Does `b = a` create a new object? | No |
| When does an object become collectible? | When no references remain |

---

# PART III — GARBAGE COLLECTION

---

# Chapter 8 — Why Garbage Collection Exists

## The Problem

Without garbage collection, every `new` or `{}` allocation would permanently consume memory.

```javascript
function createTemp() {
    let temp = { data: new Array(10000) };
    return temp.value;   // oops, meant temp.data
    // temp object is now unreachable — leak
}
```

## What GC Does

- Tracks allocated memory.
- Identifies objects no longer reachable.
- Frees their memory.
- Returns freed memory to the pool.

## Automatic vs Manual

| Language | Memory Management |
|----------|------------------|
| JavaScript | Automatic (GC) |
| C / C++ | Manual (`malloc`/`free`) |
| Rust | Ownership model (compile-time) |
| Java | Automatic (GC) |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Who still references this object? | Determines if GC-eligible |
| After function exits, what happens? | Local variables out of scope, objects may become collectible |
| Can I force GC? | Not in JS (`gc()` exists in Node with `--expose-gc` but not standard) |

---

# Chapter 9 — Mark and Sweep

## The Algorithm

V8 uses a **mark-and-sweep** garbage collector.

### Phase 1: Mark

Starting from **roots** (global object, stack variables, registers), the GC traverses all references and **marks** every reachable object.

```
Roots (global, stack)
  │
  ├──► user ──► address ──► city
  │
  └──► config
```

### Phase 2: Sweep

The GC iterates the heap. Unmarked objects are freed.

```
Before sweep:
Heap: [objA(marked), objB(unmarked), objC(marked), objD(unmarked)]

After sweep:
Heap: [objA(marked), objC(marked), free_space, free_space]
```

## Example

```javascript
let user = { name: "Alice" };
let temp = { data: "temporary" };

user = null;  // user object still referenced? No. Collectible.
              // temp object still referenced? No. Collectible.
```

After reassignment, both objects have no references. Next GC mark phase won't reach them. Sweep phase reclaims their memory.

## Tri-Color Abstraction

| Color | Meaning |
|-------|---------|
| **White** | Unvisited (potentially garbage) |
| **Gray** | Visited, children not yet processed |
| **Black** | Visited, all children processed |

After marking: white objects are garbage.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Can global object reach this value? | If yes, object survives GC |
| What are roots? | Global object, stack variables, registers |
| What colors are used? | White (unvisited), Gray (in-progress), Black (done) |
| What phase removes objects? | Sweep |

---

# Chapter 10 — Generational GC

## The Generational Hypothesis

**"Most objects die young."**

V8 divides the heap into generations:

| Generation | Size | GC Frequency | Contents |
|------------|------|-------------|----------|
| **Young (Nursery)** | ~1-8 MB | Frequent | Newly allocated objects |
| **Old** | Large | Infrequent | Objects surviving multiple GCs |

## Young Generation (Scavenge)

```javascript
function process() {
    let a = { temp: true };   // Young generation
    let b = { temp: true };   // Young generation
    // Do work...
}   // a, b go out of scope → collected in next young GC
```

Young GC (called **Scavenge**) uses Cheney's algorithm — a semi-space copy collector.

```
Young Space (before GC):
┌──────────────────────┬──────────────────────┐
│   From-space         │   To-space           │
│   [obj1] [obj2]      │   [empty]            │
│   [obj3]             │                      │
└──────────────────────┴──────────────────────┘

Young Space (after GC — survivors copied to To-space, then swap):
┌──────────────────────┬──────────────────────┐
│   To-space (new From)│   From-space (new To)│
│   [obj1] (survived)  │   [empty]            │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

## Promotion to Old Generation

If an object survives multiple young GCs (typically 2), it gets **promoted** to the old generation.

```javascript
let cache = {};           // Young initially
cache.data = "important"; // Still referenced after multiple GCs
                          // Promoted to old generation
```

## Old Generation (Mark-Sweep-Compact)

- **Mark-Sweep**: As described in Chapter 9.
- **Mark-Compact**: Defragments memory by moving objects together, reducing fragmentation.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Short-lived object? | Young generation |
| Long-lived cache? | Old generation |
| Why separate generations? | Most objects die young; GC can focus on small young space |
| What is promotion? | Moving survivor from young to old |

---

# PART IV — MEMORY LEAKS

---

# Chapter 11 — Global Variables

## The Problem

```javascript
function setUser(name) {
    user = name;  // No let/const/var — accidental global!
}

setUser("John");
```

In non-strict mode, assignment to undeclared variable creates a property on the global object.

```javascript
// What actually happens:
window.user = "John";  // browser
globalThis.user = "John"; // Node
```

The global object is a root. Global variables are never GC'd until the page closes.

## Detection

```javascript
'use strict';

function setUser(name) {
    user = name;  // ReferenceError in strict mode
}
```

## Prevention

- Always use `'use strict'`.
- Use `let`, `const`, or `var`.
- Lint with ESLint `no-undef` rule.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this variable global? | Check if declared with `let`/`const`/`var` |
| Does `x = 5` create a global? | Yes, in non-strict mode |
| Can globals be collected? | Only if removed from global object |

---

# Chapter 12 — Forgotten Timers

## The Problem

```javascript
function startUpdates() {
    setInterval(() => {
        // fetch data, update DOM, etc.
    }, 1000);
}

startUpdates();
// Later the component is destroyed
// But the interval continues forever
```

The interval callback references variables in its closure. As long as the interval is active:

- The callback is referenced by the timer system.
- Everything the callback closes over is retained.
- **Never collected.**

## Retained Memory

```javascript
function startUpdates() {
    let hugeData = new Array(10000000);

    setInterval(() => {
        console.log(hugeData.length); // Closure keeps hugeData alive
    }, 1000);
}

startUpdates();
// hugeData can never be GC'd while interval runs
```

## The Fix

```javascript
const intervalId = setInterval(() => {
    // do work
}, 1000);

// When stopping:
clearInterval(intervalId);
```

## Pattern: Self-Cleaning Timeout

```javascript
function startUpdates(duration) {
    const intervalId = setInterval(() => {
        // do work
    }, 1000);

    setTimeout(() => clearInterval(intervalId), duration);
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is interval cleared? | If not, memory leak |
| What does the callback retain? | Entire closure scope |
| How to fix? | Save ID, call `clearInterval()` |

---

# Chapter 13 — Detached DOM Nodes

## The Problem

```javascript
let button = document.getElementById('myButton');
button.addEventListener('click', () => {
    console.log('clicked');
});

// Later: remove the button from DOM
button.remove();
// But: `button` variable still exists
// And: the event listener still references the callback
// And: the callback closes over `button`
// The DOM node is detached but NOT GC'd
```

The DOM node is no longer in the document tree (detached), but JavaScript still holds a reference to it.

## How It Leaks

```
DOM Tree                  JavaScript Heap
┌─────────────┐          ┌──────────────┐
│ document     │          │  button (var)│
│   └── ...    │          │       │      │
└─────────────┘          │       ▼      │
                         │  ┌─────────┐ │
The node is removed      │  │ button  │ │
from the DOM but         │  │ element │ │
still referenced         │  │ (hidden)│ │
in JS                    │  └─────────┘ │
                         └──────────────┘
```

## The Fix

```javascript
button.removeEventListener('click', handler);
button = null;  // Allow GC to reclaim the element
```

Or use a `WeakRef` / `AbortController`:

```javascript
const controller = new AbortController();
button.addEventListener('click', handler, { signal: controller.signal });

// Later:
controller.abort(); // Removes all listeners on that signal
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this node in the DOM tree? | If no, but referenced → detached node leak |
| Who references this DOM element? | JS variables, closures, event listeners |

---

# Chapter 14 — Closures Holding Large Data

## The Problem

```javascript
function createProcessor() {
    let hugeDataset = new Array(1000000).fill('data');

    return function process(id) {
        // Only uses id, never uses hugeDataset
        return `Processing ${id}`;
    };
}

const processor = createProcessor();
// processor retains hugeDataset via closure
// even though hugeDataset is never used
```

The inner function closes over `hugeDataset`. Even though the function never accesses it, the variable is retained because the engine cannot safely determine that it's unused in all possible scenarios.

## Visual

```
Closure scope:
┌─────────────────────────┐
│ hugeDataset (1M items)  │ ← retained forever
│ process (inner fn)      │
└─────────────────────────┘
```

## The Fix

```javascript
function createProcessor() {
    let hugeDataset = new Array(1000000).fill('data');

    // Null out before returning
    let result = function process(id) {
        return `Processing ${id}`;
    };

    hugeDataset = null;  // Allow GC to reclaim
    return result;
}
```

Or move the large data elsewhere:

```javascript
function createProcessor() {
    // Don't include huge data in closure
    return function process(id) {
        return `Processing ${id}`;
    };
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which variable keeps object alive? | Any variable in the closure chain |
| Is the variable actually used? | May be unused but still retained |
| How to break the closure? | Null the variable before returning |

---

# Chapter 15 — Cache Growth

## The Problem

```javascript
const cache = {};

function getData(key) {
    if (!cache[key]) {
        cache[key] = expensiveComputation(key);
    }
    return cache[key];
}
```

Over time, `cache` grows unbounded. If called with many unique keys, memory usage grows forever.

## The Fix: LRU Cache

**LRU** = **Least Recently Used**. Evicts the oldest entries when the cache reaches a size limit.

```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Map preserves insertion order
    }

    get(key) {
        if (!this.cache.has(key)) return undefined;

        // Move to end (most recently used)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Delete least recently used (first entry)
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        this.cache.set(key, value);
    }
}

const cache = new LRUCache(100);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Can cache grow forever? | Need size limit / eviction policy |
| What eviction strategy? | LRU, LFU, TTL, FIFO |
| Is `Map` better than `{}` for cache? | Yes (insertion order, `.delete()` works correctly) |

---

# PART V — HIDDEN CLASSES

One of V8's most important optimizations.

---

# Chapter 16 — Hidden Classes (Shapes)

## What Are Hidden Classes?

V8 assigns a **hidden class** (also called **Map** or **Shape**) to every object. The hidden class describes the object's **property layout**.

```javascript
let user = {
    name: "John",
    age: 25
};
```

V8 internally:

```
HiddenClass HC1
├── property: "name", offset: 0
└── property: "age",  offset: 8

Object user:
├── HiddenClass → HC1
├── name: "John"
└── age: 25
```

## Shared Hidden Classes

Objects with the same property structure share the same hidden class.

```javascript
let user1 = { name: "John", age: 25 };
let user2 = { name: "Jane", age: 30 };

// Both share the same HiddenClass HC1
```

```
HC1 ←── user1
       └── user2
```

This enables extremely fast property access because the engine knows the exact offset.

## Property Lookup Without Hidden Classes (naive)

```
1. Look up "name" in object's properties
2. If not found, check prototype
3. If not found, check prototype's prototype
4. ...
```

## Property Lookup With Hidden Classes

```
1. Read object's HiddenClass
2. Look up "name" offset from HiddenClass
3. Read memory at that offset directly
```

Skip prototype chain traversal for own properties.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Do objects share the same shape? | If properties added in same order → yes |
| What is a hidden class? | Internal structure describing property layout |
| Why does it help? | Direct memory offset instead of property name lookup |

---

# Chapter 17 — Hidden Class Transition

## Adding Properties Destroys Sharing

```javascript
let user1 = { name: "John", age: 25 };  // HC1
let user2 = { name: "Jane", age: 30 };  // HC1 (shared)

user1.salary = 50000;                    // HC1 → HC2 (transition)
                                         // user2 stays on HC1
```

Now `user1` and `user2` have different hidden classes.

```
Before:
HC1 ←── user1
       └── user2

After user1.salary = 50000:
HC1 ←── user2
HC2 ←── user1
```

## Transition Trees

V8 maintains a **transition tree**:

```
HC1 (name, age)
  │
  └── HC2 (name, age, salary)  ← transitioning by adding "salary"
```

## Deleting Properties

```javascript
delete user1.age;  // Creates new hidden class (often causes deopt)
```

Deleting properties is particularly bad because it forces the engine to create a new shape that doesn't fit the transition tree well.

## Optimization: Allocate All Properties Upfront

```javascript
// Bad: gradual addition
function createUser(name, age, salary) {
    let user = {};
    user.name = name;
    user.age = age;
    user.salary = salary;
    return user;
}

// Good: all properties at once
function createUser(name, age, salary) {
    return { name, age, salary };
}
```

The second version creates objects with a single hidden class sharing all instances.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does shape change after creation? | Yes, if properties are added/deleted |
| Does `delete obj.prop` hurt performance? | Yes, destroys hidden class |
| How to maintain shared shapes? | Initialize all properties in constructor |

---

# PART VI — INLINE CACHING (IC)

---

# Chapter 18 — How Inline Caching Works

## The Problem

```javascript
function getName(user) {
    return user.name;
}
```

Without optimization, every call would:

1. Look up `name` in the object.
2. Walk the hidden class.
3. Find the offset.
4. Read the value.

## The Optimization

After `getName` executes a few times, V8 records the hidden class of `user` and the offset of `name`. Next calls skip the lookup entirely.

```
Call 1: Lookup "name" → offset 0 (slow)
Call 2: Lookup "name" → offset 0 (slow)
Call 3: Cache: HC1.name @ offset 0
Call 4: Check hidden class == HC1? Yes → read offset 0 directly (fast)
Call 5: Check hidden class == HC1? Yes → read offset 0 directly (fast)
```

## Monomorphic vs Polymorphic vs Megamorphic

| State | Hidden Classes Seen | Performance |
|-------|-------------------|-------------|
| **Monomorphic** | 1 | Fastest (direct offset) |
| **Polymorphic** | 2-4 | Fast (check multiple, then offset) |
| **Megamorphic** | 5+ | Slow (full dictionary lookup) |

## Example

```javascript
// Monomorphic — all same shape
getName({ name: "A" });  // HC1
getName({ name: "B" });  // HC1
getName({ name: "C" });  // HC1

// Polymorphic — different shapes
getName({ name: "A" });       // HC1
getName({ name: "B", id: 1 }); // HC2

// Megamorphic — many shapes
getName({ name: "A" });
getName({ name: "B", id: 1 });
getName({ name: "C", role: "admin" });
getName({ name: "D", age: 30 });
getName({ name: "E", score: 100 });
```

## Why Monomorphic is Fastest

```javascript
// Monomorphic IC — generates code like:
if (obj.hiddenClass == expectedHC) {
    return obj[offsetOfName];  // single memory read
}

// Polymorphic IC — generates code like:
if (obj.hiddenClass == HC1) {
    return obj[offset1];
} else if (obj.hiddenClass == HC2) {
    return obj[offset2];
}
// More checks = slower
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is property access predictable? | Monomorphic → fast, megamorphic → slow |
| How many shapes flow through this function? | 1 = fast, 2-4 = okay, 5+ = slow |
| What ruins IC? | Different-shaped objects at same call site |

---

# PART VII — DEOPTIMIZATION

---

# Chapter 19 — What Triggers Deoptimization

## Deoptimization = Bailout

When the JIT compiler makes an assumption and that assumption is violated, the optimized code must **bail out** (deoptimize) back to the interpreter.

## Type Instability

```javascript
// JIT sees: add(1, 2), add(3, 4) → assumes numbers
function add(a, b) {
    return a + b;
}

add(1, 2);       // Interpreter → profiler sees numbers
add(3, 4);       // Gets hot → JIT compiles for numbers
add("A", "B");   // HEY! Strings, not numbers → DEOPTIMIZE
```

After deoptimization, the function may not be recompiled (or may be recompiled with different assumptions = less efficient).

## Sparse Object Changes

```javascript
function processUser(user) {
    return user.name;
}

processUser({ name: "A" });            // HC1
processUser({ name: "B", age: 5 });    // HC2 (polymorphic)
processUser({ name: "C", role: "admin", id: 7 }); // HC3 (megamorphic)
```

Each new shape triggers deoptimization of the optimized code.

## The Full Deopt Cycle

```
1. Function runs interpreted (slow)
2. Function gets hot
3. JIT compiles with current type information
4. Function runs fast (machine code)
5. New type/shape arrives
6. Compiled code assumptions violated
7. Deoptimization: fall back to interpreter
8. Function runs slow again
9. Possibly recompiled with more generic assumptions
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Are parameter types stable? | Yes → optimized, No → deoptimized |
| Do objects have consistent shapes? | Yes → IC fast, No → IC slow |
| What causes deopt? | Type changes, shape changes, `delete`, `Object.defineProperty` |
| Can deopt happen repeatedly? | Yes, thrashing between opt/deopt → worst performance |

---

# Chapter 20 — Common Deoptimization Triggers

| Code Pattern | Why It Deopts |
|-------------|---------------|
| `delete obj.prop` | Changes shape, destroys hidden class |
| `obj[x]` with variable key | Prevents IC (key not known statically) |
| `typeof x === 'string'` then `x.toUpperCase()` | Type changes cause deopt |
| `try/catch` inside hot function | V8 deopts functions with try/catch |
| `arguments` object | Disables many optimizations |
| `eval()` | Disables almost all optimization |
| Spread operator on large arrays | Can deopt in some engines |
| `__proto__` assignment | Deoptimizes prototype chain |
| Object destructuring with new properties | May cause shape changes |

```javascript
// Bad — deoptimization sources
function bad(arguments) {  // Don't name parameter 'arguments'
    console.log(arguments[0]); // Disables optimizations
}

function bad2(obj) {
    delete obj.x; // Shape change
}

function bad3(obj, key) {
    return obj[key]; // Dynamic key — cannot IC
}
```

## Optimizing for the Compiler

```javascript
// Good — compiler-friendly
function good(obj) {
    return obj.name;  // Static property — can IC
}

function good2(a, b) {
    return Number(a) + Number(b); // Ensure type stability
}

function good3(obj) {
    const { x, y } = obj; // Destructure once, then use locals
    return x + y;
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is `try/catch` in hot path? | If yes, consider refactoring |
| Is `delete` used? | If yes, consider setting to `undefined` instead |
| Are computed property keys used in hot code? | Consider alternatives |
| Is `arguments` used? | Use rest params instead |

---

# PART VIII — PERFORMANCE OPTIMIZATION

---

# Chapter 21 — Avoid Nested Loops

## The Problem

```javascript
function findDuplicates(arr1, arr2) {
    let dups = [];
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                dups.push(arr1[i]);
            }
        }
    }
    return dups;
}

// arr1.length = 1000, arr2.length = 1000
// 1,000,000 iterations
// O(n × m) — quadratic if same size
```

## The Fix: Hash Map

```javascript
function findDuplicates(arr1, arr2) {
    let set = new Set(arr2);
    let dups = [];
    for (let i = 0; i < arr1.length; i++) {
        if (set.has(arr1[i])) {
            dups.push(arr1[i]);
        }
    }
    return dups;
}

// 1000 + 1000 = 2000 operations
// O(n + m) — linear
```

## Big-O Impact

| Approach | 1000 elements | 10,000 elements | 100,000 elements |
|----------|---------------|-----------------|-------------------|
| Nested loops | 1,000,000 | 100,000,000 | 10,000,000,000 |
| Hash map lookup | 2,000 | 20,000 | 200,000 |

The hash map approach is **500x faster** at 100,000 elements.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How many iterations? | Multiply loop sizes |
| Can hashing replace loops? | Often O(n²) → O(n) with Set/Map |
| Can sorting help? | Sorted arrays enable binary search |

---

# Chapter 22 — Memoization

## The Pattern

```javascript
const memo = new Map();

function fibonacci(n) {
    if (n <= 1) return n;

    if (memo.has(n)) {
        return memo.get(n);
    }

    const result = fibonacci(n - 1) + fibonacci(n - 2);
    memo.set(n, result);
    return result;
}
```

## Without Memoization

```
fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)
│   │   │   ├── fib(1)
│   │   │   └── fib(0)
│   │   └── fib(1)
│   └── fib(2)
│       ├── fib(1)
│       └── fib(0)
└── fib(3)
    ├── fib(2)
    │   ├── fib(1)
    │   └── fib(0)
    └── fib(1)
```

- `fib(2)` computed 3 times.
- `fib(3)` computed 2 times.
- Total: 15 calls.

## With Memoization

```
fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)
│   │   │   ├── fib(1)
│   │   │   └── fib(0)
│   │   └── fib(1) ← cached
│   └── fib(2) ← cached
└── fib(3) ← cached
```

- Each value computed once.
- Total: 9 calls.
- For `fib(100)`: 199 calls vs ~1.14×10²¹ calls (astronomical difference).

## Generic Memoization Utility

```javascript
function memoize(fn) {
    const cache = new Map();

    return function(...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const fib = memoize(function(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this function pure? | Yes → can memoize |
| Are inputs repeated? | Yes → memoization helps |
| What cache size? | Bounded vs unbounded |

---

# Chapter 23 — Lazy Evaluation

## Eager vs Lazy

**Eager**: compute everything upfront.
**Lazy**: compute only when needed.

```javascript
// Eager — computes immediately
const allData = expensiveApiCall(); // Could be wasted if not all used

// Lazy — computes on demand
function getData(key) {
    return expensiveApiCall()[key];
}
```

## Generators for Lazy Sequences

```javascript
// Without lazy evaluation
function range(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

const allNumbers = range(1, 1000000);
const first = allNumbers[0]; // Must compute all 1M numbers

// With lazy evaluation (generator)
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const numbers = range(1, 1000000);
const first = numbers.next().value; // Only computes first element
```

## Lazy Initialization Pattern

```javascript
class Config {
    constructor() {
        this._data = null;
    }

    get data() {
        if (!this._data) {
            this._data = this._loadData();
        }
        return this._data;
    }

    _loadData() {
        console.log('Loading expensive data...');
        return { key: 'value' };
    }
}

const config = new Config();
// Nothing loaded yet
console.log('Object created');
// Later:
console.log(config.data); // Loads now
console.log(config.data); // Uses cached — no reload
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is all data needed immediately? | If no, lazy saves work |
| Can generator help? | Yes for sequences |
| Is initialization expensive? | Lazy init defers cost |

---

# Chapter 24 — Batch DOM Updates

## The Problem

```javascript
const list = document.getElementById('list');

for (let i = 0; i < 1000; i++) {
    const item = document.createElement('li');
    item.textContent = `Item ${i}`;
    list.appendChild(item);  // Causes reflow every time
}
```

Each `appendChild` triggers:
1. DOM tree modification.
2. Style recalculation.
3. Layout (reflow).
4. Paint.

1000 iterations = 1000 reflows.

## The Fix: Document Fragment

```javascript
const list = document.getElementById('list');
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const item = document.createElement('li');
    item.textContent = `Item ${i}`;
    fragment.appendChild(item);  // No reflow — not in DOM
}

list.appendChild(fragment);  // Single reflow
```

## The Fix: innerHTML

```javascript
let html = '';
for (let i = 0; i < 1000; i++) {
    html += `<li>Item ${i}</li>`;
}
document.getElementById('list').innerHTML = html; // Single reflow
```

## Benchmark

| Approach | Reflows | Time (approx) |
|----------|---------|---------------|
| Individual appends | 1000 | ~50ms |
| DocumentFragment | 1 | ~2ms |
| innerHTML | 1 | ~1ms |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the loop creating DOM elements? | If yes, batch them |
| Can use DocumentFragment? | Yes, avoids multiple reflows |
| Can use innerHTML? | Yes, single string parse |

---

# Chapter 25 — Debounce

## The Problem

```javascript
// Search input fires API call on every keystroke
searchInput.addEventListener('input', (e) => {
    fetch(`/api/search?q=${e.target.value}`);
    // 10 keystrokes = 10 API calls
});
```

Most API calls are wasted — the user only cares about the final result.

## The Solution: Debounce

**Debounce**: delay execution until a pause in events.

```javascript
function debounce(fn, delay) {
    let timerId;

    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const debouncedSearch = debounce(async (query) => {
    const results = await fetch(`/api/search?q=${query}`);
    // update UI
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

## How It Works

```
Keystroke:     u  s  e  r    p  r  o  f  i  l  e
API calls
  Without:     ↑  ↑  ↑  ↑    ↑  ↑  ↑  ↑  ↑  ↑  ↑   (11 calls)
  With (300ms):              ↑                       (1 call — after pause)
```

## Debounce with Immediate Execution (Leading)

```javascript
function debounce(fn, delay, leading = false) {
    let timerId;
    let lastCall = 0;

    return function(...args) {
        const now = Date.now();

        if (leading && now - lastCall > delay) {
            fn.apply(this, args);  // Execute immediately
        }

        clearTimeout(timerId);
        timerId = setTimeout(() => {
            if (!leading) {
                fn.apply(this, args);  // Execute after delay
            }
            lastCall = Date.now();
        }, delay);
    };
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Are rapid repeated events likely? | If yes, use debounce |
| What delay? | ~300ms for search, ~100ms for resize |

---

# Chapter 26 — Throttle

## The Problem

```javascript
window.addEventListener('scroll', () => {
    // Complex layout calculation
    // Fires at 60fps+ — way too often
});
```

Scrolling fires events at high frequency (up to 120Hz on modern displays). Most of these handlers are wasteful.

## The Solution: Throttle

**Throttle**: ensure execution at most once per time interval.

```javascript
function throttle(fn, limit) {
    let inThrottle = false;

    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

const throttledScroll = throttle(() => {
    // Complex calculation
    console.log('Scroll position:', window.scrollY);
}, 100);

window.addEventListener('scroll', throttledScroll);
```

## How It Works

```
Events:     e1 e2 e3 e4 e5 e6 e7 e8 e9 e10 (at 16ms intervals)
Throttled (100ms):
Execute:    ↑     ↑              ↑
            e1    e4             e8
            (every 100ms at most)
```

## Debounce vs Throttle

| | Debounce | Throttle |
|---|---------|----------|
| **When to use** | After burst stops (search, autocomplete) | During continuous events (scroll, resize, mousemove) |
| **Executes** | Once after pause | Regularly at interval |
| **Guarantees** | Last event triggers | Event triggers at most every N ms |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Continuous event? | Throttle |
| Burst followed by pause? | Debounce |
| What interval? | Throttle: ~50-100ms, Debounce: ~300-500ms |

---

# Chapter 27 — requestAnimationFrame

## The Problem

```javascript
function animate() {
    element.style.left = `${parseFloat(element.style.left || 0) + 1}px`;
    setTimeout(animate, 10); // 100fps — unpredictable
}
```

`setTimeout` doesn't sync with the browser's paint cycle. Can cause:

- **Jank** (frame drops).
- **Wasted work** (runs when browser isn't painting).
- **Battery drain**.

## The Solution

```javascript
function animate(timestamp) {
    element.style.left = `${parseFloat(element.style.left || 0) + 1}px`;
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

`requestAnimationFrame` runs right before the browser paints. Benefits:

| Benefit | Explanation |
|---------|-------------|
| **Syncs with display refresh** | Typically 60fps (16.6ms intervals) |
| **Pauses in background tabs** | Saves battery/CPU |
| **Gets timestamp** | High-resolution time for smooth animation |

## requestAnimationFrame + Performance

```javascript
// Batch DOM reads then writes (avoids layout thrashing)
function batchUpdate(timestamp) {
    // Read phase — read all values
    const rects = elements.map(el => el.getBoundingClientRect());

    // Write phase — calculate and apply
    elements.forEach((el, i) => {
        el.style.transform = `translateX(${rects[i].x + 1}px)`;
    });

    requestAnimationFrame(batchUpdate);
}

requestAnimationFrame(batchUpdate);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this animation? | Use `requestAnimationFrame` |
| Is this measurement? | Use `requestAnimationFrame` to batch reads |

---

# PART IX — WEB WORKERS

---

# Chapter 28 — Why Web Workers

## The Problem

JavaScript in the browser is **single-threaded**:

```javascript
document.querySelector('button').addEventListener('click', () => {
    // Heavy computation
    for (let i = 0; i < 1000000000; i++) {
        // Blocking...
    }
});

// UI is frozen until loop finishes
// No scrolling, no clicking, no animation
```

## The Solution

```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ data: largeArray });

worker.addEventListener('message', (event) => {
    console.log('Result from worker:', event.data);
});

// UI stays responsive during computation
```

```javascript
// worker.js
self.addEventListener('message', (event) => {
    const result = heavyComputation(event.data);
    self.postMessage(result);
});

function heavyComputation(data) {
    // This runs in a separate thread
    return data.map(x => x * 2);
}
```

## What Workers Can/Can't Do

| Can do | Cannot do |
|--------|-----------|
| Compute, loops, math | Access DOM |
| `fetch`, `XMLHttpRequest` | Access `window`, `document` |
| `setTimeout`, `setInterval` | Access `parent` |
| `importScripts()` (classic) | Direct access to main thread variables |
| `postMessage` communication | |

## Use Cases

| Use Case | Example |
|----------|---------|
| Image processing | Canvas pixel manipulation |
| Data compression | gzip/brotli in background |
| Code compilation | Babel/TypeScript in worker |
| AI/ML inference | TensorFlow.js offloading |
| Large data processing | CSV parsing, sorting, filtering |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is work CPU-heavy? | Consider Web Worker |
| Is UI blocked? | Move heavy work off main thread |
| Can work be parallelized? | Multiple workers |

---

# Chapter 29 — SharedArrayBuffer and Atomics

For advanced multi-threaded work:

```javascript
// main.js
const buffer = new SharedArrayBuffer(1024);
const view = new Int32Array(buffer);
const worker = new Worker('worker.js');

worker.postMessage(buffer);

// Both threads share the same memory
```

```javascript
// worker.js
self.addEventListener('message', (event) => {
    const view = new Int32Array(event.data);
    Atomics.store(view, 0, 42);  // Thread-safe write
    Atomics.notify(view, 0);     // Wake up waiting thread
});
```

This is highly advanced and rarely needed, but available for performance-critical scenarios.

---

# PART X — EVENT LOOP PERFORMANCE

---

# Chapter 30 — Microtask vs Macrotask Priorities

## The Problem: Starvation

```javascript
function floodMicrotasks() {
    Promise.resolve().then(() => {
        // This microtask schedules another...
        floodMicrotasks();
    });
}

floodMicrotasks();

setTimeout(() => {
    console.log('This never runs'); // Starved by microtasks
}, 1000);
```

Microtasks have higher priority than macrotasks. The event loop processes **all** microtasks before moving to the next macrotask.

## Execution Order

```
1. Execute one macrotask (e.g., setTimeout callback)
2. Process ALL microtasks (Promise.then, queueMicrotask, MutationObserver)
3. Render (if needed)
4. Execute next macrotask
```

## Starvation Path

```
Macrotask (click handler)
  └── Microtask 1
        └── Microtask 2 (scheduled by 1)
              └── Microtask 3 (scheduled by 2)
                    └── ... infinite loop of microtasks
                            └── setTimeout callback NEVER RUNS
```

## Avoid Microtask Starvation

```javascript
function safeRecursiveTask() {
    // Use macrotask to avoid starving other tasks
    setTimeout(() => {
        // Do work
        safeRecursiveTask(); // Schedule next iteration as macrotask
    }, 0);
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Could microtasks starve macrotasks? | Check for recursive Promise chains |
| Is rendering delayed? | Check microtask load |
| How to yield to event loop? | `setTimeout(..., 0)` or `queueMicrotask` with limits |

---

# PART XI — PROFILING

---

# Chapter 31 — Browser Performance Tools

## Performance Tab

```
Chrome DevTools → Performance → Record
```

What you can see:

- **Frames** — green = smooth, red = jank.
- **Timings** — where time is spent (scripts, rendering, painting).
- **Call stack** — which functions are expensive.
- **GC events** — yellow bars indicating garbage collection pauses.

## Memory Tab

```
Chrome DevTools → Memory
```

Three profiling types:

| Type | What It Shows |
|------|---------------|
| **Heap snapshot** | All objects, retainers, sizes |
| **Allocation instrumentation** | Where objects are allocated over time |
| **Allocation sampling** | Memory allocation at regular intervals |

## Interpreting Heap Snapshots

```
1. Take snapshot (baseline)
2. Perform action
3. Take snapshot (comparison)
4. Look for:
   - Objects not freed (should be zero)
   - Detached DOM nodes
   - Size growth
```

## Node.js Profiling

```bash
# Run with inspector
node --inspect-brk app.js

# Generate CPU profile
node --prof app.js
node --prof-process isolate-*.log > processed.txt

# Using clinic.js
npx clinic doctor -- node app.js
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is slowdown CPU-bound? | Performance tab → Scripting time |
| Is slowdown memory-bound? | Memory tab → Heap size, GC frequency |
| Is slowdown network-bound? | Network tab → Request/response timing |
| Is slowdown render-bound? | Performance tab → Rendering/Painting time |
| What function is the bottleneck? | Performance tab → Bottom-up call tree |

---

# Chapter 32 — Identifying Bottlenecks

## Systematic Approach

```
1. Profiling data available?
   ├── Yes → Identify top time consumer
   └── No  → Add profiling, reproduce, then analyze

2. Top consumer is:
   ├── CPU (scripting)
   │   ├── Find hot function (JIT candidate)
   │   ├── Check time complexity
   │   └── Consider worker
   │
   ├── Memory (GC)
   │   ├── Check allocation rate
   │   ├── Check GC frequency
   │   └── Reduce object churn
   │
   ├── Rendering
   │   ├── Batch DOM updates
   │   ├── Use transform/opacity (composite only)
   │   └── Avoid layout thrashing
   │
   └── Network
       ├── Cache responses
       ├── Compress payloads
       └── Reduce request count
```

## Common Reduction Strategies

| Bottleneck | Strategy |
|------------|----------|
| CPU (nested loops) | Hash map, early break |
| CPU (repeated computation) | Memoization |
| Memory (allocation) | Object pooling |
| Memory (growing cache) | LRU, size limits |
| Rendering (reflow) | Batch writes, DocumentFragment |
| Rendering (paint) | `will-change`, GPU compositing |
| Network (many requests) | Debounce, caching, HTTP/2 |

---

# PART XII — IMMUTABILITY

---

# Chapter 33 — Why Immutability Improves Performance

## The Problem

```javascript
let user = { name: "Alice", age: 25 };
user.age = 26; // Mutates existing object
```

Mutation:

- Can trigger unexpected side effects (because other references see the change).
- Makes change detection expensive (need deep comparison).

## Immutability

```javascript
const user = { name: "Alice", age: 25 };
const updatedUser = { ...user, age: 26 }; // New object
```

Benefits:

- **Shared references are safe** — no unexpected mutation.
- **Change detection is O(1)** — compare references (`old !== new`).
- **Time travel debugging** — each state is a snapshot.

## Usage in React

```javascript
// React re-renders when reference changes
this.setState(prev => ({
    items: [...prev.items, newItem]  // New array reference
}));
```

## Performance Trade-offs

| Aspect | Mutation | Immutability |
|--------|----------|--------------|
| Memory | Same object reused | New objects created |
| GC pressure | Lower | Higher (more garbage) |
| Change detection | Deep comparison needed | Reference comparison O(1) |
| Side effect safety | Unsafe | Safe |

## Optimizing Immutability with Libraries

```javascript
// Immer — write mutable code, get immutable result
import produce from 'immer';

const nextState = produce(state, draft => {
    draft.user.age = 26; // Looks mutable, but produces immutable result
});
```

---

# PART XIII — OBJECT POOLING

---

# Chapter 34 — Reducing GC Pressure

## The Problem

```javascript
function createParticle(x, y) {
    return { x, y, vx: 0, vy: 0, life: 1 };
}

function update(p) {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.01;
    return p;
}

// In game loop (60fps):
const particles = [];
for (let i = 0; i < 1000; i++) {
    particles.push(createParticle(Math.random() * 100, Math.random() * 100));
}
// Every frame, some particles die, new ones created
// Creates GC pressure = 60 GCs per second
```

## The Solution: Object Pool

```javascript
class ParticlePool {
    constructor(size) {
        this.pool = [];
        this.active = [];

        for (let i = 0; i < size; i++) {
            this.pool.push({ x: 0, y: 0, vx: 0, vy: 0, life: 0 });
        }
    }

    acquire(x, y) {
        const p = this.pool.pop();
        if (!p) return null; // Pool exhausted

        p.x = x;
        p.y = y;
        p.vx = 0;
        p.vy = 0;
        p.life = 1;
        this.active.push(p);
        return p;
    }

    release(p) {
        const idx = this.active.indexOf(p);
        if (idx !== -1) {
            this.active.splice(idx, 1);
            this.pool.push(p);
        }
    }
}

// Usage — zero allocations per frame
const pool = new ParticlePool(1000);

function gameLoop() {
    // Reuse existing objects instead of creating new ones
    if (shouldSpawnParticle()) {
        pool.acquire(mouseX, mouseY);
    }

    for (const p of pool.active) {
        update(p);
    }
}
```

## Benefits

| Metric | Without Pool | With Pool |
|--------|-------------|-----------|
| Allocations per frame | 50+ | 0 |
| GC collections per minute | 60+ | ~5 |
| Frame time variance | High (GC pauses) | Stable |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is object creation excessive? | Check allocation rate in profiler |
| Are objects short-lived? | Yes → pool candidate |
| Is GC running frequently? | Yes → reduce churn |

---

# PART XIV — STRING INTERNING

---

# Chapter 35 — How Strings Are Stored

## Implicit Interning

V8 automatically interns identical string literals:

```javascript
let a = "hello";
let b = "hello";

// Both point to the same memory location
// This is safe because strings are immutable
```

## How Interning Works

```
String Table (internal)
┌──────────────────────┐
│ "hello" ── refcount 3│
│ "world" ── refcount 1│
│ "foo" ──── refcount 2│
└──────────────────────┘

Variables:
a ───┐
b ───┤
c ───┘── all point to same "hello"
```

## When Interning Helps

```javascript
// Dynamic strings are NOT automatically interned
function getKey(name) {
    return `user:${name}`;  // New string each call
}

// But repeated object keys benefit from internal interning
const obj = {};
for (let i = 0; i < 10000; i++) {
    obj[`key${i}`] = i;  // Property keys may be interned
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Are identical strings duplicated? | Check if they're literals (interned) or dynamically created |
| Can string building be optimized? | `template strings` vs `+` vs `join` |

---

# PART XV — WEAK REFERENCES

---

# Chapter 36 — WeakMap and WeakSet

## The Problem

```javascript
const metadata = new Map();

function processElement(el) {
    metadata.set(el, { processed: true });
    // Later, el is removed from DOM
    // But metadata still holds reference
    // el can never be GC'd → memory leak
}
```

## The Solution: WeakMap

```javascript
const metadata = new WeakMap();

function processElement(el) {
    metadata.set(el, { processed: true });
    // When el is removed from DOM and all other references are gone
    // The WeakMap entry is automatically removed
    // el can be GC'd
}
```

## WeakMap vs Map

| Feature | Map | WeakMap |
|---------|-----|---------|
| Key types | Any | Objects only |
| Prevents GC of keys | Yes | No |
| Iterable | Yes | No |
| `.size` available | Yes | No |
| Use case | General caching | Metadata, private data, DOM nodes |

## WeakRef (ES2021)

```javascript
// WeakRef — hold a weak reference to an object
let obj = { data: "large" };
const weakRef = new WeakRef(obj);

// Later (obj may have been GC'd)
const deref = weakRef.deref();
if (deref) {
    console.log('Object still alive:', deref.data);
} else {
    console.log('Object was collected');
}

obj = null; // Now the object can be GC'd
```

## FinalizationRegistry

```javascript
// Run cleanup when an object is GC'd
const registry = new FinalizationRegistry((heldValue) => {
    console.log(`Object with ID ${heldValue} was collected`);
});

let obj = { data: "test" };
registry.register(obj, "obj123");

obj = null; // When GC runs, callback fires
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is object used as a key? | Consider WeakMap if object may be removed |
| Need automatic cleanup on GC? | WeakMap, WeakRef, FinalizationRegistry |

---

# ABSOLUTE REVERSE ENGINEERING TACTICAL QUESTIONS

Whenever reading performance-sensitive code ask:

---

### Stack or Heap?

Determine where each value lives.

---

### Which objects are allocated?

Every `new`, `{}`, `[]`, `() =>`, `function()` creates heap allocation.

---

### Who owns references?

Walk the reference chain. Every reference keeps the object alive.

---

### Which references prevent garbage collection?

Global variables, closures, caches, event listeners, timers.

---

### Can memory leak occur?

Check: globals, timers, listeners, closures, caches, detached DOM nodes.

---

### Are hidden classes stable?

Objects created with the same shape in the same order → stable. Adding/deleting properties → unstable.

---

### Are parameter types consistent?

Same types every call → JIT optimizes. Mixed types → deoptimization.

---

### Can JIT optimize this?

Stable types + single shape + hot code → yes. Dynamic types, `delete`, `eval`, `arguments` → no.

---

### Could deoptimization happen?

Type changes, shape changes, try/catch in hot code.

---

### CPU bottleneck?

Check Performance tab → Scripting. Look for nested loops, repeated computation.

---

### Memory bottleneck?

Check Memory tab → Heap size + GC frequency. Look for allocation-heavy functions.

---

### Network bottleneck?

Check Network tab. Look for waterfall, large payloads, uncached responses.

---

### DOM bottleneck?

Check Performance tab → Rendering + Painting. Look for forced reflow, layout thrashing.

---

### Can caching help?

Repeated computations or API responses → cache.

---

### Can memoization help?

Pure functions with repeated inputs → memoize.

---

### Can concurrency help?

Independent work → parallelize with Web Workers.

---

### Can Web Workers help?

CPU-heavy, non-DOM work → offload to worker.

---

### Can complexity be reduced?

O(n²) → O(n log n) → O(n) → O(1).

---

### Is object creation excessive?

Check allocation profiler. High allocation rate → pool or reuse.

---

### Is garbage collection expensive?

Frequent yellow bars in Performance tab → reduce allocation, use pools.

---

### Which operation happens millions of times?

That's where to optimize. Profile first, then optimize the bottleneck.

---

### Is profiling data available?

Never optimize without data. Measure first.

---

# Senior Reverse Coding Tactical Process

When seeing:

```javascript
for (let i = 0; i < something; i++) {
    // Loop body
}
```

Ask:

1. **How many iterations?** 10? 1000? 1,000,000? Scale matters.
2. **Time complexity?** O(n), O(n log n), O(n²)? Nested loops inside?.
3. **Can hashing replace loops?** Set lookups, Map lookups — O(1) vs O(n).
4. **Can sorting help?** Binary search O(log n) vs linear scan O(n).
5. **Can memoization help?** Are inputs repeated? Cache results.
6. **Can lazy evaluation help?** Compute only when needed, not all at once.
7. **Can work be parallelized?** Split work into chunks, use Web Workers.
8. **Will object allocation explode?** New objects per iteration? Array push inside loop?
9. **Will GC pressure increase?** Many short-lived objects → frequent young GC.
10. **Can engine optimize this?** Stable types + monomorphic shapes + simple loop body → JIT compiles to fast machine code.

---

# Projects

## 1. Custom LRU Cache

Implement an LRU cache with O(1) get/set using `Map`.

- `get(key)` — returns value, marks as recently used.
- `set(key, value)` — inserts, evicts least recently used if at capacity.
- `delete(key)` — removes entry.
- `clear()` — empties cache.
- Bonus: add TTL (time-to-live) expiration.

## 2. Memoization Library

Build a generalized `memoize` function.

- Support for custom key resolver (not just `JSON.stringify`).
- Configurable cache size limit (LRU eviction).
- Support for async functions (cache before promise resolves).
- Debug mode: log cache hits/misses.
- `memoize.clear(fn)` to clear a specific function's cache.

## 3. Object Pool System

Build a generic object pool.

- `Pool.create(factory, reset, initialSize)`.
- `pool.acquire(...args)` — get object from pool or create new.
- `pool.release(obj)` — return object to pool.
- Track pool hits/misses for profiling.
- Auto-grow pool if exhausted.
- Auto-shrink pool if too many idle objects.

## 4. Performance Benchmark Tool

Build a mini benchmarking framework.

- `bench(name, fn, iterations)` — runs fn N times, reports avg/median/min/max.
- Compare two functions: `benchCompare(fn1, fn2, iterations)`.
- Warmup phase before measurement.
- GC measurement (`performance.memory?.usedJSHeapSize`).
- Output formatted results to console.

## 5. Web Worker Image Processor

Build an image processing system using Web Workers.

- Load an image into a canvas.
- Spawn N workers based on CPU core count.
- Split image into horizontal strips.
- Each worker applies a filter (grayscale, blur, edge detection) on its strip.
- Main thread reassembles strips.
- Compare performance with single-threaded version.

## 6. Heap Snapshot Analyzer

Build a tool that analyzes Chrome DevTools heap snapshots (`.heapsnapshot` files).

- Parse snapshot JSON format.
- Report:
  - Total heap size.
  - Top 10 largest objects.
  - Number of detached DOM nodes.
  - Most common constructor types.
  - Retained size by root path.

## 7. Mini Garbage Collector Simulator

Build a visual simulator that demonstrates GC concepts.

- Representations: stack, heap, roots.
- Mark phase highlight reachable objects (green).
- Sweep phase remove unreachable objects (red).
- Show generational movement: young → old.
- Show fragmentation and compaction.
- Step through GC cycle manually.

## 8. Hidden Class Demonstrator

Build a tool that shows hidden class changes.

- Create objects with different property orders.
- Show when objects share the same shape (same color/group).
- Show transition when a property is added.
- Show deoptimization when mixing shapes at a call site.
- Benchmark property access speed per scenario.

## 9. Event Loop Visualizer

Build a visualizer that shows the event loop cycle.

- Show macrotask queue (setTimeout, events, I/O).
- Show microtask queue (Promise.then, queueMicrotask, MutationObserver).
- Show render step.
- Animate through a trace:
  1. Execute macrotask.
  2. Drain microtasks.
  3. Render.
  4. Next macrotask.
- Demonstrate starvation (infinite microtask loop blocks macrotasks).

## 10. Memory Leak Detector

Build a tool that detects common memory leak patterns.

- Detect accidental globals (no `let`/`const`/`var`).
- Detect forgotten timer IDs.
- Detect detached DOM nodes (nodes with `isConnected === false` but referenced in JS).
- Detect growing caches without size limits.
- Detect closure-retained large arrays.
- Output report with leak location, retained size, and fix suggestion.

---

# Next Part (Part 13)

We enter one of the largest and most important sections:

# Node.js Ecosystem, Backend Architecture, Streams, Buffers, File System, Networking, Processes, Clustering, Child Processes, and Server Engineering

This section explains how JavaScript escapes the browser and becomes a complete backend platform.
