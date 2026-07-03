# 07 — Module Scope

## Variables Are Private to File

File A:
```javascript
let secret = 100;
```

File B: Cannot access `secret` directly.

## What's Private vs Public

```javascript
// math.js

// Private (not exported)
const internalValue = 42;
function helper() { return internalValue * 2; }

// Public (exported)
export function add(a, b) { return a + b; }
export const PI = 3.14159;
```

## Advantage: No Global Pollution

Before modules:

```javascript
// Every script could access window variables
window.count = 0; // Anyone can modify

// Unclear who defined what
// "Where does this variable come from?"
```

With modules:

```javascript
// counter.js
let count = 0;
export function getCount() { return count; }
export function increment() { count++; }

// main.js
import { getCount, increment } from "./counter.js";
// count is not accessible here directly
// Only through exported functions
```

## Module-Level Code Runs Once

```javascript
// config.js
console.log("Config module loaded"); // Runs once
export const API_URL = "https://api.example.com";

// main.js
import { API_URL } from "./config.js"; // "Config module loaded"
import { API_URL } from "./config.js"; // Not loaded again (cached)
```

Modules are cached after first import.

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this variable accessible outside the module? | If it's not exported, no. |
| How can I access a private variable? | Only through exported functions that close over it. |
| Is the module executed once or every import? | Once. The result is cached. |
| Can modules have side effects? | Yes. Code at the module top-level runs on import (e.g., `console.log`, setting up global state). |
## Next Steps

[Back to Chapter 6](06-barrel-files.md): 06 — Barrel Files (Export All)
[Proceed to Chapter 8](08-commonjs.md): 08 — CommonJS to learn about 08 — commonjs.
