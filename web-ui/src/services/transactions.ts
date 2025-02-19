import { handleError } from "./error";
import authService from "./auth";

type TransactionData = {
  accountId: string
  type: "income" | "expense";
  amount: number;
  category: string;
  time: string;
  notes?: string;
};

async function create(data: TransactionData) {
  const token = localStorage.getItem(authService.TOKEN_KEY);
  const response = await fetch("api/transaction", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const error = await handleError(response);
  if (error) throw error;

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

export default { create };
