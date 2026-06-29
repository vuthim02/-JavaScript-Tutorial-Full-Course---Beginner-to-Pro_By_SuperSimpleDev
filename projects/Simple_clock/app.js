const clockEl = document.getElementById('clock');
const ampmEl = document.getElementById('ampm');
const toggleBtn = document.getElementById('toggleBtn');

let is24Hour = true;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  let ampm = '';

  if (!is24Hour) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
  }

  const timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad3(milliseconds)}`;

  clockEl.textContent = timeString;
  ampmEl.textContent = ampm;
}

function pad(num) {
  return num < 10 ? `0${num}` : num;
}

function pad3(num) {
  return num < 10 ? `00${num}` : num < 100 ? `0${num}` : num;
}

toggleBtn.addEventListener('click', () => {
  is24Hour = !is24Hour;
  toggleBtn.textContent = is24Hour ? 'Switch to 12-hour' : 'Switch to 24-hour';
  ampmEl.style.display = is24Hour ? 'none' : 'block';
  updateClock();
});

ampmEl.style.display = 'none';

updateClock();
setInterval(updateClock, 100);
