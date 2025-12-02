import { User, Transaction } from "@/types";
import { initialUsers } from "@/data/users";

const STORAGE_KEY_USERS = "atm_users";
const STORAGE_KEY_TRANSACTIONS = "atm_transactions";

export class AccountService {
  static getUsers(): User[] {
    const stored = localStorage.getItem(STORAGE_KEY_USERS);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default users
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(initialUsers));
    return initialUsers;
  }

  static saveUsers(users: User[]): void {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }

  static findUser(accountNumber: string, pin: string): User | null {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.accountNumber === accountNumber && u.pin === pin
    );
    return user || null;
  }

  static updateUser(userId: string, updates: Partial<User>): void {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      this.saveUsers(users);
    }
  }

  static getUserTransactions(userId: string): Transaction[] {
    const stored = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
    if (!stored) return [];
    
    const allTransactions: Transaction[] = JSON.parse(stored);
    return allTransactions.filter(
      (t) => t.fromAccount === userId || t.toAccount === userId
    );
  }

  static addTransaction(userId: string, transaction: Omit<Transaction, 'id' | 'date'>): void {
    const stored = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
    const transactions: Transaction[] = stored ? JSON.parse(stored) : [];
    
    const newTransaction: Transaction = {
      ...transaction,
      id: `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString(),
      fromAccount: userId,
    };
    
    transactions.unshift(newTransaction);
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
  }

  static getUserById(userId: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.id === userId) || null;
  }

  static findUserByAccountNumber(accountNumber: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.accountNumber === accountNumber) || null;
  }
}
