import Teams from '../database/models/TeamsModel';
import Matchers from '../database/models/MatchesModel';
import { IMatch } from '../interfaces';

export default class MatchService {
  constructor(private matches = Matchers) {}

  public async getAll(): Promise<Matchers[]> {
    const matchers = await this.matches.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: {
          exclude: ['id'] },
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: {
          exclude: ['id'] },
      }],
    });
    return matchers;
  }

  public async getAllInProgress(progress: boolean): Promise<Matchers[]> {
    const data = await this.matches.findAll({
      where: {
        inProgress: progress,
      },
      include: [{
        model: Teams,
        as: 'teamHome',
      },
      {
        model: Teams,
        as: 'teamAway',
      }],
    });
    return data;
  }

  public async createMatch(newMatches: IMatch): Promise<Matchers> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatches;
    const data = await this.matches.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });
    return data;
  }
}
