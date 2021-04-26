import { IsEmail, IsNotEmpty } from 'class-validator';
import { IPlayer } from 'src/game/interfaces/player.interface';

export class UserDTO {
  @IsNotEmpty()
  readonly id?: number;

  @IsNotEmpty()
  username?: string;

  @IsNotEmpty()
  password?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  players?: IPlayer[];
}
