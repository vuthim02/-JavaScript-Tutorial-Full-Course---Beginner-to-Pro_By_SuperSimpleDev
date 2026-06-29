# Level 99 - Error handling in async code, POST requests (Module 20: Backend, Async/Await)

## Error Snippets

### Error 1: Not checking response.ok in POST
**Description:** POST request parsing response even on failure.
```javascript
async function createUser(data) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
```

### Error 2: Missing Content-Type in POST
**Description:** POST with JSON body but no Content-Type header.
```javascript
async function createUser(data) {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
```

### Error 3: POST with wrong Content-Type
**Description:** Setting wrong content type for JSON payload.
```javascript
async function postData(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(data)
  });
  return res.json();
}
```

### Error 4: Not stringifying POST body
**Description:** Sending object instead of JSON string in POST.
```javascript
async function createUser(data) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data
  });
  return res.json();
}
```

### Error 5: Error in catch not propagated
**Description:** Catching error and not rethrowing or returning proper error.
```javascript
async function loadUsers() {
  try {
    const res = await fetch("/api/users");
    return res.json();
  } catch (e) {
    console.log(e);
  }
}
```

### Error 6: Swallowing errors with empty catch
**Description:** Empty catch block hides all errors.
```javascript
async function riskyCall() {
  try {
    return await fetch("/api/risky");
  } catch (e) {}
}
```

### Error 7: Not handling network errors in POST
**Description:** POST request without network error handling.
```javascript
async function submitOrder(order) {
  const res = await fetch("/api/orders", {
    method: "POST",
    body: JSON.stringify(order)
  });
  return res.json();
}
```

### Error 8: Throwing non-Error objects
**Description:** Throwing string instead of Error instance.
```javascript
async function validate(data) {
  if (!data.name) {
    throw "Name is required";
  }
  return data;
}
```

### Error 9: Not checking status code in POST response
**Description:** Post doesn't check for 201 Created status.
```javascript
async function createItem(data) {
  const res = await fetch("/api/items", {
    method: "POST",
    body: JSON.stringify(data)
  });
  if (res.ok) return res.json();
  throw new Error("Failed");
}
```

### Error 10: Error in async event handler not caught
**Description:** Async event handler that rejects without handling.
```javascript
submitBtn.addEventListener("click", async () => {
  await fetch("/api/items", {
    method: "POST",
    body: JSON.stringify(getFormData())
  });
});
```

### Error 11: Promise.all error not caught individually
**Description:** Promise.all fails fast, losing other results.
```javascript
async function loadAll() {
  const [a, b] = await Promise.all([
    fetch("/api/a").then(r => r.json()),
    fetch("/api/b").then(r => r.json())
  ]);
  return { a, b };
}
```

### Error 12: Not validating response before parsing
**Description:** Parsing response that might be HTML error page.
```javascript
async function getData() {
  const res = await fetch("/api/data");
  return res.json();
}
```

### Error 13: Try/catch wrapping only part of async code
**Description:** Some awaits inside try, some outside.
```javascript
async function process() {
  try {
    const a = await fetch("/api/a");
  } catch (e) {
    console.log("a failed");
  }
  const b = await fetch("/api/b");
  return { a, b };
}
```

### Error 14: Not handling 4xx and 5xx differently
**Description:** Treating all errors the same.
```javascript
async function apiCall(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API error");
  return res.json();
}
```

### Error 15: POST with no body
**Description:** POST request with empty body when data expected.
```javascript
async function createResource() {
  const res = await fetch("/api/resources", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  return res.json();
}
```

### Error 16: Not using try/catch with await
**Description:** No error handling on awaited promise.
```javascript
async function deleteUser(id) {
  const res = await fetch("/api/users/" + id, { method: "DELETE" });
  return res.json();
}
```

### Error 17: Catching too broadly
**Description:** Catching all errors including programming bugs.
```javascript
async function load() {
  try {
    const data = await fetch("/api/data");
    const obj = JSON.parse(data);
    return obj.users[0].name;
  } catch (e) {
    return "default";
  }
}
```

