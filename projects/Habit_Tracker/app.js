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
  const d = new Date();
  while (true) {
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (completions[key]) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  monthYearEl.textContent = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

  daysEl.innerHTML = '';

  for (let i = 0; i < firstDay; i++) {
    const div = document.createElement('div');
    div.className = 'day empty';
    daysEl.appendChild(div);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const div = document.createElement('div');
    div.className = 'day';
    div.textContent = d;

    const key = `${currentYear}-${currentMonth}-${d}`;
    if (completions[key]) {
      div.classList.add('done');
    }

    if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && d === today.getDate()) {
      div.classList.add('today');
    }

    if (d <= today.getDate() || currentYear < today.getFullYear() || (currentYear === today.getFullYear() && currentMonth < today.getMonth())) {
      div.addEventListener('click', () => {
        if (completions[key]) {
          delete completions[key];
        } else {
          completions[key] = true;
        }
        save();
        renderCalendar();
        streakEl.textContent = `${calcStreak()} days`;
      });
    }

    daysEl.appendChild(div);
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
