# Level 100 - Complete backend integration, final review (Module 20: Backend, Async/Await)

## Error Snippets

### Error 1: Mixing sync and async Express handlers
**Description:** Express route handler that is async but no error handling.
```javascript
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
```

### Error 2: Not using express.json() middleware
**Description:** POST request body undefined because JSON parser missing.
```javascript
const express = require("express");
const app = express();
app.post("/api/users", (req, res) => {
  console.log(req.body);
  res.json({ received: true });
});
```

### Error 3: CORS middleware missing
**Description:** Frontend fetch blocked by CORS.
```javascript
const express = require("express");
const app = express();
app.get("/api/data", (req, res) => {
  res.json({ data: "test" });
});
```

### Error 4: Not handling async errors in Express
**Description:** Async route handler throws but Express doesn't catch.
```javascript
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new Error("Not found");
  res.json(user);
});
```

### Error 5: Wrong HTTP method in route
**Description:** Using GET when form submits POST.
```javascript
app.get("/api/users", (req, res) => {
  const user = createUser(req.body);
  res.json(user);
});
```

### Error 6: URL parameter not parsed as integer
**Description:** req.params.id is string, not number.
```javascript
app.get("/api/users/:id", (req, res) => {
  const user = users[req.params.id];
  res.json(user);
});
```

### Error 7: Missing return to prevent double response
**Description:** Trying to send response twice.
```javascript
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) res.status(404).json({ error: "Not found" });
  res.json(user);
});
```

### Error 8: Not validating request body
**Description:** Creating user without required fields.
```javascript
app.post("/api/users", (req, res) => {
  const user = new User(req.body);
  user.save();
  res.status(201).json(user);
});
```

### Error 9: Sensitive data in response
**Description:** Returning password hash in API response.
```javascript
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});
```

### Error 10: No rate limiting
**Description:** API endpoint with no rate limit protection.
```javascript
app.post("/api/login", async (req, res) => {
  const user = await authenticate(req.body);
  res.json(user);
});
```

### Error 11: SQL injection vulnerability
**Description:** Unsanitized input in database query.
```javascript
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM users WHERE name = '" + req.query.name + "'";
  db.query(query, (err, results) => {
    res.json(results);
  });
});
```

### Error 12: Not using environment variables
**Description:** Hardcoded database credentials.
```javascript
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password123",
  database: "app"
});
```

### Error 13: Missing error middleware
**Description:** Express app with no error handling middleware.
```javascript
const app = express();
app.get("/api/error", (req, res) => {
  throw new Error("test");
});
app.listen(3000);
```

### Error 14: Not using helmet for security headers
**Description:** Missing security headers.
```javascript
const express = require("express");
const app = express();
app.get("/api/data", (req, res) => {
  res.json({ data: "test" });
});
```

### Error 15: XSS vulnerability
**Description:** Reflecting user input without sanitization.
```javascript
app.get("/api/search", (req, res) => {
  res.send("<div>Results for: " + req.query.q + "</div>");
});
```

### Error 16: MongoDB injection
**Description:** NoSQL injection via query object.
```javascript
app.get("/api/users", async (req, res) => {
  const users = await User.find({ username: req.query.username });
  res.json(users);
});
```

### Error 17: Multiple body parsers conflicting
**Description:** Both json and urlencoded parsers set incorrectly.
```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
app.use(express.text());
```

### Error 18: Not handling 404 routes
**Description:** No catch-all route handler.
```javascript
const app = express();
app.get("/api/users", (req, res) => res.json([]));
app.listen(3000);
```

### Error 19: Async middleware not catching
**Description:** Async Express middleware throws without next().
```javascript
app.use(async (req, res, next) => {
  const user = await authenticate(req);
  req.user = user;
  next();
});
```

### Error 20: Double JSON parsing
**Description:** Parsing JSON request body twice.
```javascript
app.use(express.json());
app.post("/api/data", (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body));
  res.json(data);
});
```

### Error 21: Not closing database connections
**Description:** Database connection leak.
```javascript
app.get("/api/data", (req, res) => {
  const conn = db.connect();
  conn.query("SELECT 1", (err, results) => {
    res.json(results);
  });
});
```

### Error 22: Serving static files without proper path
**Description:** Static files path misconfigured.
```javascript
app.use(express.static("public"));
```

### Error 23: Missing Content-Type in response
**Description:** Response without proper content type.
```javascript
app.get("/api/data", (req, res) => {
  res.send({ data: "test" });
});
```

