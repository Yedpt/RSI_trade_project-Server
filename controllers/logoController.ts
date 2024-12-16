import { Request, Response } from "express";
import { fetchCompanyLogo } from "../Api_Services/clearbitService";

export const getCompanyLogo = async (req: Request, res: Response) => {
  const { domain } = req.params;

  try {
    const logoUrl = await fetchCompanyLogo(domain);
    res.json({ logo: logoUrl });
  } catch (error) {
    // Verificar si el error es una instancia de Error
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      // En caso de que no sea un Error estándar, maneja como un error genérico
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
