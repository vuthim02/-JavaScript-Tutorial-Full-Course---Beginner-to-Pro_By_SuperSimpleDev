# Chapter 3 — Routing

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Basic Routes

```javascript
app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'Alice' }]);
});

app.post('/users', (req, res) => {
    res.status(201).json(req.body);
});

app.put('/users/:id', (req, res) => {
    res.json({ id: req.params.id, ...req.body });
});

app.patch('/users/:id', (req, res) => {
    res.json({ updated: true });
});

app.delete('/users/:id', (req, res) => {
    res.status(204).send();
});
```

## Route Parameters

```javascript
// :param — required parameter
app.get('/users/:userId/posts/:postId', (req, res) => {
    console.log(req.params.userId);
    console.log(req.params.postId);
});

// Query parameters
app.get('/users', (req, res) => {
    console.log(req.query.page);
    console.log(req.query.limit);
    // GET /users?page=2&limit=20
});

// Optional parameter
app.get('/users/:id?', (req, res) => {
    if (req.params.id) {
        // Single user
    } else {
        // All users
    }
});

// Wildcard route
app.get('/*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});
```

## Route Matching Order

Routes are matched in the order they are registered:

```javascript
// Order matters!
app.get('/users/admin', (req, res) => {
    res.send('Admin panel');
});

app.get('/users/:id', (req, res) => {
    res.send(`User ${req.params.id}`);
});

app.get('/users/*', (req, res) => {
    res.status(404).send('Not found');
});
```

## Chained Routes

```javascript
app.route('/users/:id')
    .get((req, res) => { /* GET */ })
    .put((req, res) => { /* PUT */ })
    .patch((req, res) => { /* PATCH */ })
    .delete((req, res) => { /* DELETE */ });
```

## Modular Route Organization (Express Router)

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Users route:', req.method, req.url);
    next();
});

router.get('/', (req, res) => {
    res.json({ users: [] });
});

router.post('/', (req, res) => {
    res.status(201).json(req.body);
});

router.get('/:id', (req, res) => {
    res.json({ id: req.params.id });
});

module.exports = router;
```

```javascript
// app.js
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);
```

## Router Organization

```
routes/
├── index.js        ← Main router, aggregates others
├── users.js        ← /api/users/*
├── products.js     ← /api/products/*
├── orders.js       ← /api/orders/*
└── auth.js         ← /api/auth/*
```

```javascript
// routes/index.js
const router = require('express').Router();
router.use('/users', require('./users'));
router.use('/products', require('./products'));
module.exports = router;

// app.js
app.use('/api', require('./routes'));
```

## Router with Param Middleware

```javascript
router.param('id', (req, res, next, id) => {
    console.log('Loading user:', id);
    req.user = { id: Number(id), name: 'Alice' };
    next();
});

router.get('/:id', (req, res) => {
    res.json(req.user);
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Where is the input coming from? | `req.params` (path), `req.query` (URL), `req.body` (body), `req.headers` |
| Which route matches this URL? | First matching route — check order |
| Is route specific or parameterized? | `/users/admin` matches before `/users/:id` |
| Which router handles this path? | Trace `app.use('/prefix', router)` |
| Is param middleware used? | Look for `router.param('name', fn)` |
## Next Steps

[Back to Chapter 2](02-middleware-stack.md): Chapter 2 — The Middleware Stack
[Proceed to Chapter 4](04-mvc-architecture.md): Chapter 4 — MVC Architecture to learn about chapter 4 — mvc architecture.
