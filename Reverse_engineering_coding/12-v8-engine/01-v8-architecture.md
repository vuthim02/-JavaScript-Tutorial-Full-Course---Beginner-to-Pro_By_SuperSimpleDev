# 01 — V8 Architecture Overview

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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
     ↓
Machine Code
     ↓
CPU
```

The details differ between engines but the conceptual flow is the same.

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
6. If assumptions change, the code **deoptimizes** back to bytecode.

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

## The Optimization Funnel

Not all code gets optimized. The engine optimizes only the **hot paths**:

```
All executed code
  └── Interpreted (100%)
       └── Profiled (hot)
            └── JIT compiled (optimized)
                 └── May deoptimize → back to interpreter
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What engine runs Node.js? | V8 |
| What is the first step after source code? | Parsing |
| What converts AST to bytecode? | Ignition (V8's interpreter) |
| What compiles hot code? | TurboFan (V8's JIT compiler) |
| Why not compile directly? | Slower startup, more memory |
| What engines exist? | V8 (Chrome/Node), SpiderMonkey (Firefox), JavaScriptCore (Safari) |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-parser-ast.md): 02 — Parser & Abstract Syntax Tree (AST) to learn about 02 — parser & abstract syntax tree (ast).
