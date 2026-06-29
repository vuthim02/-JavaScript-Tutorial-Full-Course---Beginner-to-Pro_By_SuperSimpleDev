let unit = 'celsius';
let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const suggestions = document.getElementById('suggestions');
const cityName = document.getElementById('cityName');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const icon = document.getElementById('icon');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const uvIndex = document.getElementById('uvIndex');
const pressure = document.getElementById('pressure');
const hourlyContainer = document.getElementById('hourlyContainer');
const forecastDays = document.getElementById('forecastDays');
const recents = document.getElementById('recents');
const error = document.getElementById('error');
const bgAnim = document.getElementById('bgAnim');
const unitBtn = document.getElementById('unitBtn');
const geoBtn = document.getElementById('geoBtn');

let suggestionTimeout;
let currentCoords = null;

async function getWeather(query, lat, lon) {
  error.textContent = '';
  suggestions.classList.remove('active');

  try {
    let name = query, country = '', latitude = lat, longitude = lon;

    if (query) {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        error.textContent = 'City not found. Try again.';
        return;
      }
      name = geoData.results[0].name;
      country = geoData.results[0].country;
      latitude = geoData.results[0].latitude;
      longitude = geoData.results[0].longitude;
      addRecent(name);
    }

    currentCoords = { lat: latitude, lon: longitude };

    const params = `temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index`;
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${params}&hourly=temperature_2m,weather_code,precipitation_probability,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=auto`);
    const weatherData = await weatherRes.json();

    const cur = weatherData.current;
    const daily = weatherData.daily;
    const hourly = weatherData.hourly;

    const timeOfDay = getTimeOfDay(daily.sunrise[0], daily.sunset[0]);
    setBackground(cur.weather_code, timeOfDay);

    cityName.textContent = query ? `${name}, ${country}` : `${name}`;
    date.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const tempVal = unit === 'celsius' ? cur.temperature_2m : cToF(cur.temperature_2m);
    temp.textContent = `${Math.round(tempVal)}°`;
    condition.textContent = getWeatherDesc(cur.weather_code);
    icon.src = getWeatherIcon(cur.weather_code, timeOfDay);

    const feelsVal = unit === 'celsius' ? cur.apparent_temperature : cToF(cur.apparent_temperature);
    feelsLike.textContent = `${Math.round(feelsVal)}°`;

    humidity.textContent = `${cur.relative_humidity_2m}%`;
    wind.textContent = `${Math.round(cur.wind_speed_10m)} ${unit === 'celsius' ? 'km/h' : 'mph'} ${getWindDir(cur.wind_direction_10m)}`;
    sunrise.textContent = daily.sunrise[0] ? new Date(daily.sunrise[0]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--';
    sunset.textContent = daily.sunset[0] ? new Date(daily.sunset[0]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--';
    uvIndex.textContent = daily.uv_index_max[0] ? daily.uv_index_max[0].toFixed(1) : '--';
    pressure.textContent = `${cur.surface_pressure} hPa`;

    renderHourly(hourly);
    renderDaily(daily);
  } catch {
    error.textContent = 'Something went wrong. Check your connection.';
  }
}

function renderHourly(hourly) {
  const now = new Date();
  const currentHour = now.getHours();
  const todayStr = now.toISOString().slice(0, 10);

  hourlyContainer.innerHTML = '';
  let startIdx = hourly.time.findIndex(t => t.startsWith(todayStr) && new Date(t).getHours() >= currentHour);
  if (startIdx === -1) startIdx = 0;

  for (let i = startIdx; i < Math.min(startIdx + 24, hourly.time.length); i++) {
    const h = new Date(hourly.time[i]);
    const hVal = unit === 'celsius' ? hourly.temperature_2m[i] : cToF(hourly.temperature_2m[i]);
    const isNow = i === startIdx;

    const div = document.createElement('div');
    div.className = 'hourly-item';
    div.innerHTML = `
      <div class="hour-time">${isNow ? 'Now' : h.toLocaleTimeString('en-US', { hour: '2-digit' })}</div>
      <img class="hour-icon" src="${getWeatherIcon(hourly.weather_code[i], 'day')}" alt="">
      <div class="hour-temp">${Math.round(hVal)}°</div>
      <div class="hour-pop">${hourly.precipitation_probability[i] || 0}%</div>
    `;
    hourlyContainer.appendChild(div);
  }
}

function renderDaily(daily) {
  forecastDays.innerHTML = '';
  daily.time.forEach((day, i) => {
    if (i === 0) return;
    const high = unit === 'celsius' ? daily.temperature_2m_max[i] : cToF(daily.temperature_2m_max[i]);
    const low = unit === 'celsius' ? daily.temperature_2m_min[i] : cToF(daily.temperature_2m_min[i]);
    const div = document.createElement('div');
    div.className = 'forecast-day';
    div.innerHTML = `
      <div class="day-name">${new Date(day).toLocaleDateString('en', { weekday: 'short' })}</div>
      <img class="day-icon" src="${getWeatherIcon(daily.weather_code[i], 'day')}" alt="">
      <div class="day-temp">${Math.round(high)}° / ${Math.round(low)}°</div>
    `;
    forecastDays.appendChild(div);
  });
}

function addRecent(city) {
  recentCities = recentCities.filter(c => c.toLowerCase() !== city.toLowerCase());
  recentCities.unshift(city);
  if (recentCities.length > 8) recentCities.pop();
  localStorage.setItem('recentCities', JSON.stringify(recentCities));
  renderRecents();
}

function renderRecents() {
  recents.innerHTML = '';
  recentCities.forEach(city => {
    const span = document.createElement('span');
    span.className = 'recent-chip';
    span.textContent = city;
    span.addEventListener('click', () => {
      searchInput.value = city;
      getWeather(city);
    });
    recents.appendChild(span);
  });
}

function setBackground(code, timeOfDay) {
  bgAnim.className = 'bg-anim';
  if (timeOfDay === 'night') {
    bgAnim.classList.add('night');
  } else if (code === 0 || code === 1) {
    bgAnim.classList.add('clear');
  } else if (code === 2 || code === 3) {
    bgAnim.classList.add('cloudy');
  } else if (code >= 95) {
    bgAnim.classList.add('thunder');
  } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    bgAnim.classList.add('snow');
  } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    bgAnim.classList.add('rain');
  } else {
    bgAnim.classList.add('cloudy');
  }
}

function getTimeOfDay(sunriseStr, sunsetStr) {
  const now = new Date();
  if (!sunriseStr || !sunsetStr) return now.getHours() >= 6 && now.getHours() < 18 ? 'day' : 'night';
  const rise = new Date(sunriseStr);
  const set = new Date(sunsetStr);
  return now >= rise && now < set ? 'day' : 'night';
}

function getWeatherDesc(code) {
  const map = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Depositing rime fog',
    51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    66: 'Light freezing rain', 67: 'Heavy freezing rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
    85: 'Slight snow showers', 86: 'Heavy snow showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
  };
  return map[code] || 'Unknown';
}

function getWeatherIcon(code, time) {
  const suffix = time === 'night' && [0, 1, 2].includes(code) ? 'n' : 'd';
  if (code === 0) return `https://openweathermap.org/img/wn/01${suffix}@2x.png`;
  if (code === 1) return `https://openweathermap.org/img/wn/02${suffix}@2x.png`;
  if (code === 2) return `https://openweathermap.org/img/wn/03${suffix}@2x.png`;
  if (code === 3) return `https://openweathermap.org/img/wn/04${suffix}@2x.png`;
  if (code >= 45 && code < 50) return `https://openweathermap.org/img/wn/50${suffix}@2x.png`;
  if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return `https://openweathermap.org/img/wn/10${suffix}@2x.png`;
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return `https://openweathermap.org/img/wn/13${suffix}@2x.png`;
  if (code >= 95) return `https://openweathermap.org/img/wn/11${suffix}@2x.png`;
  return `https://openweathermap.org/img/wn/01${suffix}@2x.png`;
}

