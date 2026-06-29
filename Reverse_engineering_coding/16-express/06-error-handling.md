# Chapter 6 — Centralized Error Handling

<img src="https://media.giphy.com/media/NSzHiAwAcazs7dcDr9/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The Problem

```javascript
// BAD: Inline error handling everywhere
app.get('/users/:id', async (req, res) => {
    try {
        const user = await findUser(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something broke' });
    }
});
// Every route repeats the same pattern
```

## Custom Error Class

```javascript
// errors/AppError.js
class AppError extends Error {
    constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 404, 'NOT_FOUND');
    }
}

class ValidationError extends AppError {
    constructor(message = 'Validation failed') {
        super(message, 400, 'VALIDATION_ERROR');
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401, 'UNAUTHORIZED');
    }
}

module.exports = { AppError, NotFoundError, ValidationError, UnauthorizedError };
```

## Error Middleware

```javascript
// middleware/errorHandler.js
const { AppError } = require('../errors/AppError');
const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
    logger.error({
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip
    });

    if (err.name === 'ValidationError') {
        err = new AppError(err.message, 400, 'VALIDATION_ERROR');
    }
    if (err.code === '23505') {
        err = new AppError('Duplicate entry', 409, 'DUPLICATE');
    }
    if (err.name === 'JsonWebTokenError') {
        err = new AppError('Invalid token', 401, 'INVALID_TOKEN');
    }
    if (err.name === 'TokenExpiredError') {
        err = new AppError('Token expired', 401, 'TOKEN_EXPIRED');
    }

    const statusCode = err.statusCode || 500;
    const code = err.code || 'INTERNAL_ERROR';
    const message = err.isOperational
        ? err.message
        : 'Internal server error';

    res.status(statusCode).json({
        error: {
            code,
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
}

module.exports = errorHandler;
```

## Async Handler Wrapper

```javascript
// utils/asyncHandler.js
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const getById = asyncHandler(async (req, res) => {
    const user = await userService.getById(req.params.id);
    res.json({ data: user });
});
```

## App Setup

```javascript
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const app = express();

app.use('/api', require('./routes'));
app.use(errorHandler); // MUST be last

app.use((req, res) => {
    res.status(404).json({
        error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.url} not found` }
    });
});
```

## Express 4 Async Problem

Express 4 does **not** catch promise rejections automatically:

```javascript
// THIS CRASHES THE PROCESS
app.get('/users', async (req, res) => {
    const users = await User.find(); // If this throws...
    res.json(users); // Never executes
});
```

## Solutions

```javascript
// Solution 1: Try/catch
app.get('/users', async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// Solution 2: asyncHandler wrapper
app.get('/users', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
}));

// Solution 3: Express 5 (alpha) — auto catches rejections
```

## Global Unhandled Rejection Handler

```javascript
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', reason);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Client error (4xx) or server error (5xx)? | 4xx: client fixable. 5xx: bug or infrastructure |
| Is error handling centralized? | Check for error middleware: `(err, req, res, next)` |
| Is async wrapped? | Look for `asyncHandler` or `catch(next)` |
| Are operational errors distinguished? | Check for `isOperational` flag |
## Next Steps

[Back to Chapter 5](05-service-repository-pattern.md): Chapter 5 — Controller → Service → Repository
[Proceed to Chapter 7](07-validation.md): Chapter 7 — Input Validation to learn about chapter 7 — input validation.