### Error 18: Error in async generator not caught
**Description:** Async generator throws but no try/catch.
```javascript
async function* getPages() {
  let page = 1;
  while (true) {
    const res = await fetch("/api/page/" + page);
    if (!res.ok) throw new Error("Page failed");
    yield res.json();
    page++;
  }
}
```

### Error 19: POST with duplicate request
**Description:** No idempotency, request sent twice.
```javascript
async function createOrder(order) {
  const res = await fetch("/api/orders", {
    method: "POST",
    body: JSON.stringify(order)
  });
  return res.json();
}
createOrder(order);
createOrder(order);
```

### Error 20: FormData POST without Content-Type
**Description:** FormData POST with explicit Content-Type breaks boundary.
```javascript
const fd = new FormData();
fd.append("file", blob);
const res = await fetch("/api/upload", {
  method: "POST",
  headers: { "Content-Type": "multipart/form-data" },
  body: fd
});
```

### Error 21: Not handling 413 Payload Too Large
**Description:** POST body too large but not handled.
```javascript
async function uploadLarge(data) {
  const res = await fetch("/api/upload", {
    method: "POST",
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}
```

### Error 22: No timeout on POST request
**Description:** POST request can hang indefinitely.
```javascript
async function postData(url, data) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
```

### Error 23: Not handling 429 rate limit
**Description:** Rate limited but no retry logic.
```javascript
async function fetchWithRateLimit(url) {
  const res = await fetch(url);
  if (res.status === 429) {
    throw new Error("Rate limited");
  }
  return res.json();
}
```

### Error 24: Error message too vague
**Description:** Generic error message with no context.
```javascript
async function getUser(id) {
  try {
    const res = await fetch("/api/users/" + id);
    return res.json();
  } catch (e) {
    throw new Error("Something went wrong");
  }
}
```

### Error 25: Not logging error details
**Description:** Catching error but not logging details.
```javascript
async function processOrder(orderId) {
  try {
    const res = await fetch("/api/orders/" + orderId + "/process", {
      method: "POST"
    });
    return res.json();
  } catch (e) {
    throw new Error("Order processing failed");
  }
}
```

### Error 26: POST with wrong JSON format
**Description:** JSON structure doesn't match API schema.
```javascript
async function createProduct(name, price, category) {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(name, price, category)
  });
  return res.json();
}
```

### Error 27: Not handling CORS errors in POST
**Description:** Cross-origin POST without proper handling.
```javascript
async function crossPost(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
```

### Error 28: Error in finally block overrides original error
**Description:** Finally block throws, hiding original error.
```javascript
async function process() {
  try {
    return await riskyOperation();
  } finally {
    await cleanup();
    throw new Error("Cleanup failed");
  }
}
```

### Error 29: Not handling JSON parse errors
**Description:** Response.json() can throw but not caught.
```javascript
async function getData() {
  const res = await fetch("/api/data");
  return res.json();
}
```

### Error 30: Async error in constructor
**Description:** Throwing error from async constructor replacement.
```javascript
class Service {
  constructor() {
    this.init();
  }
  async init() {
    this.data = await fetch("/api/data");
    if (!this.data) throw new Error("Init failed");
  }
}
```

### Error 31: Missing error boundary in async middleware
**Description:** Express async middleware without error catch.
```javascript
app.post("/api/users", async (req, res) => {
  const user = await createUser(req.body);
  res.json(user);
});
```

### Error 32: POST with URL-encoded data wrong header
**Description:** Sending URL-encoded data but wrong Content-Type.
```javascript
async function login(username, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "username=" + username + "&password=" + password
  });
  return res.json();
}
```

### Error 33: Not closing resources on error
**Description:** Database connection not closed when error occurs.
```javascript
async function queryDatabase(sql) {
  const conn = await db.connect();
  const result = await conn.query(sql);
  await conn.close();
  return result;
}
```

### Error 34: Rethrowing without original error
**Description:** Losing original error context when rethrowing.
```javascript
async function fetchData() {
  try {
    return await fetch("/api/data");
  } catch (e) {
    throw new Error("Fetch failed");
  }
}
```

