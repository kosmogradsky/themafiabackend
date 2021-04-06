import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { Repository } from 'typeorm';
import { ShotDTO } from '../dto/shot.dto';
import { Player } from '../entities/player.entity';
import { Shot } from '../entities/shot.entity';
import { ShotFiredEvent } from '../events/shot.event';

@Injectable()
export class ShotService {
  constructor(
    @InjectRepository(Shot)
    private shotRepository: Repository<Shot>,
    private eventEmitter: EventEmitter2,
  ) {}

  getAll(): Promise<Shot[]> {
    return this.shotRepository.find();
  }

  getAllByPlayer(player: Player): Promise<Shot[]> {
    return this.shotRepository.find({ player: player });
  }

  getAllByAim(aim: Player): Promise<Shot[]> {
    return this.shotRepository.find({ aim: aim });
  }

  get(id: number): Promise<Shot> {
    return this.shotRepository.findOne(id);
  }

  async create(shotData: ShotDTO): Promise<Shot> {
    const shot = await this.shotRepository.save(shotData);

    const shotFiredEvent = new ShotFiredEvent();
    shotFiredEvent.shot = shot;
    this.eventEmitter.emit('shot.created', shotFiredEvent);

    return shot;
  }

  async delete(id: number): Promise<void> {
    await this.shotRepository.delete(id);
  }

  async deleteAllByPlayer(player: Player): Promise<void> {
    await this.shotRepository.delete({ player: player });
  }

  async deleteAllByAim(aim: Player): Promise<void> {
    await this.shotRepository.delete({ aim: aim });
  }
}
