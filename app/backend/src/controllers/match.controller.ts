import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import MatchService from '../services/match.service';

export default class MatchController {
  public matchesService = new MatchService();

  async getInProgress(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const boolean = inProgress !== 'false';
      const matches = await this.matchesService.getAllInProgress(boolean);

      return res.status(statusCodes.ok).json(matches);
    }
    const data = await this.matchesService.getAll();

    return res.status(statusCodes.ok).json(data);
  }

  async create(req: Request, res: Response) {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(statusCodes.invalidFormat).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
    if (!homeTeam || !awayTeam) {
      return res.status(statusCodes.notFound).json(
        { message: 'There is no team with sich id!' },
      );
    }

    const matches = await this.matchesService.createMatch(req.body);

    return res.status(matches.status).json(matches.response);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const matches = await this.matchesService.updateMatch(Number(id));

    res.status(statusCodes.ok).json(matches.message);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const matches = await this.matchesService.updateMatches(+id, req.body);

    return res.status(statusCodes.ok).json(matches);
  }
}
