export interface User {
  id: string;
  accountNumber: string;
  name: string;
  pin: string;
  balance: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer';
  amount: number;
  date: string;
  toAccount?: string;
  fromAccount?: string;
  balance: number;
}

export interface ATMContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (accountNumber: string, pin: string) => boolean;
  logout: () => void;
  updateBalance: (amount: number) => void;
  changePin: (oldPin: string, newPin: string) => boolean;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'balance'>) => void;
}
