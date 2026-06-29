# Level 59: Events & Closures

## Challenges 1-70: Error Snippets

### Error 1: addEventListener Reference vs Call
**Description:** Add click event listener
```javascript
const button = { addEventListener: (evt, fn) => {} };
button.addEventListener('click', console.log('clicked'));
```

### Error 2: Closure Loop with var
**Description:** Create click handlers in loop
```javascript
const buttons = [{id: 1}, {id: 2}, {id: 3}];
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onClick = function() {
    console.log('Button ' + i);
  };
}
buttons[0].onClick();
```

### Error 3: Event Listener this
**Description:** Use this in event listener
```javascript
const element = {
  text: 'Click me',
  addEventListener: function(evt, fn) { this.handler = fn; },
  handleEvent: function() { this.handler(); }
};
element.addEventListener('click', function() {
  console.log(this.text);
});
element.handleEvent();
```

### Error 4: Closure with Delayed Execution
**Description:** Capture variable for later
```javascript
function createIncrementer() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const inc = createIncrementer();
console.log(inc());
console.log(inc());
```

### Error 5: AddEventListener Multiple Times
**Description:** Add same listener twice
```javascript
const btn = { listeners: [], addEventListener(evt, fn) { this.listeners.push(fn); } };
const handler = () => console.log('click');
btn.addEventListener('click', handler);
btn.addEventListener('click', handler);
btn.listeners.forEach(fn => fn());
```

### Error 6: Closure with Object Reference
**Description:** Closure capturing object reference
```javascript
function createWatchers() {
  const watchers = [];
  let obj = {value: 1};
  watchers.push(() => console.log(obj.value));
  obj = {value: 2};
  watchers.push(() => console.log(obj.value));
  return watchers;
}
const watchers = createWatchers();
watchers[0]();
```

### Error 7: RemoveEventListener Wrong Reference
**Description:** Remove event listener
```javascript
const btn = {
  listeners: [],
  addEventListener(evt, fn) { this.listeners.push(fn); },
  removeEventListener(evt, fn) {
    this.listeners = this.listeners.filter(l => l !== fn);
  }
};
btn.addEventListener('click', () => console.log('hi'));
btn.removeEventListener('click', () => console.log('hi'));
console.log(btn.listeners.length);
```

### Error 8: Closure Module Pattern
**Description:** Create module with private state
```javascript
const counter = (function() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count
  };
})();
console.log(counter.increment());
console.log(counter.getCount());
```

### Error 9: Event Default Prevented
**Description:** Prevent form submission
```javascript
const form = {
  submit() { console.log('submitted'); },
  addEventListener(evt, fn) { this.handler = fn; }
};
form.addEventListener('submit', function(e) {
  e.preventDefault();
});
```

### Error 10: Closure with Loop and IIFE
**Description:** Use IIFE to capture loop variable
```javascript
for (var i = 0; i < 3; i++) {
  (function(index) {
    setTimeout(() => console.log(index), 1000);
  })(i);
}
```

### Error 11: Event Bubbling Stop
**Description:** Stop event propagation
```javascript
const parent = { name: 'parent', handler: null };
const child = { name: 'child', handler: null };
parent.addEventListener = function(evt, fn) { this.handler = fn; };
child.addEventListener = function(evt, fn) { this.handler = fn; };
parent.addEventListener('click', () => console.log('parent'));
child.addEventListener('click', function(e) {
  e.stopPropagation();
  console.log('child');
});
```

### Error 12: Closure Accumulator Pattern
**Description:** Accumulator with closure
```javascript
function createAccumulator() {
  let total = 0;
  return {
    add: (n) => total += n,
    getTotal: () => total
  };
}
const acc = createAccumulator();
acc.add(5);
acc.add(3);
console.log(acc.getTotal());
```

### Error 13: Once Event Listener
**Description:** Run event listener only once
```javascript
const btn = { listeners: [], addEventListener(evt, fn) { this.listeners.push(fn); } };
function handler() {
  console.log('ran once');
  btn.removeEventListener('click', handler);
}
btn.addEventListener('click', handler);
btn.listeners.forEach(fn => fn());
btn.listeners.forEach(fn => fn());
```

### Error 14: Closure for Private Variables
**Description:** Private variable with closure
```javascript
function createPerson(name) {
  let _name = name;
  return {
    getName: () => _name,
    setName: (n) => { _name = n; }
  };
}
const p = createPerson('Alice');
console.log(p.getName());
p.setName('Bob');
console.log(p.getName());
```

### Error 15: Event Delegation
**Description:** Use event delegation
```javascript
const list = { items: ['a', 'b', 'c'], handler: null };
list.addEventListener = function(evt, fn) { this.handler = fn; };
list.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    console.log('item clicked');
  }
});
```

