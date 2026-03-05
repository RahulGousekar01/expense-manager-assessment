import axios from "axios";

export const getExchangeRate = async (
  fromCurrency: string,
  toCurrency: string,
): Promise<number> => {
  try {
    const response = await axios.get(
      `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`,
    );

    return response.data.result;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return 1;
  }
};
