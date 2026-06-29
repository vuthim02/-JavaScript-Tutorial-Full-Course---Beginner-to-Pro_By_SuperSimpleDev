const sources = [
  {
    id: 'cointelegraph',
    name: 'Cointelegraph',
    type: 'rss',
    url: 'https://cointelegraph.com/rss',
    category: 'crypto',
    lang: 'en',
    icon: '📰',
  },
  {
    id: 'coindesk',
    name: 'CoinDesk',
    type: 'rss',
    url: 'https://www.coindesk.com/arc/outboundfeeds/rss/',
    category: 'crypto',
    lang: 'en',
    icon: '💰',
  },
  {
    id: 'decrypt',
    name: 'Decrypt',
    type: 'rss',
    url: 'https://decrypt.co/feed',
    category: 'crypto',
    lang: 'en',
    icon: '🔓',
  },
  {
    id: 'cryptoslate',
    name: 'CryptoSlate',
    type: 'rss',
    url: 'https://cryptoslate.com/feed/',
    category: 'crypto',
    lang: 'en',
    icon: '📊',
  },
  {
    id: 'hackernews',
    name: 'Hacker News',
    type: 'api',
    url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
    category: 'tech',
    lang: 'en',
    icon: '📰',
    fetchFn: 'fetchHackerNews',
  },
  {
    id: 'devto',
    name: 'Dev.to',
    type: 'api',
    url: 'https://dev.to/api/articles?per_page=5',
    category: 'dev',
    lang: 'en',
    icon: '📝',
    fetchFn: 'fetchDevTo',
  },
  {
    id: 'freecodecamp',
    name: 'freeCodeCamp',
    type: 'rss',
    url: 'https://www.freecodecamp.org/news/rss/',
    category: 'dev',
    lang: 'en',
    icon: '📡',
  },
  {
    id: 'github-trending',
    name: 'GitHub Trending',
    type: 'api',
    url: 'https://api.github.com/search/repositories?q=stars:>1000&sort=stars&per_page=5',
    category: 'dev',
    lang: 'en',
    icon: '⭐',
    fetchFn: 'searchGitHubRepos',
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    type: 'api',
    url: 'https://api.stackexchange.com/2.3/questions?order=desc&sort=votes&site=stackoverflow&pagesize=5',
    category: 'dev',
    lang: 'en',
    icon: '📊',
    fetchFn: 'fetchStackOverflow',
  },
];

function getSourcesByCategory(category) {
  return sources.filter(s => s.category === category);
}

function getSource(id) {
  return sources.find(s => s.id === id);
}

module.exports = { sources, getSourcesByCategory, getSource };
