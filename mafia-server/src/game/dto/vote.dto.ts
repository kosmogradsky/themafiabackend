import { GameState } from '../entities/gamestate.entity';
import { IPlayer } from '../interfaces/player.interface';

export class VoteDTO {
  readonly id?: number;
  player: IPlayer;
  choice: IPlayer;
  game_state: GameState;
  readonly created_at?: string;
}
