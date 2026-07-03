# REST API Theories

A practical demonstration of REST API design principles and theories, built with Express.js.

## Core REST Principles

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Statelessness** | Each request contains all info needed; no client context stored server-side | No session data used between requests |
| **Resource-Based** | Everything is a resource identified by a URI | `/api/books/:id` identifies each book |
| **HTTP Methods as Verbs** | Use standard HTTP methods for CRUD | GET, POST, PUT, PATCH, DELETE |
| **Representation** | Resources transferred in a standard format | JSON request/response bodies |
| **HATEOAS** | Hypermedia as the engine of application state | Response includes links to related resources |

## HTTP Methods & Status Codes

| Method | Endpoint | Action | Success Code | Error Codes |
|--------|----------|--------|-------------|-------------|
| GET | `/api/books` | List all books | 200 OK | — |
| GET | `/api/books/:id` | Get one book | 200 OK | 404 Not Found |
| POST | `/api/books` | Create a book | 201 Created | 400 Bad Request |
| PUT | `/api/books/:id` | Replace a book | 200 OK | 400, 404 |
| PATCH | `/api/books/:id` | Partially update | 200 OK | 400, 404 |
| DELETE | `/api/books/:id` | Delete a book | 204 No Content | 404 Not Found |

### Status Code Categories

- **1xx** — Informational (request received, continuing)
- **2xx** — Success (request received, understood, accepted)
- **3xx** — Redirection (further action needed)
- **4xx** — Client Error (bad request, unauthorized, not found)
- **5xx** — Server Error (server failed to fulfill valid request)

## URI Design

- Use nouns, not verbs: `/api/books` not `/api/getBooks`
- Plural resource names: `/api/books` not `/api/book`
- Nest related resources: `/api/authors/:id/books`
- Query params for filtering/sorting: `/api/books?author=Fitzgerald&year=1925`

## Idempotency

- **GET, PUT, DELETE, PATCH** are idempotent — multiple identical requests produce the same result
- **POST** is NOT idempotent — repeated calls create multiple resources

## Running the Server

```bash
npm start
```

## Testing Endpoints

```bash
# List all books
curl http://localhost:3000/api/books

# Get a single book
curl http://localhost:3000/api/books/1

# Create a book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Dune","author":"Frank Herbert","year":1965}'

# Update a book
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","year":1925}'

# Partially update a book
curl -X PATCH http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"year":1926}'

# Delete a book
curl -X DELETE http://localhost:3000/api/books/1

# Filter by author
curl "http://localhost:3000/api/books?author=Fitzgerald"

# Filter by year
curl "http://localhost:3000/api/books?year=1949"
```
