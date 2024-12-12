
import { Request, Response } from "express";
import { fetchStockData } from "../Api_Services/alphaVantageService";
import { fetchCompanyLogo } from "../Api_Services/clearbitService";

export const getStockData = async (req: Request, res: Response) => {
  try {
    const { symbols } = req.query as { symbols: string };
    const symbolArray = symbols.split(",");

    const stockData = await Promise.all(
      symbolArray.map(async (symbol) => {
        const stock = await fetchStockData(symbol);
        const logo = await fetchCompanyLogo(`${symbol.toLowerCase()}.com`);
        return { ...stock, logo };
      })
    );

    res.json(stockData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stock data" });
  }
};
