const express = require("express");
const books = require("../data/books");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "REST API Theories — Books API",
    endpoints: {
      "GET /api/books": "List all books",
      "GET /api/books/:id": "Get a book by ID",
      "POST /api/books": "Create a book",
      "PUT /api/books/:id": "Replace a book",
      "PATCH /api/books/:id": "Partially update a book",
      "DELETE /api/books/:id": "Delete a book",
    },
  });
});

let nextId = books.length + 1;

app.get("/api/books", (req, res) => {
  const { author, year } = req.query;
  let result = [...books];

  if (author) {
    result = result.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }
  if (year) {
    result = result.filter((b) => b.year === parseInt(year));
  }

  res.json(result);
});

app.get("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

app.post("/api/books", (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({ error: "title, author, and year are required" });
  }

  const book = { id: nextId++, title, author, year };
  books.push(book);

  res.status(201).json(book);
});

app.put("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ error: "title, author, and year are required" });
  }

  books[index] = { id, title, author, year };
  res.json(books[index]);
});

app.patch("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const { title, author, year } = req.body;
  if (title) books[index].title = title;
  if (author) books[index].author = author;
  if (year) books[index].year = year;

  res.json(books[index]);
});

app.delete("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Try: curl http://localhost:${PORT}/api/books`);
});
