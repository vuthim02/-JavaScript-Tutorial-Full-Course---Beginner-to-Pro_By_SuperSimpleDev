# Timers

<img src="https://media.giphy.com/media/3oEjI9xj49ehuAGLQY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Delayed Execution

```javascript
setTimeout()
```

```javascript
const timerId = setTimeout(() => {
    console.log("Runs once after 1 second");
}, 1000);

clearTimeout(timerId); // Cancel before it fires
```

---

## Repeated Execution

```javascript
setInterval()
```

```javascript
const counter = document.getElementById("counter");
let count = 0;

const intervalId = setInterval(() => {
    count++;
    counter.textContent = count;
    
    if (count >= 10) {
        clearInterval(intervalId);
    }
}, 1000);
```

---

## Recursive setTimeout (Better than setInterval)

```javascript
// Guarantees delay BETWEEN end of execution and next start
function tick() {
    console.log("Tick at", Date.now());
    setTimeout(tick, 1000); // 1s after this tick FINISHES
}

tick();

// vs setInterval (drifts):
setInterval(() => {
    console.log("Interval at", Date.now()); // 1s from SCHEDULE, not end
}, 1000);
```

---

## Debounce with Timers

```javascript
function debounce(fn, delay) {
    let timerId = null;
    
    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), delay);
    };
}

const handleSearch = debounce((query) => {
    console.log("Searching:", query);
}, 300);

searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
```
## Next Steps

[Back to Chapter 17](17-validation.md): Validation
[Proceed to Chapter 19](19-storage.md): Storage to learn about storage.
