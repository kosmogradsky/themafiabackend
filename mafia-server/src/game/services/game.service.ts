import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { Repository } from 'typeorm';
import { GameDTO } from '../dto/game.dto';
import { Game } from '../entities/game.entity';
import {
  JanusSessionCreatedEvent,
  JanusVideoRoomCreatedEvent,
} from '../events/game.event';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private eventEmitter: EventEmitter2,
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

  async attachJanusSession(
    gameData: GameDTO,
    janusSession: string,
  ): Promise<Game> {
    gameData.janusSession = janusSession;
    const game = await this.update(gameData);

    const janusSessionCreatedEvent = new JanusSessionCreatedEvent();
    janusSessionCreatedEvent.game = game;
    janusSessionCreatedEvent.janusSession = janusSession;
    this.eventEmitter.emit('game.session_attached', janusSessionCreatedEvent);

    return game;
  }

  async attachJanusVideoRoom(
    gameData: GameDTO,
    videoRoom: string,
  ): Promise<Game> {
    gameData.videoRoom = videoRoom;
    const game = await this.update(gameData);

    const janusVideoRoomCreatedEvent = new JanusVideoRoomCreatedEvent();
    janusVideoRoomCreatedEvent.game = game;
    janusVideoRoomCreatedEvent.videoRoom = videoRoom;
    this.eventEmitter.emit(
      'game.videoroom_attached',
      janusVideoRoomCreatedEvent,
    );

    return game;
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
