import { Request, Response } from "express";

export const getStockData = async (req: Request, res: Response) => {
  const stockData = [
    { symbol: "airbnb", name: "Airbnb, Inc.", price: 112.72, change: 0.33 },
    { symbol: "spotify", name: "Spotify Technology", price: 82.7, change: -0.06 },
  ];

  res.json(stockData);
};
