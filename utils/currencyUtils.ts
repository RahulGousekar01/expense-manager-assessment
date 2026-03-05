import { Expense } from "@/types/models";

export const convertCurrency = (
  amount: number,
  exchangeRate: number,
): number => {
  return amount * exchangeRate;
};

export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => {
    const amount = Number(expense.amount) || 0;
    const rate = Number(expense.exchangeRate) || 1;

    return total + amount * rate;
  }, 0);
};

export const calculateCategoryTotals = (expenses: Expense[]) => {
  const categoryTotals: Record<string, number> = {};

  expenses.forEach((expense) => {
    const amount = Number(expense.amount) || 0;
    const rate = Number(expense.exchangeRate) || 1;

    const converted = amount * rate;

    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] += converted;
  });

  return categoryTotals;
};
