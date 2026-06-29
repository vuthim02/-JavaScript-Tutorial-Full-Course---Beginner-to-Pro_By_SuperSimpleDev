# Level 116: Timer / Countdown App (Functions + DOM + Intervals)

## Error Snippets

### Error 1: setInterval returns a number not an object
**Description:** Start a timer that counts seconds
```javascript
const timer = setInterval(function() {}, 1000);
timer.myProperty = 'test';
```

### Error 2: ClearInterval with wrong reference
**Description:** Stop the timer when it reaches zero
```javascript
let count = 10;
const id = setInterval(function() {
  count--;
  if (count === 0) clearInterval(count);
}, 1000);
```

### Error 3: Typo in function name for timer update
**Description:** Update the timer display each second
```javascript
function updateTimer() {
  display.textContent = seconds;
}
setInterval(updateTimr, 1000);
```

### Error 4: Const used for mutable counter
**Description:** Decrement the countdown value
```javascript
function tick() {
  const count = 10;
  count--;
}
```

### Error 5: parseInt on undefined value
**Description:** Parse minutes input
```javascript
const mins = parseInt(document.getElementById('minutes').value);
```

### Error 6: Wrong DOM property for setting time
**Description:** Set the timer display text
```javascript
timerDisplay.innerHTML = '10:00';
```

### Error 7: Recursive setTimeout without base case
**Description:** Create a repeating timer
```javascript
function startTimer() {
  setTimeout(function() {
    updateDisplay();
    startTimer();
  }, 1000);
}
```

### Error 8: Comparing string to number with ===
**Description:** Check if timer has reached zero
```javascript
if (display.textContent === 0) {
  stop();
}
```

### Error 9: Wrong method for clearing timeout
**Description:** Cancel a delayed start
```javascript
const delay = setTimeout(start, 3000);
clearInterval(delay);
```

### Error 10: Missing new in Date constructor
**Description:** Get elapsed time
```javascript
const start = Date();
```

### Error 11: Assignment instead of comparison in timer loop
**Description:** Check if timer is running
```javascript
if (timerId = null) {
  startTimer();
}
```

### Error 12: Using getElementById with wrong ID
**Description:** Get the timer display element
```javascript
const display = document.getElementById('timer-display');
```

### Error 13: Typo in setInterval method
**Description:** Start a one-second interval
```javascript
const id = setInteral(tick, 1000);
```

### Error 14: Null reference for stop button
**Description:** Disable the stop button after timer ends
```javascript
const stopBtn = document.querySelector('.stop-btn');
stopBtn.disabled = true;
```

### Error 15: Wrong Math method for rounding
**Description:** Format minutes from seconds
```javascript
const mins = Math.ceil(seconds / 60);
```

### Error 16: Using delete on primitive
**Description:** Reset the timer state
```javascript
delete timerState;
```

### Error 17: String concatenation error in time format
**Description:** Format time as MM:SS
```javascript
function format(m, s) {
  return m + ':' + s;
}
```

### Error 18: Re-declaring let variable in same block
**Description:** Declare the interval variable twice
```javascript
let interval = setInterval(tick, 1000);
let interval = null;
```

### Error 19: Wrong event for start button
**Description:** Start the timer on button click
```javascript
startBtn.addEventListener('mouseover', startTimer);
```

### Error 20: Off-by-one in countdown logic
**Description:** Count down from 10 to 0 inclusive
```javascript
let count = 10;
function tick() {
  count--;
  if (count >= 0) display.textContent = count;
}
```

### Error 21: Using slice on number
**Description:** Get the last two digits of time
```javascript
const secs = time.slice(-2);
```

### Error 22: For loop with wrong condition for timer
**Description:** Create a synchronous delay (blocking)
```javascript
function delay(ms) {
  const start = Date.now();
  for (let i = 0; i < 100000000; i++) {
    if (Date.now() - start >= ms) break;
  }
}
```

### Error 23: Typo in localStorage method
**Description:** Save timer settings
```javascript
localStorag.setItem('timer', JSON.stringify(settings));
```

