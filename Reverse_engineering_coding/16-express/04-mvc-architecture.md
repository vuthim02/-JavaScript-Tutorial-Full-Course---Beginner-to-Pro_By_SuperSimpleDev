# Chapter 4 — MVC Architecture

## The Pattern

```
Request → Controller (handles HTTP) → Model (data) → View (renders)
```

## Model

Represents data and business logic.

```javascript
// models/user.js
class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.createdAt = data.createdAt;
    }

    get displayName() {
        return this.name || this.email.split('@')[0];
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        };
    }
}

module.exports = User;
```

## View

Renders output. In API servers, views are often JSON or template engines like EJS/Pug.

```javascript
// views/user.ejs
<h1><%= user.name %></h1>
<p>Email: <%= user.email %></p>
```

```javascript
app.set('view engine', 'ejs');
app.get('/users/:id', (req, res) => {
    const user = getUser(req.params.id);
    res.render('user', { user });
});
```

## Controller

Handles HTTP requests and responses.

```javascript
// controllers/userController.js
const User = require('../models/User');
const userService = require('../services/userService');

exports.list = async (req, res, next) => {
    try {
        const users = await userService.getAll();
        res.json({ data: users.map(u => new User(u)) });
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const user = await userService.getById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Not found' });
        res.json({ data: new User(user) });
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const user = await userService.create(req.body);
        res.status(201).json({ data: new User(user) });
    } catch (err) {
        next(err);
    }
};
```

```javascript
// routes/users.js
const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.list);
router.post('/', userController.create);
router.get('/:id', userController.getById);

module.exports = router;
```

## MVC Flow Diagram

```
Browser                        Server
  │                              │
  │──── GET /users/5 ──────────►│  Router
  │                              │  ↓
  │                              │  userController.getById
  │                              │  ↓
  │                              │  userService.getById(5)
  │                              │  ↓
  │                              │  User.findByPk(5) (Model)
  │                              │  ↓
  │◄──── JSON Response ─────────│  Controller → res.json()
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which controller handles this? | Trace route → controller function |
| Which model is used? | Data representation |
| Is there a view? | Template rendering or JSON response |
## Next Steps

[Back to Chapter 3](03-routing.md): Chapter 3 — Routing
[Proceed to Chapter 5](05-service-repository-pattern.md): Chapter 5 — Controller → Service → Repository to learn about chapter 5 — controller → service → repository.
