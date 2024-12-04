import mongoose from "mongoose";
import Account from "../models/account.js";
import User from "../models/user.js";
import { validateInput } from "../utils/utils.js";

const accountCreate = async (req, res) => {
  const user = await User.findById(req.userId);
  validateInput(Object.keys(req.body), ["name", "balance"]);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newAccount = new Account({
      name: req.body.name,
      balance: req.body.balance,
      owner: user._id,
      users: [user._id],
    });

    const savedAccount = await newAccount.save({ session });

    user.accounts.push(savedAccount._id);
    await user.save({ session });

    await session.commitTransaction();
    res.status(201).json(savedAccount);
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const addUser = async (req, res) => {
  validateInput(Object.keys(req.body), ["userId"]);

  const user = await User.findById(req.body.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const account = await Account.findById(req.params.id);
  if (!account) {
    return res.status(404).json({ error: "Account not found" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    account.users.push(user._id);
    await account.save({ session });

    user.accounts.push(account._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(201).json({ message: "User added to account" });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const removeUser = async (req, res) => {
  const account = await Account.findById(req.params.id);
  if (!account) {
    return res.status(404).json({ error: "Account not found" });
  }

  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    account.users.pull(user._id);
    await account.save({ session });

    user.accounts.pull(account._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(204).send();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const fetchAccountDetails = async (req, res) => {
  const account = await Account.findById(req.params.id).populate("users");

  res.json(account);
};

const fetchAccountDetailsById = async (req, res) => {
  const account = await Account.findById(req.params.id);

  res.json(account);
};

export {
  accountCreate,
  addUser,
  removeUser,
  fetchAccountDetails,
  fetchAccountDetailsById,
};
