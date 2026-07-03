const initSqlJs = require("sql.js");
const path = require("path");
const fs = require("fs");

let db;

async function getDb() {
  if (db) return db;

  const SQL = await initSqlJs();
  const port = process.env.PORT || "50051";
  const dbPath = path.resolve(__dirname, "..", `./data/database_${port}.sqlite`);
  const dir = path.dirname(dbPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      year INTEGER NOT NULL,
      created_by INTEGER,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);

  saveDb();
  return db;
}

function saveDb() {
  const port = process.env.PORT || "50051";
  const dbPath = path.resolve(__dirname, "..", `./data/database_${port}.sqlite`);
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

function rowToObject(rows) {
  if (!rows.length || !rows[0].values.length) return null;
  const cols = rows[0].columns;
  const vals = rows[0].values[0];
  return Object.fromEntries(cols.map((c, i) => [c, vals[i]]));
}

module.exports = { getDb, saveDb, rowToObject };
