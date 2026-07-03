# Reverse Engineering Tactical Training

## The Core Habit

Reverse engineering is a **skill**, not just a technique. Train yourself to ask the right questions automatically.

Every time you encounter code — yours, someone else's, or from a library — apply this systematic process.

---

## Level 1 — Code Comprehension Questions

| Question | What It Uncovers |
|---|---|
| What problem does this code solve? | The **purpose** — why was it written? |
| Why is this specific line needed? | Would the code work without it? |
| What if I remove it? | Tests the **necessity** of each line |
| Can I write it another way? | Deepens understanding of **alternatives** |
| Which value changes? | Identifies **mutable state** |
| Which value stays constant? | Identifies **constants** and configuration |
| Where is the data stored? | Variable, parameter, property, or global? |
| How does memory change during execution? | Stack and heap allocation |

---

## Level 2 — Engine Perspective Questions

Think like the JavaScript engine:

| Question | What It Uncovers |
|---|---|
| What happens inside the JavaScript engine? | Parsing, compilation, execution, optimization |
| When is this line executed? | During parsing? Interpretation? Compilation? |
| How many times is this code path executed? | Hot vs cold paths |
| What does the AST look like? | The tree structure of the syntax |
| What bytecode does this produce? | Lower-level representation |

---

## Level 3 — Mastery Questions

The deepest level of understanding:

| Question | What It Uncovers |
|---|---|
| Can I rebuild this without looking? | Tests true recall and understanding |
| Can I explain this to a complete beginner? | Tests clarity of understanding |
| Can I teach this concept? | Teaching reveals gaps in knowledge |
| What would happen in a different runtime? | Browser vs Node.js vs Deno vs Bun |
| How would I write this differently? | Personal style and deeper mastery |

---

## The Practical Exercise Template

**Example code:**
```javascript
let result = (5 + 3) * 2;
```

| Question | Answer |
|---|---|
| What problem does this solve? | Computes (5 + 3) × 2 = 16 |
| Why is this line needed? | To store the computed result in a variable |
| What if I remove `let`? | `result` becomes a global (non-strict mode) or throws ReferenceError (strict mode) |
| Can I write it another way? | `let result = 16;` (hardcoded) |
| Which value changes? | `result` |
| Which values stay constant? | `5`, `3`, `2` |
| Where is the data stored? | In the variable `result` on the stack |
| Does the CPU understand this? | No — the JS engine compiles it to machine code |

---

## The Reverse Engineering Workflow

When you encounter unfamiliar code:

```
Step 1: READ the code carefully
               ↓
Step 2: IDENTIFY the purpose
        (What is this trying to do?)
               ↓
Step 3: TRACE the data flow
        (Where does each value come from? Where does it go?)
               ↓
Step 4: MODIFY one line at a time
        (What breaks? What changes? What stays the same?)
               ↓
Step 5: REWRITE from memory
        (Close the original. Write it yourself. Compare.)
               ↓
Step 6: TEACH or EXPLAIN it
        (Write an explanation as if talking to a beginner.)
```

---

## The "5 Whys" Technique

For any line of code, ask "Why?" five times to drill down to the root.

**Example: `let age = currentYear - birthYear;`**

1. **Why is age computed this way?** → Age is the difference between years.
2. **Why use subtraction?** → Time is linear; age increases by one each year.
3. **Why not account for month and day?** → This is a simplified calculation.
4. **Why simplify?** → The requirements didn't need month-level precision.
5. **Why was year-only precision acceptable?** → The app shows approximate age.

This reveals assumptions and design decisions you wouldn't notice just by reading.

---

## Pattern Recognition Cheat Sheet

```javascript
// Default value
const name = input || "default";

// Guard clause
isLoggedIn && showDashboard();

// Type check
typeof value === "string"

// Null check
if (value != null) { ... }  // catches both null and undefined

// Convert to number safely
const num = Number(userInput);
if (Number.isNaN(num)) {
    console.log("Invalid number");
}

// Boolean coercion
if (Boolean(value)) { ... }
```

---

## What You've Mastered

- What JavaScript is and where it runs
- How engines parse, interpret, and compile your code
- All 7 primitive types
- Variables: `let`, `const`, `var`, hoisting, TDZ
- All operators: arithmetic, comparison, logical, assignment
- Type conversion: implicit and explicit
- Input and output methods
- 6 beginner projects
- Reverse engineering techniques: 3-level framework, 5 Whys, and the RE workflow
## Next Steps

[Back to Chapter 13](13-beginner-projects.md): Beginner Projects
[Proceed to Chapter 15](15-comments.md): Comments in JavaScript to learn about comments in javascript.
