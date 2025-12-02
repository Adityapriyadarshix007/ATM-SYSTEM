import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useATM } from "@/context/ATMContext";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/helpers";
import { ArrowUpRight, Wallet, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentUser, updateBalance, addTransaction } = useATM();
  const navigate = useNavigate();

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const handleWithdraw = async () => {
    const withdrawAmount = Number(amount);

    if (!withdrawAmount || withdrawAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (withdrawAmount % 100 !== 0) {
      toast({
        title: "Invalid Amount",
        description: "Amount must be in multiples of ₹100",
        variant: "destructive",
      });
      return;
    }

    if (!currentUser || withdrawAmount > currentUser.balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      updateBalance(-withdrawAmount);
      addTransaction({
        type: "withdraw",
        amount: withdrawAmount,
      });

      toast({
        title: "Withdrawal Successful",
        description: `₹${withdrawAmount} withdrawn successfully`,
      });

      setIsProcessing(false);
      navigate("/dashboard");
    }, 1500);
  };

  if (!currentUser) return null;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
            <ArrowUpRight className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Withdraw Money</h1>
          <p className="text-muted-foreground">
            Available Balance: <span className="font-bold text-primary">{formatCurrency(currentUser.balance)}</span>
          </p>
        </div>

        <Card>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-semibold">
                Enter Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount to withdraw"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-14 text-2xl text-center border-primary/30 focus:border-primary"
                min="0"
                step="100"
              />
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 text-foreground">Quick Select</p>
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="h-12 border-primary/30 hover:bg-primary hover:text-white transition-all"
                  >
                    ₹{quickAmount}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-1">Note:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Amount must be in multiples of ₹100</li>
                  <li>Maximum withdrawal limit: ₹50,000 per transaction</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button
                onClick={handleWithdraw}
                disabled={isProcessing}
                className="flex-1 h-12 atm-button bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Withdraw
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
