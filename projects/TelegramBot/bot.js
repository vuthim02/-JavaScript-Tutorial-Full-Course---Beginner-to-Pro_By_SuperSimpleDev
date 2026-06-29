require('dotenv').config();
const { TelegramBot } = require('node-telegram-bot-api');
const { curriculum, resources, getLesson, getNextLesson, categories } = require('./lessons');
const { getUserProgress, completeLesson, getStats } = require('./tracker');
const {
  searchGitHubRepos, fetchDevTo, fetchHackerNews, fetchStackOverflow,
  fetchReddit, fetchMDN, fetchHashnode, fetchFreeCodeCamp, fetchMITCourses, formatResults
} = require('./fetcher');

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatLessonContent(text) {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map(part => {
    const match = part.match(/```(\w*)\n?([\s\S]*?)```/);
    if (match) {
      const label = match[1] ? `<code>${escapeHtml(match[1])}</code>\n` : '';
      return `${label}<pre>${escapeHtml(match[2])}</pre>`;
    }
    return escapeHtml(part);
  }).join('');
}

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('Please set TELEGRAM_BOT_TOKEN in .env');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

process.on('unhandledRejection', (err) => {
  if (err?.code === 'EFATAL' || err?.name === 'FatalError') return;
  console.error('Unhandled rejection:', err.message);
});

bot.on('polling_error', (err) => {
  if (err?.code === 'EFATAL') return;
  console.error('Polling error:', err.message);
});

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || 'Developer';
  const stats = getStats(msg.from.id);

  const welcome = `👋 <b>Welcome ${escapeHtml(name)}!</b>

I'm your <b>Full-Stack Learning Assistant</b>. I'll guide you from zero to full-stack developer.

📊 <b>Your Progress:</b> ${stats.completed.length}/${stats.total} lessons (${stats.percent}%)

<b>Main Commands:</b>
/roadmap - View the full curriculum
/lesson - Start/continue lessons
/practice - Get coding exercises
/next - Go to next lesson

<b>Resources (API):</b>
/digest [topic] - Digest from all sources
/devto [tag] - Dev.to articles
/hn - Hacker News top stories
/so [tag] - Stack Overflow Q&A
/reddit [sub] - Reddit hot posts
/mdn [query] - MDN Web Docs
/search [query] - GitHub repos

<b>Tracking:</b>
/track - Your learning stats
/streak - Your learning streak

Need help? /help`;

  bot.sendMessage(chatId, welcome, { parse_mode: 'HTML' });
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const help = `<b>📚 All Commands</b>

<b>Learning:</b>
/roadmap - Full curriculum overview
/lesson <i>[topic]</i> - Start a specific lesson
/next - Next lesson in sequence
/practice <i>[topic]</i> - Practice exercises

<b>Resources:</b>
/search <i>[query]</i> - Search GitHub repos
/freecodecamp - Latest freeCodeCamp articles
/github - Top GitHub learning repos

<b>Progress:</b>
/track - Your learning statistics
/streak - Current streak
/reset - Reset your progress

<b>Study Tips:</b>
• Spend 30-60 min per lesson
• Code along with every example
• Complete exercises before moving on
• Build projects to reinforce learning`;

  bot.sendMessage(chatId, help, { parse_mode: 'HTML' });
});

bot.onText(/\/roadmap/, (msg) => {
  const chatId = msg.chat.id;

  let roadmap = '<b>🗺️ Full-Stack Roadmap</b>\n\n';
  let currentCategory = '';

  curriculum.forEach((lesson, i) => {
    if (lesson.category !== currentCategory) {
      currentCategory = lesson.category;
      roadmap += `\n<b>${currentCategory}:</b>\n`;
    }
    roadmap += `${i + 1}. ${lesson.title} (${lesson.duration})\n`;
  });

  roadmap += `\n<i>Use /lesson to start or /lesson [number] to jump to a lesson</i>`;

  bot.sendMessage(chatId, roadmap, { parse_mode: 'HTML' });
});

