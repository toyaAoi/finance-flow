const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

module.exports = userRouter;
