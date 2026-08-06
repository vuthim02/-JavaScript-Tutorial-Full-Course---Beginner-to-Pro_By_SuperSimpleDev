# Chapter 13 — Error Cause (Error.cause)

## Overview

ES2022 introduced the `cause` property on `Error`, allowing you to chain errors while preserving the original cause.

---

## Basic Usage

```javascript
try {
    fetch('/api/data');
} catch (err) {
    throw new Error('Failed to load data', { cause: err });
}
```

---

## Reading the Cause

```javascript
try {
    try {
        JSON.parse('invalid json');
    } catch (err) {
        throw new Error('Config parsing failed', { cause: err });
    }
} catch (err) {
    console.log(err.message);   // "Config parsing failed"
    console.log(err.cause.message); // "Unexpected token i in JSON at position 0"
}
```

---

## Custom Error with Cause

```javascript
class DatabaseError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'DatabaseError';
    }
}

class ConnectionError extends DatabaseError {
    constructor(host, options) {
        super(`Cannot connect to ${host}`, options);
        this.name = 'ConnectionError';
        this.host = host;
    }
}

try {
    try {
        connectToDB();
    } catch (err) {
        throw new ConnectionError('db.example.com', { cause: err });
    }
} catch (err) {
    console.log(err.message);     // "Cannot connect to db.example.com"
    console.log(err.cause);       // original error
    console.log(err.host);        // "db.example.com"
}
```

---

## Without Cause (Pre-ES2022 Pattern)

```javascript
// Old way: manual chaining
function wrapError(original) {
    const wrapped = new Error('Something failed');
    wrapped.originalError = original;
    return wrapped;
}
```

---

## Next Steps

[Back to Chapter 12](12-freeze-seal.md): Object.freeze and Object.seal
[Proceed to Chapter 14](14-bigint.md): BigInt
