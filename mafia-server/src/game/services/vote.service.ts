import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { Repository } from 'typeorm';
import { VoteDTO } from '../dto/vote.dto';
import { Player } from '../entities/player.entity';
import { Vote } from '../entities/vote.entity';
import { VoteMadeEvent } from '../events/vote.event';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    private eventEmitter: EventEmitter2,
  ) {}

  getAll(): Promise<Vote[]> {
    return this.voteRepository.find();
  }

  getAllByPlayer(player: Player): Promise<Vote[]> {
    return this.voteRepository.find({ player: player });
  }

  getAllByChoice(choice: Player): Promise<Vote[]> {
    return this.voteRepository.find({ choice: choice });
  }

  get(id: number): Promise<Vote> {
    return this.voteRepository.findOne(id);
  }

  async create(voteData: VoteDTO): Promise<Vote> {
    const vote = await this.voteRepository.save(voteData);

    const voteMadeEvent = new VoteMadeEvent();
    voteMadeEvent.vote = vote;
    this.eventEmitter.emit('vote.created', voteMadeEvent);

    return vote;
  }

  async delete(id: number): Promise<void> {
    await this.voteRepository.delete(id);
  }

  async deleteAllByPlayer(player: Player): Promise<void> {
    await this.voteRepository.delete({ player: player });
  }

  async deleteAllByChoice(choice: Player): Promise<void> {
    await this.voteRepository.delete({ choice: choice });
  }
}