### Error 24: Blocking event loop with sync operation
**Description:** CPU-heavy sync operation in route handler.
```javascript
app.get("/api/compute", (req, res) => {
  const result = heavyComputation();
  res.json({ result });
});
```

### Error 25: Not using compression
**Description:** No response compression.
```javascript
const app = express();
app.get("/api/large-data", (req, res) => {
  res.json(largeData);
});
```

### Error 26: Memory leak from accumulating data
**Description:** Route handler accumulates data in memory.
```javascript
const allRequests = [];
app.post("/api/data", (req, res) => {
  allRequests.push(req.body);
  res.json({ ok: true });
});
```

### Error 27: No input sanitization for MongoDB
**Description:** $where injection possible.
```javascript
app.get("/api/users", async (req, res) => {
  const users = await User.find({ $where: req.query.condition });
  res.json(users);
});
```

### Error 28: Not using HTTPS in production
**Description:** Server running HTTP only.
```javascript
app.listen(3000);
```

### Error 29: Missing request validation middleware
**Description:** No validation for request parameters.
```javascript
app.post("/api/users", (req, res) => {
  const user = new User(req.body);
  user.save();
  res.json(user);
});
```

### Error 30: Exposing stack traces in production
**Description:** Error details leaked to client.
```javascript
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.stack });
});
```

### Error 31: No pagination for list endpoints
**Description:** Returning all records without pagination.
```javascript
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
```

### Error 32: Callback hell in route handler
**Description:** Nested callbacks without async/await.
```javascript
app.get("/api/dashboard", (req, res) => {
  User.findById(req.user.id, (err, user) => {
    Order.find({ userId: user.id }, (err, orders) => {
      Product.find({}, (err, products) => {
        res.json({ user, orders, products });
      });
    });
  });
});
```

### Error 33: Not using express.Router
**Description:** All routes defined directly on app.
```javascript
app.get("/api/users", ...);
app.post("/api/users", ...);
app.get("/api/products", ...);
app.post("/api/products", ...);
```

### Error 34: Wrong order of middleware
**Description:** Error middleware placed before routes.
```javascript
app.use((err, req, res, next) => res.status(500).json({ error: err.message }));
app.get("/api/test", (req, res) => res.json({ ok: true }));
```

### Error 35: Not handling file uploads securely
**Description:** File upload without size validation.
```javascript
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});
```

### Error 36: Using eval in route handler
**Description:** Code injection via eval.
```javascript
app.get("/api/calculate", (req, res) => {
  const result = eval(req.query.expression);
  res.json({ result });
});
```

### Error 37: Session management issues
**Description:** Session secret hardcoded and weak.
```javascript
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));
```

### Error 38: Not limiting request body size
**Description:** No payload size limit.
```javascript
app.use(express.json());
app.post("/api/upload", (req, res) => {
  res.json({ size: JSON.stringify(req.body).length });
});
```

### Error 39: Using deprecated bodyParser
**Description:** Using bodyParser instead of express.json.
```javascript
const bodyParser = require("body-parser");
app.use(bodyParser.json());
```

### Error 40: CORS wildcard with credentials
**Description:** Credentials not allowed with wildcard origin.
```javascript
app.use(cors({ origin: "*", credentials: true }));
```

### Error 41: No request logging
**Description:** No logging in production.
```javascript
const app = express();
app.get("/api/data", (req, res) => res.json({ data: "test" }));
```

### Error 42: Hardcoded pagination limits
**Description:** No configurable page size.
```javascript
app.get("/api/users", async (req, res) => {
  const users = await User.find().limit(100).skip(0);
  res.json(users);
});
```

### Error 43: Not using HTTP status codes correctly
**Description:** Always returning 200 even on errors.
```javascript
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  res.json(user || { error: "Not found" });
});
```

### Error 44: Missing API versioning
**Description:** API without version prefix.
```javascript
app.get("/users", (req, res) => res.json([]));
```

### Error 45: Not handling unhandled promise rejections
**Description:** Process crashes on unhandled rejection.
```javascript
process.on("unhandledRejection", (reason) => {
  console.log(reason);
});
```

### Error 46: No health check endpoint
**Description:** No /health endpoint for monitoring.
```javascript
const app = express();
app.get("/api/data", ...);
```

### Error 47: Synchronous file read in route
**Description:** Blocking event loop with readFileSync.
```javascript
app.get("/api/config", (req, res) => {
  const config = fs.readFileSync("./config.json");
  res.json(JSON.parse(config));
});
```

