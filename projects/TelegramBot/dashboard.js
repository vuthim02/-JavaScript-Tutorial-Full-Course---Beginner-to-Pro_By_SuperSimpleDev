const express = require('express');
const { getCachedData, timeUntilNextUpdate, SLOW_INTERVAL } = require('./updater');

const app = express();
const PORT = process.env.DASHBOARD_PORT || 3000;

const ICONS = {
  github: '🔍', devto: '📝', hackernews: '📰', stackoverflow: '📊',
  reddit: '🔴', mdn: '📖', hashnode: '✍️', freecodecamp: '📡', mit: '🎓'
};

const LABELS = {
  github: 'GitHub Repos', devto: 'Dev.to Articles', hackernews: 'Hacker News',
  stackoverflow: 'Stack Overflow', reddit: 'Reddit Hot', mdn: 'MDN Web Docs',
  hashnode: 'Hashnode', freecodecamp: 'freeCodeCamp', mit: 'MIT Courses'
};

const COLORS = {
  github: '#2ea44f', devto: '#0a0a23', hackernews: '#ff6600',
  stackoverflow: '#f48024', reddit: '#ff4500', mdn: '#1b1b2f',
  hashnode: '#2962ff', freecodecamp: '#0a0a23', mit: '#a31f34'
};

app.get('/', (req, res) => {
  const cache = getCachedData();
  const timeLeft = timeUntilNextUpdate();
  const nextUpdate = timeLeft > 0
    ? `${Math.floor(timeLeft / 3600000)}h ${Math.floor((timeLeft % 3600000) / 60000)}m`
    : 'Now';
  const progress = 100 - (timeLeft / SLOW_INTERVAL * 100);

  if (cache.crypto && cache.crypto.length > 0) {
    cardHtml += `
      <div class="card crypto" style="border-top: 4px solid #f7931a">
        <div class="card-header">
          <span class="card-icon">💹</span>
          <h2>Crypto Prices</h2>
          <span class="badge">${cache.crypto.length}</span>
        </div>
        <div class="card-body">
          ${cache.crypto.map(c => `
            <div class="crypto-row">
              <span class="crypto-coin">${c.coin}</span>
              <span class="crypto-price">$${c.price.toLocaleString()}</span>
              <span class="crypto-change ${c.change24h >= 0 ? 'green' : 'red'}">
                ${c.change24h >= 0 ? '▲' : '▼'} ${Math.abs(c.change24h)}%
              </span>
            </div>
          `).join('')}
          ${cache.lastCryptoUpdate ? `<div class="crypto-time">Updated: ${new Date(cache.lastCryptoUpdate).toLocaleTimeString()}</div>` : ''}
        </div>
      </div>`;
  }

  for (const [key, items] of Object.entries(cache)) {
    if (key === 'lastUpdated' || key === 'lastCryptoUpdate' || key === 'crypto') continue;
    if (!Array.isArray(items) || items.length === 0) continue;

    cardHtml += `
      <div class="card" style="border-top: 4px solid ${COLORS[key] || '#333'}">
        <div class="card-header">
          <span class="card-icon">${ICONS[key] || '📌'}</span>
          <h2>${LABELS[key] || key}</h2>
          <span class="badge">${items.length}</span>
        </div>
        <div class="card-body">
          <ul>
            ${items.slice(0, 5).map(item => `
              <li>
                <a href="${item.url}" target="_blank" rel="noopener">${escapeHtml(item.title)}</a>
                ${item.author ? `<span class="author">— ${escapeHtml(item.author)}</span>` : ''}
                ${item.desc ? `<p class="desc">${escapeHtml(item.desc).slice(0, 100)}</p>` : ''}
                ${item.stars ? `<span class="meta">⭐ ${item.stars}</span>` : ''}
                ${item.language ? `<span class="meta lang">${escapeHtml(item.language)}</span>` : ''}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dev Dashboard — Full-Stack Learning</title>
  <script>
    setTimeout(() => location.reload(), ${timeLeft > 0 ? timeLeft : 60000});
  </script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0d1117; color: #c9d1d9; padding: 24px;
    }
    .container { max-width: 1400px; margin: 0 auto; }
    header {
      display: flex; justify-content: space-between; align-items: center;
      flex-wrap: wrap; gap: 16px; margin-bottom: 32px; padding-bottom: 16px;
      border-bottom: 1px solid #30363d;
    }
    h1 { font-size: 1.8rem; color: #58a6ff; }
    .status-bar {
      display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
    }
    .status-bar .label { color: #8b949e; font-size: 0.85rem; }
    .progress-bar {
      width: 200px; height: 6px; background: #21262d; border-radius: 3px; overflow: hidden;
    }
    .progress-fill {
      height: 100%; background: #58a6ff; border-radius: 3px;
      width: ${Math.min(progress, 100)}%;
    }
    .count { color: #58a6ff; font-weight: 600; }
    .grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 20px;
    }
    .card {
      background: #161b22; border-radius: 8px; overflow: hidden;
      border: 1px solid #30363d;
    }
    .card-header {
      display: flex; align-items: center; gap: 10px;
      padding: 14px 18px; background: #0d1117; border-bottom: 1px solid #30363d;
    }
    .card-icon { font-size: 1.3rem; }
    .card-header h2 { font-size: 0.95rem; flex: 1; color: #c9d1d9; }
    .badge {
      background: #1f6feb; color: #fff; font-size: 0.75rem;
      padding: 2px 8px; border-radius: 10px; font-weight: 600;
    }
    .card-body { padding: 12px 18px; }
    .card-body ul { list-style: none; }
    .card-body li {
      padding: 10px 0; border-bottom: 1px solid #21262d;
    }
    .card-body li:last-child { border-bottom: none; }
    .card-body a {
      color: #58a6ff; text-decoration: none; font-weight: 500; font-size: 0.9rem;
    }
    .card-body a:hover { text-decoration: underline; color: #79c0ff; }
    .author { color: #8b949e; font-size: 0.8rem; }
    .desc { color: #8b949e; font-size: 0.8rem; margin-top: 4px; }
    .meta { display: inline-block; font-size: 0.75rem; color: #8b949e; margin-top: 4px; margin-right: 8px; }
    .lang { background: #1f6feb20; color: #58a6ff; padding: 1px 6px; border-radius: 4px; }
    .crypto-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 0; border-bottom: 1px solid #21262d; gap: 8px;
    }
    .crypto-row:last-child { border-bottom: none; }
    .crypto-coin { font-weight: 600; color: #c9d1d9; min-width: 80px; }
    .crypto-price { font-family: monospace; font-size: 0.95rem; color: #e6edf3; }
    .crypto-change { font-size: 0.8rem; padding: 2px 6px; border-radius: 4px; min-width: 70px; text-align: right; }
    .crypto-change.green { color: #3fb950; background: #3fb95020; }
    .crypto-change.red { color: #f85149; background: #f8514920; }
    .crypto-time { text-align: right; color: #8b949e; font-size: 0.75rem; margin-top: 6px; }
    .card.crypto { border-top-color: #f7931a !important; }
    .empty-state {
      color: #8b949e; text-align: center; padding: 40px; font-size: 1.1rem;
    }
    @media (max-width: 600px) {
      body { padding: 12px; }
      .grid { grid-template-columns: 1fr; }
      header { flex-direction: column; align-items: flex-start; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <h1>🖥️ Dev Dashboard</h1>
        <p style="color: #8b949e; font-size: 0.85rem; margin-top: 4px;">
          Real-time developer news aggregated from 9 sources
        </p>
      </div>
      <div class="status-bar">
        <div>
          <div class="label">Last updated</div>
          <div>${cache.lastUpdated ? new Date(cache.lastUpdated).toLocaleString() : 'Never'}</div>
        </div>
        <div>
          <div class="label">Next update in</div>
          <div class="count">${nextUpdate}</div>
        </div>
        <div class="progress-bar"><div class="progress-fill"></div></div>
      </div>
    </header>

    <div class="grid">
      ${cardHtml || '<div class="empty-state">No data cached yet. First fetch runs when the server starts.</div>'}
    </div>

    <footer style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #30363d; text-align: center; color: #8b949e; font-size: 0.8rem;">
      Data refreshes every 4 hours &middot;
      <a href="https://t.me/your_bot" style="color: #58a6ff;">@YourBot</a> &middot;
      Full-Stack Learning Assistant
    </footer>
  </div>
</body>
</html>`;

  res.send(html);
});

function startDashboard() {
  return new Promise((resolve) => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[Dashboard] http://localhost:${PORT}`);
      resolve();
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = { startDashboard };