### Error 16: Closure Counter Reset
**Description:** Reset counter created by closure
```javascript
function createCounter() {
  let count = 0;
  return function() { return ++count; };
}
const counter = createCounter();
console.log(counter());
// How to reset?
```

### Error 17: Event Listener Options
**Description:** Use once option
```javascript
const btn = { addEventListener(evt, fn, opts) { this.handler = fn; if (opts.once) this.handler(); } };
btn.addEventListener('click', () => console.log('once'), {once: true});
btn.addEventListener('click', () => console.log('once'), {once: true});
```

### Error 18: Closure for Memoization
**Description:** Memoize with closure
```javascript
function memoize(fn) {
  const cache = {};
  return function(n) {
    if (cache[n] !== undefined) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
}
const square = memoize(n => n * n);
console.log(square(5));
console.log(square(5));
```

### Error 19: Event Object Properties
**Description:** Access event properties
```javascript
const btn = { addEventListener(evt, fn) { this.handler = fn; } };
btn.addEventListener('click', function(e) {
  console.log(e.type);
});
```

### Error 20: Closure Binding in Loop
**Description:** Bind correct value in event loop
```javascript
const buttons = [{text: 'A'}, {text: 'B'}, {text: 'C'}];
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onClick = function() {
    console.log(this.text);
  }.bind(buttons[i]);
}
buttons[0].onClick();
```

### Error 21: Nested Event Listeners
**Description:** Avoid nested event listeners
```javascript
const modal = {
  addEventListener(evt, fn) { this.handler = fn; },
  open() { console.log('open'); }
};
document.addEventListener('click', function() {
  modal.addEventListener('click', function() {
    modal.open();
  });
});
```

### Error 22: Closure for Rate Limiting
**Description:** Rate limit with closure
```javascript
function rateLimit(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}
const log = rateLimit(console.log, 1000);
log('a');
log('b');
```

### Error 23: Event Target Confusion
**Description:** Use currentTarget vs target
```javascript
const parent = { tagName: 'DIV', children: [] };
const child = { tagName: 'SPAN' };
parent.children.push(child);
parent.addEventListener = function(evt, fn) { this.handler = fn; };
parent.addEventListener('click', function(e) {
  console.log(e.currentTarget === this);
});
```

### Error 24: Closure for Once Function
**Description:** Create once wrapper with closure
```javascript
function once(fn) {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    return fn(...args);
  };
}
const init = once(() => console.log('initialized'));
init();
init();
```

### Error 25: Keyboard Event
**Description:** Handle keyboard event
```javascript
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    console.log('pressed Enter');
  }
});
```

### Error 26: Closure for State Machine
**Description:** Simple state machine with closure
```javascript
function createStateMachine(initial) {
  let state = initial;
  return {
    getState: () => state,
    setState: (s) => { state = s; }
  };
}
const sm = createStateMachine('idle');
sm.setState('running');
console.log(sm.getState());
```

### Error 27: Event PreventDefault Condition
**Description:** Conditional preventDefault
```javascript
const link = { addEventListener(evt, fn) { this.handler = fn; } };
link.addEventListener('click', function(e) {
  if (!confirm('Leave?')) {
    e.preventDefault();
  }
});
```

### Error 28: Closure for Lazy Evaluation
**Description:** Lazy value with closure
```javascript
function lazy(fn) {
  let evaluated = false;
  let result;
  return function() {
    if (!evaluated) {
      result = fn();
      evaluated = true;
    }
    return result;
  };
}
const expensive = lazy(() => { console.log('computing'); return 42; });
console.log(expensive());
console.log(expensive());
```

### Error 29: Custom Event
**Description:** Dispatch custom event
```javascript
const element = {
  listeners: {},
  addEventListener(evt, fn) { this.listeners[evt] = fn; },
  dispatchEvent(evt) { this.listeners[evt.type](); }
};
element.addEventListener('custom', () => console.log('custom'));
element.dispatchEvent({type: 'custom'});
```

### Error 30: Closure for Partial Application
**Description:** Partial application with closure
```javascript
function partial(fn, ...args) {
  return function(...moreArgs) {
    return fn(...args, ...moreArgs);
  };
}
const add = (a, b, c) => a + b + c;
const add5 = partial(add, 5);
console.log(add5(3, 2));
```

### Error 31: Event Listener Context
**Description:** Maintain this in listener
```javascript
const obj = {
  name: 'Alice',
  attach: function(element) {
    element.addEventListener('click', this.handleClick);
  },
  handleClick: function() {
    console.log(this.name);
  }
};
const btn = { addEventListener(evt, fn) { fn(); } };
obj.attach(btn);
```

