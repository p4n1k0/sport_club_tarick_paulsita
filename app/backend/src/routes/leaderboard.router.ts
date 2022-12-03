import { Router } from 'express';
import LeaderboardController from '../controllers/learderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.getAll(req, res));

export default router;
