# 03 — Ignition Interpreter & Bytecode

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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

V8 bytecode is **register-based**: it uses virtual registers (r0, r1, ...) and an accumulator register for intermediate results. Each instruction is a single byte followed by operands.

## Why Bytecode?

| Reason | Explanation |
|--------|-------------|
| **Fast startup** | Bytecode generates quickly, execution starts immediately |
| **Compact** | Bytecode is smaller than machine code, saves memory |
| **Portable** | Same bytecode works across CPU architectures |

## Execution Speed Hierarchy

```
Fastest:  Machine Code (compiled by TurboFan)
Medium:   Bytecode (interpreted by Ignition)
Slowest:  AST walking (naive interpreter)
```

## Common V8 Bytecode Instructions

| Instruction | Meaning |
|-------------|---------|
| `LdaSmi N` | Load small integer N into accumulator |
| `Star rN` | Store accumulator to register rN |
| `Ldar rN` | Load register rN into accumulator |
| `Add rN` | Add register rN to accumulator |
| `Sub rN` | Subtract register rN from accumulator |
| `Mov rD, rS` | Move value from register rS to rD |
| `Call rN, argc` | Call function at register rN with argc arguments |
| `Return` | Return accumulator value |

## How Ignition Works

1. The AST is traversed.
2. Each AST node emits one or more bytecode instructions.
3. Bytecode is executed by a **bytecode handler** (a block of machine code per instruction).
4. Results flow through the accumulator and virtual registers.

## Bytecode Walkthrough: Function Call

Consider `function add(a, b) { return a + b; }` called as `add(3, 4)`:

```
// Prologue
Ldar a1            // Load argument a into accumulator
Star r0            // Store to r0
Ldar a2            // Load argument b into accumulator
Add r0             // Add r0 to accumulator (a + b)
Return             // Return the result
```

Ignition's bytecode handlers are generated at build time from a bytecode definition table. Each handler is a small block of machine code that implements one instruction.

## Bytecode Execution Performance

| Instruction | CPU Cost | Notes |
|-------------|----------|-------|
| `LdaSmi` | ~1-2 cycles | Loads a tagged small integer |
| `Star` | ~1 cycle | Register-to-register move |
| `Add` | ~2-5 cycles | Integer addition with overflow check |
| `Ldar` | ~1 cycle | Register to accumulator load |
| `Call` | ~10-50 cycles | Function call overhead (before JIT) |
| `Return` | ~1-2 cycles | Return from function |

## How Ignition Handles Types

Ignition doesn't optimize for types — it handles all types generically. For `a + b`, it checks:
1. Are both operands numbers? Use fast numeric add.
2. Are both operands strings? Concatenate.
3. Otherwise: call `ToString` on both, then concatenate.

This generic handling is why JIT compilation provides such large speedups for type-stable code.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is code interpreted or compiled first? | Interpreted first (bytecode) |
| Why not compile directly to machine code? | Slower startup, more memory |
| What converts AST to bytecode? | Ignition interpreter (V8) |
| What are V8 bytecodes like? | Register-based instructions (Ldar, Star, Add, etc.) |
| What is the accumulator? | A special register holding intermediate results |
| Does Ignition optimize for types? | No, it handles all types generically |
## Next Steps

[Back to Chapter 2](02-parser-ast.md): 02 — Parser & Abstract Syntax Tree (AST)
[Proceed to Chapter 4](04-jit-compiler.md): 04 — TurboFan JIT Compiler to learn about 04 — turbofan jit compiler.