### Error 48: Missing port fallback
**Description:** Server crashes if port is in use.
```javascript
app.listen(3000);
```

### Error 49: Not using cluster mode
**Description:** Single process for all requests.
```javascript
app.listen(3000);
```

### Error 50: No graceful shutdown
**Description:** Server doesn't close connections on SIGTERM.
```javascript
const server = app.listen(3000);
```

### Error 51: Exposing internal file structure
**Description:** Directory traversal vulnerability.
```javascript
app.get("/api/files/:name", (req, res) => {
  res.sendFile(__dirname + "/files/" + req.params.name);
});
```

### Error 52: Route parameter injection
**Description:** MongoDB ObjectID injection.
```javascript
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});
```

### Error 53: No CSRF protection for form posts
**Description:** No CSRF token validation.
```javascript
app.post("/api/transfer", (req, res) => {
  transferMoney(req.body);
  res.json({ ok: true });
});
```

### Error 54: WebSocket without authentication
**Description:** Unauthenticated WebSocket connections.
```javascript
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
  ws.send("connected");
});
```

### Error 55: Not handling socket.io errors
**Description:** Socket.io error crashes server.
```javascript
io.on("connection", (socket) => {
  socket.on("data", (data) => {
    processData(data);
  });
});
```

### Error 56: Environment variable not set check
**Description:** Accessing undefined env variable.
```javascript
const dbUrl = process.env.DATABASE_URL;
db.connect(dbUrl);
```

### Error 57: Using res.send for objects
**Description:** res.send instead of res.json for objects.
```javascript
app.get("/api/user", (req, res) => {
  res.send({ name: "Alice" });
});
```

### Error 58: Not normalizing port from env
**Description:** Port from env is string, not number.
```javascript
const port = process.env.PORT || 3000;
app.listen(port);
```

### Error 59: No timeout for database queries
**Description:** DB query hangs forever.
```javascript
app.get("/api/data", async (req, res) => {
  const data = await db.query("SELECT 1");
  res.json(data);
});
```

### Error 60: Mixing callbacks and async in same route
**Description:** Using both async/await and callbacks.
```javascript
app.post("/api/data", async (req, res) => {
  await save(req.body, (err, result) => {
    res.json(result);
  });
});
```

### Error 61: Memory leak from unbounded arrays
**Description:** Log array grows indefinitely.
```javascript
const requestLog = [];
app.use((req, res, next) => {
  requestLog.push({ url: req.url, time: Date.now() });
  next();
});
```

### Error 62: Not compressing large JSON responses
**Description:** Large responses without compression.
```javascript
app.get("/api/large", (req, res) => {
  res.json(bigData);
});
```

### Error 63: Regex denial of service
**Description:** Catastrophic backtracking in route.
```javascript
app.get("/api/search/:pattern", (req, res) => {
  const regex = new RegExp(req.params.pattern);
  const results = data.filter(d => regex.test(d));
  res.json(results);
});
```

### Error 64: No keep-alive configuration
**Description:** HTTP connections not reused.
```javascript
const server = app.listen(3000);
server.keepAliveTimeout = 0;
```

### Error 65: Sending file sync in Express
**Description:** Blocking sendFile.
```javascript
app.get("/api/download", (req, res) => {
  const content = fs.readFileSync("/path/to/file");
  res.send(content);
});
```

### Error 66: Missing error status in catch
**Description:** Always returning 500 for any error.
```javascript
app.use(async (req, res, next) => {
  try { await next(); }
  catch (e) { res.status(500).json({ error: e.message }); }
});
```

### Error 67: Not using path.join for file paths
**Description:** Cross-platform path issues.
```javascript
app.get("/api/file", (req, res) => {
  res.sendFile(__dirname + "/files/data.json");
});
```

### Error 68: Insecure direct object reference
**Description:** User can access other users' data.
```javascript
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});
```

### Error 69: No request ID tracking
**Description:** Cannot trace requests across logs.
```javascript
app.use((req, res, next) => {
  next();
});
```

### Error 70: Using next() after response sent
**Description:** Calling next after res.json causes error.
```javascript
app.get("/api/test", (req, res, next) => {
  res.json({ ok: true });
  next();
});
```

## Issue Snippets

