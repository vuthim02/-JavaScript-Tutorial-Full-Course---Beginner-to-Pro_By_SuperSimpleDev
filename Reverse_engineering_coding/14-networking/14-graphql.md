# 14. GraphQL — Query Language for APIs

## REST vs GraphQL

```
REST: /users → Always returns { id, name, email, role, createdAt, ... }
      /users/5/posts → Separate endpoint

GraphQL (single endpoint: /graphql):
query {
  user(id: 5) {
    name
    email
    posts { title }
  }
}
→ Returns only { name, email, posts: [{ title }] }
```

## GraphQL Schema

```graphql
type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
}

type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
}

type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
}

type Mutation {
    createUser(name: String!, email: String!): User!
    deleteUser(id: ID!): Boolean!
}
```

## GraphQL Server (Node)

```javascript
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type User { id: ID!, name: String!, email: String! }
    type Query { users: [User!]!, user(id: ID!): User }
    type Mutation { createUser(name: String!, email: String!): User! }
`;

const users = [
    { id: '1', name: 'Alice', email: 'alice@test.com' },
    { id: '2', name: 'Bob', email: 'bob@test.com' }
];

const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(u => u.id === id)
    },
    Mutation: {
        createUser: (_, { name, email }) => {
            const user = { id: String(users.length + 1), name, email };
            users.push(user);
            return user;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000).then(() => console.log('GraphQL on :4000'));
```

## GraphQL Client

```javascript
const query = `
    query($id: ID!) {
        user(id: $id) { name email }
    }
`;

fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { id: '1' } })
}).then(res => res.json()).then(console.log);
```

## Advantages and Disadvantages

| Advantage | Disadvantage |
|-----------|--------------|
| Single endpoint, no versioning | Complexity — resolvers, caching harder |
| Client-specified fields (no over-fetching) | N+1 problem with naive resolvers |
| Strongly typed schema as documentation | POST-based queries harder to cache than GET |
| Introspection (GraphiQL auto-complete) | Rate limiting harder (variable query cost) |

## Solving N+1 with DataLoader

```javascript
const DataLoader = require('dataloader');

const userLoader = new DataLoader(async (ids) => {
    const users = await db.users.findByIds(ids);
    return ids.map(id => users.find(u => u.id === id));
});

const resolvers = {
    Post: {
        author: (post) => userLoader.load(post.authorId)
        // Multiple posts with same authorId → batched into one query
    }
};
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| REST or GraphQL? | REST: simple, cacheable. GraphQL: flexible, single endpoint |
| Is N+1 happening? | Check resolvers doing individual DB queries per item |
| Are fields being over-fetched? | GraphQL fixes this |
## Next Steps

[Back to Chapter 13](13-sse.md): 13. Server-Sent Events (SSE) — One-Way Real-Time
[Proceed to Chapter 15](15-file-uploads-pagination.md): 15. File Uploads and Pagination to learn about 15. file uploads and pagination.
