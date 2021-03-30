import { IGame } from '../interfaces/game.interface';
import { Role } from '../interfaces/player.interface';

export class PlayerDTO {
  readonly id?: number;
  name?: string;
  is_alive?: boolean;
  is_exposed?: boolean;
  fouls?: number;
  role?: Role;
  game?: IGame;
}
