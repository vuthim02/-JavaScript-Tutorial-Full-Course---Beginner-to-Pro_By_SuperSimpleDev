# Level 139 - Integration tests for modules

## Error Snippets

### Error 1: Integration test uses real API
**Description:** Integration test should use controlled test server.
```javascript
it("fetches users", function() {
  return fetch("https://api.example.com/users").then(r => {
    expect(r.status).toBe(200);
  });
});
```

### Error 2: Not resetting test database
**Description:** Test data persists across integration tests.
```javascript
describe("User API", function() {
  beforeAll(function() { return seedDatabase(); });
  // no afterAll cleanup
});
```

### Error 3: Integration test depends on other test
**Description:** Tests assume specific execution order.
```javascript
it("creates user", function() {
  return createUser({ name: "Alice" }).then(r => { id = r.id; });
});
it("gets user", function() {
  return getUser(id).then(r => { expect(r.name).toBe("Alice"); });
});
```

### Error 4: Not isolating test data
**Description:** Test uses production-like data that conflicts.
```javascript
it("creates admin", function() {
  return createUser({ name: "admin", role: "admin" });
});
it("creates admin again", function() {
  return createUser({ name: "admin", role: "admin" }); // may conflict
});
```

### Error 5: Integration tests too slow
**Description:** Tests make real network calls slowing suite.
```javascript
it("loads module A", function() { return loadModule("A"); });
it("loads module B", function() { return loadModule("B"); });
it("loads module C", function() { return loadModule("C"); });
```

### Error 6: No test environment segregation
**Description:** Tests run on same DB as development.
```javascript
const db = new Database(process.env.DATABASE_URL); // production URL
```

### Error 7: Integration test without assertions
**Description:** Test that makes calls but no assertions.
```javascript
it("loads module", function() {
  import("./module.js");
});
```

### Error 8: Not handling async cleanup
**Description:** Async cleanup not awaited.
```javascript
afterAll(function() {
  cleanupDatabase(); // returns promise but not returned
});
```

### Error 9: Hardcoded ports in integration tests
**Description:** Tests assume specific port numbers.
```javascript
const server = new Server(3000); // hardcoded
```

### Error 10: Tests not using unique identifiers
**Description:** Tests create records with same identifiers.
```javascript
it("test1", () => createUser({ email: "test@test.com" }));
it("test2", () => createUser({ email: "test@test.com" })); // duplicate
```

### Error 11: Integration test imports production config
**Description:** Test loads production configuration instead of test config.
```javascript
import config from "./config/production.js";
```

### Error 12: No module mocking for external dependencies
**Description:** Integration test hits real external APIs.
```javascript
import { sendEmail } from "./emailService.js";
it("sends email", function() {
  return sendEmail("user@test.com", "Subject", "Body");
});
```

### Error 13: Test order dependency via shared module state
**Description:** Modules cache state between tests.
```javascript
// cache.js
let cache = {};
export function get(key) { return cache[key]; }
export function set(key, val) { cache[key] = val; }
// Tests share this cache
```

### Error 14: Not testing module import errors
**Description:** No test for module not found or syntax errors.
```javascript
// No test that moduleA correctly imports moduleB
```

### Error 15: Integration test with no error path
**Description:** Only success path tested in integration.
```javascript
it("processes order", async () => {
  const result = await processOrder(validData);
  expect(result.success).toBe(true);
});
// No test for invalid data, network failure, etc.
```

### Error 16: Module circular dependency not tested
**Description:** Integration test should detect circular imports.
```javascript
// a.js imports b.js, b.js imports a.js
```

### Error 17: Using setTimeout for async coordination
**Description:** Relying on timeouts instead of proper async coordination.
```javascript
it("waits for event", function(done) {
  setTimeout(function() {
    expect(flag).toBe(true);
    done();
  }, 2000);
});
```

### Error 18: Not exporting test helpers from modules
**Description:** Module has no test-only exports for integration testing.
```javascript
// Module does not expose internal state for test verification
```

### Error 19: Integration tests not independent
**Description:** One test failure cascades to others.
```javascript
it("creates record", () => createRecord());
it("reads record", () => readRecord()); // fails if create failed
```

