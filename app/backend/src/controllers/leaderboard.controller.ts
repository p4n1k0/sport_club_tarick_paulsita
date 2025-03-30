import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import statusCodes from '../statusCodes';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) { }

  async getHomeOrAwayLeaderboard(req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getHomeOrAwayLeaderboard(req.path);
    res.status(statusCodes.ok).json(leaderboard);
  };

  async getLeaderboard(_req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getLeaderboard();
    res.status(statusCodes.ok).json(leaderboard);
  };
};
