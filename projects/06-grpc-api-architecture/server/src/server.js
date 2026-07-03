const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { getDb } = require("./db");
const authService = require("./services/auth");
const bookstoreService = require("./services/bookstore");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const PORT = process.env.PORT || "50051";
const PROTO_PATH = path.join(__dirname, "..", "protos", "bookstore.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDef);

const server = new grpc.Server();

server.addService(proto.bookstore.Auth.service, authService(server));
server.addService(proto.bookstore.Bookstore.service, bookstoreService());
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  async (err, port) => {
    if (err) {
      console.error(`Server failed: ${err.message}`);
      process.exit(1);
    }
    await getDb();
    console.log(`gRPC server S${PORT === "50051" ? 1 : PORT === "50052" ? 2 : 3} running on port ${port}`);
  }
);
