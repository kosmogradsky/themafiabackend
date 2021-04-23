import { IPlayer } from 'src/game/interfaces/player.interface';

export class IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  players: IPlayer[];
}