### Error 20: Not testing module version compatibility
**Description:** Integration test does not verify module version matching.
```javascript
// No check that moduleA@1.2 works with moduleB@2.1
```

### Error 21: Integration test with global fixtures
**Description:** All tests share same fixture files.
```javascript
beforeAll(() => loadFixture("users.json"));
// Test modifies the fixture data
```

### Error 22: Not using transaction rollback
**Description:** Database changes persist after test.
```javascript
it("creates user", async () => {
  await db.query("INSERT INTO users ...");
  // no rollback
});
```

### Error 23: Integration test too broad
**Description:** Testing entire system instead of module interaction.
```javascript
it("full workflow", async () => {
  await register();
  await login();
  await createOrder();
  await processPayment();
  await sendInvoice();
  // tests everything
});
```

### Error 24: Test server not properly shut down
**Description:** Server continues running after tests.
```javascript
beforeAll(() => server.start());
afterAll(() => { /* server.stop() not called */ });
```

### Error 25: Using production credentials in test
**Description:** Real API keys exposed in test code.
```javascript
const API_KEY = "sk-live-abc123def456";
```

### Error 26: Integration test for UI components
**Description:** UI integration tests need DOM environment.
```javascript
// Integration test for React component without DOM
```

### Error 27: No test for module initialization order
**Description:** Modules loaded in wrong order may fail.
```javascript
// Module A must be loaded before Module B
```

### Error 28: Integration tests not idempotent
**Description:** Running test twice gives different results.
```javascript
it("increments counter", () => incrementCounter()); // not idempotent
```

### Error 29: Not testing module error propagation
**Description:** Error in module A should propagate to module B correctly.
```javascript
// Test that module B handles errors from module A
```

### Error 30: Integration test depends on network
**Description:** Tests fail without internet connection.
```javascript
it("loads CDN module", function() {
  return import("https://cdn.example.com/module.js");
});
```

### Error 31: Not isolating module side effects
**Description:** Module side effects affect other tests.
```javascript
// Module modifies global Array.prototype
```

### Error 32: Integration test with too many mocks
**Description:** Mocking defeats purpose of integration test.
```javascript
jest.mock("./database");
jest.mock("./email");
jest.mock("./payment");
// Not really integration testing
```

### Error 33: No test for module export shape
**Description:** Module exports change breaks consumers.
```javascript
// No test that module exports expected API
```

### Error 34: Using relative paths incorrectly
**Description:** Import paths work in dev but not in test environment.
```javascript
import utils from "../../utils/helpers.js"; // fragile path
```

### Error 35: Not using test database
**Description:** Integration test uses in-memory DB that differs from real DB.
```javascript
const db = new SQLite(":memory:"); // different from PostgreSQL in prod
```

### Error 36: No test for concurrent access
**Description:** Modules not tested under concurrent load.
```javascript
// Module state modified concurrently by two imports
```

### Error 37: Integration test with no timeout
**Description:** Async integration test hangs forever on failure.
```javascript
it("loads module", async function() {
  const mod = await import("./heavyModule.js");
  expect(mod).toBeDefined();
}); // no timeout
```

### Error 38: Not testing dynamic imports
**Description:** Dynamic import paths not validated in tests.
```javascript
it("loads plugin", async function() {
  const plugin = await import(`./plugins/${name}.js`);
  // name may be invalid
});
```

### Error 39: Integration tests not parallel-safe
**Description:** Tests interfere when run in parallel.
```javascript
// All tests write to same test file
```

### Error 40: Module caching issues in test
**Description:** ES modules are cached; changes not reflected.
```javascript
import { counter } from "./counter.js";
counter.increment();
// counter.cache persists for next test
```

### Error 41: Not testing import assertion
**Description:** Import assertions for JSON not tested.
```javascript
import data from "./data.json" assert { type: "json" };
```

### Error 42: Test not covering module boundary
**Description:** Integration test misses interface boundary between modules.
```javascript
// Module A calls Module B, but test only tests Module A in isolation
```

### Error 43: Environment variable not set
**Description:** Test requires specific env vars that are missing.
```javascript
const apiKey = process.env.API_KEY; // undefined in test
```

