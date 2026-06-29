# Project: Full TypeScript API with Type-Safe Patterns

<img src="https://media.giphy.com/media/wcgn5fVDjvR7pdvz4C/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


```typescript
import express, { Request, Response, NextFunction } from "express";
import { readFile, writeFile } from "fs/promises";

// ─── Domain Types ───
interface Todo {
    readonly id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
}

type CreateTodoInput = Pick<Todo, "text">;
type UpdateTodoInput = Partial<Pick<Todo, "text" | "completed">>;

type ApiResponse<T> = { success: true; data: T } | { success: false; error: string };

// ─── Repository ───
class TodoRepository {
    #todos: Todo[] = [];
    #nextId = 1;
    #filePath: string;

    constructor(filePath: string) { this.#filePath = filePath; }

    async load(): Promise<void> {
        try {
            const data = await readFile(this.#filePath, "utf-8");
            this.#todos = JSON.parse(data);
            this.#nextId = Math.max(...this.#todos.map(t => t.id), 0) + 1;
        } catch { this.#todos = []; }
    }

    async save(): Promise<void> {
        await writeFile(this.#filePath, JSON.stringify(this.#todos, null, 2));
    }

    getAll(): Todo[] { return [...this.#todos]; }
    getById(id: number): Todo | undefined { return this.#todos.find(t => t.id === id); }

    create(input: CreateTodoInput): Todo {
        const todo: Todo = {
            id: this.#nextId++, text: input.text,
            completed: false, createdAt: new Date()
        };
        this.#todos.push(todo);
        return todo;
    }

    update(id: number, input: UpdateTodoInput): Todo | undefined {
        const index = this.#todos.findIndex(t => t.id === id);
        if (index === -1) return undefined;
        this.#todos[index] = { ...this.#todos[index], ...input };
        return this.#todos[index];
    }

    delete(id: number): boolean {
        const index = this.#todos.findIndex(t => t.id === id);
        if (index === -1) return false;
        this.#todos.splice(index, 1);
        return true;
    }
}

// ─── Middleware ───
function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

function validateBody<T>(schema: (data: unknown) => data is T) {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!schema(req.body)) {
            res.status(400).json({ success: false, error: "Invalid request body" });
            return;
        }
        next();
    };
}

// ─── Validators ───
function isCreateTodoInput(data: unknown): data is CreateTodoInput {
    return (
        typeof data === "object" && data !== null &&
        typeof (data as CreateTodoInput).text === "string" &&
        (data as CreateTodoInput).text.trim().length > 0
    );
}

function isUpdateTodoInput(data: unknown): data is UpdateTodoInput {
    if (typeof data !== "object" || data === null) return false;
    const input = data as UpdateTodoInput;
    if (input.text !== undefined && (typeof input.text !== "string" || input.text.trim().length === 0)) return false;
    if (input.completed !== undefined && typeof input.completed !== "boolean") return false;
    return true;
}

// ─── Server ───
async function main(): Promise<void> {
    const repo = new TodoRepository("./todos.json");
    await repo.load();
    const app = express();
    app.use(express.json());

    app.get("/todos", (_req: Request, res: Response) => {
        const response: ApiResponse<Todo[]> = { success: true, data: repo.getAll() };
        res.json(response);
    });

    app.get("/todos/:id", (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) { res.status(400).json({ success: false, error: "Invalid ID" }); return; }
        const todo = repo.getById(id);
        if (!todo) { res.status(404).json({ success: false, error: "Todo not found" }); return; }
        res.json({ success: true, data: todo } satisfies ApiResponse<Todo>);
    });

    app.post("/todos",
        validateBody(isCreateTodoInput),
        asyncHandler(async (req: Request, res: Response) => {
            const todo = repo.create(req.body as CreateTodoInput);
            await repo.save();
            res.status(201).json({ success: true, data: todo } satisfies ApiResponse<Todo>);
        })
    );

    app.patch("/todos/:id",
        validateBody(isUpdateTodoInput),
        asyncHandler(async (req: Request, res: Response) => {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) { res.status(400).json({ success: false, error: "Invalid ID" }); return; }
            const todo = repo.update(id, req.body as UpdateTodoInput);
            if (!todo) { res.status(404).json({ success: false, error: "Todo not found" }); return; }
            await repo.save();
            res.json({ success: true, data: todo } satisfies ApiResponse<Todo>);
        })
    );

    app.delete("/todos/:id",
        asyncHandler(async (req: Request, res: Response) => {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) { res.status(400).json({ success: false, error: "Invalid ID" }); return; }
            const deleted = repo.delete(id);
            if (!deleted) { res.status(404).json({ success: false, error: "Todo not found" }); return; }
            await repo.save();
            res.json({ success: true, data: null } satisfies ApiResponse<null>);
        })
    );

    app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" } satisfies ApiResponse<never>);
    });

    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
}
main().catch(console.error);
```

---

# TypeScript Ecosystem Summary

```
                    TYPESCRIPT ECOSYSTEM MAP

  Language Features         Tooling             Ecosystem
  ┌──────────────────┐  ┌──────────────┐  ┌────────────────────┐
  │ Types            │  │ tsc (CLI)    │  │ DefinitelyTyped    │
  │ Interfaces       │  │ ts-node      │  │  (npm @types/*)   │
  │ Generics         │  │ tsx          │  │                    │
  │ Enums            │  │ ts-jest      │  │  Frameworks:       │
  │ Utility Types    │  │ ESLint + TS  │  │  React, Next.js    │
  │ Declaration files│  │ Prettier     │  │  Express, Nest.js  │
  │ Path Aliases     │  │ tsconfig     │  │  Prisma, Drizzle   │
  └──────────────────┘  └──────────────┘  │  Zod, Valibot      │
                                           └────────────────────┘
```

# Final Summary Table

| Concept | Key Takeaway |
|---------|--------------|
| Static types | Types exist at compile time only — zero runtime cost |
| Strict mode | Always enable `"strict": true` for maximum safety |
| Interfaces vs Types | Interfaces for objects (extensible). Types for unions/intersections |
| Generics | Preserve type information across reusable code |
| Utility types | `Partial`, `Pick`, `Omit`, `Record`, `ReturnType` solve common patterns |
| Discriminated unions | Model states explicitly — makes impossible states impossible |
| Type narrowing | `typeof`, `instanceof`, discriminated unions, type predicates |
| `unknown` over `any` | Forces type checking before use — safer |
| Declaration files | `.d.ts` files describe JS to TypeScript |
| Migration | Start permissive, enable strict gradually, rename files incrementally |
## Next Steps

[Back to Chapter 16](16-pitfalls.md): Common Pitfalls and Best Practices
[Proceed to Module 19](../19-design-patterns/README.md): Design Patterns in JavaScript to learn about design patterns in JavaScript.
