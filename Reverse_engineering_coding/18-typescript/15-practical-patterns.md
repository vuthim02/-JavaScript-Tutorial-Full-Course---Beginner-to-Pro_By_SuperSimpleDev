# Practical Patterns

<img src="https://media.giphy.com/media/MdA16VIoXKKxNE8Stk/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Pattern 1: Builder Pattern with Generics

```typescript
class QueryBuilder<T> {
    private filters: Partial<T> = {};
    private sortField?: keyof T;
    private sortOrder: "asc" | "desc" = "asc";
    private limitCount?: number;

    where<K extends keyof T>(field: K, value: T[K]): this {
        this.filters[field] = value;
        return this;
    }

    sortBy(field: keyof T, order: "asc" | "desc" = "asc"): this {
        this.sortField = field;
        this.sortOrder = order;
        return this;
    }

    limit(count: number): this {
        this.limitCount = count;
        return this;
    }

    build(): { filters: Partial<T>; sort: string; limit: number | undefined } {
        const sortField = this.sortField
            ? `${String(this.sortField)}:${this.sortOrder}`
            : "id:asc";
        return { filters: this.filters, sort: sortField, limit: this.limitCount };
    }
}

interface User { name: string; age: number; email: string; role: "admin" | "user"; }

const query = new QueryBuilder<User>()
    .where("role", "admin")
    .where("age", 25)
    .sortBy("name", "asc")
    .limit(10)
    .build();
```

## Pattern 2: Result Type for Error Handling

```typescript
type Result<T, E = Error> =
    | { success: true; data: T }
    | { success: false; error: E };

function safeParse<T>(json: string): Result<T> {
    try {
        const data = JSON.parse(json);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error : new Error(String(error)) };
    }
}

const result = safeParse<{ name: string }>('{"name": "Alice"}');

if (result.success) {
    console.log(result.data.name); // narrowed — data available
} else {
    console.error(result.error.message); // narrowed — error available
}
```

## Pattern 3: Branded Types

Prevent mixing up similar primitive types:

```typescript
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

function getUser(id: UserId): void { console.log(`Getting user ${id}`); }
function getProduct(id: ProductId): void { console.log(`Getting product ${id}`); }

const userId = "user_123" as UserId;
const productId = "prod_456" as ProductId;

getUser(userId);          // ok
getProduct(productId);    // ok
getUser(productId);       // Error: ProductId not assignable to UserId
```

## Pattern 4: Deep Partial

```typescript
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface Config {
    server: { host: string; port: number; };
    database: { url: string; pool: { min: number; max: number; }; };
}

function mergeConfig(base: Config, override: DeepPartial<Config>): Config {
    return {
        server: { ...base.server, ...override.server },
        database: {
            ...base.database,
            ...override.database,
            pool: { ...base.database.pool, ...override.database?.pool }
        }
    };
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is a branded type used? | Check for `& { __brand: ... }` |
| Is the Result pattern used? | Check for `{ success: true; data: T } \| { success: false; error: E }` |
| Is a builder pattern used? | Check for method chaining returning `this` |
## Next Steps

[Back to Chapter 14](14-migration.md): Migration Strategy: Adding TypeScript to an Existing JS Project
[Proceed to Chapter 16](16-pitfalls.md): Common Pitfalls and Best Practices to learn about common pitfalls and best practices.
