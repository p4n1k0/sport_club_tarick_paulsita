import Teams from '../database/models/TeamsModel';
import { ITeam, Team } from '../interfaces';

export default class TeamsService {
  constructor(private team = Teams) {}

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.team.findAll();
    return teams;
  };

  public async getById(id: number): Promise<Team | null> {
    const data = await this.team.findByPk(id);
    return data;
  };
};
