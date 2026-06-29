# TypeScript with Node, Express & Prisma — Types All the Way Down

---

## 1. Why TypeScript?

TypeScript adds **types** to JavaScript. Types catch bugs before they reach production.

```js
// JavaScript — discovers bug at runtime
function getItem(id) {
  return items.find(i => i.id === id);
}
getItem('abc');  // ← silently returns undefined, no error
```

```ts
// TypeScript — discovers bug at compile time
function getItem(id: number): Item | undefined {
  return items.find(i => i.id === id);
}
getItem('abc');  // ← TS Error: Argument of type 'string' not assignable to 'number'
```

**What TypeScript gives you:**
- Catch bugs during development (not in production)
- Autocomplete in your editor (ctrl+space on any variable)
- Self-documenting code (types = documentation that can't go stale)
- Refactor with confidence (rename a field, TS tells you every place it's used)

---

## 2. Setup

```bash
npm install --save-dev typescript ts-node @types/node @types/express
npx tsc --init
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

```json
// package.json scripts
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "ts-node-dev --respawn src/server.ts",
    "typecheck": "tsc --noEmit"
  }
}
```

```bash
npm install --save-dev ts-node-dev  # like nodemon but for TS
```

---

## 3. Project Structure

```
src/
├── server.ts              # entry point
├── app.ts                 # Express app setup
├── db.ts                  # Prisma client
├── routes/
│   └── items.ts
├── middleware/
│   ├── auth.ts
│   └── errorHandler.ts
├── services/
│   └── itemService.ts
├── types/
│   └── index.ts
└── utils/
    └── validation.ts
```

---

## 4. Typing Express

### Basic types

```ts
import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});
```

### Typed request params, query, body

```ts
import { Request, Response } from 'express';

// Route params
interface Params {
  id: string;
}

// Query string
interface Query {
  completed?: string;
  page?: string;
  perPage?: string;
}

// Request body
interface Body {
  name: string;
  completed?: boolean;
}

// Use generics: Request<Params, ResBody, ReqBody, Query>
app.get('/api/items/:id', (
  req: Request<Params, {}, {}, Query>,
  res: Response
) => {
  const id = parseInt(req.params.id);  // req.params.id: string ✓
  const completed = req.query.completed; // typed as string | undefined ✓
});

app.post('/api/items', (
  req: Request<{}, {}, Body>,
  res: Response
) => {
  req.body.name;       // typed as string ✓
  req.body.completed;  // typed as boolean | undefined ✓
});
```

### Augment Express Request (for custom properties)

```ts
// types/index.ts
import { Request } from 'express';

export interface AuthPayload {
  userId: number;
  role: string;
}

// Tell Express about req.user
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
      id?: string;
    }
  }
}
```

Now `req.user` is typed everywhere without casting:

```ts
// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../types';

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// route
app.get('/api/profile', auth, (req: Request, res: Response) => {
  req.user.userId;  // typed as number ✓
});
```

---

## 5. Typed Async Handler

Create a wrapper that preserves types:

```ts
// utils/asyncHandler.ts
import { Request, Response, NextFunction } from 'express';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function asyncHandler(fn: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
```

```ts
// routes/items.ts
import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/items', asyncHandler(async (req: Request, res: Response) => {
  const items = await prisma.item.findMany();
  res.json(items);
}));

