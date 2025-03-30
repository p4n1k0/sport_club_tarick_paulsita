import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

const router = Router();

const leaderboardController = new LeaderboardController(new LeaderboardService(Teams, Matches));

router.get('/leaderboard/home', (req, res) => leaderboardController.getAllHome(req, res));

export default router;