### Error 35: POST with binary data wrong approach
**Description:** Sending binary data as JSON.
```javascript
async function uploadImage(file) {
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(file)
  });
  return res.json();
}
```

### Error 36: Not validating POST response structure
**Description:** Assuming response has certain fields without checking.
```javascript
async function createAndGetId(data) {
  const res = await fetch("/api/items", {
    method: "POST",
    body: JSON.stringify(data)
  });
  const result = await res.json();
  return result.id;
}
```

### Error 37: POST with array as root
**Description:** Sending array as root JSON but API expects object.
```javascript
async function batchCreate(items) {
  const res = await fetch("/api/items/batch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(items)
  });
  return res.json();
}
```

### Error 38: Not handling redirect after POST
**Description:** POST returns 302 but fetch follows silently.
```javascript
async function submitForm(data) {
  const res = await fetch("/api/submit", {
    method: "POST",
    body: JSON.stringify(data)
  });
  console.log(res.redirected);
  return res.json();
}
```

### Error 39: Error in Promise.allSettled mapping
**Description:** Mapping allSettled results but accessing wrong property.
```javascript
const results = await Promise.allSettled([p1, p2]);
const data = results.map(r => r.value);
```

### Error 40: POST with credentials not included
**Description:** POST request doesn't send cookies.
```javascript
async function login(data) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
```

### Error 41: Not handling network offline
**Description:** No check for navigator.onLine before fetch.
```javascript
async function syncData() {
  const res = await fetch("/api/sync", { method: "POST" });
  return res.json();
}
```

### Error 42: Error.stack not available in all environments
**Description:** Relying on stack trace that might be missing.
```javascript
async function handleError(e) {
  console.log(e.stack.split("\n")[0]);
}
```

### Error 43: POST retry causing duplicate operations
**Description:** Retrying POST that is not idempotent.
```javascript
async function createWithRetry(data, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify(data)
      });
    } catch (e) {
      if (i === retries - 1) throw e;
    }
  }
}
```

### Error 44: Not truncating error messages
**Description:** Logging huge error payloads.
```javascript
async function loadData() {
  try {
    return await fetch("/api/huge-data").then(r => r.json());
  } catch (e) {
    console.error("Error:", e);
  }
}
```

### Error 45: POST with circular JSON
**Description:** JSON.stringify throws on circular reference.
```javascript
const data = { name: "test" };
data.self = data;
const res = await fetch("/api/data", {
  method: "POST",
  body: JSON.stringify(data)
});
```

### Error 46: Not using AbortError handling
**Description:** Catching abort error without checking.
```javascript
async function loadWithTimeout(url) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res.json();
  } catch (e) {
    console.log("Request failed");
  }
}
```

### Error 47: Error in async for...of not caught
**Description:** Async iteration error not caught.
```javascript
async function processPages() {
  for await (const page of getPages()) {
    await process(page);
  }
}
```

### Error 48: POST with gzip body not indicated
**Description:** Sending compressed body without Content-Encoding.
```javascript
async function postCompressed(url, data) {
  const compressed = await compress(JSON.stringify(data));
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: compressed
  });
  return res.json();
}
```

### Error 49: Not handling 409 Conflict in POST
**Description:** Conflict error from duplicate resource not handled.
```javascript
async function createUser(email) {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
```

### Error 50: Async error in static method
**Description:** Static async method without error propagation.
```javascript
class Database {
  static async connect() {
    const conn = await driver.connect();
    return conn;
  }
}
Database.connect();
```

### Error 51: Not handling POST response headers
**Description:** Not reading Location header from 201 response.
```javascript
async function createResource(data) {
  const res = await fetch("/api/resources", {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
```

### Error 52: POST with EventSource content-type
**Description:** Wrong content type for event stream.
```javascript
async function streamEvents() {
  const res = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "text/event-stream" }
  });
}
```

### Error 53: Error in Promise constructor not caught
**Description:** Error thrown in promise executor not caught by outer try.
```javascript
async function create() {
  try {
    const p = new Promise((resolve) => {
      throw new Error("executor error");
      resolve(42);
    });
    return await p;
  } catch (e) {
    console.log("Caught:", e);
  }
}
```