### Error 44: Module resolves to different entry
**Description:** Module resolves differently in test vs production.
```javascript
// package.json exports field differs between environments
```

### Error 45: Node vs browser module differences
**Description:** Module behaves differently in Node vs browser.
```javascript
// Module uses window, not available in Node test
```

### Error 46: Cross-module state mutation
**Description:** Module mutates imported object affecting other modules.
```javascript
// Module A modifies object shared with Module B
```

### Error 47: Not testing default exports
**Description:** Default export functionality not integration-tested.
```javascript
import myFunc from "./myModule.js";
// myFunc is default, but always tested as named
```

### Error 48: Integration test skipping setup
**Description:** Required setup steps for module dependencies skipped.
```javascript
// Module needs database connection but test doesn't set it up
```

### Error 49: Not testing module with config
**Description:** Module behavior changes with configuration not tested.
```javascript
import { createApp } from "./app.js";
const app = createApp({ mode: "test" });
// No test for mode: "production"
```

### Error 50: Module test with inconsistent timezone
**Description:** Date-dependent module behavior differs by timezone.
```javascript
// Module uses new Date() which differs in CI timezone
```

### Error 51: Testing imported third-party module behavior
**Description:** Testing library internals instead of how your code uses them.
```javascript
import dayjs from "dayjs";
it("dayjs works", function() {
  expect(dayjs("2024-01-01").format("YYYY")).toBe("2024");
});
```

### Error 52: Not testing re-exports
**Description:** Re-exported symbols not integration-tested.
```javascript
// index.js re-exports from moduleA.js
// Test imports from index.js but moduleA.js behavior not verified
```

### Error 53: Cleanup not run on test failure
**Description:** afterEach not called if test throws.
```javascript
afterEach(() => cleanup());
it("test", () => {
  throw new Error("fail"); // cleanup may not run
});
```

### Error 54: Module-specific error not tested
**Description:** Custom error classes from modules not tested.
```javascript
import { ValidationError } from "./errors.js";
// No test that ValidationError is thrown correctly
```

### Error 55: Not testing module race conditions
**Description:** Module initialization race condition not tested.
```javascript
// Two modules both try to initialize same resource
```

### Error 56: Integration test with stale data
**Description:** Test data not refreshed between runs.
```javascript
// Test expects specific data from previous test run
```

### Error 57: Not testing module with no exports
**Description:** Side-effect only modules not integration-tested.
```javascript
import "./polyfill.js";
// polyfill effects not verified
```

### Error 58: Async module load time not measured
**Description:** Module load time exceeds acceptable threshold.
```javascript
// No test that module loads within 100ms
```

### Error 59: Integration test file organization
**Description:** Integration tests not separated from unit tests.
```javascript
// Unit and integration tests in same directory
```

### Error 60: Module entry point not tested
**Description:** Package entry point (main/exports) not verified.
```javascript
// Test imports from package name, not relative path
```

### Error 61: Not using test containers for services
**Description:** Integration test depends on locally installed services.
```javascript
// Test needs Redis installed on machine
```

### Error 62: Module bundle size not checked
**Description:** Module bundle may have grown too large.
```javascript
// No size check in integration test
```

### Error 63: Not testing tree-shaking
**Description:** Unused exports may still be included in bundle.
```javascript
// No test that unused exports are tree-shaken
```

### Error 64: Import map resolution not tested
**Description:** Import map redirects not verified in tests.
```javascript
// importmap maps "lodash" to CDN URL
```

### Error 65: Different module resolution in Node and browser
**Description:** Module resolves to different files in different environments.
```javascript
// "module" field in package.json vs "main"
```

### Error 66: Not testing module with tsconfig paths
**Description:** TypeScript path aliases not tested at runtime.
```javascript
import { helper } from "@utils/helper";
```

### Error 67: Integration test using eval
**Description:** Dynamic module loading via eval not tested.
```javascript
const mod = eval("require('module')");
```

### Error 68: Module exports unexpected symbols
**Description:** Module exports internal symbols it should not.
```javascript
// Module exports internal helper that should be private
```

