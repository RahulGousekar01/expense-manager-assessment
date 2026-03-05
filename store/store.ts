import { configureStore, combineReducers } from "@reduxjs/toolkit";

import organizationReducer from "../features/organization/organizationSlice";
import subsidiaryReducer from "../features/subsidiaries/subsidiarySlice";
import expenseReducer from "../features/expenses/expenseSlice";
import { loadState, saveState } from "@/utils/storageUtils";

const rootReducer = combineReducers({
  organization: organizationReducer,
  subsidiaries: subsidiaryReducer,
  expenses: expenseReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