function getWindDir(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8] || 'N';
}

function cToF(c) {
  return (c * 9 / 5) + 32;
}

function getLocation() {
  if (!navigator.geolocation) {
    error.textContent = 'Geolocation not supported by your browser.';
    return;
  }
  error.textContent = 'Getting location...';
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      error.textContent = '';
      getWeather(null, pos.coords.latitude, pos.coords.longitude);
    },
    () => {
      error.textContent = 'Could not get your location.';
    }
  );
}

async function fetchSuggestions(query) {
  if (query.length < 2) { suggestions.classList.remove('active'); return; }
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
    const data = await res.json();
    suggestions.innerHTML = '';
    if (!data.results || data.results.length === 0) { suggestions.classList.remove('active'); return; }
    data.results.forEach(city => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.innerHTML = `${city.name}<span class="suggestion-country">${city.country}</span>`;
      div.addEventListener('click', () => {
        searchInput.value = city.name;
        suggestions.classList.remove('active');
        getWeather(city.name);
      });
      suggestions.appendChild(div);
    });
    suggestions.classList.add('active');
  } catch { suggestions.classList.remove('active'); }
}

searchInput.addEventListener('input', () => {
  clearTimeout(suggestionTimeout);
  suggestionTimeout = setTimeout(() => fetchSuggestions(searchInput.value.trim()), 300);
});
searchInput.addEventListener('blur', () => setTimeout(() => suggestions.classList.remove('active'), 200));
searchInput.addEventListener('focus', () => { if (suggestions.children.length > 0) suggestions.classList.add('active'); });
searchBtn.addEventListener('click', () => { const city = searchInput.value.trim(); if (city) getWeather(city); });
searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchBtn.click(); });

unitBtn.addEventListener('click', () => {
  unit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
  if (currentCoords) {
    getWeather(null, currentCoords.lat, currentCoords.lon);
  }
});

geoBtn.addEventListener('click', getLocation);

renderRecents();
getWeather('Tokyo');
