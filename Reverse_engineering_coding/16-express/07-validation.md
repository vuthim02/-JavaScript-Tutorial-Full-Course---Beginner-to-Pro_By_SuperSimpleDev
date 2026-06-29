# Chapter 7 — Input Validation

<img src="https://media.giphy.com/media/yYSSBtDgbbRzq/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Why Validate

```javascript
// Without validation — dangerous
app.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    // If req.body is {} — garbage data
    // If req.body contains { role: 'admin' } — privilege escalation
    // If req.body.name is 10000 characters — memory spike
    res.json(user);
});
```

## Zod Validation

```javascript
const { z } = require('zod');

const createUserSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(128),
    age: z.number().int().positive().optional()
});

function validate(schema) {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err) {
            const errors = err.errors.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }));
            res.status(400).json({
                error: { code: 'VALIDATION_ERROR', details: errors }
            });
        }
    };
}

app.post('/users',
    validate(createUserSchema),
    userController.create
);
```

## Joi Validation

```javascript
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required(),
    age: Joi.number().integer().positive()
});

function validate(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(d => ({
                field: d.path.join('.'),
                message: d.message
            }));
            return res.status(400).json({
                error: { code: 'VALIDATION_ERROR', details: errors }
            });
        }

        req.body = value; // Use validated values
        next();
    };
}
```

## Common Validation Rules

```javascript
const userSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain uppercase')
        .regex(/[0-9]/, 'Must contain number'),
    age: z.number().int().positive().max(150),
    role: z.enum(['user', 'admin', 'moderator']),
    status: z.enum(['active', 'inactive']).default('active'),
    address: z.object({
        city: z.string(),
        country: z.string()
    }).optional(),
    tags: z.array(z.string()).max(5)
});
```

## Query and Params Validation

```javascript
const querySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    sort: z.enum(['name', 'createdAt', 'email']).default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc')
});

function validateQuery(schema) {
    return (req, res, next) => {
        try {
            req.query = schema.parse(req.query);
            next();
        } catch (err) {
            res.status(400).json({
                error: { code: 'VALIDATION_ERROR', details: err.errors }
            });
        }
    };
}

app.get('/users',
    validateQuery(querySchema),
    userController.list
);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Has user input been validated? | Look for `schema.parse()`, `.validate()`, or validation middleware |
| Where is validation? | Route level (middleware) or service level |
| Are types coerced? | `z.coerce.number()` for query params (always strings) |
| Is unknown data stripped? | Look for `stripUnknown: true` |
## Next Steps

[Back to Chapter 6](06-error-handling.md): Chapter 6 — Centralized Error Handling
[Proceed to Chapter 8](08-authentication.md): Chapter 8 — Authentication to learn about chapter 8 — authentication.
