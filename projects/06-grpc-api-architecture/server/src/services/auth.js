const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const { getDb, saveDb, rowToObject } = require("../db");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

function authService(server) {
  return {
    Register: async (call, callback) => {
      try {
        const { username, password } = call.request;
        const db = await getDb();

        const exists = db.exec(
          `SELECT id FROM users WHERE username = '${username.replace(/'/g, "''")}'`
        );
        if (exists.length && exists[0].values.length) {
          return callback({ code: 6, message: "Username already taken" });
        }

        const hash = await bcrypt.hash(password, 10);
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash]);
        saveDb();

        callback(null, { message: "User created successfully" });
      } catch (err) {
        callback({ code: 13, message: err.message });
      }
    },

    Login: async (call, callback) => {
      try {
        const { username, password } = call.request;
        const db = await getDb();

        const result = db.exec(
          `SELECT * FROM users WHERE username = '${username.replace(/'/g, "''")}'`
        );
        const user = rowToObject(result);

        if (!user) {
          return callback({ code: 7, message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return callback({ code: 7, message: "Invalid credentials" });
        }

        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        callback(null, {
          token,
          user: { id: user.id, username: user.username, role: user.role },
        });
      } catch (err) {
        callback({ code: 13, message: err.message });
      }
    },
  };
}

module.exports = authService;
