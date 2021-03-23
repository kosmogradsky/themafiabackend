import { Player } from './player.interface';

export class Game {
  janusSession: string | null;
  day: number;
  winner: 'mafia' | 'civilians' | null;
  mafiaPlayers: Player[];
  civilianPlayers: Player[];
  narrator: Player;
}
