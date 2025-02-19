import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { TransactionCategory } from "./accountStore";

type FormDialog = "transactionForm" | "transactionCategoryForm";

export type TransactionForm = {
	active: boolean;
	data: {
		type: "income" | "expense";
		amount: number;
		category: string;
		time: string;
		notes?: string;
	};
};

type TransactionCategoryForm = { active: boolean; data: TransactionCategory };

type FormData = {
	transactionForm: TransactionForm;
	transactionCategoryForm: TransactionCategoryForm;
};

const forms: FormData = {
	transactionForm: { active: false, data: {} as TransactionForm["data"] },
	transactionCategoryForm: {
		active: false,
		data: {} as TransactionCategoryForm["data"],
	},
};

interface FormStore {
	forms: FormData;
	openForm: (name: FormDialog) => void;
	closeForm: (name: FormDialog) => void;
	setFormData: (
		name: FormDialog,
		data: Partial<FormData[FormDialog]["data"]>,
	) => void;
	clearFormData: (name: FormDialog) => void;
}

const useFormStore = create<FormStore>()(
	immer((set) => ({
		forms,
		openForm: (name) =>
			set((state) => {
				state.forms[name].active = true;
			}),
		closeForm: (name) =>
			set((state) => {
				state.forms[name].active = false;
			}),
		setFormData: (name, data) =>
			set((state) => {
				state.forms[name].data = { ...state.forms[name].data, ...data };
			}),
		clearFormData: (name) =>
			set((state) => {
				state.forms[name].data = {} as FormData[typeof name]["data"];
			}),
	})),
);

export default useFormStore;
