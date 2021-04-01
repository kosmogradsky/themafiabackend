import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoteDTO } from '../dto/vote.dto';
import { Player } from '../entities/player.entity';
import { Vote } from '../entities/vote.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
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
    return await this.voteRepository.save(voteData);
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
