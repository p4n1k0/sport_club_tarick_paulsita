import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import TeamsService from '../services/team.service';

export default class TeamsController {
  public teamService = new TeamsService();

  async getAll(_req: Request, res: Response) {
    const data = await this.teamService.getAll();

    res.status(statusCodes.ok).json(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.getById(Number(id));

    res.status(statusCodes.ok).json(team);
  }
}
