const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  console.log("GET /api/users");
  const users = await User.find({});
  return res.json(users);
});

usersRouter.post("/", async (req, res, _next) => {
  const { username, name, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "username or password missing",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: "password must be at least 6 characters long",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });
  await user.save();

  res.status(201).json("user created");
});

module.exports = usersRouter;
