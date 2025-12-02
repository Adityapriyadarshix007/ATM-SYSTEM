export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const maskAccountNumber = (accountNumber: string): string => {
  if (accountNumber.length < 4) return accountNumber;
  return "XXXX XXXX " + accountNumber.slice(-4);
};

export const generateTransactionId = (): string => {
  return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

export const validatePin = (pin: string): boolean => {
  return /^\d{4}$/.test(pin);
};

export const validateAmount = (amount: number): boolean => {
  return amount > 0 && amount % 100 === 0;
};
