import { Router } from "express";
import { getStockData } from "../controllers/stockController";

const stockRouter = Router();

stockRouter.get("/", getStockData);

export default stockRouter;
