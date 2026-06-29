# Fetch API

<img src="https://media.giphy.com/media/UcK7JalnjCz0k/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What is Fetch?

A browser API for making HTTP requests. It returns a **Promise**.

```javascript
async function load() {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}
```

## Flow

```
fetch(url)
   │
   ▼ (Promise resolves with Response object)
response.json()
   │
   ▼ (Promise resolves with parsed JSON)
data (object/array)
```

## The Response Object

```javascript
async function inspectResponse() {
    const response = await fetch("/api/data");

    console.log(response.status);      // 200, 404, 500
    console.log(response.ok);          // true if status 200-299
    console.log(response.headers.get("Content-Type"));

    const text = await response.text(); // Or .json(), .blob(), .formData()
    console.log(text);
}
```

## Handling HTTP Errors

```javascript
async function load() {
    const response = await fetch("/api/data");

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
}

load().catch(err => console.error("Failed:", err.message));
```

Note: `fetch` only rejects on **network errors**, not HTTP error statuses (4xx, 5xx).

## POST Request with Fetch

```javascript
async function createUser(user) {
    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
}
```

## Fetch with Options

```javascript
const response = await fetch(url, {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + token,
        "Accept": "application/json",
    },
    cache: "no-cache",
    credentials: "include",
    signal: AbortSignal.timeout(5000), // Timeout after 5s
});
```

## Aborting a Fetch Request (AbortController)

```javascript
const controller = new AbortController();

const promise = fetch("/large-file", {
    signal: controller.signal,
});

// Abort after 3 seconds
setTimeout(() => controller.abort(), 3000);

try {
    const response = await promise;
    console.log("Done");
} catch (err) {
    if (err.name === "AbortError") {
        console.log("Request was aborted");
    } else {
        console.error("Request failed", err);
    }
}
```

## Q&A

| Question | Answer |
|----------|--------|
| What does fetch return? | A Promise that resolves to a Response object. |
| Does fetch reject on 404? | No. Only rejects on network failure. |
| How do you read the body? | Call `.json()`, `.text()`, `.blob()`, or `.formData()`. |
| How do you cancel a fetch? | Use `AbortController` and pass `signal` in options. |
| What is CORS? | Cross-Origin Resource Sharing — a security mechanism for cross-origin requests. |
## Next Steps

[Back to Chapter 10](10-async-await.md): async / await
[Proceed to Chapter 12](12-promise-all.md): Promise.all() to learn about promise.all().
