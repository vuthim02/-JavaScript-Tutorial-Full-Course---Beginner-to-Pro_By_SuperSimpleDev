const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

function getUserFromCall(call) {
  const metadata = call.metadata.get("authorization");
  if (!metadata.length) return null;

  const token = metadata[0].replace("Bearer ", "");
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

function requireAuth(call) {
  const user = getUserFromCall(call);
  if (!user) {
    const err = new Error("Missing or invalid authorization token");
    err.code = 16;
    throw err;
  }
  return user;
}

module.exports = { getUserFromCall, requireAuth };
