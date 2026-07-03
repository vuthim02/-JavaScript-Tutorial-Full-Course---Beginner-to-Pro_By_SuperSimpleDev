const { getDb, saveDb, rowToObject } = require("../db");
const { requireAuth } = require("../middleware/auth");

const port = process.env.PORT || "50051";
const serverId = `S${port === "50051" ? 1 : port === "50052" ? 2 : 3}`;

function toBook(row) {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    year: row.year,
    created_at: row.created_at || "",
    created_by: row.created_by_username || "",
  };
}

function getBookById(db, id) {
  const result = db.exec(`
    SELECT b.id, b.title, b.author, b.year, b.created_at,
           u.username AS created_by_username
    FROM books b
    LEFT JOIN users u ON b.created_by = u.id
    WHERE b.id = ${parseInt(id)}
  `);
  return rowToObject(result);
}

function getAllBooks(db, query) {
  let sql = `
    SELECT b.id, b.title, b.author, b.year, b.created_at,
           u.username AS created_by_username
    FROM books b
    LEFT JOIN users u ON b.created_by = u.id
    WHERE 1=1
  `;
  if (query.author) {
    sql += ` AND b.author LIKE '%${query.author.replace(/'/g, "''")}%'`;
  }
  if (query.year) {
    sql += ` AND b.year = ${parseInt(query.year)}`;
  }
  sql += " ORDER BY b.id ASC";

  const result = db.exec(sql);
  if (!result.length) return [];

  const cols = result[0].columns;
  return result[0].values.map((row) =>
    toBook(Object.fromEntries(cols.map((c, i) => [c, row[i]])))
  );
}

function bookstoreService() {
  return {
    ListBooks: async (call, callback) => {
      try {
        const db = await getDb();
        const books = getAllBooks(db, call.request);
        callback(null, { books });
      } catch (err) {
        callback({ code: 13, message: err.message });
      }
    },

    GetBook: async (call, callback) => {
      try {
        const db = await getDb();
        const row = getBookById(db, call.request.id);

        if (!row) {
          return callback({ code: 5, message: "Book not found" });
        }

        callback(null, toBook(row));
      } catch (err) {
        callback({ code: 13, message: err.message });
      }
    },

    CreateBook: async (call, callback) => {
      try {
        const user = requireAuth(call);
        const { title, author, year } = call.request;
        const db = await getDb();

        db.run(
          "INSERT INTO books (title, author, year, created_by) VALUES (?, ?, ?, ?)",
          [title, author, year, user.id]
        );

        const id = db.exec("SELECT last_insert_rowid()")[0].values[0][0];
        saveDb();

        const row = getBookById(db, id);
        callback(null, toBook(row));
      } catch (err) {
        callback({ code: err.code || 13, message: err.message });
      }
    },

    UpdateBook: async (call, callback) => {
      try {
        requireAuth(call);
        const { id, title, author, year } = call.request;
        const db = await getDb();

        const existing = getBookById(db, id);
        if (!existing) {
          return callback({ code: 5, message: "Book not found" });
        }

        db.run(
          "UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?",
          [title, author, year, id]
        );
        saveDb();

        callback(null, toBook(getBookById(db, id)));
      } catch (err) {
        callback({ code: err.code || 13, message: err.message });
      }
    },

    DeleteBook: async (call, callback) => {
      try {
        requireAuth(call);
        const db = await getDb();
        const id = call.request.id;

        const existing = getBookById(db, id);
        if (!existing) {
          return callback({ code: 5, message: "Book not found" });
        }

        db.run("DELETE FROM books WHERE id = ?", [id]);
        saveDb();

        callback(null, { message: "Book deleted" });
      } catch (err) {
        callback({ code: err.code || 13, message: err.message });
      }
    },

    SearchBooks: (call) => {
      (async () => {
        try {
          const db = await getDb();
          const query = call.request.query || "";
          const result = db.exec(`
            SELECT b.id, b.title, b.author, b.year, b.created_at,
                   u.username AS created_by_username
            FROM books b
            LEFT JOIN users u ON b.created_by = u.id
            WHERE b.title LIKE '%${query.replace(/'/g, "''")}%'
               OR b.author LIKE '%${query.replace(/'/g, "''")}%'
            ORDER BY b.id ASC
          `);

          if (result.length) {
            const cols = result[0].columns;
            for (const row of result[0].values) {
              const obj = Object.fromEntries(cols.map((c, i) => [c, row[i]]));
              call.write(toBook(obj));
            }
          }
          call.end();
        } catch (err) {
          call.emit("error", { code: 13, message: err.message });
        }
      })();
    },

    BatchCreateBooks: async (call, callback) => {
      try {
        const user = requireAuth(call);
        const db = await getDb();
        const created = [];

        call.on("data", async (req) => {
          db.run(
            "INSERT INTO books (title, author, year, created_by) VALUES (?, ?, ?, ?)",
            [req.title, req.author, req.year, user.id]
          );
          const id = db.exec("SELECT last_insert_rowid()")[0].values[0][0];
          const row = getBookById(db, id);
          created.push(toBook(row));
        });

        call.on("end", () => {
          saveDb();
          callback(null, { count: created.length, books: created });
        });
      } catch (err) {
        callback({ code: err.code || 13, message: err.message });
      }
    },

    LiveBookUpdates: (call) => {
      let user;
      try {
        user = requireAuth(call);
      } catch (err) {
        call.emit("error", err);
        return;
      }

      call.on("data", async (action) => {
        const db = await getDb();
        let book;

        if (action.type === "create" && action.title) {
          db.run(
            "INSERT INTO books (title, author, year, created_by) VALUES (?, ?, ?, ?)",
            [action.title, action.author, action.year || 2024, user.id]
          );
          const id = db.exec("SELECT last_insert_rowid()")[0].values[0][0];
          saveDb();
          book = toBook(getBookById(db, id));
          call.write({ event: "created", book });
        } else if (action.type === "delete" && action.book_id) {
          db.run("DELETE FROM books WHERE id = ?", [action.book_id]);
          saveDb();
          call.write({
            event: "deleted",
            book: { id: action.book_id, title: "", author: "", year: 0 },
          });
        } else if (action.type === "ping") {
          call.write({ event: "pong", book: null });
        }
      });

      call.on("end", () => {
        call.end();
      });
    },
  };
}

module.exports = bookstoreService;
