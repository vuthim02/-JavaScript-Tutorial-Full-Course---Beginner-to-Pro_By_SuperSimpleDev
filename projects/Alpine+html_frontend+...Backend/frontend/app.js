const API = "http://localhost:30080/api";

function bookApp() {
  return {
    books: [],
    newBook: { title: "", author: "", year: "" },
    filter: { author: "", year: "" },
    editingId: null,
    editForm: { title: "", author: "", year: "" },
    message: "",
    messageColor: "green",

    async init() {
      await this.loadBooks();
    },

    async loadBooks() {
      const params = new URLSearchParams();
      if (this.filter.author) params.set("author", this.filter.author);
      if (this.filter.year) params.set("year", this.filter.year);

      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await fetch(`${API}/books${query}`);
      this.books = await res.json();
    },

    async addBook() {
      try {
        const res = await fetch(`${API}/books`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: this.newBook.title,
            author: this.newBook.author,
            year: this.newBook.year ? Number(this.newBook.year) : null,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error);
        }

        this.message = "Book added!";
        this.messageColor = "green";
        this.newBook = { title: "", author: "", year: "" };
        await this.loadBooks();
      } catch (e) {
        this.message = e.message;
        this.messageColor = "red";
      }
    },

    startEdit(book) {
      this.editingId = book.id;
      this.editForm = {
        title: book.title,
        author: book.author,
        year: book.year,
      };
    },

    async saveEdit(id) {
      try {
        await fetch(`${API}/books/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: this.editForm.title,
            author: this.editForm.author,
            year: this.editForm.year ? Number(this.editForm.year) : null,
          }),
        });

        this.editingId = null;
        await this.loadBooks();
      } catch (e) {
        this.message = e.message;
        this.messageColor = "red";
      }
    },

    async deleteBook(id) {
      try {
        await fetch(`${API}/books/${id}`, { method: "DELETE" });
        await this.loadBooks();
      } catch (e) {
        this.message = e.message;
        this.messageColor = "red";
      }
    },

    clearFilters() {
      this.filter = { author: "", year: "" };
      this.loadBooks();
    },
  };
}