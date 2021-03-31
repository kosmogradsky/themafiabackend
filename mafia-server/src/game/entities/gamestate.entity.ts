import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GamePhase } from '../interfaces/game.interface';
import { Shot } from './shot.entity';
import { Vote } from './vote.entity';

@Entity()
export class GameState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phase: GamePhase;

  @Column()
  lastVote: Vote[];

  @Column()
  lastShooting: Shot[];
}
