import jwt from "jsonwebtoken";
import logger from "./logger.utils.js";

export const requestLogger = (req, _res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("-----");
  next();
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.id;
    next();
  });
};

export const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler = (error, _req, res, next) => {
  logger.error(error.message);
  console.log(error);

  if (error.message.includes("duplicate key error")) {
    error.message = "username already taken";
  }

  if (error.name === "CastError") {
    error.message = "malformatted id";
  }

  res.status(400).json({
    error: {
      message: error.message,
    },
  });
  next(error);
};
