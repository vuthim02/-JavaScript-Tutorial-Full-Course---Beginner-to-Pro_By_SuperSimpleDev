const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'posts.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_id TEXT NOT NULL,
        title_hash TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        category TEXT,
        published_at DATETIME DEFAULT (datetime('now')),
        posted_to_channel INTEGER DEFAULT 0
      );
      CREATE INDEX IF NOT EXISTS idx_posts_title_hash ON posts(title_hash);
      CREATE INDEX IF NOT EXISTS idx_posts_posted ON posts(posted_to_channel);
    `);
  }
  return db;
}

function titleHash(title) {
  let hash = 0;
  const str = String(title).toLowerCase().trim();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function isDuplicate(title) {
  const db = getDb();
  const row = db.prepare('SELECT id FROM posts WHERE title_hash = ?').get(titleHash(title));
  return !!row;
}

function addPost(sourceId, title, url, category) {
  const db = getDb();
  const hash = titleHash(title);
  try {
    db.prepare(
      'INSERT OR IGNORE INTO posts (source_id, title_hash, title, url, category) VALUES (?, ?, ?, ?, ?)'
    ).run(sourceId, hash, title, url, category);
    return db.prepare('SELECT id FROM posts WHERE title_hash = ?').get(hash)?.id || null;
  } catch {
    return null;
  }
}

function markAsPosted(postId) {
  const db = getDb();
  db.prepare('UPDATE posts SET posted_to_channel = 1 WHERE id = ?').run(postId);
}

function getUnpostedPosts(limit = 5) {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM posts WHERE posted_to_channel = 0 ORDER BY published_at DESC LIMIT ?'
  ).all(limit);
}

function getStats() {
  const db = getDb();
  const total = db.prepare('SELECT COUNT(*) as count FROM posts').get();
  const posted = db.prepare('SELECT COUNT(*) as count FROM posts WHERE posted_to_channel = 1').get();
  return { total: total.count, posted: posted.count };
}

function close() {
  if (db) { db.close(); db = null; }
}

module.exports = { isDuplicate, addPost, markAsPosted, getUnpostedPosts, getStats, close };
