const express = require('express');
const { createYoga, createSchema } = require('graphql-yoga');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const db = require('./db');

const schema = createSchema({ typeDefs, resolvers });

const yoga = createYoga({
  schema,
  context: () => ({ db }),
});

const app = express();
const PORT = process.env.PORT || 4001;

app.use('/graphql', yoga);

app.get('/', (req, res) => {
  res.json({
    name: 'GraphQL Intermediate API — Task Manager',
    playground: '/graphql',
    note: 'Supports subscriptions via WebSocket',
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
