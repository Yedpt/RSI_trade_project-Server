import { Request, Response } from "express";
import UserModel from "../models/userModel";

export const updateMiFID = async (req: Request, res: Response) => {
  try {
    const { dni, earnings, nickname } = req.body;

    // Actualiza el registro del usuario
    const user = await UserModel.create({
      dni,
      earnings,
      nickname,
      hasCompletedMiFID: true,
    });

    return res.status(200).json({
      message: "Datos guardados correctamente",
      user,
    });
  } catch (error) {
    console.error("Error al guardar los datos del MiFID:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
