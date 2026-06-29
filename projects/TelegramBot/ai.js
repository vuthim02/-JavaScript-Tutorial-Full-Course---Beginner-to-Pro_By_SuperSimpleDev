const AI_PROVIDER = process.env.AI_PROVIDER || 'none';
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

async function summarizeWithOpenAI(title, content, targetLang = 'en') {
  if (!OPENAI_KEY) throw new Error('OPENAI_API_KEY not set');
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a news editor. Summarize the following article in 2-3 concise sentences${targetLang !== 'en' ? ` in ${targetLang}` : ''}. Include the key takeaway. Use engaging language suitable for a Telegram channel.`,
        },
        {
          role: 'user',
          content: `Title: ${title}\n\nContent: ${content.slice(0, 1500)}`,
        },
      ],
      max_tokens: 200,
      temperature: 0.3,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`OpenAI error: ${data.error?.message || res.status}`);
  return data.choices[0].message.content.trim();
}

async function summarizeWithGemini(title, content, targetLang = 'en') {
  if (!GEMINI_KEY) throw new Error('GEMINI_API_KEY not set');
  const lang = targetLang !== 'en' ? ` in ${targetLang}` : '';
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Summarize this article in 2-3 concise sentences${lang}. Include the key takeaway. Use engaging language suitable for a Telegram channel.\n\nTitle: ${title}\n\nContent: ${content.slice(0, 1500)}`,
          }],
        }],
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(`Gemini error: ${data.error?.message || res.status}`);
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Summary not available.';
}

async function summarize(title, content = '', targetLang = 'en') {
  if (AI_PROVIDER === 'openai') {
    return await summarizeWithOpenAI(title, content, targetLang);
  }
  if (AI_PROVIDER === 'gemini') {
    return await summarizeWithGemini(title, content, targetLang);
  }
  return null;
}

function buildPostTemplate(article, summary, sourceName, sourceIcon) {
  const tags = article.category === 'crypto'
    ? '\n\n#crypto #blockchain #web3 #defi #news'
    : article.category === 'tech'
    ? '\n\n#tech #programming #startup #AI'
    : '\n\n#programming #webdev #javascript #opensource';

  let message = `${sourceIcon} <b>${escapeHtml(article.title)}</b>\n\n`;

  if (summary) {
    message += `${escapeHtml(summary)}\n\n`;
  }

  message += `🔗 <a href="${article.url}">Read full article</a>`;
  message += `\n📰 Source: ${sourceName}`;
  message += tags;

  return message;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = { summarize, buildPostTemplate };
