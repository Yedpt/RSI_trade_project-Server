import { Router } from "express";
import { getChatbotResponse } from "../controllers/chatbotController";

const chatbotRoutes = Router();

chatbotRoutes.post("/chatbot", getChatbotResponse);

export default chatbotRoutes;