### Error 69: Not testing module in strict mode
**Description:** ES modules are always strict, but tests may not be.
```javascript
// Test non-strict behavior not applicable to ES modules
```

### Error 70: Integration test network timeout too short
**Description:** Test server may need more time to respond.
```javascript
it("loads module", async function() {
  const mod = await import("./slowModule.js"); // may timeout
}, 100); // 100ms timeout
```

## Issue Snippets

### Issue 1: No integration test suite
**Description:** Only unit tests exist, no module interaction tests.
```javascript
// spec/ - only unit tests
// No integration/ directory
```

### Issue 2: Integration tests too close to unit tests
**Description:** Integration tests use too many mocks.
```javascript
jest.mock("./database");
jest.mock("./cache");
jest.mock("./logger");
it("loads user", async () => {
  // Test with everything mocked - not integrated
});
```

### Issue 3: Integration tests missing data cleanup
**Description:** Test database grows with each test run.
```javascript
// No truncation between test runs
```

### Issue 4: Not testing module with real dependencies
**Description:** Integration test should use real (test) instances.
```javascript
// Using mock database instead of test database
```

### Issue 5: Integration test setup too complex
**Description:** Setting up integration test takes too much code.
```javascript
beforeAll(async () => {
  await createDatabase();
  await seedData();
  await startServer();
  await configureModule();
  await authenticate();
  // 40+ lines of setup
});
```

### Issue 6: No CI pipeline for integration tests
**Description:** Integration tests only run locally.
```javascript
// package.json test script only runs unit tests
```

### Issue 7: Integration tests not tagged
**Description:** No way to run only integration or unit tests.
```javascript
// No tags/labels to differentiate test types
```

### Issue 8: Not testing module side effects
**Description:** Module registration/global effects not tested.
```javascript
// Module registers global event listener, side effect not tested
```

### Issue 9: Integration tests flaky due to timing
**Description:** Tests pass/fail inconsistently.
```javascript
// Async race conditions cause intermittent failures
```

### Issue 10: No test for module version mismatch
**Description:** Two modules depend on incompatible versions.
```javascript
// Module A needs lodash@4, Module B needs lodash@3
```

### Issue 11: Integration tests with real filesystem
**Description:** Test writes to real filesystem, not temp.
```javascript
import { writeFile } from "fs";
it("saves file", () => {
  writeFileSync("/tmp/test.txt", "data"); // shared temp file
});
```

### Issue 12: Not testing module error boundaries
**Description:** Error in one module crashes the whole app.
```javascript
// Module A throws, Module B should handle but no test
```

### Issue 13: Integration test coverage too low
**Description:** Few module interaction paths tested.
```javascript
// 10 modules, only 2 integration tests
```

### Issue 14: Tests depend on specific module version
**Description:** Test assumes specific internal behavior of a module.
```javascript
import { helper } from "./helper.js";
// Test assumes helper uses specific algorithm
```

### Issue 15: No integration test for async module loading
**Description:** Dynamic import() chain not tested.
```javascript
// Module A dynamically imports B which imports C
```

### Issue 16: Module integration with native modules
**Description:** Integration with Node.js native modules not tested.
```javascript
import { readFile } from "fs/promises";
import { parseFile } from "./parser.js";
// readFile + parseFile integration not tested
```

### Issue 17: Integration test not testing error formats
**Description:** Error objects from one module not consumed correctly by another.
```javascript
// Module A throws error format, Module B expects different format
```

### Issue 18: No retry logic for flaky integration
**Description:** Flaky tests not retried automatically.
```javascript
// No jest.retryTimes() or similar
```

### Issue 19: Not testing module with environment switch
**Description:** Module behavior differs in dev/prod/test.
```javascript
// Module has if (env === "production") check
```

### Issue 20: Integration test too coupled to implementation
**Description:** Tests break when module internals change.
```javascript
// Test checks module internal cache instead of behavior
```

### Issue 21: No test for module memory leak
**Description:** Module retains references after unload.
```javascript
// Module imported, used, then garbage not collected
```

### Issue 22: Integration test not checking resource cleanup
**Description:** Module opens connections but does not close them.
```javascript
// Module creates database connection, no close on destroy
```