### Error 32: Closure Module Augmentation
**Description:** Augment module with closure
```javascript
const module = (function() {
  let data = [];
  return {
    add: (item) => data.push(item),
    getAll: () => [...data]
  };
})();
module.add(1);
module.add(2);
console.log(module.getAll());
```

### Error 33: Event with Debounce
**Description:** Debounce event handler
```javascript
const searchInput = { value: '', addEventListener(evt, fn) { this.handler = fn; } };
let timer;
searchInput.addEventListener('input', function() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log('Search:', searchInput.value);
  }, 300);
});
```

### Error 34: Closure for Currying
**Description:** Curry function with closure
```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...more) => curried(...args, ...more);
  };
}
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3));
```

### Error 35: Passive Event Listener
**Description:** Use passive option
```javascript
document.addEventListener('touchstart', function(e) {
  e.preventDefault();
}, {passive: true});
```

### Error 36: Closure Function Factory
**Description:** Factory with closure
```javascript
function createMultiplier(factor) {
  return function(n) {
    return n * factor;
  };
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5), triple(5));
```

### Error 37: Event Removing All
**Description:** Remove all listeners
```javascript
const emitter = {
  listeners: [],
  on(fn) { this.listeners.push(fn); },
  off(fn) { this.listeners = this.listeners.filter(l => l !== fn); },
  emit() { this.listeners.forEach(fn => fn()); }
};
const fn = () => console.log('test');
emitter.on(fn);
emitter.off(fn);
console.log(emitter.listeners.length);
```

### Error 38: Closure with Getters/Setters
**Description:** Getter/setter with closure
```javascript
function createStore(initial) {
  let value = initial;
  return {
    get: () => value,
    set: (v) => { value = v; }
  };
}
const store = createStore(0);
store.set(10);
console.log(store.get());
```

### Error 39: Event Emitter Pattern
**Description:** Simple event emitter
```javascript
const emitter = {
  events: {},
  on(event, fn) {
    (this.events[event] = this.events[event] || []).push(fn);
  },
  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
  }
};
emitter.on('data', d => console.log(d));
emitter.emit('data', 'hello');
```

### Error 40: Closure for Singleton
**Description:** Singleton with closure
```javascript
const singleton = (function() {
  let instance;
  return function() {
    if (!instance) instance = {id: Math.random()};
    return instance;
  };
})();
console.log(singleton() === singleton());
```

### Error 41: Event Propagation Order
**Description:** Understand capturing vs bubbling
```javascript
const outer = { name: 'outer', handler: null };
const inner = { name: 'inner', handler: null };
outer.addEventListener = function(evt, fn, capture) { this.handler = fn; };
inner.addEventListener = function(evt, fn, capture) { this.handler = fn; };
outer.addEventListener('click', () => console.log('outer capture'), true);
inner.addEventListener('click', () => console.log('inner bubble'), false);
```

### Error 42: Closure for Compose
**Description:** Compose functions with closure
```javascript
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((v, fn) => fn(v), x);
  };
}
const add1 = n => n + 1;
const double = n => n * 2;
const f = compose(double, add1);
console.log(f(5));
```

### Error 43: RemoveEventListener Anonymous
**Description:** Try to remove anonymous listener
```javascript
const btn = { listeners: [], addEventListener(evt, fn) { this.listeners.push(fn); }, removeEventListener(evt, fn) { this.listeners = this.listeners.filter(l => l !== fn); } };
btn.addEventListener('click', function() { console.log('hi'); });
btn.removeEventListener('click', function() { console.log('hi'); });
console.log(btn.listeners.length);
```

### Error 44: Closure for Pipe
**Description:** Pipe with closure
```javascript
function pipe(...fns) {
  return function(x) {
    return fns.reduce((v, fn) => fn(v), x);
  };
}
const add1 = n => n + 1;
const double = n => n * 2;
const f = pipe(add1, double);
console.log(f(5));
```

### Error 45: Focus Event
**Description:** Handle focus/blur
```javascript
const input = { addEventListener(evt, fn) { this.handler = fn; } };
input.addEventListener('focus', function() {
  console.log('focused');
});
```

### Error 46: Closure for Event Queue
**Description:** Queue events with closure
```javascript
function createEventQueue() {
  const queue = [];
  return {
    add: (fn) => queue.push(fn),
    process: () => { while (queue.length) queue.shift()(); }
  };
}
const eq = createEventQueue();
eq.add(() => console.log(1));
eq.add(() => console.log(2));
eq.process();
```

### Error 47: Scroll Event Throttle
**Description:** Throttle scroll with closure
```javascript
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
const log = throttle(() => console.log('scroll'), 200);
log();
log();
```

