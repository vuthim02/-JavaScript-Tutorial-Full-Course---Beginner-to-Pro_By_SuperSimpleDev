const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 30080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend")));

let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
  { id: 2, title: "1984", author: "George Orwell", year: 1949 },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
];
let nextId = 4;

app.get("/api/books", (req, res) => {
  let result = books;

  if (req.query.author) {
    result = result.filter((b) =>
      b.author.toLowerCase().includes(req.query.author.toLowerCase())
    );
  }
  if (req.query.year) {
    result = result.filter((b) => b.year === Number(req.query.year));
  }

  res.json(result);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

app.post("/api/books", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author required" });
  }

  const book = { id: nextId++, title, author, year: year || null };
  books.push(book);
  res.status(201).json(book);
});

app.put("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });

  const { title, author, year } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (year) book.year = year;

  res.json(book);
});

app.delete("/api/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  books.splice(index, 1);
  res.status(204).end();
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[Backend] Express API running on http://localhost:${PORT}`);
  console.log(`[Frontend] Serving at http://localhost:${PORT}`);
});
