export interface ILogin {
  email: string;
  password: string;
}

export interface Team {
  id?: number;
}

export interface ITeam extends Team {
  teamName: string;
}

export interface IMatch extends ITeam {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
