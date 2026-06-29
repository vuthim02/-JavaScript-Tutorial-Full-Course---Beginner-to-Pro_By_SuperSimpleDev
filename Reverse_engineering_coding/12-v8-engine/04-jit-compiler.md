# 04 — TurboFan JIT Compiler

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What is JIT?

**JIT** = **Just-In-Time Compilation**. The engine compiles code during execution, not ahead of time. This allows the compiler to use **runtime type information** to generate highly optimized machine code.

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
Hot function detected (>threshold, typically ~10,000)
       ↓
TurboFan compiles to optimized machine code
       ↓
Machine code replaces interpreted version
       ↓
Even faster execution
```

## What TurboFan Assumes

TurboFan makes aggressive assumptions to generate fast code:

| Assumption | Example |
|------------|---------|
| Parameter types are stable | `a + b` always receives numbers |
| Object shapes are consistent | `user.name` always has same hidden class |
| Prototype chains don't change | `Array.prototype` is not mutated |
| Functions are not redefined | `console.log` is the native one |

## Performance Impact

| Operation | Interpreted | JIT Compiled |
|-----------|-------------|--------------|
| `a + b` | ~10-50 ns | ~1-3 ns |
| Property access | ~50-100 ns | ~2-5 ns |
| Function call | ~20-100 ns | ~2-10 ns |

## JIT Compilation Tiers

V8 uses a multi-tier compilation strategy:

```
Ignition (interpreter)
    → fastest startup, slowest execution
    ↓ (when hot)
TurboFan (optimizing compiler)
    → slower compilation, fastest execution
```

Older V8 also had **Crankshaft** (a middle-tier JIT), but it was removed. Modern V8 goes directly from Ignition to TurboFan.

## What TurboFan's Machine Code Looks Like (Conceptual)

For `function sum(a, b) { return a + b; }` with both args as integers:

```asm
; x86-64 conceptual output (simplified)
sum:
  cmp qword [rdi], r8     ; Check hidden class? (if this is a method)
  jne deopt_label          ; If assumption fails, bail out
  mov rax, [rsi]           ; Load 'a'
  mov rbx, [rdx]           ; Load 'b'
  add rax, rbx             ; Integer add
  jo deopt_label           ; Overflow check — deopt if overflow
  ret
deopt_label:
  jmp interpreter_entry    ; Fall back to Ignition
```

The compiled code is essentially a fast path with guard checks that fall back to the interpreter when assumptions break.

## How TurboFan Uses IC Feedback

When TurboFan compiles a function, it reads the **Inline Cache** (IC) feedback recorded by Ignition:

1. Ignition records which hidden classes were seen at each property access.
2. TurboFan reads this data and emits type-specific code.
3. If the IC shows monomorphic access, TurboFan emits a single-guard fast path.
4. If polymorphic (2-4 shapes), it emits a multi-guard chain.
5. If megamorphic (5+), it emits a generic dictionary lookup (no JIT speedup).

## What Prevents JIT Optimization

| Factor | Impact |
|--------|--------|
| Function too large | Won't be inlined or optimized |
| `try/catch` in hot path | Deopts; V8 avoids optimizing |
| `eval()` or `arguments` | Disables most optimizations |
| Unstable types | Causes repeated deoptimization |
| Megamorphic property access | IC falls back to dictionary lookup |

## Optimizing for TurboFan

```javascript
// Write code that helps the JIT
const TYPE = 'type';                // Constant property keys
function process(obj) {
    return obj[TYPE];               // Static key → monomorphic IC
}

function add(a, b) {
    return Number(a) + Number(b);   // Forced type stability
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which functions execute most? | Hot candidates for JIT |
| Can optimization occur? | Yes, if code is stable and hot |
| What triggers compilation? | Execution count threshold (~10,000) |
| What is TurboFan? | V8's optimizing JIT compiler |
| What was Crankshaft? | Older V8 JIT compiler (replaced by TurboFan) |
| What determines optimization quality? | Stability of types and object shapes |
| Does JIT use IC feedback? | Yes, to emit type-specific fast paths |
## Next Steps

[Back to Chapter 3](03-interpreter-bytecode.md): 03 — Ignition Interpreter & Bytecode
[Proceed to Chapter 5](05-stack-heap-memory.md): 05 — Stack & Heap Memory to learn about 05 — stack & heap memory.