### Error 48: Closure for Unique ID
**Description:** Generate unique IDs
```javascript
const createId = (function() {
  let id = 0;
  return () => ++id;
})();
console.log(createId());
console.log(createId());
```

### Error 49: Resize Event
**Description:** Handle window resize
```javascript
window.addEventListener('resize', function() {
  console.log('resized to', window.innerWidth);
});
```

### Error 50: Closure for Cached API
**Description:** Cached API calls with closure
```javascript
function createCachedApi() {
  const cache = {};
  return {
    fetch: (url) => {
      if (cache[url]) return Promise.resolve(cache[url]);
      return fetch(url).then(r => r.json()).then(d => { cache[url] = d; return d; });
    },
    invalidate: (url) => { delete cache[url]; }
  };
}
```

### Error 51: Event Default Checked
**Description:** Check if default prevented
```javascript
const event = { defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
event.preventDefault();
console.log(event.defaultPrevented);
```

### Error 52: Closure for Timed Cache
**Description:** Cache with TTL
```javascript
function createTimedCache(ttl) {
  const cache = {};
  return {
    set: (key, val) => { cache[key] = {val, time: Date.now()}; },
    get: (key) => {
      const entry = cache[key];
      if (!entry) return null;
      if (Date.now() - entry.time > ttl) { delete cache[key]; return null; }
      return entry.val;
    }
  };
}
```

### Error 53: Mouse Event Position
**Description:** Get mouse coordinates
```javascript
document.addEventListener('mousemove', function(e) {
  console.log(e.clientX, e.clientY);
});
```

### Error 54: Closure for Retry Logic
**Description:** Retry with closure
```javascript
function createRetry(maxRetries) {
  let retries = 0;
  return function(fn) {
    try { return fn(); }
    catch (e) {
      if (retries < maxRetries) { retries++; return fn(); }
      throw e;
    }
  };
}
```

### Error 55: Touch Event
**Description:** Handle touch events
```javascript
document.addEventListener('touchstart', function(e) {
  console.log('touch at', e.touches[0].clientX);
});
```

### Error 56: Closure for Throttled API
**Description:** Throttle API calls
```javascript
function createThrottledApi(limit) {
  let calls = 0;
  let resetTime = Date.now() + 1000;
  return function(fn) {
    if (Date.now() > resetTime) { calls = 0; resetTime = Date.now() + 1000; }
    if (calls < limit) { calls++; return fn(); }
    throw new Error('Rate limited');
  };
}
```

### Error 57: Submit Event
**Description:** Handle form submit
```javascript
const form = { addEventListener(evt, fn) { this.handler = fn; } };
form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('form submitted');
});
```

### Error 58: Closure for State With History
**Description:** State with undo
```javascript
function createStateWithHistory(initial) {
  let state = initial;
  const history = [initial];
  return {
    get: () => state,
    set: (v) => { state = v; history.push(v); },
    undo: () => { history.pop(); state = history[history.length - 1]; }
  };
}
```

### Error 59: Drag Event
**Description:** Handle drag events
```javascript
const draggable = { addEventListener(evt, fn) { this.handler = fn; } };
draggable.addEventListener('dragstart', function(e) {
  e.dataTransfer.setData('text/plain', 'dragged');
});
```

### Error 60: Closure for Debounced Search
**Description:** Debounced search with closure
```javascript
function createDebouncedSearch(fn, delay) {
  let timer;
  return function(query) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(query), delay);
  };
}
const search = createDebouncedSearch(q => console.log('Search:', q), 300);
search('hel');
search('hello');
```

### Error 61: Transition Event
**Description:** Listen for CSS transition end
```javascript
const el = { addEventListener(evt, fn) { this.handler = fn; } };
el.addEventListener('transitionend', function() {
  console.log('transition ended');
});
```

### Error 62: Closure for Rate Limiter with Queue
**Description:** Rate limiter with queue
```javascript
function createRateLimiter(limit, interval) {
  const queue = [];
  let running = 0;
  return function(fn) {
    if (running < limit) { running++; fn(); }
    else queue.push(fn);
  };
}
```

### Error 63: Animation Event
**Description:** Listen for animation end
```javascript
const el = { addEventListener(evt, fn) { this.handler = fn; } };
el.addEventListener('animationend', function() {
  console.log('animation ended');
});
```

### Error 64: Closure for Toggle State
**Description:** Toggle state with closure
```javascript
function createToggle(initial) {
  let state = initial;
  return {
    toggle: () => { state = !state; return state; },
    get: () => state
  };
}
const toggle = createToggle(false);
console.log(toggle.toggle());
console.log(toggle.toggle());
```

