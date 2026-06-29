# TypeScript with Node.js / Express

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Basic Express Server

```typescript
import express, { Request, Response, NextFunction } from "express";
import { User } from "./types";

const app = express();
app.use(express.json());

app.get("/api/users", (req: Request, res: Response) => {
    const users: User[] = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ];
    res.json(users);
});

app.post("/api/users", (req: Request, res: Response) => {
    const body: { name: string } = req.body;
    if (!body.name || typeof body.name !== "string") {
        res.status(400).json({ error: "Name is required" });
        return;
    }
    const newUser: User = { id: Date.now(), name: body.name };
    res.status(201).json(newUser);
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

## Typed Request Handlers

Express's `Request` type has 4 generic parameters: `Request<Params, ResBody, ReqBody, Query>`.

```typescript
import { Request, Response, NextFunction } from "express";

interface UserParams { id: string; }
interface UserQuery { sort?: "asc" | "desc"; limit?: string; }
interface UserBody { name: string; email: string; }

app.get(
    "/api/users/:id",
    (req: Request<UserParams, unknown, unknown, UserQuery>, res: Response) => {
        const userId = req.params.id;       // string
        const sortOrder = req.query.sort;   // "asc" | "desc" | undefined
    }
);

app.post(
    "/api/users",
    (req: Request<unknown, unknown, UserBody>, res: Response) => {
        const { name, email } = req.body; // typed as UserBody
    }
);
```

## Typed Middleware

Extend the Express `Request` type globally:

```typescript
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: { id: number; role: "admin" | "user"; };
        }
    }
}

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization;
    if (!token) { res.status(401).json({ error: "Unauthorized" }); return; }
    req.user = { id: 1, role: "admin" };
    next();
}

app.get("/api/protected", authMiddleware, (req: Request, res: Response) => {
    res.json({ user: req.user }); // req.user is typed
});
```

## Async Error Handling

```typescript
function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

interface ApiError { status: number; message: string; }

function errorHandler(err: ApiError, req: Request, res: Response, next: NextFunction): void {
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Internal Server Error" });
}

app.get("/api/users", asyncHandler(async (req: Request, res: Response) => {
    const users = await fetchUsersFromDatabase();
    res.json(users);
}));
app.use(errorHandler);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How are request params typed? | Using `Request<Params, ResBody, ReqBody, Query>` generics |
| How is the Request type extended? | Via `declare global { namespace Express { interface Request { ... } } }` |
| How are async errors caught? | Using a wrapper that forwards rejected promises to `next()` |
| What types come from Express? | `Request`, `Response`, `NextFunction`, `Router`, `Application` |
## Next Steps

[Back to Chapter 11](11-react.md): TypeScript with React
[Proceed to Chapter 13](13-module-resolution.md): Module Resolution and Path Aliases to learn about module resolution and path aliases.
