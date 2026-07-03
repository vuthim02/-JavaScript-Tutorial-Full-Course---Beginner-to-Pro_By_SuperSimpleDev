# Chapter 5 — Controller → Service → Repository

Senior engineers organize code into clear layers.

## The Layers

```
┌─────────────────────────────────────┐
│         Controller Layer            │ ← HTTP concerns only
│   Parses request, calls service,    │
│   sends response                    │
├─────────────────────────────────────┤
│          Service Layer              │ ← Business logic
│   Orchestration, validation,        │
│   business rules, transactions      │
├─────────────────────────────────────┤
│        Repository Layer             │ ← Data access
│   Database queries, caching,        │
│   data transformation               │
├─────────────────────────────────────┤
│         Database                    │
└─────────────────────────────────────┘
```

## Repository Layer

```javascript
// repositories/userRepository.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserRepository {
    async findAll(filters = {}) {
        return prisma.user.findMany({ where: filters, include: { posts: true } });
    }

    async findById(id) {
        return prisma.user.findUnique({ where: { id }, include: { posts: true } });
    }

    async create(data) {
        return prisma.user.create({ data });
    }

    async update(id, data) {
        return prisma.user.update({ where: { id }, data });
    }

    async delete(id) {
        return prisma.user.delete({ where: { id } });
    }

    async findByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
}

module.exports = new UserRepository();
```

## Service Layer

```javascript
// services/userService.js
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const AppError = require('../errors/AppError');

class UserService {
    async getAll() {
        return userRepository.findAll();
    }

    async getById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return user;
    }

    async create(data) {
        if (!data.email) {
            throw new AppError('Email is required', 400);
        }
        const existing = await userRepository.findByEmail(data.email);
        if (existing) {
            throw new AppError('Email already in use', 409);
        }
        const hashedPassword = await bcrypt.hash(data.password, 12);
        return userRepository.create({
            ...data,
            password: hashedPassword
        });
    }

    async update(id, data) {
        const allowed = ['name', 'email'];
        const filtered = {};
        for (const key of allowed) {
            if (data[key] !== undefined) {
                filtered[key] = data[key];
            }
        }
        return userRepository.update(id, filtered);
    }

    async delete(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return userRepository.delete(id);
    }
}

module.exports = new UserService();
```

## Controller Layer

```javascript
// controllers/userController.js
const userService = require('../services/userService');

class UserController {
    async list(req, res, next) {
        try {
            const users = await userService.getAll();
            res.json({ data: users });
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const user = await userService.getById(Number(req.params.id));
            res.json({ data: user });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const user = await userService.create(req.body);
            res.status(201).json({ data: user });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await userService.delete(Number(req.params.id));
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();
```

## Directory Structure

```
src/
├── controllers/       ← HTTP handlers
├── services/          ← Business logic
├── repositories/      ← Data access
├── middleware/        ← Express middleware
├── routes/           ← Route definitions
├── errors/           ← Custom error classes
├── utils/           ← Helpers
├── config/          ← Configuration
└── app.js          ← Express setup
```

## Benefits

| Benefit | Explanation |
|---------|-------------|
| **Testability** | Each layer can be tested independently |
| **Separation of concerns** | HTTP logic doesn't mix with business logic |
| **Maintainability** | Clear boundaries, easier to change one layer |
| **Reusability** | Services can be used by multiple controllers |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Business logic belongs where? | Service layer |
| Database logic belongs where? | Repository layer |
| HTTP logic belongs where? | Controller layer |
| Is there layering? | Check directory structure |
## Next Steps

[Back to Chapter 4](04-mvc-architecture.md): Chapter 4 — MVC Architecture
[Proceed to Chapter 6](06-error-handling.md): Chapter 6 — Centralized Error Handling to learn about chapter 6 — centralized error handling.
