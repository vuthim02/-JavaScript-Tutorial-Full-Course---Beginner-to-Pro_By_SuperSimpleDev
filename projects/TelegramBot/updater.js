const fs = require('fs');
const path = require('path');
const {
  searchGitHubRepos, fetchDevTo, fetchHackerNews, fetchStackOverflow,
  fetchReddit, fetchMDN, fetchHashnode, fetchFreeCodeCamp, fetchMITCourses,
  fetchCryptoPrices
} = require('./fetcher');
const { runPublishCycle } = require('./publisher');

const CACHE_FILE = path.join(__dirname, 'data', 'cache.json');

const FAST_INTERVAL = (parseInt(process.env.FAST_POLL_INTERVAL, 10) || 2) * 60 * 1000;
const SLOW_INTERVAL = (parseInt(process.env.SLOW_POLL_INTERVAL, 10) || 240) * 60 * 1000;
const CRYPTO_INTERVAL = (parseInt(process.env.CRYPTO_POLL_INTERVAL, 10) || 5) * 60 * 1000;

let botInstance = null;
let lastSlowRun = 0;

function setBot(bot) {
  botInstance = bot;
}

const defaultCache = {
  lastUpdated: null,
  lastCryptoUpdate: null,
  crypto: [],
  github: [], devto: [], hackernews: [], stackoverflow: [],
  reddit: [], mdn: [], hashnode: [], freecodecamp: [], mit: []
};

function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch {
    return { ...defaultCache };
  }
}

function saveCache(data) {
  const dir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
}

async function fastPoll() {
  console.log(`[FastPoll] Checking RSS/news at ${new Date().toLocaleTimeString()}`);
  if (botInstance) {
    try {
      const posted = await runPublishCycle(botInstance);
      if (posted > 0) console.log(`[FastPoll] Published ${posted} articles`);
    } catch (err) {
      console.error(`[FastPoll] Error: ${err.message}`);
    }
  }
}

async function slowPoll() {
  console.log(`[SlowPoll] Fetching API sources at ${new Date().toLocaleTimeString()}`);

  const sources = [
    { name: 'GitHub', key: 'github', fn: () => searchGitHubRepos('javascript') },
    { name: 'Dev.to', key: 'devto', fn: () => fetchDevTo('javascript') },
    { name: 'Hacker News', key: 'hackernews', fn: fetchHackerNews },
    { name: 'Stack Overflow', key: 'stackoverflow', fn: () => fetchStackOverflow('javascript') },
    { name: 'Reddit', key: 'reddit', fn: () => fetchReddit('javascript') },
    { name: 'MDN', key: 'mdn', fn: () => fetchMDN('javascript') },
    { name: 'Hashnode', key: 'hashnode', fn: () => fetchHashnode('javascript') },
    { name: 'freeCodeCamp', key: 'freecodecamp', fn: fetchFreeCodeCamp },
    { name: 'MIT', key: 'mit', fn: fetchMITCourses },
  ];

  const results = await Promise.allSettled(sources.map(s =>
    s.fn().then(data => ({ key: s.key, data }))
  ));

  const cache = loadCache();
  cache.lastUpdated = new Date().toISOString();
  let success = 0, failed = 0;

  results.forEach(result => {
    if (result.status === 'fulfilled') {
      cache[result.value.key] = result.value.data;
      success++;
    } else {
      failed++;
    }
  });

  saveCache(cache);
  console.log(`[SlowPoll] Done. ${success} succeeded, ${failed} failed.`);
}

async function cryptoPoll() {
  console.log(`[Crypto] Fetching prices at ${new Date().toLocaleTimeString()}`);
  try {
    const prices = await fetchCryptoPrices();
    const cache = loadCache();
    cache.crypto = prices;
    cache.lastCryptoUpdate = new Date().toISOString();
    saveCache(cache);

    if (botInstance) {
      const msg = prices.map(p =>
        `${p.coin}: $${p.price.toLocaleString()} (${p.change24h > 0 ? '+' : ''}${p.change24h}%)`
      ).join('  |  ');
      const channelId = process.env.TELEGRAM_CHANNEL_ID;
      if (channelId) {
        await botInstance.sendMessage(channelId, `💹 <b>Crypto Update</b>\n\n${msg}\n\n#crypto #prices`, { parse_mode: 'HTML' });
      }
    }
  } catch (err) {
    console.error(`[Crypto] Error: ${err.message}`);
  }
}

function startUpdater(immediate = true) {
  if (immediate) {
    slowPoll();
    if (process.env.CRYPTO_POLL_INTERVAL !== '0') cryptoPoll();
  }

  setInterval(fastPoll, FAST_INTERVAL);
  console.log(`[Updater] Fast poll: every ${FAST_INTERVAL / 60000} min`);

  setInterval(slowPoll, SLOW_INTERVAL);
  console.log(`[Updater] Slow poll: every ${SLOW_INTERVAL / 60000} min`);

  if (process.env.CRYPTO_POLL_INTERVAL !== '0') {
    setInterval(cryptoPoll, CRYPTO_INTERVAL);
    console.log(`[Updater] Crypto poll: every ${CRYPTO_INTERVAL / 60000} min`);
  }

  return null;
}

function getCachedData() {
  return loadCache();
}

function timeUntilNextUpdate() {
  const cache = loadCache();
  if (!cache.lastUpdated) return 0;
  return Math.max(0, SLOW_INTERVAL - (Date.now() - new Date(cache.lastUpdated).getTime()));
}

module.exports = { startUpdater, getCachedData, timeUntilNextUpdate, setBot, FAST_INTERVAL, SLOW_INTERVAL, CRYPTO_INTERVAL };
