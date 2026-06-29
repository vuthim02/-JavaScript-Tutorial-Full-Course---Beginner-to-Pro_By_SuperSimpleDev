# Chapter 21 — Testing Express Applications

<img src="https://media.giphy.com/media/UcK7JalnjCz0k/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Unit Testing Services

```javascript
const { UserService } = require('./userService');

const mockRepo = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn()
};

const userService = new UserService(mockRepo);

test('getAll returns users from repository', async () => {
    const expected = [{ id: 1, name: 'Alice' }];
    mockRepo.findAll.mockResolvedValue(expected);

    const result = await userService.getAll();

    expect(result).toEqual(expected);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
});

test('getById throws NotFoundError for missing user', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(userService.getById(999))
        .rejects
        .toThrow('User not found');
});
```

## Integration Testing Endpoints

```javascript
const request = require('supertest');
const app = require('../app');

describe('GET /api/users', () => {
    test('returns 200 with users list', async () => {
        const res = await request(app)
            .get('/api/users')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('returns 401 without auth token', async () => {
        const res = await request(app)
            .get('/api/users/me')
            .expect(401);

        expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    test('returns 403 for insufficient role', async () => {
        const token = generateToken({ role: 'viewer' });

        const res = await request(app)
            .delete('/api/users/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(403);

        expect(res.body.error.code).toBe('FORBIDDEN');
    });
});
```

## Test Database Setup

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

beforeEach(async () => {
    await prisma.user.deleteMany();
    await prisma.post.deleteMany();
});

afterAll(async () => {
    await prisma.$disconnect();
});
```

# Chapter 22 — OpenAPI / Swagger

```javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation'
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Development' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./routes/*.js', './controllers/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

## JSDoc Annotations

```javascript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get('/users', authenticate, userController.list);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Are there tests? | Check for `test/` directory, `jest`, `supertest` |
| What is tested? | Unit (services) or integration (endpoints) |
| Is the API documented? | Check for Swagger/OpenAPI setup |
| Where is the docs UI? | Usually at `/api-docs` |
## Next Steps

[Back to Chapter 14](14-api-design-pagination-versioning.md): Chapter 18 — Consistent API Responses
[Proceed to Chapter 16](16-observability-dependency-injection.md): Chapter 23 — Observability: Logs, Metrics, Traces to learn about chapter 23 — observability: logs, metrics, traces.
