import express from "express";
const app = express();
import "express-async-errors";
import cors from "cors";
import mongoose from "mongoose";
import * as middleware from "./utils/middleware.utils.js";
import usersRouter from "./routes/user.router.js";
import transactionsRouter from "./routes/transaction.router.js";
import accountsRouter from "./routes/account.router.js";
import resetRouter from "./routes/reset.router.js";
import config from "./config/config.js";

mongoose.set("strictQuery", false);

// TODO: Configure CORS
app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/user", usersRouter);
app.use("/api/account", accountsRouter);
app.use("/api/transaction", middleware.authenticateToken, transactionsRouter);

if (config.NODE_ENV === "test") {
  app.use("/api/reset", resetRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
