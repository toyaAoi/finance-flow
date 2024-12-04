import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/user.js";
import { validateInput } from "../utils/utils.js";

export const userRegister = async (req, res, _next) => {
  validateInput(Object.keys(req.body), ["username", "name", "password"]);
  const { username, name, password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({
      error: "password must be at least 6 characters long",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });
  await user.save();

  res.status(201).json(user);
};

export const userLogin = async (req, res, _next) => {
  validateInput(Object.keys(req.body), ["username", "password"]);
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "invalid username" });
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return res.status(401).json({ error: "invalid password" });
  }

  const token = jwt.sign({ id: user._id }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "2d",
  });

  res.status(200).json({
    name: user.name,
    username: user.name,
    token,
  });
};
