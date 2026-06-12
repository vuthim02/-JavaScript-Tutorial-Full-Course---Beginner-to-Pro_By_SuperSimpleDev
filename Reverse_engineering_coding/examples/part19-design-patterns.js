/**
 * PART 19 — Design Patterns: Singleton, Factory, Observer, Decorator, Proxy, Module
 * Run with: node part19-design-patterns.js
 */

// ===============================================================
// 1. SINGLETON — only one instance ever exists
// ===============================================================

class Singleton {
    constructor() {
        if (Singleton._instance) {
            return Singleton._instance;
        }
        this.createdAt = new Date();
        Singleton._instance = this;
    }

    static getInstance() {
        if (!Singleton._instance) {
            new Singleton();
        }
        return Singleton._instance;
    }
}

const s1 = new Singleton();
const s2 = new Singleton();
console.log('Singleton same instance:', s1 === s2); // true
console.log('Singleton via getInstance:', Singleton.getInstance() === s1); // true

// ===============================================================
// 2. FACTORY — creates objects without exposing the constructor
// ===============================================================

function createUser(type, name) {
    const users = {
        admin: { name, role: 'admin', permissions: ['read', 'write', 'delete'] },
        editor: { name, role: 'editor', permissions: ['read', 'write'] },
        viewer: { name, role: 'viewer', permissions: ['read'] },
    };
    return users[type] || users.viewer;
}

const alice = createUser('admin', 'Alice');
const bob = createUser('viewer', 'Bob');
console.log('Factory admin:', alice);
console.log('Factory viewer:', bob);

// ===============================================================
// 3. OBSERVER — event emitter pattern
// ===============================================================

class EventBus {
    constructor() {
        this._listeners = {};
    }

    on(event, handler) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(handler);
    }

    off(event, handler) {
        const handlers = this._listeners[event];
        if (handlers) {
            this._listeners[event] = handlers.filter((h) => h !== handler);
        }
    }

    emit(event, ...args) {
        const handlers = this._listeners[event] || [];
        handlers.forEach((handler) => handler(...args));
    }
}

const bus = new EventBus();
const log = (msg) => console.log('Observer received:', msg);
bus.on('message', log);
bus.emit('message', 'Hello from EventBus!');
bus.off('message', log);
bus.emit('message', 'This will not be logged');

// ===============================================================
// 4. DECORATOR — wraps an object with additional behavior
// ===============================================================

function withLogging(fn) {
    return function (...args) {
        console.log(`Decorator called with: ${JSON.stringify(args)}`);
        const result = fn(...args);
        console.log(`Decorator returned: ${JSON.stringify(result)}`);
        return result;
    };
}

function add(a, b) {
    return a + b;
}

const loggedAdd = withLogging(add);
console.log('Decorated add(2, 3):', loggedAdd(2, 3));

// ===============================================================
// 5. PROXY — intercepts object operations (using JS Proxy)
// ===============================================================

const target = { name: 'Alice', age: 30 };
const proxy = new Proxy(target, {
    get(obj, prop) {
        console.log(`Proxy get: ${String(prop)}`);
        if (prop === 'age') {
            return obj[prop];
        }
        return obj[prop];
    },
    set(obj, prop, value) {
        console.log(`Proxy set: ${String(prop)} = ${value}`);
        if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
            throw new Error('Age must be a positive number');
        }
        obj[prop] = value;
        return true;
    },
});

console.log('Proxy name:', proxy.name);
proxy.age = 31;
console.log('Proxy age:', proxy.age);
// proxy.age = -5; // would throw

// ===============================================================
// 6. MODULE PATTERN (Revealing Module) — encapsulated state
// ===============================================================

const CounterModule = (function () {
    let count = 0;

    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        },
        reset() {
            count = 0;
        },
    };
})();

console.log('Module count:', CounterModule.increment()); // 1
console.log('Module count:', CounterModule.increment()); // 2
console.log('Module count:', CounterModule.decrement()); // 1
console.log('Module count via getter:', CounterModule.getCount()); // 1
// console.log(CounterModule.count); // undefined — truly private

// ===============================================================
// 7. STRATEGY — swap algorithms at runtime
// ===============================================================

const strategies = {
    bubbleSort: (arr) => [...arr].sort((a, b) => a - b),
    quickSort: (arr) => {
        if (arr.length <= 1) return arr;
        const pivot = arr[0];
        const left = arr.slice(1).filter((x) => x <= pivot);
        const right = arr.slice(1).filter((x) => x > pivot);
        return [...strategies.quickSort(left), pivot, ...strategies.quickSort(right)];
    },
    reverseSort: (arr) => [...arr].sort((a, b) => b - a),
};

function sorter(strategy, data) {
    const fn = strategies[strategy];
    if (!fn) throw new Error(`Unknown strategy: ${strategy}`);
    return fn(data);
}

const data = [3, 1, 4, 1, 5, 9, 2, 6];
console.log('Strategy bubbleSort:', sorter('bubbleSort', data));
console.log('Strategy quickSort:', sorter('quickSort', data));
console.log('Strategy reverseSort:', sorter('reverseSort', data));

// ===============================================================
// 8. BUILDER — constructs complex objects step by step
// ===============================================================

class HttpRequestBuilder {
    constructor() {
        this.method = 'GET';
        this.url = '';
        this.headers = {};
        this.body = null;
    }

    setMethod(method) {
        this.method = method;
        return this;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    setBody(body) {
        this.body = body;
        return this;
    }

    build() {
        return {
            method: this.method,
            url: this.url,
            headers: this.headers,
            body: this.body,
        };
    }
}

const request = new HttpRequestBuilder()
    .setMethod('POST')
    .setUrl('/api/users')
    .setHeader('Content-Type', 'application/json')
    .setHeader('Authorization', 'Bearer token123')
    .setBody({ name: 'Alice' })
    .build();

console.log('Builder request:', request);

console.log('\nAll design patterns demonstrated successfully.');
