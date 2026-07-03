# Chapter 14 — Consistent API Responses

## Standard Response Format

```json
// Success
{
    "data": { ... },
    "meta": {
        "page": 1,
        "limit": 20,
        "total": 150,
        "totalPages": 8
    }
}

// Error
{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid input",
        "details": [
            { "field": "email", "message": "Must be a valid email" }
        ]
    }
}
```

## Response Helpers

```javascript
class ApiResponse {
    static success(res, data, statusCode = 200, meta = null) {
        const response = { data };
        if (meta) response.meta = meta;
        return res.status(statusCode).json(response);
    }

    static created(res, data) {
        return this.success(res, data, 201);
    }

    static noContent(res) {
        return res.status(204).send();
    }

    static paginated(res, data, pagination) {
        return res.status(200).json({ data, meta: pagination });
    }
}

class UserController {
    async list(req, res, next) {
        try {
            const result = await userService.getAll(req.query);
            return ApiResponse.paginated(res, result.data, result.pagination);
        } catch (err) {
            next(err);
        }
    }
}
```

## Naming Conventions

| ✅ Good | ❌ Bad |
|---------|--------|
| `GET /users` | `GET /getAllUsers` |
| `GET /users/:id` | `GET /getUser?id=5` |
| `POST /users` | `POST /createNewUser` |
| `PATCH /users/:id` | `POST /updateUser` |
| `DELETE /users/:id` | `POST /removeUser` |

# Chapter 19 — Pagination

```javascript
function paginate(defaultLimit = 20, maxLimit = 100) {
    return (req, res, next) => {
        let page = parseInt(req.query.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || defaultLimit;

        if (page < 1) page = 1;
        if (limit < 1) limit = 1;
        if (limit > maxLimit) limit = maxLimit;

        const offset = (page - 1) * limit;
        req.pagination = { page, limit, offset };
        next();
    };
}

app.get('/users', paginate(20, 100), userController.list);

async list(req, res, next) {
    try {
        const { page, limit, offset } = req.pagination;
        const { rows, count } = await userRepository.findAndCount({ limit, offset });
        return ApiResponse.paginated(res, rows, {
            page, limit,
            total: count,
            totalPages: Math.ceil(count / limit)
        });
    } catch (err) {
        next(err);
    }
}
```

# Chapter 20 — API Versioning

## URL Versioning

```javascript
// routes/v1/users.js
router.get('/users', v1UserController.list);

// routes/v2/users.js
router.get('/users', v2UserController.list);

// app.js
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
```

## Versioning Middleware

```javascript
function apiVersion(version) {
    return (req, res, next) => {
        req.apiVersion = version;
        next();
    };
}

class UserController {
    async list(req, res, next) {
        try {
            const users = await userService.getAll();
            if (req.apiVersion === 1) {
                return ApiResponse.success(res,
                    users.map(u => ({ name: u.name, email: u.email }))
                );
            }
            return ApiResponse.success(res, users);
        } catch (err) {
            next(err);
        }
    }
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the format consistent? | Check response structure across all endpoints |
| Is pagination included? | Check `meta` in list responses |
| Are errors consistent? | Check error format: `{ error: { code, message } }` |
| Is the API versioned? | Check for `/v1/`, `/v2/` in URL paths |
## Next Steps

[Back to Chapter 13](13-security-configuration.md): Chapter 13 — Security Headers (Helmet)
[Proceed to Chapter 15](15-testing-documentation.md): Chapter 15 — Testing Express Applications to learn about chapter 15 — testing express applications.
