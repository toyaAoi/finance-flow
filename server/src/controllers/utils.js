import Transaction from "../models/transaction.js";
import TransactionCategory from "../models/transactionCategory.js";

export async function filterTransactions({
  accountId,
  type,
  category,
  startDate,
  endDate,
  page = 1,
  limit = 10,
}) {
  const query = {};

  if (accountId) query.account = accountId;
  if (type) query.type = type;
  if (category) query.category = category;
  if (startDate || endDate) {
    query.time = {};
    if (startDate) {
      query.time.$gte = startDate;
    }
    if (endDate) {
      query.time.$lte = endDate;
    }
  }
  const skip = (page - 1) * limit;

  const transactions = await Transaction.find(query)
    .populate({ path: "user", select: "username" })
    .populate({ path: "account", select: "name" })
    .populate({ path: "category", select: "name color" })
    .skip(skip)
    .limit(limit);

  const totalCount = await Transaction.countDocuments(query);

  return {
    transactions,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
}

async function getTransactionsThisMonth(accountId, type) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const transactionsThisMonth = await filterTransactions({
    accountId,
    startDate: startOfMonth,
    endDate: endOfMonth,
    type: type,
    limit: 10000,
  });

  return transactionsThisMonth.transactions;
}

export async function getIncomeThisMonth(accountId) {
  const transactions = await getTransactionsThisMonth(accountId, "income");
  return transactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
}

export async function getExpenseThisMonth(accountId) {
  const transactions = await getTransactionsThisMonth(accountId, "expense");
  return transactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
}

export async function getExpenseThisMonthByCategory(accountId) {
  const transactions = await getTransactionsThisMonth(accountId, "expense");
  const categories = await TransactionCategory.find({ account: accountId });
  const categoriesObj = categories.reduce((acc, category) => {
    acc[category.name] = { color: category.color, amount: 0 };
    return acc;
  }, {});

  return transactions.reduce((acc, transaction) => {
    const category = transaction.category.name || "Uncategorized";

    if (acc[category]) {
      acc[category].amount += transaction.amount;
    } else {
      acc[category] = { color: category.color, amount: transaction.amount };
    }
    return acc;
  }, categoriesObj);
}

export async function getTransactionsThisMonthByDay(accountId) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const totalDays = endOfMonth.getDate();

  const transactionsByDay = {
    incomes: new Array(totalDays).fill(0),
    expenses: new Array(totalDays).fill(0),
  };

  const { transactions } = await filterTransactions({
    accountId,
    startDate: startOfMonth,
    endDate: endOfMonth,
    limit: 10000,
  });

  for (let transaction of transactions) {
    const day = transaction.time.getDate() - 1;
    if (transaction.type === "income") {
      transactionsByDay.incomes[day] += transaction.amount;
    } else {
      transactionsByDay.expenses[day] += transaction.amount;
    }
  }

  return transactionsByDay;
}
