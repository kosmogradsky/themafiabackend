import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerDTO } from '../dto/player.dto';
import { Game } from '../entities/game.entity';
import { Player } from '../entities/player.entity';
import { Role } from '../interfaces/player.interface';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  getAll(): Promise<Player[]> {
    return this.playersRepository.find();
  }

  getAllByGame(game: Game, role: Role = undefined): Promise<Player[]> {
    return role
      ? this.playersRepository.find({ game: game, role: role })
      : this.playersRepository.find({ game: game });
  }

  getAllByUser() {
    //TODO
    return;
  }

  get(id: number): Promise<Player> {
    return this.playersRepository.findOne(id);
  }

  async update(id: number, playerData: PlayerDTO): Promise<Player> {
    const player = await this.playersRepository.findOne(id);
    if (!player) return player;

    return await this.playersRepository.save(Object.assign(player, playerData));
  }

  async addToGame(id: number, game: Game): Promise<Player> {
    return await this.update(id, { game: game });
  }

  async create(playerData: PlayerDTO): Promise<Player> {
    return await this.playersRepository.save(playerData);
  }

  async delete(id: number): Promise<void> {
    await this.playersRepository.delete(id);
  }

  async deleteAllByGame(game: Game): Promise<void> {
    await this.playersRepository.delete({ game: game });
  }
}
