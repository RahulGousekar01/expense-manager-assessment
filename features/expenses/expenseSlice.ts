import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../../types/models";

interface ExpenseState {
  expenses: Expense[];
}

const initialState: ExpenseState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
    },
    updateExpense(state, action: PayloadAction<Expense>) {
      const index = state.expenses.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        // preserve the original exchangeRate — do not recalculate
        state.expenses[index] = {
          ...action.payload,
          exchangeRate: state.expenses[index].exchangeRate,
        };
      }
    },
  },
});

export const { addExpense, updateExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
