import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import MatchService from '../services/match.service';

export default class MatchController {
  public matchesService = new MatchService();

  async getAll(_req: Request, res: Response) {
    const matches = await this.matchesService.getAll();

    res.status(statusCodes.ok).json(matches);
  }
}
