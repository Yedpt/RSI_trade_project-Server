import axios from "axios";

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

export const fetchStockData = async (symbol: string) => {
  const apiUrl = "https://www.alphavantage.co/query";
  const response = await axios.get(apiUrl, {
    params: {
      function: "GLOBAL_QUOTE",
      symbol,
      apikey: ALPHA_VANTAGE_API_KEY,
    },
  });

  const quote = response.data["Global Quote"];
  return {
    symbol: quote["01. symbol"],
    price: parseFloat(quote["05. price"]).toFixed(2),
    change: parseFloat(quote["10. change percent"]).toFixed(2),
  };
};
