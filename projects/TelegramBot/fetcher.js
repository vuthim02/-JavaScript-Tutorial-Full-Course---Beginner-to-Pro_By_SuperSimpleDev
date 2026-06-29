const FETCH_TIMEOUT = 8000;

async function fetchJson(url, opts = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchText(url, opts = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

async function searchGitHubRepos(query) {
  const data = await fetchJson(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&per_page=5`,
    { headers: { Accept: 'application/vnd.github.v3+json', 'User-Agent': 'telegram-bot' } }
  );
  return data.items.map(r => ({
    title: r.full_name,
    url: r.html_url,
    desc: r.description || 'No description',
    author: '',
    stars: r.stargazers_count,
    language: r.language || 'N/A',
    source: 'GitHub'
  }));
}

async function fetchDevTo(tag = 'javascript') {
  const data = await fetchJson(`https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&per_page=5`);
  return data.map(a => ({
    title: a.title,
    url: a.url,
    desc: a.description || '',
    author: a.user.name,
    source: 'Dev.to'
  }));
}

async function fetchHackerNews() {
  const ids = await fetchJson('https://hacker-news.firebaseio.com/v0/topstories.json');
  const items = await Promise.all(
    ids.slice(0, 5).map(id => fetchJson(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
  );
  return items.map(item => ({
    title: item.title,
    url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
    desc: `${item.score} points | ${item.descendants || 0} comments`,
    author: item.by,
    source: 'Hacker News'
  }));
}

async function fetchStackOverflow(tag = 'javascript') {
  const data = await fetchJson(
    `https://api.stackexchange.com/2.3/questions?order=desc&sort=votes&tagged=${encodeURIComponent(tag)}&site=stackoverflow&pagesize=5`
  );
  return data.items.map(q => ({
    title: q.title,
    url: q.link,
    desc: `⬆ ${q.score} | ${q.answer_count} answers | ${q.view_count} views`,
    author: q.owner?.display_name || 'unknown',
    source: 'Stack Overflow'
  }));
}

async function fetchReddit(subreddit = 'javascript') {
  const fallbackRepos = await searchGitHubRepos(subreddit);
  return fallbackRepos.slice(0, 5).map(r => ({
    title: r.title,
    url: r.url,
    desc: `⭐ ${r.stars} trending repos | ${r.desc}`,
    author: '',
    source: 'GitHub Trending'
  }));
}

async function fetchFreeCodeCamp() {
  const xml = await fetchText(
    'https://www.freecodecamp.org/news/rss/',
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  );
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const extract = (str, tag) => {
    const m = str.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
    return m ? m[1].trim() : '';
  };
  let match;
  while ((match = itemRegex.exec(xml)) !== null && items.length < 5) {
    const item = match[1];
    const title = extract(item, 'title').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
    const link = extract(item, 'link').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
    const desc = extract(item, 'description').replace(/<[^>]*>/g, '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').slice(0, 120);
    if (title && link) items.push({ title, url: link, desc, author: 'freeCodeCamp', source: 'freeCodeCamp' });
  }
  return items;
}

async function fetchMDN(query = 'javascript') {
  const data = await fetchJson(
    `https://developer.mozilla.org/api/v1/search/en-US?q=${encodeURIComponent(query)}`
  ).catch(() => null);

  if (data?.documents?.length > 0) {
    return data.documents.slice(0, 5).map(d => ({
      title: d.title,
      url: `https://developer.mozilla.org${d.mdn_url}`,
      desc: d.summary.replace(/<[^>]*>/g, '').slice(0, 120),
      author: 'MDN',
      source: 'MDN'
    }));
  }

  const fallback = [
    { title: 'JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', desc: 'Complete JS guide', author: 'MDN', source: 'MDN' },
    { title: 'JS Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference', desc: 'Full JS reference', author: 'MDN', source: 'MDN' },
    { title: 'DOM Manipulation', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model', desc: 'DOM API docs', author: 'MDN', source: 'MDN' },
    { title: 'CSS Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference', desc: 'Complete CSS reference', author: 'MDN', source: 'MDN' },
    { title: 'HTML Elements', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element', desc: 'All HTML elements', author: 'MDN', source: 'MDN' },
  ];
  return fallback;
}

async function fetchHashnode(tag = 'javascript') {
  const data = await fetchJson(
    `https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&per_page=5`
  ).catch(() => null);
  return (data || []).slice(0, 5).map(a => ({
    title: a.title,
    url: a.url,
    desc: a.description || '',
    author: a.user.name,
    source: 'Hashnode'
  }));
}

async function fetchMITCourses() {
  return [
    { title: 'Introduction to CS', url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/', desc: 'MIT\'s intro CS course', author: 'MIT', source: 'MIT OCW' },
    { title: 'Software Construction', url: 'https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/', desc: 'Software design & construction', author: 'MIT', source: 'MIT OCW' },
    { title: 'Introduction to Algorithms', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', desc: 'Core algorithms course', author: 'MIT', source: 'MIT OCW' },
    { title: 'Mathematics for CS', url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/', desc: 'Discrete math for CS', author: 'MIT', source: 'MIT OCW' },
    { title: 'Full Stack Development', url: 'https://ocw.mit.edu/courses/6-148-web-development/', desc: 'MIT web development', author: 'MIT', source: 'MIT OCW' },
  ];
}

const COIN_NAMES = {
  bitcoin: 'Bitcoin', ethereum: 'Ethereum', solana: 'Solana',
  dogecoin: 'Dogecoin', cardano: 'Cardano', ripple: 'XRP',
  polkadot: 'Polkadot', avalanche: 'Avalanche', chainlink: 'Chainlink'
};

async function fetchCryptoPrices(coins = ['bitcoin', 'ethereum', 'solana', 'dogecoin', 'cardano']) {
  const ids = coins.join(',');
  const data = await fetchJson(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
  );
  return Object.entries(data).map(([id, info]) => ({
    coin: COIN_NAMES[id] || id.charAt(0).toUpperCase() + id.slice(1),
    price: info.usd,
    change24h: info.usd_24h_change?.toFixed(2) || '0.00',
  }));
}

function formatResults(title, items) {
  if (!items || items.length === 0) return `<b>${title}</b>\n\nNo results found.`;
  return `<b>${title}</b>\n\n${items.map((item, i) =>
    `${i + 1}. <b>${item.title}</b>\n` +
    (item.author ? `   ✍️ ${item.author}\n` : '') +
    (item.desc ? `   ${item.desc.slice(0, 200)}\n` : '') +
    (item.stars ? `   ⭐ ${item.stars} ${item.language ? '| ' + item.language : ''}\n` : '') +
    `   <a href="${item.url}">Open</a>`
  ).join('\n\n')}`;
}

module.exports = {
  searchGitHubRepos, fetchDevTo, fetchHackerNews, fetchStackOverflow,
  fetchReddit, fetchMDN, fetchHashnode, fetchFreeCodeCamp, fetchMITCourses,
  fetchCryptoPrices, formatResults
};
