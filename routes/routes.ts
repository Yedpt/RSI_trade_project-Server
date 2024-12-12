// routes/routes.ts
import { Router } from 'express';
import rankingController from '../controllers/rankingController';
import { validateAuth } from '../middleware/authMiddleware';

const router = Router();

router.get('/rankings', validateAuth, rankingController.getRankings);
router.post('/rankings', validateAuth, rankingController.createRanking);
router.put('/rankings/:id', validateAuth, rankingController.updateRanking);
router.get('/rankings/:id', validateAuth, rankingController.getRankingById);

export default router;