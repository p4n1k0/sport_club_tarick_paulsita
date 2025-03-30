import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

const router = Router();

const leaderboardController = new LeaderboardController(new LeaderboardService(Teams, Matches));

router.get('/leaderboard', (req, res) => leaderboardController.getLeaderboard(req, res));
router.get('/leaderboard/home', (req, res) => leaderboardController.getHomeOrAwayLeaderboard(req, res));
router.get('/leaderboard/away', (req, res) => leaderboardController.getHomeOrAwayLeaderboard(req, res));

export default router;
