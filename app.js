const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const config = require("./utils/config");
const userRouter = require("./controllers/users");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

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
app.use(express.json);

app.use(middleware.requestLogger);

app.use("/api/users", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
