import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamsModel';
import { ILeaderboard } from '../interfaces';

export default class LeaderboardService {
    constructor(
        private teamModel: typeof Team,
        private matchModel: typeof Match,
    ) { }

    static calcLeaderboard(data: Match[]): ILeaderboard {
        const totalVictories = data.filter((game) => game.homeTeamGoals > game.awayTeamGoals).length;

        const totalDraws = data.filter((game) => game.homeTeamGoals === game.awayTeamGoals).length;

        const totalLosses = data.filter((game) => game.homeTeamGoals < game.awayTeamGoals).length;

        const totalPoints = 3 * (totalVictories) + totalDraws;

        const goalsFavor = data.map((game) => game.homeTeamGoals).reduce((acc, cur) => acc + cur);

        const goalsOwn = data.map((game) => game.awayTeamGoals).reduce((acc, cur) => acc + cur);

        const goalsBalance = goalsFavor - goalsOwn;

        const efficiency = Number(((totalPoints / (data.length * 3)) * 100).toFixed(2));

        return {
            totalPoints,
            totalVictories,
            totalDraws,
            totalLosses,
            goalsFavor,
            goalsOwn,
            goalsBalance,
            efficiency,
        };
    }

    static createLeaderboard(team: Team, teamData: Match[]): ILeaderboard {
        const leaderboardCalc = LeaderboardService.calcLeaderboard(teamData);

        const teamLeaderBoard = {
            name: team.teamName,
            totalPoints: leaderboardCalc.totalPoints,
            totalGames: teamData.length,
            totalVictories: leaderboardCalc.totalVictories,
            totalDraws: leaderboardCalc.totalDraws,
            totalLosses: leaderboardCalc.totalLosses,
            goalsFavor: leaderboardCalc.goalsFavor,
            goalsOwn: leaderboardCalc.goalsOwn,
            goalsBalance: leaderboardCalc.goalsBalance,
            efficiency: leaderboardCalc.efficiency,
        };

        return teamLeaderBoard;
    }

    static sortLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
        const sortFunction = (teamScore1: ILeaderboard, teamScore2: ILeaderboard) =>
            teamScore2.totalPoints - teamScore1.totalPoints
            || teamScore2.totalVictories - teamScore1.totalVictories
            || teamScore2.goalsBalance - teamScore1.goalsBalance
            || teamScore2.goalsFavor - teamScore1.goalsFavor
            || teamScore1.goalsOwn - teamScore2.goalsOwn;

        const sortedLeaderboard = leaderboard.sort(sortFunction);

        return sortedLeaderboard;
    }

    async getAllHome(): Promise<ILeaderboard[]> {
        const teams = await this.teamModel.findAll();

        const matches = await this.matchModel.findAll({
            where: { inProgress: 0 },
        });

        const leaderboard = teams.map((team) => {
            const teamData = matches.filter((match) => match.homeTeam === team.id);
            return LeaderboardService.createLeaderboard(team, teamData);
        });

        const sortedLeaderboard = LeaderboardService.sortLeaderboard(leaderboard);

        return sortedLeaderboard;
    }
}
