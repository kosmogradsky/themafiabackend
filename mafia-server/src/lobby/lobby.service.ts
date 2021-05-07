import { Injectable } from '@nestjs/common';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';

@Injectable()
export class LobbyService {
  create(createLobbyDto: CreateLobbyDto) {}

  findAll() {}

  findOne(id: number) {}

  update(id: number, updateLobbyDto: UpdateLobbyDto) {}

  remove(id: number) {}
}
