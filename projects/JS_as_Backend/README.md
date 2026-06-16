# JS As Backend

This project is a JavaScript-only backend built with Node.js and Express.
It avoids PHP and external databases by storing user data in a local JSON file.

## Live Response

When the server is running, the root route returns:

```json
{
  "message": "JavaScript-only backend is running",
  "endpoints": [
    "GET /health",
    "POST /api/register",
    "POST /api/login",
    "GET /api/me",
    "GET /api/users",
    "GET /api/users/:id",
    "PATCH /api/users/:id",
    "DELETE /api/users/:id"
  ]
}
```

## What This Project Does

- Registers a new user
- Logs a user in
- Signs a JWT token after successful auth
- Protects private routes with bearer-token auth
- Stores users in `data/users.json`
- Lets a user update or delete only their own account

## How The Whole Project Works

1. `src/server.js` starts the HTTP server.
2. `src/app.js` creates the Express app and defines the routes.
3. `src/store.js` reads and writes the `data/users.json` file.
4. `POST /api/register` hashes the password with `bcryptjs`, saves the user, and returns a token.
5. `POST /api/login` finds the user by email, checks the password, and returns a token.
6. `GET /api/me` reads the bearer token, verifies it, and returns the current user.
7. The `PATCH` and `DELETE` routes only allow the signed-in user to change their own account.

## File Breakdown

- `src/server.js` starts the app
- `src/app.js` contains routes and middleware
- `src/store.js` handles JSON file storage
- `data/users.json` stores user records
- `.env` stores runtime secrets like `PORT` and `JWT_SECRET`
- `.env.example` shows the required environment variables

## Request Flow

### Register

1. Client sends `username`, `email`, and `password`.
2. Server hashes the password.
3. Server checks whether the email already exists.
4. Server writes the user to `data/users.json`.
5. Server returns a token and the safe user data.

### Login

1. Client sends `email` and `password`.
2. Server finds the matching user in storage.
3. Server compares the password with the stored hash.
4. Server returns a token if the password is valid.

### Protected Routes

1. Client sends `Authorization: Bearer <token>`.
2. Server verifies the JWT.
3. Server reads the current user from storage.
4. Server returns the protected data or rejects the request.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Main Routes

- `GET /`
- `GET /health`
- `POST /api/register`
- `POST /api/login`
- `GET /api/me`
- `GET /api/users`
- `GET /api/users/:id`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`

## Example Register Request

```json
{
  "username": "tim",
  "email": "tim@example.com",
  "password": "12345678"
}
```

## Example Login Request

```json
{
  "email": "tim@example.com",
  "password": "12345678"
}
```

## Notes

- This version is intentionally simple and uses a JSON file instead of a database.
- If you want to scale it later, you can replace `src/store.js` with MongoDB, PostgreSQL, or MySQL while keeping the route layer mostly the same.
