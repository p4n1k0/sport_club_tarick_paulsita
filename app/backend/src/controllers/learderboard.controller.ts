import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  public leaderboardService = new LeaderboardService();

  async getAll(_req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getAll();

    return res.status(leaderboard.status).json(leaderboard.res);
  }
}
