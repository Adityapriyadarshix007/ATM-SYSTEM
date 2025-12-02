import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Transaction, ATMContextType } from "@/types";
import { AccountService } from "@/services/accountService";
import { toast } from "@/hooks/use-toast";

const ATMContext = createContext<ATMContextType | undefined>(undefined);

export const ATMProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Check for existing session
    const sessionUser = sessionStorage.getItem("atm_current_user");
    if (sessionUser) {
      const user = JSON.parse(sessionUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      loadTransactions(user.id);
    }
  }, []);

  const loadTransactions = (userId: string) => {
    const userTransactions = AccountService.getUserTransactions(userId);
    setTransactions(userTransactions);
  };

  const login = (accountNumber: string, pin: string): boolean => {
    const user = AccountService.findUser(accountNumber, pin);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      sessionStorage.setItem("atm_current_user", JSON.stringify(user));
      loadTransactions(user.id);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    }
    toast({
      title: "Login Failed",
      description: "Invalid account number or PIN",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setTransactions([]);
    sessionStorage.removeItem("atm_current_user");
    toast({
      title: "Logged Out",
      description: "Thank you for using our ATM",
    });
  };

  const updateBalance = (amount: number) => {
    if (currentUser) {
      const newBalance = currentUser.balance + amount;
      const updatedUser = { ...currentUser, balance: newBalance };
      setCurrentUser(updatedUser);
      AccountService.updateUser(currentUser.id, { balance: newBalance });
      sessionStorage.setItem("atm_current_user", JSON.stringify(updatedUser));
    }
  };

  const changePin = (oldPin: string, newPin: string): boolean => {
    if (currentUser && currentUser.pin === oldPin) {
      const updatedUser = { ...currentUser, pin: newPin };
      setCurrentUser(updatedUser);
      AccountService.updateUser(currentUser.id, { pin: newPin });
      sessionStorage.setItem("atm_current_user", JSON.stringify(updatedUser));
      toast({
        title: "PIN Changed",
        description: "Your PIN has been updated successfully",
      });
      return true;
    }
    toast({
      title: "PIN Change Failed",
      description: "Current PIN is incorrect",
      variant: "destructive",
    });
    return false;
  };

  const addTransaction = (
    transaction: Omit<Transaction, "id" | "date" | "balance">
  ) => {
    if (currentUser) {
      const fullTransaction = {
        ...transaction,
        balance: currentUser.balance,
      };
      
      AccountService.addTransaction(currentUser.id, fullTransaction);
      
      const newTransaction: Transaction = {
        ...fullTransaction,
        id: `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`,
        date: new Date().toISOString(),
        fromAccount: currentUser.id,
      };
      
      setTransactions((prev) => [newTransaction, ...prev]);
    }
  };

  return (
    <ATMContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        updateBalance,
        changePin,
        transactions,
        addTransaction,
      }}
    >
      {children}
    </ATMContext.Provider>
  );
};

export const useATM = () => {
  const context = useContext(ATMContext);
  if (context === undefined) {
    throw new Error("useATM must be used within an ATMProvider");
  }
  return context;
};
