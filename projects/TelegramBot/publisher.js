const { isDuplicate, addPost, markAsPosted, getUnpostedPosts, getStats } = require('./database');
const { buildPostTemplate, summarize } = require('./ai');
const { sources, getSource } = require('./newsSources');
const {
  searchGitHubRepos, fetchDevTo, fetchHackerNews, fetchStackOverflow,
  fetchReddit, fetchMDN, fetchFreeCodeCamp, fetchMITCourses
} = require('./fetcher');

const FETCH_MAP = {
  searchGitHubRepos, fetchDevTo, fetchHackerNews, fetchStackOverflow,
  fetchReddit, fetchMDN, fetchFreeCodeCamp, fetchMITCourses,
};

const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const TARGET_LANG = process.env.TARGET_LANG || 'en';
const MAX_POSTS_PER_CYCLE = parseInt(process.env.MAX_POSTS_PER_CYCLE || '3', 10);

async function fetchRSSFeed(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const xml = await res.text();
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const extract = (str, tag) => {
    const m = str.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
    return m ? m[1].trim() : '';
  };
  const extractCDATA = (str) => str.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  let match;
  while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
    const item = match[1];
    const title = extractCDATA(extract(item, 'title'));
    const link = extractCDATA(extract(item, 'link'));
    const desc = extractCDATA(extract(item, 'description')).replace(/<[^>]*>/g, '').slice(0, 500);
    if (title && link) items.push({ title, url: link, desc, source_id: url });
  }
  return items;
}

async function fetchFromSource(source) {
  if (source.type === 'rss') {
    return await fetchRSSFeed(source.url);
  }
  if (source.type === 'api' && source.fetchFn && FETCH_MAP[source.fetchFn]) {
    return await FETCH_MAP[source.fetchFn]();
  }
  return [];
}

function normalizeItem(item, sourceId) {
  if (item.source_id) {
    return { title: item.title, url: item.url, desc: item.desc || '', source_id: sourceId };
  }
  return {
    title: item.title || item.name || 'Untitled',
    url: item.url || '',
    desc: item.desc || item.description || '',
    source_id: sourceId,
  };
}

async function collectNewArticles() {
  const newArticles = [];

  for (const source of sources) {
    try {
      const items = await fetchFromSource(source);
      for (const item of items) {
        const normalized = normalizeItem(item, source.id);
        if (!normalized.url) continue;
        if (!isDuplicate(normalized.title)) {
          const id = addPost(source.id, normalized.title, normalized.url, source.category);
          if (id) {
            newArticles.push({ ...normalized, dbId: id, sourceName: source.name, icon: source.icon, category: source.category });
          }
        }
      }
      console.log(`[Publisher] ${source.name}: ${items.length} fetched, ${newArticles.filter(a => a.sourceName === source.name).length} new`);
    } catch (err) {
      console.error(`[Publisher] Error fetching ${source.name}: ${err.message}`);
    }
  }

  return newArticles;
}

async function publishToChannel(bot, article) {
  if (!CHANNEL_ID) {
    console.error('[Publisher] TELEGRAM_CHANNEL_ID not set');
    return false;
  }

  try {
    let summary = null;
    try {
      summary = await summarize(article.title, article.desc, TARGET_LANG);
    } catch {
      summary = article.desc || null;
    }

    const message = buildPostTemplate(article, summary, article.sourceName, article.icon);

    await bot.sendMessage(CHANNEL_ID, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: false,
    });

    if (article.dbId) markAsPosted(article.dbId);
    console.log(`[Publisher] Posted: ${article.title.slice(0, 50)}...`);
    return true;
  } catch (err) {
    console.error(`[Publisher] Failed to post "${article.title.slice(0, 30)}": ${err.message}`);
    return false;
  }
}

async function runPublishCycle(bot) {
  console.log(`[Publisher] Starting cycle at ${new Date().toLocaleString()}`);

  const newArticles = await collectNewArticles();
  console.log(`[Publisher] ${newArticles.length} new articles to process`);

  let posted = 0;
  for (const article of newArticles.slice(0, MAX_POSTS_PER_CYCLE)) {
    const success = await publishToChannel(bot, article);
    if (success) posted++;
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  const stats = getStats();
  console.log(`[Publisher] Cycle done. Posted ${posted}/${Math.min(newArticles.length, MAX_POSTS_PER_CYCLE)}. Total: ${stats.total} stored, ${stats.posted} posted.`);
  return posted;
}

module.exports = { runPublishCycle, collectNewArticles, publishToChannel };
