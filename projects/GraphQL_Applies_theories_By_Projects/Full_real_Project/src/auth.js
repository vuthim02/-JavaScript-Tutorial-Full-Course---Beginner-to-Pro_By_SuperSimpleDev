const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config');

function hashPassword(plain) {
  return bcrypt.hashSync(plain, 10);
}

function comparePassword(plain, hash) {
  return bcrypt.compareSync(plain, hash);
}

function createToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch {
    return null;
  }
}

function getUserFromReq(req) {
  const header = req.headers.authorization;
  if (!header) return null;
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  const payload = verifyToken(parts[1]);
  return payload ? { userId: payload.sub, username: payload.username } : null;
}

module.exports = { hashPassword, comparePassword, createToken, verifyToken, getUserFromReq };
