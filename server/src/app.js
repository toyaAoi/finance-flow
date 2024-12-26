import express from "express";
const app = express();
import "express-async-errors";
import cors from "cors";
import mongoose from "mongoose";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

import * as middleware from "./utils/middleware.utils.js";
import usersRouter from "./routes/user.router.js";
import accountsRouter from "./routes/account.router.js";
import transactionsRouter from "./routes/transaction.router.js";
import transactionsCategoryRouter from "./routes/transactionCategory.router.js";
import resetRouter from "./routes/reset.router.js";
import config from "./config/config.js";
import seed from "./database/seed.js";

mongoose.set("strictQuery", false);

const corsOptions = {
  origin: "*", // TODO: Configure origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(middleware.requestLogger);
app.use(cors(corsOptions));
app.use(express.json());

////////////////////////////////////////////////////
// Swagger UI
let swaggerDocument;
try {
  swaggerDocument = YAML.parse(fs.readFileSync("./swagger.yaml", "utf8"));
} catch (err) {
  console.error("Error reading Swagger YAML file:", err);
  process.exit(1);
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
////////////////////////////////////////////////////

////////////////////////////////////////////////////
// Routes
app.use("/api/user", usersRouter);
app.use("/api/account", middleware.authenticateToken, accountsRouter);
app.use("/api/transaction", middleware.authenticateToken, transactionsRouter);
app.use(
  "/api/transaction-category",
  middleware.authenticateToken,
  transactionsCategoryRouter
);
////////////////////////////////////////////////////

seed();

if (config.NODE_ENV === "test") {
  app.use("/api/reset", resetRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
