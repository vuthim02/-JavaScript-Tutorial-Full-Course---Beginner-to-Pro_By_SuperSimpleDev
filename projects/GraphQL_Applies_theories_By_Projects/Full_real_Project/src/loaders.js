const DataLoader = require('dataloader');
const db = require('./db');

function many(sql, params) {
  return Promise.resolve(db.q(sql, params));
}

function inClause(items) {
  return items.map(() => '?').join(',');
}

function createLoaders() {
  return {
    userById: new DataLoader((ids) =>
      many(`SELECT * FROM users WHERE id IN (${inClause(ids)})`, ids).then((rows) => {
        const m = Object.fromEntries(rows.map((r) => [r.id, r]));
        return ids.map((id) => m[id] || null);
      })
    ),

    movieById: new DataLoader((ids) =>
      many(`SELECT * FROM movies WHERE id IN (${inClause(ids)})`, ids).then((rows) => {
        const m = Object.fromEntries(rows.map((r) => [r.id, r]));
        return ids.map((id) => m[id] || null);
      })
    ),

    personById: new DataLoader((ids) =>
      many(`SELECT * FROM people WHERE id IN (${inClause(ids)})`, ids).then((rows) => {
        const m = Object.fromEntries(rows.map((r) => [r.id, r]));
        return ids.map((id) => m[id] || null);
      })
    ),

    castByMovieId: new DataLoader((movieIds) =>
      many(`SELECT * FROM cast_members WHERE movie_id IN (${inClause(movieIds)})`, movieIds).then((rows) => {
        const m = {};
        for (const row of rows) {
          if (!m[row.movie_id]) m[row.movie_id] = [];
          m[row.movie_id].push(row);
        }
        return movieIds.map((id) => m[id] || []);
      })
    ),

    reviewsByMovieId: new DataLoader((movieIds) =>
      many(`SELECT * FROM reviews WHERE movie_id IN (${inClause(movieIds)}) ORDER BY created_at DESC`, movieIds).then((rows) => {
        const m = {};
        for (const row of rows) {
          if (!m[row.movie_id]) m[row.movie_id] = [];
          m[row.movie_id].push(row);
        }
        return movieIds.map((id) => m[id] || []);
      })
    ),

    reviewCountByMovieId: new DataLoader((movieIds) =>
      many(`SELECT movie_id, COUNT(*) as c FROM reviews WHERE movie_id IN (${inClause(movieIds)}) GROUP BY movie_id`, movieIds).then((rows) => {
        const m = Object.fromEntries(rows.map((r) => [r.movie_id, r.c]));
        return movieIds.map((id) => m[id] || 0);
      })
    ),

    avgRatingByMovieId: new DataLoader((movieIds) =>
      many(`SELECT movie_id, AVG(rating) as avg FROM reviews WHERE movie_id IN (${inClause(movieIds)}) GROUP BY movie_id`, movieIds).then((rows) => {
        const m = {};
        for (const r of rows) m[r.movie_id] = Math.round(r.avg * 10) / 10;
        return movieIds.map((id) => m[id] || 0);
      })
    ),

    inWatchlist: new DataLoader((keys) => {
      const conditions = keys.map(() => '(user_id = ? AND movie_id = ?)').join(' OR ');
      const params = [];
      for (const k of keys) params.push(k.userId, k.movieId);
      return many(`SELECT user_id, movie_id FROM watchlist WHERE ${conditions}`, params).then((rows) => {
        const set = new Set(rows.map((r) => `${r.user_id}:${r.movie_id}`));
        return keys.map((k) => set.has(`${k.userId}:${k.movieId}`));
      });
    }),

    watchlistByUserId: new DataLoader((userIds) =>
      many(`SELECT * FROM watchlist WHERE user_id IN (${inClause(userIds)}) ORDER BY added_at DESC`, userIds).then((rows) => {
        const m = {};
        for (const row of rows) {
          if (!m[row.user_id]) m[row.user_id] = [];
          m[row.user_id].push(row);
        }
        return userIds.map((id) => m[id] || []);
      })
    ),

    reviewsByUserId: new DataLoader((userIds) =>
      many(`SELECT * FROM reviews WHERE user_id IN (${inClause(userIds)}) ORDER BY created_at DESC`, userIds).then((rows) => {
        const m = {};
        for (const row of rows) {
          if (!m[row.user_id]) m[row.user_id] = [];
          m[row.user_id].push(row);
        }
        return userIds.map((id) => m[id] || []);
      })
    ),
  };
}

module.exports = { createLoaders };
