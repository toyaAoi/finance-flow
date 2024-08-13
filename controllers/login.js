const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res, _next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const validUsernamePassword = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!validUsernamePassword) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  // const userForToken = {
  //   // username: user.username, // * Do I really need this?
  //   id: user._id,
  // };
  const userForToken = {
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({
    name: user.name,
    username: user.name,
    token,
  });
});

module.exports = loginRouter;
