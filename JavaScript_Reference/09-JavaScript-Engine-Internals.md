# JavaScript Engine Internals & Memory Management — Comprehensive Reference

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

---

## Table of Contents

1. [JavaScript Engines Overview](#1-javascript-engines-overview)
2. [V8 Compilation Pipeline (Four-Tier Architecture)](#2-v8-compilation-pipeline)
3. [JIT (Just-In-Time) Compilation](#3-jit-compilation)
4. [Hidden Classes / Shapes (Maps)](#4-hidden-classes--shapes)
5. [Shape/Map Transitions](#5-shapemap-transitions)
6. [Inline Caching (IC)](#6-inline-caching)
7. [Optimizing and Deoptimizing Compilation](#7-optimizing-and-deoptimizing-compilation)
8. [TurboFan & Turboshaft Optimization Pipeline](#8-turboshaft-optimization-pipeline)
9. [Deoptimization Bailout Reasons](#9-deoptimization-bailout-reasons)
10. [Memory Model: Stack vs Heap](#10-memory-model-stack-vs-heap)
11. [Memory Allocation: Primitives on Stack, Objects on Heap](#11-memory-allocation)
12. [Garbage Collection Algorithms](#12-garbage-collection-algorithms)
13. [V8 Garbage Collector: Orinoco](#13-v8-garbage-collector-orinoco)
14. [Call Stack Mechanics](#14-call-stack-mechanics)
15. [Execution Contexts and Variable Environments](#15-execution-contexts)
16. [Lexical Environments](#16-lexical-environments)
17. [Scope Chain Implementation](#17-scope-chain-implementation)
18. [Hoisting Internals](#18-hoisting-internals)
19. [Property Access Optimization](#19-property-access-optimization)
20. [Prototype Chain Optimization](#20-prototype-chain-optimization)
21. [Array Optimization (Packed vs Holey Elements)](#21-array-optimization)
22. [String Interning and Rope/Cons Strings](#22-string-interning-and-cons-strings)
23. [Number Representation (Smi, HeapNumber)](#23-number-representation)
24. [Memory Leaks: Common Causes](#24-memory-leaks)
25. [Memory Profiling and Detection](#25-memory-profiling-and-detection)
26. [Memory Limits in JavaScript](#26-memory-limits)
27. [WeakRef and FinalizationRegistry Internals](#27-weakref-and-finalizationregistry)
28. [SharedArrayBuffer and Atomics](#28-sharedarraybuffer-and-atomics)
29. [BigInt Internals](#29-bigint-internals)
30. [Other JavaScript Engines](#30-other-javascript-engines)

---

## 1. JavaScript Engines Overview

JavaScript engines are programs that execute JavaScript code. The major engines in production today:

| Engine | Used By | Internal Name for Hidden Classes |
|--------|---------|----------------------------------|
| **V8** | Chrome, Node.js, Edge, Deno | Maps |
| **SpiderMonkey** | Firefox, Thunderbird | Shapes |
| **JavaScriptCore (JSC)** | Safari, WebKit | Structures |
| **ChakraCore** | Legacy Edge (now Chromium-based) | Types |

### Key Responsibilities

- **Parsing** → Source code to Abstract Syntax Tree (AST)
- **Compilation** → AST to bytecode or machine code
- **Execution** → Running the compiled code
- **Optimization** → Hot code identification and speculative optimization
- **Memory Management** → Automatic garbage collection
- **JIT Compilation** → Runtime compilation to native machine code

All modern engines use similar techniques (hidden classes, inline caching, generational GC, JIT compilation) but differ in specific implementations and naming conventions.

---

## 2. V8 Compilation Pipeline

V8 uses a **four-tiered compilation strategy** to balance startup speed with peak performance.

### The Four Tiers

| Tier | Name | Compilation Time | Execution Speed | Purpose |
|------|------|-----------------|-----------------|---------|
| 0 | **Ignition** (Interpreter) | ~10μs | ~100x slower than native | Immediate execution, feedback collection |
| 1 | **Sparkplug** (Baseline JIT) | ~100μs | 5-10x slower than native | Fast native code, no optimization |
| 2 | **Maglev** (Mid-tier) | ~1ms | 2-3x slower than native | Quick optimizations, type specialization |
| 3 | **Turboshaft/TurboFan** (Optimizing) | ~10-100ms | Near-native speed | Aggressive optimizations, inlining |

### Execution Flow

```
Source Code
    │
    ▼
┌──────────────┐
│   Parser      │  Parse JavaScript → AST
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Ignition    │  Bytecode → Interpretive execution
│  (Tier 0)     │  Collects type feedback in FeedbackVector
└──────┬───────┘
       │  (budget exhaustion after ~8 calls)
       ▼
┌──────────────┐
│  Sparkplug    │  Bytecode → Fast native code (no IR, single pass)
│  (Tier 1)     │  Removes interpreter dispatch overhead
└──────┬───────┘
       │  (budget exhaustion after ~500 calls with stable feedback)
       ▼
┌──────────────┐
│    Maglev     │  Bytecode → Optimized native code
│  (Tier 2)     │  SSA-based CFG IR, type specialization
└──────┬───────┘
       │  (budget exhaustion after ~6000 calls)
       ▼
┌──────────────┐
│  Turboshaft   │  Optimized IR → Near-native machine code
│  (Tier 3)     │  Full optimization: inlining, escape analysis, etc.
└──────────────┘
```

### Ignition: The Interpreter

- **Register-based design** (not stack-based like the JVM)
- Bytecode instructions operate on virtual registers (`r0`, `r1`, etc.) with a dedicated accumulator register
- Bytecode handlers are written in **CodeStubAssembler (CSA)** — a platform-independent C++ DSL that TurboFan compiles to native code for each architecture
- Improvements to TurboFan's backend automatically accelerate the interpreter
- Maintains a **FeedbackVector** per function that stores IC (inline cache) data separately from code

### Sparkplug: The Baseline JIT

- Compiles from **bytecode** (not source), so parsing/variable resolution is already done
- **No intermediate representation (IR)** — compiles directly to machine code in a single linear pass over bytecode
- Maintains **interpreter-compatible stack frames** (same layout as Ignition frames)
- Enables trivial **On-Stack Replacement (OSR)** between Ignition and Sparkplug
- The bytecode offset slot is repurposed as a **FeedbackVector cache** during Sparkplug execution
- Calls into the same builtins as the interpreter for complex operations
- Removes interpreter dispatch overhead: bytecode decoding, next-bytecode dispatch

### Maglev: The Mid-Tier Optimizer

- Introduced in Chrome 117 (September 2023)
- Closes the gap between Sparkplug and TurboFan (compilation speed vs execution speed)
- Uses a **traditional SSA (Static Single-Assignment) CFG (Control-Flow Graph)** rather than Sea of Nodes
- Compiles ~10x faster than TurboFan while producing code ~2x faster than Sparkplug
- Tier-up trigger: ~500 invocations with stable feedback
- If feedback changes (new shapes appear), the counter resets

### Tier-Up Coordination

The `TieringManager` coordinates tier-up decisions by:
1. Tracking **interrupt budgets** for each function via `JSFunction::raw_feedback_cell()`
2. Detecting hot functions through budget exhaustion in `Runtime_BytecodeBudgetInterrupt`
3. Scheduling compilation jobs via `Compiler::CompileOptimized`
4. Installing optimized code when ready via `Runtime_InstallBaselineCode`

---

## 3. JIT Compilation

**Just-In-Time (JIT) compilation** compiles code at runtime rather than ahead of time. JavaScript engines use JIT because:

- JavaScript is dynamically typed — type information is only available at runtime
- JIT allows **speculative optimization** based on observed runtime behavior
- JIT enables tiered compilation: fast startup with incremental optimization

### JIT Compilation Stages

1. **Bytecode generation** (Ignition) — fast, minimal analysis
2. **Baseline native code** (Sparkplug) — remove interpreter overhead
3. **Optimized native code** (Maglev/Turboshaft) — type-specialized, inlined, reduced
4. **Deoptimization** — fall back when speculation fails

### Speculative Optimization

The JIT compiler makes **assumptions based on observed types and behavior**:
- If an IC site is monomorphic (single shape), generate fast path with a single map check + direct load
- If polymorphic (2-4 shapes), generate a linear chain of checks
- If megamorphic (>4 shapes), optimization is abandoned for that site

These assumptions are guarded by **type guards**. When a guard fails at runtime, the engine **deoptimizes** — reconstructs the interpreter frame and resumes in Ignition. This makes aggressive optimization safe: incorrect speculation never produces wrong results, only slower execution.

---

## 4. Hidden Classes / Shapes

JavaScript objects are dynamic bags of properties — property names, types, and order are not known at compile time. Hidden classes solve this by creating a mapping layer between property names and memory offsets.

### What Hidden Classes Store

| Component | Purpose |
|-----------|---------|
| **Map** (V8) | The hidden class itself; first pointer in every object for easy comparison |
| **DescriptorArray** | Full list of properties, their names, attributes, and memory offsets |
| **TransitionArray** | Edges from one Map to another when properties are added |

### Why They Exist

- Transform **dynamic property access** (dictionary lookup) into **fixed-offset memory loads** (O(1) access)
- Enable **inline caching** by providing an identity key for object shape
- Enable the optimizing compiler to **inline property accesses** with a single map check

### Object Structure in V8

```
┌─────────────────┐
│  Map Pointer     │  ← Points to hidden class (Map)
├─────────────────┤
│  In-Object       │  ← Properties stored directly on object (fastest)
│  Properties      │
├─────────────────┤
│  Elements        │  ← Integer-indexed properties (arrays)
│  Pointer         │
├─────────────────┤
│  Properties      │  ← Overflow properties (slower, indirect)
│  Store Pointer   │
└─────────────────┘
```

### Property Types

1. **In-object properties** — stored directly on the object (fastest access, no indirection)
2. **Fast properties** — stored in a properties backing store, indexed via DescriptorArray on the Map
3. **Slow properties** — stored in a self-contained properties dictionary (no shared DescriptorArray)

### Naming Across Engines

- V8: **Maps**
- SpiderMonkey: **Shapes**
- JavaScriptCore: **Structures**
- Chakra: **Types**
- Academic papers: **Hidden Classes**

---

## 5. Shape/Map Transitions

Hidden classes form a **transition tree** as properties are added to objects.

### How Transitions Work

```javascript
function Point(x, y) {
  this.x = x;   // C0 → C1 (property "x" added)
  this.y = y;   // C1 → C2 (property "y" added)
}
```

Step by step:
1. **C0** = empty object `{}` — no properties
2. `this.x = x` → V8 creates **C1** with property `x` at offset 0. C0 gets a transition edge labeled `"x"` → C1
3. `this.y = y` → V8 creates **C2** with properties `x` (offset 0) and `y` (offset 1). C1 gets a transition edge labeled `"y"` → C2

### Key Properties

- Objects with **the same structure** (same properties in the same order) share the same hidden class
- Adding properties in a **different order** creates different hidden classes and a different transition path
- Adding **array-indexed properties** does not create new hidden classes
- **Object literals** skip the empty shape — `{x: 1}` starts at a shape containing `x` from the beginning

### DescriptorArray Sharing

Maps in the same transition chain share a single DescriptorArray. Each Map knows how many entries to look at (its "valid count"). This saves memory:
- Map1 looks at entries [0..0] of DescriptorArray1
- Map2 looks at entries [0..1] of DescriptorArray1
- Map3 looks at entries [0..2] of DescriptorArray1

### Transition Arrays vs Inline Transitions

When a Map has only one transition, V8 stores it as a direct pointer (no array). A full `TransitionArray` is only created when there are multiple possible transitions (bifurcation).

---

## 6. Inline Caching (IC)

Inline caches are **the key ingredient to making JavaScript run fast**. They memorize where to find properties on objects, reducing expensive lookups.

### How ICs Work

1. First access: property lookup is expensive (walk prototype chain, search dictionary)
2. IC records the **shape (Map)** and the **property offset**
3. Subsequent accesses: only compare the shape (single pointer comparison), then load from the cached offset

### IC States

| State | Symbol | Shapes Seen | Access Cost | Description |
|-------|--------|-------------|-------------|-------------|
| Uninitialized | `0` | 0 | N/A | Property access not yet executed |
| Pre-monomorphic | `.` | 1 | N/A | First hit, likely to become monomorphic |
| **Monomorphic** | `1` | 1 | ~3 cycles | Ideal — single map check + direct load |
| **Polymorphic** | `P` | 2-4 | ~10-20 cycles | Linear chain of map checks |
| **Megamorphic** | `N` | >4 | ~100+ cycles | Global stub cache; often prevents optimization |

### IC Progression

```
Uninitialized → Pre-monomorphic → Monomorphic → Polymorphic → Megamorphic
                                                        ↑
                                              (one-way transition, never reverts)
```

### Megamorphic Behavior

- When an IC exceeds **4 shapes** (V8's threshold), it abandons local caching
- Falls back to a **global hash table** (megamorphic stub cache) with fixed size
- Performance degrades 10-50x compared to monomorphic
- Entries are overwritten on collisions (hash collisions between different property access sites)
- **TurboFan typically refuses to optimize** the containing function

### FeedbackVector

IC data is stored in a per-function **FeedbackVector** — a separate array with slots for each IC site. This separation:
- Enables sharing optimized code across closures
- Maintains per-closure type information
- Allows Ignition to populate IC data while sharing bytecode

### Practical Impact

```javascript
// MONOMORPHIC — fast (always the same shape)
function getX(obj) { return obj.x; }
getX({ x: 1 });
getX({ x: 2 });  // same shape {x: *}

// POLYMORPHIC — slower (2-4 shapes)
getX({ x: 1, y: 2 });   // shape {x: *, y: *}
getX({ x: 1, z: 3 });   // shape {x: *, z: *}

// MEGAMORPHIC — slow (many shapes)
for (let i = 0; i < 100; i++) {
  getX({ x: i, [i]: true });  // 100+ different shapes
}
```

---

## 7. Optimizing and Deoptimizing Compilation

### Optimizing Compilation

The optimizing compiler (Maglev/Turboshaft) applies **speculative optimizations** based on feedback:

1. **Type specialization** — generate code specialized for observed types (e.g., integer arithmetic instead of generic Number operations)
2. **Inlining** — replace function calls with the function body
3. **Escape analysis** — eliminate heap allocations for objects that don't escape the function
4. **Dead code elimination** — remove unreachable code paths
5. **Loop optimizations** — loop peeling, unrolling, invariant code motion
6. **Constant folding** — evaluate constant expressions at compile time
7. **Load elimination** — remove redundant loads from the same address
8. **Allocation folding** — merge adjacent small allocations

### Deoptimization

When speculative assumptions are violated at runtime, V8 performs **deoptimization**:

1. The optimized code frame is replaced with an interpreter-compatible frame
2. Execution resumes in Ignition (or Sparkplug) at the same bytecode position
3. The optimized code is discarded (or marked for re-optimization later)

**The optimization contract**: Speculation is safe because deoptimization provides a reliable escape hatch. Incorrect speculation never produces wrong results — only slower execution.

### Types of Deoptimization

- **Eager deoptimization**: Happens immediately when a guard fails during execution
- **Lazy deoptimization**: Deferred until the function is next called (used for non-critical changes like map deprecation)

---

## 8. Turboshaft Optimization Pipeline

As of 2025, V8's TurboFan has migrated from Sea of Nodes to **Turboshaft** — a CFG-based (Control-Flow Graph) intermediate representation.

### Why the Change from Sea of Nodes

Sea of Nodes was elegant but impractical for JavaScript:
1. **Too complex** — effect and control chains were hard to understand and debug
2. **Too limited** — most nodes were chained together anyway due to JavaScript's side effects
3. **Too slow** — state tracking was expensive, cache locality was bad, compiling took too long

Turboshaft's CFG-based approach:
- Compile time reduced by **2x**
- **3x fewer L1 data cache misses**
- Code is simpler and shorter
- Bug investigation is much easier

### Turboshaft Pipeline Phases

```
Bytecode + Feedback
        │
        ▼
┌───────────────────┐
│ Graph Creation     │  Build Turboshaft CFG from bytecode or TurboFan graph
└───────┬───────────┘
        │
        ▼
┌───────────────────┐
│ Machine Optimize   │  Constant folding, dead code elimination,
│                   │  algebraic identities, strength reduction
└───────┬───────────┘
        │
        ▼
┌───────────────────┐
│ Load Elimination   │  Remove redundant loads from same address
└───────┬───────────┘
        │
        ▼
┌───────────────────┐
│ Memory Optimization│  Allocation folding, write barrier elimination
└───────┬───────────┘
        │
        ▼
┌───────────────────┐
│ Instruction Select │  Map operations to architecture-specific instructions
└───────┬───────────┘
        │
        ▼
┌───────────────────┐
│ Register Allocation│  Assign virtual registers to physical registers
└───────┬───────────┘
        │
        ▼
┌───────────────────┐
│ Code Assembly      │  Generate final machine code
└───────────────────┘
```

### Compilation Paths

Two paths into Turboshaft:
1. **Classic path**: TurboFan Sea-of-Nodes graph → lowered through TurboFan passes → converted to Turboshaft graph
2. **Turbolev path** (future): Maglev's CFG/SSA graph → fed directly into Turboshaft, bypassing TurboFan entirely

### Key Optimization Phases

- **MachineOptimizationReducer**: Peephole optimizations (strength reduction: `a * 2^k` → `a << k`, constant folding: `a + 0` → `a`, bitfield combination)
- **LoadElimination**: Tracks known memory contents across basic blocks, eliminates redundant loads
- **StoreStoreElimination**: Eliminates redundant stores when the first store is never read before being overwritten
- **MemoryOptimization**: Allocation folding (merge adjacent small allocations) and write barrier elimination for freshly allocated objects

---

## 9. Deoptimization Bailout Reasons

V8 tracks specific reasons for each deoptimization. Key reasons include:

### Speculation Violations

| Reason | Description |
|--------|-------------|
| **MapCheck** | Object's hidden class changed (most common) |
| **WrongMap** | Object has unexpected Map |
| ** Hole** | Array element is a hole (missing) |
| **Overflow** | Integer arithmetic overflowed 32-bit |
| **NaN** | Operation expected non-NaN but received NaN |
| **LazyDeopt** | Deferred deopt triggered |
| **ForcedDeoptToRuntime** | Forced deopt to runtime |

### Dependency Changes

| Reason | Description |
|--------|-------------|
| **MapDeprecated** | Dependent map was deprecated |
| **PrototypeChange** | Dependent prototype chain changed |
| **PropertyCellChange** | Dependent property cell changed |
| **FieldTypeChange** | Dependent field type changed |
| **FieldRepresentationChange** | Dependent field representation changed |

### Other Reasons

| Reason | Description |
|--------|-------------|
| **AccessCheck** | Access check needed (cross-origin) |
| **StackCheck** | Stack overflow detected |
| **OSREarlyExit** | Exit from OSR'd inner loop |
| **Debugger** | JS debugger attached |
| **ExceptionCaught** | Exception with omitted catch handler |
| **PrepareForOnStackReplacement** | Preparing for OSR transition |

### Eager vs Lazy Deoptimization

- **Eager**: Immediate code invalidation; the optimized code is never re-entered
- **Lazy**: Code is still valid but will be deoptimized on next use (e.g., map deprecation)
- **Without invalidation**: Some deopts (OSR transitions) don't discard the optimized code, allowing re-entry

---

## 10. Memory Model: Stack vs Heap

JavaScript's memory is divided into two distinct regions:

### The Stack

```
┌─────────────────┐
│  return address   │
├─────────────────┤
│  function params  │
├─────────────────┤
│  local primitives │  ← Number, String, Boolean, null, undefined, Symbol, BigInt
├─────────────────┤
│  frame pointer    │
└─────────────────┘
```

**Characteristics:**
- LIFO (Last-In-First-Out) structure
- **Automatic allocation and deallocation** — frame is pushed on call, popped on return
- Fixed-size allocations (primitives, pointers)
- Very fast: just stack pointer adjustment
- CPU-cache friendly, contiguous memory
- **Bounded**: typically 1-8 MB (browser) / 10-15 MB (Node.js)
- No garbage collection needed

### The Heap

```
┌──────────────────────────────┐
│         Young Generation      │
│  ┌──────────┬──────────┐     │
│  │  Nursery  │  intermediate │ │
│  └──────────┴──────────┘     │
├──────────────────────────────┤
│         Old Generation        │
│  ┌──────────────────────┐    │
│  │ Old Space             │    │
│  ├──────────────────────┤    │
│  │ Map Space             │    │
│  ├──────────────────────┤    │
│  │ Code Space            │    │
│  └──────────────────────┘    │
├──────────────────────────────┤
│      Large Object Space       │
└──────────────────────────────┘
```

**Characteristics:**
- Non-contiguous memory managed by the garbage collector
- Objects, arrays, functions, closures live here
- Dynamic allocation, variable lifetimes
- Requires garbage collection for reclamation
- Partitioned into generations (generational hypothesis: most objects die young)
- Access requires pointer indirection (one extra dereference vs stack)

### Key Distinction

| | Stack | Heap |
|--|-------|------|
| **Speed** | Very fast (O(1) push/pop) | Slower (allocation + GC) |
| **Size** | Small (1-15 MB) | Large (1-4 GB+) |
| **Lifespan** | Scope-bound | Until GC collects |
| **Fragments** | No fragmentation | Can fragment |
| **Management** | Automatic (LIFO) | Garbage collector |

---

## 11. Memory Allocation

### Primitives

In JavaScript, primitives are **copied by value**:

```javascript
let a = 10;      // Number on stack (or as Smi in V8)
let b = a;       // Copy of value
b = 20;
console.log(a);  // 10 (unchanged)
```

**Important V8 optimization**: Small integers (Smis) can be stored **directly in the pointer itself** using a tag bit, avoiding heap allocation entirely. In this case, the "pointer" IS the value.

### Objects

Objects are **copied by reference** — the stack holds a pointer to the heap-allocated object:

```javascript
let obj1 = { x: 1 };   // Object on heap, pointer on stack
let obj2 = obj1;         // Copy of reference (pointer)
obj2.x = 99;
console.log(obj1.x);    // 99 (same object!)
```

### What Goes Where

| Allocation | Location |
|-----------|----------|
| Primitive values (Number, String, Boolean, etc.) | Stack (or optimized to registers/Smi) |
| Object literals `{}` | Heap |
| Arrays `[]` | Heap |
| Functions | Heap |
| Closures | Heap (the captured scope environment) |
| Arrow functions | Heap (captures outer scope) |
| `let`/`const` with primitive values | Stack (optimization; never heap unless boxed) |

### Engine Optimization: Escape Analysis

The optimizing compiler can perform **escape analysis** to determine if an object escapes the current function. If not:
- The object can be **scalar-replaced** (properties stored in registers/on stack)
- The allocation can be **eliminated entirely**
- This is invisible to the programmer — behavior is identical

### Closure Allocation

When a function closes over variables from an outer scope, the engine must keep those variables alive beyond the outer function's execution:

```javascript
function outer() {
  let bigArray = new Array(10000);  // Would be on stack if no closure
  return function inner() {
    return bigArray[0];  // Closes over bigArray
  };
}
// bigArray lives on heap as long as inner() is reachable
```

Modern engines analyze which variables are actually referenced by closures and only heap-allocate those. Non-captured variables stay on the stack.

---

## 12. Garbage Collection Algorithms

### Mark-and-Sweep (Base Algorithm)

The fundamental algorithm used by all modern JavaScript engines:

1. **Mark phase**: Start from root set (global object, call stack, active closures). Follow all pointers, mark each reachable object as "alive"
2. **Sweep phase**: Scan the heap. Any object not marked is dead — add its memory to the free list
3. **Compact phase** (optional): Move surviving objects together to eliminate fragmentation

### Generational Collection

Based on the **weak generational hypothesis**: most objects die young.

```
┌─────────────────────────────┐
│     Young Generation (< 16MB)│
│  ┌────────┬──────────────┐  │
│  │ Nursery │ Intermediate  │  │  ← Most GC happens here (fast)
│  └────────┴──────────────┘  │
├─────────────────────────────┤
│     Old Generation           │  ← Collected less frequently (slower)
│  ┌────────────────────────┐ │
│  │  Old Space              │ │
│  └────────────────────────┘ │
└─────────────────────────────┘
```

- **Young gen** (Scavenge): Fast, frequent collections. Copying collector — surviving objects are moved
- **Old gen** (Mark-Compact): Slower, less frequent. Full heap collection

Objects survive GC cycles → promoted from nursery → intermediate → old generation

### Incremental Marking

Instead of pausing the entire application to mark the heap:
- Marking is split into small increments interleaved with JavaScript execution
- Each increment processes a few objects
- Reduces maximum pause time
- Uses **write barriers** to track mutations during marking

### Concurrent Collection

Marking and sweeping happen on **background threads** while JavaScript runs on the main thread:
- Concurrent marking helpers follow pointers and mark objects
- Write barriers track new references created during concurrent marking
- Main thread only pauses for a brief "final mark" step

### Parallel Collection

Work is distributed across **multiple threads** during GC pauses:
- Multiple helper threads evacuate/compact objects in parallel
- Synchronization via atomic operations and compare-and-swap
- Thread-local allocation buffers reduce contention

---

## 13. V8 Garbage Collector: Orinoco

Orinoco is V8's garbage collection system — designed to minimize pause times while maintaining memory efficiency.

### Young Generation: Scavenger (Minor GC)

**Algorithm**: Parallel Scavenger (semispace copying collector)

```
┌────────────────┐     ┌────────────────┐
│   From-Space    │     │   To-Space      │
│  (active alloc) │     │  (empty)        │
│                 │     │                 │
│  ┌───┐ ┌───┐   │     │                 │
│  │ A │ │ B │   │ ──→ │  ┌───┐ ┌───┐   │
│  └───┘ └───┘   │     │  │ A │ │ B │   │
│  (A survives,   │     │  └───┘ └───┘   │
│   B is dead)    │     │  (compacted)    │
└────────────────┘     └────────────────┘
```

1. JavaScript allocates into **From-Space** (nursery)
2. When From-Space fills up → trigger Scavenge
3. Live objects are **copied** to **To-Space** (compaction happens for free)
4. Dead objects are implicitly collected (never copied)
5. Swap From-Space and To-Space
6. Objects surviving a second GC are **promoted** to Old Generation

**Key features:**
- Very fast (< 1ms pause)
- Each thread has a **thread-local allocation buffer** (TLAB)
- Uses **atomic compare-and-swap** when multiple threads find the same object
- **Forwarding pointers** left behind to update references after object movement

### Old Generation: Mark-Sweep-Compact (Major GC)

**Algorithm**: Concurrent marking + parallel compaction

```
Phase 1: Concurrent Marking (background, no pause)
┌────────────┐
│ JavaScript │ ← Main thread runs normally
│ executing  │
└─────┬──────┘
      │  ← Background threads follow pointers, mark objects
      ▼
Phase 2: Brief Pause + Parallel Compaction
┌────────────┐
│   Paused   │ ← Main thread: final mark + coordinate
│            │ ← Background threads: sweep + compact
└────────────┘
      │
      ▼
Phase 3: Concurrent Sweeping (background, no pause)
┌────────────┐
│ JavaScript │ ← Sweeper threads run in background
│ executing  │
└────────────┘
```

**Marking Phase:**
- Starts from root set (execution stack, global object, etc.)
- Background threads follow pointers and mark reachable objects
- **Write barriers** track new references created during concurrent marking

**Sweeping Phase:**
- Dead objects' memory is added to free lists
- Free lists are separated by memory chunk size for quick lookup
- Sweeping runs concurrently with JavaScript execution

**Compaction Phase:**
- Some highly fragmented pages are evacuated (objects moved to eliminate gaps)
- Not all pages are compacted — only those selected by a **fragmentation heuristic**
- Compaction is like disk defragmentation: fills in scattered gaps
- Parallel compaction with multiple helper threads

### Orinoco Techniques

| Technique | Description |
|-----------|-------------|
| **Parallel scavenging** | Multiple threads copy surviving objects during young gen GC |
| **Concurrent marking** | Background threads mark objects while JavaScript runs |
| **Concurrent sweeping** | Background threads sweep dead objects while JavaScript runs |
| **Incremental marking** | Marking interleaved with JavaScript execution |
| **Write barriers** | Track pointer mutations during concurrent marking |
| **Idle-time GC** | Perform GC work during idle periods (requestIdleCallback) |
| **Memory pooling** | Recycle pages via epoch-based system to reduce OS mmap/munmap calls |

### V8 Heap Layout

| Space | Purpose | GC Strategy |
|-------|---------|-------------|
| **New Space** (Young Gen) | Short-lived objects | Scavenger (parallel copying) |
| **Old Space** | Long-lived objects | Mark-Compact |
| **Map Space** | Hidden classes (Maps) only | Specialized (always compact) |
| **Code Space** | JIT-compiled code | Mark-Compact (with compaction control) |
| **Large Object Space** | Objects > 64KB | Mark-Compact (never moved, but swept) |
| **Trusted Space** | Trusted objects (e.g., compiled code) | Mark-Compact |

---

## 14. Call Stack Mechanics

The call stack is a **LIFO (Last-In-First-Out)** data structure that tracks function execution:

```javascript
function multiply(a, b) { return a * b; }
function square(n) { return multiply(n, n); }
function printSquare(n) { const sq = square(n); console.log(sq); }

printSquare(4);
```

### Stack Frame Build-Up

```
┌──────────────────────────┐
│  Stack Frame 3: multiply │  ← Top of stack (currently executing)
│  a=4, b=4                │
├──────────────────────────┤
│  Stack Frame 2: square   │
│  n=4                     │
├──────────────────────────┤
│  Stack Frame 1: printSq  │
│  n=4                     │
├──────────────────────────┤
│  Stack Frame 0: global   │  ← Bottom of stack
│  sq=undefined            │
└──────────────────────────┘
```

### What a Stack Frame Contains

Each stack frame tracks:
- **Return address** — where to resume after the function returns
- **Function parameters** — arguments passed to the function
- **Local variables** — variables declared with `var`, `let`, `const`, `function`
- **This binding** — the value of `this`
- **Scope chain reference** — pointer to the outer lexical environment

### Stack Overflow

When the call stack exceeds its size limit (typically 10-15 MB), a **RangeError: Maximum call stack size exceeded** is thrown. Common causes:
- Infinite recursion
- Very deep (but finite) recursion
- Large synchronous call chains

### On-Stack Replacement (OSR)

V8 can **replace the currently executing code** while a function is on the stack:
- **Interpreter → Sparkplug**: When a hot loop is detected, compile and switch mid-execution
- **Sparkplug → Maglev/Turboshaft**: Upgrade optimized code while in a loop
- **Deoptimization**: When optimized code needs to bail out, reconstruct the interpreter frame on the stack

---

## 15. Execution Contexts and Variable Environments

### What is an Execution Context?

An execution context is the **environment** needed to execute a piece of code. It tracks:
- Variables (`var`, `let`, `const`, `function`, `class`)
- `this` binding
- Private identifiers (`#foo`)

### Three Types of Execution Contexts

| Type | Created When | Lives Until |
|------|-------------|-------------|
| **Global Execution Context** | Script first loads | Script ends |
| **Function Execution Context** | Function is called | Function returns |
| **Eval Execution Context** | `eval()` is called | eval finishes |

### Two Phases of Execution

Every execution context goes through two phases:

#### Phase 1: Creation Phase (Hoisting)

```
1. Create the Variable Object (VO)
2. Set up the Scope Chain
3. Determine the value of `this`
4. Hoist declarations (register names in memory)
```

#### Phase 2: Execution Phase

```
1. Code executes line by line
2. Assignments are made
3. Functions are called (new FECs pushed)
```

### VariableEnvironment vs LexicalEnvironment

Each execution context has two environment components:

| Component | Purpose | When Updated |
|-----------|---------|-------------|
| **VariableEnvironment** | Holds bindings created by `var` statements | Frozen at context creation |
| **LexicalEnvironment** | Holds bindings created by `let`, `const`, and used for identifier resolution | Updated in real-time as code executes |

The **LexicalEnvironment** is what participates in the scope chain and identifier resolution. The separation exists mainly for how closures capture environments:
- **Function Declarations (FD)** capture the VariableEnvironment
- **Function Expressions (FE)** capture the LexicalEnvironment (important for `with` statements and `catch` clauses)

---

## 16. Lexical Environments

A lexical environment consists of two components:

```
LexicalEnvironment = {
  EnvironmentRecord: <identifier bindings>,
  OuterReference: <reference to outer environment>
}
```

### Environment Record Types

| Type | Used For | Storage |
|------|---------|---------|
| **Declarative Environment Record** | Function bodies, blocks, catch clauses | Map-like fast lookup |
| **Object Environment Record** | Global scope, `with` statements | Properties on binding object |
| **Function Environment Record** | Function scope | Includes `this` binding, `super` state |
| **Global Environment Record** | Global scope | Composite: Object ER + Declarative ER |
| **Module Environment Record** | ES module scope | Declarative + immutable imports |

### How They Connect

```javascript
const global = "global";

function outer() {
  const outerVar = "outer";
  
  function inner() {
    const innerVar = "inner";
    console.log(innerVar, outerVar, global);
  }
  
  inner();
}
```

```
Inner Environment:
┌─────────────────────────┐
│ innerVar: "inner"       │ ← Declarative Environment Record
│ OuterRef ──────────────┐│
└─────────────────────────┘│
                            │
Outer Environment:          │
┌─────────────────────────┐←┘
│ outerVar: "outer"       │ ← Declarative Environment Record
│ OuterRef ──────────────┐│
└─────────────────────────┘│
                            │
Global Environment:         │
┌─────────────────────────┐←┘
│ global: "global"        │ ← Object Environment Record (global object)
│ OuterRef: null          │   + Declarative Environment Record
└─────────────────────────┘
```

### Optimization in V8

V8 doesn't always create full environment record objects:
- When there are no closures, variables can live on the **stack**
- When closures are detected, the engine creates **context objects** for the captured variables
- `let` and `const` enable better optimization because of their block-scoping rules

---

## 17. Scope Chain Implementation

The scope chain is the mechanism for **identifier resolution** — looking up variable values.

### Lookup Process

```
1. Search current EnvironmentRecord
2. If not found → follow OuterReference to parent environment
3. Repeat until found or OuterReference is null (global scope)
4. If not found anywhere → ReferenceError
```

### Key Properties

- **Lexical scoping**: Scope is determined by where code is **written**, not where it is **called**
- **One-way visibility**: Inner scopes can see outer scopes, but not vice versa
- **Unidirectional**: `inner → outer → global` (never the reverse)

### Prototype Chain vs Scope Chain Analogy

| | Prototype Chain | Scope Chain |
|--|----------------|-------------|
| **Lookup** | Object → Prototype → Proto-prototype → ... | Environment → Outer → Global |
| **Link** | `[[Prototype]]` | OuterReference |
| **Found** | Property on chain | Variable binding |
| **Not Found** | `undefined` | `ReferenceError` |

---

## 18. Hoisting Internals

Hoisting is the result of the **creation phase** of execution contexts — the engine scans for declarations and registers them before execution begins.

### What Gets Hoisted

| Declaration | Hoisted? | Initialized? |
|------------|----------|-------------|
| `function declaration` | ✅ Yes | ✅ Yes (full function body) |
| `var` | ✅ Yes | ✅ Yes (to `undefined`) |
| `let` | ✅ Yes | ❌ No (Temporal Dead Zone) |
| `const` | ✅ Yes | ❌ No (Temporal Dead Zone) |
| `function expression` (var) | ✅ Yes (variable only) | ✅ To `undefined` |
| `class` | ✅ Yes | ❌ No (TDZ) |

### How It Works (Internally)

```javascript
console.log(x); // undefined (not ReferenceError)
var x = 5;

console.log(y); // ReferenceError (TDZ)
let y = 10;
```

**What the engine sees:**
```
// Creation Phase:
// x registered, initialized to undefined
// y registered, NOT initialized (TDZ from start of scope)

// Execution Phase:
console.log(x); // undefined
x = 5;

console.log(y); // ReferenceError (accessing uninitialized binding)
y = 10;
```

### Temporal Dead Zone (TDZ)

`let` and `const` are hoisted but live in a **Temporal Dead Zone** from the start of their scope until the declaration is reached. Accessing them in the TDZ throws a `ReferenceError`. This is safer than `var`'s silent `undefined`.

```javascript
{
  // TDZ starts here for x
  // x is hoisted but uninitialized
  console.log(x); // ReferenceError
  let x = 5;      // TDZ ends here
  console.log(x); // 5
}
```

### Function Hoisting Priority

Function declarations are hoisted **before** `var` variable assignments:

```javascript
var myFunc = "not a function";

function myFunc() {
  return "I am a function!";
}

console.log(typeof myFunc); // "function" (function declaration wins)
```

---

## 19. Property Access Optimization

### Fast vs Slow Property Access

V8 uses multiple strategies for property storage, optimized for different usage patterns:

```
Object Property Access Priority:
1. In-object properties (fastest, direct offset)
2. Fast properties (DescriptorArray lookup → offset → backing store)
3. Slow properties (dictionary mode, hash table lookup)
```

### How Property Access is Optimized

1. **Hidden class provides fixed offset** — no dictionary lookup needed
2. **Inline cache remembers** which Map was seen at this code site
3. **Optimizing compiler generates**:
   - Map check (compare object's Map pointer to cached Map)
   - Direct memory load at known offset
4. **Result**: Property access approaches the speed of struct field access in C

### Property Access Patterns

```javascript
// FAST: Consistent shapes
const obj = { x: 1, y: 2 };
function getX(o) { return o.x; }
getX(obj);  // IC: monomorphic — map check + direct load

// SLOW: Mixed shapes
function getXSlow(o) { return o.x; }
getXSlow({ x: 1 });        // Map1
getXSlow({ x: 1, y: 2 });  // Map2
getXSlow({ x: 1, z: 3 });  // Map3
getXSlow({ a: 1 });         // Map4 (no x property!)
getXSlow({ x: 1, b: 2 });  // Map5 → MEGAMORPHIC (>4 shapes)
```

### Dictionary Mode (Slow Properties)

When an object has many properties added/removed, V8 switches to **dictionary mode**:
- Properties stored in a `NameDictionary` (hash table)
- No DescriptorArray, no hidden class transitions
- **Inline caches don't work** with dictionary properties
- Significantly slower than fast mode

---

## 20. Prototype Chain Optimization

### Standard Prototype Lookup

When accessing `obj.method`:
1. Check `obj` own properties
2. Check `obj.__proto__` (prototype)
3. Check `obj.__proto__.__proto__`
4. ... until found or `null`

This is inherently slower than direct property access.

### How V8 Optimizes Prototype Access

1. **Inline caching at each depth**: ICs cache the Map and offset at each prototype level
2. **Prototype feedback**: TurboFan can generate specialized code for prototype access if the prototype chain is stable
3. **Inlined prototype loads**: For monomorphic prototype access, TurboFan inlines the map check and load directly

### Prototype Pollution Concerns

Modifying `Object.prototype` or deeply-nested prototypes:
- Affects all objects in the program
- Can deoptimize ICs that cached previous prototype shapes
- Changes the prototype chain structure

### `Object.create(null)` and `%TypedArray%.prototype`

Creating objects with `null` prototype:
- No prototype chain to walk
- Property access is purely own-property
- Can be slightly faster for pure dictionary patterns

---

## 21. Array Optimization (Packed vs Holey Elements)

V8 tracks the **elements kind** of each array to optimize operations.

### Elements Kind Lattice

V8 distinguishes **21 different element kinds**, arranged in a lattice of increasing generality:

```
PACKED_SMI_ELEMENTS
        │
        ▼
PACKED_DOUBLE_ELEMENTS
        │
        ▼
PACKED_ELEMENTS (generic objects)
        │
        ▼
HOLEY_SMI_ELEMENTS ──────────────────────────────┐
        │                                          │
        ▼                                          ▼
HOLEY_DOUBLE_ELEMENTS                          DICTIONARY_ELEMENTS
        │
        ▼
HOLEY_ELEMENTS
```

### Packed vs Holey

| | Packed | Holey |
|--|--------|-------|
| **Definition** | All indices from 0 to length-1 are present | Some indices may be missing (holes) |
| **Example** | `[1, 2, 3]` | `[1, , 3]` or `new Array(3)` |
| **Performance** | Faster (no hole checks needed) | Slower (prototype chain lookup for holes) |
| **Operations** | Can use tight loops | Must handle missing values |

### One-Way Transitions

Elements kinds only transition **downward** (more general):
- Adding a float to an array of Smis → transitions to `PACKED_DOUBLE_ELEMENTS`
- Creating a hole → transitions to `HOLEY_*` variant
- Once holey, **always holey** (even if holes are filled later)
- Once double, **always double** (even if the float is overwritten with an integer)

### Practical Performance Tips

```javascript
// GOOD: Packed SMI (fastest)
const arr1 = [1, 2, 3, 4, 5];

// BAD: Holey (created with Array constructor)
const arr2 = new Array(5);
arr2[0] = 1; arr2[1] = 2; // Still HOLEY_SMI_ELEMENTS

// BAD: Mixed types
const arr3 = [1, 2.5, 3];  // Transitions to PACKED_DOUBLE_ELEMENTS

// BAD: Creating holes
const arr4 = [1, , 3];  // HOLEY_ELEMENTS

// GOOD: Array literals with all values
const arr5 = [1, 2, 3];  // PACKED_SMI_ELEMENTS
```

### TypedArrays

For typed arrays (`Int32Array`, `Float64Array`, etc.), V8 uses `ByteArray` backing stores with native types, avoiding boxing overhead entirely.

---

## 22. String Interning and Cons Strings

### String Interning

V8 maintains an **internal string table** — a lookup structure for known strings:

```javascript
const a = "hello";
const b = "hello";
// a and b point to the SAME heap object
// Only one allocation, pointer comparison for equality
```

**How it works:**
1. When V8 encounters a string literal `"hello"`, it checks the string table
2. If found, returns pointer to existing object (zero allocation)
3. If not found, creates new string and adds to table
4. Property names are **always interned** — this is why property key lookups are so fast

**Constant folding** also contributes: `"hel" + "lo"` is computed at parse time, so by execution time it's already interned as `"hello"`.

### ConsString (Rope Data Structure)

When strings are concatenated at **runtime** (non-constant), V8 uses a **ConsString** — a binary tree of string fragments:

```javascript
const first = "Hello";
const last = "World";
const full = first + " " + last;  // Creates ConsString
```

**ConsString structure:**
```
┌──────────────┐
│  ConsString   │
│  ┌─────┐     │
│  │first│─────┼──→ "Hello"
│  ├─────┤     │
│  │second│────┼──→ ConsString
│  └─────┘     │       ├──→ " "
└──────────────┘       └──→ "World"
```

**Characteristics:**
- **O(1) creation**: Just a small connector object with two pointers
- **O(depth) access**: Must traverse the tree to reach a character
- **Lazy flattening**: Only flattened when a contiguous string is needed

### String Flattening

V8 flattens ConsStrings when:
- A **native/C++ operation** needs contiguous memory (regex, string methods)
- The ConsString tree **exceeds a depth threshold**
- Flattening allocates a **SeqString** (sequential string) — a flat, directly indexable character array

### SeqString (Sequential String)

After flattening, the string becomes a flat array of characters:
- O(1) character access
- Can be one-byte (Latin-1) or two-byte (UCS-2)
- Directly indexable

### String Types Summary

| Type | When Used | Access Cost |
|------|----------|-------------|
| **Interned String** | Literals, property keys | O(1) — pointer comparison |
| **ConsString** | Runtime `+` concatenation | O(depth) — tree traversal |
| **SeqString** | After flattening or `array.join()` | O(1) — direct index |
| **Sliced String** | Substring without copying | O(1) — offset into parent |
| **External String** | C++ string resources | Depends on resource |

### Performance Tips

```javascript
// SLOW: += in loop creates deep ConsString tree
let result = "";
for (let i = 0; i < 10000; i++) {
  result += "a";  // Deep ConsString tree, eventually flattened
}

// FAST: array.join() creates one SeqString in a single pass
const parts = [];
for (let i = 0; i < 10000; i++) {
  parts.push("a");
}
const result = parts.join("");  // Single contiguous allocation
```

---

## 23. Number Representation (Smi, HeapNumber)

### Smi (Small Integer)

V8 represents small integers **directly in the pointer** using a tag bit:

```
Smi value:  [ sign bit | integer value (31 bits) ]
            ^tag bit (1)                          ^
            
Example: Smi(42) = 0b0000000000000000000000000101010
           tag=0 ─┘                              value=42
```

**Characteristics:**
- No heap allocation needed (the value IS the pointer)
- Zero GC pressure for small integers
- Range: approximately ±1 billion (31-bit signed on 64-bit systems with pointer compression)
- Fastest possible number representation

### HeapNumber

For numbers that don't fit in a Smi (doubles, large integers, `NaN`, `Infinity`):

```
┌──────────────────┐
│  Map Pointer      │  ← Points to HeapNumber Map
├──────────────────┤
│  Raw hash field   │
├──────────────────┤
│  64-bit double    │  ← IEEE 754 double-precision float
└──────────────────┘
```

**When HeapNumber is used:**
- Floating-point numbers: `3.14`, `-0.5`
- Integers outside Smi range: larger than ±1 billion
- Special values: `NaN`, `Infinity`, `-Infinity`
- `Number.MIN_VALUE`, `Number.MAX_VALUE`

### NaN Boxing (SpiderMonkey)

SpiderMonkey uses a different technique called **NaN boxing**: since `NaN` has many bit patterns that are all "NaN", unused NaN bit patterns can encode pointers. This means all JS numbers (doubles) are stored **directly in the pointer**, and anything that's not a valid double is interpreted as a pointer.

### V8 Pointer Compression

V8 uses **pointer compression** (32-bit compressed pointers in a 64-bit heap):
- Reduces memory usage for all pointers
- Multiple isolates can share a single **Pointer Compression Cage**
- Smi values are 31-bit signed integers
- Heap pointers are compressed to 32-bit offsets within the cage

---

## 24. Memory Leaks

A JavaScript memory leak occurs when objects that should be garbage collected remain **reachable from GC roots** (global scope, active closures, event listeners, timers).

### Common Memory Leak Patterns

#### 1. Detached DOM Nodes

```javascript
// BAD: Element removed from DOM but JS still references it
let detachedTree;
function createAndDetach() {
  const div = document.createElement('div');
  div.textContent = "Hello";
  document.body.appendChild(div);
  detachedTree = div;  // Reference persists!
  document.body.removeChild(div);
}
// The div and its entire subtree remain in memory
```

#### 2. Forgotten Event Listeners

```javascript
// BAD: Listener never removed
function setup() {
  const button = document.getElementById('myButton');
  button.addEventListener('click', handleClick);
  // No removeEventListener — handler + its closure stay alive
}
```

#### 3. Uncleared Timers

```javascript
// BAD: Interval runs forever, holding references
function startPolling(data) {
  setInterval(() => {
    console.log(data.length);  // Closes over `data`
  }, 1000);
  // Never clearInterval!
}
```

#### 4. Closures Capturing Large Scopes

```javascript
// BAD: Closure captures entire scope
function processData() {
  const hugeArray = new Array(1000000).fill('data');
  const tinyResult = computeSomething(hugeArray);
  
  return function getResult() {
    return tinyResult;  // Only needs tinyResult, but hugeArray
  };                    // stays alive because it's in the same scope
}
```

#### 5. Accidental Global Variables

```javascript
// BAD: Missing var/let/const creates global
function leak() {
  leakedVar = "I'm global now!";  // window.leakedVar
}
```

#### 6. Unbounded Caches

```javascript
// BAD: Cache grows without limit
const cache = {};
function getData(key) {
  if (!(key in cache)) {
    cache[key] = expensiveComputation(key);
  }
  return cache[key];
}
// cache object grows forever
```

#### 7. Forgotten Observers/Connections

```javascript
// BAD: Observer/connection never disconnected
const observer = new MutationObserver(callback);
observer.observe(document.body, { childList: true });
// Never observer.disconnect()

const ws = new WebSocket(url);
// Never ws.close()
```

---

## 25. Memory Profiling and Detection

### Chrome DevTools Memory Panel

Four profiling types:

| Profile Type | Purpose |
|-------------|---------|
| **Heap Snapshot** | Point-in-time view of all objects on the heap |
| **Allocation Timeline** | Memory allocations over time (blue = still alive, gray = collected) |
| **Allocation Sampling** | Statistical sampling of allocations by function (low overhead, production-safe) |
| **Detached Elements** | Shows DOM elements retained by JS references |

### Three-Snapshot Technique

The most reliable leak detection method:

```
1. Take Heap Snapshot #1 (baseline)
2. Perform the suspect action (open/close modal, navigate routes)
3. Take Heap Snapshot #2
4. Repeat the suspect action
5. Take Heap Snapshot #3
6. Compare Snapshots #2 and #3

Objects in #3 that aren't in #2 but WERE in #1 = leak candidates
```

### Key Metrics to Watch

| Metric | Warning Sign |
|--------|-------------|
| **JS Heap Size** | Steadily increasing over time |
| **DOM Node Count** | Increasing without corresponding UI changes |
| **Event Listener Count** | Growing during normal usage |
| **Detached Elements** | Increasing after navigation/component unmount |

### Retainer Analysis

DevTools shows **retaining paths** — the chain of references keeping an object alive:
```
window
  └── event listener
      └── closure
          └── DOM node
              └── subtree (all alive!)
```

### Node.js Memory Profiling

```bash
# Increase heap limit for profiling
node --max-old-space-size=4096 app.js

# Inspect with Chrome DevTools
node --inspect app.js

# Take heap snapshot
# chrome://inspect → your Node process → Take heap snapshot

# Programmatic heap stats
console.log(process.memoryUsage());
// { rss, heapTotal, heapUsed, external }
```

### production.memory API (Browsers)

```javascript
if (performance.memory) {
  console.log(performance.memory.usedJSHeapSize);
  console.log(performance.memory.totalJSHeapSize);
  console.log(performance.memory.jsHeapSizeLimit);
}
```

---

## 26. Memory Limits in JavaScript

### Browser Limits

| Browser | Approximate JS Heap Limit |
|---------|--------------------------|
| Chrome (desktop) | ~1.5-4 GB (64-bit), ~256-512 MB (32-bit) |
| Firefox | ~2-4 GB (64-bit) |
| Safari | ~1-2 GB |
| Mobile browsers | ~256 MB - 1 GB |

### Node.js Limits

| Environment | Default Heap Limit |
|------------|-------------------|
| Node.js (64-bit) | ~1.5 GB (`--max-old-space-size`) |
| Node.js (32-bit) | ~700 MB |

Override with:
```bash
node --max-old-space-size=8192 app.js  # 8 GB limit
```

### V8-Specific Limits

V8's `Heap` class dynamically adjusts limits based on:
- Physical memory available
- Mutator behavior (allocation rate vs GC rate)
- `HeapController` manages growth to avoid excessive GC frequency

### When Limits Are Exceeded

```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

### `SharedArrayBuffer` Memory

- SharedArrayBuffer memory is **not counted against** any single agent's heap limit
- Each agent has its own heap, but the underlying buffer memory is shared
- Subject to OS-level limits and browser security policies (COOP/COEP headers required)

---

## 27. WeakRef and FinalizationRegistry Internals

### WeakRef (ES2021)

A WeakRef provides a **weak reference** to an object — it does not prevent garbage collection:

```javascript
let obj = { data: "important" };
const weakRef = new WeakRef(obj);

console.log(weakRef.deref()); // { data: "important" }

obj = null;
// GC may collect the object
// weakRef.deref() may return undefined
```

**V8 internals:**
- WeakRef stores a pointer to the target that is **not traced** during GC marking
- When the target is collected, the WeakRef's deref returns `undefined`
- `WeakRef.prototype.deref()` keeps the object alive for the duration of the synchronous operation (**ClearKeptObjects** is called after the synchronous work completes)

### FinalizationRegistry (ES2021)

A FinalizationRegistry registers a **cleanup callback** that runs when a target object is garbage collected:

```javascript
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`Object with ${heldValue} was collected`);
});

let obj = { resource: "open" };
registry.register(obj, "some-resource");

obj = null;
// At some point after GC, callback fires with "some-resource"
```

**V8 internals:**

The implementation uses `WeakCell` objects allocated in **old space**:

```
JSFinalizationRegistry
├── cleanup_callback
├── active_cells → WeakCell → WeakCell → ...  (linked list)
├── cleared_cells → WeakCell → WeakCell → ...  (linked list, awaiting cleanup)
└── key_map → unregister token lookup
```

**How it works:**
1. `registry.register(target, heldValue)` creates a `WeakCell` linking target → heldValue
2. When GC determines the target is unreachable, the `WeakCell` moves from `active_cells` to `cleared_cells`
3. A **FinalizationRegistryCleanupTask** is posted to the heap's task queue
4. The cleanup task calls the callback with the `heldValue` for each cleared cell
5. Cleanup runs during **microtask checkpoints**, never synchronously

**Important caveats:**
- Cleanup is **non-deterministic** — when/if it runs depends on GC timing
- Cleanup is **optional** — engines may skip it (e.g., application shutdown, FinalizationRegistry itself unreachable)
- The callback receives `undefined` as its `this` binding
- If the WeakRef target is also registered, it's cleared at the same time or before any cleanup callback
- Cleanup exceptions are reported but don't stop other cleanups

### WeakMap and WeakSet

- Keys are held **weakly** — if no other reference to the key exists, the entry is garbage collected
- Only objects and symbols can be keys
- Enumeration is not possible (keys may be collected at any time)
- Ideal for **object-keyed caches** that should not prevent GC

```javascript
const weakMap = new WeakMap();
let obj = { id: 1 };
weakMap.set(obj, "metadata");

obj = null;
// Entry is automatically removed (eventually)
```

---

## 28. SharedArrayBuffer and Atomics

### SharedArrayBuffer

A `SharedArrayBuffer` allows **multiple Web Workers (agents) to share the same memory**:

```javascript
// Main thread
const sharedBuffer = new SharedArrayBuffer(16);
const int32Array = new Int32Array(sharedBuffer);

// Send to worker
worker.postMessage(sharedBuffer);

// Both threads can read/write the same memory
```

**How it works:**
- The underlying memory is **shared across agents** (threads)
- Each agent has its own heap, but the SharedArrayBuffer memory is visible to all
- Memory is **not** subject to structured cloning (unlike regular ArrayBuffer)
- Requires **COOP/COEP headers** in browsers for security (Spectre mitigation)

### Atomics

The `Atomics` namespace provides **atomic operations and synchronization primitives**:

#### Atomic Operations

| Method | Description |
|--------|-------------|
| `Atomics.add()` | Add a value (atomic read-modify-write) |
| `Atomics.sub()` | Subtract a value |
| `Atomics.and()` | Bitwise AND |
| `Atomics.or()` | Bitwise OR |
| `Atomics.xor()` | Bitwise XOR |
| `Atomics.load()` | Atomic read |
| `Atomics.store()` | Atomic write |
| `Atomics.exchange()` | Atomic swap |
| `Atomics.compareExchange()` | Compare-and-swap (CAS) |

#### Synchronization

| Method | Description | Blocking? |
|--------|-------------|-----------|
| `Atomics.wait()` | Block until notified or timed out | Yes (worker only) |
| `Atomics.waitAsync()` | Non-blocking wait, returns promise | No |
| `Atomics.notify()` | Wake up waiting threads | N/A |

**V8 implementation:**
- Atomics are implemented as **lock-free** on all supported architectures (ia32, x64, ARM32, ARM64)
- `Atomics.wait` uses `FutexEmulation` — V8's internal futex implementation
- `Atomics.wait` is **not allowed on the main thread** (throws `TypeError`)
- `Atomics.waitAsync` is non-blocking and works on the main thread
- All atomic operations are **sequentially consistent** (total ordering across all agents)

#### Mutex Example

```javascript
const LOCKED = 1;
const UNLOCKED = 0;

class AsyncLock {
  constructor(sharedBuffer) {
    this.i32a = new Int32Array(sharedBuffer);
  }

  lock() {
    while (true) {
      if (Atomics.compareExchange(this.i32a, 0, UNLOCKED, LOCKED) === UNLOCKED) {
        return; // Acquired
      }
      Atomics.wait(this.i32a, 0, LOCKED); // Block until notified
    }
  }

  unlock() {
    Atomics.store(this.i32a, 0, UNLOCKED);
    Atomics.notify(this.i32a, 0, 1);
  }
}
```

### Memory Model

- Atomic accesses are **sequentially consistent** (strict total ordering)
- Non-atomic accesses are **unordered** (no ordering guarantees)
- Programs should be **data race free**: avoid concurrent non-atomic operations on the same memory location
- If data races exist, they should only involve same-size accesses to avoid "tearing"

---

## 29. BigInt Internals

### What is BigInt?

BigInt provides **arbitrary-precision integers** in JavaScript, filling the gap where `Number` loses precision (beyond 2^53 - 1):

```javascript
const maxSafe = Number.MAX_SAFE_INTEGER; // 9007199254740991
const tooBig = 9007199254740993;
console.log(tooBig === 9007199254740992); // true (precision lost)

const big = 9007199254740993n; // BigInt
console.log(big === 9007199254740992n); // false (correct)
```

### V8 Internals

BigInt is represented as a **heap-allocated object** with an arbitrary number of digits:

```
BigInt object:
┌─────────────────┐
│  Map Pointer     │
├─────────────────┤
│  Bitfield:       │
│  - sign (1 bit)  │
│  - length (30b)  │
├─────────────────┤
│  Digit 0         │  ← Each digit is a platform word (32 or 64 bits)
│  Digit 1         │
│  ...             │
│  Digit N-1       │
└─────────────────┘
```

**Key characteristics:**
- Sign and length stored in a shared bitfield (sign = 1 bit, length = 30 bits)
- Maximum length: ~1 billion digits (limited by 30-bit length field)
- Digits are stored in base 2^32 (32-bit words)
- `BigInt64Array` and `BigUint64Array` for typed array access

### Performance Characteristics

| Operation | Complexity | Notes |
|-----------|-----------|-------|
| Creation from small int | O(1) | Single digit |
| Addition | O(n) | Where n = number of digits |
| Multiplication | O(n log n) | Karatsuba algorithm for large numbers |
| Division | O(n²) | Long division |
| Conversion to String | O(n²) | Digit-by-digit division by 10 |
| Conversion to Number | O(n) | If within safe range |

### Optimization Details

- **Small BigInts** (single digit): Faster comparisons and operations
- **Conversion to Number**: If BigInt fits in a Smi, returns a Smi directly
- **String conversion**: Fast path for single-digit base-10 BigInts (inlined, specialized)
- **Memory**: Pretenured in old space (long-lived by design)

### BigInt vs Number

| | Number | BigInt |
|--|--------|--------|
| **Precision** | 53-bit integer precision | Arbitrary precision |
| **Range** | ±1.8 × 10^308 | Unlimited |
| **Type** | Floating-point | Integer only |
| **Performance** | Very fast (hardware FP) | Slower (software arbitrary precision) |
| **Interoperability** | Works with everything | Cannot mix with Number |
| **`typeof`** | `"number"` | `"bigint"` |

---

## 30. Other JavaScript Engines

### SpiderMonkey (Firefox)

- Mozilla's engine, used in Firefox and Thunderbird
- Uses **Shapes** (equivalent to V8's Maps) for hidden classes
- Uses **NaN boxing** for number representation (stores all values as doubles, using NaN bit patterns for pointers)
- Has a **baseline interpreter** → **WarpMonkey** (optimizing compiler, replaced IonMonkey in 2020)
- Generational GC with **incremental marking** and **parallel sweeping**
- IC states similar to V8: uninitialized, monomorphic, polymorphic, megamorphic

### JavaScriptCore / JSC (Safari)

- Apple's engine, used in Safari and WebKit
- Uses **Structures** for hidden classes
- Multi-tiered: **LLInt** (interpreter) → **Baseline JIT** → **DFG** (Data Flow Graph) → **FTL** (Faster Than Light)
- FTL uses **B3 IR** (a SSA-based compiler backend)
- Uses **typed array profiling** and **exit flight data** for optimization
- Concurrent GC with **parallel marking** and **region-based memory management**

### ChakraCore (Legacy Edge)

- Microsoft's engine, used in legacy Edge (now Edge uses V8)
- Open-sourced as ChakraCore
- Used **Types** for hidden classes
- Had **Dynamic Profile-Guided Optimization (DPGO)**
- Bytecode interpreter → JIT compiler
- Now effectively retired in favor of V8

---

## Quick Reference: Key Performance Rules

1. **Keep object shapes consistent** — same properties in the same order
2. **Avoid megamorphic ICs** — keep property access sites to ≤4 different shapes
3. **Use packed arrays** — avoid holes, avoid mixing types
4. **Prefer `array.join()`** over `+=` in loops for string building
5. **Avoid deleting properties** — switches objects to dictionary mode
6. **Clean up event listeners, timers, observers** — prevent memory leaks
7. **Use WeakMap/WeakSet** for object-keyed caches
8. **Avoid retained detached DOM** — nullify references when elements are removed
9. **Keep functions small and monomorphic** — helps TurboFan inlining
10. **Initialize objects with all properties** — avoid dynamic property additions

---

## Glossary

| Term | Definition |
|------|-----------|
| **Smi** | Small integer stored directly in a pointer (no heap allocation) |
| **HeapNumber** | Number stored on the heap (for doubles, large ints, NaN) |
| **Map** | V8's hidden class; describes object shape |
| **Shape** | SpiderMonkey's name for hidden class |
| **Structure** | JSC's name for hidden class |
| **IC** | Inline Cache — caches property lookup results at each access site |
| **FeedbackVector** | Per-function array storing IC slot data |
| **Deoptimization** | Reverting from optimized code to interpreter when speculation fails |
| **OSR** | On-Stack Replacement — changing code while a function is executing |
| **ConsString** | Rope/tree data structure for lazy string concatenation |
| **SeqString** | Sequential (flat) string with direct character access |
| **Interned String** | Deduplicated string in the string table |
| **TIBS** | Thread-Local Allocation Buffers for fast parallel allocation |
| **Write Barrier** | Code that tracks pointer mutations for concurrent GC |
| **Semi-space** | Young generation's two halves for copying GC |
| **Orinoco** | V8's overall garbage collection project name |
| **Turboshaft** | V8's new CFG-based compiler backend replacing Sea of Nodes |
| **Maglev** | V8's mid-tier optimizing compiler |
| **Sparkplug** | V8's baseline JIT compiler |
| **Ignition** | V8's bytecode interpreter |
| **TDZ** | Temporal Dead Zone — the period before `let`/`const` initialization |
| **Elements Kind** | V8's classification of array element types |
| **WeakRef** | Weak reference that doesn't prevent GC |
| **FinalizationRegistry** | GC callback registration for cleanup |
| **SAB** | SharedArrayBuffer — cross-thread shared memory |
| **Smis** | V8's small integer representation in pointers |
| **Cons String** | Binary tree of string fragments (rope) |
| **DescriptorArray** | Metadata array storing property names, offsets, and attributes for a Map |
| **Transition Array** | Array of edges from one Map to another when properties are added |

---

*Research compiled from V8 official documentation, ECMAScript specification, MDN Web Docs, and engine source code (2024-2026).*
