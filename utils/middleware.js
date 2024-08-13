const jwt = require("jsonwebtoken");
const logger = require("./logger");

const requestLogger = (req, _res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("-----");
  next();
};

const tokenExtractor = (req, _res, next) => {
  const authorization = req.get("authorization");
  if (authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  }

  next();
};

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken) {
    res.status(401).json({
      error: "token expired or invalid",
    });
  }

  next();
};

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _req, _res, next) => {
  logger.error(error.message);

  next(error);
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