bot.onText(/\/lesson(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const query = match[1]?.toLowerCase().trim();

  let lesson;

  if (!query) {
    const stats = getStats(userId);
    if (stats.completed.length === 0) {
      lesson = curriculum[0];
    } else {
      const lastCompleted = stats.completed[stats.completed.length - 1];
      lesson = getNextLesson(lastCompleted) || curriculum[0];
    }
  } else if (/^\d+$/.test(query)) {
    const idx = parseInt(query) - 1;
    lesson = curriculum[idx];
  } else {
    lesson = curriculum.find(l =>
      l.title.toLowerCase().includes(query) || l.id.includes(query)
    );
  }

  if (!lesson) {
    return bot.sendMessage(chatId, `Lesson not found. Use /roadmap to see all lessons.`);
  }

  const completed = getUserProgress(userId).completed.includes(lesson.id);
  const header = `${completed ? '✅' : '📖'} <b>${lesson.title}</b> (${lesson.duration})
<i>Category: ${lesson.category}</i>

`;
  const footer = `

<b>Exercises:</b>
${lesson.exercises.map((e, i) => `${i + 1}. ${e}`).join('\n')}

<i>Type /done to mark this lesson as complete</i>
<i>Type /practice ${lesson.id} for exercises</i>`;

  const msg_size = 4000;
  const content = formatLessonContent(lesson.content);
  const fullText = header + content + footer;
  if (fullText.length > msg_size) {
    await bot.sendMessage(chatId, header, { parse_mode: 'HTML' });
    for (let i = 0; i < content.length; i += msg_size) {
      await bot.sendMessage(chatId, content.slice(i, i + msg_size), { parse_mode: 'HTML' });
    }
    await bot.sendMessage(chatId, footer, { parse_mode: 'HTML' });
  } else {
    await bot.sendMessage(chatId, fullText, { parse_mode: 'HTML' });
  }
});

bot.onText(/\/practice(?:\s+(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1]?.toLowerCase().trim();

  let exercises;
  if (!query) {
    exercises = curriculum.slice(0, 2).flatMap(l => l.exercises);
  } else {
    const lesson = curriculum.find(l =>
      l.title.toLowerCase().includes(query) || l.id.includes(query)
    );
    if (!lesson) {
      return bot.sendMessage(chatId, `Topic not found. Try: html, css, javascript, react, nodejs`);
    }
    exercises = lesson.exercises;
  }

  const text = `<b>💻 Practice Exercises</b>

${exercises.map((e, i) => `${i + 1}. ${e}`).join('\n')}

<i>Code these yourself before looking for solutions!
Need help? Just ask me.</i>`;

  bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
});

bot.onText(/\/done/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const stats = getStats(userId);

  const progress = getUserProgress(userId);
  const lastCompleted = progress.completed[progress.completed.length - 1];
  const next = lastCompleted ? getNextLesson(lastCompleted) : curriculum[0];

  if (next) {
    completeLesson(userId, next.id);
    const newStats = getStats(userId);
    bot.sendMessage(chatId, `✅ <b>Lesson completed!</b>

Progress: ${newStats.completed.length}/${newStats.total} (${newStats.percent}%)
Streak: ${newStats.streak} day${newStats.streak !== 1 ? 's' : ''}

Next lesson: <b>${next.title}</b>
Type /lesson to continue or /next to go to the next lesson.`, { parse_mode: 'HTML' });
  } else {
    bot.sendMessage(chatId, `You've completed all lessons! 🎉`);
  }
});

bot.onText(/\/next/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const progress = getUserProgress(userId);
  const completed = progress.completed;

  if (completed.length === 0) {
    const first = curriculum[0];
    return bot.sendMessage(chatId, `Start with <b>${first.title}</b>!\nType /lesson to begin.`, { parse_mode: 'HTML' });
  }

  const last = completed[completed.length - 1];
  const next = getNextLesson(last);

  if (!next) {
    return bot.sendMessage(chatId, `🎉 You've completed all lessons! Review any lesson with /lesson or check /roadmap for what to build.`);
  }

  const remaining = curriculum.length - completed.length;
  bot.sendMessage(chatId, `📌 <b>Next Up:</b> ${next.title} (${next.duration})
📊 ${remaining} lesson${remaining > 1 ? 's' : ''} remaining

Type /lesson to start this lesson.`, { parse_mode: 'HTML' });
});

bot.onText(/\/track/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const stats = getStats(userId);

  const progress = getUserProgress(userId);
  const completedLessons = progress.completed.map(id => {
    const lesson = getLesson(id);
    return lesson ? lesson.title : id;
  });

  const barLength = 20;
  const filled = Math.round((stats.completed.length / stats.total) * barLength);
  const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);

  let text = `<b>📊 Your Learning Progress</b>

${bar} ${stats.percent}%
${stats.completed.length}/${stats.total} lessons completed
🔥 Streak: ${stats.streak} day${stats.streak !== 1 ? 's' : ''}
📅 Started: ${new Date(stats.started).toLocaleDateString()}`;

  if (completedLessons.length > 0) {
    text += `\n\n<b>Completed:</b>\n${completedLessons.map(t => `✅ ${t}`).join('\n')}`;
  }

  bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
});

