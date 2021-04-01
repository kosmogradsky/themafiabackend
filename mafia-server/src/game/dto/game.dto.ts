import { IGameState, Team } from '../interfaces/game.interface';
import { IPlayer } from '../interfaces/player.interface';

export class GameDTO {
  readonly id?: number;
  janusSession?: string;
  videoRoom?: string;
  day?: number;
  winner?: Team;
  players?: IPlayer[];
  state?: IGameState;
}
