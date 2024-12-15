import { Router } from "express";
import { updateMiFID } from "../controllers/midFidController";
import { checkMiFIDStatus } from "../controllers/midFidController";

const router = Router();

// Define la ruta correctamente
router.post("/", updateMiFID);
router.get("/status", checkMiFIDStatus);

export default router;
