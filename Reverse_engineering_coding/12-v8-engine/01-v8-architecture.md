# 01 — V8 Architecture Overview

## Mission

This part explores how JavaScript actually runs inside engines such as:

- **V8** (Chrome, Node.js, Deno, Electron)
- **SpiderMonkey** (Firefox)
- **JavaScriptCore** (Safari)

Understanding these internals explains:

- Why some code is fast.
- Why some code becomes slow.
- How memory is managed.
- Why memory leaks happen.
- How modern JavaScript engines optimize code.

## Overall Pipeline

Every JavaScript engine follows this general pipeline:

```
Source Code
     ↓
Parser
     ↓
AST (Abstract Syntax Tree)
     ↓
Interpreter
     ↓
Bytecode
     ↓
Profiler
     ↓
JIT Compiler
  ┌──┴──┐
  ↓     ↑
Machine Code
(deoptimize → back to bytecode)
     ↓
CPU
```

The details differ between engines but the conceptual flow is the same.

### Code Example Flowing Through the Pipeline

```javascript
function add(a, b) {
    return a + b;
}

add(1, 2); // first call — interpreted, not compiled
add(3, 4); // still cold
// ... after ~10,000 calls:
add(5, 6); // HOT — TurboFan compiles to machine code
```

| Stage | What happens |
|-------|-------------|
| **Parser** | Source text → tokens → AST (`FunctionDeclaration`, `BinaryExpression: +`) |
| **Ignition** | AST → bytecode (`LdaNamedProperty`, `Add r0`, `Return`) |
| **Profiler** | After ~10,000 calls, marks `add` as hot |
| **TurboFan** | Bytecode → optimized machine code (SMI-only `+`, monomorphic types) |
| **Deopt** | If `add("hello", "world")` is called — strings break SMI assumption, back to bytecode |

## V8's Architecture

V8 (Google's JavaScript engine) is the most widely deployed — it powers Chrome, Node.js, Deno, and Electron. Its pipeline consists of:

### Components

| Component | Role |
|-----------|------|
| **Parser** | Converts source text into tokens and builds an AST |
| **Ignition** | V8's bytecode interpreter — converts AST to bytecode, executes it |
| **TurboFan** | V8's optimizing JIT compiler — compiles hot bytecode to machine code |
| **Orinoco** | V8's garbage collector — generational, parallel, concurrent |
| **Hidden Classes** | Internal object shape descriptors enabling fast property access |
| **Inline Cache (IC)** | Caches property lookup results based on hidden classes |

### Execution Flow

1. Source code enters the **Parser**.
2. The Parser produces an **AST** (Abstract Syntax Tree).
3. **Ignition** interprets the AST and generates **bytecode**.
4. The **Profiler** monitors execution frequency.
5. When a function becomes **hot** (executed many times), **TurboFan** compiles it to optimized **machine code**.
6. If assumptions change (e.g., parameter type changes, different object shape appears), the code **deoptimizes** back to bytecode — the optimization feedback loop.

### Why This Multi-Stage Design?

| Concern | Solution |
|---------|----------|
| Fast startup | Interpreter starts executing immediately |
| Long-term speed | JIT compiles hot code to near-native speed |
| Memory efficiency | Bytecode is smaller than machine code |
| Portability | Same bytecode works across CPU architectures |

## Engine Comparison

| Feature | V8 (Chrome/Node) | SpiderMonkey (Firefox) | JavaScriptCore (Safari) |
|---------|------------------|----------------------|------------------------|
| Interpreter | Ignition | Baseline Interpreter | LLInt |
| JIT Compiler | TurboFan | Warp/CacheIR | DFG/FTL/B3 |
| GC | Orinoco | Generational GC | Generational GC |
| Hidden Classes | Yes (Maps/Shapes) | Yes (Shapes) | Yes (Structures) |
| Inline Caching | Yes (ICs) | Yes (CacheIR) | Yes |

All three follow the same conceptual pipeline with different implementation details and naming.

## Compilation vs Interpretation

| Strategy | Example | Tradeoff |
|----------|---------|----------|
| Ahead-of-Time (AOT) | C, Rust, Go | Slow compilation, fast execution, large binary |
| Pure Interpretation | Early JS engines | Fast startup, very slow execution |
| JIT (Just-In-Time) | V8, JSC, SM | Medium startup, near-native execution for hot code |

## Hidden Classes in Practice

When you create objects with the same shape, V8 shares their hidden classes — making property access a single pointer offset instead of a hash lookup:

```javascript
// Both objects have the same shape (x then y) → share hidden class
const p1 = { x: 1, y: 2 };
const p2 = { x: 3, y: 4 };
// p1 and p2 share hidden class C0

// Adding a new property creates a NEW hidden class
p1.z = 5; // p1 transitions to C1, p2 stays on C0
// Now p1 and p2 are on different "tracks" — property access is slower
```

Hidden classes enable **Inline Caching (IC)**: V8 remembers the hidden class seen at each property access site. Monomorphic (one class) is fastest; polymorphic (2-4 classes) slows down; megamorphic (5+) is slowest.

```javascript
function getX(obj) { return obj.x; }

getX(p1); // IC sees hidden class C0 → fast
getX(p2); // IC sees hidden class C0 → fast (monomorphic)
getX({ x: 5, y: 6, z: 7 }); // IC sees hidden class C1 → polymorphic, slower
```

See chapters [11](11-hidden-classes.md), [12](12-hidden-class-transitions.md), and [13](13-inline-caching.md) for deep dives.

## The Optimization Funnel

Not all code gets optimized. The engine optimizes only the **hot paths**:

```
All executed code
  └── Interpreted (100%)
       └── Profiled (hot)
            └── JIT compiled (optimized)
                 └── May deoptimize → back to interpreter
```

### Common Deoptimization Triggers

| Trigger | Example | Impact |
|---------|---------|--------|
| Argument type change | `add(1, 2)` → `add("a", "b")` | Breaks SMI assumption |
| New object shape | `obj.x` then `obj.x, obj.y` | IC becomes polymorphic |
| `delete` on object | `delete obj.x` | Forces dictionary mode |
| `try/catch` in hot function | Inside a loop | Prevents some optimizations |
| `eval()` or `with` | Dynamic scope | Disables optimizations entirely |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What engine runs Node.js? | V8 |
| What is the first step after source code? | Parsing |
| What converts AST to bytecode? | Ignition (V8's interpreter) |
| What compiles hot code? | TurboFan (V8's JIT compiler) |
| Why not compile directly? | Slower startup, more memory |
| What engines exist? | V8 (Chrome/Node), SpiderMonkey (Firefox), JavaScriptCore (Safari) |
| What triggers deoptimization? | Type changes, new object shapes, `delete`, `try/catch` in hot code |
| How do hidden classes speed up property access? | Shared shape → property offset is known at compile time |
| What makes an IC monomorphic vs polymorphic? | Number of different hidden classes seen at one access site |
| What does bytecode look like? | Low-level instructions like `LdaSmi`, `Add`, `Return` — smaller than machine code |
| Why does adding properties dynamically slow code? | Forces hidden class transition; deoptimizes existing IC entries |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-parser-ast.md): 02 — Parser & Abstract Syntax Tree (AST) to learn about 02 — parser & abstract syntax tree (ast).
