# Projects

<img src="https://media.giphy.com/media/wcgn5fVDjvR7pdvz4C/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Todo Application

Using:
- DOM creation (`createElement`, `appendChild`)
- localStorage (persist todos)
- event delegation (click on list items to toggle/delete)
- form submit (add new todo)

```javascript
// Core features:
// 1. Add todo (form submit → create li → append to ul → save to localStorage)
// 2. Toggle todo (click li → toggle .completed → save)
// 3. Delete todo (click .delete button → remove li → save)
// 4. Filter (show all / active / completed)
```

---

## Calculator

Using:
- click events (on number and operation buttons)
- dynamic display (update result element)
- state management (current value, operator, previous value)

```javascript
// Core logic:
// 1. Number buttons → append to current display
// 2. Operator buttons → store current value + operator
// 3. Equals button → calculate result
// 4. Clear → reset all state
```

---

## Form Validator

Using:
- regex (email, phone, password patterns)
- submit (preventDefault, validate all fields)
- DOM updates (show/hide error messages, add/remove CSS classes)

```javascript
// Validation rules:
// - Name: required, min 2 chars
// - Email: required, valid format
// - Password: required, min 8 chars, 1 uppercase, 1 number
// - Confirm: must match password
```

---

## Notes App

Using:
- localStorage (save/load notes as JSON array)
- JSON (stringify/parse for storage)
- DOM creation (display notes dynamically)

```javascript
// Features:
// 1. Create note (title + content → add to array → save to localStorage → render)
// 2. Edit note (click edit → populate form → save changes)
// 3. Delete note (click delete → remove from array → save → re-render)
// 4. Search notes (input event → filter displayed notes)
```

---

## Drag-and-Drop Kanban Board

Using:
- dragstart, dragover, drop (move cards between columns)
- localStorage (persist board state)
- DOM updates (reorder elements)

```javascript
// Structure:
// Columns: "To Do", "In Progress", "Done"
// Cards: draggable elements with task info
// Drop zones: columns that accept cards
// State: array of cards with status property
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which browser APIs are used in a project? | Check for `fetch`, `localStorage`, `geolocation`, `Drag and Drop`, `clicks`, `forms`. |
| How to identify the project type? | Todo: DOM + localStorage. Calculator: events + state. Weather: fetch + geolocation. |
| What patterns appear in real projects? | Event delegation, form validation, data persistence, dynamic DOM creation. |

## Weather Dashboard

Using:
- fetch() (get weather data from OpenWeatherMap API or similar)
- geolocation (get user's current position for weather)
- DOM updates (display temperature, humidity, conditions)

```javascript
async function getWeather(lat, lon) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_KEY`
    );
    const data = await response.json();
    displayWeather(data);
}

navigator.geolocation.getCurrentPosition(
    (pos) => getWeather(pos.coords.latitude, pos.coords.longitude),
    () => getWeather(40.7128, -74.0060) // Default: New York
);

function displayWeather(data) {
    document.getElementById("temp").textContent = 
        Math.round(data.main.temp - 273.15) + "°C";
    document.getElementById("condition").textContent = 
        data.weather[0].description;
    document.getElementById("icon").src = 
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}
```
## Next Steps

[Back to Chapter 30](30-senior-checklist.md): Senior Reverse Engineering Checklist
[Proceed to Chapter 32](32-summary.md): Part 9 Summary to learn about part 9 summary.
