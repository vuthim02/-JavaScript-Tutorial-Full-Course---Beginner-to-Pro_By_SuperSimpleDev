import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(currentDir, '../data');
const usersFile = path.join(dataDir, 'users.json');

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(usersFile);
  } catch {
    await fs.writeFile(usersFile, '[]\n', 'utf8');
  }
}

async function readUsers() {
  await ensureStore();
  const raw = await fs.readFile(usersFile, 'utf8');
  const users = JSON.parse(raw || '[]');
  return Array.isArray(users) ? users : [];
}

async function writeUsers(users) {
  await ensureStore();
  await fs.writeFile(usersFile, `${JSON.stringify(users, null, 2)}\n`, 'utf8');
}

function nextId(users) {
  return users.reduce((maxId, user) => {
    const currentId = Number(user.id) || 0;
    return currentId > maxId ? currentId : maxId;
  }, 0) + 1;
}

export async function getUsers() {
  return readUsers();
}

export async function findUserByEmail(email) {
  const users = await readUsers();
  const normalizedEmail = String(email).trim().toLowerCase();

  return users.find((user) => String(user.email).toLowerCase() === normalizedEmail) ?? null;
}

export async function findUserById(id) {
  const users = await readUsers();
  const userId = Number(id);

  return users.find((user) => Number(user.id) === userId) ?? null;
}

export async function createUser({ username, email, passwordHash }) {
  const users = await readUsers();
  const emailExists = users.some(
    (user) => String(user.email).toLowerCase() === String(email).trim().toLowerCase()
  );

  if (emailExists) {
    throw new Error('EMAIL_EXISTS');
  }

  const newUser = {
    id: nextId(users),
    username: String(username).trim(),
    email: String(email).trim().toLowerCase(),
    password: passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);

  return newUser;
}

export async function updateUser(id, changes) {
  const users = await readUsers();
  const userId = Number(id);
  const index = users.findIndex((user) => Number(user.id) === userId);

  if (index === -1) {
    return null;
  }

  users[index] = {
    ...users[index],
    ...changes,
  };

  await writeUsers(users);
  return users[index];
}

export async function deleteUser(id) {
  const users = await readUsers();
  const userId = Number(id);
  const filteredUsers = users.filter((user) => Number(user.id) !== userId);

  if (filteredUsers.length === users.length) {
    return false;
  }

  await writeUsers(filteredUsers);
  return true;
}
