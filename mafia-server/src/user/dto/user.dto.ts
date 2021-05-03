import { IsEmail, IsNotEmpty } from 'class-validator';
import { IPlayer } from 'src/game/interfaces/player.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @IsNotEmpty()
  readonly id?: number;

  @ApiProperty()
  @IsNotEmpty()
  username?: string;

  @ApiProperty()
  @IsNotEmpty()
  password?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  players?: IPlayer[];
}
