import mongoose from "mongoose";
import { validateInput } from "../utils/validateInput.utils.js";
import User from "../models/user.js";
import TransactionCategory from "../models/transactionCategory.js";
import Account from "../models/account.js";

export const transactionCategoryCreate = async (req, res) => {
  const data = req.body;
  validateInput(Object.keys(data), ["name", "color"]);

  const account = await Account.findById(req.params.id);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newTransactionCategory = new TransactionCategory({
      name: data.name,
      color: data.color,
    });
    account.transactionCategories.push(newTransactionCategory._id);

    await Promise.all[
      (newTransactionCategory.save({ session }), account.save({ session }))
    ];

    res.status(201).end();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const transactionCategoryEdit = async (req, res) => {
  const transactionCategory = await TransactionCategory.findById(req.params.id);

  ////////////////////////////////////////////////////
  // Existence check
  if (!transactionCategory) {
    return res.status(404).json({ error: "Transaction category not found" });
  }

  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const account = await Account.findById(req.params.accountId);
  if (!account) {
    return res.status(404).json({ error: "Account not found" });
  }
  ////////////////////////////////////////////////////

  const updateData = req.body;

  transactionCategory.name = updateData.name
    ? updateData.name
    : transactionCategory.name;
  transactionCategory.color = updateData.color
    ? updateData.color
    : transactionCategory.color;

  await transactionCategory.save();
};
