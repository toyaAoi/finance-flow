import app from "./app.js";
import config from "./config/config.js";
import connectDB from "./database/connectDB.js";
import logger from "./utils/logger.utils.js";

connectDB().then(() => {
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
});