### Error 24: Wrong variable name in template literal
**Description:** Show time-up message
```javascript
const msg = `Time's up! Total: ${formatted}`;
```

### Error 25: Arrow function syntax error
**Description:** Timer tick as arrow function
```javascript
const tick = () => => {
  seconds++;
};
```

### Error 26: Undefined property in duration object
**Description:** Get total seconds from duration
```javascript
const duration = { hours: 1, minutes: 30 };
const total = duration.hours * 3600 + duration.minutes;
```

### Error 27: Wrong position of clearInterval
**Description:** Stop timer after 5 seconds
```javascript
const id = setInterval(function() {
  console.log('tick');
}, 1000);
clearInterval(id);
```

### Error 28: Missing argument in setInterval callback
**Description:** Timer update with parameter
```javascript
function update(display, time) {
  display.textContent = time;
}
setInterval(update, 1000);
```

### Error 29: Query selector typo
**Description:** Get the timer container
```javascript
const container = document.querySelector('.time-container');
```

### Error 30: InnerHTML on null from querySelector
**Description:** Set the timer status message
```javascript
document.querySelector('.status').innerHTML = 'Running';
```

### Error 31: Wrong property for performance.now
**Description:** Get high-precision timestamp
```javascript
const start = performance.now;
```

### Error 32: Not converting string to number for subtraction
**Description:** Subtract elapsed time from total
```javascript
const remaining = total - elapsed;
```

### Error 33: Using var in for loop for timer buttons
**Description:** Create timer preset buttons
```javascript
const presets = [5, 10, 15];
for (var i = 0; i < presets.length; i++) {
  buttons[i].onclick = function() {
    setTimer(presets[i]);
  };
}
```

### Error 34: Wrong bracket notation for object
**Description:** Get timer config property
```javascript
const config = { defaultTime: 300 };
const val = config['defaultTime'];
```

### Error 35: Double negative in pause condition
**Description:** Check if timer is not paused
```javascript
if (!isPaused !== true) {
  resumeTimer();
}
```

### Error 36: Splitting on non-string
**Description:** Parse time string into components
```javascript
const parts = timeString.split(':');
```

### Error 37: Wrong return from getter function
**Description:** Get remaining time in seconds
```javascript
function getRemaining() {
  return remaining;
}
```

### Error 38: Using push on a string
**Description:** Build time history array incorrectly
```javascript
const history = '';
history.push('5:00');
```

### Error 39: Wrong operator in ternary for time
**Description:** Show singular or plural "second"
```javascript
const label = seconds > 1 ? 'seconds' : 'second';
```

### Error 40: Recursive call without timeout
**Description:** Create a precise timer loop
```javascript
function preciseTimer() {
  const diff = Date.now() - start;
  updateDisplay(diff);
  preciseTimer();
}
```

### Error 41: Wrong method name for toLocaleTimeString
**Description:** Format current time
```javascript
const now = new Date();
const formatted = now.toLocalTimeString();
```

### Error 42: Empty array in reduce
**Description:** Calculate total time from laps
```javascript
const laps = [];
const total = laps.reduce(function(sum, lap) {
  return sum + lap;
}, 0);
```

### Error 43: Typo in classList method for timer state
**Description:** Add running class to timer
```javascript
timerEl.classList.add('runing');
```

### Error 44: Wrong comparison for timer completion
**Description:** Check if countdown is finished
```javascript
if (remaining <= 0) {
  complete();
}
```

### Error 45: Using setInterval with string argument
**Description:** Execute timer tick function
```javascript
setInterval('tick()', 1000);
```

### Error 46: Wrong property for button text
**Description:** Change button text when timer runs
```javascript
startBtn.text = 'Pause';
```

### Error 47: Boolean check with string value
**Description:** Check if timer has been started
```javascript
if (started === 'true') {
  reset();
}
```

### Error 48: Missing break in switch for timer states
**Description:** Handle different timer states
```javascript
function handleState(state) {
  switch(state) {
    case 'running':
      startTimer();
    case 'paused':
      pauseTimer();
    default:
      resetTimer();
  }
}
```

### Error 49: Accidental global in timer function
**Description:** Store interval ID
```javascript
function start() {
  timerId = setInterval(tick, 1000);
}
```

### Error 50: Wrong index for time formatting
**Description:** Get hours from seconds
```javascript
const hours = Math.floor(seconds / 3600);
```

### Error 51: Using new Date without arguments
**Description:** Get current timestamp for lap timing
```javascript
const now = new Date();
```

### Error 52: Wrong variable in forEach loop
**Description:** Reset all timer presets
```javascript
presets.forEach(function(p) {
  clearPreset(p);
});
```

### Error 53: Object.assign mutates original
**Description:** Merge default settings with user settings
```javascript
const defaults = { time: 300, sound: true };
const settings = Object.assign(defaults, userSettings);
```

### Error 54: Wrong destructuring assignment
**Description:** Extract timer configuration
```javascript
const { duration, autoStart } = config;
```

### Error 55: Try/catch with undefined error
**Description:** Handle timer errors gracefully
```javascript
try {
  startTimer();
} catch (e) {
  console.log('Timer error');
}
```

### Error 56: Setting margin instead of padding
**Description:** Add spacing around timer display
```javascript
timerDisplay.style.margin = '20px';
```

### Error 57: Wrong callback for requestAnimationFrame
**Description:** Use requestAnimationFrame for smooth timer
```javascript
function frame(now) {
  updateDisplay(now - start);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame());
