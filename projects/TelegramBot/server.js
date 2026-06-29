require('dotenv').config();

const { startUpdater, setBot } = require('./updater');
const { startDashboard } = require('./dashboard');

startUpdater(true);

startDashboard().then(() => {
  const bot = require('./bot');
  setBot(bot);
});
