# 02 — Parser & Abstract Syntax Tree (AST)

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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

V8 uses a **two-pass parser** to balance startup speed with compilation completeness:

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
| How does engine understand text? | Tokenization then parsing |
| What structure represents code? | Abstract Syntax Tree (AST) |
| Which functions parse eagerly? | Top-level code and IIFEs |
| Which functions parse lazily? | Functions defined but not yet invoked |
| What happens on syntax error? | Parser throws, no execution |
| Which node represents `a + b`? | `BinaryExpression` |
| Which child nodes does `BinaryExpression` have? | `left`, `right`, `operator` |
| Can tools transform code without running it? | Yes, via AST manipulation |
| How does ESLint detect unused variables? | Analyzes `VariableDeclarator` nodes and reference counts |
## Next Steps

[Back to Chapter 1](01-v8-architecture.md): 01 — V8 Architecture Overview
[Proceed to Chapter 3](03-interpreter-bytecode.md): 03 — Ignition Interpreter & Bytecode to learn about 03 — ignition interpreter & bytecode.
