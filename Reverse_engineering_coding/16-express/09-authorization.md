# Chapter 9 — Authorization

## Role-Based Access Control (RBAC)

```javascript
// middleware/authorize.js
function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: { code: 'UNAUTHORIZED', message: 'Authentication required' }
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: {
                    code: 'FORBIDDEN',
                    message: `Requires one of: ${allowedRoles.join(', ')}`
                }
            });
        }

        next();
    };
}

module.exports = authorize;
```

## Usage

```javascript
// Admin only
app.delete('/users/:id',
    authenticate,
    authorize('admin'),
    userController.delete
);

// Admin or moderator
app.put('/posts/:id',
    authenticate,
    authorize('admin', 'moderator'),
    postController.update
);

// Any authenticated user
app.get('/profile',
    authenticate,
    profileController.get
);

// Public (no auth)
app.post('/auth/login', authController.login);
```

## Permission-Based Authorization

```javascript
const permissions = {
    'read:users': ['admin', 'moderator', 'viewer'],
    'create:users': ['admin'],
    'delete:users': ['admin'],
    'read:reports': ['admin', 'moderator']
};

function authorizePermission(permission) {
    return (req, res, next) => {
        const userRole = req.user?.role;
        const allowedRoles = permissions[permission];

        if (!allowedRoles?.includes(userRole)) {
            return res.status(403).json({
                error: {
                    code: 'FORBIDDEN',
                    message: `Missing permission: ${permission}`
                }
            });
        }

        next();
    };
}

// Usage
app.delete('/users/:id',
    authenticate,
    authorizePermission('delete:users'),
    userController.delete
);
```

## Resource Ownership

```javascript
function authorizeOwner(options = {}) {
    const { model, paramName = 'id', idType = Number } = options;

    return async (req, res, next) => {
        const resourceId = idType(req.params[paramName]);
        const resource = await model.findById(resourceId);

        if (!resource) {
            return res.status(404).json({
                error: { code: 'NOT_FOUND', message: 'Resource not found' }
            });
        }

        // Admin can access any resource
        if (req.user.role === 'admin') {
            req.resource = resource;
            return next();
        }

        // Check ownership
        if (resource.userId !== req.user.id) {
            return res.status(403).json({
                error: { code: 'FORBIDDEN', message: 'You do not own this resource' }
            });
        }

        req.resource = resource;
        next();
    };
}

// User can only edit their own posts
app.put('/posts/:id',
    authenticate,
    authorizeOwner({ model: Post, paramName: 'id' }),
    postController.update
);
```

## Auth Middleware Order

```javascript
app.delete('/users/:id',
    authenticate,                              // 1. Who are you?
    authorize('admin'),                        // 2. What can you do?
    authorizeOwner({ model: User }),           // 3. Do you own this?
    userController.delete
);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Authentication in place? | Check for `authenticate` middleware |
| Authorization in place? | Check for `authorize` or role check after auth |
| Is it role-based or permission-based? | Roles: group check. Permissions: individual check |
| Is ownership checked? | Can user modify their own resource? |
## Next Steps

[Back to Chapter 8](08-authentication.md): Chapter 8 — Authentication
[Proceed to Chapter 10](10-cors-file-uploads.md): Chapter 10 — CORS to learn about chapter 10 — cors.
