import mongoose from "mongoose";
import { validateInput } from "../utils/validateInput.utils";
import User from "../models/user";
import TransactionCategory from "../models/transactionCategory";

export const transactionCategoryCreate = async (req, res) => {
  validateInput(Object.keys(req.body), ["name", "color"]);
  const data = req.body;
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newTransactionCategory = new TransactionCategory({
      name: data.name,
      color: data.color,
    });
    user.transactionCategories.push(newTransactionCategory._id);

    await Promise.all[
      (newTransactionCategory.save({ session }), user.save({ session }))
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

  // Authorization
  if (transactionCategory.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: "Unauthorized" });
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
