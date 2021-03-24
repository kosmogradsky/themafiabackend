import { IPlayer } from './player.interface';

export class IGame {
  janusSession: string | undefined;
  videoRoom: string | undefined;
  day: number;
  winner: 'mafia' | 'civilians' | undefined;
  mafiaPlayers: IPlayer[];
  civilianPlayers: IPlayer[];
  narrator: IPlayer;
}
