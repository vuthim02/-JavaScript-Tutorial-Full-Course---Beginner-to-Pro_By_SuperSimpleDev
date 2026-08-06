const { PubSub } = require('graphql-subscriptions');
const db = require('./db');
const auth = require('./auth');
const { paginate, buildConnection } = require('./utils/pagination');
const { authError, notFoundError, validationError, forbiddenError } = require('./utils/errors');

const pubSub = new PubSub();

const ratingMap = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
const reverseRatingMap = { 1: 'ONE', 2: 'TWO', 3: 'THREE', 4: 'FOUR', 5: 'FIVE' };

const resolvers = {
  Date: {
    serialize: (v) => String(v),
    parseValue: (v) => String(v),
    parseLiteral: (ast) => ast.value,
  },

  URL: {
    serialize: (v) => String(v),
    parseValue: (v) => String(v),
    parseLiteral: (ast) => ast.value,
  },

  Node: {
    __resolveType(obj) {
      if (obj.username) return 'User';
      if (obj.genre) return 'Movie';
      if (obj.movie_id && obj.user_id) return 'Review';
      if (obj.role) return obj.role === 'DIRECTOR' ? 'Director' : 'Actor';
      if (obj.name) return 'Actor';
      return null;
    },
  },

  Person: {
    __resolveType(obj) {
      if (obj.role === 'DIRECTOR') return 'Director';
      const c = db.q1('SELECT role FROM cast_members WHERE person_id = ? AND role = ? LIMIT 1', [obj.id, 'DIRECTOR']);
      return c ? 'Director' : 'Actor';
    },
  },

  SearchResult: {
    __resolveType(obj) {
      if (obj.genre) return 'Movie';
      if (obj.role) return 'Director';
      return 'Actor';
    },
  },

  Actor: {
    filmography: (person) =>
      db.q(
        `SELECT m.* FROM movies m JOIN cast_members cm ON m.id = cm.movie_id
         WHERE cm.person_id = ? AND cm.role = 'ACTOR' ORDER BY m.year DESC`,
        [person.id]
      ),
    birthDate: (p) => p.birth_date,
  },

  Director: {
    filmography: (person) =>
      db.q(
        `SELECT m.* FROM movies m JOIN cast_members cm ON m.id = cm.movie_id
         WHERE cm.person_id = ? AND cm.role = 'DIRECTOR' ORDER BY m.year DESC`,
        [person.id]
      ),
    birthDate: (p) => p.birth_date,
  },

  Movie: {
    cast: (movie, _, { loaders }) =>
      loaders.castByMovieId.load(movie.id).then((rows) =>
        rows
          .filter((r) => r.role === 'ACTOR')
          .map((r) => ({
            person: db.q1('SELECT * FROM people WHERE id = ?', [r.person_id]),
            person_id: r.person_id,
            character: r.character_name,
            role: r.role,
          }))
      ),

    directors: (movie, _, { loaders }) =>
      loaders.castByMovieId.load(movie.id).then((rows) =>
        rows
          .filter((r) => r.role === 'DIRECTOR')
          .map((r) => {
            const p = db.q1('SELECT * FROM people WHERE id = ?', [r.person_id]);
            return p ? { ...p, __typename: 'Director' } : null;
          })
          .filter(Boolean)
      ),

    actors: (movie, _, { loaders }) =>
      loaders.castByMovieId.load(movie.id).then((rows) =>
        rows
          .filter((r) => r.role === 'ACTOR')
          .map((r) => {
            const p = db.q1('SELECT * FROM people WHERE id = ?', [r.person_id]);
            return p ? { ...p, __typename: 'Actor' } : null;
          })
          .filter(Boolean)
      ),

    reviews: (movie, { first, after }, { loaders }) =>
      loaders.reviewsByMovieId.load(movie.id).then((reviews) => {
        const sliced = paginate(reviews, { first, after });
        return buildConnection(sliced, reviews.length, { first, after });
      }),

    reviewCount: (_, __, { loaders }) => loaders.reviewCountByMovieId.load(_.id),

    averageRating: (_, __, { loaders }) => loaders.avgRatingByMovieId.load(_.id),

    inMyWatchlist: (_, __, { loaders, currentUser }) => {
      if (!currentUser) return false;
      return loaders.inWatchlist.load({ userId: currentUser.userId, movieId: _.id });
    },

    createdAt: (m) => m.created_at,
  },

  Review: {
    rating: (review) => reverseRatingMap[review.rating],
    ratingValue: (review) => review.rating,
    movie: (review, _, { loaders }) => loaders.movieById.load(review.movie_id),
    author: (review, _, { loaders }) => loaders.userById.load(review.user_id),
    createdAt: (r) => r.created_at,
  },

  User: {
    reviews: (user, { first, after }, { loaders }) =>
      loaders.reviewsByUserId.load(user.id).then((reviews) => {
        const sliced = paginate(reviews, { first, after });
        return buildConnection(sliced, reviews.length, { first, after });
      }),

    reviewCount: (user, _, { loaders }) =>
      loaders.reviewsByUserId.load(user.id).then((r) => r.length),

    watchlist: (user, { first, after }, { loaders }) =>
      loaders.watchlistByUserId.load(user.id).then((entries) => {
        const movieIds = entries.map((e) => e.movie_id);
        if (!movieIds.length) return buildConnection([], 0, { first, after });
        const movies = movieIds.map((id) => loaders.movieById.load(id)).filter(Boolean);
        const sliced = paginate(movies, { first, after });
        return buildConnection(sliced, movies.length, { first, after });
      }),

    watchlistCount: (user, _, { loaders }) =>
      loaders.watchlistByUserId.load(user.id).then((r) => r.length),

    createdAt: (u) => u.created_at,
  },

  CastMember: {
    person: (cm) => {
      if (cm.person && !cm.person_id) {
        return { ...cm.person, __typename: cm.role === 'DIRECTOR' ? 'Director' : 'Actor' };
      }
      const p = db.q1('SELECT * FROM people WHERE id = ?', [cm.person_id]);
      if (!p) return null;
      return { ...p, __typename: cm.role === 'DIRECTOR' ? 'Director' : 'Actor' };
    },
    character: (cm) => cm.character_name,
    role: (cm) => cm.role,
  },

  Query: {
    node: (_, { id }) => {
      let item = db.q1('SELECT * FROM users WHERE id = ?', [id]);
      if (item) return item;
      item = db.q1('SELECT * FROM movies WHERE id = ?', [id]);
      if (item) return item;
      item = db.q1('SELECT * FROM people WHERE id = ?', [id]);
      if (item) {
        const c = db.q1('SELECT role FROM cast_members WHERE person_id = ? LIMIT 1', [id]);
        return { ...item, __typename: c?.role === 'DIRECTOR' ? 'Director' : 'Actor' };
      }
      item = db.q1('SELECT * FROM reviews WHERE id = ?', [id]);
      return item || null;
    },

    me: (_, __, { currentUser, loaders }) =>
      currentUser ? loaders.userById.load(currentUser.userId) : null,

    users: () => db.q('SELECT * FROM users ORDER BY created_at DESC'),

    user: (_, { id }, { loaders }) => loaders.userById.load(id),

    movies: (_, { genre, year, minYear, maxYear, search, sort, first, after }) => {
      let sql = 'SELECT * FROM movies WHERE 1=1';
      const params = [];
      if (genre) { sql += ' AND genre = ?'; params.push(genre); }
      if (year) { sql += ' AND year = ?'; params.push(year); }
      if (minYear) { sql += ' AND year >= ?'; params.push(minYear); }
      if (maxYear) { sql += ' AND year <= ?'; params.push(maxYear); }
      if (search) {
        sql += ' AND (title LIKE ? OR plot LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }
      if (sort === 'YEAR_ASC') sql += ' ORDER BY year ASC';
      else if (sort === 'YEAR_DESC') sql += ' ORDER BY year DESC';
      else if (sort === 'RATING') sql += ' ORDER BY rating DESC';
      else if (sort === 'TITLE') sql += ' ORDER BY title ASC';
      else sql += ' ORDER BY created_at DESC';

      const all = db.q(sql, params);
      const sliced = paginate(all, { first, after });
      return buildConnection(sliced, all.length, { first, after });
    },

    movie: (_, { id }, { loaders }) => loaders.movieById.load(id),

    movieByTitle: (_, { title }) =>
      db.q1('SELECT * FROM movies WHERE title = ?', [title]),

    people: (_, { search }) => {
      if (search) {
        return db.q('SELECT * FROM people WHERE name LIKE ? OR bio LIKE ? ORDER BY name', [`%${search}%`, `%${search}%`]);
      }
      return db.q('SELECT * FROM people ORDER BY name');
    },

    person: (_, { id }, { loaders }) => loaders.personById.load(id),

    search: (_, { query }) => {
      const p = `%${query}%`;
      const movies = db.q('SELECT * FROM movies WHERE title LIKE ? OR plot LIKE ? LIMIT 5', [p, p]);
      const people = db.q('SELECT * FROM people WHERE name LIKE ? OR bio LIKE ? LIMIT 5', [p, p]);
      return [...movies, ...people];
    },
  },

  Mutation: {
    signup: (_, { input }) => {
      if (!input.username || !input.email || !input.password) {
        throw validationError('All fields are required');
      }
      if (input.password.length < 6) throw validationError('Password too short');

      const existing = db.q1('SELECT id FROM users WHERE email = ? OR username = ?', [input.email, input.username]);
      if (existing) throw validationError('Email or username taken');

      const id = db.uid();
      db.run('INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
        [id, input.username, input.email, auth.hashPassword(input.password)]);
      const user = db.q1('SELECT * FROM users WHERE id = ?', [id]);
      return { token: auth.createToken(user), user };
    },

    login: (_, { input }) => {
      const user = db.q1('SELECT * FROM users WHERE email = ?', [input.email]);
      if (!user || !auth.comparePassword(input.password, user.password)) {
        throw validationError('Invalid email or password');
      }
      return { token: auth.createToken(user), user };
    },

    addReview: (_, { input }, { currentUser }) => {
      if (!currentUser) throw authError();
      const movie = db.q1('SELECT * FROM movies WHERE id = ?', [input.movieId]);
      if (!movie) throw notFoundError('Movie');
      const ratingNum = ratingMap[input.rating];
      if (!ratingNum) throw validationError('Invalid rating');

      const id = db.uid();
      db.run('INSERT INTO reviews (id, rating, comment, movie_id, user_id) VALUES (?, ?, ?, ?, ?)',
        [id, ratingNum, input.comment || null, input.movieId, currentUser.userId]);
      const review = db.q1('SELECT * FROM reviews WHERE id = ?', [id]);

      const avg = db.q1('SELECT AVG(rating) as avg FROM reviews WHERE movie_id = ?', [input.movieId]);
      db.run('UPDATE movies SET rating = ? WHERE id = ?', [Math.round(avg.avg * 10) / 10, input.movieId]);
      const updated = db.q1('SELECT * FROM movies WHERE id = ?', [input.movieId]);

      pubSub.publish('REVIEW_ADDED', { reviewAdded: review, movieId: input.movieId });
      pubSub.publish('MOVIE_RATING_CHANGED', { movieRatingChanged: updated, movieId: input.movieId });
      return review;
    },

    deleteReview: (_, { id }, { currentUser }) => {
      if (!currentUser) throw authError();
      const review = db.q1('SELECT * FROM reviews WHERE id = ?', [id]);
      if (!review) throw notFoundError('Review');
      if (review.user_id !== currentUser.userId) throw forbiddenError();
      db.run('DELETE FROM reviews WHERE id = ?', [id]);
      const avg = db.q1('SELECT AVG(rating) as avg FROM reviews WHERE movie_id = ?', [review.movie_id]);
      db.run('UPDATE movies SET rating = ? WHERE id = ?', [avg?.avg ? Math.round(avg.avg * 10) / 10 : 0, review.movie_id]);
      return true;
    },

    toggleWatchlist: (_, { movieId }, { currentUser }) => {
      if (!currentUser) throw authError();
      const movie = db.q1('SELECT * FROM movies WHERE id = ?', [movieId]);
      if (!movie) throw notFoundError('Movie');
      const existing = db.q1('SELECT * FROM watchlist WHERE user_id = ? AND movie_id = ?', [currentUser.userId, movieId]);
      if (existing) {
        db.run('DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?', [currentUser.userId, movieId]);
      } else {
        db.run('INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)', [currentUser.userId, movieId]);
      }
      return movie;
    },

    createMovie: (_, { title, year, genre, duration, plot }, { currentUser }) => {
      if (!currentUser) throw authError();
      if (!title || !year || !genre) throw validationError('Title, year, and genre are required');
      const id = db.uid();
      db.run('INSERT INTO movies (id, title, year, genre, duration, plot) VALUES (?, ?, ?, ?, ?, ?)',
        [id, title, year, genre, duration || null, plot || null]);
      return db.q1('SELECT * FROM movies WHERE id = ?', [id]);
    },
  },

  Subscription: {
    reviewAdded: {
      subscribe: () => pubSub.asyncIterator('REVIEW_ADDED'),
      resolve: (payload) => payload.reviewAdded,
    },
    movieRatingChanged: {
      subscribe: () => pubSub.asyncIterator('MOVIE_RATING_CHANGED'),
      resolve: (payload) => payload.movieRatingChanged,
    },
  },
};

module.exports = resolvers;
