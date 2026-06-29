# IndexedDB

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Client-Side Database

IndexedDB is a full NoSQL database in the browser — supports structured data, indexes, and large storage.

```
localStorage:     ~5-10MB, synchronous, strings only
IndexedDB:        >50MB (usually unlimited), asynchronous, any structured data
```

## Opening a Database

```javascript
const request = indexedDB.open("MyAppDB", 1);  // Name, version

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    // Create object stores (like tables)
    const store = db.createObjectStore("users", {
        keyPath: "id",              // Primary key field
        autoIncrement: true          // Auto-generate IDs
    });

    // Create indexes (for searching)
    store.createIndex("email", "email", { unique: true });
    store.createIndex("name", "name", { unique: false });
};

request.onsuccess = (event) => {
    const db = event.target.result;
    console.log("Database opened");
};

request.onerror = (event) => {
    console.error("Database error:", event.target.error);
};
```

## CRUD Operations

### Create (Add Data)

```javascript
const transaction = db.transaction("users", "readwrite");
const store = transaction.objectStore("users");

store.add({ id: 1, name: "John", email: "john@example.com" });
store.add({ id: 2, name: "Jane", email: "jane@example.com" });

transaction.oncomplete = () => console.log("Data saved");
transaction.onerror = (e) => console.error("Error:", e);
```

### Read (Get Data)

```javascript
const transaction = db.transaction("users", "readonly");
const store = transaction.objectStore("users");

const getRequest = store.get(1);  // Get by primary key
getRequest.onsuccess = () => {
    console.log("User:", getRequest.result);
};

// Get all
const getAllRequest = store.getAll();
getAllRequest.onsuccess = () => {
    console.log("All users:", getAllRequest.result);
};
```

### Update

```javascript
const transaction = db.transaction("users", "readwrite");
const store = transaction.objectStore("users");

const user = { id: 1, name: "John Updated", email: "john@example.com" };
store.put(user);  // Put = insert or update
```

### Delete

```javascript
const transaction = db.transaction("users", "readwrite");
const store = transaction.objectStore("users");
store.delete(1);  // Delete by primary key
```

## Using Indexes (Search)

```javascript
const transaction = db.transaction("users", "readonly");
const store = transaction.objectStore("users");
const emailIndex = store.index("email");

// Find by email
const request = emailIndex.get("john@example.com");
request.onsuccess = () => {
    console.log("Found:", request.result);
};

// Cursor (iterate over all matching)
const cursorRequest = emailIndex.openCursor();
cursorRequest.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
        console.log("User:", cursor.value);
        cursor.continue();  // Next
    }
};
```

## Promisified Version (Helper)

```javascript
function dbPromise(dbName, version) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);
        request.onupgradeneeded = (e) => resolve(e.target.result);
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

// Usage
async function saveUser(user) {
    const db = await dbPromise("MyAppDB", 1);
    const tx = db.transaction("users", "readwrite");
    tx.objectStore("users").add(user);
    await new Promise(r => tx.oncomplete = r);
}
```

## When to Use IndexedDB

```
- Offline-first apps (PWA)
- Large datasets (thousands of records)
- Complex queries (multiple indexes)
- Binary data (blobs, files)
- Syncing data between server and client
- Caching API responses with custom queries

Not for:
- Simple key-value storage → use localStorage
- Session-only data → use sessionStorage
- Real-time sync → use WebSocket + in-memory
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is IndexedDB being used? | Check for `indexedDB.open()` in the code. |
| What data is stored? | Check DevTools → Application → IndexedDB. |
| How is data structured? | Check `createObjectStore` and `createIndex` calls. |
| Is data persisted? | IndexedDB survives browser close and restart. |
| How to clear IndexedDB? | DevTools → Application → IndexedDB → Delete database. |
## Next Steps

[Back to Chapter 40](40-cors.md): CORS (Cross-Origin Resource Sharing)
[Proceed to Chapter 42](42-postmessage.md): Cross-Window Communication (postMessage) to learn about cross-window communication (postmessage).
