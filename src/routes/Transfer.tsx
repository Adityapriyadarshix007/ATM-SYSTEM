import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useATM } from "@/context/ATMContext";
import { AccountService } from "@/services/accountService";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/helpers";
import { ArrowLeftRight, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Transfer() {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentUser, updateBalance, addTransaction } = useATM();
  const navigate = useNavigate();

  const handleTransfer = async () => {
    const transferAmount = Number(amount);

    if (!toAccount) {
      toast({
        title: "Account Required",
        description: "Please enter recipient account number",
        variant: "destructive",
      });
      return;
    }

    if (!transferAmount || transferAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (!currentUser || transferAmount > currentUser.balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance",
        variant: "destructive",
      });
      return;
    }

    if (toAccount === currentUser.accountNumber) {
      toast({
        title: "Invalid Transfer",
        description: "Cannot transfer to the same account",
        variant: "destructive",
      });
      return;
    }

    // Check if recipient exists
    const recipient = AccountService.findUserByAccountNumber(toAccount);
    if (!recipient) {
      toast({
        title: "Account Not Found",
        description: "Recipient account number does not exist",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      // Update sender balance
      updateBalance(-transferAmount);
      
      // Update recipient balance
      AccountService.updateUser(recipient.id, {
        balance: recipient.balance + transferAmount,
      });

      addTransaction({
        type: "transfer",
        amount: transferAmount,
        toAccount: toAccount,
      });

      toast({
        title: "Transfer Successful",
        description: `₹${transferAmount} transferred to ${recipient.name}`,
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
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
            <ArrowLeftRight className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Transfer Money</h1>
          <p className="text-muted-foreground">
            Available Balance: <span className="font-bold text-primary">{formatCurrency(currentUser.balance)}</span>
          </p>
        </div>

        <Card>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="toAccount" className="text-sm font-semibold">
                To Account Number
              </Label>
              <Input
                id="toAccount"
                type="text"
                placeholder="Enter recipient account number"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                className="h-12 text-lg border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-semibold">
                Amount to Transfer
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-14 text-2xl text-center border-primary/30 focus:border-primary"
                min="0"
              />
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Important:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Verify recipient account number before transfer</li>
                  <li>Transaction cannot be reversed once completed</li>
                  <li>Maximum transfer limit: ₹1,00,000 per transaction</li>
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
                onClick={handleTransfer}
                disabled={isProcessing}
                className="flex-1 h-12 atm-button bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <ArrowLeftRight className="w-5 h-5 mr-2" />
                    Transfer
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
