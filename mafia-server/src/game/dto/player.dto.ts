import { IUser } from 'src/user/interfaces/user.interface';
import { IGame, IShot, IVote } from '../interfaces/game.interface';
import { Role } from '../interfaces/player.interface';

export class PlayerDTO {
  readonly id?: number;
  name?: string;
  is_alive?: boolean;
  is_exposed?: boolean;
  fouls?: number;
  role?: Role;
  game?: IGame;
  votes?: IVote[];
  votes_against?: IVote[];
  shots?: IShot[];
  shots_against?: IShot[];
  readonly user?: IUser;
}
