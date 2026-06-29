# Higher-Order Functions

<img src="https://media.giphy.com/media/3oEjI9xj49ehuAGLQY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Definition

A **higher-order function** either:
- Takes one or more **functions as arguments**, or
- **Returns a function** as its result (or both)

```javascript
// Takes a function → higher-order
function apply(fn, value) {
    return fn(value);
}

// Returns a function → higher-order
function multiplierOf(factor) {
    return x => x * factor;
}

const double = multiplierOf(2);
const triple = multiplierOf(3);

apply(double, 5); // 10
apply(triple, 5); // 15
```

## Built-in Higher-Order Functions

```javascript
// Every array method that takes a callback is higher-order
[1,2,3].map(n    => n * 2);           // [2, 4, 6]
[1,2,3].filter(n => n > 1);           // [2, 3]
[1,2,3].reduce((a, b) => a + b, 0);   // 6
[1,2,3].find(n   => n === 2);         // 2
[1,2,3].every(n  => n > 0);           // true
[1,2,3].some(n   => n > 2);           // true
[1,2,3].flatMap(n => [n, n * 2]);     // [1,2,2,4,3,6]
[1,2,3].sort((a, b) => b - a);        // [3,2,1]
```

## Function Composition (HOF Pattern)

```javascript
const compose = (f, g) => x => f(g(x));

const add1   = x => x + 1;
const double = x => x * 2;

const add1ThenDouble = compose(double, add1); // double(add1(x))
add1ThenDouble(3); // double(4) = 8
```

## Partial Application (HOF Pattern)

```javascript
function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

function greet(greeting, punctuation, name) {
    return `${greeting}, ${name}${punctuation}`;
}

const sayHello = partial(greet, "Hello", "!");
sayHello("Alice"); // "Hello, Alice!"
sayHello("Bob");   // "Hello, Bob!"
```

## Currying (HOF Pattern)

```javascript
// Convert a multi-arg function into a chain of single-arg functions
const curry = fn => {
    const arity = fn.length;
    return function curried(...args) {
        if (args.length >= arity) {
            return fn(...args);
        }
        return (...moreArgs) => curried(...args, ...moreArgs);
    };
};

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

curriedAdd(1)(2)(3);   // 6
curriedAdd(1, 2)(3);   // 6
curriedAdd(1)(2, 3);   // 6
```

## Debounce (Real-World HOF)

```javascript
// Delays execution until after `delay`ms of silence
function debounce(fn, delay) {
    let timerId;
    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), delay);
    };
}

const handleSearch = debounce((query) => {
    console.log("Searching:", query);
}, 300);

// User types "hello" — only fires once, 300ms after last keystroke
inputEl.addEventListener("input", e => handleSearch(e.target.value));
```

## Throttle (Real-World HOF)

```javascript
// Ensures fn fires at most once per `interval`ms
function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

window.addEventListener("scroll", throttle(() => {
    console.log("Scroll event (max once per 100ms)");
}, 100));
```

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Does this function take a function as argument? | Yes → it's higher-order. |
| Does this function return a function? | Yes → it's higher-order. |
| What built-in HOFs exist? | map, filter, reduce, find, sort, some, every, flatMap. |
| What is composition? | `compose(f, g)(x) = f(g(x))` — right to left. |
| What is currying? | Converting `f(a, b, c)` → `f(a)(b)(c)`. |
| What is debounce? | Delays execution until after a quiet period. |
| What is throttle? | Ensures max one execution per time interval. |
## Next Steps

[Back to Chapter 6](06-callback-functions.md): Callback Functions
[Proceed to Chapter 8](08-iife.md): IIFE — Immediately Invoked Function Expression to learn about iife — immediately invoked function expression.
