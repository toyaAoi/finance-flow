import { create } from "zustand";

import type { Transaction } from "@/stores/transactionStore.ts";

type ExpenseCategory = {
	[category: string]: { color: string; amount: number };
};

export type TransactionCategory = {
	name: string;
	color: string;
};

type Account = {
	id: string;
	name: string;
	balance: number;
	transactionCategories: TransactionCategory[];
	expenseThisMonth: number;
	incomeThisMonth: number;
	recentTransactions: Transaction[];
	expenseThisMonthByCategory: ExpenseCategory;
	transactionsThisMonthByDay: { incomes: number[]; expenses: number[] };
};

interface AccountState {
	account: Account;
	setAccount: (account: Account) => void;
	addTransaction: (data: Transaction) => void;
	addNewCategory: (data: TransactionCategory) => void;
	updateAccount: (account: Account) => void;
}

const useAccountStore = create<AccountState>((set) => ({
	account: {
		id: "",
		name: "",
		balance: 0,
		transactionCategories: [],
		expenseThisMonth: 0,
		incomeThisMonth: 0,
		recentTransactions: [],
		expenseThisMonthByCategory: {},
		transactionsThisMonthByDay: {
			incomes: Array(31).fill(null),
			expenses: Array(31).fill(null),
		},
	},
	setAccount: (account: Account) => set({ account }),
	addTransaction: (data: Transaction) =>
		set((state) => {
			const today = new Date().getDate() - 1;

			// Create a new array of recent transactions
			const newRecentTransactions = [
				...state.account.recentTransactions,
				data,
			].slice(-5);

			// Update balance, income, and expenses
			const isIncome = data.type === "income";
			const newBalance = isIncome
				? state.account.balance + data.amount
				: state.account.balance - data.amount;
			const newIncomeThisMonth = isIncome
				? state.account.incomeThisMonth + data.amount
				: state.account.incomeThisMonth;
			const newExpenseThisMonth = !isIncome
				? state.account.expenseThisMonth + data.amount
				: state.account.expenseThisMonth;

			// Update transactions for the day
			const newTransactionsThisMonthByDay = {
				incomes: [...state.account.transactionsThisMonthByDay.incomes],
				expenses: [...state.account.transactionsThisMonthByDay.expenses],
			};
			if (isIncome) {
				newTransactionsThisMonthByDay.incomes[today] += data.amount;
			} else {
				newTransactionsThisMonthByDay.expenses[today] += data.amount;
			}

			// Update expenseLastMonthByCategory
			const newExpenseThisMonthByCategory = {
				...state.account.expenseThisMonthByCategory,
				[data.category.name]: {
					color: data.category.color,
					amount:
						(state.account.expenseThisMonthByCategory[data.category.name]
							?.amount || 0) + (isIncome ? 0 : data.amount),
				},
			};

			// Create the new account object
			const newAccount = {
				...state.account,
				recentTransactions: newRecentTransactions,
				balance: newBalance,
				incomeThisMonth: newIncomeThisMonth,
				expenseThisMonth: newExpenseThisMonth,
				transactionsThisMonthByDay: newTransactionsThisMonthByDay,
				expenseThisMonthByCategory: newExpenseThisMonthByCategory,
			};

			return { account: newAccount };
		}),
	addNewCategory: (data: TransactionCategory) =>
		set((state) => {
			const { account } = state;
			const { transactionCategories, expenseThisMonthByCategory } = account;

			const newCategory = { ...data };

			const updatedExpenseByCategory = {
				...expenseThisMonthByCategory,
				[newCategory.name]: {
					color: newCategory.color,
					amount: 0,
				},
			};

			return {
				account: {
					...account,
					transactionCategories: [...transactionCategories, newCategory],
					expenseThisMonthByCategory: updatedExpenseByCategory,
				},
			};
		}),

	updateAccount: (account: Account) => set({ account }),
}));

export default useAccountStore;
