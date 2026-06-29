# JavaScript Engines

## What Is a JavaScript Engine?
<img
  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXhxdG42dWNjOXFqYmw1OWM3Njh3bWttZmpmbDI1enMwMnhnN3poayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Npdl9kOaKFJHuRCBGx/giphy.webp" alt="Animated GIF" style="width:400px; height:300px;">

Your computer's CPU can only understand **machine code** — raw binary instructions (0s and 1s). It has no idea what `let x = 10` means.

A **JavaScript engine** is a translator. It reads your JavaScript code and converts it into machine code that the CPU can execute.

Think of it like this: you write a recipe in English, but the chef only speaks French. The engine translates from English to French.

---

## The Major JavaScript Engines

| Engine | Created By | Where It's Used |
|---|---|---|
| **V8** | Google | Chrome, Node.js, Deno, Electron |
| **SpiderMonkey** | Mozilla | Firefox |
| **JavaScriptCore** | Apple | Safari, Bun |
| **Chakra** | Microsoft | Legacy Edge (before Chromium) |

> When you run JavaScript in Chrome, Node.js, or even VS Code's terminal — you're using Google's V8 engine every time.

---

## Execution Pipeline

Here's the journey your code takes:

```
Your JavaScript Code (human-readable text)
             ↓
         [ Parser ]
             ↓
  AST — Abstract Syntax Tree (a tree structure)
             ↓
    [ Interpreter — "Ignition" in V8 ]
             ↓
         Bytecode (intermediate)
             ↓
    [ Compiler — "TurboFan" in V8 ]
             ↓
       Optimized Machine Code
             ↓
            CPU
             ↓
         Result! ✅
```

---

### Step 1 — The Parser

The parser reads your code **character by character**. It checks for valid syntax. If you forget a closing `)` or `}`, it catches it here.

The parser converts your text code into an **AST** (Abstract Syntax Tree).

> **This is where SyntaxErrors happen.** If your code has a typo or missing bracket, the engine throws a `SyntaxError` and never runs your code.

---

### Step 2 — The AST (Abstract Syntax Tree)

The AST is a **tree diagram** of your code's structure.

```javascript
let x = 10;
```

Becomes:

```
VariableDeclaration (let)
    └── VariableDeclarator
            ├── Identifier: "x"
            └── NumericLiteral: 10
```

Every part of your code becomes a **node** in the tree.

---

### Step 3 — The Interpreter (Ignition)

The interpreter walks through the AST and starts **executing your code immediately**. It produces **bytecode** — a lower-level format between source code and machine code.

---

### Step 4 — The Compiler (TurboFan)

The engine tracks which code runs **over and over again** (called "hot paths"). For those hot paths, the compiler kicks in and converts them into highly **optimized machine code**.

This is called **JIT — Just-In-Time compilation** (compiling during execution, not before).

**Deoptimization:** If the compiler assumed a variable is always a number, but it suddenly becomes a string, the engine throws away the optimized code and falls back to the interpreter.

---

### Step 5 — Machine Code

Pure binary instructions (0s and 1s) that the CPU understands directly.

---

### Step 6 — The CPU

Executes the machine code — performs arithmetic, moves data in memory, and controls program flow.

---

## Reverse Engineering Questions for the Engine

| Question | Answer |
|---|---|
| Who actually reads my JavaScript code? | The JavaScript engine (V8, SpiderMonkey, etc.) |
| Does the CPU understand JavaScript directly? | No — CPUs only understand machine code |
| What must happen before my code runs? | Parsing — converting source text into an AST |
| What does the parser produce? | An Abstract Syntax Tree (AST) |
| What actually executes at the lowest level? | The CPU executes machine code |
| What if my code has a syntax error? | Parsing fails, a SyntaxError is thrown |
| Why have both interpreter AND compiler? | Interpreter starts fast; compiler optimizes hot paths |
| What does "JIT" mean? | Just-In-Time — compiling during execution |
| What happens when I change a variable's type? | The engine may deoptimize |
## Next Steps

[Back to Chapter 1](01-what-is-javascript.md): What Is JavaScript?
[Proceed to Chapter 3](03-values-primitives.md): Values and Primitives to learn about values and primitives.