### Error 65: Error Event
**Description:** Handle error events
```javascript
window.addEventListener('error', function(e) {
  console.log('Error:', e.message);
});
```

### Error 66: Closure for Batch Collector
**Description:** Batch items with closure
```javascript
function createBatcher(delay) {
  let batch = [];
  let timer;
  return function(item, cb) {
    batch.push(item);
    clearTimeout(timer);
    timer = setTimeout(() => { cb(batch); batch = []; }, delay);
  };
}
```

### Error 67: Visibility Change Event
**Description:** Handle page visibility change
```javascript
document.addEventListener('visibilitychange', function() {
  if (document.hidden) console.log('hidden');
  else console.log('visible');
});
```

### Error 68: Closure for Polling
**Description:** Polling with closure control
```javascript
function createPoller(fn, interval) {
  let id;
  return {
    start: () => { id = setInterval(fn, interval); },
    stop: () => { clearInterval(id); }
  };
}
```

### Error 69: Hash Change Event
**Description:** Handle URL hash change
```javascript
window.addEventListener('hashchange', function() {
  console.log('hash:', location.hash);
});
```

### Error 70: Closure for Event Accumulator
**Description:** Accumulate events with closure
```javascript
function createAccumulator(timeout) {
  let items = [];
  let timer;
  return function(item, cb) {
    items.push(item);
    clearTimeout(timer);
    timer = setTimeout(() => { cb(items); items = []; }, timeout);
  };
}
```

## Challenges 71-100: Issue Snippets

### Issue 1: addEventListener with Anonymous
**Description:** Add event listener with anonymous function
```javascript
document.addEventListener('click', function() {
  console.log('clicked');
});
```

### Issue 2: Closure in for Loop with var
**Description:** Loop with closure using var
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
```

### Issue 3: Multiple Event Listeners
**Description:** Multiple listeners on same event
```javascript
document.addEventListener('click', fn1);
document.addEventListener('click', fn2);
document.addEventListener('click', fn3);
```

### Issue 4: Closure for Private Counter
**Description:** Private counter with closure
```javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = createCounter();
```

### Issue 5: Event Listener with Bind
**Description:** Bind context to event listener
```javascript
function handleClick() {
  console.log(this.id);
}
document.getElementById('btn').addEventListener('click', handleClick.bind({id: 'btn'}));
```

### Issue 6: Closure Module Pattern
**Description:** Module pattern with closure
```javascript
const myModule = (function() {
  let privateVar = 0;
  return {
    increment: () => privateVar++,
    getValue: () => privateVar
  };
})();
```

### Issue 7: Removing Named Listener
**Description:** Remove named event listener
```javascript
function handler() { console.log('click'); }
document.addEventListener('click', handler);
document.removeEventListener('click', handler);
```

### Issue 8: Closure for Configuration
**Description:** Configuration with closure
```javascript
function createConfig(defaults) {
  let config = {...defaults};
  return {
    get: (key) => config[key],
    set: (key, val) => { config[key] = val; }
  };
}
```

### Issue 9: Event Object Reuse
**Description:** Reusing event object
```javascript
document.addEventListener('click', function(e) {
  setTimeout(function() {
    console.log(e.clientX);
  }, 100);
});
```

### Issue 10: Closure in forEach
**Description:** Closure in forEach callback
```javascript
const items = [1, 2, 3];
const results = [];
items.forEach(function(item) {
  results.push(function() { return item * 2; });
});
```

### Issue 11: Window Load Event
**Description:** Wait for page load
```javascript
window.addEventListener('load', function() {
  console.log('loaded');
});
```

### Issue 12: Closure for Lazy Loading
**Description:** Lazy load with closure
```javascript
const lazyLoad = (function() {
  let loaded = false;
  return function() {
    if (!loaded) {
      console.log('loading...');
      loaded = true;
    }
  };
})();
```

### Issue 13: DOMContentLoaded Event
**Description:** Wait for DOM ready
```javascript
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM ready');
});
```

### Issue 14: Closure for Event Debounce
**Description:** Debounce with closure
```javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

### Issue 15: Context Menu Event
**Description:** Handle right-click
```javascript
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  console.log('context menu');
});
```

### Issue 16: Closure for Once Event
**Description:** Event that fires once
```javascript
function once(fn) {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    return fn(...args);
  };
}
```

### Issue 17: Key Up/Down Events
**Description:** Track key presses
```javascript
document.addEventListener('keydown', function(e) {
  console.log('pressed:', e.key);
});
document.addEventListener('keyup', function(e) {
  console.log('released:', e.key);
});
```

### Issue 18: Closure for Event Filter
**Description:** Filter events with closure
```javascript
function createEventFilter(predicate) {
  return function(fn) {
    return function(...args) {
      if (predicate(...args)) fn(...args);
    };
  };
}
```

