# Fetch API

## Making Requests

```javascript
fetch(url)
```

Returns a Promise that resolves to a Response object.

```javascript
// GET request
fetch("https://api.example.com/users")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error("Network error:", err));
```

---

## Request Methods

```javascript
// GET
fetch("/api/users");

// POST
fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "John" })
});

// PUT
fetch("/api/users/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Jane" })
});

// DELETE
fetch("/api/users/1", {
    method: "DELETE"
});
```

---

## Response Object

```javascript
const response = await fetch("/api/data");

console.log(response.status);         // 200, 404, 500
console.log(response.ok);             // true if 200-299
console.log(response.statusText);     // "OK", "Not Found"
console.log(response.headers.get("Content-Type"));

const data = await response.json();   // Parse JSON body
// OR: const text = await response.text();
// OR: const blob = await response.blob();
// OR: const formData = await response.formData();
```

---

## Error Handling

```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (err) {
        // Network error OR HTTP error
        console.error("Fetch failed:", err.message);
        return null;
    }
}
```

---

## Aborting Requests

```javascript
const controller = new AbortController();
const signal = controller.signal;

// Start request
const promise = fetch("/large-file", { signal });

// Timeout after 5 seconds
setTimeout(() => controller.abort(), 5000);

try {
    const response = await promise;
    console.log("Response received");
} catch (err) {
    if (err.name === "AbortError") {
        console.log("Request was cancelled");
    } else {
        console.error("Request failed:", err);
    }
}
```

---

## Upload Progress (with XMLHttpRequest)

```javascript
function uploadFile(file) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                console.log(`Upload: ${percent}%`);
            }
        });
        
        xhr.addEventListener("load", () => resolve(xhr.response));
        xhr.addEventListener("error", () => reject(new Error("Upload failed")));
        
        xhr.open("POST", "/upload");
        const formData = new FormData();
        formData.append("file", file);
        xhr.send(formData);
    });
}
```
## Next Steps

[Back to Chapter 24](24-drag-and-drop.md): Drag and Drop
[Proceed to Chapter 26](26-rendering-pipeline.md): Rendering Pipeline to learn about rendering pipeline.
