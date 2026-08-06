const initSqlJs = require('sql.js');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const config = require('./config');
const fs = require('fs');
const path = require('path');

let db = null;

function uid() {
  return crypto.randomUUID();
}

async function initDb() {
  const SQL = await initSqlJs();
  const dir = path.dirname(config.dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(config.dbPath)) {
    db = new SQL.Database(fs.readFileSync(config.dbPath));
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS movies (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      year INTEGER NOT NULL,
      genre TEXT NOT NULL,
      rating REAL DEFAULT 0,
      duration INTEGER,
      plot TEXT,
      poster TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS people (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      bio TEXT,
      birth_date TEXT,
      photo TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS cast_members (
      movie_id TEXT NOT NULL,
      person_id TEXT NOT NULL,
      character_name TEXT,
      role TEXT NOT NULL DEFAULT 'ACTOR' CHECK(role IN ('ACTOR','DIRECTOR')),
      PRIMARY KEY (movie_id, person_id, role)
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      comment TEXT,
      movie_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS watchlist (
      user_id TEXT NOT NULL,
      movie_id TEXT NOT NULL,
      added_at TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (user_id, movie_id)
    );
  `);

  const count = db.exec('SELECT COUNT(*) as c FROM movies');
  if (!count[0] || count[0].values[0][0] === 0) seed();

  process.on('exit', saveDb);
  process.on('SIGINT', () => { saveDb(); process.exit(0); });
  process.on('SIGTERM', () => { saveDb(); process.exit(0); });

  return db;
}

function saveDb() {
  if (db) {
    const data = db.export();
    fs.writeFileSync(config.dbPath, Buffer.from(data));
  }
}

function seed() {
  const pw = bcrypt.hashSync('cinema123', 10);

  db.run(`INSERT INTO users (id, username, email, password) VALUES
    ('u1', 'cinephile', 'cine@example.com', '${pw}'),
    ('u2', 'moviefan', 'fan@example.com', '${pw}'),
    ('u3', 'critic', 'critic@example.com', '${pw}')
  `);

  db.run(`INSERT INTO movies (id, title, year, genre, rating, duration, plot, poster) VALUES
    ('m1', 'The Matrix', 1999, 'SCI_FI', 8.7, 136, 'A computer hacker learns about the true nature of reality.', 'https://example.com/matrix.jpg'),
    ('m2', 'Inception', 2010, 'SCI_FI', 8.8, 148, 'A thief who steals corporate secrets through dream-sharing.', 'https://example.com/inception.jpg'),
    ('m3', 'The Godfather', 1972, 'DRAMA', 9.2, 175, 'The aging patriarch of an organized crime dynasty.', 'https://example.com/godfather.jpg'),
    ('m4', 'Pulp Fiction', 1994, 'CRIME', 8.9, 154, 'The lives of two mob hitmen, a boxer, and more intertwine.', 'https://example.com/pulp.jpg'),
    ('m5', 'Interstellar', 2014, 'SCI_FI', 8.6, 169, 'A team of explorers travel through a wormhole in space.', 'https://example.com/interstellar.jpg'),
    ('m6', 'The Dark Knight', 2008, 'ACTION', 9.0, 152, 'Batman faces the Joker, a criminal mastermind.', 'https://example.com/darkknight.jpg'),
    ('m7', 'Parasite', 2019, 'THRILLER', 8.5, 132, 'Greed and class discrimination threaten a symbiotic relationship.', 'https://example.com/parasite.jpg'),
    ('m8', 'La La Land', 2016, 'MUSICAL', 8.0, 128, 'A jazz pianist and an aspiring actress fall in love.', 'https://example.com/lalaland.jpg')
  `);

  db.run(`INSERT INTO people (id, name, bio, birth_date, photo) VALUES
    ('p1', 'Keanu Reeves', 'Canadian actor known for The Matrix and John Wick.', '1964-09-02', 'https://example.com/keanu.jpg'),
    ('p2', 'Leonardo DiCaprio', 'American actor and producer.', '1974-11-11', 'https://example.com/leo.jpg'),
    ('p3', 'Marlon Brando', 'American actor and film director.', '1924-04-03', 'https://example.com/brando.jpg'),
    ('p4', 'Samuel L. Jackson', 'American actor and producer.', '1948-12-21', 'https://example.com/samuel.jpg'),
    ('p5', 'Matthew McConaughey', 'American actor.', '1969-11-04', 'https://example.com/mcconaughey.jpg'),
    ('p6', 'Christian Bale', 'English actor.', '1974-01-30', 'https://example.com/bale.jpg'),
    ('p7', 'Song Kang-ho', 'South Korean actor.', '1967-01-17', 'https://example.com/song.jpg'),
    ('p8', 'Ryan Gosling', 'Canadian actor.', '1980-11-12', 'https://example.com/gosling.jpg'),
    ('d1', 'Christopher Nolan', 'British-American film director.', '1970-07-30', 'https://example.com/nolan.jpg'),
    ('d2', 'Francis Ford Coppola', 'American film director.', '1939-04-07', 'https://example.com/coppola.jpg'),
    ('d3', 'Quentin Tarantino', 'American film director.', '1963-03-27', 'https://example.com/tarantino.jpg'),
    ('d4', 'Bong Joon-ho', 'South Korean film director.', '1969-12-14', 'https://example.com/bong.jpg'),
    ('d5', 'Damien Chazelle', 'American film director.', '1985-01-19', 'https://example.com/chazelle.jpg'),
    ('d6', 'The Wachowskis', 'American film directors.', '1965-06-21', 'https://example.com/wachowski.jpg')
  `);

  db.run(`INSERT INTO cast_members (movie_id, person_id, character_name, role) VALUES
    ('m1', 'p1', 'Neo', 'ACTOR'),
    ('m2', 'p2', 'Dom Cobb', 'ACTOR'),
    ('m3', 'p3', 'Don Vito Corleone', 'ACTOR'),
    ('m4', 'p4', 'Jules Winnfield', 'ACTOR'),
    ('m5', 'p5', 'Cooper', 'ACTOR'),
    ('m6', 'p6', 'Bruce Wayne', 'ACTOR'),
    ('m7', 'p7', 'Kim Ki-taek', 'ACTOR'),
    ('m8', 'p8', 'Sebastian', 'ACTOR'),
    ('m1', 'd6', NULL, 'DIRECTOR'),
    ('m2', 'd1', NULL, 'DIRECTOR'),
    ('m3', 'd2', NULL, 'DIRECTOR'),
    ('m4', 'd3', NULL, 'DIRECTOR'),
    ('m5', 'd1', NULL, 'DIRECTOR'),
    ('m6', 'd1', NULL, 'DIRECTOR'),
    ('m7', 'd4', NULL, 'DIRECTOR'),
    ('m8', 'd5', NULL, 'DIRECTOR')
  `);

  db.run(`INSERT INTO reviews (id, rating, comment, movie_id, user_id) VALUES
    ('r1', 5, 'A masterpiece that redefined cinema.', 'm1', 'u1'),
    ('r2', 4, 'Mind-bending and visually stunning.', 'm2', 'u2'),
    ('r3', 5, 'The greatest film ever made.', 'm3', 'u3'),
    ('r4', 5, 'Tarantino at his absolute best.', 'm4', 'u1'),
    ('r5', 4, 'A beautiful and emotional space epic.', 'm5', 'u2'),
    ('r6', 5, 'The best superhero film of all time.', 'm6', 'u3'),
    ('r7', 4, 'A brilliant social commentary.', 'm7', 'u1'),
    ('r8', 3, 'Beautiful but a bit slow.', 'm8', 'u2'),
    ('r9', 5, 'Groundbreaking visual effects.', 'm1', 'u2'),
    ('r10', 4, 'Nolan does it again.', 'm5', 'u3')
  `);

  db.run(`INSERT INTO watchlist (user_id, movie_id) VALUES
    ('u1', 'm5'), ('u1', 'm7'),
    ('u2', 'm1'), ('u2', 'm3'),
    ('u3', 'm2'), ('u3', 'm8')
  `);

  saveDb();
}

function q(sql, params = []) {
  const result = db.exec(sql, params);
  if (!result[0]) return [];
  const cols = result[0].columns;
  return result[0].values.map((row) => {
    const obj = {};
    cols.forEach((c, i) => { obj[c] = row[i]; });
    return obj;
  });
}

function q1(sql, params = []) {
  return q(sql, params)[0] || null;
}

function run(sql, params = []) {
  db.run(sql, params);
  saveDb();
}

function getDb() {
  return db;
}

module.exports = { initDb, getDb, uid, q, q1, run };