### Issue 1: All routes in one file
**Description:** Routes not split into modules.
```javascript
app.get("/api/users", ...);
app.post("/api/users", ...);
app.get("/api/products", ...);
app.post("/api/products", ...);
app.get("/api/orders", ...);
app.post("/api/orders", ...);
```

### Issue 2: No input validation library
**Description:** Manual validation instead of using Joi/Zod.
```javascript
app.post("/api/users", (req, res) => {
  if (!req.body.name) return res.status(400).json({ error: "Name required" });
  if (!req.body.email) return res.status(400).json({ error: "Email required" });
});
```

### Issue 3: Hardcoded responses
**Description:** No database, using hardcoded arrays.
```javascript
const users = [{ id: 1, name: "Alice" }];
app.get("/api/users", (req, res) => res.json(users));
```

### Issue 4: No authentication middleware
**Description:** Routes not protected with auth.
```javascript
app.get("/api/admin/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
```

### Issue 5: Not using async/await in all routes
**Description:** Mix of callbacks and async.
```javascript
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
app.get("/api/orders", (req, res) => {
  Order.find({}, (err, orders) => res.json(orders));
});
```

### Issue 6: No centralized error handling
**Description:** Each route has its own error handling.
```javascript
app.get("/api/a", async (req, res) => {
  try { res.json(await A.find()); } catch (e) { res.status(500).json({ error: e.message }); }
});
app.get("/api/b", async (req, res) => {
  try { res.json(await B.find()); } catch (e) { res.status(500).json({ error: e.message }); }
});
```

### Issue 7: Not using environment-based config
**Description:** Same config for dev and prod.
```javascript
const db = mongoose.connect("mongodb://localhost:27017/app");
```

### Issue 8: Missing API documentation
**Description:** No Swagger/OpenAPI docs.
```javascript
// No API documentation
```

### Issue 9: No request timeout
**Description:** Requests can hang forever.
```javascript
app.get("/api/slow", async (req, res) => {
  const data = await slowQuery();
  res.json(data);
});
```

### Issue 10: Not handling database disconnection
**Description:** No reconnection logic.
```javascript
mongoose.connect("mongodb://localhost:27017/app");
```

### Issue 11: Using res.status().json() inconsistently
**Description:** Mixing res.json() and res.send() patterns.
```javascript
app.get("/api/a", (req, res) => res.json({ ok: true }));
app.get("/api/b", (req, res) => res.send({ ok: true }));
```

### Issue 12: No content negotiation
**Description:** Always returning JSON regardless of Accept header.
```javascript
app.get("/api/data", (req, res) => res.json({ data: "test" }));
```

### Issue 13: Not using HTTP/2
**Description:** Server running HTTP/1.1.
```javascript
const server = app.listen(3000);
```

### Issue 14: No database migration system
**Description:** Schema managed manually.
```javascript
// Schema changes done manually
```

### Issue 15: Monolithic route handlers
**Description:** Business logic in route handlers.
```javascript
app.post("/api/checkout", async (req, res) => {
  const user = await User.findById(req.user.id);
  const cart = await Cart.findById(user.cartId);
  const order = await Order.create({ items: cart.items });
  await Payment.charge(order.total, user.paymentMethod);
  await Inventory.update(cart.items);
  await Email.send(user.email, "Order confirmation");
  res.json(order);
});
```

### Issue 16: No separation of concerns
**Description:** Models, routes, controllers all in one file.
```javascript
// Everything in server.js
```

### Issue 17: Using let instead of const for imports
**Description:** Mutable imports.
```javascript
let express = require("express");
let app = express();
```

### Issue 18: No .env file for configuration
**Description:** No environment variable management.
```javascript
// No dotenv
```

### Issue 19: Exposing internal server info
**Description:** Server header reveals Express version.
```javascript
// X-Powered-By: Express header
```

### Issue 20: No graceful error messages
**Description:** Technical error messages in production.
```javascript
res.status(500).json({ error: "Cannot read property 'name' of undefined" });
```

### Issue 21: Hardcoded database name
**Description:** Database name hardcoded.
```javascript
mongoose.connect("mongodb://localhost:27017/myapp");
```

### Issue 22: No request validation schema
**Description:** No schema for request body validation.
```javascript
// No validation at all
```

### Issue 23: Using console.log instead of logger
**Description:** No structured logging.
```javascript
console.log("User created:", userId);
```

### Issue 24: No database indexing
**Description:** Queries slow due to missing indexes.
```javascript
const userSchema = new mongoose.Schema({ name: String, email: String });
```