### Error 54: TypeError from response.json() on empty body
**Description:** Parsing empty response as JSON.
```javascript
async function deleteItem(id) {
  const res = await fetch("/api/items/" + id, { method: "DELETE" });
  return res.json();
}
```

### Error 55: Not checking if response body is empty before parsing
**Description:** 204 No Content response parsed as JSON.
```javascript
async function update(id, data) {
  const res = await fetch("/api/items/" + id, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
  return res.json();
}
```

### Error 56: POST with non-ASCII data not encoded
**Description:** Special characters in JSON not properly handled.
```javascript
async function createItem(data) {
  const res = await fetch("/api/items", {
    method: "POST",
    body: JSON.stringify({ name: "caf\u00e9" })
  });
  return res.json();
}
```

### Error 57: Error in Promise.all input validation
**Description:** Passing non-thenable to Promise.all.
```javascript
function getData(id) {
  if (!id) return "invalid";
  return fetch("/api/data/" + id).then(r => r.json());
}
const results = await Promise.all([getData(1), getData(null)]);
```

### Error 58: POST request with GET method override
**Description:** Using X-HTTP-Method-Override incorrectly.
```javascript
const res = await fetch("/api/items/1", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-HTTP-Method-Override": "GET"
  }
});
```

### Error 59: Not handling network change during request
**Description:** Network goes offline during POST.
```javascript
async function saveForm(data) {
  const res = await fetch("/api/save", {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
```

### Error 60: Error boundary too high
**Description:** Catching error far from where it occurs.
```javascript
async function a() { await fetch("/api/a"); }
async function b() { await a(); }
async function c() { await b(); }
async function d() { await c(); }
try {
  await d();
} catch (e) {
  // Too far from actual error
}
```

### Error 61: POST with Date object not serialized
**Description:** Date object in JSON becomes string.
```javascript
const data = { date: new Date(), name: "test" };
const res = await fetch("/api/events", {
  method: "POST",
  body: JSON.stringify(data)
});
```

### Error 62: Not handling server timeout (504)
**Description:** Gateway timeout not specifically handled.
```javascript
async function fetchData() {
  const res = await fetch("/api/slow-query");
  if (res.status === 504) throw new Error("Timeout");
  return res.json();
}
```

### Error 63: Async error in reduce callback
**Description:** Reduce with async callback loses errors.
```javascript
async function sumValues(items) {
  return items.reduce(async (sum, item) => {
    const val = await getValue(item);
    return (await sum) + val;
  }, 0);
}
```

### Error 64: POST form data with nested objects
**Description:** FormData with nested objects not serialized.
```javascript
const fd = new FormData();
fd.append("user", JSON.stringify({ name: "Alice", roles: ["admin"] }));
const res = await fetch("/api/users", {
  method: "POST",
  body: fd
});
```

### Error 65: Not catching JSON.stringify errors
**Description:** JSON.stringify can throw on BigInt or circular.
```javascript
const data = { big: BigInt(123) };
const res = await fetch("/api/data", {
  method: "POST",
  body: JSON.stringify(data)
});
```

### Error 66: POST with incorrect HTTP version
**Description:** No way to specify HTTP version in fetch.
```javascript
// HTTP/2 vs HTTP/1.1 issues
const res = await fetch("/api/data", {
  method: "POST",
  // Cannot specify HTTP version
});
```

### Error 67: Not handling 503 Service Unavailable
**Description:** Service unavailable with no retry.
```javascript
async function fetchResource() {
  const res = await fetch("/api/resource");
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
```

### Error 68: POST body as array buffer not indicated
**Description:** Sending ArrayBuffer but no Content-Type.
```javascript
const buffer = new ArrayBuffer(8);
const res = await fetch("/api/upload", {
  method: "POST",
  body: buffer
});
```

### Error 69: Not handling error in recursive async
**Description:** Recursive async function error not caught.
```javascript
async function loadPages(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (data.next) return [...data.items, ...await loadPages(data.next)];
  return data.items;
}
```