### Issue 23: Not testing module in bundled context
**Description:** Module works unbundled but fails in webpack/rollup.
```javascript
// Dynamic import paths not compatible with bundler
```

### Issue 24: Integration test relies on external service
**Description:** Test fails when external service is down.
```javascript
// Test depends on GitHub API, Stripe, etc.
```

### Issue 25: No test for module import order
**Description:** Import order affects module behavior.
```javascript
import "./polyfill.js";
import "./app.js"; // polyfill must be imported first
```

### Issue 26: Integration tests not parameterized
**Description:** Same test repeated for different modules.
```javascript
it("moduleA loads", async () => {});
it("moduleB loads", async () => {});
it("moduleC loads", async () => {});
// duplicated logic
```

### Issue 27: No module health check in test
**Description:** No verification that module exports are functions/classes.
```javascript
// import module, check that it exports expected types
```

### Issue 28: Integration test not measuring coverage
**Description:** Integration test coverage not tracked separately.
```javascript
// Code coverage doesn't include integration tests
```

### Issue 29: Hardcoded test data in multiple files
**Description:** Same test data duplicated across integration tests.
```javascript
// test1: const user = { name: "Alice", email: "a@b.com" };
// test2: const user = { name: "Alice", email: "a@b.com" };
```

### Issue 30: Not testing module with different locales
**Description:** Module displays locale-dependent content.
```javascript
// Module formats dates - not tested with different locales
```

## Modify Snippets

### Modify 1: Create integration test for two modules
**Description:** Test that module A can import and use module B.
```javascript
// Test that userModule imports and uses validationModule
```

### Modify 2: Add cleanup after integration test
**Description:** Add afterAll that resets shared state.
```javascript
describe("Module integration", function() {
  // Add afterAll cleanup
});
```

### Modify 3: Create test fixtures file
**Description:** Create shared test data for integration tests.
```javascript
// Create test-fixtures.js with shared test data
```

### Modify 4: Test module re-export
**Description:** Test that index.js correctly re-exports from submodules.
```javascript
// Test importing from index.js
```

### Modify 5: Test module side effects
**Description:** Test that importing a module triggers expected side effects.
```javascript
// Test that importing polyfill.js adds Array method
```

### Modify 6: Test dynamic import
**Description:** Write integration test for dynamic import().
```javascript
it("dynamically loads module", async function() {
  // Test dynamic import
});
```

### Modify 7: Test module error handling
**Description:** Test that error in submodule is caught correctly.
```javascript
// Test that parent module handles child module error
```

### Modify 8: Create integration test for data flow
**Description:** Test data flows correctly from module A through B to C.
```javascript
// Test data pipeline through three modules
```

### Modify 9: Add server startup for integration
**Description:** Create beforeAll that starts test server.
```javascript
describe("API Integration", function() {
  // Add server start/stop
});
```

### Modify 10: Test module state isolation
**Description:** Test that importing module twice returns same instance.
```javascript
// ES modules are singleton, test that state is shared
```

### Modify 11: Create integration test with database
**Description:** Set up test database and test module interaction.
```javascript
// Test module with real test database
```

### Modify 12: Use testcontainers for services
**Description:** Start Redis/Postgres in container for integration test.
```javascript
// Use testcontainers for integration
```

### Modify 13: Test cross-module event flow
**Description:** Module A emits event that Module B handles.
```javascript
// Test event flow between modules
```

### Modify 14: Test module configuration
**Description:** Test module with custom configuration.
```javascript
// Test configModule with different settings
```

### Modify 15: Create integration test for async init
**Description:** Test that modules initialize in correct order.
```javascript
// Test async module initialization order
```

### Modify 16: Test module export shape
**Description:** Verify module exports have expected types.
```javascript
it("exports expected API", function() {
  // Check module exports
});
```

### Modify 17: Create integration test for middleware chain
**Description:** Test that request passes through middleware modules.
```javascript
// Test middleware pipeline
```

### Modify 18: Test module with network request
**Description:** Create controlled test server for network integration.
```javascript
// Test module HTTP integration
```

