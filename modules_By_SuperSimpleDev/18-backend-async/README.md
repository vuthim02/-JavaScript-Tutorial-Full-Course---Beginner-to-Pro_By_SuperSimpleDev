# Module 18: Backend, Callbacks, Async/Await

**Duration:** ~58 minutes  
**Video Timestamp:** 19:32:59 - 20:30:57

## Learning Objectives

- Understand what a backend is
- Learn about HTTP requests
- Master callbacks and callback patterns
- Understand Promises
- Use async/await
- Work with fetch API

## What is a Backend?

The backend is the server-side of an application that handles:
- Data storage and retrieval
- Business logic
- Authentication
- API endpoints

Frontend (Browser) ←→ HTTP ←→ Backend (Server)

## HTTP Basics

### HTTP Methods

- **GET** - Retrieve data
- **POST** - Create new data
- **PUT** - Update/replace data
- **PATCH** - Partial update
- **DELETE** - Remove data

### URL Structure

```
https://api.example.com/users/123?sort=name
│        │            │     │   │
│        │            │     │   └── Query params
│        │            │     └─────── Resource ID
│        │            └──────────── Resource
│        └────────────────────────── Domain
└───────────────────────────────── Protocol
```

## Callbacks

### Synchronous Callbacks

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(function(num) {
  console.log(num);
});
```

### Asynchronous Callbacks

```javascript
console.log('1: Start');

setTimeout(function() {
  console.log('3: Inside timeout');
}, 1000);

console.log('2: End');
// Output: 1, 2, 3
```

## Promises

Promises provide cleaner async code:

```javascript
const promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('Data loaded successfully');
  }, 1000);
});

promise
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.log(error);
  });
```

### Creating Promises

```javascript
function fetchUser(id) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (id > 0) {
        resolve({ id: id, name: 'User ' + id });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

fetchUser(1)
  .then(function(user) {
    console.log(user);
  })
  .catch(function(error) {
    console.log(error);
  });
```

### Promise.all()

Wait for multiple promises:

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(function(results) {
    console.log(results);  // [1, 2, 3]
  });
```

## Async/Await

Modern syntax for working with promises:

### Basic Syntax

```javascript
async function loadData() {
  const result = await fetchData();
  console.log(result);
}
```

### Error Handling with Try/Catch

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.log('Error fetching user:', error);
    return null;
  }
}
```

## Fetch API

Modern way to make HTTP requests:

### Basic GET Request

```javascript
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(function(response) {
    return response.json();
  })
  .then(function(user) {
    console.log(user);
  });
```

### Async/Await with Fetch

```javascript
async function getUser(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await response.json();
  return user;
}
```

### POST Request

```javascript
async function createUser(userData) {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  return await response.json();
}
```

### PUT Request (Update)

```javascript
async function updateUser(id, userData) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  return await response.json();
}
```

### DELETE Request

```javascript
async function deleteUser(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE'
  });
  
  return response.ok;
}
```

## Error Handling

### Callback Error Handling

```javascript
function fetchData(callback) {
  setTimeout(function() {
    const error = Math.random() < 0.5 ? new Error('Failed') : null;
    const data = { message: 'Success' };
    callback(error, data);
  }, 1000);
}

fetchData(function(error, data) {
  if (error) {
    console.log('Error:', error.message);
  } else {
    console.log('Data:', data);
  }
});
```

### Promise Error Handling

```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Async/Await Error Handling

```javascript
async function loadData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

## Common Patterns

### Sequential Requests

```javascript
async function getUserWithPosts(userId) {
  const userResponse = await fetch(`/api/users/${userId}`);
  const user = await userResponse.json();
  
  const postsResponse = await fetch(`/api/posts?userId=${userId}`);
  const posts = await postsResponse.json();
  
  return { user, posts };
}
```

### Parallel Requests

```javascript
async function getDashboardData() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return { users, posts, comments };
}
```

## Status Codes

Common HTTP status codes:

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

## Practice Exercises

### Exercise 18.1: Convert Callbacks to Promises
Convert a callback-based function to return a Promise.

### Exercise 18.2: Async/Await with Error Handling
Create an async function that fetches and displays user data.

### Exercise 18.3: Promise.all Practice
Fetch multiple users and display them.

### Exercise 18.4: Build a Simple API Service
Create a service object with CRUD methods.

## Summary

- Backend handles server-side logic and data
- HTTP methods: GET, POST, PUT, DELETE
- Callbacks are the traditional async pattern
- Promises provide cleaner error handling
- async/await is the modern async syntax
- fetch() is the modern HTTP client
- Always handle errors gracefully

## Congratulations! You've Completed the Course!

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)