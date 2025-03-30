import Teams from '../database/models/TeamsModel';
import Matchers from '../database/models/MatchesModel';
import { IMatch, Match } from '../interfaces';

export default class MatchService {
  private teamsTable;
  constructor(private matches = Matchers) {
    this.teamsTable = Teams;
  }

  public async getAll(): Promise<Matchers[]> {
    const matchers = await this.matches.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: {
          exclude: ['id'],
        },
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: {
          exclude: ['id'],
        },
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

  public async createMatch(newMatches: IMatch) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatches;
    const homeId = await this.teamsTable.findByPk(homeTeam);
    const awayId = await this.teamsTable.findByPk(awayTeam);
    if (!homeId || !awayId) return { status: 404, response: { message: 'There is no team with such id!' }, };
    const data = await this.matches.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });
    return { status: 201, response: data };
  };

  public async updateMatch(id: number) {
    const matchers = await this.matches.update({ inProgress: false }, { where: { id } });
    return { matchers, message: 'Finished' };
  };

  public async updateMatches(id: number, matches: Match) {
    await this.matches.update({ ...matches }, { where: { id } });
    return matches;
  };
};
