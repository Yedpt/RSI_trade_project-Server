import { Request, Response } from "express";

export const getStockData = async (req: Request, res: Response) => {
  const stockData = [
    { symbol: "airbnb", name: "Airbnb, Inc.", price: 112.72, change: 0.33 },
    { symbol: "spotify", name: "Spotify Technology", price: 82.7, change: -0.06 },
    { symbol: "nvidia", name: "NVIDIA Corporation", price: 438.54, change: 2.14 },
    { symbol: "tesla", name: "Tesla, Inc.", price: 251.37, change: -1.65 },
    { symbol: "apple", name: "Apple Inc.", price: 179.45, change: 0.89 },
    { symbol: "amazon", name: "Amazon.com, Inc.", price: 134.25, change: 1.17 },
    { symbol: "microsoft", name: "Microsoft Corporation", price: 315.67, change: 0.72 },
  ];

  res.json(stockData);
};
