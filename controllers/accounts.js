const accountsRouter = require("express").Router();
const middleware = require("../utils/middleware");

const User = require("../models/user");
const Account = require("../models/account");

accountsRouter.post("/", middleware.authenticateToken, async (req, res) => {
  const user = await User.findById(req.userId);

  const { name, balance } = req.body;

  const newAccount = new Account({
    name,
    balance,
    users: [user._id],
  });
  const savedAccount = await newAccount.save();
  user.accounts.push(savedAccount._id);
  await user.save();

  res.status(201).json(savedAccount);
});

module.exports = accountsRouter;
