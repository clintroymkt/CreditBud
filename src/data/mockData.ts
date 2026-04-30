export type Transaction = {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  source: 'bank' | 'mobile_money' | 'manual';
  description: string;
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2023-10-25', amount: 4500, type: 'credit', category: 'Salary', source: 'bank', description: 'Acme Corp Payroll' },
  { id: '2', date: '2023-10-26', amount: 120, type: 'debit', category: 'Utilities', source: 'mobile_money', description: 'Electricity Bill' },
  { id: '3', date: '2023-10-27', amount: 50, type: 'debit', category: 'Transport', source: 'mobile_money', description: 'Bus Fare' },
  { id: '4', date: '2023-10-28', amount: 200, type: 'debit', category: 'Groceries', source: 'bank', description: 'Supermarket' },
  { id: '5', date: '2023-10-29', amount: 300, type: 'credit', category: 'Transfer', source: 'mobile_money', description: 'From John Doe' },
  { id: '6', date: '2023-10-30', amount: 45, type: 'debit', category: 'Airtime', source: 'mobile_money', description: 'Mobile Top-up' },
  { id: '7', date: '2023-11-01', amount: 1500, type: 'debit', category: 'Rent', source: 'bank', description: 'Landlord' },
  { id: '8', date: '2023-11-03', amount: 80, type: 'debit', category: 'Food', source: 'mobile_money', description: 'Local Restaurant' },
  { id: '9', date: '2023-11-05', amount: 100, type: 'credit', category: 'Side Hustle', source: 'mobile_money', description: 'Freelance Work' },
  { id: '10', date: '2023-11-08', amount: 350, type: 'debit', category: 'Loan Repayment', source: 'mobile_money', description: 'Micro-loan Installment' },
];

export const MONTHLY_DATA = [
  { name: 'Jun', income: 4200, spending: 3100 },
  { name: 'Jul', income: 4600, spending: 3400 },
  { name: 'Aug', income: 4500, spending: 3800 },
  { name: 'Sep', income: 4800, spending: 3200 },
  { name: 'Oct', income: 4900, spending: 3500 },
  { name: 'Nov', income: 5100, spending: 3300 },
];

export const WEEKLY_DATA = [
  { name: 'Mon', income: 0, spending: 45 },
  { name: 'Tue', income: 150, spending: 20 },
  { name: 'Wed', income: 0, spending: 120 },
  { name: 'Thu', income: 0, spending: 50 },
  { name: 'Fri', income: 4500, spending: 300 },
  { name: 'Sat', income: 0, spending: 150 },
  { name: 'Sun', income: 0, spending: 80 },
];

export const CATEGORY_SPENDING = [
  { name: 'Rent', value: 1500, color: '#3b82f6' },
  { name: 'Food/Groceries', value: 800, color: '#10b981' },
  { name: 'Transport', value: 400, color: '#f59e0b' },
  { name: 'Utilities', value: 300, color: '#6366f1' },
  { name: 'Loans', value: 350, color: '#ef4444' },
  { name: 'Other', value: 150, color: '#8b5cf6' },
];

export const FINASCORE_HISTORY = [
  { month: 'Jun', score: 620 },
  { month: 'Jul', score: 645 },
  { month: 'Aug', score: 640 },
  { month: 'Sep', score: 670 },
  { month: 'Oct', score: 695 },
  { month: 'Nov', score: 712 },
];
