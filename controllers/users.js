// const bcrypt = require("bcrypt");
const userRouter = require("express").Router();

userRouter.get("/", (req, res) => {
  res.send("Hello World");
});
