//this slice will store the expenses of the organization.
// Each expense will have a description, amount, date, and the subsidiary it belongs to.
// This will help in tracking and managing expenses effectively.

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
  },
});

export const { addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