```

### Error 58: Typo in seconds variable
**Description:** Decrement the seconds counter
```javascript
let secnds = 120;
function tick() {
  secnds--;
}
```

### Error 59: Wrong spread syntax for timer args
**Description:** Call timer with spread array
```javascript
const args = [10, 'minutes'];
setTimer(...args);
```

### Error 60: Using floor instead of ceil for rounding up
**Description:** Round up seconds for display
```javascript
const displaySecs = Math.floor(secs);
```

### Error 61: Null check on non-existent function
**Description:** Check if onComplete callback exists
```javascript
if (onComplete) {
  onComplete();
}
```

### Error 62: Wrong property for textContent
**Description:** Set the timer to display zero
```javascript
timerDisplay.value = '0:00';
```

### Error 63: Typo in setInterval variable name
**Description:** Reference the interval ID
```javascript
const intervalID = setInterval(tick, 1000);
clearInterval(intervald);
```

### Error 64: Wrong comparison in while for timer
**Description:** Loop until timer expires
```javascript
while (remaining > 0) {
  tick();
}
```

### Error 65: Split on number instead of string
**Description:** Parse time string
```javascript
const timeStr = 500;
const parts = timeStr.split(':');
```

### Error 66: Falsy check on zero value
**Description:** Check if time has been set
```javascript
if (!time) {
  time = 300;
}
```

### Error 67: Wrong property name for Date methods
**Description:** Get minutes from Date object
```javascript
const d = new Date();
const mins = d.getMinute();
```

### Error 68: Using for-loop index for closure value
**Description:** Create multiple timers
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log('Timer ' + i);
  }, i * 1000);
}
```

### Error 69: Wrong operator for modulo in time
**Description:** Get remaining seconds after minutes
```javascript
const secs = totalSecs / 60;
```

### Error 70: Missing padStart polyfill issue
**Description:** Pad single digit seconds
```javascript
function pad(n) {
  return n.toString().padStart(2, '0');
}
```

## Issue Snippets

### Issue 1: Multiple setInterval calls stacking
**Description:** Start the countdown timer
```javascript
function startTimer() {
  setInterval(decrement, 1000);
}
```

### Issue 2: Not clearing interval on page unload
**Description:** Run timer when page loads
```javascript
const timer = setInterval(tick, 1000);
```

### Issue 3: Inaccurate timing with setInterval
**Description:** Count seconds precisely
```javascript
let seconds = 0;
setInterval(function() {
  seconds++;
  display.textContent = seconds;
}, 1000);
```

### Issue 4: Using innerHTML for numeric display
**Description:** Show the timer value
```javascript
timerDiv.innerHTML = minutes + ':' + seconds;
```