### Issue 19: Mouse Enter/Leave
**Description:** Mouse enter/leave events
```javascript
element.addEventListener('mouseenter', function() {
  console.log('entered');
});
element.addEventListener('mouseleave', function() {
  console.log('left');
});
```

### Issue 20: Closure for Throttle
**Description:** Throttle with closure
```javascript
function throttle(fn, limit) {
  let waiting = false;
  return function(...args) {
    if (!waiting) {
      fn(...args);
      waiting = true;
      setTimeout(() => waiting = false, limit);
    }
  };
}
```

### Issue 21: Form Input Event
**Description:** Real-time input handling
```javascript
input.addEventListener('input', function(e) {
  console.log('value:', e.target.value);
});
```

### Issue 22: Closure for Memoized Selector
**Description:** Memoized DOM selector
```javascript
const getElement = (function() {
  const cache = {};
  return function(id) {
    if (!cache[id]) cache[id] = document.getElementById(id);
    return cache[id];
  };
})();
```

### Issue 23: Focusin/Focusout
**Description:** Focus delegation
```javascript
document.addEventListener('focusin', function(e) {
  console.log('focused:', e.target);
});
```

### Issue 24: Closure for Event Namespace
**Description:** Namespaced events
```javascript
const events = {};
function on(namespace, fn) {
  (events[namespace] = events[namespace] || []).push(fn);
}
function emit(namespace, ...args) {
  (events[namespace] || []).forEach(fn => fn(...args));
}
```

### Issue 25: Media Query Event
**Description:** Match media change
```javascript
const mq = window.matchMedia('(max-width: 600px)');
mq.addEventListener('change', function(e) {
  console.log('mobile:', e.matches);
});
```

### Issue 26: Closure for API with State
**Description:** Stateful API with closure
```javascript
function createApi(baseUrl) {
  return {
    get: (path) => fetch(baseUrl + path).then(r => r.json()),
    post: (path, data) => fetch(baseUrl + path, {method: 'POST', body: JSON.stringify(data)})
  };
}
```

### Issue 27: Pointer Events
**Description:** Pointer events for mouse/touch
```javascript
document.addEventListener('pointerdown', function(e) {
  console.log('pointer down');
});
```

### Issue 28: Closure for Event Buffer
**Description:** Buffer events with closure
```javascript
function createBuffer(size) {
  let buffer = [];
  return {
    add: (item) => { buffer.push(item); if (buffer.length > size) buffer.shift(); },
    getAll: () => [...buffer]
  };
}
```

### Issue 29: Wheel Event
**Description:** Handle scroll wheel
```javascript
document.addEventListener('wheel', function(e) {
  console.log('scroll:', e.deltaY);
});
```

### Issue 30: Closure for Subscription
**Description:** Pub/sub with closure
```javascript
function createPubSub() {
  const subscribers = {};
  return {
    subscribe: (event, fn) => {
      (subscribers[event] = subscribers[event] || []).push(fn);
      return () => subscribers[event] = subscribers[event].filter(s => s !== fn);
    },
    publish: (event, data) => (subscribers[event] || []).forEach(fn => fn(data))
  };
}
```

## Challenges 101-150: Modification Snippets

### Modify 1: Convert to Arrow for this Binding
**Description:** Fix this binding in event listener
```javascript
const obj = {
  name: 'Alice',
  attach: function(el) {
    el.addEventListener('click', function() {
      console.log(this.name);
    });
  }
};
const btn = { addEventListener(evt, fn) { fn(); } };
obj.attach(btn);
```

### Modify 2: Add Closure for Private State
**Description:** Make counter state private
```javascript
const counter = {
  count: 0,
  increment: function() { this.count++; },
  getCount: function() { return this.count; }
};
counter.increment();
console.log(counter.getCount());
```

### Modify 3: Refactor to Module Pattern
**Description:** Encapsulate with IIFE closure
```javascript
const app = {
  config: {theme: 'dark'},
  init: function() { console.log('init', this.config.theme); }
};
app.init();
```

### Modify 4: Add Event Delegation
**Description:** Use event delegation for list
```javascript
const list = document.createElement('ul');
const items = ['A', 'B', 'C'];
items.forEach(text => {
  const li = document.createElement('li');
  li.textContent = text;
  li.addEventListener('click', () => console.log(text));
  list.appendChild(li);
});
```

### Modify 5: Fix Loop Closure with let
**Description:** Fix closure in loop using let
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Modify 6: Add Once Wrapper for Event
**Description:** Ensure handler runs once
```javascript
const btn = { addEventListener(evt, fn) { this.handler = fn; } };
btn.addEventListener('click', () => console.log('clicked'));
btn.handler();
btn.handler();
```

