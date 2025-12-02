import { useNavigate } from "react-router-dom";
import { useATM } from "@/context/ATMContext";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { TransactionList } from "@/components/TransactionList";
import { FileText, Download } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";
import { toast } from "@/hooks/use-toast";

export default function MiniStatement() {
  const { currentUser, transactions } = useATM();
  const navigate = useNavigate();

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your statement is being prepared",
    });
    // In a real app, this would generate a PDF
  };

  if (!currentUser) return null;

  const recentTransactions = transactions.slice(0, 10);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mini Statement</h1>
          <p className="text-muted-foreground">
            Last 10 transactions on your account
          </p>
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(currentUser.balance)}
              </p>
            </div>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="border-primary/30 hover:bg-primary hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4 text-foreground">Recent Transactions</h2>
          <TransactionList transactions={recentTransactions} />
        </Card>

        <div className="text-center">
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="border-primary/30"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </Layout>
  );
}