### Modify 19: Test module caching behavior
**Description:** Test that module caches results across calls.
```javascript
// Test module caching
```

### Modify 20: Create environment-specific test
**Description:** Test module behavior in different environments.
```javascript
// Test with NODE_ENV=production vs development
```

### Modify 21: Test module import with query params
**Description:** Test import assertions and query parameters.
```javascript
// Test import with query params
```

### Modify 22: Create parallel module test
**Description:** Test that modules can load in parallel.
```javascript
// Test parallel module loading
```

### Modify 23: Test module cleanup
**Description:** Test that module cleans up resources on unload.
```javascript
// Test module destroy/cleanup
```

### Modify 24: Create integration test for plugin system
**Description:** Test plugins registered with module system.
```javascript
// Test plugin integration with core
```

### Modify 25: Test circular dependency detection
**Description:** Test that circular imports are detected.
```javascript
// Test circular dependency handling
```

### Modify 26: Create benchmark for module loading
**Description:** Measure module load time in integration test.
```javascript
// Measure and assert module load time
```

### Modify 27: Test module with worker threads
**Description:** Test module in worker thread context.
```javascript
// Test module in Worker
```

### Modify 28: Create cross-platform module test
**Description:** Test module works in both Node and browser.
```javascript
// Test platform compatibility
```

### Modify 29: Test module with import maps
**Description:** Test module resolution via import map.
```javascript
// Test import map resolution
```

### Modify 30: Create integration test for Module Federation
**Description:** Test Webpack Module Federation integration.
```javascript
// Test remote module loading
```

### Modify 31: Test module with service worker
**Description:** Test module behavior in Service Worker scope.
```javascript
// Test module in SW
```

### Modify 32: Create test for module hot reload
**Description:** Test module state after HMR update.
```javascript
// Test hot module replacement
```

### Modify 33: Test module with different entry points
**Description:** Test package.json exports field entries.
```javascript
// Test different module entry points
```

### Modify 34: Create integration test for authentication module
**Description:** Test auth module with API module.
```javascript
// Test auth + API integration
```

### Modify 35: Test module conditional exports
**Description:** Test module with conditional export for node/browser.
```javascript
// Test conditional exports
```

### Modify 36: Create test for module feature detection
**Description:** Test that module detects browser features correctly.
```javascript
// Test feature detection
```

### Modify 37: Test module with performance observer
**Description:** Test module using Performance API.
```javascript
// Test performance integration
```

### Modify 38: Create integration test for error recovery
**Description:** Test module recovers after error state.
```javascript
// Test error recovery
```

### Modify 39: Test module with custom resolver
**Description:** Test module loaded via custom resolution logic.
```javascript
// Test custom module resolver
```

### Modify 40: Create end-to-end module test
**Description:** Full flow from entry point through all modules.
```javascript
// Complete end-to-end module integration
```

### Modify 41: Test module Idempotency
**Description:** Test that running module multiple times gives same result.
```javascript
// Test idempotent module behavior
```

### Modify 42: Create test for module versioning
**Description:** Test that module API version is correct.
```javascript
// Test module version
```

### Modify 43: Test module with external script loading
**Description:** Test that module works with external CDN scripts.
```javascript
// Test CDN script integration
```

### Modify 44: Create integration test for loader
**Description:** Test custom module loader implementation.
```javascript
// Test module loader
```

### Modify 45: Test module with Symbol polyfill
**Description:** Test module with Symbol polyfill integration.
```javascript
// Test polyfill integration
```

### Modify 46: Create test for module interop
**Description:** Test CommonJS and ES module interop.
```javascript
// Test CJS/ESM interop
```

### Modify 47: Test module in sandboxed iframe
**Description:** Test module runs correctly in iframe.
```javascript
// Test iframe module integration
```

### Modify 48: Create test for module streaming
**Description:** Test streaming module interaction.
```javascript
// Test stream integration
```

### Modify 49: Test module with WebSocket
**Description:** Test module that uses WebSocket connection.
```javascript
// Test WebSocket integration
```

### Modify 50: Create comprehensive module integration suite
**Description:** Full integration test suite for all modules.
```javascript
// Complete integration test suite
```