### Modify 7: Convert to Closure Factory
**Description:** Factory function with closure
```javascript
const double = n => n * 2;
const triple = n => n * 3;
console.log(double(5));
console.log(triple(5));
```

### Modify 8: Add Throttle to Scroll
**Description:** Throttle scroll event
```javascript
window.addEventListener('scroll', () => {
  console.log('scrolled');
});
```

### Modify 9: Refactor to Custom Event Emitter
**Description:** Implement custom event system
```javascript
function onData(data) { console.log(data); }
onData('test');
```

### Modify 10: Add Debounce to Input
**Description:** Debounce input handler
```javascript
const input = { value: '', addEventListener(evt, fn) { this.handler = fn; } };
input.addEventListener('input', () => {
  console.log('Input:', input.value);
});
```

### Modify 11: Fix Event Listener Reference for Removal
**Description:** Store reference for removal
```javascript
document.addEventListener('click', () => console.log('click'));
```

### Modify 12: Add Closure for Lazy Init
**Description:** Lazy initialization with closure
```javascript
function initApp() {
  console.log('App initialized');
}
initApp();
```

### Modify 13: Convert to Closure for Config
**Description:** Config with closure
```javascript
const config = {
  apiUrl: '/api',
  timeout: 5000,
  getUrl: function() { return this.apiUrl; }
};
console.log(config.getUrl());
```

### Modify 14: Add Event with Options
**Description:** Use once option for event
```javascript
const btn = { addEventListener(evt, fn) { this.handler = fn; } };
btn.addEventListener('click', () => console.log('once'));
```

### Modify 15: Refactor to Closure for Cache
**Description:** Caching with closure
```javascript
function compute(n) {
  return n * n;
}
console.log(compute(5));
console.log(compute(5));
```

### Modify 16: Add Self-Removing Listener
**Description:** Listener that removes itself
```javascript
const btn = { listeners: [], addEventListener(evt, fn) { this.listeners.push(fn); }, removeEventListener(evt, fn) { this.listeners = this.listeners.filter(l => l !== fn); } };
btn.addEventListener('click', () => console.log('run once'));
btn.listeners[0]();
btn.listeners[0]();
```

### Modify 17: Convert to Closure for Batch Process
**Description:** Batch processing with closure
```javascript
function processItem(item) {
  console.log('Processing:', item);
}
const items = [1, 2, 3, 4, 5];
items.forEach(processItem);
```

### Modify 18: Add Event Namespacing
**Description:** Namespaced event handling
```javascript
document.addEventListener('click', () => console.log('click'));
document.addEventListener('click', () => console.log('also click'));
```

### Modify 19: Refactor to Closure for State Machine
**Description:** Simple state machine
```javascript
let state = 'idle';
function transition(newState) {
  state = newState;
  console.log('State:', state);
}
transition('active');
```

### Modify 20: Add Passive Event Listener
**Description:** Improve scroll performance
```javascript
document.addEventListener('touchstart', (e) => {
  e.preventDefault();
});
```

### Modify 21: Fix Closure Variable Capture
**Description:** Capture correct variable value
```javascript
const funcs = [];
for (var i = 0; i < 3; i++) {
  funcs.push(() => i);
}
console.log(funcs[0]());
```

### Modify 22: Add Custom Event Dispatching
**Description:** Dispatch and listen to custom events
```javascript
const el = document.createElement('div');
el.addEventListener('custom', () => console.log('custom event'));
```

### Modify 23: Convert to Closure for Rate Limiter
**Description:** Rate limit function calls
```javascript
function logMessage(msg) {
  console.log(msg);
}
logMessage('a');
logMessage('b');
setTimeout(() => logMessage('c'), 100);
```

### Modify 24: Add Event Listener with Context
**Description:** Bind correct context
```javascript
class Component {
  constructor(name) { this.name = name; }
  handleClick() { console.log(this.name); }
}
const comp = new Component('Test');
document.addEventListener('click', comp.handleClick);
```

### Modify 25: Refactor to IIFE for Isolation
**Description:** Use IIFE for scope isolation
```javascript
const x = 10;
console.log(x);
```

### Modify 26: Add Resize Observer
**Description:** Handle element resize
```javascript
window.addEventListener('resize', () => {
  console.log('window resized');
});
```

### Modify 27: Fix addEventListener with Arrow
**Description:** Use arrow to preserve this
```javascript
const obj = {
  name: 'Alice',
  init: function() {
    document.addEventListener('click', function() {
      console.log(this.name);
    });
  }
};
obj.init();
```

