// ============================================
// PROTOTYPES / INHERITANCE: Base class + subclass
// Extended: femtoseconds → years → light-years
// Persistent: survives browser close via localStorage
// ============================================

const STORAGE_KEY = 'stopwatch_running';
const STORAGE_START = 'stopwatch_start';
const STORAGE_ELAPSED = 'stopwatch_elapsed';

class Timer {
  #startTime;
  #elapsed;
  #running;
  #intervalId;

  constructor() {
    this.#intervalId = null;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') {
      this.#running = true;
      this.#startTime = Number(localStorage.getItem(STORAGE_START));
      this.#elapsed = Number(localStorage.getItem(STORAGE_ELAPSED)) || 0;
    } else {
      this.#running = false;
      this.#startTime = 0;
      this.#elapsed = Number(localStorage.getItem(STORAGE_ELAPSED)) || 0;
    }

    console.log('Timer prototype:', Object.getPrototypeOf(this));
    console.log('Timer proto chain:', Timer.prototype);

    if (this.#running) {
      this.#intervalId = setInterval(() => this._onTick(), 1);
      this._onTick();
    }
  }

  start() {
    if (this.#running) return;
    this.#running = true;
    this.#startTime = performance.now();
    this.#elapsed = Number(localStorage.getItem(STORAGE_ELAPSED)) || 0;
    this.#intervalId = setInterval(() => this._onTick(), 1);

    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.setItem(STORAGE_START, String(this.#startTime));
    localStorage.setItem(STORAGE_ELAPSED, String(this.#elapsed));
  }

  pause() {
    if (!this.#running) return;
    this.#running = false;
    this.#elapsed += performance.now() - this.#startTime;
    clearInterval(this.#intervalId);
    this.#intervalId = null;

    localStorage.setItem(STORAGE_KEY, 'false');
    localStorage.setItem(STORAGE_ELAPSED, String(this.#elapsed));
  }

  stop() {
    if (!this.#running) return;
    this.#running = false;
    this.#elapsed += performance.now() - this.#startTime;
    clearInterval(this.#intervalId);
    this.#intervalId = null;

    localStorage.setItem(STORAGE_KEY, 'false');
    localStorage.setItem(STORAGE_ELAPSED, String(this.#elapsed));
  }

  reset() {
    this.#running = false;
    clearInterval(this.#intervalId);
    this.#intervalId = null;
    this.#elapsed = 0;

    localStorage.setItem(STORAGE_KEY, 'false');
    localStorage.setItem(STORAGE_ELAPSED, '0');
    localStorage.removeItem(STORAGE_START);

    this._onReset();
  }

  get isRunning() { return this.#running; }

  getElapsed() {
    if (this.#running) {
      const now = performance.now();
      const sessionElapsed = now - this.#startTime;
      return this.#elapsed + sessionElapsed;
    }
    return this.#elapsed;
  }

  _onTick() {}
  _onReset() {}

  static formatTimeDetailed(ms) {
    const totalMs = Math.floor(ms);
    const totalSec = totalMs / 1000;

    const SEC_PER_MIN  = 60;
    const SEC_PER_HOUR = 3600;
    const SEC_PER_DAY  = 86400;
    const SEC_PER_YEAR = 31557600;

    const years   = Math.floor(totalSec / SEC_PER_YEAR);
    const days    = Math.floor((totalSec % SEC_PER_YEAR) / SEC_PER_DAY);
    const hours   = Math.floor((totalSec % SEC_PER_DAY) / SEC_PER_HOUR);
    const minutes = Math.floor((totalSec % SEC_PER_HOUR) / SEC_PER_MIN);
    const seconds = Math.floor(totalSec % SEC_PER_MIN);

    const microInMs    = ms % 1;
    const microseconds = Math.floor(microInMs * 1000);
    const nanoInMicro  = (microInMs * 1000) % 1;
    const nanoseconds  = Math.floor(nanoInMicro * 1000);
    const picoInNano   = (nanoInMicro * 1000) % 1;
    const picoseconds  = Math.floor(picoInNano * 1000);
    const femtoInPico  = (picoInNano * 1000) % 1;
    const femtoseconds = Math.floor(femtoInPico * 1000);

    return `${Timer.pad(years)}y-${Timer.pad3(days)}d `
         + `${Timer.pad(hours)}:${Timer.pad(minutes)}:${Timer.pad(seconds)}.`
         + `${Timer.pad3(microseconds)}${Timer.pad3(nanoseconds)}`
         + `${Timer.pad3(picoseconds)}${Timer.pad3(femtoseconds)}`;
  }

  static formatLightYears(ms) {
    const sec = ms / 1000;
    const ly  = sec / 31557600;
    return ly.toFixed(9) + ' ly';
  }

  static pad(n) {
    return n < 10 ? `0${n}` : `${n}`;
  }

  static pad3(n) {
    return String(n).padStart(3, '0');
  }
}

// LapTimer extends Timer
class LapTimer extends Timer {
  #laps;
  #lapCount;
  #display;
  #displayLight;
  #lapsList;
  #statusEl;

  constructor(displayEl, displayLightEl, lapsListEl, statusEl) {
    super();
    this.#display = displayEl;
    this.#displayLight = displayLightEl;
    this.#lapsList = lapsListEl;
    this.#statusEl = statusEl;

    const savedLaps = JSON.parse(localStorage.getItem('stopwatch_laps') || '[]');
    this.#laps = savedLaps;
    this.#lapCount = savedLaps.length;

    savedLaps.forEach(lap => {
      const li = document.createElement('li');
      li.innerHTML =
        `<span>Lap ${lap.number}</span><span>${Timer.formatTimeDetailed(lap.time)}</span>`;
      this.#lapsList.prepend(li);
    });

    this._onTick();
    this.#updateStatus();

    console.log('LapTimer prototype:', Object.getPrototypeOf(this));
    console.log('Has getElapsed:', typeof this.getElapsed);
    console.log('Has lap:', typeof this.lap);
  }

  #updateStatus() {
    if (this.#statusEl) {
      this.#statusEl.textContent = this.isRunning ? 'RUNNING' : 'STOPPED';
      this.#statusEl.className = 'status ' + (this.isRunning ? 'running' : 'stopped');
    }
  }

  _onTick() {
    const elapsed = this.getElapsed();
    this.#display.textContent = Timer.formatTimeDetailed(elapsed);
    this.#displayLight.textContent = Timer.formatLightYears(elapsed);
    this.#updateStatus();
  }

  _onReset() {
    this.#laps = [];
    this.#lapCount = 0;
    this.#display.textContent = '00y-000d 00:00:00.000000000000000';
    this.#displayLight.textContent = '0.000000000 ly';
    this.#lapsList.innerHTML = '';
    localStorage.removeItem('stopwatch_laps');
    this.#updateStatus();
  }

  stop() {
    super.stop();
    this.#updateStatus();
  }

  lap() {
    if (!this.isRunning) return;
    this.#lapCount++;
    const elapsed = this.getElapsed();

    this.#laps.push({ number: this.#lapCount, time: elapsed });
    localStorage.setItem('stopwatch_laps', JSON.stringify(this.#laps));

    const li = document.createElement('li');
    li.innerHTML =
      `<span>Lap ${this.#lapCount}</span><span>${Timer.formatTimeDetailed(elapsed)}</span>`;
    this.#lapsList.prepend(li);
  }

  getLaps()       { return [...this.#laps]; }
  getLapCount()   { return this.#lapCount; }

  getFastestLap() {
    if (this.#laps.length === 0) return null;
    return this.#laps.reduce((fastest, lap) =>
      lap.time < fastest.time ? lap : fastest
    );
  }
}

// --- Init ---
const stopwatch = new LapTimer(
  document.getElementById('display'),
  document.getElementById('displayLight'),
  document.getElementById('laps'),
  document.getElementById('status')
);

document.getElementById('startBtn').addEventListener('click', () => stopwatch.start());
document.getElementById('stopBtn').addEventListener('click',  () => stopwatch.stop());
document.getElementById('resetBtn').addEventListener('click', () => stopwatch.reset());
document.getElementById('lapBtn').addEventListener('click',   () => stopwatch.lap());
