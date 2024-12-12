import express from 'express';
import { getRankingData, createRanking } from '../controllers/rankingController';
import { validateAuth } from '../middleware/authMiddleware';

const router = express.Router();

// Ruta para obtener el ranking general
//router.get('/', validateAuth, getRankingData);

// Ruta para crear un nuevo ranking
//router.post('/', validateAuth, createRanking);

export default router;
