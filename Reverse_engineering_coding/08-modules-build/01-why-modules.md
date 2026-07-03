# 01 — Why Modules Exist

## The Problem of Global Scope

```javascript
function add() {}
function subtract() {}
function multiply() {}
function divide() {}
```

Now imagine 10,000 functions. Putting everything inside one file becomes impossible.

## Problems with Global Scripts

| Problem | Example |
|---------|---------|
| Name collisions | Two libraries define `function $()` |
| Implicit dependencies | Must load `jquery.js` before `plugin.js` |
| No encapsulation | Any script can modify any variable |
| Order sensitivity | Script tags must be in exact order |
| Hard to debug | "Who defined this variable?" |
| No tree shaking | Everything loads even if unused |

## How Modules Solve These

| Solution | Mechanism |
|----------|-----------|
| Organization | Each file is a module with a clear purpose |
| Reuse | Import any module from any file |
| Encapsulation | Variables are private unless exported |
| Maintainability | Change one module without affecting others |
| Explicit dependencies | `import` makes dependencies clear |
| Tree shaking | Bundler removes unused exports |

## Module Timeline

```
1995: No modules (everything global)
2009: CommonJS (Node.js, require())
2011: AMD (RequireJS, browser)
2013: UMD (Universal, works everywhere)
2015: ES Modules (ES6, official standard)
2018: ES Modules in Node.js (stable)
2020: Dynamic import widely supported
Present: ES Modules is the standard
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why separate this code? | To organize by concern, enable reuse, and encapsulate logic. |
| Which parts belong together? | Functions that operate on the same data or serve the same feature. |
| Which functions should be reusable? | Utility functions (format, validate, calculate) shared across features. |
| How to detect if a project uses modules? | Look for `import`/`export` statements or `require()` calls. |
| What happens without modules? | Global scope pollution, name collisions, fragile script ordering. |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-es-modules.md): 02 — ES Modules to learn about 02 — es modules.
