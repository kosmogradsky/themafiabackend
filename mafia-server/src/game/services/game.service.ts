import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameDTO } from '../dto/game.dto';
import { Game } from '../entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  getAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  getActive(): Promise<Game[]> {
    return this.gameRepository.find({ winner: undefined });
  }

  get(id: number): Promise<Game> {
    return this.gameRepository.findOne(id);
  }

  async update(gameData: GameDTO): Promise<Game> {
    const game = await this.get(gameData.id);
    if (!game) return game;

    return await this.gameRepository.save(Object.assign(game, gameData));
  }

  async create(gameData: GameDTO): Promise<Game> {
    return await this.gameRepository.save(gameData);
  }

  async delete(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }

  async startNewDay(gameData: GameDTO): Promise<Game> {
    gameData.day = gameData.day + 1;
    return await this.update(gameData);
  }
}
