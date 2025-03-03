import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import Account from "../models/account.js";
import TransactionCategory from "../models/transactionCategory.js";
import { validateInput } from "../utils/validateInput.utils.js";
import mongoose from "mongoose";

export const transactionFetchAll = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const transactions = await Transaction.find({ user: user._id });
  res.json(transactions);
};

export const transactionFetchOne = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found" });
  }
  if (transaction.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json(transaction);
};

export const transactionCreate = async (req, res) => {
  validateInput(Object.keys(req.body), [
    "type",
    "amount",
    "accountId",
    "category",
  ]);
  const data = req.body;
  const user = await User.findById(req.userId);
  const account = await Account.findById(data.accountId);

  let category = await TransactionCategory.findOne({
    name: data.categroy.name,
    account,
  });
  if (!category) {
    category = await TransactionCategory.create({
      name: category.name,
      color: category.color,
      account,
    });
  }

  if (!user || !account) {
    return res.status(404).json({ error: "User or account not found" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const transaction = new Transaction({
      type: data.type,
      amount: data.amount,
      category,
      notes: data.notes ? data.notes : null,
      user: user._id,
      account: account._id,
    });
    account.transactions.push(transaction._id);
    account.balance =
      data.type === "income"
        ? account.balance + data.amount
        : account.balance - data.amount;

    const savedTransaction = await transaction.save({ session });
    await Promise.all([user.save({ session }), account.save({ session })]);
    await session.commitTransaction();

    res.status(201).json(savedTransaction);
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const transactionDelete = async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findById(id).lean();
  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  const transactionUser = await User.findById(transaction.user).lean();
  if (transactionUser._id.toString() !== req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Start a new session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Delete the transaction
    await Transaction.findByIdAndDelete(id, { session });

    // Update the account balance based on transaction type
    const balanceUpdate =
      transaction.type === "income"
        ? { $inc: { balance: -transaction.amount } }
        : { $inc: { balance: transaction.amount } };

    await Account.findByIdAndUpdate(transaction.account, balanceUpdate, {
      session,
    });

    // Remove transaction ID from the account's transactions array
    await Account.findByIdAndUpdate(
      transaction.account,
      { $pull: { transactions: transaction._id } },
      { session },
    );

    // Commit the transaction
    await session.commitTransaction();
    res.status(204).end();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const transactionUpdate = async (req, res) => {
  validateInput(Object.keys(req.body), ["type", "amount"]);
  const { id } = req.params;
  const updateData = req.body;

  //////////////////////////////////////////////////
  // Existence check
  const transaction = await Transaction.findById(id);
  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  const transactionUser = await User.findById(transaction.user).lean();
  if (transactionUser._id.toString() !== req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const account = await Account.findById(transaction.account);
  if (!account) {
    return res.status(404).json({ error: "Account doesn't exist." });
  }
  ////////////////////////////////////////////////////

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const amountDiff = updateData.amount - transaction.amount;
    const isIncomeUpdate = updateData.type === "income";
    const isSameType = transaction.type === updateData.type;

    if (isSameType) {
      // If the transaction type is the same
      if (isIncomeUpdate) {
        account.balance += amountDiff;
      } else {
        account.balance -= amountDiff;
      }
    } else {
      // If the transaction type is different
      if (isIncomeUpdate) {
        account.balance += amountDiff + 2 * transaction.amount;
      } else {
        account.balance -= amountDiff + 2 * transaction.amount;
      }
    }

    transaction.type = updateData.type;
    transaction.amount = updateData.amount;
    transaction.category = updateData.category;
    transaction.notes = updateData.notes ? updateData.notes : transaction.notes;

    const updatedTransaction = await transaction.save({ session });
    await account.save({ session });

    await session.commitTransaction();
    res.status(201).json(updatedTransaction);
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};
