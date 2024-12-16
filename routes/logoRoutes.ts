import { Router } from "express";
import { getCompanyLogo } from "../controllers/logoController";

const logoRouter = Router();

logoRouter.get("/:domain", getCompanyLogo);

export default logoRouter;
