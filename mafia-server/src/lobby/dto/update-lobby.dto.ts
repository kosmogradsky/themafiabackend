import { PartialType } from '@nestjs/mapped-types';
import { IGame } from 'src/game/interfaces/game.interface';
import { LobbyStatus } from '../interfaces/lobby.interface';
import { CreateLobbyDto } from './create-lobby.dto';

export class UpdateLobbyDto extends PartialType(CreateLobbyDto) {
  readonly id?: number;
  readonly creator_id?: number;
  status?: LobbyStatus;
  game?: IGame;
}
