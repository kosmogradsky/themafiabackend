import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { Repository } from 'typeorm';
import { PlayerDTO } from '../dto/player.dto';
import { Game } from '../entities/game.entity';
import { Player } from '../entities/player.entity';
import {
  FoulAssignedEvent,
  PlayerKickedEvent,
  PlayerKilledEvent,
} from '../events/player.event';
import { Role } from '../interfaces/player.interface';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    private eventEmitter: EventEmitter2,
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

  async update(playerData: PlayerDTO): Promise<Player> {
    const player = await this.playersRepository.findOne(playerData.id);
    if (!player) return player;

    return await this.playersRepository.save(Object.assign(player, playerData));
  }

  async kill(playerData: PlayerDTO): Promise<Player> {
    playerData.is_alive = false;
    const player = await this.update(playerData);

    const playerKilledEvent = new PlayerKilledEvent();
    playerKilledEvent.player = player;
    this.eventEmitter.emit('player.killed', playerKilledEvent);

    return player;
  }

  async kick(playerData: PlayerDTO): Promise<Player> {
    playerData.game = null;
    const player = await this.update(playerData);

    const playerKickedEvent = new PlayerKickedEvent();
    playerKickedEvent.player = player;
    this.eventEmitter.emit('player.kicked', playerKickedEvent);

    return player;
  }

  async addFoul(playerData: PlayerDTO): Promise<false | Player> {
    if (playerData.fouls >= 3) return false;

    playerData.fouls += 1;
    const player = await this.update(playerData);

    const foulAssignedEvent = new FoulAssignedEvent();
    foulAssignedEvent.player = player;
    this.eventEmitter.emit('player.foul', foulAssignedEvent);

    return player;
  }

  async addToGame(id: number, game: Game): Promise<Player> {
    return await this.update({ id: id, game: game });
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
