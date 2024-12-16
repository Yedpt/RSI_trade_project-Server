import { Request, Response } from "express";
import UserModel from "../models/userModel";
import investmentsModel from "../models/investmentsModel";

// Comprar/vender acciones
export const createTransaction = async (req: Request, res: Response): Promise<any> => {
    try {
      const { userId, stockName, action, quantity, price } = req.body;
  
      // Buscar al usuario por su ID
      const user = await UserModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
  
      const totalCost = price * quantity;
  
      // Validar fondos del usuario al comprar
      if (action === "buy" && (user.wallet ?? 0) < totalCost) {
        return res.status(400).json({ error: "Fondos insuficientes" });
      }
  
      // Validar acciones disponibles al vender
      if (action === "sell") {
        const userTransactions = await investmentsModel.findAll({
          where: { user_id: userId, stockName, action: "buy" },
        });
  
        const totalSharesOwned = userTransactions.reduce(
          (sum, t) => sum + t.quantity,
          0
        );
  
        if (totalSharesOwned < quantity) {
          return res.status(400).json({ error: "Acciones insuficientes" });
        }
      }
  
      // Actualizar el saldo del usuario
      if (action === "buy") {
        user.wallet = (user.wallet ?? 0) - totalCost;
      } else if (action === "sell") {
        user.wallet = (user.wallet ?? 0) + totalCost;
      }
  
      // Guardar los cambios en el saldo del usuario
      await user.save();
  
      // Crear la transacción
      const transaction = await investmentsModel.create({
        user_id: userId,  // Cambiar 'userId' por 'user_id'
        stockName,
        action,
        quantity,
        price,
      });
  
      // Respuesta exitosa
      res.status(201).json(transaction);
    } catch (error) {
      console.error("Error en createTransaction:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };


// Obtener transacciones
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const transactions = await investmentsModel.findAll({
      where: { user_id: userId },  // Cambiar 'userId' por 'user_id'
    });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
