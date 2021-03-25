import { IPlayer } from './player.interface';

export type Team = 'mafia' | 'civilians' | undefined;

export class IGame {
  janusSession: string | undefined;
  videoRoom: string | undefined;
  day: number;
  winner: Team;
  players: IPlayer[];
}
