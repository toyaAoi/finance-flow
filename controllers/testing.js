const router = require("express").Router();
const { User, Transactions } = require("../models");

router.post("/reset", async (req, res) => {
  await User.deleteMany({});
  await Transactions.deleteMany({});
  res.status(204).end();
});
