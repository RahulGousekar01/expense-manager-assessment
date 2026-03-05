import { Expense } from "@/types/models";

export const convertCurrency = (
  amount: number,
  exchangeRate: number,
): number => {
  return amount * exchangeRate;
};

export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => {
    return total + expense.amount * expense.exchangeRate;
  }, 0);
};

export const calculateCategoryTotals = (expenses: Expense[]) => {
  const categoryTotals: Record<string, number> = {};

  expenses.forEach((expense) => {
    const convertedAmount = expense.amount * expense.exchangeRate;

    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] += convertedAmount;
  });

  return categoryTotals;
};
