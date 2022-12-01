import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

export default class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init(
  {
    id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    homeTeam: { type: INTEGER, allowNull: false },
    homeTeamGoals: { type: INTEGER, allowNull: false },
    awayTeam: { type: INTEGER, allowNull: false },
    awayTeamGoals: { type: INTEGER, allowNull: false },
    inProgress: { type: BOOLEAN, allowNull: false },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

TeamsModel.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeTeamHasMany' });
TeamsModel.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayTeamHasMany' });
Matches.belongsTo(TeamsModel, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(TeamsModel, { foreignKey: 'awayTeam', as: 'teamAway' });