### Error 70: POST with wrong multipart boundary
**Description:** Manual multipart POST with wrong boundary.
```javascript
const boundary = "----Boundary123";
const body = "--" + boundary + "\r\nContent-Disposition: form-data\r\n\r\ntest\r\n--" + boundary + "--";
const res = await fetch("/api/upload", {
  method: "POST",
  headers: { "Content-Type": "multipart/form-data; boundary=" + boundary },
  body
});
```

## Issue Snippets

### Issue 1: Catching and rethrowing generic error
**Description:** Catch block just rethrows the same error.
```javascript
async function load() {
  try {
    return await fetch("/api/data");
  } catch (e) {
    throw e;
  }
}
```

### Issue 2: POST without error handling
**Description:** POST request with no error handling at all.
```javascript
const res = await fetch("/api/users", { method: "POST" });
const data = await res.json();
```

### Issue 3: Empty try block
**Description:** Try block with no code.
```javascript
async function risky() {
  try {}
  catch (e) { handleError(e); }
}
```

### Issue 4: Too many try/catch blocks
**Description:** Every single await wrapped in its own try/catch.
```javascript
async function load() {
  let a, b, c;
  try { a = await fetch("/api/a"); } catch (e) { a = null; }
  try { b = await fetch("/api/b"); } catch (e) { b = null; }
  try { c = await fetch("/api/c"); } catch (e) { c = null; }
}
```

### Issue 5: POST without checking response type
**Description:** Always parsing JSON regardless of status.
```javascript
const res = await fetch("/api/items", { method: "POST" });
const data = await res.json();
```

### Issue 6: Not using .catch on async function call
**Description:** Calling async function without catching rejection.
```javascript
async function main() {
  throw new Error("fail");
}
main();
```

### Issue 7: Returning error instead of throwing
**Description:** Return error object instead of throwing.
```javascript
async function getData() {
  try {
    return await fetch("/api/data");
  } catch (e) {
    return e;
  }
}
```

### Issue 8: Inconsistent error handling patterns
**Description:** Some functions use try/catch, some use .catch.
```javascript
async function a() { try { await fetch("/api/a"); } catch (e) {} }
function b() { fetch("/api/b").catch(e => {}); }
```

### Issue 9: POST with no validation before sending
**Description:** Sending unvalidated data to server.
```javascript
async function submitForm(formData) {
  const res = await fetch("/api/submit", {
    method: "POST",
    body: JSON.stringify(formData)
  });
}
```

### Issue 10: Duplicate error logging
**Description:** Logging error in both catch and caller.
```javascript
async function load() {
  try {
    return await fetch("/api/data");
  } catch (e) {
    console.error("Error in load:", e);
    throw e;
  }
}
load().catch(e => console.error("Error in caller:", e));
```

### Issue 11: POST without loading state
**Description:** No UI feedback during POST request.
```javascript
async function save() {
  await fetch("/api/save", { method: "POST" });
}
```

### Issue 12: Mixing throw and return error
**Description:** Inconsistently throwing and returning errors.
```javascript
async function validate(data) {
  if (!data.name) return { error: "Name required" };
  if (!data.email) throw new Error("Email required");
  return true;
}
```

### Issue 13: POST with no CSRF token
**Description:** POST request without CSRF protection.
```javascript
const res = await fetch("/api/transfer", {
  method: "POST",
  body: JSON.stringify({ amount: 1000 })
});
```

### Issue 14: Error messages exposed to user
**Description:** Showing raw error messages in UI.
```javascript
async function load() {
  try {
    return await fetch("/api/data");
  } catch (e) {
    showError(e.message);
  }
}
```

### Issue 15: POST retry with no idempotency key
**Description:** Retrying POST that may create duplicate resources.
```javascript
async function createOrder(order) {
  try {
    return await fetch("/api/orders", { method: "POST" });
  } catch (e) {
    return await fetch("/api/orders", { method: "POST" });
  }
}
```

### Issue 16: Not distinguishing error types
**Description:** Handling network errors same as validation errors.
```javascript
async function submit(data) {
  try {
    const res = await fetch("/api/submit", { method: "POST" });
    return res.json();
  } catch (e) {
    showError("Submission failed");
  }
}
```

