const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname, "bookstore.proto");
const TARGET = process.env.TARGET || "localhost:50051";

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDef);

const channelCreds = grpc.credentials.createInsecure();

const targets = process.env.TARGETS
  ? process.env.TARGETS.split(",")
  : [TARGET];

const isLB = TARGET.includes("50050");
let client;
if (targets.length > 1) {
  const options = {
    "grpc.lb_policy_name": "round_robin",
    "grpc.service_config": JSON.stringify({
      loadBalancingConfig: [{ round_robin: {} }],
    }),
  };
  client = new proto.bookstore.Bookstore(
    targets.join(","),
    channelCreds,
    options
  );
  console.log(`Client: client-side round-robin across [${targets.join(", ")}]`);
} else if (isLB) {
  client = new proto.bookstore.Bookstore(TARGET, channelCreds);
  console.log(`Client: via TCP Load Balancer at ${TARGET}`);
} else {
  client = new proto.bookstore.Bookstore(TARGET, channelCreds);
  console.log(`Client: direct to ${TARGET}`);
}

const authClient = isLB
  ? new proto.bookstore.Auth(TARGET, channelCreds)
  : new proto.bookstore.Auth(TARGET, channelCreds);

let token = "";

function metadata() {
  const md = new grpc.Metadata();
  if (token) md.set("authorization", `Bearer ${token}`);
  return md;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function register(username, password) {
  return new Promise((resolve, reject) => {
    authClient.Register({ username, password }, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

async function login(username, password) {
  return new Promise((resolve, reject) => {
    authClient.Login({ username, password }, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

async function listBooks(authorFilter, yearFilter) {
  return new Promise((resolve, reject) => {
    client.ListBooks(
      { author: authorFilter || "", year: yearFilter || 0 },
      metadata(),
      (err, res) => {
        err ? reject(err) : resolve(res.books);
      }
    );
  });
}

async function getBook(id) {
  return new Promise((resolve, reject) => {
    client.GetBook({ id }, metadata(), (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

async function createBook(title, author, year) {
  return new Promise((resolve, reject) => {
    client.CreateBook({ title, author, year }, metadata(), (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

async function updateBook(id, title, author, year) {
  return new Promise((resolve, reject) => {
    client.UpdateBook({ id, title, author, year }, metadata(), (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

async function deleteBook(id) {
  return new Promise((resolve, reject) => {
    client.DeleteBook({ id }, metadata(), (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

function searchBooks(query) {
  return new Promise((resolve, reject) => {
    const books = [];
    const call = client.SearchBooks({ query }, metadata());
    call.on("data", (book) => books.push(book));
    call.on("end", () => resolve(books));
    call.on("error", reject);
  });
}

function batchCreateBooks(books) {
  return new Promise((resolve, reject) => {
    const call = client.BatchCreateBooks(metadata(), (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
    for (const b of books) {
      call.write(b);
    }
    call.end();
  });
}

function liveBookUpdates() {
  return new Promise((resolve) => {
    const events = [];
    const call = client.LiveBookUpdates(metadata());

    call.on("data", (event) => {
      events.push(event);
    });
    call.on("end", () => resolve(events));

    call.write({ type: "create", title: "Live Book", author: "Stream Author", year: 2024 });
    call.write({ type: "create", title: "Another Live", author: "Stream Author", year: 2025 });
    call.write({ type: "ping" });
    setTimeout(() => call.end(), 500);
  });
}

async function main() {
  try {
    const r = await register("grpcuser", "password123").catch(() => ({ message: "(already exists)" }));
    console.log("Register:", r.message);

    const l = await login("grpcuser", "password123");
    token = l.token;
    console.log("Login: token obtained\n");

    console.log("=== 1. Unary: Create Books ===");
    const b1 = await createBook("Dune", "Frank Herbert", 1965);
    console.log("  Created:", b1.title, `(id:${b1.id}, server:${b1.created_by})`);
    const b2 = await createBook("Neuromancer", "William Gibson", 1984);
    console.log("  Created:", b2.title, `(id:${b2.id})`);
    const b3 = await createBook("Snow Crash", "Neal Stephenson", 1992);
    console.log("  Created:", b3.title, `(id:${b3.id})`);

    console.log("\n=== 2. Unary: List Books ===");
    const books = await listBooks();
    console.log(`  Total: ${books.length} books`);
    books.forEach((b) => console.log(`    ${b.id}. ${b.title} by ${b.author} (${b.year})`));

    console.log("\n=== 3. Unary: Get Book ===");
    const book = await getBook(b1.id);
    console.log(`  Got: "${book.title}" by ${book.author} (${book.year})`);

    console.log("\n=== 4. Unary: Update Book ===");
    const updated = await updateBook(b1.id, "Dune (Updated)", "Frank Herbert", 1966);
    console.log(`  Updated: "${updated.title}" (${updated.year})`);

    console.log("\n=== 5. Unary: Filter Books ===");
    const filtered = await listBooks("Gibson", 0);
    console.log(`  Filtered by author "Gibson": ${filtered.length} result(s)`);

    console.log("\n=== 6. Server Streaming: Search Books ===");
    const found = await searchBooks("Snow");
    console.log(`  Search "Snow": ${found.length} result(s)`);
    found.forEach((b) => console.log(`    ${b.title}`));

    console.log("\n=== 7. Client Streaming: Batch Create ===");
    const batch = await batchCreateBooks([
      { title: "Batch A", author: "Batch Author", year: 2020 },
      { title: "Batch B", author: "Batch Author", year: 2021 },
      { title: "Batch C", author: "Batch Author", year: 2022 },
    ]);
    console.log(`  Created ${batch.count} books via streaming`);
    batch.books.forEach((b) => console.log(`    ${b.title} (id:${b.id})`));

    console.log("\n=== 8. Bidirectional Streaming: Live Updates ===");
    const events = await liveBookUpdates();
    events.forEach((e) => {
      if (e.event === "created") {
        console.log(`  Event: ${e.event} -> "${e.book.title}" (id:${e.book.id})`);
      } else {
        console.log(`  Event: ${e.event}`);
      }
    });

    console.log("\n=== 9. Unary: Delete Book ===");
    const del = await deleteBook(b3.id);
    console.log(`  Delete: ${del.message}`);

    console.log("\n=== 10. Final List ===");
    const final = await listBooks();
    console.log(`  ${final.length} books remaining`);
    final.forEach((b) => console.log(`    ${b.id}. ${b.title}`));

    if (targets.length > 1) {
      console.log("\n=== Load Balancing: 5 requests (should hit different servers) ===");
      for (let i = 0; i < 5; i++) {
        const b = await createBook(`LB Test ${i + 1}`, "LB Author", 2024);
        console.log(`  Req ${i + 1}: created "${b.title}" (created_by: ${b.created_by})`);
      }

      console.log("\nFinal books showing per-server data (each server has own DB):");
      const all = await listBooks();
      all.forEach((b) => console.log(`  ${b.id}. ${b.title} (created_by: ${b.created_by})`));
    }
  } catch (err) {
    console.error("Error:", err.details || err.message || err);
  }
}

main();
