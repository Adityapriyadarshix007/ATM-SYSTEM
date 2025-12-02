import { useNavigate } from "react-router-dom";
import { useATM } from "@/context/ATMContext";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/Card";
import { formatCurrency, maskAccountNumber } from "@/utils/helpers";
import {
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  FileText,
  Lock,
} from "lucide-react";

export default function Dashboard() {
  const { currentUser } = useATM();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: ArrowUpRight,
      label: "Withdraw",
      path: "/withdraw",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: ArrowDownLeft,
      label: "Deposit",
      path: "/deposit",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: ArrowLeftRight,
      label: "Transfer",
      path: "/transfer",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FileText,
      label: "Mini Statement",
      path: "/mini-statement",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Lock,
      label: "Change PIN",
      path: "/change-pin",
      color: "from-orange-500 to-amber-500",
    },
  ];

  if (!currentUser) return null;

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-primary to-secondary text-white border-none shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Total Balance</p>
              <h2 className="text-4xl font-bold mb-2">
                {formatCurrency(currentUser.balance)}
              </h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-4 border-t border-white/20">
            <CreditCard className="w-4 h-4" />
            <p className="text-sm text-white/90">
              {maskAccountNumber(currentUser.accountNumber)}
            </p>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {menuItems.map((item) => (
              <Card
                key={item.path}
                hover
                onClick={() => navigate(item.path)}
                className="text-center"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <p className="font-semibold text-foreground">{item.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Account Information
              </h4>
              <p className="text-sm text-muted-foreground">
                Account Holder: <span className="font-medium text-foreground">{currentUser.name}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Account Number: <span className="font-medium text-foreground">{currentUser.accountNumber}</span>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
