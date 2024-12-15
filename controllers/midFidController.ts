import { Request, Response } from "express";
import UserModel from "../models/userModel";

export const updateMiFID = async (req: Request, res: Response): Promise<any> => {
  try {
    const { dni, earnings, nickname, userId } = req.body;

    // Verifica si el userId está presente en la solicitud
    if (!userId) {
      return res.status(400).json({ message: "ID de usuario no proporcionado" });
    }

    // Aquí, creamos un nuevo usuario en lugar de buscarlo
    const user = await UserModel.create({
      id: userId,  // Usamos el userId del localStorage
      dni,
      earnings,
      nickname,
      hasCompletedMiFID: true,  // Marca que el usuario ha completado el MiFID
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

export const checkMiFIDStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.query.userId;

    // Validar que userId exista y sea del tipo adecuado
    if (typeof userId !== "string") {
      return res.status(400).json({ message: "ID de usuario no válido" });
    }

    // Busca el usuario por su ID
    const user = await UserModel.findByPk(userId);

    if (!user) {
      // Si el usuario no se encuentra, devuelve que no ha completado el MiFID
      return res.status(200).json({ hasCompletedMiFID: false });
    }

    return res.status(200).json({ hasCompletedMiFID: user.hasCompletedMiFID });
  } catch (error) {
    console.error("Error verificando el estado del MiFID:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
