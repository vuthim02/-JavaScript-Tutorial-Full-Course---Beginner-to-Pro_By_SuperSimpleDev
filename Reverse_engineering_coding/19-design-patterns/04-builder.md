# Builder Pattern

## What Problem It Solves

Some objects require many configuration steps. A constructor with 15 parameters is unreadable and error-prone. The Builder separates construction from representation.

## Implementation

```javascript
class Pizza {
    constructor() {
        this.size = "medium";
        this.cheese = false;
        this.pepperoni = false;
        this.mushrooms = false;
        this.olives = false;
    }

    describe() {
        const toppings = [];
        if (this.cheese) toppings.push("cheese");
        if (this.pepperoni) toppings.push("pepperoni");
        if (this.mushrooms) toppings.push("mushrooms");
        if (this.olives) toppings.push("olives");
        return `${this.size} pizza with ${toppings.join(", ")}`;
    }
}

class PizzaBuilder {
    constructor() { this.pizza = new Pizza(); }

    setSize(size) { this.pizza.size = size; return this; }
    addCheese() { this.pizza.cheese = true; return this; }
    addPepperoni() { this.pizza.pepperoni = true; return this; }
    addMushrooms() { this.pizza.mushrooms = true; return this; }
    addOlives() { this.pizza.olives = true; return this; }

    build() { return this.pizza; }
}

const pizza = new PizzaBuilder()
    .setSize("large")
    .addCheese()
    .addPepperoni()
    .addMushrooms()
    .build();

console.log(pizza.describe());
// "large pizza with cheese, pepperoni, mushrooms"
```

### Builder with Director

A director orchestrates the building steps for common configurations:

```javascript
class PizzaDirector {
    static makeMargherita() {
        return new PizzaBuilder().setSize("medium").addCheese().build();
    }

    static makePepperoniLovers() {
        return new PizzaBuilder().setSize("large").addCheese().addPepperoni().build();
    }
}

const margherita = PizzaDirector.makeMargherita();
```

## Real-World Use Case

HTTP request builders (Axios, Fetch wrappers), ORM query builders (Knex, Prisma), and URL builders use the Builder pattern.

```javascript
class QueryBuilder {
    constructor(table) {
        this._table = table;
        this._where = [];
        this._orderBy = null;
        this._limit = null;
        this._select = ["*"];
    }

    select(...fields) { this._select = fields; return this; }
    where(column, operator, value) { this._where.push({ column, operator, value }); return this; }
    orderBy(column, direction = "ASC") { this._orderBy = { column, direction }; return this; }
    limit(n) { this._limit = n; return this; }

    build() {
        let sql = `SELECT ${this._select.join(", ")} FROM ${this._table}`;
        if (this._where.length > 0) {
            const conditions = this._where.map(
                w => `${w.column} ${w.operator} ${typeof w.value === "string" ? `'${w.value}'` : w.value}`
            );
            sql += ` WHERE ${conditions.join(" AND ")}`;
        }
        if (this._orderBy) sql += ` ORDER BY ${this._orderBy.column} ${this._orderBy.direction}`;
        if (this._limit !== null) sql += ` LIMIT ${this._limit}`;
        return sql;
    }
}

const query = new QueryBuilder("users")
    .select("id", "name", "email")
    .where("age", ">", 18)
    .orderBy("name")
    .limit(10)
    .build();
// "SELECT id, name, email FROM users WHERE age > 18 ORDER BY name ASC LIMIT 10"
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | What is the difference between a Builder and a Factory? |
| 2 | How does method chaining (fluent interface) relate to Builder? |
| 3 | Why does the Builder pattern work well for constructing immutable objects? |
| 4 | When would using a Director be over-engineering? |
## Next Steps

[Back to Chapter 3](03-factory.md): Factory Method Pattern
[Proceed to Chapter 5](05-prototype.md): Prototype Pattern to learn about prototype pattern.