bot.onText(/\/streak/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const stats = getStats(userId);

  const messages = [
    'Keep going! Every day counts 🔥',
    'You\'re on fire! 🔥🔥',
    'Building consistency! 💪',
    'Amazing discipline! 🌟',
    'Unstoppable! 🚀'
  ];

  const msgIdx = Math.min(stats.streak, messages.length - 1);
  const encouragement = stats.streak > 0 ? messages[msgIdx] : 'Start your streak today! Complete /lesson';

  bot.sendMessage(chatId, `🔥 <b>Learning Streak: ${stats.streak} day${stats.streak !== 1 ? 's' : ''}</b>

${encouragement}

<i>Complete at least one lesson per day to keep your streak!</i>`, { parse_mode: 'HTML' });
});

async function fetchAndSend(chatId, statusText, fetcherFn, title, statusMsg) {
  try {
    const items = await fetcherFn();
    const text = formatResults(title, items);
    if (statusMsg) await bot.deleteMessage(chatId, statusMsg.message_id).catch(() => {});
    await bot.sendMessage(chatId, text, { parse_mode: 'HTML', disable_web_page_preview: true });
  } catch (err) {
    if (statusMsg) await bot.deleteMessage(chatId, statusMsg.message_id).catch(() => {});
    await bot.sendMessage(chatId, `❌ ${title}: ${err.message}`);
  }
}

bot.onText(/\/search (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1].trim();
  const statusMsg = await bot.sendMessage(chatId, `🔍 Searching GitHub for "${query}"...`);
  await fetchAndSend(chatId, '', () => searchGitHubRepos(query), `🔍 GitHub: ${query}`, statusMsg);
});

