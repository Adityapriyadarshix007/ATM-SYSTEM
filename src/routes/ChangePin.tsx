import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useATM } from "@/context/ATMContext";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ChangePin() {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { changePin } = useATM();
  const navigate = useNavigate();

  const handleChangePin = () => {
    if (!oldPin || !newPin || !confirmPin) {
      toast({
        title: "All Fields Required",
        description: "Please fill in all PIN fields",
        variant: "destructive",
      });
      return;
    }

    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      toast({
        title: "Invalid PIN",
        description: "New PIN must be 4 digits",
        variant: "destructive",
      });
      return;
    }

    if (newPin !== confirmPin) {
      toast({
        title: "PINs Don't Match",
        description: "New PIN and confirmation don't match",
        variant: "destructive",
      });
      return;
    }

    if (oldPin === newPin) {
      toast({
        title: "Same PIN",
        description: "New PIN must be different from old PIN",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const success = changePin(oldPin, newPin);
      setIsProcessing(false);
      
      if (success) {
        navigate("/dashboard");
      }
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Change PIN</h1>
          <p className="text-muted-foreground">
            Update your ATM PIN for enhanced security
          </p>
        </div>

        <Card>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="oldPin" className="text-sm font-semibold">
                Current PIN
              </Label>
              <Input
                id="oldPin"
                type="password"
                placeholder="Enter current PIN"
                value={oldPin}
                onChange={(e) => setOldPin(e.target.value)}
                maxLength={4}
                className="h-12 text-lg text-center border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPin" className="text-sm font-semibold">
                New PIN
              </Label>
              <Input
                id="newPin"
                type="password"
                placeholder="Enter new 4-digit PIN"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                maxLength={4}
                className="h-12 text-lg text-center border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPin" className="text-sm font-semibold">
                Confirm New PIN
              </Label>
              <Input
                id="confirmPin"
                type="password"
                placeholder="Re-enter new PIN"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                maxLength={4}
                className="h-12 text-lg text-center border-primary/30 focus:border-primary"
              />
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-orange-800">
                <p className="font-semibold mb-1">Security Tips:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Choose a PIN that's difficult to guess</li>
                  <li>Don't use sequential numbers (e.g., 1234)</li>
                  <li>Never share your PIN with anyone</li>
                  <li>Memorize your PIN, don't write it down</li>
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
                onClick={handleChangePin}
                disabled={isProcessing}
                className="flex-1 h-12 atm-button bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
              >
                {isProcessing ? (
                  "Updating..."
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Change PIN
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
