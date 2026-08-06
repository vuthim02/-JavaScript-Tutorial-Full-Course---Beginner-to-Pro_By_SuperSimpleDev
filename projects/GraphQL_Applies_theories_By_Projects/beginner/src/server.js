const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const root = require('./resolvers');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  res.json({
    name: 'GraphQL Beginner API',
    docs: '/graphql — GraphiQL IDE + API endpoint',
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
