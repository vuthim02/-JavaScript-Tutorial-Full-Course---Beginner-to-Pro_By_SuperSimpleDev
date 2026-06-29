# SuperSimpleDev Style Guide

Based on the [JavaScript Tutorial Full Course - Beginner to Pro](https://youtu.be/EerdGm-ehJQ) by Simon Bao.

---

## 1. HTML Structure

- **Single-file lessons** — early lessons keep HTML, CSS, and JS all in one `.html` file
- **Later lessons** split into separate files: `.html` in root, `.js` in `scripts/`, `.css` in `styles/`
- **Minimal boilerplate** — no frameworks, no build tools, just raw HTML
- **`<title>`** always matches the lesson name (e.g. `<title>Todo List</title>`)

## 2. HTML Pattern

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Lesson Name</title>
    <style>/* inline CSS for early lessons */</style>
  </head>
  <body>
    <!-- Interactive controls -->
    <button onclick="functionName();">Click</button>

    <!-- Display area with js- prefix for JS hooks -->
    <p class="js-result"></p>

    <script>
      // JavaScript code
    </script>
  </body>
</html>
```

### Class naming convention

- **`js-*`** — classes used ONLY by JavaScript (e.g. `js-result`, `js-button`, `js-name-input`)
- **Descriptive** — normal classes for CSS styling (e.g. `move-button`, `add-todo-button`, `delete-todo-button`)

### Event binding evolution

| Lesson | Style |
|--------|-------|
| 1-11 | `onclick="..."` inline in HTML |
| 12+ | `addEventListener` in JS file (`document.querySelector('.js-button').addEventListener('click', () => {...})`) |

## 3. CSS Style

### Dark theme (Rock Paper Scissors project)

```css
body {
  font-family: Arial, sans-serif;
  background-color: rgb(25, 25, 25);
  color: white;
}
```

### Button patterns

| Button | CSS |
|--------|-----|
| Move (RPS) | `background-color: transparent; border: 3px solid white; border-radius: 60px;` |
| Subscribe | `background-color: rgb(200, 0, 0); color: white; border: none; border-radius: 2px;` |
| Subscribed | `background-color: rgb(240, 240, 240); color: black;` (via `.is-subscribed` class) |
| Toggle | Toggle `.is-toggled` class (black bg, white text when active) |
| Add | Green-ish button with specific padding |
| Delete | Red-ish button |

### Layout

- Uses CSS Grid for structured layouts (`.todo-input-grid`, `.todo-grid`)
- Uses `<style>` tags inline in early lessons, moves to `styles/*.css` in later lessons

## 4. JavaScript Teaching Approach

### Console-first

- Every concept is first demonstrated with `console.log()`
- Students open DevTools to see results
- No complex setup — just open the HTML file in a browser

### Comment-out old code

```javascript
/*
const oldCode = 'commented out';
console.log('New code runs');
*/
```

Old versions of code are commented out, not deleted. This shows progression.

### Progressive enhancement

Same project across multiple lessons (Rock Paper Scissors spans lessons 6, 7, 8, 9, 10, 12):

| Lesson | What's added |
|--------|-------------|
| 6 | Basic RPS with inline JS, console output |
| 7 | Functions for game logic |
| 8 | Object to store score |
| 9 | DOM updates instead of console |
| 10 | CSS styling, localStorage |
| 12 | Auto-play, keyboard shortcuts, event listeners |

### Variable naming

- **Descriptive camelCase**: `playerMove`, `computerMove`, `todoList`, `updateScoreElement`
- **`js-*` classes** for JS hooks (separates styling from behavior)
- Uses `let` and `const` (modern JS, no `var` except when explaining)

### Code patterns taught

```
1. Basic syntax (alert, console.log, document.body.innerHTML)
2. Math + order of operations
3. Strings, template literals (backticks with ${})
4. HTML/CSS review + inline onclick
5. Variables (let vs const)
6. Booleans, if/else, truthy/falsy, ternary, &&/||
7. Functions (parameters, return, default params)
8. Objects (dot/bracket notation, nesting, references, destructuring, shorthand)
9. DOM (querySelector, innerHTML, classList, style)
10. Full integration (HTML + CSS + JS, localStorage)
11. Arrays (push/pop, for loop, forEach)
12. Advanced functions (arrow functions, setTimeout/setInterval, closures, filter/map, event listeners)
```

### The "Delete" button evolution

- **Lesson 11**: `onclick="todoList.splice(${i}, 1); renderTodoList();"` (inline, uses `onclick`)
- **Lesson 12**: `addEventListener('click', () => {...})` (separated JS, no inline)

### localStorage for persistence

```javascript
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0, losses: 0, ties: 0
};
localStorage.setItem('score', JSON.stringify(score));
```

## 5. Terminalogy & Naming

- Uses clear, everyday language in variable names
- No abbreviations unless universal (`btn`, `el` not used — uses `buttonElement`)
- Function names describe what they do: `playGame()`, `pickComputerMove()`, `updateScoreElement()`, `renderTodoList()`
- Comments explain WHY, not WHAT

## 6. Key Takeaways

| Principle | Description |
|-----------|-------------|
| **Do it first** | Show by doing, not by slides |
| **Console first** | `console.log` every new concept before DOM |
| **Build up** | Same project grows across lessons |
| **Comment, don't delete** | Keep old code visible as comments |
| **Minimal abstraction** | No frameworks, no classes until Lesson 17 |
| **Interactive** | Every lesson has clickable/interactive elements |
| **One thing at a time** | Introduce exactly one new concept per lesson |
