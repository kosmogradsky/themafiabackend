import { IGameState } from '../interfaces/game.interface';
import { IPlayer } from '../interfaces/player.interface';

export class ShotDTO {
  readonly id?: number;
  player: IPlayer;
  aim: IPlayer;
  game_state: IGameState;
  readonly created_at?: string;
}
