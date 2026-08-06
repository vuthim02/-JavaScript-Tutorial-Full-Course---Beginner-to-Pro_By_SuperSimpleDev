# GraphQL — Deep Dive

## 1. What is GraphQL?

GraphQL is a **query language** for APIs and a **runtime** for executing those queries. Developed by Meta in 2012, open-sourced in 2015.

### GraphQL vs REST

```mermaid
graph LR
    subgraph REST
        A1[Client] --> B1[GET /users]
        A1 --> C1[GET /users/1/posts]
        A1 --> D1[GET /users/1/posts/3/comments]
    end

    subgraph GraphQL
        A2[Client] --> E1[POST /graphql]
        E1 --> F1["query { user(id:1) { posts(id:3) { comments } } }"]
    end
```

| Feature | REST | GraphQL |
|---------|------|---------|
| Data fetching | Multiple endpoints | Single endpoint |
| Over/under-fetching | Common | Client decides |
| Response shape | Server-defined | Client-defined |
| Versioning | /v1/, /v2/ | Evolve schema |

---

## 2. Core Concepts

```mermaid
graph TD
    subgraph "GraphQL API"
        S[Schema] --> T[Types]
        S --> Q[Query]
        S --> M[Mutation]
        S --> Sub[Subscription]
        T --> R[Resolvers]
        R --> DB[(Database)]
        R --> API[External API]
    end
```

### Schema

The **schema** defines the shape of your data and operations. Written in SDL (Schema Definition Language).

### Types

Every field in GraphQL has a type. Built-in scalar types:

| Type     | Example          |
|----------|------------------|
| `String` | `"hello"`        |
| `Int`    | `42`             |
| `Float`  | `3.14`           |
| `Boolean`| `true`           |
| `ID`     | `"abc123"`       |

### Operations

| Operation      | Purpose                  | Analogy        |
|----------------|--------------------------|----------------|
| **Query**      | Read data                | GET            |
| **Mutation**   | Write data               | POST/PUT/DELETE|
| **Subscription** | Real-time data stream  | WebSocket      |

---

## 3. Schema Definition Language (SDL)

### Defining Types

```graphql
type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
}

type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
}
```

> `!` means **non-nullable** — the field will always return a value.

### The Query Type

```graphql
type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
}
```

### The Mutation Type

```graphql
type Mutation {
    createUser(name: String!, email: String!): User!
    deleteUser(id: ID!): Boolean!
}
```

### The Subscription Type

```graphql
type Subscription {
    userCreated: User!
    postAdded(postId: ID!): Post
}
```

---

## 4. Queries in Action

### Basic Query

```graphql
query GetUsers {
    users {
        id
        name
        email
    }
}
```

Response:

```json
{
    "data": {
        "users": [
            { "id": "1", "name": "Alice", "email": "alice@example.com" },
            { "id": "2", "name": "Bob", "email": "bob@example.com" }
        ]
    }
}
```

### Nested Query

```graphql
query GetUserWithPosts {
    user(id: "1") {
        name
        email
        posts {
            title
            content
        }
    }
}
```

### With Variables

```graphql
query GetUser($userId: ID!) {
    user(id: $userId) {
        name
        email
    }
}
```

Variables JSON:

```json
{
    "userId": "1"
}
```

### Query Flow Diagram

```mermaid
sequenceDiagram
    participant C as Client
    participant G as GraphQL Server
    participant R as Resolvers
    participant D as Database

    C->>G: POST /graphql<br/>{ query, variables }
    G->>G: Parse & Validate query<br/>against schema
    G->>R: Execute resolvers<br/>for each field
    R->>D: Fetch data
    D-->>R: Raw data
    R-->>G: Transformed data
    G-->>C: { "data": { ... } }
```

---

## 5. Mutations

### Mutation Example

```graphql
mutation CreateNewUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
        id
        name
        email
    }
}
```

### Mutation Flow Diagram

```mermaid
sequenceDiagram
    participant C as Client
    participant G as GraphQL Server
    participant R as Resolver
    participant D as Database

    C->>G: mutation { createUser(...) }
    G->>R: execute createUser resolver
    R->>D: INSERT INTO users ...
    D-->>R: new user row
    R-->>G: { id, name, email }
    G-->>C: { "data": { "createUser": {...} } }
```

---

## 6. Subscriptions

Real-time connection (usually over WebSocket):

```graphql
subscription OnUserCreated {
    userCreated {
        id
        name
        email
    }
}
```

```mermaid
sequenceDiagram
    participant C as Client
    participant G as GraphQL Server
    participant E as Event Source
    participant D as Database

    C->>G: subscription { userCreated }
    Note over C,G: WebSocket connection
    G->>E: Subscribe to event
    D-->>E: new user inserted
    E-->>G: trigger userCreated
    G-->>C: { "data": { "userCreated": {...} } }
```

---

## 7. Resolvers

Resolvers are functions that return data for each field.

```javascript
const resolvers = {
    Query: {
        users: () => db.getAllUsers(),
        user: (_, { id }) => db.getUserById(id),
    },
    User: {
        posts: (parent) => db.getPostsByUser(parent.id),
    },
    Mutation: {
        createUser: (_, { name, email }) => db.createUser({ name, email }),
    },
};
```

### Resolver Shape

```mermaid
graph LR
    subgraph "Resolver Signature"
        D[fieldName] --> A[(parent, args, context, info)]
        A --> B[return data]
    end
```

| Parameter  | Purpose                           |
|------------|-----------------------------------|
| `parent`   | The result from the parent resolver |
| `args`     | Arguments passed to the field     |
| `context`  | Shared context (auth, DB, etc.)   |
| `info`     | Query execution info              |

---

## 8. Full Architecture

```mermaid
graph TB
    subgraph "Client"
        F1[React/Vue/Angular]
        F2[Mobile App]
        F3[Curl/Playground]
    end

    subgraph "GraphQL Layer"
        G[GraphQL Server]
        S[Schema]
        R[Resolvers]
        G --> S
        G --> R
    end

    subgraph "Data Sources"
        D1[(PostgreSQL)]
        D2[(MongoDB)]
        D3[REST API]
        D4[Redis Cache]
    end

    F1 --> G
    F2 --> G
    F3 --> G
    R --> D1
    R --> D2
    R --> D3
    R --> D4
```

---

## 9. Why Use GraphQL?

- **Exact data** — ask for what you need, get only that
- **Strong typing** — schema is the contract between client and server
- **Single endpoint** — no more URL versioning
- **Introspection** — self-documenting API
- **Developer tools** — GraphiQL, Apollo DevTools

## 10. Tooling Ecosystem

```mermaid
graph TD
    subgraph "Server"
        A[Apollo Server]
        B[Express-GraphQL]
        C[Yoga GraphQL]
        D[Hasura]
    end

    subgraph "Client"
        E[Apollo Client]
        F[Relay]
        G[URQL]
    end

    subgraph "Tooling"
        H[GraphiQL IDE]
        I[GraphQL Codegen]
        J[GraphQL Voyager<br/>- schema visualization]
    end
```

---

## Summary

```mermaid
mindmap
  root((GraphQL))
    Schema
      Types
      Queries
      Mutations
      Subscriptions
    Operations
      Read Data
      Write Data
      Real-time
    Features
      Single Endpoint
      Strong Typing
      Introspection
      No Over-fetching
    Tools
      Apollo
      Relay
      GraphiQL
      Codegen
```
