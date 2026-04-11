# JavaScript Full Course - Module Index

## Complete Course Based on SuperSimpleDev Video

**Video:** [JavaScript Tutorial Full Course - Beginner to Pro](https://youtu.be/EerdGm-ehJQ)  
**Total Duration:** 22+ hours  
**Modules:** 20 sections

---

## Course Structure

### Module 1: JavaScript Basics
**Duration:** 12 min | **Time:** 02:01
- Introduction to JavaScript
- Setup and environment
- Basic syntax and statements
- [View Module](modules/01-javascript-basics/README.md)

### Module 2: Numbers and Math
**Duration:** 29 min | **Time:** 14:48
- Math operations
- Order of operations (PEMDAS)
- Working with decimals
- Rounding numbers
- [View Module](modules/02-numbers-and-math/README.md)

### Module 3: Strings
**Duration:** 24 min | **Time:** 43:26
- String syntax and methods
- Template literals
- String concatenation
- Escape characters
- [View Module](modules/03-strings/README.md)

### Module 4: HTML CSS Review & console.log
**Duration:** 44 min | **Time:** 01:07:32
- VS Code setup
- HTML structure and elements
- CSS basics
- Using console.log for debugging
- [View Module](modules/04-html-css-review/README.md)

### Module 5: Variables
**Duration:** 42 min | **Time:** 01:51:06
- let, const, var
- Variable naming conventions
- Scope and hoisting
- Reassigning variables
- [View Module](modules/05-variables/README.md)

### Module 6: Booleans and If-Statements
**Duration:** 62 min | **Time:** 02:32:55
- Boolean values
- Comparison operators
- If/else statements
- Logical operators
- Truthy and falsy values
- [View Module](modules/06-booleans-if-statements/README.md)

### Module 7: Functions
**Duration:** 42 min | **Time:** 03:34:12
- Function declaration and invocation
- Parameters and arguments
- Return statements
- Scope
- [View Module](modules/07-functions/README.md)

### Module 8: Objects
**Duration:** 70 min | **Time:** 04:15:45
- Object literals
- Properties and methods
- JSON and localStorage
- Destructuring
- [View Module](modules/08-objects/README.md)

### Module 9: Document Object Model (DOM)
**Duration:** 83 min | **Time:** 05:25:46
- Selecting elements
- Modifying elements
- Event handling
- Creating elements
- [View Module](modules/09-dom/README.md)

### Module 10: HTML, CSS, and JavaScript Together
**Duration:** 45 min | **Time:** 06:49:08
- Integrating CSS with JavaScript
- classList property
- Dynamic styling
- File organization
- [View Module](modules/11-html-css-js-together/README.md)

### Module 11: Arrays and Loops
**Duration:** 159 min | **Time:** 09:28:26
- Array methods (push, pop, splice)
- for loops, while loops
- forEach, map, filter, reduce
- Accumulator pattern
- [View Module](modules/10-arrays-loops/README.md)

### Module 12: Advanced Functions
**Duration:** 42 min | **Time:** 09:28:26
- Functions as values
- Anonymous functions
- Arrow functions
- forEach and array methods
- Closures
- [View Module](modules/11-advanced-functions/README.md)

### Module 13: Advanced Functions (Part 2)
**Duration:** 49 min | **Time:** 10:10:22
- More closures
- Function composition
- Advanced patterns
- [View Module](modules/12-advanced-functions-pt2/README.md)

### Module 14: Amazon Project and Intro to Git
**Duration:** 89 min | **Time:** 10:58:57
- Full e-commerce application
- Git version control
- Project structure
- [View Module](modules/13-amazon-project/README.md)

### Module 15: Modules
**Duration:** 88 min | **Time:** 12:28:00
- ES6 import/export
- Module organization
- Entry points
- [View Module](modules/14-modules/README.md)

### Module 16: External Libraries
**Duration:** 93 min | **Time:** 13:56:33
- CDN and npm
- Lodash, Day.js, Axios
- Library integration
- [View Module](modules/15-external-libraries/README.md)

### Module 17: Testing
**Duration:** 60 min | **Time:** (after External Libraries)
- Jasmine testing framework
- Unit tests
- Integration tests
- Mocks and spies
- [View Module](modules/17-testing/README.md)

### Module 18: Object-Oriented Programming
**Duration:** 202 min | **Time:** 15:29:41
- Classes and constructors
- Methods and properties
- Static methods
- Private fields
- [View Module](modules/16-oop/README.md)

### Module 19: Inheritance
**Duration:** 41 min | **Time:** 18:51:50
- extends keyword
- super keyword
- Prototype chain
- Mixins
- [View Module](modules/17-inheritance/README.md)

### Module 20: Backend, Callbacks, Async/Await
**Duration:** 58 min | **Time:** 19:32:59
- HTTP and URLs
- Promises
- fetch API
- async/await
- Error handling
- [View Module](modules/18-backend-async/README.md)

---

## Quick Reference

### Variable Types
```javascript
let variable = 'can be reassigned';
const constant = 'cannot be reassigned';
var legacy = 'avoid using';
```

### Data Types
```javascript
let string = 'text';
let number = 42;
let boolean = true;
let array = [1, 2, 3];
let object = { key: 'value' };
let nullValue = null;
let undefinedValue = undefined;
```

### Common Array Methods
```javascript
array.map(fn)     // Transform elements
array.filter(fn)  // Filter elements
array.reduce(fn)  // Reduce to single value
array.forEach(fn) // Loop through elements
array.find(fn)    // Find first match
array.includes(x) // Check membership
array.push(x)     // Add to end
array.pop()       // Remove from end
```

### DOM Selection
```javascript
document.getElementById('id')
document.querySelector('.class')
document.querySelectorAll('tag')
element.textContent
element.innerHTML
element.classList.add('class')
element.addEventListener('click', fn)
```

### Async Patterns
```javascript
// Promise
fetch(url).then(r => r.json())

// Async/Await
async function load() {
  const data = await fetch(url);
  return data.json();
}
```

### OOP Syntax
```javascript
class MyClass {
  constructor(param) {
    this.param = param;
  }
  
  method() {
    return this.param;
  }
}

class Child extends Parent {
  constructor(param) {
    super(param);
  }
}
```

---

## Projects

| Project | Description | Difficulty | Location |
|---------|-------------|------------|----------|
| Cart Quantity | Basic arithmetic | Beginner | Module 5 |
| Rock Paper Scissors | Game logic with DOM | Beginner | Module 6 |
| Shipping Calculator | DOM events | Beginner | Module 9 |
| Styled Buttons | CSS integration | Beginner | Module 10 |
| To-Do List | Arrays and DOM | Intermediate | Module 11 |
| Calculator | Advanced functions | Intermediate | Module 12 |
| Amazon Clone | Full e-commerce app | Advanced | Module 14 |

---

## Directory Structure

```
modules/
├── 01-javascript-basics/
├── 02-numbers-and-math/
├── 03-strings/
├── 04-html-css-review/
├── 05-variables/
├── 06-booleans-if-statements/
├── 07-functions/
├── 08-objects/
├── 09-dom/
├── 10-arrays-loops/
├── 11-advanced-functions/
├── 11-html-css-js-together/
├── 12-advanced-functions-pt2/
├── 13-amazon-project/
├── 14-modules/
├── 15-external-libraries/
├── 16-oop/
├── 17-inheritance/
├── 17-testing/
└── 18-backend-async/
```

---

## Next Steps After Course

1. **Practice:** Build more projects
2. **React:** Learn React framework
3. **Node.js:** Backend development
4. **TypeScript:** Type-safe JavaScript
5. **Contribute:** Open source projects

---

**Course Source:** Based on [SuperSimpleDev JavaScript Course](https://courses.supersimple.dev/courses/javascript)