### Issue 5: Hard-coded interval duration in multiple places
**Description:** Set timer update frequency
```javascript
function start() { setInterval(tick, 1000); }
function preview() { setInterval(previewTick, 1000); }
```

### Issue 6: Not disabling start button when timer is running
**Description:** Toggle timer start/stop
```javascript
function toggleTimer() {
  if (running) stop();
  else start();
}
```

### Issue 7: Timer drift from accumulated setTimeout delays
**Description:** Self-correcting timer tick
```javascript
function tick() {
  updateDisplay();
  setTimeout(tick, 1000);
}
```

### Issue 8: Using alert for time-up notification
**Description:** Notify when timer reaches zero
```javascript
if (remaining <= 0) {
  alert('Time is up!');
}
```

### Issue 9: Not preserving timer state across page refreshes
**Description:** Load timer on page init
```javascript
function initTimer() {
  setTimer(300);
}
```

### Issue 10: Re-creating Date object every tick
**Description:** Calculate elapsed time
```javascript
function tick() {
  const now = new Date();
  const elapsed = now - startTime;
  display.textContent = format(elapsed);
}
```

### Issue 11: Timer continues after reaching zero
**Description:** Countdown from 10
```javascript
let count = 10;
function tick() {
  count--;
  display.textContent = count;
}
setInterval(tick, 1000);
```

### Issue 12: Not formatting time with leading zeros
**Description:** Display timer as MM:SS
```javascript
function format(m, s) {
  return m + ':' + s;
}
```

### Issue 13: Using global variables for timer state
**Description:** Track timer state across functions
```javascript
let timerId = null;
let seconds = 0;
let isRunning = false;
let isPaused = false;
```

### Issue 14: Comparing interval IDs with ==
**Description:** Check if timer is running
```javascript
if (timerId == null) {
  start();
}
```

### Issue 15: Setting display with textContent inside string concatenation
**Description:** Update timer display
```javascript
display.textContent = 'Time: ' + minutes + ':' + seconds;
```

### Issue 16: Not cleaning up event listeners when timer resets
**Description:** Add event listeners on each start
```javascript
function start() {
  startBtn.addEventListener('click', stop);
}
```

### Issue 17: Timer synchronization issue with multiple tabs
**Description:** Show timer synchronized across tabs
```javascript
function syncTimer() {
  // localStorage based sync
}
```

### Issue 18: Not handling negative time values
**Description:** Decrement timer
```javascript
function decrement() {
  seconds--;
  display.textContent = seconds;
}
```

### Issue 19: Using for loop to create timer delay (blocking)
**Description:** Wait 3 seconds before starting
```javascript
function wait(seconds) {
  const end = Date.now() + seconds * 1000;
  while (Date.now() < end) {}
  start();
}
```

### Issue 20: Not using requestAnimationFrame for visual timer
**Description:** Update timer display every second
```javascript
setInterval(function() {
  updateVisualTimer();
}, 1000);
```

### Issue 21: Timer display updated before actual tick
**Description:** Start countdown with initial display
```javascript
function start() {
  display.textContent = seconds;
  setInterval(tick, 1000);
}
```

### Issue 22: Hard-coded 1000ms for all interval types
**Description:** Set update interval for both timer and stopwatch
```javascript
setInterval(updateTimer, 1000);
setInterval(updateStopwatch, 1000);
```

### Issue 23: Not using padStart for consistent time format
**Description:** Format seconds display
```javascript
const display = secs < 10 ? '0' + secs : secs;
```

### Issue 24: Timer function too long with multiple responsibilities
**Description:** Handle tick logic
```javascript
function tick() {
  seconds--;
  if (seconds < 0) { stop(); playSound(); showNotification(); resetUI(); }
  else { updateDisplay(); updateProgressBar(); checkAlarm(); }
}
```

### Issue 25: Using setInterval for short intervals affecting performance
**Description:** Update a very precise timer
```javascript
setInterval(function() {
  updateMicrosecondDisplay();
}, 1);
```

