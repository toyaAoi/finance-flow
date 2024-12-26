import { Router } from "express";
import User from "../models/user.js";
import Account from "../models/account.js";
import Transaction from "../models/transaction.js";

const router = Router();

router.post("/user", async (_req, res) => {
  await User.deleteMany({});
  res.status(204).end();
});

router.post("/account", async (_req, res) => {
  await Account.deleteMany({});
  res.status(204).end();
});

router.post("/transaction", async (_req, res) => {
  await Transaction.deleteMany({});
  res.status(204).end();
});

export default router;
