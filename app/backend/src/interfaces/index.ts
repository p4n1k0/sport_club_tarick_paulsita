export interface ILogin {
  email: string;
  password: string;
}

export interface Team {
  id?: number;
}

export interface ITeam extends Team {
  teamName?: string;
}

export interface ILeaderboard extends Team {
  name?: string;
  totalPoints: number;
  totalGames?: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface Match extends ITeam {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export interface IMatch extends Match {
  inProgress: boolean;
}