bot.onText(/\/freecodecamp/, async (msg) => {
  const chatId = msg.chat.id;
  const statusMsg = await bot.sendMessage(chatId, `📡 Fetching from freeCodeCamp...`);
  const items = await fetchFreeCodeCamp().catch(() => null);
  if (statusMsg) await bot.deleteMessage(chatId, statusMsg.message_id).catch(() => {});
  let text = formatResults('📡 freeCodeCamp', items || []);
  text += `\n\n<b>Curriculum Paths:</b>\n`;
  Object.entries(resources.freeCodeCamp.tracks).forEach(([name, url]) => {
    text += `• <a href="${url}">${escapeHtml(name)}</a>\n`;
  });
  bot.sendMessage(chatId, text, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.onText(/\/devto(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const tag = match[1]?.trim() || 'javascript';
  const statusMsg = await bot.sendMessage(chatId, `📝 Fetching Dev.to articles on "${tag}"...`);
  await fetchAndSend(chatId, '', () => fetchDevTo(tag), `📝 Dev.to: ${tag}`, statusMsg);
});

bot.onText(/\/hn/, async (msg) => {
  const statusMsg = await bot.sendMessage(msg.chat.id, `📰 Fetching top Hacker News stories...`);
  await fetchAndSend(msg.chat.id, '', fetchHackerNews, '📰 Hacker News Top', statusMsg);
});

bot.onText(/\/so(?:\s+(.+))?/, async (msg, match) => {
  const tag = match[1]?.trim() || 'javascript';
  const statusMsg = await bot.sendMessage(msg.chat.id, `📊 Fetching Stack Overflow questions on "${tag}"...`);
  await fetchAndSend(msg.chat.id, '', () => fetchStackOverflow(tag), `📊 Stack Overflow: ${tag}`, statusMsg);
});

bot.onText(/\/reddit(?:\s+(.+))?/, async (msg, match) => {
  const sub = match[1]?.trim() || 'javascript';
  const statusMsg = await bot.sendMessage(msg.chat.id, `🔴 Fetching r/${sub}...`);
  await fetchAndSend(msg.chat.id, '', () => fetchReddit(sub), `🔴 r/${sub} Hot`, statusMsg);
});

bot.onText(/\/mdn(?:\s+(.+))?/, async (msg, match) => {
  const query = match[1]?.trim() || 'javascript';
  const statusMsg = await bot.sendMessage(msg.chat.id, `📖 Searching MDN for "${query}"...`);
  await fetchAndSend(msg.chat.id, '', () => fetchMDN(query), `📖 MDN: ${query}`, statusMsg);
});

bot.onText(/\/hashnode(?:\s+(.+))?/, async (msg, match) => {
  const tag = match[1]?.trim() || 'javascript';
  const statusMsg = await bot.sendMessage(msg.chat.id, `✍️ Fetching Hashnode articles on "${tag}"...`);
  await fetchAndSend(msg.chat.id, '', () => fetchHashnode(tag), `✍️ Hashnode: ${tag}`, statusMsg);
});

bot.onText(/\/mit/, async (msg) => {
  const statusMsg = await bot.sendMessage(msg.chat.id, `🎓 Fetching MIT courses...`);
  await fetchAndSend(msg.chat.id, '', fetchMITCourses, '🎓 MIT OpenCourseWare', statusMsg);
});

bot.onText(/\/github/, (msg) => {
  const chatId = msg.chat.id;
  let text = `<b>🏆 Top GitHub Learning Repos</b>\n\n`;
  resources.github.repos.forEach((r, i) => {
    text += `${i + 1}. <b>${escapeHtml(r.name)}</b>\n   ${escapeHtml(r.desc)}\n   https://github.com/${r.name}\n\n`;
  });
  text += `<i>Use /search to find more repos on any topic</i>`;
  bot.sendMessage(chatId, text, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.onText(/\/digest(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const topic = match[1]?.trim() || 'javascript';
  const statusMsg = await bot.sendMessage(chatId, `🔄 Building digest for "${topic}" from all sources...`);

  const sources = [
    { name: 'GitHub', fn: () => searchGitHubRepos(topic) },
    { name: 'Dev.to', fn: () => fetchDevTo(topic) },
    { name: 'Stack Overflow', fn: () => fetchStackOverflow(topic) },
    { name: 'MDN', fn: () => fetchMDN(topic) },
    { name: 'Hashnode', fn: () => fetchHashnode(topic) },
  ];

  const results = await Promise.allSettled(sources.map(s => s.fn()));
  let text = `<b>🔄 Daily Digest: ${topic}</b>\n\n`;

  results.forEach((result, i) => {
    text += `<b>── ${sources[i].name} ──</b>\n`;
    if (result.status === 'fulfilled' && result.value.length > 0) {
      result.value.slice(0, 3).forEach((item, j) => {
        text += `${j + 1}. <b>${escapeHtml(item.title)}</b>\n   <a href="${item.url}">Open</a>\n`;
      });
    } else {
      text += `No results or error\n`;
    }
    text += '\n';
  });

  text += `<i>Use per-source commands for more: /devto, /hn, /so, /reddit, /mdn</i>`;

  await bot.deleteMessage(chatId, statusMsg.message_id).catch(() => {});
  bot.sendMessage(chatId, text, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.onText(/\/reset/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const path = require('path');
  const fs = require('fs');

  const filePath = path.join(__dirname, 'data', 'progress.json');
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    delete data[userId];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    bot.sendMessage(chatId, `🔄 Progress reset! You're starting fresh.\nType /lesson to begin.`);
  } catch {
    bot.sendMessage(chatId, `No progress found to reset. Type /lesson to start learning!`);
  }
});

bot.onText(/\/resources/, (msg) => {
  const chatId = msg.chat.id;
  const text = `<b>📚 All Learning Resources</b>

<b>Learn:</b>
/lesson - Full-stack curriculum
/practice - Coding exercises
/digest [topic] - Digest from all sources

<b>API Sources:</b>
/devto [tag] - Dev.to articles
/hn - Hacker News top stories
/so [tag] - Stack Overflow questions
/reddit [sub] - Reddit hot posts
/mdn [query] - MDN Web Docs
/hashnode [tag] - Hashnode articles
/freecodecamp - freeCodeCamp news
/mit - MIT OpenCourseWare
/search [query] - GitHub repos
/github - Top learning repos

<b>Tracking:</b>
/track - Your stats
/streak - Learning streak`;

  bot.sendMessage(chatId, text, { parse_mode: 'HTML', disable_web_page_preview: true });
});

bot.on('message', (msg) => {
  if (!msg.text || msg.text.startsWith('/')) return;
  const chatId = msg.chat.id;

  const responses = [
    `I can help you learn full-stack development! Try:
• /roadmap - See the full curriculum
• /lesson - Start learning
• /search react - Find React resources on GitHub`,
    `Need guidance? Type /help to see all commands.
Try /lesson to continue your learning journey.`,
    `Ask me to search GitHub: /search [topic]
Or start a lesson: /lesson`,
    `💡 Pro tip: Code every example you see in the lessons. Practice is key!`
  ];

  bot.sendMessage(chatId, responses[Math.floor(Math.random() * responses.length)]);
});

console.log('🤖 Full-Stack Learning Bot is running...');
console.log(`📚 ${curriculum.length} lessons loaded across ${categories.length} categories`);
console.log('Commands: /start, /lesson, /digest, /devto, /hn, /so, /reddit, /mdn, /search, /track, /help');

module.exports = bot;
