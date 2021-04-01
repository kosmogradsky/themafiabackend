import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameStateDTO } from '../dto/gamestate.dto';
import { GameState } from '../entities/gamestate.entity';

@Injectable()
export class GameStateService {
  constructor(
    @InjectRepository(GameState)
    private stateRepository: Repository<GameState>,
  ) {}

  getAll(): Promise<GameState[]> {
    return this.stateRepository.find();
  }

  get(id: number): Promise<GameState> {
    return this.stateRepository.findOne(id);
  }

  async create(stateData: GameStateDTO): Promise<GameState> {
    return await this.stateRepository.save(stateData);
  }

  async update(stateData: GameStateDTO): Promise<GameState> {
    const gameState = await this.get(stateData.id);
    if (!gameState) return gameState;

    return await this.stateRepository.save(Object.assign(gameState, stateData));
  }

  async delete(id: number): Promise<void> {
    await this.stateRepository.delete(id);
  }
}