### Issue 17: Overly specific error messages
**Description:** Error messages that leak implementation details.
```javascript
throw new Error("MySQL connection pool exhausted at /api/users endpoint");
```

### Issue 18: POST with no timeout
**Description:** POST can hang indefinitely.
```javascript
async function upload(data) {
  const res = await fetch("/api/upload", { method: "POST" });
}
```

### Issue 19: Not using finally for cleanup
**Description:** Duplicating cleanup in then and catch.
```javascript
async function process() {
  showLoading();
  try {
    const data = await fetch("/api/data");
    hideLoading();
    return data;
  } catch (e) {
    hideLoading();
    throw e;
  }
}
```

### Issue 20: POST body too large
**Description:** Sending very large payload without chunking.
```javascript
const hugeData = new Array(1000000).fill("x");
const res = await fetch("/api/upload", {
  method: "POST",
  body: JSON.stringify(hugeData)
});
```

### Issue 21: No fallback for failed POST
**Description:** No offline queue or retry for failed POST.
```javascript
async function saveDraft(draft) {
  const res = await fetch("/api/drafts", { method: "POST" });
}
```

### Issue 22: Catching and continuing with corrupted state
**Description:** Continuing execution after error with invalid state.
```javascript
async function load() {
  let data;
  try { data = await fetch("/api/data"); } catch (e) {}
  return data.json();
}
```

### Issue 23: POST with unnecessary preflight
**Description:** Simple POST triggering unnecessary CORS preflight.
```javascript
const res = await fetch("/api/data", {
  method: "POST",
  headers: { "X-Custom": "value" }
});
```

### Issue 24: Not closing file handles on error
**Description:** File descriptor leak when POST fails.
```javascript
async function uploadFile(filePath) {
  const file = fs.createReadStream(filePath);
  const res = await fetch("/api/upload", { method: "POST" });
  file.close();
}
```

### Issue 25: POST with manual JSON serialization issues
**Description:** JSON.stringify called multiple times.
```javascript
const data = { name: "test" };
const json = JSON.stringify(data);
const res = await fetch("/api/data", {
  method: "POST",
  body: JSON.stringify(json)
});
```

### Issue 26: Not retrying on network errors
**Description:** Network failure causes immediate failure.
```javascript
async function sync() {
  const res = await fetch("/api/sync", { method: "POST" });
}
```

### Issue 27: Error in finally after await
**Description:** Error in finally not caught.
```javascript
async function process() {
  try {
    return await step1();
  } finally {
    await cleanup(); // may throw
  }
}
```

### Issue 28: POST without progress for large uploads
**Description:** No upload progress indicator.
```javascript
async function uploadVideo(video) {
  const res = await fetch("/api/videos", { method: "POST", body: video });
}
```

### Issue 29: Swallowing specific errors
**Description:** Catching specific error types generically.
```javascript
catch (e) {
  if (e instanceof TypeError) {} // network error
  if (e instanceof SyntaxError) {} // parse error
  // but what about other errors?
}
```

### Issue 30: Not aborting POST on component unmount
**Description:** POST continues after user navigates away.
```javascript
useEffect(() => {
  fetch("/api/save", { method: "POST" });
}, []);
```

## Modify Snippets

### Modify 1: Add proper error handling to POST
**Description:** Check response.ok and handle errors.
```javascript
async function createUser(data) {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
// Add error handling
```

### Modify 2: Add retry logic with error differentiation
**Description:** Retry on network error, not on 4xx.
```javascript
async function postWithRetry(url, data) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("POST failed");
  return res.json();
}
// Add retry logic for network errors
```

### Modify 3: Add request timeout with AbortController
**Description:** POST with timeout and proper abort handling.
```javascript
async function postData(url, data) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
// Add timeout with abort
```

### Modify 4: Create error handling middleware
**Description:** Centralized error handler for async functions.
```javascript
async function apiCall(fn) {
  return await fn();
}
// Create error wrapper
```

