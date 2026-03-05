export const loadState = (): Record<string, unknown> | undefined => {
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

export const saveState = (state: unknown) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("expenseManagerState", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state", err);
  }
};
