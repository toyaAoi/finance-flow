const jwt = require("jsonwebtoken");
const logger = require("./logger");

const requestLogger = (req, _res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("-----");
  next();
};

// const tokenExtractor = (req, _res, next) => {
//   const authorization = req.get("authorization");
//   if (authorization.startsWith("Bearer ")) {
//     req.token = authorization.split(" ")[1];
//   }

//   next();
// };

// const userExtractor = (req, res, next) => {
//   const decodedToken = jwt.verify(req.token, process.env.SECRET);
//   if (!decodedToken) {
//     res.status(403).json({
//       error: "token expired or invalid",
//     });
//   }

//   req.body.userId = decodedToken.id;

//   next();
// };

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.id;
    next();
  });
};

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _req, res, next) => {
  logger.error(error.message);

  res.status(400).json({ error: error.message });
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  authenticateToken,
  errorHandler,
};