### Modify 5: Add validation before POST
**Description:** Validate data before sending.
```javascript
async function createItem(data) {
  const res = await fetch("/api/items", {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
// Add validation
```

### Modify 6: Handle specific HTTP status codes
**Description:** Handle 400, 401, 403, 404, 409, 500 differently.
```javascript
async function apiRequest(url, options) {
  const res = await fetch(url, options);
  return res.json();
}
// Handle specific status codes
```

### Modify 7: Add idempotency key to POST
**Description:** Prevent duplicate POST requests.
```javascript
async function createOrder(order) {
  const res = await fetch("/api/orders", {
    method: "POST",
    body: JSON.stringify(order)
  });
  return res.json();
}
// Add Idempotency-Key header
```

### Modify 8: Implement offline queue for POST
**Description:** Queue POST requests when offline.
```javascript
async function saveWhenOnline(data) {
  const res = await fetch("/api/save", {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
// Queue if offline
```

### Modify 9: Add loading and error states
**Description:** Return loading, error, data states from async.
```javascript
async function fetchData() {
  const res = await fetch("/api/data");
  return res.json();
}
// Return { loading, error, data } state
```

### Modify 10: Create async error boundary component
**Description:** Error boundary for async operations.
```javascript
// Create AsyncErrorBoundary component
```

### Modify 11: Add request cancellation with cleanup
**Description:** Cancel POST and clean up resources.
```javascript
async function uploadFile(file) {
  const res = await fetch("/api/upload", {
    method: "POST",
    body: file
  });
  return res.json();
}
// Add cancellation
```

### Modify 12: Implement retry with exponential backoff
**Description:** Retry POST with increasing delays.
```javascript
async function postWithBackoff(url, data) {
  // Add exponential backoff retry
}
```

### Modify 13: Add circuit breaker
**Description:** Stop retrying after N failures.
```javascript
// Add circuit breaker to async calls
```

### Modify 14: Create typed error classes
**Description:** NetworkError, ValidationError, AuthError classes.
```javascript
// Create error class hierarchy
```

### Modify 15: Add logging interceptor
**Description:** Log all async request errors.
```javascript
async function loggedFetch(url, options) {
  const res = await fetch(url, options);
  return res.json();
}
// Add logging
```

### Modify 16: Handle POST form data with files
**Description:** Proper file upload with FormData.
```javascript
async function uploadFile(file) {
  const res = await fetch("/api/upload", {
    method: "POST",
    body: file
  });
  return res.json();
}
// Use FormData properly
```

### Modify 17: Add optimistic UI with rollback
**Description:** Update UI before POST, rollback on failure.
```javascript
async function updateItem(id, changes) {
  const res = await fetch("/api/items/" + id, {
    method: "PATCH",
    body: JSON.stringify(changes)
  });
  return res.json();
}
// Add optimistic update
```

### Modify 18: Implement POST with progress tracking
**Description:** Show upload progress (using XMLHttpRequest).
```javascript
// Create uploadWithProgress using XHR
```

### Modify 19: Add CSRF token to POST
**Description:** Include CSRF token in requests.
```javascript
async function postWithCSRF(url, data) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
// Add CSRF header
```

### Modify 20: Batch multiple POST requests
**Description:** Combine several POSTs into batch.
```javascript
// Create batchPost that sends multiple items in one request
```

### Modify 21: Add request/response interceptors
**Description:** Intercept requests and responses.
```javascript
// Create interceptor chain for fetch
```

### Modify 22: Implement POST with timeouts and fallback
**Description:** Try primary, fallback to secondary.
```javascript
async function postWithFallback(url, data, fallbackUrl) {
  // Try primary, then fallback
}
```

### Modify 23: Add data integrity checks
**Description:** Checksum POST body for integrity.
```javascript
async function postWithChecksum(url, data) {
  // Add checksum header
}
```

### Modify 24: Implement POST compression
**Description:** Compress request body.
```javascript
async function postCompressed(url, data) {
  // Compress before sending
}
```

### Modify 25: Add request signing to POST
**Description:** Sign POST request body.
```javascript
async function signedPost(url, data, secret) {
  // Add HMAC signature
}
```