router.post('/items', asyncHandler(async (req: Request, res: Response) => {
  const item = await prisma.item.create({
    data: { name: req.body.name, userId: req.user!.userId },
  });
  res.status(201).json(item);
}));
```

---

## 6. Prisma + TypeScript

Prisma generates types **automatically** from your schema:

```prisma
model Item {
  id        Int      @id @default(autoincrement())
  name      String
  completed Boolean  @default(false)
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

After running `npx prisma generate`, you get:

```ts
import { PrismaClient, Item, User } from '@prisma/client';

const prisma = new PrismaClient();

// Item is a fully typed model:
// { id: number; name: string; completed: boolean; userId: number; ... }

async function getItems(): Promise<Item[]> {
  return prisma.item.findMany();
}

// Create with typed input
const item: Item = await prisma.item.create({
  data: {
    name: 'Buy milk',
    userId: 1,
    // TS error if you miss required fields ✓
    // TS error if you typo a field name ✓
  },
});
```

### Custom return types with Prisma

```ts
// Select specific fields
const items = await prisma.item.findMany({
  select: {
    id: true,
    name: true,
    user: {
      select: { name: true },
    },
  },
});
// typeof items: { id: number; name: string; user: { name: string } }[]
```

### Reuse Prisma types

```ts
import { Item, Prisma } from '@prisma/client';

// Type for creating an item
type CreateItemInput = Prisma.ItemCreateInput;
// { name: string; completed?: boolean; user: { connect: { id: number } } }

// Type for updating
type UpdateItemInput = Prisma.ItemUpdateInput;

// Response type for a specific query
type ItemWithUser = Prisma.ItemGetPayload<{
  include: { user: { select: { id: true; name: true } } }
}>;
```

---

## 7. Typed Error Handling

```ts
// types/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
```

```ts
// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/errors';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
}
```

---

## 8. Environment Variables Typed

```ts
// config.ts
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

export const config = {
  port: parseInt(process.env.PORT || '3000'),
  databaseUrl: requireEnv('DATABASE_URL'),
  jwtSecret: requireEnv('JWT_SECRET'),
  isProduction: process.env.NODE_ENV === 'production',
  corsOrigin: process.env.CORS_ORIGIN || '*',
} as const;

// config.port        → number
// config.databaseUrl → string
// config.isProduction → boolean
```

---

## 9. Validation with Zod (TypeScript-First)

Zod validates and infers types in one step.

```bash
npm install zod
```

```ts
import { z } from 'zod';

// Define schema → type is inferred
const createItemSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  completed: z.boolean().optional(),
  priority: z.number().min(1).max(5).optional(),
});

// Inferred type:
type CreateItemInput = z.infer<typeof createItemSchema>;
// { name: string; completed?: boolean; priority?: number }
```

### Middleware

```ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);  // replaces with parsed (and trimmed!) data
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: err.errors.map(e => `${e.path}: ${e.message}`),
        });
      }
      next(err);
    }
  };
}

// Route
router.post('/items',
  validate(createItemSchema),
  asyncHandler(async (req: Request, res: Response) => {
    // req.body is now typed as CreateItemInput ✓
    const item = await prisma.item.create({
      data: { name: req.body.name, userId: req.user!.userId },
    });
    res.status(201).json(item);
  })
);
```

---

## 10. Full Typed Route Example

```ts
// src/routes/items.ts
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate';
import { auth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// --- Validation schemas ---
const createItemSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  completed: z.boolean().optional(),
});

const updateItemSchema = z.object({
  name: z.string().min(1).max(200).trim().optional(),
  completed: z.boolean().optional(),
});

const querySchema = z.object({
  completed: z.enum(['true', 'false']).optional(),
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).max(100).default(20),
});

// --- Routes ---
router.get('/items',
  auth,
  validate(querySchema),
  asyncHandler(async (req: Request, res: Response) => {
    const { completed, page, perPage } = req.query as any;
    const where: any = { userId: req.user!.userId };
    if (completed !== undefined) where.completed = completed === 'true';

    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.item.count({ where }),
    ]);

    res.json({
      data: items,
      total,
      page: +page,
      perPage: +perPage,
      totalPages: Math.ceil(total / perPage),
    });
  })
);

router.post('/items',
  auth,
  validate(createItemSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const item = await prisma.item.create({
      data: { name: req.body.name, userId: req.user!.userId },
    });
    res.status(201).json(item);
  })
);

router.get('/items/:id',
  auth,
  asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  })
);

router.patch('/items/:id',
  auth,
  validate(updateItemSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const item = await prisma.item.update({
      where: { id },
      data: req.body,
    });
    res.json(item);
  })
);

router.delete('/items/:id',
  auth,
  asyncHandler(async (req: Request, res: Response) => {
    await prisma.item.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  })
);

export default router;
```

---

## 11. Compilation & Running

```bash
# Development (auto-restart on changes)
npm run dev

# Type-check only (no output)
npm run typecheck

# Build for production
npm run build
# Output goes to dist/
# dist/server.js → run with: node dist/server.js

# Production start
npm start
```

### Docker with TypeScript

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
COPY src/ ./src/
RUN npm ci && npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

---

## 12. Quick Reference

| Concept | Key Point |
|---|---|
| `tsc` | TypeScript compiler — converts .ts to .js |
| `tsconfig.json` | Compiler settings (`strict: true` is essential) |
| `Request<Params, _, Body, Query>` | Type params for Express request |
| `declare global { namespace Express { interface Request { user?: X } } }` | Augment Express types |
| `as const` | Make an object literal deeply readonly/inferred |
| `z.infer<typeof schema>` | Extract TypeScript type from Zod schema |
| `@prisma/client` | Auto-generated types from your schema |
| `Prisma.ItemGetPayload<...>` | Extract return type of a specific Prisma query |
| `ts-node-dev` | Nodemon for TypeScript (restart on .ts changes) |
| `tsc --noEmit` | Type-check without producing output files |

---

*Last updated: June 2026*
