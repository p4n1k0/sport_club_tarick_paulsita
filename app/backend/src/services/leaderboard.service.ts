import Matchers from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class LeaderboardService {
  private _team;
  private _leaderboard;
  constructor() {
    this._leaderboard = Matchers.findAll();
    this._team = Teams;
  }

  private async matches(team: number) {
    const matches = await this._leaderboard;

    return matches.filter((matche) => matche.homeTeam === team && !matche.inProgress);
  }

  private async victories(team: number) {
    const victory = await this.matches(team);

    return victory.filter((matche) => matche.homeTeamGoals > matche.awayTeamGoals);
  }

  private async draws(team: number) {
    const draw = await this.matches(team);

    return draw.filter((matche) => matche.homeTeam === matche.awayTeamGoals);
  }

  private async loss(team: number) {
    const defeat = await this.matches(team);

    return defeat.filter((matche) => matche.homeTeamGoals < matche.awayTeamGoals);
  }

  private async favorGoals(team: number) {
    const goals = await this.matches(team);

    return goals.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
  }

  private async ownGoals(team: number) {
    const goals = await this.matches(team);

    return goals.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
  }

  private async efficiencies(team: number) {
    const multiplerEff = 3;
    const multiplerTotalEff = 100;
    const maxEfficiency = (await this.matches(team)).length * multiplerEff;
    const efficiency = ((await this.victories(team)).length * multiplerEff)
    + (await this.draws(team)).length;

    return ((efficiency / maxEfficiency) * multiplerTotalEff).toFixed(2);
  }

  public async getAll() {
    const teams = await this._team.findAll();
    const multiplerEff = 3;
    const leaderboard = await Promise.all(teams.map(async (team) => ({
      name: team.teamName,
      totalPoints: ((await this.victories(team.id)).length * multiplerEff)
      + (await this.draws(team.id)).length,
      totalGames: (await this.matches(team.id)).length,
      totalVictories: (await this.victories(team.id)).length,
      totalDraws: (await this.draws(team.id)).length,
      totalLosses: (await this.loss(team.id)).length,
      goalsFavor: await this.favorGoals(team.id),
      goalsOwn: await this.ownGoals(team.id),
      goalsBalance: await this.favorGoals(team.id) - await this.ownGoals(team.id),
      efficiency: await this.efficiencies(team.id),
    })));
    const res = leaderboard.sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance
    - a.goalsBalance || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);

    return { status: 200, res };
  }
}
