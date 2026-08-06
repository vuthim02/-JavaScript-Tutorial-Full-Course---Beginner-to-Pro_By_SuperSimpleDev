// ============================================
// GENERATORS / ITERATORS: function*, yield, Symbol.iterator
// ============================================

// --- Generators ---

// Generator: yields each date in a range
function* dateRange(startDate, endDate) {
  const current = new Date(startDate);
  while (current <= endDate) {
    yield new Date(current);
    current.setDate(current.getDate() + 1);
  }
}

// Generator: yields streak count as we walk backward from today
function* streakGenerator(completions) {
  const d = new Date();
  let streak = 0;

  while (true) {
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (completions[key]) {
      streak++;
      yield { date: new Date(d), streak, completed: true };
      d.setDate(d.getDate() - 1);
    } else {
      yield { date: new Date(d), streak, completed: false };
      return; // generator ends
    }
  }
}

// Generator: yields calendar weeks for a month
function* calendarWeeks(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let week = new Array(7).fill(null);
  let dayOfWeek = firstDay;

  for (let d = 1; d <= daysInMonth; d++) {
    week[dayOfWeek] = d;
    if (dayOfWeek === 6 || d === daysInMonth) {
      yield week;
      week = new Array(7).fill(null);
      dayOfWeek = 0;
    } else {
      dayOfWeek++;
    }
  }
}

// --- Custom Iterator with Symbol.iterator ---

class HabitMonth {
  #year;
  #month;
  #completions;

  constructor(year, month, completions) {
    this.#year = year;
    this.#month = month;
    this.#completions = completions;
  }

  // Makes HabitMonth iterable with for...of
  [Symbol.iterator]() {
    const year = this.#year;
    const month = this.#month;
    const completions = this.#completions;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let day = 1;

    return {
      next() {
        if (day > daysInMonth) return { done: true };

        const key = `${year}-${month}-${day}`;
        const isCompleted = !!completions[key];
        const isToday = new Date().getFullYear() === year
          && new Date().getMonth() === month
          && new Date().getDate() === day;
        const isPast = new Date(year, month, day) <= new Date(new Date().toDateString());

        const result = {
          value: {
            day,
            key,
            isCompleted,
            isToday,
            isPast,
            isClickable: isPast || isToday,
          },
          done: false,
        };
        day++;
        return result;
      },
    };
  }

  // Also add .length and .forEach for convenience
  get length() {
    return new Date(this.#year, this.#month + 1, 0).getDate();
  }

  forEach(fn) {
    for (const day of this) fn(day);
  }

  map(fn) {
    const results = [];
    for (const day of this) results.push(fn(day));
    return results;
  }

  filter(fn) {
    const results = [];
    for (const day of this) if (fn(day)) results.push(day);
    return results;
  }
}

// --- Main App ---

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let completions = JSON.parse(localStorage.getItem('habits')) || {};

const monthYearEl = document.getElementById('monthYear');
const daysEl = document.getElementById('days');
const streakEl = document.getElementById('streak');

function save() {
  localStorage.setItem('habits', JSON.stringify(completions));
}

function calcStreak() {
  let streak = 0;
  for (const { completed } of streakGenerator(completions)) {
    if (completed) streak++;
    else break;
  }
  return streak;
}

function renderCalendar() {
  monthYearEl.textContent = new Date(currentYear, currentMonth)
    .toLocaleString('default', { month: 'long', year: 'numeric' });

  daysEl.innerHTML = '';
  const habitMonth = new HabitMonth(currentYear, currentMonth, completions);

  // Use the custom iterator with for...of
  for (const day of habitMonth) {
    const div = document.createElement('div');
    div.className = 'day';
    div.textContent = day.day;

    if (day.isCompleted) div.classList.add('done');
    if (day.isToday) div.classList.add('today');

    if (day.isClickable) {
      div.addEventListener('click', () => {
        if (completions[day.key]) {
          delete completions[day.key];
        } else {
          completions[day.key] = true;
        }
        save();
        renderCalendar();
        streakEl.textContent = `${calcStreak()} days`;
      });
    }

    daysEl.appendChild(div);
  }
}

// Use generator to log streak info
function logStreakInfo() {
  console.log('--- Streak Generator Output ---');
  for (const { date, streak, completed } of streakGenerator(completions)) {
    console.log(`${date.toDateString()}: streak=${streak}, completed=${completed}`);
  }
}

// Use dateRange generator to show upcoming week
function logUpcomingWeek() {
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 6);
  console.log('--- Next 7 Days (dateRange generator) ---');
  for (const date of dateRange(start, end)) {
    console.log(date.toDateString());
  }
}

document.getElementById('prevBtn').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  renderCalendar();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  renderCalendar();
});

renderCalendar();
streakEl.textContent = `${calcStreak()} days`;

// Demo generators in console
logUpcomingWeek();
logStreakInfo();
