import { Player } from './player.interface';

export class Game {
  janusSession: string | undefined;
  videoRoom: string | undefined;
  day: number;
  winner: 'mafia' | 'civilians' | undefined;
  mafiaPlayers: Player[];
  civilianPlayers: Player[];
  narrator: Player;
}
