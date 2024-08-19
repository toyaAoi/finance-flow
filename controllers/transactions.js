const transactionsRouter = require("express").Router();
const Transaction = require("../models/transaction");
const User = require("../models/user");
const Account = require("../models/account");
const middleware = require("../utils/middleware");

transactionsRouter.get("/", middleware.authenticateToken, async (req, res) => {
  const user = await User.findById(req.userId);
  const transactions = await Transaction.find({ user: user._id });
  res.json(transactions);
});

transactionsRouter.post("/", middleware.authenticateToken, async (req, res) => {
  const { type, amount, notes, accountId } = req.body;
  const user = await User.findById(req.userId);
  const account = await Account.findById(accountId);

  const transaction = new Transaction({
    type,
    amount,
    notes,
    user: user._id,
    account: account._id,
  });
  user.transactions.push(transaction._id);
  account.transactions.push(transaction._id);
  account.balance =
    type === "income" ? account.balance + amount : account.balance - amount;

  await user.save();
  await account.save();
  const savedTransaction = await transaction.save();

  res.status(201).json(savedTransaction);
});

transactionsRouter.delete(
  "/:id",
  middleware.authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    console.log(transaction);
    const transactionUser = await User.findById(transaction.user);
    if (transactionUser._id.toString() !== req.userId) {
      res.status(401).json({ error: "Unauthorized" });
    }
    await Transaction.findByIdAndDelete(id);
    res.status(204).end();
    // eslint-disable-next-line prettier/prettier
  }
);

module.exports = transactionsRouter;