### Issue 25: Not using transactions
**Description:** Multiple DB operations not atomic.
```javascript
await Order.create(orderData);
await Inventory.update(items); // If this fails, order is orphaned
```

### Issue 26: Using sync methods in async context
**Description:** Sync methods blocking event loop.
```javascript
app.post("/api/process", async (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data);
});
```

### Issue 27: No response caching headers
**Description:** No Cache-Control headers.
```javascript
app.get("/api/public", (req, res) => res.json(data));
```

### Issue 28: Not streaming large responses
**Description:** Loading all data in memory before sending.
```javascript
app.get("/api/huge", async (req, res) => {
  const allData = await HugeModel.find();
  res.json(allData);
});
```

### Issue 29: No database query timeouts
**Description:** Long-running queries not timed out.
```javascript
const data = await Model.find({ complexQuery });
```

### Issue 30: Using insecure dependencies
**Description:** Outdated npm packages.
```javascript
// package.json with old versions
```

## Modify Snippets

### Modify 1: Set up Express with error handling
**Description:** Create Express app with proper error handling.
```javascript
const express = require("express");
const app = express();
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
// Add error handling middleware
```

### Modify 2: Add CORS and JSON middleware
**Description:** Configure CORS and body parsers.
```javascript
const express = require("express");
const app = express();
// Add CORS and JSON middleware
```

### Modify 3: Create route modules
**Description:** Split routes into separate modules.
```javascript
// Create routes/users.js
// Create routes/products.js
// Create routes/orders.js
```

### Modify 4: Add async error wrapper
**Description:** Create wrapper for async route handlers.
```javascript
// Create asyncHandler wrapper
// Wrap all route handlers
```

### Modify 5: Add request validation
**Description:** Validate requests using Joi/Zod.
```javascript
app.post("/api/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});
// Add validation
```

### Modify 6: Implement authentication middleware
**Description:** Add JWT authentication.
```javascript
app.get("/api/profile", async (req, res) => {
  res.json(req.user);
});
// Add auth middleware
```

### Modify 7: Add pagination to list endpoints
**Description:** Add page/limit query params.
```javascript
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
// Add pagination
```

### Modify 8: Implement rate limiting
**Description:** Add rate limiting with express-rate-limit.
```javascript
app.post("/api/login", async (req, res) => {
  // Login logic
});
// Add rate limiting
```

### Modify 9: Add logging middleware
**Description:** Add morgan or custom logger.
```javascript
const app = express();
app.get("/api/data", (req, res) => res.json({}));
// Add logging
```

### Modify 10: Create centralized error handler
**Description:** Create error handling middleware.
```javascript
// Create error classes
// Create error handler middleware
// Handle different error types
```

### Modify 11: Set up environment configuration
**Description:** Use dotenv and configuration modules.
```javascript
// Create config/index.js
// Use environment variables
```

### Modify 12: Add health check and monitoring
**Description:** Add /health endpoint with DB status.
```javascript
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
// Add database health check
```

### Modify 13: Implement graceful shutdown
**Description:** Handle SIGTERM for graceful shutdown.
```javascript
const server = app.listen(3000);
// Add graceful shutdown
```

### Modify 14: Add compression middleware
**Description:** Compress responses with compression.
```javascript
const app = express();
// Add compression
```

### Modify 15: Set up HTTPS
**Description:** Configure HTTPS server.
```javascript
// Create HTTPS server with certificates
```

### Modify 16: Implement database connection with retry
**Description:** MongoDB connection with retry logic.
```javascript
mongoose.connect("mongodb://localhost:27017/app");
// Add retry logic
```

### Modify 17: Add request ID middleware
**Description:** Add unique ID to each request.
```javascript
// Add request ID middleware
// Include in responses
```

### Modify 18: Create controller layer
**Description:** Extract logic from routes into controllers.
```javascript
// Create controllers/userController.js
// Create controllers/productController.js
```

### Modify 19: Add response caching
**Description:** Cache GET responses with Redis.
```javascript
// Add caching middleware
// Cache GET responses
```

### Modify 20: Implement file upload with validation
**Description:** Secure file upload with multer.
```javascript
const multer = require("multer");
app.post("/api/upload", (req, res) => {});
// Add file validation and limits
```

### Modify 21: Add API versioning
**Description:** Version API routes.
```javascript
// Create /api/v1/ and /api/v2/ routes
```

### Modify 22: Set up WebSocket integration
**Description:** Add Socket.io for real-time.
```javascript
// Integrate Socket.io with Express
```