### Modify 28: Add Closure for Timer Management
**Description:** Manage timers with closure
```javascript
let timeoutId;
function startTimer() {
  timeoutId = setTimeout(() => console.log('done'), 1000);
}
function stopTimer() {
  clearTimeout(timeoutId);
}
```

### Modify 29: Convert to Closure for Sequential IDs
**Description:** Auto-incrementing IDs
```javascript
let nextId = 0;
function generateId() {
  return ++nextId;
}
console.log(generateId());
console.log(generateId());
```

### Modify 30: Add Event for Escape Key
**Description:** Close on Escape key
```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') console.log('closed');
});
```

### Modify 31: Refactor to Closure for Logging
**Description:** Logger with prefix via closure
```javascript
function logError(msg) { console.log('[ERROR]', msg); }
function logWarn(msg) { console.log('[WARN]', msg); }
logError('fail');
logWarn('caution');
```

### Modify 32: Add Mutation Observer
**Description:** Observe DOM changes
```javascript
const target = document.createElement('div');
// TODO: Observe mutations
```

### Modify 33: Fix Nested Event Listeners
**Description:** Prevent listener accumulation
```javascript
function setupModal() {
  document.addEventListener('click', function handler() {
    console.log('modal');
    document.removeEventListener('click', handler);
  });
}
setupModal();
setupModal();
```

### Modify 34: Add Closure for Pausable Counter
**Description:** Pausable counter with closure
```javascript
let count = 0;
function increment() { count++; }
function getCount() { return count; }
increment();
increment();
console.log(getCount());
```

### Modify 35: Convert to Event Delegation
**Description:** Single listener for multiple buttons
```javascript
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('click', () => console.log('clicked'));
});
```

### Modify 36: Add Intersection Observer
**Description:** Lazy load with intersection observer
```javascript
const images = document.querySelectorAll('img[data-src]');
// TODO: Use intersection observer
```

### Modify 37: Refactor to Closure for API Service
**Description:** API service with closure
```javascript
const API = {
  base: '/api',
  get: function(path) { return fetch(this.base + path); },
  post: function(path, data) { return fetch(this.base + path, {method: 'POST', body: JSON.stringify(data)}); }
};
API.get('/users').then(r => r.json());
```

### Modify 38: Add Scroll Spy
**Description:** Scroll-based navigation highlight
```javascript
window.addEventListener('scroll', () => {
  console.log('scroll position:', window.scrollY);
});
```

### Modify 39: Fix Closure Loop with IIFE
**Description:** Use IIFE to fix closure in loop
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
```

### Modify 40: Add Clipboard Event
**Description:** Handle copy/paste
```javascript
document.addEventListener('copy', () => {
  console.log('copied');
});
```

### Modify 41: Convert to Closure for Validation
**Description:** Form validation with closure
```javascript
function validateEmail(email) {
  return email.includes('@');
}
function validateAge(age) {
  return age >= 18;
}
console.log(validateEmail('test@test.com'));
```

### Modify 42: Add BeforeUnload Event
**Description:** Warn before leaving
```javascript
window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = '';
});
```

### Modify 43: Refactor to Closure for Drag
**Description:** Drag functionality with closure
```javascript
let isDragging = false;
document.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mousemove', () => {
  if (isDragging) console.log('dragging');
});
```

### Modify 44: Add Online/Offline Events
**Description:** Detect network changes
```javascript
window.addEventListener('online', () => console.log('online'));
window.addEventListener('offline', () => console.log('offline'));
```

### Modify 45: Fix Memory Leak with Closure
**Description:** Prevent closure memory leak
```javascript
function createLargeHandler() {
  const largeData = new Array(10000).fill('x');
  return function() {
    console.log(largeData.length);
  };
}
document.addEventListener('click', createLargeHandler());
```

### Modify 46: Add PopState Event
**Description:** Handle browser back/forward
```javascript
window.addEventListener('popstate', () => {
  console.log('navigation');
});
```

### Modify 47: Convert to Closure for Tabs
**Description:** Tab component with closure
```javascript
function switchTab(tabId) {
  console.log('Switching to', tabId);
}
switchTab('tab1');
switchTab('tab2');
```

### Modify 48: Add Animation Event Listeners
**Description:** Listen for animation events
```javascript
const el = document.createElement('div');
el.addEventListener('animationstart', () => console.log('start'));
el.addEventListener('animationend', () => console.log('end'));
```

### Modify 49: Refactor to Closure for Accordion
**Description:** Accordion with closure
```javascript
function toggleAccordion(id) {
  console.log('Toggling', id);
}
toggleAccordion('section1');
```

### Modify 50: Add Storage Event
**Description:** Listen for storage changes
```javascript
window.addEventListener('storage', (e) => {
  console.log('Storage changed:', e.key, e.newValue);
});
```
