import { Router } from "express";
import { createTransaction , getTransactions } from "../controllers/investmentsController";

const investmentRouter = Router();

investmentRouter.post("/transactions", createTransaction);
investmentRouter.get("/transactions/:userId", getTransactions);

export default investmentRouter;
