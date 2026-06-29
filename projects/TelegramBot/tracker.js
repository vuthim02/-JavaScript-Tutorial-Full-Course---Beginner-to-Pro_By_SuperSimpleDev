const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadProgress() {
  ensureDataDir();
  if (!fs.existsSync(PROGRESS_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveProgress(data) {
  ensureDataDir();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2));
}

function getUserProgress(userId) {
  const data = loadProgress();
  return data[userId] || { completed: [], started: new Date().toISOString(), streak: 0, lastActive: null };
}

function completeLesson(userId, lessonId) {
  const data = loadProgress();
  if (!data[userId]) {
    data[userId] = { completed: [], started: new Date().toISOString(), streak: 0, lastActive: null };
  }
  if (!data[userId].completed.includes(lessonId)) {
    data[userId].completed.push(lessonId);
  }
  const today = new Date().toDateString();
  if (data[userId].lastActive === today) {
    data[userId].streak = (data[userId].streak || 0) + 1;
  } else {
    data[userId].streak = 1;
  }
  data[userId].lastActive = today;
  saveProgress(data);
  return data[userId];
}

function getStats(userId) {
  const prog = getUserProgress(userId);
  const { curriculum } = require('./lessons');
  return {
    completed: prog.completed,
    total: curriculum.length,
    percent: Math.round((prog.completed.length / curriculum.length) * 100),
    streak: prog.streak || 0,
    started: prog.started
  };
}

module.exports = { getUserProgress, completeLesson, getStats };
