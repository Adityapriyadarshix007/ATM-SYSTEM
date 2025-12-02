import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useATM } from "@/context/ATMContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/Card";
import { Landmark, KeyRound } from "lucide-react";
import atmImage from "@/assets/atm.png";

export default function Login() {
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const { login, isAuthenticated } = useATM();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(accountNumber, pin);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Image */}
        <div className="hidden md:block animate-slide-up">
          <img
            src={atmImage}
            alt="Modern ATM Machine"
            className="rounded-2xl shadow-2xl w-full h-auto object-cover"
          />
        </div>

        {/* Right side - Login Form */}
        <Card className="animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <Landmark className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              SecureBank ATM
            </h1>
            <p className="text-muted-foreground">
              Welcome! Please enter your credentials
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-sm font-semibold">
                Account Number
              </Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
                className="h-12 text-lg border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pin" className="text-sm font-semibold">
                PIN
              </Label>
              <Input
                id="pin"
                type="password"
                placeholder="Enter 4-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                required
                className="h-12 text-lg border-primary/30 focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold atm-button bg-gradient-to-r from-primary to-primary-glow"
            >
              <KeyRound className="w-5 h-5 mr-2" />
              Login
            </Button>
          </form>

          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-xs font-semibold text-foreground mb-2">
              Demo Accounts:
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Account: 1234567890 | PIN: 1234</p>
              <p>Account: 0987654321 | PIN: 5678</p>
              <p>Account: 1111222233 | PIN: 9999</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
