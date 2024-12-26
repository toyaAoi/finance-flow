import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const SESSION_SECRET = process.env.SESSION_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
if (!SESSION_SECRET || !ACCESS_TOKEN_SECRET) {
  console.error("SESSION_SECRET or ACCESS_TOKEN_SECRET is not defined");
  process.exit(1);
}
const MONGODB_URI =
  NODE_ENV === "test" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

export default {
  PORT,
  NODE_ENV,
  SESSION_SECRET,
  ACCESS_TOKEN_SECRET,
  MONGODB_URI,
};
