import { Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
}) => {
  const getIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="w-5 h-5 text-success" />;
      case "withdraw":
        return <ArrowUpRight className="w-5 h-5 text-destructive" />;
      case "transfer":
        return <ArrowLeftRight className="w-5 h-5 text-accent" />;
    }
  };

  const getTypeColor = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return "text-success";
      case "withdraw":
        return "text-destructive";
      case "transfer":
        return "text-accent";
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No transactions yet</p>
        <p className="text-sm mt-2">Your transaction history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="transaction-item flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
              {getIcon(transaction.type)}
            </div>
            <div>
              <p className="font-semibold capitalize text-foreground">
                {transaction.type}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(transaction.date)}
              </p>
              {transaction.toAccount && (
                <p className="text-xs text-muted-foreground">
                  To: {transaction.toAccount}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${getTypeColor(transaction.type)}`}>
              {transaction.type === "deposit" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </p>
            <p className="text-xs text-muted-foreground">
              Balance: {formatCurrency(transaction.balance)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
