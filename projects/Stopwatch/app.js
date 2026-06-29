const display = document.getElementById('display');
const lapsList = document.getElementById('laps');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

let running = false;
let startTime = 0;
let elapsed = 0;
let intervalId = null;
let lapCount = 0;

function formatTime(ms) {
  const totalSec = ms / 1000;
  const minutes = Math.floor(totalSec / 60);
  const seconds = Math.floor(totalSec % 60);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function pad(n) {
  return n < 10 ? `0${n}` : n;
}

function updateDisplay() {
  const now = running ? Date.now() - startTime + elapsed : elapsed;
  display.textContent = formatTime(now);
}

function start() {
  if (running) return;
  running = true;
  startTime = Date.now();
  intervalId = setInterval(updateDisplay, 10);
}

function pause() {
  if (!running) return;
  running = false;
  elapsed += Date.now() - startTime;
  clearInterval(intervalId);
  intervalId = null;
}

function reset() {
  running = false;
  clearInterval(intervalId);
  intervalId = null;
  elapsed = 0;
  lapCount = 0;
  display.textContent = '00:00.00';
  lapsList.innerHTML = '';
}

function lap() {
  if (!running) return;
  lapCount++;
  const now = Date.now() - startTime + elapsed;
  const li = document.createElement('li');
  li.innerHTML = `<span>Lap ${lapCount}</span><span>${formatTime(now)}</span>`;
  lapsList.prepend(li);
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