### Modify 26: Create resilient POST wrapper
**Description:** POST with retry, timeout, circuit breaker.
```javascript
// Create resilientPost with all features
```

### Modify 27: Add deduplication for POST requests
**Description:** Prevent duplicate POST to same endpoint.
```javascript
// Create dedupePost
```

### Modify 28: Implement POST request queuing
**Description:** Queue sequential POST requests.
```javascript
// Create PostQueue
```

### Modify 29: Add POST response caching
**Description:** Cache POST responses for idempotent requests.
```javascript
// Create cache for POST responses
```

### Modify 30: Handle POST redirects properly
**Description:** Follow POST redirects with correct method.
```javascript
async function postFollowRedirect(url, data) {
  // Handle 307/308 redirects properly
}
```

### Modify 31: Create automatic error recovery
**Description:** Auto-recover from transient errors.
```javascript
// Create AutoRecovery wrapper
```

### Modify 32: Add global error handler
**Description:** Handle unhandled promise rejections.
```javascript
// Add global error handler for async
```

### Modify 33: Implement POST with concurrency limit
**Description:** Limit concurrent POST requests.
```javascript
// Create rate-limited POST
```

### Modify 34: Add fallback cache for POST
**Description:** Return cached result when POST fails.
```javascript
// Create postWithCache
```

### Modify 35: Implement POST with versioning
**Description:** Add API version to POST requests.
```javascript
// Add version header to POST
```

### Modify 36: Create async error recovery saga
**Description:** Complex error recovery with rollback.
```javascript
// Create error recovery saga
```

### Modify 37: Add structured error responses
**Description:** Parse and structure error responses.
```javascript
async function apiPost(url, data) {
  const res = await fetch(url, { method: "POST" });
  return res.json();
}
// Structure error responses
```

### Modify 38: Handle POST timeout with retry
**Description:** Timeout then retry POST.
```javascript
async function postWithTimeoutRetry(url, data) {
  // Timeout + retry
}
```

### Modify 39: Add user-friendly error messages
**Description:** Map error codes to user messages.
```javascript
// Create error message map
```

### Modify 40: Implement dead letter queue for POST
**Description:** Store failed POSTs for later retry.
```javascript
// Create dead letter queue
```

### Modify 41: Add rate limit awareness
**Description:** Read rate limit headers and back off.
```javascript
async function postWithRateAwareness(url, data) {
  // Check rate limit headers
}
```

### Modify 42: POST with conditional idempotency
**Description:** Only add idempotency key for certain requests.
```javascript
async function conditionalIdempotentPost(url, data, isIdempotent) {
  // Conditional key
}
```

### Modify 43: Add request tagging
**Description:** Tag requests for debugging.
```javascript
async function taggedPost(url, data, tag) {
  // Add X-Request-Tag header
}
```

### Modify 44: Implement POST with WebSocket fallback
**Description:** Use WebSocket if POST fails.
```javascript
async function postWithFallback(url, data) {
  // POST first, fallback to WebSocket
}
```

### Modify 45: Create async error boundary
**Description:** Boundary that catches all async errors.
```javascript
// Create AsyncErrorBoundary for React
```

### Modify 46: Add telemetry to errors
**Description:** Send error details to monitoring.
```javascript
async function monitoredPost(url, data) {
  // Send error telemetry
}
```

### Modify 47: Implement POST with HMAC authentication
**Description:** Sign POST requests.
```javascript
async function hmacPost(url, data, key) {
  // HMAC signed POST
}
```

### Modify 48: Add retry with jitter
**Description:** Add random jitter to retry delays.
```javascript
async function postWithJitter(url, data) {
  // Retry with jitter
}
```

### Modify 49: Create async parallel processor with error handling
**Description:** Process items in parallel with error isolation.
```javascript
// Create parallel processor with per-item error handling
```

### Modify 50: Build complete async error handling system
**Description:** Full error handling system for async operations.
```javascript
// Build: Error classes, Retry, CircuitBreaker, Timeout
// Queue, OfflineSupport, ErrorBoundary, Monitoring
// All working together for POST requests
```
