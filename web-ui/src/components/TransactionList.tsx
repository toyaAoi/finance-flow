import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAccountStore from "@/stores/accountStore";
import type { Transaction } from "@/stores/transactionStore";

export function TransactionList({ data }: { data?: Transaction[] }) {
  const {
    account: { recentTransactions },
  } = useAccountStore();

  const transactions = data || recentTransactions;

  if (!transactions) {
    return null;  }

  return (
    <Card className='col-start-1 col-span-2 row-span-3'>
      <CardHeader className="pt-6 pb-3">
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-3rem)] overflow-y-scroll">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="space-y-1">
        <p className="font-medium">{transaction.notes}</p>
        <p className="text-sm text-muted-foreground">
          {transaction.category.name}
        </p>
      </div>
      <p className={transaction.type === "income" ? "text-primary-foreground" : "text-accent"}>
        {transaction.type === "income" ? "+" : "-"}${transaction.amount}
      </p>
    </div>
  );
};

