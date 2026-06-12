/**
 * PART 7 — Asynchronous JS: callbacks, Promises, async/await, Promise.all/race, AbortController
 * Run with: node part07-async.js
 */

// ---------------------------------------------------------------
// 1. Callback pattern — function passed as argument
// ---------------------------------------------------------------

function fetchDataCallback(id, callback) {
  // Simulate async operation with setTimeout
  setTimeout(() => {
    const data = { id, name: `Item ${id}` };
    callback(null, data); // null = no error
  }, 100);
}

console.log('Callback pattern:');
fetchDataCallback(1, (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('  Callback got:', data);
});

// ---------------------------------------------------------------
// 2. Callback hell (pyramid of doom) — nested callbacks
// ---------------------------------------------------------------

function getUser(id, cb) {
  setTimeout(() => cb(null, { id, username: `user${id}` }), 100);
}
function getPosts(userId, cb) {
  setTimeout(() => cb(null, [{ id: 1, title: 'Post 1' }]), 100);
}
function getComments(postId, cb) {
  setTimeout(() => cb(null, [{ id: 1, text: 'Nice!' }]), 100);
}

// Nested callbacks — hard to read and maintain
getUser(1, (err, user) => {
  if (err) return console.error(err);
  getPosts(user.id, (err, posts) => {
    if (err) return console.error(err);
    getComments(posts[0].id, (err, comments) => {
      if (err) return console.error(err);
      console.log('Callback hell result:', { user, posts, comments });
    });
  });
});

// ---------------------------------------------------------------
// 3. Promise — then/catch
// ---------------------------------------------------------------

function fetchDataPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error('Invalid ID'));
        return;
      }
      resolve({ id, name: `Item ${id}` });
    }, 100);
  });
}

console.log('Promise pattern:');
fetchDataPromise(2)
  .then(data => console.log('  Promise resolved:', data))
  .catch(err => console.error('  Promise rejected:', err.message));

// ---------------------------------------------------------------
// 4. Promise chaining — avoid callback hell
// ---------------------------------------------------------------

function getUserP(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, username: `user${id}` }), 100);
  });
}
function getPostsP(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, title: 'Post 1' }]), 100);
  });
}
function getCommentsP(postId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, text: 'Nice!' }]), 100);
  });
}

getUserP(1)
  .then(user => getPostsP(user.id))
  .then(posts => getCommentsP(posts[0].id))
  .then(comments => console.log('Promise chain result:', comments))
  .catch(err => console.error('Chain error:', err));

// ---------------------------------------------------------------
// 5. async/await — syntactic sugar over Promises
// ---------------------------------------------------------------

async function loadUserData(userId) {
  try {
    const user = await getUserP(userId);
    const posts = await getPostsP(user.id);
    const comments = await getCommentsP(posts[0].id);
    console.log('async/await result:', { user, posts, comments });
    return { user, posts, comments };
  } catch (err) {
    console.error('async/await error:', err.message);
    throw err;
  }
}

console.log('async/await:');
loadUserData(1);

// ---------------------------------------------------------------
// 6. Parallel execution — Promise.all
// ---------------------------------------------------------------

async function loadMultipleUsers() {
  const userIds = [1, 2, 3];
  const promises = userIds.map(id => getUserP(id));

  // All run in parallel, wait for all to resolve
  const users = await Promise.all(promises);
  console.log('Promise.all — users:', users);
}

loadMultipleUsers();

// ---------------------------------------------------------------
// 7. Race — Promise.race (first one wins)
// ---------------------------------------------------------------

function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
  });
}

async function fetchWithTimeout(id, ms) {
  try {
    const data = await Promise.race([
      fetchDataPromise(id),
      timeout(ms),
    ]);
    console.log('Promise.race winner:', data);
  } catch (err) {
    console.error('Promise.race error:', err.message);
  }
}

fetchWithTimeout(5, 200); // Should resolve
fetchWithTimeout(5, 10); // Should time out

// ---------------------------------------------------------------
// 8. Error handling in async/await
// ---------------------------------------------------------------

async function demonstrateErrorHandling() {
  try {
    const result = await fetchDataPromise(-1);
    console.log('This will not run:', result);
  } catch (err) {
    console.log('Caught error gracefully:', err.message);
  } finally {
    console.log('Finally block — always runs');
  }
}

demonstrateErrorHandling();

// ---------------------------------------------------------------
// 9. AbortController — cancel fetch (or any async operation)
// ---------------------------------------------------------------

function fetchWithAbort(id, signal) {
  return new Promise((resolve, reject) => {
    // Listen for abort signal
    signal.addEventListener('abort', () => {
      console.log('  Operation aborted');
      reject(new DOMException('Aborted', 'AbortError'));
    });

    setTimeout(() => {
      if (!signal.aborted) {
        resolve({ id, name: `Item ${id}` });
      }
    }, 500);
  });
}

async function demoAbortController() {
  const controller = new AbortController();
  const { signal } = controller;

  // Schedule abort after 100ms
  setTimeout(() => controller.abort(), 100);

  try {
    const result = await fetchWithAbort(42, signal);
    console.log('AbortController result:', result);
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('AbortController demo — successfully aborted');
    } else {
      console.error('Other error:', err);
    }
  }
}

demoAbortController();
