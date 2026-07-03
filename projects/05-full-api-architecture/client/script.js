const API = "http://localhost:3001/api";

let token = localStorage.getItem("token");

function getHeaders() {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function api(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: getHeaders(),
    ...options,
  });

  if (res.status === 204) return null;

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

async function register() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const status = document.getElementById("register-status");

  try {
    await api("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    status.textContent = "Registered! You can now log in.";
    status.style.color = "green";
  } catch (e) {
    status.textContent = e.message;
    status.style.color = "red";
  }
}

async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const status = document.getElementById("login-status");

  try {
    const data = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    token = data.token;
    localStorage.setItem("token", token);
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("books-section").style.display = "block";
    loadBooks();
  } catch (e) {
    status.textContent = e.message;
    status.style.color = "red";
  }
}

function logout() {
  token = null;
  localStorage.removeItem("token");
  document.getElementById("auth-section").style.display = "flex";
  document.getElementById("books-section").style.display = "none";
}

async function loadBooks() {
  const author = document.getElementById("filter-author").value;
  const year = document.getElementById("filter-year").value;
  const params = new URLSearchParams();
  if (author) params.set("author", author);
  if (year) params.set("year", year);

  const query = params.toString() ? `?${params.toString()}` : "";
  const books = await api(`/books${query}`);
  renderBooks(books);
}

function renderBooks(books) {
  const container = document.getElementById("books-list");
  container.innerHTML = books.map((b) => `
    <div class="book-item">
      <div class="book-info">
        <h4>${b.title}</h4>
        <p>${b.author} (${b.year})</p>
      </div>
      <div class="book-actions">
        <button class="delete" onclick="deleteBook(${b.id})">Delete</button>
      </div>
    </div>
  `).join("");
}

async function createBook() {
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const year = parseInt(document.getElementById("book-year").value);
  const status = document.getElementById("book-status");

  try {
    await api("/books", {
      method: "POST",
      body: JSON.stringify({ title, author, year }),
    });
    status.textContent = "Book added!";
    status.style.color = "green";
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-year").value = "";
    loadBooks();
  } catch (e) {
    status.textContent = e.message;
    status.style.color = "red";
  }
}

async function deleteBook(id) {
  try {
    await api(`/books/${id}`, { method: "DELETE" });
    loadBooks();
  } catch (e) {
    alert(e.message);
  }
}

function clearFilters() {
  document.getElementById("filter-author").value = "";
  document.getElementById("filter-year").value = "";
  loadBooks();
}

if (token) {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("books-section").style.display = "block";
  loadBooks();
}
