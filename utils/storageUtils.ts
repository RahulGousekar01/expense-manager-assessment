import type { RootState } from "@/store/store";

export const loadState = (): RootState | undefined => {
  if (typeof window === "undefined") return undefined;

  try {
    const serializedState = localStorage.getItem("expenseManagerState");

    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state", err);
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  if (typeof window === "undefined") return;

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("expenseManagerState", serializedState);
  } catch (err) {
    console.error("Failed to save state", err);
  }
};
