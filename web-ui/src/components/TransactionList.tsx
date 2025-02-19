import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAccountStore from "@/stores/accountStore";
import type { Transaction } from "@/stores/transactionStore";

export function TransactionList({ data }: { data?: Transaction[] }) {
  const {
    account: { recentTransactions },
  } = useAccountStore();

  if (!recentTransactions) {
    return;
  }

  const transactions = data ? data : recentTransactions;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium">{transaction.notes}</p>
                <p className="text-sm text-muted-foreground">
                  {transaction.category.name}
                </p>
              </div>
              <p
                className={
                  transaction.type === "income"
                    ? "text-primary-foreground"
                    : "text-accent"
                }
              >
                {transaction.type === "income" ? "+" : "-"}${transaction.amount}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
