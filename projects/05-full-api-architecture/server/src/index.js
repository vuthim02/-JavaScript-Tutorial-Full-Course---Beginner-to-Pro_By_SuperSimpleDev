require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "change_this_to_a_real_secret_key";
const DB_PATH = process.env.DB_PATH || "./data/database.sqlite";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: "Too many requests" },
});
app.use("/api", limiter);

let db;

async function initDB() {
  const SQL = await initSqlJs();
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(DB_PATH)) {
    const buf = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buf);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      year INTEGER,
      user_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  saveDB();
  console.log(`[DB] SQLite initialized at ${DB_PATH}`);
}

function saveDB() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "No token provided" });

  const token = header.split(" ")[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", port: PORT, timestamp: new Date().toISOString() });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const existing = db.exec("SELECT id FROM users WHERE username = ?", [username]);
    if (existing.length > 0 && existing[0].values.length > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash]);
    saveDB();

    res.status(201).json({ message: "User registered" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const result = db.exec("SELECT id, username, password FROM users WHERE username = ?", [username]);
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const [id, user, pass] = result[0].values[0];
    const valid = await bcrypt.compare(password, pass);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id, username: user }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/books", auth, (req, res) => {
  try {
    let query = "SELECT * FROM books WHERE user_id = ?";
    const params = [req.user.id];

    if (req.query.author) {
      query += " AND author LIKE ?";
      params.push(`%${req.query.author}%`);
    }
    if (req.query.year) {
      query += " AND year = ?";
      params.push(Number(req.query.year));
    }

    query += " ORDER BY created_at DESC";
    const result = db.exec(query, params);

    if (result.length === 0) return res.json([]);

    const columns = result[0].columns;
    const books = result[0].values.map((row) => {
      const obj = {};
      columns.forEach((col, i) => (obj[col] = row[i]));
      return obj;
    });

    res.json(books);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/books", auth, (req, res) => {
  try {
    const { title, author, year } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: "Title and author required" });
    }

    db.run("INSERT INTO books (title, author, year, user_id) VALUES (?, ?, ?, ?)", [
      title,
      author,
      year || null,
      req.user.id,
    ]);
    saveDB();

    res.status(201).json({ message: "Book added" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/books/:id", auth, (req, res) => {
  try {
    const result = db.exec("SELECT id FROM books WHERE id = ? AND user_id = ?", [
      req.params.id,
      req.user.id,
    ]);

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    db.run("DELETE FROM books WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
    saveDB();

    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
  });
});
