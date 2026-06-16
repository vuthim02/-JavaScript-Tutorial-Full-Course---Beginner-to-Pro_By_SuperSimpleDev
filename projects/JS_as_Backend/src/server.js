import { startServer } from './app.js';

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
