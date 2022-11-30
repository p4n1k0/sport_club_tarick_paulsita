export interface ILogin {
  email: string;
  password: string;
}

export interface Team {
  id: number;
}

export interface ITeam extends Team {
  teamName: string;
}
