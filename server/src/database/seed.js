import bcrypt from "bcryptjs";

import Account from "../models/account.js";
import TransactionCategory from "../models/transactionCategory.js";
import User from "../models/user.js";
import * as seedData from "./seedData.js";
import Transaction from "../models/transaction.js";

const seed = async () => {
  const user = await User.findOne({ username: seedData.user.username });
  if (user) {
    console.log("User already exists");
    return;
  }

  const passwordHash = await bcrypt.hash(seedData.user.password, 10);
  delete seedData.user.password;
  const newUser = await User.create({
    ...seedData.user,
    passwordHash,
  });

  const newAccount = await Account.create({
    ...seedData.account,
    owner: newUser._id,
    users: [newUser._id],
  });

  const categoriesWithUser = seedData.transactionCategories.map((category) => ({
    ...category,
    user: newUser._id,
  }));

  const transactionCategories = await TransactionCategory.insertMany(
    categoriesWithUser
  );
  const categoriesMap = new Map(
    transactionCategories.map((category) => [category.name, category._id])
  );

  categoriesMap.forEach((value, key) => {
    console.log(key, " ", categoriesMap.get(key));
  });

  const transactions = seedData.transactions.map((transaction) => ({
    ...transaction,
    user: newUser._id,
    account: newAccount._id,
    category: categoriesMap.get(transaction.category),
  }));

  await Transaction.insertMany(transactions);
};

export default seed;
