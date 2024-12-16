import { Request, Response } from "express";
import responses from "../chatBotMessages/chatbotData";


export const getChatbotResponse = (req: Request, res: Response): void => {
  const { question } = req.body;
  const answer = responses[question] || "Lo siento, no tengo una respuesta para eso.";
  res.json({ answer });
};
