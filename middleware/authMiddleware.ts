// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { IUserRequest } from '../interfaces/userInterface';

export const validateAuth = (
    req: IUserRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = req.headers.authorization;

        // Verificar si el encabezado de autorización está presente
        if (!authorizationHeader) {
            return res.status(401).json({
                success: false,
                message: 'Authorization header is missing',
            });
        }

        // Obtener el token del encabezado
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided',
            });
        }

        // Verificar el token JWT
        const decoded = jwt.verify(token, JWT_SECRET);


        // Asignar el usuario decodificado al objeto `req`
        req.user = decoded as { id: number; username: string };

        // Continuar con la siguiente función
        next();
    } catch (error) {
        // Manejar errores específicos de JWT
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
        }
        // Manejar otros errores
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
