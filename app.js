const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const transactionsRouter = require("./controllers/transactions");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to mongodb");
  })
  .catch((error) => {
    logger.error("error connecting to mongodb: ", error.message);
  });

// TODO: Configure CORS origins
app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/transactions", transactionsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