### Issue 26: Not pausing the interval, just ignoring ticks
**Description:** Pause the timer
```javascript
function pause() {
  isPaused = true;
}
function tick() {
  if (!isPaused) seconds--;
}
```

### Issue 27: Clearing interval with wrong ID after restart
**Description:** Restart the timer
```javascript
function restart() {
  clearInterval(timerId);
  seconds = 300;
  timerId = setInterval(tick, 1000);
}
```

### Issue 28: Not storing the interval ID for later cleanup
**Description:** Start a repeating timer
```javascript
function start() {
  setInterval(tick, 1000);
}
function stop() {
  clearInterval(/* no id */);
}
```

### Issue 29: Using Date.now() repeatedly in the same tick
**Description:** Calculate multiple time values
```javascript
function tick() {
  const now1 = Date.now();
  const elapsed = now1 - start;
  const now2 = Date.now();
  const total = now2 - start;
}
```

### Issue 30: Confusing minutes and seconds variable names
**Description:** Set timer duration
```javascript
let mins = 5;
let secs = 0;
function tick() {
  if (secs === 0) { mins--; secs = 59; }
  else secs--;
}
```

## Modify Snippets

### Modify 1: Add lap time functionality
**Description:** Record and display lap times
```javascript
function recordLap() {
  // record lap
}
```
Modify to store current elapsed time in a laps array and render a lap list.

### Modify 2: Implement a countdown with presets
**Description:** Add quick-select buttons for common times
```javascript
function setPreset(minutes) {
  // set preset
}
```
Modify to create buttons for 1, 2, 5, 10, 15 minutes that set the timer.

### Modify 3: Add a progress ring/circle
**Description:** Show a circular progress indicator
```javascript
function updateProgress(pct) {
  // update ring
}
```
Modify to use SVG circle with stroke-dasharray based on remaining percentage.

### Modify 4: Implement a Pomodoro mode
**Description:** Alternate between work and break intervals
```javascript
function startPomodoro() {
  // pomodoro
}
```
Modify to cycle work 25min, short break 5min, long break 15min every 4 cycles.

### Modify 5: Add a custom alarm sound
**Description:** Play a sound when timer completes
```javascript
function playAlarm() {
  // play alarm
}
```
Modify to create an Audio element with a user-selected sound file.

### Modify 6: Implement a timer log/history
**Description:** Keep a history of completed timers
```javascript
function logCompletion(duration) {
  // log
}
```
Modify to store timer events with timestamp and duration in localStorage.

### Modify 7: Add a countdown to specific time
**Description:** Count down to a target date/time
```javascript
function countdownTo(targetDate) {
  // countdown
}
```
Modify to calculate the difference between now and target, updating every second.

### Modify 8: Implement a tabata interval trainer
**Description:** Alternate 20s work / 10s rest intervals
```javascript
function startTabata(work, rest, rounds) {
  // tabata
}
```
Modify to switch between work and rest phases, counting rounds.

### Modify 9: Add a world clock feature
**Description:** Show current time in multiple timezones
```javascript
function worldClock(timezones) {
  // world clock
}
```
Modify to display the current time for each timezone, updated every second.

### Modify 10: Implement a timer with phases
**Description:** Create a multi-phase timer sequence
```javascript
function runPhases(phases) {
  // run phases
}
```
Modify to process an array of phase objects with duration and onComplete callbacks.

### Modify 11: Add a visual countdown animation
**Description:** Animate numbers as they count down
```javascript
function animateNumber(number) {
  // animate
}
```
Modify to add a CSS flip animation class when the display number changes.

### Modify 12: Implement a stopwatch with millisecond precision
**Description:** Show elapsed time with centiseconds
```javascript
function startStopwatch() {
  // start
}
```
Modify to update display every 10ms showing hundredths of seconds.

### Modify 13: Add a time multiplier (speed up/slow down)
**Description:** Adjust timer speed for testing
```javascript
function setTimeMultiplier(m) {
  // set multiplier
}
```
Modify to multiply the interval delay or simulate faster time passage.

### Modify 14: Implement a timer queue
**Description:** Chain multiple timers in sequence
```javascript
function queueTimer(duration, label) {
  // queue
}
```
Modify to add timer tasks to a queue and run them one after another.

