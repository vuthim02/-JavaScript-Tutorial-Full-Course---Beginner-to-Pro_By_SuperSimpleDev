const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { useServer } = require('graphql-ws/lib/use/ws');
const { WebSocketServer } = require('ws');

const config = require('./config');
const { initDb } = require('./db');
const { createLoaders } = require('./loaders');
const { getUserFromReq } = require('./auth');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

async function main() {
  initDb();
  console.log('Database initialized');

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const app = express();
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const currentUser = getUserFromReq(req);
        const loaders = createLoaders();
        return { currentUser, loaders };
      },
    })
  );

  app.get('/', (req, res) => {
    res.json({
      name: 'CineDB — GraphQL Movie Database',
      stack: 'Apollo Server 4 + better-sqlite3 + DataLoader',
      playground: '/graphql',
      features: [
        'Custom scalars (Date, URL)',
        'Enums (Genre, Rating, CastRole)',
        'Interfaces (Node, Person)',
        'Unions (SearchResult)',
        'Relay pagination (MovieConnection, ReviewConnection)',
        'DataLoader batching (11 loaders)',
        'Subscriptions (reviewAdded, movieRatingChanged)',
        'JWT auth + bcrypt',
        'Full-text search',
        'Watchlist & reviews',
      ],
      seedAccounts: [
        { email: 'cine@example.com', password: 'cinema123' },
        { email: 'fan@example.com', password: 'cinema123' },
        { email: 'critic@example.com', password: 'cinema123' },
      ],
    });
  });

  httpServer.listen(config.port, () => {
    console.log(`CineDB running at http://localhost:${config.port}/graphql`);
    console.log(`WebSocket at ws://localhost:${config.port}/graphql`);
  });
}

main().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
