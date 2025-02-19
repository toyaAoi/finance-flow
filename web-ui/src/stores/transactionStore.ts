type TransactionCategory = {
  id: string;
  name: string;
  color: string;
};

export type Transaction = {
  type: "income" | "expense";
  amount: number;
  category: TransactionCategory;
  time: Date;
  notes?: string;
  id: string;
  user?: {
    username: string;
    id: string;
  };
  account?: {
    name: string;
    id: string;
  };
};