### Modify 15: Add a bedtime/wake-up timer
**Description:** Calculate optimal sleep cycles
```javascript
function calculateSleepCycles(wakeTime) {
  // calculate
}
```
Modify to suggest bedtimes based on 90-minute sleep cycles before the wake time.

### Modify 16: Implement a countdown with reminders
**Description:** Notify at specific remaining times
```javascript
function addReminder(atSeconds, message) {
  // add reminder
}
```
Modify to show a notification when the timer hits the specified remaining seconds.

### Modify 17: Add a timer keyboard control
**Description:** Control timer with keyboard
```javascript
function setupTimerKeyboard() {
  // keyboard
}
```
Modify to map Space to start/stop, R to reset, and L to lap.

### Modify 18: Implement a timer share feature
**Description:** Share current timer state via URL
```javascript
function shareTimer() {
  // share
}
```
Modify to encode timer settings in URL query params and restore on page load.

### Modify 19: Add a time calculator
**Description:** Add/subtract time values
```javascript
function calculateTime(op, a, b) {
  // calculate
}
```
Modify to handle addition and subtraction of time durations.

### Modify 20: Implement a daily timer limit
**Description:** Track total timer usage per day
```javascript
function checkDailyLimit() {
  // check
}
```
Modify to sum all completed timer durations for today and warn if over the limit.

### Modify 21: Add a time zone converter
**Description:** Convert time between time zones
```javascript
function convertTimeZone(time, fromZone, toZone) {
  return time;
}
```
Modify to apply offset differences between time zones.

### Modify 22: Implement a timer with variable intervals
**Description:** Change update frequency based on remaining time
```javascript
function adaptiveInterval(remaining) {
  return 1000;
}
```
Modify to update more frequently (100ms) in the last 10 seconds for precision.

### Modify 23: Add a countup timer from zero
**Description:** Timer that counts up from 0
```javascript
function startCountup() {
  // countup
}
```
Modify to increment seconds and format as HH:MM:SS.

### Modify 24: Implement a time alarm clock
**Description:** Set an alarm for a specific time
```javascript
function setAlarm(hours, minutes) {
  // set alarm
}
```
Modify to calculate milliseconds until the target time and start a timeout.

### Modify 25: Add a timer calibration tool
**Description:** Measure and compensate for timer drift
```javascript
function calibrateTimer() {
  // calibrate
}
```
Modify to compare expected vs actual elapsed time and adjust intervals.

### Modify 26: Implement a countdown with pause/resume
**Description:** Properly pause and resume the timer
```javascript
function pause() {
  // pause
}
function resume() {
  // resume
}
```
Modify to clear the interval on pause and restart with remaining time on resume.

### Modify 27: Add a timer group/synchronization
**Description:** Run multiple timers in sync
```javascript
function syncTimers(timers) {
  // sync
}
```
Modify to start/stop/pause all timers at once and display them in a grid.

### Modify 28: Implement a timer with custom labels
**Description:** Name each timer session
```javascript
function labelTimer(name) {
  // label
}
```
Modify to accept and display a name for the current timer session.

### Modify 29: Add a color-changing timer
**Description:** Change timer color as time decreases
```javascript
function getTimerColor(remaining, total) {
  return '#000';
}
```
Modify to transition from green to yellow to red as time runs out.

### Modify 30: Implement a timer with alarms at intervals
**Description:** Beep at regular intervals during the timer
```javascript
function addIntervalAlarm(everySeconds) {
  // interval alarm
}
```
Modify to play a short beep sound every specified number of seconds.

### Modify 31: Add a fullscreen timer mode
**Description:** Display timer in fullscreen for presentations
```javascript
function fullscreenTimer() {
  // fullscreen
}
```
Modify to use the Fullscreen API and enlarge the timer display.

### Modify 32: Implement a timer with snooze
**Description:** Add a snooze button when timer ends
```javascript
function snooze(seconds) {
  // snooze
}
```
Modify to restart the timer for the snooze duration and show a snooze indicator.

