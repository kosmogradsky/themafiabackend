import { ApiProperty } from '@nestjs/swagger';
import { IGame } from 'src/game/interfaces/game.interface';
import { IUser } from 'src/user/interfaces/user.interface';

export type LobbyStatus = string;

export class ILobby {
  @ApiProperty()
  id: number;
  @ApiProperty()
  creator_id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  status: LobbyStatus;
  @ApiProperty()
  game: IGame;
  @ApiProperty()
  users: IUser[];
}