### Modify 23: Implement database transactions
**Description:** Use MongoDB transactions.
```javascript
// Add transaction support
// Atomic operations
```

### Modify 24: Add data sanitization
**Description:** Sanitize inputs to prevent NoSQL injection.
```javascript
// Add mongo-sanitize middleware
```

### Modify 25: Create middleware pipeline
**Description:** Build middleware chain: auth, validation, logging, caching.
```javascript
// Create middleware pipeline
// Apply to routes
```

### Modify 26: Implement full CRUD for a resource
**Description:** Complete CRUD for /api/items.
```javascript
// GET /api/items
// GET /api/items/:id
// POST /api/items
// PUT /api/items/:id
// DELETE /api/items/:id
```

### Modify 27: Add search functionality
**Description:** Full-text search with proper indexing.
```javascript
app.get("/api/search", async (req, res) => {});
// Add text search
```

### Modify 28: Implement sorting and filtering
**Description:** Query params for sort and filter.
```javascript
app.get("/api/users", async (req, res) => {});
// Add sort, filter, field selection
```

### Modify 29: Create service layer
**Description:** Business logic in service classes.
```javascript
// Create services/userService.js
// Create services/orderService.js
```

### Modify 30: Add API documentation with Swagger
**Description:** Document API with swagger-jsdoc.
```javascript
// Add Swagger/OpenAPI docs
// Serve Swagger UI
```

### Modify 31: Implement email sending
**Description:** Send emails with Nodemailer.
```javascript
// Create email service
// Welcome emails, notifications
```

### Modify 32: Add background job processing
**Description:** Use Bull/BullMQ for async jobs.
```javascript
// Create job queue
// Process jobs in background
```

### Modify 33: Implement push notifications
**Description:** Web push notifications.
```javascript
// Add push notification service
```

### Modify 34: Create file storage service
**Description:** Upload to S3/cloud storage.
```javascript
// Create StorageService
// Upload/download files
```

### Modify 35: Add two-factor authentication
**Description:** 2FA with TOTP.
```javascript
// Add 2FA middleware
// TOTP verification
```

### Modify 36: Implement social login
**Description:** OAuth with Google/GitHub.
```javascript
// Add passport strategies
// Social login routes
```

### Modify 37: Create admin dashboard API
**Description:** Admin-only endpoints.
```javascript
// Create admin routes
// Admin authorization middleware
```

### Modify 38: Add webhook handling
**Description:** Handle incoming webhooks.
```javascript
// Create webhook endpoint
// Verify signatures
```

### Modify 39: Implement server-sent events
**Description:** SSE for real-time updates.
```javascript
// Create SSE endpoint
// Event streaming
```

### Modify 40: Add data export endpoints
**Description:** Export data as CSV/Excel.
```javascript
// Create export routes
// Format conversion
```

### Modify 41: Implement full-text search
**Description:** Elasticsearch integration.
```javascript
// Add Elasticsearch
// Search routes
```

### Modify 42: Create multi-tenant architecture
**Description:** Support multiple organizations.
```javascript
// Add tenant middleware
// Data isolation
```

### Modify 43: Add audit logging
**Description:** Track all changes.
```javascript
// Create AuditLog model
// Middleware for tracking
```

### Modify 44: Implement caching strategy
**Description:** Multi-level caching (memory, Redis).
```javascript
// Create cache service
// Cache invalidation
```

### Modify 45: Create feature flags system
**Description:** Toggle features per environment.
```javascript
// Feature flag middleware
// Admin UI for flags
```

### Modify 46: Add load testing setup
**Description:** Configure k6/autocannon.
```javascript
// Create load test scripts
// Performance benchmarks
```

### Modify 47: Implement CI/CD pipeline
**Description:** GitHub Actions for testing/deploy.
```javascript
// Create .github/workflows
// Test and deploy
```

### Modify 48: Add error tracking integration
**Description:** Sentry/error monitoring.
```javascript
// Add Sentry middleware
// Error reporting
```

### Modify 49: Create API client SDK
**Description:** JavaScript SDK for the API.
```javascript
// Create ApiClient class
// Methods for all endpoints
```

### Modify 50: Build complete production API
**Description:** Production-ready Express API.
```javascript
// Build: Auth, CRUD, File upload, Search, Pagination
// Caching, Rate limiting, Security, Logging, Monitoring
// Tests, Docs, CI/CD, Error handling, Graceful shutdown
```
