export async function getExchangeRate(
  from: string,
  to: string,
): Promise<number> {
  if (from === to) return 1;

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await res.json();

    return data?.rates?.[to] ?? 1;
  } catch (error) {
    console.error("Exchange rate fetch failed:", error);
    return 1;
  }
}
