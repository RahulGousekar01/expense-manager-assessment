import { configureStore } from "@reduxjs/toolkit";

import organizationReducer from "../features/organization/organizationSlice";
import subsidiaryReducer from "../features/subsidiaries/subsidiarySlice";
import expenseReducer from "../features/expenses/expenseSlice";

export const store = configureStore({
  reducer: {
    organization: organizationReducer,
    subsidiaries: subsidiaryReducer,
    expenses: expenseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
