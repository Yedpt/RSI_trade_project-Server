import express from 'express';
import { getRanking, getUserRankingPosition, createRanking } from '../controllers/rankingController';
import { validateAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', validateAuth, getRanking);
router.get('/position', validateAuth, getUserRankingPosition);
router.post('/', validateAuth, createRanking);

export default router;
