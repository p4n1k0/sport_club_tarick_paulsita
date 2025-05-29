import { Request, Response } from 'express';
import TeamsService from '../services/team.service';

export default class TeamsController {
  public teamService = new TeamsService();

  async getAll(_req: Request, res: Response) {
    const data = await this.teamService.getAll();
    res.status(200).json(data);
  };

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.getById(Number(id));
    res.status(200).json(team);
  };
};
