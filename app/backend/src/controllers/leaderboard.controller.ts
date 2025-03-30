import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import statusCodes from '../statusCodes';

export default class LeaderboardController {
    constructor(private leaderboardService: LeaderboardService) { }

    async getAllHome(_req: Request, res: Response) {
      const leaderboard = await this.leaderboardService.getAllHome();
  
      res.status(statusCodes.ok).json(leaderboard);
    }
};
