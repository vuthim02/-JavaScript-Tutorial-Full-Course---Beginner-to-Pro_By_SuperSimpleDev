# Projects

## Countdown Timer

```javascript
function countdown(seconds) {
    const intervalId = setInterval(() => {
        console.log(seconds);
        seconds--;
        if (seconds < 0) {
            clearInterval(intervalId);
            console.log("Time's up!");
        }
    }, 1000);
}

countdown(5);
// Output: 5 4 3 2 1 0 Time's up!
```

## Delayed Message System

```javascript
function delayedMessage(message, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(message);
            resolve(message);
        }, delay);
    });
}

async function run() {
    console.log("Starting...");
    await delayedMessage("First message", 1000);
    await delayedMessage("Second message", 2000);
    await delayedMessage("Third message", 1500);
    console.log("Done");
}
// Sequential: "First" → "Second" → "Third"
```

## API Client

```javascript
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`);
        if (!response.ok) throw new Error(`GET ${endpoint}: ${response.status}`);
        return response.json();
    }

    async post(endpoint, data) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`POST ${endpoint}: ${response.status}`);
        return response.json();
    }
}

const api = new APIClient("https://jsonplaceholder.typicode.com");
const posts = await api.get("/posts/1");
console.log(posts);
```

## Parallel Downloader

```javascript
async function downloadAll(urls) {
    const fetchPromises = urls.map(async (url, index) => {
        const response = await fetch(url);
        const text = await response.text();
        return { index, url, data: text };
    });

    return Promise.all(fetchPromises);
}

const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3",
];

downloadAll(urls)
    .then(results => {
        results.forEach(r => console.log(`Downloaded ${r.url}: ${r.data.length} chars`));
    })
    .catch(err => console.error("Download failed:", err));
```

## Retry Mechanism

```javascript
async function retry(fn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            if (attempt === maxRetries) throw err;
            const delay = baseDelay * Math.pow(2, attempt - 1);
            console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

const data = await retry(() =>
    fetch("https://unreliable-api.com/data").then(r => r.json())
);
console.log(data);
```

## Debounced Search Bar

```javascript
class DebouncedSearch {
    constructor(inputElement, onSearch, delay = 300) {
        this.inputElement = inputElement;
        this.onSearch = onSearch;
        this.delay = delay;
        this.timerId = null;
        this.setup();
    }

    setup() {
        this.inputElement.addEventListener("input", (e) => {
            clearTimeout(this.timerId);
            this.timerId = setTimeout(() => {
                this.onSearch(e.target.value);
            }, this.delay);
        });
    }
}

const searchInput = document.querySelector("#search");
new DebouncedSearch(searchInput, async (query) => {
    if (query.length < 2) return;
    const results = await fetch(`/api/search?q=${query}`).then(r => r.json());
    displayResults(results);
});
```
## Next Steps

[Back to Chapter 21](21-review-checklist.md): Senior Reverse Engineering Checklist
[Proceed to Chapter 23](23-set-interval.md): setInterval & clearInterval to learn about setinterval & clearinterval.
