import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import MatchService from '../services/match.service';

export default class MatchController {
  public matchesService = new MatchService();

  async getAllInProgress(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const boolean = inProgress !== 'false';
      const matches = await this.matchesService.getAllInProgress(boolean);

      return res.status(statusCodes.ok).json(matches);
    }
    const data = await this.matchesService.getAll();

    return res.status(statusCodes.ok).json(data);
  }
}