### Modify 33: Add a time distribution chart
**Description:** Show how time was spent across sessions
```javascript
function showTimeChart() {
  // chart
}
```
Modify to create a bar chart using div elements showing time spent per day.

### Modify 34: Implement a timer with auto-repeat
**Description:** Automatically restart the timer when it ends
```javascript
function enableAutoRepeat() {
  // auto repeat
}
```
Modify to call startTimer again when the timer completes.

### Modify 35: Add a time zone alarm
**Description:** Set alarm based on another time zone
```javascript
function setTimeZoneAlarm(timezone, time) {
  // set
}
```
Modify to convert the target timezone time to local time and set the alarm.

### Modify 36: Implement a timer drag-to-set
**Description:** Set timer duration by dragging on a circle
```javascript
function setupDragTimer() {
  // drag to set
}
```
Modify to use mouse/touch events on a circular element to set minutes.

### Modify 37: Add a timer with text-to-speech announcements
**Description:** Announce remaining time at intervals
```javascript
function announceTime(seconds) {
  // announce
}
```
Modify to use SpeechSynthesis API to speak the remaining time every minute.

### Modify 38: Implement a timer countdown to birthday
**Description:** Count down to a specific annual date
```javascript
function birthdayCountdown(month, day) {
  // countdown
}
```
Modify to calculate days, hours, minutes until next occurrence of the date.

### Modify 39: Add a time elapsed since date
**Description:** Show time elapsed since a past date
```javascript
function timeSince(date) {
  // time since
}
```
Modify to calculate and display years, months, days since the given date.

### Modify 40: Implement a timer with favorite presets
**Description:** Save and load favorite timer settings
```javascript
function saveFavorite(name, duration) {
  // save favorite
}
```
Modify to store presets in localStorage and render them as quick-access buttons.

### Modify 41: Add a timer randomization feature
**Description:** Random timer length within a range
```javascript
function randomTimer(min, max) {
  // random timer
}
```
Modify to pick a random duration between min and max and start the countdown.

### Modify 42: Implement a countdown with checkpoint system
**Description:** Mark milestones during the countdown
```javascript
function addCheckpoint(atSeconds, label) {
  // checkpoint
}
```
Modify to show a message or play a sound when each checkpoint is reached.

### Modify 43: Add a timer focus mode
**Description:** Block distractions during timer session
```javascript
function focusMode() {
  // focus
}
```
Modify to dim the background and show only the timer and a stop button.

### Modify 44: Implement a time-based quiz timer
**Description:** Show per-question time limit during a quiz
```javascript
function questionTimer(seconds, onExpire) {
  // question timer
}
```
Modify to display remaining time for current question and call onExpire when done.

### Modify 45: Add a timer export/import as JSON
**Description:** Save and load timer configurations
```javascript
function exportTimers() {
  // export
}
```
Modify to serialize all timer data to JSON and trigger a download.

### Modify 46: Implement a kitchen timer with multiple simultaneous timers
**Description:** Run several independent timers at once
```javascript
function createKitchenTimer(label, seconds) {
  // create timer
}
```
Modify to create timer objects with unique IDs and render them as cards.

### Modify 47: Add a time rounding feature
**Description:** Round timer to nearest 5 minutes
```javascript
function roundTime(seconds) {
  return seconds;
}
```
Modify to round up or down to the nearest multiple of 300 seconds.

### Modify 48: Implement a timer with gentle wake-up
**Description:** Gradually increase alarm volume
```javascript
function gentleWakeUp(duration) {
  // wake up
}
```
Modify to start the alarm at low volume and increase over the given duration.

### Modify 49: Add a timer broadcasting feature
**Description:** Broadcast timer state to other devices
```javascript
function broadcastTimer(state) {
  // broadcast
}
```
Modify to use BroadcastChannel API to send timer updates to other tabs.

### Modify 50: Implement a time-to-event dashboard
**Description:** Show countdowns to multiple events
```javascript
function eventDashboard(events) {
  // dashboard
}
```
Modify to render a list of events with their countdowns, sorted by closest first.
