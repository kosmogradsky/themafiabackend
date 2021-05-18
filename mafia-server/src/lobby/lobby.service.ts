import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { Lobby } from './entities/lobby.entity';

@Injectable()
export class LobbyService {
  constructor(
    @InjectRepository(Lobby)
    private lobbyRepository: Repository<Lobby>,
  ) {}

  async create(createLobbyDto: CreateLobbyDto): Promise<Lobby> {
    return await this.lobbyRepository.save(createLobbyDto);
  }

  findAll(): Promise<Lobby[]> {
    return this.lobbyRepository.find();
  }

  findOne(id: number): Promise<Lobby> {
    return this.lobbyRepository.findOne(id);
  }

  async update(id: number, updateLobbyDto: UpdateLobbyDto): Promise<Lobby> {
    const lobby = await this.findOne(id);
    if (!lobby) return lobby;

    return await this.lobbyRepository.save(
      Object.assign(lobby, updateLobbyDto),
    );
  }

  async remove(id: number): Promise<void> {
    await this.lobbyRepository.delete(id);
  }
}
