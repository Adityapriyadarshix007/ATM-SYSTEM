import { useNavigate, useLocation } from "react-router-dom";
import { useATM } from "@/context/ATMContext";
import { Button } from "@/components/ui/button";
import { LogOut, Landmark } from "lucide-react";

export const Navbar = () => {
  const { isAuthenticated, logout, currentUser } = useATM();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated || location.pathname === "/") {
    return null;
  }

  return (
    <nav className="glass-card border-b border-primary/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">SecureBank ATM</h1>
            {currentUser && (
              <p className="text-xs text-muted-foreground">
                Welcome, {currentUser.name}
              </p>
            )}
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-destructive/30 text-destructive hover:bg-destructive hover:text-white transition-all"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </nav>
  );
};
